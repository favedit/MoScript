//==========================================================
// <T>驾驶舱趋势天消息。</T>
//
// @class
// @author maocy
// @history 151107
//==========================================================
MO.FEaiCockpitWarningMessageFetchPageType = function FEaiCockpitWarningMessageFetchPageType(o) {
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._typeString = MO.Class.register(o, [new MO.AGetter('_typeString'), new MO.APersistence('_typeString', MO.EDataType.String)]);
   return o;
}