//==========================================================
// <T>驾驶舱业绩。</T>
//
// @class
// @author maocy
// @history 151106
//==========================================================
MO.FEaiCockpitMessageForecastItemUnit = function FEaiCockpitMessageForecastItemUnit(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._value = MO.Class.register(o, [new MO.AGetter('_value'),  new MO.APersistence('_value', MO.EDataType.Double)]);
   return o;
}
