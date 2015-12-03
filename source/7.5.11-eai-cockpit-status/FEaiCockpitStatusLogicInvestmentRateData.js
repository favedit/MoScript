//==========================================================
// <T>投入产出比数据。</T>
//
// @class
// @author maocy
// @history 151120
//==========================================================
MO.FEaiCockpitStatusLogicInvestmentRateData = function FEaiCockpitStatusLogicInvestmentRateData(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._finishRate  = MO.Class.register(o, [new MO.AGetter('_finishRate'), new MO.APersistence('_finishRate', MO.EDataType.Int32)]);
   o._titleFirst  = MO.Class.register(o, [new MO.AGetter('_titleFirst'), new MO.APersistence('_titleFirst', MO.EDataType.String)]);
   o._titleSecond = MO.Class.register(o, [new MO.AGetter('_titleSecond'), new MO.APersistence('_titleSecond', MO.EDataType.String)]);
   o._titleThird  = MO.Class.register(o, [new MO.AGetter('_titleThird'), new MO.APersistence('_titleThird', MO.EDataType.String)]);
   o._titleFourth = MO.Class.register(o, [new MO.AGetter('_titleFourth'), new MO.APersistence('_titleFourth', MO.EDataType.String)]);
   o._monthData   = MO.Class.register(o, [new MO.AGetter('_monthData'),new MO.APersistence('_monthData',MO.EDataType.Objects, MO.FEaiCockpitStatusLogicInvestmentRateDataUnit)]);
   return o;
}