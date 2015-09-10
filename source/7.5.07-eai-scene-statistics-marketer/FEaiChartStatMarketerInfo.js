//==========================================================
// <T>省份投资数据。</T>
//
// @class
// @author maocy
// @history 150910
//==========================================================
MO.FEaiChartStatMarketerInfo = function FEaiChartStatMarketerInfo(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._provinces = MO.Class.register(o, [new MO.AGetter('_provinces'), new MO.APersistence('_provinces', MO.EDataType.Objects, MO.FEaiChartStatMarketerInfoProvince)]);
   return o;
}
