//==========================================================
// <T>资源材质纹理。</T>
//
// @author maocy
// @history 150108
//==========================================================
MO.FE3sMaterialBitmap = function FE3sMaterialBitmap(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   //..........................................................
   // @attribute
   o._bitmapPackGuid = MO.Class.register(o, new MO.AGetter('_bitmapPackGuid'));
   o._bitmapPack     = MO.Class.register(o, new MO.AGetSet('_bitmapPack'));
   o._bitmapGuid     = MO.Class.register(o, new MO.AGetter('_bitmapGuid'));
   o._index          = 0;
   //..........................................................
   // @method
   o.unserialize     = MO.FE3sMaterialBitmap_unserialize;
   return o;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param input:FByteStream 数据流
//==========================================================
MO.FE3sMaterialBitmap_unserialize = function FE3sMaterialBitmap_unserialize(input){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, input);
   // 读取属性
   o._bitmapPackGuid = input.readString();
   o._bitmapGuid = input.readString();
   o._index = input.readUint16();
}
