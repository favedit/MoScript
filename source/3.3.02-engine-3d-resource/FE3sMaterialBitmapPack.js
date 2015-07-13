//==========================================================
// <T>资源纹理位图打包。</T>
//
// @class
// @author maocy
// @history 150416
//==========================================================
MO.FE3sMaterialBitmapPack = function FE3sMaterialBitmapPack(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   //..........................................................
   // @attribute
   o._typeName   = MO.Class.register(o, new MO.AGetter('_typeName'));
   o._formatName = MO.Class.register(o, new MO.AGetter('_formatName'));
   o._size       = MO.Class.register(o, new MO.AGetter('_size'));
   //..........................................................
   // @method
   o.construct   = MO.FE3sMaterialBitmapPack_construct;
   // @method
   o.unserialize = MO.FE3sMaterialBitmapPack_unserialize;
   // @method
   o.dispose     = MO.FE3sMaterialBitmapPack_dispose;
   return o;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3sMaterialBitmapPack_construct = function FE3sMaterialBitmapPack_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._size = new MO.SSize2();
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @method
// @param input:FByteStream 数据流
//==========================================================
MO.FE3sMaterialBitmapPack_unserialize = function FE3sMaterialBitmapPack_unserialize(input){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, input);
   // 读取属性
   o._typeName = input.readString();
   o._formatName = input.readString();
   o._size.unserialize(input, MO.EDataType.Uint16);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3sMaterialBitmapPack_dispose = function FE3sMaterialBitmapPack_dispose(){
   var o = this;
   o._size = MO.Lang.Object.dispose(o._size);
   // 父处理
   o.__base.FE3sObject.dispose.call(o);
}
