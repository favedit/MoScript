//==========================================================
// <T>驾驶舱趋势消息。</T>
//
// @class
// @author maocy
// @history 151107
//==========================================================
MO.FEaiCockpitWarningMessageRedemptions = function FEaiCockpitWarningMessageRedemptions(o) {
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._redemptions = MO.Class.register(o, [new MO.AGetter('_redemptions'), new MO.APersistence('_redemptions', MO.EDataType.Objects, MO.FEaiCockpitWarningMessageRedemption)]);
   return o;
}
