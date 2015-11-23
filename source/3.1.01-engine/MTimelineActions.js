//==========================================================
// <T>时间线命令集合。</T>
//
// @class
// @author maocy
// @history 151113
//==========================================================
MO.MTimelineActions = function MTimelineActions(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @attribute
   o._processors = MO.Class.register(o, new MO.AGetter('_processors'));
   //..........................................................
   // @method
   o.construct   = MO.MTimelineActions_construct;
   // @method
   o.testStop    = MO.MTimelineActions_testStop;
   o.pushAction  = MO.MTimelineActions_pushAction;
   o.process     = MO.MTimelineActions_process;
   o.stop        = MO.MTimelineActions_stop;
   o.clear       = MO.MTimelineActions_clear;
   // @method
   o.dispose     = MO.MTimelineActions_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.MTimelineActions_construct = function MTimelineActions_construct(){
   var o = this;
   // 设置属性
   o._processors = new MO.TObjects();
}

//==========================================================
// <T>测试是否完成。</T>
//
// @method
// @return 是否完成
//==========================================================
MO.MTimelineActions_testStop = function MTimelineActions_testStop(){
   var o = this;
   if(o._processors.isEmpty()){
      return true;
   }
   return false;
}

//==========================================================
// <T>增加一个命令。</T>
//
// @method
// @param action:MTimelineAction 命令
//==========================================================
MO.MTimelineActions_pushAction = function MTimelineActions_pushAction(action, loopCd, loopCount){
   var o = this;
   MO.Assert.debugNotNull(action);
   var processor = new MO.STimelineActionProcessor();
   processor.loopCd = MO.Runtime.nvl(loopCd, MO.ETimelineLoop.Play);
   processor.loopCount = MO.Runtime.nvl(loopCount, 1);
   processor.action = action;
   o._processors.push(processor);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
// @param context:STimelineContext 环境
//==========================================================
MO.MTimelineActions_process = function MTimelineActions_process(context){
   var o = this;
   // 获得时刻
   var tick = context.tick;
   // 处理集合
   var processors = o._processors;
   var count = processors.count();
   for(var i = count - 1; i >= 0; i--){
      var processor = processors.at(i);
      var action = processor.action;
      // 检查延迟
      var recordTick = action.recordTick();
      if(recordTick == 0){
         action.setRecordTick(tick);
         continue;
      }
      var recordSpan = tick - recordTick;
      var delay = action.delay();
      if(delay != 0){
         if(recordSpan < delay){
            continue;
         }
      }
      // 逻辑处理
      if(!action.statusStart()){
         // 开始处理
         action.start(context);
      }else if(action.statusStop()){
         // 停止处理
         processors.erase(i);
         action.stop(context);
         action.dispose();
      }else{
         // 逻辑处理
         action.process(context);
         // 检查超时
         var duration = action.duration();
         if(duration != 0){
            var actionSpan = tick - action.startTick();
            if(actionSpan > duration){
               processors.erase(i);
               context.currentTick = duration;
               action.stop(context);
               action.dispose();
               continue;
            }
         }
      }
   }
}

//==========================================================
// <T>停止处理。</T>
//
// @method
//==========================================================
MO.MTimelineActions_stop = function MTimelineActions_stop(){
   var o = this;
   var processors = o._processors;
   var count = processors.count();
   for(var i = 0; i < count; i++){
      var processor = processors.at(i);
      processor.stop();
   }
}

//==========================================================
// <T>清空处理。</T>
//
// @method
//==========================================================
MO.MTimelineActions_clear = function MTimelineActions_clear(){
   var o = this;
   var processors = o._processors;
   var count = processors.count();
   for(var i = 0; i < count; i++){
      var processor = processors.at(i);
      processor.clear();
   }
   processors.clear();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.MTimelineActions_dispose = function MTimelineActions_dispose(){
   var o = this;
   // 释放属性
   o._processors = MO.Lang.Object.dispose(o._processors);
}
