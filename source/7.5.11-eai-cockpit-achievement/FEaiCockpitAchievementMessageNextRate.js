//==========================================================
// <T>驾驶舱趋势天消息。</T>
//
// @class
// @author maocy
// @history 151107
//==========================================================
MO.FEaiCockpitMessageAchievementNextRate = function FEaiCockpitMessageAchievementNextRate(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   o._number         = MO.Class.register(o, [new MO.AGetter('_number'), new MO.APersistence('_number', MO.EDataType.Int32)]);

   // @attribute
   o._productName          = MO.Class.register(o, [new MO.AGetter('_productName'), new MO.APersistence('_productName', MO.EDataType.String)]);
   // @attribute
   o._investmentAmount         = MO.Class.register(o, [new MO.AGetter('_investmentAmount'), new MO.APersistence('_investmentAmount', MO.EDataType.Double)]);

   return o;
}