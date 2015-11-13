//==========================================================
// <T>时间线对象。</T>
//
// @class
// @author maocy
// @history 150710
//==========================================================
MO.MTimelines = function MTimelines(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @attribute
   o._timelines   = MO.Class.register(o, new MO.AGetter('_timelines'));
   //..........................................................
   // @method
   o.construct    = MO.MTimelines_construct;
   // @method
   o.pushTimeline = MO.MTimelines_pushTimeline;
   // @method
   o.process      = MO.MTimelines_process;
   o.stop         = MO.MTimelines_stop;
   o.clear        = MO.MTimelines_clear;
   // @method
   o.dispose      = MO.MTimelines_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.MTimelines_construct = function MTimelines_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   // 设置属性
   o._timelines = new MO.TObjects();
}

//==========================================================
// <T>增加一个命令。</T>
//
// @method
// @param timeline:MTimelineAction 命令
//==========================================================
MO.MTimelines_pushTimeline = function MTimelines_pushTimeline(timeline){
   var o = this;
   MO.Assert.debugNotNull(timeline);
   timeline.setRecordTick(0);
   o._timelines.push(timeline);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
// @param context:STimelineContext 环境
//==========================================================
MO.MTimelines_process = function MTimelines_process(context){
   var o = this;
   // 获得时刻
   var tick = context.tick;
   // 处理集合
   var timelines = o._timelines;
   var count = timelines.count();
   for(var i = count - 1; i >= 0; i--){
      var timeline = timelines.at(i);
      // 检查延迟
      var recordTick = timeline.recordTick();
      if(recordTick == 0){
         timeline.setRecordTick(tick);
         continue;
      }
      var recordSpan = tick - recordTick;
      var delay = timeline.delay();
      if(delay != 0){
         if(recordSpan < delay){
            continue;
         }
      }
      // 逻辑处理
      if(!timeline.statusStart()){
         // 开始处理
         timeline.start(context);
      }else if(timeline.statusStop()){
         // 停止处理
         timelines.erase(i);
         timeline.stop(context);
         timeline.dispose();
      }else{
         // 检查超时
         var duration = timeline.duration();
         if(duration != 0){
            var timelineSpan = tick - timeline.startTick();
            if(timelineSpan > duration){
               timelines.erase(i);
               timeline.stop(context);
               timeline.dispose();
               continue;
            }
         }
         // 逻辑处理
         timeline.process(context);
      }
   }
}

//==========================================================
// <T>停止处理。</T>
//
// @method
//==========================================================
MO.MTimelines_stop = function MTimelines_stop(){
   var o = this;
   var timelines = o._timelines;
   var count = timelines.count();
   for(var i = 0; i < count; i++){
      var timeline = timelines.at(i);
      timeline.stop();
   }
}

//==========================================================
// <T>清空处理。</T>
//
// @method
//==========================================================
MO.MTimelines_clear = function MTimelines_clear(){
   var o = this;
   var timelines = o._timelines;
   var count = timelines.count();
   for(var i = 0; i < count; i++){
      var timeline = timelines.at(i);
      timeline.clear();
   }
   timelines.clear();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.MTimelines_dispose = function MTimelines_dispose(){
   var o = this;
   // 释放属性
   o._timelines = MO.Lang.Object.dispose(o._timelines);
   // 父处理
   o.__base.FObject.dispose.call(o);
}
