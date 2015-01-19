//==========================================================
// <T>空间视截体。</T>
//
// @struct
// @author maocy
// @version 150116
//==========================================================
function SFrustum(o){
   if(!o){o = this;}
   //..........................................................
   // 中心点
   o.center       = new SPoint3();
   // 半径
   o.radius       = null;
   // 最小X坐标
   o.minX         = null;
   // 最大X坐标
   o.maxX         = null;
   // 最小Y坐标
   o.minY         = null;
   // 最大Y坐标
   o.maxY         = null;
   // 最小Z坐标
   o.minZ         = null;
   // 最大Z坐标
   o.maxZ         = null;
   // 顶点集合
   o.points       = new Array(24);
   o.coners       = new Array(24);
   //..........................................................
   // @method
   o.updateCenter = SFrustum_updateCenter;
   o.update       = SFrustum_update;
   o.updateFlat   = SFrustum_updateFlat;
   return o;
}

//============================================================
// <T>更新中心</T>
//
// @method
//============================================================
function SFrustum_updateCenter(){
   var o = this;
   // 计算空间内位置
   var cs = o.coners;
   o.minX = o.minY = o.minZ = Number.MAX_VALUE;
   o.maxX = o.maxY = o.maxZ = -Number.MAX_VALUE;
   var i = 0;
   while(i < 24){
      var x = cs[i++];
      if(x < o.minX){
         o.minX = x;
      }
      if(x > o.maxX){
         o.maxX = x;
      }
      var y = cs[i++];
      if(y < o.minY){
         o.minY = y;
      }
      if(y > o.maxY){
         o.maxY = y;
      }
      var z = cs[i++];
      if(z < o.minZ){
         o.minZ = z;
      }
      if(z > o.maxZ){
         o.maxZ = z;
      }
   }
   // 计算中心位置
   o.center.x = (o.minX + o.maxX) * 0.5;
   o.center.y = (o.minY + o.maxY) * 0.5;
   o.center.z = (o.minZ + o.maxZ) * 0.5;
   o.radius = Math.sqrt((o.minX - o.minY) * (o.minX - o.minY) + (o.minZ - o.maxX) * (o.minZ - o.maxX) + (o.maxY - o.maxZ) * (o.maxY - o.maxZ)) * 0.5;
}

//============================================================
// <T>更新处理</T>
//
// @param pva:viewportAngle 视角角度
// @param pvw:viewportWidth 视角宽度
// @param pvh:viewportHeight 视角高度
// @param pvn:viewportNear 视角近平面
// @param pvf:viewportFar 视角远平面
// @param pfr:frontRate 前平面比率
// @param pbr:backRate 后平面比率
// @param pm:matrix:SMatrix4x4 矩阵
//============================================================
function SFrustum_update(pva, pvw, pvh, pvn, pvf, pfr, pbr, pm){
   var o = this;
   // 计算视角信息
   var aspect = pvw / pvh;
   //var znear = -pvf * pbr;
   var znear = pvn;
   //var zfar = pvf * pfr;
   var zfar = pvf;
   var fov = Math.tan(RMath.DEGREE_RATE * pva * 0.5);
   var nearY = znear * fov;
   var nearX = nearY * aspect;
   var farY = zfar * fov;
   var farX = farY * aspect;
   // 设置空间坐标
   var ps = o.points;
   ps[ 0] = -nearX;
   ps[ 1] =  nearY;
   ps[ 2] =  znear;
   ps[ 3] =  nearX;
   ps[ 4] =  nearY;
   ps[ 5] =  znear;
   ps[ 6] =  nearX;
   ps[ 7] = -nearY;
   ps[ 8] =  znear;
   ps[ 9] = -nearX;
   ps[10] = -nearY;
   ps[11] =  znear;
   ps[12] = -farX;
   ps[13] =  farY;
   ps[14] =  zfar;
   ps[15] =  farX;
   ps[16] =  farY;
   ps[17] =  zfar;
   ps[18] =  farX;
   ps[19] = -farY;
   ps[20] =  zfar;
   ps[21] = -farX;
   ps[22] = -farY;
   ps[23] =  zfar;
   // 设置转换矩阵
   var m = RMath.matrix;
   m.assign(pm);
   m.invert();
   m.transform(o.coners, ps, 8);
   // 计算空间内位置
   o.updateCenter();
}


//============================================================
// <T>更新处理</T>
//
// @param pva:viewportAngle 视角角度
// @param pvw:viewportWidth 视角宽度
// @param pvh:viewportHeight 视角高度
// @param pvn:viewportNear 视角近平面
// @param pvf:viewportFar 视角远平面
// @param pfr:frontRate 前平面比率
// @param pbr:backRate 后平面比率
// @param pm:matrix:SMatrix4x4 矩阵
//============================================================
function SFrustum_updateFlat(pva, pvw, pvh, pvn, pvf, pfr, pbr, pm){
   var o = this;
   // 计算视角信息
   var aspect = pvw / pvh;
   var znear = pvn * pbr;
   //var znear = pvn;
   var zfar = pvf * pfr;
   //var zfar = pvf;
   var fov = Math.tan(RMath.DEGREE_RATE * pva * 0.5);
   var nearY = znear * fov;
   var nearX = nearY * aspect;
   var farY = zfar * fov;
   var farX = farY * aspect;
   // 设置空间坐标
   var ps = o.points;
   ps[ 0] = -nearX;
   ps[ 1] =  nearY;
   ps[ 2] =  znear;
   ps[ 3] =  nearX;
   ps[ 4] =  nearY;
   ps[ 5] =  znear;
   ps[ 6] =  nearX;
   ps[ 7] = -nearY;
   ps[ 8] =  znear;
   ps[ 9] = -nearX;
   ps[10] = -nearY;
   ps[11] =  znear;
   ps[12] = -farX;
   ps[13] =  farY;
   ps[14] =  zfar;
   ps[15] =  farX;
   ps[16] =  farY;
   ps[17] =  zfar;
   ps[18] =  farX;
   ps[19] = -farY;
   ps[20] =  zfar;
   ps[21] = -farX;
   ps[22] = -farY;
   ps[23] =  zfar;
   // 设置转换矩阵
   var m = RMath.matrix;
   m.assign(pm);
   m.invert();
   m.transform(o.coners, ps, 8);
   o.coners[ 1] = 0.0;
   o.coners[ 4] = 0.0;
   o.coners[ 7] = 0.0;
   o.coners[10] = 0.0;
   o.coners[13] = 0.0;
   o.coners[16] = 0.0;
   o.coners[19] = 0.0;
   o.coners[22] = 0.0;
   // 计算空间内位置
   o.updateCenter();
}
