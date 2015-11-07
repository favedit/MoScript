 //==========================================================
// <T>时间命令。</T>
//
// @class
// @author maocy
// @history 150610
//==========================================================
MO.FE3dMoveTimelineAction = function FE3dMoveTimelineAction(o){
   o = MO.Class.inherits(this, o, MO.MTimelineAction);
   //..........................................................
   // @attribute
   o._code            = 'move';
   // @attribute
   o._currentMatrix   = MO.Class.register(o, new MO.AGetter('_currentMatrix'));
   o._sourceMatrix    = MO.Class.register(o, new MO.AGetter('_sourceMatrix'));
   o._targetMatrix    = MO.Class.register(o, new MO.AGetter('_targetMatrix'));
   //..........................................................
   // @method
   o.onStart          = MO.FE3dMoveTimelineAction_onStart;
   o.onProcess        = MO.FE3dMoveTimelineAction_onProcess;
   o.onStop           = MO.FE3dMoveTimelineAction_onStop;
   //..........................................................
   // @method
   o.construct        = MO.FE3dMoveTimelineAction_construct;
   // @method
   o.linkSource       = MO.FE3dMoveTimelineAction_linkSource;
   // @method
   o.dispose          = MO.FE3dMoveTimelineAction_dispose;
   return o;
}

//==========================================================
// <T>开始事件处理。</T>
//
// @method
//==========================================================
MO.FE3dMoveTimelineAction_onStart = function FE3dMoveTimelineAction_onStart(){
   var o = this;
   o.__base.MTimelineAction.onStart.call(o);
}

//==========================================================
// <T>逻辑事件处理。</T>
//
// @method
//==========================================================
MO.FE3dMoveTimelineAction_onProcess = function FE3dMoveTimelineAction_onProcess(){
   var o = this;
   o.__base.MTimelineAction.onProcess.call(o);
}

//==========================================================
// <T>结束事件处理。</T>
//
// @method
//==========================================================
MO.FE3dMoveTimelineAction_onStop = function FE3dMoveTimelineAction_onStop(){
   var o = this;
   o.__base.MTimelineAction.onStop.call(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dMoveTimelineAction_construct = function FE3dMoveTimelineAction_construct(){
   var o = this;
   o.__base.MTimelineAction.construct.call(o);
   o._currentMatrix = new MO.SMatrix3d();
   o._sourceMatrix = new MO.SMatrix3d();
   o._targetMatrix = new MO.SMatrix3d();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dMoveTimelineAction_linkSource = function FE3dMoveTimelineAction_linkSource(source){
   var o = this;
   var matrix = source.matrix();
   o._currentMatrix.assign(matrix);
   o._sourceMatrix.assign(matrix);
   o._targetMatrix.assign(matrix);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dMoveTimelineAction_setTargetControl = function FE3dMoveTimelineAction_setTargetControl(){
   var o = this;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3dMoveTimelineAction_dispose = function FE3dMoveTimelineAction_dispose(){
   var o = this;
   // 父处理
   o.__base.MTimelineAction.dispose.call(o);
}
