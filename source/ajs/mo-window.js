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
   var hPanel = o._hDisablePanel;
   if(!hPanel){
      hPanel = o._hDisablePanel = MO.Window.Builder.createDiv(o._hDocument, 'RWindow_Disable');
      hPanel.style.zIndex = 5000;
   }
   var hImage = o._hDisableImage;
   if(!hImage){
      hImage = o._hDisableImage = MO.Window.Builder.appendIcon(hPanel);
      hImage.src = MO.RResource.iconPath('control.RWindow_Loading');
      hImage.style.margin = o._hContainer.offsetHeight / 2;
      hImage.style.display = 'none';
   }
   MO.Window.Html.visibleSet(hImage, f);
   return hPanel;
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
         throw new MO.TError(o, 'Unknown orientation mode.');
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
MO.EConstant = new function EConstant(){
   var o = this;
   o.DeviceType = 'device.type';
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
MO.RBuilder.prototype.createIcon = function RBuilder_createIcon(hDocument, style, uri, width, height){
   var hImage = this.create(hDocument, 'IMG', MO.Lang.String.nvl(style, 'Tag_Icon'));
   hImage.align = 'absmiddle';
   if(uri){
      hImage.src = MO.Window.Resource.iconPath(uri);
   }
   if(width){
      hImage.style.width = width + 'px';
   }
   if(height){
      hImage.style.height = height + 'px';
   }
   return hImage;
}
MO.RBuilder.prototype.createImage = function RBuilder_createImage(hDocument, style, uri, width, height){
   var hImage = this.create(hDocument, 'IMG', style);
   if(uri){
      hImage.src = MO.Window.Resource.imagePath(uri);
   }
   if(width){
      hImage.style.width = width + 'px';
   }
   if(height){
      hImage.style.height = height + 'px';
   }
   return hImage;
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
MO.RContext.prototype.get = function RContext_get(code, p1, p2, p3, p4, p5){
   var o = this;
   var context = o._contexts[code];
   if(!context){
      return MO.Logger.warn(o, 'Can not find context (code={1})', code);
   }
   return MO.Lang.String.format(context.text, p1, p2, p3, p4, p5)
}
MO.RContext.prototype.find = function RContext_find(s, c){
   var o = this;
   var id = s + ':' + c;
   var r = o._contexts[id];
   if(!r){
      return MO.Logger.warn(o, 'Can not find context (id={1})', id);
   }
   return r.text;
}
MO.RContext = new MO.RContext();
MO.Context = MO.RContext;
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
   var t = MO.Class.typeOf(v);
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
   o._clientPosition = null;
   return o;
}
MO.RHtml.prototype.uid = function RHtml_uid(value){
   var uuid = value.__puuid;
   if(uuid == null){
      uuid = value.__puuid = this._nextUid++;
   }
   return uuid;
}
MO.RHtml.prototype.displayGet = function RHtml_displayGet(hTag){
   var result = null;
   var text = hTag.style.display;
   if(MO.Window.Browser.isBrowser(MO.EBrowser.Explorer)){
      result = (text == 'inline');
   }else{
      result = (text != 'none');
   }
   return result;
}
MO.RHtml.prototype.displaySet = function RHtml_displaySet(hTag, visible){
   var text = null;
   if(MO.Window.Browser.isBrowser(MO.EBrowser.Explorer)){
      text = visible ? 'inline' : 'none';
   }else{
      text = visible ? null : 'none';
   }
   hTag.style.display = text;
}
MO.RHtml.prototype.visibleGet = function RHtml_visibleGet(hTag){
   var result = null;
   var text = hTag.style.display;
   if(MO.Window.Browser.isBrowser(MO.EBrowser.Explorer)){
      result = (text == 'block');
   }else{
      result = (text != 'none');
   }
   return result;
}
MO.RHtml.prototype.visibleSet = function RHtml_visibleSet(hTag, visible){
   var text = null;
   if(MO.Window.Browser.isBrowser(MO.EBrowser.Explorer)){
      text = visible ? '' : 'none';
   }else{
      text = visible ? null : 'none';
   }
   hTag.style.display = text;
}
MO.RHtml.prototype.textGet = function RHtml_textGet(hTag, defaultText){
   var text = null;
   if(MO.Window.Browser.isBrowser(MO.EBrowser.FireFox)){
      text = hTag.textContent;
   }else{
      text = hTag.innerText;
   }
   return text;
}
MO.RHtml.prototype.textSet = function RHtml_textSet(hTag, text){
   if(MO.Window.Browser.isBrowser(MO.EBrowser.FireFox)){
      hTag.textContent = text;
   }else{
      hTag.innerText = text;
   }
}
MO.RHtml.prototype.checkGet = function RHtml_checkGet(hTag){
   return MO.Lang.Bool.toString(hTag.checked);
}
MO.RHtml.prototype.checkSet = function RHtml_checkSet(hTag, value){
   hTag.checked = MO.Lang.Bool.isTrue(value);
}
MO.RHtml.prototype.radioGet = function RHtml_radioGet(hs){
   if(hs){
      var count = hs.length;
      for(var n = 0; n < count; n++){
         var hItem = hs[n];
         if(hItem.checked){
            return hItem.value;
         }
      }
   }
   return null;
}
MO.RHtml.prototype.radioSet = function RHtml_radioSet(hTag, value){
   if(hTag){
      var count = hTag.length;
      for(var n = 0; n < count; n++){
         var hItem = hTag[n];
         if(hItem.value == value){
            hItem.checked = true;
            break;
         }
      }
   }
}
MO.RHtml.prototype.cursorSet = function RHtml_cursorSet(hTag, value){
   if(hTag){
      hTag.style.cursor = value;
   }
}
MO.RHtml.prototype.linkGet = function RHtml_linkGet(hTag, name){
   var o = this;
   var uid = o.uid(hTag);
   var item = o._links[uid];
   return item ? item.get(name) : null;
}
MO.RHtml.prototype.linkSet = function RHtml_linkSet(hTag, n, v){
   var o = this;
   var links = o._links;
   var uid = o.uid(hTag);
   var item = links[uid];
   if(!item){
      item = links[uid] = new MO.THtmlItem();
      item._link = hTag;
   }
   item.set(n, v);
}
MO.RHtml.prototype.clientPosition = function RHtml_clientPosition(hTag, hTop){
   var o = this;
   var position = o._clientPosition;
   if(!position){
      position = o._clientPosition = new MO.SPoint2();
   }
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
MO.RHtml.prototype.clear = function RHtml_clear(hTag){
   var o = this;
   if(hTag){
      var hChildren = hTag.children;
      if(hChildren){
         var count = hChildren.length;
         for(var i = count - 1; i >= 0; i--){
            var hChild = hChildren[i];
            hTag.removeChild(hChild);
         }
      }
   }
}
MO.RHtml.prototype.clearAll = function RHtml_clearAll(hTag){
   var o = this;
   if(hTag){
      var hChildren = hTag.children;
      if(hChildren){
         var count = hChildren.length;
         for(var i = count - 1; i >= 0; i--){
            var hChild = hChildren[i];
            if(hChild.children){
               o.clear(hChild);
            }
            hTag.removeChild(hChild);
         }
      }
   }
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
MO.RResource = function RResource(){
   var o = this;
   o.uriIcon  = '/ars/icon/';
   o.uriImage = '/ars/img/';
   return o;
}
MO.RResource.prototype.iconPath = function RResource_iconPath(code, type){
   var o = this;
   var path = null;
   if(code.indexOf('|') != -1){
      var items = code.split('|');
      path = items[0];
      type = items[1];
   }else{
      path = code;
   }
   path = MO.Lang.String.nvl(path, 'n').replace(/\./g, '/') + '.' + MO.Lang.String.nvl(type, 'gif');
   return MO.Window.Browser.contentPath('/ars/icon/' + path);
}
MO.RResource.prototype.iconUrlPath = function RResource_iconUrlPath(path, type){
   var o = this;
   path = MO.Lang.String.nvl(path, 'n').replace(/\./g, '/') + '.' + MO.Lang.String.nvl(type, 'gif');
   return MO.RBrowser.contentPath('/ars/icon/' + path);
}
MO.RResource.prototype.imagePath = function RResource_imagePath(path, type){
   var o = this;
}
MO.RResource = new MO.RResource();
MO.Window.Resource = MO.RResource;
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
