//==========================================================
// <T>模板控制台。</T>
//
// @console
// @author maocy
// @version 150106
//==========================================================
MO.FE3dTemplateConsole = function FE3dTemplateConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._scopeCd    = MO.EScope.Local;
   // @attribute
   o._loadQueue  = null;
   o._pools      = null;
   // @attribute
   o._thread     = null;
   o._interval   = 200;
   //..........................................................
   // @event
   o.onProcess   = MO.FE3dTemplateConsole_onProcess;
   //..........................................................
   // @method
   o.construct   = MO.FE3dTemplateConsole_construct;
   // @method
   o.allocByGuid = MO.FE3dTemplateConsole_allocByGuid;
   o.allocByCode = MO.FE3dTemplateConsole_allocByCode;
   o.free        = MO.FE3dTemplateConsole_free;
   return o;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FE3dTemplateConsole_onProcess = function FE3dTemplateConsole_onProcess(){
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
MO.FE3dTemplateConsole_construct = function FE3dTemplateConsole_construct(){
   var o = this;
   // 设置属性
   o._loadQueue = new MO.TLooper();
   o._pools = MO.Class.create(MO.FObjectPools);
   // 创建线程
   var t = o._thread = MO.Class.create(MO.FThread);
   t.setInterval(o._interval);
   t.addProcessListener(o, o.onProcess);
   MO.Console.find(MO.FThreadConsole).start(t);
}

//==========================================================
// <T>根据唯一编号收集一个渲染模板。</T>
//
// @method
// @param context:FGraphicContext 渲染环境
// @param guid:String 唯一编号
// @return FE3dTemplate 渲染模板
//==========================================================
MO.FE3dTemplateConsole_allocByGuid = function FE3dTemplateConsole_allocByGuid(context, guid){
   var o = this;
   // 尝试从缓冲池中取出
   var template = o._pools.alloc(guid);
   if(template){
      return template;
   }
   // 获得模板资源
   var resource = MO.Console.find(MO.FE3sTemplateConsole).loadByGuid(guid);
   // 创建模板
   template = MO.Class.create(MO.FE3dTemplate);
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
MO.FE3dTemplateConsole_allocByCode = function FE3dTemplateConsole_allocByCode(context, code){
   var o = this;
   // 尝试从缓冲池中取出
   var template = o._pools.alloc(code);
   if(template){
      return template;
   }
   // 获得模板资源
   var resource = MO.Console.find(MO.FE3sTemplateConsole).loadByCode(code);
   // 创建模板
   template = MO.Class.create(MO.FE3dTemplate);
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
MO.FE3dTemplateConsole_free = function FE3dTemplateConsole_free(template){
   var o = this;
   // 放到缓冲池
   var code = template._poolCode;
   o._pools.free(code, template);
}
