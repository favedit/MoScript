//==========================================================
// <T>主时间线对象。</T>
//
// @class
// @author maocy
// @history 150710
//==========================================================
MO.FMainTimeline = function FMainTimeline(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListener, MO.MTimelineActions, MO.MTimelineSections, MO.MTimelines);
   //..........................................................
   // @attribute
   o._context   = null;
   // @attribute
   o._startTick = 0;
   o._lastTick  = 0;
   o._interval  = 0;
   //..........................................................
   // @method
   o.construct  = MO.FMainTimeline_construct;
   // @method
   o.setup      = MO.FMainTimeline_setup;
   o.start      = MO.FMainTimeline_start;
   o.process    = MO.FMainTimeline_process;
   o.stop       = MO.FMainTimeline_stop;
   o.clear      = MO.FMainTimeline_clear;
   // @method
   o.dispose    = MO.FMainTimeline_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FMainTimeline_construct = function FMainTimeline_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o.__base.MTimelineActions.construct.call(o);
   o.__base.MTimelineSections.construct.call(o);
   o.__base.MTimelines.construct.call(o);
   // 设置属性
   var context = o._context = new MO.STimelineContext();
   context.mainTimeline = o;
   o._timelines = new MO.TObjects();
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FMainTimeline_setup = function FMainTimeline_setup(){
   var o = this;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FMainTimeline_start = function FMainTimeline_start(){
   var o = this;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FMainTimeline_process = function FMainTimeline_process(){
   var o = this;
   var currentTick = MO.Timer.current();
   // 计算间隔
   if(currentTick - o._lastTick < o._interval){
      return false;
   }
   // 计算开始间隔
   if(o._startTick == 0){
      o._startTick = currentTick;
      return true;
   }
   // 设置环境
   var context = o._context;
   context.tick = currentTick - o._startTick;
   // 命令处理
   o.__base.MTimelineActions.process.call(o, context);
   // 段落处理
   o.__base.MTimelineSections.process.call(o, context);
   // 时间线处理
   o.__base.MTimelines.process.call(o, context);
   // 设置最后时刻
   o._lastTick = currentTick;
}

//==========================================================
// <T>停止处理。</T>
//
// @method
//==========================================================
MO.FMainTimeline_stop = function FMainTimeline_stop(){
   var o = this;
   o.__base.MTimelineActions.stop.call(o);
   o.__base.MTimelineSections.stop.call(o);
   o.__base.MTimelines.stop.call(o);
}

//==========================================================
// <T>清空处理。</T>
//
// @method
//==========================================================
MO.FMainTimeline_clear = function FMainTimeline_clear(){
   var o = this;
   o.__base.MTimelineActions.clear.call(o);
   o.__base.MTimelineSections.clear.call(o);
   o.__base.MTimelines.clear.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FMainTimeline_dispose = function FMainTimeline_dispose(){
   var o = this;
   // 释放属性
   o._timelines = MO.Lang.Object.dispose(o._timelines);
   o._context = MO.Lang.Object.dispose(o._context);
   // 父处理
   o.__base.MTimelines.dispose.call(o);
   o.__base.MTimelineSections.dispose.call(o);
   o.__base.MTimelineActions.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
