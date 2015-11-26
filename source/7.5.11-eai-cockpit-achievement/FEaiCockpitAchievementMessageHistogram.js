//==========================================================
// <T>当月业绩情况。</T>
//
// @class
// @author maocy
// @history 151106
//==========================================================
MO.FEaiCockpitAchievementMessageHistogram = function FEaiCockpitAchievementMessageHistogram(o) {
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._label = MO.Class.register(o, [new MO.AGetter('_label'), new MO.APersistence('_label', MO.EDataType.String)]);
   o._amount = MO.Class.register(o, [new MO.AGetter('_amount'), new MO.APersistence('_amount', MO.EDataType.Double)]);
   return o;
}
