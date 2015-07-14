with(MO){
   MO.FUiConfirmDialog = function FUiConfirmDialog(o){
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
   MO.FUiConfirmDialog_onBuilded = function FUiConfirmDialog_onBuilded(p){
      var o = this;
      o.__base.FUiDialog.onBuilded.call(o, p);
      o._controlText._hPanel.className = o.styleName('Text');
      o._controlConfirmButton.addClickListener(o, o.onConfirmClick);
      o._controlCancelButton.addClickListener(o, o.onCancelClick);
   }
   MO.FUiConfirmDialog_onConfirmClick = function FUiConfirmDialog_onConfirmClick(event){
      var o = this;
      var event = new SEvent();
      event.sender = o;
      event.resultCd = EResult.Success;
      o.processResultListener(event);
      event.dispose();
      o.hide();
   }
   MO.FUiConfirmDialog_onCancelClick = function FUiConfirmDialog_onCancelClick(event){
      var o = this;
      var event = new SEvent();
      event.sender = o;
      event.resultCd = EResult.Cancel;
      o.processResultListener(event);
      event.dispose();
      o.hide();
   }
   MO.FUiConfirmDialog_construct = function FUiConfirmDialog_construct(){
      var o = this;
      o.__base.FUiDialog.construct.call(o);
   }
   MO.FUiConfirmDialog_setText = function FUiConfirmDialog_setText(value){
      this._controlText.set(value);
   }
   MO.FUiConfirmDialog_dispose = function FUiConfirmDialog_dispose(){
      var o = this;
      o.__base.FUiDialog.dispose.call(o);
   }
}
with(MO){
   MO.FUiDescribeFrameConsole = function FUiDescribeFrameConsole(o){
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
   MO.FUiDescribeFrameConsole_construct = function FUiDescribeFrameConsole_construct(){
      var o = this;
      o._defines = new TDictionary();
      o.lsnsLoaded = new TListeners();
   }
   MO.FUiDescribeFrameConsole_load = function FUiDescribeFrameConsole_load(name){
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
   MO.FUiDescribeFrameConsole_createFromName = function FUiDescribeFrameConsole_createFromName(name, type){
      var o = this;
      var doc = o.loadService(name, type);
      o.loadNode(doc);
      if(EForm.Lov == type){
         return o.getLov(name);
      }else{
         return o.get(name);
      }
   }
   MO.FUiDescribeFrameConsole_loadNode = function FUiDescribeFrameConsole_loadNode(x){
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
   MO.FUiDescribeFrameConsole_loadService = function FUiDescribeFrameConsole_loadService(n, t){
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
   MO.FUiDescribeFrameConsole_nextFormId = function FUiDescribeFrameConsole_nextFormId(){
      return ++this.formId;
   }
   MO.FUiDescribeFrameConsole_get = function FUiDescribeFrameConsole_get(n){
      return this._defines.get(EForm.Form).get(n);
   }
   MO.FUiDescribeFrameConsole_find = function FUiDescribeFrameConsole_find(n, t){
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
   MO.FUiDescribeFrameConsole_getLov = function FUiDescribeFrameConsole_getLov(n){
      return this._defines.get(EForm.Lov).get(n);
   }
   MO.FUiDescribeFrameConsole_findLov = function FUiDescribeFrameConsole_findLov(n){
      var o = this;
      var fc = o.getLov(n);
      if(!fc){
         fc = o.createFromName(n, EForm.Lov);
      }
      return fc;
   }
   MO.FUiDescribeFrameConsole_getEvents = function FUiDescribeFrameConsole_getEvents(n){
      return this.events.get(n);
   }
}
with(MO){
   MO.FUiDesktopConsole = function FUiDesktopConsole(o){
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
   MO.FUiDesktopConsole_construct = function FUiDesktopConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
   }
   MO.FUiDesktopConsole_getMaskPanel = function FUiDesktopConsole_getMaskPanel(){
      var o = this;
      var hDocument = top.MO.RWindow._hDocument;
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
   MO.FUiDesktopConsole_getLoadingPanel = function FUiDesktopConsole_getLoadingPanel(){
      var o = this;
      var hDocument = top.MO.RWindow._hDocument;
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
   MO.FUiDesktopConsole_getProgressBar = function FUiDesktopConsole_getProgressBar(){
      var o = this;
      var progressBar = o._progressBar;
      if(!progressBar){
         progressBar = o._progressBar = RClass.create(FUiProgressBar);
         progressBar.build(top.MO.RWindow._hDocument);
      }
      return progressBar;
   }
   MO.FUiDesktopConsole_setMaskVisible = function FUiDesktopConsole_setMaskVisible(visible){
      var o = this;
      if(o._maskVisible != visible){
         var hDocument = top.MO.RWindow._hDocument;
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
   MO.FUiDesktopConsole_isEnable = function FUiDesktopConsole_isEnable(){
      return this._statusEnable;
   }
   MO.FUiDesktopConsole_enable = function FUiDesktopConsole_enable(){
      var o = this;
      o._disableDeep--;
      if(o._disableDeep == 0){
         o.setEnable(true);
      }
   }
   MO.FUiDesktopConsole_disable = function FUiDesktopConsole_disable(){
      var o = this;
      if(o._disableDeep == 0){
         o.setEnable(false);
      }
      o._disableDeep++;
   }
   MO.FUiDesktopConsole_showLoading = function FUiDesktopConsole_showLoading(){
      var o = this;
      o.setMaskVisible(true);
      if(!o._loadingVisible){
         var hLoadingPanel = o.getLoadingPanel();
         RHtml.textSet(o._hLoadingLabel, '正在努力加载中，请稍等 ...');
         o._hMaskInnerPanel.appendChild(hLoadingPanel);
         o._loadingVisible = true;
      }
   }
   MO.FUiDesktopConsole_showUploading = function FUiDesktopConsole_showUploading(){
      var o = this;
      o.setMaskVisible(true);
      if(!o._loadingVisible){
         var hLoadingPanel = o.getLoadingPanel();
         RHtml.textSet(o._hLoadingLabel, '正在努力上传中，请稍等 ...');
         o._hMaskInnerPanel.appendChild(hLoadingPanel);
         o._loadingVisible = true;
      }
   }
   MO.FUiDesktopConsole_showProgress = function FUiDesktopConsole_showProgress(rate){
      var o = this;
      o.setMaskVisible(true);
      if(!o._progressVisible){
         var hMaskPanel = o.getMaskPanel();
         var progressBar = o.getProgressBar();
         hMaskPanel.appendChild(progressBar._hPanel);
         o._progressVisible = true;
      }
   }
   MO.FUiDesktopConsole_hide = function FUiDesktopConsole_hide(){
      var o = this;
      if(o._loadingVisible){
         var hLoadingPanel = o.getLoadingPanel();
         o._hMaskInnerPanel.removeChild(hLoadingPanel);
         o._loadingVisible  = false;
      }
      o.setMaskVisible(false);
   }
}
with(MO){
   MO.FUiEditorConsole = function FUiEditorConsole(o){
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
   MO.FUiEditorConsole_construct = function FUiEditorConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._editors = new TDictionary();
   }
   MO.FUiEditorConsole_makeName = function FUiEditorConsole_makeName(cls, name){
      return name ? name + '@' + RClass.name(cls) : RClass.name(cls);
   }
   MO.FUiEditorConsole_enter = function FUiEditorConsole_enter(editable, cls){
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
   MO.FUiEditorConsole_leave = function FUiEditorConsole_leave(editor){
      var o = this;
      if(o._hoverEditor != o._focusEditor){
         editor = RObject.nvl(editor, o._hoverEditor);
         o._hoverEditor = null;
         RLog.debug(o, 'Leave {1}', RClass.dump(editor));
      }
   }
   MO.FUiEditorConsole_focus = function FUiEditorConsole_focus(c, n, l){
      var o = this;
      var name = o.makeName(n, l);
      var e = o._editors.get(l);
      if(!e){
         e = RClass.create(n);
         e.build(c._hPanel);
         o._editors.set(l, e);
      }
      MO.Logger.debug(o, 'Focus editor {1} (editable={2}, name={3})', RClass.dump(e), RClass.dump(c), l);
      e.reset();
      if(RClass.isClass(e, FUiDropEditor)){
         e.linkControl(c);
         o._focusEditor = e;
      }
      return e;
   }
   MO.FUiEditorConsole_blur = function FUiEditorConsole_blur(editor){
      var o = this;
      if(o._focusEditor){
         MO.Logger.debug(o, 'Blur editor {1}', RClass.dump(editor));
         editor = RObject.nvl(editor, o._focusEditor);
         if(editor){
            editor.onEditEnd();
         }
         o._focusEditor = null;
      }
   }
   MO.FUiEditorConsole_lost = function FUiEditorConsole_lost(e){
      var o = this;
      o.leave(e);
      o.blur(e);
   }
}
with(MO){
   MO.FUiEnvironmentConsole = function FUiEnvironmentConsole(o){
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
   MO.FUiEnvironmentConsole_connect = function FUiEnvironmentConsole_connect(){
   }
   MO.FUiEnvironmentConsole_build = function FUiEnvironmentConsole_build(config){
      var o = this;
      if(!o.environment){
         o.connect()
      }
      if(o.environment){
         var node = config.create('Environment');
         node.attributes().append(this.environment.attributes());
      }
   }
   MO.FUiEnvironmentConsole_buildValue = function FUiEnvironmentConsole_buildValue(){
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
   MO.FUiEnvironmentConsole_load = function FUiEnvironmentConsole_load(p){
      this.environment = RXml.makeNode(p);
   }
   MO.FUiEnvironmentConsole_xml = function FUiEnvironmentConsole_xml(){
      if(!this.environment){
         this.connect()
      }
      if(this.environment){
         return this.environment.xml();
      }
      return null;
   }
}
with(MO){
   MO.FUiErrorDialog = function FUiErrorDialog(o){
      o = RClass.inherits(this, o, FUiDialog, MListenerResult);
      o._styleText            = RClass.register(o, new AStyle('_styleText'));
      o._frameName            = 'system.dialog.ErrorDialog';
      o._controlText          = null;
      o._controlConfirmButton = null;
      o._controlCancelButton  = null;
      o.onBuilded             = FUiErrorDialog_onBuilded;
      o.onConfirmClick        = FUiErrorDialog_onConfirmClick;
      o.construct             = FUiErrorDialog_construct;
      o.setCode               = FUiErrorDialog_setCode;
      o.setDescription        = FUiErrorDialog_setDescription;
      o.dispose               = FUiErrorDialog_dispose;
      return o;
   }
   MO.FUiErrorDialog_onBuilded = function FUiErrorDialog_onBuilded(p){
      var o = this;
      o.__base.FUiDialog.onBuilded.call(o, p);
      o._controlConfirm.addClickListener(o, o.onConfirmClick);
   }
   MO.FUiErrorDialog_onConfirmClick = function FUiErrorDialog_onConfirmClick(event){
      var o = this;
      var event = new SEvent();
      event.sender = o;
      event.resultCd = EResult.Success;
      o.processResultListener(event);
      event.dispose();
      o.hide();
   }
   MO.FUiErrorDialog_construct = function FUiErrorDialog_construct(){
      var o = this;
      o.__base.FUiDialog.construct.call(o);
   }
   MO.FUiErrorDialog_setCode = function FUiErrorDialog_setCode(value){
      this._controlCode.set(value);
   }
   MO.FUiErrorDialog_setDescription = function FUiErrorDialog_setDescription(value){
      this._controlDescription.set(value);
   }
   MO.FUiErrorDialog_dispose = function FUiErrorDialog_dispose(){
      var o = this;
      o.__base.FUiDialog.dispose.call(o);
   }
}
with(MO){
   MO.FUiFocusConsole = function FUiFocusConsole(o){
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
   MO.FUiFocusConsole_onMouseDown = function FUiFocusConsole_onMouseDown(p){
      this.focusHtml(p.hSource);
   }
   MO.FUiFocusConsole_onMouseWheel = function FUiFocusConsole_onMouseWheel(s, e){
      var o = this;
   }
   MO.FUiFocusConsole_construct = function FUiFocusConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._focusClasses = new Object();
      o.lsnsFocus = new TListeners();
      o.lsnsBlur = new TListeners();
      o.lsnsFocusClass = new TListeners();
      MO.Logger.info(o, 'Add listener for window mouse down and wheel.');
      RWindow.lsnsMouseDown.register(o, o.onMouseDown);
      RWindow.lsnsMouseWheel.register(o, o.onMouseWheel);
   }
   MO.FUiFocusConsole_enter = function FUiFocusConsole_enter(c){
      var o = this;
      if(RClass.isClass(c, MUiContainer)){
         o._hoverContainer = c;
      }else{
         o._hoverControl = c;
      }
   }
   MO.FUiFocusConsole_leave = function FUiFocusConsole_leave(c){
      var o = this;
      if(o._hoverContainer == c){
         o._hoverContainer = null;
      }
      if(o._hoverControl == c){
         o._hoverControl = null;
      }
   }
   MO.FUiFocusConsole_isFocus = function FUiFocusConsole_isFocus(c){
      return (this._focusControl == c);
   }
   MO.FUiFocusConsole_focus = function FUiFocusConsole_focus(c, e){
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
            MO.Logger.debug(o, 'Blur focus control. (name={1}, instance={2})', f.name, RClass.dump(f));
            o._blurControl = f;
            f.doBlur(e);
            o.lsnsBlur.process(f);
         }
      }
      if(o._focusAble){
         MO.Logger.debug(o, 'Focus control. (name={1}, instance={2})', c.name, RClass.dump(c));
         c.doFocus(e);
         o._focusControl = o._activeControl = c;
         o.lsnsFocus.process(c);
      }
   }
   MO.FUiFocusConsole_blur = function FUiFocusConsole_blur(c, e){
      var o = this;
      var fc = o._focusControl;
      var bc = o._blurControl;
      if(fc && c && !fc.testBlur(c)){
         return;
      }
      if(bc != c && RClass.isClass(c, MUiFocus)){
         MO.Logger.debug(o, 'Blur control. (name={1}, instance={2})', c.name, RClass.dump(c));
         o._blurControl = c;
         c.doBlur(e);
      }
      if(fc){
         MO.Logger.debug(o, 'Blur focus control. (name={1}, instance={2})', fc.name, RClass.dump(fc));
         fc.doBlur(e);
         o._focusControl = null;
      }
   }
   MO.FUiFocusConsole_findClass = function FUiFocusConsole_findClass(c){
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
   MO.FUiFocusConsole_focusClass = function FUiFocusConsole_focusClass(c, p){
      var o = this;
      var n = RClass.name(c);
      if(o._focusClasses[n] != p){
         o._focusClasses[n] = p;
         MO.Logger.debug(o, 'Focus class. (name={1}, class={2})', n, RClass.dump(p));
         o.lsnsFocusClass.process(p, c);
      }
   }
   MO.FUiFocusConsole_focusHtml = function FUiFocusConsole_focusHtml(p){
      var o = this;
      var c = RHtml.searchLinker(p, FUiControl);
      MO.Logger.debug(o, 'Focus html control. (control={1}, element={2})', RClass.dump(c), p.tagName);
      if(c){
         if(o._focusControl != c){
            o.blur(c, p);
         }
      }else{
         o.blur(null, p);
      }
   }
   MO.FUiFocusConsole_lockBlur = function FUiFocusConsole_lockBlur(){
      this._blurAble = false;
   }
   MO.FUiFocusConsole_unlockBlur = function FUiFocusConsole_unlockBlur(){
      this._blurAble = true;
   }
   MO.FUiFocusConsole_storeFocus = function FUiFocusConsole_storeFocus(){
      var o = this;
      o._storeControl = o._focusControl;
   }
   MO.FUiFocusConsole_restoreFocus = function FUiFocusConsole_restoreFocus(){
      var o = this;
      if(o._storeControl){
         o._storeControl.focus();
         o._storeControl = null;
      }
   }
   MO.FUiFocusConsole_dispose = function FUiFocusConsole_dispose(){
      var o = this;
      o.__base.FConsole.dispose.call(o);
      o._focusClasses = null;
   }
}
with(MO){
   MO.FUiFrameConsole = function FUiFrameConsole(o){
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
   MO.FUiFrameConsole_construct = function FUiFrameConsole_construct(){
      var o = this;
      o._frames = new TMap();
   }
   MO.FUiFrameConsole_create = function FUiFrameConsole_create(c, n){
      var o = this;
      var dc = RConsole.find(FUiDescribeFrameConsole);
      var x = dc.load(n);
      var f = RUiControl.build(null, x, null, c._hPanel);
      return f;
   }
   MO.FUiFrameConsole_find = function FUiFrameConsole_find(n){
      return this._frames.get(n);
   }
   MO.FUiFrameConsole_findByClass = function FUiFrameConsole_findByClass(control, clazz){
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
   MO.FUiFrameConsole_get = function FUiFrameConsole_get(c, n, h){
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
   MO.FUiFrameConsole_hiddenAll = function FUiFrameConsole_hiddenAll(){
      var o = this;
      var fs = o._frames;
      var fc = fs.count;
      for(var n=0; n<fc; n++){
         fs.value(n).setVisible(false);
      }
   }
   MO.FUiFrameConsole_onProcessLoaded = function FUiFrameConsole_onProcessLoaded(e){
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
   MO.FUiFrameConsole_process = function FUiFrameConsole_process(g){
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
   MO.FUiFrameConsole_loadEvents = function FUiFrameConsole_loadEvents(cfg){
   }
   MO.FUiFrameConsole_processEvent = function FUiFrameConsole_processEvent(e){
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
   MO.FUiFrameConsole_free = function FUiFrameConsole_free(f){
      f.setVisible(false);
      this._freeFrames.push(f);
   }
   MO.FUiFrameConsole_dispose = function FUiFrameConsole_dispose(){
      var o = this;
      RMemory.free(o._frames);
      RMemory.free(o._formIds);
      RMemory.free(o._framesLoaded);
      o._frames = null;
      o._formIds = null;
      o._framesLoaded = null;
   }
}
with(MO){
   MO.FUiFrameEventConsole = function FUiFrameEventConsole(o){
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
   MO.FUiFrameEventConsole_onProcess = function FUiFrameEventConsole_onProcess(){
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
   MO.FUiFrameEventConsole_construct = function FUiFrameEventConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      var t = o._thread = RClass.create(FThread);
      t.setInterval(o._interval);
      t.addProcessListener(o, o.onProcess);
      RConsole.find(FThreadConsole).start(t);
      MO.Logger.debug(o, 'Add event thread. (thread={1})', RClass.dump(t));
   }
   MO.FUiFrameEventConsole_register = function FUiFrameEventConsole_register(po, pc){
      this._events.push(new TEvent(po, null, pc));
   }
   MO.FUiFrameEventConsole_push = function FUiFrameEventConsole_push(e){
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
   MO.FUiFrameEventConsole_clear = function FUiFrameEventConsole_clear(){
      this._events.clear();
   }
   MO.FUiFrameEventConsole_add = function FUiFrameEventConsole_add(owner, proc){
      this._events.push(new TEvent(owner, null, proc));
   }
   MO.FUiFrameEventConsole_allowEvent = function FUiFrameEventConsole_allowEvent(c){
      this._allows.set(RMethod.name(c), EBool.True);
   }
   MO.FUiFrameEventConsole_skipEvent = function FUiFrameEventConsole_skipEvent(c){
      this._allows.set(RMethod.name(c), EBool.False);
   }
   MO.FUiFrameEventConsole_allowAll = function FUiFrameEventConsole_allowAll(){
      this._allow = true;
   }
   MO.FUiFrameEventConsole_skipAll = function FUiFrameEventConsole_skipAll(){
      this._allow = false;
   }
   MO.FUiFrameEventConsole_onlyCall = function FUiFrameEventConsole_onlyCall(c, m){
      var o = this;
      o._allow = false;
      m.call(c);
      o._allow = true;
   }
}
with(MO){
   MO.FUiInfoDialog = function FUiInfoDialog(o){
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
   MO.FUiInfoDialog_onBuilded = function FUiInfoDialog_onBuilded(p){
      var o = this;
      o.__base.FUiDialog.onBuilded.call(o, p);
      o._controlText._hPanel.className = o.styleName('Text');
      o._controlConfirmButton.addClickListener(o, o.onConfirmClick);
   }
   MO.FUiInfoDialog_onConfirmClick = function FUiInfoDialog_onConfirmClick(event){
      var o = this;
      var event = new SEvent();
      event.sender = o;
      event.resultCd = EResult.Success;
      o.processResultListener(event);
      event.dispose();
      o.hide();
   }
   MO.FUiInfoDialog_construct = function FUiInfoDialog_construct(){
      var o = this;
      o.__base.FUiDialog.construct.call(o);
   }
   MO.FUiInfoDialog_setText = function FUiInfoDialog_setText(value){
      this._controlText.set(value);
   }
   MO.FUiInfoDialog_dispose = function FUiInfoDialog_dispose(){
      var o = this;
      o.__base.FUiDialog.dispose.call(o);
   }
}
with(MO){
   MO.FUiKeyConsole = function FUiKeyConsole(o){
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
   MO.FUiKeyConsole_onKeyDown = function FUiKeyConsole_onKeyDown(e){
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
   MO.FUiKeyConsole_construct = function FUiKeyConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      RWindow.lsnsKeyDown.register(o, o.onKeyDown);
   }
   MO.FUiKeyConsole_enable = function FUiKeyConsole_enable(){
      this._enable = true;
   }
   MO.FUiKeyConsole_disable = function FUiKeyConsole_disable(){
      this._enable = false;
   }
   MO.FUiKeyConsole_enableRegister = function FUiKeyConsole_enableRegister(){
      this._enableRegister = true;
   }
   MO.FUiKeyConsole_disableRegister = function FUiKeyConsole_disableRegister(){
      this._enableRegister = false;
   }
   MO.FUiKeyConsole_register = function FUiKeyConsole_register(k, w, p){
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
}
with(MO){
   MO.FUiMessageConsole = function FUiMessageConsole(o){
      o = RClass.inherits(this, o, FConsole, MUiStyle);
      o._scopeCd       = EScope.Global;
      o._result        = new Array();
      o._attributes    = new Array();
      o._messageBox    = null;
      o._messageWindow = null;
      o.showInfo       = FUiMessageConsole_showInfo;
      o.showConfirm    = FUiMessageConsole_showConfirm;
      o.showError      = FUiMessageConsole_showError;
      o.popup          = FUiMessageConsole_popup;
      o.close          = FUiMessageConsole_close;
      o.parse          = FUiMessageConsole_parse;
      o.check          = FUiMessageConsole_check;
      return o;
   }
   MO.FUiMessageConsole_showInfo = function FUiMessageConsole_showInfo(text){
      var dialog = RConsole.find(FUiWindowConsole).find(FUiInfoDialog);
      dialog.clearResultListeners();
      dialog.setText(text);
      dialog.showPosition(EUiPosition.Center);
      return dialog;
   }
   MO.FUiMessageConsole_showConfirm = function FUiMessageConsole_showConfirm(text){
      var dialog = RConsole.find(FUiWindowConsole).find(FUiConfirmDialog);
      dialog.clearResultListeners();
      dialog.setText(text);
      dialog.showPosition(EUiPosition.Center);
      return dialog;
   }
   MO.FUiMessageConsole_showError = function FUiMessageConsole_showError(code, message, description){
      var dialog = RConsole.find(FUiWindowConsole).find(FUiErrorDialog);
      dialog.clearResultListeners();
      dialog.setCode(message);
      dialog.setDescription(description);
      dialog.showPosition(EUiPosition.Center);
      return dialog;
   }
   MO.FUiMessageConsole_popup = function FUiMessageConsole_popup(g){
      var o = this;
      var w = o._messageWindow;
      if(!w){
         w = o._messageWindow = RControl.create(FUiMessageWindow);
      }
      w.loadMessages(g);
      w.show();
   }
   MO.FUiMessageConsole_close = function FUiMessageConsole_close(){
      RWindow.setEnable(true);
   }
   MO.FUiMessageConsole_parse = function FUiMessageConsole_parse(config){
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
   MO.FUiMessageConsole_check = function FUiMessageConsole_check(g){
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
}
with(MO){
   MO.FUiMessageDialog = function FUiMessageDialog(o){
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
   MO.FUiMessageDialog_onBuild = function FUiMessageDialog_onBuild(event){
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
   MO.FUiMessageDialog_onItemOver = function FUiMessageDialog_onItemOver(e){
      var o = this;
      var hf = o.hItemBodyForm;
      var h = e.hSource;
   }
   MO.FUiMessageDialog_onItemClick = function FUiMessageDialog_onItemClick(e){
      var o = this;
      var hf = o.hItemBodyForm;
      for(var n = 0; n < hf.rows.count; n++){
      }
      var h = e.hSource;
      var idx = h.rowIndex;
   }
   MO.FUiMessageDialog_onDescClick = function FUiMessageDialog_onDescClick(e){
      var o = this;
   }
   MO.FUiMessageDialog_onBuildMessages = function FUiMessageDialog_onBuildMessages(){
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
   MO.FUiMessageDialog_onBuildButtons = function FUiMessageDialog_onBuildButtons(t){
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
   MO.FUiMessageDialog_onOk = function FUiMessageDialog_onOk(){
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
   MO.FUiMessageDialog_onCancel = function FUiMessageDialog_onCancel(){
      this.hide();
   }
   MO.FUiMessageDialog_onClose = function FUiMessageDialog_onClose(){
      this.hide();
   }
   MO.FUiMessageDialog_loadMessages = function FUiMessageDialog_loadMessages(g){
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
   MO.FUiMessageDialog_show = function FUiMessageDialog_show(){
      var o = this;
      o.__base.FUiWindow.show.call(o);
      o.panel().style.zIndex = RLayer.next(ELayer.Message);
      RWindow.moveCenter(o.panel());
      o.psMode(EMode.Update);
      RConsole.find(FFocusConsole).blur();
      RWindow.setEnable(false, true);
      o.focus();
   }
   MO.FUiMessageDialog_hide = function FUiMessageDialog_hide(){
      var o = this;
      o.__base.FUiWindow.hide.call(o);
      var f = o._messageArg.argument.form;
      if(RClass.isClass(f, MDataset)){
         f.psProgress(false);
      }
      RWindow.setEnable(true);
   }
   MO.FUiMessageDialog_dispose = function FUiMessageDialog_dispose(){
      var o = this;
      o.__base.FUiWindow.dispose.call(o);
      o.hItmeForm = null;
      o.hDescBody = null;
      o.hDescDiv = null;
      o.hDescTitle = null;
      o.hItemBodyForm = null;
      o._hButtonPanel = null;
   }
}
with(MO){
   MO.FUiPopupConsole = function FUiPopupConsole(o){
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
   MO.FUiPopupConsole_onMouseDown = function FUiPopupConsole_onMouseDown(p){
      this.hide();
   }
   MO.FUiPopupConsole_onMouseWheel = function FUiPopupConsole_onMouseWheel(s, e){
      this.hide();
   }
   MO.FUiPopupConsole_construct = function FUiPopupConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      MO.Logger.info(o, 'Add listener for control popup.');
      RWindow.lsnsMouseDown.register(o, o.onMouseDown);
      RWindow.lsnsMouseWheel.register(o, o.onMouseWheel);
   }
   MO.FUiPopupConsole_show = function FUiPopupConsole_show(control){
      var o = this;
      o.hide();
      if(RClass.isClass(control, MUiPopup)){
         o._activeControl = control;
      }
   }
   MO.FUiPopupConsole_hide = function FUiPopupConsole_hide(control){
      var o = this;
      if(o._activeControl){
         var opener = o._activeControl.opener();
         opener.drop(false);
      }
      o._activeControl = null;
   }
   MO.FUiPopupConsole_dispose = function FUiPopupConsole_dispose(){
      var o = this;
      o._activeControl = null;
      o.__base.FConsole.dispose.call(o);
   }
}
with(MO){
   MO.FUiResultConsole = function FUiResultConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o.scope          = EScope.Page;
      o.executeCommand = FUiResultConsole_executeCommand;
      o.checkService   = FUiResultConsole_checkService;
      o.checkEvent     = FUiResultConsole_checkEvent;
      return o;
   }
   MO.FUiResultConsole_executeCommand = function FUiResultConsole_executeCommand(command){
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
   MO.FUiResultConsole_checkService = function FUiResultConsole_checkService(config){
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
   MO.FUiResultConsole_checkEvent = function FUiResultConsole_checkEvent(event){
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
                  RConsole.find(FUiMessageConsole).showError(code, message, description);
                  return false;
               }
            }
         }
      }
      return true;
   }
}
with(MO){
   MO.FUiWindowConsole = function FUiWindowConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd      = EScope.Local;
      o._activeWindow = null;
      o._windows      = null;
      o.construct    = FUiWindowConsole_construct;
      o.create       = FUiWindowConsole_create;
      o.find         = FUiWindowConsole_find;
      return this;
   }
   MO.FUiWindowConsole_construct = function FUiWindowConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._windows = new TDictionary();
   }
   MO.FUiWindowConsole_create = function FUiWindowConsole_create(clazz){
      var o = this;
      var instance = RClass.create(clazz);
      instance.buildDefine(RWindow._hDocument);
      return instance;
   }
   MO.FUiWindowConsole_find = function FUiWindowConsole_find(clazz){
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
   MO.FUiWindowConsole_loadDefine = function FUiWindowConsole_loadDefine(name){
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
   MO.FUiWindowConsole_dump = function FUiWindowConsole_dump(){
      var sDump = this.className;
      sDump += '\n\nDefine:\n' + this.m_oDefinePool.dump();
      sDump += '\n\nWindow:\n' + this.windowList.dump();
      return sDump;
   }
   MO.FUiWindowConsole_clear = function FUiWindowConsole_clear(){
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
   MO.FUiWindowConsole_hideAll = function FUiWindowConsole_hideAll(oExpWin, bDisplay){
      var nSize = this.windowList.size();
      for(var n=nSize-1; n>=0; n--){
         var oWin = this.windowList.value(n);
         if(oWin != oExpWin){
            oWin.hide(bDisplay);
         }
      }
   }
   MO.FUiWindowConsole_setMaxWindow = function FUiWindowConsole_setMaxWindow(oWin){
      this.maxFlag = true;
      this.hideAll(oWin);
   }
   MO.FUiWindowConsole_restore = function FUiWindowConsole_restore(){
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
   MO.FUiWindowConsole_initialize = function FUiWindowConsole_initialize(oCtWin){
      this.clientWindow = oCtWin;
   }
   MO.FUiWindowConsole_hasWindow = function FUiWindowConsole_hasWindow(){
      return !this.windowList.isEmpty();
   }
   MO.FUiWindowConsole_focus = function FUiWindowConsole_focus(oWinCtl){
      this.focusWinCtl = oWinCtl;
      if(this.maxFlag){
         oWinCtl.show();
         this.hideAll(oWinCtl, true)
         oWinCtl.max();
      }
   }
   MO.FUiWindowConsole_saveDefine = function FUiWindowConsole_saveDefine(oWinNode, oClientWindow){
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
   MO.FUiWindowConsole_onEventMousedown = function FUiWindowConsole_onEventMousedown(oCWin){
   }
   MO.FUiWindowConsole_onSaveDefineAfter = function FUiWindowConsole_onSaveDefineAfter(){
      ILogger.info(this, 'saveDefine', 'Save Ok.');
      if(this.clientWindow){this.clientWindow.document.body.disabled = false;}
   }
   MO.FUiWindowConsole_releaseWindowName = function FUiWindowConsole_releaseWindowName(sWinName){
      var oWin = this.windowList.removeName(sWinName);
      IEngine.process(this, this.EVENT_CLOSE, oWin);
   }
   MO.FUiWindowConsole_releaseWindow = function FUiWindowConsole_releaseWindow(oWin){
      this.windowList.removeValue(oWin);
      IEngine.process(this, this.EVENT_CLOSE, oWin);
   }
   MO.FUiWindowConsole_doFrameAction = function FUiWindowConsole_doFrameAction(sAction){
      if(!this.activeForm){
         return ILogger.fatal(this, 'doFrameAction', 'Not active form!');
      }
      this.activeForm.doAction(sAction);
   }
   MO.FUiWindowConsole_doProperties = function FUiWindowConsole_doProperties(){
      TrackManager.push(this, 'Do properties.');
      if(!WindowManager.focusWinCtl){return;}
      var arParams = new Array();
      arParams['WindowManager'] = WindowManager;
      window.showModalDialog(SystemManager.actionURL('window'), arParams, 'dialogWidth:500px;dialogHeight:360px;resizable:no;scroll:no;edge:sunken');
   }
   MO.FUiWindowConsole_onEventRelease = function FUiWindowConsole_onEventRelease(oCWin){
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
}
MO.FUiWorkspaceApplication = function FUiWorkspaceApplication(o){
   o = MO.Class.inherits(this, o, MO.FApplication);
   o._workspaces      = MO.Class.register(o, new MO.AGetter('_workspaces'));
   o._activeWorkspace = MO.Class.register(o, new MO.AGetter('_activeWorkspace'));
   o.onProcess        = MO.FUiWorkspaceApplication_onProcess;
   o.selectWorkspace  = MO.FUiWorkspaceApplication_selectWorkspace;
   o.processResize    = MO.FUiWorkspaceApplication_processResize;
   o.processEvent     = MO.FUiWorkspaceApplication_processEvent;
   return o;
}
MO.FUiWorkspaceApplication_onProcess = function FUiWorkspaceApplication_onProcess(){
   var o = this;
   var workspace = o._activeWorkspace
   if(workspace){
      workspace.psFrame();
   }
}
MO.FUiWorkspaceApplication_selectWorkspace = function FUiWorkspaceApplication_selectWorkspace(clazz){
   var o = this;
   var workspace = o._activeWorkspace = MO.Class.create(clazz);
   return workspace;
}
MO.FUiWorkspaceApplication_processResize = function FUiWorkspaceApplication_processResize(){
   var o = this;
}
MO.FUiWorkspaceApplication_processEvent = function FUiWorkspaceApplication_processEvent(event){
   var o = this;
   return;
   o.dispatcherEvent(event);
   var chapter = o._activeWorkspace;
   if(chapter){
      chapter.processEvent(event);
   }
}
MO.FUiWorkspaceConsole = function FUiWorkspaceConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd         = MO.EScope.Local;
   o._activeWorkspace = null;
   o._workspaces      = null;
   o._thread          = null;
   o._interval        = 100;
   o.onResize         = MO.FUiWorkspaceConsole_onResize;
   o.onProcess        = MO.FUiWorkspaceConsole_onProcess;
   o.construct        = MO.FUiWorkspaceConsole_construct;
   o.active           = MO.FUiWorkspaceConsole_active;
   o.resize           = MO.FUiWorkspaceConsole_resize;
   o.dispose          = MO.FUiWorkspaceConsole_dispose;
   return o;
}
MO.FUiWorkspaceConsole_onResize = function FUiWorkspaceConsole_onResize(p){
   var o = this;
   var workspace = o._activeWorkspace;
   if(workspace){
      workspace.psResize();
   }
}
MO.FUiWorkspaceConsole_onProcess = function FUiWorkspaceConsole_onProcess(event){
   var o = this;
   var workspace = o._activeWorkspace;
   if(workspace){
      workspace.psFrame(event);
   }
}
MO.FUiWorkspaceConsole_construct = function FUiWorkspaceConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._workspaces = new MO.TDictionary();
   var thread = o._thread = MO.Class.create(MO.FThread);
   thread.setInterval(o._interval);
   thread.addProcessListener(o, o.onProcess);
   MO.Console.find(MO.FThreadConsole).start(thread);
   MO.RWindow.lsnsResize.register(o, o.onResize);
}
MO.FUiWorkspaceConsole_active = function FUiWorkspaceConsole_active(p){
   this._activeWorkspace = p;
}
MO.FUiWorkspaceConsole_resize = function FUiWorkspaceConsole_resize(){
   this.onResize();
}
MO.FUiWorkspaceConsole_dispose = function FUiWorkspaceConsole_dispose(){
   var o = this;
   o.__base.FConsole.dispose.call(o);
}
