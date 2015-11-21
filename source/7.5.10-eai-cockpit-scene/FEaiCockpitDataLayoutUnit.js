//==========================================================
// <T>驾驶舱业绩。</T>
//
// @class
// @author sunpeng
// @history 151118
//==========================================================
MO.FEaiCockpitDataLayoutUnit = function FEaiCockpitDataLayoutUnit(o) {
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._moduleName = MO.Class.register(o, [new MO.AGetter('_moduleName'), new MO.APersistence('_moduleName', MO.EDataType.String)]);
   o._location = MO.Class.register(o, [new MO.AGetter('_location'), new MO.APersistence('_location', MO.EDataType.Struct, MO.SValue3, MO.EDataType.Int32)]);
   o._size = MO.Class.register(o, [new MO.AGetter('_size'), new MO.APersistence('_size', MO.EDataType.Struct, MO.SValue2, MO.EDataType.Int32)]);
   return o;
}
