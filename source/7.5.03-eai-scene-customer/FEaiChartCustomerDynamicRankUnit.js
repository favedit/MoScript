//==========================================================
// <T>统计理财师单元。</T>
//
// @class
// @author maocy
// @history 150805
//==========================================================
MO.FEaiChartCustomerDynamicRankUnit = function FEaiChartCustomerDynamicRankUnit(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._label      = MO.Class.register(o, [new MO.AGetter('_label'), new MO.APersistence('_label', MO.EDataType.String)]);
   o._card       = MO.Class.register(o, [new MO.AGetter('_card'), new MO.APersistence('_card', MO.EDataType.String)]);
   o._phone      = MO.Class.register(o, [new MO.AGetter('_phone'), new MO.APersistence('_phone', MO.EDataType.String)]);
   o._investment = MO.Class.register(o, [new MO.AGetter('_investment'), new MO.APersistence('_investment', MO.EDataType.Double)]);
   return o;
}
