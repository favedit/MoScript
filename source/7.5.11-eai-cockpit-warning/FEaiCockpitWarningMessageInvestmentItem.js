//==========================================================
// <T>驾驶舱趋势天消息。</T>
//
// @class
// @author maocy
// @history 151107
//==========================================================
MO.FEaiCockpitWarningMessageInvestmentItem = function FEaiCockpitWarningMessageInvestmentItem(o) {
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._count  = MO.Class.register(o, [new MO.AGetter('_count'), new MO.APersistence('_count', MO.EDataType.Double)]);
   o._name   = MO.Class.register(o, [new MO.AGetter('_name'), new MO.APersistence('_name', MO.EDataType.String)]);
   return o;
}