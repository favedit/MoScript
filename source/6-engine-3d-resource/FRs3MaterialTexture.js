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
   o._packCode    = null;
   o._textureCode = null;
   //..........................................................
   // @method
   o.unserialize = FRs3MaterialTexture_unserialize;
   return o;
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
   o._packCode = null;
   o._textureCode = null;
}
