//==========================================================
// <T>驾驶舱业绩。</T>
//
// @class
// @author maocy
// @history 151106
//==========================================================
MO.FEaiCockpitMessageForecast = function FEaiCockpitMessageForecast(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._items = MO.Class.register(o, [new MO.AGetter('_items'), new MO.APersistence('_items', MO.EDataType.Objects, MO.FEaiCockpitMessageForecastItem)]);
   return o;
}
