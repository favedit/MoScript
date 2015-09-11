//==========================================================
// <T>省份投资数据信息。</T>
//
// @class
// @author maocy
// @history 150910
//==========================================================
MO.FEaiChartStatMarketerInfoProvince = function FEaiChartStatMarketerInfoProvince(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._code            = MO.Class.register(o, [new MO.AGetter('_code'), new MO.APersistence('_code', MO.EDataType.String)]);
   o._label           = MO.Class.register(o, [new MO.AGetter('_label'), new MO.APersistence('_label', MO.EDataType.String)]);
   o._investmentTotal = MO.Class.register(o, [new MO.AGetter('_investmentTotal'), new MO.APersistence('_investmentTotal', MO.EDataType.Double)]);
   o._customerCount   = MO.Class.register(o, [new MO.AGetter('_customerCount'), new MO.APersistence('_customerCount', MO.EDataType.Uint32)]);
   o._investmentAvg   = MO.Class.register(o, [new MO.AGetter('_investmentAvg'), new MO.APersistence('_investmentAvg', MO.EDataType.Double)]);
   return o;
}
