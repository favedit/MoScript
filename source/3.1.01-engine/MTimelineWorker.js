//==========================================================
// <T>时间线对象。</T>
//
// @class
// @author maocy
// @history 150710
//==========================================================
MO.MTimelineWorker = function MTimelineWorker(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @attribute
   o._code        = MO.Class.register(o, new MO.AGetSet('_code'));
   // @attribute
   o._tick        = MO.Class.register(o, new MO.AGetSet('_tick'), 0);
   o._startTick   = MO.Class.register(o, new MO.AGetter('_startTick'), 0);
   o._lastTick    = MO.Class.register(o, new MO.AGetter('_lastTick'), 0);
   o._duration    = MO.Class.register(o, new MO.AGetSet('_duration'), 0);
   // @attribute
   o._statusStart = MO.Class.register(o, new MO.AGetter('_statusStart'), false);
   o._statusStop  = MO.Class.register(o, new MO.AGetter('_statusStop'), false);
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
// @param context:STimelineContext 时间线环境
//==========================================================
MO.MTimelineWorker_onStart = function MTimelineWorker_onStart(context){
   var o = this;
   o._startTick = context.tick;
   o._lastTick = context.tick;
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
// @param context:STimelineContext 时间线环境
//==========================================================
MO.MTimelineWorker_onStop = function MTimelineWorker_onStop(context){
   var o = this;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.MTimelineWorker_construct = function MTimelineWorker_construct(){
   var o = this;
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
   context.span = context.tick - o._lastTick;
   context.spanSecond = (context.tick - o._lastTick) * 0.001;
   o.onProcess(context);
   o._lastTick = context.tick;
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
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.MTimelineWorker_dispose = function MTimelineWorker_dispose(){
   var o = this;
}
