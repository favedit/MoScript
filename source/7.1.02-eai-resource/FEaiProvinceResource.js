//==========================================================
// <T>省份资源。</T>
//
// @class
// @author maocy
// @history 150619
//==========================================================
MO.FEaiProvinceResource = function FEaiProvinceResource(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._code         = MO.Class.register(o, [new MO.AGetter('_code'), new MO.APersistence('_code', MO.EDataType.Uint16)]);
   o._name         = MO.Class.register(o, [new MO.AGetter('_name'), new MO.APersistence('_name', MO.EDataType.String)]);
   o._label        = MO.Class.register(o, [new MO.AGetter('_label'), new MO.APersistence('_label', MO.EDataType.String)]);
   o._typeCd       = MO.Class.register(o, [new MO.AGetter('_typeCd'), new MO.APersistence('_typeCd', MO.EDataType.String)]);
   o._displayOrder = MO.Class.register(o, [new MO.AGetter('_displayOrder'), new MO.APersistence('_displayOrder', MO.EDataType.Uint16)]);
   return o;
}
