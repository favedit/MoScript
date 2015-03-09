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
   o._scopeCd       = EScope.Local;
   // @attribute
   o._loadTemplates = null;
   o._templates     = null;
   // @attribute
   o._thread        = null;
   o._interval      = 200;
   //..........................................................
   // @event
   o.onProcess      = FE3dTemplateConsole_onProcess;
   //..........................................................
   // @method
   o.construct      = FE3dTemplateConsole_construct;
   // @method
   o.allocByGuid    = FE3dTemplateConsole_allocByGuid;
   o.allocByCode    = FE3dTemplateConsole_allocByCode;
   o.loadByGuid     = FE3dTemplateConsole_loadByGuid;
   o.loadByCode     = FE3dTemplateConsole_loadByCode;
   o.free           = FE3dTemplateConsole_free;
   return o;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
function FE3dTemplateConsole_onProcess(){
   var o = this;
   var s = o._loadTemplates;
   s.record();
   while(s.next()){
      var t = s.current();
      if(t.processLoad()){
         s.removeCurrent();
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
   o._loadTemplates = new TLooper();
   o._templates = new TDictionary();
   // 创建线程
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.addProcessListener(o, o.onProcess);
   RConsole.find(FThreadConsole).start(t);
}

//==========================================================
// <T>收集一个渲染模板。</T>
//
// @method
// @param c:content:FRenderContent 渲染环境
// @param n:name:String 名称
// @return FE3dTemplate 渲染模板
//==========================================================
function FE3dTemplateConsole_allocByGuid(c, n){
   var o = this;
   // 尝试从缓冲池中取出
   var ts = o._templates.get(n);
   if(ts){
      if(!ts.isEmpty()){
         return ts.pop();
      }
   }
   // 获得模板资源
   var rc = RConsole.find(FE3sTemplateConsole);
   var r = rc.loadByGuid(n);
   // 创建模板
   var t = RClass.create(FE3dTemplate);
   t.linkGraphicContext(c);
   t.setName(n);
   t._resourceGuid = n;
   t.setResource(r);
   // 加载处理
   o._loadTemplates.push(t);
   return t;
}

//==========================================================
// <T>收集一个渲染模板。</T>
//
// @method
// @param c:content:FRenderContent 渲染环境
// @param n:name:String 名称
// @return FE3dTemplate 渲染模板
//==========================================================
function FE3dTemplateConsole_allocByCode(c, n){
   var o = this;
   // 尝试从缓冲池中取出
   var ts = o._templates.get(n);
   if(ts){
      if(!ts.isEmpty()){
         return ts.pop();
      }
   }
   // 获得模板资源
   var rc = RConsole.find(FE3sTemplateConsole);
   var r = rc.loadByCode(n);
   // 创建模板
   var t = RClass.create(FE3dTemplate);
   t.linkGraphicContext(c);
   t.setName(n);
   t._resourceGuid = n;
   t.setResource(r);
   // 加载处理
   o._loadTemplates.push(t);
   return t;
}

//==========================================================
// <T>加载一个渲染模板。</T>
//
// @method
// @param t:template:FTemplate3d 渲染模板
// @param g:guid:String 唯一编码
// @param c:code:String 代码
//==========================================================
function FE3dTemplateConsole_loadByGuid(t, p){
   var o = this;
   // 获得模板资源
   var rc = RConsole.find(FE3sTemplateConsole);
   var r = rc.loadByGuid(p);
   // 创建模板
   t._resourceGuid = p;
   t.setName(p);
   t.setResource(r);
   // 加载处理
   o._loadTemplates.push(t);
   return t;
}

//==========================================================
// <T>加载一个渲染模板。</T>
//
// @method
// @param t:template:FTemplate3d 渲染模板
// @param g:guid:String 唯一编码
// @param c:code:String 代码
//==========================================================
function FE3dTemplateConsole_loadByCode(t, p){
   var o = this;
   // 获得模板资源
   var rc = RConsole.find(FE3sTemplateConsole);
   var r = rc.loadByCode(g, p);
   // 创建模板
   t._resourceGuid = g;
   t.setName(c);
   t.setResource(r);
   // 加载处理
   o._loadTemplates.push(t);
   return t;
}

//==========================================================
// <T>释放一个渲染模板。</T>
//
// @method
// @param p:template:FE3dTemplate 渲染模板
//==========================================================
function FE3dTemplateConsole_free(p){
   var o = this;
   // 脱离父对象
   p.remove();
   // 放到缓冲池
   var n = p._resourceGuid;
   var s = o._templates.get(n);
   if(!s){
      s = new TObjects();
      o._templates.set(n, s);
   }
   s.push(p);
}
