//==========================================================
// <T>驾驶舱趋势消息。</T>
//
// @class
// @author maocy
// @history 151107
//==========================================================
MO.FEaiCockpitWarningMessageInvestments = function FEaiCockpitWarningMessageInvestments(o) {
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._capitas = MO.Class.register(o, [new MO.AGetter('_capitas'), new MO.APersistence('_capitas', MO.EDataType.Objects, MO.FEaiCockpitWarningMessageInvestment)]);
   return o;
}
