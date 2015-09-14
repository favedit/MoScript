//==========================================================
// <T>统计理财师动态数据。</T>
//
// @class
// @author maocy
// @history 150804
//==========================================================
MO.FEaiChartMktMarketerDynamicInfo = function FEaiChartMktMarketerDynamicInfo(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._investmentCount    = MO.Class.register(o, [new MO.AGetter('_investmentCount'), new MO.APersistence('_investmentCount', MO.EDataType.Double)]);
   o._investmentTotal    = MO.Class.register(o, [new MO.AGetter('_investmentTotal'), new MO.APersistence('_investmentTotal', MO.EDataType.Double)]);
   o._customerCount      = MO.Class.register(o, [new MO.AGetter('_customerCount'), new MO.APersistence('_customerCount', MO.EDataType.Int32)]);
   o._customerTotal      = MO.Class.register(o, [new MO.AGetter('_customerTotal'), new MO.APersistence('_customerTotal', MO.EDataType.Int32)]);
   // @attribute
   o._rankDayUnits       = MO.Class.register(o, [new MO.AGetter('_rankDayUnits'), new MO.APersistence('_rankDayUnits', MO.EDataType.Objects, MO.FEaiChartMktMarketerDynamicRankUnit)]);
   o._rankWeekUnits      = MO.Class.register(o, [new MO.AGetter('_rankWeekUnits'), new MO.APersistence('_rankWeekUnits', MO.EDataType.Objects, MO.FEaiChartMktMarketerDynamicRankUnit)]);
   o._rankMonthUnits     = MO.Class.register(o, [new MO.AGetter('_rankMonthUnits'), new MO.APersistence('_rankMonthUnits', MO.EDataType.Objects, MO.FEaiChartMktMarketerDynamicRankUnit)]);
   o._units              = MO.Class.register(o, [new MO.AGetter('_units'), new MO.APersistence('_units', MO.EDataType.Objects, MO.FEaiChartMktMarketerDynamicUnit)]);
   return o;
}
