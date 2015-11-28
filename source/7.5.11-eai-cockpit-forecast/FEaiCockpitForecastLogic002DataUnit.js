//==========================================================
// <T>大额自投数据。</T>
//
// @class
// @author maocy
// @history 151120
//==========================================================
MO.FEaiCockpitForecastLogic002DataUnit = function FEaiCockpitForecastLogic002DataUnit(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   // o._valueCount      	 = MO.Class.register(o, [new MO.AGetter('_valueCount'), new MO.APersistence('_valueCount', MO.EDataType.Int32)]);
   // 所属公司
   o._department      	 = MO.Class.register(o, [new MO.AGetter('_department'), new MO.APersistence('_department', MO.EDataType.String)]);
   // 理财师编号
   o._rmarketerId     	 = MO.Class.register(o, [new MO.AGetter('_rmarketerId'), new MO.APersistence('_rmarketerId', MO.EDataType.Uint64)]);
   // 投资次数
   o._investmentCount    = MO.Class.register(o, [new MO.AGetter('_investmentCount'), new MO.APersistence('_investmentCount', MO.EDataType.Int32)]);
   // 投资额
   o._investmentTotal    = MO.Class.register(o, [new MO.AGetter('_investmentTotal'), new MO.APersistence('_investmentTotal', MO.EDataType.Double)]);
   // 赎回额
   o._redemptionTotal    = MO.Class.register(o, [new MO.AGetter('_redemptionTotal'), new MO.APersistence('_redemptionTotal', MO.EDataType.Double)]);
   // 净投额
   o._netinvestmentTotal = MO.Class.register(o, [new MO.AGetter('_netinvestmentTotal'), new MO.APersistence('_netinvestmentTotal', MO.EDataType.Double)]);
   return o;
}