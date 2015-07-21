//==========================================================
// <T>渲染投影相机。</T>
//
// @method
// @author maocy
// @history 141231
//==========================================================
MO.FE3dOrthoCamera = function FE3dOrthoCamera(o){
   o = MO.Class.inherits(this, o, MO.FE3dCamera);
   //..........................................................
   // @method
   o.construct        = MO.FE3dOrthoCamera_construct;
   // @method
   o.updateFrustum    = MO.FE3dOrthoCamera_updateFrustum;
   o.updateFromCamera = MO.FE3dOrthoCamera_updateFromCamera;
   o.updateFlatCamera = MO.FE3dOrthoCamera_updateFlatCamera;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dOrthoCamera_construct = function FE3dOrthoCamera_construct(){
   var o = this;
   o.__base.FE3dCamera.construct.call(o);
   // 初始化变量
   o._projection = MO.Class.create(MO.FG3dOrthoProjection);
}

//==========================================================
// <T>更新视截体。</T>
//
// @method
// @return SFrustum 视截体
//==========================================================
MO.FE3dOrthoCamera_updateFrustum = function FE3dOrthoCamera_updateFrustum(){
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
// <T>更新相机信息。</T>
// <P>1. 更新空间矩阵。</P>
// <P>2. 更新目标点。</P>
//
// @method
// @param p:camera:FG3dCamera 相机
//==========================================================
MO.FE3dOrthoCamera_updateFromCamera = function FE3dOrthoCamera_updateFromCamera(p){
   var o = this;
   // 获得相机视截体
   var pf = p.updateFrustum();
   // 计算观察点
   var d = o._direction;
   d.normalize();
   var vx = pf.center.x - d.x * pf.radius;
   var vy = pf.center.y - d.y * pf.radius;
   var vz = pf.center.z - d.z * pf.radius;
   o._position.set(vx, vy, vz);
   o.lookAt(pf.center.x, pf.center.y, pf.center.z);
   // 更新当前相机矩阵
   o.update();
   // 计算当前投影
   var f = o._frustum;
   o._matrix.transform(f.coners, pf.coners, 8);
   f.updateCenter();
   // 更新投影
   o._projection.updateFrustum(f);
}

//==========================================================
// <T>平面方式更新相机信息。</T>
//
// @method
// @param p:camera:FG3dCamera 相机
//==========================================================
MO.FE3dOrthoCamera_updateFlatCamera = function FE3dOrthoCamera_updateFlatCamera(p){
   var o = this;
   var f = o._frustum
   var pf = p.updateFlatFrustum();
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
   o._projection._znear = 0.3;
   o._projection._zfar = distance * 1.5;
   o._projection.update();
}
