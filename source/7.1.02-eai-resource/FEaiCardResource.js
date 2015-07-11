//==========================================================
// <T>卡片资源。</T>
//
// @class
// @author maocy
// @history 150706
//==========================================================
MO.FEaiCardResource = function FEaiCardResource(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._code       = MO.Class.register(o, new MO.AGetter('_code'));
   o._cityCode   = MO.Class.register(o, new MO.AGetter('_cityCode'));
   //..........................................................
   // @method
   o.unserialize = MO.FEaiCardResource_unserialize;
   return o;
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCardResource_unserialize = function FEaiCardResource_unserialize(input){
   var o = this;
   o._code = input.readUint16();
   o._cityCode = input.readUint16();
}
