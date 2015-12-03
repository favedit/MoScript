//==========================================================
// <T>驾驶舱项目管理。</T>
//
// @class
// @author zhaoyihan
// @history 151202
//==========================================================
MO.FEaiCockpitProjectContentDataUnit = function FEaiCockpitProjectContentDataUnit(o) {
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._name         = MO.Class.register(o, [new MO.AGetter('_name'), new MO.APersistence('_name', MO.EDataType.String)]);
   o._uname        = MO.Class.register(o, [new MO.AGetter('_uname'), new MO.APersistence('_uname', MO.EDataType.String)]);
   o._priority     = MO.Class.register(o, [new MO.AGetter('_priority'), new MO.APersistence('_priority', MO.EDataType.Int32)]);
   o._start        = MO.Class.register(o, [new MO.AGetter('_start'), new MO.APersistence('_start', MO.EDataType.String)]);
   o._end          = MO.Class.register(o, [new MO.AGetter('_end'), new MO.APersistence('_end', MO.EDataType.String)]);
   o._timeProgress = MO.Class.register(o, [new MO.AGetter('_timeProgress'), new MO.APersistence('_timeProgress', MO.EDataType.Double)]);
   o._proProgress  = MO.Class.register(o, [new MO.AGetter('_proProgress'), new MO.APersistence('_proProgress', MO.EDataType.Double)]);
   o._marquees     = MO.Class.register(o, [new MO.AGetter('_marquees'), new MO.APersistence('_marquees', MO.EDataType.Objects, MO.FEaiCockpitProjectContentDataMarqueeUnit)]);
   return o;
}
