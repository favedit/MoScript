//==========================================================
// <T>大额自投数据。</T>
//
// @class
// @author maocy
// @history 151120
//==========================================================
MO.FEaiCockpitForecastLogic002Data   = function FEaiCockpitForecastLogic002Data(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._investmentSelf = MO.Class.register(o, [new MO.AGetter('_investmentSelf'),new MO.APersistence('_investmentSelf',MO.EDataType.Objects, MO.FEaiCockpitForecastLogic002DataUnit)]);
   return o;
}