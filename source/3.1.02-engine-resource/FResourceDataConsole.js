//==========================================================
// <T>资源控制台。</T>
//
// @console
// @author maocy
// @version 150104
//==========================================================
function FResourceDataConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._scopeCd           = EScope.Global;
   // @attribute
   o._loadDatas         = null;
   o._processDatas      = null;
   o._pipeline          = null;
   o._pipelinePool      = null;
   // @attribute
   o._thread            = null;
   o._processLimit      = 4;
   o._interval          = 200;
   //..........................................................
   // @event
   o.onPipelineComplete = FResourceDataConsole_onPipelineComplete;
   o.onProcess          = FResourceDataConsole_onProcess;
   //..........................................................
   // @method
   o.construct          = FResourceDataConsole_construct;
   // @method
   o.allocPipeline      = FResourceDataConsole_allocPipeline;
   o.freePipeline       = FResourceDataConsole_freePipeline;
   // @method
   o.load               = FResourceDataConsole_load;
   return o;
}

//==========================================================
// <T>加载事件完成后，响应的处理。</T>
//
// @method
// @param pipeline:FResourcePipeline 资源处理管道
// @param data:FResourceData 资源数据
//==========================================================
function FResourceDataConsole_onPipelineComplete(pipeline, data){
   var o = this;
   // 释放管道
   if(pipeline){
      o.freePipeline(pipeline);
   }
   // 移除处理数据
   o._processDatas.remove(data);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
function FResourceDataConsole_onProcess(){
   var o = this;
   // 检查待处理数据
   var loadDatas = o._loadDatas;
   var loadCount = loadDatas.count();
   if(loadCount == 0){
      return;
   }
   //..........................................................
   // 管道处理
   var pipeline = o._pipeline;
   if(pipeline){
      // 单线程解压缩
      if(!pipeline.testBusy()){
         var data = loadDatas.shift();
         pipeline.decompress(data);
      }
   }else{
      // 多线程解压缩
      var processDatas = o._processDatas;
      var processCount = processDatas.count();
      var idleCount = o._processLimit - processCount;
      if(idleCount <= 0){
         return;
      }
      // 放入可处理数据中
      var freeCount = Math.min(loadCount, idleCount);
      for(var i = 0; i < freeCount; i++){
         var data = loadDatas.shift();
         // 解压缩处理
         var pipeline = o.allocPipeline();
         pipeline.decompress(data);
         // 增加处理中集合
         processDatas.push(data);
      }
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FResourceDataConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 设置变量
   o._loadDatas  = new TObjects();
   o._processDatas = new TObjects();
   o._pipelinePool  = RClass.create(FObjectPool);
   // 是否支持多线程
   var capability = RBrowser.capability();
   if(!capability.optionProcess){
      var pipeline = o._pipeline = RClass.create(FResourceSinglePipeline);
      pipeline.setConsole(o);
   }
   // 创建线程
   var thread = o._thread = RClass.create(FThread);
   thread.setInterval(o._interval);
   thread.addProcessListener(o, o.onProcess);
   RConsole.find(FThreadConsole).start(thread);
}

//==========================================================
// <T>收集资源处理管道。</T>
//
// @method
// @return FResourcePipeline 处理管道
//==========================================================
function FResourceDataConsole_allocPipeline(){
   var o = this;
   var pool = o._pipelinePool;
   if(!pool.hasFree()){
      var pipeline = RClass.create(FResourceThreadPipeline);
      pipeline.setConsole(o);
      pool.push(pipeline);
   }
   return pool.alloc();
}

//==========================================================
// <T>释放资源处理管道。</T>
//
// @method
// @param pipeline:FResourcePipeline 处理管道
//==========================================================
function FResourceDataConsole_freePipeline(pipeline){
   this._pipelinePool.free(pipeline);
}

//==========================================================
// <T>加载资源数据。</T>
//
// @method
// @param data:MResourceData 资源数据
//==========================================================
function FResourceDataConsole_load(data){
   this._loadDatas.push(data);
}
