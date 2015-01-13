//==========================================================
// <T>渲染相机。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FG3dCamera(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // 旋转变量
   o.__rotationX   = null;
   o.__rotationY   = null;
   o.__rotationZ   = null;
   //..........................................................
   // 相机位置
   o._position     = null;
   // 相机方向
   o._direction    = null;
   // 相机旋转
   o._rotation     = null;
   // @attribute 变换矩阵
   o._matrix       = null;
   //..........................................................
   // 中心前位置
   o._centerFront  = 0;
   // 中心后位置
   o._centerBack   = 0;
   // 近焦平面位置
   o._focalNear    = 0.1;
   // 远焦平面位置
   o._focalFar     = 100.0;
   // 可见视截体
   o._planes       = null;
   // 视截体
   o._frustum      = null;
   // 投影变换
   o._projection   = null;
   // 渲染目标
   o._viewport     = null;
   //..........................................................
   // 上轴线
   o._axisUp       = null;
   // X轴线
   o._axisX        = null;
   // Y轴线
   o._axisY        = null;
   // Z轴线
   o._axisZ        = null;
   //..........................................................
   // @method
   o.construct     = FG3dCamera_construct;
   // @method
   o.position      = FG3dCamera_position;
   o.setPosition   = FG3dCamera_setPosition;
   o.matrix        = FG3dCamera_matrix;
   // @method
   o.doWalk        = FG3dCamera_doWalk;
   o.doStrafe      = FG3dCamera_doStrafe;
   o.doFly         = FG3dCamera_doFly;
   o.doYaw         = FG3dCamera_doYaw;
   o.doPitch       = FG3dCamera_doPitch;
   o.lookAt        = FG3dCamera_lookAt;
   o.updateFrustum = FG3dCamera_updateFrustum;
   o.update        = FG3dCamera_update;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//==========================================================
function FG3dCamera_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   // 初始化变量
   o.__rotationX = new SQuaternion();
   o.__rotationY = new SQuaternion();
   o.__rotationZ = new SQuaternion();
   // 初始化变量
   o._position = new SPoint3();
   o._direction = new SVector3();
   o._rotation = new SQuaternion();
   o._matrix = new SMatrix3d();
   // 初始化变量
   o.viewport = RClass.create(FG3dViewport);
   o.projection = RClass.create(FG3dProjection);
   // 初始化变量
   o._axisUp = new SVector3();
   o._axisUp.set(0, 1, 0);
   o._axisX = new SVector3();
   o._axisY = new SVector3();
   o._axisZ = new SVector3();
}

//==========================================================
// <T>获得位置。</T>
//
// @method
// @return 位置
//==========================================================
function FG3dCamera_position(){
   return this._position;
}

//==========================================================
// <T>设置位置。</T>
//
// @method
// @param x:Number X坐标
// @param y:Number Y坐标
// @param z:Number Z坐标
//==========================================================
function FG3dCamera_setPosition(x, y, z){
   this._position.set(x, y, z);
}

//==========================================================
// <T>获得矩阵。</T>
//
// @method
// @return SMatrix3d 矩阵
//==========================================================
function FG3dCamera_matrix(){
   return this._matrix;
}

//==========================================================
// <T>向前/向后移动</T>
//
// @method
// @param p:value:Number 距离
//==========================================================
function FG3dCamera_doWalk(p){
   var o = this;
   o._position.x += o._direction.x * p;
   o._position.z += o._direction.z * p;
}

//==========================================================
// <T>向左/向右平移</T>
//
// @method
// @param p:value:Number 距离
//==========================================================
function FG3dCamera_doStrafe(p){
   var o = this;
   o._position.x += o._axisY.x * p;
   o._position.z += o._axisY.z * p;
}

//==========================================================
// <T>向上/向下移动</T>
//
// @method
// @param p:value:Number 距离
//==========================================================
function FG3dCamera_doFly(p){
   var o = this;
   o._position.y += p;
}

//==========================================================
// <T>向左/向右旋转</T>
//
// @method
// @param p:value:Number 弧度
//==========================================================
function FG3dCamera_doYaw(p){
   var o = this;
   //o.__rotationZ.fromAxisAngle(RMath.vectorAxisZ, p);
   //o._rotation.mul(o.__rotationZ);
   // 旋转Y轴
   //var matrix = new SFloatMatrix3d();
   //matrix.rotationY(angle);
   // 旋转方向
   //var direction = o._direction;
   //direction.mormalize();
   //_direction = matrix.TransformVector3(direction);
   //_direction.Normalize();
}

//==========================================================
// <T>向上/向下旋转</T>
//
// @method
// @param p:value:Number 弧度
//==========================================================
function FG3dCamera_doPitch(p){
   var o = this;
   //o.__rotationX.fromAxisAngle(RMath.vectorAxisX, p);
   //o._rotation.mul(o.__rotationX);
}

//==========================================================
// <T>朝向目标。</T>
//==========================================================
function FG3dCamera_lookAt(x, y, z){
   var o = this;
   var p = o._position;
   o._direction.set(x - p.x, y - p.y, z - p.z);
   o._direction.normalize();
}

//==========================================================
// <T>构造处理。</T>
//==========================================================
function FG3dCamera_updateFrustum(){
}

//==========================================================
// <T>更新相机信息。</T>
// <P>1. 更新空间矩阵。</P>
// <P>2. 更新目标点。</P>
//==========================================================
function FG3dCamera_update(){
   var o = this;
   var ax = o._axisX;
   var ay = o._axisY;
   var az = o._axisZ;
   // 计算坐标轴
   az.assign(o._direction);
   az.normalize();
   o._axisUp.cross2(ax, az);
   ax.normalize();
   az.cross2(ay, ax);
   ay.normalize();
   // 计算矩阵
   var d = o._matrix.data();
   d[ 0] = ax.x;
   d[ 1] = ay.x;
   d[ 2] = az.x;
   d[ 3] = 0.0;
   d[ 4] = ax.y;
   d[ 5] = ay.y;
   d[ 6] = az.y;
   d[ 7] = 0.0;
   d[ 8] = ax.z;
   d[ 9] = ay.z;
   d[10] = az.z;
   d[11] = 0.0;
   d[12] = -ax.dotPoint3(o._position);
   d[13] = -ay.dotPoint3(o._position);
   d[14] = -az.dotPoint3(o._position);
   d[15] = 1.0;
}
