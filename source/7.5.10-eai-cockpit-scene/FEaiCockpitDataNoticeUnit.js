//==========================================================
// <T>驾驶舱业绩。</T>
//
// @class
// @author sunpeng
// @history 151106
//==========================================================
MO.FEaiCockpitDataNoticeUnit = function FEaiCockpitDataNoticeUnit(o) {
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._label       = MO.Class.register(o, [new MO.AGetter('_label'), new MO.APersistence('_label', MO.EDataType.String)]);
   o._userName    = MO.Class.register(o, [new MO.AGetter('_userName'), new MO.APersistence('_userName', MO.EDataType.String)]);
   o._publishDate = MO.Class.register(o, [new MO.AGetter('_publishDate'), new MO.APersistence('_publishDate', MO.EDataType.String)]);
   o._viewCount   = MO.Class.register(o, [new MO.AGetter('_viewCount'), new MO.APersistence('_viewCount', MO.EDataType.Int32)]);
   o._userCount   = MO.Class.register(o, [new MO.AGetter('_userCount'), new MO.APersistence('_userCount', MO.EDataType.Int32)]);
   return o;
}
