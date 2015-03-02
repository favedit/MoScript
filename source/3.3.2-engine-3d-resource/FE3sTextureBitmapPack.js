//==========================================================
// <T>资源纹理位图打包。</T>
//
// @class
// @author maocy
// @history 150302
//==========================================================
function FE3sTextureBitmapPack(o){
   o = RClass.inherits(this, o, FE3sObject);
   //..........................................................
   // @attribute
   o._data       = null;
   //..........................................................
   // @method
   o.unserialize = FE3sTextureBitmap_unserialize;
   return o;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FE3sTextureBitmap_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   // 读取数据
   var c = p.readInt32();
   var d = o._data = new Uint8Array(c);
   p.readBytes(d, 0, c);
}
