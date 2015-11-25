//==========================================================
// <T>界面图表。</T>
//
// @class
// @author maocy
// @version 151124
//==========================================================
MO.FGuiChartPainter = function FGuiChartPainter(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   //..........................................................
   // @attribute
   o._chart    = MO.Class.register(o, new MO.AGetSet('_chart'));
   //..........................................................
   // @method
   o.construct = MO.FGuiChartPainter_construct;
   // @method
   o.draw      = MO.FGuiChartPainter_draw;
   // @method
   o.dispose   = MO.FGuiChartPainter_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiChartPainter_construct = function FGuiChartPainter_construct(){
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   // 设置变量
}

//==========================================================
// <T>绘制处理。</T>
//
// @method
// @param context 内容
//==========================================================
MO.FGuiChartPainter_draw = function FGuiChartPainter_draw(context){
   var o = this;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiChartPainter_dispose = function FGuiChartPainter_dispose(){
   var o = this;
   // 父处理
   o.__base.FGuiControl.dispose.call(o);
}
