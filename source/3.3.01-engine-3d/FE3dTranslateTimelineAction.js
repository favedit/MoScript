 //==========================================================
// <T>可渲染对象矩阵动画。</T>
//
// @class
// @author sunpeng
// @history 151111
//==========================================================
MO.FE3dTranslateTimelineAction = function FE3dTranslateTimelineAction(o){
   o = MO.Class.inherits(this, o, MO.MTimelineAction);
   //..........................................................
   // @attribute
   o._code               = 'translate';
   // @attribute
   o._matrix             = MO.Class.register(o, new MO.AGetter('_matrix'));
   o._originTranslate    = MO.Class.register(o, new MO.AGetter('_originTranslate'));
   o._currentTranslate   = MO.Class.register(o, new MO.AGetter('_currentTranslate'));
   o._targetTranslate    = MO.Class.register(o, new MO.AGetter('_targetTranslate'));
   //..........................................................
   // @method
   o.onStart          = MO.FE3dTranslateTimelineAction_onStart;
   o.onProcess        = MO.FE3dTranslateTimelineAction_onProcess;
   o.onStop           = MO.FE3dTranslateTimelineAction_onStop;
   //..........................................................
   // @method
   o.construct        = MO.FE3dTranslateTimelineAction_construct;
   // @method
   o.link             = MO.FE3dTranslateTimelineAction_link;
   // @method
   o.dispose          = MO.FE3dTranslateTimelineAction_dispose;
   return o;
}

//==========================================================
// <T>开始事件处理。</T>
//
// @method
// @param context:STimelineContext 时间线环境
//==========================================================
MO.FE3dTranslateTimelineAction_onStart = function FE3dTranslateTimelineAction_onStart(context){
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
MO.FE3dTranslateTimelineAction_onProcess = function FE3dTranslateTimelineAction_onProcess(context){
   var o = this;
   o.__base.MTimelineAction.onProcess.call(o, context);
   var rate = context.currentTick / o.duration();
   var matrix = o._matrix;
   var current = o._currentTranslate;
   var origin = o._originTranslate;
   var target = o._targetTranslate;
   current.x = origin.x + (target.x - origin.x) * rate;
   current.y = origin.y + (target.y - origin.y) * rate;
   current.z = origin.z + (target.z - origin.z) * rate;
   matrix.setTranslate(current.x, current.y, current.z);
   matrix.update();
}

//==========================================================
// <T>结束事件处理。</T>
//
// @method
// @param context:STimelineContext 时间线环境
//==========================================================
MO.FE3dTranslateTimelineAction_onStop = function FE3dTranslateTimelineAction_onStop(context){
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
MO.FE3dTranslateTimelineAction_construct = function FE3dTranslateTimelineAction_construct(){
   var o = this;
   o.__base.MTimelineAction.construct.call(o);
   o._currentTranslate = new MO.SValue3();
   o._originTranslate = new MO.SValue3();
   o._targetTranslate = new MO.SValue3();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dTranslateTimelineAction_link = function FE3dTranslateTimelineAction_link(matrix){
   var o = this;
   o._matrix = matrix;
   o._originTranslate.set(matrix.tx, matrix.ty, matrix.tz);
   o._currentTranslate.set(matrix.tx, matrix.ty, matrix.tz);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dTranslateTimelineAction_setTargetControl = function FE3dTranslateTimelineAction_setTargetControl(){
   var o = this;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3dTranslateTimelineAction_dispose = function FE3dTranslateTimelineAction_dispose(){
   var o = this;
   // 父处理
   o.__base.MTimelineAction.dispose.call(o);
}
