//==========================================================
// <T>统计理财师单元。</T>
//
// @class
// @author maocy
// @history 150803
//==========================================================
MO.FEaiChartMarketerDynamicUnit = function FEaiChartMarketerDynamicUnit(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._recordDate           = MO.Class.register(o, [new MO.AGetter('_recordDate'), new MO.APersistence('_recordDate', MO.EDataType.String)]);
   o._departmentLabel      = MO.Class.register(o, [new MO.AGetter('_departmentLabel'), new MO.APersistence('_departmentLabel', MO.EDataType.String)]);
   o._marketerLabel        = MO.Class.register(o, [new MO.AGetter('_marketerLabel'), new MO.APersistence('_marketerLabel', MO.EDataType.String)]);
   o._customerLabel        = MO.Class.register(o, [new MO.AGetter('_customerLabel'), new MO.APersistence('_customerLabel', MO.EDataType.String)]);
   o._customerCard         = MO.Class.register(o, [new MO.AGetter('_customerCard'), new MO.APersistence('_customerCard', MO.EDataType.String)]);
   o._customerPhone        = MO.Class.register(o, [new MO.AGetter('_customerPhone'), new MO.APersistence('_customerPhone', MO.EDataType.String)]);
   o._customerActionCd     = MO.Class.register(o, [new MO.AGetter('_customerActionCd'), new MO.APersistence('_customerActionCd', MO.EDataType.Uint8)]);
   o._customerActionAmount = MO.Class.register(o, [new MO.AGetter('_customerActionAmount'), new MO.APersistence('_customerActionAmount', MO.EDataType.Double)]);
   return o;
}
