//==========================================================
// <T>驾驶舱业绩。</T>
//
// @class
// @author maocy
// @history 151106
//==========================================================
MO.FEaiCockpitMessageForecastUnitData = function FEaiCockpitMessageForecastUnitData(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._data         = MO.Class.register(o, [new MO.AGetter('_data'),  new MO.APersistence('_data', MO.EDataType.Double)]);
   return o;
}
