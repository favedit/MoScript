//==========================================================
// <T>号令列表数据。</T>
//
// @class
// @author maocy
// @history 151120
//==========================================================
MO.FEaiCockpitNoticeTableData  = function FEaiCockpitNoticeTableData(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // // @attribute
   o._noticeList  = MO.Class.register(o, [new MO.AGetter('_noticeList'), new MO.APersistence('_noticeList', MO.EDataType.Objects, MO.FEaiCockpitNoticeTableDataUnit)]);
   return o;
}