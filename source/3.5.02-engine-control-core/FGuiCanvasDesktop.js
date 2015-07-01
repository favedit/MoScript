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
   // @attribute
   o._controlRectangle = null;
   //..........................................................
   // @method
   o.construct      = MO.FGuiCanvasDesktop_construct;
   // @method
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
MO.FGuiCanvasDesktop_construct = function FGuiCanvasDesktop_construct(){
   var o = this;
   o.__base.FGuiDesktop.construct.call(o);
   o._controlRectangle = new MO.SRectangle();
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FGuiCanvasDesktop_processControl = function FGuiCanvasDesktop_processControl(control){
   var o = this;
   o.__base.FGuiDesktop.process.call(o);
   // 获得渲染对象
   var graphic = o._canvas.context();
   // 计算尺寸
   //var rectangle = o._controlRectangle;
   //rectangle.setLocation(control.location(), control.size());
   // 绘制处理
   var event = MO.Memory.alloc(MO.SGuiPaintEvent)
   event.graphic = graphic;
   //event.rectangle.assign(rectangle);
   event.rectangle.reset();
   control.paint(event);
   MO.Memory.free(event);
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
   o._controlRectangle = RObject.dispose(o._controlRectangle);
   // 父处理
   o.__base.FGuiDesktop.dispose.call(o);
}
