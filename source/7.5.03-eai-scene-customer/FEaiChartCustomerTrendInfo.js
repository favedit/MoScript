//==========================================================
// <T>统计理财师单元。</T>
//
// @class
// @author maocy
// @history 150803
//==========================================================
MO.FEaiChartCustomerTrendInfo = function FEaiChartCustomerTrendInfo(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   // @attribute
   o._investmentTotal = MO.Class.register(o, [new MO.AGetter('_investmentTotal'), new MO.APersistence('_investmentTotal', MO.EDataType.Double)]);
   o._customerTotal   = MO.Class.register(o, [new MO.AGetter('_customerTotal'), new MO.APersistence('_customerTotal', MO.EDataType.Uint32)]);
   //..........................................................
   // @attribute
   o._units           = MO.Class.register(o, [new MO.AGetter('_units'), new MO.APersistence('_units', MO.EDataType.Objects, MO.FEaiChartCustomerTrendUnit)]);
   return o;
}
