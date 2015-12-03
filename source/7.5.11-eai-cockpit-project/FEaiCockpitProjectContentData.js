//==========================================================
// <T>驾驶舱项目管理。</T>
//
// @class
// @author zhaoyihan
// @history 151202
//==========================================================
MO.FEaiCockpitProjectContentData = function FEaiCockpitProjectContentData(o) {
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._contents = MO.Class.register(o, [new MO.AGetter('_contents'), new MO.APersistence('_contents', MO.EDataType.Objects, MO.FEaiCockpitProjectContentDataUnit)]);
   return o;
}
