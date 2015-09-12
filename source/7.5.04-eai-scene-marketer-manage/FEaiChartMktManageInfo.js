//==========================================================
// <T>部门集合信息。</T>
//
// @class
// @author maocy
// @history 150912
//==========================================================
MO.FEaiChartMktManageInfo = function FEaiChartMktManageInfo(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._department2s = MO.Class.register(o, [new MO.AGetter('_department2s'), new MO.APersistence('_department2s', MO.EDataType.Objects, MO.FEaiChartMktManageInfoDepartment2)]);
   o._department4s = MO.Class.register(o, [new MO.AGetter('_department4s'), new MO.APersistence('_department4s', MO.EDataType.Objects, MO.FEaiChartMktManageInfoDepartment4)]);
   o._citys        = MO.Class.register(o, [new MO.AGetter('_citys'), new MO.APersistence('_citys', MO.EDataType.Objects, MO.FEaiChartMktManageInfoCity)]);
   return o;
}
