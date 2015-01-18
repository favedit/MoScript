//==========================================================
// <T>渲染相机。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FG3dPerspectiveCamera(o){
   o = RClass.inherits(this, o, FG3dCamera);
   //..........................................................
   // 投影变换
   o._projection      = null;
   //..........................................................
   // @method
   o.construct         = FG3dPerspectiveCamera_construct;
   // @method
   o.projection        = FG3dPerspectiveCamera_projection;
   // @method
   o.updateFrustum     = FG3dPerspectiveCamera_updateFrustum;
   o.updateFlatFrustum = FG3dPerspectiveCamera_updateFlatFrustum;
   o.updateFromCamera  = FG3dPerspectiveCamera_updateFromCamera;
   o.updateFlatCamera  = FG3dPerspectiveCamera_updateFlatCamera;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FG3dPerspectiveCamera_construct(){
   var o = this;
   o.__base.FG3dCamera.construct.call(o);
   // 初始化变量
   o._projection = RClass.create(FG3dPerspectiveProjection);
}

//==========================================================
// <T>获得投影。</T>
//
// @method
// @return FG3dPerspectiveProjection 投影
//==========================================================
function FG3dPerspectiveCamera_projection(){
   return this._projection;
}

//==========================================================
// <T>更新视截体。</T>
//
// @method
// @return SFrustum 视截体
//==========================================================
function FG3dPerspectiveCamera_updateFrustum(){
   var o = this;
   var p = o._projection;
   var s = p._size;
   var f = o._frustum;
   f.update(p._angle, s.width, s.height, p._znear, p._zfar, o._centerFront, o._centerBack, o._matrix);
   return f;
}

//==========================================================
// <T>更新视截体。</T>
//
// @method
// @return SFrustum 视截体
//==========================================================
function FG3dPerspectiveCamera_updateFlatFrustum(){
   var o = this;
   var p = o._projection;
   var s = p._size;
   var f = o._frustum;
   f.updateFlat(p._angle, s.width, s.height, p._znear, p._zfar, o._centerFront, o._centerBack, o._matrix);
   return f;
}

//==========================================================
// <T>更新相机信息。</T>
// <P>1. 更新空间矩阵。</P>
// <P>2. 更新目标点。</P>
//
// @method
// @param p:camera:FG3dCamera 相机
//==========================================================
function FG3dPerspectiveCamera_updateFromCamera(p){
   var o = this;
   var f = o._frustum
   var pf = p.updateFrustum();
   // 计算距离 (求出圆球的切线)
   var angle = RMath.DEGREE_RATE * o._projection.angle();
   var distance = pf.radius / Math.sin(angle * 0.5);
   distance = Math.max(distance, p._projection._zfar);
   // 计算观察点
   var d = o._direction;
   d.normalize();
   var vx = pf.center.x - d.x * distance;
   var vy = pf.center.y - d.y * distance;
   var vz = pf.center.z - d.z * distance;
   o._position.set(vx, vy, vz);
   o.lookAt(pf.center.x, pf.center.y, pf.center.z);
   // 更新矩阵
   o.update();
   // 将顶点转换到当前相机空间
   o._matrix.transform(f.coners, pf.coners, 8);
   // 计算当前相机内空间内位置
   f.updateCenter();
   //f.minZ += p._projection._zfar;
   //f.maxZ += p._projection._zfar;
   // 计算当前投影
   o._projection.updateFrustum(f);
}

//==========================================================
// <T>平面方式更新相机信息。</T>
//
// @method
// @param p:camera:FG3dCamera 相机
//==========================================================
function FG3dPerspectiveCamera_updateFlatCamera(p){
   var o = this;
   var f = o._frustum
   var pf = p.updateFlatFrustum();
   // 计算距离 (求出圆球的切线)
   var angle = RMath.DEGREE_RATE * o._projection.angle();
   var distance = pf.radius / Math.sin(angle * 0.5);
   distance = Math.max(distance, p._projection._zfar);
   // 计算观察点
   var d = o._direction;
   d.normalize();
   var vx = pf.center.x - d.x * distance;
   var vy = pf.center.y - d.y * distance;
   var vz = pf.center.z - d.z * distance;
   o._position.set(vx, vy, vz);
   o.lookAt(pf.center.x, pf.center.y, pf.center.z);
   // 更新矩阵
   o.update();
   // 将顶点转换到当前相机空间
   o._matrix.transform(f.coners, pf.coners, 8);
   // 计算当前相机内空间内位置
   f.coners[ 1] = 0.0;
   f.coners[ 4] = 0.0;
   f.coners[ 7] = 0.0;
   f.coners[10] = 0.0;
   f.coners[13] = 0.0;
   f.coners[16] = 0.0;
   f.coners[19] = 0.0;
   f.coners[22] = 0.0;
   f.updateCenter();
   // 计算当前投影
   o._projection.updateFrustum(f);
}
