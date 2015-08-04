//==========================================================
// <T>界面控件。</T>
//
// @class
// @author maocy
// @version 150804
//==========================================================
MO.FGuiGridControl = function FGuiGridControl(o){
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   //..........................................................
   // @attribute
   //..........................................................
   // @method
   o.onPaintBegin  = MO.FGuiGridControl_onPaintBegin;
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FGuiGridControl_onPaintBegin = function FGuiGridControl_onPaintBegin(event){
   var o = this;
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   // 绘制边框
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   graphic.drawRectangle(rectangle.left, rectangle.top, rectangle.width, rectangle.height, '#FF0000', 1);
}
