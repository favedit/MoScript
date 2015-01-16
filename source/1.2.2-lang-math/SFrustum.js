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
   // @attribute 转换矩阵
   o.conerMatrix = null;
   // 中心点
   o.center = null;
   // 半径
   o.radius = null;
   // 最小X坐标
   o.minX = null;
   // 最大X坐标
   o.maxX = null;
   // 最小Y坐标
   o.minY = null;
   // 最大Y坐标
   o.maxY = null;
   // 最小Z坐标
   o.minZ = null;
   // 最大Z坐标
   o.maxZ = null;
   // 顶点集合
   o.coners = new Array(24);
   //..........................................................
   // @method
   o.updateCenter = SFrustum_updateCenter;
   o.update       = SFrustum_update;
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
   var n = 0;
   //o.minX = o.minY = o.minZ = MO_TP_FLOAT_MAX;
   //o.maxX = o.maxY = o.maxZ = MO_TP_FLOAT_MIN;
   while(n < 24){
      var x = coners[n++];
      if(x < minX){
         minX = x;
      }
      if(x > maxX){
         maxX = x;
      }
      var y = coners[n++];
      if(y < minY){
         minY = y;
      }
      if(y > maxY){
         maxY = y;
      }
      var z = coners[n++];
      if(z < minZ){
         minZ = z;
      }
      if(z > maxZ){
         maxZ = z;
      }
   }
   // 计算中心位置
   center.x = (minX + maxX) * 0.5;
   center.y = (minY + maxY) * 0.5;
   center.z = (minZ + maxZ) * 0.5;
   radius = Math.sqrt((minX - minY) * (minX - minY) + (minZ - maxX) * (minZ - maxX) + (maxY - maxZ) * (maxY - maxZ)) * 0.5;
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
// @param matrix 矩阵
//============================================================
function SFrustum_update(pva, pvw, pvh, pvn, pvf, pfr, pbr, matrix){
   var o = this;
   // 计算视角信息
   var aspect = pvw / pvh;
   var znear = -pvf * pbr;
   var zfar = pvf * pfr;
   var fov = tan(MO_GRAPHIC_DEGREE_RATE * pva * 0.5);
   var nearY = znear * fov;
   var nearX = nearY * aspect;
   var farY = zfar * fov;
   var farX = farY * aspect;
   // 设置空间坐标
   var points = [
      -nearX,  nearY, znear,
       nearX,  nearY, znear,
       nearX, -nearY, znear,
      -nearX, -nearY, znear,
      -farX,   farY,  zfar,
       farX,   farY,  zfar,
       farX,  -farY,  zfar,
      -farX,  -farY,  zfar];
   // 设置转换矩阵
   conerMatrix.assign(matrix);
   conerMatrix.invert();
   conerMatrix.transform(coners, points, 24);
   // 计算空间内位置
   o.updateCenter();
}
