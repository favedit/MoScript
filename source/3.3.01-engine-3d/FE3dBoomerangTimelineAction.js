//==========================================================
// <T>可渲染对象矩阵动画,回旋镖。</T>
//
// @class
// @author adu
// @history 151111
//==========================================================
MO.FE3dBoomerangTimelineAction = function FE3dBoomerangTimelineAction(o) {
   o = MO.Class.inherits(this, o, MO.MTimelineAction);
   //..........................................................
   // @attribute
   o._code                 = 'boomerang';
   o._optionSin            = MO.Class.register(o, new MO.AGetSet('_optionSin'), false);
   o._matrix                = MO.Class.register(o, new MO.AGetter('_matrix'));
   o._originTranslate    = MO.Class.register(o, new MO.AGetter('_originTranslate'));
   o._currentTranslate   = MO.Class.register(o, new MO.AGetter('_currentTranslate'));
   o._targetTranslate    = MO.Class.register(o, new MO.AGetter('_targetTranslate'));
   //..........................................................
   // @method
   o.onStart               = MO.FE3dBoomerangTimelineAction_onStart;
   o.onProcess             = MO.FE3dBoomerangTimelineAction_onProcess;
   o.onStop                = MO.FE3dBoomerangTimelineAction_onStop;
   o.construct             = MO.FE3dBoomerangTimelineAction_construct;
   o.link                  = MO.FE3dBoomerangTimelineAction_link;
   o.dispose               = MO.FE3dBoomerangTimelineAction_dispose;
   return o;
}

//==========================================================
// <T>开始事件处理。</T>
//
// @method
// @param context:STimelineContext 时间线环境
//==========================================================
MO.FE3dBoomerangTimelineAction_onStart = function FE3dBoomerangTimelineAction_onStart(context) {
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
MO.FE3dBoomerangTimelineAction_onProcess = function FE3dBoomerangTimelineAction_onProcess(context) {
   var o = this;
   o.__base.MTimelineAction.onProcess.call(o, context);
   var rate = context.currentTick / o.duration();
   rate = rate > 1 ? 1 : rate;
   if(o._optionSin) rate = Math.sin(rate * Math.PI);
   var matrix = o._matrix;
   var current = o._currentTranslate;
   var origin = o._originTranslate;
   var target = o._targetTranslate;
   current.x = origin.x + target.x * rate;
   current.y = origin.y + target.y * rate;
   current.z = origin.z + target.z * rate;
   matrix.setTranslate(current.x, current.y, current.z);
   matrix.update();
}

//==========================================================
// <T>结束事件处理。</T>
//
// @method
// @param context:STimelineContext 时间线环境
//==========================================================
MO.FE3dBoomerangTimelineAction_onStop = function FE3dBoomerangTimelineAction_onStop(context) {
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
MO.FE3dBoomerangTimelineAction_construct = function FE3dBoomerangTimelineAction_construct() {
   var o = this;
   o.__base.MTimelineAction.construct.call(o);
   o._currentTranslate = new MO.SValue3();
   o._originTranslate = new MO.SValue3();
   o._targetTranslate = new MO.SValue3();
}

MO.FE3dBoomerangTimelineAction_link = function FE3dBoomerangTimelineAction_link(matrix) {
   var o = this;
   o._matrix = matrix;
   o._originTranslate.set(matrix.tx, matrix.ty, matrix.tz);
   o._currentTranslate.set(matrix.tx, matrix.ty, matrix.tz);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3dBoomerangTimelineAction_dispose = function FE3dBoomerangTimelineAction_dispose() {
   var o = this;
   //父处理
   o.__base.MTimelineAction.dispose.call(o);
}