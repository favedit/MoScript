//==========================================================
// <T>业绩信息期限。</T>
//
// @class
// @author maocy
// @history 150911
//==========================================================
MO.FEaiChartPerfMarketerInfoSpan = function FEaiChartPerfMarketerInfoSpan(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._investment       = MO.Class.register(o, [new MO.AGetter('_investment'), new MO.APersistence('_investment', MO.EDataType.Double)]);
   o._redemption       = MO.Class.register(o, [new MO.AGetter('_redemption'), new MO.APersistence('_redemption', MO.EDataType.Double)]);
   o._netinvestment    = MO.Class.register(o, [new MO.AGetter('_netinvestment'), new MO.APersistence('_netinvestment', MO.EDataType.Double)]);
   o._memberRegister   = MO.Class.register(o, [new MO.AGetter('_memberRegister'), new MO.APersistence('_memberRegister', MO.EDataType.Uint32)]);
   o._customerRegister = MO.Class.register(o, [new MO.AGetter('_customerRegister'), new MO.APersistence('_customerRegister', MO.EDataType.Uint32)]);
   // @attribute
   o._ticks            = MO.Class.register(o, [new MO.AGetter('_ticks'), new MO.APersistence('_ticks', MO.EDataType.Objects, MO.FEaiChartPerfMarketerInfoTick)]);
   return o;
}
