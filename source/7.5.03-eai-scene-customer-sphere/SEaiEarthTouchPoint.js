//==========================================================
// <T>地球接触点。</T>
//
// @struct
// @author maocy
// @version 151010
//==========================================================
MO.SEaiEarthTouchPoint = function SEaiEarthTouchPoint(){
   var o = this;
   //..........................................................
   // @attribute 点击位置
   o.position       = new MO.SPoint2();
   // @attribute 点击方向
   o.direction      = new MO.SVector3();
   // @attribute 地球位置
   o.sphereLocation = new MO.SVector3();
   // @attribute 地图位置
   o.mapLocation    = new MO.SPoint2();
   //..........................................................
   // @method
   o.setInfo        = MO.SEaiEarthTouchPoint_setInfo;
   o.calculate      = MO.SEaiEarthTouchPoint_calculate;
   // @method
   o.toString       = MO.SEaiEarthTouchPoint_toString;
   return o;
}

//============================================================
// <T>设置信息。</T>
//
// @method
// @return info 信息
//============================================================
MO.SEaiEarthTouchPoint_setInfo = function SEaiEarthTouchPoint_setInfo(info){
   var o = this;
   // 计算数据
   var cx = (info.x() - 0.5) * 2;
   var cy = -(info.y() - 0.5) * 2;
   var length = MO.Lang.Float.toRange(Math.sqrt(cx * cx + cy * cy), 0, 1);
   // 设置位置
   o.position.set(cx, cy);
   // 设置方向
   var direction = o.direction;
   direction.x = cx;
   direction.y = cy;
   direction.z = -Math.sin(Math.acos(length));
   direction.normalize();
}

//============================================================
// <T>计算处理。</T>
//
// @method
// @return matrix 矩阵
//============================================================
MO.SEaiEarthTouchPoint_calculate = function SEaiEarthTouchPoint_calculate(matrix){
   var o = this;
   // 计算球面位置
   var sphereLocation = o.sphereLocation;
   matrix.transformPoint3(o.direction, sphereLocation);
   // 计算地区位置
   var x = Math.atan2(sphereLocation.x, sphereLocation.z) / Math.PI / 2 + 0.5;
   var y = Math.asin(sphereLocation.y) / Math.PI + 0.5;
   o.mapLocation.set(x, y);
}

//============================================================
// <T>获得字符串。</T>
//
// @method
// @return String 字符串
//============================================================
MO.SEaiEarthTouchPoint_toString = function SEaiEarthTouchPoint_toString(){
   var o = this;
   return 'P(' + o.position.toDisplay() + ') D(' + o.direction.toDisplay() + ') L(' + o.sphereLocation.toDisplay() + ') M(' + o.mapLocation.toDisplay() + ')';
}
