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
   o._processResources    = null;
   o._processingResources = null;
   o._pipeline            = null;
   o._pipelinePool        = null;
   // @attribute
   o._thread              = null;
   o._loadLimit           = 12;
   o._processLimit        = 4;
   o._interval            = 100;
   //..........................................................
   // @event
   o.onComplete           = FResourceConsole_onComplete;
   o.onPipelineComplete   = FResourceConsole_onPipelineComplete;
   o.onLoad               = FResourceConsole_onLoad;
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
// @param p:connection:FHttpConnection 链接
//==========================================================
function FResourceConsole_onComplete(r, d){
   var o = this;
   r._data = null;
   o._loadingResources.remove(r);
   r.onComplete(d);
}

//==========================================================
// <T>加载事件完成后，响应的处理。</T>
//
// @method
// @param p:connection:FHttpConnection 链接
//==========================================================
function FResourceConsole_onPipelineComplete(p, r, d){
   var o = this;
   o.freePipeline(p);
   o._processingResources.remove(r);
   o.onComplete(r, d);
}

//==========================================================
// <T>加载事件完成后，响应的处理。</T>
//
// @method
// @param p:connection:FHttpConnection 链接
//==========================================================
function FResourceConsole_onLoad(p){
   var o = this;
   // 设置资源
   var d = p.outputData();
   var r = p._resource;
   r._data = new Uint8Array(d);
   // 移除加载中
   o._loadingResources.remove(r);
   // 放入处理中
   o._processResources.push(r);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
function FResourceConsole_onProcess(){
   var o = this;
   var hc = RConsole.find(FHttpConsole);
   //..........................................................
   // 获取数据
   var rs = o._loadResources;
   var ps = o._loadingResources;
   var pc = ps.count();
   if(!rs.isEmpty()){
      for(var i = o._loadLimit - pc; i > 0; i--){
         var r = rs.shift();
         var ru = r.sourceUrl();
         // 加载处理
         var c = hc.send(ru);
         c._resource = r;
         if(r._dataCompress){
            c.lsnsLoad.register(o, o.onLoad);
         }else{
            c.lsnsLoad.register(o, o.onComplete);
         }
         r._dataLoad = true;
         // 增加加载中集合
         ps.push(r);
         // 跳出循环
         if(rs.isEmpty()){
            break;
         }
      }
   }
   //..........................................................
   // 设置是否支持进程方式
   //o._optionProcess = RBrowser.capability().optionProcess;
   // 处理数据
   var rs = o._processResources;
   var ps = o._processingResources;
   var pc = ps.count();
   if(!rs.isEmpty()){
      var p = o._pipeline;
      if(p){
         // 单线程处理
         if(ps.isEmpty()){
            var r = rs.shift();
            p.decompressSingle(r);
            ps.push(r);
         }
      }else{
         // 多线程处理
         for(var i = o._processLimit - pc; i > 0; i--){
            var r = rs.shift();
            var l = o.allocPipeline();
            l.decompress(r);
            // 增加处理中集合
            ps.push(r);
            // 跳出循环
            if(rs.isEmpty()){
               break;
            }
         }
      }
   }
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
   var s = o._pipelinePool;
   if(!s.hasFree()){
      var p = RClass.create(FResourceLzmaPipeline);
      p.setConsole(o);
      s.push(p);
   }
   return s.alloc();
}

//==========================================================
// <T>释放资源处理管道。</T>
//
// @method
// @param p:pipeline:FResourcePipeline 处理管道
//==========================================================
function FResourceConsole_freePipeline(p){
   this._pipelinePool.free(p);
}

//==========================================================
// <T>加载资源对象。</T>
//
// @method
// @param p:resource:FResource 资源对象
//==========================================================
function FResourceConsole_load(p){
   var o = this;
   var g = p.guid();
   // 检查编号
   var s = o._resources;
   var r = s.get(g);
   if(r){
      throw new TError(o, 'Resource is already loaded. (guid={1})', g);
   }
   s.set(g, p);
   // 放入队列
   o._loadResources.push(p);
   // 设置标志
   p._dataLoad = true;
}
