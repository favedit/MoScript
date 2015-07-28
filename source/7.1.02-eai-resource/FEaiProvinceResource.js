//==========================================================
// <T>省份资源。</T>
//
// @class
// @author maocy
// @history 150619
//==========================================================
MO.FEaiProvinceResource = function FEaiProvinceResource(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._code         = MO.Class.register(o, new MO.AGetter('_code'));
   o._name         = MO.Class.register(o, new MO.AGetter('_name'));
   o._label        = MO.Class.register(o, new MO.AGetter('_label'));
   o._typeCd       = MO.Class.register(o, new MO.AGetter('_typeCd'));
   o._displayOrder = MO.Class.register(o, new MO.AGetter('_displayOrder'));
   //..........................................................
   // @method
   o.unserialize   = MO.FEaiProvinceResource_unserialize;
   return o;
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiProvinceResource_unserialize = function FEaiProvinceResource_unserialize(input){
   var o = this;
   o._code = input.readUint16();
   o._name = input.readString();
   o._label = input.readString();
   o._typeCd = input.readString();
   o._displayOrder = input.readUint16();
}
