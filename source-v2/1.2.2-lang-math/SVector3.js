//==========================================================
// <T>三维向量。</T>
//
// @struct
// @author maocy
// @version 141231
//==========================================================
function SVector3(o){
   if(!o){o = this;}
   //..........................................................
   // @attribute
   o.x           = 0;
   o.y           = 0;
   o.z           = 0;
   //..........................................................
   // @method
   o.assign      = SVector3_assign;
   o.set         = SVector3_set;
   o.absolute    = SVector3_absolute;
   o.normalize   = SVector3_normalize;
   o.dotPoint3   = SVector3_dotPoint3;
   o.cross       = SVector3_cross;
   o.cross2      = SVector3_cross2;
   o.slerp       = SVector3_slerp;
   o.serialize   = SVector3_serialize;
   o.unserialize = SVector3_unserialize;
   o.toString    = SVector3_toString;
   return o;
}

//==========================================================
// <T>接收数据。</T>
//
// @method
// @param p:value:SVector3 三维向量
//==========================================================
function SVector3_assign(p){
   var o = this;
   o.x = p.x;
   o.y = p.y;
   o.z = p.z;
}

//==========================================================
// <T>设置数据内容。</T>
//
// @method
// @param x:Number X方向
// @param y:Number Y方向
// @param z:Number Z方向
//==========================================================
function SVector3_set(x, y, z){
   var o = this;
   o.x = x;
   o.y = y;
   o.z = z;
}

//==========================================================
// <T>获得绝对值。</T>
//
// @method
// @return Number 绝对值
//==========================================================
function SVector3_absolute(){
   var o = this;
   return Math.sqrt((o.x * o.x) + (o.y * o.y) + (o.z * o.z));
}

//==========================================================
// <T>单位化处理。</T>
//
// @method
//==========================================================
function SVector3_normalize(){
   var o = this;
   var v = o.absolute();
   if(v != 0.0){
      o.x /= v;
      o.y /= v;
      o.z /= v;
   }
}

//==========================================================
// <T>向量点乘</T>
//
// @method
// @param v:value:SVector3 三维向量
//==========================================================
function SVector3_dotPoint3(v){
   var o = this;
   return (o.x * v.x) + (o.y * v.y) + (o.z * v.z);
}

//==========================================================
// <T>点乘(内积)。</T>
//
// @method
// @param v:value:SVector3 三维向量
//==========================================================
function SVector3_cross(v){
   var o = this;
   var vx = (o.y * v.z) - (o.z * v.y);
   var vy = (o.z * v.x) - (o.x * v.z);
   var vz = (o.x * v.y) - (o.y * v.x);
   o.x = vx;
   o.y = vy;
   o.z = vz;
}

//==========================================================
// <T>点乘(内积)。</T>
//
// @method
// @param po:output:SVector3 输出三维向量
// @param pi:input:SVector3 输入三维向量
//==========================================================
function SVector3_cross2(po, pi){
   var o = this;
   po.x = (o.y * pi.z) - (o.z * pi.y);
   po.y = (o.z * pi.x) - (o.x * pi.z);
   po.z = (o.x * pi.y) - (o.y * pi.x);
}

//==========================================================
// <T>计算插值。</T>
//
// @method
// @param v1:value1:SQuaternion 开始四元数
// @param v2:value2:SQuaternion 结束四元数
// @param r:rate:Float 比率
//==========================================================
function SVector3_slerp(v1, v2, r){
   var o = this;
   o.x = (v2.x - v1.x) * r + v1.x;
   o.y = (v2.y - v1.y) * r + v1.y;
   o.z = (v2.z - v1.z) * r + v1.z;
}

//==========================================================
// <T>序列化数据到输出流里。</T>
//
// @method
// @param p:input:FByteStream 数据流
//==========================================================
function SVector3_serialize(p){
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
function SVector3_unserialize(p){
   var o = this;
   o.x = p.readFloat();
   o.y = p.readFloat();
   o.z = p.readFloat();
}

//==========================================================
// <T>获得字符串。</T>
//
// @method
// @return String 字符串
//==========================================================
function SVector3_toString(){
   var o = this;
   return o.x + ',' + o.y + ',' + o.z;
}
