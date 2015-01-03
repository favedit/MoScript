//==========================================================
// <T>单个页面中的表单管理类。主要负责从表单的XML节点构建表单对象。</T>
//
// @console
// @history 091120 MAOCY 创建
//==========================================================
function FFormConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o.scope            = EScope.Page;
   // @attribute TMap<String, MForm> 按照名称保存表单的集合
   o.forms            = null;
   o.freeForms        = null;
   o.formsLoaded      = null;
   // @attribute TMap<String, MForm> 按照标识保存表单的集合
   o.formIds          = null;
   // @listener
   o.lsnsLoaded       = null;
   o.events           = null;
   //..........................................................
   // @event
   o.onProcessLoaded  = FFormConsole_onProcessLoaded;
   //..........................................................
   // @method
   o.construct        = FFormConsole_construct;
   o.createFromName   = FFormConsole_createFromName;
   o.get              = FFormConsole_get;
   o.find             = FFormConsole_find;
   o.hiddenAll        = FFormConsole_hiddenAll;
   o.process          = FFormConsole_process;
   o.loadEvents       = FFormConsole_loadEvents;
   o.processEvent     = FFormConsole_processEvent;
   o.free             = FFormConsole_free;
   o.dispose          = FFormConsole_dispose;
   return o;
}

//==========================================================
// <T>构造函数。</T>
//
// @method
//==========================================================
function FFormConsole_construct(){
   var o = this;
   o.forms = new TMap();
   o.formIds = new TMap();
   o.formsLoaded = new TMap();
   o.lsnsLoaded = new TListeners();
   o.freeForms = new TList();
   o.events = new TMap();
}

//==========================================================
// <T>构建指定表单名称的控件对象，并放置在指定HTML页面ID的位置。</T>
//
// @method
// @param n:name:String 表单名称
// @param h:html:HTML 页面元素的放置位置
// @param b:Builder:Builder 构建器
// @param t:type:String 表单类型
// @return MForm 表单实例
//==========================================================
function FFormConsole_createFromName(n, h, b, t){
   var o = this;
   // 检查是否有未使用的表单
   var fs = o.freeForms;
   if(!fs.isEmpty()){
      var c = fs.count;
      for(var i=0; i<c; i++){
         if(fs.get(i).name == n){
            var f = fs.remove(i);
            f.setPanel(h);
            return f;
         }
      }
   }
   // 获得表单定义
   var fdc = RConsole.find(FFormDefineConsole);
   var fx = fdc.find(n, t);
   var fd = t + ':' + n;
   if(!o.formsLoaded.contains(fd)){
      var es = fdc.getEvents(n);
      if(es){
         o.loadEvents(es);
      }
      o.formsLoaded.set(fd, true);
   }
   // 创建表单实例
   var c = RClass.create('F' + fx.name);
   RControl.innerCreate(c, fx);
   c.psInitialize();
   if(!b){
      b = RWindow.builder();
   }
   c.psBuild(h, b);
   c.dsInitialize();
   c.setVisible(false);
   // 存储表单实例
   c.formId = fdc.nextFormId();
   o.formIds.set(c.formId, c);
   o.forms.set(n, c);
   return c;
}

//==========================================================
// <T>获取指定表单名称的控件。</T>
//
// @method
// @param id:id:Integer 表单id
// @return FWebForm 表单控件结构
//==========================================================
function FFormConsole_get(id){
   return o.formIds.get(id); 
}

//==========================================================
// <T>根据名称查找表单实例，如果不存在则创建一个。</T>
//
// @method
// @param n:name:String 表单名称
// @param h:html:HTML 页面元素的放置位置
// @param b:Builder:Builder 构建器
// @return MForm 表单实例
//==========================================================
function FFormConsole_find(n, h, b){
   var o = this;
   var f = o.forms.get(n);
   if(!f){
      f = o.createFromName(n, h, b);
   }
   return f;
}

//==========================================================
function FFormConsole_hiddenAll(){
   var o = this;
   var fs = o.forms;
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
function FFormConsole_onProcessLoaded(e){
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
function FFormConsole_process(g){
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
function FFormConsole_loadEvents(cfg){
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
function FFormConsole_processEvent(e){
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
function FFormConsole_free(f){
   f.setVisible(false);
   this.freeForms.push(f);
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
function FFormConsole_dispose(){
   var o = this;
   RMemory.free(o.forms);
   RMemory.free(o.formIds);
   RMemory.free(o.formsLoaded);
   o.forms = null;
   o.formIds = null;
   o.formsLoaded = null;
}
