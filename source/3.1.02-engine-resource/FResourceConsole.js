//==========================================================
// <T>资源控制台。</T>
//
// @console
// @author maocy
// @version 150104
//==========================================================
MO.FResourceConsole = function FResourceConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._scopeCd          = MO.EScope.Global;
   // @attribute
   o._factory          = null;
   o._types            = null;
   o._packages         = null;
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
   o.onComplete        = MO.FResourceConsole_onComplete;
   o.onLoad            = MO.FResourceConsole_onLoad;
   o.onBlockLoad       = MO.FResourceConsole_onBlockLoad;
   o.onProcess         = MO.FResourceConsole_onProcess;
   //..........................................................
   // @method
   o.construct         = MO.FResourceConsole_construct;
   // @method
   o.registerType      = MO.FResourceConsole_registerType;
   o.factory           = MO.FResourceConsole_factory;
   o.load              = MO.FResourceConsole_load;
   o.loadPackage       = MO.FResourceConsole_loadPackage;
   o.loadPackageByUrl  = MO.FResourceConsole_loadPackageByUrl;
   // @method
   o.dispose           = MO.FResourceConsole_dispose;
   return o;
}

//==========================================================
// <T>加载事件完成后，响应的处理。</T>
//
// @method
// @param resource:FResource 资源
// @param data:ArrayBuffer 数据
//==========================================================
MO.FResourceConsole_onComplete = function FResourceConsole_onComplete(resource, data){
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
MO.FResourceConsole_onLoad = function FResourceConsole_onLoad(connection){
   var o = this;
   // 设置资源
   var data = connection.outputData();
   var resource = connection._resource;
   // 加载数据
   var storage = MO.Class.create(MO.FResourceSingleStorage);
   storage.setResource(resource);
   storage.load(data);
   // 加载资源存储块集合
   MO.Console.find(MO.FResourceDataConsole).load(storage);
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
MO.FResourceConsole_onBlockLoad = function FResourceConsole_onBlockLoad(connection){
   var o = this;
   var data = connection.outputData();
   // 获得资源
   var resource = connection._resource;
   resource._compressLength = data.byteLength;
   resource._compressStartTick = RTimer.current();
   // 加载数据
   var storage = MO.Class.create(MO.FResourceBlockStorage);
   storage.setResource(resource);
   storage.load(data);
   // 加载资源存储块集合
   var dataConsole = MO.Console.find(MO.FResourceDataConsole);
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
MO.FResourceConsole_onProcess = function FResourceConsole_onProcess(){
   var o = this;
   var httpConsole = MO.Console.find(MO.FHttpConsole);
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
MO.FResourceConsole_construct = function FResourceConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 设置变量
   o._factory = MO.Class.create(MO.FClassFactory);
   o._types = new MO.TDictionary();
   o._packages = new MO.TDictionary();
   o._resources = new MO.TDictionary();
   o._loadResources  = new MO.TObjects();
   o._loadingResources = new MO.TObjects();
   o._processStorages = new MO.TLooper();
   // 创建线程
   var thread = o._thread = MO.Class.create(MO.FThread);
   thread.setInterval(o._interval);
   thread.addProcessListener(o, o.onProcess);
   MO.Console.find(MO.FThreadConsole).start(thread);
}

//==========================================================
// <T>注册资源类型。</T>
//
// @method
// @return FResourceType 资源类型
//==========================================================
MO.FResourceConsole_registerType = function FResourceConsole_registerType(type){
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
MO.FResourceConsole_factory = function FResourceConsole_factory(){
   return this._factory;
}

//==========================================================
// <T>加载资源对象。</T>
//
// @method
// @param resource:FResource 资源对象
//==========================================================
MO.FResourceConsole_load = function FResourceConsole_load(resource){
   var o = this;
   var guid = resource.guid();
   // 检查编号
   var resources = o._resources;
   if(resources.contains(guid)){
      throw new MO.TError(o, 'Resource is already loaded. (guid={1})', guid);
   }
   resources.set(guid, resource);
   // 放入队列
   o._loadResources.push(resource);
   // 设置标志
   resource._dataLoad = true;
}

//==========================================================
// <T>加载资源包。</T>
//
// @method
// @param resourcePackage:资源包 资源对象
//==========================================================
MO.FResourceConsole_loadPackage = function FResourceConsole_loadPackage(resourcePackage){
   var o = this;
}

//==========================================================
// <T>根据URL地址加载资源包。</T>
//
// @method
// @param uri:String 资源对象
//==========================================================
MO.FResourceConsole_loadPackageByUrl = function FResourceConsole_loadPackageByUrl(uri){
   var o = this;
   // 查找资源包
   var resourcePackages = o._packages;
   var resourcePackage = resourcePackages.get(uri);
   if(!resourcePackage){
      // 解析地址
      var url = MO.Console.find(MO.FEnvironmentConsole).parse(uri);
      // 创建资源包
      resourcePackage = MO.Class.create(MO.FResourcePackage);
      resourcePackage.loadUrl(url);
      resourcePackages.set(uri, resourcePackage);
   }
   return resourcePackage;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FResourceConsole_dispose = function FResourceConsole_dispose(){
   var o = this;
   // 设置变量
   o._factory = MO.Lang.Object.dispose(o._factory);
   o._types = MO.Lang.Object.dispose(o._types);
   o._packages = MO.Lang.Object.dispose(o._packages);
   o._resources = MO.Lang.Object.dispose(o._resources);
   o._loadResources  = MO.Lang.Object.dispose(o._loadResources);
   o._loadingResources = MO.Lang.Object.dispose(o._loadingResources);
   o._processStorages = MO.Lang.Object.dispose(o._processStorages);
   // 父处理
   o.__base.FConsole.dispose.call(o);
}
