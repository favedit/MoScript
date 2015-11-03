//==========================================================
// <T>驾驶舱业绩部门。</T>
//
// @class
// @author maocy
// @history 151103
//==========================================================
MO.FEaiCockpitLogicAchievementDepartment = function FEaiCockpitLogicAchievementDepartment(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._label               = MO.Class.register(o, [new MO.AGetter('_label'), new MO.APersistence('_label', MO.EDataType.String)]);
   o._investmentAmount    = MO.Class.register(o, [new MO.AGetter('_investmentAmount'), new MO.APersistence('_investmentAmount', MO.EDataType.Double)]);
   o._redemptionAmount    = MO.Class.register(o, [new MO.AGetter('_redemptionAmount'), new MO.APersistence('_redemptionAmount', MO.EDataType.Double)]);
   o._netinvestmentAmount = MO.Class.register(o, [new MO.AGetter('_netinvestmentAmount'), new MO.APersistence('_netinvestmentAmount', MO.EDataType.Double)]);
   o._marketerCount       = MO.Class.register(o, [new MO.AGetter('_marketerCount'), new MO.APersistence('_marketerCount', MO.EDataType.Int32)]);
   o._marketerTotal       = MO.Class.register(o, [new MO.AGetter('_marketerTotal'), new MO.APersistence('_marketerTotal', MO.EDataType.Int32)]);
   o._customerCount       = MO.Class.register(o, [new MO.AGetter('_customerCount'), new MO.APersistence('_customerCount', MO.EDataType.Int32)]);
   o._customerTotal       = MO.Class.register(o, [new MO.AGetter('_customerTotal'), new MO.APersistence('_customerTotal', MO.EDataType.Int32)]);
   return o;
}
