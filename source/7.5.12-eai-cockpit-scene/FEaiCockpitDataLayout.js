//==========================================================
// <T>驾驶舱业绩。</T>
//
// @class
// @author sunpeng
// @history 151118
//==========================================================
MO.FEaiCockpitDataLayout = function FEaiCockpitDataLayout(o) {
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._layouts = MO.Class.register(o, [new MO.AGetter('_layouts'), new MO.APersistence('_layouts', MO.EDataType.Objects, MO.FEaiCockpitDataLayoutUnit)]);
   return o;
}
