//==========================================================
// <T>渲染透视相机。</T>
//
// @author maocy
// @history 141231
//==========================================================
MO.FE3dPerspectiveCamera = function FE3dPerspectiveCamera(o){
   o = MO.Class.inherits(this, o, MO.FE3dCamera, MO.MLinkerResource);
   //..........................................................
   // @attribute
   o._centerFront      = 0.4;
   //..........................................................
   // @method
   o.construct         = MO.FE3dPerspectiveCamera_construct;
   // @method
   o.updateFrustum     = MO.FE3dPerspectiveCamera_updateFrustum;
   o.updateFlatFrustum = MO.FE3dPerspectiveCamera_updateFlatFrustum;
   o.updateFromCamera  = MO.FE3dPerspectiveCamera_updateFromCamera;
   o.updateFlatCamera  = MO.FE3dPerspectiveCamera_updateFlatCamera;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dPerspectiveCamera_construct = function FE3dPerspectiveCamera_construct(){
   var o = this;
   o.__base.FE3dCamera.construct.call(o);
   // 初始化变量
   o._projection = MO.Class.create(MO.FG3dPerspectiveProjection);
}

//==========================================================
// <T>更新视截体。</T>
//
// @method
// @return SFrustum 视截体
//==========================================================
MO.FE3dPerspectiveCamera_updateFrustum = function FE3dPerspectiveCamera_updateFrustum(){
   var o = this;
   o.__base.FE3dCamera.updateFrustum.call(o);
   // 更新视截体
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
MO.FE3dPerspectiveCamera_updateFlatFrustum = function FE3dPerspectiveCamera_updateFlatFrustum(){
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
MO.FE3dPerspectiveCamera_updateFromCamera = function FE3dPerspectiveCamera_updateFromCamera(p){
   var o = this;
   var f = o._frustum;
   var pf = p.updateFrustum();
   // 计算距离 (求出圆球的切线)
   var angle = MO.RConst.DEGREE_RATE * o._projection.angle();
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
   o._matrix.transform(f.coners, 0, pf.coners, 0, 8);
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
MO.FE3dPerspectiveCamera_updateFlatCamera = function FE3dPerspectiveCamera_updateFlatCamera(p){
   var o = this;
   var f = o._frustum;
   var pf = p.updateFlatFrustum();
   // 计算距离 (求出圆球的切线)
   var angle = MO.RConst.DEGREE_RATE * o._projection.angle();
   var distance = pf.radius / Math.sin(angle * 0.5);
   distance = Math.max(distance, p._projection._zfar);
   // 计算观察点
   var d = o._direction;
   d.normalize();
   var vx = pf.center.x - d.x * distance * o._centerFront;
   var vy = pf.center.y - d.y * distance * o._centerFront;
   var vz = pf.center.z - d.z * distance * o._centerFront;
   o._position.set(vx, vy, vz);
   o.lookAt(pf.center.x, pf.center.y, pf.center.z);
   // 更新矩阵
   o.update();
   o._projection._znear = 0.1;
   o._projection._zfar = distance;
   o._projection.update();
}
