//==========================================================
// <T>信息。</T>
//
// @class
// @author maocy
// @history 151008
//==========================================================
MO.FEaiChartCustomerSphereInfo = function FEaiChartCustomerSphereInfo(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   // @attribute
   o._typeCode = MO.Class.register(o, [new MO.AGetter('_typeCode'), new MO.APersistence('_typeCode', MO.EDataType.String)]);
   //..........................................................
   // @attribute
   o._points   = MO.Class.register(o, [new MO.AGetter('_points'), new MO.APersistence('_points', MO.EDataType.Objects, MO.FEaiChartCustomerSphereInfoPoint)]);
   return o;
}
