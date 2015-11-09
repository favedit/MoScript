//==========================================================
// <T>驾驶舱业绩。</T>
//
// @class
// @author sunpeng
// @history 151108
//==========================================================
MO.FEaiCockpitDataProjectUnit = function FEaiCockpitDataProjectUnit(o) {
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._name              = MO.Class.register(o, [new MO.AGetter('_name'), new MO.APersistence('_name', MO.EDataType.String)]);
   o._uname             = MO.Class.register(o, [new MO.AGetter('_uname'), new MO.APersistence('_uname', MO.EDataType.String)]);
   o._priority          = MO.Class.register(o, [new MO.AGetter('_priority'), new MO.APersistence('_priority', MO.EDataType.Int32)]);
   o._status            = MO.Class.register(o, [new MO.AGetter('_status'), new MO.APersistence('_status', MO.EDataType.Int32)]);
   o._timeKey           = MO.Class.register(o, [new MO.AGetter('_timeKey'), new MO.APersistence('_timeKey', MO.EDataType.String)]);
   o._timeProgress      = MO.Class.register(o, [new MO.AGetter('_timeProgress'), new MO.APersistence('_timeProgress', MO.EDataType.Int32)]);
   o._proKey            = MO.Class.register(o, [new MO.AGetter('_proKey'), new MO.APersistence('_proKey', MO.EDataType.String)]);
   o._proProgress       = MO.Class.register(o, [new MO.AGetter('_proProgress'), new MO.APersistence('_proProgress', MO.EDataType.Int32)]);
   return o;
}
