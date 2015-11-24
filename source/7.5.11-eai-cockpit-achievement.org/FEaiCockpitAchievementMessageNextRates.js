//==========================================================
// <T>驾驶舱趋势消息。</T>
//
// @class
// @author maocy
// @history 151107
//==========================================================
MO.FEaiCockpitMessageAchievementNextRates = function FEaiCockpitMessageAchievementNextRates(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._Rates = MO.Class.register(o, [new MO.AGetter('_Rates'), new MO.APersistence('_Rates', MO.EDataType.Objects, MO.FEaiCockpitMessageAchievementNextRate)]);
   o._investmentAmount = MO.Class.register(o, [new MO.AGetter('_investmentAmount'), new MO.APersistence('_investmentAmount', MO.EDataType.Double)]);
   return o;
}
