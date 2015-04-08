function SBrowserCapability(){
   var o = this;
   o.optionProcess = false;
   o.blobCreate    = false;
   return o;
}
var RApplication = new function RApplication(){
   var o = this;
   o._workspaces   = new TDictionary();
   o.initialize    = RApplication_initialize;
   o.findWorkspace = RApplication_findWorkspace;
   o.release       = RApplication_release;
   return o;
}
function RApplication_initialize(){
   var o = this;
   RBrowser.construct();
   RWindow.connect(window);
   RKeyboard.construct();
}
function RApplication_findWorkspace(p){
   var o = this;
   var n = RClass.name(p);
   var ws = o._workspaces;
   var w = ws.get(n);
   if(w == null){
      w = RClass.create(p);
      ws.set(n, w);
   }
   return w;
}
function RApplication_release(){
   try{
      CollectGarbage();
   }catch(e){
      RLogger.error(e);
   }
}
var RBrowser = new function RBrowser(){
   var o = this;
   o._capability    = null;
   o._deviceCd      = EDevice.Unknown;
   o._softwareCd    = ESoftware.Unknown;
   o._typeCd        = EBrowser.Unknown;
   o._supportHtml5  = false;
   o._hostPath      = '';
   o._contentPath   = '';
   o.onLog          = RBrowser_onLog;
   o.construct      = RBrowser_construct;
   o.capability     = RBrowser_capability;
   o.supportHtml5   = RBrowser_supportHtml5;
   o.hostPath       = RBrowser_hostPath;
   o.setHostPath    = RBrowser_setHostPath;
   o.contentPath    = RBrowser_contentPath;
   o.setContentPath = RBrowser_setContentPath;
   o.isBrowser      = RBrowser_isBrowser;
   o.encode         = RBrowser_encode;
   o.decode         = RBrowser_decode;
   o.urlEncode      = RBrowser_urlEncode;
   o.urlDecode      = RBrowser_urlDecode;
   return o;
}
function RBrowser_onLog(s, p){
   console.log(p);
}
function RBrowser_construct(){
   var o = this;
   var s = window.navigator.userAgent.toLowerCase();
   if(s.indexOf("android") != -1){
      o._typeCd = EDevice.Mobile;
      o._softwareCd = ESoftware.Android;
   }
   if(s.indexOf("chrome") != -1){
      o._typeCd = EBrowser.Chrome;
   }else if(s.indexOf("firefox") != -1){
      o._typeCd = EBrowser.FireFox;
   }else if((s.indexOf("msie") != -1) || (s.indexOf("windows") != -1)){
      o._typeCd = EBrowser.Explorer;
   }else if((s.indexOf("safari") != -1) || (s.indexOf("applewebkit") != -1)){
      o._typeCd = EBrowser.Safari;
   }else{
      alert('Unknown browser.\n' + s);
      return;
   }
   if(o._typeCd == EBrowser.Chrome){
      RLogger.lsnsOutput.register(o, o.onLog);
   }
   if(window.applicationCache){
      o._supportHtml5 = true;
   }
   var c = o._capability = new SBrowserCapability();
   if(window.Worker){
      c.optionProcess = true;
   }
   try{
      new Blob(["Test"], {'type':'text/plain'});
      c.blobCreate = true;
   }catch(e){
      c.blobCreate = false;
   }
   RLogger.info(o, 'Parse browser agent. (type_cd={1})', REnum.decode(EBrowser, o._typeCd));
}
function RBrowser_capability(){
   return this._capability;
}
function RBrowser_supportHtml5(){
   return this._supportHtml5;
}
function RBrowser_hostPath(p){
   var o = this;
   if(p){
      return o._hostPath + p;
   }
   return o._hostPath;
}
function RBrowser_setHostPath(p){
   this._hostPath = p;
}
function RBrowser_contentPath(p){
   var o = this;
   if(p){
      return o._contentPath + p;
   }
   return o._contentPath;
}
function RBrowser_setContentPath(p){
   this._contentPath = p;
}
function RBrowser_isBrowser(p){
   return this._typeCd == p;
}
function RBrowser_encode(value){
   return escape(value);
}
function RBrowser_decode(value){
   return unescape(value);
}
function RBrowser_urlEncode(url, flag){
   if(flag){
      return encodeURIComponent(url);
   }
   return encodeURI(url);
}
function RBrowser_urlDecode(url, flag){
   if(flag){
      return decodeURIComponent(url);
   }
   return decodeURI(url);
}
var RBuilder = new function RBuilder(){
   var o = this;
   o.create             = RBuilder_create;
   o.createIcon         = RBuilder_createIcon;
   o.createImage        = RBuilder_createImage;
   o.createText         = RBuilder_createText;
   o.createButton       = RBuilder_createButton;
   o.createCheck        = RBuilder_createCheck;
   o.createRadio        = RBuilder_createRadio;
   o.createEdit         = RBuilder_createEdit;
   o.createFile         = RBuilder_createFile;
   o.createSpan         = RBuilder_createSpan;
   o.createDiv          = RBuilder_createDiv;
   o.createTable        = RBuilder_createTable;
   o.createTableRow     = RBuilder_createTableRow;
   o.createTableCell    = RBuilder_createTableCell;
   o.createFragment     = RBuilder_createFragment;
   o.append             = RBuilder_append;
   o.appendIcon         = RBuilder_appendIcon;
   o.appendImage        = RBuilder_appendImage;
   o.appendEmpty        = RBuilder_appendEmpty;
   o.appendText         = RBuilder_appendText;
   o.appendButton       = RBuilder_appendButton;
   o.appendCheck        = RBuilder_appendCheck;
   o.appendRadio        = RBuilder_appendRadio;
   o.appendEdit         = RBuilder_appendEdit;
   o.appendFile         = RBuilder_appendFile;
   o.appendSpan         = RBuilder_appendSpan;
   o.appendDiv          = RBuilder_appendDiv;
   o.appendTable        = RBuilder_appendTable;
   o.appendTableRow     = RBuilder_appendTableRow;
   o.appendTableRowCell = RBuilder_appendTableRowCell;
   o.appendTableCell    = RBuilder_appendTableCell;
   return o;
}
function RBuilder_create(h, t, s){
   var o = this;
   var d = null;
   if(h.ownerDocument){
      d = h.ownerDocument;
   }else if(h.hDocument){
      d = h.hDocument;
   }else{
      d = h;
   }
   var h = d.createElement(t);
   if(s){
      h.className = s;
   }
   return h;
}
function RBuilder_createIcon(d, s, u, w, h){
   var r = this.create(d, 'IMG', RString.nvl(s, 'Tag_Icon'));
   r.align = 'absmiddle';
   if(u){
      r.src = RResource.iconPath(u);
   }
   if(w){
      r.style.width = w + 'px';
   }
   if(h){
      r.style.height = h + 'px';
   }
   return r;
}
function RBuilder_createImage(d, s, u, w, h){
   var r = this.create(d, 'IMG', u);
   if(u){
      r.src = RResource.imagePath(u);
   }
   if(w){
      r.style.width = w;
   }
   if(h){
      r.style.height = h;
   }
   return r;
}
function RBuilder_createText(d, s, v){
   var r = this.create(d, 'SPAN', s);
   if(v){
      r.innerHTML = v;
   }
   return r;
}
function RBuilder_createButton(d, s){
   var r = this.create(d, "INPUT", s);
   r.type = 'button';
   return r;
}
function RBuilder_createCheck(d, s){
   var r = this.create(d, "INPUT", s);
   r.type = 'checkbox';
   return r;
}
function RBuilder_createRadio(d, s){
   var r = this.create(d, "INPUT", s);
   r.type = 'radio';
   return r;
}
function RBuilder_createEdit(d, s){
   var r = this.create(d, "INPUT", s);
   r.type = 'text';
   return r;
}
function RBuilder_createFile(d, s){
   var r = this.create(d, "INPUT", s);
   r.type = 'file';
   return r;
}
function RBuilder_createSpan(d, s){
   return this.create(d, 'SPAN', s);
}
function RBuilder_createDiv(d, s){
   return this.create(d, 'DIV', s);
}
function RBuilder_createTable(d, s, b, cs, cp){
   var h = this.create(d, 'TABLE', s);
   if(b){
      h.border = RInteger.nvl(b);
   }
   h.cellSpacing = RInteger.nvl(cs);
   h.cellPadding = RInteger.nvl(cp);
   return h;
}
function RBuilder_createTableRow(d, s){
   var h = this.create(d, 'TR', s);
   return h;
}
function RBuilder_createTableCell(d, s){
   var h = this.create(d, 'TD', s);
   return h;
}
function RBuilder_createFragment(d){
   return d.createDocumentFragment();
}
function RBuilder_append(p, t, s){
   var r = RBuilder.create(p.ownerDocument, t, s);
   if(p){
      p.appendChild(r);
   }else{
      this.hDocument.body.appendChild(r);
   }
   return r;
}
function RBuilder_appendIcon(p, s, u, w, h){
   var r = this.createIcon(p.ownerDocument, s, u, w, h);
   p.appendChild(r);
   return r;
}
function RBuilder_appendImage(p, s, u, w, h){
   var r = this.createImage(p.ownerDocument, s, u, w, h);
   p.appendChild(r);
   return r;
}
function RBuilder_appendEmpty(p, w, h){
   var r = this.createIcon(p.ownerDocument, null, 'n', w, h);
   p.appendChild(r);
   return r;
}
function RBuilder_appendText(p, s, v){
   var r = this.createText(p.ownerDocument, s, v);
   p.appendChild(r);
   return r;
}
function RBuilder_appendButton(p, s){
   var r = this.createButton(p.ownerDocument, s);
   p.appendChild(r);
   return r;
}
function RBuilder_appendCheck(p, s){
   var r = this.createCheck(p.ownerDocument, s);
   p.appendChild(r);
   return r;
}
function RBuilder_appendRadio(p, s){
   var r = this.createRadio(p.ownerDocument, s);
   p.appendChild(r);
   return r;
}
function RBuilder_appendEdit(p, s){
   var r = this.createEdit(p.ownerDocument, s);
   p.appendChild(r);
   return r;
}
function RBuilder_appendFile(p, s){
   var r = this.createFile(p.ownerDocument, s);
   p.appendChild(r);
   return r;
}
function RBuilder_appendSpan(p, s){
   var r = this.createSpan(p.ownerDocument, s);
   p.appendChild(r);
   return r;
}
function RBuilder_appendDiv(p, s){
   var r = this.createDiv(p.ownerDocument, s);
   p.appendChild(r);
   return r;
}
function RBuilder_appendTable(p, s, b, cs, cp){
   var r = this.createTable(p.ownerDocument, s, b, cs, cp);
   if(p){
      p.appendChild(r);
   }else{
      this.hDocument.body.appendChild(r);
   }
   return r;
}
function RBuilder_appendTableRow(p, s, i, h){
   var r = null;
   if(i == null){
      if(RBrowser.isBrowser(EBrowser.Explorer)){
         r = p.insertRow();
      }else{
         r = p.insertRow(-1);
      }
   }else{
      r = p.insertRow(i);
   }
   if(s){
      r.className = s;
   }
   if(h){
      r.height = h;
   }
   return r;
}
function RBuilder_appendTableRowCell(p, s, w, h){
   var o = this;
   var hr = o.appendTableRow(p, null, null, w);
   var hc = o.appendTableCell(hr, s, null, h);
   return hc;
}
function RBuilder_appendTableCell(p, s, i, w){
   var o = this;
   var r = null;
   if(i == null){
      r = o.create(p, 'TD', s);
      p.appendChild(r);
   }else{
      r = p.insertCell(i);
   }
   if(s){
      r.className = s;
   }
   if(w){
      r.width = w;
   }
   return r;
}
var RContext = new function(){
   var o = this;
   o.optionGarbage = true;
   o._location     = null;
   o._contexts     = new Object();
   o.contextPath   = null;
   o.contextTag    = null;
   o.themeId       = null;
   o.languageId    = null;
   o.construct     = RContext_construct;
   o.initialize    = RContext_initialize;
   o.get           = RContext_get;
   o.find          = RContext_find;
   o.location      = RContext_location;
   o.context       = RContext_context;
   o.construct();
   return o;
}
function RContext_construct(){
   var o = this;
   if(window.ActiveXObject){
      o.optionGarbage = true;
   }else{
      o.optionGarbage = false;
   }
}
function RContext_location(s){
   var o = this;
   var r = o._location;
   if(r == null){
      var l = window.location;
      var hr = l.href;
      var pn = l.pathname;
      r = hr.substring(0, hr.indexOf(pn))
      if(o.contextPath){
         r += o.contextPath;
      }
      o._location = r;
   }
   if(s){
      r += s;
   }
   return r;
}
function RContext_context(s){
   var o = this;
   if(s != null){
      if(RString.endsWith(s, '.wv')){
         return o.contextPath + '/' + s;
      }else if(RString.startsWith(s, '#')){
         return o.contextPath + o.contextTag + s.substr(1);
      }
      return o.contextPath + s;
   }
   return o.contextPath;
}
function RContext_initialize(s){
   var o = this;
   for(var n in s){
      var ls = s[n];
      for(var nc in ls){
         var v = ls[nc];
         var fn = n + ':' + nc;
         o._contexts[fn] = new TContext(n, nc, v);
      }
   }
}
function RContext_get(p, p1, p2, p3, p4, p5){
   var o = this;
   var r = o._contexts[p];
   if(!r){
      return RLogger.fatal(o, null, 'Can not find context (path={1})', p);
   }
   return RString.format(r.text, p1, p2, p3, p4, p5)
}
function RContext_find(s, c){
   var o = this;
   var id = s + ':' + c;
   var r = o._contexts[id];
   if(!r){
      return RLogger.fatal(o, null, 'Can not find context (id={1})', id);
   }
   return r.text;
}
var RValue = new function RValue(){
   var o = this;
   o.float1    = null;
   o.float2    = null;
   o.float3    = null;
   o.float4    = null;
   o.float9    = null;
   o.float12   = null;
   o.float16   = null;
   o.double1   = null;
   o.double2   = null;
   o.double3   = null;
   o.double4   = null;
   o.double16  = null;
   o.double16  = null;
   o.double64  = null;
   o.construct = RValue_construct;
   o.construct();
   return o;
}
function RValue_construct(){
   var o = this;
   if(RBrowser.supportHtml5()){
      o.float1 = new Float32Array(1);
      o.float2 = new Float32Array(2);
      o.float3 = new Float32Array(3);
      o.float4 = new Float32Array(4);
      o.float9 = new Float32Array(9);
      o.float12 = new Float32Array(12);
      o.float16 = new Float32Array(16);
      o.double1 = new Float64Array(1);
      o.double2 = new Float64Array(2);
      o.double3 = new Float64Array(3);
      o.double4 = new Float64Array(4);
      o.double9 = new Float64Array(9);
      o.double12 = new Float64Array(12);
      o.double16 = new Float64Array(16);
   }
}
var RWindow = new function RWindow(){
   var o = this;
   o._optionSelect     = true;
   o._statusEnable     = true;
   o._mouseEvent       = new SMouseEvent();
   o._keyEvent         = new SKeyboardEvent();
   o._resizeEvent      = new SResizeEvent();
   o._orientationEvent = new SEvent();
   o._disableDeep      = 0;
   o._hWindow          = null;
   o._hDocument        = null;
   o._hContainer       = null;
   o._hDisablePanel    = null;
   o._hDisableImage    = null;
   o.lsnsLoad          = new TListeners();
   o.lsnsUnload        = new TListeners();
   o.lsnsMouseDown     = new TListeners();
   o.lsnsMouseUp       = new TListeners();
   o.lsnsMouseOver     = new TListeners();
   o.lsnsMouseMove     = new TListeners();
   o.lsnsMouseWheel    = new TListeners();
   o.lsnsKeyDown       = new TListeners();
   o.lsnsKeyUp         = new TListeners();
   o.lsnsKeyPress      = new TListeners();
   o.lsnsResize        = new TListeners();
   o.lsnsOrientation   = new TListeners();
   o.ohMouseDown       = RWindow_ohMouseDown;
   o.ohMouseMove       = RWindow_ohMouseMove;
   o.ohMouseUp         = RWindow_ohMouseUp;
   o.ohKeyDown         = RWindow_ohKeyDown;
   o.ohKeyUp           = RWindow_ohKeyUp;
   o.ohKeyPress        = RWindow_ohKeyPress;
   o.ohResize          = RWindow_ohResize;
   o.ohSelect          = RWindow_ohSelect;
   o.ohOrientation     = RWindow_ohOrientation;
   o.ohUnload          = RWindow_ohUnload;
   o.connect           = RWindow_connect;
   o.optionSelect      = RWindow_optionSelect;
   o.setOptionSelect   = RWindow_setOptionSelect;
   o.setCaption        = RWindow_setCaption;
   o.setStatus         = RWindow_setStatus;
   o.makeDisablePanel  = RWindow_makeDisablePanel;
   o.windowEnable      = RWindow_windowEnable;
   o.windowDisable     = RWindow_windowDisable;
   o.isEnable          = RWindow_isEnable;
   o.enable            = RWindow_enable;
   o.disable           = RWindow_disable;
   o.setEnable         = RWindow_setEnable;
   o.redirect          = RWindow_redirect;
   o.historyForward    = RWindow_historyForward;
   o.historyBack       = RWindow_historyBack;
   return o;
}
function RWindow_ohMouseDown(p){
   var o = RWindow;
   if(!p){
      p = o._hWindow.event;
   }
   var e = o._mouseEvent;
   e.attachEvent(p);
   o.lsnsMouseDown.process(e);
}
function RWindow_ohMouseMove(p){
   var o = RWindow;
   if(!p){
      p = o._hWindow.event;
   }
   var e = o._mouseEvent;
   e.attachEvent(p);
   o.lsnsMouseMove.process(e);
}
function RWindow_ohMouseUp(p){
   var o = RWindow;
   if(!p){
      p = o._hWindow.event;
   }
   var e = o._mouseEvent;
   e.attachEvent(p);
   o.lsnsMouseUp.process(e);
}
function RWindow_ohKeyDown(p){
   var o = RWindow;
   if(!p){
      p = o._hWindow.event;
   }
   var e = o._keyEvent;
   e.attachEvent(p);
   o.lsnsKeyDown.process(e);
}
function RWindow_ohKeyUp(p){
   var o = RWindow;
   if(!p){
      p = o._hWindow.event;
   }
   var e = o._keyEvent;
   e.attachEvent(p);
   o.lsnsKeyUp.process(e);
}
function RWindow_ohKeyPress(p){
   var o = RWindow;
   if(!p){
      p = o._hWindow.event;
   }
   var e = o._keyEvent;
   e.attachEvent(p);
   o.lsnsKeyPress.process(e);
}
function RWindow_ohResize(p){
   var o = RWindow;
   if(!p){
      p = o._hWindow.event;
   }
   var e = o._resizeEvent;
   e.attachEvent(p);
   o.lsnsResize.process(e);
}
function RWindow_ohSelect(p){
   return RWindow._optionSelect;
}
function RWindow_ohOrientation(p){
   var o = RWindow;
   var e = o._orientationEvent;
   if((window.orientation == 180) || (window.orientation == 0)){
      e.orientationCd = EOrientation.Vertical;
   }else if((window.orientation == 90) || (window.orientation == -90)){
      e.orientationCd = EOrientation.Horizontal;
   }else{
      throw new TError(o, 'Unknown orientation mode.');
   }
   o.lsnsOrientation.process(e);
}
function RWindow_ohUnload(event){
}
function RWindow_connect(w){
   var o = this;
   var hWindow = o._hWindow = w;
   var hDocument = o._hDocument = hWindow.document;
   var hContainer = o._hContainer = hDocument.body;
   if(RBrowser.supportHtml5()){
      hContainer.addEventListener('mousedown', o.ohMouseDown, true);
      hContainer.addEventListener('mousemove', o.ohMouseMove, true);
      hContainer.addEventListener('mouseup', o.ohMouseUp, true);
      hContainer.addEventListener('keydown', o.ohKeyDown, true);
      hContainer.addEventListener('keyup', o.ohKeyUp, true);
      hContainer.addEventListener('keypress', o.ohKeyPress, true);
      hWindow.addEventListener('orientationchange', o.ohOrientation);
   }else{
      hContainer.onmousedown = o.ohMouseDown;
      hContainer.onmousemove = o.ohMouseMove;
      hContainer.onmouseup = o.ohMouseUp;
      hContainer.onkeydown = o.ohKeyDown;
      hContainer.onkeyup = o.ohKeyUp;
      hContainer.onkeypress = o.ohKeyPress;
   }
   hContainer.onresize = o.ohResize;
   hContainer.onselectstart = o.ohSelect;
   hContainer.onunload = o.ohUnload;
}
function RWindow_optionSelect(){
   return this._optionSelect;
}
function RWindow_setOptionSelect(p){
   var o = this;
   o._optionSelect = p;
   if(RBrowser.isBrowser(EBrowser.FireFox)){
      o._hContainer.style.MozUserSelect = p ? '' : 'none';
   }
}
function RWindow_setCaption(p){
   top.document.title = p;
}
function RWindow_setStatus(p){
   window.status = RString.nvl(p);
}
function RWindow_makeDisablePanel(f){
   var o = this;
   var h = o._hDisablePanel;
   if(!h){
      h = o._hDisablePanel = RBuilder.createDiv(o._hDocument, 'RWindow_Disable');
      h.style.zIndex = 5000;
   }
   var hi = o._hDisableImage;
   if(!hi){
      hi = o._hDisableImage = RBuilder.appendIcon(h);
      hi.src = RResource.iconPath('control.RWindow_Loading');
      hi.style.margin = o._hContainer.offsetHeight / 2;
      hi.style.display = 'none';
   }
   RHtml.visibleSet(hi, f);
   return h;
}
function RWindow_windowDisable(){
   this._hContainer.disabled = true;
}
function RWindow_windowEnable(){
   this._hContainer.disabled = false;
}
function RWindow_isEnable(){
   return this._statusEnable;
}
function RWindow_enable(){
   var o = this;
   o._disableDeep--;
   if(o._disableDeep == 0){
      o.setEnable(true);
   }
}
function RWindow_disable(){
   var o = this;
   if(o._disableDeep == 0){
      o.setEnable(false);
   }
   o._disableDeep++;
}
function RWindow_setEnable(v, f){
   var o = this;
   var h = o.makeDisablePanel(f);
   var st = h.style;
   if(!v){
      var hd = o._hDocument;
      var s = o._hDisablePanel.style;
      s.left = '0px';
      s.top = '0px';
      s.width = (hd.all ? o._hContainer.scrollWidth : hd.documentElement.scrollWidth) + 'px';
      s.height = (hd.all ? o._hContainer.scrollHeight : hd.documentElement.scrollHeight) + 'px';
      if(!h._linked){
         o._hContainer.appendChild(h);
         h._linked = true;
      }
   }else{
      o.windowEnable();
      if(h._linked){
         o._hContainer.removeChild(h);
         h._linked = false;
      }
   }
   o._statusEnable = v;
}
function RWindow_redirect(){
}
function RWindow_historyForward(){
}
function RWindow_historyBack(){
}
function RWindow_onUnload(){
   RMemory.release();
}
function RWindow_onResize(){
   var o = this;
   var h = o._hDisablePanel;
   if(h){
      if('block' == h.style.display){
         var s = h.style;
         var hd = o.hDocument;
         s.pixelLeft = 0;
         s.pixelTop = 0
         s.pixelWidth = hd.all ? o._hContainer.scrollWidth : hd.documentElement.scrollWidth;
         s.pixelHeight = hd.all ? o._hContainer.scrollHeight : hd.documentElement.scrollHeight;
      }
   }
}
function RWindow_connect2(w){
   var o = this;
   o.hWindow = w;
   var hd = o.hDocument = w.document;
   var hb = o._hContainer = o.hContainer = hd.body;
   o.processUnload = hb.onunload;
   hb.onunload = function(e){
      if(!e){
         e = w.event;
      }
      o.lsnsUnload.process(e);
      o.onUnload();
   };
   hb.onmouseover = function(e){
      if(!e){
         e = w.event;
      }
      o.lsnsMouseOver.process(e);
   };
   hb.onmousewheel = function(e){
      if(!e){
         e = w.event;
      }
      o.lsnsMouseWheel.process(e);
   };
   hb.onkeydown = function(e){
      if(!e){
         e = w.event;
      }
      RLogger.debug(o, 'Window key down. (key_code={1})', e.keyCode);
      var s = e.srcElement ? e.srcElement : e.target;
      var t = s.tagName;
      if(EKeyCode.BackSpace == e.keyCode){
         if('INPUT' == t){
            if(s.readOnly || 'checkbox' == s.type){
               return RKey.eventClear(e);
            }
         }else if('TEXTAREA' == t){
            if(s.readOnly){
               return RKey.eventClear(e);
            }
         }else{
            return RKey.eventClear(e);
         }
      }
      o.__keyDownEvent.attach(e);
      o.lsnsKeyDown.process(o.__keyDownEvent);
      if(EKeyCode.Enter == e.keyCode){
         if('INPUT' == t){
            if(REvent.process(s, e)){
               RKey.eventClear(e);
            }
         }
      }
   };
   hb.onkeyup = function(e){
      if(!e){
         e = w.event;
      }
      o.lsnsKeyUp.process(e);
   };
   hb.onkeypress = function(e){
      if(!e){
         e = w.event;
      }
      RLogger.debug(o, 'Window key press. (key_code={1})', e.keyCode);
      o.lsnsKeyPress.process(e);
   };
   hb.onresize = function(e){
      if(!e){
         e = w.event;
      }
      if(o.oldBodyWidth == o._hContainer.offsetWidth && o.oldBodyHeight == o._hContainer.offsetHeight){
         return;
      }
      o.oldBodyWidth = o._hContainer.offsetWidth;
      o.oldBodyHeight = o._hContainer.offsetHeight;
      o.onResize();
      o.lsnsResize.process(e);
   };
}
function RWindow_panel(t){
   var o = this;
   if(EPanel.Disable == t){
      var h = o._hDisablePanel;
      if(!h){
         h = o._hDisablePanel = RBuilder.append(o._hContainer, 'DIV', 'RWindow_Disable');
         var hi = RBuilder.append(h, 'IMG')
         hi.src = RRes.iconPath('#ctl.RWindow_Loading');
         hi.style.margin = document.body.offsetHeight / 2;
         h.style.zIndex = ELayer.Disable;
      }
      return h;
   }
}
function RWindow_screenPos(p){
   var e = this.hWindow.event;
   if(p){
      p.x = e.screenX;
      p.y = e.screenY;
      return p;
   }
   return new TPoint(e.screenX, e.screenY);
}
function RWindow_clientPos(p){
   var e = this.hWindow.event;
   if(p){
      p.x = e.clientX;
      p.y = e.clientY;
      return p;
   }
   return new TPoint(e.clientX, e.clientY);
}
function RWindow_offsetPos(p){
   var e = this.hWindow.event;
   if(p){
      p.x = e.offsetX;
      p.y = e.offsetY;
      return p;
   }
   return new TPoint(e.offsetX, e.offsetY);
}
function RWindow_showShadow(v, r){
   var o = this;
   if(!o._hShadow){
      o._hShadow = RBuilder.append(o._hContainer, 'DIV', 'RWindow_Shadow');
      o._hShadow.style.zIndex = ELayer.Shadow;
   }
   var st = o._hShadow.style;
   if(v == false){
      st.display = 'none';
   }else{
      st.display = 'block';
      st.pixelLeft = r.left+3;
      st.pixelTop = r.top+3;
      st.pixelWidth = r.width();
      st.pixelHeight = r.height();
   }
}
function RWindow_moveCenter(h){
   var o = this;
   if(h){
      h.style.pixelLeft = Math.max(parseInt((o._hContainer.offsetWidth - h.offsetWidth)/2), 0);
      h.style.pixelTop = Math.max(parseInt((o._hContainer.offsetHeight - h.offsetHeight)/2), 0) + o._hContainer.scrollTop;
   }
}
function RWindow_appendControl(ctl){
   this._hContainer.appendChild(ctl.hPanel);
}
function RWindow_appendElement(h){
   this._hContainer.appendChild(h);
}
function RWindow_appendContainer(h){
   this.hContainer.appendChild(h);
}
function RWindow_containerTop(h){
   var o = this;
   var hc = o.hContainer;
   var r = RHtml.top(h) + h.offsetHeight;
   if('auto' == hc.currentStyle.overflow){
      r -= RHtml.top(hc);
   }
   return r - hc.scrollTop;
}
function RWindow_dispose(){
   var o = this;
   o._hContainer.onload = null;
   o._hContainer.onunload = null;
   o._hContainer.onmousedown = null;
   o._hContainer.onmouseup = null;
   o._hContainer.onmousemove = null;
   o._hContainer.onmouseover = null;
   o._hContainer.onmousewheel = null;
   o._hContainer.onkeydown = null;
   o._hContainer.onkeyup = null;
   o._hContainer.onkeypress = null;
   o._hContainer.onresize = null;
   o._hContainer = RHtml.free(o._hContainer);
   o._hWindow = null;
   o._hDocument = null;
   o._hContainer = null;
   o._hDisablePanel = null;
   o._hDisableImage = null;
   o._hShadow = null;
}
var RXml = new function RXml(){
   var o = this;
   o.httpActiveX      = false;
   o.httpVendor       = null;
   o.domActiveX       = false;
   o.domVendor        = null;
   o.construct        = RXml_construct;
   o.isNode           = RXml_isNode;
   o.createConnection = RXml_createConnection;
   o.createDocument   = RXml_createDocument;
   o.formatText       = RXml_formatText;
   o.buildText        = RXml_buildText;
   o.buildNode        = RXml_buildNode;
   o.makeString       = RXml_makeString;
   o.makeNode         = RXml_makeNode;
   o.makeDocument     = RXml_makeDocument;
   o.unpack           = RXml_unpack;
   o.construct();
   return o;
}
function RXml_construct(){
   var o = this;
   var d = window.document;
   if(window.ActiveXObject && !window.XMLHttpRequest){
      var vs = ["MSXml2.XmlHTTP", "Microsoft.XmlHTTP", "MSXml.XmlHTTP", "MSXml3.XmlHTTP"];
      var c = vs.length;
      for(var n = 0; n < c; n++){
         var v = vs[n];
         try{
            r = new ActiveXObject(v);
            o.httpActiveX = true;
            o.httpVendor = v;
            break;
         }catch(e){
            m = e;
         }
      }
   }else if(window.XMLHttpRequest){
      try{
         var r = new XMLHttpRequest();
         o.httpActiveX = false;
      }catch(e){
         m = e;
      }
   }else{
      alert('Unknown http vendor.');
   }
   if(window.ActiveXObject || !window.DOMParser){
      var vs = ["MSXml2.DOMDocument", "Microsoft.XmlDOM", "MSXml.DOMDocument", "MSXml3.XmlDOM"];
      var c = vs.length;
      for(var n = 0; n < c; n++){
         var v = vs[n];
         try{
            var r = new ActiveXObject(v);
            o.domActiveX = true;
            o.domVendor = v;
            break;
         }catch(e){
            m = e;
         }
      }
   }else if(window.DOMParser && d && d.implementation && d.implementation.createDocument){
      try{
         var r = document.implementation.createDocument('', '', null);
         o.domActiveX = false;
      }catch(e){
         m = e;
      }
   }else{
      alert('Unknown dom vendor.');
   }
}
function RXml_isNode(n){
   return RClass.isName(n, 'TNode');
}
function RXml_createConnection(){
   var o = this;
   var r = null;
   if(o.httpActiveX){
      r = new ActiveXObject(o.httpVendor);
   }else{
      r = new XMLHttpRequest();
   }
   if(!r){
      alert('Create xml connection failure. (message=' + m + ')');
   }
   return r;
}
function RXml_createDocument(){
   var o = this;
   var r = null;
   if(o.domActiveX){
      r = new ActiveXObject(o.domVendor);
   }else{
      r = document.implementation.createDocument('', '', null);
   }
   if(!r){
      alert('Create xml document failure. (message=' + m + ')');
   }
   return r;
}
function RXml_formatText(s){
   if(s != null){
      s = s.replace(/\\n/g, '\n');
   }
   return s;
}
function RXml_buildText(s, v){
   if(v != null){
      v = v.toString();
      var c = v.length;
      for(var i = 0; i < c; i++){
         var ch = v.charAt(i);
         switch(ch){
            case '<':
               s.append('&lt;');
               break;
            case '>':
               s.append('&gt;');
               break;
            case '"':
               s.append('&quot;');
               break;
            case '&':
               s.append('&amp;');
               break;
            case '\r':
               continue;
            case '\n':
               s.append('\\n');
               break;
            default:
               s.append(ch);
         }
      }
   }
   return s;
}
function RXml_buildNode(pd, pn, pe){
   var xas = null;
   var eas = pe.attributes;
   if(eas){
      var eac = eas.length;
      if(eac > 0){
         xas = new TAttributes();
         for(var n = 0; n < eac; n++){
            var ea = eas[n];
            if(ea.nodeName){
               xas.set(ea.nodeName, RXml.formatText(ea.value));
            }
         }
      }
   }
   var xt = new TString();
   xt.append(pe.value);
   var ecs = pe.childNodes
   if(ecs){
      var ecc = ecs.length;
      for(var n = 0; n < ecc; n++){
         var en = ecs[n];
         var ect = en.nodeType;
         if(ect == ENodeType.Text){
            xt.append(en.nodeValue);
         }else if(ect == ENodeType.Data){
            xt.append(en.data);
         }
      }
   }
   var xc = pd.create(pe.nodeName, xas, RString.trim(xt.toString()));
   if(pn){
      pn.push(xc);
   }else{
      pd._root = xc;
   }
   if(ecs){
      var cc = ecs.length;
      for(var n = 0; n < cc; n++){
         if(ecs[n].nodeType == ENodeType.Node){
            this.buildNode(pd, xc, ecs[n]);
         }
      }
   }
}
function RXml_makeString(s){
   var o = this;
   var x = null;
   if(o.domActiveX){
      x = new ActiveXObject(o.domVendor);
      x.async = false;
      x.loadXML(s);
   }else{
      var p = new DOMParser();
      x = p.parseFromString(s, 'text/xml');
   }
   return x;
}
function RXml_makeNode(p){
   var o = this;
   if(p.documentElement){
      var d = new TXmlDocument();
      o.buildNode(d, null, p.documentElement);
      return d.root();
   }else if(p.tagName == 'SCRIPT'){
      var s = p.textContent;
      if(!s){
         s = p.text;
      }
      if(s){
         var d = new TXmlDocument();
         var xd = o.makeString(s)
         o.buildNode(d, null, xd.documentElement);
         return d.root();
      }
   }
   return null;
}
function RXml_makeDocument(p){
   var d = new TXmlDocument();
   if(p.documentElement){
      RXml.buildNode(d, null, p.documentElement);
   }
   return d;
}
function RXml_unpack(s, n){
   var o = this;
   if(RString.isEmpty(s)){
      return null;
   }
   if(!n){
      n = new TNode();
   }
   var np = new TAttributes();
   np.unpack(s);
   n.name = np.get('name');
   n.value = np.get('value');
   if(np.contains('attributes')){
      n.attributes().unpack(np.get('attributes'));
   }
   if(np.contains('nodes')){
      var ns = new TStrings();
      ns.unpack(np.get('nodes'));
      for(var i=0; i<ns.count; i++){
         o.unpack(ns.get(i), n.create());
      }
   }
   return n;
}
