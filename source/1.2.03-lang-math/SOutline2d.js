//==========================================================
// <T>三维轮廓。</T>
//  00 ── 01
//  │      │
//  │      │
//  03 ── 02
//
// @struct
// @author maocy
// @version 150912
//==========================================================
MO.SOutline2d = function SOutline2d(){
   var o = this;
   MO.SOutline2.call(o);
   //..........................................................
   // @attribute 中心点
   o.center        = new MO.SPoint2();
   o.distance      = new MO.SPoint2();
   // @attribute 半径
   o.radius        = 0;
   // @attribute 顶点集合
   o.points        = new Array(8);
   //..........................................................
   // @method
   o.assign        = MO.SOutline2d_assign;
   o.set           = MO.SOutline2d_set;
   o.update        = MO.SOutline2d_update;
   return o;
}

//============================================================
// <T>接收一个三维轮廓。</T>
//
// @method
// @param p:value:SOutline3 三维轮廓
//============================================================
MO.SOutline2d_assign = function SOutline2d_assign(value){
   var o = this;
   o.center.assign(value.center);
   o.distance.assign(value.distance);
   o.radius = value.radius;
   for(var i = 0; i < 8; i++){
      o.points[i] = value.points[i];
   }
}

//==========================================================
// <T>设置参数。</T>
//
// @method
// @param ix:minX:Number 最小X坐标
// @param iy:minY:Number 最小Y坐标
// @param ax:maxX:Number 最大X坐标
// @param ay:maxY:Number 最大Y坐标
//==========================================================
MO.SOutline2d_set = function SOutline2d_set(minX, minY, maxX, maxY){
   var o = this;
   o.min.set(minX, minY);
   o.max.set(maxX, maxY);
   o.update();
}

//============================================================
// <T>根据轮廓更新数据。</T>
//
// @method
//============================================================
MO.SOutline2d_update = function SOutline2d_update(){
   var o = this;
   // 获得数据
   var min = o.min;
   var minX = min.x;
   var minY = min.y;
   var max = o.max;
   var maxX = max.x;
   var maxY = max.y;
   // 设置空间坐标
   var ps = o.points;
   ps[0] = minX;
   ps[1] = maxY;
   ps[2] = maxX;
   ps[3] = maxY;
   ps[4] = maxX;
   ps[5] = minY;
   ps[6] = minX;
   ps[7] = minY;
   // 计算中心位置
   var center = o.center;
   center.x = (minX + maxX) * 0.5;
   center.y = (minY + maxY) * 0.5;
   // 计算距离
   var distance = o.distance;
   distance.x = maxX - minX;
   distance.y = maxY - minY;
   // 计算半径
   var cx = maxX - minX;
   var cy = maxY - minY;
   o.radius = Math.sqrt(cx * cx + cy * cy) * 0.5;
}
