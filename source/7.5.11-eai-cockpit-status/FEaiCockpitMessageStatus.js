//==========================================================
// <T>驾驶舱状态盘。</T>
//
// @class
// @author adu
// @history 151103
//==========================================================
MO.FEaiCockpitMessageStatus = function FEaiCockpitMessageStatus(o) {
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._turnoverPercent = MO.Class.register(o, [new MO.AGetter('_turnoverPercent'), new MO.APersistence('_turnoverPercent', MO.EDataType.String)]);
   o._perPercent = MO.Class.register(o, [new MO.AGetter('_perPercent'), new MO.APersistence('_perPercent', MO.EDataType.String)]);
   o._inOutPercent = MO.Class.register(o, [new MO.AGetter('_inOutPercent'), new MO.APersistence('_inOutPercent', MO.EDataType.String)]);
   o._performancePercent = MO.Class.register(o, [new MO.AGetter('_performancePercent'), new MO.APersistence('_performancePercent', MO.EDataType.String)]);
   return o;
}