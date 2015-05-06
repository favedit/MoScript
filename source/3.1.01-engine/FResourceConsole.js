//==========================================================
// <T>资源控制台。</T>
//
// @console
// @author maocy
// @version 150104
//==========================================================
function FResourceConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._scopeCd             = EScope.Local;
   // @attribute
   o._factory             = null;
   o._types               = null;
   o._resources           = null;
   // @attribute
   o._loadResources       = null;
   o._loadingResources    = null;
   o._processBlocks       = null;
   o._processResources    = null;
   o._processingResources = null;
   o._pipeline            = null;
   o._pipelinePool        = null;
   // @attribute
   o._thread              = null;
   o._loadLimit           = 8;
   o._processLimit        = 4;
   o._interval            = 200;
   //..........................................................
   // @event
   o.onComplete           = FResourceConsole_onComplete;
   o.onPipelineComplete   = FResourceConsole_onPipelineComplete;
   o.onPipelineBlockComplete = FResourceConsole_onPipelineBlockComplete;
   o.onLoad               = FResourceConsole_onLoad;
   o.onBlockLoad          = FResourceConsole_onBlockLoad;
   o.onProcess            = FResourceConsole_onProcess;
   //..........................................................
   // @method
   o.construct            = FResourceConsole_construct;
   o.registerType         = FResourceConsole_registerType;
   o.factory              = FResourceConsole_factory;
   o.allocPipeline        = FResourceConsole_allocPipeline;
   o.freePipeline         = FResourceConsole_freePipeline;
   o.load                 = FResourceConsole_load;
   return o;
}

//==========================================================
// <T>加载事件完成后，响应的处理。</T>
//
// @method
// @param resource:FResource 资源
// @param data:ArrayBuffer 数据
//==========================================================
function FResourceConsole_onComplete(resource, data){
   var o = this;
   resource._data = null;
   o._loadingResources.remove(resource);
   resource.onComplete(data);
}

//==========================================================
// <T>加载事件完成后，响应的处理。</T>
//
// @method
// @param pipeline:FResourcePipeline 资源处理管道
// @param resource:FResource 资源
// @param data:ArrayBuffer 数据
//==========================================================
function FResourceConsole_onPipelineComplete(pipeline, resource, data){
   var o = this;
   o.freePipeline(pipeline);
   o._processingResources.remove(resource);
   o.onComplete(resource, data);
}

//==========================================================
// <T>加载事件完成后，响应的处理。</T>
//
// @method
// @param pipeline:FResourcePipeline 资源处理管道
//==========================================================
function FResourceConsole_onPipelineBlockComplete(pipeline, resource, block, data){
   var o = this;
   o.freePipeline(pipeline);
   block._data = data;
   block._ready = true;
   // 数据处理
   if(resource.testBlockReady()){
      // 合并数据流
      var stream = RClass.create(FDataStream);
      stream.setEndianCd(true);
      stream.setLength(resource._dataLength);
      var blocks = resource._blocks;
      var count = blocks.count();
      for(var i = 0; i < count; i++){
         var block = blocks.at(i);
         var data = block._data;
         stream.writeBytes(data.buffer, 0, data.byteLength);
         block.dispose();
      }
      blocks.clear();
      // 资源完成处理
      stream.flip();
      var span = RTimer.current() - resource._compressStartTick;
      RLogger.info(o, 'Process resource decompress. (guid={1}, block_count={2}, length={3}, total={4}, tick={5})', resource.guid(), count, resource._compressLength, resource._dataLength, span);
      resource.onComplete(stream);
   }
}

//==========================================================
// <T>加载事件完成后，响应的处理。</T>
//
// @method
// @param connection:FHttpConnection 链接
//==========================================================
function FResourceConsole_onLoad(connection){
   var o = this;
   // 设置资源
   var data = connection.outputData();
   var resource = connection._resource;
   resource._data = new Uint8Array(data);
   // 移除加载中
   o._loadingResources.remove(resource);
   // 放入处理中
   o._processResources.push(resource);
}

//==========================================================
// <T>加载事件完成后，响应的处理。</T>
//
// @method
// @param connection:FHttpConnection 链接
//==========================================================
function FResourceConsole_onBlockLoad(connection){
   var o = this;
   var resource = connection._resource;
   var data = connection.outputData();
   // 创建读取流
   var view = RClass.create(FDataView);
   view.setEndianCd(true);
   view.link(data);
   // 反序列化数据
   var compressCode = view.readString();
   var length = resource._dataLength = view.readInt32();
   var blockSize = view.readInt32();
   var blockCount = view.readInt32();
   var blocks = resource._blocks = new TObjects();
   for(var i = 0; i < blockCount; i++){
      // 读取数据
      var size = view.readInt32();
      var blockData = new ArrayBuffer(size);
      view.readBytes(blockData, 0, size);
      // 创建数据块
      var block = RClass.create(FResourceBlock);
      block._index = i;
      block._compressData = new Uint8Array(blockData);
      blocks.push(block);
      //o._processBlocks.push(block);
      // 解压数据
      var pipeline = o.allocPipeline();
      pipeline.decompressBlock(resource, block);
   }
   // 释放资源
   view.dispose();
   // 移除加载中
   o._loadingResources.remove(resource);
   resource._compressLength = data.byteLength;
   resource._compressStartTick = RTimer.current();
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
function FResourceConsole_onProcess(){
   var o = this;
   var httpConsole = RConsole.find(FHttpConsole);
   //..........................................................
   // 获取数据
   var loadResources = o._loadResources;
   var loadingResources = o._loadingResources;
   var pc = loadingResources.count();
   if(!loadResources.isEmpty()){
      for(var i = o._loadLimit - pc; i > 0; i--){
         var resource = loadResources.shift();
         var sourceUrl = resource.sourceUrl();
         // 加载处理
         var connection = httpConsole.send(sourceUrl);
         connection._resource = resource;
         if(resource._dataCompress){
            if(resource._dataBlock){
               connection.addLoadListener(o, o.onBlockLoad);
            }else{
               connection.addLoadListener(o, o.onLoad);
            }
         }else{
            connection.addLoadListener(o, o.onComplete);
         }
         resource._dataLoad = true;
         // 增加加载中集合
         loadingResources.push(resource);
         // 跳出循环
         if(loadResources.isEmpty()){
            break;
         }
      }
   }
   //..........................................................
   // 设置是否支持进程方式
   //o._optionProcess = RBrowser.capability().optionProcess;
   // 处理数据
   var processResources = o._processResources;
   var processingResources = o._processingResources;
   var pc = processingResources.count();
   if(!processResources.isEmpty()){
      var pipeline = o._pipeline;
      if(pipeline){
         // 单线程处理
         if(processingResources.isEmpty()){
            var resource = processResources.shift();
            processingResources.push(resource);
            pipeline.decompressSingle(resource);
         }
      }else{
         // 多线程处理
         for(var i = o._processLimit - pc; i > 0; i--){
            var resource = processResources.shift();
            var pipeline = o.allocPipeline();
            // 增加处理中集合
            processingResources.push(resource);
            // 解压缩处理
            pipeline.decompress(resource);
            // 跳出循环
            if(processResources.isEmpty()){
               break;
            }
         }
      }
   }
   //..........................................................
   // 处理块集合
   //var looper = o._processBlocks;
   //looper.record();
   //while(looper.next()){
      //var block = looper.current();
      //if(block.testReady()){
      //   looper.removeCurrent();
      //}
   //}
   // RLogger.info(o, 'onProcess', 'Process resource. (loading={1}, process={2}, pool={3})', o._loadingResources.count(), o._processingResources.count(), o._pipelinePool.dump());
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FResourceConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 设置变量
   o._factory = RClass.create(FClassFactory);
   o._types = new TDictionary();
   o._resources = new TDictionary();
   o._loadResources  = new TObjects();
   o._loadingResources = new TObjects();
   o._processBlocks = new TLooper();
   o._processResources = new TObjects();
   o._processingResources = new TObjects();
   o._pipelinePool  = RClass.create(FObjectPool);
   // 是否支持多线程
   var bc = RBrowser.capability();
   if(!bc.optionProcess){
      var p = o._pipeline = RClass.create(FResourceLzmaPipeline);
      p.setConsole(o);
   }
   // 创建线程
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.addProcessListener(o, o.onProcess);
   RConsole.find(FThreadConsole).start(t);
}

//==========================================================
// <T>注册资源类型。</T>
//
// @method
// @return FResourceType 资源类型
//==========================================================
function FResourceConsole_registerType(p){
   var o = this;
   var c = p.code();
   return o._types.set(c, p);;
}

//==========================================================
// <T>获得类工厂。</T>
//
// @method
// @return FClassFactory 类工厂
//==========================================================
function FResourceConsole_factory(){
   return this._factory;
}

//==========================================================
// <T>收集资源处理管道。</T>
//
// @method
// @return FResourcePipeline 处理管道
//==========================================================
function FResourceConsole_allocPipeline(){
   var o = this;
   var pool = o._pipelinePool;
   if(!pool.hasFree()){
      var pipeline = RClass.create(FResourceLzmaPipeline);
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
function FResourceConsole_freePipeline(pipeline){
   this._pipelinePool.free(pipeline);
}

//==========================================================
// <T>加载资源对象。</T>
//
// @method
// @param resource:FResource 资源对象
//==========================================================
function FResourceConsole_load(resource){
   var o = this;
   var guid = resource.guid();
   // 检查编号
   var resources = o._resources;
   if(resources.contains(guid)){
      throw new TError(o, 'Resource is already loaded. (guid={1})', guid);
   }
   resources.set(guid, resource);
   // 放入队列
   o._loadResources.push(resource);
   // 设置标志
   resource._dataLoad = true;
}
