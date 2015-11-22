//==========================================================
// <T>驾驶舱阀值预警。</T>
//
// @class
// @author adu
// @history 151103
//==========================================================
MO.FEaiCockpitMessageWarning = function FEaiCockpitMessageWarning(o) {
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._warningItems = MO.Class.register(o, [new MO.AGetter('_warningItems'), new MO.APersistence('_warningItems', MO.EDataType.Objects, MO.FEaiCockpitMessageWarningItem)]);
   return o;
}