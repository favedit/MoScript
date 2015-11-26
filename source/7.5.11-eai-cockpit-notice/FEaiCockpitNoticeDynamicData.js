//==========================================================
// <T>号令数据。</T>
//
// @class
// @author maocy
// @history 151120
//==========================================================
MO.FEaiCockpitNoticeDynamicData   = function FEaiCockpitNoticeDynamicData(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._noticeDynamic   = MO.Class.register(o, [new MO.AGetter('_noticeDynamic'),new MO.APersistence('_noticeDynamic',MO.EDataType.Objects, MO.FEaiCockpitNoticeDynamicDataUnit)]);
   return o;
}