//==========================================================
// <T>驾驶舱趋势天消息。</T>
//
// @class
// @author maocy
// @history 151107
//==========================================================
MO.FEaiCockpitForecastMessageUniqueData = function FEaiCockpitForecastMessageUniqueData(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._departmentLable          = MO.Class.register(o, [new MO.AGetter('_departmentLable'), new MO.APersistence('_departmentLable', MO.EDataType.String)]);
   o._averageTime              = MO.Class.register(o, [new MO.AGetter('_averageTime'), new MO.APersistence('_averageTime',MO.EDataType.Double)]);
   o._marketerCount            = MO.Class.register(o, [new MO.AGetter('_marketerCount'), new MO.APersistence('_marketerCount', MO.EDataType.Int32)]);
   o._Rate                     = MO.Class.register(o, [new MO.AGetter('_Rate'), new MO.APersistence('_Rate', MO.EDataType.Double)]);
   o._customerInvestment       = MO.Class.register(o, [new MO.AGetter('_customerInvestment'), new MO.APersistence('_customerInvestment', MO.EDataType.Double)]);
   o._averageAchievement       = MO.Class.register(o, [new MO.AGetter('_averageAchievement'), new MO.APersistence('_averageAchievement', MO.EDataType.Double)]);

   return o;
}