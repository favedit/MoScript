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
   o._optionRotation   = false;
   o._speed            = 1;
   o._speedOperate     = 1;
   // @attribute
   o._currentTick      = 0;
   o._autoTick         = 0;
   o._startPosition    = null;
   o._currentPosition  = null;
   o._currentDirection = null;
   o._targetPosition   = null;
   o._rotationSpeed    = -0.001;
   // @attribute
   o._sourcePoint      = MO.Class.register(o, new MO.AGetter('_sourcePoint'));
   o._sourceTouch      = MO.Class.register(o, new MO.AGetter('_sourceTouch'));
   o._targetTouch      = MO.Class.register(o, new MO.AGetter('_targetTouch'));
   o._sourceDirection  = MO.Class.register(o, new MO.AGetter('_sourceDirection'));
   o._targetDirection  = MO.Class.register(o, new MO.AGetter('_targetDirection'));
   //..........................................................
   // @method
   o.construct         = MO.FEaiEarthSphere_construct;
   // @method
   o.setSource         = MO.FEaiEarthSphere_setSource;
   o.setTarget         = MO.FEaiEarthSphere_setTarget;
   // @method
   o.reset             = MO.FEaiEarthSphere_reset;
   o.auto              = MO.FEaiEarthSphere_auto;
   o.process           = MO.FEaiEarthSphere_process;
   // @method
   o.dispose           = MO.FEaiEarthSphere_dispose;
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
   o._sourcePoint = new MO.SEaiEarthTouchPoint();
   o._sourceTouch = new MO.SEaiEarthTouch();
   o._targetTouch = new MO.SEaiEarthTouch();
   o._sourceDirection = new MO.SVector3();
   o._currentDirection = new MO.SVector3();
   o._targetDirection = new MO.SVector3();
   o._sourceMatrix = new MO.SMatrix3d();
   o._currentMatrix = new MO.SMatrix3d();
   o._rotationAxis = new MO.SVector3();
   o._rotationMatrix = new MO.SMatrix3d();
   o._rotationMatrix3x3 = new MO.SMatrix3x3();
}

//==========================================================
// <T>设置来源处理。</T>
//
// @method
// @param info:FEaiChartCustomerSphereInfo 信息
//==========================================================
MO.FEaiEarthSphere_setSource = function FEaiEarthSphere_setSource(info){
   var o = this;
   var touch = o._sourceTouch;
   touch.setInfo(info);
   // 设置方向
   o._sourceDirection.assign(touch.direction);
   o._currentDirection.assign(touch.direction);
   o._sourceMatrix.assign(o._matrix);
   o._currentMatrix.assign(o._matrix);
   o._currentAngle = 0;
   o._rotationAngle = 0;
   o._autoTick = 0;
}

//==========================================================
// <T>设置目标处理。</T>
//
// @method
// @param info:FEaiChartCustomerSphereInfo 信息
//==========================================================
MO.FEaiEarthSphere_setTarget = function FEaiEarthSphere_setTarget(info){
   var o = this;
   var touch = o._targetTouch;
   touch.setInfo(info);
   // 设置方向
   o._targetDirection.assign(touch.direction);
   // 计算旋转数据
   var sourceTouchPoint = o._sourceTouch.points.first();
   var targetTouchPoint = o._targetTouch.points.first();
   var axis = o._rotationAxis;
   axis.assign(o._sourceDirection);
   axis.cross(o._targetDirection);
   axis.normalize();
   o._rotationAngle = Math.acos(o._sourceDirection.dotPoint3(o._targetDirection));
   o._optionRotation = false;
   o._autoTick = 0;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiEarthSphere_process = function FEaiEarthSphere_process(){
   var o = this;
   o.__base.FE3dSphere.process.call(o);
   var matrix = o._matrix;
   // 移动处理
   var currentTick = MO.Timer.current();
   if(o._currentTick != 0){
      if(o._currentAngle != o._rotationAngle){
         // 计算速度
         var rate = o._speed * (currentTick - o._currentTick) * 0.001;
         o._currentAngle += rate;
         if(o._currentAngle > o._rotationAngle){
            o._currentAngle = o._rotationAngle;
         }
         // 旋转矩阵
         matrix.assign(o._sourceMatrix);
         matrix.addRotationAxis(o._rotationAxis, -o._currentAngle);
         matrix.parse();
      }else if(o._optionRotation){
         matrix.addRotationAxis(MO.Lang.Math.vectorAxisY, -o._rotationSpeed);
         matrix.parse();
         //var d = matrix.transformPoint3(new MO.SVector3(0, 0, -1));
         //d.normalize();
         //var angle = Math.atan2(d.x, d.z);
         //console.log(angle);
      }else{
         if(o._autoTick == 0){
            o._autoTick = currentTick;
         }else if(currentTick - o._autoTick > 30000){
            o.reset();
         }
      }
   }
   o._currentTick = currentTick;
}

//==========================================================
// <T>重置目标处理。</T>
//
// @method
//==========================================================
MO.FEaiEarthSphere_reset = function FEaiEarthSphere_reset(){
   var o = this;
   // 设置方向
   o._targetDirection.set(0, 1, 0);
   o._matrix.transformPoint3(o._targetDirection, o._sourceDirection);
   o._sourceDirection.normalize();
   // 计算旋转数据
   var axis = o._rotationAxis;
   axis.assign(o._sourceDirection);
   axis.cross(o._targetDirection);
   axis.normalize();
   o._rotationAngle = Math.acos(o._sourceDirection.dotPoint3(o._targetDirection));
   // 开启自动模式
   o.auto();
}

//==========================================================
// <T>自动目标处理。</T>
//
// @method
//==========================================================
MO.FEaiEarthSphere_auto = function FEaiEarthSphere_auto(){
   var o = this;
   o._optionRotation = true;
   o._currentRotation = 0;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiEarthSphere_dispose = function FEaiEarthSphere_dispose(){
   var o = this;
   o._sourceDirection = MO.Lang.Object.dispose(o._sourceDirection);
   o._currentDirection = MO.Lang.Object.dispose(o._currentDirection);
   o._targetDirection = MO.Lang.Object.dispose(o._targetDirection);
   // 父处理
   o.__base.FE3dSphere.dispose.call(o);
}
