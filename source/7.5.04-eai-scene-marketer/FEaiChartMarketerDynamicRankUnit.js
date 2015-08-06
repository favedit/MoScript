//==========================================================
// <T>统计理财师单元。</T>
//
// @class
// @author maocy
// @history 150805
//==========================================================
MO.FEaiChartMarketerDynamicRankUnit = function FEaiChartMarketerDynamicRankUnit(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._departmentLabel    = MO.Class.register(o, [new MO.AGetter('_departmentLabel'), new MO.APersistence('_departmentLabel', MO.EDataType.String)]);
   o._marketerLabel      = MO.Class.register(o, [new MO.AGetter('_marketerLabel'), new MO.APersistence('_marketerLabel', MO.EDataType.String)]);
   o._investmentTotal    = MO.Class.register(o, [new MO.AGetter('_investmentTotal'), new MO.APersistence('_investmentTotal', MO.EDataType.Double)]);
   o._redemptionTotal    = MO.Class.register(o, [new MO.AGetter('_redemptionTotal'), new MO.APersistence('_redemptionTotal', MO.EDataType.Double)]);
   o._netinvestmentTotal = MO.Class.register(o, [new MO.AGetter('_netinvestmentTotal'), new MO.APersistence('_netinvestmentTotal', MO.EDataType.Double)]);
   o._interestTotal      = MO.Class.register(o, [new MO.AGetter('_interestTotal'), new MO.APersistence('_interestTotal', MO.EDataType.Double)]);
   o._performanceTotal   = MO.Class.register(o, [new MO.AGetter('_performanceTotal'), new MO.APersistence('_performanceTotal', MO.EDataType.Double)]);
   o._customerRegister   = MO.Class.register(o, [new MO.AGetter('_customerRegister'), new MO.APersistence('_customerRegister', MO.EDataType.Int32)]);
   o._customerTotal      = MO.Class.register(o, [new MO.AGetter('_customerTotal'), new MO.APersistence('_customerTotal', MO.EDataType.Int32)]);
   return o;
}
