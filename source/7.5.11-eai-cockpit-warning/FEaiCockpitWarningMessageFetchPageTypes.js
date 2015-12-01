//==========================================================
// <T>驾驶舱趋势消息。</T>
//
// @class
// @author maocy
// @history 151107
//==========================================================
MO.FEaiCockpitWarningMessageFetchPageTypes = function FEaiCockpitWarningMessageFetchPageTypes(o) {
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._pageType = MO.Class.register(o, [new MO.AGetter('_pageType'), new MO.APersistence('_pageType', MO.EDataType.Objects, MO.FEaiCockpitWarningMessageFetchPageType)]);
   return o;
}
