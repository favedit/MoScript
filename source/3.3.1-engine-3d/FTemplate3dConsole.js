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
   o.templates      = FTemplate3dConsole_templates;
   o.alloc          = FTemplate3dConsole_alloc;
   o.load           = FTemplate3dConsole_load;
   return o;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
function FTemplate3dConsole_onProcess(){
   var o = this;
   var ms = o._loadTemplates;
   ms.record();
   while(ms.next()){
      var m = ms.current();
      if(m.processLoad()){
         ms.removeCurrent();
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
// <T>加载一个模型。</T>
//
// @method
// @param pc:content:FRenderContent 名称
// @param pn:name:String 名称
// @return FRenderModel 渲染模型
//==========================================================
function FTemplate3dConsole_alloc(pc, pn){
   var o = this;
   // 获得模板资源
   var rtc = RConsole.find(FRs3TemplateConsole);
   var rt = rtc.load(pn);
   // 创建模板
   var t = RClass.create(FTemplate3d);
   t._context = pc;
   t._name = pn;
   t.setResource(rt);
   // 加载处理
   o._loadTemplates.push(t);
   return t;
}

//==========================================================
// <T>加载一个模型。</T>
//
// @method
// @param pt:template:FTemplate3d 渲染模板
// @param pn:name:String 名称
// @return FRenderModel 渲染模型
//==========================================================
function FTemplate3dConsole_load(pt, pn){
   var o = this;
   // 获得模板资源
   var rtc = RConsole.find(FRs3TemplateConsole);
   var rt = rtc.load(pn);
   // 创建模板
   pt._name = pn;
   pt.setResource(rt);
   // 加载处理
   o._loadTemplates.push(pt);
}
