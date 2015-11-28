//==========================================================
// <T>预测指数预览。</T>
//
// @class
// @author zhaoyihan
// @history 151128
//==========================================================
MO.FEaiCockpitForecastIndexData = function FEaiCockpitForecastIndexData(o) {
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._registercount     = MO.Class.register(o, [new MO.AGetter('_registercount'), new MO.APersistence('_registercount', MO.EDataType.Int32)]);
   o._investmenttotal   = MO.Class.register(o, [new MO.AGetter('_investmenttotal'), new MO.APersistence('_investmenttotal', MO.EDataType.Double)]);
   o._weekinvestment    = MO.Class.register(o, [new MO.AGetter('_weekinvestment'), new MO.APersistence('_weekinvestment', MO.EDataType.Double)]);
   o._entrycount        = MO.Class.register(o, [new MO.AGetter('_entrycount'), new MO.APersistence('_entrycount', MO.EDataType.Int32)]);
   o._workplacecount    = MO.Class.register(o, [new MO.AGetter('_workplacecount'), new MO.APersistence('_workplacecount', MO.EDataType.Int32)]);
   o._investmentcount   = MO.Class.register(o, [new MO.AGetter('_investmentcount'), new MO.APersistence('_investmentcount', MO.EDataType.Int32)]);
   o._averageinvestment = MO.Class.register(o, [new MO.AGetter('_averageinvestment'), new MO.APersistence('_averageinvestment', MO.EDataType.Double)]);
   o._weekredemption    = MO.Class.register(o, [new MO.AGetter('_weekredemption'), new MO.APersistence('_weekredemption', MO.EDataType.Double)]);
   o._leavecount        = MO.Class.register(o, [new MO.AGetter('_leavecount'), new MO.APersistence('_leavecount', MO.EDataType.Int32)]);
   o._wealthcompany     = MO.Class.register(o, [new MO.AGetter('_wealthcompany'), new MO.APersistence('_wealthcompany', MO.EDataType.Int32)]);
   return o;
}