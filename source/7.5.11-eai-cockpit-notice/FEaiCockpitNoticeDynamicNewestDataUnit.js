//==========================================================
// <T>最新号令。</T>
//
// @class
// @author maocy
// @history 151120
//==========================================================
MO.FEaiCockpitNoticeDynamicNewestDataUnit = function FEaiCockpitNoticeDynamicNewestDataUnit(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._valueCount      = MO.Class.register(o, [new MO.AGetter('_valueCount'), new MO.APersistence('_valueCount', MO.EDataType.Int32)]);
   o._department      = MO.Class.register(o, [new MO.AGetter('_department'), new MO.APersistence('_department', MO.EDataType.String)]);
   o._readprogress    = MO.Class.register(o, [new MO.AGetter('_readprogress'), new MO.APersistence('_readprogress', MO.EDataType.Double)]);

   return o;
}
