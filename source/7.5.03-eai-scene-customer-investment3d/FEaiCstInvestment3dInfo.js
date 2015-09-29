//==========================================================
// <T>部门集合信息。</T>
//
// @class
// @author maocy
// @history 150912
//==========================================================
MO.FEaiCstInvestment3dInfo = function FEaiCstInvestment3dInfo(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._department2s = MO.Class.register(o, [new MO.AGetter('_department2s'), new MO.APersistence('_department2s', MO.EDataType.Objects, MO.FEaiCstInvestment3dInfoDepartment2)]);
   o._department4s = MO.Class.register(o, [new MO.AGetter('_department4s'), new MO.APersistence('_department4s', MO.EDataType.Objects, MO.FEaiCstInvestment3dInfoDepartment4)]);
   o._citys        = MO.Class.register(o, [new MO.AGetter('_citys'), new MO.APersistence('_citys', MO.EDataType.Objects, MO.FEaiCstInvestment3dInfoCity)]);
   return o;
}
