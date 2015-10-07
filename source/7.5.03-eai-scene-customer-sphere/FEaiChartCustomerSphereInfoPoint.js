//==========================================================
// <T>信息点。</T>
//
// @class
// @author maocy
// @history 151008
//==========================================================
MO.FEaiChartCustomerSphereInfoPoint = function FEaiChartCustomerSphereInfoPoint(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._x = MO.Class.register(o, [new MO.AGetter('_x'), new MO.APersistence('_x', MO.EDataType.Float)]);
   o._y = MO.Class.register(o, [new MO.AGetter('_y'), new MO.APersistence('_y', MO.EDataType.Float)]);
   return o;
}
