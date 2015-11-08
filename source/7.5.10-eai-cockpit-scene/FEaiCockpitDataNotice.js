//==========================================================
// <T>驾驶舱业绩。</T>
//
// @class
// @author sunpeng
// @history 151106
//==========================================================
MO.FEaiCockpitDataNotice = function FEaiCockpitDataNotice(o) {
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._notices = MO.Class.register(o, [new MO.AGetter('_notices'), new MO.APersistence('_notices', MO.EDataType.Objects, MO.FEaiCockpitDataNoticeUnit)]);
   return o;
}
