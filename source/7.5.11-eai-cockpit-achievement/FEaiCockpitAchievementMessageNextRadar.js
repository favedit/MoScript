//==========================================================
// <T>驾驶舱趋势消息。</T>
//
// @class
// @author wangfan
// @history 151107
//==========================================================
MO.FEaiCockpitMessageAchievementNextRadar = function FEaiCockpitMessageAchievementNextRadar(o) {
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   //总分数
   o._totalScore = MO.Class.register(o, [new MO.AGetter('_totalScore'), new MO.APersistence('_totalScore', MO.EDataType.Double)]);
   //业绩
   o._performance = MO.Class.register(o, [new MO.AGetter('_performance'), new MO.APersistence('_performance', MO.EDataType.Double)]);
   //人力
   o._manpower = MO.Class.register(o, [new MO.AGetter('_manpower'), new MO.APersistence('_manpower', MO.EDataType.Int32)]);
   //人均
   o._perCapita = MO.Class.register(o, [new MO.AGetter('_perCapita'), new MO.APersistence('_perCapita', MO.EDataType.Double)]);
   //任务
   o._task = MO.Class.register(o, [new MO.AGetter('_task'), new MO.APersistence('_task', MO.EDataType.Double)]);
   //完成度
   o._completionRate = MO.Class.register(o, [new MO.AGetter('_completionRate'), new MO.APersistence('_completionRate', MO.EDataType.Double)]);
   // 趋势
   o._trendCd = MO.Class.register(o, [new MO.AGetter('_trendCd'), new MO.APersistence('_trendCd', MO.EDataType.Int32)]);
   //改进建议
   o._advice = MO.Class.register(o, [new MO.AGetter('_advice'), new MO.APersistence('_advice', MO.EDataType.String)]);
   return o;
}
