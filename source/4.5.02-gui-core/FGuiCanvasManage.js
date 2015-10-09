//==========================================================
// <T>页面对象。</T>
//
// @class
// @author maocy
// @version 150612
//==========================================================
MO.FGuiCanvasManager = function FGuiCanvasManager(o){
   o = MO.Class.inherits(this, o, MO.FGuiManager);
   //..........................................................
   // @attribute
   o._desktop          = MO.Class.register(o, new MO.AGetSet('_desktop'));
   o._canvas           = MO.Class.register(o, new MO.AGetSet('_canvas'));
   // @attribute
   o._readyControls    = null;
   o._dirtyControls    = null;
   // @attribute
   o._paintEvent       = null;
   //..........................................................
   // @method
   o.onSortControl     = MO.FGuiCanvasManager_onSortControl;
   //..........................................................
   // @method
   o.construct         = MO.FGuiCanvasManager_construct;
   // @method
   o.filterByRectangle = MO.FGuiCanvasManager_filterByRectangle;
   // @method
   o.doActionAlpha     = MO.FGuiCanvasManager_doActionAlpha;
   // @method
   o.processResize     = MO.FGuiCanvasManager_processResize;
   o.processControl    = MO.FGuiCanvasManager_processControl;
   o.process           = MO.FGuiCanvasManager_process;
   // @method
   o.dispose           = MO.FGuiCanvasManager_dispose;
   return o;
}

//==========================================================
// <T>控件排序。</T>
//
// @method
//==========================================================
MO.FGuiCanvasManager_onSortControl = function FGuiCanvasManager_onSortControl(source, target){
   var o = this;
   var sourceOrder = source.displayOrder();
   var targetOrder = target.displayOrder();
   return sourceOrder - targetOrder;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiCanvasManager_construct = function FGuiCanvasManager_construct(){
   var o = this;
   o.__base.FGuiManager.construct.call(o);
   // 设置属性
   o._readyControls = new MO.TObjects();
   o._dirtyControls = new MO.TObjects();
   o._paintEvent = new MO.SGuiPaintEvent();
}

//==========================================================
// <T>查找和当前大小重合的所有控件。</T>
//
// @method
//==========================================================
MO.FGuiCanvasManager_filterByRectangle = function FGuiCanvasManager_filterByRectangle(dirtyControls, rectangle){
   var o = this;
   var controls = o._readyControls;
   var count = controls.count();
   for(var i = 0; i < count; i++){
      var control = controls.at(i);
      var clientRectangle = control.clientRectangle();
      if(rectangle.testRectangle(clientRectangle)){
         if(!control._flagDirty){
            control._flagDirty = true;
            o.filterByRectangle(dirtyControls, clientRectangle);
         }
         control.dirty();
         dirtyControls.pushUnique(control);
      }
   }
}

//==========================================================
// <T>命令处理。</T>
//
// @method
//==========================================================
MO.FGuiCanvasManager_doActionAlpha = function FGuiCanvasManager_doActionAlpha(alpha){
   var o = this;
   var context = o._canvas.graphicContext();
   context.setAlpha(alpha);
   o.dirty();
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FGuiCanvasManager_processResize = function FGuiCanvasManager_processResize(control){
   //control.psResize();
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FGuiCanvasManager_processControl = function FGuiCanvasManager_processControl(control){
   var o = this;
   o.__base.FGuiManager.process.call(o);
   var graphic = o._canvas.graphicContext();
   var desktop = o._desktop;
   var calculateSize = desktop.calculateSize();
   var calculateRate = desktop.calculateRate();
   var virtualSize = desktop.virtualSize();
   // 绘制处理
   var event = o._paintEvent;
   event.optionScale = false;
   event.graphic = graphic;
   event.virtualSize = virtualSize;
   event.parentRectangle.set(0, 0, virtualSize.width, virtualSize.height);
   event.rectangle.set(0, 0, virtualSize.width, virtualSize.height);
   event.calculateRate = calculateRate;
   control.paint(event);
   // MO.Logger.debug(o, 'Draw control.', control);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FGuiCanvasManager_process = function FGuiCanvasManager_process(){
   var o = this;
   o.__base.FGuiManager.process.call(o);
   var canvas = o._canvas;
   var graphic = canvas.graphicContext();
   if(!o._valid){
      return;
   }
   // 计算画板缩放
   var desktop = o._desktop;
   var sizeRate = desktop.sizeRate();
   graphic.setGlobalScale(sizeRate, sizeRate);
   // 获得准备好的控件集合
   var readyControls = o._readyControls;
   readyControls.clear();
   var controls = o._controls;
   var count = controls.count();
   if(o._visible){
      for(var i = 0; i < count; i++){
         var control = controls.at(i);
         if(control.processReady()){
            if(control.visible()){
               control._flagDirty = false;
               readyControls.push(control)
            }
         }
      }
   }
   // 脏处理
   if(o._statusDirty){
      // 清空画板
      graphic.prepare(true);
      // 排序控件
      readyControls.sort(o.onSortControl);
      // 绘制处理
      var readyCount = readyControls.count();
      for(var i = 0; i < readyCount; i++){
         var control = readyControls.at(i);
         o.processControl(control);
      }
      o._statusDirty = false;
   }else{
      // 获得脏的控件集合
      var dirtyControls = o._dirtyControls;
      dirtyControls.clear();
      var readCount = readyControls.count();
      for(var i = 0; i < readCount; i++){
         var control = readyControls.at(i);
         if(control.testDirty()){
            var controlRectangle = control.clientRectangle();
            dirtyControls.push(control);
            // 处理所有位置有交叉的控件
            control._flagDirty = true;
            o.filterByRectangle(dirtyControls, controlRectangle)
         }
      }
      // 排序控件
      dirtyControls.sort(o.onSortControl);
      // 绘制处理
      var dirtyCount = dirtyControls.count();
      if(dirtyCount){
         graphic.prepare(false);
         for(var i = 0; i < dirtyCount; i++){
            var control = dirtyControls.at(i);
            // 清空控件
            var clientRectangle = control.clientRectangle();
            if(!clientRectangle.isEmpty()){
               graphic.clearRectangle(clientRectangle);
            }
         }
         // 重绘所有脏的控件
         for(var i = 0; i < dirtyCount; i++){
            var control = dirtyControls.at(i);
            o.processControl(control);
         }
      }
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiCanvasManager_dispose = function FGuiCanvasManager_dispose(){
   var o = this;
   o._readyControls = MO.Lang.Object.dispose(o._readyControls);
   o._dirtyControls = MO.Lang.Object.dispose(o._dirtyControls);
   o._paintEvent = MO.Lang.Object.dispose(o._paintEvent);
   // 父处理
   o.__base.FGuiManager.dispose.call(o);
}
