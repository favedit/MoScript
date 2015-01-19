//==========================================================
// <T>四维向量。</T>
//
// @struct
// @author maocy
// @version 150119
//==========================================================
function SVector4(o){
   if(!o){o = this;}
   //..........................................................
   // @attribute
   o.x           = 0;
   o.y           = 0;
   o.z           = 0;
   o.w           = 0;
   //..........................................................
   // @method
   o.assign      = SVector4_assign;
   o.set         = SVector4_set;
   o.absolute    = SVector4_absolute;
   o.normalize   = SVector4_normalize;
   o.serialize   = SVector4_serialize;
   o.unserialize = SVector4_unserialize;
   o.toString    = SVector4_toString;
   return o;
}

//==========================================================
// <T>接收数据。</T>
//
// @method
// @param p:value:SVector4 三维向量
//==========================================================
function SVector4_assign(p){
   var o = this;
   o.x = p.x;
   o.y = p.y;
   o.z = p.z;
   o.w = p.w;
}

//==========================================================
// <T>设置数据内容。</T>
//
// @method
// @param x:Number X方向
// @param y:Number Y方向
// @param z:Number Z方向
// @param w:Number W数值
//==========================================================
function SVector4_set(x, y, z, w){
   var o = this;
   o.x = x;
   o.y = y;
   o.z = z;
   o.w = w;
}

//==========================================================
// <T>获得绝对值。</T>
//
// @method
// @return Number 绝对值
//==========================================================
function SVector4_absolute(){
   var o = this;
   return Math.sqrt((o.x * o.x) + (o.y * o.y) + (o.z * o.z) + (o.w * o.w));
}

//==========================================================
// <T>单位化处理。</T>
//
// @method
//==========================================================
function SVector4_normalize(){
   var o = this;
   var v = o.absolute();
   if(v != 0.0){
      o.x /= v;
      o.y /= v;
      o.z /= v;
      o.w /= w;
   }
}

//==========================================================
// <T>序列化数据到输出流里。</T>
//
// @method
// @param p:input:FByteStream 数据流
//==========================================================
function SVector4_serialize(p){
   var o = this;
   p.writeFloat(o.x);
   p.writeFloat(o.y);
   p.writeFloat(o.z);
   p.writeFloat(o.w);
}

//==========================================================
// <T>从输入流里反序列化数据。</T>
//
// @method
// @param p:input:FByteStream 数据流
//==========================================================
function SVector4_unserialize(p){
   var o = this;
   o.x = p.readFloat();
   o.y = p.readFloat();
   o.z = p.readFloat();
   o.w = p.readFloat();
}

//==========================================================
// <T>获得字符串。</T>
//
// @method
// @return String 字符串
//==========================================================
function SVector4_toString(){
   var o = this;
   return o.x + ',' + o.y + ',' + o.z + ',' + o.w;
}
