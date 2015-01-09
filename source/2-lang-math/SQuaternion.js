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
   o.x           = 0.0;
   o.y           = 0.0;
   o.z           = 0.0;
   o.w           = 1.0;
   //..........................................................
   // @method
   o.assign      = SQuaternion_assign;
   o.set         = SQuaternion_set;
   o.absolute    = SQuaternion_absolute;
   o.normalize   = SQuaternion_normalize;
   o.slerp       = SQuaternion_slerp;
   o.serialize   = SQuaternion_serialize;
   o.unserialize = SQuaternion_unserialize;
   o.toString    = SQuaternion_toString;
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
