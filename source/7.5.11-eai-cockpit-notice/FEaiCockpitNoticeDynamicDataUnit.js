//==========================================================
// <T>号令动态列表。</T>
//
// @class
// @author maocy
// @history 151120
//==========================================================
MO.FEaiCockpitNoticeDynamicDataUnit = function FEaiCockpitNoticeDynamicDataUnit(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._valueCount      = MO.Class.register(o, [new MO.AGetter('_valueCount'), new MO.APersistence('_valueCount', MO.EDataType.Int32)]);
   o._department      = MO.Class.register(o, [new MO.AGetter('_department'), new MO.APersistence('_department', MO.EDataType.String)]);
   o._readName        = MO.Class.register(o, [new MO.AGetter('_readName'), new MO.APersistence('_readName', MO.EDataType.String)]);
   o._readDate        = MO.Class.register(o, [new MO.AGetter('_readDate'), new MO.APersistence('_readDate', MO.EDataType.String)]);
   return o;
}