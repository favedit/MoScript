function FDescribeFrameConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd       = EScope.Global;
   o._service       = 'cloud.describe.frame';
   o._defines       = null;
   o.lsnsLoaded     = null;
   o.construct      = FDescribeFrameConsole_construct;
   o.load           = FDescribeFrameConsole_load;
   o.events         = null;
   o.formId         = 0;
   o.createFromName = FDescribeFrameConsole_createFromName;
   o.loadNode       = FDescribeFrameConsole_loadNode;
   o.loadService    = FDescribeFrameConsole_loadService;
   o.nextFormId     = FDescribeFrameConsole_nextFormId;
   o.get            = FDescribeFrameConsole_get;
   o.find           = FDescribeFrameConsole_find;
   o.getLov         = FDescribeFrameConsole_getLov;
   o.findLov        = FDescribeFrameConsole_findLov;
   o.getEvents      = FDescribeFrameConsole_getEvents;
   return o;
}
function FDescribeFrameConsole_construct(){
   var o = this;
   o._defines = new TDictionary();
   o.lsnsLoaded = new TListeners();
}
function FDescribeFrameConsole_load(n){
   var o = this;
   var x = o._defines.get(n);
   if(x){
      return x;
   }
   var xd = new TXmlDocument();
   var x = xd.root();
   x.set('action', 'query');
   var xf = x.create('Frame');
   xf.set('name', n);
   var xc = RConsole.find(FXmlConsole);
   var xr = xc.send(RService.url(o._service), xd);
   var rs = xr.nodes();
   var rc = rs.count();
   for(var i = 0; i < rc; i++){
      var rx = rs.get(i);
      o._defines.set(rx.get('name'), rx);
   }
   var x = o._defines.get(n);
   if(x == null){
      throw new TError(o, 'Unknown frame. (name={1])', n);
   }
   return x;
}
function FDescribeFrameConsole_createFromName(name, type){
   var o = this;
   var doc = o.loadService(name, type);
   o.loadNode(doc);
   if(EForm.Lov == type){
      return o.getLov(name);
   }else{
      return o.get(name);
   }
}
function FDescribeFrameConsole_loadNode(x){
   var o = this;
   var nns = x.root();
   if(nns.hasNode()){
      var nodes = nns.nodes;
      var ct = nodes.count;
      for(var n = 0; n < ct; n++){
         var node = nodes.get(n);
         var fn = node.get('name');
         var tp = node.get('type');
         if(node.hasNode()){
            var nfds = node.nodes;
            for(var k = 0; k < nfds.count; k++){
               var dd = nfds.get(k);
               if(dd.isName('Define')){
                  if(dd.hasNode()){
                     var fds = dd.nodes;
                     for(var m = 0; m < fds.count; m++){
                        var nd = fds.get(m);
                        var mp = o._defines.get(tp);
                        mp.set(fn, nd);
                     }
                  }
               }else if(dd.isName('Events')){
                  o.events.set(fn, dd);
               }
            }
         }
      }
   }
}
function FDescribeFrameConsole_loadService(n, t){
   var o = this;
   if(!t){
      t = EForm.Form;
   }
   var doc = new TXmlDocument();
   var root = doc.root();
   root.set('action', 'loadDefine');
   var f = root.create('WebForm');
   f.set('name', n);
   f.set('type', t);
   var url = RService.url('logic.webform');
   var doc = RConsole.find(FXmlConsole).send(url, doc);
   var r = doc.root();
   if(!RConsole.find(FMessageConsole).checkResult(new TMessageArg(r))){
      return null;
   }
   return doc;
}
function FDescribeFrameConsole_nextFormId(){
   return ++this.formId;
}
function FDescribeFrameConsole_get(n){
   return this._defines.get(EForm.Form).get(n);
}
function FDescribeFrameConsole_find(n, t){
   var o = this;
   if(EForm.Lov == t){
      return o.findLov(n);
   }
   var fc = o.get(n);
   if(RClass.isMode(ERun.Debug)){
      RMemory.free(fc);
      fc = null;
      o._defines.get(EForm.Form).set(n, null);
   }
   if(!fc){
      fc = o.createFromName(n);
   }
   return fc;
}
function FDescribeFrameConsole_getLov(n){
   return this._defines.get(EForm.Lov).get(n);
}
function FDescribeFrameConsole_findLov(n){
   var o = this;
   var fc = o.getLov(n);
   if(!fc){
      fc = o.createFromName(n, EForm.Lov);
   }
   return fc;
}
function FDescribeFrameConsole_getEvents(n){
   return this.events.get(n);
}
function FEditorConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd     = EScope.Local;
   o._hoverEditor = null;
   o._focusEditor = null;
   o._editors     = null;
   o.construct    = FEditorConsole_construct;
   o.makeName     = FEditorConsole_makeName;
   o.enter        = FEditorConsole_enter;
   o.leave        = FEditorConsole_leave;
   o.focus        = FEditorConsole_focus;
   o.blur         = FEditorConsole_blur;
   o.lost         = FEditorConsole_lost;
   return o;
}
function FEditorConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._editors = new TDictionary();
}
function FEditorConsole_makeName(cls, name){
   return name ? name + '@' + RClass.name(cls) : RClass.name(cls);
}
function FEditorConsole_enter(editable, cls){
   var name = RClass.name(cls);
   var editor = this._hoverEditors.get(name);
   if(!editor){
      editor = RClass.create(cls);
      editor.psBuild();
      this._hoverEditors.set(name, editor);
   }
   this._hoverEditor = editor;
   editor.editable = editable;
   editor.show();
   return editor;
}
function FEditorConsole_leave(editor){
   var o = this;
   if(o._hoverEditor != o._focusEditor){
      editor = RObject.nvl(editor, o._hoverEditor);
      o._hoverEditor = null;
      RLog.debug(o, 'Leave {0}', RClass.dump(editor));
   }
}
function FEditorConsole_focus(c, n, l){
   var o = this;
   var name = o.makeName(n, l);
   var e = o._editors.get(l);
   if(!e){
      e = RClass.create(n);
      e.build(c._hPanel);
      o._editors.set(l, e);
   }
   RLogger.debug(o, 'Focus editor {1} (editable={2}, name={3})', RClass.dump(e), RClass.dump(c), l);
   e.reset();
   if(RClass.isClass(e, FUiDropEditor)){
      e.linkControl(c);
      o._focusEditor = e;
   }
   return e;
}
function FEditorConsole_blur(editor){
   var o = this;
   if(o._focusEditor){
      RLogger.debug(o, 'Blur editor {1}', RClass.dump(editor));
      editor = RObject.nvl(editor, o._focusEditor);
      if(editor){
         editor.onEditEnd();
      }
      o._focusEditor = null;
   }
}
function FEditorConsole_lost(e){
   var o = this;
   o.leave(e);
   o.blur(e);
}
function FEnvironmentConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o.scope       = EScope.Local;
   o.environment = null;
   o.connect     = FEnvironmentConsole_connect;
   o.build       = FEnvironmentConsole_build;
   o.buildValue  = FEnvironmentConsole_buildValue;
   o.load        = FEnvironmentConsole_load;
   o.xml         = FEnvironmentConsole_xml;
   return o;
}
function FEnvironmentConsole_connect(){
   return;
   var xData = window.xEnvironment;
   if(xData){
      this.environment = RXml.makeNode(xData);
   }
}
function FEnvironmentConsole_build(config){
   var o = this;
   if(!o.environment){
      o.connect()
   }
   if(o.environment){
      var node = config.create('Environment');
      node.attributes().append(this.environment.attributes());
   }
}
function FEnvironmentConsole_buildValue(){
   if(!this.environment){
      this.connect()
   }
   if(this.environment){
      var env = RHtml.get('_environment');
      if(env){
         env.value = this.environment.xml();
      }
   }
}
function FEnvironmentConsole_load(p){
   this.environment = RXml.makeNode(p);
}
function FEnvironmentConsole_xml(){
   if(!this.environment){
      this.connect()
   }
   if(this.environment){
      return this.environment.xml();
   }
   return null;
}
function FFocusConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o.scope              = EScope.Page;
   o._blurAble          = true;
   o._focusAble         = true;
   o._focusClasses      = null;
   o._storeControl      = null;
   o._hoverContainer    = null;
   o._hoverControl      = null;
   o._focusControl      = null;
   o._blurControl       = null;
   o._activeControl     = null;
   o.lsnsFocus          = null;
   o.lsnsBlur           = null;
   o.lsnsFocusClass     = null;
   o.onMouseDown        = FFocusConsole_onMouseDown;
   o.onMouseWheel       = FFocusConsole_onMouseWheel;
   o.construct          = FFocusConsole_construct;
   o.enter              = FFocusConsole_enter;
   o.leave              = FFocusConsole_leave;
   o.isFocus            = FFocusConsole_isFocus;
   o.focus              = FFocusConsole_focus;
   o.blur               = FFocusConsole_blur;
   o.findClass          = FFocusConsole_findClass;
   o.focusClass         = FFocusConsole_focusClass;
   o.focusHtml          = FFocusConsole_focusHtml;
   o.lockBlur           = FFocusConsole_lockBlur;
   o.unlockBlur         = FFocusConsole_unlockBlur;
   o.storeFocus         = FFocusConsole_storeFocus;
   o.restoreFocus       = FFocusConsole_restoreFocus;
   o.dispose            = FFocusConsole_dispose;
   return o;
}
function FFocusConsole_onMouseDown(p){
   this.focusHtml(p.hSource);
}
function FFocusConsole_onMouseWheel(s, e){
   var o = this;
}
function FFocusConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._focusClasses = new Object();
   o.lsnsFocus = new TListeners();
   o.lsnsBlur = new TListeners();
   o.lsnsFocusClass = new TListeners();
   RLogger.info(o, 'Add listener for window mouse down and wheel.');
   RWindow.lsnsMouseDown.register(o, o.onMouseDown);
   RWindow.lsnsMouseWheel.register(o, o.onMouseWheel);
}
function FFocusConsole_enter(c){
   var o = this;
   if(RClass.isClass(c, MUiContainer)){
      o._hoverContainer = c;
   }else{
      o._hoverControl = c;
   }
}
function FFocusConsole_leave(c){
   var o = this;
   if(o._hoverContainer == c){
      o._hoverContainer = null;
   }
   if(o._hoverControl == c){
      o._hoverControl = null;
   }
}
function FFocusConsole_isFocus(c){
   return (this._focusControl == c);
}
function FFocusConsole_focus(c, e){
   var o = this;
   if(!RClass.isClass(c, MUiFocus)){
      return;
   }
   var f = o._focusControl;
   if(f == c){
      return;
   }
   var bc = o._blurControl;
   if(bc != f){
      if(o._blurAble && f && f.testBlur(c)){
         RLogger.debug(o, 'Blur focus control. (name={1}, instance={2})', f.name, RClass.dump(f));
         o._blurControl = f;
         f.doBlur(e);
         o.lsnsBlur.process(f);
      }
   }
   if(o._focusAble){
      RLogger.debug(o, 'Focus control. (name={1}, instance={2})', c.name, RClass.dump(c));
      c.doFocus(e);
      o._focusControl = o._activeControl = c;
      o.lsnsFocus.process(c);
   }
}
function FFocusConsole_blur(c, e){
   var o = this;
   var fc = o._focusControl;
   var bc = o._blurControl;
   if(fc && c && !fc.testBlur(c)){
      return;
   }
   if(bc != c && RClass.isClass(c, MUiFocus)){
      RLogger.debug(o, 'Blur control. (name={1}, instance={2})', c.name, RClass.dump(c));
      o._blurControl = c;
      c.doBlur(e);
   }
   if(fc){
      RLogger.debug(o, 'Blur focus control. (name={1}, instance={2})', fc.name, RClass.dump(fc));
      fc.doBlur(e);
      o._focusControl = null;
   }
}
function FFocusConsole_findClass(c){
   var o = this;
   var n = RClass.name(c);
   if(o._focusClasses[n]){
      return o._focusClasses[n];
   }
   var p = o._activeControl;
   if(RClass.isClass(p, FEditor)){
      p = p.source;
   }
   if(p){
      return p.topControl(c);
   }
}
function FFocusConsole_focusClass(c, p){
   var o = this;
   var n = RClass.name(c);
   if(o._focusClasses[n] != p){
      o._focusClasses[n] = p;
      RLogger.debug(o, 'Focus class. (name={1}, class={2})', n, RClass.dump(p));
      o.lsnsFocusClass.process(p, c);
   }
}
function FFocusConsole_focusHtml(p){
   var o = this;
   var c = RHtml.searchLinker(p, FUiControl);
   RLogger.debug(o, 'Focus html control. (control={1}, element={2})', RClass.dump(c), p.tagName);
   if(c){
      if(o._focusControl != c){
         o.blur(c, p);
      }
   }else{
      o.blur(null, p);
   }
}
function FFocusConsole_lockBlur(){
   this._blurAble = false;
}
function FFocusConsole_unlockBlur(){
   this._blurAble = true;
}
function FFocusConsole_storeFocus(){
   var o = this;
   o._storeControl = o._focusControl;
}
function FFocusConsole_restoreFocus(){
   var o = this;
   if(o._storeControl){
      o._storeControl.focus();
      o._storeControl = null;
   }
}
function FFocusConsole_dispose(){
   var o = this;
   o.__base.FConsole.dispose.call(o);
   o._focusClasses = null;
}
function FFrameConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd         = EScope.Local;
   o._frames          = null;
   o.construct        = FFrameConsole_construct;
   o.create           = FFrameConsole_create;
   o.find             = FFrameConsole_find;
   o.get              = FFrameConsole_get;
   return o;
}
function FFrameConsole_construct(){
   var o = this;
   o._frames = new TMap();
}
function FFrameConsole_create(c, n){
   var o = this;
   var dc = RConsole.find(FDescribeFrameConsole);
   var x = dc.load(n);
   var f = RControl.build(null, x, null, c._hPanel);
   return f;
}
function FFrameConsole_find(n){
   return this._frames.get(n);
}
function FFrameConsole_get(c, n, h){
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
function FFrameConsole_hiddenAll(){
   var o = this;
   var fs = o._frames;
   var fc = fs.count;
   for(var n=0; n<fc; n++){
      fs.value(n).setVisible(false);
   }
}
function FFrameConsole_onProcessLoaded(e){
   var o = this;
   var r = e.document.root();
   var g = e.argument;
   if(!e.messageChecked){
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
   var g = e.argument;
   var fn = r.find('Form');
   if(fn){
      var ds = RDataset.make(fn);
      g.resultDataset = ds;
      g.resultRow = ds.rows.get(0);
   }
   g.invoke();
}
function FFrameConsole_process(g){
   var o = this;
   var doc = new TXmlDocument();
   var root = doc.root();
   root.set('action', 'process');
   if(g.checked){
      root.set('checked', g.checked);
   }
   root.push(g.toNode());
   var e = new TEvent(o, EXmlEvent.Send, o.onProcessLoaded);
   e.url = RService.url(RString.nvl(g.url, 'logic.webform'));
   e.action = EDataAction.Process;
   e.argument = g;
   e.document = doc;
   RConsole.find(FXmlConsole).process(e);
}
function FFrameConsole_loadEvents(cfg){
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
         var s = c.name + '@' + c.source + '@' + c.form;
         o.events.set(s, c);
      }
   }
}
function FFrameConsole_processEvent(e){
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
                  c.event.call(eo, eo, e);
            }
         }
      }
   }
}
function FFrameConsole_free(f){
   f.setVisible(false);
   this._freeFrames.push(f);
}
function FFrameConsole_dispose(){
   var o = this;
   RMemory.free(o._frames);
   RMemory.free(o._formIds);
   RMemory.free(o._framesLoaded);
   o._frames = null;
   o._formIds = null;
   o._framesLoaded = null;
}
function FFrameEventConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd   = EScope.Local;
   o._thread    = null;
   o._interval  = 20;
   o._allow     = true;
   o._allows    = new TAttributes();
   o._events    = new TObjects();
   o._listeners = new TAttributes();
   o.onProcess  = FFrameEventConsole_onProcess;
   o.construct  = FFrameEventConsole_construct;
   o.register   = FFrameEventConsole_register;
   o.push       = FFrameEventConsole_push;
   o.clear      = FFrameEventConsole_clear;
   return o;
}
function FFrameEventConsole_onProcess(){
   var o = this;
   var es = o._events;
   var ec = es.count();
   if(ec > 0){
      while(true){
         var has = false;
         for(var n = 0; n < ec; n++){
            var e = es.get(n);
            if(e){
               has = true;
               e.process();
               var ls = o._listeners.get(RMethod.name(e));
               if(ls){
                  ls.process(e);
               }
               es.set(n, null)
            }
         }
         if(!has){
            break;
         }
      }
      es.clear();
   }
}
function FFrameEventConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.addProcessListener(o, o.onProcess);
   RConsole.find(FThreadConsole).start(t);
   RLogger.debug(o, 'Add event thread. (thread={1})', RClass.dump(t));
}
function FFrameEventConsole_register(po, pc){
   this._events.push(new TEvent(po, null, pc));
}
function FFrameEventConsole_push(e){
   var o = this;
   var n = RClass.name(e)
   if(o._allow){
      var a = true;
      if(o._allows.contains(n)){
         a = RBoolean.isTrue(o._allows.get(n));
      }
      if(a){
         var es = o._events;
         var c = es.count();
         for(var i = 0; i < c; i++){
            if(es.get(n) == e){
               es.set(n, null);
            }
         }
         es.push(e);
      }
   }
}
function FFrameEventConsole_clear(){
   this._events.clear();
}
function FFrameEventConsole_add(owner, proc){
   this._events.push(new TEvent(owner, null, proc));
}
function FFrameEventConsole_allowEvent(c){
   this._allows.set(RMethod.name(c), EBool.True);
}
function FFrameEventConsole_skipEvent(c){
   this._allows.set(RMethod.name(c), EBool.False);
}
function FFrameEventConsole_allowAll(){
   this._allow = true;
}
function FFrameEventConsole_skipAll(){
   this._allow = false;
}
function FFrameEventConsole_onlyCall(c, m){
   var o = this;
   o._allow = false;
   m.call(c);
   o._allow = true;
}
function FKeyConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd        = EScope.Local;
   o._enable         = true;
   o._enableRegister = true;
   o._listeners      = new Object();
   o._disableKeys    = new Object();
   o.onKeyDown       = FKeyConsole_onKeyDown;
   o.construct       = FKeyConsole_construct;
   o.enable          = FKeyConsole_enable;
   o.disable         = FKeyConsole_disable;
   o.enableRegister  = FKeyConsole_enableRegister;
   o.disableRegister = FKeyConsole_disableRegister;
   o.register        = FKeyConsole_register;
   return o;
}
function FKeyConsole_onKeyDown(s, e){
   debugger
   var o = this;
   var k = REnum.tryDecode(EKey, e.keyCode);
   if(k && o._enable){
      var ls = o._listeners[k];
      if(ls){
         ls.process(o, e);
         e.keyCode = null;
         e.returnValue = false;
      }
   }
   if(k && o._disableKeys[k]){
      e.keyCode = null;
      e.returnValue = false;
   }
}
function FKeyConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   RWindow.lsnsKeyDown.register(o, o.onKeyDown);
}
function FKeyConsole_enable(){
   this._enable = true;
}
function FKeyConsole_disable(){
   this._enable = false;
}
function FKeyConsole_enableRegister(){
   this._enableRegister = true;
}
function FKeyConsole_disableRegister(){
   this._enableRegister = false;
}
function FKeyConsole_register(k, w, p){
   var o = this;
   if(o._enableRegister){
      if(RInteger.isInteger(k)){
         k = REnum.decode(EKeyCode, k);
      }
      var ks = o._listeners;
      var s = ks[k];
      if(!s){
         s = ks[k] = new TListeners();
      }
      s.register(w, p);
   }
}
function FMessageConsole(o){
   o = RClass.inherits(this, o, FConsole, MUiStyle);
   o.scope        = EScope.Global;
   o.result       = new Array();
   o.attributes   = new Array();
   o.messageBox   = null;
   o.messageWindow = null;
   o.parse        = FMessageConsole_parse;
   o.popupMessage = FMessageConsole_popupMessage;
   o.closeMessage = FMessageConsole_closeMessage;
   o.checkResult  = FMessageConsole_checkResult;
   return o;
}
function FMessageConsole_parse(config){
   var msgs = null;
   var msgsNode = config.find('Messages');
   if(msgsNode && msgsNode.nodes && msgsNode.nodes.count){
      msgs = new TMessages();
      for(var n=0; n<msgsNode.nodes.count; n++){
         var node = msgsNode.node(n);
         var msg = new TMessage();
         msg.loadConfig(msgsNode.node(n));
         msgs.push(msg);
      }
   }
   return msgs;
}
function FMessageConsole_popupMessage(g){
   var o = this;
   var w = o.messageWindow;
   if(!w){
      w = o.messageWindow = RControl.create('FMessageWindow');
   }
   w.loadMessages(g);
   w.show();
}
function FMessageConsole_closeMessage(){
   RWindow.setEnable(true);
}
function FMessageConsole_checkResult(g){
   var o = this;
   var ms = g.messages = o.parse(g.config);
   if(ms){
      var m = ms.message(EMessage.Fatal);
      if(m && m.attrType == "session.timeout"){
         var ss = RString.splitTwo(m.redirect, '@');
         var s = RContext.context(ss[1] + '?do='+ss[0]);
         fmMain.action = s;
         fmMain.target = '_self';
         fmMain.submit();
      }else{
         o.popupMessage(g);
      }
      return false;
   }
   return true;
}
function FResultConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o.scope          = EScope.Page;
   o.executeCommand = FResultConsole_executeCommand;
   o.checkService   = FResultConsole_checkService;
   return o;
}
function FResultConsole_executeCommand(command){
   var name = command.get('name');
   if(EResultCommand.TreeReload == name){
      var tv = RGlobal.get('catalog.tree');
      if(tv){
         tv.reload();
      }
   }else if(EResultCommand.TreeNodeRefresh == name){
      var tv = RGlobal.get('catalog.tree');
      if(tv){
         var uuid = command.get('uuid');
         if(uuid){
            var fn = tv.findByUuid(uuid);
            if(fn){
               tv.reloadNode(fn);
            }else{
               return alert("Can't find tree node. (uuid="+uuid+")");
            }
         }else{
            tv.reloadNode();
         }
      }
   }else if(EResultCommand.TreeParentRefresh == name){
      var tv = RGlobal.get('catalog.tree');
      if(tv){
         var fn = tv.focusNode;
         if(fn){
            tv.reloadNode(fn.parentNode);
         }
      }
   }else if(EResultCommand.PageRedirect == name){
      var action = command.get('action');
      var page = top.RContext.context(command.get('page'));
      if(action){
         page += '?do=' + action;
      }
      fmMain.action = page;
      fmMain.target = '';
      fmMain.submit();
   }
}
function FResultConsole_checkService(config){
   var o = this;
   if(config){
      if(!RConsole.find(FMessageConsole).checkResult(new TMessageArg(config))){
         return false;
      }
      var cmdsNode = config.find('Commands');
      if(cmdsNode && cmdsNode.nodes && cmdsNode.nodes.count){
         for(var n=0; n<cmdsNode.nodes.count; n++){
            var node = cmdsNode.node(n);
            if(node.isName('Command')){
               o.executeCommand(node);
            }
         }
      }
      RConsole.find(FFocusConsole).restoreFocus();
   }
   return true;
}
function FUiWorkspaceConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd         = EScope.Local;
   o._activeWorkspace = null;
   o._workspaces      = null;
   o.onResize         = FUiWorkspaceConsole_onResize;
   o.construct        = FUiWorkspaceConsole_construct;
   o.active           = FUiWorkspaceConsole_active;
   o.resize           = FUiWorkspaceConsole_resize;
   o.dispose          = FUiWorkspaceConsole_dispose;
   return o;
}
function FUiWorkspaceConsole_onResize(p){
   var o = this;
   var w = o._activeWorkspace;
   if(w){
      w.psResize();
   }
}
function FUiWorkspaceConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._workspaces = new TDictionary();
   RWindow.lsnsResize.register(o, o.onResize);
}
function FUiWorkspaceConsole_active(p){
   this._activeWorkspace = p;
}
function FUiWorkspaceConsole_resize(){
   this.onResize();
}
function FUiWorkspaceConsole_dispose(){
   var o = this;
   o.__base.FConsole.dispose.call(o);
}
