//==========================================================
// <T>统计理财师动态数据。</T>
//
// @class
// @author maocy
// @history 150804
//==========================================================
MO.FEaiChartDptMarketerDynamicInfo = function FEaiChartDptMarketerDynamicInfo(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._investmentCount    = MO.Class.register(o, [new MO.AGetter('_investmentCount'), new MO.APersistence('_investmentCount', MO.EDataType.Double)]);
   o._investmentTotal    = MO.Class.register(o, [new MO.AGetter('_investmentTotal'), new MO.APersistence('_investmentTotal', MO.EDataType.Double)]);
   o._redemptionCount    = MO.Class.register(o, [new MO.AGetter('_redemptionCount'), new MO.APersistence('_redemptionCount', MO.EDataType.Double)]);
   o._redemptionTotal    = MO.Class.register(o, [new MO.AGetter('_redemptionTotal'), new MO.APersistence('_redemptionTotal', MO.EDataType.Double)]);
   o._netinvestmentCount = MO.Class.register(o, [new MO.AGetter('_netinvestmentCount'), new MO.APersistence('_netinvestmentCount', MO.EDataType.Double)]);
   o._netinvestmentTotal = MO.Class.register(o, [new MO.AGetter('_netinvestmentTotal'), new MO.APersistence('_netinvestmentTotal', MO.EDataType.Double)]);
   o._interestCount      = MO.Class.register(o, [new MO.AGetter('_interestCount'), new MO.APersistence('_interestCount', MO.EDataType.Double)]);
   o._interestTotal      = MO.Class.register(o, [new MO.AGetter('_interestTotal'), new MO.APersistence('_interestTotal', MO.EDataType.Double)]);
   o._performanceCount   = MO.Class.register(o, [new MO.AGetter('_performanceCount'), new MO.APersistence('_performanceCount', MO.EDataType.Double)]);
   o._performanceTotal   = MO.Class.register(o, [new MO.AGetter('_performanceTotal'), new MO.APersistence('_performanceTotal', MO.EDataType.Double)]);
   o._customerCount      = MO.Class.register(o, [new MO.AGetter('_customerCount'), new MO.APersistence('_customerCount', MO.EDataType.Int32)]);
   o._customerTotal      = MO.Class.register(o, [new MO.AGetter('_customerTotal'), new MO.APersistence('_customerTotal', MO.EDataType.Int32)]);
   // @attribute
   o._rankDayUnits       = MO.Class.register(o, [new MO.AGetter('_rankDayUnits'), new MO.APersistence('_rankDayUnits', MO.EDataType.Objects, MO.FEaiChartDptMarketerDynamicRankUnit)]);
   o._rankWeekUnits      = MO.Class.register(o, [new MO.AGetter('_rankWeekUnits'), new MO.APersistence('_rankWeekUnits', MO.EDataType.Objects, MO.FEaiChartDptMarketerDynamicRankUnit)]);
   o._rankMonthUnits     = MO.Class.register(o, [new MO.AGetter('_rankMonthUnits'), new MO.APersistence('_rankMonthUnits', MO.EDataType.Objects, MO.FEaiChartDptMarketerDynamicRankUnit)]);
   o._units              = MO.Class.register(o, [new MO.AGetter('_units'), new MO.APersistence('_units', MO.EDataType.Objects, MO.FEaiChartDptMarketerDynamicUnit)]);
   return o;
}
