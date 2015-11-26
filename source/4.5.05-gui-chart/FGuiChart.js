//==========================================================
// <T>界面图表。</T>
//
// @class
// @author maocy
// @version 151124
//==========================================================
MO.FGuiChart = function FGuiChart(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl, MO.MUiChart);
   //..........................................................
   // @attribute
   o._painter        = MO.Class.register(o, new MO.AGetter('_painter'));
   o._paintRectangle = MO.Class.register(o, new MO.AGetter('_paintRectangle'));
   // @attribute
   o._paintContext   = null;
   //..........................................................
   // @event
   o.onPaintBegin    = MO.FGuiChart_onPaintBegin;
   //..........................................................
   // @method
   o.construct       = MO.FGuiChart_construct;
   // @method
   o.selectPainter   = MO.FGuiChart_selectPainter;
   // @method
   o.dispose         = MO.FGuiChart_dispose;
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FGuiChart_onPaintBegin = function FGuiChart_onPaintBegin(event) {
   var o = this;
   event.dataset = o._dataset;
   event.paintRectangle = o._paintRectangle;
   o._painter.draw(event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiChart_construct = function FGuiChart_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o.__base.MUiChart.construct.call(o);
   // 设置变量
   o._paintContext = new MO.SGuiGridPaintContext();
   o._paintRectangle = new MO.SRectangle();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiChart_selectPainter = function FGuiChart_selectPainter(clazz){
   var o = this;
   var painter = o._painter = MO.Class.create(clazz);
   painter.setChart(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiChart_dispose = function FGuiChart_dispose() {
   var o = this;
   // 释放变量
   o._paintContext = MO.Lang.Object.dispose(o._paintContext);
   // 父处理
   o.__base.MUiChart.dispose.call(o);
   o.__base.FGuiControl.dispose.call(o);
}
