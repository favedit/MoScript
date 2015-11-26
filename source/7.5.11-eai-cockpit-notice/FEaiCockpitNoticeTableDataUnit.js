//==========================================================
// <T>号令列表。</T>
//
// @class
// @author maocy
// @history 151120
//==========================================================
MO.FEaiCockpitNoticeTableDataUnit = function FEaiCockpitNoticeTableDataUnit(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._valueCount      = MO.Class.register(o, [new MO.AGetter('_valueCount'), new MO.APersistence('_valueCount', MO.EDataType.Int32)]);
   o._noticeType      = MO.Class.register(o, [new MO.AGetter('_noticeType'), new MO.APersistence('_noticeType', MO.EDataType.Int32)]);
   o._title       = MO.Class.register(o, [new MO.AGetter('_title'), new MO.APersistence('_title', MO.EDataType.String)]);
   o._date      = MO.Class.register(o, [new MO.AGetter('_date'), new MO.APersistence('_date', MO.EDataType.String)]);
   o._readCount = MO.Class.register(o, [new MO.AGetter('_readCount'), new MO.APersistence('_readCount', MO.EDataType.Int32)]);
   o._important		= MO.Class.register(o, [new MO.AGetter('_important'), new MO.APersistence('_important', MO.EDataType.Int32)]);
   return o;
}