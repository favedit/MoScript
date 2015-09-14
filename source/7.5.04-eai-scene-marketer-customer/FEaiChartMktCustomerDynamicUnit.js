//==========================================================
// <T>统计用户投资单元。</T>
//
// @class
// @author maocy
// @history 150803
//==========================================================
MO.FEaiChartMktCustomerDynamicUnit = function FEaiChartMktCustomerDynamicUnit(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._recordDate = MO.Class.register(o, [new MO.AGetter('_recordDate'), new MO.APersistence('_recordDate', MO.EDataType.String)]);
   o._label      = MO.Class.register(o, [new MO.AGetter('_label'), new MO.APersistence('_label', MO.EDataType.String)]);
   o._card       = MO.Class.register(o, [new MO.AGetter('_card'), new MO.APersistence('_card', MO.EDataType.String)]);
   o._phone      = MO.Class.register(o, [new MO.AGetter('_phone'), new MO.APersistence('_phone', MO.EDataType.String)]);
   o._first      = MO.Class.register(o, [new MO.AGetter('_first'), new MO.APersistence('_first', MO.EDataType.Boolean)]);
   o._number     = MO.Class.register(o, [new MO.AGetter('_number'), new MO.APersistence('_number', MO.EDataType.Uint16)]);
   o._modelLabel = MO.Class.register(o, [new MO.AGetter('_modelLabel'), new MO.APersistence('_modelLabel', MO.EDataType.String)]);
   o._investment = MO.Class.register(o, [new MO.AGetter('_investment'), new MO.APersistence('_investment', MO.EDataType.Double)]);
   o._gain       = MO.Class.register(o, [new MO.AGetter('_gain'), new MO.APersistence('_gain', MO.EDataType.Double)]);
   o._bankGain   = MO.Class.register(o, [new MO.AGetter('_bankGain'), new MO.APersistence('_bankGain', MO.EDataType.Double)]);
   return o;
}
