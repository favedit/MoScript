 //==========================================================
// <T>轴旋转渲染动画。</T>
//
// @class
// @author adu
// @history 151111
//==========================================================
MO.FE3dRotateAxisTimelineAction = function FE3dRotateAxisTimelineAction(o) {
   o = MO.Class.inherits(this, o, MO.MTimelineAction);
   //..........................................................
   // @attribute
   o._code                 = 'rotateAxis';
   o._matrix               = MO.Class.register(o, new MO.AGetter('_matrix'));
   o._targetAxis           = MO.Class.register(o, new MO.AGetter('_targetAxis'));
   o._targetAngle          = MO.Class.register(o, new MO.AGetSet('_targetAngle'));
   o._currentAngle         = 0;
   o._step                 = 0;
   //..........................................................
   // @method
   o.onStart               = MO.FE3dRotateAxisTimelineAction_onStart;
   o.onProcess             = MO.FE3dRotateAxisTimelineAction_onProcess;
   o.onStop                = MO.FE3dRotateAxisTimelineAction_onStop;
   o.construct             = MO.FE3dRotateAxisTimelineAction_construct;
   o.link                 = MO.FE3dRotateAxisTimelineAction_link;
   o.dispose              = MO.FE3dRotateAxisTimelineAction_dispose;
}

//==========================================================
// <T>开始事件处理。</T>
//
// @method
// @param context:STimelineContext 时间线环境
//==========================================================
MO.FE3dRotateAxisTimelineAction_onStart = function FE3dRotateAxisTimelineAction_onStart(context) {
   var o = this;
   var startEvent = o._eventActionStop;
   startEvent.context = context;
   startEvent.action = o;
   o.__base.MTimelineAction.onStart.call(o, context);
}

//==========================================================
// <T>逻辑事件处理。</T>
//
// @method
// @param context:STimelineContext 时间线环境
//==========================================================
MO.FE3dRotateAxisTimelineAction_onProcess = function FE3dRotateAxisTimelineAction_onProcess(context) {
   var o = this;
   o.__base.MTimelineAction.onProcess.call(o, context);
   var rate = context.currentTick / o.duration();
   rate = rate > 1 ? 1 : rate;
   var changeAngle = o._targetAngle * rate - o._currentAngle;
   o._currentAngle += changeAngle;
   o._matrix.addRotationAxis(o._targetAxis, changeAngle);
}

//==========================================================
// <T>结束事件处理。</T>
//
// @method
// @param context:STimelineContext 时间线环境
//==========================================================
MO.FE3dRotateAxisTimelineAction_onStop = function FE3dRotateAxisTimelineAction_onStop(context) { 
   var o = this;
   var stopEvent = o._eventActionStop;
   stopEvent.context = context;
   stopEvent.action = o;
   o.__base.MTimelineAction.onStop.call(o, context);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dRotateAxisTimelineAction_construct = function FE3dRotateAxisTimelineAction_construct() {
   var o = this;
   o._targetAxis = new MO.SVector3(0, 0, 0);
   o._targetAngle = 0;
   o.__base.MTimelineAction.construct.call(o);
}

//==========================================================
// <T>这只操作目标。</T>
//
// @method
//==========================================================
MO.FE3dRotateAxisTimelineAction_link = function FE3dRotateAxisTimelineAction_link(matrix) {
   var o = this;
   o._matrix = matrix;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3dRotateAxisTimelineAction_dispose = function FE3dRotateAxisTimelineAction_dispose() {
   var o = this;
   // 父处理
   o.__base.MTimelineAction.dispose.call(o);
}