//==========================================================
// <T>模板控制台。</T>
//
// @console
// @author maocy
// @version 150106
//==========================================================
function FTemplate3dConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._scopeCd       = EScope.Local;
   // @attribute
   o._loadTemplates = null;
   o._templates     = null;
   // @attribute
   o._thread        = null;
   o._interval      = 100;
   //..........................................................
   // @event
   o.onProcess      = FTemplate3dConsole_onProcess;
   //..........................................................
   // @method
   o.construct      = FTemplate3dConsole_construct;
   // @method
   o.templates      = FTemplate3dConsole_templates;
   // @method
   o.alloc          = FTemplate3dConsole_alloc;
   o.free           = FTemplate3dConsole_free;
   return o;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
function FTemplate3dConsole_onProcess(){
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
function FTemplate3dConsole_construct(){
   var o = this;
   // 设置属性
   o._loadTemplates = new TLooper();
   o._templates = new TDictionary();
   // 创建线程
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.lsnsProcess.register(o, o.onProcess);
   RConsole.find(FThreadConsole).start(t);
}

//==========================================================
// <T>获得渲染模型集合。</T>
//
// @method
// @return TDictionary 渲染模型集合
//==========================================================
function FTemplate3dConsole_templates(){
   return this._templates;
}

//==========================================================
// <T>收集一个渲染模板。</T>
//
// @method
// @param c:content:FRenderContent 渲染环境
// @param n:name:String 名称
// @return FTemplate3d 渲染模板
//==========================================================
function FTemplate3dConsole_alloc(c, n){
   var o = this;
   // 尝试从缓冲池中取出
   var ts = o._templates.get(n);
   if(ts){
      if(!ts.isEmpty()){
         return ts.pop();
      }
   }
   // 获得模板资源
   var rc = RConsole.find(FRs3TemplateConsole);
   var r = rc.load(n);
   // 创建模板
   var t = RClass.create(FTemplate3d);
   t._context = c;
   t._name = n;
   t._resourceGuid = n;
   t.setResource(r);
   // 加载处理
   o._loadTemplates.push(t);
   return t;
}

//==========================================================
// <T>释放一个渲染模板。</T>
//
// @method
// @param p:template:FTemplate3d 渲染模板
//==========================================================
function FTemplate3dConsole_free(p){
   var o = this;
   // 脱离父对象
   p.remove();
   // 放到缓冲池
   var n = p._resourceGuid;
   var ts = o._templates.get(n);
   if(ts == null){
      ts = new TObjects();
      o._templates.set(n, ts);
   }
   ts.push(p);
}
