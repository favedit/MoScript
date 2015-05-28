//==========================================================
// <T>资源材质纹理。</T>
//
// @author maocy
// @history 150108
//==========================================================
function FE3sMaterialBitmap(o){
   o = RClass.inherits(this, o, FE3sObject);
   //..........................................................
   // @attribute
   o._bitmapPackGuid = null;
   o._bitmapPack     = null;
   o._bitmapGuid     = null;
   o._index          = 0;
   //..........................................................
   // @method
   o.bitmapPackGuid  = FE3sMaterialBitmap_bitmapPackGuid;
   o.bitmapPack      = FE3sMaterialBitmap_bitmapPack;
   o.setBitmapPack   = FE3sMaterialBitmap_setBitmapPack;
   o.bitmapGuid      = FE3sMaterialBitmap_bitmapGuid;
   // @method
   o.unserialize     = FE3sMaterialBitmap_unserialize;
   return o;
}

//==========================================================
// <T>获得纹理打包唯一代码。</T>
//
// @method
// @return String 唯一代码
//==========================================================
function FE3sMaterialBitmap_bitmapPackGuid(){
   return this._bitmapPackGuid;
}

//==========================================================
// <T>获得图片打包。</T>
//
// @method
// @return FE3sMaterialBitmapPack 图片打包
//==========================================================
function FE3sMaterialBitmap_bitmapPack(){
   return this._bitmapPack;
}

//==========================================================
// <T>设置图片图片打包。</T>
//
// @method
// @return bitmapPack 图片打包
//==========================================================
function FE3sMaterialBitmap_setBitmapPack(bitmapPack){
   this._bitmapPack = bitmapPack;
}

//==========================================================
// <T>获得图片唯一代码。</T>
//
// @method
// @return String 唯一代码
//==========================================================
function FE3sMaterialBitmap_bitmapGuid(){
   return this._bitmapGuid;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param input:FByteStream 数据流
//==========================================================
function FE3sMaterialBitmap_unserialize(input){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, input);
   // 读取属性
   o._bitmapPackGuid = input.readString();
   o._bitmapGuid = input.readString();
   o._index = input.readUint16();
}
