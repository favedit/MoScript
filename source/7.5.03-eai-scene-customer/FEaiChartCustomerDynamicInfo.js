//==========================================================
// <T>统计理财师动态数据。</T>
//
// @class
// @author maocy
// @history 150804
//==========================================================
MO.FEaiChartCustomerDynamicInfo = function FEaiChartCustomerDynamicInfo(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._investmentCount = MO.Class.register(o, [new MO.AGetter('_investmentCount'), new MO.APersistence('_investmentCount', MO.EDataType.Double)]);
   o._investmentTotal = MO.Class.register(o, [new MO.AGetter('_investmentTotal'), new MO.APersistence('_investmentTotal', MO.EDataType.Double)]);
   o._customerCount   = MO.Class.register(o, [new MO.AGetter('_customerCount'), new MO.APersistence('_customerCount', MO.EDataType.Int32)]);
   o._customerTotal   = MO.Class.register(o, [new MO.AGetter('_customerTotal'), new MO.APersistence('_customerTotal', MO.EDataType.Int32)]);
   // @attribute
   o._rankUnits       = MO.Class.register(o, [new MO.AGetter('_rankUnits'), new MO.APersistence('_rankUnits', MO.EDataType.Objects, MO.FEaiChartCustomerDynamicRankUnit)]);
   o._units           = MO.Class.register(o, [new MO.AGetter('_units'), new MO.APersistence('_units', MO.EDataType.Objects, MO.FEaiChartCustomerDynamicUnit)]);
   return o;
}
