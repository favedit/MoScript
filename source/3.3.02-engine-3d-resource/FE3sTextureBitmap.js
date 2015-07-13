//==========================================================
// <T>资源纹理位图。</T>
//
// @class
// @author maocy
// @history 150302
//==========================================================
MO.FE3sTextureBitmap = function FE3sTextureBitmap(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   //..........................................................
   // @attribute
   o._packCode   = MO.Class.register(o, new MO.AGetter('_packCode'));
   //..........................................................
   // @method
   o.packCode    = MO.FE3sTextureBitmap_packCode;
   o.unserialize = MO.FE3sTextureBitmap_unserialize;
   return o;
}

//==========================================================
// <T>从输入流里反序列化信息内容。</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
MO.FE3sTextureBitmap_unserialize = function FE3sTextureBitmap_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   // 读取属性
   o._packCode = p.readString();
}
