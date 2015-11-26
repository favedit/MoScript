//==========================================================
// <T>号令数据。</T>
//
// @class
// @author maocy
// @history 151120
//==========================================================
MO.FEaiCockpitNoticeDynamicNewestData   = function FEaiCockpitNoticeDynamicNewestData(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._noticePrograss   = MO.Class.register(o, [new MO.AGetter('_noticePrograss'),new MO.APersistence('_noticePrograss',MO.EDataType.Objects, MO.FEaiCockpitNoticeDynamicNewestDataUnit)]);
   return o;
}