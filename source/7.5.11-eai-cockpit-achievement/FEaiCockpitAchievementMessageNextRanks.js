//==========================================================
// <T>驾驶舱趋势消息。</T>
//
// @class
// @author maocy
// @history 151107
//==========================================================
MO.FEaiCockpitMessageAchievementNextRanks = function FEaiCockpitMessageAchievementNextRanks(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._achievementRank = MO.Class.register(o, [new MO.AGetter('_achievementRank'), new MO.APersistence('_achievementRank', MO.EDataType.Objects, MO.FEaiCockpitMessageAchievementNextRank)]);
   o._humanRank 	  = MO.Class.register(o, [new MO.AGetter('_humanRank'), new MO.APersistence('_humanRank', MO.EDataType.Objects, MO.FEaiCockpitMessageAchievementNextRank)]);
   o._averageRank	  = MO.Class.register(o, [new MO.AGetter('_averageRank'), new MO.APersistence('_averageRank', MO.EDataType.Objects, MO.FEaiCockpitMessageAchievementNextRank)]);
 
   return o;
}
