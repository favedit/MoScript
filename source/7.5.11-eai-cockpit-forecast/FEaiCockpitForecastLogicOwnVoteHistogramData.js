//==========================================================
// <T>大额自投状图数据。</T>
//
// @class
// @author maocy
// @history 151120
//==========================================================
MO.FEaiCockpitForecastLogicOwnVoteHistogramData   = function FEaiCockpitForecastLogicOwnVoteHistogramData(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   // 柱状图
   o._histogram = MO.Class.register(o, [new MO.AGetter('_histogram'),new MO.APersistence('_histogram',MO.EDataType.Objects, MO.FEaiCockpitForecastLogicOwnVoteHistogramDataUnit)]);
   return o;
}