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
   o.originPosition = new MO.SPoint2();
   // @attribute 点击长度
   o.originLength    = 0;
   // @attribute 点击位置
   o.position        = new MO.SPoint2();
   // @attribute 点击长度
   o.positionLength  = 0;
   // @attribute 点击方向
   o.direction       = new MO.SVector3();
   // @attribute 地球位置
   o.sphereLocation  = new MO.SVector3();
   // @attribute 地图位置
   o.mapLocation     = new MO.SPoint2();
   //..........................................................
   // @method
   o.setInfo         = MO.SEaiEarthTouchPoint_setInfo;
   o.calculate       = MO.SEaiEarthTouchPoint_calculate;
   o.calculateFlat   = MO.SEaiEarthTouchPoint_calculateFlat;
   o.calculateSphere = MO.SEaiEarthTouchPoint_calculateSphere;
   // @method
   o.toString        = MO.SEaiEarthTouchPoint_toString;
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
   var x = (info.x() - 0.5) * 2;
   var y = -(info.y() - 0.5) * 2;
   o.originPosition.set(x, y);
   o.originLength = o.originPosition.absolute();
   x *= Math.PI / 2 * 1.02;
   var length2d = MO.Lang.Float.toRange(Math.sqrt(x * x + y * y), 0, 1);
   var radius2d = Math.sin(length2d * MO.Lang.Math.PI_2);
   // 设置位置
   o.position.set(x, y);
   o.positionLength = o.position.absolute();
   // 计算球面位置
   var direction = o.direction;
   direction.x = x;
   direction.y = y;
   direction.z = 0;
   direction.normalize();
   direction.mul(radius2d, radius2d, radius2d);
   // 设置球面方向
   var length = MO.Lang.Float.toRange(Math.sqrt(direction.x * direction.x + direction.y * direction.y), 0, 1);
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
   sphereLocation.normalize();
   // 计算地区位置
   var mapLocation = o.mapLocation;
   mapLocation.x = Math.atan2(sphereLocation.x, -sphereLocation.z) / Math.PI / 2 + 0.5;
   mapLocation.y = 0.5 - Math.asin(sphereLocation.y) / Math.PI;
}

//============================================================
// <T>计算处理。</T>
//
// @method
// @return matrix 矩阵
//============================================================
MO.SEaiEarthTouchPoint_calculateFlat = function SEaiEarthTouchPoint_calculateFlat(matrix, x, y){
   var o = this;
   // 获得偏移坐标
   var length2d = MO.Lang.Float.toRange(Math.sqrt(x * x + y * y), 0, 1);
   var radius2d = Math.sin(length2d * MO.Lang.Math.PI_2);
   // 计算球面位置
   var direction = o.direction;
   direction.x = x;
   direction.y = y;
   direction.z = 0;
   direction.normalize();
   direction.mul(radius2d, radius2d, radius2d);
   // 设置球面方向
   var sphereLocation = o.sphereLocation;
   var length = MO.Lang.Float.toRange(Math.sqrt(direction.x * direction.x + direction.y * direction.y), 0, 1);
   direction.z = -Math.sin(Math.acos(length));
   direction.normalize();
   matrix.transformPoint3(direction, sphereLocation);
   sphereLocation.normalize();
   // 计算地区位置
   var mapLocation = o.mapLocation;
   mapLocation.x = Math.atan2(sphereLocation.x, -sphereLocation.z) / Math.PI / 2 + 0.5;
   mapLocation.y = 0.5 - Math.asin(sphereLocation.y) / Math.PI;
   mapLocation.mul(0.5 / 0.29, 0.5 / 0.29);
}

//============================================================
// <T>计算处理。</T>
//
// @method
// @return matrix 矩阵
//============================================================
MO.SEaiEarthTouchPoint_calculateSphere = function SEaiEarthTouchPoint_calculateSphere(x, y){
   var size = o._graphicContext.size();
   var cx = event.x - size.width / 2;
   var cy = event.y - size.height / 2;
   var range = Math.min(size.width, size.height) * 0.5;
   var x = MO.Lang.Float.toRange(cx / range, -1, 1);
   var y = -MO.Lang.Float.toRange(cy / range, -1, 1);
   var length = MO.Lang.Float.toRange(Math.sqrt(x * x + y * y), 0, 1);
   // 设置方向
   var direction = new MO.SVector3();
   direction.x = x;
   direction.y = y;
   direction.z = -Math.sin(Math.acos(length));
   direction.normalize();
   var rotationMatrix = o._rotationMatrix.assign(o._earthSphere.matrix());
   rotationMatrix.invert();
   var sphereLocation = rotationMatrix.transformPoint3(direction);
   sphereLocation.normalize();
   // 计算地区位置
   var fx = Math.atan2(sphereLocation.x, -sphereLocation.z) / Math.PI / 2 + 0.5;
   var fy = 0.5 - Math.asin(sphereLocation.y) / Math.PI;
   o._earthFlat.drawTouch(fx, fy);
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
