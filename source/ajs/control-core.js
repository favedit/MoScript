function FUiConfirmDialog(o){
   o = RClass.inherits(this, o, FUiDialog, MListenerResult);
   o._styleText            = RClass.register(o, new AStyle('_styleText'));
   o._frameName            = 'system.dialog.ConfirmDialog';
   o._controlText          = null;
   o._controlConfirmButton = null;
   o._controlCancelButton  = null;
   o.onBuilded             = FUiConfirmDialog_onBuilded;
   o.onConfirmClick        = FUiConfirmDialog_onConfirmClick;
   o.onCancelClick         = FUiConfirmDialog_onCancelClick;
   o.construct             = FUiConfirmDialog_construct;
   o.setText               = FUiConfirmDialog_setText;
   o.dispose               = FUiConfirmDialog_dispose;
   return o;
}
function FUiConfirmDialog_onBuilded(p){
   var o = this;
   o.__base.FUiDialog.onBuilded.call(o, p);
   o._controlText._hPanel.className = o.styleName('Text');
   o._controlConfirmButton.addClickListener(o, o.onConfirmClick);
   o._controlCancelButton.addClickListener(o, o.onCancelClick);
}
function FUiConfirmDialog_onConfirmClick(event){
   var o = this;
   var event = new SEvent();
   event.sender = o;
   event.resultCd = EResult.Success;
   o.processResultListener(event);
   event.dispose();
   o.hide();
}
function FUiConfirmDialog_onCancelClick(event){
   var o = this;
   var event = new SEvent();
   event.sender = o;
   event.resultCd = EResult.Cancel;
   o.processResultListener(event);
   event.dispose();
   o.hide();
}
function FUiConfirmDialog_construct(){
   var o = this;
   o.__base.FUiDialog.construct.call(o);
}
function FUiConfirmDialog_setText(value){
   this._controlText.set(value);
}
function FUiConfirmDialog_dispose(){
   var o = this;
   o.__base.FUiDialog.dispose.call(o);
}
function FUiDescribeFrameConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd       = EScope.Global;
   o._service       = 'cloud.describe.frame';
   o._defines       = null;
   o.lsnsLoaded     = null;
   o.construct      = FUiDescribeFrameConsole_construct;
   o.load           = FUiDescribeFrameConsole_load;
   o.events         = null;
   o.formId         = 0;
   o.createFromName = FUiDescribeFrameConsole_createFromName;
   o.loadNode       = FUiDescribeFrameConsole_loadNode;
   o.loadService    = FUiDescribeFrameConsole_loadService;
   o.nextFormId     = FUiDescribeFrameConsole_nextFormId;
   o.get            = FUiDescribeFrameConsole_get;
   o.find           = FUiDescribeFrameConsole_find;
   o.getLov         = FUiDescribeFrameConsole_getLov;
   o.findLov        = FUiDescribeFrameConsole_findLov;
   o.getEvents      = FUiDescribeFrameConsole_getEvents;
   return o;
}
function FUiDescribeFrameConsole_construct(){
   var o = this;
   o._defines = new TDictionary();
   o.lsnsLoaded = new TListeners();
}
function FUiDescribeFrameConsole_load(name){
   var o = this;
   var defines = o._defines;
   var xconfig = defines.get(name);
   if(xconfig){
      return xconfig;
   }
   var xdocument = new TXmlDocument();
   var xroot = xdocument.root();
   xroot.set('action', 'query');
   var xframe = xroot.create('Frame');
   xframe.set('name', name);
   var url = RUiService.url(o._service);
   var xresult = RConsole.find(FXmlConsole).send(url, xdocument);
   var xframes = xresult.nodes();
   var count = xframes.count();
   for(var i = 0; i < count; i++){
      var xframe = xframes.at(i);
      var frameName = xframe.get('name');
      defines.set(frameName, xframe);
   }
   var xframe = defines.get(name);
   if(!xframe){
      throw new TError(o, 'Unknown frame. (name={1])', name);
   }
   return xframe;
}
function FUiDescribeFrameConsole_createFromName(name, type){
   var o = this;
   var doc = o.loadService(name, type);
   o.loadNode(doc);
   if(EForm.Lov == type){
      return o.getLov(name);
   }else{
      return o.get(name);
   }
}
function FUiDescribeFrameConsole_loadNode(x){
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
function FUiDescribeFrameConsole_loadService(n, t){
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
   var url = RUiService.url('logic.webform');
   var doc = RConsole.find(FXmlConsole).send(url, doc);
   var r = doc.root();
   if(!RConsole.find(FMessageConsole).checkResult(new TMessageArg(r))){
      return null;
   }
   return doc;
}
function FUiDescribeFrameConsole_nextFormId(){
   return ++this.formId;
}
function FUiDescribeFrameConsole_get(n){
   return this._defines.get(EForm.Form).get(n);
}
function FUiDescribeFrameConsole_find(n, t){
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
function FUiDescribeFrameConsole_getLov(n){
   return this._defines.get(EForm.Lov).get(n);
}
function FUiDescribeFrameConsole_findLov(n){
   var o = this;
   var fc = o.getLov(n);
   if(!fc){
      fc = o.createFromName(n, EForm.Lov);
   }
   return fc;
}
function FUiDescribeFrameConsole_getEvents(n){
   return this.events.get(n);
}
function FUiDesktopConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd         = EScope.Local;
   o._maskVisible     = false;
   o._statusEnable    = true;
   o._loadingVisible  = false;
   o._progressVisible = false;
   o._progressBar     = null;
   o._hMaskPanel      = null;
   o._hLoadingPanel   = null;
   o._hLoadingLabel   = null;
   o.construct        = FUiDesktopConsole_construct;
   o.getMaskPanel     = FUiDesktopConsole_getMaskPanel;
   o.getProgressBar   = FUiDesktopConsole_getProgressBar;
   o.getLoadingPanel  = FUiDesktopConsole_getLoadingPanel;
   o.setMaskVisible   = FUiDesktopConsole_setMaskVisible;
   o.isEnable         = FUiDesktopConsole_isEnable;
   o.enable           = FUiDesktopConsole_enable;
   o.disable          = FUiDesktopConsole_disable;
   o.showLoading      = FUiDesktopConsole_showLoading;
   o.showUploading    = FUiDesktopConsole_showUploading;
   o.showProgress     = FUiDesktopConsole_showProgress;
   o.hide             = FUiDesktopConsole_hide;
   return o;
}
function FUiDesktopConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
}
function FUiDesktopConsole_getMaskPanel(){
   var o = this;
   var hDocument = top.RWindow._hDocument;
   var hPanel = o._hMaskPanel;
   if(!hPanel){
      hPanel = o._hMaskPanel = RBuilder.createTable(hDocument, 'FUiDesktopConsole_MaskPanel');
      hPanel.style.zIndex = 5000;
      var hInnerPanel = o._hMaskInnerPanel = RBuilder.appendTableRowCell(hPanel);
      hInnerPanel.align = 'center';
      hInnerPanel.vAlign = 'middle';
   }
   return hPanel;
}
function FUiDesktopConsole_getLoadingPanel(){
   var o = this;
   var hDocument = top.RWindow._hDocument;
   var hPanel = o._hLoadingPanel;
   if(!hPanel){
      hPanel = o._hLoadingPanel = RBuilder.createTable(hDocument);
      var hCell = RBuilder.appendTableRowCell(hPanel);
      var hIcon = o._hLoadingIcon = RBuilder.appendIcon(hCell);
      hIcon.src = RResource.iconPath('control.RWindow_Loading');
      var hCell = o._hLoadingLabel = RBuilder.appendTableRowCell(hPanel);
      hCell.align = 'center';
      hCell.style.color = '#FFFFFF';
   }
   return hPanel;
}
function FUiDesktopConsole_getProgressBar(){
   var o = this;
   var progressBar = o._progressBar;
   if(!progressBar){
      progressBar = o._progressBar = RClass.create(FUiProgressBar);
      progressBar.build(top.RWindow._hDocument);
   }
   return progressBar;
}
function FUiDesktopConsole_setMaskVisible(visible){
   var o = this;
   if(o._maskVisible != visible){
      var hDocument = top.RWindow._hDocument;
      var hBody = hDocument.body;
      var hMaskPanel = o.getMaskPanel();
      if(visible){
         var hStyle = hMaskPanel.style;
         hStyle.left = '0px';
         hStyle.top = '0px';
         hBody.appendChild(hMaskPanel);
      }else{
         hBody.removeChild(hMaskPanel);
      }
   }
   o._maskVisible = visible;
}
function FUiDesktopConsole_isEnable(){
   return this._statusEnable;
}
function FUiDesktopConsole_enable(){
   var o = this;
   o._disableDeep--;
   if(o._disableDeep == 0){
      o.setEnable(true);
   }
}
function FUiDesktopConsole_disable(){
   var o = this;
   if(o._disableDeep == 0){
      o.setEnable(false);
   }
   o._disableDeep++;
}
function FUiDesktopConsole_showLoading(){
   var o = this;
   o.setMaskVisible(true);
   if(!o._loadingVisible){
      var hLoadingPanel = o.getLoadingPanel();
      RHtml.textSet(o._hLoadingLabel, '正在努力加载中，请稍等 ...');
      o._hMaskInnerPanel.appendChild(hLoadingPanel);
      o._loadingVisible = true;
   }
}
function FUiDesktopConsole_showUploading(){
   var o = this;
   o.setMaskVisible(true);
   if(!o._loadingVisible){
      var hLoadingPanel = o.getLoadingPanel();
      RHtml.textSet(o._hLoadingLabel, '正在努力上传中，请稍等 ...');
      o._hMaskInnerPanel.appendChild(hLoadingPanel);
      o._loadingVisible = true;
   }
}
function FUiDesktopConsole_showProgress(rate){
   var o = this;
   o.setMaskVisible(true);
   if(!o._progressVisible){
      var hMaskPanel = o.getMaskPanel();
      var progressBar = o.getProgressBar();
      hMaskPanel.appendChild(progressBar._hPanel);
      o._progressVisible = true;
   }
}
function FUiDesktopConsole_hide(){
   var o = this;
   if(o._loadingVisible){
      var hLoadingPanel = o.getLoadingPanel();
      o._hMaskInnerPanel.removeChild(hLoadingPanel);
      o._loadingVisible  = false;
   }
   o.setMaskVisible(false);
}
function FUiEditorConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd     = EScope.Local;
   o._hoverEditor = null;
   o._focusEditor = null;
   o._editors     = null;
   o.construct    = FUiEditorConsole_construct;
   o.makeName     = FUiEditorConsole_makeName;
   o.enter        = FUiEditorConsole_enter;
   o.leave        = FUiEditorConsole_leave;
   o.focus        = FUiEditorConsole_focus;
   o.blur         = FUiEditorConsole_blur;
   o.lost         = FUiEditorConsole_lost;
   return o;
}
function FUiEditorConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._editors = new TDictionary();
}
function FUiEditorConsole_makeName(cls, name){
   return name ? name + '@' + RClass.name(cls) : RClass.name(cls);
}
function FUiEditorConsole_enter(editable, cls){
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
function FUiEditorConsole_leave(editor){
   var o = this;
   if(o._hoverEditor != o._focusEditor){
      editor = RObject.nvl(editor, o._hoverEditor);
      o._hoverEditor = null;
      RLog.debug(o, 'Leave {1}', RClass.dump(editor));
   }
}
function FUiEditorConsole_focus(c, n, l){
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
function FUiEditorConsole_blur(editor){
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
function FUiEditorConsole_lost(e){
   var o = this;
   o.leave(e);
   o.blur(e);
}
function FUiEnvironmentConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o.scope       = EScope.Local;
   o.environment = null;
   o.connect     = FUiEnvironmentConsole_connect;
   o.build       = FUiEnvironmentConsole_build;
   o.buildValue  = FUiEnvironmentConsole_buildValue;
   o.load        = FUiEnvironmentConsole_load;
   o.xml         = FUiEnvironmentConsole_xml;
   return o;
}
function FUiEnvironmentConsole_connect(){
}
function FUiEnvironmentConsole_build(config){
   var o = this;
   if(!o.environment){
      o.connect()
   }
   if(o.environment){
      var node = config.create('Environment');
      node.attributes().append(this.environment.attributes());
   }
}
function FUiEnvironmentConsole_buildValue(){
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
function FUiEnvironmentConsole_load(p){
   this.environment = RXml.makeNode(p);
}
function FUiEnvironmentConsole_xml(){
   if(!this.environment){
      this.connect()
   }
   if(this.environment){
      return this.environment.xml();
   }
   return null;
}
function FUiFocusConsole(o){
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
   o.onMouseDown        = FUiFocusConsole_onMouseDown;
   o.onMouseWheel       = FUiFocusConsole_onMouseWheel;
   o.construct          = FUiFocusConsole_construct;
   o.enter              = FUiFocusConsole_enter;
   o.leave              = FUiFocusConsole_leave;
   o.isFocus            = FUiFocusConsole_isFocus;
   o.focus              = FUiFocusConsole_focus;
   o.blur               = FUiFocusConsole_blur;
   o.findClass          = FUiFocusConsole_findClass;
   o.focusClass         = FUiFocusConsole_focusClass;
   o.focusHtml          = FUiFocusConsole_focusHtml;
   o.lockBlur           = FUiFocusConsole_lockBlur;
   o.unlockBlur         = FUiFocusConsole_unlockBlur;
   o.storeFocus         = FUiFocusConsole_storeFocus;
   o.restoreFocus       = FUiFocusConsole_restoreFocus;
   o.dispose            = FUiFocusConsole_dispose;
   return o;
}
function FUiFocusConsole_onMouseDown(p){
   this.focusHtml(p.hSource);
}
function FUiFocusConsole_onMouseWheel(s, e){
   var o = this;
}
function FUiFocusConsole_construct(){
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
function FUiFocusConsole_enter(c){
   var o = this;
   if(RClass.isClass(c, MUiContainer)){
      o._hoverContainer = c;
   }else{
      o._hoverControl = c;
   }
}
function FUiFocusConsole_leave(c){
   var o = this;
   if(o._hoverContainer == c){
      o._hoverContainer = null;
   }
   if(o._hoverControl == c){
      o._hoverControl = null;
   }
}
function FUiFocusConsole_isFocus(c){
   return (this._focusControl == c);
}
function FUiFocusConsole_focus(c, e){
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
function FUiFocusConsole_blur(c, e){
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
function FUiFocusConsole_findClass(c){
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
function FUiFocusConsole_focusClass(c, p){
   var o = this;
   var n = RClass.name(c);
   if(o._focusClasses[n] != p){
      o._focusClasses[n] = p;
      RLogger.debug(o, 'Focus class. (name={1}, class={2})', n, RClass.dump(p));
      o.lsnsFocusClass.process(p, c);
   }
}
function FUiFocusConsole_focusHtml(p){
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
function FUiFocusConsole_lockBlur(){
   this._blurAble = false;
}
function FUiFocusConsole_unlockBlur(){
   this._blurAble = true;
}
function FUiFocusConsole_storeFocus(){
   var o = this;
   o._storeControl = o._focusControl;
}
function FUiFocusConsole_restoreFocus(){
   var o = this;
   if(o._storeControl){
      o._storeControl.focus();
      o._storeControl = null;
   }
}
function FUiFocusConsole_dispose(){
   var o = this;
   o.__base.FConsole.dispose.call(o);
   o._focusClasses = null;
}
function FUiFrameConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd         = EScope.Local;
   o._frames          = null;
   o.construct        = FUiFrameConsole_construct;
   o.create           = FUiFrameConsole_create;
   o.find             = FUiFrameConsole_find;
   o.findByClass      = FUiFrameConsole_findByClass;
   o.get              = FUiFrameConsole_get;
   return o;
}
function FUiFrameConsole_construct(){
   var o = this;
   o._frames = new TMap();
}
function FUiFrameConsole_create(c, n){
   var o = this;
   var dc = RConsole.find(FUiDescribeFrameConsole);
   var x = dc.load(n);
   var f = RUiControl.build(null, x, null, c._hPanel);
   return f;
}
function FUiFrameConsole_find(n){
   return this._frames.get(n);
}
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
function FUiFrameConsole_hiddenAll(){
   var o = this;
   var fs = o._frames;
   var fc = fs.count;
   for(var n=0; n<fc; n++){
      fs.value(n).setVisible(false);
   }
}
function FUiFrameConsole_onProcessLoaded(e){
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
function FUiFrameConsole_process(g){
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
function FUiFrameConsole_loadEvents(cfg){
}
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
                  c.event.call(eo, eo, e);
            }
         }
      }
   }
}
function FUiFrameConsole_free(f){
   f.setVisible(false);
   this._freeFrames.push(f);
}
function FUiFrameConsole_dispose(){
   var o = this;
   RMemory.free(o._frames);
   RMemory.free(o._formIds);
   RMemory.free(o._framesLoaded);
   o._frames = null;
   o._formIds = null;
   o._framesLoaded = null;
}
function FUiFrameEventConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd   = EScope.Local;
   o._thread    = null;
   o._interval  = 20;
   o._allow     = true;
   o._allows    = new TAttributes();
   o._events    = new TObjects();
   o._listeners = new TAttributes();
   o.onProcess  = FUiFrameEventConsole_onProcess;
   o.construct  = FUiFrameEventConsole_construct;
   o.register   = FUiFrameEventConsole_register;
   o.push       = FUiFrameEventConsole_push;
   o.clear      = FUiFrameEventConsole_clear;
   return o;
}
function FUiFrameEventConsole_onProcess(){
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
function FUiFrameEventConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.addProcessListener(o, o.onProcess);
   RConsole.find(FThreadConsole).start(t);
   RLogger.debug(o, 'Add event thread. (thread={1})', RClass.dump(t));
}
function FUiFrameEventConsole_register(po, pc){
   this._events.push(new TEvent(po, null, pc));
}
function FUiFrameEventConsole_push(e){
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
function FUiFrameEventConsole_clear(){
   this._events.clear();
}
function FUiFrameEventConsole_add(owner, proc){
   this._events.push(new TEvent(owner, null, proc));
}
function FUiFrameEventConsole_allowEvent(c){
   this._allows.set(RMethod.name(c), EBool.True);
}
function FUiFrameEventConsole_skipEvent(c){
   this._allows.set(RMethod.name(c), EBool.False);
}
function FUiFrameEventConsole_allowAll(){
   this._allow = true;
}
function FUiFrameEventConsole_skipAll(){
   this._allow = false;
}
function FUiFrameEventConsole_onlyCall(c, m){
   var o = this;
   o._allow = false;
   m.call(c);
   o._allow = true;
}
function FUiInfoDialog(o){
   o = RClass.inherits(this, o, FUiDialog, MListenerResult);
   o._styleText            = RClass.register(o, new AStyle('_styleText'));
   o._frameName            = 'system.dialog.InfoDialog';
   o._controlText          = null;
   o._controlConfirmButton = null;
   o._controlCancelButton  = null;
   o.onBuilded             = FUiInfoDialog_onBuilded;
   o.onConfirmClick        = FUiInfoDialog_onConfirmClick;
   o.construct             = FUiInfoDialog_construct;
   o.setText               = FUiInfoDialog_setText;
   o.dispose               = FUiInfoDialog_dispose;
   return o;
}
function FUiInfoDialog_onBuilded(p){
   var o = this;
   o.__base.FUiDialog.onBuilded.call(o, p);
   o._controlText._hPanel.className = o.styleName('Text');
   o._controlConfirmButton.addClickListener(o, o.onConfirmClick);
}
function FUiInfoDialog_onConfirmClick(event){
   var o = this;
   var event = new SEvent();
   event.sender = o;
   event.resultCd = EResult.Success;
   o.processResultListener(event);
   event.dispose();
   o.hide();
}
function FUiInfoDialog_construct(){
   var o = this;
   o.__base.FUiDialog.construct.call(o);
}
function FUiInfoDialog_setText(value){
   this._controlText.set(value);
}
function FUiInfoDialog_dispose(){
   var o = this;
   o.__base.FUiDialog.dispose.call(o);
}
function FUiKeyConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd        = EScope.Local;
   o._enable         = true;
   o._enableRegister = true;
   o._listeners      = new Object();
   o._disableKeys    = new Object();
   o.onKeyDown       = FUiKeyConsole_onKeyDown;
   o.construct       = FUiKeyConsole_construct;
   o.enable          = FUiKeyConsole_enable;
   o.disable         = FUiKeyConsole_disable;
   o.enableRegister  = FUiKeyConsole_enableRegister;
   o.disableRegister = FUiKeyConsole_disableRegister;
   o.register        = FUiKeyConsole_register;
   return o;
}
function FUiKeyConsole_onKeyDown(e){
   var o = this;
   var k = REnum.tryDecode(EKeyCode, e.keyCode);
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
function FUiKeyConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   RWindow.lsnsKeyDown.register(o, o.onKeyDown);
}
function FUiKeyConsole_enable(){
   this._enable = true;
}
function FUiKeyConsole_disable(){
   this._enable = false;
}
function FUiKeyConsole_enableRegister(){
   this._enableRegister = true;
}
function FUiKeyConsole_disableRegister(){
   this._enableRegister = false;
}
function FUiKeyConsole_register(k, w, p){
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
      s.clear();
      s.register(w, p);
   }
}
function FUiMessageConsole(o){
   o = RClass.inherits(this, o, FConsole, MUiStyle);
   o._scopeCd       = EScope.Global;
   o._result        = new Array();
   o._attributes    = new Array();
   o._messageBox    = null;
   o._messageWindow = null;
   o.showInfo       = FUiMessageConsole_showInfo;
   o.showConfirm    = FUiMessageConsole_showConfirm;
   o.popup          = FUiMessageConsole_popup;
   o.close          = FUiMessageConsole_close;
   o.parse          = FUiMessageConsole_parse;
   o.check          = FUiMessageConsole_check;
   return o;
}
function FUiMessageConsole_showInfo(text){
   var dialog = RConsole.find(FUiWindowConsole).find(FUiInfoDialog);
   dialog.clearResultListeners();
   dialog.setText(text);
   dialog.showPosition(EUiPosition.Center);
   return dialog;
}
function FUiMessageConsole_showConfirm(text){
   var dialog = RConsole.find(FUiWindowConsole).find(FUiConfirmDialog);
   dialog.clearResultListeners();
   dialog.setText(text);
   dialog.showPosition(EUiPosition.Center);
   return dialog;
}
function FUiMessageConsole_popup(g){
   var o = this;
   var w = o._messageWindow;
   if(!w){
      w = o._messageWindow = RControl.create(FUiMessageWindow);
   }
   w.loadMessages(g);
   w.show();
}
function FUiMessageConsole_close(){
   RWindow.setEnable(true);
}
function FUiMessageConsole_parse(config){
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
function FUiMessageConsole_check(g){
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
function FUiMessageDialog(o){
   o = RClass.inherits(this, o, FUiWindow);
   o._styleMsgPanel     = RClass.register(o, new AStyle('_styleMsgPanel'));
   o._styleButtonPanel  = RClass.register(o, new AStyle('_styleButtonPanel'));
   o._styleItmeForm     = RClass.register(o, new AStyle('_styleItmeForm'));
   o._styleItemTitle    = RClass.register(o, new AStyle('_styleItemTitle'));
   o._styleItemBodyForm = RClass.register(o, new AStyle('_styleItemBodyForm'));
   o._styleRowItem      = RClass.register(o, new AStyle('_styleRowItem'));
   o._styleDescForm     = RClass.register(o, new AStyle('_styleDescForm'));
   o._styleDescTitle    = RClass.register(o, new AStyle('_styleDescTitle'));
   o._styleDescBody     = RClass.register(o, new AStyle('_styleDescBody'));
   o._type              = null;
   o._isDialog          = false;
   o._titleBlur         = false;
   o._messageArg        = null;
   o._hMessagePanel     = null;
   o._hMessages         = null;
   o._hDescription      = null;
   o._hButtonPanel      = null;
   o._hBlank            = null;
   o.onBuild            = FUiMessageDialog_onBuild;
   o.onItemOver         = RClass.register(o, new AEventMouseOver('onItemOver'), FUiMessageDialog_onItemOver);
   o.onItemClick        = RClass.register(o, new AEventClick('onItemClick'), FUiMessageDialog_onItemClick);
   o.onDescClick        = RClass.register(o, new AEventClick('onDescClick'), FUiMessageDialog_onDescClick);
   o.onBuildMessages    = FUiMessageDialog_onBuildMessages;
   o.onBuildButtons     = FUiMessageDialog_onBuildButtons;
   o.onOk               = FUiMessageDialog_onOk;
   o.onCancel           = FUiMessageDialog_onCancel;
   o.onClose            = FUiMessageDialog_onClose;
   o.loadMessages       = FUiMessageDialog_loadMessages;
   o.show               = FUiMessageDialog_show;
   o.hide               = FUiMessageDialog_hide;
   o.dispose            = FUiMessageDialog_dispose;
   return o;
}
function FUiMessageDialog_onBuild(event){
   var o = this;
   o.__base.FUiWindow.oeBuild.call(o, e);
   o.setIcon('Icon');
   var hTab = RBuilder.appendTable(o.hBodyPanel, 0, 0, 0);
   hTab.style.vAlign = "top";
   hTab.width = '100%';
   hTab.height = '100%';
   var h1 = o.hTitlePanel = hTab.insertRow().insertCell();
   h1.style.height = "100%";
   h1.style.vAlign = "top";
   var h2 = o.hMsgPanel = hTab.insertRow().insertCell();
   h2.style.height = "100%";
   o.onBuildMessages();
   var h0 = o._hButtonPanel = hTab.insertRow().insertCell();
   h0.style.align = 'right';
   o.onBuildButtons();
   h0.height = 20;
   RConsole.find(FKeyConsole).register(EKey.Esc, new TListener(o, o.onClose));
   return r;
}
function FUiMessageDialog_onItemOver(e){
   var o = this;
   var hf = o.hItemBodyForm;
   var h = e.hSource;
}
function FUiMessageDialog_onItemClick(e){
   var o = this;
   var hf = o.hItemBodyForm;
   for(var n = 0; n < hf.rows.count; n++){
   }
   var h = e.hSource;
   var idx = h.rowIndex;
}
function FUiMessageDialog_onDescClick(e){
   var o = this;
}
function FUiMessageDialog_onBuildMessages(){
   var o = this;
   if(!o._type){
      var hTab1 = o.hItmeForm = RBuilder.appendTable(o.hTitlePanel);
      hTab1.style.height = "100%";
      hTab1.style.width = "100%";
      hTab1.style.vAlign = "top";
      var hItemTitle = o.hItemTitle = hTab1.insertRow().insertCell();
      hItemTitle.height = 25;
      var h = RBuilder.appendTable(hItemTitle);
      h.height = '100%';
      h.width = '100%';
      h.style.backgroundColor = "#F5F5F5";
      var hr = h.insertRow();
      var hc1 = hr.insertCell();
      hc1.width = '20';
      var hTitleIcon = RBuilder.appendIcon(hc1, null, null, 16, 14);
      hTitleIcon.style.paddingLeft = 20;
      hTitleIcon.src = o.styleIconPath('TitleIcon');
      var hc2 = hr.insertCell();
      hc2.innerText = ' '+ RContext.get('FUiMessageDialog:MessageContext');
      var hItemBody  = o.hItemBody = hTab1.insertRow().insertCell();
      hItemBody.height = 100;
      o.hItemBody.style.borderBottom = '2 solid #F5F5F5';
      hItemBody.style.padding = '5';
      hItemBody.vAlign = "top";
      var hDiv = RBuilder.appendDiv(hItemBody);
      hDiv.style.height = '100px';
      hDiv.style.overflow = "auto";
      var hItemBodyForm = o.hItemBodyForm = RBuilder.appendTable(hDiv);
      hItemBodyForm.style.border = '2px solid #FFFFFF';
      hItemBodyForm.width = "100%";
      hItemBodyForm.style.vAlign = "top";
      var hTab2 = o.hDescForm = RBuilder.appendTable(o.hMsgPanel);
      hTab2.style.tableLayout = "fixed";
      hTab2.style.border='2px solid #EEEDED';
      hTab2.style.borderTopWidth = 0;
   }
   o.hItmeForm.style.display = 'none';
   o.hDescForm.style.display = 'none';
   o.hMsgPanel.style.height = '100%';
   if(EMessage.Fatal == o._type || EMessage.Error == o._type){
      o.hItmeForm.style.display = 'block';
      o.hDescForm.style.display = 'block';
   }else{
      o.hItmeForm.style.display = 'block';
   }
}
function FUiMessageDialog_onBuildButtons(t){
   var o = this;
   if(!o._type){
      var hBtnTab = RBuilder.appendTable(o._hButtonPanel, null, 0, 0, 2);
      var hRow = hBtnTab.insertRow();
      var hc = o._hBlank = hRow.insertCell();
      hc.width='72%';
      var b = o.btnOk = RClass.create(FButton);
      b.icon = 'tool.ok';
      b.label = RContext.get('FToolButton:ok');
      b.width = '100%';
      b.lsnsClick.register(o, o.onOk);
      var hoc = hRow.insertCell();
      hoc.style.align='right';
      hoc.width='15%';
      b.psBuild(hoc);
      var b = o.btnCancel = RClass.create(FButton);
      b.icon = 'tool.cancel';
      b.label = RContext.get('FToolButton:cancel');
      b.width = '100%';
      b.lsnsClick.register(o, o.onCancel);
      var hcc = hRow.insertCell();
      hcc.width='15%';
      b.psBuild(hcc);
   }
   o.btnOk.hPanel.style.display = "none";
   o.btnCancel.hPanel.style.display = "none";
   if(EMessage.Warn == o._type){
      o.btnOk.hPanel.style.display = "block";
      o.btnCancel.hPanel.style.display = "block";
      o._hBlank.width = '72%';
   }else{
      o.btnOk.hPanel.style.display = "block";
      o._hBlank.width = '87%';
   }
}
function FUiMessageDialog_onOk(){
   var o = this;
   var g = o._messageArg;
   var cg = g.argument;
   var type = o.msgs.get(0)._type;
   if(EMessage.Warn == type){
      if(cg){
         cg.checked = EBoolean.True;
         if('process' == cg.actionType){
            RConsole.find(FFormConsole).process(cg);
         }else if('update' == cg.actionType){
            RConsole.find(FDatasetConsole).update(cg);
         }
      }
   }
   if(type == EMessage.Info){
      if(g.invokeCaller){
         g.invokeParam.messageChecked = true;
         g.invokeCaller.invoke(g.invokeParam);
      }
   }
   o.hide();
}
function FUiMessageDialog_onCancel(){
   this.hide();
}
function FUiMessageDialog_onClose(){
   this.hide();
}
function FUiMessageDialog_loadMessages(g){
   var o = this;
   o._messageArg = g;
   var ms = g.messages;
   o._type = ms._type();
   o.onBuildButtons();
   o.onBuildMessages();
   RHtml.clear(o.hItemBodyForm);
   RHtml.clear(o.hDescDiv);
   var first = true;
   var msgs = o.msgs = ms.items;
   var msgType = EMessage.Info;
   for(var n=0; n<msgs.count; n++){
      var msg = msgs.get(n);
      var m = msg.message;
      var d = msg.description;
      var t = msg._type;
      var hr = o.hItemBodyForm.insertRow();
      hr.height = 12;
      var hc1 = hr.insertCell();
      hc1.width = 20;
      var hIcon =  RBuilder.appendIcon(hc1, null, n, 16, 16);
      if(EMessage.Error == t){
    	 o.setIcon('TitleError');
         hIcon.src = o.styleIconPath('ItemError');
         msgType = EMessage.Error;
      }else if(EMessage.Warn == t){
    	 o.setIcon('TitleWarn');
         hIcon.src = o.styleIconPath('ItemWarn');
         msgType = EMessage.Warn;
      }else if(EMessage.Info == t){
    	 o.setIcon('TitleInfo');
         msgType = EMessage.Info;
         hIcon.src = o.styleIconPath('ItemInfo');
      }else if(EMessage.Fatal == t){
         msgType = EMessage.Fatal;
         hIcon.src = o.styleIconPath('ItemError');
      }
      var hc2 = hr.insertCell();
      hc2.style.textOverflow = 'ellipsis';
      hc2.style.overflow = 'hidden';
      hc2.innerText = ' ' + m;
      hc2.style.cursor = "hand";
      o.attachEvent('onItemClick', hr);
      o.attachEvent('onItemOver', hr);
      if(first){
         first = false;
      }
   }
   if(EMessage.Error == msgType){
      o.setCaption(' ' + RContext.get('FUiMessageDialog:Error'));
   }else if(EMessage.Warn == msgType){
      o.setCaption(' ' + RContext.get('FUiMessageDialog:Warn'));
   }else if(EMessage.Info == msgType){
      o.setCaption(' ' + RContext.get('FUiMessageDialog:Info'));
   }else if(EMessage.Fatal == msgType){
      o.setCaption(' ' + RContext.get('FUiMessageDialog:Fatal'));
   }
}
function FUiMessageDialog_show(){
   var o = this;
   o.__base.FUiWindow.show.call(o);
   o.panel().style.zIndex = RLayer.next(ELayer.Message);
   RWindow.moveCenter(o.panel());
   o.psMode(EMode.Update);
   RConsole.find(FFocusConsole).blur();
   RWindow.setEnable(false, true);
   o.focus();
}
function FUiMessageDialog_hide(){
   var o = this;
   o.__base.FUiWindow.hide.call(o);
   var f = o._messageArg.argument.form;
   if(RClass.isClass(f, MDataset)){
      f.psProgress(false);
   }
   RWindow.setEnable(true);
}
function FUiMessageDialog_dispose(){
   var o = this;
   o.__base.FUiWindow.dispose.call(o);
   o.hItmeForm = null;
   o.hDescBody = null;
   o.hDescDiv = null;
   o.hDescTitle = null;
   o.hItemBodyForm = null;
   o._hButtonPanel = null;
}
function FUiPopupConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd       = EScope.Local;
   o._activeControl = null;
   o.onMouseDown    = FUiPopupConsole_onMouseDown;
   o.onMouseWheel   = FUiPopupConsole_onMouseWheel;
   o.construct      = FUiPopupConsole_construct;
   o.show           = FUiPopupConsole_show;
   o.hide           = FUiPopupConsole_hide;
   o.dispose        = FUiPopupConsole_dispose;
   return o;
}
function FUiPopupConsole_onMouseDown(p){
   this.hide();
}
function FUiPopupConsole_onMouseWheel(s, e){
   this.hide();
}
function FUiPopupConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   RLogger.info(o, 'Add listener for control popup.');
   RWindow.lsnsMouseDown.register(o, o.onMouseDown);
   RWindow.lsnsMouseWheel.register(o, o.onMouseWheel);
}
function FUiPopupConsole_show(control){
   var o = this;
   o.hide();
   if(RClass.isClass(control, MUiPopup)){
      o._activeControl = control;
   }
}
function FUiPopupConsole_hide(control){
   var o = this;
   if(o._activeControl){
      var opener = o._activeControl.opener();
      opener.drop(false);
   }
   o._activeControl = null;
}
function FUiPopupConsole_dispose(){
   var o = this;
   o._activeControl = null;
   o.__base.FConsole.dispose.call(o);
}
function FUiResultConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o.scope          = EScope.Page;
   o.executeCommand = FUiResultConsole_executeCommand;
   o.checkService   = FUiResultConsole_checkService;
   return o;
}
function FUiResultConsole_executeCommand(command){
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
function FUiResultConsole_checkService(config){
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
function FUiWindowConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd      = EScope.Local;
   o._activeWindow = null;
   o._windows      = null;
   o.construct    = FUiWindowConsole_construct;
   o.create       = FUiWindowConsole_create;
   o.find         = FUiWindowConsole_find;
   return this;
}
function FUiWindowConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._windows = new TDictionary();
}
function FUiWindowConsole_create(clazz){
   var o = this;
   var instance = RClass.create(clazz);
   instance.buildDefine(RWindow._hDocument);
   return instance;
}
function FUiWindowConsole_find(clazz){
   var o = this;
   var name = RClass.name(clazz);
   var find = o._windows.get(name);
   if(find){
      return find;
   }
   var instance = o.create(clazz);
   o._windows.set(name, instance);
   return instance;
}
function FUiWindowConsole_loadDefine(name){
   if(name == null){
      return null;
   }
   var config = this.defines.find(name);
   if(config == null){
      var doc = new TXmlDocument();
      var root = doc.root();
      var action = root.create('Action');
      action.value = 'window.config.load';
      root.create('Window', 'name', name);
      var cnn = new TXmlCnn();
      var doc = cnn.syncSend('window.xml', doc);
      doc.root();
   }
   if(!config){
      return ILogger.fatal(this, 'loadDefine', 'Not find window define: ' + sWinName);
   }
   return config;
}
function FUiWindowConsole_dump(){
   var sDump = this.className;
   sDump += '\n\nDefine:\n' + this.m_oDefinePool.dump();
   sDump += '\n\nWindow:\n' + this.windowList.dump();
   return sDump;
}
function FUiWindowConsole_clear(){
   this.focusWinCtl = null;
   this._activeWindow = null;
   this.activeForm = null;
   this.activeControl = null;
   this.m_oDefinePool = new FList();
   var nSize = this.windowList.size();
   for(var n=nSize-1; n>=0; n--){
      this.windowList.value(n).release();
   }
   this.windowList = new FList();
   IEngine.process(this, this.EVENT_CLOSEALL);
}
function FUiWindowConsole_hideAll(oExpWin, bDisplay){
   var nSize = this.windowList.size();
   for(var n=nSize-1; n>=0; n--){
      var oWin = this.windowList.value(n);
      if(oWin != oExpWin){
         oWin.hide(bDisplay);
      }
   }
}
function FUiWindowConsole_setMaxWindow(oWin){
   this.maxFlag = true;
   this.hideAll(oWin);
}
function FUiWindowConsole_restore(){
   var nSize = this.windowList.size();
   this.hideAll(null, true);
   for(var n=0; n<nSize; n++){
      var oWin = this.windowList.value(n);
      if(oWin.maxFlag){
         this.windowList.value(n).restore();
      }
   }
   this.maxFlag = false;
}
function FUiWindowConsole_initialize(oCtWin){
   this.clientWindow = oCtWin;
}
function FUiWindowConsole_hasWindow(){
   return !this.windowList.isEmpty();
}
function FUiWindowConsole_focus(oWinCtl){
   this.focusWinCtl = oWinCtl;
   if(this.maxFlag){
      oWinCtl.show();
      this.hideAll(oWinCtl, true)
      oWinCtl.max();
   }
}
function FUiWindowConsole_saveDefine(oWinNode, oClientWindow){
   if(oClientWindow){this.clientWindow.document.body.disabled = true;}
   if(!oWinNode){
      return LoggerUtil.fatal(this, 'saveDefine', 'Window node is null.');
   }
   var sFullName = oWinNode.attribute('full_name');
   if(!sFullName){
      return ILogger.fatal(this, 'saveDefine', 'Window full name is null.');
   }
   var oDoc = new FXMLDocument('Config');
   var oActNode = oDoc.rootNode.createNode('Action');
   oActNode.setAttribute('name', 'define.save');
   oDoc.rootNode.push(oWinNode);
   var oConnect = new FXMLConnect(SystemManager.serviceURL('window'), oDoc);
   oConnect.clientWindow = oClientWindow;
   oConnect.onload = this.onSaveDefineAfter;
   oConnect.send();
}
function FUiWindowConsole_onEventMousedown(oCWin){
}
function FUiWindowConsole_onSaveDefineAfter(){
   ILogger.info(this, 'saveDefine', 'Save Ok.');
   if(this.clientWindow){this.clientWindow.document.body.disabled = false;}
}
function FUiWindowConsole_releaseWindowName(sWinName){
   var oWin = this.windowList.removeName(sWinName);
   IEngine.process(this, this.EVENT_CLOSE, oWin);
}
function FUiWindowConsole_releaseWindow(oWin){
   this.windowList.removeValue(oWin);
   IEngine.process(this, this.EVENT_CLOSE, oWin);
}
function FUiWindowConsole_doFrameAction(sAction){
   if(!this.activeForm){
      return ILogger.fatal(this, 'doFrameAction', 'Not active form!');
   }
   this.activeForm.doAction(sAction);
}
function FUiWindowConsole_doProperties(){
   TrackManager.push(this, 'Do properties.');
   if(!WindowManager.focusWinCtl){return;}
   var arParams = new Array();
   arParams['WindowManager'] = WindowManager;
   window.showModalDialog(SystemManager.actionURL('window'), arParams, 'dialogWidth:500px;dialogHeight:360px;resizable:no;scroll:no;edge:sunken');
}
function FUiWindowConsole_onEventRelease(oCWin){
   if(oCWin){
      var oSubWin = null;
      var oRemoves = new Array();
      var nSize = this.windowList.size();
      for(var n=0; n<nSize; n++){
         oSubWin = this.windowList.value(n);
         if(oSubWin.clientWindow == oCWin){
            if(oSubWin == MoveManager.focusBorder){
               MoveManager.focus(null);
            }
            oRemoves.push(oSubWin);
         }
      }
      for(var n=0; n<oRemoves.length; n++){
         this.windowList.removeValue(oRemoves[n]);
      }
   }else{
      this.windowList.clear();
      MoveManager.focus(null);
   }
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
