//==========================================================
// <T>业绩信息期限。</T>
//
// @class
// @author maocy
// @history 150911
//==========================================================
MO.FEaiChartPerfMarketerInfo = function FEaiChartPerfMarketerInfo(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._day   = MO.Class.register(o, [new MO.AGetter('_day'), new MO.APersistence('_day', MO.EDataType.Object, MO.FEaiChartPerfMarketerInfoSpan)]);
   o._month = MO.Class.register(o, [new MO.AGetter('_month'), new MO.APersistence('_month', MO.EDataType.Object, MO.FEaiChartPerfMarketerInfoSpan)]);
   o._year  = MO.Class.register(o, [new MO.AGetter('_year'), new MO.APersistence('_year', MO.EDataType.Object, MO.FEaiChartPerfMarketerInfoSpan)]);
   return o;
}
