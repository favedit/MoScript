MO.EBrowser = new function EBrowser(){
   var o = this;
   o.Unknown = 0;
   o.Explorer = 1;
   o.FireFox = 2;
   o.Chrome = 3;
   o.Safari = 4;
   return o;
}
MO.EDevice = new function EDevice(){
   var o = this;
   o.Unknown = 0;
   o.Pc = 1;
   o.Mobile = 2;
   return o;
}
MO.ESoftware = new function ESoftware(){
   var o = this;
   o.Unknown = 0;
   o.Window = 1;
   o.Linux = 2;
   o.Android = 3;
   o.Apple = 4;
   return o;
}
MO.SBrowserCapability = function SBrowserCapability(){
   var o = this;
   o.optionProcess = false;
   o.optionStorage = false;
   o.blobCreate    = false;
   return o;
}
with(MO){
   MO.STouchEvent = function STouchEvent(){
      var o = this;
      o.dispose = STouchEvent_dispose;
      return o;
   }
   MO.STouchEvent_dispose = function STouchEvent_dispose(){
      var o = this;
   }
}
with(MO){
   MO.TDumpItem = function TDumpItem(){
      var o = this;
      o.hParent      = null;
      o.hPanel       = null;
      o.hDocument    = null;
      o.hTable       = null;
      o.hText        = null;
      o.hRow         = null;
      o.link         = null;
      o.level        = 0;
      o.caption      = null;
      o.children     = new Array();
      o.items        = new Array();
      o.loaded       = false;
      o.innerDisplay = false;
      o.display      = false;
      o.create       = TDumpItem_create;
      o.push         = TDumpItem_push;
      o.innerShow    = TDumpItem_innerShow;
      o.show         = TDumpItem_show;
      return o;
   }
   MO.TDumpItem_create = function TDumpItem_create(){
      var o = this;
      var r = o.children[o.children.length] = new TDumpItem();
      return r;
   }
   MO.TDumpItem_push = function TDumpItem_push(v){
      var o = this;
      o.items[o.items.length] = v;
   }
   MO.TDumpItem_innerShow = function TDumpItem_innerShow(v){
      var o = this;
      var c = o.items.length;
      for(var n = 0; n < c; n++){
         var tr = o.items[n];
         RHtml.visibleSet(tr, v);
      }
      var c = o.children.length;
      for(var n = 0; n < c; n++){
         var d = o.children[n];
         RHtml.visibleSet(d.hRow, v);
         if(v){
            d.show(d.innerDisplay);
         }else{
            d.innerDisplay = d.display;
            d.show(false);
         }
      }
   }
   MO.TDumpItem_show = function TDumpItem_show(v){
      var o = this;
      o.display = v;
      var label = RString.repeat('   ', o.level-1) + (v ? ' -' : ' +') + ' ' + o.caption;
      o.hText.innerHTML = RHtml.toHtml(label);
      o.innerShow(v);
   }
}
with(MO){
   MO.FImage = function FImage(o){
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
   MO.FImage_ohLoad = function FImage_ohLoad(){
      var o = this.__linker;
      var hImage = o._hImage;
      o._size.set(hImage.naturalWidth, hImage.naturalHeight);
      o._ready = true;
      var event = new SEvent(o);
      o.processLoadListener(event);
      event.dispose();
   }
   MO.FImage_ohError = function FImage_ohError(p){
      var o = this.__linker;
      var url = o._url;
      RLogger.error(o, 'Load image failure. (url={1})', url);
   }
   MO.FImage_construct = function FImage_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._size = new SSize2();
   }
   MO.FImage_optionAlpha = function FImage_optionAlpha(){
      return this._optionAlpha;
   }
   MO.FImage_setOptionAlpha = function FImage_setOptionAlpha(p){
      this._optionAlpha = p;
   }
   MO.FImage_size = function FImage_size(){
      return this._size;
   }
   MO.FImage_image = function FImage_image(){
      return this._hImage;
   }
   MO.FImage_url = function FImage_url(){
      return this._url;
   }
   MO.FImage_testReady = function FImage_testReady(){
      return this._ready;
   }
   MO.FImage_loadUrl = function FImage_loadUrl(p){
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
   MO.FImage_dispose = function FImage_dispose(){
      var o = this;
      o._size = RObject.dispose(o._size);
      o._hImage = RHtml.free(o._hImage);
      o.__base.MListenerLoad.dispose.call(o);
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FTouchTracker = function FTouchTracker(o){
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
   MO.FTouchTracker_construct = function FTouchTracker_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._touchs = new TObjects();
      o._touchPool = RClass.create(FObjectPool);
      o._touchZoomEvent = new SEvent(o);
   }
   MO.FTouchTracker_calculateLength = function FTouchTracker_calculateLength(hEvent){
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
   MO.FTouchTracker_eventStart = function FTouchTracker_eventStart(hEvent){
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
   MO.FTouchTracker_eventMove = function FTouchTracker_eventMove(hEvent){
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
   MO.FTouchTracker_eventStop = function FTouchTracker_eventStop(hEvent){
      var o = this;
   }
   MO.FTouchTracker_dispose = function FTouchTracker_dispose(){
      var o = this;
      o._touchs = RObject.dispose(o._touchs);
      o._touchZoomEvent = RObject.dispose(o._touchZoomEvent);
      o.__base.MListenerTouchZoom.dispose.call(o);
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FWindowStorage = function FWindowStorage(o){
      o = RClass.inherits(this, o, FObject);
      o._scopeCd  = null;
      o._storage  = null;
      o.scopeCd   = FWindowStorage_scopeCd;
      o.link      = FWindowStorage_link;
      o.get       = FWindowStorage_get;
      o.set       = FWindowStorage_set;
      o.remove    = FWindowStorage_remove;
      o.clear     = FWindowStorage_clear;
      o.dispose   = FWindowStorage_dispose;
      o.innerDump = FWindowStorage_innerDump;
      return o;
   }
   MO.FWindowStorage_scopeCd = function FWindowStorage_scopeCd(){
      return this._scopeCd;
   }
   MO.FWindowStorage_link = function FWindowStorage_link(storage){
      this._storage = storage;
   }
   MO.FWindowStorage_get = function FWindowStorage_get(name){
      return this._storage.getItem(name);
   }
   MO.FWindowStorage_set = function FWindowStorage_set(name, value){
      this._storage.setItem(name, value);
   }
   MO.FWindowStorage_remove = function FWindowStorage_remove(name){
      this._storage.removeItem(name);
   }
   MO.FWindowStorage_clear = function FWindowStorage_clear(){
      this._storage.clear();
   }
   MO.FWindowStorage_dispose = function FWindowStorage_dispose(){
      var o = this;
      o._storage  = null;
      o.__base.FObject.dispose.call(o);
   }
   MO.FWindowStorage_innerDump = function FWindowStorage_innerDump(dump, level){
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
}
with(MO){
   MO.RApplication = function RApplication(){
      var o = this;
      o._workspaces = new TDictionary();
      return o;
   }
   MO.RApplication.prototype.initialize = function RApplication_initialize(){
      var o = this;
      RBrowser.construct();
      RWindow.connect(window);
      RKeyboard.construct();
   }
   MO.RApplication.prototype.findWorkspace = function RApplication_findWorkspace(p){
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
   MO.RApplication.prototype.release = function RApplication_release(){
      try{
         CollectGarbage();
      }catch(e){
         RLogger.error(e);
      }
   }
   MO.RApplication = new RApplication();
}
with(MO){
   MO.RBrowser = function RBrowser(){
      var o = this;
      o._capability   = null;
      o._deviceCd     = MO.EDevice.Unknown;
      o._softwareCd   = MO.ESoftware.Unknown;
      o._typeCd       = MO.EBrowser.Unknown;
      o._supportHtml5 = false;
      o._hostPath     = '';
      o._contentPath  = '';
      return o;
   }
   MO.RBrowser.prototype.onLog = function RBrowser_onLog(s, p){
      console.log(p);
   }
   MO.RBrowser.prototype.construct = function RBrowser_construct(){
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
   MO.RBrowser.prototype.capability = function RBrowser_capability(){
      return this._capability;
   }
   MO.RBrowser.prototype.supportHtml5 = function RBrowser_supportHtml5(){
      return this._supportHtml5;
   }
   MO.RBrowser.prototype.hostPath = function RBrowser_hostPath(p){
      var o = this;
      if(p){
         return o._hostPath + p;
      }
      return o._hostPath;
   }
   MO.RBrowser.prototype.setHostPath = function RBrowser_setHostPath(p){
      this._hostPath = p;
   }
   MO.RBrowser.prototype.contentPath = function RBrowser_contentPath(p){
      var o = this;
      if(p){
         return o._contentPath + p;
      }
      return o._contentPath;
   }
   MO.RBrowser.prototype.setContentPath = function RBrowser_setContentPath(p){
      this._contentPath = p;
   }
   MO.RBrowser.prototype.isBrowser = function RBrowser_isBrowser(p){
      return this._typeCd == p;
   }
   MO.RBrowser.prototype.encode = function RBrowser_encode(value){
      return escape(value);
   }
   MO.RBrowser.prototype.decode = function RBrowser_decode(value){
      return unescape(value);
   }
   MO.RBrowser.prototype.urlEncode = function RBrowser_urlEncode(url, flag){
      if(flag){
         return encodeURIComponent(url);
      }
      return encodeURI(url);
   }
   MO.RBrowser.prototype.urlDecode = function RBrowser_urlDecode(url, flag){
      if(flag){
         return decodeURIComponent(url);
      }
      return decodeURI(url);
   }
   MO.RBrowser = new RBrowser();
}
with(MO){
   MO.RBuilder = function RBuilder(){
      return this;
   }
   MO.RBuilder.prototype.create = function RBuilder_create(h, t, s){
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
   MO.RBuilder.prototype.createIcon = function RBuilder_createIcon(d, s, u, w, h){
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
   MO.RBuilder.prototype.createImage = function RBuilder_createImage(d, s, u, w, h){
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
   MO.RBuilder.prototype.createText = function RBuilder_createText(d, s, v){
      var r = this.create(d, 'SPAN', s);
      if(v){
         r.innerHTML = v;
      }
      return r;
   }
   MO.RBuilder.prototype.createButton = function RBuilder_createButton(d, s){
      var r = this.create(d, "INPUT", s);
      r.type = 'button';
      return r;
   }
   MO.RBuilder.prototype.createCheck = function RBuilder_createCheck(d, s){
      var r = this.create(d, "INPUT", s);
      r.type = 'checkbox';
      return r;
   }
   MO.RBuilder.prototype.createRadio = function RBuilder_createRadio(d, s){
      var r = this.create(d, "INPUT", s);
      r.type = 'radio';
      return r;
   }
   MO.RBuilder.prototype.createEdit = function RBuilder_createEdit(d, s){
      var r = this.create(d, "INPUT", s);
      r.type = 'text';
      return r;
   }
   MO.RBuilder.prototype.createFile = function RBuilder_createFile(d, s){
      var r = this.create(d, "INPUT", s);
      r.type = 'file';
      return r;
   }
   MO.RBuilder.prototype.createSpan = function RBuilder_createSpan(d, s){
      return this.create(d, 'SPAN', s);
   }
   MO.RBuilder.prototype.createDiv = function RBuilder_createDiv(d, s){
      return this.create(d, 'DIV', s);
   }
   MO.RBuilder.prototype.createTable = function RBuilder_createTable(d, s, b, cs, cp){
      var h = this.create(d, 'TABLE', s);
      if(b){
         h.border = RInteger.nvl(b);
      }
      h.cellSpacing = RInteger.nvl(cs);
      h.cellPadding = RInteger.nvl(cp);
      return h;
   }
   MO.RBuilder.prototype.createTableRow = function RBuilder_createTableRow(d, s){
      var h = this.create(d, 'TR', s);
      return h;
   }
   MO.RBuilder.prototype.createTableCell = function RBuilder_createTableCell(d, s){
      var h = this.create(d, 'TD', s);
      return h;
   }
   MO.RBuilder.prototype.createFragment = function RBuilder_createFragment(document){
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
   MO.RBuilder.prototype.append = function RBuilder_append(p, t, s){
      var r = RBuilder.create(p.ownerDocument, t, s);
      if(p){
         p.appendChild(r);
      }else{
         this.hDocument.body.appendChild(r);
      }
      return r;
   }
   MO.RBuilder.prototype.appendIcon = function RBuilder_appendIcon(p, s, u, w, h){
      var r = this.createIcon(p.ownerDocument, s, u, w, h);
      p.appendChild(r);
      return r;
   }
   MO.RBuilder.prototype.appendImage = function RBuilder_appendImage(p, s, u, w, h){
      var r = this.createImage(p.ownerDocument, s, u, w, h);
      p.appendChild(r);
      return r;
   }
   MO.RBuilder.prototype.appendEmpty = function RBuilder_appendEmpty(p, w, h){
      var r = this.createIcon(p.ownerDocument, null, 'n', w, h);
      p.appendChild(r);
      return r;
   }
   MO.RBuilder.prototype.appendText = function RBuilder_appendText(p, s, v){
      var r = this.createText(p.ownerDocument, s, v);
      p.appendChild(r);
      return r;
   }
   MO.RBuilder.prototype.appendButton = function RBuilder_appendButton(p, s){
      var r = this.createButton(p.ownerDocument, s);
      p.appendChild(r);
      return r;
   }
   MO.RBuilder.prototype.appendCheck = function RBuilder_appendCheck(p, s){
      var r = this.createCheck(p.ownerDocument, s);
      p.appendChild(r);
      return r;
   }
   MO.RBuilder.prototype.appendRadio = function RBuilder_appendRadio(p, s){
      var r = this.createRadio(p.ownerDocument, s);
      p.appendChild(r);
      return r;
   }
   MO.RBuilder.prototype.appendEdit = function RBuilder_appendEdit(p, s){
      var r = this.createEdit(p.ownerDocument, s);
      p.appendChild(r);
      return r;
   }
   MO.RBuilder.prototype.appendFile = function RBuilder_appendFile(p, s){
      var r = this.createFile(p.ownerDocument, s);
      p.appendChild(r);
      return r;
   }
   MO.RBuilder.prototype.appendSpan = function RBuilder_appendSpan(p, s){
      var r = this.createSpan(p.ownerDocument, s);
      p.appendChild(r);
      return r;
   }
   MO.RBuilder.prototype.appendDiv = function RBuilder_appendDiv(p, s){
      var r = this.createDiv(p.ownerDocument, s);
      p.appendChild(r);
      return r;
   }
   MO.RBuilder.prototype.appendTable = function RBuilder_appendTable(p, s, b, cs, cp){
      var r = this.createTable(p.ownerDocument, s, b, cs, cp);
      if(p){
         p.appendChild(r);
      }else{
         this.hDocument.body.appendChild(r);
      }
      return r;
   }
   MO.RBuilder.prototype.appendTableRow = function RBuilder_appendTableRow(p, s, i, h){
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
   MO.RBuilder.prototype.appendTableRowCell = function RBuilder_appendTableRowCell(p, s, w, h){
      var o = this;
      var hr = o.appendTableRow(p, null, null, w);
      var hc = o.appendTableCell(hr, s, null, h);
      return hc;
   }
   MO.RBuilder.prototype.appendTableCell = function RBuilder_appendTableCell(p, s, i, w){
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
   MO.RBuilder = new RBuilder();
}
with(MO){
   MO.RContext = function RContext(){
      var o = this;
      o._location   = null;
      o._contexts   = new Object();
      o.contextPath = null;
      o.contextTag  = null;
      o.themeId     = null;
      o.languageId  = null;
      return o;
   }
   MO.RContext.prototype.location = function RContext_location(s){
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
   MO.RContext.prototype.context = function RContext_context(s){
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
   MO.RContext.prototype.initialize = function RContext_initialize(s){
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
   MO.RContext.prototype.get = function RContext_get(p, p1, p2, p3, p4, p5){
      var o = this;
      var r = o._contexts[p];
      if(!r){
         return RLogger.fatal(o, null, 'Can not find context (path={1})', p);
      }
      return RString.format(r.text, p1, p2, p3, p4, p5)
   }
   MO.RContext.prototype.find = function RContext_find(s, c){
      var o = this;
      var id = s + ':' + c;
      var r = o._contexts[id];
      if(!r){
         return RLogger.fatal(o, null, 'Can not find context (id={1})', id);
      }
      return r.text;
   }
   MO.RContext = new RContext();
}
with(MO){
   MO.RDump = function RDump(){
      var o = this;
      o.LINE_SINGLE = '------------------------------';
      o.LINE_DOUBLE = '==============================';
      o.LINE_DOT    = '..............................';
      o.LINE_STAR   = '******************************';
      return o;
   }
   MO.RDump.prototype.onclick = function RDump_onclick(){
      var o = this;
      var d = o.link;
      if(o.link){
         if(d.loaded){
            d.show(!d.display);
         }else{
            RDump.dumpInner(o.link);
            d.loaded = true;
            d.show(true);
         }
      }
   }
   MO.RDump.prototype.nameInfo = function RDump_nameInfo(v){
      var t = RClass.typeOf(v);
      switch(t){
         case 'Unknown':
            return '@unknown';
         case 'Function':
            return RMethod.name(v) + '@Function';
         case 'Array':
            return '@<Array>';
      }
      return v;
   }
   MO.RDump.prototype.typeInfo = function RDump_typeInfo(v, t){
      if(v == null){
         return 'null';
      }
      switch(t){
         case 'Unknown':
            return 'unknown';
         case 'Undefined':
            return 'undefined';
         case 'Boolean':
         case 'Number':
            return v.toString();
         case 'String':
            return v.length + ':\'' + RString.toLine(v) + '\'';
         case 'Function':
            if(v.__virtual){
               return 'virtual';
            }
            return RMethod.name(v, true);
         case 'Array':
            return '@<Array@' + RClass.code(v) + '> length=' + v.length;
         case 'Html':
            return '@<' + v.tagName + '>';
         default:
            if(v.constructor == TClass){
               return '@<' + v.name + '@' + RClass.code(v) + '>';
            }
            if(v.constructor == Function){
               return "@" + v.toString();
            }
            try{
               for(var name in v){
                  return '@<Object@' + RClass.code(v) + '>';
               }
            }catch(e){}
            return '<Object@' + RClass.code(v) + '>';
      }
   }
   MO.RDump.prototype.dumpInner = function RDump_dumpInner(di){
      var hTable  = di.hTable;
      var hParent = di.hParent;
      var hInsRow = di.hRow;
      var level   = di.level;
      var obj     = di.link;
      var type    = RClass.typeOf(obj, true);
      var vcls    = obj.__class;
      var names = new Array();
      for(var name in obj){
         names[names.length] = name;
      }
      if(RString.endsWith(type, 'Array')){
         RArray.reverse(names, 0, names.length - 1);
      }else{
         RArray.sort(names, true);
      }
      var items = new Array();
      var c = names.length;
      if(c > 2000){
         c = 2000;
      }
      for(var n = 0; n < c; n++){
         var name = names[n];
         var value = '{error}';
         try{
            value = obj[name];
         }catch(e){}
         var stype = RClass.safeTypeOf(value, true);
         var type = RClass.safeTypeOf(value, true);
         var info = null;
         var infoFormat = true;
         if(vcls){
            var ann = vcls.attributeFind(name);
            if(ann){
               type = 'Annotation<' + RMethod.name(ann.constructor) + '>'
               if(value && value.constructor == Function){
                  info = "<FONT color='green'>" + RMethod.name(value) + "</FONT>";
               }else{
                  info = value + "<FONT color='green'> - (" + RHtml.toHtml(ann.toString()) + ")</FONT>";
               }
               infoFormat = false;
            }
         }
         if(info == null){
            info = this.typeInfo(value, type);
         }
         var rdi = null;
         var index = hInsRow ? hInsRow.rowIndex + 1 : 0;
         var hRow = RBuilder.appendTableRow(hTable, null, index);
         hRow.bgColor = '#FFFFFF';
         if(RString.startsWith(info, '@')){
            hRow.style.cursor = 'pointer';
            hRow.onclick = this.onclick;
            hRow.bgColor = '#FFF0E0';
            rdi = hRow.link = di.create();
            rdi.link = value;
            rdi.level = level;
            rdi.caption = name;
            rdi.hTable = hTable;
            rdi.level = level + 1;
            rdi.hRow = hRow;
         }else{
            di.push(hRow);
         }
         if((type == 'Function') && (info == 'virtual')){
            hRow.bgColor = '#E0F0FF';
         }
         var hCell = RBuilder.appendTableCell(hRow);
         var icon = RString.startsWith(info, '@') ? ' +' : '  ';
         var label = RString.repeat('   ', level) + icon + ' ' + name
         hCell.innerHTML = RHtml.toHtml(label);
         hCell.style.borderBottom = '1px solid #F0F0F0';
         hCell.width = '240px'
         if(rdi){
            rdi.hText = hCell;
         }
         var hCell = RBuilder.appendTableCell(hRow);
         hCell.innerHTML = RHtml.toHtml(type);
         hCell.style.borderBottom = '1px solid #F0F0F0';
         if(type == 'Function'){
            hCell.style.color = '#3333FF';
         }else{
            hCell.style.color = '#FF3333';
         }
         hCell.width = '200px'
         var hCell = RBuilder.appendTableCell(hRow);
         if(RString.startsWith(info, '@')){
            info = info.substr(1);
         }
         if(infoFormat){
            hCell.innerHTML = RHtml.toHtml(info);
         }else{
            hCell.innerHTML = info;
         }
         hCell.style.borderBottom = '1px solid #F0F0F0';
      }
      hTable.width = '100%'
   }
   MO.RDump.prototype.dump = function RDump_dump(value, hPanel){
      if(!hPanel){
         hPanel = RBuilder.append(null, 'DIV')
      }
      var s = new TString();
      s.append('<', RClass.safeTypeOf(value));
      if(value && value.tagName){
         s.append(' - ', value.tagName);
      }
      s.appendLine('@' + RClass.code(value) + '>');
      var hPanel = RBuilder.append(hPanel, 'DIV');
      hPanel.style.border = '1px solid #BBBBBB';
      hPanel.style.backgroundColor = '#E0E0EB';
      var hTitleTable = RBuilder.appendTable(hPanel, null, null, 0, 1, 0);
      var hRow = RBuilder.appendTableRow(hTitleTable);
      var hCell = RBuilder.appendTableCell(hRow);
      hTitleTable.width = '100%'
      hCell.style.padding = 2;
      hCell.style.borderBottom = '1px solid gray';
      hCell.style.backgroundColor = '#E0E0EB';
      RHtml.textSet(hCell, s.toString());
      var hTable = RBuilder.appendTable(hPanel, null, null, 0, 1, 0);
      hTable.style.width = '100%';
      var di = new TDumpItem();
      di.hTable = hTable;
      di.hRow = null;
      di.hParent = hPanel;
      di.link = value;
      di.level = 0;
      this.dumpInner(di);
   }
   MO.RDump.prototype.appendLevel = function RDump_appendLevel(r, l){
      for(var n = 0; n < l; n++){
         r.append('   ');
      }
   }
   MO.RDump.prototype.stack = function RDump_stack(){
      var o = RDump_stack.caller;
      var s = new TString();
      while(o){
         s.append(RMethod.name(o));
         o = o.caller;
         if(o){
            s.appendLine();
         }
      }
      RLogger.debug(this, s);
   }
   MO.RDump = new RDump();
}
with(MO){
   MO.RHtml = function RHtml(){
      var o = this;
      o._nextUid        = 1;
      o._links          = new Object();
      o._clientPosition = new MO.SPoint2();
      return o;
   }
   MO.RHtml.prototype.uid = function RHtml_uid(v){
      var r = v.__puuid;
      if(r == null){
         r = v.__puuid = RHtml._nextUid++;
      }
      return r;
   }
   MO.RHtml.prototype.fullscreen = function RHtml_fullscreen(h, f){
      if(f){
         if (h.requestFullscreen){
            h.requestFullscreen();
         }else if(h.mozRequestFullScreen){
            h.mozRequestFullScreen();
         }else if(h.webkitRequestFullScreen){
            h.webkitRequestFullScreen();
         }
      }else{
         if (h.exitFullscreen){
            h.exitFullscreen();
         }else if(h.mozCancelFullScreen){
            h.mozCancelFullScreen();
         }else if(h.webkitCancelFullScreen){
            h.webkitCancelFullScreen();
         }
      }
   }
   MO.RHtml.prototype.displayGet = function RHtml_displayGet(h){
      var r = null;
      var s = h.style.display;
      if(RBrowser.isBrowser(EBrowser.Explorer)){
         r = (s == 'inline');
      }else{
         r = (s != 'none');
      }
      return r;
   }
   MO.RHtml.prototype.displaySet = function RHtml_displaySet(h, v){
      var s = null;
      if(RBrowser.isBrowser(EBrowser.Explorer)){
         s = v ? 'inline' : 'none';
      }else{
         s = v ? null : 'none';
      }
      h.style.display = s;
   }
   MO.RHtml.prototype.visibleGet = function RHtml_visibleGet(h){
      var r = null;
      var s = h.style.display;
      if(RBrowser.isBrowser(EBrowser.Explorer)){
         r = (s == 'block');
      }else{
         r = (s != 'none');
      }
      return r;
   }
   MO.RHtml.prototype.visibleSet = function RHtml_visibleSet(h, v){
      var s = null;
      if(RBrowser.isBrowser(EBrowser.Explorer)){
         s = v ? '' : 'none';
      }else{
         s = v ? null : 'none';
      }
      h.style.display = s;
   }
   MO.RHtml.prototype.textGet = function RHtml_textGet(h, v){
      var r = null;
      if(RBrowser.isBrowser(EBrowser.FireFox)){
         r = h.textContent;
      }else{
         r = h.innerText;
      }
      return r;
   }
   MO.RHtml.prototype.textSet = function RHtml_textSet(h, v){
      if(RBrowser.isBrowser(EBrowser.FireFox)){
         h.textContent = v;
      }else{
         h.innerText = v;
      }
   }
   MO.RHtml.prototype.checkGet = function RHtml_checkGet(h){
      return RBool.toString(h.checked);
   }
   MO.RHtml.prototype.checkSet = function RHtml_checkSet(h, v){
      h.checked = RBool.isTrue(v);
   }
   MO.RHtml.prototype.radioGet = function RHtml_radioGet(hs){
      if(hs){
         var c = hs.length;
         for(var n = 0; n < c; n++){
            var h = hs[n];
            if(h.checked){
               return h.value;
            }
         }
      }
      return null;
   }
   MO.RHtml.prototype.radioSet = function RHtml_radioSet(hs, v){
      if(hs){
         var c = hs.length;
         for(var n=0; n < c; n++){
            var h = hs[n];
            if(h.value == v){
               h.checked = true;
               break;
            }
         }
      }
   }
   MO.RHtml.prototype.cursorSet = function RHtml_cursorSet(h, v){
      if(h){
         h.style.cursor = v;
      }
   }
   MO.RHtml.prototype.linkGet = function RHtml_linkGet(h, n){
      var o = this;
      var u = o.uid(h);
      var i = o._links[u];
      return i ? i.get(n) : null;
   }
   MO.RHtml.prototype.linkSet = function RHtml_linkSet(h, n, v){
      var o = this;
      var ls = o._links;
      var u = o.uid(h);
      var i = ls[u];
      if(!i){
         i = ls[u] = new THtmlItem();
         i._link = h;
      }
      i.set(n, v);
   }
   MO.RHtml.prototype.clientPosition = function RHtml_clientPosition(hTag, hTop){
      var o = this;
      var position = o._clientPosition;
      position.set(0, 0);
      while(hTag != hTop){
         position.x += hTag.offsetLeft + hTag.clientLeft - hTag.scrollLeft;
         position.y += hTag.offsetTop + hTag.clientTop - hTag.scrollTop;
         hTag = hTag.offsetParent;
      }
      return position;
   }
   MO.RHtml.prototype.clientX = function RHtml_clientX(p, t){
      var r = 0;
      while(p != t){
         r += p.offsetLeft - p.scrollLeft;
         p = p.offsetParent;
      }
      return r;
   }
   MO.RHtml.prototype.clientY = function RHtml_clientY(p, t){
      var r = 0;
      while(p != t){
         r += p.offsetTop - p.scrollTop;
         p = p.offsetParent;
      }
      return r;
   }
   MO.RHtml.prototype.setSize = function RHtml_setSize(h, s){
      if(s.width){
         h.style.width = s.width + 'px';
      }
      if(s.height){
         h.style.height = s.height + 'px';
      }
   }
   MO.RHtml.prototype.toText = function RHtml_toText(p){
      if(p != null){
         p = p.toString();
         p = p.replace(/&lt;/, '<');
         p = p.replace(/&gt;/g, '>');
         p = p.replace(/&nbsp;/g, ' ');
         p = p.replace(/<BR>/g, '\n');
      }
      return p;
   }
   MO.RHtml.prototype.toHtml = function RHtml_toHtml(p){
      if(p != null){
         p = p.toString();
         p = p.replace(/</g, '&lt;');
         p = p.replace(/>/g, '&gt;');
         p = p.replace(/ /g, '&nbsp;');
         p = p.replace(/\n/g, '<BR>');
         p = p.replace(/\\n/g, '<BR>');
         p = p.replace(/\r/g, '');
         p = p.replace(/\\r/g, '');
      }
      return p;
   }
   MO.RHtml.prototype.eventSource = function RHtml_eventSource(p){
      return p.srcElement ? p.srcElement : p.target;
   }
   MO.RHtml.prototype.get = function RHtml_get(name){
      return document.getElementById(name);
   }
   MO.RHtml.prototype.parent = function RHtml_parent(tag, typeName){
      if(tag && t){
         typeName = typeName.toLowerCase();
         while(tag){
            if(tag.tagName.toLowerCase() == typeName){
               return tag;
            }
            tag = tag.parentElement;
         }
      }
      return null;
   }
   MO.RHtml.prototype.searchLinker = function RHtml_searchLinker(h, c){
      while(h){
         var f = h.__linker;
         if(f){
            if(RClass.isClass(f, c)){
               return f;
            }
         }
         h = h.parentElement;
      }
      return null;
   }
   MO.RHtml.prototype.searchObject = function RHtml_searchObject(h, n){
      while(h){
         var f = h[n];
         if(f){
            return f;
         }
         h = h.parentElement;
      }
      return null;
   }
   MO.RHtml.prototype.tableMoveRow = function RHtml_tableMoveRow(ph, ps, pt){
      if(ph.tagName != 'TABLE'){
         throw new TError('Html table is invalid.');
      }
      if(ps == pt){
         return false;
      }
      if(ph.moveRow){
         ph.moveRow(ps, pt);
      }else{
         var hb = ph.getElementsByTagName('tbody')[0];
         var sr = hb.rows[ps];
         var tr = hb.rows[pt];
         if((sr == null) || (tr == null)){
            return false;
         }
         var nr = null;
         if(ps <= pt){
            nr = tr;
            while(nr = nr.nextSibling){
               if(nr.tagName == 'TR'){
                  break;
               }
            }
         }
         if(nr == null){
            hb.insertBefore(sr, tr);
         }else{
            if(nr == null){
               hb.appendChild(sr);
            }else{
               hb.insertBefore(sr, nr);
            }
         }
      }
      return true;
   }
   MO.RHtml.prototype.free = function RHtml_free(p){
      return null;
   }
   MO.RHtml = new RHtml();
}
with(MO){
   MO.RValue = function RValue(){
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
      o.construct();
      return o;
   }
   MO.RValue.prototype.construct = function RValue_construct(){
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
   MO.RValue = new RValue();
}
with(MO){
   MO.RWindow = function RWindow(){
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
      return o;
   }
   MO.RWindow.prototype.ohMouseDown = function RWindow_ohMouseDown(p){
      var o = RWindow;
      if(!p){
         p = o._hWindow.event;
      }
      var e = o._eventMouse;
      e.attachEvent(p);
      o.lsnsMouseDown.process(e);
   }
   MO.RWindow.prototype.ohMouseMove = function RWindow_ohMouseMove(p){
      var o = RWindow;
      if(!p){
         p = o._hWindow.event;
      }
      var e = o._eventMouse;
      e.attachEvent(p);
      o.lsnsMouseMove.process(e);
   }
   MO.RWindow.prototype.ohMouseUp = function RWindow_ohMouseUp(p){
      var o = RWindow;
      if(!p){
         p = o._hWindow.event;
      }
      var e = o._eventMouse;
      e.attachEvent(p);
      o.lsnsMouseUp.process(e);
   }
   MO.RWindow.prototype.ohMouseWheel = function RWindow_ohMouseWheel(p){
      var o = RWindow;
      if(!p){
         p = o._hWindow.event;
      }
      var e = o._eventMouse;
      e.attachEvent(p);
      o.lsnsMouseWheel.process(e);
   }
   MO.RWindow.prototype.ohKeyDown = function RWindow_ohKeyDown(hEvent){
      var o = RWindow;
      if(!hEvent){
         hEvent = o._hWindow.event;
      }
      var event = o._eventKey;
      event.attachEvent(hEvent);
      o.lsnsKeyDown.process(event);
   }
   MO.RWindow.prototype.ohKeyUp = function RWindow_ohKeyUp(hEvent){
      var o = RWindow;
      if(!hEvent){
         hEvent = o._hWindow.event;
      }
      var event = o._eventKey;
      event.attachEvent(hEvent);
      o.lsnsKeyUp.process(event);
   }
   MO.RWindow.prototype.ohKeyPress = function RWindow_ohKeyPress(hEvent){
      var o = RWindow;
      if(!hEvent){
         hEvent = o._hWindow.event;
      }
      var event = o._eventKey;
      event.attachEvent(hEvent);
      o.lsnsKeyPress.process(event);
   }
   MO.RWindow.prototype.ohResize = function RWindow_ohResize(hEvent){
      var o = RWindow;
      if(!hEvent){
         hEvent = o._hWindow.event;
      }
      var event = o._eventResize;
      event.attachEvent(hEvent);
      o.lsnsResize.process(event);
   }
   MO.RWindow.prototype.ohSelect = function RWindow_ohSelect(event){
      return RWindow._optionSelect;
   }
   MO.RWindow.prototype.ohOrientation = function RWindow_ohOrientation(hEvent){
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
   MO.RWindow.prototype.ohUnload = function RWindow_ohUnload(event){
      var o = RWindow;
      var event = o._eventUnload;
      o.lsnsUnload.process(event);
      RWindow.dispose();
   }
   MO.RWindow.prototype.connect = function RWindow_connect(hHtml){
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
   MO.RWindow.prototype.optionSelect = function RWindow_optionSelect(){
      return this._optionSelect;
   }
   MO.RWindow.prototype.setOptionSelect = function RWindow_setOptionSelect(p){
      var o = this;
      o._optionSelect = p;
      if(RBrowser.isBrowser(EBrowser.FireFox)){
         o._hContainer.style.MozUserSelect = p ? '' : 'none';
      }
   }
   MO.RWindow.prototype.setCaption = function RWindow_setCaption(p){
      top.document.title = p;
   }
   MO.RWindow.prototype.setStatus = function RWindow_setStatus(p){
      window.status = RString.nvl(p);
   }
   MO.RWindow.prototype.storage = function RWindow_storage(scopeCd){
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
   MO.RWindow.prototype.makeDisablePanel = function RWindow_makeDisablePanel(f){
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
   MO.RWindow.prototype.windowDisable = function RWindow_windowDisable(){
      this._hContainer.disabled = true;
   }
   MO.RWindow.prototype.windowEnable = function RWindow_windowEnable(){
      this._hContainer.disabled = false;
   }
   MO.RWindow.prototype.isEnable = function RWindow_isEnable(){
      return this._statusEnable;
   }
   MO.RWindow.prototype.enable = function RWindow_enable(){
      var o = this;
      o._disableDeep--;
      if(o._disableDeep == 0){
         o.setEnable(true);
      }
   }
   MO.RWindow.prototype.disable = function RWindow_disable(){
      var o = this;
      if(o._disableDeep == 0){
         o.setEnable(false);
      }
      o._disableDeep++;
   }
   MO.RWindow.prototype.setEnable = function RWindow_setEnable(v, f){
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
   MO.RWindow.prototype.appendElement = function RWindow_appendElement(hPanel){
      MO.Assert.debugNotNull(control);
      this._hContainer.appendChild(hPanel);
   }
   MO.RWindow.prototype.redirect = function RWindow_redirect(){
   }
   MO.RWindow.prototype.historyForward = function RWindow_historyForward(){
   }
   MO.RWindow.prototype.historyBack = function RWindow_historyBack(){
   }
   MO.RWindow.prototype.dispose = function RWindow_dispose(){
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
   MO.RWindow = new RWindow();
}
with(MO){
   MO.RXml = function RXml(){
      var o = this;
      o.httpActiveX = false;
      o.httpVendor  = null;
      o.domActiveX  = false;
      o.domVendor   = null;
      o.construct();
      return o;
   }
   MO.RXml.prototype.construct = function RXml_construct(){
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
   MO.RXml.prototype.isNode = function RXml_isNode(n){
      return RClass.isName(n, 'TNode');
   }
   MO.RXml.prototype.createConnection = function RXml_createConnection(){
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
   MO.RXml.prototype.createDocument = function RXml_createDocument(){
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
   MO.RXml.prototype.formatText = function RXml_formatText(s){
      if(s != null){
         s = s.replace(/\\n/g, '\n');
      }
      return s;
   }
   MO.RXml.prototype.buildText = function RXml_buildText(s, v){
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
   MO.RXml.prototype.buildNode = function RXml_buildNode(pd, pn, pe){
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
   MO.RXml.prototype.makeString = function RXml_makeString(s){
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
   MO.RXml.prototype.makeNode = function RXml_makeNode(p){
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
   MO.RXml.prototype.makeDocument = function RXml_makeDocument(p){
      var d = new TXmlDocument();
      if(p.documentElement){
         RXml.buildNode(d, null, p.documentElement);
      }
      return d;
   }
   MO.RXml.prototype.unpack = function RXml_unpack(s, n){
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
   MO.RXml = new RXml();
}
