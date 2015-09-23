//==========================================================
// <T>用户投资动态单元。</T>
//
// @class
// @author maocy
// @history 150915
//==========================================================
MO.FEaiLogicInfoCustomerDynamicUnit = function FEaiLogicInfoCustomerDynamicUnit(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._recordDate      = MO.Class.register(o, [new MO.AGetter('_recordDate'), new MO.APersistence('_recordDate', MO.EDataType.String)]);
   o._label           = MO.Class.register(o, [new MO.AGetter('_label'), new MO.APersistence('_label', MO.EDataType.String)]);
   o._card            = MO.Class.register(o, [new MO.AGetter('_card'), new MO.APersistence('_card', MO.EDataType.String)]);
   o._phone           = MO.Class.register(o, [new MO.AGetter('_phone'), new MO.APersistence('_phone', MO.EDataType.String)]);
   o._first           = MO.Class.register(o, [new MO.AGetter('_first'), new MO.APersistence('_first', MO.EDataType.Boolean)]);
   o._number          = MO.Class.register(o, [new MO.AGetter('_number'), new MO.APersistence('_number', MO.EDataType.Uint16)]);
   o._modelChanged    = MO.Class.register(o, [new MO.AGetter('_modelChanged'), new MO.APersistence('_modelChanged', MO.EDataType.Boolean)]);
   o._modelPriorCode  = MO.Class.register(o, [new MO.AGetter('_modelPriorCode'), new MO.APersistence('_modelPriorCode', MO.EDataType.String)]);
   o._modelPriorLabel = MO.Class.register(o, [new MO.AGetter('_modelPriorLabel'), new MO.APersistence('_modelPriorLabel', MO.EDataType.String)]);
   o._modelCode       = MO.Class.register(o, [new MO.AGetter('_modelCode'), new MO.APersistence('_modelCode', MO.EDataType.String)]);
   o._modelLabel      = MO.Class.register(o, [new MO.AGetter('_modelLabel'), new MO.APersistence('_modelLabel', MO.EDataType.String)]);
   o._investment      = MO.Class.register(o, [new MO.AGetter('_investment'), new MO.APersistence('_investment', MO.EDataType.Double)]);
   o._gain            = MO.Class.register(o, [new MO.AGetter('_gain'), new MO.APersistence('_gain', MO.EDataType.Double)]);
   o._bankGain        = MO.Class.register(o, [new MO.AGetter('_bankGain'), new MO.APersistence('_bankGain', MO.EDataType.Double)]);
   return o;
}
