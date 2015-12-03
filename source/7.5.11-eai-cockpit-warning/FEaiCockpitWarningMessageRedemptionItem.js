//==========================================================
// <T>驾驶舱趋势天消息。</T>
//
// @class
// @author maocy
// @history 151107
//==========================================================
MO.FEaiCockpitWarningMessageRedemptionItem = function FEaiCockpitWarningMessageRedemptionItem(o) {
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._date   = MO.Class.register(o, [new MO.AGetter('_date'), new MO.APersistence('_date', MO.EDataType.String)]);
   o._invest  = MO.Class.register(o, [new MO.AGetter('_invest'), new MO.APersistence('_invest', MO.EDataType.Double)]);
   o._redemp  = MO.Class.register(o, [new MO.AGetter('_redemp'), new MO.APersistence('_redemp', MO.EDataType.Double)]);
   return o;
}