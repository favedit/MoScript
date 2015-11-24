//==========================================================
// <T>界面图表。</T>
//
// @class
// @author maocy
// @version 151124
//==========================================================
MO.FGuiChartLinePainter = function FGuiChartLinePainter(o) {
   o = MO.Class.inherits(this, o, MO.FGuiChartPainter);
   //..........................................................
   // @attribute
   o._paintContext = null;
   //..........................................................
   // @event
   o.onPaintBegin  = MO.FGuiChartLinePainter_onPaintBegin;
   //..........................................................
   // @method
   o.construct     = MO.FGuiChartLinePainter_construct;
   // @method
   o.draw          = MO.FGuiChartLinePainter_draw;
   // @method
   o.dispose       = MO.FGuiChartLinePainter_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiChartLinePainter_construct = function FGuiChartLinePainter_construct() {
   var o = this;
   o.__base.FGuiChartPainter.construct.call(o);
   // 设置变量
   o._paintContext = new MO.SGuiGridPaintContext();
}

//==========================================================
// <T>绘制处理。</T>
//
// @method
// @param context 内容
//==========================================================
MO.FGuiChartLinePainter_draw = function FGuiChartLinePainter_draw(context){
   var o = this;
   o.__base.FGuiChartPainter.draw.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiChartLinePainter_dispose = function FGuiChartLinePainter_dispose() {
   var o = this;
   // 释放变量
   o._paintContext = MO.Lang.Object.dispose(o._paintContext);
   // 父处理
   o.__base.FGuiChartPainter.dispose.call(o);
}
