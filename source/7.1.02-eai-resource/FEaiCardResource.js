//==========================================================
// <T>卡片资源。</T>
//
// @class
// @author maocy
// @history 150706
//==========================================================
MO.FEaiCardResource = function FEaiCardResource(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._code     = MO.Class.register(o, [new MO.AGetter('_code'), new MO.APersistence('_code', MO.EDataType.String)]);
   o._cityCode = MO.Class.register(o, [new MO.AGetter('_cityCode'), new MO.APersistence('_cityCode', MO.EDataType.String)]);
   return o;
}
