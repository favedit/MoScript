//==========================================================
// <T>时间线对象。</T>
//
// @class
// @author maocy
// @history 150710
//==========================================================
MO.MTimelineWorker = function MTimelineWorker(o){
   o = MO.Class.inherits(this, o, MO.MListener);
   //..........................................................
   // @attribute
   o._code        = MO.Class.register(o, new MO.AGetSet('_code'));
   // @attribute
   o._delay       = MO.Class.register(o, new MO.AGetSet('_delay'), 0);
   o._duration    = MO.Class.register(o, new MO.AGetSet('_duration'), 0);
   // @attribute
   o._tick        = MO.Class.register(o, new MO.AGetter('_tick'), 0);
   o._recordTick  = MO.Class.register(o, new MO.AGetSet('_recordTick'), 0);
   o._startTick   = MO.Class.register(o, new MO.AGetter('_startTick'), 0);
   o._lastTick    = MO.Class.register(o, new MO.AGetter('_lastTick'), 0);
   // @attribute
   o._statusStart = MO.Class.register(o, new MO.AGetter('_statusStart'), false);
   o._statusStop  = MO.Class.register(o, new MO.AGetter('_statusStop'), false);
   //..........................................................
   // @event
   o._eventActionStart     = null;
   o._listenersActionStart = MO.Class.register(o, new MO.AListener('_listenersActionStart', MO.EEvent.ActionStart));
   o._eventActionStop      = null;
   o._listenersActionStop  = MO.Class.register(o, new MO.AListener('_listenersActionStop', MO.EEvent.ActionStop));
   //..........................................................
   // @method
   o.onStart      = MO.MTimelineWorker_onStart;
   o.onProcess    = MO.MTimelineWorker_onProcess;
   o.onStop       = MO.MTimelineWorker_onStop;
   //..........................................................
   // @method
   o.construct    = MO.MTimelineWorker_construct;
   // @method
   o.setup        = MO.MTimelineWorker_setup;
   o.start        = MO.MTimelineWorker_start;
   o.process      = MO.MTimelineWorker_process;
   o.stop         = MO.MTimelineWorker_stop;
   // @method
   o.dispose      = MO.MTimelineWorker_dispose;
   return o;
}

//==========================================================
// <T>开始事件处理。</T>
//
// @method
// @param context:STimelineContext 时间轴环境
//==========================================================
MO.MTimelineWorker_onStart = function MTimelineWorker_onStart(context) {
   var o = this;
   o._startTick = context.tick;
   o._lastTick = context.tick;
   o.processActionStartListener(context);
}

//==========================================================
// <T>逻辑事件处理。</T>
//
// @method
// @param context:STimelineContext 时间线环境
//==========================================================
MO.MTimelineWorker_onProcess = function MTimelineWorker_onProcess(context){
   var o = this;
}

//==========================================================
// <T>结束事件处理。</T>
//
// @method
// @param context:STimelineContext 时间轴环境
//==========================================================
MO.MTimelineWorker_onStop = function MTimelineWorker_onStop(context) {
   var o = this;
   o.processActionStopListener(context);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.MTimelineWorker_construct = function MTimelineWorker_construct(){
   var o = this;
   o._eventActionStart = new MO.SEvent(o);
   o._eventActionStop = new MO.SEvent(o);
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.MTimelineWorker_setup = function MTimelineWorker_setup(){
   var o = this;
   o._statusStart = false;
}

//==========================================================
// <T>开始处理。</T>
//
// @method
//==========================================================
MO.MTimelineWorker_start = function MTimelineWorker_start(context){
   var o = this;
   if(!o._statusStart){
      o.onStart(context);
      o._statusStart = true;
   }
   o._statusStop = false;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.MTimelineWorker_process = function MTimelineWorker_process(context){
   var o = this;
   var tick = context.tick;
   var span = tick - o._lastTick;
   // 计算环境
   context.currentTick = o._tick = tick - o._startTick;
   context.span = span;
   context.spanSecond = span * 0.001;
   // 逻辑处理
   o.onProcess(context);
   o._lastTick = tick;
}

//==========================================================
// <T>停止处理。</T>
//
// @method
//==========================================================
MO.MTimelineWorker_stop = function MTimelineWorker_stop(context){
   var o = this;
   if(!o._statusStop){
      o.onStop(context);
      o._statusStop = true;
   }
   o._statusStart = false;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.MTimelineWorker_dispose = function MTimelineWorker_dispose(){
   var o = this;
   o._eventActionStart = MO.Lang.Object.dispose(o._eventActionStart);
   o._eventActionStop = MO.Lang.Object.dispose(o._eventActionStop);
   o.__base.MListener.dispose.call(o);
}
