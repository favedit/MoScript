//==========================================================
// <T>单个页面中的表单管理类。主要负责从表单的XML节点构建表单对象。</T>
//
// @console
// @history 091120 MAOCY 创建
//==========================================================
function FUiFrameConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._scopeCd         = EScope.Local;
   // @attribute TMap<String, MForm> 按照名称保存表单的集合
   o._frames          = null;
   //o._freeFrames      = null;
   //o._framesLoaded    = null;
   // @attribute TMap<String, MForm> 按照标识保存表单的集合
   //o._formIds          = null;
   // @listener
   //o.lsnsLoaded       = null;
   //o.events           = null;
   //..........................................................
   // @event
   //o.onProcessLoaded  = FUiFrameConsole_onProcessLoaded;
   //..........................................................
   // @method
   o.construct        = FUiFrameConsole_construct;
   // @method
   o.create           = FUiFrameConsole_create;
   o.find             = FUiFrameConsole_find;
   o.findByClass      = FUiFrameConsole_findByClass;
   o.get              = FUiFrameConsole_get;
   //o.hiddenAll        = FUiFrameConsole_hiddenAll;
   //o.process          = FUiFrameConsole_process;
   //o.loadEvents       = FUiFrameConsole_loadEvents;
   //o.processEvent     = FUiFrameConsole_processEvent;
   //o.free             = FUiFrameConsole_free;
   //o.dispose          = FUiFrameConsole_dispose;
   return o;
}

//==========================================================
// <T>构造函数。</T>
//
// @method
//==========================================================
function FUiFrameConsole_construct(){
   var o = this;
   o._frames = new TMap();
   //o._formIds = new TMap();
   //o._framesLoaded = new TMap();
   //o.lsnsLoaded = new TListeners();
   //o._freeFrames = new TList();
   //o.events = new TMap();
}

//==========================================================
// <T>构建指定表单名称的控件对象，并放置在指定HTML页面ID的位置。</T>
//
// @method
// @param c:control:FUiControl 控件
// @param n:name:String 名称
// @return FUiFrame 页面控件
//==========================================================
function FUiFrameConsole_create(c, n){
   var o = this;
   // 检查是否有未使用的表单
   //var fs = o._freeFrames;
   //if(!fs.isEmpty()){
   //   var c = fs.count();
   //   for(var i = 0; i < c; i++){
   //      var f = fs.get(i);
   //      if(f.name() == n){
   //         var f = fs.remove(i);
   //         f.setPanel(h);
   //         return f;
   //      }
   //   }
   //}
   // 获得表单定义
   var dc = RConsole.find(FUiDescribeFrameConsole);
   var x = dc.load(n);
   // 构建处理
   var f = RUiControl.build(null, x, null, c._hPanel);
   //var fx = fdc.find(n, t);
   //var fd = t + ':' + n;
   //if(!o._framesLoaded.contains(fd)){
   //   var es = fdc.getEvents(n);
   //   if(es){
   //      o.loadEvents(es);
   //   }
   //   o._framesLoaded.set(fd, true);
   //}
   // 创建表单实例
   //var c = RClass.create('F' + fx.name);
   //RUiControl.innerCreate(c, fx);
   //c.psInitialize();
   //if(!b){
   //   b = RWindow.builder();
   //}
   //c.psBuild(h, b);
   //c.dsInitialize();
   //c.setVisible(false);
   // 存储表单实例
   //c.formId = fdc.nextFormId();
   //o._formIds.set(c.formId, c);
   //o._frames.set(n, c);
   return f;
}

//==========================================================
// <T>根据名称查找表单实例，如果不存在则返回空。</T>
//
// @method
// @param n:name:String 名称
// @return FUiFrame 页面控件
//==========================================================
function FUiFrameConsole_find(n){
   return this._frames.get(n); 
}

//==========================================================
// <T>根据类名查找表单实例，如果不存在则使用类创建实例。</T>
//
// @method
// @param control:FUiControl 控件对象
// @param clazz:Function 类对象
// @return FUiControl 页面控件
//==========================================================
function FUiFrameConsole_findByClass(control, clazz){
   var o = this;
   var className = RClass.name(clazz);
   var frames = o._frames;
   var instance = frames.get(className); 
   if(!instance){
      instance = RClass.create(clazz);
      instance.buildDefine(control._hPanel);
      frames.set(className, instance);
   }
   return instance;
}

//==========================================================
// <T>根据名称查找表单实例，如果不存在则创建一个。</T>
//
// @method
// @param c:control:FUiControl 控件
// @param n:name:String 名称
// @param h:html:HtmlTag 页面元素
// @return FUiFrame 页面控件
//==========================================================
function FUiFrameConsole_get(c, n, h){
   var o = this;
   var fs = o._frames;
   var f = fs.get(n);
   if(!f){
      f = o.create(c, n);
      if(h){
         f.setPanel(h);
      }
      fs.set(n, f);
   }
   return f;
}

//==========================================================
function FUiFrameConsole_hiddenAll(){
   var o = this;
   var fs = o._frames;
   var fc = fs.count;
   for(var n=0; n<fc; n++){
      fs.value(n).setVisible(false);
   }
}

//==========================================================
// <T>。</T>
//
// @method
// @param n:name:String 表单名称
// @param h:html:HTML 页面元素的放置位置
// @param b:Builder:Builder 构建器
// @return MForm 表单实例
//==========================================================
function FUiFrameConsole_onProcessLoaded(e){
   var o = this;
   var r = e.document.root();
   var g = e.argument;
   // 只有在未检查过消息时才调用检查消息
   if(!e.messageChecked){
      // 检查数据结果
      var m = new TMessageArg();
      m.argument = g;
      m.form = g.form;
      m.config = r;
      m.invokeCaller = new TInvoke(o, o.onLoaded);
      m.invokeParam = e;
      m.event = e;
      if(!RConsole.find(FMessageConsole).checkResult(m)){
         return;
      }
   }
   // 查找返回数据内容
   var g = e.argument;
   var fn = r.find('Form');
   if(fn){
      var ds = RDataset.make(fn);
      g.resultDataset = ds;
      g.resultRow = ds.rows.get(0);
   }
   // 相应后续代码操作
   g.invoke();
   //top.RWindow.setEnable(true);
}

//==========================================================
// <T>。</T>
//
// @method
// @param n:name:String 表单名称
// @param h:html:HTML 页面元素的放置位置
// @param b:Builder:Builder 构建器
// @return MForm 表单实例
//==========================================================
function FUiFrameConsole_process(g){
   var o = this;
   // 构建XML结构对象
   var doc = new TXmlDocument();
   var root = doc.root();
   root.set('action', 'process');
   if(g.checked){
      root.set('checked', g.checked);
   }
   root.push(g.toNode());
   // 获取返回节点
   var e = new TEvent(o, EXmlEvent.Send, o.onProcessLoaded);
   e.url = RService.url(RString.nvl(g.url, 'logic.webform'));
   e.action = EDataAction.Process;
   e.argument = g;
   e.document = doc;
   RConsole.find(FXmlConsole).process(e);
}

//==========================================================
// <T>加载事件定义。</T>
//
// @method
// @param x:config:TNode 事件定义
//==========================================================
function FUiFrameConsole_loadEvents(cfg){
   return;
   var o = this;
   if(!(cfg && cfg.nodes)){
      return;
   }
   var ns = cfg.nodes;
   var l = ns.count;
   for(var n = 0; n < l; n++){
      var x = ns.get(n);
      if(x.isName('Event')){
         var c = RClass.create(FEvent);
         c.loadConfig(x);
         if(RString.isEmpty(c.name) || RString.isEmpty(c.source) || RString.isEmpty(c.form)){
            RMessage.fatel(o, null, "Event property is invalid. (event={0})", x.xml());
         }
         // onchange@editLength@design.webform.EditForm
         var s = c.name + '@' + c.source + '@' + c.form;
         o.events.set(s, c);
      }
   }
}

//==========================================================
// <T>处理表单事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FUiFrameConsole_processEvent(e){
   var o = this;
   var es = o.events;
   if(es.isEmpty()){
      return;
   }
   var se = e.source;
   if(RClass.isClass(se, FControl)){
      var p = se.topControl();
      if(p){
         var s = RString.nvl(e.name, e.handle) + '@' + se.name + '@' + p.name;
         var c = es.get(s);
         var eo = e.caller ? e.caller : se;
         if(c && c.code){
            if(c.event){
               c.event.call(eo, eo, e);
            }else{
               c.event = new Function('o', 'e', c.code);
               //try{
                  c.event.call(eo, eo, e);
               //}catch(te){
                  //return alert(te.message + '\n------------------------------------------------------------\n' + c.code)
               //}
            }
         }
      }
   }
}

//==========================================================
// <T>释放指定的表单对象。</T>
// <P>设置表单对象为不可见，等待再次利用。</P>
//
// @method
// @param f:form:FControl 表单对象
//==========================================================
function FUiFrameConsole_free(f){
   f.setVisible(false);
   this._freeFrames.push(f);
}

//==========================================================
// <T>。</T>
//
// @method
// @param n:name:String 表单名称
// @param h:html:HTML 页面元素的放置位置
// @param b:Builder:Builder 构建器
// @return MForm 表单实例
//==========================================================
function FUiFrameConsole_dispose(){
   var o = this;
   RMemory.free(o._frames);
   RMemory.free(o._formIds);
   RMemory.free(o._framesLoaded);
   o._frames = null;
   o._formIds = null;
   o._framesLoaded = null;
}
