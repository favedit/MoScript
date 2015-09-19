//==========================================================
// <T>三维向量。</T>
//
// @struct
// @param x:Number X方向
// @param y:Number Y方向
// @param z:Number Z方向
// @author maocy
// @version 141231
//==========================================================
MO.SVector2 = function SVector2(x, y, z){
   var o = this;
   MO.SValue2.call(o, x, y, z);
   //..........................................................
   // @method
   o.length    = o.absolute;
   o.direction = MO.SVector2_direction;
   // @method
   o.conjugate = MO.SVector2_conjugate;
   o.dotPoint3 = MO.SVector2_dotPoint3;
   o.cross     = MO.SVector2_cross;
   o.cross2    = MO.SVector2_cross2;
   o.slerp     = MO.SVector2_slerp;
   o.clone     = MO.SVector2_clone;
   return o;
}

//==========================================================
// <T>计算2个点的方向</T>
//
// @method
// @param startPoint:SPoint3 开始点
// @param endPoint:SPoint3 结束点
//==========================================================
MO.SVector2_direction = function SVector2_direction(startPoint, endPoint){
   var o = this;
   o.x = endPoint.x - startPoint.x;
   o.y = endPoint.y - startPoint.y;
   o.z = endPoint.z - startPoint.z;
   return o;
}

//============================================================
// <T>获得反方向。</T>
//
// @method
// @param p:value:SQuaternion 四元数
// @return SQuaternion 四元数
//============================================================
MO.SVector2_conjugate = function SVector2_conjugate(p){
   var o = this;
   var r = null;
   if(p){
      r = p;
   }else{
      r = new MO.SVector2();
   }
   r.x = -o.x;
   r.y = -o.y;
   r.z = -o.z;
   return r;
}

//==========================================================
// <T>向量点乘</T>
//
// @method
// @param v:value:SVector2 三维向量
//==========================================================
MO.SVector2_dotPoint3 = function SVector2_dotPoint3(v){
   var o = this;
   return (o.x * v.x) + (o.y * v.y) + (o.z * v.z);
}

//==========================================================
// <T>点乘(内积)。</T>
//
// @method
// @param v:value:SVector2 三维向量
//==========================================================
MO.SVector2_cross = function SVector2_cross(v){
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
// @param po:output:SVector2 输出三维向量
// @param pi:input:SVector2 输入三维向量
//==========================================================
MO.SVector2_cross2 = function SVector2_cross2(po, pi){
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
MO.SVector2_slerp = function SVector2_slerp(v1, v2, r){
   var o = this;
   o.x = (v2.x - v1.x) * r + v1.x;
   o.y = (v2.y - v1.y) * r + v1.y;
   o.z = (v2.z - v1.z) * r + v1.z;
}

//==========================================================
// <T>获得克隆对象。</T>
//
// @method
// @return SVector2 克隆对象
//==========================================================
MO.SVector2_clone = function SVector2_clone(){
   var o = this;
   var r = new MO.SVector2();
   r.x = o.x;
   r.y = o.y;
   r.z = o.z;
   return r;
}
