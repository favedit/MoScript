//==========================================================
// <T>用户投资统计。</T>
//
// @class
// @author suming	
// @history 151020
//==========================================================
MO.FEaiLogicJsonInfoCustomerTrend = function FEaiLogicJsonInfoCustomerTrend(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   // @attribute
   o._investmentTotal = MO.Class.register(o, [new MO.AGetSet('_investmentTotal'), new MO.APersistence('_investmentTotal', MO.EDataType.Double)]);
   o._customerTotal   = MO.Class.register(o, [new MO.AGetSet('_customerTotal'), new MO.APersistence('_customerTotal', MO.EDataType.Uint32)]);
   //..........................................................
   // @attribute
   o._units           = MO.Class.register(o, [new MO.AGetSet('_units'), new MO.APersistence('_units', MO.EDataType.Objects, MO.FEaiLogicJsonInfoCustomerTrendUnit)]);
   return o;
}
