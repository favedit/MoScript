function SBrowserCapability(){
   var o = this;
   o.optionProcess = false;
   o.optionStorage = false;
   o.blobCreate    = false;
   return o;
}
function STouchEvent(){
   var o = this;
   o.dispose = STouchEvent_dispose;
   return o;
}
function STouchEvent_dispose(){
   var o = this;
}
function FImage(o){
   o = RClass.inherits(this, o, FObject, MListenerLoad);
   o._optionAlpha   = true;
   o._ready         = false;
   o._size          = null;
   o._url           = null;
   o._hImage        = null;
   o.ohLoad         = FImage_ohLoad;
   o.ohError        = FImage_ohError;
   o.construct      = FImage_construct;
   o.optionAlpha    = FImage_optionAlpha;
   o.setOptionAlpha = FImage_setOptionAlpha;
   o.size           = FImage_size;
   o.image          = FImage_image;
   o.url            = FImage_url;
   o.testReady      = FImage_testReady;
   o.loadUrl        = FImage_loadUrl;
   o.dispose        = FImage_dispose;
   return o;
}
function FImage_ohLoad(){
   var o = this.__linker;
   var hImage = o._hImage;
   o._size.set(hImage.naturalWidth, hImage.naturalHeight);
   o._ready = true;
   var event = new SEvent(o);
   o.processLoadListener(event);
   event.dispose();
}
function FImage_ohError(p){
   var o = this.__linker;
   var url = o._url;
   RLogger.error(o, 'Load image failure. (url={1})', url);
}
function FImage_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._size = new SSize2();
}
function FImage_optionAlpha(){
   return this._optionAlpha;
}
function FImage_setOptionAlpha(p){
   this._optionAlpha = p;
}
function FImage_size(){
   return this._size;
}
function FImage_image(){
   return this._hImage;
}
function FImage_url(){
   return this._url;
}
function FImage_testReady(){
   return this._ready;
}
function FImage_loadUrl(p){
   var o = this;
   o._url = p;
   var g = o._hImage;
   if(!g){
      g = o._hImage = new Image();
      g.__linker = o;
      g.onload = o.ohLoad;
      g.onerror = o.ohError;
   }
   g.src = p;
}
function FImage_dispose(){
   var o = this;
   o._size = RObject.dispose(o._size);
   o._hImage = RHtml.free(o._hImage);
   o.__base.MListenerLoad.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
function FTouchTracker(o){
   o = RClass.inherits(this, o, FObject, MListenerTouchZoom);
   o._touchsLength   = null;
   o._touchs         = null;
   o._touchPool      = null;
   o._touchZoomEvent = null;
   o.construct       = FTouchTracker_construct;
   o.calculateLength = FTouchTracker_calculateLength;
   o.eventStart      = FTouchTracker_eventStart;
   o.eventMove       = FTouchTracker_eventMove;
   o.eventStop       = FTouchTracker_eventStop;
   o.dispose         = FTouchTracker_dispose;
   return o;
}
function FTouchTracker_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._touchs = new TObjects();
   o._touchPool = RClass.create(FObjectPool);
   o._touchZoomEvent = new SEvent(o);
}
function FTouchTracker_calculateLength(hEvent){
   var o = this;
   var total = 0;
   var hTouches = hEvent.touches;
   var count = hTouches.length;
   if(count > 0){
      for(var i = 0; i < count; i++){
         var hTouche1 = hTouches[i];
         var hTouche2 = (i == count - 1) ? hTouches[0] : hTouches[i + 1];
         var cx = hTouche1.clientX - hTouche2.clientX;
         var cy = hTouche1.clientY - hTouche2.clientY;
         var length = Math.sqrt(cx * cx + cy * cy);
         total += length;
      }
   }
   return total;
}
function FTouchTracker_eventStart(hEvent){
   var o = this;
   var touchs = o._touchs;
   touchs.clear();
   var hTouches = hEvent.touches;
   var count = hTouches.length;
   for(var i = 0; i < count; i++){
      var hTouche = hTouches[i];
      var touch = new STouchEvent();
      touch.clientX = hTouche.clientX;
      touch.clientY = hTouche.clientY;
      touchs.push(touch);
   }
   o._touchsLength = o.calculateLength(hEvent);
}
function FTouchTracker_eventMove(hEvent){
   var o = this;
   var touchs = o._touchs;
   var hTouches = hEvent.touches;
   var count = hTouches.length;
   for(var i = 0; i < count; i++){
      var hTouche = hTouches[i];
      var touch = touchs.at(i);
      touch.clientX = hTouche.clientX;
      touch.clientY = hTouche.clientY;
   }
   var touchsLength = o.calculateLength(hEvent);
   if(o._touchsLength != touchsLength){
      var event = o._touchZoomEvent;
      event.touchsLength = touchsLength;
      event.delta = touchsLength - o._touchsLength;
      o.processTouchZoomListener(event);
      o._touchsLength = touchsLength;
   }
}
function FTouchTracker_eventStop(hEvent){
   var o = this;
}
function FTouchTracker_dispose(){
   var o = this;
   o._touchs = RObject.dispose(o._touchs);
   o._touchZoomEvent = RObject.dispose(o._touchZoomEvent);
   o.__base.MListenerTouchZoom.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
function FWindowStorage(o){
   o = RClass.inherits(this, o, FObject);
   o._scopeCd  = null;
   o._storage  = null;
   o.scopeCd   = FWindowStorage_scopeCd;
   o.link      = FWindowStorage_link;
   o.get       = FWindowStorage_get;
   o.set       = FWindowStorage_set;
   o.remove    = FWindowStorage_remove;
   o.clear     = FWindowStorage_clear;
   o.innerDump = FWindowStorage_innerDump;
   return o;
}
function FWindowStorage_scopeCd(){
   return this._scopeCd;
}
function FWindowStorage_link(storage){
   this._storage = storage;
}
function FWindowStorage_get(name){
   return this._storage.getItem(name);
}
function FWindowStorage_set(name, value){
   this._storage.setItem(name, value);
}
function FWindowStorage_remove(name){
   this._storage.removeItem(name);
}
function FWindowStorage_clear(){
   this._storage.clear();
}
function FWindowStorage_innerDump(dump, level){
   var o = this;
   var storage = o._storage;
   var count = storage.length;
   for(var i = 0; i < count; i++){
      var name = storage.key(i);
      var value = storage.getItem(name);
      if(i > 0){
         dump.append(';');
      }
      dump.append(name + '=' + value);
   }
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
   RLogger.info(o, 'Parse browser agent. (type_cd={1})', REnum.decode(EBrowser, o._typeCd));
   if(window.applicationCache){
      o._supportHtml5 = true;
   }
   var capability = o._capability = new SBrowserCapability();
   if(window.Worker){
      capability.optionProcess = true;
   }
   if(window.localStorage){
      capability.optionStorage = true;
   }
   try{
      new Blob(["Test"], {'type':'text/plain'});
      capability.blobCreate = true;
   }catch(e){
      RLogger.warn(o, 'Browser blob not support.');
   }
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
function RBuilder_createFragment(document){
   var hDocument = null;
   if(document.ownerDocument){
      hDocument = document.ownerDocument;
   }else if(document.hDocument){
      hDocument = document.hDocument;
   }else{
      hDocument = document;
   }
   var hElement = hDocument.createDocumentFragment();
   hElement.__fragment = true;
   return hElement;
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
   o._disableDeep      = 0;
   o._localStorage     = null;
   o._sessionStorage   = null;
   o._hWindow          = null;
   o._hDocument        = null;
   o._hContainer       = null;
   o._eventMouse       = new SMouseEvent();
   o._eventKey         = new SKeyboardEvent();
   o._eventResize      = new SResizeEvent();
   o._eventOrientation = new SEvent();
   o._eventUnload      = new SEvent();
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
   o.ohMouseWheel      = RWindow_ohMouseWheel;
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
   o.storage           = RWindow_storage;
   o.makeDisablePanel  = RWindow_makeDisablePanel;
   o.windowEnable      = RWindow_windowEnable;
   o.windowDisable     = RWindow_windowDisable;
   o.isEnable          = RWindow_isEnable;
   o.enable            = RWindow_enable;
   o.disable           = RWindow_disable;
   o.setEnable         = RWindow_setEnable;
   o.appendElement     = RWindow_appendElement;
   o.redirect          = RWindow_redirect;
   o.historyForward    = RWindow_historyForward;
   o.historyBack       = RWindow_historyBack;
   o.dispose           = RWindow_dispose;
   return o;
}
function RWindow_ohMouseDown(p){
   var o = RWindow;
   if(!p){
      p = o._hWindow.event;
   }
   var e = o._eventMouse;
   e.attachEvent(p);
   o.lsnsMouseDown.process(e);
}
function RWindow_ohMouseMove(p){
   var o = RWindow;
   if(!p){
      p = o._hWindow.event;
   }
   var e = o._eventMouse;
   e.attachEvent(p);
   o.lsnsMouseMove.process(e);
}
function RWindow_ohMouseUp(p){
   var o = RWindow;
   if(!p){
      p = o._hWindow.event;
   }
   var e = o._eventMouse;
   e.attachEvent(p);
   o.lsnsMouseUp.process(e);
}
function RWindow_ohMouseWheel(p){
   var o = RWindow;
   if(!p){
      p = o._hWindow.event;
   }
   var e = o._eventMouse;
   e.attachEvent(p);
   o.lsnsMouseWheel.process(e);
}
function RWindow_ohKeyDown(hEvent){
   var o = RWindow;
   if(!hEvent){
      hEvent = o._hWindow.event;
   }
   var event = o._eventKey;
   event.attachEvent(hEvent);
   o.lsnsKeyDown.process(event);
}
function RWindow_ohKeyUp(hEvent){
   var o = RWindow;
   if(!hEvent){
      hEvent = o._hWindow.event;
   }
   var event = o._eventKey;
   event.attachEvent(hEvent);
   o.lsnsKeyUp.process(event);
}
function RWindow_ohKeyPress(hEvent){
   var o = RWindow;
   if(!hEvent){
      hEvent = o._hWindow.event;
   }
   var event = o._eventKey;
   event.attachEvent(hEvent);
   o.lsnsKeyPress.process(event);
}
function RWindow_ohResize(hEvent){
   var o = RWindow;
   if(!hEvent){
      hEvent = o._hWindow.event;
   }
   var event = o._eventResize;
   event.attachEvent(hEvent);
   o.lsnsResize.process(event);
}
function RWindow_ohSelect(event){
   return RWindow._optionSelect;
}
function RWindow_ohOrientation(hEvent){
   var o = RWindow;
   var event = o._eventOrientation;
   if((window.orientation == 180) || (window.orientation == 0)){
      event.orientationCd = EOrientation.Vertical;
   }else if((window.orientation == 90) || (window.orientation == -90)){
      event.orientationCd = EOrientation.Horizontal;
   }else{
      throw new TError(o, 'Unknown orientation mode.');
   }
   o.lsnsOrientation.process(event);
}
function RWindow_ohUnload(event){
   var o = RWindow;
   var event = o._eventUnload;
   o.lsnsUnload.process(event);
   RWindow.dispose();
}
function RWindow_connect(hHtml){
   var o = this;
   var hWindow = o._hWindow = hHtml;
   var hDocument = o._hDocument = hWindow.document;
   var hContainer = o._hContainer = hDocument.body;
   if(RBrowser.supportHtml5()){
      hContainer.addEventListener('mousedown', o.ohMouseDown, true);
      hContainer.addEventListener('mousemove', o.ohMouseMove, true);
      hContainer.addEventListener('mouseup', o.ohMouseUp, true);
      hContainer.addEventListener('mousewheel', o.ohMouseWheel, true);
      hContainer.addEventListener('keydown', o.ohKeyDown, true);
      hContainer.addEventListener('keyup', o.ohKeyUp, true);
      hContainer.addEventListener('keypress', o.ohKeyPress, true);
      hWindow.addEventListener('orientationchange', o.ohOrientation);
   }else{
      hContainer.onmousedown = o.ohMouseDown;
      hContainer.onmousemove = o.ohMouseMove;
      hContainer.onmouseup = o.ohMouseUp;
      hContainer.onmousewheel = o.ohMouseWheel;
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
function RWindow_storage(scopeCd){
   var o = this;
   switch(scopeCd){
      case EScope.Local:
         var storage = o._localStorage;
         if(!storage){
            storage = o._localStorage = RClass.create(FWindowStorage);
            storage.link(window.localStorage);
         }
         return storage;
      case EScope.Session:
         var storage = o._sessionStorage;
         if(!storage){
            storage = o._sessionStorage = RClass.create(FWindowStorage);
            storage.link(window.sessionStorage);
         }
         return storage;
   }
   throw new TError(o, 'Unknown scope. (scope_cd={1})', scopeCd);
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
function RWindow_appendElement(hPanel){
   RAssert.debugNotNull(control);
   this._hContainer.appendChild(hPanel);
}
function RWindow_redirect(){
}
function RWindow_historyForward(){
}
function RWindow_historyBack(){
}
function RWindow_dispose(){
   var o = this;
   var hWindow = o._hWindow;
   var hDocument = o._hDocument;
   var hContainer = o._hContainer;
   if(RBrowser.supportHtml5()){
      hContainer.removeEventListener('mousedown', o.ohMouseDown, true);
      hContainer.removeEventListener('mousemove', o.ohMouseMove, true);
      hContainer.removeEventListener('mouseup', o.ohMouseUp, true);
      hContainer.removeEventListener('mousewheel', o.ohMouseWheel, true);
      hContainer.removeEventListener('keydown', o.ohKeyDown, true);
      hContainer.removeEventListener('keyup', o.ohKeyUp, true);
      hContainer.removeEventListener('keypress', o.ohKeyPress, true);
      hWindow.removeEventListener('orientationchange', o.ohOrientation);
   }else{
      hContainer.onmousedown = null;
      hContainer.onmousemove = null;
      hContainer.onmouseup = null;
      hContainer.onmousewheel = null;
      hContainer.onkeydown = null;
      hContainer.onkeyup = null;
      hContainer.onkeypress = null;
   }
   hContainer.onresize = null;
   hContainer.onselectstart = null;
   hContainer.onunload = null;
   o._localStorage = RObject.dispose(o._localStorage);
   o._sessionStorage = RObject.dispose(o._sessionStorage);
   o._hWindow = null;
   o._hDocument = null;
   o._hContainer = null;
   o._eventMouse = RObject.dispose(o._eventMouse);
   o._eventKey = RObject.dispose(o._eventKey);
   o._eventResize = RObject.dispose(o._eventResize);
   o._eventOrientation = RObject.dispose(o._eventOrientation);
   o._eventUnload = RObject.dispose(o._eventUnload);
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
