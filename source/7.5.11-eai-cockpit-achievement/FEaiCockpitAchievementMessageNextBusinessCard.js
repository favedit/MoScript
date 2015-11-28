//==========================================================
// <T>驾驶舱趋势消息。</T>
//
// @class
// @author wangfan
// @history 151107
//==========================================================
MO.FEaiCockpitMessageAchievementNextBusinessCard = function FEaiCockpitMessageAchievementNextBusinessCard(o) {
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   o._comingSoon = true;
   //..........................................................
   // @attribute
   //公司名称
   o._businessName = MO.Class.register(o, [new MO.AGetter('_businessName'), new MO.APersistence('_businessName', MO.EDataType.String)]);
   //公司负责人
   o._departmentLeader = MO.Class.register(o, [new MO.AGetter('_departmentLeader'), new MO.APersistence('_departmentLeader', MO.EDataType.String)]);
   //分公司数
   o._departmentCount = MO.Class.register(o, [new MO.AGetter('_departmentCount'), new MO.APersistence('_departmentCount', MO.EDataType.Int32)]);
   //理财师人数
   o._marketerCount = MO.Class.register(o, [new MO.AGetter('_marketerCount'), new MO.APersistence('_marketerCount', MO.EDataType.Int32)]);
   //当日投资
   o._investmentCount = MO.Class.register(o, [new MO.AGetter('_investmentCount'), new MO.APersistence('_investmentCount', MO.EDataType.Double)]);
   //当日赎回
   o._redemptionCount = MO.Class.register(o, [new MO.AGetter('_redemptionCount'), new MO.APersistence('_redemptionCount', MO.EDataType.Double)]);
   //当日净投
   o._netinvestmentCount = MO.Class.register(o, [new MO.AGetter('_netinvestmentCount'), new MO.APersistence('_netinvestmentCount', MO.EDataType.Double)]);
   //赎回率
   o._redemptionRate = MO.Class.register(o, [new MO.AGetter('_redemptionRate'), new MO.APersistence('_redemptionRate', MO.EDataType.Double)]);
   return o;
}
