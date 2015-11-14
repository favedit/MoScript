//==========================================================
// <T>用户投资统计。</T>
//
// @class
// @author maocy
// @history 150915
//==========================================================
MO.FEaiLogicInfoCustomerTrend = function FEaiLogicInfoCustomerTrend(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   // @attribute
   o._investmentTotal          = MO.Class.register(o, [new MO.AGetter('_investmentTotal'), new MO.APersistence('_investmentTotal', MO.EDataType.Double)]);
   o._customerTotal            = MO.Class.register(o, [new MO.AGetter('_customerTotal'), new MO.APersistence('_customerTotal', MO.EDataType.Uint32)]);
   // @attribute
   o._yesterdayInvestmentTotal = MO.Class.register(o, [new MO.AGetter('_yesterdayInvestmentTotal'), new MO.APersistence('_yesterdayInvestmentTotal', MO.EDataType.Double)]);
   o._yesterdayCustomerTotal   = MO.Class.register(o, [new MO.AGetter('_yesterdayCustomerTotal'), new MO.APersistence('_yesterdayCustomerTotal', MO.EDataType.Uint32)]);
   // @attribute
   o._weekInvestmentTotal      = MO.Class.register(o, [new MO.AGetter('_weekInvestmentTotal'), new MO.APersistence('_weekInvestmentTotal', MO.EDataType.Double)]);
   o._weekCustomerTotal        = MO.Class.register(o, [new MO.AGetter('_weekCustomerTotal'), new MO.APersistence('_weekCustomerTotal', MO.EDataType.Uint32)]);
   // @attribute
   o._monthInvestmentTotal     = MO.Class.register(o, [new MO.AGetter('_monthInvestmentTotal'), new MO.APersistence('_monthInvestmentTotal', MO.EDataType.Double)]);
   o._monthCustomerTotal       = MO.Class.register(o, [new MO.AGetter('_monthCustomerTotal'), new MO.APersistence('_monthCustomerTotal', MO.EDataType.Uint32)]);
   //..........................................................
   // @attribute
   o._units                    = MO.Class.register(o, [new MO.AGetter('_units'), new MO.APersistence('_units', MO.EDataType.Objects, MO.FEaiLogicInfoCustomerTrendUnit)]);
   return o;
}
