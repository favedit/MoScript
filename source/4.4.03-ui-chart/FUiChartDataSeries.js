//==========================================================
// <T>图表数据序列。</T>
//
// @class
// @author maocy
// @version 151124
//==========================================================
MO.FUiChartDataSeries = function FUiChartDataSeries(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._dataset           = MO.Class.register(o, new MO.AGetSet('_dataset'));
   // @attribute
   o._values            = MO.Class.register(o, new MO.AGetSet('_values'));
   // @attribute
   o._lineColor         = MO.Class.register(o, new MO.AGetSet('_lineColor'), '#FFFFFF');
   o._lineWidth         = MO.Class.register(o, new MO.AGetSet('_lineWidth'), 1);
   o._rectWidth         = MO.Class.register(o, new MO.AGetSet('_rectWidth'), 10);
   o._rectMargin        = MO.Class.register(o, new MO.AGetSet('_rectMargin'), 4);
   o._fillColor         = MO.Class.register(o, new MO.AGetSet('_fillColor'), '#FFFFFF');
   o._fillGradient      = MO.Class.register(o, new MO.AGetSet('_fillGradient'));
   o._optionShowBorder  = MO.Class.register(o, new MO.AGetSet('_optionShowBorder'), true);
   // @attribute
   o._dotSize           = MO.Class.register(o, new MO.AGetSet('_dotSize'), 1);
   o._dotColor          = MO.Class.register(o, new MO.AGetSet('_dotColor'), '#FFFFFF');
   o._optionShowDot     = MO.Class.register(o, new MO.AGetSet('_optionShowDot'), false);
   //..........................................................
   // @method
   o.construct          = MO.FUiChartDataSeries_construct;
   // @method
   o.dispose            = MO.FUiChartDataSeries_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FUiChartDataSeries_construct = function FUiChartDataSeries_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   // 配置属性
   o._values = new MO.TObjects();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FUiChartAxis_dispose = function FUiChartAxis_dispose(){
   var o = this;
   // 释放属性
   o._values = MO.Lang.Object.dispose(o._values);
   // 父处理
   o.__base.FObject.dispose.call(o);
}
