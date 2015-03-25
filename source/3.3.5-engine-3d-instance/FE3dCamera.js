//==========================================================
// <T>渲染相机。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FE3dCamera(o){
   o = RClass.inherits(this, o, FG3dPerspectiveCamera, MLinkerResource);
   //..........................................................
   // 四元数
   o._rotation       = null;
   o._rotationMatrix = null;
   o._quaternion     = null;
   o._quaternionX    = null;
   o._quaternionY    = null;
   o._quaternionZ    = null;
   //..........................................................
   // @method
   o.construct       = FE3dCamera_construct;
   // @method
   o.rotation        = FE3dCamera_rotation;
   // @method
   o.doPitch         = FE3dCamera_doPitch;
   o.doYaw           = FE3dCamera_doYaw;
   o.doRoll          = FE3dCamera_doRoll;
   o.loadResource    = FE3dCamera_loadResource;
   // @method
   o.update          = FE3dCamera_update;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3dCamera_construct(){
   var o = this;
   o.__base.FG3dPerspectiveCamera.construct.call(o);
   // 初始化变量
   o._rotation = new SVector3();
   o._rotationMatrix = new SMatrix3x3();
   o._quaternion = new SQuaternion();
   o._quaternionX = new SQuaternion();
   o._quaternionY = new SQuaternion();
   o._quaternionZ = new SQuaternion();
}

//==========================================================
// <T>获得旋转弧度。</T>
//
// @method
// @return SVector3 旋转弧度
//==========================================================
function FE3dCamera_rotation(){
   return this._rotation;
}

//==========================================================
// <T>向上/向下旋转。</T>
//
// @method
// @param p:radian:Number 弧度
//==========================================================
function FE3dCamera_doPitch(p){
   this._rotation.x += p;
}

//==========================================================
// <T>向左/向右旋转。</T>
//
// @method
// @param p:radian:Number 弧度
//==========================================================
function FE3dCamera_doYaw(p){
   this._rotation.y += p;
}

//==========================================================
// <T>向左/向右转向。</T>
//
// @method
// @param p:radian:Number 弧度
//==========================================================
function FE3dCamera_doRoll(p){
   this._rotation.z += p;
}

//==========================================================
// <T>加载资源。</T>
//
// @method
// @param resource:FE3sCamera 资源
//==========================================================
function FE3dCamera_loadResource(resource){
   var o = this;
   var resourceProjection = resource.projection();
   o._resource = resource;
   // 加载设置
   o.position().assign(resource.position());
   o.setDirection(resource.direction().x, resource.direction().y, resource.direction().z);
   o.update();
   // 设置投影
   var projection = o.projection();
   projection._angle = resourceProjection.angle();
   projection._znear = resourceProjection.znear();
   projection._zfar = resourceProjection.zfar();
   projection.update();
   //cameraProjection.loadResource(rcv);
}

//==========================================================
// <T>更新相机信息。</T>
//
// @method
//==========================================================
function FE3dCamera_update(){
   var o = this;
   // 计算旋转分量
   var r = o._rotation;
   o._quaternionX.fromAxisAngle(RMath.vectorAxisX, r.x);
   o._quaternionY.fromAxisAngle(RMath.vectorAxisY, r.y);
   o._quaternionZ.fromAxisAngle(RMath.vectorAxisZ, r.z);
   // 计算旋转
   var q = o._quaternion.identity();
   q.mul(o._quaternionX);
   q.mul(o._quaternionY);
   q.mul(o._quaternionZ);
   // 转换为矩阵
   var m = o._rotationMatrix;
   m.build(q);
   // 计算目标
   var d = o._direction;
   m.transformPoint3(o._directionTarget, d);
   d.normalize();
   // 计算上轴
   //m.transformPoint3(RMath.vectorAxisY, o.__axisUp);
   // 设置方向
   // 父更新矩阵
   o.__base.FG3dPerspectiveCamera.update.call(o);
}
