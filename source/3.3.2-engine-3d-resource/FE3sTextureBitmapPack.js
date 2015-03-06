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
   o._optionCompress = null;
   o._size           = null;
   o._data           = null;
   o._typeName       = null;
   o._formatName     = null;
   //..........................................................
   // @method
   o.construct       = FE3sTextureBitmapPack_construct;
   // @method
   o.optionCompress  = FE3sTextureBitmapPack_optionCompress;
   o.size            = FE3sTextureBitmapPack_size;
   o.data            = FE3sTextureBitmapPack_data;
   o.unserialize     = FE3sTextureBitmapPack_unserialize;
   // @method
   o.dispose         = FE3sTextureBitmapPack_dispose;
   return o;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FE3sTextureBitmapPack_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._size = new SSize2();
}

//==========================================================
// <T>获得压缩配置。</T>
//
// @method
// @return Boolean 压缩配置
//==========================================================
function FE3sTextureBitmapPack_optionCompress(){
   return this._optionCompress;
}

//==========================================================
// <T>获得大小。</T>
//
// @method
// @return SSize2 大小
//==========================================================
function FE3sTextureBitmapPack_size(){
   return this._size;
}

//==========================================================
// <T>获得数据。</T>
//
// @method
// @return Uint8Array 数据
//==========================================================
function FE3sTextureBitmapPack_data(){
   return this._data;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
//==========================================================
function FE3sTextureBitmapPack_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   // 读取属性
   //o._optionCompress = p.readBoolean();
   o._typeName = p.readString();
   o._formatName = p.readString();
   o._size.width = p.readUint16();
   o._size.height = p.readUint16();
   // 读取数据
   if(o._typeName == 'flat'){
      var c = p.readInt32();
   //   var d = o._data = new ArrayBuffer(c);
   //   p.readBytes(d, 0, c);
   }else if(o._typeName == 'cube'){
      o._data = new Array();
      for(var i = 0; i < 6; i++){
         var c = p.readInt32();
         var d = o._data[i] = new ArrayBuffer(c);
         p.readBytes(d, 0, c);
      }
   }else{
      throw new TError(o, 'Unserial texture failure ');
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FE3sTextureBitmapPack_dispose(){
   var o = this;
   o._data = null;
   // 父处理
   o.__base.FE3sObject.dispose.call(o);
}
