//==========================================================
// <T>部门信息。</T>
//
// @class
// @author maocy
// @history 150912
//==========================================================
MO.FEaiCstInvestment3dInfoDepartment4 = function FEaiCstInvestment3dInfoDepartment4(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._provinceCode  = MO.Class.register(o, [new MO.AGetter('_provinceCode'), new MO.APersistence('_provinceCode', MO.EDataType.Uint16)]);
   o._id            = MO.Class.register(o, [new MO.AGetter('_id'), new MO.APersistence('_id', MO.EDataType.Uint32)]);
   o._parentLabel   = MO.Class.register(o, [new MO.AGetter('_parentLabel'), new MO.APersistence('_parentLabel', MO.EDataType.String)]);
   o._label         = MO.Class.register(o, [new MO.AGetter('_label'), new MO.APersistence('_label', MO.EDataType.String)]);
   o._marketerCount = MO.Class.register(o, [new MO.AGetter('_marketerCount'), new MO.APersistence('_marketerCount', MO.EDataType.Uint32)]);
   o._investment    = MO.Class.register(o, [new MO.AGetter('_investment'), new MO.APersistence('_investment', MO.EDataType.Double)]);
   o._redemption    = MO.Class.register(o, [new MO.AGetter('_redemption'), new MO.APersistence('_redemption', MO.EDataType.Double)]);
   o._netinvestment = MO.Class.register(o, [new MO.AGetter('_netinvestment'), new MO.APersistence('_netinvestment', MO.EDataType.Double)]);
   o._performance   = MO.Class.register(o, [new MO.AGetter('_performance'), new MO.APersistence('_performance', MO.EDataType.Double)]);
   return o;
}
