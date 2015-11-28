//==========================================================
// <T>驾驶舱趋势消息。</T>
//
// @class
// @author maocy
// @history 151107
//==========================================================
MO.FEaiCockpitMessageAchievementNextRank = function FEaiCockpitMessageAchievementNextRank(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._rank = MO.Class.register(o, [new MO.AGetter('_rank'), new MO.APersistence('_rank', MO.EDataType.String)]);
   return o;
}
