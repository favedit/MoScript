//==========================================================
// <T>时间线段落。</T>
//
// @class
// @author maocy
// @history 151112
//==========================================================
MO.FTimelineSection = function FTimelineSection(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._processors = MO.Class.register(o, new MO.AGetter('_processors'));
   //..........................................................
   // @method
   o.construct   = MO.FTimelineSection_construct;
   // @method
   o.testStop    = MO.FTimelineSection_testStop;
   o.pushAction  = MO.FTimelineSection_pushAction;
   o.process     = MO.FTimelineSection_process;
   o.stop        = MO.FTimelineSection_stop;
   // @method
   o.dispose     = MO.FTimelineSection_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FTimelineSection_construct = function FTimelineSection_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   // 设置属性
   o._processors = new MO.TObjects();
}

//==========================================================
// <T>测试是否完成。</T>
//
// @method
// @return 是否完成
//==========================================================
MO.FTimelineSection_testStop = function FTimelineSection_testStop(){
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
MO.FTimelineSection_pushAction = function FTimelineSection_pushAction(action, loopCd, loopCount){
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
MO.FTimelineSection_process = function FTimelineSection_process(context){
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
         // 检查超时
         var duration = action.duration();
         if(duration != 0){
            var actionSpan = tick - action.startTick();
            if(actionSpan > duration){
               action.stop(context);
               continue;
            }
         }
         // 逻辑处理
         action.process(context);
      }
   }
}

//==========================================================
// <T>停止处理。</T>
//
// @method
//==========================================================
MO.FTimelineSection_stop = function FTimelineSection_stop(){
   var o = this;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FTimelineSection_dispose = function FTimelineSection_dispose(){
   var o = this;
   // 释放属性
   o._processors = MO.Lang.Object.dispose(o._processors);
   // 父处理
   o.__base.FObject.dispose.call(o);
}
