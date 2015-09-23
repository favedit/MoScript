//==========================================================
// <T>项目单元。</T>
//
// @class
// @author maocy
// @history 150923
//==========================================================
MO.FEaiLogicInfoTrendUnit = function FEaiLogicInfoTrendUnit(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._code            = MO.Class.register(o, [new MO.AGetter('_code'), new MO.APersistence('_code', MO.EDataType.String)]);
   o._label           = MO.Class.register(o, [new MO.AGetter('_label'), new MO.APersistence('_label', MO.EDataType.String)]);
   o._rate            = MO.Class.register(o, [new MO.AGetter('_rate'), new MO.APersistence('_rate', MO.EDataType.Float)]);
   o._tenderInvesment = MO.Class.register(o, [new MO.AGetter('_tenderInvesment'), new MO.APersistence('_tenderInvesment', MO.EDataType.Double)]);
   o._tenderTotal     = MO.Class.register(o, [new MO.AGetter('_tenderTotal'), new MO.APersistence('_tenderTotal', MO.EDataType.Double)]);
   o._invesmentDay    = MO.Class.register(o, [new MO.AGetter('_invesmentDay'), new MO.APersistence('_invesmentDay', MO.EDataType.Double)]);
   o._invesmentTotal  = MO.Class.register(o, [new MO.AGetter('_invesmentTotal'), new MO.APersistence('_invesmentTotal', MO.EDataType.Double)]);
   return o;
}
