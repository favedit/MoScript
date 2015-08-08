MO.FDuiConfirmDialog = function FDuiConfirmDialog(o){
   o = MO.Class.inherits(this, o, MO.FDuiDialog, MO.MListenerResult);
   o._styleText            = MO.Class.register(o, new MO.AStyle('_styleText'));
   o._frameName            = 'system.dialog.ConfirmDialog';
   o._controlText          = null;
   o._controlConfirmButton = null;
   o._controlCancelButton  = null;
   o.onBuilded             = MO.FDuiConfirmDialog_onBuilded;
   o.onConfirmClick        = MO.FDuiConfirmDialog_onConfirmClick;
   o.onCancelClick         = MO.FDuiConfirmDialog_onCancelClick;
   o.construct             = MO.FDuiConfirmDialog_construct;
   o.setText               = MO.FDuiConfirmDialog_setText;
   o.dispose               = MO.FDuiConfirmDialog_dispose;
   return o;
}
MO.FDuiConfirmDialog_onBuilded = function FDuiConfirmDialog_onBuilded(p){
   var o = this;
   o.__base.FDuiDialog.onBuilded.call(o, p);
   o._controlText._hPanel.className = o.styleName('Text');
   o._controlConfirmButton.addClickListener(o, o.onConfirmClick);
   o._controlCancelButton.addClickListener(o, o.onCancelClick);
}
MO.FDuiConfirmDialog_onConfirmClick = function FDuiConfirmDialog_onConfirmClick(event){
   var o = this;
   var event = new MO.SEvent();
   event.sender = o;
   event.resultCd = MO.EResult.Success;
   o.processResultListener(event);
   event.dispose();
   o.hide();
}
MO.FDuiConfirmDialog_onCancelClick = function FDuiConfirmDialog_onCancelClick(event){
   var o = this;
   var event = new MO.SEvent();
   event.sender = o;
   event.resultCd = MO.EResult.Cancel;
   o.processResultListener(event);
   event.dispose();
   o.hide();
}
MO.FDuiConfirmDialog_construct = function FDuiConfirmDialog_construct(){
   var o = this;
   o.__base.FDuiDialog.construct.call(o);
}
MO.FDuiConfirmDialog_setText = function FDuiConfirmDialog_setText(value){
   this._controlText.set(value);
}
MO.FDuiConfirmDialog_dispose = function FDuiConfirmDialog_dispose(){
   var o = this;
   o.__base.FDuiDialog.dispose.call(o);
}
MO.FDuiDescribeFrameConsole = function FDuiDescribeFrameConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd       = MO.EScope.Global;
   o._service       = 'cloud.describe.frame';
   o._defines       = null;
   o.lsnsLoaded     = null;
   o.construct      = MO.FDuiDescribeFrameConsole_construct;
   o.load           = MO.FDuiDescribeFrameConsole_load;
   o.events         = null;
   o.formId         = 0;
   o.createFromName = MO.FDuiDescribeFrameConsole_createFromName;
   o.loadNode       = MO.FDuiDescribeFrameConsole_loadNode;
   o.loadService    = MO.FDuiDescribeFrameConsole_loadService;
   o.nextFormId     = MO.FDuiDescribeFrameConsole_nextFormId;
   o.get            = MO.FDuiDescribeFrameConsole_get;
   o.find           = MO.FDuiDescribeFrameConsole_find;
   o.getLov         = MO.FDuiDescribeFrameConsole_getLov;
   o.findLov        = MO.FDuiDescribeFrameConsole_findLov;
   o.getEvents      = MO.FDuiDescribeFrameConsole_getEvents;
   return o;
}
MO.FDuiDescribeFrameConsole_construct = function FDuiDescribeFrameConsole_construct(){
   var o = this;
   o._defines = new MO.TDictionary();
   o.lsnsLoaded = new MO.TListeners();
}
MO.FDuiDescribeFrameConsole_load = function FDuiDescribeFrameConsole_load(name){
   var o = this;
   var defines = o._defines;
   var xconfig = defines.get(name);
   if(xconfig){
      return xconfig;
   }
   var xdocument = new MO.TXmlDocument();
   var xroot = xdocument.root();
   xroot.set('action', 'query');
   var xframe = xroot.create('Frame');
   xframe.set('name', name);
   var url = MO.RDuiService.url(o._service);
   var xresult = MO.Console.find(MO.FXmlConsole).sendSync(url, xdocument);
   var xframes = xresult.nodes();
   var count = xframes.count();
   for(var i = 0; i < count; i++){
      var xframe = xframes.at(i);
      var frameName = xframe.get('name');
      defines.set(frameName, xframe);
   }
   var xframe = defines.get(name);
   if(!xframe){
      throw new MO.TError(o, 'Unknown frame. (name={1])', name);
   }
   return xframe;
}
MO.FDuiDescribeFrameConsole_createFromName = function FDuiDescribeFrameConsole_createFromName(name, type){
   var o = this;
   var doc = o.loadService(name, type);
   o.loadNode(doc);
   if(MO.EForm.Lov == type){
      return o.getLov(name);
   }else{
      return o.get(name);
   }
}
MO.FDuiDescribeFrameConsole_loadNode = function FDuiDescribeFrameConsole_loadNode(x){
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
MO.FDuiDescribeFrameConsole_loadService = function FDuiDescribeFrameConsole_loadService(n, t){
   var o = this;
   if(!t){
      t = MO.EForm.Form;
   }
   var doc = new MO.TXmlDocument();
   var root = doc.root();
   root.set('action', 'loadDefine');
   var f = root.create('WebForm');
   f.set('name', n);
   f.set('type', t);
   var url = MO.RDuiService.url('logic.webform');
   var doc = MO.Console.find(MO.FXmlConsole).send(url, doc);
   var r = doc.root();
   if(!MO.Console.find(MO.FMessageConsole).checkResult(new TMessageArg(r))){
      return null;
   }
   return doc;
}
MO.FDuiDescribeFrameConsole_nextFormId = function FDuiDescribeFrameConsole_nextFormId(){
   return ++this.formId;
}
MO.FDuiDescribeFrameConsole_get = function FDuiDescribeFrameConsole_get(n){
   return this._defines.get(EForm.Form).get(n);
}
MO.FDuiDescribeFrameConsole_find = function FDuiDescribeFrameConsole_find(n, t){
   var o = this;
   if(EForm.Lov == t){
      return o.findLov(n);
   }
   var fc = o.get(n);
   if(MO.Class.isMode(MO.ERun.Debug)){
      MO.Memory.free(fc);
      fc = null;
      o._defines.get(EForm.Form).set(n, null);
   }
   if(!fc){
      fc = o.createFromName(n);
   }
   return fc;
}
MO.FDuiDescribeFrameConsole_getLov = function FDuiDescribeFrameConsole_getLov(n){
   return this._defines.get(EForm.Lov).get(n);
}
MO.FDuiDescribeFrameConsole_findLov = function FDuiDescribeFrameConsole_findLov(n){
   var o = this;
   var fc = o.getLov(n);
   if(!fc){
      fc = o.createFromName(n, EForm.Lov);
   }
   return fc;
}
MO.FDuiDescribeFrameConsole_getEvents = function FDuiDescribeFrameConsole_getEvents(n){
   return this.events.get(n);
}
MO.FDuiDesktopConsole = function FDuiDesktopConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd         = MO.EScope.Local;
   o._maskVisible     = false;
   o._statusEnable    = true;
   o._loadingVisible  = false;
   o._progressVisible = false;
   o._progressBar     = null;
   o._hMaskPanel      = null;
   o._hLoadingPanel   = null;
   o._hLoadingLabel   = null;
   o.construct        = MO.FDuiDesktopConsole_construct;
   o.getMaskPanel     = MO.FDuiDesktopConsole_getMaskPanel;
   o.getProgressBar   = MO.FDuiDesktopConsole_getProgressBar;
   o.getLoadingPanel  = MO.FDuiDesktopConsole_getLoadingPanel;
   o.setMaskVisible   = MO.FDuiDesktopConsole_setMaskVisible;
   o.isEnable         = MO.FDuiDesktopConsole_isEnable;
   o.enable           = MO.FDuiDesktopConsole_enable;
   o.disable          = MO.FDuiDesktopConsole_disable;
   o.showLoading      = MO.FDuiDesktopConsole_showLoading;
   o.showUploading    = MO.FDuiDesktopConsole_showUploading;
   o.showProgress     = MO.FDuiDesktopConsole_showProgress;
   o.hide             = MO.FDuiDesktopConsole_hide;
   return o;
}
MO.FDuiDesktopConsole_construct = function FDuiDesktopConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
}
MO.FDuiDesktopConsole_getMaskPanel = function FDuiDesktopConsole_getMaskPanel(){
   var o = this;
   var hDocument = top.MO.RWindow._hDocument;
   var hPanel = o._hMaskPanel;
   if(!hPanel){
      hPanel = o._hMaskPanel = MO.Window.Builder.createTable(hDocument, 'FDuiDesktopConsole_MaskPanel');
      hPanel.style.zIndex = 5000;
      var hInnerPanel = o._hMaskInnerPanel = MO.Window.Builder.appendTableRowCell(hPanel);
      hInnerPanel.align = 'center';
      hInnerPanel.vAlign = 'middle';
   }
   return hPanel;
}
MO.FDuiDesktopConsole_getLoadingPanel = function FDuiDesktopConsole_getLoadingPanel(){
   var o = this;
   var hDocument = top.MO.RWindow._hDocument;
   var hPanel = o._hLoadingPanel;
   if(!hPanel){
      hPanel = o._hLoadingPanel = MO.Window.Builder.createTable(hDocument);
      var hCell = MO.Window.Builder.appendTableRowCell(hPanel);
      var hIcon = o._hLoadingIcon = MO.Window.Builder.appendIcon(hCell);
      hIcon.src = MO.RResource.iconPath('control.RWindow_Loading');
      var hCell = o._hLoadingLabel = MO.Window.Builder.appendTableRowCell(hPanel);
      hCell.align = 'center';
      hCell.style.color = '#FFFFFF';
   }
   return hPanel;
}
MO.FDuiDesktopConsole_getProgressBar = function FDuiDesktopConsole_getProgressBar(){
   var o = this;
   var progressBar = o._progressBar;
   if(!progressBar){
      progressBar = o._progressBar = MO.Class.create(FDuiProgressBar);
      progressBar.build(top.MO.Window._hDocument);
   }
   return progressBar;
}
MO.FDuiDesktopConsole_setMaskVisible = function FDuiDesktopConsole_setMaskVisible(visible){
   var o = this;
   if(o._maskVisible != visible){
      var hDocument = top.MO.Window._hDocument;
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
MO.FDuiDesktopConsole_isEnable = function FDuiDesktopConsole_isEnable(){
   return this._statusEnable;
}
MO.FDuiDesktopConsole_enable = function FDuiDesktopConsole_enable(){
   var o = this;
   o._disableDeep--;
   if(o._disableDeep == 0){
      o.setEnable(true);
   }
}
MO.FDuiDesktopConsole_disable = function FDuiDesktopConsole_disable(){
   var o = this;
   if(o._disableDeep == 0){
      o.setEnable(false);
   }
   o._disableDeep++;
}
MO.FDuiDesktopConsole_showLoading = function FDuiDesktopConsole_showLoading(){
   var o = this;
   o.setMaskVisible(true);
   if(!o._loadingVisible){
      var hLoadingPanel = o.getLoadingPanel();
      MO.Window.Html.textSet(o._hLoadingLabel, '正在努力加载中，请稍等 ...');
      o._hMaskInnerPanel.appendChild(hLoadingPanel);
      o._loadingVisible = true;
   }
}
MO.FDuiDesktopConsole_showUploading = function FDuiDesktopConsole_showUploading(){
   var o = this;
   o.setMaskVisible(true);
   if(!o._loadingVisible){
      var hLoadingPanel = o.getLoadingPanel();
      MO.Window.Html.textSet(o._hLoadingLabel, '正在努力上传中，请稍等 ...');
      o._hMaskInnerPanel.appendChild(hLoadingPanel);
      o._loadingVisible = true;
   }
}
MO.FDuiDesktopConsole_showProgress = function FDuiDesktopConsole_showProgress(rate){
   var o = this;
   o.setMaskVisible(true);
   if(!o._progressVisible){
      var hMaskPanel = o.getMaskPanel();
      var progressBar = o.getProgressBar();
      hMaskPanel.appendChild(progressBar._hPanel);
      o._progressVisible = true;
   }
}
MO.FDuiDesktopConsole_hide = function FDuiDesktopConsole_hide(){
   var o = this;
   if(o._loadingVisible){
      var hLoadingPanel = o.getLoadingPanel();
      o._hMaskInnerPanel.removeChild(hLoadingPanel);
      o._loadingVisible  = false;
   }
   o.setMaskVisible(false);
}
MO.FDuiEditorConsole = function FDuiEditorConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd     = MO.EScope.Local;
   o._hoverEditor = null;
   o._focusEditor = null;
   o._editors     = null;
   o.construct    = MO.FDuiEditorConsole_construct;
   o.makeName     = MO.FDuiEditorConsole_makeName;
   o.enter        = MO.FDuiEditorConsole_enter;
   o.leave        = MO.FDuiEditorConsole_leave;
   o.focus        = MO.FDuiEditorConsole_focus;
   o.blur         = MO.FDuiEditorConsole_blur;
   o.lost         = MO.FDuiEditorConsole_lost;
   return o;
}
MO.FDuiEditorConsole_construct = function FDuiEditorConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._editors = new MO.TDictionary();
}
MO.FDuiEditorConsole_makeName = function FDuiEditorConsole_makeName(cls, name){
   return name ? name + '@' + MO.Class.name(cls) : MO.Class.name(cls);
}
MO.FDuiEditorConsole_enter = function FDuiEditorConsole_enter(editable, cls){
   var name = MO.Class.name(cls);
   var editor = this._hoverEditors.get(name);
   if(!editor){
      editor = MO.Class.create(cls);
      editor.psBuild();
      this._hoverEditors.set(name, editor);
   }
   this._hoverEditor = editor;
   editor.editable = editable;
   editor.show();
   return editor;
}
MO.FDuiEditorConsole_leave = function FDuiEditorConsole_leave(editor){
   var o = this;
   if(o._hoverEditor != o._focusEditor){
      editor = MO.Lang.Object.nvl(editor, o._hoverEditor);
      o._hoverEditor = null;
      RLog.debug(o, 'Leave {1}', MO.Class.dump(editor));
   }
}
MO.FDuiEditorConsole_focus = function FDuiEditorConsole_focus(c, n, l){
   var o = this;
   var name = o.makeName(n, l);
   var e = o._editors.get(l);
   if(!e){
      e = MO.Class.create(n);
      e.build(c._hPanel);
      o._editors.set(l, e);
   }
   MO.Logger.debug(o, 'Focus editor {1} (editable={2}, name={3})', MO.Class.dump(e), MO.Class.dump(c), l);
   e.reset();
   if(MO.Class.isClass(e, MO.FDuiDropEditor)){
      e.linkControl(c);
      o._focusEditor = e;
   }
   return e;
}
MO.FDuiEditorConsole_blur = function FDuiEditorConsole_blur(editor){
   var o = this;
   if(o._focusEditor){
      MO.Logger.debug(o, 'Blur editor {1}', MO.Class.dump(editor));
      editor = MO.Lang.Object.nvl(editor, o._focusEditor);
      if(editor){
         editor.onEditEnd();
      }
      o._focusEditor = null;
   }
}
MO.FDuiEditorConsole_lost = function FDuiEditorConsole_lost(e){
   var o = this;
   o.leave(e);
   o.blur(e);
}
MO.FDuiEnvironmentConsole = function FDuiEnvironmentConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o.scope       = MO.EScope.Local;
   o.environment = null;
   o.connect     = MO.FDuiEnvironmentConsole_connect;
   o.build       = MO.FDuiEnvironmentConsole_build;
   o.buildValue  = MO.FDuiEnvironmentConsole_buildValue;
   o.load        = MO.FDuiEnvironmentConsole_load;
   o.xml         = MO.FDuiEnvironmentConsole_xml;
   return o;
}
MO.FDuiEnvironmentConsole_connect = function FDuiEnvironmentConsole_connect(){
}
MO.FDuiEnvironmentConsole_build = function FDuiEnvironmentConsole_build(config){
   var o = this;
   if(!o.environment){
      o.connect()
   }
   if(o.environment){
      var node = config.create('Environment');
      node.attributes().append(this.environment.attributes());
   }
}
MO.FDuiEnvironmentConsole_buildValue = function FDuiEnvironmentConsole_buildValue(){
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
MO.FDuiEnvironmentConsole_load = function FDuiEnvironmentConsole_load(p){
   this.environment = RXml.makeNode(p);
}
MO.FDuiEnvironmentConsole_xml = function FDuiEnvironmentConsole_xml(){
   if(!this.environment){
      this.connect()
   }
   if(this.environment){
      return this.environment.xml();
   }
   return null;
}
MO.FDuiErrorDialog = function FDuiErrorDialog(o){
   o = MO.Class.inherits(this, o, MO.FDuiDialog, MO.MListenerResult);
   o._styleText            = MO.Class.register(o, new MO.AStyle('_styleText'));
   o._frameName            = 'system.dialog.ErrorDialog';
   o._controlText          = null;
   o._controlConfirmButton = null;
   o._controlCancelButton  = null;
   o.onBuilded             = MO.FDuiErrorDialog_onBuilded;
   o.onConfirmClick        = MO.FDuiErrorDialog_onConfirmClick;
   o.construct             = MO.FDuiErrorDialog_construct;
   o.setCode               = MO.FDuiErrorDialog_setCode;
   o.setDescription        = MO.FDuiErrorDialog_setDescription;
   o.dispose               = MO.FDuiErrorDialog_dispose;
   return o;
}
MO.FDuiErrorDialog_onBuilded = function FDuiErrorDialog_onBuilded(p){
   var o = this;
   o.__base.FDuiDialog.onBuilded.call(o, p);
   o._controlConfirm.addClickListener(o, o.onConfirmClick);
}
MO.FDuiErrorDialog_onConfirmClick = function FDuiErrorDialog_onConfirmClick(event){
   var o = this;
   var event = new MO.SEvent();
   event.sender = o;
   event.resultCd = MO.EResult.Success;
   o.processResultListener(event);
   event.dispose();
   o.hide();
}
MO.FDuiErrorDialog_construct = function FDuiErrorDialog_construct(){
   var o = this;
   o.__base.FDuiDialog.construct.call(o);
}
MO.FDuiErrorDialog_setCode = function FDuiErrorDialog_setCode(value){
   this._controlCode.set(value);
}
MO.FDuiErrorDialog_setDescription = function FDuiErrorDialog_setDescription(value){
   this._controlDescription.set(value);
}
MO.FDuiErrorDialog_dispose = function FDuiErrorDialog_dispose(){
   var o = this;
   o.__base.FDuiDialog.dispose.call(o);
}
MO.FDuiFocusConsole = function FDuiFocusConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o.scope              = MO.EScope.Page;
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
   o.onMouseDown        = MO.FDuiFocusConsole_onMouseDown;
   o.onMouseWheel       = MO.FDuiFocusConsole_onMouseWheel;
   o.construct          = MO.FDuiFocusConsole_construct;
   o.enter              = MO.FDuiFocusConsole_enter;
   o.leave              = MO.FDuiFocusConsole_leave;
   o.isFocus            = MO.FDuiFocusConsole_isFocus;
   o.focus              = MO.FDuiFocusConsole_focus;
   o.blur               = MO.FDuiFocusConsole_blur;
   o.findClass          = MO.FDuiFocusConsole_findClass;
   o.focusClass         = MO.FDuiFocusConsole_focusClass;
   o.focusHtml          = MO.FDuiFocusConsole_focusHtml;
   o.lockBlur           = MO.FDuiFocusConsole_lockBlur;
   o.unlockBlur         = MO.FDuiFocusConsole_unlockBlur;
   o.storeFocus         = MO.FDuiFocusConsole_storeFocus;
   o.restoreFocus       = MO.FDuiFocusConsole_restoreFocus;
   o.dispose            = MO.FDuiFocusConsole_dispose;
   return o;
}
MO.FDuiFocusConsole_onMouseDown = function FDuiFocusConsole_onMouseDown(p){
   this.focusHtml(p.hSource);
}
MO.FDuiFocusConsole_onMouseWheel = function FDuiFocusConsole_onMouseWheel(s, e){
   var o = this;
}
MO.FDuiFocusConsole_construct = function FDuiFocusConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._focusClasses = new Object();
   o.lsnsFocus = new MO.TListeners();
   o.lsnsBlur = new MO.TListeners();
   o.lsnsFocusClass = new MO.TListeners();
   MO.Logger.info(o, 'Add listener for window mouse down and wheel.');
   MO.Window.lsnsMouseDown.register(o, o.onMouseDown);
   MO.Window.lsnsMouseWheel.register(o, o.onMouseWheel);
}
MO.FDuiFocusConsole_enter = function FDuiFocusConsole_enter(c){
   var o = this;
   if(MO.Class.isClass(c, MO.MDuiContainer)){
      o._hoverContainer = c;
   }else{
      o._hoverControl = c;
   }
}
MO.FDuiFocusConsole_leave = function FDuiFocusConsole_leave(c){
   var o = this;
   if(o._hoverContainer == c){
      o._hoverContainer = null;
   }
   if(o._hoverControl == c){
      o._hoverControl = null;
   }
}
MO.FDuiFocusConsole_isFocus = function FDuiFocusConsole_isFocus(c){
   return (this._focusControl == c);
}
MO.FDuiFocusConsole_focus = function FDuiFocusConsole_focus(c, e){
   var o = this;
   if(!MO.Class.isClass(c, MO.MDuiFocus)){
      return;
   }
   var f = o._focusControl;
   if(f == c){
      return;
   }
   var bc = o._blurControl;
   if(bc != f){
      if(o._blurAble && f && f.testBlur(c)){
         MO.Logger.debug(o, 'Blur focus control. (name={1}, instance={2})', f.name, MO.Class.dump(f));
         o._blurControl = f;
         f.doBlur(e);
         o.lsnsBlur.process(f);
      }
   }
   if(o._focusAble){
      MO.Logger.debug(o, 'Focus control. (name={1}, instance={2})', c.name, MO.Class.dump(c));
      c.doFocus(e);
      o._focusControl = o._activeControl = c;
      o.lsnsFocus.process(c);
   }
}
MO.FDuiFocusConsole_blur = function FDuiFocusConsole_blur(c, e){
   var o = this;
   var fc = o._focusControl;
   var bc = o._blurControl;
   if(fc && c && !fc.testBlur(c)){
      return;
   }
   if(bc != c && MO.Class.isClass(c, MO.MDuiFocus)){
      MO.Logger.debug(o, 'Blur control. (name={1}, instance={2})', c.name, MO.Class.dump(c));
      o._blurControl = c;
      c.doBlur(e);
   }
   if(fc){
      MO.Logger.debug(o, 'Blur focus control. (name={1}, instance={2})', fc.name, MO.Class.dump(fc));
      fc.doBlur(e);
      o._focusControl = null;
   }
}
MO.FDuiFocusConsole_findClass = function FDuiFocusConsole_findClass(c){
   var o = this;
   var n = MO.Class.name(c);
   if(o._focusClasses[n]){
      return o._focusClasses[n];
   }
   var p = o._activeControl;
   if(MO.Class.isClass(p, MO.FEditor)){
      p = p.source;
   }
   if(p){
      return p.topControl(c);
   }
}
MO.FDuiFocusConsole_focusClass = function FDuiFocusConsole_focusClass(c, p){
   var o = this;
   var n = MO.Class.name(c);
   if(o._focusClasses[n] != p){
      o._focusClasses[n] = p;
      MO.Logger.debug(o, 'Focus class. (name={1}, class={2})', n, MO.Class.dump(p));
      o.lsnsFocusClass.process(p, c);
   }
}
MO.FDuiFocusConsole_focusHtml = function FDuiFocusConsole_focusHtml(p){
   var o = this;
   var c = MO.Window.Html.searchLinker(p, MO.FDuiControl);
   MO.Logger.debug(o, 'Focus html control. (control={1}, element={2})', MO.Class.dump(c), p.tagName);
   if(c){
      if(o._focusControl != c){
         o.blur(c, p);
      }
   }else{
      o.blur(null, p);
   }
}
MO.FDuiFocusConsole_lockBlur = function FDuiFocusConsole_lockBlur(){
   this._blurAble = false;
}
MO.FDuiFocusConsole_unlockBlur = function FDuiFocusConsole_unlockBlur(){
   this._blurAble = true;
}
MO.FDuiFocusConsole_storeFocus = function FDuiFocusConsole_storeFocus(){
   var o = this;
   o._storeControl = o._focusControl;
}
MO.FDuiFocusConsole_restoreFocus = function FDuiFocusConsole_restoreFocus(){
   var o = this;
   if(o._storeControl){
      o._storeControl.focus();
      o._storeControl = null;
   }
}
MO.FDuiFocusConsole_dispose = function FDuiFocusConsole_dispose(){
   var o = this;
   o.__base.FConsole.dispose.call(o);
   o._focusClasses = null;
}
MO.FDuiFrameConsole = function FDuiFrameConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd         = MO.EScope.Local;
   o._frames          = null;
   o.construct        = MO.FDuiFrameConsole_construct;
   o.create           = MO.FDuiFrameConsole_create;
   o.find             = MO.FDuiFrameConsole_find;
   o.findByClass      = MO.FDuiFrameConsole_findByClass;
   o.get              = MO.FDuiFrameConsole_get;
   return o;
}
MO.FDuiFrameConsole_construct = function FDuiFrameConsole_construct(){
   var o = this;
   o._frames = new MO.TMap();
}
MO.FDuiFrameConsole_create = function FDuiFrameConsole_create(c, n){
   var o = this;
   var dc = MO.Console.find(MO.FUiFrameDefineConsole);
   var x = dc.load(n);
   var f = MO.RDuiControl.build(null, x, null, c._hPanel);
   return f;
}
MO.FDuiFrameConsole_find = function FDuiFrameConsole_find(n){
   return this._frames.get(n);
}
MO.FDuiFrameConsole_findByClass = function FDuiFrameConsole_findByClass(control, clazz){
   var o = this;
   var className = MO.Class.name(clazz);
   var frames = o._frames;
   var instance = frames.get(className);
   if(!instance){
      instance = MO.Class.create(clazz);
      instance.buildDefine(control._hPanel);
      frames.set(className, instance);
   }
   return instance;
}
MO.FDuiFrameConsole_get = function FDuiFrameConsole_get(control, name, hPanel){
   var o = this;
   var frames = o._frames;
   var frame = frames.get(name);
   if(!frame){
      frame = o.create(control, name);
      if(hPanel){
         frame.setPanel(hPanel);
      }
      frames.set(name, frame);
   }
   return frame;
}
MO.FDuiFrameConsole_hiddenAll = function FDuiFrameConsole_hiddenAll(){
   var o = this;
   var fs = o._frames;
   var fc = fs.count;
   for(var n=0; n<fc; n++){
      fs.value(n).setVisible(false);
   }
}
MO.FDuiFrameConsole_onProcessLoaded = function FDuiFrameConsole_onProcessLoaded(e){
   var o = this;
   var r = e.document.root();
   var g = e.argument;
   if(!e.messageChecked){
      var m = new MO.TMessageArg();
      m.argument = g;
      m.form = g.form;
      m.config = r;
      m.invokeCaller = new MO.TInvoke(o, o.onLoaded);
      m.invokeParam = e;
      m.event = e;
      if(!MO.Console.find(MO.FMessageConsole).checkResult(m)){
         return;
      }
   }
   var g = e.argument;
   var fn = r.find('Form');
   if(fn){
      var ds = MO.RDataset.make(fn);
      g.resultDataset = ds;
      g.resultRow = ds.rows.get(0);
   }
   g.invoke();
}
MO.FDuiFrameConsole_process = function FDuiFrameConsole_process(g){
   var o = this;
   var doc = new MO.TXmlDocument();
   var root = doc.root();
   root.set('action', 'process');
   if(g.checked){
      root.set('checked', g.checked);
   }
   root.push(g.toNode());
   var e = new MO.TEvent(o, EXmlEvent.Send, o.onProcessLoaded);
   e.url = MO.RService.url(MO.Lang.String.nvl(g.url, 'logic.webform'));
   e.action = MO.EDataAction.Process;
   e.argument = g;
   e.document = doc;
   MO.Console.find(MO.FXmlConsole).process(e);
}
MO.FDuiFrameConsole_loadEvents = function FDuiFrameConsole_loadEvents(cfg){
}
MO.FDuiFrameConsole_processEvent = function FDuiFrameConsole_processEvent(e){
   var o = this;
   var es = o.events;
   if(es.isEmpty()){
      return;
   }
   var se = e.source;
   if(MO.Class.isClass(se, FControl)){
      var p = se.topControl();
      if(p){
         var s = MO.Lang.String.nvl(e.name, e.handle) + '@' + se.name + '@' + p.name;
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
MO.FDuiFrameConsole_free = function FDuiFrameConsole_free(f){
   f.setVisible(false);
   this._freeFrames.push(f);
}
MO.FDuiFrameConsole_dispose = function FDuiFrameConsole_dispose(){
   var o = this;
   MO.Memory.free(o._frames);
   MO.Memory.free(o._formIds);
   MO.Memory.free(o._framesLoaded);
   o._frames = null;
   o._formIds = null;
   o._framesLoaded = null;
}
MO.FDuiFrameEventConsole = function FDuiFrameEventConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd   = MO.EScope.Local;
   o._thread    = null;
   o._interval  = 20;
   o._allow     = true;
   o._allows    = new MO.TAttributes();
   o._events    = new MO.TObjects();
   o._listeners = new MO.TAttributes();
   o.onProcess  = MO.FDuiFrameEventConsole_onProcess;
   o.construct  = MO.FDuiFrameEventConsole_construct;
   o.register   = MO.FDuiFrameEventConsole_register;
   o.push       = MO.FDuiFrameEventConsole_push;
   o.clear      = MO.FDuiFrameEventConsole_clear;
   return o;
}
MO.FDuiFrameEventConsole_onProcess = function FDuiFrameEventConsole_onProcess(){
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
               var ls = o._listeners.get(MO.Method.name(e));
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
MO.FDuiFrameEventConsole_construct = function FDuiFrameEventConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   var t = o._thread = MO.Class.create(MO.FThread);
   t.setInterval(o._interval);
   t.addProcessListener(o, o.onProcess);
   MO.Console.find(MO.FThreadConsole).start(t);
   MO.Logger.debug(o, 'Add event thread. (thread={1})', MO.Class.dump(t));
}
MO.FDuiFrameEventConsole_register = function FDuiFrameEventConsole_register(po, pc){
   this._events.push(new MO.TEvent(po, null, pc));
}
MO.FDuiFrameEventConsole_push = function FDuiFrameEventConsole_push(e){
   var o = this;
   var n = MO.Class.name(e)
   if(o._allow){
      var a = true;
      if(o._allows.contains(n)){
         a = MO.Lang.Boolean.isTrue(o._allows.get(n));
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
MO.FDuiFrameEventConsole_clear = function FDuiFrameEventConsole_clear(){
   this._events.clear();
}
MO.FDuiFrameEventConsole_add = function FDuiFrameEventConsole_add(owner, proc){
   this._events.push(new MO.TEvent(owner, null, proc));
}
MO.FDuiFrameEventConsole_allowEvent = function FDuiFrameEventConsole_allowEvent(c){
   this._allows.set(MO.Method.name(c), EBool.True);
}
MO.FDuiFrameEventConsole_skipEvent = function FDuiFrameEventConsole_skipEvent(c){
   this._allows.set(MO.Method.name(c), EBool.False);
}
MO.FDuiFrameEventConsole_allowAll = function FDuiFrameEventConsole_allowAll(){
   this._allow = true;
}
MO.FDuiFrameEventConsole_skipAll = function FDuiFrameEventConsole_skipAll(){
   this._allow = false;
}
MO.FDuiFrameEventConsole_onlyCall = function FDuiFrameEventConsole_onlyCall(c, m){
   var o = this;
   o._allow = false;
   m.call(c);
   o._allow = true;
}
MO.FDuiInfoDialog = function FDuiInfoDialog(o){
   o = MO.Class.inherits(this, o, MO.FDuiDialog, MO.MListenerResult);
   o._styleText            = MO.Class.register(o, new MO.AStyle('_styleText'));
   o._frameName            = 'system.dialog.InfoDialog';
   o._controlText          = null;
   o._controlConfirmButton = null;
   o._controlCancelButton  = null;
   o.onBuilded             = MO.FDuiInfoDialog_onBuilded;
   o.onConfirmClick        = MO.FDuiInfoDialog_onConfirmClick;
   o.construct             = MO.FDuiInfoDialog_construct;
   o.setText               = MO.FDuiInfoDialog_setText;
   o.dispose               = MO.FDuiInfoDialog_dispose;
   return o;
}
MO.FDuiInfoDialog_onBuilded = function FDuiInfoDialog_onBuilded(p){
   var o = this;
   o.__base.FDuiDialog.onBuilded.call(o, p);
   o._controlText._hPanel.className = o.styleName('Text');
   o._controlConfirmButton.addClickListener(o, o.onConfirmClick);
}
MO.FDuiInfoDialog_onConfirmClick = function FDuiInfoDialog_onConfirmClick(event){
   var o = this;
   var event = new MO.SEvent();
   event.sender = o;
   event.resultCd = MO.EResult.Success;
   o.processResultListener(event);
   event.dispose();
   o.hide();
}
MO.FDuiInfoDialog_construct = function FDuiInfoDialog_construct(){
   var o = this;
   o.__base.FDuiDialog.construct.call(o);
}
MO.FDuiInfoDialog_setText = function FDuiInfoDialog_setText(value){
   this._controlText.set(value);
}
MO.FDuiInfoDialog_dispose = function FDuiInfoDialog_dispose(){
   var o = this;
   o.__base.FDuiDialog.dispose.call(o);
}
MO.FDuiKeyConsole = function FDuiKeyConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd        = EScope.Local;
   o._enable         = true;
   o._enableRegister = true;
   o._listeners      = new Object();
   o._disableKeys    = new Object();
   o.onKeyDown       = MO.FDuiKeyConsole_onKeyDown;
   o.construct       = MO.FDuiKeyConsole_construct;
   o.enable          = MO.FDuiKeyConsole_enable;
   o.disable         = MO.FDuiKeyConsole_disable;
   o.enableRegister  = MO.FDuiKeyConsole_enableRegister;
   o.disableRegister = MO.FDuiKeyConsole_disableRegister;
   o.register        = MO.FDuiKeyConsole_register;
   return o;
}
MO.FDuiKeyConsole_onKeyDown = function FDuiKeyConsole_onKeyDown(e){
   var o = this;
   var k = MO.REnum.tryDecode(MO.EKeyCode, e.keyCode);
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
MO.FDuiKeyConsole_construct = function FDuiKeyConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   MO.Window.lsnsKeyDown.register(o, o.onKeyDown);
}
MO.FDuiKeyConsole_enable = function FDuiKeyConsole_enable(){
   this._enable = true;
}
MO.FDuiKeyConsole_disable = function FDuiKeyConsole_disable(){
   this._enable = false;
}
MO.FDuiKeyConsole_enableRegister = function FDuiKeyConsole_enableRegister(){
   this._enableRegister = true;
}
MO.FDuiKeyConsole_disableRegister = function FDuiKeyConsole_disableRegister(){
   this._enableRegister = false;
}
MO.FDuiKeyConsole_register = function FDuiKeyConsole_register(k, w, p){
   var o = this;
   if(o._enableRegister){
      if(MO.Lang.Integer.isInteger(k)){
         k = MO.REnum.decode(EKeyCode, k);
      }
      var ks = o._listeners;
      var s = ks[k];
      if(!s){
         s = ks[k] = new MO.TListeners();
      }
      s.clear();
      s.register(w, p);
   }
}
MO.FDuiMessageConsole = function FDuiMessageConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole, MO.MDuiStyle);
   o._scopeCd       = MO.EScope.Global;
   o._result        = new Array();
   o._attributes    = new Array();
   o._messageBox    = null;
   o._messageWindow = null;
   o.showInfo       = MO.FDuiMessageConsole_showInfo;
   o.showConfirm    = MO.FDuiMessageConsole_showConfirm;
   o.showError      = MO.FDuiMessageConsole_showError;
   o.popup          = MO.FDuiMessageConsole_popup;
   o.close          = MO.FDuiMessageConsole_close;
   o.parse          = MO.FDuiMessageConsole_parse;
   o.check          = MO.FDuiMessageConsole_check;
   return o;
}
MO.FDuiMessageConsole_showInfo = function FDuiMessageConsole_showInfo(text){
   var dialog = MO.Console.find(MO.FDuiWindowConsole).find(MO.FDuiInfoDialog);
   dialog.clearResultListeners();
   dialog.setText(text);
   dialog.showPosition(MO.EUiPosition.Center);
   return dialog;
}
MO.FDuiMessageConsole_showConfirm = function FDuiMessageConsole_showConfirm(text){
   var dialog = MO.Console.find(MO.FDuiWindowConsole).find(MO.FDuiConfirmDialog);
   dialog.clearResultListeners();
   dialog.setText(text);
   dialog.showPosition(MO.EUiPosition.Center);
   return dialog;
}
MO.FDuiMessageConsole_showError = function FDuiMessageConsole_showError(code, message, description){
   var dialog = MO.Console.find(MO.FDuiWindowConsole).find(MO.FDuiErrorDialog);
   dialog.clearResultListeners();
   dialog.setCode(message);
   dialog.setDescription(description);
   dialog.showPosition(MO.EUiPosition.Center);
   return dialog;
}
MO.FDuiMessageConsole_popup = function FDuiMessageConsole_popup(g){
   var o = this;
   var w = o._messageWindow;
   if(!w){
      w = o._messageWindow = RControl.create(FUiMessageWindow);
   }
   w.loadMessages(g);
   w.show();
}
MO.FDuiMessageConsole_close = function FDuiMessageConsole_close(){
   RWindow.setEnable(true);
}
MO.FDuiMessageConsole_parse = function FDuiMessageConsole_parse(config){
   var msgs = null;
   var msgsNode = config.find('Messages');
   if(msgsNode && msgsNode.nodes && msgsNode.nodes.count){
      msgs = new MO.TMessages();
      for(var n=0; n<msgsNode.nodes.count; n++){
         var node = msgsNode.node(n);
         var msg = new TMessage();
         msg.loadConfig(msgsNode.node(n));
         msgs.push(msg);
      }
   }
   return msgs;
}
MO.FDuiMessageConsole_check = function FDuiMessageConsole_check(g){
   var o = this;
   var ms = g.messages = o.parse(g.config);
   if(ms){
      var m = ms.message(MO.EMessage.Fatal);
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
MO.FDuiMessageDialog = function FDuiMessageDialog(o){
   o = MO.Class.inherits(this, o, MO.FDuiWindow);
   o._styleMsgPanel     = MO.Class.register(o, new MO.AStyle('_styleMsgPanel'));
   o._styleButtonPanel  = MO.Class.register(o, new MO.AStyle('_styleButtonPanel'));
   o._styleItmeForm     = MO.Class.register(o, new MO.AStyle('_styleItmeForm'));
   o._styleItemTitle    = MO.Class.register(o, new MO.AStyle('_styleItemTitle'));
   o._styleItemBodyForm = MO.Class.register(o, new MO.AStyle('_styleItemBodyForm'));
   o._styleRowItem      = MO.Class.register(o, new MO.AStyle('_styleRowItem'));
   o._styleDescForm     = MO.Class.register(o, new MO.AStyle('_styleDescForm'));
   o._styleDescTitle    = MO.Class.register(o, new MO.AStyle('_styleDescTitle'));
   o._styleDescBody     = MO.Class.register(o, new MO.AStyle('_styleDescBody'));
   o._type              = null;
   o._isDialog          = false;
   o._titleBlur         = false;
   o._messageArg        = null;
   o._hMessagePanel     = null;
   o._hMessages         = null;
   o._hDescription      = null;
   o._hButtonPanel      = null;
   o._hBlank            = null;
   o.onBuild            = MO.FDuiMessageDialog_onBuild;
   o.onItemOver         = MO.Class.register(o, new MO.AEventMouseOver('onItemOver'), MO.FDuiMessageDialog_onItemOver);
   o.onItemClick        = MO.Class.register(o, new MO.AEventClick('onItemClick'), MO.FDuiMessageDialog_onItemClick);
   o.onDescClick        = MO.Class.register(o, new MO.AEventClick('onDescClick'), MO.FDuiMessageDialog_onDescClick);
   o.onBuildMessages    = MO.FDuiMessageDialog_onBuildMessages;
   o.onBuildButtons     = MO.FDuiMessageDialog_onBuildButtons;
   o.onOk               = MO.FDuiMessageDialog_onOk;
   o.onCancel           = MO.FDuiMessageDialog_onCancel;
   o.onClose            = MO.FDuiMessageDialog_onClose;
   o.loadMessages       = MO.FDuiMessageDialog_loadMessages;
   o.show               = MO.FDuiMessageDialog_show;
   o.hide               = MO.FDuiMessageDialog_hide;
   o.dispose            = MO.FDuiMessageDialog_dispose;
   return o;
}
MO.FDuiMessageDialog_onBuild = function FDuiMessageDialog_onBuild(event){
   var o = this;
   o.__base.FDuiWindow.oeBuild.call(o, e);
   o.setIcon('Icon');
   var hTab = MO.RBuilder.appendTable(o.hBodyPanel, 0, 0, 0);
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
   MO.Console.find(FKeyConsole).register(MO.EKey.Esc, new MO.TListener(o, o.onClose));
   return r;
}
MO.FDuiMessageDialog_onItemOver = function FDuiMessageDialog_onItemOver(e){
   var o = this;
   var hf = o.hItemBodyForm;
   var h = e.hSource;
}
MO.FDuiMessageDialog_onItemClick = function FDuiMessageDialog_onItemClick(e){
   var o = this;
   var hf = o.hItemBodyForm;
   for(var n = 0; n < hf.rows.count; n++){
   }
   var h = e.hSource;
   var idx = h.rowIndex;
}
MO.FDuiMessageDialog_onDescClick = function FDuiMessageDialog_onDescClick(e){
   var o = this;
}
MO.FDuiMessageDialog_onBuildMessages = function FDuiMessageDialog_onBuildMessages(){
   var o = this;
   if(!o._type){
      var hTab1 = o.hItmeForm = MO.RBuilder.appendTable(o.hTitlePanel);
      hTab1.style.height = "100%";
      hTab1.style.width = "100%";
      hTab1.style.vAlign = "top";
      var hItemTitle = o.hItemTitle = hTab1.insertRow().insertCell();
      hItemTitle.height = 25;
      var h = MO.RBuilder.appendTable(hItemTitle);
      h.height = '100%';
      h.width = '100%';
      h.style.backgroundColor = "#F5F5F5";
      var hr = h.insertRow();
      var hc1 = hr.insertCell();
      hc1.width = '20';
      var hTitleIcon = MO.RBuilder.appendIcon(hc1, null, null, 16, 14);
      hTitleIcon.style.paddingLeft = 20;
      hTitleIcon.src = o.styleIconPath('TitleIcon');
      var hc2 = hr.insertCell();
      hc2.innerText = ' '+ MO.Context.get('FDuiMessageDialog:MessageContext');
      var hItemBody  = o.hItemBody = hTab1.insertRow().insertCell();
      hItemBody.height = 100;
      o.hItemBody.style.borderBottom = '2 solid #F5F5F5';
      hItemBody.style.padding = '5';
      hItemBody.vAlign = "top";
      var hDiv = MO.RBuilder.appendDiv(hItemBody);
      hDiv.style.height = '100px';
      hDiv.style.overflow = "auto";
      var hItemBodyForm = o.hItemBodyForm = MO.RBuilder.appendTable(hDiv);
      hItemBodyForm.style.border = '2px solid #FFFFFF';
      hItemBodyForm.width = "100%";
      hItemBodyForm.style.vAlign = "top";
      var hTab2 = o.hDescForm = MO.RBuilder.appendTable(o.hMsgPanel);
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
MO.FDuiMessageDialog_onBuildButtons = function FDuiMessageDialog_onBuildButtons(t){
   var o = this;
   if(!o._type){
      var hBtnTab = MO.Window.Builder.appendTable(o._hButtonPanel, null, 0, 0, 2);
      var hRow = hBtnTab.insertRow();
      var hc = o._hBlank = hRow.insertCell();
      hc.width='72%';
      var b = o.btnOk = MO.Class.create(MO.FButton);
      b.icon = 'tool.ok';
      b.label = RContext.get('FToolButton:ok');
      b.width = '100%';
      b.lsnsClick.register(o, o.onOk);
      var hoc = hRow.insertCell();
      hoc.style.align='right';
      hoc.width='15%';
      b.psBuild(hoc);
      var b = o.btnCancel = MO.Class.create(MO.FButton);
      b.icon = 'tool.cancel';
      b.label = MO.RContext.get('FToolButton:cancel');
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
MO.FDuiMessageDialog_onOk = function FDuiMessageDialog_onOk(){
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
MO.FDuiMessageDialog_onCancel = function FDuiMessageDialog_onCancel(){
   this.hide();
}
MO.FDuiMessageDialog_onClose = function FDuiMessageDialog_onClose(){
   this.hide();
}
MO.FDuiMessageDialog_loadMessages = function FDuiMessageDialog_loadMessages(g){
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
      var hIcon =  MO.Window.Builder.appendIcon(hc1, null, n, 16, 16);
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
      o.setCaption(' ' + RContext.get('FDuiMessageDialog:Error'));
   }else if(EMessage.Warn == msgType){
      o.setCaption(' ' + RContext.get('FDuiMessageDialog:Warn'));
   }else if(EMessage.Info == msgType){
      o.setCaption(' ' + RContext.get('FDuiMessageDialog:Info'));
   }else if(EMessage.Fatal == msgType){
      o.setCaption(' ' + RContext.get('FDuiMessageDialog:Fatal'));
   }
}
MO.FDuiMessageDialog_show = function FDuiMessageDialog_show(){
   var o = this;
   o.__base.FDuiWindow.show.call(o);
   o.panel().style.zIndex = RLayer.next(ELayer.Message);
   RWindow.moveCenter(o.panel());
   o.psMode(EMode.Update);
   RConsole.find(FFocusConsole).blur();
   RWindow.setEnable(false, true);
   o.focus();
}
MO.FDuiMessageDialog_hide = function FDuiMessageDialog_hide(){
   var o = this;
   o.__base.FDuiWindow.hide.call(o);
   var f = o._messageArg.argument.form;
   if(RClass.isClass(f, MDataset)){
      f.psProgress(false);
   }
   RWindow.setEnable(true);
}
MO.FDuiMessageDialog_dispose = function FDuiMessageDialog_dispose(){
   var o = this;
   o.__base.FDuiWindow.dispose.call(o);
   o.hItmeForm = null;
   o.hDescBody = null;
   o.hDescDiv = null;
   o.hDescTitle = null;
   o.hItemBodyForm = null;
   o._hButtonPanel = null;
}
MO.FDuiPopupConsole = function FDuiPopupConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd       = MO.EScope.Local;
   o._activeControl = null;
   o.onMouseDown    = MO.FDuiPopupConsole_onMouseDown;
   o.onMouseWheel   = MO.FDuiPopupConsole_onMouseWheel;
   o.construct      = MO.FDuiPopupConsole_construct;
   o.show           = MO.FDuiPopupConsole_show;
   o.hide           = MO.FDuiPopupConsole_hide;
   o.dispose        = MO.FDuiPopupConsole_dispose;
   return o;
}
MO.FDuiPopupConsole_onMouseDown = function FDuiPopupConsole_onMouseDown(p){
   this.hide();
}
MO.FDuiPopupConsole_onMouseWheel = function FDuiPopupConsole_onMouseWheel(s, e){
   this.hide();
}
MO.FDuiPopupConsole_construct = function FDuiPopupConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   MO.Logger.info(o, 'Add listener for control popup.');
   MO.Window.lsnsMouseDown.register(o, o.onMouseDown);
   MO.Window.lsnsMouseWheel.register(o, o.onMouseWheel);
}
MO.FDuiPopupConsole_show = function FDuiPopupConsole_show(control){
   var o = this;
   o.hide();
   if(MO.Class.isClass(control, MO.MDuiPopup)){
      o._activeControl = control;
   }
}
MO.FDuiPopupConsole_hide = function FDuiPopupConsole_hide(control){
   var o = this;
   if(o._activeControl){
      var opener = o._activeControl.opener();
      opener.drop(false);
   }
   o._activeControl = null;
}
MO.FDuiPopupConsole_dispose = function FDuiPopupConsole_dispose(){
   var o = this;
   o._activeControl = null;
   o.__base.FConsole.dispose.call(o);
}
MO.FDuiResultConsole = function FDuiResultConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o.scope          = MO.EScope.Page;
   o.executeCommand = MO.FDuiResultConsole_executeCommand;
   o.checkService   = MO.FDuiResultConsole_checkService;
   o.checkEvent     = MO.FDuiResultConsole_checkEvent;
   return o;
}
MO.FDuiResultConsole_executeCommand = function FDuiResultConsole_executeCommand(command){
   var name = command.get('name');
   if(EResultCommand.TreeReload == name){
      var tv = MO.RGlobal.get('catalog.tree');
      if(tv){
         tv.reload();
      }
   }else if(EResultCommand.TreeNodeRefresh == name){
      var tv = MO.RGlobal.get('catalog.tree');
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
      var tv = MO.RGlobal.get('catalog.tree');
      if(tv){
         var fn = tv.focusNode;
         if(fn){
            tv.reloadNode(fn.parentNode);
         }
      }
   }else if(EResultCommand.PageRedirect == name){
      var action = command.get('action');
      var page = top.MO.RContext.context(command.get('page'));
      if(action){
         page += '?do=' + action;
      }
      fmMain.action = page;
      fmMain.target = '';
      fmMain.submit();
   }
}
MO.FDuiResultConsole_checkService = function FDuiResultConsole_checkService(config){
   var o = this;
   if(config){
      if(!MO.Console.find(MO.FMessageConsole).checkResult(new MO.TMessageArg(config))){
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
      MO.Console.find(MO.FFocusConsole).restoreFocus();
   }
   return true;
}
MO.FDuiResultConsole_checkEvent = function FDuiResultConsole_checkEvent(event){
   var o = this;
   var xconfig = event.root;
   if(xconfig){
      var resultCd = xconfig.get('result_cd');
      if(resultCd == 'success'){
         return true;
      }
      var messageCd = xconfig.get('message_cd');
      var xmessages = xconfig.find('Messages');
      if(xmessages){
         var count = xmessages.nodeCount();
         for(var i = 0; i < count; i++){
            var xmessage = xmessages.node(i);
            if(xmessage.isName('Message')){
               var code = xmessage.get('code');
               var message = xmessage.get('message');
               var description = xmessage.get('description');
               MO.Console.find(MO.FDuiMessageConsole).showError(code, message, description);
               return false;
            }
         }
      }
   }
   return true;
}
MO.FDuiWindowConsole = function FDuiWindowConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd      = MO.EScope.Local;
   o._activeWindow = null;
   o._windows      = null;
   o.construct    = MO.FDuiWindowConsole_construct;
   o.create       = MO.FDuiWindowConsole_create;
   o.find         = MO.FDuiWindowConsole_find;
   return this;
}
MO.FDuiWindowConsole_construct = function FDuiWindowConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._windows = new MO.TDictionary();
}
MO.FDuiWindowConsole_create = function FDuiWindowConsole_create(clazz){
   var o = this;
   var instance = MO.Class.create(clazz);
   instance.buildDefine(MO.Window._hDocument);
   return instance;
}
MO.FDuiWindowConsole_find = function FDuiWindowConsole_find(clazz){
   var o = this;
   var name = MO.Class.name(clazz);
   var find = o._windows.get(name);
   if(find){
      return find;
   }
   var instance = o.create(clazz);
   o._windows.set(name, instance);
   return instance;
}
MO.FDuiWindowConsole_loadDefine = function FDuiWindowConsole_loadDefine(name){
   if(name == null){
      return null;
   }
   var config = this.defines.find(name);
   if(config == null){
      var doc = new MO.TXmlDocument();
      var root = doc.root();
      var action = root.create('Action');
      action.value = 'window.config.load';
      root.create('Window', 'name', name);
      var cnn = new MO.TXmlCnn();
      var doc = cnn.syncSend('window.xml', doc);
      doc.root();
   }
   if(!config){
      return MO.Logger.fatal(this, 'loadDefine', 'Not find window define: ' + sWinName);
   }
   return config;
}
MO.FDuiWindowConsole_dump = function FDuiWindowConsole_dump(){
   var sDump = this.className;
   sDump += '\n\nDefine:\n' + this.m_oDefinePool.dump();
   sDump += '\n\nWindow:\n' + this.windowList.dump();
   return sDump;
}
MO.FDuiWindowConsole_clear = function FDuiWindowConsole_clear(){
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
MO.FDuiWindowConsole_hideAll = function FDuiWindowConsole_hideAll(oExpWin, bDisplay){
   var nSize = this.windowList.size();
   for(var n=nSize-1; n>=0; n--){
      var oWin = this.windowList.value(n);
      if(oWin != oExpWin){
         oWin.hide(bDisplay);
      }
   }
}
MO.FDuiWindowConsole_setMaxWindow = function FDuiWindowConsole_setMaxWindow(oWin){
   this.maxFlag = true;
   this.hideAll(oWin);
}
MO.FDuiWindowConsole_restore = function FDuiWindowConsole_restore(){
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
MO.FDuiWindowConsole_initialize = function FDuiWindowConsole_initialize(oCtWin){
   this.clientWindow = oCtWin;
}
MO.FDuiWindowConsole_hasWindow = function FDuiWindowConsole_hasWindow(){
   return !this.windowList.isEmpty();
}
MO.FDuiWindowConsole_focus = function FDuiWindowConsole_focus(oWinCtl){
   this.focusWinCtl = oWinCtl;
   if(this.maxFlag){
      oWinCtl.show();
      this.hideAll(oWinCtl, true)
      oWinCtl.max();
   }
}
MO.FDuiWindowConsole_saveDefine = function FDuiWindowConsole_saveDefine(oWinNode, oClientWindow){
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
MO.FDuiWindowConsole_onEventMousedown = function FDuiWindowConsole_onEventMousedown(oCWin){
}
MO.FDuiWindowConsole_onSaveDefineAfter = function FDuiWindowConsole_onSaveDefineAfter(){
   ILogger.info(this, 'saveDefine', 'Save Ok.');
   if(this.clientWindow){this.clientWindow.document.body.disabled = false;}
}
MO.FDuiWindowConsole_releaseWindowName = function FDuiWindowConsole_releaseWindowName(sWinName){
   var oWin = this.windowList.removeName(sWinName);
   IEngine.process(this, this.EVENT_CLOSE, oWin);
}
MO.FDuiWindowConsole_releaseWindow = function FDuiWindowConsole_releaseWindow(oWin){
   this.windowList.removeValue(oWin);
   IEngine.process(this, this.EVENT_CLOSE, oWin);
}
MO.FDuiWindowConsole_doFrameAction = function FDuiWindowConsole_doFrameAction(sAction){
   if(!this.activeForm){
      return ILogger.fatal(this, 'doFrameAction', 'Not active form!');
   }
   this.activeForm.doAction(sAction);
}
MO.FDuiWindowConsole_doProperties = function FDuiWindowConsole_doProperties(){
   TrackManager.push(this, 'Do properties.');
   if(!WindowManager.focusWinCtl){return;}
   var arParams = new Array();
   arParams['WindowManager'] = WindowManager;
   window.showModalDialog(SystemManager.actionURL('window'), arParams, 'dialogWidth:500px;dialogHeight:360px;resizable:no;scroll:no;edge:sunken');
}
MO.FDuiWindowConsole_onEventRelease = function FDuiWindowConsole_onEventRelease(oCWin){
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
MO.FDuiWorkspaceApplication = function FDuiWorkspaceApplication(o){
   o = MO.Class.inherits(this, o, MO.FApplication);
   o._workspaces      = MO.Class.register(o, new MO.AGetter('_workspaces'));
   o._activeWorkspace = MO.Class.register(o, new MO.AGetter('_activeWorkspace'));
   o.onProcess        = MO.FDuiWorkspaceApplication_onProcess;
   o.selectWorkspace  = MO.FDuiWorkspaceApplication_selectWorkspace;
   o.processResize    = MO.FDuiWorkspaceApplication_processResize;
   o.processEvent     = MO.FDuiWorkspaceApplication_processEvent;
   return o;
}
MO.FDuiWorkspaceApplication_onProcess = function FDuiWorkspaceApplication_onProcess(){
   var o = this;
   var workspace = o._activeWorkspace
   if(workspace){
      workspace.psFrame();
   }
}
MO.FDuiWorkspaceApplication_selectWorkspace = function FDuiWorkspaceApplication_selectWorkspace(clazz){
   var o = this;
   var workspace = o._activeWorkspace = MO.Class.create(clazz);
   return workspace;
}
MO.FDuiWorkspaceApplication_processResize = function FDuiWorkspaceApplication_processResize(){
   var o = this;
}
MO.FDuiWorkspaceApplication_processEvent = function FDuiWorkspaceApplication_processEvent(event){
   var o = this;
}
MO.FDuiWorkspaceConsole = function FDuiWorkspaceConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd         = MO.EScope.Local;
   o._activeWorkspace = null;
   o._workspaces      = null;
   o._thread          = null;
   o._interval        = 100;
   o.onResize         = MO.FDuiWorkspaceConsole_onResize;
   o.onProcess        = MO.FDuiWorkspaceConsole_onProcess;
   o.construct        = MO.FDuiWorkspaceConsole_construct;
   o.active           = MO.FDuiWorkspaceConsole_active;
   o.resize           = MO.FDuiWorkspaceConsole_resize;
   o.dispose          = MO.FDuiWorkspaceConsole_dispose;
   return o;
}
MO.FDuiWorkspaceConsole_onResize = function FDuiWorkspaceConsole_onResize(p){
   var o = this;
   var workspace = o._activeWorkspace;
   if(workspace){
      workspace.psResize();
   }
}
MO.FDuiWorkspaceConsole_onProcess = function FDuiWorkspaceConsole_onProcess(event){
   var o = this;
   var workspace = o._activeWorkspace;
   if(workspace){
      workspace.psFrame(event);
   }
}
MO.FDuiWorkspaceConsole_construct = function FDuiWorkspaceConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._workspaces = new MO.TDictionary();
   var thread = o._thread = MO.Class.create(MO.FThread);
   thread.setInterval(o._interval);
   thread.addProcessListener(o, o.onProcess);
   MO.Console.find(MO.FThreadConsole).start(thread);
   MO.RWindow.lsnsResize.register(o, o.onResize);
}
MO.FDuiWorkspaceConsole_active = function FDuiWorkspaceConsole_active(p){
   this._activeWorkspace = p;
}
MO.FDuiWorkspaceConsole_resize = function FDuiWorkspaceConsole_resize(){
   this.onResize();
}
MO.FDuiWorkspaceConsole_dispose = function FDuiWorkspaceConsole_dispose(){
   var o = this;
   o.__base.FConsole.dispose.call(o);
}
