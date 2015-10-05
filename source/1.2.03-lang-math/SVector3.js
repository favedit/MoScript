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
MO.SVector3 = function SVector3(x, y, z){
   var o = this;
   MO.SValue3.call(o, x, y, z);
   //..........................................................
   // @method
   o.length    = o.absolute;
   o.direction = MO.SVector3_direction;
   // @method
   o.conjugate = MO.SVector3_conjugate;
   o.dotPoint3 = MO.SVector3_dotPoint3;
   o.cross     = MO.SVector3_cross;
   o.cross2    = MO.SVector3_cross2;
   o.slerp     = MO.SVector3_slerp;
   o.clone     = MO.SVector3_clone;
   return o;
}

//==========================================================
// <T>计算2个点的方向</T>
//
// @method
// @param startPoint:SPoint3 开始点
// @param endPoint:SPoint3 结束点
//==========================================================
MO.SVector3_direction = function SVector3_direction(startPoint, endPoint){
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
MO.SVector3_conjugate = function SVector3_conjugate(p){
   var o = this;
   var r = null;
   if(p){
      r = p;
   }else{
      r = new MO.SVector3();
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
// @param value:SVector3 三维向量
//==========================================================
MO.SVector3_dotPoint3 = function SVector3_dotPoint3(value){
   var o = this;
   return (o.x * value.x) + (o.y * value.y) + (o.z * value.z);
}

//==========================================================
// <T>点乘(内积)。</T>
//
// @method
// @param value:SVector3 三维向量
//==========================================================
MO.SVector3_cross = function SVector3_cross(value){
   var o = this;
   var vx = (o.y * value.z) - (o.z * value.y);
   var vy = (o.z * value.x) - (o.x * value.z);
   var vz = (o.x * value.y) - (o.y * value.x);
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
MO.SVector3_cross2 = function SVector3_cross2(po, pi){
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
MO.SVector3_slerp = function SVector3_slerp(v1, v2, r){
   var o = this;
   o.x = (v2.x - v1.x) * r + v1.x;
   o.y = (v2.y - v1.y) * r + v1.y;
   o.z = (v2.z - v1.z) * r + v1.z;
}

//==========================================================
// <T>获得克隆对象。</T>
//
// @method
// @return SVector3 克隆对象
//==========================================================
MO.SVector3_clone = function SVector3_clone(){
   var o = this;
   var r = new MO.SVector3();
   r.x = o.x;
   r.y = o.y;
   r.z = o.z;
   return r;
}
