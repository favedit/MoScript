//==========================================================
// <T>项目信息。</T>
//
// @class
// @author maocy
// @history 150923
//==========================================================
MO.FEaiLogicInfoTender = function FEaiLogicInfoTender(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._units = MO.Class.register(o, [new MO.AGetter('_units'), new MO.APersistence('_units', MO.EDataType.Objects, MO.FEaiLogicInfoCustomerTrendUnit)]);
   return o;
}
