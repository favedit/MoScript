//==========================================================
// <T>驾驶舱业绩部门。</T>
//
// @class
// @author maocy
// @history 151106
//==========================================================
MO.FEaiCockpitForecastMessageItem = function FEaiCockpitForecastMessageItem(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._label = MO.Class.register(o, [new MO.AGetter('_label'), new MO.APersistence('_label', MO.EDataType.String)]);
   o._units = MO.Class.register(o, [new MO.AGetter('_units'), new MO.APersistence('_units', MO.EDataType.Objects, MO.FEaiCockpitForecastMessageItemUnit)]);
   return o;
}
