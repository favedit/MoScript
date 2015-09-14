//==========================================================
// <T>统计理财师单元。</T>
//
// @class
// @author maocy
// @history 150805
//==========================================================
MO.FEaiChartMktMarketerDynamicRankUnit = function FEaiChartMktMarketerDynamicRankUnit(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._departmentLabel    = MO.Class.register(o, [new MO.AGetter('_departmentLabel'), new MO.APersistence('_departmentLabel', MO.EDataType.String)]);
   o._marketerLabel      = MO.Class.register(o, [new MO.AGetter('_marketerLabel'), new MO.APersistence('_marketerLabel', MO.EDataType.String)]);
   o._investmentTotal    = MO.Class.register(o, [new MO.AGetter('_investmentTotal'), new MO.APersistence('_investmentTotal', MO.EDataType.Double)]);
   o._customerCount      = MO.Class.register(o, [new MO.AGetter('_customerCount'), new MO.APersistence('_customerCount', MO.EDataType.Int32)]);
   o._customerTotal      = MO.Class.register(o, [new MO.AGetter('_customerTotal'), new MO.APersistence('_customerTotal', MO.EDataType.Int32)]);
   return o;
}
