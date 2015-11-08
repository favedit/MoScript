//==========================================================
// <T>驾驶舱实时数据。</T>
//
// @class
// @author adu
// @history 151103
//==========================================================
MO.FEaiCockpitLogicTitle = function FEaiCockpitLogicTitle(o) {
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._investmentTotle = MO.Class.register(o, [new MO.AGetter('_investmentTotal'), new MO.APersistence('_investmentTotal', MO.EDataType.Int32)]);
   o._currentInvestment = MO.Class.register(o, [new MO.AGetter('_currentInvestment'), new MO.APersistence('_currentInvestment', MO.EDataType.Int32)]);
   o._employeeCount = MO.Class.register(o, [new MO.AGetter('_employeeCount'), new MO.APersistence('_employeeCount', MO.EDataType.Int32)]);
   o._marketerCount = MO.Class.register(o, [new MO.AGetter('_marketerCount'), new MO.APersistence('_marketerCount', MO.EDataType.Int32)]);
   o._subsidiaryCount = MO.Class.register(o, [new MO.AGetter('_subsidiaryCount'), new MO.APersistence('_subsidiaryCount', MO.EDataType.Int32)]);
   o._wealthCount = MO.Class.register(o, [new MO.AGetter('_wealthCount'), new MO.APersistence('_wealthCount', MO.EDataType.Int32)]);
   o._workplaceCount = MO.Class.register(o, [new MO.AGetter('_workplaceCount'), new MO.APersistence('_workplaceCount', MO.EDataType.Int32)]);
   o._thingCount = MO.Class.register(o, [new MO.AGetter('_thingCount'), new MO.APersistence('_thingCount', MO.EDataType.Int32)]);
   o._unreadCount = MO.Class.register(o, [new MO.AGetter('_unreadCount'), new MO.APersistence('_unreadCount', MO.EDataType.Int32)]);
   return o;
}