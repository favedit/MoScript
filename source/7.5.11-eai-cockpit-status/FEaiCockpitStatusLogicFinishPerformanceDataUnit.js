//==========================================================
// <T>业绩完成率数据。</T>
//
// @class
// @author maocy
// @history 151120
//==========================================================
MO.FEaiCockpitStatusLogicFinishPerformanceDataUnit = function FEaiCockpitStatusLogicFinishPerformanceDataUnit(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._monthLabel = MO.Class.register(o, [new MO.AGetter('_monthLabel'), new MO.APersistence('_monthLabel', MO.EDataType.String)]);
   o._lastMonth  = MO.Class.register(o, [new MO.AGetter('_lastMonth'), new MO.APersistence('_lastMonth', MO.EDataType.Double)]);
   o._thisMonth  = MO.Class.register(o, [new MO.AGetter('_thisMonth'), new MO.APersistence('_thisMonth', MO.EDataType.Double)]);
   o._dayRatio   = MO.Class.register(o, [new MO.AGetter('_dayRatio'), new MO.APersistence('_dayRatio', MO.EDataType.Double)]);
   return o;
}