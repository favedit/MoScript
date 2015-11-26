//==========================================================
// <T>驾驶舱阀值预警条目。</T>
//
// @class
// @author adu
// @history 151106
//==========================================================
MO.FEaiCockpitWarningMessageItem = function FEaiCockpitWarningMessageItem(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._id      = MO.Class.register(o, [new MO.AGetter('_id'), new MO.APersistence('_id', MO.EDataType.String)]);
   o._message = MO.Class.register(o, [new MO.AGetter('_message'), new MO.APersistence('_message', MO.EDataType.String)]);
   return o;
}