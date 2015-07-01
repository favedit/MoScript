//==========================================================
// <T>页面对象。</T>
//
// @class
// @author maocy
// @version 150612
//==========================================================
MO.FGuiCanvasDesktop = function FGuiCanvasDesktop(o){
   o = MO.Class.inherits(this, o, MO.FGuiDesktop);
   //..........................................................
   // @attribute
   o._canvas        = MO.Class.register(o, new MO.AGetSet('_canvas'));
   //..........................................................
   // @method
   o.onResize       = MO.FGuiCanvasDesktop_onResize;
   //..........................................................
   // @method
   o.construct      = MO.FGuiCanvasDesktop_construct;
   // @method
   o.processResize  = MO.FGuiCanvasDesktop_processResize;
   o.processControl = MO.FGuiCanvasDesktop_processControl;
   o.process        = MO.FGuiCanvasDesktop_process;
   // @method
   o.dispose        = MO.FGuiCanvasDesktop_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiCanvasDesktop_onResize = function FGuiCanvasDesktop_onResize(event){
   //this.processResize(event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiCanvasDesktop_construct = function FGuiCanvasDesktop_construct(){
   var o = this;
   o.__base.FGuiDesktop.construct.call(o);
   // 注册事件
   MO.RWindow.lsnsResize.register(o, o.onResize);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FGuiCanvasDesktop_processResize = function FGuiCanvasDesktop_processResize(control){
   //control.psResize();
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FGuiCanvasDesktop_processControl = function FGuiCanvasDesktop_processControl(control){
   var o = this;
   o.__base.FGuiDesktop.process.call(o);
   // 检查准备好
   if(!control.testReady()){
      //return false;
   }
   // 检查是否脏
   if(!control.testDirty()){
      //return false;
   }
   // 获得尺寸
   var graphic = o._canvas.context();
   var size = graphic.size();
   // 绘制处理
   var event = MO.Memory.alloc(MO.SGuiPaintEvent)
   event.graphic = graphic;
   event.parentRectangle.set(0, 0, size.width, size.height);
   event.clientRectangle.set(control.location().x, control.location().y, control.size().width, control.size().height);
   event.rectangle.reset();
   control.paint(event);
   MO.Memory.free(event);
   return true;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FGuiCanvasDesktop_process = function FGuiCanvasDesktop_process(){
   var o = this;
   o.__base.FGuiDesktop.process.call(o);
   // 清空画板
   var graphic = o._canvas.context();
   graphic.clear();
   // 渲染处理
   var controls = o._controls;
   var count = controls.count();
   for(var i = 0; i < count; i++){
      var control = controls.at(i);
      if(control.visible()){
         o.processControl(control);
      }
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiCanvasDesktop_dispose = function FGuiCanvasDesktop_dispose(){
   var o = this;
   // 父处理
   o.__base.FGuiDesktop.dispose.call(o);
}
