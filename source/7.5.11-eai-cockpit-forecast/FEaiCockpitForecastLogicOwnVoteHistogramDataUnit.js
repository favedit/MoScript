//==========================================================
// <T>大额自投柱状图数据。</T>
//
// @class
// @author maocy
// @history 151120
//==========================================================
MO.FEaiCockpitForecastLogicOwnVoteHistogramDataUnit = function FEaiCockpitForecastLogicOwnVoteHistogramDataUnit(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // 所属公司
   o._department    = MO.Class.register(o, [new MO.AGetter('_department'), new MO.APersistence('_department', MO.EDataType.String)]);
   // 理财师人数
   o._marketerCount = MO.Class.register(o, [new MO.AGetter('_marketerCount'), new MO.APersistence('_marketerCount', MO.EDataType.Int32)]);
   return o;
}