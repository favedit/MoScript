//==========================================================
// <T>空间视截体。</T>
//
// @struct
// @author maocy
// @version 150116
//==========================================================
function SFrustumPlanes(){
   var o = this;
   //..........................................................
   // @attribute
   o.planes            = new Array();
   //..........................................................
   // @method
   o.containsPoint     = SFrustumPlanes_containsPoint;
   o.containsCube      = SFrustumPlanes_containsCube;
   o.containsRectangle = SFrustumPlanes_containsRectangle;
   o.containsCorners   = SFrustumPlanes_containsCorners;
   o.containsSphere    = SFrustumPlanes_containsSphere;
   // @method
   o.updateVision      = SFrustumPlanes_updateVision;
   //..........................................................
   // construct
   for(var i = 0; i < EFrustumPlane.Count; i++){
      o.planes.push(new SPlane());
   }
   return o;
}

//============================================================
// <T>检查点是否在视截体内。</T>
//
// @param x 坐标X
// @param y 坐标Y
// @param z 坐标Z
//============================================================
function SFrustumPlanes_containsPoint(x, y, z){
   var o = this;
   var ps = o.planes;
   for(var i = 0; i < EFrustumPlane.Count; i++){
      if(ps[n].dot(x, y, z) < 0){
         return false;
      }
   }
   return true;
}

//============================================================
// <T>检查立方体是否在视截体内。</T>
//
// @param centerX 中心点X坐标
// @param centerY 中心点Y坐标
// @param centerZ 中心点Z坐标
// @param size 大小
// @return 是否包含
//============================================================
function SFrustumPlanes_containsCube(cx, cy, cz, size){
   var o = this;
   var ps = o.planes;
   for(var i = 0; i < EFrustumPlane.Count; i++){
      var p = ps[n];
      if(p.dot(cx - l, cy - l, cz - l) >= 0){
         continue;
      }
      if(p.dot(cx + l, cy - l, cz - l) >= 0){
         continue;
      }
      if(p.dot(cx - l, cy + l, cz - l) >= 0){
         continue;
      }
      if(p.dot(cx + l, cy + l, cz - l) >= 0){
         continue;
      }
      if(p.dot(cx - l, cy - l, cz + l) >= 0){
         continue;
      }
      if(p.dot(cx + l, cy - l, cz + l) >= 0){
         continue;
      }
      if(p.dot(cx - l, cy + l, cz + l) >= 0){
         continue;
      }
      if(p.dot(cx + l, cy + l, cz + l) >= 0){
         continue;
      }
      return false;
   }
   return true;
}

//============================================================
// <T>检查长方体是否在视截体内。</T>
//
// @param cx:centerX 中心点X坐标
// @param cy:centerY 中心点Y坐标
// @param cz:centerZ 中心点Z坐标
// @param sx:sizeX X大小
// @param sy:sizeY Y大小
// @param sz:sizeZ Z大小
// @return 是否包含
//============================================================
function SFrustumPlanes_containsRectangle(cx, cy, cz, sx, sy, sz){
   var o = this;
   var ps = o.planes;
   for(var i = 0; i < EFrustumPlane.Count; i++){
      var p = ps[n];
      if(p.dot(cx - sx, cy - sy, cz - sz) >= 0){
         continue;
      }
      if(p.dot(cx + sx, cy - sy, cz - sz) >= 0){
         continue;
      }
      if(p.dot(cx - sx, cy + sy, cz - sz) >= 0){
         continue;
      }
      if(p.dot(cx + sx, cy + sy, cz - sz) >= 0){
         continue;
      }
      if(p.dot(cx - sx, cy - sy, cz + sz) >= 0){
         continue;
      }
      if(p.dot(cx + sx, cy - sy, cz + sz) >= 0){
         continue;
      }
      if(p.dot(cx - sx, cy + sy, cz + sz) >= 0){
         continue;
      }
      if(p.dot(cx + sx, cy + sy, cz + sz) >= 0){
         continue;
      }
      return false;
   }
   return true;
}

//============================================================
// <T>检查长方体是否在视截体内。</T>
//
// @param p:corners:Array 顶点集合
// @return 是否包含
//============================================================
function SFrustumPlanes_containsCorners(p){
   var o = this;
   var s = o.planes;
   for(var i = EFrustumPlane.Count - 1; i >= 0; i--){
      var l = s[i];
      if(l.dot(p[ 0], p[ 1], p[ 2]) >= 0){
         continue;
      }
      if(l.dot(p[ 3], p[ 4], p[ 5]) >= 0){
         continue;
      }
      if(l.dot(p[ 6], p[ 7], p[ 8]) >= 0){
         continue;
      }
      if(l.dot(p[ 9], p[10], p[11]) >= 0){
         continue;
      }
      if(l.dot(p[12], p[13], p[14]) >= 0){
         continue;
      }
      if(l.dot(p[15], p[16], p[17]) >= 0){
         continue;
      }
      if(l.dot(p[18], p[19], p[20]) >= 0){
         continue;
      }
      if(l.dot(p[21], p[22], p[23]) >= 0){
         continue;
      }
      return false;
   }
   return true;
}

//============================================================
// <T>检查球体是否在视截体内。</T>
//
// @param px:centerX 中心点X坐标
// @param py:centerY 中心点Y坐标
// @param pz:centerZ 中心点Z坐标
// @param pr:radius 半径
// @return 是否包含
//============================================================
function SFrustumPlanes_containsSphere(px, py, pz, pr){
   var o = this;
   var ps = o.planes;
   for(var i = 0; i < EFrustumPlane.Count; i++){
      if(ps[n].dot(px, py, pz) < -pr){
         return false;
      }
   }
   return true;
}

//============================================================
// <T>更新可视范围信息。</T>
//
// @param p 矩阵数据
//============================================================
function SFrustumPlanes_updateVision(p){
   var o = this;
   var ps = o.planes;
   // 计算视截体的近平面
   var pn = ps[EFrustumPlane.Near];
   pn.a = p[ 0 + 3] + p[ 0 + 2];
   pn.b = p[ 4 + 3] + p[ 4 + 2];
   pn.c = p[ 8 + 3] + p[ 8 + 2];
   pn.d = p[12 + 3] + p[12 + 2];
   pn.normalize();
   // 计算视截体的远平面
   var pf = ps[EFrustumPlane.Far];
   pf.a = p[ 0 + 3] - p[ 0 + 2];
   pf.b = p[ 4 + 3] - p[ 4 + 2];
   pf.c = p[ 8 + 3] - p[ 8 + 2];
   pf.d = p[12 + 3] - p[12 + 2];
   pf.normalize();
   // 计算视截体的左平面
   var pl = ps[EFrustumPlane.Left];
   pl.a = p[ 0 + 3] - p[ 0 + 0];
   pl.b = p[ 4 + 3] - p[ 4 + 0];
   pl.c = p[ 8 + 3] - p[ 8 + 0];
   pl.d = p[12 + 3] - p[12 + 0];
   pl.normalize();
   // 计算视截体的右平面
   var pr = ps[EFrustumPlane.Right];
   pr.a = p[ 0 + 3] + p[ 0 + 0];
   pr.b = p[ 4 + 3] + p[ 4 + 0];
   pr.c = p[ 8 + 3] + p[ 8 + 0];
   pr.d = p[12 + 3] + p[12 + 0];
   pr.normalize();
   // 计算视截体的顶平面
   var pt = ps[EFrustumPlane.Top];
   pt.a = p[ 0 + 3] - p[ 0 + 1];
   pt.b = p[ 4 + 3] - p[ 4 + 1];
   pt.c = p[ 8 + 3] - p[ 8 + 1];
   pt.d = p[12 + 3] - p[12 + 1];
   pt.normalize();
   // 计算视截体的底平面
   var pb = ps[EFrustumPlane.Bottom];
   pb.a = p[ 0 + 3] + p[ 0 + 1];
   pb.b = p[ 4 + 3] + p[ 4 + 1];
   pb.c = p[ 8 + 3] + p[ 8 + 1];
   pb.d = p[12 + 3] + p[12 + 1];
   pb.normalize();
}
