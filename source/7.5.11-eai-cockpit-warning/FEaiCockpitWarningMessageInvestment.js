//==========================================================
// <T>驾驶舱趋势天消息。</T>
//
// @class
// @author maocy
// @history 151107
//==========================================================
MO.FEaiCockpitWarningMessageInvestment = function FEaiCockpitWarningMessageInvestment(o) {
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._date  = MO.Class.register(o, [new MO.AGetter('_date'), new MO.APersistence('_date', MO.EDataType.String)]);
   o._title = MO.Class.register(o, [new MO.AGetter('_title'), new MO.APersistence('_title', MO.EDataType.String)]);
   o._text  = MO.Class.register(o, [new MO.AGetter('_text'), new MO.APersistence('_text', MO.EDataType.String)]);
   o._items = MO.Class.register(o, [new MO.AGetter('_items'), new MO.APersistence('_items', MO.EDataType.Objects, MO.FEaiCockpitWarningMessageInvestmentItem)]);
   return o;
}