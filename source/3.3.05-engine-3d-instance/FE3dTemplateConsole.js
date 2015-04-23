//==========================================================
// <T>模板控制台。</T>
//
// @console
// @author maocy
// @version 150106
//==========================================================
function FE3dTemplateConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._scopeCd    = EScope.Local;
   // @attribute
   o._loadQueue  = null;
   o._pools      = null;
   // @attribute
   o._thread     = null;
   o._interval   = 200;
   //..........................................................
   // @event
   o.onProcess   = FE3dTemplateConsole_onProcess;
   //..........................................................
   // @method
   o.construct   = FE3dTemplateConsole_construct;
   // @method
   o.allocByGuid = FE3dTemplateConsole_allocByGuid;
   o.allocByCode = FE3dTemplateConsole_allocByCode;
   o.free        = FE3dTemplateConsole_free;
   return o;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
function FE3dTemplateConsole_onProcess(){
   var o = this;
   var looper = o._loadQueue;
   looper.record();
   while(looper.next()){
      var template = looper.current();
      if(template.processLoad()){
         looper.removeCurrent();
      }
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3dTemplateConsole_construct(){
   var o = this;
   // 设置属性
   o._loadQueue = new TLooper();
   o._pools = RClass.create(FObjectPools);
   // 创建线程
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.addProcessListener(o, o.onProcess);
   RConsole.find(FThreadConsole).start(t);
}

//==========================================================
// <T>根据唯一编号收集一个渲染模板。</T>
//
// @method
// @param context:FGraphicContext 渲染环境
// @param guid:String 唯一编号
// @return FE3dTemplate 渲染模板
//==========================================================
function FE3dTemplateConsole_allocByGuid(context, guid){
   var o = this;
   // 尝试从缓冲池中取出
   var template = o._pools.alloc(guid);
   if(template){
      return template;
   }
   // 获得模板资源
   var resource = RConsole.find(FE3sTemplateConsole).loadByGuid(guid);
   // 创建模板
   template = RClass.create(FE3dTemplate);
   template.linkGraphicContext(context);
   template.setResource(resource);
   template._poolCode = guid;
   // 加载处理
   o._loadQueue.push(template);
   return template;
}

//==========================================================
// <T>根据代码收集一个渲染模板。</T>
//
// @method
// @param context:FGraphicContext 渲染环境
// @param code:String 唯一编号
// @return FE3dTemplate 渲染模板
//==========================================================
function FE3dTemplateConsole_allocByCode(context, code){
   var o = this;
   // 尝试从缓冲池中取出
   var template = o._pools.alloc(code);
   if(template){
      return template;
   }
   // 获得模板资源
   var resource = RConsole.find(FE3sTemplateConsole).loadByCode(code);
   // 创建模板
   template = RClass.create(FE3dTemplate);
   template.linkGraphicContext(context);
   template.setResource(resource);
   template._poolCode = code;
   // 加载处理
   o._loadQueue.push(template);
   return template;
}

//==========================================================
// <T>释放一个渲染模板。</T>
//
// @method
// @param template:FE3dTemplate 渲染模板
//==========================================================
function FE3dTemplateConsole_free(template){
   var o = this;
   // 放到缓冲池
   var code = template._poolCode;
   o._pools.free(code, template);
}
