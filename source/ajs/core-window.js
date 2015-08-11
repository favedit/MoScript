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
   o._statusError      = false;
   o._statusEnable     = true;
   o._disableDeep      = 0;
   o._cookies          = new MO.TAttributes();
   o._localStorage     = null;
   o._sessionStorage   = null;
   o._eventMouse       = new MO.SMouseEvent();
   o._eventKey         = new MO.SKeyboardEvent();
   o._eventResize      = new MO.SResizeEvent();
   o._eventVisibility  = new MO.SEvent();
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
   o.lsnsVisibility    = new MO.TListeners();
   o.lsnsOrientation   = new MO.TListeners();
   o.lsnsDeviceError   = new MO.TListeners();
   return o;
}
MO.RWindow.prototype.ohMouseDown = function RWindow_ohMouseDown(hEvent){
   var o = MO.Window;
   if(!hEvent){
      hEvent = o._hWindow.event;
   }
   var event = o._eventMouse;
   event.code = MO.EEvent.MouseDown;
   event.attachEvent(hEvent);
   o.lsnsMouseDown.process(event);
}
MO.RWindow.prototype.ohMouseMove = function RWindow_ohMouseMove(hEvent){
   var o = MO.Window;
   if(!hEvent){
      hEvent = o._hWindow.event;
   }
   var event = o._eventMouse;
   event.code = MO.EEvent.MouseMove;
   event.attachEvent(hEvent);
   o.lsnsMouseMove.process(event);
}
MO.RWindow.prototype.ohMouseUp = function RWindow_ohMouseUp(hEvent){
   var o = MO.Window;
   if(!hEvent){
      hEvent = o._hWindow.event;
   }
   var event = o._eventMouse;
   event.code = MO.EEvent.MouseUp;
   event.attachEvent(hEvent);
   o.lsnsMouseUp.process(event);
}
MO.RWindow.prototype.ohMouseWheel = function RWindow_ohMouseWheel(hEvent){
   var o = MO.Window;
   if(!hEvent){
      hEvent = o._hWindow.event;
   }
   var event = o._eventMouse;
   event.code = MO.EEvent.MouseWheel;
   event.attachEvent(hEvent);
   o.lsnsMouseWheel.process(event);
}
MO.RWindow.prototype.ohKeyDown = function RWindow_ohKeyDown(hEvent){
   var o = MO.Window;
   if(!hEvent){
      hEvent = o._hWindow.event;
   }
   var event = o._eventKey;
   event.code = MO.EEvent.KeyDown;
   event.attachEvent(hEvent);
   o.lsnsKeyDown.process(event);
}
MO.RWindow.prototype.ohKeyUp = function RWindow_ohKeyUp(hEvent){
   var o = MO.Window;
   if(!hEvent){
      hEvent = o._hWindow.event;
   }
   var event = o._eventKey;
   event.code = MO.EEvent.KeyUp;
   event.attachEvent(hEvent);
   o.lsnsKeyUp.process(event);
}
MO.RWindow.prototype.ohKeyPress = function RWindow_ohKeyPress(hEvent){
   var o = MO.Window;
   if(!hEvent){
      hEvent = o._hWindow.event;
   }
   var event = o._eventKey;
   event.code = MO.EEvent.KeyPress;
   event.attachEvent(hEvent);
   o.lsnsKeyPress.process(event);
}
MO.RWindow.prototype.ohResize = function RWindow_ohResize(hEvent){
   var o = MO.Window;
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
MO.RWindow.prototype.ohVisibility = function RWindow_ohVisibility(hEvent){
   var o = MO.Window;
   var visibility = MO.Window.Browser.isVisibility();
   var event = o._eventVisibility;
   event.visibility = visibility;
   o.lsnsVisibility.process(event);
   MO.Logger.debug(o, 'Window visibility changed. (visibility={1})', visibility);
}
MO.RWindow.prototype.ohOrientation = function RWindow_ohOrientation(hEvent){
   var o = MO.Window;
   var orientationCd = o.Browser.refreshOrientation();
   var event = o._eventOrientation;
   event.orientationCd = orientationCd;
   o.lsnsOrientation.process(event);
   MO.Logger.debug(o, 'Window orientation changed. (orientation_cd={1})', orientationCd);
}
MO.RWindow.prototype.ohUnload = function RWindow_ohUnload(event){
   var o = MO.Window;
   var event = o._eventUnload;
   o.lsnsUnload.process(event);
   o.dispose();
}
MO.RWindow.prototype.connect = function RWindow_connect(hWindow){
   var o = this;
   o._eventVisibility.code = MO.EEvent.Visibility;
   o._eventOrientation.code = MO.EEvent.Orientation;
   var hWindow = o._hWindow = hWindow;
   var hDocument = o._hDocument = hWindow.document;
   var hContainer = o._hContainer = hDocument.body;
   var visibilitychange = MO.Window.Browser.defineEventGet('visibilitychange');
   if(MO.Window.Browser.supportHtml5()){
      hContainer.addEventListener('mousedown', o.ohMouseDown, true);
      hContainer.addEventListener('mousemove', o.ohMouseMove, true);
      hContainer.addEventListener('mouseup', o.ohMouseUp, true);
      hContainer.addEventListener('mousewheel', o.ohMouseWheel, true);
      hContainer.addEventListener('keydown', o.ohKeyDown, true);
      hContainer.addEventListener('keyup', o.ohKeyUp, true);
      hContainer.addEventListener('keypress', o.ohKeyPress, true);
      hDocument.addEventListener(visibilitychange, o.ohVisibility, true);
   }else{
      hContainer.onmousedown = o.ohMouseDown;
      hContainer.onmousemove = o.ohMouseMove;
      hContainer.onmouseup = o.ohMouseUp;
      hContainer.onmousewheel = o.ohMouseWheel;
      hContainer.onkeydown = o.ohKeyDown;
      hContainer.onkeyup = o.ohKeyUp;
      hContainer.onkeypress = o.ohKeyPress;
      hDocument['on' + visibilitychange] = o.ohVisibility;
   }
   hWindow.onorientationchange = o.ohOrientation;
   hContainer.onresize = o.ohResize;
   hContainer.onselectstart = o.ohSelect;
   hContainer.onunload = o.ohUnload;
   o._cookies.split(hDocument.cookie, '=', ';');
   o._requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
   o._cancelAnimationFrame = window.cancelRequestAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame || window.msCancelAnimationFrame || window.msCancelRequestAnimationFrame;
}
MO.RWindow.prototype.htmlWindow = function RWindow_htmlWindow(){
   return this._hWindow;
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
MO.RWindow.prototype.statusError = function RWindow_statusError(){
   return this._statusError;
}
MO.RWindow.prototype.setStatusError = function RWindow_setStatusError(value){
   this._statusError = value;
}
MO.RWindow.prototype.processDeviceError = function RWindow_processDeviceError(event){
   var o = this;
   o._statusError = true;
   o.lsnsDeviceError.process(event);
}
MO.RWindow.prototype.setCaption = function RWindow_setCaption(value){
   top.document.title = MO.Lang.String.nvl(value);
}
MO.RWindow.prototype.setStatus = function RWindow_setStatus(value){
   window.status = MO.Lang.String.nvl(value);
}
MO.RWindow.prototype.cookies = function RWindow_cookies(){
   return this._cookies;
}
MO.RWindow.prototype.cookie = function RWindow_cookie(name){
   return this._cookies.get(name);
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
MO.RWindow.prototype.requestAnimationFrame = function RWindow_requestAnimationFrame(callback){
   var method = this._requestAnimationFrame;
   if(method){
      method(callback);
      return true;
   }
   return false;
}
MO.RWindow.prototype.cancelRequestAnimationFrame = function RWindow_cancelRequestAnimationFrame(callback){
   var method = this._cancelAnimationFrame;
   if(method){
      method(callback);
      return true;
   }
   return false;
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
      hContainer.removeEventListener('mousedown', o.onMouseDown, true);
      hContainer.removeEventListener('mousemove', o.onMouseMove, true);
      hContainer.removeEventListener('mouseup', o.onMouseUp, true);
      hContainer.removeEventListener('mousewheel', o.onMouseWheel, true);
      hContainer.removeEventListener('keydown', o.onKeyDown, true);
      hContainer.removeEventListener('keyup', o.onKeyUp, true);
      hContainer.removeEventListener('keypress', o.onKeyPress, true);
      hWindow.removeEventListener('orientationchange', o.onOrientation);
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
   o._localStorage = MO.Lang.Object.dispose(o._localStorage);
   o._sessionStorage = MO.Lang.Object.dispose(o._sessionStorage);
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
   o.canvasScale      = true;
   o.soundConfirm     = false;
   o.soundFinish      = true;
   o.blobCreate       = false;
   o.pixelRatio       = 1;
   return o;
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
   o._agent            = null;
   o._capability       = null;
   o._defineProperties = null;
   o._defineEvents     = null;
   o._defineMethods    = null;
   o._deviceCd         = MO.EDevice.Unknown;
   o._softwareCd       = MO.ESoftware.Unknown;
   o._typeCd           = MO.EBrowser.Unknown;
   o._orientationCd    = MO.EOrientation.Horizontal;
   o._supportHtml5     = false;
   o._hostPath         = '';
   o._contentPath      = '';
   return o;
}
MO.RBrowser.prototype.onLog = function RBrowser_onLog(event){
   console.log(event.message);
}
MO.RBrowser.prototype.construct = function RBrowser_construct(){
   var o = this;
   var code = o._agent = window.navigator.userAgent.toString();
   var agent = code.toLowerCase();
   var properties = o._defineProperties = new Object();
   var events = o._defineEvents = new Object();
   var methods = o._defineMethods = new Object();
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
   }else{
      alert('Unknown browser.\n' + agent);
      return;
   }
   var platformCd = MO.EPlatform.Mobile;
   var environmentConsole = MO.Console.find(MO.FEnvironmentConsole);
   if(MO.Lang.String.contains(agent, 'android', 'ipad', 'iphone', 'midp', 'rv:1.2.3.4', 'windows ce', 'windows mobile')){
      platformCd = MO.EPlatform.Mobile;
      environmentConsole.registerValue(MO.EConstant.DeviceType, 'mb');
   }else{
      platformCd = MO.EPlatform.Pc;
      environmentConsole.registerValue(MO.EConstant.DeviceType, 'pc');
   }
   MO.Runtime.setPlatformCd(platformCd);
   if(MO.Lang.String.contains(agent, 'android 5.1', 'iphone', 'ipad')){
      capability.soundConfirm = true;
   }
   if(MO.Lang.String.contains(agent, 'mqqbrowser')){
      capability.canvasScale = false;
   }
   if(o._typeCd == MO.EBrowser.Chrome){
      MO.Logger.lsnsOutput.register(o, o.onLog);
   }
   MO.Logger.debug(o, 'Parse browser agent. (platform_cd={1}, type_cd={2})', MO.Lang.Enum.decode(MO.EPlatform, platformCd), MO.Lang.Enum.decode(MO.EBrowser, o._typeCd));
   if(window.applicationCache){
      o._supportHtml5 = true;
   }
   var external = window.external;
   if(external){
      if(external.twGetRunPath){
         if((agent.indexOf('360chrome') != -1) || (agent.indexOf('360se') != -1)){
            capability.soundFinish = false;
         }else{
            var runPath = external.twGetRunPath().toLowerCase();
            if(runPath.indexOf('360se') != -1){
               capability.soundFinish = false;
            }
         }
      }
   }
   var pixelRatio = window.devicePixelRatio;
   if(pixelRatio){
      if(MO.Runtime.isPlatformMobile()){
         capability.pixelRatio = Math.min(pixelRatio, 3);
         MO.Logger.debug(o, 'Parse browser agent. (pixel_ratio={1}, capability_ratio={2})', pixelRatio, capability.pixelRatio);
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
   var hDocument = window.document;
   var visibilityChange = null;
   if(typeof hDocument.hidden !== "undefined"){
      properties['hidden'] = 'hidden';
      events['visibilitychange'] = 'visibilitychange';
   } else if (typeof hDocument.mozHidden !== "undefined"){
      properties['hidden'] = 'mozHidden';
      events['visibilitychange'] = 'mozvisibilitychange';
   }else if (typeof hDocument.msHidden !== "undefined"){
      properties['hidden'] = 'msHidden';
      events['visibilitychange'] = 'msvisibilitychange';
   }else if (typeof hDocument.webkitHidden !== "undefined"){
      properties['hidden'] = 'webkitHidden';
      events['visibilitychange'] = 'webkitvisibilitychange';
   }
   o.refreshOrientation();
   MO.Logger.debug(o, 'Browser connect. (agent={1})', o._agent);
}
MO.RBrowser.prototype.agent = function RBrowser_agent(){
   return this._agent;
}
MO.RBrowser.prototype.capability = function RBrowser_capability(){
   return this._capability;
}
MO.RBrowser.prototype.defineProperties = function RBrowser_defineProperties(){
   return this._defineProperties;
}
MO.RBrowser.prototype.definePropertyGet = function RBrowser_definePropertyGet(name){
   return this._defineProperties[name];
}
MO.RBrowser.prototype.defineEvents = function RBrowser_defineEvents(){
   return this._defineEvents;
}
MO.RBrowser.prototype.defineEventGet = function RBrowser_defineEventGet(name){
   return this._defineEvents[name];
}
MO.RBrowser.prototype.defineMethods = function RBrowser_defineMethods(){
   return this._defineMethods;
}
MO.RBrowser.prototype.defineMethodGet = function RBrowser_defineMethodGet(name){
   return this._defineMethods[name];
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
MO.RBrowser.prototype.setOrientationCd = function RBrowser_setOrientationCd(orientationCd){
   this._orientationCd = orientationCd;
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
MO.RBrowser.prototype.isVisibility = function RBrowser_isVisibility(){
   var name = this.definePropertyGet('hidden');
   return !window.document[name];
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
   var blob = MO.Labg.Blob.fromText(text);
   this.downloadBlob(fileName, blob);
}
MO.RBrowser.prototype.saveConfig = function RBrowser_saveConfig(xconfig){
   var o = this;
   var xagent = xconfig.create('Agent');
   xagent.setValue(o._agent);
}
MO.RBrowser = new MO.RBrowser();
MO.Window.Browser = MO.RBrowser;
MO.RXmlUtil = function RXmlUtil(){
   var o = this;
   o.httpActiveX = false;
   o.httpVendor  = null;
   o.domActiveX  = false;
   o.domVendor   = null;
   o.construct();
   return o;
}
MO.RXmlUtil.prototype.construct = function RXmlUtil_construct(){
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
MO.RXmlUtil.prototype.isNode = function RXmlUtil_isNode(n){
   return RClass.isName(n, 'TNode');
}
MO.RXmlUtil.prototype.createConnection = function RXmlUtil_createConnection(){
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
MO.RXmlUtil.prototype.createDocument = function RXmlUtil_createDocument(){
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
MO.RXmlUtil.prototype.formatText = function RXmlUtil_formatText(s){
   if(s != null){
      s = s.replace(/\\n/g, '\n');
   }
   return s;
}
MO.RXmlUtil.prototype.buildText = function RXmlUtil_buildText(s, v){
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
            case '&':
               s.append('&amp;');
               break;
            case '\'':
               s.append('&apos;');
               break;
            case '"':
               s.append('&quot;');
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
MO.RXmlUtil.prototype.buildNode = function RXmlUtil_buildNode(pd, pn, pe){
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
MO.RXmlUtil.prototype.makeString = function RXmlUtil_makeString(s){
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
MO.RXmlUtil.prototype.makeNode = function RXmlUtil_makeNode(p){
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
MO.RXmlUtil.prototype.makeDocument = function RXmlUtil_makeDocument(p){
   var d = new MO.TXmlDocument();
   if(p.documentElement){
      this.buildNode(d, null, p.documentElement);
   }
   return d;
}
MO.RXmlUtil.prototype.unpack = function RXmlUtil_unpack(s, n){
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
MO.RXml = new MO.RXmlUtil();
MO.Window.Xml = MO.RXml;
