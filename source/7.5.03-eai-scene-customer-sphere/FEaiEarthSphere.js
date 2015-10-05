//==========================================================
// <T>渲染地球立方体。</T>
//
// @class
// @author maocy
// @history 150207
//==========================================================
MO.FEaiEarthSphere = function FEaiEarthSphere(o){
   o = MO.Class.inherits(this, o, MO.FE3dSphere);
   //..........................................................
   // @attribute
   o._axisUp        = MO.Class.register(o, new MO.AGetter('_axisUp'));
   o._axisDirection = MO.Class.register(o, new MO.AGetter('_axisDirection'));
   o._axisRotation  = MO.Class.register(o, new MO.AGetter('_axisRotation'));
   //..........................................................
   // @method
   o.construct      = MO.FEaiEarthSphere_construct;
   // @method
   o.setup          = MO.FEaiEarthSphere_setup;
   o.updateMatrix   = MO.FEaiEarthSphere_updateMatrix;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiEarthSphere_construct = function FEaiEarthSphere_construct(){
   var o = this;
   o.__base.FE3dSphere.construct.call(o);
   // 设置属性
   o._rotationMatrix = new MO.SMatrix3x3();
   o._quaternion = new MO.SQuaternion();
   o._quaternionX = new MO.SQuaternion();
   o._quaternionY = new MO.SQuaternion();
   o._quaternionZ = new MO.SQuaternion();
   o._axisUp = new MO.SVector3(0, 1, 0);
   o._axisDirection = new MO.SVector3(0, 0, 0);
   o._axisRotation = new MO.SVector3(0, 0, 0);
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiEarthSphere_setup = function FEaiEarthSphere_setup(){
   var o = this;
   o.__base.FE3dSphere.setup.call(o);
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiEarthSphere_updateMatrix = function FEaiEarthSphere_updateMatrix(){
   var o = this;
   // 计算旋转分量
   var rotation = o._axisRotation;
   o._quaternionX.fromAxisAngle(MO.Lang.Math.vectorAxisX, rotation.x);
   o._quaternionY.fromAxisAngle(MO.Lang.Math.vectorAxisY, rotation.y);
   o._quaternionZ.fromAxisAngle(MO.Lang.Math.vectorAxisZ, rotation.z);
   // 计算旋转
   var quaternion = o._quaternion.identity();
   quaternion.mul(o._quaternionX);
   quaternion.mul(o._quaternionY);
   quaternion.mul(o._quaternionZ);
   // 转换为矩阵
   var rotationMatrix = o._rotationMatrix;
   rotationMatrix.build(quaternion);
   // 计算目标
   var axisDirection = o._axisDirection;
   rotationMatrix.transformPoint3(o._axisUp, axisDirection);
   axisDirection.normalize();
   // 计算矩阵
   var matrix = o._matrix;
   matrix.rx = axisDirection.x;
   matrix.ry = axisDirection.y;
   matrix.rz = axisDirection.z;
   matrix.updateForce();
}
