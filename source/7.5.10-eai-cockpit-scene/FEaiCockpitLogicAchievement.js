//==========================================================
// <T>驾驶舱业绩。</T>
//
// @class
// @author maocy
// @history 151103
//==========================================================
MO.FEaiCockpitLogicAchievement = function FEaiCockpitLogicAchievement(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._investmentTotal     = MO.Class.register(o, [new MO.AGetter('_investmentTotal'), new MO.APersistence('_investmentTotal', MO.EDataType.Double)]);
   o._redemptionTotal     = MO.Class.register(o, [new MO.AGetter('_redemptionTotal'), new MO.APersistence('_redemptionTotal', MO.EDataType.Double)]);
   o._netinvestmentAmount = MO.Class.register(o, [new MO.AGetter('_netinvestmentAmount'), new MO.APersistence('_netinvestmentAmount', MO.EDataType.Double)]);
   // @attribute
   o._departments         = MO.Class.register(o, [new MO.AGetter('_departments'), new MO.APersistence('_departments', MO.EDataType.Objects, MO.FEaiCockpitLogicAchievementDepartment)]);
   return o;
}
