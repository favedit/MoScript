//==========================================================
// <T>四元数。</T>
//
// @struct
// @author maocy
// @version 150109
//==========================================================
function SQuaternion(o){
   if(!o){o = this;}
   //..........................................................
   // @attribute
   o.x             = 0.0;
   o.y             = 0.0;
   o.z             = 0.0;
   o.w             = 1.0;
   //..........................................................
   // @method
   o.assign        = SQuaternion_assign;
   o.set           = SQuaternion_set;
   o.absolute      = SQuaternion_absolute;
   o.normalize     = SQuaternion_normalize;
   o.mul           = SQuaternion_mul;
   o.mul2          = SQuaternion_mul2;
   o.slerp         = SQuaternion_slerp;
   o.fromAxisAngle = SQuaternion_fromAxisAngle;
   o.serialize     = SQuaternion_serialize;
   o.unserialize   = SQuaternion_unserialize;
   o.toString      = SQuaternion_toString;
   return o;
}

//============================================================
// <T>接收一个四元数。</T>
//
// @method
// @param p:value:SQuaternion 四元数
//============================================================
function SQuaternion_assign(p){
   var o = this;
   o.x = p.x;
   o.y = p.y;
   o.z = p.z;
   o.w = p.w;
}

//============================================================
// <T>设置数据内容。</T>
//
// @method
// @param x:Number X分量
// @param y:Number Y分量
// @param z:Number Z分量
// @param w:Number W分量
//============================================================
function SQuaternion_set(x, y, z, w){
   var o = this;
   o.x = x;
   o.y = y;
   o.z = z;
   o.w = w;
}

//============================================================
// <T>获得绝对值。</T>
//
// @method
// @return Number 绝对值
//============================================================
function SQuaternion_absolute(){
   var o = this;
   return Math.sqrt((o.x * o.x) + (o.y * o.y) + (o.z * o.z) + (o.w * o.w));
}

//============================================================
// <T>单位化处理。</T>
//
// @method
//============================================================
function SQuaternion_normalize(){
   var o = this;
   var a = o.absolute();
   var v = 1.0 / a;
   o.x *= v;
   o.y *= v;
   o.z *= v;
   o.w *= v;
}

//============================================================
// <T>乘法处理。</T>
//
// @method
// @param p:value:SQuaternion 四元数
//============================================================
function SQuaternion_mul(p){
   var o = this;
   var x = o.x;
   var y = o.y;
   var z = o.z;
   var w = o.w;
   o.x = (w * p.x) + (x * p.w) + (y * p.z) - (z * p.y);
   o.y = (w * p.y) + (y * p.w) + (z * p.x) - (x * p.z);
   o.z = (w * p.z) + (z * p.w) + (x * p.y) - (y * p.x);
   o.w = (w * p.w) - (x * p.x) - (y * p.y) - (z * p.z);
}

//============================================================
// <T>乘法处理。</T>
//
// @method
// @param p1:value1:SQuaternion 四元数1
// @param p2:value2:SQuaternion 四元数2
//============================================================
function SQuaternion_mul2(p1, p2){
   var o = this;
   o.x = (p1.w * p2.x) + (p1.x * p2.w) + (p1.y * p2.z) - (p1.z * p2.y);
   o.y = (p1.w * p2.y) + (p1.y * p2.w) + (p1.z * p2.x) - (p1.x * p2.z);
   o.z = (p1.w * p2.z) + (p1.z * p2.w) + (p1.x * p2.y) - (p1.y * p2.x);
   o.w = (p1.w * p2.w) - (p1.x * p2.x) - (p1.y * p2.y) - (p1.z * p2.z);
}

//============================================================
// <T>计算插值。</T>
//
// @method
// @param v1:value1:SQuaternion 开始四元数
// @param v2:value2:SQuaternion 结束四元数
// @param r:rate:Float 比率
//============================================================
function SQuaternion_slerp(v1, v2, r){
   var o = this;
   var rv = (v1.x * v2.x) + (v1.y * v2.y) + (v1.z * v2.z) + (v1.w * v2.w);
   var rf = false;
   if (rv < 0.0){
      rf = true;
      rv = -rv;
   }
   var r1 = 0.0;
   var r2 = 0.0;
   if(rv > 0.999999){
      r1 = 1.0 - r;
      r2 = rf ? -r : r;
   }else{
      var ra = Math.acos(rv);
      var rb = 1.0 / Math.sin(ra);
      r1 = Math.sin((1.0 - r) * ra) * rb;
      r2 = rf ? (-Math.sin(r * ra) * rb) : (Math.sin(r * ra) * rb);
   }
   o.x = (r1 * v1.x) + (r2 * v2.x);
   o.y = (r1 * v1.y) + (r2 * v2.y);
   o.z = (r1 * v1.z) + (r2 * v2.z);
   o.w = (r1 * v1.w) + (r2 * v2.w);
}

//==========================================================
// <T>用轴向量和旋转角创建一个四元组。</T>
//
// @method
// @param a:axis:SVector3 方向轴
// @param g:angle:Number 弧度
//==========================================================
function SQuaternion_fromAxisAngle(a, g){
   var o = this;
   var r = g * 0.5;
   var s = Math.sin(r);
   o.x = a.x * s;
   o.y = a.y * s;
   o.z = a.z * s;
   o.w = Math.cos(r);
}

//==========================================================
// <T>序列化数据到输出流里。</T>
//
// @method
// @param p:input:FByteStream 数据流
//==========================================================
function SQuaternion_serialize(p){
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
function SQuaternion_unserialize(p){
   var o = this;
   o.x = p.readFloat();
   o.y = p.readFloat();
   o.z = p.readFloat();
   o.w = p.readFloat();
}

//============================================================
// <T>获得字符串。</T>
//
// @method
// @return String 字符串
//============================================================
function SQuaternion_toString(){
   var o = this;
   return o.x + ',' + o.y + ',' + o.z + ',' + o.w;
}
