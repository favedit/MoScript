//==========================================================
// <T>大额自投数据。</T>
//
// @class
// @author maocy
// @history 151120
//==========================================================
MO.FEaiCockpitForecastLogicOwnVoteData   = function FEaiCockpitForecastLogicOwnVoteData(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   // 表格
   o._investmentSelf = MO.Class.register(o, [new MO.AGetter('_investmentSelf'),new MO.APersistence('_investmentSelf',MO.EDataType.Objects, MO.FEaiCockpitForecastLogicOwnVoteDataUnit)]);
   return o;
}