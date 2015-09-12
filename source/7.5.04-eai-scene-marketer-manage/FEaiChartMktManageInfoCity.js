//==========================================================
// <T>部门信息。</T>
//
// @class
// @author maocy
// @history 150912
//==========================================================
MO.FEaiChartMktManageInfoCity = function FEaiChartMktManageInfoCity(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._card          = MO.Class.register(o, [new MO.AGetter('_card'), new MO.APersistence('_card', MO.EDataType.Uint32)]);
   o._marketerCount = MO.Class.register(o, [new MO.AGetter('_marketerCount'), new MO.APersistence('_marketerCount', MO.EDataType.Uint32)]);
   o._investment    = MO.Class.register(o, [new MO.AGetter('_investment'), new MO.APersistence('_investment', MO.EDataType.Double)]);
   o._redemption    = MO.Class.register(o, [new MO.AGetter('_redemption'), new MO.APersistence('_redemption', MO.EDataType.Double)]);
   o._netinvestment = MO.Class.register(o, [new MO.AGetter('_netinvestment'), new MO.APersistence('_netinvestment', MO.EDataType.Double)]);
   o._performance   = MO.Class.register(o, [new MO.AGetter('_performance'), new MO.APersistence('_performance', MO.EDataType.Double)]);
   return o;
}
