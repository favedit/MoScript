 //==========================================================
// <T>可渲染对象矩阵动画。</T>
//
// @class
// @author sunpeng
// @history 151111
//==========================================================
MO.FE3dRotateTimelineAction = function FE3dRotateTimelineAction(o){
   o = MO.Class.inherits(this, o, MO.MTimelineAction);
   //..........................................................
   // @attribute
   o._code               = 'rotate';
   // @attribute
   o._matrix             = MO.Class.register(o, new MO.AGetter('_matrix'));
   o._originRotate       = MO.Class.register(o, new MO.AGetter('_originRotate'));
   o._currentRotate      = MO.Class.register(o, new MO.AGetter('_currentRotate'));
   o._targetRotate       = MO.Class.register(o, new MO.AGetter('_targetRotate'));
   //..........................................................
   // @method
   o.onStart          = MO.FE3dRotateTimelineAction_onStart;
   o.onProcess        = MO.FE3dRotateTimelineAction_onProcess;
   o.onStop           = MO.FE3dRotateTimelineAction_onStop;
   //..........................................................
   // @method
   o.construct        = MO.FE3dRotateTimelineAction_construct;
   // @method
   o.link             = MO.FE3dRotateTimelineAction_link;
   // @method
   o.dispose          = MO.FE3dRotateTimelineAction_dispose;
   return o;
}

//==========================================================
// <T>开始事件处理。</T>
//
// @method
// @param context:STimelineContext 时间线环境
//==========================================================
MO.FE3dRotateTimelineAction_onStart = function FE3dRotateTimelineAction_onStart(context){
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
MO.FE3dRotateTimelineAction_onProcess = function FE3dRotateTimelineAction_onProcess(context){
   var o = this;
   o.__base.MTimelineAction.onProcess.call(o, context);
   var rate = context.currentTick / o.duration();
   var matrix = o._matrix;
   var current = o._currentRotate;
   var origin = o._originRotate;
   var target = o._targetRotate;
   current.x = origin.x + (target.x - origin.x) * rate;
   current.y = origin.y + (target.y - origin.y) * rate;
   current.z = origin.z + (target.z - origin.z) * rate;
   matrix.setRotation(current.x, current.y, current.z);
   matrix.update();
}

//==========================================================
// <T>结束事件处理。</T>
//
// @method
// @param context:STimelineContext 时间线环境
//==========================================================
MO.FE3dRotateTimelineAction_onStop = function FE3dRotateTimelineAction_onStop(context) {
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
MO.FE3dRotateTimelineAction_construct = function FE3dRotateTimelineAction_construct(){
   var o = this;
   o.__base.MTimelineAction.construct.call(o);
   o._originRotate = new MO.SValue3();
   o._currentRotate = new MO.SValue3();
   o._targetRotate = new MO.SValue3();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dRotateTimelineAction_link = function FE3dRotateTimelineAction_link(matrix){
   var o = this;
   o._matrix = matrix;
   o._originRotate.set(matrix.rx, matrix.ry, matrix.rz);
   o._currentRotate.set(matrix.rx, matrix.ry, matrix.rz);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dRotateTimelineAction_setTargetControl = function FE3dRotateTimelineAction_setTargetControl(){
   var o = this;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3dRotateTimelineAction_dispose = function FE3dRotateTimelineAction_dispose(){
   var o = this;
   // 父处理
   o.__base.MTimelineAction.dispose.call(o);
}
