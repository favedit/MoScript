//==========================================================
// <T>驾驶舱趋势消息。</T>
//
// @class
// @author maocy
// @history 151107
//==========================================================
MO.FEaiCockpitAchievementMessageNextMonths = function FEaiCockpitAchievementMessageNextMonths(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._Month = MO.Class.register(o, [new MO.AGetter('_Month'), new MO.APersistence('_Month', MO.EDataType.Objects, MO.FEaiCockpitAchievementMessageNextMonth)]);
   o._lastMonth = MO.Class.register(o, [new MO.AGetter('_lastMonth'), new MO.APersistence('_lastMonth', MO.EDataType.Objects, MO.FEaiCockpitAchievementMessageNextMonth)]);
   return o;
}