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
   o._axisX          = MO.Class.register(o, new MO.AGetter('_axisX'));
   o._axisY          = MO.Class.register(o, new MO.AGetter('_axisY'));
   o._title          = MO.Class.register(o, new MO.AGetSet('_title'));
   o._titleFont      = MO.Class.register(o, new MO.AGetter('_titleFont'));
   o._titleGap       = MO.Class.register(o, new MO.AGetSet('_titleGap'), 2);
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
   event.axisX = o._axisX;
   event.axisY = o._axisY;
   event.paintRectangle = o._paintRectangle;
   event.title = o._title;
   event.titleFont = o._titleFont;
   event.titleGap = o._titleGap;
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
   o._axisX = MO.Class.create(MO.FUiChartAxis);
   o._axisY = MO.Class.create(MO.FUiChartAxis);
   o._titleFont = new MO.SUiFont();
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
