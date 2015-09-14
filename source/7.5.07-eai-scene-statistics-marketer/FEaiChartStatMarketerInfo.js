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
   o._investmentTotal = MO.Class.register(o, [new MO.AGetter('_investmentTotal'), new MO.APersistence('_investmentTotal', MO.EDataType.Double)]);
   o._customerCount   = MO.Class.register(o, [new MO.AGetter('_customerCount'), new MO.APersistence('_customerCount', MO.EDataType.Uint32)]);
   o._investmentAvg   = MO.Class.register(o, [new MO.AGetter('_investmentAvg'), new MO.APersistence('_investmentAvg', MO.EDataType.Double)]);
   // @attribute
   o._provinces       = MO.Class.register(o, [new MO.AGetter('_provinces'), new MO.APersistence('_provinces', MO.EDataType.Objects, MO.FEaiChartStatMarketerInfoProvince)]);
   return o;
}
