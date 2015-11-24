//==========================================================
// <T>驾驶舱趋势消息。</T>
//
// @class
// @author maocy
// @history 151107
//==========================================================
MO.FEaiCockpitMessageAchievementNextDays = function FEaiCockpitMessageAchievementNextDays(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._day = MO.Class.register(o, [new MO.AGetter('_days'), new MO.APersistence('_days', MO.EDataType.Objects, MO.FEaiCockpitMessageAchievementNextDay)]);
   return o;
}
