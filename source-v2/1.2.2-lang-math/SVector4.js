//==========================================================
// <T>四维向量。</T>
//
// @struct
// @author maocy
// @version 150119
//==========================================================
function SVector4(x, y, z, w){
   var o = this;
   SValue4.call(o, x, y, z, w);
   //..........................................................
   // @method
   o.serialize3   = SVector4_serialize3;
   o.unserialize3 = SVector4_unserialize3;
   return o;
}

//==========================================================
// <T>序列化数据到输出流里。</T>
//
// @method
// @param p:input:FByteStream 数据流
//==========================================================
function SVector4_serialize3(p){
   var o = this;
   p.writeFloat(o.x);
   p.writeFloat(o.y);
   p.writeFloat(o.z);
}

//==========================================================
// <T>从输入流里反序列化数据。</T>
//
// @method
// @param p:input:FByteStream 数据流
//==========================================================
function SVector4_unserialize3(p){
   var o = this;
   o.x = p.readFloat();
   o.y = p.readFloat();
   o.z = p.readFloat();
}
