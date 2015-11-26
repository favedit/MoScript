//==========================================================
// <T>最新号令。</T>
//
// @class
// @author maocy
// @history 151120
//==========================================================
MO.FEaiCockpitNoticeNewestData = function FEaiCockpitNoticeNewestData(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._title      = MO.Class.register(o, [new MO.AGetter('_title'), new MO.APersistence('_title', MO.EDataType.String)]);
   o._publisher      = MO.Class.register(o, [new MO.AGetter('_publisher'), new MO.APersistence('_publisher', MO.EDataType.String)]);
   o._noticeData       = MO.Class.register(o, [new MO.AGetter('_noticeData'), new MO.APersistence('_noticeData', MO.EDataType.String)]);
   o._readprogress = MO.Class.register(o, [new MO.AGetter('_readprogress'), new MO.APersistence('_readprogress', MO.EDataType.Double)]);
   o._noticeContent      = MO.Class.register(o, [new MO.AGetter('_noticeContent'), new MO.APersistence('_noticeContent', MO.EDataType.String)]);
   return o;
}
