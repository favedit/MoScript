//==========================================================
// <T>页面对象。</T>
//
// @class
// @author maocy
// @version 150612
//==========================================================
MO.FDssGuiManage = function FDssGuiManage(o){
   o = MO.Class.inherits(this, o, MO.FGuiCanvasManage);
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
   o.onSortControl     = MO.FDssGuiManage_onSortControl;
   //..........................................................
   // @method
   o.construct         = MO.FDssGuiManage_construct;
   // @method
   o.filterByRectangle = MO.FDssGuiManage_filterByRectangle;
   // @method
   o.doActionAlpha     = MO.FDssGuiManage_doActionAlpha;
   // @method
   o.processResize     = MO.FDssGuiManage_processResize;
   o.processControl    = MO.FDssGuiManage_processControl;
   o.process           = MO.FDssGuiManage_process;
   // @method
   o.dispose           = MO.FDssGuiManage_dispose;
   return o;
}

//==========================================================
// <T>控件排序。</T>
//
// @method
//==========================================================
MO.FDssGuiManage_onSortControl = function FDssGuiManage_onSortControl(source, target){
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
MO.FDssGuiManage_construct = function FDssGuiManage_construct(){
   var o = this;
   o.__base.FGuiCanvasManage.construct.call(o);
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
MO.FDssGuiManage_filterByRectangle = function FDssGuiManage_filterByRectangle(dirtyControls, rectangle){
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
MO.FDssGuiManage_doActionAlpha = function FDssGuiManage_doActionAlpha(alpha){
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
MO.FDssGuiManage_processResize = function FDssGuiManage_processResize(control){
   //control.psResize();
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FDssGuiManage_processControl = function FDssGuiManage_processControl(control){
   var o = this;
   o.__base.FGuiCanvasManage.process.call(o);
   var graphic = o._canvas.graphicContext();
   var desktop = o._desktop;
   var calculateSize = desktop.calculateSize();
   var calculateRate = desktop.calculateRate()
   // 绘制处理
   var event = o._paintEvent;
   event.optionContainer = true;
   event.graphic = graphic;
   event.parentRectangle.set(0, 0, calculateSize.width, calculateSize.height);
   event.calculateRate = calculateRate;
   event.rectangle.reset();
   control.paint(event);
   // MO.Logger.debug(o, 'Draw control.', control);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FDssGuiManage_process = function FDssGuiManage_process(){
   var o = this;
   o.__base.FGuiCanvasManage.process.call(o);
   // 获得准备好的控件集合
   var readyControls = o._readyControls;
   readyControls.clear();
   var controls = o._controls;
   var count = controls.count();
   for(var i = 0; i < count; i++){
      var control = controls.at(i);
      if(control.processReady()){
         if(control.visible()){
            // 全部脏处理
            if(control.isDirtyAll()){
               o._statusDirty = true;
            }
            // 放入准备好控件
            control._flagDirty = false;
            readyControls.push(control)
         }
      }
   }
   // 脏处理
   // o._statusDirty = true;
   var graphic = o._canvas.graphicContext();
   if(o._statusDirty){
      // 清空画板
      graphic.clear();
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
      //console.log('Dirty control: ' + dirtyCount);
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FDssGuiManage_dispose = function FDssGuiManage_dispose(){
   var o = this;
   o._readyControls = MO.Lang.Object.dispose(o._readyControls);
   o._dirtyControls = MO.Lang.Object.dispose(o._dirtyControls);
   o._paintEvent = MO.Lang.Object.dispose(o._paintEvent);
   // 父处理
   o.__base.FGuiCanvasManage.dispose.call(o);
}
