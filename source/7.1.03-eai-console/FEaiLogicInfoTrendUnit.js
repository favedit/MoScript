//==========================================================
// <T>项目单元。</T>
//
// @class
// @author maocy
// @history 150923
//==========================================================
MO.FEaiLogicInfoCustomerTrendUnit = function FEaiLogicInfoCustomerTrendUnit(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._code           = MO.Class.register(o, [new MO.AGetter('_code'), new MO.APersistence('_code', MO.EDataType.String)]);
   o._label          = MO.Class.register(o, [new MO.AGetter('_label'), new MO.APersistence('_label', MO.EDataType.String)]);
   o._rate           = MO.Class.register(o, [new MO.AGetter('_rate'), new MO.APersistence('_rate', MO.EDataType.Float)]);
   o._invesment      = MO.Class.register(o, [new MO.AGetter('_invesment'), new MO.APersistence('_invesment', MO.EDataType.Double)]);
   o._invesmentDay   = MO.Class.register(o, [new MO.AGetter('_invesmentDay'), new MO.APersistence('_invesmentDay', MO.EDataType.Double)]);
   o._invesmentTotal = MO.Class.register(o, [new MO.AGetter('_invesmentTotal'), new MO.APersistence('_invesmentTotal', MO.EDataType.Double)]);
   return o;
}
