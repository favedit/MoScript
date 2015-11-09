//==========================================================
// <T>驾驶舱业绩部门。</T>
//
// @class
// @author maocy
// @history 151106
//==========================================================
MO.FEaiCockpitMessageForecastUnit = function FEaiCockpitMessageForecastUnit(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._count       = MO.Class.register(o, [new MO.AGetter('_Count'), new MO.APersistence('_customerCount', MO.EDataType.Int32)]);
   o._label       = MO.Class.register(o, [new MO.AGetter('_label'), new MO.APersistence('_label', MO.EDataType.String)]);
   o._data       = MO.Class.register(o, [new MO.AGetter('_datas'), new MO.APersistence('_customerTotal',MO.EDataType.Objects,MO.FEaiCockpitMessageForecastUnitData)]);
   return o;
}
