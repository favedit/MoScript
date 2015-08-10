MO.AListener = function AListener(name, linker){
   var o = this;
   MO.ASource.call(o, name, MO.ESource.Listener, linker);
   o.build = MO.AListener_build;
   return o;
}
MO.AListener_build = function AListener_build(clazz, instance){
   var o = this;
   var addListener = 'add' + o._linker + 'Listener';
   instance[addListener] = MO.RListener.makeAddListener(addListener, o._linker);
   var setListener = 'set' + o._linker + 'Listener';
   instance[setListener] = MO.RListener.makeSetListener(setListener, o._linker);
   var removeListener = 'remove' + o._linker + 'Listener';
   instance[removeListener] = MO.RListener.makeRemoveListener(removeListener, o._linker);
   var clearListeners = 'clear' + o._linker + 'Listeners';
   instance[clearListeners] = MO.RListener.makeClearListener(clearListeners, o._linker);
   var processListener = 'process' + o._linker + 'Listener';
   instance[processListener] = MO.RListener.makeProcessListener(processListener, o._linker);
}
MO.EEvent = new function EEvent(){
   var o = this;
   o.Unknown          = 'Unknown';
   o.Load             = 'Load';
   o.Loaded           = 'Loaded';
   o.Process          = 'Process';
   o.Complete         = 'Complete';
   o.Change           = 'Change';
   o.EnterFrame       = 'EnterFrame';
   o.LeaveFrame       = 'LeaveFrame';
   o.Enter            = 'Enter';
   o.Leave            = 'Leave';
   o.Resize           = 'Reisze';
   o.Focus            = 'Focus';
   o.Blur             = 'Blur';
   o.MouseDown        = 'MouseDown';
   o.MouseMove        = 'MouseMove';
   o.MouseUp          = 'MouseUp';
   o.MouseWheel       = 'MouseWheel';
   o.KeyDown          = 'KeyDown';
   o.KeyPress         = 'KeyPress';
   o.KeyUp            = 'KeyUp';
   o.Click            = 'Click';
   o.DoubleClick      = 'DoubleClick';
   o.NodeClick        = 'NodeClick';
   o.ItemClick        = 'ItemClick';
   o.Selected         = 'Selected';
   o.DataChanged      = 'DataChanged';
   o.Result           = 'Result';
   o.TouchZoom        = 'TouchZoom';
   o.Visibility       = 'Visibility';
   o.Orientation      = 'Orientation';
   return o;
}
MO.EHttpContent = new function EHttpContent(){
   var o = this;
   o.Binary = 1;
   o.Text  = 2;
   return o;
}
MO.EHttpMethod = new function EHttpMethod(){
   var o = this;
   o.Get  = 'GET';
   o.Post = 'POST';
   return o;
}
MO.EHttpStatus = new function EHttpStatus(){
   var o = this;
   o.Uninitialized = 0;
   o.Open          = 1;
   o.Send          = 2;
   o.Receiving     = 3;
   o.Loaded        = 4;
   return o;
}
MO.EOrientation = new function EOrientation(){
   var o = this;
   o.Unknown = 0;
   o.Horizontal = 'H';
   o.Vertical   = 'V';
   return o;
}
MO.MListener = function MListener(o){
   o = MO.Class.inherits(this, o);
   o._listenerss       = null;
   o.addListener       = MO.MListener_addListener;
   o.setListener       = MO.MListener_setListener;
   o.removeListener    = MO.MListener_removeListener;
   o.clearListeners    = MO.MListener_clearListeners;
   o.clearAllListeners = MO.MListener_clearAllListeners;
   o.processListener   = MO.MListener_processListener;
   o.dispose           = MO.MListener_dispose;
   return o;
}
MO.MListener_addListener = function MListener_addListener(name, owner, method){
   var o = this;
   var listenerss = o._listenerss;
   if(!listenerss){
      listenerss = o._listenerss = new MO.TDictionary();
   }
   var listeners = listenerss.get(name);
   if(!listeners){
      listeners = new MO.TListeners();
      listenerss.set(name, listeners);
   }
   return listeners.register(owner, method);
}
MO.MListener_setListener = function MListener_setListener(name, owner, method){
   var o = this;
   var listenerss = o._listenerss;
   if(listenerss){
      var listeners = listenerss.get(name);
      if(listeners){
         listeners.clear();
      }
   }
   return o.addListener(name, owner, method)
}
MO.MListener_removeListener = function MListener_removeListener(name, owner, method){
   var o = this;
   var listenerss = o._listenerss;
   var listeners = listenerss.get(name);
   return listeners.unregister(owner, method);
}
MO.MListener_clearListeners = function MListener_clearListeners(name){
   var o = this;
   var listenerss = o._listenerss;
   if(listenerss){
      var listeners = listenerss.get(name);
      if(listeners){
         listeners.clear();
      }
   }
}
MO.MListener_clearAllListeners = function MListener_clearAllListeners(){
   var o = this;
   var listenerss = o._listenerss;
   if(listenerss){
      var count = listenerss.count();
      for(var i = 0; i < count; i++){
         var listeners = listenerss.at(i);
         if(listeners){
            listeners.clear();
         }
      }
   }
}
MO.MListener_processListener = function MListener_processListener(name, p1, p2, p3, p4, p5){
   var o = this;
   var listenerss = o._listenerss;
   if(listenerss){
      var listeners = listenerss.get(name);
      if(listeners){
         listeners.process(p1, p2, p3, p4, p5);
      }
   }
}
MO.MListener_dispose = function MListener_dispose(){
   var o = this;
   var listenerss = o._listenerss;
   if(listenerss){
      for(var i = listenerss.count() - 1; i >= 0; i--){
         var listeners = listenerss.at(i);
         listeners.dispose();
      }
      o._listenerss = MO.Lang.Object.dispose(listenerss);
   }
}
MO.SEvent = function SEvent(sender){
   var o = this;
   o.code       = null;
   o.annotation = null;
   o.listener   = null;
   o.sender     = sender;
   o.source     = null;
   o.hEvent     = null;
   o.hSender    = null;
   o.hSource    = null;
   o.ohProcess  = null;
   o.onProcess  = null;
   o.process    = null;
   o.dispose    = MO.SEvent_dispose;
   return o;
}
MO.SEvent_dispose = function SEvent_dispose(){
   var o = this;
   for(var name in o){
      o[name] = null;
   }
}
MO.SKeyboardEvent = function SKeyboardEvent(){
   var o = this;
   MO.SEvent.call(o);
   o.altKey      = false;
   o.shiftKey    = false;
   o.ctrlKey     = false;
   o.keyCode     = 0;
   o.attachEvent = MO.SKeyboardEvent_attachEvent;
   o.cancel      = MO.SKeyboardEvent_cancel;
   return o;
}
MO.SKeyboardEvent_attachEvent = function SKeyboardEvent_attachEvent(p){
   var o = this;
   o.altKey = p.altKey;
   o.shiftKey = p.shiftKey;
   o.ctrlKey = p.ctrlKey;
   o.keyCode = p.keyCode;
}
MO.SKeyboardEvent_cancel = function SKeyboardEvent_cancel(){
   var o = this;
   o.hEvent.returnValue = false;
}
MO.SMouseEvent = function SMouseEvent(){
   var o = this;
   MO.SEvent.call(o);
   o.button      = null;
   o.mouseLeft   = false;
   o.mouseMiddle = false;
   o.mouseRight  = false;
   o.altKey      = false;
   o.ctrlKey     = false;
   o.x           = 0;
   o.y           = 0;
   o.offsetX     = 0;
   o.offsetY     = 0;
   o.clientX     = 0;
   o.clientY     = 0;
   o.deltaX      = 0;
   o.deltaY      = 0;
   o.deltaZ      = 0;
   o.attachEvent = MO.SMouseEvent_attachEvent;
   return o;
}
MO.SMouseEvent_attachEvent = function SMouseEvent_attachEvent(event){
   var o = this;
   var hs = o.hSource = MO.RHtml.eventSource(event);
   if(hs){
      o.source = hs.__linker;
   }
   o.button = event.button;
   o.mouseLeft = (event.button == MO.EMouseButton.Left);
   o.mouseMiddle = (event.button == MO.EMouseButton.Middle);
   o.mouseRight = (event.button == MO.EMouseButton.Right);
   o.altKey = event.altKey;
   o.ctrlKey = event.ctrlKey;
   if(MO.RBrowser.isBrowser(MO.EBrowser.FireFox)){
      o.x = event.pageX;
      o.y = event.pageY;
      o.offsetX = event.layerX;
      o.offsetY = event.layerY;
   }else{
      o.x = event.x;
      o.y = event.y;
      o.offsetX = event.offsetX;
      o.offsetY = event.offsetY;
   }
   o.clientX = event.clientX;
   o.clientY = event.clientY;
   o.deltaX = event.deltaX;
   o.deltaY = event.deltaY;
   o.deltaZ = event.deltaZ;
}
MO.SResizeEvent = function SResizeEvent(){
   var o = this;
   MO.SEvent.call(o);
   o.width       = null;
   o.height      = null;
   o.attachEvent = MO.SResizeEvent_attachEvent;
   return o;
}
MO.SResizeEvent_attachEvent = function SResizeEvent_attachEvent(p){
   var o = this;
   var hs = o.hSource = MO.RHtml.eventSource(p);
   if(hs){
      o.source = hs.__linker;
   }
}
MO.FHttpConnection = function FHttpConnection(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListener);
   o._asynchronous        = MO.Class.register(o, new MO.AGetSet('_asynchronous'), false);
   o._methodCd            = MO.EHttpMethod.Get;
   o._contentCd           = MO.EHttpContent.Binary;
   o._url                 = null;
   o._heads               = MO.Class.register(o, new MO.AGetter('_heads'));
   o._input               = null;
   o._inputData           = MO.Class.register(o, new MO.AGetSet('_inputData'));
   o._output              = null;
   o._outputData          = MO.Class.register(o, new MO.AGetter('_outputData'));
   o._handle              = null;
   o._contentLength       = 0;
   o._statusFree          = true;
   o._event               = null;
   o._listenersLoad       = MO.Class.register(o, new MO.AListener('_listenersLoad', MO.EEvent.Load));
   o._listenersComplete   = MO.Class.register(o, new MO.AListener('_listenersComplete', MO.EEvent.Complete));
   o.onConnectionSend     = MO.FHttpConnection_onConnectionSend;
   o.onConnectionReady    = MO.FHttpConnection_onConnectionReady;
   o.onConnectionComplete = MO.FHttpConnection_onConnectionComplete;
   o.construct            = MO.FHttpConnection_construct;
   o.header               = MO.FHttpConnection_header;
   o.setHeader            = MO.FHttpConnection_setHeader;
   o.setHeaders           = MO.FHttpConnection_setHeaders;
   o.setOutputData        = MO.FHttpConnection_setOutputData;
   o.content              = MO.FHttpConnection_content;
   o.reset                = MO.FHttpConnection_reset;
   o.sendSync             = MO.FHttpConnection_sendSync;
   o.sendAsync            = MO.FHttpConnection_sendAsync;
   o.send                 = MO.FHttpConnection_send;
   o.dispose              = MO.FHttpConnection_dispose;
   return o;
}
MO.FHttpConnection_onConnectionSend = function FHttpConnection_onConnectionSend(){
   var o = this;
   var input = o._input;
   if(input){
      if(input.constructor == String){
         o._inputData = input;
         o._contentLength = input.length;
      }else if(input.constructor == ArrayBuffer){
         o._inputData = input;
         o._contentLength = input.byteLength;
      }else{
         throw new MO.TError('Unknown send data type.');
      }
   }
}
MO.FHttpConnection_onConnectionReady = function FHttpConnection_onConnectionReady(){
   var o = this._linker;
   if(o._asynchronous){
      var handle = o._handle;
      if(handle.readyState == MO.EHttpStatus.Loaded){
         if(handle.status == 200){
            o.setOutputData();
            o.onConnectionComplete();
         }else{
            MO.Logger.fatal(o, 'Connection failure. (url={1})', o._url);
         }
      }
   }
}
MO.FHttpConnection_onConnectionComplete = function FHttpConnection_onConnectionComplete(){
   var o = this;
   o._statusFree = true;
   var event = o._event;
   event.connection = o;
   event.content = o._outputData;
   o.processLoadListener(event);
   o.processCompleteListener(event);
}
MO.FHttpConnection_construct = function FHttpConnection_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._heads = new MO.TAttributes();
   o._event = new MO.SEvent();
   var handle = o._handle = MO.Window.Xml.createConnection();
   handle._linker = o;
   handle.onreadystatechange = o.onConnectionReady;
}
MO.FHttpConnection_header = function FHttpConnection_header(name){
   return this._heads.get(name);
}
MO.FHttpConnection_setHeader = function FHttpConnection_setHeader(name, value){
   this._heads.set(name, value);
}
MO.FHttpConnection_setHeaders = function FHttpConnection_setHeaders(){
   var o = this;
   var handle = o._handle;
   var heads = o._heads;
   var count = heads.count();
   for(var i = 0; i < count; i++){
      var headValue = heads.value(i);
      if(!MO.Lang.String.isEmpty(headValue)){
         var headName = heads.name(i);
         handle.setRequestHeader(headName, headValue);
      }
   }
   if(o._contentCd == MO.EHttpContent.Binary){
      if(MO.Window.Browser.isBrowser(MO.EBrowser.Explorer)){
         handle.setRequestHeader('Accept-Charset', 'x-user-defined');
         handle.responseType = 'arraybuffer';
      }else{
         handle.overrideMimeType('text/plain; charset=x-user-defined');
         if(o._asynchronous){
            handle.responseType = 'arraybuffer';
         }
      }
   }else{
      handle.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
   }
   if(!MO.Window.Browser.isBrowser(MO.EBrowser.Chrome)){
      if(o._contentLength > 0){
         handle.setRequestHeader('content-length', o._contentLength);
      }
   }
}
MO.FHttpConnection_setOutputData = function FHttpConnection_setOutputData(){
   var o = this;
   var handle = o._handle;
   if(o._contentCd == MO.EHttpContent.Binary){
      o._outputData = handle.response;
   }else{
      o._outputData = handle.responseText;
   }
}
MO.FHttpConnection_content = function FHttpConnection_content(){
   return this._outputData;
}
MO.FHttpConnection_reset = function FHttpConnection_reset(){
   var o = this;
   o._handle.abort()
   o.clearAllListeners();
}
MO.FHttpConnection_sendSync = function FHttpConnection_sendSync(){
   var o = this;
   var handle = o._handle;
   handle.open(o._methodCd, o._url, false);
   o.setHeaders(handle, 0);
   handle.send(o._inputData);
   o.setOutputData();
   o.onConnectionComplete();
   MO.Logger.info(this, 'Send http sync request. (method={1}, url={2})', o._methodCd, o._url);
}
MO.FHttpConnection_sendAsync = function FHttpConnection_sendAsync(){
   var o = this;
   var handle = o._handle;
   handle.open(o._methodCd, o._url, true);
   o.setHeaders(handle, 0);
   handle.send(o._inputData);
   MO.Logger.info(this, 'Send http asynchronous request. (method={1}, url={2})', o._methodCd, o._url);
}
MO.FHttpConnection_send = function FHttpConnection_send(url, data){
   var o = this;
   o._url = url;
   o._input = data;
   o._methodCd = (data != null) ? MO.EHttpMethod.Post : MO.EHttpMethod.Get;
   o._statusFree = false;
   o.onConnectionSend();
   if(o._asynchronous){
      o.sendAsync();
   }else{
      o.sendSync();
   }
   return o.content();
}
MO.FHttpConnection_dispose = function FHttpConnection_dispose(){
   var o = this;
   o._heads = MO.Lang.Object.dispose(o._heads);
   o._event = MO.Lang.Object.dispose(o._event);
   o._input = null;
   o._inputData = null;
   o._output = null;
   o._outputData = null;
   var handle = o._handle;
   if(handle){
      handle.onreadystatechange = null;
      o._handle = null;
   }
   o.__base.MListener.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
MO.RListener = function RListener(){
   var o = this;
   o._listeners = new Object();
   return o;
}
MO.RListener.prototype.makeAddListener = function RListener_makeAddListener(methodName, code){
   var o = this;
   var method = null;
   if(o._listeners[methodName]){
      method = o._listeners[methodName];
   }else{
      var source = 'return this.addListener(\''+ code +'\',owner,callback);';
      method = new Function('owner', 'callback', source);
      o._listeners[methodName] = method;
   }
   return method;
}
MO.RListener.prototype.makeSetListener = function RListener_makeSetListener(methodName, code){
   var o = this;
   var method = null;
   if(o._listeners[methodName]){
      method = o._listeners[methodName];
   }else{
      var source = 'return this.setListener(\''+ code +'\',owner,callback);';
      method = new Function('owner', 'callback', source);
      o._listeners[methodName] = method;
   }
   return method;
}
MO.RListener.prototype.makeRemoveListener = function RListener_makeRemoveListener(methodName, code){
   var o = this;
   var method = null;
   if(o._listeners[methodName]){
      method = o._listeners[methodName];
   }else{
      var source = 'return this.removeListener(\''+ code +'\',owner,callback);';
      method = new Function('owner', 'callback', source);
      o._listeners[methodName] = method;
   }
   return method;
}
MO.RListener.prototype.makeClearListener = function RListener_makeClearListener(methodName, code){
   var o = this;
   var method = null;
   if(o._listeners[methodName]){
      method = o._listeners[methodName];
   }else{
      var source = 'return this.clearListeners(\''+ code +'\');';
      method = new Function(source);
      o._listeners[methodName] = method;
   }
   return method;
}
MO.RListener.prototype.makeProcessListener = function RListener_makeProcessListener(methodName, code){
   var o = this;
   var method = null;
   if(o._listeners[methodName]){
      method = o._listeners[methodName];
   }else{
      var source = 'return this.processListener(\''+ code +'\', p1, p2, p3, p4, p5, p6);';
      method = new Function('p1', 'p2', 'p3', 'p4', 'p5', 'p6', source);
      o._listeners[methodName] = method;
   }
   return method;
}
MO.RListener = new MO.RListener();
