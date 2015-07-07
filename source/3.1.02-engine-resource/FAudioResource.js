with(MO){
   //==========================================================
   // <T>资源控制台。</T>
   //
   // @console
   // @author maocy
   // @version 150104
   //==========================================================
   MO.FAudioResource = function FAudioResource(o){
      o = RClass.inherits(this, o, FConsole);
      //..........................................................
      // @attribute
      o._scopeCd          = EScope.Global;
      // @attribute
      o._factory          = null;
      o._types            = null;
      o._resources        = null;
      // @attribute
      o._loadResources    = null;
      o._loadingResources = null;
      o._processStorages  = null;
      // @attribute
      o._thread           = null;
      o._loadLimit        = 8;
      o._interval         = 150;
      //..........................................................
      // @event
      o.onComplete        = FAudioResource_onComplete;
      o.onLoad            = FAudioResource_onLoad;
      o.onBlockLoad       = FAudioResource_onBlockLoad;
      o.onProcess         = FAudioResource_onProcess;
      //..........................................................
      // @method
      o.construct         = FAudioResource_construct;
      o.registerType      = FAudioResource_registerType;
      o.factory           = FAudioResource_factory;
      o.load              = FAudioResource_load;
      return o;
   }

   //==========================================================
   // <T>加载事件完成后，响应的处理。</T>
   //
   // @method
   // @param resource:FResource 资源
   // @param data:ArrayBuffer 数据
   //==========================================================
   MO.FAudioResource_onComplete = function FAudioResource_onComplete(resource, data){
      var o = this;
      resource._data = null;
      o._loadingResources.remove(resource);
      resource.onComplete(data);
   }

   //==========================================================
   // <T>加载事件完成后，响应的处理。</T>
   //
   // @method
   // @param connection:FHttpConnection 链接
   //==========================================================
   MO.FAudioResource_onLoad = function FAudioResource_onLoad(connection){
      var o = this;
      // 设置资源
      var data = connection.outputData();
      var resource = connection._resource;
      // 加载数据
      var storage = RClass.create(FResourceSingleStorage);
      storage.setResource(resource);
      storage.load(data);
      // 加载资源存储块集合
      RConsole.find(FResourceDataConsole).load(storage);
      // 移除加载中
      o._loadingResources.remove(resource);
      o._processStorages.push(storage);
   }

   //==========================================================
   // <T>加载事件完成后，响应的处理。</T>
   //
   // @method
   // @param connection:FHttpConnection 链接
   //==========================================================
   MO.FAudioResource_onBlockLoad = function FAudioResource_onBlockLoad(connection){
      var o = this;
      var data = connection.outputData();
      // 获得资源
      var resource = connection._resource;
      resource._compressLength = data.byteLength;
      resource._compressStartTick = RTimer.current();
      // 加载数据
      var storage = RClass.create(FResourceBlockStorage);
      storage.setResource(resource);
      storage.load(data);
      // 加载资源存储块集合
      var dataConsole = RConsole.find(FResourceDataConsole);
      var blocks = storage.blocks();
      var count = blocks.count();
      for(var i = 0; i < count; i++){
         var block = blocks.at(i);
         dataConsole.load(block);
      }
      // 移除加载中
      o._loadingResources.remove(resource);
      o._processStorages.push(storage);
   }

   //==========================================================
   // <T>逻辑处理。</T>
   //
   // @method
   //==========================================================
   MO.FAudioResource_onProcess = function FAudioResource_onProcess(){
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
      // 处理存储集合
      var storages = o._processStorages;
      storages.record();
      while(storages.next()){
         var storage = storages.current();
         if(storage.testReady()){
            storages.removeCurrent();
            // 完成处理
            storage.complete();
            storage.dispose();
         }
      }
      // MO.Logger.info(o, 'onProcess', 'Process resource. (loading={1}, process={2}, pool={3})', o._loadingResources.count(), o._processingResources.count(), o._pipelinePool.dump());
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FAudioResource_construct = function FAudioResource_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      // 设置变量
      o._factory = RClass.create(FClassFactory);
      o._types = new TDictionary();
      o._resources = new TDictionary();
      o._loadResources  = new TObjects();
      o._loadingResources = new TObjects();
      o._processStorages = new TLooper();
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
   MO.FAudioResource_registerType = function FAudioResource_registerType(type){
      var o = this;
      var code = type.code();
      return o._types.set(code, type);
   }

   //==========================================================
   // <T>获得类工厂。</T>
   //
   // @method
   // @return FClassFactory 类工厂
   //==========================================================
   MO.FAudioResource_factory = function FAudioResource_factory(){
      return this._factory;
   }

   //==========================================================
   // <T>加载资源对象。</T>
   //
   // @method
   // @param resource:FResource 资源对象
   //==========================================================
   MO.FAudioResource_load = function FAudioResource_load(resource){
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
}
