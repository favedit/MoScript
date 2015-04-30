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
   o._looper     = null;
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
   // @method
   o.pools       = FE3dModelConsole_pools;
   // @method
   o.allocByGuid = FE3dModelConsole_allocByGuid;
   o.allocByCode = FE3dModelConsole_allocByCode;
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
   var looper = o._looper;
   looper.record();
   while(looper.next()){
      var item = looper.current();
      if(item.processLoad()){
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
   o._looper = new TLooper();
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
function FE3dModelConsole_allocByGuid(context, guid){
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
   model.setPoolCode(guid);
   model.setRenderable(renderable);
   // 追加到加载队列
   o._looper.push(model);
   return model;
}

//==========================================================
// <T>加载一个模型。</T>
//
// @method
// @param context:MGraphicObject 渲染环境
// @param guid:String 唯一编码
// @return FE3dModel 渲染模型
//==========================================================
function FE3dModelConsole_allocByCode(context, code){
   var o = this;
   // 尝试从缓冲池中取出
   var model = o._pools.alloc(code);
   if(model){
      return model;
   }
   // 加载渲染对象
   //var renderable = RConsole.find(FE3rModelConsole).load(context, guid);
   // 加载模型
   //var model = RClass.create(FE3dModel);
   //model.linkGraphicContext(context);
   //model.setPoolCode(code);
   //model.setRenderable(renderable);
   // 追加到加载队列
   //o._looper.push(model);
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
   var code = model.poolCode();
   o._pools.free(code, model);
}
