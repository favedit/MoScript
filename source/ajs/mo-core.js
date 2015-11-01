MO.AListener = function AListener(name, linker){
   var o = this;
   MO.ASource.call(o, name, MO.ESource.Listener, linker);
   o.build = MO.AListener_build;
   if(linker == null){
      var name = o._name;
      if(MO.Lang.String.startsWith(name, '_listeners')){
         name = name.substring(10);
      }else{
         throw new MO.TError('Linker is invalid.');
      }
      o._linker = name;
   }else{
      o._linker = linker;
   }
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
   o.OperationDown    = 'OperationDown';
   o.OperationMove    = 'OperationMove';
   o.OperationUp      = 'OperationUp';
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
   o._attributes          = MO.Class.register(o, new MO.AGetter('_attributes'));
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
   o.post                 = MO.FHttpConnection_post;
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
   var attributes = o._attributes;
   var count = attributes.count();
   for(var i = 0; i < count; i++){
      var name = attributes.name(i);
      var value = attributes.value(i);
      event[name] = value;
   }
   o.processLoadListener(event);
   o.processCompleteListener(event);
}
MO.FHttpConnection_construct = function FHttpConnection_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._heads = new MO.TAttributes();
   o._attributes = new MO.TAttributes();
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
   var heads = o._heads;
   var count = heads.count();
   if(count > 0){
      for(var i = 0; i < count; i++){
         var headName = heads.name(i);
         var headValue = heads.value(i);
         handle.setRequestHeader(headName, headValue);
      }
   }
   if(!MO.Window.Browser.isBrowser(MO.EBrowser.Chrome)){
      var contentLength = o._contentLength;
      if(contentLength > 0){
         handle.setRequestHeader('content-length', contentLength);
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
   o._attributes.clear();
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
MO.FHttpConnection_post = function FHttpConnection_send(url, data){
   var o = this;
   o._url = url;
   o._input = data;
   o._methodCd = MO.EHttpMethod.Post;
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
   o._attributes = MO.Lang.Object.dispose(o._attributes);
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
MO.APersistence = function APersistence(name, dataCd, dataClass){
   var o = this;
   MO.AAnnotation.call(o, name);
   o._annotationCd = MO.EAnnotation.Persistence;
   o._inherit      = true;
   o._ordered      = true;
   o._dataCd       = dataCd;
   o._dataClass    = dataClass;
   o.dataCd        = MO.APersistence_dataCd;
   o.dataClass     = MO.APersistence_dataClass;
   o.newStruct     = MO.APersistence_newStruct;
   o.newInstance   = MO.APersistence_newInstance;
   o.toString      = MO.APersistence_toString;
   return o;
}
MO.APersistence_dataCd = function APersistence_dataCd(){
   return this._dataCd;
}
MO.APersistence_dataClass = function APersistence_dataClass(){
   return this._dataClass;
}
MO.APersistence_newStruct = function APersistence_newStruct(){
   return new this._dataClass();
}
MO.APersistence_newInstance = function APersistence_newInstance(){
   return MO.Class.create(this._dataClass);
}
MO.APersistence_toString = function APersistence_toString(){
   return '<' + this._annotationCd + ',name=' + this._name + '>';
}
MO.AStyle = function AStyle(name, style){
   var o = this;
   MO.AAnnotation.call(o, name);
   o._annotationCd = MO.EAnnotation.Style;
   o._duplicate    = true;
   o._style        = style;
   o.code          = MO.AStyle_code;
   o.style         = MO.AStyle_style;
   o.build         = MO.AStyle_build;
   o.toString      = MO.AStyle_toString;
   if(style == null){
      var value = null;
      if(MO.Lang.String.startsWith(name, '_style')){
         value = name.substring(6);
      }else if(MO.Lang.String.startsWith(name, 'style')){
         value = name.substring(5);
      }
      if(value == null){
         throw new MO.TError('Style name is empty.');
      }
      o._style = value;
   }
   return o;
}
MO.AStyle_code = function AStyle_code(){
   return this._style;
}
MO.AStyle_style = function AStyle_style(){
   return this._style;
}
MO.AStyle_build = function AStyle_build(value){
   var o = this;
   value[o._name] = null;
}
MO.AStyle_toString = function AStyle_toString(){
   var o = this;
   return 'style=' + o._style;
}
MO.AStyleIcon = function AStyleIcon(name, style){
   var o = this;
   MO.AAnnotation.call(o, name);
   o._annotationCd = MO.EAnnotation.Style;
   o._style        = style;
   o.code          = MO.AStyleIcon_code;
   o.style         = MO.AStyleIcon_style;
   o.build         = MO.AStyleIcon_build;
   o.toString      = MO.AStyleIcon_toString;
   if(style == null){
      var value = null;
      if(MO.Lang.String.startsWith(name, '_style')){
         value = name.substring(6);
      }else if(MO.Lang.String.startsWith(name, 'style')){
         value = name.substring(5);
      }
      if(value == null){
         throw new MO.TError('Style name is empty.');
      }
      o._style = value;
   }
   return o;
}
MO.AStyleIcon_code = function AStyleIcon_code(){
   return this._style;
}
MO.AStyleIcon_style = function AStyleIcon_style(){
   return this._style;
}
MO.AStyleIcon_build = function AStyleIcon_build(value){
   var o = this;
   value[o._name] = null;
}
MO.AStyleIcon_toString = function AStyleIcon_toString(){
   var o = this;
   return 'style=' + o._style;
}
MO.EEventInvoke = new function EEventInvoke(){
   var o = this;
   o.Unknown = 0;
   o.Before  = 1;
   o.After   = 2;
   return o;
}
MO.EEventStatus = new function EEventStatus(){
   var o = this;
   o.Unknown  = 0;
   o.Continue = 1;
   o.Stop     = 2;
   o.Cancel   = 3;
   o.Failure  = 4;
   return o;
}
MO.EKeyCode = new function EKeyCode(){
   var o = this;
   o.None      = 0;
   o.Esc       = 27;
   o.Tab       = 9;
   o.Enter     = 13;
   o.Shift     = 16;
   o.Alt       = 18;
   o.Ctrl      = 17;
   o.BackSpace = 8;
   o.Space     = 32;
   o.Left      = 37;
   o.Up        = 38;
   o.Right     = 39;
   o.Down      = 40;
   o.Insert    = 45;
   o.Delete    = 46;
   o.Home      = 36;
   o.End       = 35;
   o.PageUp    = 33;
   o.PageDown  = 34;
   o.F1        = 112;
   o.F2        = 113;
   o.F3        = 114;
   o.F4        = 115;
   o.F5        = 116;
   o.F6        = 117;
   o.F7        = 118;
   o.F8        = 119;
   o.F9        = 120;
   o.F10       = 121;
   o.F11       = 122;
   o.F12       = 123;
   o.N0        = 48;
   o.N1        = 49;
   o.N2        = 50;
   o.N3        = 51;
   o.N4        = 52;
   o.N5        = 53;
   o.N6        = 54;
   o.N7        = 55;
   o.N8        = 56;
   o.N9        = 57;
   o.A         = 65;
   o.B         = 66;
   o.C         = 67;
   o.D         = 68;
   o.E         = 69;
   o.F         = 70;
   o.G         = 71;
   o.H         = 72;
   o.I         = 73;
   o.J         = 74;
   o.K         = 75;
   o.L         = 76;
   o.M         = 77;
   o.N         = 78;
   o.O         = 79;
   o.P         = 80;
   o.Q         = 81;
   o.R         = 82;
   o.S         = 83;
   o.T         = 84;
   o.U         = 85;
   o.V         = 86;
   o.W         = 87;
   o.X         = 88;
   o.Y         = 89;
   o.Z         = 90;
   o.ControlKeys = [
      o.Tab, o.Enter, o.BackSpace, o.Left, o.Up, o.Right, o.Down,
      o.Insert, o.Delete, o.Home, o.End, o.PageUp, o.PageDown,
      o.F1, o.F2, o.F3, o.F4, o.F5, o.F6, o.F7, o.F8, o.F9, o.F10, o.F11, o.F12];
   var f = o.integerCodes  = new Object();
   f[45] = true;
   f[190] = true;
   for(var n = o.N0; n <= o.N9; n++){
      f[n] = true;
   }
   var f = o.floatCodes  = new Object();
   f[45] = true;
   f[190] = true;
   f[46] = true;
   f[189] = true;
   for(var n = o.N0; n <= o.N9; n++){
      f[n] = true;
   }
   return o;
}
MO.EKeyStatus = new function EKeyStatus(){
   var o = this;
   o.Normal = 0;
   o.Press  = 1;
   return o;
}
MO.EMouseButton = new function EMouseButton(){
   var o = this;
   o.Left   = 0;
   o.Right  = 2;
   o.Middle = 3;
   return o;
}
MO.EMouseCursor = new function EMouseCursor(){
   var o = this;
   o.HSize = 'E-resize';
   o.VSize = 'N-resize';
   return o;
}
MO.MClone = function MClone(o){
   o = MO.Class.inherits(this, o);
   o.clone  = MO.MClone_clone;
   return o;
}
MO.MClone_clone = function MClone_clone(){
   var o = this;
   var result = MO.Class.create(o.constructor);
   for(var name in o){
      var value = o[name];
      if(value != null){
         if(!MO.Class.isBaseDataType(value.constructor)){
            result[name] = value.clone();
         }
      }
      result[name] = value;
   }
   return result;
}
MO.MDataStream = function MDataStream(o){
   o = MO.Class.inherits(this, o);
   o._viewer      = null;
   o._endianCd    = false;
   o._position    = 0;
   o.testString   = MO.MDataStream_testString;
   o.readBoolean  = MO.MDataStream_readBoolean;
   o.readInt8     = MO.MDataStream_readInt8;
   o.readInt16    = MO.MDataStream_readInt16;
   o.readInt32    = MO.MDataStream_readInt32;
   o.readInt64    = MO.MDataStream_readInt64;
   o.readUint8    = MO.MDataStream_readUint8;
   o.readUint16   = MO.MDataStream_readUint16;
   o.readUint32   = MO.MDataStream_readUint32;
   o.readUint64   = MO.MDataStream_readUint64;
   o.readFloat    = MO.MDataStream_readFloat;
   o.readDouble   = MO.MDataStream_readDouble;
   o.readString   = MO.MDataStream_readString;
   o.readBytes    = MO.MDataStream_readBytes;
   o.readData     = MO.MDataStream_readData;
   o.writeBoolean = MO.MDataStream_writeBoolean;
   o.writeInt8    = MO.MDataStream_writeInt8;
   o.writeInt16   = MO.MDataStream_writeInt16;
   o.writeInt32   = MO.MDataStream_writeInt32;
   o.writeInt64   = MO.MDataStream_writeInt64;
   o.writeUint8   = MO.MDataStream_writeUint8;
   o.writeUint16  = MO.MDataStream_writeUint16;
   o.writeUint32  = MO.MDataStream_writeUint32;
   o.writeUint64  = MO.MDataStream_writeUint64;
   o.writeFloat   = MO.MDataStream_writeFloat;
   o.writeDouble  = MO.MDataStream_writeDouble;
   o.writeString  = MO.MDataStream_writeString;
   o.writeBytes   = MO.MDataStream_writeBytes;
   o.writeData    = MO.MDataStream_writeData;
   return o;
}
MO.MDataStream_testString = function MDataStream_testString(){
   var o = this;
   var position = o._position;
   var length = o._viewer.getUint16(position, o._endianCd);
   position += 2;
   var result = new MO.TString();
   for(var i = 0; i < length; i++){
      var value = o._viewer.getUint16(position, o._endianCd);
      position += 2;
      result.push(String.fromCharCode(value));
   }
   return result.flush();
}
MO.MDataStream_readBoolean = function MDataStream_readBoolean(){
   var o = this;
   var value = o._viewer.getInt8(o._position, o._endianCd);
   o._position++;
   return value > 0;
}
MO.MDataStream_readInt8 = function MDataStream_readInt8(){
   var o = this;
   var value = o._viewer.getInt8(o._position, o._endianCd);
   o._position++;
   return value;
}
MO.MDataStream_readInt16 = function MDataStream_readInt16(){
   var o = this;
   var value = o._viewer.getInt16(o._position, o._endianCd);
   o._position += 2;
   return value;
}
MO.MDataStream_readInt32 = function MDataStream_readInt32(){
   var o = this;
   var value = o._viewer.getInt32(o._position, o._endianCd);
   o._position += 4;
   return value;
}
MO.MDataStream_readInt64 = function MDataStream_readInt64(){
   var o = this;
   var value = o._viewer.getInt64(o._position, o._endianCd);
   o._position += 8;
   return value;
}
MO.MDataStream_readUint8 = function MDataStream_readUint8(){
   var o = this;
   var value = o._viewer.getUint8(o._position, o._endianCd);
   o._position += 1;
   return value;
}
MO.MDataStream_readUint16 = function MDataStream_readUint16(){
   var o = this;
   var value = o._viewer.getUint16(o._position, o._endianCd);
   o._position += 2;
   return value;
}
MO.MDataStream_readUint32 = function MDataStream_readUint32(){
   var o = this;
   var value = o._viewer.getUint32(o._position, o._endianCd);
   o._position += 4;
   return value;
}
MO.MDataStream_readUint64 = function MDataStream_readUint64(){
   var o = this;
   var value = o._viewer.getUint64(o._position, o._endianCd);
   o._position += 8;
   return value;
}
MO.MDataStream_readFloat = function MDataStream_readFloat(){
   var o = this;
   var value = o._viewer.getFloat32(o._position, o._endianCd);
   o._position += 4;
   return value;
}
MO.MDataStream_readDouble = function MDataStream_readDouble(){
   var o = this;
   var value = o._viewer.getFloat64(o._position, o._endianCd);
   o._position += 8;
   return value;
}
MO.MDataStream_readString = function MDataStream_readString(){
   var o = this;
   var viewer = o._viewer;
   var endianCd = o._endianCd;
   var position = o._position;
   var length = viewer.getUint16(position, endianCd);
   position += 2;
   var value = new MO.TString();
   for(var i = 0; i < length; i++){
      var character = viewer.getUint16(position, endianCd);
      value.push(String.fromCharCode(character));
      position += 2;
   }
   o._position = position;
   return value.flush();
}
MO.MDataStream_readBytes = function MDataStream_readBytes(data, offset, length){
   var o = this;
   var viewer = o._viewer;
   if(length <= 0){
      return;
   }
   if(offset != 0){
      throw new MO.TError(o, 'Unsupport.');
   }
   var position = o._position;
   var endianCd = o._endianCd;
   if(length % 8 == 0){
      var array = new Float64Array(data);
      var count = length >> 3;
      for(var i = 0; i < count; i++){
         array[i] = viewer.getFloat64(position, endianCd);
         position += 8;
      }
      o._position = position;
      return;
   }
   if(length % 4 == 0){
      var array = new Uint32Array(data);
      var count = length >> 2;
      for(var i = 0; i < count; i++){
         array[i] = viewer.getUint32(position, endianCd);
         position += 4;
      }
      o._position = position;
      return;
   }
   if(length % 2 == 0){
      var array = new Uint16Array(data);
      var count = length >> 1;
      for(var i = 0; i < count; i++){
         array[i] = viewer.getUint16(position, endianCd);
         position += 2;
      }
      o._position = position;
      return;
   }
   var array = new Uint8Array(data);
   for(var i = 0; i < length; i++){
      array[i] = viewer.getUint8(position++, endianCd);
   }
   o._position = position;
}
MO.MDataStream_readData = function MDataStream_readData(dataCd){
   var o = this;
   switch(dataCd){
      case MO.EDataType.Int8:
         return o.readInt8();
      case MO.EDataType.Int16:
         return o.readInt16();
      case MO.EDataType.Int32:
         return o.readInt32();
      case MO.EDataType.Int64:
         return o.readInt64();
      case MO.EDataType.Uint8:
         return o.readUint8();
      case MO.EDataType.Uint16:
         return o.readUint16();
      case MO.EDataType.Uint32:
         return o.readUint32();
      case MO.EDataType.Uint64:
         return o.readUint64();
      case MO.EDataType.Float32:
         return o.readFloat();
      case MO.EDataType.Float64:
         return o.readDouble();
      case MO.EDataType.String:
         return o.readString();
   }
   throw new TError(o, 'Unknown data cd. (data_cd={1})', dataCd);
}
MO.MDataStream_writeBoolean = function MDataStream_writeBoolean(value){
   var o = this;
   o._viewer.setInt8(o._position, (value > 0) ? 1 : 0, o._endianCd);
   o._position++;
}
MO.MDataStream_writeInt8 = function MDataStream_writeInt8(value){
   var o = this;
   o._viewer.setInt8(o._position, value, o._endianCd);
   o._position++;
}
MO.MDataStream_writeInt16 = function MDataStream_writeInt16(value){
   var o = this;
   o._viewer.setInt16(o._position, value, o._endianCd);
   o._position += 2;
}
MO.MDataStream_writeInt32 = function MDataStream_writeInt32(value){
   var o = this;
   o._viewer.setInt32(o._position, value, o._endianCd);
   o._position += 4;
}
MO.MDataStream_writeInt64 = function MDataStream_writeInt64(value){
   var o = this;
   o._viewer.setInt64(o._position, value, o._endianCd);
   o._position += 8;
}
MO.MDataStream_writeUint8 = function MDataStream_writeUint8(value){
   var o = this;
   o._viewer.setUint8(o._position, value, o._endianCd);
   o._position += 1;
}
MO.MDataStream_writeUint16 = function MDataStream_writeUint16(value){
   var o = this;
   o._viewer.setUint16(o._position, value, o._endianCd);
   o._position += 2;
}
MO.MDataStream_writeUint32 = function MDataStream_writeUint32(value){
   var o = this;
   o._viewer.setUint32(o._position, value, o._endianCd);
   o._position += 4;
}
MO.MDataStream_writeUint64 = function MDataStream_writeUint64(value){
   var o = this;
   o._viewer.setUint64(o._position, value, o._endianCd);
   o._position += 8;
}
MO.MDataStream_writeFloat = function MDataStream_writeFloat(value){
   var o = this;
   o._viewer.setFloat32(o._position, value, o._endianCd);
   o._position += 4;
}
MO.MDataStream_writeDouble = function MDataStream_writeDouble(value){
   var o = this;
   o._viewer.setDouble(o._position, value, o._endianCd);
   o._position += 8;
}
MO.MDataStream_writeString = function MDataStream_writeString(value){
   var o = this;
   var viewer = o._viewer;
   var length = v.length;
   var endianCd = o._endianCd;
   var position = o._position;
   viewer.setUint16(position, length, endianCd);
   position += 2;
   for(var i = 0; i < length; i++){
      viewer.setUint16(position, value.charCodeAt(i), endianCd);
      position += 2;
   }
   o._position = position;
}
MO.MDataStream_writeBytes = function MDataStream_writeBytes(data, offset, length){
   var o = this;
   var viewer = o._viewer;
   if(length <= 0){
      return;
   }
   if(offset != 0){
      throw new MO.TError('Unsupport.');
   }
   var position = o._position;
   var endianCd = o._endianCd;
   if(length % 8 == 0){
      var array = new Float64Array(data);
      var count = length >> 3;
      for(var i = 0; i < count; i++){
         viewer.setFloat64(position, array[i], endianCd);
         position += 8;
      }
      o._position = position;
      return;
   }
   if(length % 4 == 0){
      var array = new Uint32Array(data);
      var count = length >> 2;
      for(var i = 0; i < count; i++){
         viewer.setUint32(position, array[i], endianCd);
         position += 4;
      }
      o._position = position;
      return;
   }
   if(length % 2 == 0){
      var array = new Uint16Array(data);
      var count = length >> 1;
      for(var i = 0; i < count; i++){
         viewer.setUint16(position, array[i], endianCd);
         position += 2;
      }
      o._position = position;
      return;
   }
   var array = new Uint8Array(data);
   for(var i = 0; i < length; i++){
      viewer.setUint8(position++, array[i], endianCd);
   }
   o._position = position;
}
MO.MDataStream_writeData = function MDataStream_writeData(dataCd, value){
   var o = this;
   switch(dataCd){
      case MO.EDataType.Int8:
         return o.writeInt8(value);
      case MO.EDataType.Int16:
         return o.writeInt16(value);
      case MO.EDataType.Int32:
         return o.writeInt32(value);
      case MO.EDataType.Int64:
         return o.writeInt64(value);
      case MO.EDataType.Uint8:
         return o.writeUint8(value);
      case MO.EDataType.Uint16:
         return o.writeUint16(value);
      case MO.EDataType.Uint32:
         return o.writeUint32(value);
      case MO.EDataType.Uint64:
         return o.writeUint64(value);
      case MO.EDataType.Float32:
         return o.writeFloat(value);
      case MO.EDataType.Float64:
         return o.writeDouble(value);
      case MO.EDataType.String:
         return o.writeString(value);
   }
   throw new TError(o, 'Unknown data cd. (data_cd={1})', dataCd);
}
MO.MDataView = function MDataView(o){
   o = MO.Class.inherits(this, o);
   o._viewer     = null;
   o._endianCd   = MO.Class.register(o, new MO.AGetSet('_endianCd'), false);
   o.getInt8     = MO.MDataView_getInt8;
   o.getInt16    = MO.MDataView_getInt16;
   o.getInt32    = MO.MDataView_getInt32;
   o.getInt64    = MO.MDataView_getInt64;
   o.getUint8    = MO.MDataView_getUint8;
   o.getUint16   = MO.MDataView_getUint16;
   o.getUint32   = MO.MDataView_getUint32;
   o.getUint64   = MO.MDataView_getUint64;
   o.getFloat    = MO.MDataView_getFloat;
   o.getDouble   = MO.MDataView_getDouble;
   o.setInt8     = MO.MDataView_setInt8;
   o.setInt16    = MO.MDataView_setInt16;
   o.setInt32    = MO.MDataView_setInt32;
   o.setInt64    = MO.MDataView_setInt64;
   o.setUint8    = MO.MDataView_setUint8;
   o.setUint16   = MO.MDataView_setUint16;
   o.setUint32   = MO.MDataView_setUint32;
   o.setUint64   = MO.MDataView_setUint64;
   o.setFloat    = MO.MDataView_setFloat;
   o.setDouble   = MO.MDataView_setDouble;
   return o;
}
MO.MDataView_getInt8 = function MDataView_getInt8(p){
   var o = this;
   return o._viewer.getInt8(p, o._endianCd);
}
MO.MDataView_getInt16 = function MDataView_getInt16(p){
   var o = this;
   return o._viewer.getInt16(p, o._endianCd);
}
MO.MDataView_getInt32 = function MDataView_getInt32(p){
   var o = this;
   return o._viewer.getInt32(p, o._endianCd);
}
MO.MDataView_getInt64 = function MDataView_getInt64(p){
   var o = this;
   return o._viewer.getInt64(p, o._endianCd);
}
MO.MDataView_getUint8 = function MDataView_getUint8(p){
   var o = this;
   return o._viewer.getUint8(p, o._endianCd);
}
MO.MDataView_getUint16 = function MDataView_getUint16(p){
   var o = this;
   return o._viewer.getUint16(p, o._endianCd);
}
MO.MDataView_getUint32 = function MDataView_getUint32(p){
   var o = this;
   return o._viewer.getUint32(p, o._endianCd);
}
MO.MDataView_getUint64 = function MDataView_getUint64(p){
   var o = this;
   return o._viewer.getUint64(p, o._endianCd);
}
MO.MDataView_getFloat = function MDataView_getFloat(p){
   var o = this;
   return o._viewer.getFloat32(p, o._endianCd);
}
MO.MDataView_getDouble = function MDataView_getDouble(p){
   var o = this;
   return o._viewer.getFloat64(p, o._endianCd);
}
MO.MDataView_setInt8 = function MDataView_setInt8(p, v){
   var o = this;
   o._viewer.setInt8(p, v, o._endianCd);
}
MO.MDataView_setInt16 = function MDataView_setInt16(p, v){
   var o = this;
   o._viewer.setInt16(p, v, o._endianCd);
}
MO.MDataView_setInt32 = function MDataView_setInt32(p, v){
   var o = this;
   o._viewer.setInt32(p, v, o._endianCd);
}
MO.MDataView_setInt64 = function MDataView_setInt64(p, v){
   var o = this;
   o._viewer.setInt64(p, v, o._endianCd);
}
MO.MDataView_setUint8 = function MDataView_setUint8(p, v){
   var o = this;
   o._viewer.setUint8(p, v, o._endianCd);
}
MO.MDataView_setUint16 = function MDataView_setUint16(p, v){
   var o = this;
   o._viewer.setUint16(p, v, o._endianCd);
}
MO.MDataView_setUint32 = function MDataView_setUint32(p, v){
   var o = this;
   o._viewer.setUint32(p, v, o._endianCd);
}
MO.MDataView_setUint64 = function MDataView_setUint64(p, v){
   var o = this;
   o._viewer.setUint64(p, v, o._endianCd);
}
MO.MDataView_setFloat = function MDataView_setFloat(p, v){
   var o = this;
   o._viewer.setFloat32(p, v, o._endianCd);
}
MO.MDataView_setDouble = function MDataView_setDouble(p, v){
   var o = this;
   o._viewer.setDouble(p, v, o._endianCd);
}
MO.MEncryptedStream = function MEncryptedStream(o){
   o = MO.Class.inherits(this, o, MO.MDataStream);
   o._sign        = null;
   o._signLength  = null;
   o._data        = null;
   o._dataViewer  = null;
   o.testString   = MO.MEncryptedStream_testString;
   o.readBoolean  = MO.MEncryptedStream_readBoolean;
   o.readInt8     = MO.MEncryptedStream_readInt8;
   o.readInt16    = MO.MEncryptedStream_readInt16;
   o.readInt32    = MO.MEncryptedStream_readInt32;
   o.readInt64    = MO.MEncryptedStream_readInt64;
   o.readUint8    = MO.MEncryptedStream_readUint8;
   o.readUint16   = MO.MEncryptedStream_readUint16;
   o.readUint32   = MO.MEncryptedStream_readUint32;
   o.readUint64   = MO.MEncryptedStream_readUint64;
   o.readFloat    = MO.MEncryptedStream_readFloat;
   o.readDouble   = MO.MEncryptedStream_readDouble;
   o.readString   = MO.MEncryptedStream_readString;
   o.readBytes    = MO.MEncryptedStream_readBytes;
   o.readData     = MO.MEncryptedStream_readData;
   o.writeBoolean = MO.MEncryptedStream_writeBoolean;
   o.writeInt8    = MO.MEncryptedStream_writeInt8;
   o.writeInt16   = MO.MEncryptedStream_writeInt16;
   o.writeInt32   = MO.MEncryptedStream_writeInt32;
   o.writeInt64   = MO.MEncryptedStream_writeInt64;
   o.writeUint8   = MO.MEncryptedStream_writeUint8;
   o.writeUint16  = MO.MEncryptedStream_writeUint16;
   o.writeUint32  = MO.MEncryptedStream_writeUint32;
   o.writeUint64  = MO.MEncryptedStream_writeUint64;
   o.writeFloat   = MO.MEncryptedStream_writeFloat;
   o.writeDouble  = MO.MEncryptedStream_writeDouble;
   o.writeString  = MO.MEncryptedStream_writeString;
   o.writeBytes   = MO.MEncryptedStream_writeBytes;
   o.writeData    = MO.MEncryptedStream_writeData;
   return o;
}
MO.MEncryptedStream_testString = function MEncryptedStream_testString(){
   var o = this;
   debugger
   var position = o._position;
   var length = o._viewer.getUint16(position, o._endianCd);
   position += 2;
   var result = new MO.TString();
   for(var i = 0; i < length; i++){
      var value = o._viewer.getUint16(position, o._endianCd);
      position += 2;
      result.push(String.fromCharCode(value));
   }
   return result.flush();
}
MO.MEncryptedStream_readBoolean = function MEncryptedStream_readBoolean(){
   var o = this;
   var value = o._viewer.getInt8(o._position, o._endianCd) ^ o._sign[0];
   o._position++;
   return value > 0;
}
MO.MEncryptedStream_readInt8 = function MEncryptedStream_readInt8(){
   var o = this;
   var value = o._viewer.getInt8(o._position, o._endianCd) ^ o._sign[0];
   o._position++;
   return value;
}
MO.MEncryptedStream_readInt16 = function MEncryptedStream_readInt16(){
   var o = this;
   var sign = o._sign;
   var viewer = o._viewer;
   var endianCd = o._endianCd;
   var dataViewer = o._dataViewer;
   for(var i = 0; i < 2; i++){
      dataViewer.setUint8(i, viewer.getUint8(o._position + i, endianCd) ^ sign[i], endianCd);
   }
   var value = dataViewer.getInt16(0, endianCd);
   o._position += 2;
   return value;
}
MO.MEncryptedStream_readInt32 = function MEncryptedStream_readInt32(){
   var o = this;
   var sign = o._sign;
   var viewer = o._viewer;
   var endianCd = o._endianCd;
   var dataViewer = o._dataViewer;
   for(var i = 0; i < 4; i++){
      dataViewer.setUint8(i, viewer.getUint8(o._position + i, endianCd) ^ sign[i], endianCd);
   }
   var value = dataViewer.getInt32(0, endianCd);
   o._position += 4;
   return value;
}
MO.MEncryptedStream_readInt64 = function MEncryptedStream_readInt64(){
   var o = this;
   var sign = o._sign;
   var viewer = o._viewer;
   var endianCd = o._endianCd;
   var dataViewer = o._dataViewer;
   for(var i = 0; i < 8; i++){
      dataViewer.setUint8(i, viewer.getUint8(o._position + i, endianCd) ^ sign[i], endianCd);
   }
   var value = dataViewer.getInt64(0, endianCd);
   o._position += 8;
   return value;
}
MO.MEncryptedStream_readUint8 = function MEncryptedStream_readUint8(){
   var o = this;
   var value = o._viewer.getUint8(o._position, o._endianCd) ^ o._sign[0];
   o._position += 1;
   return value;
}
MO.MEncryptedStream_readUint16 = function MEncryptedStream_readUint16(){
   var o = this;
   var sign = o._sign;
   var viewer = o._viewer;
   var endianCd = o._endianCd;
   var dataViewer = o._dataViewer;
   for(var i = 0; i < 2; i++){
      dataViewer.setUint8(i, viewer.getUint8(o._position + i, endianCd) ^ sign[i], endianCd);
   }
   var value = dataViewer.getUint16(0, endianCd);
   o._position += 2;
   return value;
}
MO.MEncryptedStream_readUint32 = function MEncryptedStream_readUint32(){
   var o = this;
   var sign = o._sign;
   var viewer = o._viewer;
   var endianCd = o._endianCd;
   var dataViewer = o._dataViewer;
   for(var i = 0; i < 4; i++){
      dataViewer.setUint8(i, viewer.getUint8(o._position + i, endianCd) ^ sign[i], endianCd);
   }
   var value = dataViewer.getUint32(0, endianCd);
   o._position += 4;
   return value;
}
MO.MEncryptedStream_readUint64 = function MEncryptedStream_readUint64(){
   var o = this;
   var sign = o._sign;
   var viewer = o._viewer;
   var endianCd = o._endianCd;
   var dataViewer = o._dataViewer;
   for(var i = 0; i < 8; i++){
      dataViewer.setUint8(i, viewer.getUint8(o._position + i, endianCd) ^ sign[i], endianCd);
   }
   var value = dataViewer.getUint64(0, endianCd);
   o._position += 8;
   return value;
}
MO.MEncryptedStream_readFloat = function MEncryptedStream_readFloat(){
   var o = this;
   var sign = o._sign;
   var viewer = o._viewer;
   var endianCd = o._endianCd;
   var dataViewer = o._dataViewer;
   for(var i = 0; i < 4; i++){
      dataViewer.setUint8(i, viewer.getUint8(o._position + i, endianCd) ^ sign[i], endianCd);
   }
   var value = dataViewer.getFloat32(0, endianCd);
   o._position += 4;
   return value;
}
MO.MEncryptedStream_readDouble = function MEncryptedStream_readDouble(){
   var o = this;
   var sign = o._sign;
   var viewer = o._viewer;
   var endianCd = o._endianCd;
   var dataViewer = o._dataViewer;
   for(var i = 0; i < 8; i++){
      dataViewer.setUint8(i, viewer.getUint8(o._position + i, endianCd) ^ sign[i], endianCd);
   }
   var value = dataViewer.getFloat64(0, endianCd);
   o._position += 8;
   return value;
}
MO.MEncryptedStream_readString = function MEncryptedStream_readString(){
   var o = this;
   var sign = o._sign;
   var signLength = o._signLength;
   var dataViewer = o._dataViewer;
   var viewer = o._viewer;
   var endianCd = o._endianCd;
   var length = o.readUint16();
   if(length == 0){
      return '';
   }
   var dataBuffer = new Uint8Array(o._data);
   var buffer = new Uint8Array(o._memory);
   var position = o._position;
   var value = new MO.TString();
   for(var i = 0; i < length; i++){
      var index = i << 1;
      dataViewer.setUint8(0, viewer.getUint8(position    , endianCd) ^ sign[(index    ) % signLength], endianCd);
      dataViewer.setUint8(1, viewer.getUint8(position + 1, endianCd) ^ sign[(index + 1) % signLength], endianCd);
      var character = dataViewer.getUint16(0, endianCd);
      value.push(String.fromCharCode(character));
      position += 2;
   }
   o._position = position;
   return value.flush();
}
MO.MEncryptedStream_readBytes = function MEncryptedStream_readBytes(data, offset, length){
   var o = this;
   var viewer = o._viewer;
   if(length <= 0){
      return;
   }
   if(offset != 0){
      throw new MO.TError(o, 'Unsupport.');
   }
   var position = o._position;
   var endianCd = o._endianCd;
   if(length % 8 == 0){
      var array = new Float64Array(data);
      var count = length >> 3;
      for(var i = 0; i < count; i++){
         array[i] = viewer.getFloat64(position, endianCd);
         position += 8;
      }
      o._position = position;
      return;
   }
   if(length % 4 == 0){
      var array = new Uint32Array(data);
      var count = length >> 2;
      for(var i = 0; i < count; i++){
         array[i] = viewer.getUint32(position, endianCd);
         position += 4;
      }
      o._position = position;
      return;
   }
   if(length % 2 == 0){
      var array = new Uint16Array(data);
      var count = length >> 1;
      for(var i = 0; i < count; i++){
         array[i] = viewer.getUint16(position, endianCd);
         position += 2;
      }
      o._position = position;
      return;
   }
   var array = new Uint8Array(data);
   for(var i = 0; i < length; i++){
      array[i] = viewer.getUint8(position++, endianCd);
   }
   o._position = position;
}
MO.MEncryptedStream_readData = function MEncryptedStream_readData(dataCd){
   var o = this;
   switch(dataCd){
      case MO.EDataType.Int8:
         return o.readInt8();
      case MO.EDataType.Int16:
         return o.readInt16();
      case MO.EDataType.Int32:
         return o.readInt32();
      case MO.EDataType.Int64:
         return o.readInt64();
      case MO.EDataType.Uint8:
         return o.readUint8();
      case MO.EDataType.Uint16:
         return o.readUint16();
      case MO.EDataType.Uint32:
         return o.readUint32();
      case MO.EDataType.Uint64:
         return o.readUint64();
      case MO.EDataType.Float32:
         return o.readFloat();
      case MO.EDataType.Float64:
         return o.readDouble();
      case MO.EDataType.String:
         return o.readString();
   }
   throw new TError(o, 'Unknown data cd. (data_cd={1})', dataCd);
}
MO.MEncryptedStream_writeBoolean = function MEncryptedStream_writeBoolean(value){
   var o = this;
   o._viewer.setInt8(o._position, (value > 0) ? 1 : 0, o._endianCd);
   o._position++;
}
MO.MEncryptedStream_writeInt8 = function MEncryptedStream_writeInt8(value){
   var o = this;
   o._viewer.setInt8(o._position, value, o._endianCd);
   o._position++;
}
MO.MEncryptedStream_writeInt16 = function MEncryptedStream_writeInt16(value){
   var o = this;
   o._viewer.setInt16(o._position, value, o._endianCd);
   o._position += 2;
}
MO.MEncryptedStream_writeInt32 = function MEncryptedStream_writeInt32(value){
   var o = this;
   o._viewer.setInt32(o._position, value, o._endianCd);
   o._position += 4;
}
MO.MEncryptedStream_writeInt64 = function MEncryptedStream_writeInt64(value){
   var o = this;
   o._viewer.setInt64(o._position, value, o._endianCd);
   o._position += 8;
}
MO.MEncryptedStream_writeUint8 = function MEncryptedStream_writeUint8(value){
   var o = this;
   o._viewer.setUint8(o._position, value, o._endianCd);
   o._position += 1;
}
MO.MEncryptedStream_writeUint16 = function MEncryptedStream_writeUint16(value){
   var o = this;
   o._viewer.setUint16(o._position, value, o._endianCd);
   o._position += 2;
}
MO.MEncryptedStream_writeUint32 = function MEncryptedStream_writeUint32(value){
   var o = this;
   o._viewer.setUint32(o._position, value, o._endianCd);
   o._position += 4;
}
MO.MEncryptedStream_writeUint64 = function MEncryptedStream_writeUint64(value){
   var o = this;
   o._viewer.setUint64(o._position, value, o._endianCd);
   o._position += 8;
}
MO.MEncryptedStream_writeFloat = function MEncryptedStream_writeFloat(value){
   var o = this;
   o._viewer.setFloat32(o._position, value, o._endianCd);
   o._position += 4;
}
MO.MEncryptedStream_writeDouble = function MEncryptedStream_writeDouble(value){
   var o = this;
   o._viewer.setDouble(o._position, value, o._endianCd);
   o._position += 8;
}
MO.MEncryptedStream_writeString = function MEncryptedStream_writeString(value){
   var o = this;
   var sign = o._sign;
   var signLength = o._signLength;
   var viewer = o._viewer;
   var length = v.length;
   var endianCd = o._endianCd;
   var position = o._position;
   viewer.setUint16(position, length ^ sign[0], endianCd);
   position += 2;
   for(var i = 0; i < length; i++){
      viewer.setUint16(position, value.charCodeAt(i) ^ sign[i % signLength], endianCd);
      position += 2;
   }
   o._position = position;
}
MO.MEncryptedStream_writeBytes = function MEncryptedStream_writeBytes(data, offset, length){
   var o = this;
   var viewer = o._viewer;
   if(length <= 0){
      return;
   }
   if(offset != 0){
      throw new MO.TError('Unsupport.');
   }
   var position = o._position;
   var endianCd = o._endianCd;
   if(length % 8 == 0){
      var array = new Float64Array(data);
      var count = length >> 3;
      for(var i = 0; i < count; i++){
         viewer.setFloat64(position, array[i], endianCd);
         position += 8;
      }
      o._position = position;
      return;
   }
   if(length % 4 == 0){
      var array = new Uint32Array(data);
      var count = length >> 2;
      for(var i = 0; i < count; i++){
         viewer.setUint32(position, array[i], endianCd);
         position += 4;
      }
      o._position = position;
      return;
   }
   if(length % 2 == 0){
      var array = new Uint16Array(data);
      var count = length >> 1;
      for(var i = 0; i < count; i++){
         viewer.setUint16(position, array[i], endianCd);
         position += 2;
      }
      o._position = position;
      return;
   }
   var array = new Uint8Array(data);
   for(var i = 0; i < length; i++){
      viewer.setUint8(position++, array[i], endianCd);
   }
   o._position = position;
}
MO.MEncryptedStream_writeData = function MEncryptedStream_writeData(dataCd, value){
   var o = this;
   switch(dataCd){
      case MO.EDataType.Int8:
         return o.writeInt8(value);
      case MO.EDataType.Int16:
         return o.writeInt16(value);
      case MO.EDataType.Int32:
         return o.writeInt32(value);
      case MO.EDataType.Int64:
         return o.writeInt64(value);
      case MO.EDataType.Uint8:
         return o.writeUint8(value);
      case MO.EDataType.Uint16:
         return o.writeUint16(value);
      case MO.EDataType.Uint32:
         return o.writeUint32(value);
      case MO.EDataType.Uint64:
         return o.writeUint64(value);
      case MO.EDataType.Float32:
         return o.writeFloat(value);
      case MO.EDataType.Float64:
         return o.writeDouble(value);
      case MO.EDataType.String:
         return o.writeString(value);
   }
   throw new TError(o, 'Unknown data cd. (data_cd={1})', dataCd);
}
MO.MListenerLoad = function MListenerLoad(o){
   o = MO.Class.inherits(this, o, MO.MListener);
   o.addLoadListener     = MO.MListenerLoad_addLoadListener;
   o.removeLoadListener  = MO.MListenerLoad_removeLoadListener;
   o.clearLoadListeners  = MO.MListenerLoad_clearLoadListeners;
   o.processLoadListener = MO.MListenerLoad_processLoadListener;
   return o;
}
MO.MListenerLoad_addLoadListener = function MListenerLoad_addLoadListener(w, m){
   return this.addListener(MO.EEvent.Load, w, m);
}
MO.MListenerLoad_removeLoadListener = function MListenerLoad_removeLoadListener(w, m){
   this.removeListener(MO.EEvent.Load, w, m);
}
MO.MListenerLoad_clearLoadListeners = function MListenerLoad_clearLoadListeners(){
   this.clearListeners(MO.EEvent.Load);
}
MO.MListenerLoad_processLoadListener = function MListenerLoad_processLoadListener(p1, p2, p3, p4, p5){
   this.processListener(MO.EEvent.Load, p1, p2, p3, p4, p5);
}
MO.MListenerProcess = function MListenerProcess(o){
   o = MO.Class.inherits(this, o, MO.MListener);
   o.addProcessListener     = MO.MListenerProcess_addProcessListener;
   o.removeProcessListener  = MO.MListenerProcess_removeProcessListener;
   o.clearProcessListeners  = MO.MListenerProcess_clearProcessListeners;
   o.processProcessListener = MO.MListenerProcess_processProcessListener;
   return o;
}
MO.MListenerProcess_addProcessListener = function MListenerProcess_addProcessListener(owner, process){
   return this.addListener(MO.EEvent.Process, owner, process);
}
MO.MListenerProcess_removeProcessListener = function MListenerProcess_removeProcessListener(owner, process){
   this.removeListener(MO.EEvent.Process, owner, process);
}
MO.MListenerProcess_clearProcessListeners = function MListenerProcess_clearProcessListeners(){
   this.clearListeners(MO.EEvent.Process);
}
MO.MListenerProcess_processProcessListener = function MListenerProcess_processProcessListener(p1, p2, p3, p4, p5){
   this.processListener(MO.EEvent.Process, p1, p2, p3, p4, p5);
}
MO.MListenerTouchZoom = function MListenerTouchZoom(o){
   o = MO.Class.inherits(this, o, MO.MListener);
   o.addTouchZoomListener     = MO.MListenerTouchZoom_addTouchZoomListener;
   o.removeTouchZoomListener  = MO.MListenerTouchZoom_removeTouchZoomListener;
   o.clearTouchZoomListeners  = MO.MListenerTouchZoom_clearTouchZoomListeners;
   o.processTouchZoomListener = MO.MListenerTouchZoom_processTouchZoomListener;
   return o;
}
MO.MListenerTouchZoom_addTouchZoomListener = function MListenerTouchZoom_addTouchZoomListener(w, m){
   return this.addListener(MO.EEvent.TouchZoom, w, m);
}
MO.MListenerTouchZoom_removeTouchZoomListener = function MListenerTouchZoom_removeTouchZoomListener(w, m){
   this.removeListener(MO.EEvent.TouchZoom, w, m);
}
MO.MListenerTouchZoom_clearTouchZoomListeners = function MListenerTouchZoom_clearTouchZoomListeners(){
   this.clearListeners(MO.EEvent.TouchZoom);
}
MO.MListenerTouchZoom_processTouchZoomListener = function MListenerTouchZoom_processTouchZoomListener(p1, p2, p3, p4, p5){
   this.processListener(MO.EEvent.TouchZoom, p1, p2, p3, p4, p5);
}
MO.MMouseCapture = function MMouseCapture(o){
   o = MO.Class.inherits(this, o);
   o.onMouseCaptureStart = MO.Method.virtual(o, 'onMouseCaptureStart');
   o.onMouseCapture      = MO.Method.virtual(o, 'onMouseCapture');
   o.onMouseCaptureStop  = MO.Method.virtual(o, 'onMouseCaptureStop');
   o.testMouseCapture    = MO.Method.emptyTrue;
   return o;
}
MO.MMouseWheel = function MMouseWheel(o){
   o = MO.Class.inherits(this, o);
   o.onMouseWheel = MO.Class.register(o, new MO.AEventMouseWheel('onMouseWheel'), MO.Method.empty);
   return o;
}
MO.MParent = function MParent(o){
   o = MO.Class.inherits(this, o);
   o._parent    = MO.Class.register(o, new MO.AGetSet('_parent'));
   o.isParent   = MO.MParent_isParent;
   o.findParent = MO.MParent_findParent;
   o.dispose    = MO.MParent_dispose;
   return o;
}
MO.MParent_isParent = function MParent_isParent(value){
   while(value){
      if(value == this){
         return true;
      }
      value = value.parent();
   }
}
MO.MParent_findParent = function MParent_findParent(clazz){
   var find = this;
   if(clazz){
      while(MO.Class.isClass(find._parent, clazz)){
         find = find.parent();
      }
   }else{
      while(find._parent){
         find = find.parent();
      }
   }
   return find;
}
MO.MParent_dispose = function MParent_dispose(){
   var o = this;
   o._parent = null;
}
MO.MPersistence = function MPersistence(o){
   o = MO.Class.inherits(this, o, MO.MPersistenceAble);
   o.unserialize = MO.MPersistence_unserialize;
   o.serialize   = MO.MPersistence_serialize;
   return o;
}
MO.MPersistence_unserialize = function MPersistence_unserialize(input){
   var o = this;
   var clazz = MO.Class.find(o.constructor);
   var annotations = clazz.annotations(MO.EAnnotation.Persistence);
   var count = annotations.count();
   for(var n = 0; n < count; n++){
      var annotation = annotations.at(n);
      var dateCd = annotation.dataCd();
      var name = annotation.name();
      if(dateCd == MO.EDataType.Struct){
         var item = o[name];
         if(!item){
            item = o[name] = annotation.newStruct();
         }
         item.unserialize(input);
      }else if(dateCd == MO.EDataType.Object){
         var item = o[name];
         if(!item){
            item = o[name] = annotation.newInstance();
         }
         item.unserialize(input);
      }else if(dateCd == MO.EDataType.Objects){
         var items = o[name];
         if(!items){
            items = o[name] = new MO.TObjects();
         }
         items.clear();
         var itemCount = input.readInt32();
         for(var i = 0; i < itemCount; i++){
            var item = annotation.newInstance();
            item.unserialize(input);
            items.push(item);
         }
      }else if(dateCd == MO.EDataType.Dictionary){
         var items = o[name];
         if(!items){
            items = o[name] = new MO.TDictionary();
         }
         items.clear();
         var itemCount = input.readInt32();
         for(var i = 0; i < itemCount; i++){
            var item = annotation.newInstance();
            item.unserialize(input);
            items.set(item.code(), item);
         }
      }else{
         o[name] = input.readData(dateCd);
      }
   }
}
MO.MPersistence_serialize = function MPersistence_serialize(output){
   var o = this;
   var clazz = MO.Class.find(o.constructor);
   var annotations = clazz.annotations(MO.EAnnotation.Persistence);
   var count = annotations.count();
   for(var i = 0; i < count; i++){
      var annotation = annotations.at(i);
      var dateCd = annotation.dataCd();
      var name = annotation.name();
      var value = o[name];
      if(dateCd == MO.EDataType.Object){
         value.unserialize(input);
      }else if(dateCd == MO.EDataType.Objects){
         var itemCount = value.count();
         input.writeInt32(itemCount);
         for(var i = 0; i < itemCount; i++){
            var item = value.at(i);
            item.serialize(input);
         }
      }else if(dateCd == MO.EDataType.Dictionary){
         var items = o[name];
         var itemCount = value.count();
         input.writeInt32(itemCount);
         for(var i = 0; i < itemCount; i++){
            var item = value.at(i);
            item.serialize(input);
         }
      }else{
         input.writeData(dateCd, value);
      }
   }
}
MO.MPersistenceAble = function MPersistenceAble(o){
   o = MO.Class.inherits(this, o);
   o.unserialize                = MO.Method.empty;
   o.unserializeBuffer          = MO.MPersistenceAble_unserializeBuffer;
   o.unserializeSignBuffer      = MO.MPersistenceAble_unserializeSignBuffer;
   o.unserializeEncryptedBuffer = MO.MPersistenceAble_unserializeEncryptedBuffer;
   o.serialize                  = MO.Method.empty;
   o.serializeBuffer            = MO.MPersistenceAble_serializeBuffer;
   o.serializeSignBuffer        = MO.MPersistenceAble_serializeSignBuffer;
   o.serializeEncryptedBuffer   = MO.MPersistenceAble_serializeEncryptedBuffer;
   return o;
}
MO.MPersistenceAble_unserializeBuffer = function MPersistenceAble_unserializeBuffer(buffer, endianCd){
   var o = this;
   var view = MO.Class.create(MO.FDataView);
   view.setEndianCd(endianCd);
   view.link(buffer);
   o.unserialize(view);
   view.dispose();
}
MO.MPersistenceAble_unserializeSignBuffer = function MPersistenceAble_unserializeSignBuffer(sign, buffer, endianCd){
   var o = this;
   var bytes = new Uint8Array(buffer);
   MO.Lang.Byte.encodeBytes(bytes, 0, bytes.length, sign);
   var view = MO.Class.create(MO.FDataView);
   view.setEndianCd(endianCd);
   view.link(buffer);
   o.unserialize(view);
   view.dispose();
}
MO.MPersistenceAble_unserializeEncryptedBuffer = function MPersistenceAble_unserializeEncryptedBuffer(sign, buffer, endianCd){
   var o = this;
   var view = MO.Class.create(MO.FEncryptedView);
   view.setSign(sign);
   view.setEndianCd(endianCd);
   view.link(buffer);
   o.unserialize(view);
   view.dispose();
}
MO.MPersistenceAble_serializeBuffer = function MPersistenceAble_serializeBuffer(buffer, endianCd){
   var o = this;
   var view = MO.Class.create(MO.FDataView);
   view.setEndianCd(endianCd);
   view.link(buffer);
   o.serialize(view);
   view.dispose();
}
MO.MPersistenceAble_serializeSignBuffer = function MPersistenceAble_serializeSignBuffer(buffer, endianCd){
   var o = this;
   var view = MO.Class.create(MO.FDataView);
   view.setEndianCd(endianCd);
   view.link(buffer);
   o.serialize(view);
   view.dispose();
}
MO.MPersistenceAble_serializeEncryptedBuffer = function MPersistenceAble_serializeEncryptedBuffer(sign, buffer, endianCd){
   var o = this;
   var view = MO.Class.create(MO.FEncryptedView);
   view.setSign(sign);
   view.setEndianCd(endianCd);
   view.link(buffer);
   o.serialize(view);
   view.dispose();
}
MO.MProperty = function MProperty(o){
   o = MO.Class.inherits(this, o);
   o.propertyAssign = MO.MProperty_propertyAssign;
   o.propertyLoad   = MO.MProperty_propertyLoad;
   o.propertySave   = MO.MProperty_propertySave;
   return o;
}
MO.MProperty_propertyAssign = function MProperty_propertyAssign(value){
   var o = this;
   var clazz = MO.Class.find(o.constructor);
   var annotations = clazz.annotations(MO.EAnnotation.Property);
   for(var name in annotations){
      var annotation = annotations[name];
      if(annotation.constructor != Function){
         o[annotation._name] = value[annotation._name];
      }
   }
}
MO.MProperty_propertyLoad = function MProperty_propertyLoad(xconfig){
   var o = this;
   var clazz = MO.Class.find(o.constructor);
   var annotations = clazz.annotations(MO.EAnnotation.Property);
   for(var name in annotations){
      var annotation = annotations[name];
      if(annotation.constructor != Function){
         if(annotation._force){
            annotation.load(o, xconfig);
         }else{
            if(xconfig.contains(annotation._linker)){
               annotation.load(o, xconfig);
            }else if(o[annotation._name] == null){
               o[annotation._name] = annotation._value;
            }
         }
      }
   }
}
MO.MProperty_propertySave = function MProperty_propertySave(xconfig){
   var o = this;
   var clazz = MO.Class.find(o.constructor);
   var annotations = clazz.annotations(MO.EAnnotation.Property);
   for(var name in annotations){
      var annotation = annotations[name];
      if(annotation.constructor != Function){
         annotation.save(o, xconfig);
      }
   }
}
MO.SClickEvent = function SClickEvent(sender){
   var o = this;
   MO.SEvent.call(o, sender);
   return o;
}
MO.SXmlEvent = function SXmlEvent(){
   var o = this;
   MO.SEvent.call(o);
   o.connection = null;
   o.document   = null;
   o.root       = null;
   return o;
}
MO.THtmlItem = function THtmlItem(){
   var o = this;
   o._link  = null;
   o._links = new Object();
   o.get    = MO.THtmlItem_get;
   o.set    = MO.THtmlItem_set;
   return o;
}
MO.THtmlItem_get = function THtmlItem_get(name){
   return this._links[name];
}
MO.THtmlItem_set = function THtmlItem_set(name, value){
   this._links[name] = value;
}
MO.TXmlDocument = function TXmlDocument(){
   var o = this;
   o._root   = null;
   o.create  = MO.TXmlDocument_create;
   o.root    = MO.TXmlDocument_root;
   o.setRoot = MO.TXmlDocument_setRoot;
   o.xml     = MO.TXmlDocument_xml;
   o.dump    = MO.TXmlDocument_dump;
   return o;
}
MO.TXmlDocument_create = function TXmlDocument_create(n, a, v){
   var r = new MO.TXmlNode();
   r._name = n;
   r._attributes = a;
   r._value = v;
   return r;
}
MO.TXmlDocument_root = function TXmlDocument_root(){
   var o = this;
   var r = o._root;
   if(!r){
      r = o._root = new MO.TXmlNode();
      r._name = 'Configuration';
   }
   return r;
}
MO.TXmlDocument_setRoot = function TXmlDocument_setRoot(p){
   var o = this;
   if(!o._root){
      o._root = p;
   }else{
      throw new MO.TError(o, 'Root node is already exists.');
   }
}
MO.TXmlDocument_xml = function TXmlDocument_xml(){
   var xml = new MO.TString();
   xml.append("<?xml version='1.0' encoding='UTF-8'?>");
   this.root().innerXml(xml, 0);
   return xml.flush();
}
MO.TXmlDocument_dump = function TXmlDocument_dump(){
   var o = this;
   var r = new MO.TString();
   r.appendLine(MO.RClass.name(o));
   o.root().dump(r);
   return r.flush();
}
MO.TXmlNode = function TXmlNode(name){
   var o = this;
   MO.TNode.call(o, name);
   o.create   = MO.TXmlNode_create;
   o.innerXml = MO.TXmlNode_innerXml;
   o.xml      = MO.TXmlNode_xml;
   o.toString = MO.TXmlNode_toString;
   return o;
}
MO.TXmlNode_create = function TXmlNode_create(name, attribtues){
   var o = this;
   var xnode = new MO.TXmlNode();
   xnode._name = name;
   xnode._attributes = attribtues;
   if(!MO.Class.isClass(attribtues, MO.TAttributes)){
      var a = arguments;
      var len = a.length;
      for(var n = 1; n < len; n += 2){
         if(n + 1 < len){
            xnode.set(a[n], a[n+1]);
         }else{
            xnode.setValue(a[n]);
         }
      }
   }
   o.push(xnode);
   return xnode;
}
MO.TXmlNode_innerXml = function TXmlNode_innerXml(s, l){
   var o = this;
   s.appendRepeat('   ', l);
   s.append('<', o._name);
   var as = o._attributes;
   if(as){
      var ac = as.count();
      for(var n = 0; n < ac; n++){
         s.append(' ', as.name(n), '="');
         MO.RXml.buildText(s, as.value(n));
         s.append('"');
      }
   }
   if(!o._nodes && (o._value == null)){
      s.append('/');
   }
   s.append('>\n');
   var ns = o._nodes;
   if(ns){
      var c = ns.count();
      for(var n = 0; n < c; n++){
         ns.get(n).innerXml(s, l + 1);
      }
   }
   MO.RXml.buildText(s, o._value)
   if(o._nodes || o._value != null){
      s.appendRepeat('   ', l);
      s.append('</', o._name, '>');
      s.append('\n');
   }
   return s;
}
MO.TXmlNode_xml = function TXmlNode_xml(){
   var xml = new MO.TString();
   this.innerXml(xml, 0);
   return xml.flush();
}
MO.TXmlNode_toString = function TXmlNode_toString(){
   return this.xml().toString();
}
MO.FBinarySocket = function FBinarySocket(o){
   o = MO.Class.inherits(this, o, MO.FSocket);
   o.connect = MO.FBinarySocket_connect;
   return o;
}
MO.FBinarySocket_connect = function FBinarySocket_connect(url){
   var o = this;
   o.__base.FSocket.connect.call(o, url);
   o._handle.binaryType = "arraybuffer" ;
}
MO.FBufferedSocket = function FBufferedSocket(o){
   o = MO.Class.inherits(this, o, MO.FSocket);
   o._bufferSends    = MO.Class.register(o, new MO.AGetter('_bufferSends'));
   o._bufferReceives = MO.Class.register(o, new MO.AGetter('_bufferReceives'));
   o.onOpen          = MO.FBufferedSocket_onOpen;
   o.construct       = MO.FBufferedSocket_construct;
   o.push            = MO.FBufferedSocket_push;
   o.process         = MO.FBufferedSocket_process;
   o.dispose         = MO.FBufferedSocket_dispose;
   return o;
}
MO.FBufferedSocket_onOpen = function FBufferedSocket_onOpen(event){
   var o = this;
   o.__base.FSocket.onOpen.call(o, event);
   o.process();
}
MO.FBufferedSocket_ohError = function FBufferedSocket_ohError(event){
   var o = this._linker;
}
MO.FBufferedSocket_ohMessage = function FBufferedSocket_ohMessage(event){
   var o = this._linker;
}
MO.FBufferedSocket_ohClose = function FBufferedSocket_ohClose(event){
   var o = this._linker;
   o._connected = false;
}
MO.FBufferedSocket_construct = function FBufferedSocket_construct(){
   var o = this;
   o.__base.FSocket.construct.call(o);
   o._bufferSends = new MO.TObjects();
   o._bufferReceives = new MO.TObjects();
}
MO.FBufferedSocket_push = function FBufferedSocket_push(message){
   this._bufferSends.push(message);
}
MO.FBufferedSocket_process = function FBufferedSocket_process(){
   var o = this;
   if(!o._connected){
      return false;
   }
   var sends = o._bufferSends;
   if(!sends.isEmpty()){
      var count = sends.count();
      for(var i = 0; i < count; i++){
         var message = sends.at(i);
         o.send(message);
      }
      sends.clear();
   }
   return true;
}
MO.FBufferedSocket_dispose = function FBufferedSocket_dispose(){
   var o = this;
   o._bufferSends = MO.Lang.Object.dispose(o._bufferSends);
   o._bufferReceives = MO.Lang.Object.dispose(o._bufferReceives);
   o.__base.FSocket.dispose.call(o);
}
MO.FBytes = function FBytes(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MDataView);
   o._memory   = MO.Class.register(o, new MO.AGetter('_memory'));
   o.construct = MO.FBytes_construct;
   o.dispose   = MO.FBytes_dispose;
   return o;
}
MO.FBytes_construct = function FBytes_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._memory = new ArrayBuffer();
   o._viewer = new DataView(o._memory);
}
MO.FBytes_dispose = function FBytes_dispose(){
   var o = this;
   o._memory = null;
   o._viewer = null;
   o.__base.FObject.dispose.call(o);
}
MO.FClassFactory = function FClassFactory(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._classes   = null;
   o.construct  = MO.FClassFactory_construct;
   o.register   = MO.FClassFactory_register;
   o.unregister = MO.FClassFactory_unregister;
   o.create     = MO.FClassFactory_create;
   o.dispose    = MO.FClassFactory_dispose;
   return o;
}
MO.FClassFactory_construct = function FClassFactory_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._classes = new MO.TDictionary();
}
MO.FClassFactory_register = function FClassFactory_register(n, c){
   this._classes.set(n, c);
}
MO.FClassFactory_unregister = function FClassFactory_unregister(n){
   this._classes.set(n, null);
}
MO.FClassFactory_create = function FClassFactory_create(n){
   var o = this;
   var c = o._classes.get(n);
   if(!c){
      throw new MO.TError('Create unregister class. (name={1})', n);
   }
   return MO.Class.create(c);
}
MO.FClassFactory_dispose = function FClassFactory_dispose(){
   var o = this;
   o._classes = MO.Lang.Object.dispose(o._classes);
   o.__base.FObject.dispose.call(o);
}
MO.FComponent = function FComponent(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MParent);
   o._code   = MO.Class.register(o, new MO.AGetSet('_code'));
   o.dispose = MO.FComponent_dispose;
   return o;
}
MO.FComponent_dispose = function FComponent_dispose(){
   var o = this;
   o.__base.MParent.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
MO.FDataStream = function FDataStream(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MDataView, MO.MDataStream);
   o._length   = MO.Class.register(o, new MO.AGetter('_length'), 0);
   o._memory   = MO.Class.register(o, new MO.AGetter('_memory'));
   o._viewer   = null;
   o.construct = MO.FDataStream_construct;
   o.setLength = MO.FDataStream_setLength;
   o.flip      = MO.FDataStream_flip;
   o.dispose   = MO.FDataStream_dispose;
   return o;
}
MO.FDataStream_construct = function FDataStream_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
MO.FDataStream_setLength = function FDataStream_setLength(length){
   var o = this;
   o._length = length;
   o._memory = new ArrayBuffer(length);
   o._viewer = new DataView(o._memory);
}
MO.FDataStream_flip = function FDataStream_flip(){
   var o = this;
   o._length = o._position;
   o._position = 0;
}
MO.FDataStream_dispose = function FDataStream_dispose(){
   var o = this;
   o._viewer = null;
   o._memory = null;
   o.__base.FObject.dispose.call(o);
}
MO.FDataView = function FDataView(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MDataView, MO.MDataStream);
   o.link    = MO.FDataView_link;
   o.dispose = MO.FDataView_dispose;
   return o;
}
MO.FDataView_link = function FDataView_link(data){
   var o = this;
   o._memory = data;
   o._viewer = new DataView(data);
}
MO.FDataView_dispose = function FDataView_dispose(){
   var o = this;
   o._viewer = null;
   o._memory = null;
   o.__base.FObject.dispose.call(o);
}
MO.FEncryptedView = function FEncryptedView(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MDataView, MO.MEncryptedStream);
   o.construct = MO.FEncryptedView_construct;
   o.setSign   = MO.FEncryptedView_setSign;
   o.link      = MO.FEncryptedView_link;
   o.dispose   = MO.FEncryptedView_dispose;
   return o;
}
MO.FEncryptedView_construct = function FEncryptedView_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._data = new ArrayBuffer(8);
   o._dataViewer = new DataView(o._data);
}
MO.FEncryptedView_setSign = function FEncryptedView_setSign(value){
   var o = this;
   var sign = o._sign = new Uint8Array(8);
   sign[0] = (value      ) & 0xFF;
   sign[1] = (value >>  8) & 0xFF;
   sign[2] = (value >> 16) & 0xFF;
   sign[3] = (value >> 24) & 0xFF;
   sign[4] = (value >> 24) & 0xFF;
   sign[5] = (value >> 16) & 0xFF;
   sign[6] = (value >>  8) & 0xFF;
   sign[7] = (value      ) & 0xFF;
   o._signLength = sign.length;
}
MO.FEncryptedView_link = function FEncryptedView_link(data){
   var o = this;
   o._memory = data;
   o._viewer = new DataView(data);
}
MO.FEncryptedView_dispose = function FEncryptedView_dispose(){
   var o = this;
   o._sign = null;
   o._data = null;
   o._dataViewer.buffer = null;
   o._dataViewer = null;
   o._viewer = null;
   o._memory = null;
   o.__base.FObject.dispose.call(o);
}
MO.FFileReader = function FFileReader(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListenerLoad);
   o._reader        = null;
   o._fileName      = MO.Class.register(o, new MO.AGetter('_fileName'));
   o._length        = MO.Class.register(o, new MO.AGetter('_length'), 0);
   o._data          = MO.Class.register(o, new MO.AGetter('_data'));
   o._statusLoading = false;
   o.ohloadStart    = MO.FFileReader_ohLoadStart;
   o.ohLoad         = MO.FFileReader_ohLoad;
   o.ohLoadEnd      = MO.FFileReader_ohLoadEnd;
   o.ohProgress     = MO.FFileReader_ohProgress;
   o.construct      = MO.FFileReader_construct;
   o.loadFile       = MO.FFileReader_loadFile;
   o.dispose        = MO.FFileReader_dispose;
   return o;
}
MO.FFileReader_ohLoadStart = function FFileReader_ohLoadStart(){
   var o = this.__linker;
}
MO.FFileReader_ohLoad = function FFileReader_ohLoad(){
   var o = this.__linker;
}
MO.FFileReader_ohLoadEnd = function FFileReader_ohLoadEnd(){
   var o = this.__linker;
   var reader = o._reader;
   o._statusFree = true;
   if(reader.error){
      MO.Logger.error(o, 'Load file failure. (error={1])', reader.error);
   }else{
      o._length = reader.result.byteLength;
      o._data = reader.result;
      var event = new MO.SEvent(o);
      o.processLoadListener(event);
      event.dispose();
   }
}
MO.FFileReader_ohProgress = function FFileReader_ohProgress(){
   var o = this.__linker;
}
MO.FFileReader_construct = function FFileReader_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   var reader = o._reader = new FileReader();
   reader.__linker = o;
   reader.onloadstart = o.ohLoadStart;
   reader.onload = o.ohLoad;
   reader.onloadend = o.ohLoadEnd;
   reader.onprogress = o.ohProgress;
}
MO.FFileReader_loadFile = function FFileReader_loadFile(file){
   var o = this;
   o._fileName = file.name;
   o._length = file.size;
   var reader = o._reader;
   reader.readAsArrayBuffer(file);
}
MO.FFileReader_dispose = function FFileReader_dispose(){
   var o = this;
   var reader = o._reader;
   reader.__linker = null;
   reader.onloadstart = null;
   reader.onload = null;
   reader.onloadend = null;
   reader.onprogress = null;
   o._reader = null;
   o._fileName = null;
   o._data = null;
   o.__base.MListenerLoad.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
MO.FJsonConnection = function FJsonConnection(o){
   o = MO.Class.inherits(this, o, MO.FHttpConnection);
   o._contentCd           = MO.EHttpContent.Text;
   o._content             = null;
   o.onConnectionComplete = MO.FJsonConnection_onConnectionComplete;
   o.content              = MO.FJsonConnection_content;
   return o;
}
MO.FJsonConnection_onConnectionComplete = function FJsonConnection_onConnectionComplete(){
   var o = this;
   o._statusFree = true;
   var content = null;
   var data = o._outputData;
   if(data){
      content = o._content = JSON.parse(data);
   }
   var event = o._event;
   event.connection = o;
   event.data = data;
   event.content = content;
   o.processLoadListener(event);
   o.processCompleteListener(event);
}
MO.FJsonConnection_content = function FJsonConnection_content(){
   return this._content;
}
MO.FSocket = function FSocket(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListener);
   o._url              = MO.Class.register(o, new MO.AGetSet('_url'));
   o._stoped           = MO.Class.register(o, new MO.AGetter('_stoped'), true);
   o._connected        = MO.Class.register(o, new MO.AGetter('_connected'), false);
   o._handle           = MO.Class.register(o, new MO.AGetter('_handle'));
   o._eventOpen        = null;
   o._eventSend        = null;
   o._eventReceive     = null;
   o._eventClose       = null;
   o._eventError       = null;
   o._listenersOpen    = MO.Class.register(o, new MO.AListener('_listenersOpen'));
   o._listenersSend    = MO.Class.register(o, new MO.AListener('_listenersSend'));
   o._listenersReceive = MO.Class.register(o, new MO.AListener('_listenersReceive'));
   o._listenersClose   = MO.Class.register(o, new MO.AListener('_listenersClose'));
   o._listenersError   = MO.Class.register(o, new MO.AListener('_listenersError'));
   o.onOpen            = MO.FSocket_onOpen;
   o.onReveive         = MO.FSocket_onReveive;
   o.onClose           = MO.FSocket_onClose;
   o.ohOpen            = MO.FSocket_ohOpen;
   o.ohError           = MO.FSocket_ohError;
   o.ohReceive         = MO.FSocket_ohReceive;
   o.ohClose           = MO.FSocket_ohClose;
   o.construct         = MO.FSocket_construct;
   o.connect           = MO.FSocket_connect;
   o.send              = MO.FSocket_send;
   o.process           = MO.FSocket_process;
   o.disconnect        = MO.FSocket_disconnect;
   o.dispose           = MO.FSocket_dispose;
   return o;
}
MO.FSocket_onOpen = function FSocket_onOpen(event){
   var o = this;
   o._connected = true;
   o.processOpenListener(event);
}
MO.FSocket_ohOpen = function FSocket_ohOpen(hEvent){
   var o = this._linker;
   var event = o._eventOpen;
   o.onOpen(event);
}
MO.FSocket_onReveive = function FSocket_onReveive(event){
   var o = this;
   o.processReceiveListener(event);
}
MO.FSocket_ohReceive = function FSocket_ohReceive(hEvent){
   var o = this._linker;
   var event = o._eventReceive;
   event.message = hEvent.data;
   o.onReveive(event);
}
MO.FSocket_onClose = function FSocket_onClose(event){
   var o = this;
   o._connected = false;
   o.processCloseListener(o._eventClose);
   o._handle = null;
}
MO.FSocket_ohClose = function FSocket_ohClose(hEvent){
   var o = this._linker;
   var event = o._eventClose;
   o.onClose(event);
}
MO.FSocket_onError = function FSocket_onError(event){
   var o = this;
   var event = o._eventError;
   o.processErrorListener(event);
   o._handle = null;
}
MO.FSocket_ohError = function FSocket_ohError(hEvent){
   this._linker.onError(event);
}
MO.FSocket_construct = function FSocket_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._eventOpen = new MO.SEvent(o);
   o._eventSend = new MO.SEvent(o);
   o._eventReceive = new MO.SEvent(o);
   o._eventClose = new MO.SEvent(o);
   o._eventError = new MO.SEvent(o);
}
MO.FSocket_connect = function FSocket_connect(uri){
   var o = this;
   var url = o._url = MO.Console.find(MO.FEnvironmentConsole).parse(uri);
   var handle = o._handle = new WebSocket(url);
   handle._linker = o;
   handle.onopen = o.ohOpen;
   handle.onmessage = o.ohReceive;
   handle.onclose = o.ohClose;
   handle.onerror = o.ohError
   o._stoped = false;
}
MO.FSocket_send = function FSocket_send(message){
   var o = this;
   var event = o._eventSend;
   event.message = message;
   o.processSendListener(event);
   o._handle.send(message);
}
MO.FSocket_process = function FSocket_process(){
   var o = this;
   if(!o._stoped){
      if(!o._handle){
         o.connect(o._url);
      }
   }
}
MO.FSocket_disconnect = function FSocket_disconnect(){
   var o = this;
   var handle = o._handle;
   if(handle){
      handle.close();
      o._handle = null;
   }
   o._stoped = true;
}
MO.FSocket_dispose = function FSocket_dispose(){
   var o = this;
   o._eventOpen = MO.Lang.Object.dispose(o._eventOpen);
   o._eventSend = MO.Lang.Object.dispose(o._eventSend);
   o._eventReceive = MO.Lang.Object.dispose(o._eventReceive);
   o._eventClose = MO.Lang.Object.dispose(o._eventClose);
   o._eventError = MO.Lang.Object.dispose(o._eventError);
   o._handle = null;
   o.__base.FObject.dispose.call(o);
}
MO.FXmlConnection = function FXmlConnection(o){
   o = MO.Class.inherits(this, o, MO.FHttpConnection);
   o._contentCd           = MO.EHttpContent.Text;
   o._inputNode           = null;
   o._outputNode          = null;
   o.onConnectionSend     = MO.FXmlConnection_onConnectionSend;
   o.onConnectionComplete = MO.FXmlConnection_onConnectionComplete;
   o.content              = MO.FXmlConnection_content;
   return o;
}
MO.FXmlConnection_onConnectionSend = function FXmlConnection_onConnectionSend(){
   var o = this;
   var data = o._input;
   if(data){
      var xml = null;
      if(data.constructor == String){
         xml = data;
         o._inputNode = null;
      }else if(data.constructor == MO.TXmlNode){
         var document = new MO.TXmlDocument();
         document.setRoot(data);
         xml = document.xml();
         o._inputNode = data;
      }else if(data.constructor == MO.TXmlDocument){
         xml = data.xml();
         o._inputNode = data.root();
      }else{
         throw new MO.TError('Unknown send data type.');
      }
      o._inputData = xml;
      o._contentLength = xml.length;
   }
}
MO.FXmlConnection_onConnectionComplete = function FXmlConnection_onConnectionComplete(){
   var o = this;
   var handle = o._handle;
   var element = null;
   if(handle.responseXML){
      element = handle.responseXML.documentElement;
   }else if(handle.responseXml){
      element = handle.responseXml.documentElement;
   }else{
      throw new MO.TError(o, "Fetch xml data failure.");
   }
   if(!element){
      return MO.Logger.fatal(o, 'Read xml error. (url={1})\n{2}', o._url, c._outputText)
   }
   var document = new MO.TXmlDocument();
   MO.Lang.Xml.buildNode(document, null, element);
   var root = o._outputNode = document.root();
   o._statusFree = true;
   var event = o._event;
   event.connection = o;
   event.document = document;
   event.root = root;
   event.content = root;
   event.parameters = o._parameters;
   o.processLoadListener(event);
   event.dispose();
   if(o._asynchronous){
      o._input = null;
      o._inputNode = null;
      o._output = null;
      o._outputNode = null;
      o._parameters = null;
   }
}
MO.FXmlConnection_content = function FXmlConnection_content(){
   return this._outputNode;
}
MO.FXmlData = function FXmlData(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._ready    = null;
   o._config   = null;
   o.testReady = MO.FXmlData_testReady;
   return o;
}
MO.FXmlData_testReady = function FXmlData_testReady(){
   return this._ready;
}
MO.REngine = function REngine(){
   var o = this;
   o._spaces    = new Object();
   o.Global     = new Object();
   o.Top        = new Object();
   o.Local      = new Object();
   o.onRelease  = MO.REngine_onRelease;
   o.register   = MO.REngine_register;
   o.initialize = MO.REngine_initialize;
   o.connect    = MO.REngine_connect;
   o.buildSpace = MO.REngine_buildSpace;
   o.find       = MO.REngine_find;
   o.findGlobal = MO.REngine_findGlobal;
   o.findTop    = MO.REngine_findTop;
   o.findLocal  = MO.REngine_findLocal;
   return o;
}
MO.REngine_onRelease = function REngine_onRelease(){
   MO.RConsole.release();
   MO.REvent.release();
   CollectGarbage();
}
MO.REngine_register = function REngine_register(s){
   var o = this;
   var p = o._spaces[s.space];
   if(!p){
      p = o._spaces[s.space] = new Object();
   }
   p[s.name] = s;
}
MO.REngine_initialize = function REngine_initialize(){
   var o = this;
   MO.RConsole.initialize();
}
MO.REngine_connect = function REngine_connect(){
   var o = this;
   MO.RConsole.initialize();
}
MO.REngine_buildSpace = function REngine_buildSpace(t, p){
   var o = this;
   for(var n in p){
      if(MO.Lang.String.startsWith(n, 'R')){
         t[n.substring(1)] = p[n].instance;
      }
   }
}
MO.REngine_find = function REngine_find(s, n){
   var r = null;
   var s = this._spaces[s];
   if(s){
      r = s[n];
      if(r){
         return r.instance;
      }
   }
   return null;
}
MO.REngine_findGlobal = function REngine_findGlobal(n){
   return this.find(MO.ESpace.Global, n);
}
MO.REngine_findTop = function REngine_findTop(n){
   return top.MO.REngine.find(MO.ESpace.Top, n);
}
MO.REngine_findLocal = function REngine_findLocal(n){
   return this.find(MO.ESpace.Local, n);
}
MO.REngine = new MO.REngine();
MO.RLoader = function RLoader(){
   var o = this;
   o._loading      = new MO.TArray();
   o._loaded       = new MO.TArray()
   o._waits        = new MO.TArray()
   o._intervalId   = null;
   o.hWindow       = null;
   o.onInterval    = MO.RLoader_onInterval;
   o.intervalStart = MO.RLoader_intervalStart;
   o.intervalStop  = MO.RLoader_intervalStop;
   o.loadJsFile    = MO.RLoader_loadJsFile;
   o.loadJs        = MO.RLoader_loadJs;
   o.loaded        = MO.RLoader_loaded;
   o.wait          = MO.RLoader_wait;
   o.waitJs        = MO.RLoader_waitJs;
   o.dispose       = MO.RLoader_dispose;
   return o;
}
MO.RLoader_dispose = function RLoader_dispose(){
   var o = this;
   o.intervalStop();
   o.hWindow = null;
}
MO.RLoader_onInterval = function RLoader_onInterval(){
   var o = this;
   var ws = o._waits;
   var c = ws.length;
   for(var n=0; n<c; n++){
      var l = ws.get(n);
      if(l){
         if(l.check(o._loaded)){
            l.invoke.invoke();
            ws.set(n, null);
         }
      }
   }
   ws.compress();
   if(ws.isEmpty()){
      o.intervalStop();
   }
}
MO.RLoader_intervalStart = function RLoader_intervalStart(){
   var o = this;
   if(!o._intervalId){
      o.hWindow = window;
      o._intervalId = window.setInterval(function(){o.onInterval();}, 10);
   }
}
MO.RLoader_intervalStop = function RLoader_intervalStop(){
   var o = this;
   var w = o.hWindow;
   if(w && o._intervalId){
      w.clearInterval(o._intervalId);
      o.hWindow = null;
      o._intervalId = null;
   }
}
MO.RLoader_loadJsFile = function RLoader_loadJsFile(id, src){
   var o = this;
   var d = MO.RWindow.hDocument;
   var h = d.getElementsByTagName("head")[0];
   if(document.getElementById(id) == null){
      var url = top.MO.RContext.location(src);
      var hs = MO.RWindow.createElement('SCRIPT');
      hs.id = id;
      hs.type = 'text/javascript';
      hs.src = url;
      if(d.attachEvent){
         hs.onreadystatechange = function(){
            var s = hs.readyState;
            if('loaded' == s || 'complete' == s){
               hs.onreadystatechange = null;
               o._loading.extract(id);
               o._loaded.push(id);
            }
         }
      }else{
         hs.onload = function(){
            if(d.readyState == 'complete'){
               hs.onload = null;
               o._loading.extract(id);
               o._loaded.push(id);
            }
         }
      }
      h.appendChild(hs);
   }
}
MO.RLoader_loadJs = function RLoader_loadJs(ps){
   var as = arguments;
   var c = as.length;
   for(var n = 0; n < c; n++){
      var p = as[n];
      this.loadJsFile('js:' + p, '/ajs/' + p.replace(/\./g, '/') + '.js');
   }
}
MO.RLoader_loaded = function RLoader_loaded(id){
   var o = this;
   o._loading.extract(id);
   o._loaded.push(id);
}
MO.RLoader_wait = function RLoader_wait(invoke, ids){
   var o = this;
   var l = new MO.TLoaderListener();
   l.invoke = invoke;
   var c = arguments.length;
   for(var n = 1; n < c; n++){
      l.ids.push(arguments[n]);
   }
   o._waits.push(l);
   o.intervalStart();
}
MO.RLoader_waitJs = function RLoader_waitJs(invoke, ids){
   var o = this;
   var l = new MO.TLoaderListener();
   l.invoke = invoke;
   var as = arguments;
   var c = as.length;
   for(var n = 1; n < c; n++){
      l.ids.push('js:' + as[n]);
   }
   o._waits.push(l);
   o.intervalStart();
}
MO.RLoader = new MO.RLoader();
MO.RMessage = function RMessage(){
   var o = this;
   o._hasError     = false;
   o._messages     = null;
   o.push          = MO.RMessage_push;
   o.fatal         = MO.RMessage_fatal;
   o.confirmResult = false;
   o.error         = MO.RMessage_error;
   o.warn          = MO.RMessage_warn;
   o.onWindowClose = MO.RMessage_onWindowClose;
   o.confirm       = MO.RMessage_confirm;
   o.info          = MO.RMessage_info;
   return o;
}
MO.RMessage_push = function RMessage_push(msg){
   if(!this._messages){
      this._messages = new FLoopList();
   }
   this._messages.push(msg);
}
MO.RMessage_fatal = function RMessage_fatal(sf, er, ms, pm){
   var o = this;
   if(o._hasError){
      return;
   }
   o._hasError = true;
   var s = new MO.TString();
   var t = new Array();
   var f = MO.RMessage_fatal.caller;
   while(f){
      if(MO.Lang.Array.contains(t, f)){
         break;
      }
      t.push(f);
      f = f.caller;
   }
   var c = t.length;
   for(var n = 0; n < c; n++){
      f = t[n];
      if(n > 0){
         s.appendLine();
      }
      s.append('   ' + (c - n) + ': ' + MO.Method.name(f));
   }
   var m = new MO.TString();
   m.appendLine(MO.RContext.get('RMessage:fatal'));
   m.appendLine(MO.Lang.String.repeat('-', 60));
   m.append(MO.Class.dump(sf), ': ');
   if(ms){
      var ag = arguments;
      c = ag.length;
      for(var n = 3; n < c; n++){
         var p = ag[n];
         if('function' == typeof(p)){
            p = MO.Method.name(p);
         }
         var pi = n - 2;
         ms = ms.replace('{' + pi + '}', p);
      }
   }
   m.appendLine(ms);
   m.appendLine(MO.String.repeat('-', 60));
   m.appendLine('Stack:');
   m.append(s);
   alert(m);
}
MO.RMessage_error = function RMessage_error(self, method, msg, params){
   if(this._hasError){
      return;
   }
   this._hasError = true;
   throw new Error(msg);
}
MO.RMessage_warn = function RMessage_warn(self, message, params){
   var s = new MO.TString();
   var n = 0;
   var aw = top.MO.RControl.create(MO.FAlertWindow);
   aw.setText(message);
   aw.show();
}
MO.RMessage_info = function RMessage_info(self, message, params){
   var s = new MO.TString();
   var n = 0;
   var aw = top.MO.RControl.create(MO.FInfoWindow);
   aw.setText(message);
   aw.show();
}
MO.RMessage_confirm = function RMessage_confirm(message,callback){
   var o = this;
   var ls = top.MO.RControl.create(MO.FConfirmWindow);
   ls.setText(message);
   ls.lsns.register(o, callback);
   ls.show();
}
MO.RMessage_onWindowClose = function RMessage_onWindowClose(v){
   this.confirmResult = v;
}
MO.RMessage = new MO.RMessage();
MO.RStyle = function RStyle(){
   var o = this;
   o._connected = false;
   o._rules     = new MO.TMap();
   o.connect    = MO.RStyle_connect;
   o.has        = MO.RStyle_has;
   o.nvl        = MO.RStyle_nvl;
   o.style      = MO.RStyle_style;
   return o;
}
MO.RStyle_connect = function RStyle_connect(){
   var o = this;
   if(o._connected){
      return;
   }
   var s = o._rules;
   var ds = document.styleSheets;
   var dc = ds.length;
   for(var n = 0; n < dc; n++){
      var rs = ds[n].cssRules;
      if(rs){
         var rc = rs.length;
         for(var i = 0; i < rc; i++){
            var r = rs[i];
            s.set(r.selectorText, r);
         }
      }
   }
   o._connected = true;
}
MO.RStyle_has = function RStyle_has(s){
   var o = this;
   if(!o._connected){
      o.connect();
   }
   if(s){
      return this._rules.contains('.' + s.toLowerCase());
   }
   return false;
}
MO.RStyle_nvl = function RStyle_nvl(s, n){
   var o = this;
   o.connect();
   var a = arguments;
   var c = a.length;
   for(var n = 0; n < c; n++){
      var s = a[n];
      if(s){
         if(o._rules.contains('.' + s.toLowerCase())){
            return s;
         }
      }
   }
   return null;
}
MO.RStyle_style = function RStyle_style(c, n){
   return MO.Class.name(c) + '_' + n;
}
MO.RStyle = new MO.RStyle();
MO.RTypeArray = function RTypeArray(){
   var o = this;
   o._float3 = null;
   o._float4 = null;
   o._data   = new Object();
   return o;
}
MO.RTypeArray.prototype.float3 = function RTypeArray_float3(){
   var o = this;
   var value = o._float3;
   if(value == null){
      value = o._float3 = new Float32Array(3);
   }
   return value;
}
MO.RTypeArray.prototype.float4 = function RTypeArray_float4(){
   var o = this;
   var value = o._float4;
   if(value == null){
      value = o._float4 = new Float32Array(4);
   }
   return value;
}
MO.RTypeArray.prototype.createArray = function RTypeArray_createArray(typeCd, length){
   switch(typeCd){
      case MO.EDataType.Boolean:
      case MO.EDataType.Int8:
         return new Int8Array(length);
      case MO.EDataType.Int16:
         return new Int16Array(length);
      case MO.EDataType.Int32:
         return new Int32Array(length);
      case MO.EDataType.Int64:
         return new Int64Array(length);
      case MO.EDataType.Uint8:
         return new Uint8Array(length);
      case MO.EDataType.Uint16:
         return new Uint16Array(length);
      case MO.EDataType.Uint32:
         return new Uint32Array(length);
      case MO.EDataType.Float32:
         return new Float32Array(length);
      case MO.EDataType.Float64:
         return new Float64Array(length);
   }
   throw new TError('Create unknown type array. (type={1}, length={2})', typeCd, length);
}
MO.RTypeArray.prototype.findTemp = function RTypeArray_findTemp(typeCd, length){
   var o = this;
   var data = o._data;
   var collection = data[typeCd];
   if(collection == null){
      collection = data[typeCd] = new Object();
   }
   var result = collection[length];
   if(result == null){
      result = collection[length] = o.createArray(typeCd, length);
   }
   return result;
}
MO.Lang.TypeArray = new MO.RTypeArray();
MO.RXml = function RXml(){
   return this;
}
MO.RXml.prototype.isNode = function RXml_isNode(n){
   return MO.Class.isName(n, 'TNode');
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
MO.RXml.prototype.saveObject = function RXml_saveObject(xconfig, tag, item){
   var o = this;
   for(var name in item){
      var value = item[name];
      if(value != null){
         var xtag = xconfig.create(tag);
         xtag.set('name', name);
         var typeName = typeof(value);
         switch(typeName){
            case 'boolean':
            case 'number':
            case 'date':
            case 'string':
               xtag.setValue(value);
               break;
            case 'function':
               xtag.setValue(MO.Method.name(value));
               break;
            case 'object':
               o.saveObject(xtag, 'Property', value);
               break;
            default:
               throw new MO.TError('Invalid object.');
         }
      }
   }
}
MO.Lang.Xml = new MO.RXml();
MO.FTag = function FTag(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._name      = 'Tag';
   o._children  = null;
   o._trimLeft  = false;
   o._trimRight = false;
   o.onBegin    = MO.FTag_onBegin;
   o.onEnd      = MO.FTag_onEnd;
   o.name       = MO.FTag_name;
   o.set        = MO.FTag_set;
   o.push       = MO.FTag_push;
   o.parse      = MO.FTag_parse;
   o.toString   = MO.FTag_toString;
   o.innerDump  = MO.FTag_innerDump;
   o.dump       = MO.FTag_dump;
   return o;
}
MO.FTag_onBegin = function FTag_onBegin(p){
   return MO.EResult.Continue;
}
MO.FTag_onEnd = function FTag_onEnd(p){
   return MO.EResult.Continue;
}
MO.FTag_name = function FTag_name(){
   return this._name;
}
MO.FTag_set = function FTag_set(n, v){
   throw new MO.TError(this, 'Unknown attribute name. (name={1}, value={2})', n, v);
}
MO.FTag_push = function FTag_push(p){
   var o = this;
   var ts = o._children;
   if(ts == null){
      ts = o._children = new MO.TObjects();
   }
   ts.push(p);
}
MO.FTag_parse = function FTag_parse(p){
   var o = this;
   var r = o.onBegin(p);
   if(r == MO.EResult.Continue){
      var ts = o._children;
      if(ts){
         var c = ts.count();
         for(var i = 0; i < c; i++){
            var t = ts.get(i);
            r = t.parse(p);
            if(r == MO.EResult.Cancel){
               return r;
            }
            p._trimLeft = t._trimLeft;
            p._trimRight = t._trimRight;
         }
      }
      return o.onEnd(p);
   }
   return r;
}
MO.FTag_toString = function FTag_toString(){
   return null;
}
MO.FTag_innerDump = function FTag_innerDump(ps, pt, pl){
   var o = this;
   ps.appendRepeat('   ', pl);
   ps.append(MO.Class.dump(pt));
   var s = pt.toString();
   if(!MO.MO.Lang.String.isEmpty(s)){
      ps.append(' [', s, ']');
   }
   var ts = pt._children;
   if(ts){
      ps.append('\n');
      var c = ts.count();
      for(var i = 0; i < c; i++){
         var t = ts.get(i);
         o.innerDump(ps, t, pl + 1);
         if(i < c - 1){
            ps.append('\n');
         }
      }
   }
}
MO.FTag_dump = function FTag_dump(){
   var result = new MO.TString();
   this.innerDump(result, this, 0);
   return result.toString();
}
MO.FTagContext = function FTagContext(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MInstance);
   o._trimLeft       = false;
   o._trimRight      = false;
   o._attributes     = MO.Class.register(o, new MO.AGetter('_attributes'));
   o._source         = null;
   o.construct       = MO.FTagContext_construct;
   o.instanceAlloc   = MO.FTagContext_instanceAlloc;
   o.get             = MO.FTagContext_get;
   o.set             = MO.FTagContext_set;
   o.setBoolean      = MO.FTagContext_setBoolean;
   o.source          = MO.FTagContext_source;
   o.write           = MO.FTagContext_write;
   o.resetSource     = MO.FTagContext_resetSource;
   o.dispose         = MO.FTagContext_dispose;
   return o;
}
MO.FTagContext_construct = function FTagContext_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._attributes = new MO.TAttributes();
   o._source = new MO.TString();
}
MO.FTagContext_instanceAlloc = function FTagContext_instanceAlloc(){
   this._attributes.clear();
}
MO.FTagContext_get = function FTagContext_get(name, value){
   return this._attributes.get(name, value);
}
MO.FTagContext_set = function FTagContext_set(name, value){
   this._attributes.set(name, value);
}
MO.FTagContext_setBoolean = function FTagContext_setBoolean(name, value){
   this._attributes.set(name, MO.RBoolean.toString(value));
}
MO.FTagContext_source = function FTagContext_source(){
   return this._source.toString();
}
MO.FTagContext_write = function FTagContext_write(p){
   if(!MO.Lang.String.isEmpty(p)){
      this._source.append(p);
   }
}
MO.FTagContext_resetSource = function FTagContext_resetSource(p){
   this._source.clear();
}
MO.FTagContext_dispose = function FTagContext_dispose(){
   var o = this;
   o._attributes = MO.Lang.Object.dispose(o._attributes);
   o._source = MO.Lang.Object.dispose(o._source);
   o.__base.FObject.dispose.call(o);
}
MO.FTagDocument = function FTagDocument(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._space  = MO.Class.register(o, MO.AGetSet('_space'));
   o._root   = MO.Class.register(o, MO.AGetter('_root'));
   o.create   = MO.FTagDocument_create;
   o.loadNode = MO.FTagDocument_loadNode;
   o.load     = MO.FTagDocument_load;
   o.parse    = MO.FTagDocument_parse;
   o.dump     = MO.FTagDocument_dump;
   return o;
}
MO.FTagDocument_create = function FTagDocument_create(p){
   var o = this;
   var sn = o._space + '_';
   var n = null;
   if(MO.RString.startsWith(p, sn)){
      n = p.substring(sn.length);
   }else{
      n = p;
   }
   var t = null;
   switch(n){
      case 'source':
         t = MO.Class.create(MO.FTag);
         break;
      case 'write':
         t = MO.Class.create(MO.FTagWrite);
         break;
      case 'true':
         t = MO.Class.create(MO.FTagTrue);
         break;
      case 'false':
         t = MO.Class.create(MO.FTagFalse);
         break;
      case 'equals':
         t = MO.Class.create(MO.FTagEquals);
         break;
      case 'notEquals':
         t = MO.Class.create(MO.FTagNotEquals);
         break;
      default:
         throw new MO.TError(o, 'Unknown tag type. (name={1})', n);
   }
   return t;
}
MO.FTagDocument_loadNode = function FTagDocument_loadNode(pn, pe){
   var o = this;
   var x = o.create(pe.nodeName);
   if(pn){
      pn.push(x);
   }else{
      o._root = x;
   }
   var eas = pe.attributes;
   if(eas){
      var c = eas.length;
      for(var i = 0; i < c; i++){
         var ea = eas[i];
         if(ea.nodeName){
            x.set(ea.nodeName, MO.RXml.formatText(ea.value));
         }
      }
   }
   var ens = pe.childNodes
   if(ens){
      var c = ens.length;
      for(var i = 0; i < c; i++){
         var en = ens[i];
         switch(en.nodeType){
            case MO.ENodeType.Text:
               var xt = MO.Class.create(MO.FTagText);
               xt.setText(en.nodeValue);
               x.push(xt);
               break;
            case MO.ENodeType.Data:
               var xt = MO.Class.create(MO.FTagText);
               xt.setText(en.data);
               x.push(xt);
               break;
            case MO.ENodeType.Node:
               o.loadNode(x, en);
               break;
         }
      }
   }
}
MO.FTagDocument_load = function FTagDocument_load(p){
   var o = this;
   var s = '<source>' + p + '</source>'
   s = s.replace(new RegExp('<' + o._space + ':', 'g'), '<' + o._space + '_');
   s = s.replace(new RegExp('</' + o._space + ':', 'g'), '</' + o._space + '_');
   s = s.replace(new RegExp(' & ', 'g'), ' &amp; ');
   s = s.replace(new RegExp(' < ', 'g'), ' &lt; ');
   s = s.replace(new RegExp(' > ', 'g'), ' &gt; ');
   var xr = MO.RXml.makeString(s);
   o.loadNode(null, xr.firstChild);
}
MO.FTagDocument_parse = function FTagDocument_parse(p){
   var o = this;
   p.resetSource();
   o._root.parse(p);
   return p.source();
}
MO.FTagDocument_dump = function FTagDocument_dump(){
   var o = this;
   var r = new MO.TString();
   r.appendLine(MO.Class.dump(o));
   r.appendLine(o.root().dump(r));
   return r.toString();
}
MO.FTagEquals = function FTagEquals(o){
   o = MO.Class.inherits(this, o, MO.FTag);
   o._trimLeft = true;
   o._source   = null;
   o._value    = null;
   o.onBegin   = MO.FTagEquals_onBegin;
   o.set       = MO.FTagEquals_set;
   o.toString  = MO.FTagEquals_toString;
   return o;
}
MO.FTagEquals_onBegin = function FTagEquals_onBegin(p){
   var o = this;
   var r = false;
   var s = p.get(o._source);
   var vs = o._value.split('|');
   var c = vs.length;
   for(var i = 0; i < c; i++){
      var v = vs[i]
      if(s == v){
         r = true;
         break;
      }
   }
   return r ? MO.EResult.Continue : MO.EResult.Skip;
}
MO.FTagEquals_set = function FTagEquals_set(n, v){
   var o = this;
   switch(n){
      case 'source':
         o._source = v;
         return;
      case 'value':
         o._value = v;
         return;
   }
   o.__base.FTag.set.call(o, n, v);
}
MO.FTagEquals_toString = function FTagEquals_toString(){
   var o = this;
   return 'source=' + o._source + ', value=' + o._value;
}
MO.FTagFalse = function FTagFalse(o){
   o = MO.Class.inherits(this, o, MO.FTag);
   o._trimLeft = true;
   o._source   = null;
   o.onBegin   = MO.FTagFalse_onBegin;
   o.set       = MO.FTagFalse_set;
   o.toString  = MO.FTagFalse_toString;
   return o;
}
MO.FTagFalse_onBegin = function FTagFalse_onBegin(p){
   var o = this;
   var v = p.get(o._source);
   return MO.RBoolean.parse(v) ? MO.EResult.Skip : MO.EResult.Continue;
}
MO.FTagFalse_set = function FTagFalse_set(n, v){
   var o = this;
   switch(n){
      case 'source':
         o._source = v;
         return;
   }
   o.__base.FTag.set.call(o, n, v);
}
MO.FTagFalse_toString = function FTagFalse_toString(){
   var o = this;
   return 'source=' + o._source;
}
MO.FTagNotEquals = function FTagNotEquals(o){
   o = MO.Class.inherits(this, o, MO.FTag);
   o._trimLeft = true;
   o._source   = null;
   o._value    = null;
   o.onBegin   = MO.FTagNotEquals_onBegin;
   o.set       = MO.FTagNotEquals_set;
   o.toString  = MO.FTagNotEquals_toString;
   return o;
}
MO.FTagNotEquals_onBegin = function FTagNotEquals_onBegin(p){
   var o = this;
   var r = true;
   var s = p.get(o._source);
   var vs = o._value.split('|');
   var c = vs.length;
   for(var i = 0; i < c; i++){
      var v = vs[i]
      if(s == v){
         r = false;
         break;
      }
   }
   return r ? MO.EResult.Continue : MO.EResult.Skip;
}
MO.FTagNotEquals_set = function FTagNotEquals_set(n, v){
   var o = this;
   switch(n){
      case 'source':
         o._source = v;
         return;
      case 'value':
         o._value = v;
         return;
   }
   o.__base.FTag.set.call(o, n, v);
}
MO.FTagNotEquals_toString = function FTagNotEquals_toString(){
   var o = this;
   return 'source=' + o._source + ', value=' + o._value;
}
MO.FTagText = function FTagText(o){
   o = MO.Class.inherits(this, o, MO.FTag);
   o._text    = MO.Class.register(o, new MO.AGetSet('_text'));
   o.onBegin  = MO.FTagText_onBegin;
   o.toString = MO.FTagText_toString;
   return o;
}
MO.FTagText_onBegin = function FTagText_onBegin(p){
   var t = this._text;
   if(p._trimLeft){
      if(MO.RString.startsWith(t, '\r')){
         t = t.substring(1);
      }
      if(MO.RString.startsWith(t, '\n')){
         t = t.substring(1);
      }
   }
   if(p._trimRight){
      if(MO.RString.endsWith(t, '\r')){
         t = t.substring(0, t.length - 1);
      }
      if(MO.RString.endsWith(t, '\n')){
         t = t.substring(0, t.length - 1);
      }
   }
   p.write(t);
   return MO.EResult.Skip;
}
MO.FTagText_toString = function FTagText_toString(){
   var o = this;
   return '{' + o._text + '}';
}
MO.FTagTrue = function FTagTrue(o){
   o = MO.Class.inherits(this, o, MO.FTag);
   o._trimLeft = true;
   o._source   = null;
   o.onBegin   = MO.FTagTrue_onBegin;
   o.set       = MO.FTagTrue_set;
   o.toString  = MO.FTagTrue_toString;
   return o;
}
MO.FTagTrue_onBegin = function FTagTrue_onBegin(p){
   var o = this;
   var r = false;
   var ns = o._source.split('|');
   var c = ns.length;
   for(var i = 0; i < c; i++){
      var n = ns[i]
      var v = p.get(n);
      if(MO.Lang.Boolean.parse(v)){
         r = true;
         break;
      }
   }
   return r ? MO.EResult.Continue : MO.EResult.Skip;
}
MO.FTagTrue_set = function FTagTrue_set(n, v){
   var o = this;
   switch(n){
      case 'source':
         o._source = v;
         return;
   }
   o.__base.FTag.set.call(o, n, v);
}
MO.FTagTrue_toString = function FTagTrue_toString(){
   var o = this;
   return 'source=' + o._source;
}
MO.FTagWrite = function FTagWrite(o){
   o = MO.Class.inherits(this, o, MO.FTag);
   o._source  = null;
   o.onBegin  = MO.FTagWrite_onBegin;
   o.set      = MO.FTagWrite_set;
   o.toString = MO.FTagWrite_toString;
   return o;
}
MO.FTagWrite_onBegin = function FTagWrite_onBegin(p){
   var o = this;
   var v = p.get(o._source);
   p.write(v);
   return MO.EResult.Skip;
}
MO.FTagWrite_set = function FTagWrite_set(n, v){
   var o = this;
   switch(n){
      case 'source':
         o._source = v;
         return;
   }
   o.__base.FTag.set.call(o, n, v);
}
MO.FTagWrite_toString = function FTagWrite_toString(){
   var o = this;
   return 'source=' + o._source;
}
MO.EThreadStatus = new function EThreadStatus(){
   var o = this;
   o.Sleep  = 0;
   o.Active = 1;
   o.Finish = 2;
   return o;
}
MO.SProcessEvent = function SProcessEvent(){
   var o = this;
   o.index = null;
   o.code  = null;
   o.data  = null;
   return o;
}
MO.SXmlEvent = function SXmlEvent(){
   var o = this;
   o.owner          = null;
   o.url            = null;
   o.action         = null;
   o.parameter      = null;
   o.inputDocument  = null;
   o.outputDocument = null;
   o.callback       = null;
   o.process        = MO.SXmlEvent_process;
   o.dispose        = MO.SXmlEvent_dispose;
   return o;
}
MO.SXmlEvent_process = function SXmlEvent_process(p){
   var o = this;
   o.outputDocument = p.document;
   o.outputNode = p.root;
   if(o.owner){
      o.callback.call(o.owner, o);
   }else{
      o.callback(o);
   }
}
MO.SXmlEvent_dispose = function SXmlEvent_dispose(){
   var o = this;
   o.owner = null;
   o.url = null;
   o.action = null;
   o.parameter = null;
   o.inputDocument = null;
   o.outputDocument = null;
   o.callback = null;
}
MO.FContent = function FContent(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._name = MO.Class.register(o, new MO.AGetter('_name'));
   return o;
}
MO.FContentConsole = function FContentConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd     = MO.EScope.Local;
   o._connections = null;
   o.onLoad       = MO.FContentConsole_onLoad;
   o.construct    = MO.FContentConsole_construct;
   o.alloc        = MO.FContentConsole_alloc;
   o.process      = MO.FContentConsole_process;
   o.send         = MO.FContentConsole_send;
   return o;
}
MO.FContentConsole_construct = function FContentConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._connections = new MO.TObjects();
}
MO.FContentConsole_onLoad = function FContentConsole_onLoad(){
   var o = this;
   var e = o.event;
   e.document = o.document;
   e.process();
   o.event = null;
   o.document = null;
   o._statusFree = true;
}
MO.FContentConsole_alloc = function FContentConsole_alloc(){
   var o = this;
   var a = null;
   var cs = o._connections;
   for(var n = cs.count - 1; n >= 0; n--){
      var c = cs.get(n);
      if(c._statusFree){
         a = c;
         break;
      }
   }
   if(!a){
      a = MO.Class.create(MO.FXmlConnection);
      cs.push(a);
      a.onLoad = o.onLoad;
   }
   a._statusFree = false;
   return a;
}
MO.FContentConsole_process = function FContentConsole_process(e){
   var o = this;
   var c = o.alloc();
   c.event = e;
   switch(e.code){
      case MO.EXmlEvent.Send:
         c.send(e.url, e.document);
         break;
      case MO.EXmlEvent.Receive:
         c.receive(e.url, e.document);
         break;
      case MO.EXmlEvent.SyncSend:
         return c.syncSend(e.url, e.document);
      case MO.EXmlEvent.SyncReceive:
         return c.syncReceive(e.url, e.document);
   }
}
MO.FContentConsole_send = function FContentConsole_send(u, d){
   var o = this;
   var c = o.alloc();
   var r = c.syncSend(u, d);
   c._statusFree = true;
   return r;
}
MO.FContentPipeline = function FContentPipeline(o){
   o = MO.Class.inherits(this, o, MO.FPipeline);
   o._scopeCd = MO.Class.register(o, new MO.AGetter('_scopeCd'), MO.EScope.Global);
   return o;
}
MO.FDragConsole = function FDragConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd        = MO.EScope.Local;
   o._activeDragable = null;
   o._dragables      = null;
   o.onMouseDown     = MO.FDragConsole_onMouseDown;
   o.onMouseMove     = MO.FDragConsole_onMouseMove;
   o.onMouseUp       = MO.FDragConsole_onMouseUp;
   o.construct       = MO.FDragConsole_construct;
   o.register        = MO.FDragConsole_register;
   o.unregister      = MO.FDragConsole_unregister;
   o.clear           = MO.FDragConsole_clear;
   return o;
}
MO.FDragConsole_onMouseDown = function FDragConsole_onMouseDown(p){
   var o = this;
   var es = p.source;
   if(!es){
      return;
   }
   if(!MO.Class.isClass(es, MO.MUiDragable)){
      return;
   }
   MO.RWindow.setOptionSelect(false);
   o._activeDragable = es;
   es.onDragStart(p);
}
MO.FDragConsole_onMouseMove = function FDragConsole_onMouseMove(p){
   var o = this;
   if(!o._activeDragable){
      return;
   }
   o._activeDragable.onDragMove(p);
}
MO.FDragConsole_onMouseUp = function FDragConsole_onMouseUp(p){
   var o = this;
   if(!o._activeDragable){
      return;
   }
   MO.RWindow.setOptionSelect(true);
   o._activeDragable.onDragStop(p);
   o._activeDragable = null;
}
MO.FDragConsole_construct = function FDragConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._dragables = new MO.TObjects();
   MO.RWindow.lsnsMouseDown.register(o, o.onMouseDown);
   MO.RWindow.lsnsMouseMove.register(o, o.onMouseMove);
   MO.RWindow.lsnsMouseUp.register(o, o.onMouseUp);
}
MO.FDragConsole_register = function FDragConsole_register(p){
   this._dragables.push(p);
}
MO.FDragConsole_unregister = function FDragConsole_unregister(po, pc){
   this._dragables.remove(p);
}
MO.FDragConsole_clear = function FDragConsole_clear(){
   this._dragables.clear();
}
MO.FEnvironment = function FEnvironment(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._name  = MO.Class.register(o, new MO.AGetSet('_name'));
   o._value = MO.Class.register(o, new MO.AGetSet('_value'));
   o.set    = MO.FEnvironment_set;
   return o;
}
MO.FEnvironment_set = function FEnvironment_set(name, value){
   var o = this;
   o._name = name;
   o._value = value;
}
MO.FEnvironmentConsole = function FEnvironmentConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd      = MO.EScope.Local;
   o._environments = MO.Class.register(o, new MO.AGetSet('_environments'));
   o.construct     = MO.FEnvironmentConsole_construct;
   o.register      = MO.FEnvironmentConsole_register;
   o.registerValue = MO.FEnvironmentConsole_registerValue;
   o.find          = MO.FEnvironmentConsole_find;
   o.findValue     = MO.FEnvironmentConsole_findValue;
   o.parse         = MO.FEnvironmentConsole_parse;
   o.parseUrl      = MO.FEnvironmentConsole_parseUrl;
   o.dispose       = MO.FEnvironmentConsole_dispose;
   return o;
}
MO.FEnvironmentConsole_construct = function FEnvironmentConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._environments = new MO.TDictionary();
}
MO.FEnvironmentConsole_register = function FEnvironmentConsole_register(environment){
   var o = this;
   var name = environment.name();
   o._environments.set(name, environment);
}
MO.FEnvironmentConsole_registerValue = function FEnvironmentConsole_registerValue(name, value){
   var o = this;
   var environment = MO.Class.create(MO.FEnvironment);
   environment.set(name, value);
   o._environments.set(name, environment);
   return environment;
}
MO.FEnvironmentConsole_find = function FEnvironmentConsole_find(name){
   return this._environments.get(name);
}
MO.FEnvironmentConsole_findValue = function FEnvironmentConsole_findValue(name){
   var o = this;
   var value = null;
   var environment = o._environments.get(name);
   if(environment){
      value = environment.value();
   }
   return value;
}
MO.FEnvironmentConsole_parse = function FEnvironmentConsole_parse(value){
   var o = this;
   var result = value;
   var environments = o._environments;
   var count = environments.count();
   for(var i = 0; i < count; i++){
      var environment = environments.at(i);
      result = MO.Lang.String.replace(result, '{' + environment.name() + '}', environment.value());
   }
   return result;
}
MO.FEnvironmentConsole_parseUrl = function FEnvironmentConsole_parseUrl(value){
   var o = this;
   var result = null;
   var version = MO.Runtime.version();
   var url = o.parse(value);
   if(url.indexOf('?') != -1){
      result = url + '&' + version;
   }else{
      result = url + '?' + version;
   }
   return result;
}
MO.FEnvironmentConsole_dispose = function FEnvironmentConsole_dispose(){
   var o = this;
   o._environments = MO.Lang.Object.dispose(o._environments);
   o.__base.FConsole.dispose.call(o);
}
MO.FEvent = function FEvent(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._owner      = MO.Class.register(o, new MO.AGetSet('_owner'));
   o._callback   = MO.Class.register(o, new MO.AGetSet('_callback'));
   o._valid      = MO.Class.register(o, new MO.AGetSet('_valid'), true);
   o.process     = MO.FEvent_process;
   return o;
}
MO.FEvent_process = function FEvent_process(){
   var o = this;
   if(o._valid){
      var owner = o._owner;
      if(owner){
         o._callback.call(owner, o);
      }else{
         o._callback(o);
      }
   }
}
MO.FEventConsole = function FEventConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd       = MO.EScope.Local;
   o._thread        = null;
   o._interval      = 100;
   o._processEvents = null;
   o._events        = null;
   o.onProcess      = MO.FEventConsole_onProcess;
   o.construct      = MO.FEventConsole_construct;
   o.register       = MO.FEventConsole_register;
   o.push           = MO.FEventConsole_push;
   o.clear          = MO.FEventConsole_clear;
   return o;
}
MO.FEventConsole_onProcess = function FEventConsole_onProcess(){
   var o = this;
   var es = o._events;
   if(es.isEmpty()){
      return;
   }
   var ps = o._processEvents;
   ps.assign(es);
   es.clear();
   var c = ps.count();
   if(c > 0){
      for(var i = 0; i < c; i++){
         ps.get(i).process();
      }
      ps.clear();
   }
}
MO.FEventConsole_construct = function FEventConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._processEvents = new MO.TObjects();
   o._events = new MO.TObjects();
   var thread = o._thread = MO.Class.create(MO.FThread);
   thread.setInterval(o._interval);
   thread.lsnsProcess.register(o, o.onProcess);
   MO.Console.find(MO.FThreadConsole).start(thread);
}
MO.FEventConsole_register = function FEventConsole_register(po, pc){
   var o = this;
   var e = MO.Class.create(FEvent);
   e.owner = po;
   e.callback = pc;
   o._events.push(e);
}
MO.FEventConsole_push = function FEventConsole_push(p){
   var o = this;
   var es = o._events;
   if(!es.contains(p)){
      es.push(p);
   }
}
MO.FEventConsole_clear = function FEventConsole_clear(){
   this._events.clear();
}
MO.FHttpConsole = function FHttpConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd   = MO.EScope.Local;
   o._pool      = null;
   o.onComplete = MO.FHttpConsole_onComplete;
   o.construct  = MO.FHttpConsole_construct;
   o.create     = MO.FHttpConsole_create;
   o.alloc      = MO.FHttpConsole_alloc;
   o.free       = MO.FHttpConsole_free;
   o.send       = MO.FHttpConsole_sendAsync;
   o.sendSync   = MO.FHttpConsole_sendSync;
   o.sendAsync  = MO.FHttpConsole_sendAsync;
   o.fetch      = MO.FHttpConsole_fetchAsync;
   o.fetchSync  = MO.FHttpConsole_fetchSync;
   o.fetchAsync = MO.FHttpConsole_fetchAsync;
   o.dispose    = MO.FHttpConsole_dispose;
   return o;
}
MO.FHttpConsole_onComplete = function FHttpConsole_onComplete(event){
   var o = this;
   var connection = event.connection;
   o._pool.free(connection);
}
MO.FHttpConsole_construct = function FHttpConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._pool = MO.Class.create(MO.FObjectPool);
}
MO.FHttpConsole_create = function FHttpConsole_create(){
   return MO.Class.create(MO.FHttpConnection);
}
MO.FHttpConsole_alloc = function FHttpConsole_alloc(clazz){
   var o = this;
   var pool = o._pool;
   if(!pool.hasFree()){
      o._pool.push(o.create());
   }
   var connection = pool.alloc();
   connection.reset();
   connection.addCompleteListener(o, o.onComplete);
   return connection;
}
MO.FHttpConsole_free = function FHttpConsole_free(connection){
   this._pool.free(connection);
}
MO.FHttpConsole_sendSync = function FHttpConsole_sendSync(url, data){
   var o = this;
   var connection = o.alloc();
   connection._asynchronous = false;
   connection.send(url, data);
   return connection.content();
}
MO.FHttpConsole_sendAsync = function FHttpConsole_sendAsync(url, data){
   var o = this;
   var connection = o.alloc();
   connection._asynchronous = true;
   connection.send(url, data);
   return connection;
}
MO.FHttpConsole_fetchSync = function FHttpConsole_fetchSync(url, data){
   var o = this;
   var connection = o.alloc();
   connection._asynchronous = false;
   connection._contentCd = MO.EHttpContent.Text;
   connection.send(url, data);
   return connection.content();
}
MO.FHttpConsole_fetchAsync = function FHttpConsole_fetchAsync(url, data){
   var o = this;
   var connection = o.alloc();
   connection._asynchronous = true;
   connection._contentCd = MO.EHttpContent.Text;
   connection.send(url, data);
   return connection;
}
MO.FHttpConsole_dispose = function FHttpConsole_dispose(){
   var o = this;
   o.__base.FConsole.dispose.call(o);
}
MO.FIdleConsole = function FIdleConsole(o){
   o = MO.Class.inherits(this, o, FConsole);
   o.scope    = MO.EScope.Page;
   o.register = MO.FIdleConsole_register;
   return o;
}
MO.FIdleConsole_register = function FIdleConsole_register(c, cFun){
   var o = this;
   o.active = new TActive(c, cFun);
   o.active.interval = 100;
   RConsole.find(FActiveConsole).push(o.active);
}
MO.FIdleConsole_construct = function FIdleConsole_construct(){
   var o = this;
}
MO.FJsonConsole = function FJsonConsole(o){
   o = MO.Class.inherits(this, o, MO.FHttpConsole);
   o.create = MO.FJsonConsole_create;
   return o;
}
MO.FJsonConsole_create = function FJsonConsole_create(){
   return MO.Class.create(MO.FJsonConnection);
}
MO.FLoggerConsole = function FLoggerConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd   = MO.EScope.Global;
   o._socket    = null;
   o.onOutput   = MO.FLoggerConsole_onOutput;
   o.construct  = MO.FLoggerConsole_construct;
   o.connect    = MO.FLoggerConsole_connect;
   o.output     = MO.FLoggerConsole_output;
   o.disconnect = MO.FLoggerConsole_disconnect;
   o.dispose    = MO.FLoggerConsole_dispose;
   return o;
}
MO.FLoggerConsole_onOutput = function FLoggerConsole_onOutput(event){
   var message = event.message;
   this.output(message);
}
MO.FLoggerConsole_construct = function FLoggerConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   MO.Logger.lsnsOutput.register(o, o.onOutput);
}
MO.FLoggerConsole_connect = function FLoggerConsole_connect(url){
   var o = this;
   var socket = o._socket = MO.Class.create(MO.FBufferedSocket);
   socket.connect(url);
}
MO.FLoggerConsole_output = function FLoggerConsole_output(message){
   var socket = this._socket;
   if(socket){
      var url = window.location.toString();
      socket.push('[' + url + '] - ' + message);
      socket.process();
   }
}
MO.FLoggerConsole_disconnect = function FLoggerConsole_disconnect(){
   var socket = this._socket;
   if(socket){
      socket.close();
   }
}
MO.FLoggerConsole_dispose = function FLoggerConsole_dispose(){
   var o = this;
   o._socket = MO.Lang.Object.dispose(o._socket);
   o.__base.FConsole.dispose.call(o);
}
MO.FMonitorConsole = function FMonitorConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o.scope      = MO.EScope.Global;
   o.working    = false;
   o.interval   = 10;
   o.intervalId = null;
   o.monitors   = new MO.TList();
   o.hWindow    = null;
   o.doInterval = MO.FMonitorConsole_doInterval;
   o.push       = MO.FMonitorConsole_push;
   o.process    = MO.FMonitorConsole_process;
   o.processAll = MO.FMonitorConsole_processAll;
   o.startup    = MO.FMonitorConsole_startup;
   o.wait       = MO.FMonitorConsole_wait;
   o.release    = MO.FMonitorConsole_release;
   return o;
}
MO.FMonitorConsole_push = function FMonitorConsole_push(monitor){
   this.startup();
   monitor.id = this.monitors.sync(monitor);
   monitor.name = 'T:' + MO.Lang.String.lpad(monitor.id, 4, '0');
   monitor.status = EMonitor.Active;
}
MO.FMonitorConsole_process = function FMonitorConsole_process(monitor){
   if(monitor){
      switch(monitor.status){
         case MO.EMonitor.Sleep:
            break;
         case MO.EMonitor.Active:
            monitor.process(this.interval);
            break;
         case MO.EMonitor.Cancel:
            this.monitors.removeItem(monitor);
            break;
      }
   }
}
MO.FMonitorConsole_processAll = function FMonitorConsole_processAll(){
   this.working = true;
   var monitors = this.monitors;
   for(var n = 0; n < monitors.count; n++){
      this.process(monitors.get(n));
   }
   this.working = false;
}
MO.FMonitorConsole_doInterval = function FMonitorConsole_doInterval(){
   var con = MO.RGlobal.get(FMonitorConsole);
   if(con && !con.working){
      con.processAll();
   }
}
MO.FMonitorConsole_startup = function FMonitorConsole_startup(){
   if(!this.hWindow){
      this.hWindow = window;
      debugger;
      this.intervalId = this.hWindow.setInterval(this.doInterval, this.interval);
   }
}
MO.FMonitorConsole_wait = function FMonitorConsole_wait(request){
}
MO.FMonitorConsole_release = function FMonitorConsole_release(){
   if(this.hWindow && this.intervalId){
      this.hWindow.clearInterval(this.intervalId);
   }
}
MO.FMouseConsole = function FMouseConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd       = MO.EScope.Local;
   o._activeCapture = null;
   o.onMouseDown    = MO.FMouseConsole_onMouseDown;
   o.onMouseMove    = MO.FMouseConsole_onMouseMove;
   o.onMouseUp      = MO.FMouseConsole_onMouseUp;
   o.construct      = MO.FMouseConsole_construct;
   o.captureStart   = MO.FMouseConsole_captureStart;
   o.capture        = MO.FMouseConsole_capture;
   o.captureStop    = MO.FMouseConsole_captureStop;
   o.register       = MO.FMouseConsole_register;
   o.unregister     = MO.FMouseConsole_unregister;
   o.clear          = MO.FMouseConsole_clear;
   return o;
}
MO.FMouseConsole_onMouseDown = function FMouseConsole_onMouseDown(p){
   var o = this;
   var s = MO.RHtml.searchLinker(p.hSource, MO.MMouseCapture);
   if(!s){
      return;
   }
   if(!s.testMouseCapture()){
      return;
   }
   o._activeCapture = s;
   o.captureStart(p);
}
MO.FMouseConsole_onMouseMove = function FMouseConsole_onMouseMove(p){
   var o = this;
   if(!o._activeCapture){
      return;
   }
   o.capture(p);
}
MO.FMouseConsole_onMouseUp = function FMouseConsole_onMouseUp(p){
   var o = this;
   if(!o._activeCapture){
      return;
   }
   o.captureStop(p);
}
MO.FMouseConsole_construct = function FMouseConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   MO.RWindow.lsnsMouseDown.register(o, o.onMouseDown);
   MO.RWindow.lsnsMouseMove.register(o, o.onMouseMove);
   MO.RWindow.lsnsMouseUp.register(o, o.onMouseUp);
}
MO.FMouseConsole_captureStart = function FMouseConsole_captureStart(p){
   var o = this;
   var c = o._activeCapture;
   if(c){
      MO.RWindow.setOptionSelect(false);
      c.onMouseCaptureStart(p);
   }
}
MO.FMouseConsole_capture = function FMouseConsole_capture(p){
   var o = this;
   var c = o._activeCapture;
   if(c){
      if(c.testMouseCapture()){
         c.onMouseCapture(p);
      }else{
         o.captureStop(p)
      }
   }
}
MO.FMouseConsole_captureStop = function FMouseConsole_captureStop(p){
   var o = this;
   var c = o._activeCapture;
   if(c){
      c.onMouseCaptureStop(p);
      o._activeCapture = null;
   }
   MO.RWindow.setOptionSelect(true);
}
MO.FMouseConsole_register = function FMouseConsole_register(p){
}
MO.FMouseConsole_unregister = function FMouseConsole_unregister(p){
}
MO.FMouseConsole_clear = function FMouseConsole_clear(){
}
MO.FPipeline = function FPipeline(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._code = MO.Class.register(o, new MO.AGetter('_code'));
   return o;
}
MO.FProcess = function FProcess(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._name     = MO.Class.register(o, new MO.AGetter('_name'));
   o._source   = null;
   o._worker   = null;
   o._events   = null;
   o.ohMessage = MO.FProcess_ohMessage;
   o.onMessage = MO.FProcess_onMessage;
   o.construct = MO.FProcess_construct;
   o.name      = MO.FProcess_name;
   o.start     = MO.FProcess_start;
   o.process   = MO.FProcess_process;
   return o;
}
MO.FProcess_ohMessage = function FProcess_ohMessage(){
   var o = this.__linker;
   o.onMessage(this);
}
MO.FProcess_onMessage = function FProcess_onMessage(p){
}
MO.FProcess_construct = function FProcess_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._events = new MO.TObjects();
}
MO.FProcess_start = function FProcess_start(p){
   var o = this;
   if(o._worker){
      throw new MO.TError(o, 'Process is already start.');
   }
   o._source = p;
   var w = o._worker = new Worker(p);
   w.__linker = o;
   w.onmessage = o.ohMessage;
}
MO.FProcess_process = function FProcess_process(p){
   var o = this;
   var es = o._events;
   var c = es.count();
   es.push(p);
   var e = new MO.SProcessEvent();
   e.index = c;
   e.code = p.code();
   e.data = p.data();
   o._worker.postMessage(e);
}
MO.FProcessConsole = function FProcessConsole(o){
   o = MO.Class.inherits(this, o, FConsole);
   o._scopeCd     = MO.EScope.Local;
   o._connections = null;
   o.onLoad       = MO.FProcessConsole_onLoad;
   o.construct    = MO.FProcessConsole_construct;
   o.alloc        = MO.FProcessConsole_alloc;
   o.process      = MO.FProcessConsole_process;
   o.send         = MO.FProcessConsole_send;
   return o;
}
MO.FProcessConsole_construct = function FProcessConsole_construct(){
   var o = this;
   o._connections = new MO.TObjects();
}
MO.FProcessConsole_onLoad = function FProcessConsole_onLoad(){
   var o = this;
   var e = o.event;
   e.document = o.document;
   e.process();
   o.event = null;
   o.document = null;
   o._statusFree = true;
}
MO.FProcessConsole_alloc = function FProcessConsole_alloc(){
   var o = this;
   var a = null;
   var cs = o._connections;
   for(var n = cs.count - 1; n >= 0; n--){
      var c = cs.get(n);
      if(c._statusFree){
         a = c;
         break;
      }
   }
   if(!a){
      a = MO.Class.create(MO.FXmlConnection);
      cs.push(a);
      a.onLoad = o.onLoad;
   }
   a._statusFree = false;
   return a;
}
MO.FProcessConsole_process = function FProcessConsole_process(e){
   var o = this;
   var c = o.alloc();
   c.event = e;
   switch(e.code){
      case MO.EXmlEvent.Send:
         c.send(e.url, e.document);
         break;
      case MO.EXmlEvent.Receive:
         c.receive(e.url, e.document);
         break;
      case MO.EXmlEvent.SyncSend:
         return c.syncSend(e.url, e.document);
      case MO.EXmlEvent.SyncReceive:
         return c.syncReceive(e.url, e.document);
   }
}
MO.FProcessConsole_send = function FProcessConsole_send(u, d){
   var o = this;
   var c = o.alloc();
   var r = c.syncSend(u, d);
   c._statusFree = true;
   return r;
}
MO.FProcessEvent = function FProcessEvent(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._code      = MO.Class.register(o, new MO.AGetSet('_code'));
   o._data      = MO.Class.register(o, new MO.AGetSet('_data'));
   o._listeners = null;
   o.register   = MO.FProcessEvent_register;
   return o;
}
MO.FProcessEvent_register = function FProcessEvent_register(owner, callback){
   var o = this;
   if(!o._listeners){
      o._listeners = new MO.TListeners();
   }
   o._listeners.register(owner, callback);
}
MO.FProcessor = function FProcessor(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._name     = MO.Class.register(o, new MO.AGetter('_name'));
   o._source   = null;
   o._worker   = null;
   o._events   = null;
   o.ohMessage = MO.FProcessor_ohMessage;
   o.onMessage = MO.FProcessor_onMessage;
   o.construct = MO.FProcessor_construct;
   o.start     = MO.FProcessor_start;
   o.process   = MO.FProcessor_process;
   return o;
}
MO.FProcessor_ohMessage = function FProcessor_ohMessage(){
   var o = this.__linker;
   o.onMessage(this);
}
MO.FProcessor_onMessage = function FProcessor_onMessage(p){
}
MO.FProcessor_construct = function FProcessor_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._events = new MO.TObjects();
}
MO.FProcessor_start = function FProcessor_start(p){
   var o = this;
   if(o._worker){
      throw new MO.TError(o, 'Process is already start.');
   }
   o._source = p;
   var w = o._worker = new Worker(p);
   w.__linker = o;
   w.onmessage = o.ohMessage;
}
MO.FProcessor_process = function FProcessor_process(p){
   var o = this;
   var es = o._events;
   var c = es.count();
   es.push(p);
   var event = new MO.SProcessEvent();
   event.index = c;
   event.code = p.code();
   event.data = p.data();
   o._worker.postMessage(event);
}
MO.FProcessServer = function FProcessServer(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._name               = MO.Class.register(o, new MO.AGetSet('_name'));
   o._handle             = null;
   o._processors         = null;
   o.ohInterval          = MO.FProcessServer_ohInterval;
   o.onInterval          = MO.FProcessServer_onInterval;
   o.ohMessage           = MO.FProcessServer_ohMessage;
   o.onMessage           = MO.FProcessServer_onMessage;
   o.construct           = MO.FProcessServer_construct;
   o.registerProcessor   = MO.FProcessServer_registerProcessor;
   o.unregisterProcessor = MO.FProcessServer_unregisterProcessor;
   o.send                = MO.FProcessServer_send;
   o.process             = MO.FProcessServer_process;
   return o;
}
MO.FProcessServer_ohInterval = function FProcessServer_ohInterval(){
   MO.FProcessServer.__linker.onInterval();
}
MO.FProcessServer_onInterval = function FProcessServer_onInterval(){
   var o = this;
}
MO.FProcessServer_ohMessage = function FProcessServer_ohMessage(p){
   MO.FProcessServer.__linker.onMessage(p.data);
}
MO.FProcessServer_onMessage = function FProcessServer_onMessage(p){
   var o = this;
   console.log('messgae', this, p);
}
MO.FProcessServer_construct = function FProcessServer_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._processors = new MO.TDictionary();
}
MO.FProcessServer_registerProcessor = function FProcessServer_registerProcessor(c, p){
   this._processors.set(c, p);
}
MO.FProcessServer_unregisterProcessor = function FProcessServer_unregisterProcessor(c){
   this._processors.set(c, null);
}
MO.FProcessServer_send = function FProcessServer_send(p){
   var o = this;
   postMessage(p);
}
MO.FProcessServer_process = function FProcessServer_process(){
   var o = this;
   onmessage = o.ohMessage;
   FProcessServer.__linker = o;
}
MO.FServiceConsole = function FServiceConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd  = MO.EScope.Global;
   o.construct = MO.FServiceConsole_construct;
   o.send      = MO.FServiceConsole_send;
   o.dispose   = MO.FServiceConsole_dispose;
   return o;
}
MO.FServiceConsole_onLoad = function FServiceConsole_onLoad(connection){
   var o = this;
   o._pool.free(connection);
}
MO.FServiceConsole_construct = function FServiceConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
}
MO.FServiceConsole_send = function FServiceConsole_send(code, action, content){
   var o = this;
   var uri = '/' + code + '.ws?action=' + action;
   var url = MO.Window.Browser.hostPath(uri);
   var connection = MO.Console.find(MO.FXmlConsole).sendAsync(url, content);
   return connection;
}
MO.FServiceConsole_dispose = function FServiceConsole_dispose(){
   var o = this;
   o.__base.FConsole.dispose.call(o);
}
MO.FStatistics = function FStatistics(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._code      = null;
   o.reset      = MO.FStatistics_reset;
   o.resetFrame = MO.FStatistics_resetFrame;
   return o;
}
MO.FStatistics_reset = function FStatistics_reset(){
}
MO.FStatistics_resetFrame = function FStatistics_resetFrame(){
}
MO.FStatisticsConsole = function FStatisticsConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd      = MO.EScope.Local;
   o._statisticses = MO.Class.register(o, new MO.AGetter('_statisticses'));
   o.construct     = MO.FStatisticsConsole_construct;
   o.register      = MO.FStatisticsConsole_register;
   o.unregister    = MO.FStatisticsConsole_unregister;
   o.find          = MO.FStatisticsConsole_find;
   o.reset         = MO.FStatisticsConsole_reset;
   o.resetFrame    = MO.FStatisticsConsole_resetFrame;
   return o;
}
MO.FStatisticsConsole_construct = function FStatisticsConsole_construct(){
   var o = this;
   o._statisticses = new MO.TDictionary();
}
MO.FStatisticsConsole_register = function FStatisticsConsole_register(n, s){
   this._statisticses.set(n, s);
}
MO.FStatisticsConsole_unregister = function FStatisticsConsole_unregister(n){
   return this._statisticses.remove(n);
}
MO.FStatisticsConsole_find = function FStatisticsConsole_find(n){
   return this._statisticses.get(n);
}
MO.FStatisticsConsole_reset = function FStatisticsConsole_reset(e){
   var statisticses = this._statisticses;
   for(var i = statisticses.count() - 1; i >= 0; i--){
      statisticses.at(i).reset();
   }
}
MO.FStatisticsConsole_resetFrame = function FStatisticsConsole_resetFrame(u, d){
   var statisticses = this._statisticses;
   for(var i = statisticses.count() - 1; i >= 0; i--){
      statisticses.at(i).resetFrame();
   }
}
MO.FThread = function FThread(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListenerProcess);
   o._name       = MO.Class.register(o, new MO.AGetter('_name'));
   o._statusCd   = MO.Class.register(o, new MO.AGetter('_statusCd'), MO.EThreadStatus.Sleep);
   o._interval   = MO.Class.register(o, new MO.AGetSet('_interval'), 100);
   o._delay      = 0;
   o.construct   = MO.FThread_construct;
   o.start       = MO.FThread_start;
   o.stop        = MO.FThread_stop;
   o.process     = MO.FThread_process;
   return o;
}
MO.FThread_construct = function FThread_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
MO.FThread_start = function FThread_start(){
   this._statusCd = MO.EThreadStatus.Active;
}
MO.FThread_stop = function FThread_stop(){
   this._statusCd = MO.EThreadStatus.Finish;
}
MO.FThread_process = function FThread_process(interval){
   var o = this;
   if(o._delay <= 0){
      o.processProcessListener(o);
      o._delay = o._interval;
   }else{
      o._delay -= interval;
   }
}
MO.FThreadConsole = function FThreadConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd     = MO.EScope.Global;
   o._active      = true;
   o._requestFlag = false;
   o._interval    = 5;
   o._threads     = MO.Class.register(o, new MO.AGetter('_threads'));
   o._hIntervalId = null;
   o.ohInterval   = MO.FThreadConsole_ohInterval;
   o.construct    = MO.FThreadConsole_construct;
   o.push         = MO.FThreadConsole_push;
   o.start        = MO.FThreadConsole_start;
   o.process      = MO.FThreadConsole_process;
   o.processAll   = MO.FThreadConsole_processAll;
   o.dispose      = MO.FThreadConsole_dispose;
   return o;
}
MO.FThreadConsole_ohInterval = function FThreadConsole_ohInterval(){
   var threadConsole = MO.Console.find(MO.FThreadConsole);
   threadConsole.processAll();
}
MO.FThreadConsole_push = function FThreadConsole_push(thread){
   this._threads.push(thread);
}
MO.FThreadConsole_start = function FThreadConsole_start(thread){
   thread.start();
   this._threads.push(thread);
}
MO.FThreadConsole_construct = function FThreadConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._threads = new MO.TObjects();
      o._hIntervalId = MO.Window.htmlWindow().setInterval(o.ohInterval, o._interval);
}
MO.FThreadConsole_process = function FThreadConsole_process(thread){
   var o = this;
   if(thread){
      var statusCd = thread.statusCd();
      switch(statusCd){
         case MO.EThreadStatus.Sleep:
            break;
         case MO.EThreadStatus.Active:
            thread.process(o._interval);
            break;
         case MO.EThreadStatus.Finish:
            o._threads.remove(thread);
            thread.dispose();
            break;
      }
   }
}
MO.FThreadConsole_processAll = function FThreadConsole_processAll(){
   var o = this;
   if(o._active){
      var threads = o._threads;
      var count = threads.count();
      try{
         for(var i = 0; i < count; i++){
            var thread = threads.at(i);
            o.process(thread);
         }
      }catch(error){
         MO.Logger.fatal(o, error, 'Thread process failure. (thread_count={1})', count);
      }
   }
   if(o._requestFlag){
      MO.Window.requestAnimationFrame(o.ohInterval);
   }
}
MO.FThreadConsole_dispose = function FThreadConsole_dispose(){
   var o = this;
   if(o._requestFlag){
      MO.Window.cancelRequestAnimationFrame(o.ohInterval);
   }else{
      var hIntervalId = o._hIntervalId;
      if(hIntervalId){
         MO.Window.htmlWindow().clearInterval(hIntervalId);
         o._hIntervalId = null;
      }
   }
   o._threads = MO.Lang.Object.dispose(o._threads);
   o.__base.FConsole.dispose.call(o);
}
MO.FTimeConsole = function FTimeConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd  = MO.EScope.Global;
   o._date     = null;
   o.construct = MO.FTimeConsole_construct;
   o.dispose   = MO.FTimeConsole_dispose;
   return o;
}
MO.FTimeConsole_construct = function FTimeConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
}
MO.FTimeConsole_dispose = function FTimeConsole_dispose(){
   var o = this;
   o.__base.FConsole.dispose.call(o);
}
MO.FXmlConsole = function FXmlConsole(o){
   o = MO.Class.inherits(this, o, MO.FHttpConsole);
   o.create = MO.FXmlConsole_create;
   return o;
}
MO.FXmlConsole_create = function FXmlConsole_create(){
   return MO.Class.create(MO.FXmlConnection);
}
