//==========================================================
// <T>驾驶舱项目管理。</T>
//
// @class
// @author zhaoyihan
// @history 151202
//==========================================================
MO.FEaiCockpitProjectContentDataMarqueeUnit = function FEaiCockpitProjectContentDataMarqueeUnit(o) {
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._marquee = MO.Class.register(o, [new MO.AGetter('_marquee'), new MO.APersistence('_marquee', MO.EDataType.String)]);
   return o;
}
