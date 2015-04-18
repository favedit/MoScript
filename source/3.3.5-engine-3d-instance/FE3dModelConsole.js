//==========================================================
// <T>渲染模型控制台。</T>
//
// @console
// @author maocy
// @version 150106
//==========================================================
function FE3dModelConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._scopeCd    = EScope.Local;
   // @attribute
   o._loadModels = null;
   o._pools      = null;
   // @attribute
   o._thread     = null;
   o._interval   = 100;
   //..........................................................
   // @event
   o.onProcess   = FE3dModelConsole_onProcess;
   //..........................................................
   // @method
   o.construct   = FE3dModelConsole_construct;
   o.pools       = FE3dModelConsole_pools;
   o.alloc       = FE3dModelConsole_alloc;
   o.free        = FE3dModelConsole_free;
   return o;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
function FE3dModelConsole_onProcess(){
   var o = this;
   var looper = o._loadModels;
   looper.record();
   while(looper.next()){
      var model = looper.current();
      if(model.processLoad()){
         looper.removeCurrent();
      }
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3dModelConsole_construct(){
   var o = this;
   // 设置属性
   o._loadModels = new TLooper();
   o._pools = RClass.create(FObjectPools);
   // 创建线程
   var thread = o._thread = RClass.create(FThread);
   thread.setInterval(o._interval);
   thread.addProcessListener(o, o.onProcess);
   RConsole.find(FThreadConsole).start(thread);
}

//==========================================================
// <T>获得缓冲池。</T>
//
// @method
// @return FObjectPools 缓冲池
//==========================================================
function FE3dModelConsole_pools(){
   return this._pools;
}

//==========================================================
// <T>加载一个模型。</T>
//
// @method
// @param context:MGraphicObject 渲染环境
// @param guid:String 唯一编码
// @return FE3dModel 渲染模型
//==========================================================
function FE3dModelConsole_alloc(context, guid){
   var o = this;
   // 尝试从缓冲池中取出
   var model = o._pools.alloc(guid);
   if(model){
      return model;
   }
   // 加载渲染对象
   var renderable = RConsole.find(FE3rModelConsole).load(context, guid);
   // 加载模型
   var model = RClass.create(FE3dModel);
   model.linkGraphicContext(context);
   model._poolCode = guid;
   model._renderable = renderable;
   // 追加到加载队列
   o._loadModels.push(model);
   return model;
}

//==========================================================
// <T>释放一个模型。</T>
//
// @method
// @param model:FE3dModel 渲染模型
//==========================================================
function FE3dModelConsole_free(model){
   var o = this;
   // 放到缓冲池
   var code = model._poolCode;
   o._pools.free(code, model);
}
