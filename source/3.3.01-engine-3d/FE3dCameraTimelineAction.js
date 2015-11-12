 //==========================================================
// <T>相机时间命令。</T>
//
// @class
// @author maocy
// @history 151106
//==========================================================
MO.FE3dCameraTimelineAction = function FE3dCameraTimelineAction(o){
   o = MO.Class.inherits(this, o, MO.FTimelineAction);
   //..........................................................
   // @attribute
   o._code            = 'move';
   // @attribute
   o._camera          = MO.Class.register(o, new MO.AGetter('_camera'));
   o._speed           = MO.Class.register(o, new MO.AGetSet('_speed'), 100);
   // @attribute
   o._currentPosition = MO.Class.register(o, new MO.AGetter('_currentPosition'));
   o._sourcePosition  = MO.Class.register(o, new MO.AGetter('_sourcePosition'));
   o._targetPosition  = MO.Class.register(o, new MO.AGetter('_targetPosition'));
   //..........................................................
   // @method
   o.onStart          = MO.FE3dCameraTimelineAction_onStart;
   o.onProcess        = MO.FE3dCameraTimelineAction_onProcess;
   o.onStop           = MO.FE3dCameraTimelineAction_onStop;
   //..........................................................
   // @method
   o.construct        = MO.FE3dCameraTimelineAction_construct;
   // @method
   o.link             = MO.FE3dCameraTimelineAction_link;
   // @method
   o.dispose          = MO.FE3dCameraTimelineAction_dispose;
   return o;
}

//==========================================================
// <T>开始事件处理。</T>
//
// @method
// @param context:STimelineContext 时间线环境
//==========================================================
MO.FE3dCameraTimelineAction_onStart = function FE3dCameraTimelineAction_onStart(context){
   var o = this;
   o.__base.FTimelineAction.onStart.call(o, context);
}

//==========================================================
// <T>逻辑事件处理。</T>
//
// @method
// @param context:STimelineContext 时间线环境
//==========================================================
MO.FE3dCameraTimelineAction_onProcess = function FE3dCameraTimelineAction_onProcess(context){
   var o = this;
   o.__base.FTimelineAction.onProcess.call(o, context);
   // 计算方向
   var direction = o._currentDirection;
   direction.direction(o._sourcePosition, o._targetPosition);
   direction.normalize();
   // 计算移动
   var moveLength = o._speed * context.spanSecond;
   var length = o._currentPosition.lengthToValue3(o._targetPosition);
   if(moveLength > length){
      o._currentPosition.assign(o._targetPosition);
      o._statusStop = true;
   }else{
      o._currentPosition.add(direction.x * moveLength, direction.y * moveLength, direction.z * moveLength);
   }
   // 更新相机
   o._camera.position().assign(o._currentPosition);
   o._camera.update();
}

//==========================================================
// <T>结束事件处理。</T>
//
// @method
// @param context:STimelineContext 时间线环境
//==========================================================
MO.FE3dCameraTimelineAction_onStop = function FE3dCameraTimelineAction_onStop(){
   var o = this;
   o.__base.FTimelineAction.onStop.call(o, context);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dCameraTimelineAction_construct = function FE3dCameraTimelineAction_construct(){
   var o = this;
   o.__base.FTimelineAction.construct.call(o);
   o._currentPosition = new MO.SPoint3();
   o._currentDirection = new MO.SVector3();
   o._sourcePosition = new MO.SPoint3();
   o._targetPosition = new MO.SPoint3();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dCameraTimelineAction_link = function FE3dCameraTimelineAction_link(camera){
   var o = this;
   o._camera = camera;
   o._currentPosition.assign(camera.position());
   o._sourcePosition.assign(camera.position());
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dCameraTimelineAction_setTargetControl = function FE3dCameraTimelineAction_setTargetControl(){
   var o = this;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3dCameraTimelineAction_dispose = function FE3dCameraTimelineAction_dispose(){
   var o = this;
   o._currentPosition = MO.Lang.Object.dispose(o._currentPosition);
   o._currentDirection = MO.Lang.Object.dispose(o._currentDirection);
   o._sourcePosition = MO.Lang.Object.dispose(o._sourcePosition);
   o._targetPosition = MO.Lang.Object.dispose(o._targetPosition);
   o._camera = null;
   // 父处理
   o.__base.FTimelineAction.dispose.call(o);
}
