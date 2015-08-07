//==========================================================
// <T>城市资源。</T>
//
// @class
// @author maocy
// @history 150618
//==========================================================
MO.FEaiCityResource = function FEaiCityResource(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._provinceCode = MO.Class.register(o, [new MO.AGetter('_provinceCode'), new MO.APersistence('_provinceCode', MO.EDataType.Uint16)]);
   o._code         = MO.Class.register(o, [new MO.AGetter('_code'), new MO.APersistence('_code', MO.EDataType.Uint16)]);
   o._label        = MO.Class.register(o, [new MO.AGetter('_label'), new MO.APersistence('_label', MO.EDataType.String)]);
   o._level        = MO.Class.register(o, [new MO.AGetter('_level'), new MO.APersistence('_level', MO.EDataType.Uint16)]);
   o._location     = MO.Class.register(o, [new MO.AGetter('_location'), new MO.APersistence('_location', MO.EDataType.Struct, MO.SPoint2)]);
   return o;
}
