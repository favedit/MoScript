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
   o._departments = MO.Class.register(o, [new MO.AGetter('_departments'), new MO.APersistence('_departments', MO.EDataType.Objects, MO.FEaiChartMktManageInfoDepartment)]);
   return o;
}
