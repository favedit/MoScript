//==========================================================
// <T>渲染相机。</T>
//
// @author maocy
// @history 141231
//==========================================================
MO.FE3dCamera = function FE3dCamera(o){
   o = MO.Class.inherits(this, o, MO.FG3dCamera, MO.MLinkerResource);
   //..........................................................
   // 投影
   o._projection     = MO.Class.register(o, new MO.AGetter('_projection'));
   // 四元数
   o._rotation       = MO.Class.register(o, new MO.AGetter('_rotation'));
   o._rotationMatrix = null;
   o._quaternion     = null;
   o._quaternionX    = null;
   o._quaternionY    = null;
   o._quaternionZ    = null;
   //..........................................................
   // @method
   o.construct       = MO.FE3dCamera_construct;
   // @method
   o.doMoveX         = MO.FE3dCamera_doMoveX;
   o.doMoveY         = MO.FE3dCamera_doMoveY;
   o.doMoveZ         = MO.FE3dCamera_doMoveZ;
   o.doForward       = MO.FE3dCamera_doForward;
   o.doPitch         = MO.FE3dCamera_doPitch;
   o.doYaw           = MO.FE3dCamera_doYaw;
   o.doRoll          = MO.FE3dCamera_doRoll;
   o.loadResource    = MO.FE3dCamera_loadResource;
   o.commitResource  = MO.FE3dCamera_commitResource;
   // @method
   o.update          = MO.FE3dCamera_update;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dCamera_construct = function FE3dCamera_construct(){
   var o = this;
   o.__base.FG3dCamera.construct.call(o);
   // 初始化变量
   o._rotation = new MO.SVector3();
   o._rotationMatrix = new MO.SMatrix3x3();
   o._quaternion = new MO.SQuaternion();
   o._quaternionX = new MO.SQuaternion();
   o._quaternionY = new MO.SQuaternion();
   o._quaternionZ = new MO.SQuaternion();
}

//==========================================================
// <T>X轴移动。</T>
//
// @method
// @param value:Number 距离
//==========================================================
MO.FE3dCamera_doMoveX = function FE3dCamera_doMoveX(value){
   this._position.x += value;
}

//==========================================================
// <T>Y轴移动。</T>
//
// @method
// @param value:Number 距离
//==========================================================
MO.FE3dCamera_doMoveY = function FE3dCamera_doMoveY(value){
   this._position.y += value;
}

//==========================================================
// <T>Z轴移动。</T>
//
// @method
// @param value:Number 距离
//==========================================================
MO.FE3dCamera_doMoveZ = function FE3dCamera_doMoveZ(value){
   this._position.z += value;
}

//==========================================================
// <T>向前/向后移动。</T>
//
// @method
// @param p:radian:Number 弧度
//==========================================================
MO.FE3dCamera_doForward = function FE3dCamera_doForward(value){
   var o = this;
   o._position.x += o._direction.x * value;
   o._position.y += o._direction.y * value;
   o._position.z += o._direction.z * value;
}

//==========================================================
// <T>向上/向下旋转。</T>
//
// @method
// @param p:radian:Number 弧度
//==========================================================
MO.FE3dCamera_doPitch = function FE3dCamera_doPitch(p){
   this._rotation.x += p;
}

//==========================================================
// <T>向左/向右旋转。</T>
//
// @method
// @param p:radian:Number 弧度
//==========================================================
MO.FE3dCamera_doYaw = function FE3dCamera_doYaw(p){
   this._rotation.y += p;
}

//==========================================================
// <T>向左/向右转向。</T>
//
// @method
// @param p:radian:Number 弧度
//==========================================================
MO.FE3dCamera_doRoll = function FE3dCamera_doRoll(p){
   this._rotation.z += p;
}

//==========================================================
// <T>加载资源。</T>
//
// @method
// @param resource:FE3sCamera 资源
//==========================================================
MO.FE3dCamera_loadResource = function FE3dCamera_loadResource(resource){
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
// <T>提交资源。</T>
//
// @method
//==========================================================
MO.FE3dCamera_commitResource = function FE3dCamera_commitResource(){
   var o = this;
   var resource = o._resource;
   resource._position.assign(o._position);
   resource._direction.assign(o._direction);
}

//==========================================================
// <T>更新相机信息。</T>
//
// @method
//==========================================================
MO.FE3dCamera_update = function FE3dCamera_update(){
   var o = this;
   // 计算旋转分量
   var rotation = o._rotation;
   o._quaternionX.fromAxisAngle(MO.Lang.Math.vectorAxisX, rotation.x);
   o._quaternionY.fromAxisAngle(MO.Lang.Math.vectorAxisY, rotation.y);
   o._quaternionZ.fromAxisAngle(MO.Lang.Math.vectorAxisZ, rotation.z);
   // 计算旋转
   var quaternion = o._quaternion.identity();
   quaternion.mul(o._quaternionX);
   quaternion.mul(o._quaternionY);
   quaternion.mul(o._quaternionZ);
   // 转换为矩阵
   var matrix = o._rotationMatrix;
   matrix.build(quaternion);
   // 计算目标
   var direction = o._direction;
   matrix.transformPoint3(o._directionTarget, direction);
   direction.normalize();
   // 父更新矩阵
   o.__base.FG3dCamera.update.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FG3dCamera_dispose = function FG3dCamera_dispose(){
   var o = this;
   // 释放属性
   o._projection = MO.Lang.Object.dispose(o._projection);
   // 父处理
   o.__base.FObject.dispose.call(o);
}
