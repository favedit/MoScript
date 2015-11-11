//==========================================================
// <T>用户投资动态数据。</T>
//
// @class
// @author maocy
// @history 150915
//==========================================================
MO.FEaiLogicInfoCustomerDynamic = function FEaiLogicInfoCustomerDynamic(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._investmentCount = MO.Class.register(o, [new MO.AGetter('_investmentCount'), new MO.APersistence('_investmentCount', MO.EDataType.Double)]);
   o._investmentTotal = MO.Class.register(o, [new MO.AGetter('_investmentTotal'), new MO.APersistence('_investmentTotal', MO.EDataType.Double)]);
   o._customerCount   = MO.Class.register(o, [new MO.AGetter('_customerCount'), new MO.APersistence('_customerCount', MO.EDataType.Int32)]);
   o._customerTotal   = MO.Class.register(o, [new MO.AGetter('_customerTotal'), new MO.APersistence('_customerTotal', MO.EDataType.Int32)]);
   // @attribute
   o._yesterdayInvestmentCount = MO.Class.register(o, [new MO.AGetter('_yesterdayInvestmentCount'), new MO.APersistence('_yesterdayInvestmentCount', MO.EDataType.Double)]);
   o._yesterdayInvestmentTotal = MO.Class.register(o, [new MO.AGetter('_yesterdayInvestmentTotal'), new MO.APersistence('_yesterdayInvestmentTotal', MO.EDataType.Double)]);
   o._yesterdayCustomerCount   = MO.Class.register(o, [new MO.AGetter('_yesterdayCustomerCount'), new MO.APersistence('_yesterdayCustomerCount', MO.EDataType.Int32)]);
   o._yesterdayCustomerTotal   = MO.Class.register(o, [new MO.AGetter('_yesterdayCustomerTotal'), new MO.APersistence('_yesterdayCustomerTotal', MO.EDataType.Int32)]);
   // @attribute
   o._rankUnits       = MO.Class.register(o, [new MO.AGetter('_rankUnits'), new MO.APersistence('_rankUnits', MO.EDataType.Objects, MO.FEaiLogicInfoCustomerDynamicRankUnit)]);
   // @attribute
   o._investment1w    = MO.Class.register(o, [new MO.AGetter('_investment1w'), new MO.APersistence('_investment1w', MO.EDataType.Int32)]);
   o._investment10w   = MO.Class.register(o, [new MO.AGetter('_investment10w'), new MO.APersistence('_investment10w', MO.EDataType.Int32)]);
   o._investment50w   = MO.Class.register(o, [new MO.AGetter('_investment50w'), new MO.APersistence('_investment50w', MO.EDataType.Int32)]);
   o._investment100w  = MO.Class.register(o, [new MO.AGetter('_investment100w'), new MO.APersistence('_investment100w', MO.EDataType.Int32)]);
   o._investment500w  = MO.Class.register(o, [new MO.AGetter('_investment500w'), new MO.APersistence('_investment500w', MO.EDataType.Int32)]);
   o._investment1000w = MO.Class.register(o, [new MO.AGetter('_investment1000w'), new MO.APersistence('_investment1000w', MO.EDataType.Int32)]);
   // @attribute
   o._units           = MO.Class.register(o, [new MO.AGetter('_units'), new MO.APersistence('_units', MO.EDataType.Objects, MO.FEaiLogicInfoCustomerDynamicUnit)]);
   return o;
}
