MO.EBrowser = new function EBrowser(){
   var o = this;
   o.Unknown = 'unknown';
   o.Explorer = 'explorer';
   o.FireFox = 'firefox';
   o.Chrome = 'chrome';
   o.Safari = 'safari';
   return o;
}
MO.EDevice = new function EDevice(){
   var o = this;
   o.Unknown = 'unknown';
   o.Pc = 'pc';
   o.Mobile = 'mobile';
   return o;
}
MO.ESoftware = new function ESoftware(){
   var o = this;
   o.Unknown = 'unknown';
   o.Window = 'window';
   o.Linux = 'linux';
   o.Android = 'android';
   o.Apple = 'apple';
   return o;
}
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
   o._eventMouse       = new MO.SMouseEvent();
   o._eventKey         = new MO.SKeyboardEvent();
   o._eventResize      = new MO.SResizeEvent();
   o._eventOrientation = new MO.SEvent();
   o._eventUnload      = new MO.SEvent();
   o._hWindow          = null;
   o._hDocument        = null;
   o._hContainer       = null;
   o._hDisablePanel    = null;
   o._hDisableImage    = null;
   o.lsnsLoad          = new MO.TListeners();
   o.lsnsLoaded        = new MO.TListeners();
   o.lsnsUnload        = new MO.TListeners();
   o.lsnsMouseDown     = new MO.TListeners();
   o.lsnsMouseUp       = new MO.TListeners();
   o.lsnsMouseOver     = new MO.TListeners();
   o.lsnsMouseMove     = new MO.TListeners();
   o.lsnsMouseWheel    = new MO.TListeners();
   o.lsnsKeyDown       = new MO.TListeners();
   o.lsnsKeyUp         = new MO.TListeners();
   o.lsnsKeyPress      = new MO.TListeners();
   o.lsnsResize        = new MO.TListeners();
   o.lsnsOrientation   = new MO.TListeners();
   o.lsnsDeviceError   = new MO.TListeners();
   return o;
}
MO.RWindow.prototype.ohMouseDown = function RWindow_ohMouseDown(hEvent){
   var o = MO.RWindow;
   if(!hEvent){
      hEvent = o._hWindow.event;
   }
   var event = o._eventMouse;
   event.code = MO.EEvent.MouseDown;
   event.attachEvent(hEvent);
   o.lsnsMouseDown.process(event);
}
MO.RWindow.prototype.ohMouseMove = function RWindow_ohMouseMove(hEvent){
   var o = MO.RWindow;
   if(!hEvent){
      hEvent = o._hWindow.event;
   }
   var event = o._eventMouse;
   event.code = MO.EEvent.MouseMove;
   event.attachEvent(hEvent);
   o.lsnsMouseMove.process(event);
}
MO.RWindow.prototype.ohMouseUp = function RWindow_ohMouseUp(hEvent){
   var o = MO.RWindow;
   if(!hEvent){
      hEvent = o._hWindow.event;
   }
   var event = o._eventMouse;
   event.code = MO.EEvent.MouseUp;
   event.attachEvent(hEvent);
   o.lsnsMouseUp.process(event);
}
MO.RWindow.prototype.ohMouseWheel = function RWindow_ohMouseWheel(hEvent){
   var o = MO.RWindow;
   if(!hEvent){
      hEvent = o._hWindow.event;
   }
   var event = o._eventMouse;
   event.code = MO.EEvent.MouseWheel;
   event.attachEvent(hEvent);
   o.lsnsMouseWheel.process(event);
}
MO.RWindow.prototype.ohKeyDown = function RWindow_ohKeyDown(hEvent){
   var o = MO.RWindow;
   if(!hEvent){
      hEvent = o._hWindow.event;
   }
   var event = o._eventKey;
   event.attachEvent(hEvent);
   o.lsnsKeyDown.process(event);
}
MO.RWindow.prototype.ohKeyUp = function RWindow_ohKeyUp(hEvent){
   var o = MO.RWindow;
   if(!hEvent){
      hEvent = o._hWindow.event;
   }
   var event = o._eventKey;
   event.attachEvent(hEvent);
   o.lsnsKeyUp.process(event);
}
MO.RWindow.prototype.ohKeyPress = function RWindow_ohKeyPress(hEvent){
   var o = MO.RWindow;
   if(!hEvent){
      hEvent = o._hWindow.event;
   }
   var event = o._eventKey;
   event.attachEvent(hEvent);
   o.lsnsKeyPress.process(event);
}
MO.RWindow.prototype.ohResize = function RWindow_ohResize(hEvent){
   var o = MO.RWindow;
   if(!hEvent){
      hEvent = o._hWindow.event;
   }
   var event = o._eventResize;
   event.code = MO.EEvent.Resize;
   event.attachEvent(hEvent);
   o.lsnsResize.process(event);
}
MO.RWindow.prototype.ohSelect = function RWindow_ohSelect(event){
   return MO.Window._optionSelect;
}
MO.RWindow.prototype.ohOrientation = function RWindow_ohOrientation(hEvent){
   var o = MO.Window;
   var orientationCd = MO.Window.Browser.refreshOrientation();
   var event = o._eventOrientation;
   event.code = MO.EEvent.Orientation;
   event.orientationCd = orientationCd;
   o.lsnsOrientation.process(event);
}
MO.RWindow.prototype.ohUnload = function RWindow_ohUnload(event){
   var o = MO.Window;
   var event = o._eventUnload;
   o.lsnsUnload.process(event);
   MO.Window.dispose();
}
MO.RWindow.prototype.connect = function RWindow_connect(hHtml){
   var o = this;
   var hWindow = o._hWindow = hHtml;
   var hDocument = o._hDocument = hWindow.document;
   var hContainer = o._hContainer = hDocument.body;
   if(MO.Window.Browser.supportHtml5()){
      hContainer.addEventListener('mousedown', o.ohMouseDown, true);
      hContainer.addEventListener('mousemove', o.ohMouseMove, true);
      hContainer.addEventListener('mouseup', o.ohMouseUp, true);
      hContainer.addEventListener('mousewheel', o.ohMouseWheel, true);
      hContainer.addEventListener('keydown', o.ohKeyDown, true);
      hContainer.addEventListener('keyup', o.ohKeyUp, true);
      hContainer.addEventListener('keypress', o.ohKeyPress, true);
   }else{
      hContainer.onmousedown = o.ohMouseDown;
      hContainer.onmousemove = o.ohMouseMove;
      hContainer.onmouseup = o.ohMouseUp;
      hContainer.onmousewheel = o.ohMouseWheel;
      hContainer.onkeydown = o.ohKeyDown;
      hContainer.onkeyup = o.ohKeyUp;
      hContainer.onkeypress = o.ohKeyPress;
   }
   hWindow.onorientationchange = o.ohOrientation;
   hContainer.onresize = o.ohResize;
   hContainer.onselectstart = o.ohSelect;
   hContainer.onunload = o.ohUnload;
}
MO.RWindow.prototype.optionSelect = function RWindow_optionSelect(){
   return this._optionSelect;
}
MO.RWindow.prototype.setOptionSelect = function RWindow_setOptionSelect(select){
   var o = this;
   o._optionSelect = select;
   if(MO.Window.Browser.isBrowser(MO.EBrowser.FireFox)){
      o._hContainer.style.MozUserSelect = select ? '' : 'none';
   }
}
MO.RWindow.prototype.setCaption = function RWindow_setCaption(value){
   top.document.title = MO.Lang.String.nvl(value);
}
MO.RWindow.prototype.setStatus = function RWindow_setStatus(value){
   window.status = MO.Lang.String.nvl(value);
}
MO.RWindow.prototype.storage = function RWindow_storage(scopeCd){
   var o = this;
   switch(scopeCd){
      case MO.EScope.Local:
         var storage = o._localStorage;
         if(!storage){
            storage = o._localStorage = MO.Class.create(MO.FWindowStorage);
            storage.link(window.localStorage);
         }
         return storage;
      case MO.EScope.Session:
         var storage = o._sessionStorage;
         if(!storage){
            storage = o._sessionStorage = MO.Class.create(MO.FWindowStorage);
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
      h = o._hDisablePanel = MO.RBuilder.createDiv(o._hDocument, 'RWindow_Disable');
      h.style.zIndex = 5000;
   }
   var hi = o._hDisableImage;
   if(!hi){
      hi = o._hDisableImage = MO.RBuilder.appendIcon(h);
      hi.src = MO.RResource.iconPath('control.RWindow_Loading');
      hi.style.margin = o._hContainer.offsetHeight / 2;
      hi.style.display = 'none';
   }
   MO.RHtml.visibleSet(hi, f);
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
   if(MO.Window.Browser.supportHtml5()){
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
      hWindow.onorientationchange = null;
   }
   hContainer.onresize = null;
   hContainer.onselectstart = null;
   hContainer.onunload = null;
   o._localStorage = MO.RObject.dispose(o._localStorage);
   o._sessionStorage = MO.RObject.dispose(o._sessionStorage);
   o._hWindow = null;
   o._hDocument = null;
   o._hContainer = null;
   o._eventMouse = MO.Lang.Object.dispose(o._eventMouse);
   o._eventKey = MO.Lang.Object.dispose(o._eventKey);
   o._eventResize = MO.Lang.Object.dispose(o._eventResize);
   o._eventOrientation = MO.Lang.Object.dispose(o._eventOrientation);
   o._eventUnload = MO.Lang.Object.dispose(o._eventUnload);
}
MO.RWindow = new MO.RWindow();
MO.Window = MO.RWindow;
MO.SBrowserCapability = function SBrowserCapability(){
   var o = this;
   o.optionProcess    = false;
   o.optionStorage    = false;
   o.canvasAutoScale  = false;
   o.blobCreate       = false;
   o.pixelRatio       = 1;
   return o;
}
MO.STouchEvent = function STouchEvent(){
   var o = this;
   o.dispose = MO.STouchEvent_dispose;
   return o;
}
MO.STouchEvent_dispose = function STouchEvent_dispose(){
   var o = this;
}
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
   o.create       = MO.TDumpItem_create;
   o.push         = MO.TDumpItem_push;
   o.innerShow    = MO.TDumpItem_innerShow;
   o.show         = MO.TDumpItem_show;
   return o;
}
MO.TDumpItem_create = function TDumpItem_create(){
   var o = this;
   var r = o.children[o.children.length] = new MO.TDumpItem();
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
      MO.RHtml.visibleSet(tr, v);
   }
   var c = o.children.length;
   for(var n = 0; n < c; n++){
      var d = o.children[n];
      MO.RHtml.visibleSet(d.hRow, v);
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
   var label = MO.Lang.String.repeat('   ', o.level-1) + (v ? ' -' : ' +') + ' ' + o.caption;
   o.hText.innerHTML = MO.RHtml.toHtml(label);
   o.innerShow(v);
}
MO.FAudio = function FAudio(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListenerLoad);
   o._url      = MO.Class.register(o, new MO.AGetter('_url'));
   o._hAudio   = null;
   o.ohLoad    = MO.FAudio_ohLoad;
   o.ohError   = MO.FAudio_ohError;
   o.construct = MO.FAudio_construct;
   o.volume    = MO.FAudio_volume;
   o.setVolume = MO.FAudio_setVolume;
   o.loop      = MO.FAudio_loop;
   o.setLoop   = MO.FAudio_setLoop;
   o.play      = MO.FAudio_play;
   o.pause     = MO.FAudio_pause;
   o.loadUrl   = MO.FAudio_loadUrl;
   o.dispose   = MO.FAudio_dispose;
   return o;
}
MO.FAudio_ohLoad = function FAudio_ohLoad(){
   var o = this.__linker;
}
MO.FAudio_ohError = function FAudio_ohError(p){
   var o = this.__linker;
   var url = o._url;
   MO.Logger.error(o, 'Load image failure. (url={1})', url);
}
MO.FAudio_construct = function FAudio_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
MO.FAudio_volume = function FAudio_volume(){
   return this._hAudio.volume;
}
MO.FAudio_setVolume = function FAudio_setVolume(value){
   this._hAudio.volume = value;
}
MO.FAudio_loop = function FAudio_loop(){
   return this._hAudio.loop;
}
MO.FAudio_setLoop = function FAudio_setLoop(value){
   this._hAudio.loop = value;
}
MO.FAudio_play = function FAudio_play(position){
   var hAudio = this._hAudio;
   if(position != null){
      if(hAudio.currentTime != position){
         hAudio.currentTime = position;
      }
   }
   hAudio.play();
}
MO.FAudio_pause = function FAudio_pause(){
   this._hAudio.pause();
}
MO.FAudio_loadUrl = function FAudio_loadUrl(uri){
   var o = this;
   var url = MO.Console.find(MO.FEnvironmentConsole).parse(uri);
   var hAudio = o._hAudio;
   if(!hAudio){
      hAudio = o._hAudio = new Audio();
      hAudio.loop = false;
      hAudio.__linker = o;
   }
   o._url = url;
   hAudio.src = url;
}
MO.FAudio_dispose = function FAudio_dispose(){
   var o = this;
   o._hAudio = MO.RHtml.free(o._hAudio);
   o.__base.MListenerLoad.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
MO.FImage = function FImage(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListenerLoad);
   o._optionAlpha   = MO.Class.register(o, new MO.AGetter('_optionAlpha'), true);
   o._ready         = false;
   o._size          = MO.Class.register(o, new MO.AGetter('_size'));
   o._url           = MO.Class.register(o, new MO.AGetter('_url'));
   o._hImage        = null;
   o.ohLoad         = MO.FImage_ohLoad;
   o.ohError        = MO.FImage_ohError;
   o.construct      = MO.FImage_construct;
   o.image          = MO.FImage_image;
   o.testReady      = MO.FImage_testReady;
   o.loadUrl        = MO.FImage_loadUrl;
   o.dispose        = MO.FImage_dispose;
   return o;
}
MO.FImage_ohLoad = function FImage_ohLoad(){
   var o = this.__linker;
   var hImage = o._hImage;
   o._size.set(hImage.naturalWidth, hImage.naturalHeight);
   o._ready = true;
   var event = new MO.SEvent(o);
   o.processLoadListener(event);
   event.dispose();
}
MO.FImage_ohError = function FImage_ohError(p){
   var o = this.__linker;
   var url = o._url;
   MO.Logger.error(o, 'Load image failure. (url={1})', url);
}
MO.FImage_construct = function FImage_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._size = new MO.SSize2();
}
MO.FImage_image = function FImage_image(){
   return this._hImage;
}
MO.FImage_testReady = function FImage_testReady(){
   return this._ready;
}
MO.FImage_loadUrl = function FImage_loadUrl(uri){
   var o = this;
   var url = MO.Console.find(MO.FEnvironmentConsole).parse(uri);
   var hImage = o._hImage;
   if(!hImage){
      hImage = o._hImage = new Image();
      hImage.__linker = o;
      hImage.onload = o.ohLoad;
      hImage.onerror = o.ohError;
   }
   o._url = url;
   hImage.src = url;
}
MO.FImage_dispose = function FImage_dispose(){
   var o = this;
   o._size = MO.Lang.Object.dispose(o._size);
   o._hImage = MO.RHtml.free(o._hImage);
   o.__base.MListenerLoad.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
MO.FTouchTracker = function FTouchTracker(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListenerTouchZoom);
   o._touchsLength   = null;
   o._touchs         = null;
   o._touchPool      = null;
   o._touchZoomEvent = null;
   o.construct       = MO.FTouchTracker_construct;
   o.calculateLength = MO.FTouchTracker_calculateLength;
   o.eventStart      = MO.FTouchTracker_eventStart;
   o.eventMove       = MO.FTouchTracker_eventMove;
   o.eventStop       = MO.FTouchTracker_eventStop;
   o.dispose         = MO.FTouchTracker_dispose;
   return o;
}
MO.FTouchTracker_construct = function FTouchTracker_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._touchs = new MO.TObjects();
   o._touchPool = MO.Class.create(MO.FObjectPool);
   o._touchZoomEvent = new MO.SEvent(o);
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
   o._touchs = MO.Lang.Object.dispose(o._touchs);
   o._touchZoomEvent = MO.Lang.Object.dispose(o._touchZoomEvent);
   o.__base.MListenerTouchZoom.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
MO.FWindowStorage = function FWindowStorage(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._scopeCd  = MO.Class.register(o, new MO.AGetter('_scopeCd'));
   o._storage  = null;
   o.link      = MO.FWindowStorage_link;
   o.get       = MO.FWindowStorage_get;
   o.set       = MO.FWindowStorage_set;
   o.remove    = MO.FWindowStorage_remove;
   o.clear     = MO.FWindowStorage_clear;
   o.dispose   = MO.FWindowStorage_dispose;
   o.innerDump = MO.FWindowStorage_innerDump;
   return o;
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
MO.RBrowser = function RBrowser(){
   var o = this;
   o._agent         = null;
   o._capability    = null;
   o._deviceCd      = MO.EDevice.Unknown;
   o._softwareCd    = MO.ESoftware.Unknown;
   o._typeCd        = MO.EBrowser.Unknown;
   o._orientationCd = MO.EOrientation.Horizontal;
   o._supportHtml5  = false;
   o._hostPath      = '';
   o._contentPath   = '';
   return o;
}
MO.RBrowser.prototype.onLog = function RBrowser_onLog(s, p){
   console.log(p);
}
MO.RBrowser.prototype.construct = function RBrowser_construct(){
   var o = this;
   o.code = window.navigator.userAgent.toString();
   var agent = o.code.toLowerCase();
   var capability = o._capability = new MO.SBrowserCapability();
   if(agent.indexOf("android") != -1){
      o._typeCd = MO.EDevice.Mobile;
      o._softwareCd = MO.ESoftware.Android;
   }
   if(agent.indexOf("chrome") != -1){
      o._typeCd = MO.EBrowser.Chrome;
   }else if(agent.indexOf("firefox") != -1){
      o._typeCd = MO.EBrowser.FireFox;
   }else if((agent.indexOf("msie") != -1) || (agent.indexOf("windows") != -1)){
      o._typeCd = MO.EBrowser.Explorer;
   }else if((agent.indexOf("safari") != -1) || (agent.indexOf("applewebkit") != -1)){
      o._typeCd = MO.EBrowser.Safari;
      capability.canvasAutoScale = true;
   }else{
      alert('Unknown browser.\n' + agent);
      return;
   }
   if(o._typeCd == MO.EBrowser.Chrome){
      MO.Logger.lsnsOutput.register(o, o.onLog);
   }
   MO.Logger.info(o, 'Parse browser agent. (type_cd={1})', MO.REnum.decode(MO.EBrowser, o._typeCd));
   if(window.applicationCache){
      o._supportHtml5 = true;
   }
   var bIsIpad = agent.match(/ipad/i) == "ipad";
   var bIsIphoneOs = agent.match(/iphone os/i) == "iphone os";
   var bIsMidp = agent.match(/midp/i) == "midp";
   var bIsUc7 = agent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
   var bIsUc = agent.match(/ucweb/i) == "ucweb";
   var bIsAndroid = agent.match(/android/i) == "android";
   var bIsCE = agent.match(/windows ce/i) == "windows ce";
   var bIsWM = agent.match(/windows mobile/i) == "windows mobile";
   if(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM){
      MO.Runtime.setPlatformCd(MO.EPlatform.Mobile);
   }
   var pixelRatio = window.devicePixelRatio;
   if(pixelRatio){
      if(MO.Runtime.isPlatformMobile()){
         capability.pixelRatio = Math.min(pixelRatio, 3);
      }
   }
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
      MO.Logger.warn(o, 'Browser blob not support.');
   }
   o.refreshOrientation();
}
MO.RBrowser.prototype.capability = function RBrowser_capability(){
   return this._capability;
}
MO.RBrowser.prototype.supportHtml5 = function RBrowser_supportHtml5(){
   return this._supportHtml5;
}
MO.RBrowser.prototype.hostPath = function RBrowser_hostPath(uri){
   var o = this;
   if(uri){
      return o._hostPath + uri;
   }
   return o._hostPath;
}
MO.RBrowser.prototype.setHostPath = function RBrowser_setHostPath(host){
   this._hostPath = host;
}
MO.RBrowser.prototype.contentPath = function RBrowser_contentPath(uri){
   var o = this;
   if(uri){
      return o._contentPath + uri;
   }
   return o._contentPath;
}
MO.RBrowser.prototype.setContentPath = function RBrowser_setContentPath(path){
   this._contentPath = path;
}
MO.RBrowser.prototype.typeCd = function RBrowser_typeCd(){
   return this._typeCd;
}
MO.RBrowser.prototype.isBrowser = function RBrowser_isBrowser(browserCd){
   return this._typeCd == browserCd;
}
MO.RBrowser.prototype.orientationCd = function RBrowser_orientationCd(){
   return this._orientationCd;
}
MO.RBrowser.prototype.isOrientationHorizontal = function RBrowser_isOrientationHorizontal(){
   return this._orientationCd == MO.EOrientation.Horizontal;
}
MO.RBrowser.prototype.isOrientationVertical = function RBrowser_isOrientationVertical(){
   return this._orientationCd == MO.EOrientation.Vertical;
}
MO.RBrowser.prototype.refreshOrientation = function RBrowser_refreshOrientation(){
   var o = this;
   var orientation = window.orientation;
   if(orientation != null){
      if((window.orientation == 180) || (window.orientation == 0)){
         o._orientationCd = MO.EOrientation.Vertical;
      }else if((window.orientation == 90) || (window.orientation == -90)){
         o._orientationCd = MO.EOrientation.Horizontal;
      }else{
         throw new TError(o, 'Unknown orientation mode.');
      }
   }
   return o._orientationCd;
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
MO.RBrowser.prototype.fullscreen = function RBrowser_fullscreen(hWindow, flag){
   if(flag){
      if (hWindow.requestFullscreen){
         hWindow.requestFullscreen();
      }else if(hWindow.mozRequestFullScreen){
         hWindow.mozRequestFullScreen();
      }else if(hWindow.webkitRequestFullScreen){
         hWindow.webkitRequestFullScreen();
      }else if(hWindow.msRequestFullscreen){
         hWindow.msRequestFullscreen();
      }
   }else{
      if (hWindow.exitFullscreen){
         hWindow.exitFullscreen();
      }else if(hWindow.mozCancelFullScreen){
         hWindow.mozCancelFullScreen();
      }else if(hWindow.webkitCancelFullScreen){
         hWindow.webkitCancelFullScreen();
      }else if(hWindow.msExitFullscreen){
         hWindow.msExitFullscreen();
      }
   }
}
MO.RBrowser.prototype.downloadBlob = function RBrowser_downloadBlob(fileName, blob){
   var link = document.createElement('A');
   var event = document.createEvent("MouseEvents");
   event.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
   link.download = fileName;
   link.href = URL.createObjectURL(blob);
   link.dispatchEvent(event);
}
MO.RBrowser.prototype.downloadText = function RBrowser_downloadText(fileName, text){
   var blob = MO.RBlob.fromText(text);
   this.downloadBlob(fileName, blob);
}
MO.RBrowser = new MO.RBrowser();
MO.Window.Browser = MO.RBrowser;
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
   var r = this.create(d, 'IMG', MO.Lang.String.nvl(s, 'Tag_Icon'));
   r.align = 'absmiddle';
   if(u){
      r.src = MO.RResource.iconPath(u);
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
      r.src = MO.RResource.imagePath(u);
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
      h.border = MO.Lang.Integer.nvl(b);
   }
   h.cellSpacing = MO.Lang.Integer.nvl(cs);
   h.cellPadding = MO.Lang.Integer.nvl(cp);
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
   var r = this.create(p.ownerDocument, t, s);
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
      if(MO.RBrowser.isBrowser(MO.EBrowser.Explorer)){
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
MO.RBuilder = new MO.RBuilder();
MO.Window.Builder = MO.RBuilder;
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
      if(MO.Lang.String.endsWith(s, '.wv')){
         return o.contextPath + '/' + s;
      }else if(MO.Lang.String.startsWith(s, '#')){
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
         o._contexts[fn] = new MO.TContext(n, nc, v);
      }
   }
}
MO.RContext.prototype.get = function RContext_get(p, p1, p2, p3, p4, p5){
   var o = this;
   var r = o._contexts[p];
   if(!r){
      return MO.Logger.fatal(o, null, 'Can not find context (path={1})', p);
   }
   return MO.Lang.String.format(r.text, p1, p2, p3, p4, p5)
}
MO.RContext.prototype.find = function RContext_find(s, c){
   var o = this;
   var id = s + ':' + c;
   var r = o._contexts[id];
   if(!r){
      return MO.Logger.fatal(o, null, 'Can not find context (id={1})', id);
   }
   return r.text;
}
MO.RContext = new MO.RContext();
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
         MO.RDump.dumpInner(o.link);
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
         return MO.Method.name(v) + '@Function';
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
         return v.length + ':\'' + MO.Lang.String.toLine(v) + '\'';
      case 'Function':
         if(v.__virtual){
            return 'virtual';
         }
         return MO.Method.name(v, true);
      case 'Array':
         return '@<Array@' + MO.Class.code(v) + '> length=' + v.length;
      case 'Html':
         return '@<' + v.tagName + '>';
      default:
         if(v.constructor == MO.TClass){
            return '@<' + v.name + '@' + MO.Class.code(v) + '>';
         }
         if(v.constructor == Function){
            return "@" + v.toString();
         }
         try{
            for(var name in v){
               return '@<Object@' + MO.Class.code(v) + '>';
            }
         }catch(e){}
         return '<Object@' + MO.Class.code(v) + '>';
   }
}
MO.RDump.prototype.dumpInner = function RDump_dumpInner(di){
   var hTable  = di.hTable;
   var hParent = di.hParent;
   var hInsRow = di.hRow;
   var level   = di.level;
   var obj     = di.link;
   var type    = MO.Class.typeOf(obj, true);
   var vcls    = obj.__class;
   var names = new Array();
   for(var name in obj){
      names[names.length] = name;
   }
   if(MO.Lang.String.endsWith(type, 'Array')){
      MO.Lang.Array.reverse(names, 0, names.length - 1);
   }else{
      MO.Lang.Array.sort(names, true);
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
      var stype = MO.Class.safeTypeOf(value, true);
      var type = MO.Class.safeTypeOf(value, true);
      var info = null;
      var infoFormat = true;
      if(vcls){
         var ann = vcls.attributeFind(name);
         if(ann){
            type = 'Annotation<' + MO.Method.name(ann.constructor) + '>'
            if(value && value.constructor == Function){
               info = "<FONT color='green'>" + MO.Method.name(value) + "</FONT>";
            }else{
               info = value + "<FONT color='green'> - (" + MO.RHtml.toHtml(ann.toString()) + ")</FONT>";
            }
            infoFormat = false;
         }
      }
      if(info == null){
         info = this.typeInfo(value, type);
      }
      var rdi = null;
      var index = hInsRow ? hInsRow.rowIndex + 1 : 0;
      var hRow = MO.RBuilder.appendTableRow(hTable, null, index);
      hRow.bgColor = '#FFFFFF';
      if(MO.Lang.String.startsWith(info, '@')){
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
      var hCell = MO.RBuilder.appendTableCell(hRow);
      var icon = MO.Lang.String.startsWith(info, '@') ? ' +' : '  ';
      var label = MO.Lang.String.repeat('   ', level) + icon + ' ' + name
      hCell.innerHTML = MO.RHtml.toHtml(label);
      hCell.style.borderBottom = '1px solid #F0F0F0';
      hCell.width = '240px'
      if(rdi){
         rdi.hText = hCell;
      }
      var hCell = MO.RBuilder.appendTableCell(hRow);
      hCell.innerHTML = MO.RHtml.toHtml(type);
      hCell.style.borderBottom = '1px solid #F0F0F0';
      if(type == 'Function'){
         hCell.style.color = '#3333FF';
      }else{
         hCell.style.color = '#FF3333';
      }
      hCell.width = '200px'
      var hCell = MO.RBuilder.appendTableCell(hRow);
      if(MO.Lang.String.startsWith(info, '@')){
         info = info.substr(1);
      }
      if(infoFormat){
         hCell.innerHTML = MO.RHtml.toHtml(info);
      }else{
         hCell.innerHTML = info;
      }
      hCell.style.borderBottom = '1px solid #F0F0F0';
   }
   hTable.width = '100%'
}
MO.RDump.prototype.dump = function RDump_dump(value, hPanel){
   if(!hPanel){
      hPanel = MO.RBuilder.append(null, 'DIV')
   }
   var s = new MO.TString();
   s.append('<', MO.Class.safeTypeOf(value));
   if(value && value.tagName){
      s.append(' - ', value.tagName);
   }
   s.appendLine('@' + MO.Class.code(value) + '>');
   var hPanel = MO.RBuilder.append(hPanel, 'DIV');
   hPanel.style.border = '1px solid #BBBBBB';
   hPanel.style.backgroundColor = '#E0E0EB';
   var hTitleTable = MO.RBuilder.appendTable(hPanel, null, null, 0, 1, 0);
   var hRow = MO.RBuilder.appendTableRow(hTitleTable);
   var hCell = MO.RBuilder.appendTableCell(hRow);
   hTitleTable.width = '100%'
   hCell.style.padding = 2;
   hCell.style.borderBottom = '1px solid gray';
   hCell.style.backgroundColor = '#E0E0EB';
   MO.RHtml.textSet(hCell, s.toString());
   var hTable = MO.RBuilder.appendTable(hPanel, null, null, 0, 1, 0);
   hTable.style.width = '100%';
   var di = new MO.TDumpItem();
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
   var s = new MO.TString();
   while(o){
      s.append(MO.Method.name(o));
      o = o.caller;
      if(o){
         s.appendLine();
      }
   }
   MO.Logger.debug(this, s);
}
MO.RDump = new MO.RDump();
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
      r = v.__puuid = this._nextUid++;
   }
   return r;
}
MO.RHtml.prototype.displayGet = function RHtml_displayGet(h){
   var r = null;
   var s = h.style.display;
   if(MO.RBrowser.isBrowser(MO.EBrowser.Explorer)){
      r = (s == 'inline');
   }else{
      r = (s != 'none');
   }
   return r;
}
MO.RHtml.prototype.displaySet = function RHtml_displaySet(h, v){
   var s = null;
   if(MO.RBrowser.isBrowser(MO.EBrowser.Explorer)){
      s = v ? 'inline' : 'none';
   }else{
      s = v ? null : 'none';
   }
   h.style.display = s;
}
MO.RHtml.prototype.visibleGet = function RHtml_visibleGet(h){
   var r = null;
   var s = h.style.display;
   if(MO.RBrowser.isBrowser(MO.EBrowser.Explorer)){
      r = (s == 'block');
   }else{
      r = (s != 'none');
   }
   return r;
}
MO.RHtml.prototype.visibleSet = function RHtml_visibleSet(h, v){
   var s = null;
   if(MO.RBrowser.isBrowser(MO.EBrowser.Explorer)){
      s = v ? '' : 'none';
   }else{
      s = v ? null : 'none';
   }
   h.style.display = s;
}
MO.RHtml.prototype.textGet = function RHtml_textGet(h, v){
   var r = null;
   if(MO.RBrowser.isBrowser(EBrowser.FireFox)){
      r = h.textContent;
   }else{
      r = h.innerText;
   }
   return r;
}
MO.RHtml.prototype.textSet = function RHtml_textSet(h, v){
   if(MO.RBrowser.isBrowser(MO.EBrowser.FireFox)){
      h.textContent = v;
   }else{
      h.innerText = v;
   }
}
MO.RHtml.prototype.checkGet = function RHtml_checkGet(h){
   return MO.Lang.Bool.toString(h.checked);
}
MO.RHtml.prototype.checkSet = function RHtml_checkSet(h, v){
   h.checked = MO.Lang.Bool.isTrue(v);
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
      for(var n = 0; n < c; n++){
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
      i = ls[u] = new MO.THtmlItem();
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
MO.RHtml.prototype.searchLinker = function RHtml_searchLinker(hTag, clazz){
   while(hTag){
      var linker = hTag.__linker;
      if(linker){
         if(MO.Class.isClass(linker, clazz)){
            return linker;
         }
      }
      hTag = hTag.parentElement;
   }
   return null;
}
MO.RHtml.prototype.searchObject = function RHtml_searchObject(hTag, name){
   while(hTag){
      var flag = hTag[name];
      if(flag){
         return flag;
      }
      hTag = hTag.parentElement;
   }
   return null;
}
MO.RHtml.prototype.tableMoveRow = function RHtml_tableMoveRow(ph, ps, pt){
   if(ph.tagName != 'TABLE'){
      throw new MO.TError('Html table is invalid.');
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
MO.RHtml = new MO.RHtml();
MO.Window.Html = MO.RHtml;
MO.RKeyboard = function RKeyboard(){
   var o = this;
   o._status = new Array();
   return o;
}
MO.RKeyboard.prototype.onKeyDown = function RKeyboard_onKeyDown(p){
   var o = this;
   var c = p.keyCode;
   o._status[c] = MO.EKeyStatus.Press;
}
MO.RKeyboard.prototype.onKeyUp = function RKeyboard_onKeyUp(p){
   var o = this;
   var c = p.keyCode;
   o._status[c] = MO.EKeyStatus.Normal;
}
MO.RKeyboard.prototype.construct = function RKeyboard_construct(){
   var o = this;
   var s = o._status;
   for(var i = 0; i < 256; i++){
      s[i] = MO.EKeyStatus.Normal;
   }
   MO.RWindow.lsnsKeyDown.register(o, o.onKeyDown);
   MO.RWindow.lsnsKeyUp.register(o, o.onKeyUp);
}
MO.RKeyboard.prototype.isControlKey = function RKeyboard_isControlKey(p){
   var s = MO.EKeyCode.ControlKeys;
   for(var i = s.length - 1; i >= 0; i--){
      if(s[i] == p){
         return true;
      }
   }
   return false;
}
MO.RKeyboard.prototype.isIntegerKey = function RKeyboard_isIntegerKey(c){
   return MO.EKeyCode.integerCodes[c];
}
MO.RKeyboard.prototype.isFloatKey = function RKeyboard_isFloatKey(c){
   return MO.EKeyCode.floatCodes[c];
}
MO.RKeyboard.prototype.isNumKey = function RKeyboard_isNumKey(c){
   if(p >= 96 && p <= 105){
      return true;
   }
   return false;
}
MO.RKeyboard.prototype.isPress = function RKeyboard_isPress(p){
   var o = this;
   var v = o._status[p];
   return v == MO.EKeyStatus.Press;
}
MO.RKeyboard.prototype.fixCase = function RKeyboard_fixCase(e, c){
   if(e && c){
      var k = e.keyCode;
      if(ECase.Upper == c){
         k = String.fromCharCode(k).toUpperCase().charCodeAt(0)
      }else if(ECase.Lower == c){
         k = String.fromCharCode(k).toLowerCase().charCodeAt(0)
      }
      e.keyCode = k;
   }
}
MO.RKeyboard.prototype.fixPattern = function RKeyboard_fixPattern(e, p){
   if(p){
      var k = e.keyCode;
      if(!this.isControlKeyPress(k)){
         if(!MO.Lang.String.isPattern(String.fromCharCode(k), p)){
            e.keyCode = 0;
            return false;
         }
      }
   }
   return true;
}
MO.RKeyboard.prototype.fixChars = function RKeyboard_fixChars(e, p){
   if(p){
      var k = e.keyCode;
      if(this.isNumKey(k)){
    	  k = e.keyCode = e.keyCode - 48;
      }
      if(!this.isControlKeyPress(k)){
         if(!MO.Lang.String.inChars(String.fromCharCode(k), p)){
            e.keyCode = 0;
            e.returnValue = false;
            return false;
         }
      }
   }
   return true;
}
MO.Window.Keyboard = new MO.RKeyboard();
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
   if(MO.RBrowser.supportHtml5()){
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
MO.RValue = new MO.RValue();
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
         xas = new MO.TAttributes();
         for(var n = 0; n < eac; n++){
            var ea = eas[n];
            if(ea.nodeName){
               xas.set(ea.nodeName, this.formatText(ea.value));
            }
         }
      }
   }
   var xt = new MO.TString();
   xt.append(pe.value);
   var ecs = pe.childNodes
   if(ecs){
      var ecc = ecs.length;
      for(var n = 0; n < ecc; n++){
         var en = ecs[n];
         var ect = en.nodeType;
         if(ect == MO.ENodeType.Text){
            xt.append(en.nodeValue);
         }else if(ect == MO.ENodeType.Data){
            xt.append(en.data);
         }
      }
   }
   var xc = pd.create(pe.nodeName, xas, MO.Lang.String.trim(xt.toString()));
   if(pn){
      pn.push(xc);
   }else{
      pd._root = xc;
   }
   if(ecs){
      var cc = ecs.length;
      for(var n = 0; n < cc; n++){
         if(ecs[n].nodeType == MO.ENodeType.Node){
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
      var d = new MO.TXmlDocument();
      o.buildNode(d, null, p.documentElement);
      return d.root();
   }else if(p.tagName == 'SCRIPT'){
      var s = p.textContent;
      if(!s){
         s = p.text;
      }
      if(s){
         var d = new MO.TXmlDocument();
         var xd = o.makeString(s)
         o.buildNode(d, null, xd.documentElement);
         return d.root();
      }
   }
   return null;
}
MO.RXml.prototype.makeDocument = function RXml_makeDocument(p){
   var d = new MO.TXmlDocument();
   if(p.documentElement){
      this.buildNode(d, null, p.documentElement);
   }
   return d;
}
MO.RXml.prototype.unpack = function RXml_unpack(s, n){
   var o = this;
   if(MO.Lang.String.isEmpty(s)){
      return null;
   }
   if(!n){
      n = new MO.TNode();
   }
   var np = new MO.TAttributes();
   np.unpack(s);
   n.name = np.get('name');
   n.value = np.get('value');
   if(np.contains('attributes')){
      n.attributes().unpack(np.get('attributes'));
   }
   if(np.contains('nodes')){
      var ns = new MO.TStrings();
      ns.unpack(np.get('nodes'));
      for(var i = 0; i < ns.count; i++){
         o.unpack(ns.get(i), n.create());
      }
   }
   return n;
}
MO.RXml = new MO.RXml();
