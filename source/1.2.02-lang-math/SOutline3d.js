//==========================================================
// <T>三维轮廓。</T>
//      04 ── 05
//    ╱│    ╱ │
//  00 ── 01   │
//  │  07─│─ 06
//  │╱    │ ╱
//  03 ── 02
//
// @struct
// @author maocy
// @version 141231
//==========================================================
function SOutline3d(){
   var o = this;
   SOutline3.call(o);
   //..........................................................
   // @attribute 中心点
   o.center        = new SPoint3();
   o.distance      = new SPoint3();
   // @attribute 半径
   o.radius        = 0;
   // @attribute 顶点集合
   o.points        = new Array(24);
   //..........................................................
   // @method
   o.update        = SOutline3d_update;
   o.calculateFrom = SOutline3d_calculateFrom;
   o.calculate     = SOutline3d_calculate;
   return o;
}

//============================================================
// <T>根据轮廓更新数据。</T>
//
// @method
//============================================================
function SOutline3d_update(){
   var o = this;
   // 获得数据
   var min = o.min;
   var minX = min.x;
   var minY = min.y;
   var minZ = min.z;
   var max = o.max;
   var maxX = max.x;
   var maxY = max.y;
   var maxZ = max.z;
   // 设置空间坐标
   var ps = o.points;
   ps[ 0] = minX;
   ps[ 1] = maxY;
   ps[ 2] = minZ;
   ps[ 3] = maxX;
   ps[ 4] = maxY;
   ps[ 5] = minZ;
   ps[ 6] = maxX;
   ps[ 7] = minY;
   ps[ 8] = minZ;
   ps[ 9] = minX;
   ps[10] = minY;
   ps[11] = minZ;
   ps[12] = minX;
   ps[13] = maxY;
   ps[14] = maxZ;
   ps[15] = maxX;
   ps[16] = maxY;
   ps[17] = maxZ;
   ps[18] = maxX;
   ps[19] = minY;
   ps[20] = maxZ;
   ps[21] = minX;
   ps[22] = minY;
   ps[23] = maxZ;
   // 计算中心位置
   var center = o.center;
   center.x = (minX + maxX) * 0.5;
   center.y = (minY + maxY) * 0.5;
   center.z = (minZ + maxZ) * 0.5;
   // 计算距离
   var distance = o.distance;
   distance.x = maxX - minX;
   distance.y = maxY - minY;
   distance.z = maxZ - minZ;
   // 计算半径
   var cx = maxX - minX;
   var cy = maxY - minY;
   var cz = maxZ - minZ;
   o.radius = Math.sqrt(cx * cx + cy * cy + cz * cz) * 0.5;
}

//============================================================
// <T>根据轮廓和矩阵计算新轮廓。</T>
//
// @method
//============================================================
function SOutline3d_calculateFrom(outline, matrix){
   var o = this;
   // 计算顶点数据
   var points = o.points;
   matrix.transform(points, 0, outline.points, 0, 8);
   // 计算最大和最小顶点
   var minX = minY = minZ = Number.MAX_VALUE;
   var maxX = maxY = maxZ = -Number.MAX_VALUE;
   var i = 0;
   while(i < 24){
      var x = points[i++];
      if(x < minX){
         minX = x;
      }
      if(x > maxX){
         maxX = x;
      }
      var y = points[i++];
      if(y < minY){
         minY = y;
      }
      if(y > maxY){
         maxY = y;
      }
      var z = points[i++];
      if(z < minZ){
         minZ = z;
      }
      if(z > maxZ){
         maxZ = z;
      }
   }
   o.min.set(minX, minY, minZ);
   o.max.set(maxX, maxY, maxZ);
   // 计算其他数据
   o.update();
}

//============================================================
// <T>根据点坐标计算数据。</T>
//
// @method
//============================================================
function SOutline3d_calculate(p){
   var o = this;
   // 计算空间内位置
   var vix = viy = viz = Number.MAX_VALUE;
   var vax = vay = vaz = -Number.MAX_VALUE;
   var i = 0;
   var d = o.points;
   while(i < 24){
      var x = d[i++];
      if(x < vix){
         vix = x;
      }
      if(x > vax){
         vax = x;
      }
      var y = d[i++];
      if(y < viy){
         viy = y;
      }
      if(y > vay){
         vay = y;
      }
      var z = d[i++];
      if(z < viz){
         viz = z;
      }
      if(z > vaz){
         vaz = z;
      }
   }
   o.min.set(vix, viy, viz);
   o.max.set(vax, vay, vaz);
   // 计算中心位置
   o.center.x = (vix + vax) * 0.5;
   o.center.y = (viy + vay) * 0.5;
   o.center.z = (viz + vaz) * 0.5;
   // 计算半径
   var cx = vax - vix;
   var cy = vay - viy;
   var cz = vaz - viz;
   o.radius = Math.sqrt(cx * cx + cy * cy + cz * cz) * 0.5;
}
