//==========================================================
// <T>资源纹理位图打包。</T>
//
// @class
// @author maocy
// @history 150302
//==========================================================
MO.FE3sTextureBitmapPack = function FE3sTextureBitmapPack(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   //..........................................................
   // @attribute
   o._optionCompress = MO.Class.register(o, new MO.AGetter('_optionCompress'));
   o._size           = MO.Class.register(o, new MO.AGetter('_size'));
   o._data           = MO.Class.register(o, new MO.AGetter('_data'));
   o._typeName       = null;
   o._formatName     = null;
   //..........................................................
   // @method
   o.construct       = MO.FE3sTextureBitmapPack_construct;
   // @method
   o.unserialize     = MO.FE3sTextureBitmapPack_unserialize;
   // @method
   o.dispose         = MO.FE3sTextureBitmapPack_dispose;
   return o;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3sTextureBitmapPack_construct = function FE3sTextureBitmapPack_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._size = new MO.SSize2();
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
//==========================================================
MO.FE3sTextureBitmapPack_unserialize = function FE3sTextureBitmapPack_unserialize(p){
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
   }else if(o._typeName == 'cube'){
      o._data = new Array();
      for(var i = 0; i < 6; i++){
         var c = p.readInt32();
         var d = o._data[i] = new ArrayBuffer(c);
         p.readBytes(d, 0, c);
      }
   }else{
      throw new MO.TError(o, 'Unserial texture failure ');
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3sTextureBitmapPack_dispose = function FE3sTextureBitmapPack_dispose(){
   var o = this;
   o._data = null;
   // 父处理
   o.__base.FE3sObject.dispose.call(o);
}
