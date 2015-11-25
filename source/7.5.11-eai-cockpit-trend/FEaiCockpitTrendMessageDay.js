//==========================================================
// <T>驾驶舱趋势天消息。</T>
//
// @class
// @author maocy
// @history 151107
//==========================================================
MO.FEaiCockpitTrendMessageDay = function FEaiCockpitTrendMessageDay(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._priorRecordDate          = MO.Class.register(o, [new MO.AGetter('_priorRecordDate'), new MO.APersistence('_priorRecordDate', MO.EDataType.String)]);
   o._priorInvestmentAmount    = MO.Class.register(o, [new MO.AGetter('_priorInvestmentAmount'), new MO.APersistence('_priorInvestmentAmount', MO.EDataType.Double)]);
   o._priorRedemptionAmount    = MO.Class.register(o, [new MO.AGetter('_priorRedemptionAmount'), new MO.APersistence('_priorRedemptionAmount', MO.EDataType.Double)]);
   o._priorNetinvestmentAmount = MO.Class.register(o, [new MO.AGetter('_priorNetinvestmentAmount'), new MO.APersistence('_priorNetinvestmentAmount', MO.EDataType.Double)]);
   // @attribute
   o._recordDate               = MO.Class.register(o, [new MO.AGetter('_recordDate'), new MO.APersistence('_recordDate', MO.EDataType.String)]);
   o._investmentAmount         = MO.Class.register(o, [new MO.AGetter('_investmentAmount'), new MO.APersistence('_investmentAmount', MO.EDataType.Double)]);
   o._redemptionAmount         = MO.Class.register(o, [new MO.AGetter('_redemptionAmount'), new MO.APersistence('_redemptionAmount', MO.EDataType.Double)]);
   o._netinvestmentAmount      = MO.Class.register(o, [new MO.AGetter('_netinvestmentAmount'), new MO.APersistence('_netinvestmentAmount', MO.EDataType.Double)]);
   return o;
}
