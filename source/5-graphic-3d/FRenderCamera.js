//==========================================================
// <T>渲染相机。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FRenderCamera(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute 类型名称
   o.name = null;
   // 变换矩阵
   o.matrix = null;
   // 相机位置
   o.position = null;
   // 相机方向
   o.direction = null;
   // 中心前位置
   o._centerFront = 0;
   // 中心后位置
   o._centerBack = 0;
   // 近焦平面位置
   o._focalNear = 0.1;
   // 远焦平面位置
   o._focalFar = 100.0;
   // 可见视截体
   o._planes = null;
   // 视截体
   o._frustum = null;
   // 投影变换
   o.projection = null;
   // 渲染目标
   o.viewport = null;
   //..........................................................
   // 上轴线
   o._axisUp = null;
   // X轴线
   o._axisX = null;
   // Y轴线
   o._axisY = null;
   // Z轴线
   o._axisZ = null;
   //..........................................................
   // @method
   o.construct     = FRenderCamera_construct;
   // @method
   o.doWalk        = FRenderCamera_doWalk;
   o.doStrafe      = FRenderCamera_doStrafe;
   o.doFly         = FRenderCamera_doFly;
   o.doYaw         = FRenderCamera_doYaw;
   o.doPitch       = FRenderCamera_doPitch;
   o.lookAt        = FRenderCamera_lookAt;
   o.updateFrustum = FRenderCamera_updateFrustum;
   o.update        = FRenderCamera_update;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//==========================================================
function FRenderCamera_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   // 初始化变量
   o.matrix = new SMatrix3d();
   o.position = new SPoint3();
   o.direction = new SVector3();
   o.viewport = RClass.create(FRenderViewport);
   o.projection = RClass.create(FRenderProjection);
   // 初始化变量
   o._axisUp = new SVector3();
   o._axisUp.set(0, 1, 0);
   o._axisX = new SVector3();
   o._axisY = new SVector3();
   o._axisZ = new SVector3();
}

//==========================================================
// <T>构造处理。</T>
//==========================================================
function FRenderCamera_doWalk(){
}

//==========================================================
// <T>构造处理。</T>
//==========================================================
function FRenderCamera_doStrafe(){
}

//==========================================================
// <T>构造处理。</T>
//==========================================================
function FRenderCamera_doFly(){
}

//==========================================================
// <T>构造处理。</T>
//==========================================================
function FRenderCamera_doYaw(){
}

//==========================================================
// <T>构造处理。</T>
//==========================================================
function FRenderCamera_doPitch(){
}

//==========================================================
// <T>朝向目标。</T>
//==========================================================
function FRenderCamera_lookAt(x, y, z){
   var o = this;
   var p = o.position;
   o.direction.set(x - p.x, y - p.y, z - p.z);
   o.direction.normalize();
}

//==========================================================
// <T>构造处理。</T>
//==========================================================
function FRenderCamera_updateFrustum(){
}

//==========================================================
// <T>更新相机信息。</T>
// <P>1. 更新空间矩阵。</P>
// <P>2. 更新目标点。</P>
//==========================================================
function FRenderCamera_update(){
   var o = this;
   var ax = o._axisX;
   var ay = o._axisY;
   var az = o._axisZ;
   // 计算坐标轴
   az.assign(o.direction);
   az.normalize();
   o._axisUp.cross2(ax, az);
   ax.normalize();
   az.cross2(ay, ax);
   ay.normalize();
   // 计算矩阵
   var d = o.matrix.data();
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
   d[12] = -ax.dotPoint3(o.position);
   d[13] = -ay.dotPoint3(o.position);
   d[14] = -az.dotPoint3(o.position);
   d[15] = 1.0;
}
