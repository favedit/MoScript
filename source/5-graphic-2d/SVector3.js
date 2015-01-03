//==========================================================
// <T>三维向量。</T>
//
// @struct
// @author maocy
// @version 141231
//==========================================================
function SVector3(o){
   if(!o){o = this;}
   // @attribute
   o.x = 0;
   o.y = 0;
   o.z = 0;
   // @method
   o.assign    = SVector3_assign;
   o.set       = SVector3_set;
   o.absolute  = SVector3_absolute;
   o.normalize = SVector3_normalize;
   o.dotPoint3 = SVector3_dotPoint3;
   o.cross     = SVector3_cross;
   o.cross2    = SVector3_cross2;
   return o;
}

//============================================================
// <T>接收数据。</T>
//============================================================
function SVector3_assign(v){
   var o = this;
   o.x = v.x;
   o.y = v.y;
   o.z = v.z;
}

//============================================================
// <T>设置数据内容。</T>
//
// @param x:Number X方向
// @param y:Number Y方向
// @param z:Number Z方向
//============================================================
function SVector3_set(x, y, z){
   var o = this;
   o.x = x;
   o.y = y;
   o.z = z;
}

//============================================================
// <T>获得绝对值。</T>
//
// @return Number 绝对值
//============================================================
function SVector3_absolute(){
   var o = this;
   return Math.sqrt((o.x * o.x) + (o.y * o.y) + (o.z * o.z));
}

//============================================================
// <T>单位化处理。</T>
//============================================================
function SVector3_normalize(){
   var o = this;
   var v = o.absolute();
   if(v != 0.0){
      o.x /= v;
      o.y /= v;
      o.z /= v;
   }
}

//============================================================
// <T>向量点乘</T>
//
// @param v:value:SVector3 三维向量
//============================================================
function SVector3_dotPoint3(v){
   var o = this;
   return (o.x * v.x) + (o.y * v.y) + (o.z * v.z);
}

//============================================================
// <T>点乘(内积)。</T>
//
// @param v:value:SVector3 三维向量
//============================================================
function SVector3_cross(v){
   var o = this;
   var vx = (o.y * v.z) - (o.z * v.y);
   var vy = (o.z * v.x) - (o.x * v.z);
   var vz = (o.x * v.y) - (o.y * v.x);
   o.x = vx;
   o.y = vy;
   o.z = vz;
}

//============================================================
// <T>点乘(内积)。</T>
//
// @param po:output:SVector3 输出三维向量
// @param pi:input:SVector3 输入三维向量
//============================================================
function SVector3_cross2(po, pi){
   var o = this;
   po.x = (o.y * pi.z) - (o.z * pi.y);
   po.y = (o.z * pi.x) - (o.x * pi.z);
   po.z = (o.x * pi.y) - (o.y * pi.x);
}
