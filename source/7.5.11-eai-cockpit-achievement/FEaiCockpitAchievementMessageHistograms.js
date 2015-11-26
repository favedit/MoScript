//==========================================================
// <T>当月业绩情况。</T>
//
// @class
// @author maocy
// @history 151106
//==========================================================
MO.FEaiCockpitAchievementMessageHistograms = function FEaiCockpitAchievementMessageHistograms(o) {
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
 //  o._count = MO.Class.register(o, [new MO.AGetter('_count'), new MO.APersistence('_count', MO.EDataType.Int32)]);
   o._items = MO.Class.register(o, [new MO.AGetter('_items'), new MO.APersistence('_items', MO.EDataType.Objects, MO.FEaiCockpitAchievementMessageHistogram)]);
   return o;
}
