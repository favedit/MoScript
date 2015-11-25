//==========================================================
// <T>驾驶舱趋势天消息。</T>
//
// @class
// @author maocy
// @history 151107
//==========================================================
MO.FEaiCockpitAchievementMessageTitleAchieve = function FEaiCockpitAchievementMessageTitleAchieve(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._investmentAmount    = MO.Class.register(o, [new MO.AGetter('_investmentAmount'), new MO.APersistence('_investmentAmount', MO.EDataType.Double)]);
   o._redemptionAmount    = MO.Class.register(o, [new MO.AGetter('_redemptionAmount'), new MO.APersistence('_redemptionAmount', MO.EDataType.Double)]);
   o._netinvestmentAmount = MO.Class.register(o, [new MO.AGetter('_netinvestmentAmount'), new MO.APersistence('_netinvestmentAmount', MO.EDataType.Double)]);
   // @attribute
   o._investmentMonth       = MO.Class.register(o, [new MO.AGetter('_investmentMonth'), new MO.APersistence('_investmentMonth', MO.EDataType.Double)]);
   o._redemptionMonth        = MO.Class.register(o, [new MO.AGetter('_redemptionMonth'), new MO.APersistence('_redemptionMonth', MO.EDataType.Double)]);
   o._netinvestmentMonth     = MO.Class.register(o, [new MO.AGetter('_netinvestmentMonth'), new MO.APersistence('_netinvestmentMonth', MO.EDataType.Double)]);
   return o;
}