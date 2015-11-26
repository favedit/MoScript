//==========================================================
// <T>驾驶舱业绩。</T>
//
// @class
// @author sunpeng
// @history 151108
//==========================================================
MO.FEaiCockpitProjectMessage = function FEaiCockpitProjectMessage(o) {
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._projects = MO.Class.register(o, [new MO.AGetter('_projects'), new MO.APersistence('_projects', MO.EDataType.Objects, MO.FEaiCockpitProjectMessageUnit)]);
   return o;
}
