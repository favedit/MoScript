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
   //业绩评分
   o._performanceScore = MO.Class.register(o, [new MO.AGetter('_performanceScore'), new MO.APersistence('_performanceScore', MO.EDataType.Double)]);
   //人力评分
   o._manpowerScore = MO.Class.register(o, [new MO.AGetter('_manpowerScore'), new MO.APersistence('_manpowerScore', MO.EDataType.Double)]);
   //人均评分
   o._percapitaScore = MO.Class.register(o, [new MO.AGetter('_percapitaScore'), new MO.APersistence('_percapitaScore', MO.EDataType.Double)]);
   //任务评分
   o._taskScore = MO.Class.register(o, [new MO.AGetter('_taskScore'), new MO.APersistence('_taskScore', MO.EDataType.Double)]);
   //趋势评分
   o._trendScore = MO.Class.register(o, [new MO.AGetter('_trendScore'), new MO.APersistence('_trendScore', MO.EDataType.Double)]);
   return o;
}
