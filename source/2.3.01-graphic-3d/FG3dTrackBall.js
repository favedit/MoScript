//==========================================================
// <T>渲染跟踪球。</T>
//
// @author maocy
// @history 151006
//==========================================================
MO.FG3dTrackBall = function FG3dTrackBall(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._matrix          = MO.Class.register(o, new MO.AGetter('_matrix'));
   // @attribute
   o._rotation        = MO.Class.register(o, new MO.AGetter('_rotation'));
   o._axis            = MO.Class.register(o, new MO.AGetter('_axis'));
   // @attribute
   o._angularVelocity = MO.Class.register(o, new MO.AGetter('_direction'));
   o._lastPosition    = null;
   //..........................................................
   // @method
   o.construct        = MO.FG3dTrackBall_construct;
   // @method
   o.push             = MO.FG3dTrackBall_push;
   o.move             = MO.FG3dTrackBall_move;
   o.release          = MO.FG3dTrackBall_release;
   // @method
   o.dispose          = MO.FG3dTrackBall_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FG3dTrackBall_construct = function FG3dTrackBall_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   // 初始化变量
   o._matrix = new MO.SMatrix3d();
   o._rotation = new MO.SQuaternion();
   o._axis = new MO.SVector3();
   o._lastPosition = new MO.SPoint3();
}

//==========================================================
// <T>设置位置。</T>
//
// @method
// @param x:Number X坐标
// @param y:Number Y坐标
// @param z:Number Z坐标
//==========================================================
MO.FG3dTrackBall_move = function FG3dTrackBall_move(x, y){
   var lastPos3D = new MO.SVector3(o._lastPosition.x, o._lastPosition.y, 0);
    //QVector3D lastPos3D = QVector3D(m_lastPos.x(), m_lastPos.y(), 0.0f);
    //float sqrZ = 1 - QVector3D::dotProduct(lastPos3D, lastPos3D);
    //if (sqrZ > 0)
    //    lastPos3D.setZ(sqrt(sqrZ));
    //else
    //    lastPos3D.normalize();
    //QVector3D currentPos3D = QVector3D(p.x(), p.y(), 0.0f);
    //sqrZ = 1 - QVector3D::dotProduct(currentPos3D, currentPos3D);
    //if (sqrZ > 0)
    //    currentPos3D.setZ(sqrt(sqrZ));
    //else
    //    currentPos3D.normalize();
    //m_axis = QVector3D::crossProduct(lastPos3D, currentPos3D);
    //float angle = 180 / PI * asin(sqrt(QVector3D::dotProduct(m_axis, m_axis)));
    //m_axis.normalize();
    //m_rotation = QQuaternion::fromAxisAndAngle(m_axis, angle) * m_rotation;
    //m_lastPos = p;
}

//==========================================================
// <T>更新相机信息。</T>
// <P>1. 更新空间矩阵。</P>
// <P>2. 更新目标点。</P>
//
// @method
//==========================================================
MO.FG3dTrackBall_update = function FG3dTrackBall_update(){
   var o = this;
   var axisX = o.__axisX;
   var axisY = o.__axisY;
   var axisZ = o.__axisZ;
   // 计算坐标轴
   axisZ.assign(o._direction);
   axisZ.normalize();
   o.__axisUp.cross2(axisX, axisZ);
   axisX.normalize();
   axisZ.cross2(axisY, axisX);
   axisY.normalize();
   // 计算矩阵
   var data = o._matrix.data();
   data[ 0] = axisX.x;
   data[ 1] = axisY.x;
   data[ 2] = axisZ.x;
   data[ 3] = 0.0;
   data[ 4] = axisX.y;
   data[ 5] = axisY.y;
   data[ 6] = axisZ.y;
   data[ 7] = 0.0;
   data[ 8] = axisX.z;
   data[ 9] = axisY.z;
   data[10] = axisZ.z;
   data[11] = 0.0;
   data[12] = -axisX.dotPoint3(o._position);
   data[13] = -axisY.dotPoint3(o._position);
   data[14] = -axisZ.dotPoint3(o._position);
   data[15] = 1.0;
}

//==========================================================
// <T>更新相机视截体。</T>
//
// @method
//==========================================================
MO.FG3dTrackBall_updateFrustum = function FG3dTrackBall_updateFrustum(){
   var o = this;
   var m = MO.Lang.Math.matrix;
   m.assign(o._matrix);
   m.append(o._projection.matrix());
   o._planes.updateVision(m.data());
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FG3dTrackBall_dispose = function FG3dTrackBall_dispose(){
   var o = this;
   // 释放属性
   o._matrix = MO.Lang.Obejct.dispose(o._matrix);
   // 父处理
   o.__base.FObject.dispose.call(o);
}
