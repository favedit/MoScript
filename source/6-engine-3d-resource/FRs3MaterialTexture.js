//==========================================================
// <T>资源材质纹理。</T>
//
// @author maocy
// @history 150108
//==========================================================
function FRs3MaterialTexture(o){
   o = RClass.inherits(this, o, FRs3Resource);
   //..........................................................
   // @attribute
   o._code        = null;
   o._textureCode = null;
   o._bitmapCode  = null;
   //..........................................................
   // @method
   o.code         = FRs3MaterialTexture_code;
   o.textureCode  = FRs3MaterialTexture_textureCode;
   o.bitmapCode   = FRs3MaterialTexture_bitmapCode;
   o.unserialize  = FRs3MaterialTexture_unserialize;
   return o;
}

//==========================================================
// <T>获得代码。</T>
//
// @method
// @return String 代码
//==========================================================
function FRs3MaterialTexture_code(){
   return this._code;
}

//==========================================================
// <T>获得纹理代码。</T>
//
// @method
// @return String 纹理代码
//==========================================================
function FRs3MaterialTexture_textureCode(){
   return this._textureCode;
}

//==========================================================
// <T>获得位图代码。</T>
//
// @method
// @return String 位图代码
//==========================================================
function FRs3MaterialTexture_bitmapCode(){
   return this._bitmapCode;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FRs3MaterialTexture_unserialize(p){
   // 读取父信息
   var o = this;
   o._code = p.readString();
   o._textureCode = p.readString();
   o._bitmapCode = p.readString();
}
