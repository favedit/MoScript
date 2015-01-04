function AEvent(o, n, l){
   var o = this;
   o.annotation = EAnnotation.Event;
   o.name       = n;
   o.linker     = null;
   o.code     = AEvent_code;
   return o;
}
function AEvent_code(){
   return this.name;
}
var EBrowser = new function EBrowser(){
   var o = this;
   o.Explorer = 1;
   o.FireFox  = 2;
   o.Chrome  = 3;
   return o;
}
var EHttpContent = new function EHttpContent(){
   var o = this;
   o.Binary = 1;
   o.Text  = 2;
   return o;
}
var EHttpMethod = new function EHttpMethod(){
   var o = this;
   o.Get  = 'GET';
   o.Post = 'POST';
   return o;
}
var EHttpStatus = new function EHttpStatus(){
   var o = this;
   o.Begin   = 0;
   o.Build   = 1;
   o.Send    = 2;
   o.Receive = 3;
   o.Finish  = 4;
   return o;
}
function FBytes(o){
   o = RClass.inherits(this, o, FObject);
   o._memory   = null;
   o._viewer   = null;
   o._endianCd = 0;
   o.construct = FBytes_construct;
   o.getInt8   = FBytes_getInt8;
   o.getInt16  = FBytes_getInt16;
   o.getInt32  = FBytes_getInt32;
   o.getInt64  = FBytes_getInt64;
   o.getUint8  = FBytes_getUint8;
   o.getUint16 = FBytes_getUint16;
   o.getUint32 = FBytes_getUint32;
   o.getUint64 = FBytes_getUint64;
   o.getFloat  = FBytes_getFloat;
   o.getDouble = FBytes_getDouble;
   o.setInt8   = FBytes_setInt8;
   o.setInt16  = FBytes_setInt16;
   o.setInt32  = FBytes_setInt32;
   o.setInt64  = FBytes_setInt64;
   o.setUint8  = FBytes_setUint8;
   o.setUint16 = FBytes_setUint16;
   o.setUint32 = FBytes_setUint32;
   o.setUint64 = FBytes_setUint64;
   o.setFloat  = FBytes_setFloat;
   o.setDouble = FBytes_setDouble;
   return o;
}
function FBytes_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._memory = new ArrayBuffer();
   o._viewer = new DataView(o._memory);
}
function FBytes_getInt8(p){
   var o = this;
   return o._viewer.getInt8(p, o._endianCd);
}
function FBytes_getInt16(p){
   var o = this;
   return o._viewer.getInt16(p, o._endianCd);
}
function FBytes_getInt32(p){
   var o = this;
   return o._viewer.getInt32(p, o._endianCd);
}
function FBytes_getInt64(p){
   var o = this;
   return o._viewer.getInt64(p, o._endianCd);
}
function FBytes_getUint8(p){
   var o = this;
   return o._viewer.getUint8(p, o._endianCd);
}
function FBytes_getUint16(p){
   var o = this;
   return o._viewer.getUint16(p, o._endianCd);
}
function FBytes_getUint32(p){
   var o = this;
   return o._viewer.getUint32(p, o._endianCd);
}
function FBytes_getUint64(p){
   var o = this;
   return o._viewer.getUint64(p, o._endianCd);
}
function FBytes_getFloat(p){
   var o = this;
   return o._viewer.getFloat32(p, o._endianCd);
}
function FBytes_getDouble(p){
   var o = this;
   return o._viewer.getFloat64(p, o._endianCd);
}
function FBytes_setInt8(p, v){
   var o = this;
   o._viewer.setInt8(p, v, o._endianCd);
}
function FBytes_setInt16(p, v){
   var o = this;
   o._viewer.setInt16(p, v, o._endianCd);
}
function FBytes_setInt32(p, v){
   var o = this;
   o._viewer.setInt32(p, v, o._endianCd);
}
function FBytes_setInt64(p, v){
   var o = this;
   o._viewer.setInt64(p, v, o._endianCd);
}
function FBytes_setUint8(p, v){
   var o = this;
   o._viewer.setUint8(p, v, o._endianCd);
}
function FBytes_setUint16(p, v){
   var o = this;
   o._viewer.setUint16(p, v, o._endianCd);
}
function FBytes_setUint32(p, v){
   var o = this;
   o._viewer.setUint32(p, v, o._endianCd);
}
function FBytes_setUint64(p, v){
   var o = this;
   o._viewer.setUint64(p, v, o._endianCd);
}
function FBytes_setFloat(p, v){
   var o = this;
   o._viewer.setFloat32(p, v, o._endianCd);
}
function FBytes_setDouble(p, v){
   var o = this;
   o._viewer.setDouble(p, v, o._endianCd);
}
function FByteStream(o){
   o = RClass.inherits(this, o, FBytes);
   o._position   = 0;
   o.readInt8    = FByteStream_readInt8;
   o.readInt16   = FByteStream_readInt16;
   o.readInt32   = FByteStream_readInt32;
   o.readInt64   = FByteStream_readInt64;
   o.readUint8   = FByteStream_readUint8;
   o.readUint16  = FByteStream_readUint16;
   o.readUint32  = FByteStream_readUint32;
   o.readUint64  = FByteStream_readUint64;
   o.readFloat   = FByteStream_readFloat;
   o.readDouble  = FByteStream_readDouble;
   o.writeInt8   = FByteStream_writeInt8;
   o.writeInt16  = FByteStream_writeInt16;
   o.writeInt32  = FByteStream_writeInt32;
   o.writeInt64  = FByteStream_writeInt64;
   o.writeUint8  = FByteStream_writeUint8;
   o.writeUint16 = FByteStream_writeUint16;
   o.writeUint32 = FByteStream_writeUint32;
   o.writeUint64 = FByteStream_writeUint64;
   o.writeFloat  = FByteStream_writeFloat;
   o.writeDouble = FByteStream_writeDouble;
   return o;
}
function FByteStream_readInt8(){
   var o = this;
   var r = o._viewer.getInt8(o._position, o._endianCd);
   o._position += 1;
   return r;
}
function FByteStream_readInt16(){
   var o = this;
   var r = o._viewer.getInt16(o._position, o._endianCd);
   o._position += 2;
   return r;
}
function FByteStream_readInt32(){
   var o = this;
   var r = o._viewer.getInt32(o._position, o._endianCd);
   o._position += 4;
   return r;
}
function FByteStream_readInt64(){
   var o = this;
   var r = o._viewer.getInt64(o._position, o._endianCd);
   o._position += 8;
   return r;
}
function FByteStream_readUint8(){
   var o = this;
   var r = o._viewer.getUint8(o._position, o._endianCd);
   o._position += 1;
   return r;
}
function FByteStream_readUint16(){
   var o = this;
   var r = o._viewer.getUint16(o._position, o._endianCd);
   o._position += 2;
   return r;
}
function FByteStream_readUint32(){
   var o = this;
   var r = o._viewer.getUint32(o._position, o._endianCd);
   o._position += 4;
   return r;
}
function FByteStream_readUint64(){
   var o = this;
   var r = o._viewer.getUint64(o._position, o._endianCd);
   o._position += 8;
   return r;
}
function FByteStream_readFloat(){
   var o = this;
   var r = o._viewer.getFloat32(o._position, o._endianCd);
   o._position += 4;
   return r;
}
function FByteStream_readDouble(){
   var o = this;
   var r = o._viewer.getFloat64(o._position, o._endianCd);
   o._position += 8;
   return r;
}
function FByteStream_writeInt8(v){
   var o = this;
   var r = o._viewer.setInt8(o._position, v, o._endianCd);
   o._position += 1;
   return r;
}
function FByteStream_writeInt16(v){
   var o = this;
   var r = o._viewer.setInt16(o._position, v, o._endianCd);
   o._position += 2;
   return r;
}
function FByteStream_writeInt32(v){
   var o = this;
   var r = o._viewer.setInt32(o._position, v, o._endianCd);
   o._position += 4;
   return r;
}
function FByteStream_writeInt64(v){
   var o = this;
   var r = o._viewer.setInt64(o._position, v, o._endianCd);
   o._position += 8;
   return r;
}
function FByteStream_writeUint8(v){
   var o = this;
   var r = o._viewer.setUint8(o._position, v, o._endianCd);
   o._position += 1;
   return r;
}
function FByteStream_writeUint16(v){
   var o = this;
   var r = o._viewer.setUint16(o._position, v, o._endianCd);
   o._position += 2;
   return r;
}
function FByteStream_writeUint32(v){
   var o = this;
   var r = o._viewer.setUint32(o._position, v, o._endianCd);
   o._position += 4;
   return r;
}
function FByteStream_writeUint64(v){
   var o = this;
   var r = o._viewer.setUint64(o._position, v, o._endianCd);
   o._position += 8;
   return r;
}
function FByteStream_writeFloat(v){
   var o = this;
   var r = o._viewer.setFloat32(o._position, v, o._endianCd);
   o._position += 4;
   return r;
}
function FByteStream_writeDouble(v){
   var o = this;
   var r = o._viewer.setDouble(o._position, v, o._endianCd);
   o._position += 8;
   return r;
}
function FHttpConnection(o){
   o = RClass.inherits(this, o, FObject);
   o._asynchronous        = false;
   o._methodCd            = EHttpMethod.Get;
   o._contentCd           = EHttpContent.Binary;
   o._url                 = null;
   o._inputData           = null;
   o._outputData          = null;
   o._connection          = null;
   o._contentLength       = 0;
   o._statusFree          = true;
   o.lsnsLoad             = null;
   o.onConnectionSend     = FHttpConnection_onConnectionSend;
   o.onConnectionReady    = FHttpConnection_onConnectionReady;
   o.onConnectionComplete = FHttpConnection_onConnectionComplete;
   o.construct            = FHttpConnection_construct;
   o.setHeaders           = FHttpConnection_setHeaders;
   o.inputData            = FHttpConnection_inputData;
   o.setInputData         = FHttpConnection_setInputData;
   o.outputData           = FHttpConnection_outputData;
   o.setOutputData        = FHttpConnection_setOutputData;
   o.content              = FHttpConnection_content;
   o.sendSync             = FHttpConnection_sendSync;
   o.sendAsync            = FHttpConnection_sendAsync;
   o.send                 = FHttpConnection_send;
   return o;
}
function FHttpConnection_onConnectionSend(){
   var o = this;
   if(o._inputData){
      o._contentLength = o._inputData.length;
   }
}
function FHttpConnection_onConnectionReady(){
   var o = this._linker;
   if(o._asynchronous){
      var c = o._connection;
      if(c.readyState == EHttpStatus.Finish){
         o.setOutputData();
         o.onConnectionComplete();
      }
   }
}
function FHttpConnection_onConnectionComplete(){
   var o = this;
   o._statusFree = true;
}
function FHttpConnection_construct(){
   var o = this;
   o.lsnsLoad = new TListeners();
   var c = o._connection = RXml.createConnection();
   c._linker = o;
   c.onreadystatechange = o.onConnectionReady;
}
function FHttpConnection_setHeaders(){
   var o = this;
   var c = o._connection;
   if(o._contentCd == EHttpContent.Binary){
      if(RBrowser.isBrowser(EBrowser.Chrome)){
         c.overrideMimeType('text/plain; charset=x-user-defined');
      }else{
         c.setRequestHeader('Accept-Charset', 'x-user-defined');
      }
   }else{
      c.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
   }
   if(!RBrowser.isBrowser(EBrowser.Chrome)){
      if(o._contentLength > 0){
         c.setRequestHeader('content-length', o._contentLength);
      }
   }
}
function FHttpConnection_inputData(){
   return this._inputData;
}
function FHttpConnection_setInputData(p){
   this._inputData = p;
}
function FHttpConnection_outputData(){
   return this._outputData;
}
function FHttpConnection_setOutputData(){
   var o = this;
   var c = o._connection;
   if(o._contentCd == EHttpContent.Binary){
      if(RBrowser.isBrowser(EBrowser.Chrome)){
         o._outputData = new ArrayBuffer(c.response);
      }else{
         o._outputData = new ArrayBuffer(c.responseBody.toArray());
      }
   }else{
      o._outputData = c.responseText;
   }
}
function FHttpConnection_content(){
   return this._outputData;
}
function FHttpConnection_sendSync(){
   var o = this;
   var c = o._connection;
   c.open(o._methodCd, o._url, false);
   o.setHeaders(c, 0);
   c.send(o._inputData);
   o.setOutputData();
   o.onConnectionComplete();
   RLogger.info(this, 'Send http sync url. (method={1}, url={2})', o._methodCd, o._url);
}
function FHttpConnection_sendAsync(){
   var o = this;
   var c = o._connection;
   c.open(o._methodCd, o._url, true);
   o.setHeaders(c, 0);
   c.send(o._inputData);
   RLogger.info(this, 'Send http async url. (method={1}, url={2})', o._methodCd, o._url);
}
function FHttpConnection_send(p){
   var o = this;
   o._url = p;
   o._statusFree = false;
   o.onConnectionSend();
   if(o._asynchronous){
      o.sendAsync();
   }else{
      o.sendSync();
   }
   return o.content();
}
function FXmlConnection(o){
   o = RClass.inherits(this, o, FHttpConnection);
   o._contentCd           = EHttpContent.Text;
   o._inputNode           = null;
   o._outputNode          = null;
   o.onConnectionSend     = FXmlConnection_onConnectionSend;
   o.onConnectionComplete = FXmlConnection_onConnectionComplete;
   o.content              = FXmlConnection_content;
   return o;
}
function FHttpConnection_onConnectionSend(){
   var o = this;
   if(o._inputNode){
      var d = new TXmlDocument();
      d.setRoot(_inputNode);
      var s = s.xml().toString();
      o._inputData = s;
      o._contentLength = s.length;
   }
}
function FXmlConnection_onConnectionComplete(){
   var o = this;
   var c = o._connection;
   var e = null;
   if(c.responseXML){
      e = c.responseXML.documentElement;
   }else if(cnn.responseXml){
      e = c.responseXml.documentElement;
   }else{
      throw new TError(o, "Fetch xml data failure.");
   }
   if(!e){
      return RMessage.fatal(o, null, 'Read xml error. (url={1})\n{2}', u, c._outputText)
   }
   var d = new TXmlDocument();
   RXml.buildNode(d, null, e);
   o._outputNode = d.root();
   o._statusFree = true;
}
function FXmlConnection_content(){
   return this._outputNode;
}
function HBlur(n, m){
   var o = this;
   o.annotation = EAnnotation.Event;
   o.type       = 'blur';
   o.handle     = 'onblur';
   o.name       = n;
   o.method     = m;
   o.source     = null;
   o.hSource    = null;
   o.attach     = HBlur_attach;
   return o;
}
function HBlur_attach(e){
   var o = this;
}
function HChange(n){
   var o = this;
   o.annotation = EAnnotation.Event;
   o.type       = 'change';
   o.handle     = 'onchange';
   o.name       = n;
   o.source     = null;
   o.hSource    = null;
   o.attach     = HChange_attach;
   return o;
}
function HChange_attach(e){
   var o = this;
}
function HClick(n){
   var o = this;
   o.annotation = EAnnotation.Event;
   o.type       = 'click';
   o.handle     = 'onclick';
   o.name       = n;
   o.source     = null;
   o.hSource    = null;
   o.attach     = HClick_attach;
   return o;
}
function HClick_attach(e){
   var o = this;
   o.srcElement = e.srcElement;
}
function HDoubleClick(n){
   var o = this;
   o.annotation = EAnnotation.Event;
   o.type       = 'dblclick';
   o.handle     = 'ondblclick';
   o.name       = n;
   o.source     = null;
   o.hSource    = null;
   o.attach     = HDoubleClick_attach;
   return o;
}
function HDoubleClick_attach(e){
   var o = this;
}
function HFocus(n, m){
   var o = this;
   o.annotation = EAnnotation.Event;
   o.type       = 'focus';
   o.handle     = 'onfocus';
   o.name       = n;
   o.method     = m;
   o.source     = null;
   o.hSource    = null;
   o.attach     = HFocus_attach;
   return o;
}
function HFocus_attach(e){
   var o = this;
}
function HKeyDown(n){
   var o = this;
   o.annotation = EAnnotation.Event;
   o.type       = 'keydown';
   o.handle     = 'onkeydown';
   o.name       = n;
   o.source     = null;
   o.hSource    = null;
   o.ctrlKey    = false;
   o.keyCode    = null;
   o.attach     = HKeyDown_attach;
   return o;
}
function HKeyDown_attach(e){
   var o = this;
   o.shiftKey = e.shiftKey;
   o.ctrlKey = e.ctrlKey;
   o.keyCode = e.keyCode;
}
function HKeyPress(n){
   var o = this;
   o.annotation = EAnnotation.Event;
   o.type       = 'keypress';
   o.handle     = 'onkeypress';
   o.name       = n;
   o.source     = null;
   o.hSource    = null;
   o.keyCode    = null;
   o.srcElement = null;
   o.attach     = HKeyPress_attach;
   return o;
}
function HKeyPress_attach(e){
   var o = this;
   o.keyCode = e.keyCode;
   o.srcElement = e.srcElement;
}
function HKeyUp(n){
   var o = this;
   o.annotation = EAnnotation.Event;
   o.type       = 'keyup';
   o.handle     = 'onkeyup';
   o.name       = n;
   o.source     = null;
   o.hSource    = null;
   o.keyCode    = null;
   o.srcElement = null;
   o.attach     = HKeyUp_attach;
   return o;
}
function HKeyUp_attach(e){
   var o = this;
   o.keyCode = e.keyCode;
   o.srcElement = e.srcElement;
}
function HLoad(n, m){
   var o = this;
   o.annotation = EAnnotation.Event;
   o.type       = 'load';
   o.handle     = 'onload';
   o.name       = n;
   o.method     = m;
   o.source     = null;
   o.hSource    = null;
   o.attach     = HLoad_attach;
   return o;
}
function HLoad_attach(e){
   var o = this;
}
function HMouseDown(n){
   var o = this;
   o.annotation = EAnnotation.Event;
   o.type       = 'mousedown';
   o.handle     = 'onmousedown';
   o.name       = n;
   o.source     = null;
   o.hSource    = null;
   o.keyAlt     = null;
   o.keyAlt     = null;
   o.x          = null;
   o.y          = null;
   o.srcElement = null;
   o.attach     = HMouseDown_attach;
   return o;
}
function HMouseDown_attach(e){
   var o = this;
   o.keyAlt = e.altKey;
   o.keyCtrl = e.ctrlKey;
   if(window.event){
      o.x = e.x;
      o.y = e.y;
      o.offsetX = e.offsetX;
      o.offsetY = e.offsetY;
   }else{
      o.x = e.pageX;
      o.y = e.pageY;
      o.offsetX = e.layerX;
      o.offsetY = e.layerY;
   }
   o.clientX = e.clientX;
   o.clientY = e.clientY;
   o.srcElement = e.srcElement;
}
function HMouseEnter(n){
   var o = this;
   o.annotation = EAnnotation.Event;
   o.type       = 'mouseenter';
   o.handle     = 'onmouseenter';
   o.name       = n;
   o.source     = null;
   o.hSource    = null;
   o.srcElement = null;
   o.attach     = HMouseEnter_attach;
   return o;
}
function HMouseEnter_attach(e){
   var o = this;
   o.srcElement = e.srcElement;
}
function HMouseLeave(n){
   var o = this;
   o.annotation = EAnnotation.Event;
   o.type       = 'mouseleave';
   o.handle     = 'onmouseleave';
   o.name       = n;
   o.source     = null;
   o.hSource    = null;
   o.attach     = HMouseLeave_attach;
   return o;
}
function HMouseLeave_attach(e){
   var o = this;
}
function HMouseMove(n){
   var o = this;
   o.annotation = EAnnotation.Event;
   o.type       = 'mousemove';
   o.handle     = 'onmousemove';
   o.name       = n;
   o.source     = null;
   o.hSource    = null;
   o.keyAlt     = null;
   o.keyAlt     = null;
   o.x          = null;
   o.y          = null;
   o.offsetX    = null;
   o.offsetY    = null;
   o.srcElement = null;
   o.attach     = HMouseMove_attach;
   return o;
}
function HMouseMove_attach(e){
   var o = this;
   o.altKey = e.altKey;
   o.ctrlKey = e.ctrlKey;
   if(window.event){
      o.x = e.x;
      o.y = e.y;
      o.offsetX = e.offsetX;
      o.offsetY = e.offsetY;
   }else{
      o.x = e.pageX;
      o.y = e.pageY;
      o.offsetX = e.layerX;
      o.offsetY = e.layerY;
   }
   o.clientX = e.clientX;
   o.clientY = e.clientY;
   o.srcElement = e.srcElement;
}
function HMouseOut(n){
   var o = this;
   o.annotation = EAnnotation.Event;
   o.type       = 'mouseout';
   o.handle     = 'onmouseout';
   o.name       = n;
   o.source     = null;
   o.hSource    = null;
   o.keyAlt     = null;
   o.keyAlt     = null;
   o.x          = null;
   o.y          = null;
   o.srcElement = null;
   o.attach     = HMouseOut_attach;
   return o;
}
function HMouseOut_attach(e){
   var o = this;
   o.keyAlt = e.altKey;
   o.keyCtrl = e.ctrlKey;
   o.x = e.x;
   o.y = e.y;
   o.srcElement = e.srcElement;
}
function HMouseOver(n){
   var o = this;
   o.annotation = EAnnotation.Event;
   o.type       = 'mouseover';
   o.handle     = 'onmouseover';
   o.name       = n;
   o.source     = null;
   o.hSource    = null;
   o.keyAlt     = null;
   o.keyAlt     = null;
   o.x          = null;
   o.y          = null;
   o.srcElement = null;
   o.attach     = HMouseOver_attach;
   return o;
}
function HMouseOver_attach(e){
   var o = this;
   o.keyAlt = e.altKey;
   o.keyCtrl = e.ctrlKey;
   o.x = e.x;
   o.y = e.y;
   o.srcElement = e.srcElement;
}
function HMouseUp(n){
   var o = this;
   o.annotation = EAnnotation.Event;
   o.type       = 'mouseup';
   o.handle     = 'onmouseup';
   o.name       = n;
   o.source     = null;
   o.hSource    = null;
   o.keyAlt     = null;
   o.keyAlt     = null;
   o.x          = null;
   o.y          = null;
   o.srcElement = null;
   o.attach     = HMouseUp_attach;
   return o;
}
function HMouseUp_attach(e){
   var o = this;
   o.keyAlt = e.altKey;
   o.keyCtrl = e.ctrlKey;
   if(window.event){
      o.x = e.x;
      o.y = e.y;
      o.offsetX = e.offsetX;
      o.offsetY = e.offsetY;
   }else{
      o.x = e.pageX;
      o.y = e.pageY;
      o.offsetX = e.layerX;
      o.offsetY = e.layerY;
   }
   o.clientX = e.clientX;
   o.clientY = e.clientY;
   o.srcElement = e.srcElement;
}
function HMouseWheel(n){
   var o = this;
   o.annotation = EAnnotation.Event;
   o.type       = 'mousewheel';
   o.handle     = 'onmousewheel';
   o.name       = n;
   o.source     = null;
   o.hSource    = null;
   o.keyAlt     = null;
   o.keyAlt     = null;
   o.x          = null;
   o.y          = null;
   o.wheelDelta = null;
   o.attach     = HMouseWheel_attach;
   return o;
}
function HMouseWheel_attach(e){
   var o = this;
   o.keyAlt = e.altKey;
   o.keyCtrl = e.ctrlKey;
   o.wheelDelta = e.wheelDelta;
   o.x = e.x;
   o.y = e.y;
}
function HReadyStateChange(n, m){
   var o = this;
   o.annotation = EAnnotation.Event;
   o.type       = 'readystatechange';
   o.handle     = 'onreadystatechange';
   o.name       = n;
   o.method     = m;
   o.source     = null;
   o.hSource    = null;
   o.attach     = HReadyStateChange_attach;
   return o;
}
function HReadyStateChange_attach(e){
   var o = this;
}
function HResize(n){
   var o = this;
   o.annotation = EAnnotation.Event;
   o.type       = 'resize';
   o.handle     = 'onresize';
   o.name       = n;
   o.source     = null;
   o.hSource    = null;
   o.x          = null;
   o.y          = null;
   o.attach     = HResize_attach;
   return o;
}
function HResize_attach(e){
   var o = this;
   o.x = e.x;
   o.y = e.y;
}
function HScroll(n, m){
   var o = this;
   o.annotation = EAnnotation.Event;
   o.type       = 'scroll';
   o.handle     = 'onscroll';
   o.name       = n;
   o.method     = m;
   o.source     = null;
   o.hSource    = null;
   o.attach     = HScroll_attach;
   return o;
}
function HScroll_attach(e){
   var o = this;
}
var RBrowser = new function RBrowser(){
   var o = this;
   o._typeCd    = 0;
   o.construct = RBrowser_construct;
   o.isBrowser = RBrowser_isBrowser;
   o.log       = RBrowser_log;
   return o;
}
function RBrowser_construct(){
   var o = this;
   var s = window.navigator.userAgent.toLowerCase();
   if(s.indexOf("chrome") != -1){
      o._typeCd = EBrowser.Chrome;
   }else if(s.indexOf("firefox") != -1){
      o._typeCd = EBrowser.FireFox;
   }else if(s.indexOf("msie") != -1){
      o._typeCd = EBrowser.Explorer;
   }else if(s.indexOf("windows") != -1){
      o._typeCd = EBrowser.Explorer;
   }else{
      alert('Unknown browser.\n' + s);
      return;
   }
   if(o._typeCd == EBrowser.Chrome){
      RLogger.lsnsOutput.register(o, o.log);
   }
   RLogger.info(o, 'Parse browser confirm. (type_cd={1})', REnum.decode(EBrowser, o._typeCd));
}
function RBrowser_isBrowser(p){
   return this._typeCd == p;
}
function RBrowser_log(p){
   console.log(p);
}
var RBuilder = new function RBuilder(){
   var o = this;
   o.create            = RBuilder_create;
   o.createIcon        = RBuilder_createIcon;
   o.createImage       = RBuilder_createImage;
   o.createText        = RBuilder_createText;
   o.createCheck       = RBuilder_createCheck;
   o.createRadio       = RBuilder_createRadio;
   o.createEdit        = RBuilder_createEdit;
   o.createSpan        = RBuilder_createSpan;
   o.createDiv         = RBuilder_createDiv;
   o.createTable       = RBuilder_createTable;
   o.append            = RBuilder_append;
   o.appendIcon        = RBuilder_appendIcon;
   o.appendImage       = RBuilder_appendImage;
   o.appendEmpty       = RBuilder_appendEmpty;
   o.appendText        = RBuilder_appendText;
   o.appendCheck       = RBuilder_appendCheck;
   o.appendRadio       = RBuilder_appendRadio;
   o.appendEdit        = RBuilder_appendEdit;
   o.appendSpan        = RBuilder_appendSpan;
   o.appendDiv         = RBuilder_appendDiv;
   o.appendTable       = RBuilder_appendTable;
   o.appendTableRow    = RBuilder_appendTableRow;
   o.appendTableCell   = RBuilder_appendTableCell;
   o.onBuildSpanPanel  = RBuilder_onBuildSpanPanel;
   o.onBuildDivPanel   = RBuilder_onBuildDivPanel;
   o.onBuildTdPanel    = RBuilder_onBuildTdPanel;
   o.onBuildTrPanel    = RBuilder_onBuildTrPanel;
   o.onBuildTablePanel = RBuilder_onBuildTablePanel;
   o.createFragment    = RBuilder_createFragment;
   return o;
}
function RBuilder_create(d, t, s){
   var o = this;
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
      r.style.width = w;
   }
   if(h){
      r.style.height = h;
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
   r.innerHTML = v;
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
function RBuilder_createSpan(d, s){
   return this.create(d, 'SPAN', s);
}
function RBuilder_createDiv(d, s){
   return this.create(d, 'DIV', s);
}
function RBuilder_createTable(d, s, b, cs, cp){
   var h = this.create(d, 'TABLE', s);
   h.border = RInteger.nvl(b);
   h.cellSpacing = RInteger.nvl(cs);
   h.cellPadding = RInteger.nvl(cp);
   return h;
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
   var r = this.createIcon(p.ownerDocument, 'n', null, w, h);
   p.appendChild(r);
   return r;
}
function RBuilder_appendText(p, s, v){
   var r = this.createText(p.ownerDocument, s, v);
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
   var r = (i != null) ? p.insertRow(i) : p.insertRow();
   if(s){
      r.className = s;
   }
   if(h){
      r.height = h;
   }
   return r;
}
function RBuilder_appendTableCell(p, s, i, w){
   var r = (i != null) ? p.insertCell(i) : p.insertCell();
   if(s){
      r.className = s;
   }
   if(w){
      r.width = w;
   }
   return r;
}
function RBuilder_onBuildSpanPanel(){
   this.hPanel = RBuilder.newSpan();
}
function RBuilder_onBuildDivPanel(){
   this.hPanel = RBuilder.newDiv();
}
function RBuilder_onBuildTdPanel(){
   this.hPanel = RBuilder.create(null, 'TD');
}
function RBuilder_onBuildTrPanel(){
   this.hPanel = RBuilder.create(null, 'TR');
}
function RBuilder_onBuildTablePanel(){
   this.hPanel = RBuilder.newTable();
}
function RBuilder_createFragment(p){
   return p ? p.ownerDocument.createDocumentFragment() : this.hDocument.createDocumentFragment();
}
var RDump = new function RDump(){
   var o = this;
   o.LINE_SINGLE = '------------------------------';
   o.LINE_DOUBLE = '==============================';
   o.LINE_DOT    = '..............................';
   o.LINE_STAR   = '******************************';
   o.onclick     = RDump_onclick;
   o.nameInfo    = RDump_nameInfo;
   o.typeInfo    = RDump_typeInfo;
   o.dumpInner   = RDump_dumpInner;
   o.dump        = RDump_dump;
   o.appendLevel = RDump_appendLevel;
   o.stack       = RDump_stack;
   return o;
}
function RDump_onclick(){
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
function RDump_nameInfo(v){
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
function RDump_typeInfo(v, t){
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
         return '@<Array@' + RClass.code(v) + '>';
      case 'Html':
         return '@<' + v.tagName + '>';
      default:
         if(v.constructor == TClass){
            return '@<' + v.name + '@' + RClass.code(v) + '>';
         }
         if(v.constructor.constructor == Function){
            return "@" + v.toString();
         }
         try{
            for(var name in v){
               return '@' + t + '@<Object@' + RClass.code(v) + '>';
            }
         }catch(e){}
         return '<Object@' + RClass.code(v) + '>';
   }
   return v;
}
function RDump_dumpInner(di){
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
   for(var n = 0; n < c; n++){
      var name = names[n];
      var value = obj[name];
      var type = RClass.safeTypeOf(value, true);
      var info = null;
      var infoFormat = true;
      if(vcls){
         var ann = vcls.attributeFind(name);
         if(ann){
            type = 'Annotation<' + RMethod.name(ann.constructor) + '>'
            info = value + "<FONT color='green'> - (" + RHtml.toHtml(ann.toString()) + ")</FONT>";
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
function RDump_dump(v, h){
   if(!h){
      h = RBuilder.append(null, 'DIV')
   }
   var s = new TString();
   s.append('<', RClass.safeTypeOf(v));
   if(v && v.tagName){
      s.append(' - ', v.tagName);
   }
   s.appendLine('@' + RClass.code(v) + '>');
   var hPanel = RBuilder.append(h, 'DIV');
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
   di.hParent = h;
   di.link = v;
   di.level = 0;
   this.dumpInner(di);
}
function RDump_appendLevel(r, l){
   for(var n = 0; n < l; n++){
      r.append('   ');
   }
}
function RDump_stack(){
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
var REngine = new function REngine(){
   var o = this;
   o._spaces    = new Object();
   o.Global     = new Object();
   o.Top        = new Object();
   o.Local      = new Object();
   o.onRelease  = REngine_onRelease;
   o.register   = REngine_register;
   o.initialize = REngine_initialize;
   o.connect    = REngine_connect;
   o.buildSpace = REngine_buildSpace;
   o.find       = REngine_find;
   o.findGlobal = REngine_findGlobal;
   o.findTop    = REngine_findTop;
   o.findLocal  = REngine_findLocal;
   return o;
}
function REngine_onRelease(){
   RConsole.release();
   REvent.release();
   CollectGarbage();
}
function REngine_register(s){
   var o = this;
   var p = o._spaces[s.space];
   if(!p){
      p = o._spaces[s.space] = new Object();
   }
   p[s.name] = s;
}
function REngine_initialize(){
   var o = this;
   RConsole.initialize();
}
function REngine_connect(){
   var o = this;
   RConsole.initialize();
}
function REngine_buildSpace(t, p){
   var o = this;
   for(var n in p){
      if(RString.startsWith(n, 'R')){
         t[n.substring(1)] = p[n].instance;
      }
   }
}
function REngine_find(s, n){
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
function REngine_findGlobal(n){
   return this.find(ESpace.Global, n);
}
function REngine_findTop(n){
   return top.REngine.find(ESpace.Top, n);
}
function REngine_findLocal(n){
   return this.find(ESpace.Local, n);
}
var RHtml = new function RHtml(){
   o = this;
   o._links          = new Object();
   o.displayGet     = RHtml_displayGet;
   o.displaySet     = RHtml_displaySet;
   o.visibleGet     = RHtml_visibleGet;
   o.visibleSet     = RHtml_visibleSet;
   o.textGet        = RHtml_textGet;
   o.textSet        = RHtml_textSet;
   o.checkGet       = RHtml_checkGet;
   o.checkSet       = RHtml_checkSet;
   o.radioGet       = RHtml_radioGet;
   o.radioSet       = RHtml_radioSet;
   o.linkGet        = RHtml_linkGet;
   o.linkSet        = RHtml_linkSet;
   o.offsetPosition = RHtml_offsetPosition;
   o.offsetX        = RHtml_offsetX;
   o.offsetY        = RHtml_offsetY;
   o.scrollWidth    = RHtml_scrollWidth;
   o.scrollHeight   = RHtml_scrollHeight;
   o.radioSet       = RHtml_radioSet;
   o.point          = RHtml_point;
   o.toPoint        = RHtml_toPoint;
   o.rect           = RHtml_rect;
   o.toRect         = RHtml_toRect;
   o.top            = RHtml_top;
   o.clientRect     = RHtml_clientRect;
   o.offsetRect     = RHtml_offsetRect;
   o.changeWidth    = RHtml_changeWidth;
   o.clear          = RHtml_clear;
   o.setRect        = RHtml_setRect;
   o.setBounds      = RHtml_setBounds;
   o.setPixelRect   = RHtml_setPixelRect;
   o.setPixelBounds = RHtml_setPixelBounds;
   o.toText         = RHtml_toText;
   o.toHtml         = RHtml_toHtml;
   o.showNodes      = RHtml_showNodes;
   o.hideNodes      = RHtml_hideNodes;
   o.showChildren   = RHtml_showChildren;
   o.hideChildren   = RHtml_hideChildren;
   o.get            = RHtml_get;
   o.parent         = RHtml_parent;
   o.posParent      = RHtml_posParent;
   o.form           = RHtml_form;
   o.popup          = RHtml_popup;
   o.bodyWidth      = RHtml_bodyWidth;
   o.bodyHeight     = RHtml_bodyHeight;
   o.frameHeight    = RHtml_frameHeight;
   o.selectText     = RHtml_selectText;
   o.currentStyle   = RHtml_currentStyle;
   o.tableMoveRow   = RHtml_tableMoveRow;
   o.clone          = RHtml_clone;
   return o;
}
function RHtml_displayGet(h){
   var r = null;
   var s = h.style.display;
   if(RBrowser.isBrowser(EBrowser.Explorer)){
      r = (s == 'inline');
   }else{
      r = (s != 'none');
   }
   return r;
}
function RHtml_displaySet(h, v){
   var s = null;
   if(RBrowser.isBrowser(EBrowser.Explorer)){
      s = v ? 'inline' : 'none';
   }else{
      s = v ? null : 'none';
   }
   h.style.display = s;
}
function RHtml_visibleGet(h){
   var r = null;
   var s = h.style.display;
   if(RBrowser.isBrowser(EBrowser.Explorer)){
      r = (s == 'block');
   }else{
      r = (s != 'none');
   }
   return r;
}
function RHtml_visibleSet(h, v){
   var s = null;
   if(RBrowser.isBrowser(EBrowser.Explorer)){
      s = v ? 'block' : 'none';
   }else{
      s = v ? null : 'none';
   }
   h.style.display = s;
}
function RHtml_textGet(h, v){
   var r = null;
   if(RBrowser.isBrowser(EBrowser.FireFox)){
      r = h.textContent;
   }else{
      r = h.innerText;
   }
   return r;
}
function RHtml_textSet(h, v){
   if(RBrowser.isBrowser(EBrowser.FireFox)){
      h.textContent = v;
   }else{
      h.innerText = v;
   }
}
function RHtml_checkGet(h){
   return RBool.toString(h.checked);
}
function RHtml_checkSet(h, v){
   h.checked = RBool.isTrue(v);
}
function RHtml_radioGet(hs){
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
function RHtml_radioSet(hs, v){
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
function RHtml_linkGet(h, n){
   var u = RRuntime.uid(h);
   var i = this._links[u];
   return i ? i.get(n) : null;
}
function RHtml_linkSet(h, n, v){
   var ls = this._links;
   var u = RRuntime.uid(h);
   var i = ls[u];
   if(!i){
      i = ls[u] = new THtmlItem();
      i._link = h;
   }
   i.set(n, v);
}
function RHtml_clone(o, s, t){
   if(!t){
      t = s.cloneNode(true);
   }
   if(s._pname){
      o[s._pname] = t;
   }
   if(s._ptyName){
	  o[s._ptyName] = t;
   }
   var e = REvent.find(s).events;
   t._psource = s;
   for(var n in e){
      t[e[n].handle] = s[e[n].handle];
      if(t[e[n].handle]){
          RHtml.link(t, '_plink', o);
      }
   }
   var p = s.children;
   var n = p.length;
   while(--n >= 0){
      RHtml_clone(o, p[n], t.children[n]);
   }
   return t;
}
function RHtml_offsetPosition(h, t){
   var p = new TPoint();
   while(h != t){
      p.x += h.offsetLeft - h.scrollLeft;
      p.y += h.offsetTop - h.scrollTop;
      if('absolute' != RHtml.currentStyle(h).position){
      }
      p.x += h.clientLeft;
      p.y += h.clientTop;
      h = h.offsetParent;
   }
   return p;
}
function RHtml_offsetX(h){
   var x = 0;
   while(h){
      x += h.offsetLeft;
      h = h.offsetParent;
   }
   return x;
}
function RHtml_offsetY(h){
   var y = 0;
   while(h){
      y += h.offsetTop;
      h = h.offsetParent;
   }
   return y;
}
function RHtml_bodyWidth(doc){
   return doc.all ? doc.body.scrollWidth : doc.documentElement.scrollWidth;
}
function RHtml_bodyHeight(doc){
   return doc.all ? doc.body.scrollHeight : doc.documentElement.scrollHeight;
}
function RHtml_frameHeight(f){
   var hd = f.contentWindow.document;
   var oh = hd.body.scrollHeight;
   var sh = hd.documentElement.scrollHeight;
   return Math.max(oh, sh);
}
function RHtml_scrollWidth(h){
   var r = 0;
   if(h.offsetWidth){
      r += h.offsetWidth;
   }
   if(h.borderTopWidth){
      r -= parseInt(h.borderLeftWidth);
   }
   if(h.borderBottomWidth){
      r -= parseInt(h.borderRightWidth);
   }
   if(h.clientWidth){
      r -= h.clientWidth;
   }
   return r;
}
function RHtml_scrollHeight(h){
   var r = 0;
   if(h.offsetHeight){
      r += h.offsetHeight;
   }
   if(h.borderTopWidth){
      r -= parseInt(h.borderTopWidth);
   }
   if(h.borderBottomWidth){
      r -= parseInt(h.borderBottomWidth);
   }
   if(h.clientHeight){
      r -= h.clientHeight;
   }
   return r;
}
function RHtml_currentStyle(p){
   if(p.currentStyle){
      return p.currentStyle;
   }
   return window.getComputedStyle(p, null);
}
function RHtml_point(o, p){
   return this.toPoint(new TPoint(), o, p);
}
function RHtml_toPoint(r, o, p){
   if(r && o){
      p = RObject.nvl(p, window.document.body);
      var cs = RHtml.currentStyle(o);
      r.x = -RInt.parse(cs.borderLeftWidth);
      r.y = -RInt.parse(cs.borderTopWidth);
      while(o && o != p){
         r.x += o.offsetLeft - o.scrollLeft;
         r.y += o.offsetTop - o.scrollTop;
         if('absolute' != RHtml.currentStyle(o).position){
            r.x += o.clientLeft;
            r.y += o.clientTop;
         }
         o = o.offsetParent;
      }
   }
   return r;
}
function RHtml_rect(o, p){
   return this.toRect(new TRect(), o, p);
}
function RHtml_toRect(r, o, p){
   if(r && o){
      p = RObject.nvl(p, window.document.body);
      var cs = RHtml.currentStyle(o);
      r.left = -RInt.parse(cs.borderLeftWidth);
      r.top = -RInt.parse(cs.borderTopWidth);
      var w = o.offsetWidth; w = o.offsetWidth-1;
      var h = o.offsetHeight; h = o.offsetHeight-1;
      while(o && o != p){
         r.left += o.offsetLeft - o.scrollLeft;
         r.top += o.offsetTop - o.scrollTop;
         if('absolute' != RHtml.currentStyle(o).position){
            r.left += o.clientLeft;
            r.top += o.clientTop;
         }
         o = o.offsetParent;
      }
      r.right = r.left + w;
      r.bottom = r.top + h;
   }
   return r;
}
function RHtml_top(h){
   var r = 0;
   if(h){
      var cs = RHtml.currentStyle(o);
      r = -RInteger.parse(cs.borderTopWidth);
      while(h){
         r += h.offsetTop - h.scrollTop;
         if('absolute' != RHtml.currentStyle(o).position){
            r += h.clientTop;
         }
         h = h.offsetParent;
      }
   }
   return r;
}
function RHtml_clientRect(o){
   if(o){
      var x = 0;
      var y = 0;
      var w = o.offsetWidth-1;
      var h = o.offsetHeight-1;
      while(o){
         x += o.offsetLeft;
         y += o.offsetTop;
         o = o.offsetParent;
      }
      return new TRect(x, y, x+w, y+h);
   }
   return null;
}
function RHtml_offsetRect(o){
   if(o){
      var x = 0;
      var y = 0;
      var w = o.offsetWidth-1;
      var h = o.offsetHeight-1;
      while(o){
         x += o.offsetLeft + o.clientLeft;
         y += o.offsetTop + o.clientTop;
         o = o.offsetParent;
      }
      return new TRect(x, y, x+w, y+h);
   }
   return null;
}
function RHtml_clear(h){
   if(h){
      var cns = h.children;
      if(cns && cns.length){
         for(var n=cns.length-1; n>=0; n--){
            var cn = cns[n];
            if(cn.children && cn.children.length){
               this.clear(cn);
            }
            h.removeChild(cn);
         }
      }
   }
}
function RHtml_setRect(h, r){
   if(h && h.style){
      var s = h.style;
      s.left = r.left;
      s.top = r.top;
      s.width = r.width();
      s.height = r.height();
   }
}
function RHtml_setBounds(h, l, t, w, h){
   if(h && h.style){
      var s = o.style;
      if(null != l){
         s.left = l;
      }
      if(null != t){
         s.top = t;
      }
      if(null != w){
         s.width = w;
      }
      if(null != h){
         s.height = h;
      }
   }
}
function RHtml_setPixelRect(o, r){
   if(o && o.style){
      var s = o.style;
      s.pixelLeft = r.left;
      s.pixelTop = r.top;
      s.pixelWidth = r.width();
      s.pixelHeight = r.height();
   }
}
function RHtml_setPixelBounds(o, l, t, w, h){
   if(o && o.style){
      var s = o.style;
      if(null != l){
         s.pixelLeft = l;
      }
      if(null != t){
         s.pixelTop = t;
      }
      if(null != w){
         s.pixelWidth = w;
      }
      if(null != h){
         s.pixelHeight = h;
      }
   }
}
function RHtml_toText(html){
   return html;
}
function RHtml_toHtml(text){
   if(null != text){
      text = text.toString();
      text = text.replace(/</g, '&lt;');
      text = text.replace(/>/g, '&gt;');
      text = text.replace(/ /g, '&nbsp;');
      text = text.replace(/\\r\\n/g, '<BR>');
      text = text.replace(/\\n/g, '<BR>');
   }
   return text;
}
function RHtml_changeWidth(s, t){
   if(s && t){
      var ts = RHtml.currentStyle(t);
      var tw = parseInt(ts.paddingLeft) + parseInt(ts.paddingRight);
      t.style.pixelWidth = s.offsetWidth - tw;
   }
}
function RHtml_showNodes(h, o){
   if(h && h.childNodes){
      for(var n=0; n<h.childNodes.length; n++){
         var c = h.childNodes(n);
         if(c.tagName && c.style){
            c.style.display = 'block';
         }else if(c.nodeName == '#text'){
            c.nodeValue = o[n];
         }
      }
   }
}
function RHtml_hideNodes(h, o){
   if(h && h.childNodes){
      for(var n=0; n<h.childNodes.length; n++){
         var c = h.childNodes(n);
         if(c.tagName && c.style){
            c.style.display = 'none';
         }else if(c.nodeName == '#text'){
            o[n] = c.nodeValue;
            c.nodeValue = '';
         }
      }
   }
}
function RHtml_showChildren(h){
   if(h && h.children){
      for(var n=0; n<h.children.length; n++){
         var c = h.children(n);
         if(c.tagName && c.style){
            c.style.display = 'block';
         }
      }
   }
}
function RHtml_hideChildren(h){
   if(h && h.children){
      for(var n=0; n<h.children.length; n++){
         var c = h.children(n);
         if(c.tagName && c.style){
            c.style.display = 'none';
         }
      }
   }
}
function RHtml_get(name){
   return document.getElementById(name);
}
function RHtml_parent(o, t){
   if(o, t){
      t = t.toLowerCase();
      while(o){
         if(o.tagName.toLowerCase() == t){
            return o;
         }
         o = o.parentElement;
      }
   }
   return null;
}
function RHtml_posParent(h){
   while(h){
      if('visible' != h.currentStyle.overflow){
         return h;
      }
      h = h.offsetParent;
   }
   return null;
}
function RHtml_form(h){
   if(h){
      var f = this.parent(h, 'FORM');
      return f ? f : h.ownerDocument.forms[0];
   }
   return window.document.forms[0];
}
function RHtml_popup(u, w, h){
   var l = (screen.width - w)/2;
   var t = (screen.height - h)/2 - 20;
   var s = RString.format('left={0},top={1},width={2},height={3},toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=yes,scrollbars=yes,dependent=yes', l, t, w, h);
   window.open(u, '_blank', s);
}
function RHtml_selectText(){
   var ip = document.getElementById(id);
   ip.select();
   return document.selection.createRange().text;
}
function getTRNode(nowTR, sibling) {
   while(nowTR = nowTR[sibling]){
      if(nowTR.tagName == 'TR'){
         break;
      }
   }
   return nowTR;
}
function RHtml_tableMoveRow(ph, ps, pt){
   if(ph.tagName != 'TABLE'){
      return false;
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
var RLoader = new function RLoader(){
   var o = this;
   o._loading      = new TArray();
   o._loaded       = new TArray()
   o._waits        = new TArray()
   o._intervalId   = null;
   o.hWindow       = null;
   o.onInterval    = RLoader_onInterval;
   o.intervalStart = RLoader_intervalStart;
   o.intervalStop  = RLoader_intervalStop;
   o.loadJsFile    = RLoader_loadJsFile;
   o.loadJs        = RLoader_loadJs;
   o.loaded        = RLoader_loaded;
   o.wait          = RLoader_wait;
   o.waitJs        = RLoader_waitJs;
   o.dispose       = RLoader_dispose;
   return o;
}
function RLoader_dispose(){
   var o = this;
   o.intervalStop();
   o.hWindow = null;
}
function RLoader_onInterval(){
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
function RLoader_intervalStart(){
   var o = this;
   if(!o._intervalId){
      o.hWindow = window;
      o._intervalId = window.setInterval(function(){o.onInterval();}, 10);
   }
}
function RLoader_intervalStop(){
   var o = this;
   var w = o.hWindow;
   if(w && o._intervalId){
      w.clearInterval(o._intervalId);
      o.hWindow = null;
      o._intervalId = null;
   }
}
function RLoader_loadJsFile(id, src){
   var o = this;
   var d = RWindow.hDocument;
   var h = d.getElementsByTagName("head")[0];
   if(document.getElementById(id) == null){
      var url = top.RContext.location(src);
      var hs = RWindow.createElement('SCRIPT');
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
function RLoader_loadJs(ps){
   var as = arguments;
   var c = as.length;
   for(var n = 0; n < c; n++){
      var p = as[n];
      this.loadJsFile('js:' + p, '/ajs/' + p.replace(/\./g, '/') + '.js');
   }
}
function RLoader_loaded(id){
   var o = this;
   o._loading.extract(id);
   o._loaded.push(id);
}
function RLoader_wait(invoke, ids){
   var o = this;
   var l = new TLoaderListener();
   l.invoke = invoke;
   var c = arguments.length;
   for(var n = 1; n < c; n++){
      l.ids.push(arguments[n]);
   }
   o._waits.push(l);
   o.intervalStart();
}
function RLoader_waitJs(invoke, ids){
   var o = this;
   var l = new TLoaderListener();
   l.invoke = invoke;
   var as = arguments;
   var c = as.length;
   for(var n = 1; n < c; n++){
      l.ids.push('js:' + as[n]);
   }
   o._waits.push(l);
   o.intervalStart();
}
var RMessage = new function(){
   var o = this;
   o.hasError      = false;
   o.messages      = null;
   o.push          = RMessage_push;
   o.fatal         = RMessage_fatal;
   o.confirmResult = false;
   o.error         = RMessage_error;
   o.warn          = RMessage_warn;
   o.onWindowClose = RMessage_onWindowClose;
   o.confirm       = RMessage_confirm;
   o.info          = RMessage_info;
   return o;
}
function RMessage_push(msg){
   if(!this.messages){
      this.messages = new FLoopList();
   }
   this.messages.push(msg);
}
function RMessage_fatal(sf, er, ms, pm){
   var o = this;
   if(o.hasError){
      return;
   }
   o.hasError = true;
   var s = new TString();
   var t = new Array();
   var f = RMessage_fatal.caller;
   while(f){
      if(RArray.contains(t, f)){
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
      s.append('   ' + (c - n) + ': ' + RMethod.name(f));
   }
   var m = new TString();
   m.appendLine(RContext.get('RMessage:fatal'));
   m.appendLine(RString.repeat('-', 60));
   m.append(RClass.dump(sf), ': ');
   if(ms){
      var ag = arguments;
      c = ag.length;
      for(var n = 3; n < c; n++){
         var p = ag[n];
         if('function' == typeof(p)){
            p = RMethod.name(p);
         }
         var pi = n - 2;
         ms = ms.replace('{' + pi + '}', p);
      }
   }
   m.appendLine(ms);
   m.appendLine(RString.repeat('-', 60));
   m.appendLine('Stack:');
   m.append(s);
   alert(m);
}
function RMessage_error(self, method, msg, params){
   if(this.hasError){
      return;
   }
   this.hasError = true;
   throw new Error(msg);
}
function RMessage_warn(self, message, params){
   var s = new TString();
   var n = 0;
   var aw = top.RControl.create(FAlertWindow);
   aw.setText(message);
   aw.show();
}
function RMessage_info(self, message, params){
   var s = new TString();
   var n = 0;
   var aw = top.RControl.create(FInfoWindow);
   aw.setText(message);
   aw.show();
}
function RMessage_confirm(message,callback){
   var o = this;
   var ls = top.RControl.create(FConfirmWindow);
   ls.setText(message);
   ls.lsns.register(o, callback);
   ls.show();
}
function RMessage_onWindowClose(v){
   this.confirmResult = v;
}
var RResource = new function RResource(){
   var o = this;
   o.uriIcon     = '/ars/icon/';
   o.uriImage    = '/ars/img/';
   o.iconPath    = RResource_iconPath;
   o.iconUrlPath = RResource_iconUrlPath;
   o.imagePath   = RResource_imagePath;
   RMemory.register('RResource', o);
   return o;
}
function RResource_iconPath(path, type){
   var o = this;
   var rc = top.RContext;
   path = RString.nvl(path, 'n').replace(/\./g, '/') + '.' + RString.nvl(type, 'gif');
   if(RString.startsWith(path, '#')){
      path = path.substr(1);
      return rc.context(rc.uriIcon + '/' + path);
   }
   return rc.context('/ars/icon/' + path);
}
function RResource_iconUrlPath(path, type){
   var o = this;
   var rc = top.RContext;
   path = RString.nvl(path, 'n').replace(/\./g, '/') + '.' + RString.nvl(type, 'gif');
   if(RString.startsWith(path, '#')){
      path = path.substr(1);
      return 'url(' + rc.context(rc.uriIcon + '/' + path) + ')';
   }
   return 'url(' + rc.context('/ars/icon/' + path) + ')';
}
function RResource_imagePath(path, type){
   var o = this;
   var rc = top.RContext;
   path = RString.nvl(path, 'n').replace(/\./g, '/') + '.' + RString.nvl(type, 'gif');
   if(RString.startsWith(path, '#')){
      path = path.substr(1);
      return rc.context(rc.uriImage + '/' + path);
   }
   return rc.context('/ars/img/' + path);
}
var RStyle = new function RStyle(){
   var o = this;
   o.connected = false;
   o.rules     = new TMap();
   o.connect   = RStyle_connect;
   o.has       = RStyle_has;
   o.nvl       = RStyle_nvl;
   o.style     = RStyle_style;
   return o;
}
function RStyle_connect(){
   var o = this;
   if(o.connected){
      return;
   }
   var s = o.rules;
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
   o.connected = true;
}
function RStyle_has(s){
   var o = this;
   if(!o.connected){
      o.connect();
   }
   if(s){
      return this.rules.contains('.' + s.toLowerCase());
   }
   return false;
}
function RStyle_nvl(s, n){
   var o = this;
   o.connect();
   var a = arguments;
   var c = a.length;
   for(var n = 0; n < c; n++){
      var s = a[n];
      if(s){
         if(o.rules.contains('.' + s.toLowerCase())){
            return s;
         }
      }
   }
   return null;
}
function RStyle_style(c, n){
   return RClass.name(c) + '_' + n;
}
var RWindow = new function RWindow(){
   var o = this;
   o._builder          = null;
   o._disableDeep      = 0;
   o.panels            = new TMap();
   o.inDisable         = false;
   o.inMoving          = false;
   o.inSizing          = false;
   o.hWindow           = null;
   o.hDocument         = null;
   o.hBody             = null;
   o.hContainer        = null;
   o.hDisablePanel     = null;
   o.hShadow           = null;
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
   o.onUnload          = RWindow_onUnload;
   o.onResize          = RWindow_onResize;
   o.connect           = RWindow_connect;
   o.createElement     = RWindow_createElement;
   o.createHttpRequest = RWindow_createHttpRequest;
   o.event             = RWindow_event;
   o.source            = RWindow_source;
   o.getElement        = RWindow_getElement;
   o.getDisablePanel   = RWindow_getDisablePanel;
   o.findElement       = RWindow_findElement;
   o.panel             = RWindow_panel;
   o.screenPos         = RWindow_screenPos;
   o.clientPos         = RWindow_clientPos;
   o.offsetPos         = RWindow_offsetPos;
   o.windowEnable      = RWindow_windowEnable;
   o.windowDisable     = RWindow_windowDisable;
   o.enable            = RWindow_enable;
   o.disable           = RWindow_disable;
   o.setCaption        = RWindow_setCaption;
   o.setEnable         = RWindow_setEnable;
   o.showShadow        = RWindow_showShadow;
   o.moveCenter        = RWindow_moveCenter;
   o.appendControl     = RWindow_appendControl;
   o.appendElement     = RWindow_appendElement;
   o.appendContainer   = RWindow_appendContainer;
   o.containerTop      = RWindow_containerTop;
   o.dispose           = RWindow_dispose;
   return o;
}
function RWindow_onUnload(){
   RMemory.release();
}
function RWindow_onResize(){
   var o = this;
   var h = o.hDisablePanel;
   if(h){
      if('block' == h.style.display){
         var s = h.style;
         var hd = o.hDocument;
         s.pixelLeft = 0;
         s.pixelTop = 0
         s.pixelWidth = hd.all ? o.hBody.scrollWidth : hd.documentElement.scrollWidth;
         s.pixelHeight = hd.all ? o.hBody.scrollHeight : hd.documentElement.scrollHeight;
      }
   }
}
function RWindow_connect(w){
   var o = this;
   o.hWindow = w;
   var hd = o.hDocument = w.document;
   var hb = o.hBody = o.hContainer = hd.body;
   o.processUnload = hb.onunload;
   hb.onunload = function(e){
      if(!e){
         e = o.hWindow.event;
      }
      o.lsnsUnload.process(o, e);
      o.onUnload();
   };
   hb.onmousedown = function(e){
      if(!e){
         e = o.hWindow.event;
      }
      RLogger.debug(o, '[D] onmousedown = ' + e.x + ' - ' + e.y);
      o.lsnsMouseDown.process(o, e);
   };
   hb.onmouseup = function(e){
      if(!e){
         e = o.hWindow.event;
      }
      o.lsnsMouseUp.process(o, e);
   };
   hb.onmousemove = function(e){
      if(!e){
         e = o.hWindow.event;
      }
      o.lsnsMouseMove.process(o, e);
   };
   hb.onmouseover = function(e){
      if(!e){
         e = o.hWindow.event;
      }
      o.lsnsMouseOver.process(o, e);
   };
   hb.onmousewheel = function(e){
      if(!e){
         e = o.hWindow.event;
      }
      o.lsnsMouseWheel.process(o, e);
   };
   hb.onkeydown = function(e){
      if(!e){
         e = o.hWindow.event;
      }
      RLogger.debug(o, '[D] onkeydown = ' + e.keyCode);
      var s = e.srcElement ? e.srcElement : e.target;
      var t = s.tagName;
      if(EKey.BackSpace == e.keyCode){
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
      o.lsnsKeyDown.process(o, e);
      if(EKey.Enter == e.keyCode){
         if('INPUT' == t){
            if(REvent.process(s, e)){
               RKey.eventClear(e);
            }
         }
      }
   };
   hb.onkeyup = function(e){
      if(!e){
         e = o.hWindow.event;
      }
      o.lsnsKeyUp.process(o, e);
   };
   hb.onkeypress = function(e){
      if(!e){
         e = o.hWindow.event;
      }
      RLogger.debug(o, '[D] onkeypress = ' + e.keyCode);
      o.lsnsKeyPress.process(o, e);
   };
   hb.onresize = function(e){
      if(!e){
         e = o.hWindow.event;
      }
      if(o.oldBodyWidth == o.hBody.offsetWidth && o.oldBodyHeight == o.hBody.offsetHeight){
         return;
      }
      o.oldBodyWidth = o.hBody.offsetWidth;
      o.oldBodyHeight = o.hBody.offsetHeight;
      o.onResize();
      o.lsnsResize.process(o, e);
   };
}
function RWindow_createElement(n){
   return this.hDocument.createElement(n);
}
function RWindow_createHttpRequest(){
   if(this.hWindow.XMLHttpRequest){
      return new XMLHttpRequest();
   }else if(this.hWindow.ActiveXObject){
      return new ActiveXObject("MsXml2.XmlHttp");
   }
}
function RWindow_event(){
   return this.hWindow.event;
}
function RWindow_source(h){
   return h ? h.ownerDocument.parentWindow.event.srcElement : this.hWindow.event.srcElement;
}
function RWindow_getElement(n){
   var o = this;
   var e = o.hDocument.getElementById(n);
   if(!e){
      RMessage.fatal(o, null, "Can't get html element. (name={0})", n);
   }
   return e;
}
function RWindow_getDisablePanel(f){
   var o = this;
   var h = o.hDisablePanel;
   if(!h){
      var h = o.hDisablePanel = o.builder().newDiv();
      h.style.backgroundColor = "#CCCCCC";
      h.style.position = 'absolute';
      h.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=60)";
      o.hBody.appendChild(h);
      h.style.zIndex = 8000;
      h.style.display = 'none';
   }
   var hImg = o.hImg;
   if(!hImg){
      hImg = o.hImg = o.builder().appendImage(h);
      hImg.src = top.RContext.context('/ats/00/rs/icon/ctl/RWindow_Loading.gif');
      hImg.style.margin = document.body.offsetHeight / 2;
      hImg.style.display = 'none';
   }
   if(f){
      hImg.style.display = 'none';
   }else{
      hImg.style.display = 'block';
   }
   return h;
}
function RWindow_findElement(n){
   return this.hDocument.getElementById(n);
}
function RWindow_panel(t){
   var o = this;
   if(EPanel.Disable == t){
      var h = o.hDisablePanel;
      if(!h){
         h = o.hDisablePanel = RBuilder.append(o.hBody, 'DIV', 'RWindow_Disable');
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
function RWindow_windowDisable(){
   this.hWindow.document.body.disabled = true;
}
function RWindow_windowEnable(){
   this.hWindow.document.body.disabled = false;
}
function RWindow_enable(){
   var o = this;
   o._disableDeep--;
   if(0 == o._disableDeep){
      o.setEnable(true);
   }
}
function RWindow_disable(){
   var o = this;
   if(0 == o._disableDeep){
      o.setEnable(false);
   }
   o._disableDeep++;
}
function RWindow_setCaption(t){
   top.document.title = t;
}
function RWindow_setEnable(v, f){
   var o = this;
   var h = o.getDisablePanel(f);
   var st = h.style;
   if(!v){
      var s = o.hDisablePanel.style;
      s.pixelLeft = 0;
      s.pixelTop = 0
      s.pixelWidth = o.hDocument.all ? o.hBody.scrollWidth : o.hDocument.documentElement.scrollWidth;
      s.pixelHeight = o.hDocument.all ? o.hBody.scrollHeight : o.hDocument.documentElement.scrollHeight;
      s.display = 'block';
   }else{
      o.windowEnable();
      st.display = 'none';
   }
}
function RWindow_showShadow(v, r){
   var o = this;
   if(!o.hShadow){
      o.hShadow = RBuilder.append(o.hBody, 'DIV', 'RWindow_Shadow');
      o.hShadow.style.zIndex = ELayer.Shadow;
   }
   var st = o.hShadow.style;
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
      h.style.pixelLeft = Math.max(parseInt((o.hBody.offsetWidth - h.offsetWidth)/2), 0);
      h.style.pixelTop = Math.max(parseInt((o.hBody.offsetHeight - h.offsetHeight)/2), 0) + o.hBody.scrollTop;
   }
}
function RWindow_appendControl(ctl){
   this.hBody.appendChild(ctl.hPanel);
}
function RWindow_appendElement(h){
   this.hBody.appendChild(h);
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
   o.hBody.onload = null;
   o.hBody.onunload = null;
   o.hBody.onmousedown = null;
   o.hBody.onmouseup = null;
   o.hBody.onmousemove = null;
   o.hBody.onmouseover = null;
   o.hBody.onmousewheel = null;
   o.hBody.onkeydown = null;
   o.hBody.onkeyup = null;
   o.hBody.onkeypress = null;
   o.hBody.onresize = null;
   RMemory.freeHtml(o.hBody);
   o.panels.release();
   o.panels = null;
   o.hWindow = null;
   o.hDocument = null;
   o.hBody = null;
   o.hDisablePanel = null;
   o.hImg = null;
   o.hShadow = null;
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
   o.loadString       = RXml_loadString;
   o.makeNode         = RXml_makeNode;
   o.makeDocument     = RXml_makeDocument;
   o.buildNode        = RXml_buildNode;
   o.fromText         = RXml_fromText;
   o.buildText        = RXml_buildText;
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
function RXml_loadString(s){
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
      return d.node;
   }else if(p.tagName == 'SCRIPT'){
      var s = p.textContent;
      if(!s){
         s = p.text;
      }
      if(s){
         var d = new TXmlDocument();
         var xd = o.loadString(s)
         o.buildNode(d, null, xd.documentElement);
         return d.node;
      }
   }
   return null;
}
function RXml_makeDocument(xdoc){
   var doc = new TXmlDocument();
   if(xdoc.documentElement){
      RXml.buildNode(doc, null, xdoc.documentElement);
   }
   return doc;
}
function RXml_buildNode(pd, pn, pe){
   var xas= null;
   var eas = pe.attributes;
   if(eas){
      var eac = eas.length;
      if(eac > 0){
         xas = new TAttributes();
         for(var n = 0; n < eac; n++){
            var ea = eas[n];
            if(ea.nodeName){
               xas.set(ea.nodeName, RXml.fromText(ea.value));
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
         if(ecs[n].nodeType == ENodeType.Text){
            xt.append(ecs[n].nodeValue);
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
function RXml_fromText(s){
   return (null != s) ? s.replace(/\\n/g, '\n') : s;
}
function RXml_buildText(s, v){
   if(null != v){
      v = v.toString();
      for(var n=0; n<v.length; n++){
         var ch = v.charAt(n);
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
function TDumpItem(o){
   if(!o){o = this;}
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
function TDumpItem_create(){
   var o = this;
   var r = o.children[o.children.length] = new TDumpItem();
   return r;
}
function TDumpItem_push(v){
   var o = this;
   o.items[o.items.length] = v;
}
function TDumpItem_innerShow(v){
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
function TDumpItem_show(v){
   var o = this;
   o.display = v;
   var label = RString.repeat('   ', o.level-1) + (v ? ' -' : ' +') + ' ' + o.caption;
   o.hText.innerHTML = RHtml.toHtml(label);;
   o.innerShow(v);
}
function THtmlItem(o){
   if(!o){o = this;}
   o._link  = null;
   o._links = new Object();
   o.get    = THtmlItem_get;
   o.set    = THtmlItem_set;
   return o;
}
function THtmlItem_get(n){
   return this._links[n];
}
function THtmlItem_set(n, v){
   this._links[n] = v;
}
function TXmlDocument(o){
   if(!o){o = this;}
   o._root   = null;
   o.create  = TXmlDocument_create;
   o.root    = TXmlDocument_root;
   o.setRoot = TXmlDocument_setRoot;
   o.xml     = TXmlDocument_xml;
   o.dump    = TXmlDocument_dump;
   return o;
}
function TXmlDocument_create(n, a, v){
   var r = new TXmlNode();
   r._name = n;
   r._attributes = a;
   r._value = v;
   return r;
}
function TXmlDocument_root(){
   var o = this;
   var r = o._root;
   if(!r){
      r = o._root = new TXmlNode('Configuration');
   }
   return r;
}
function TXmlDocument_setRoot(p){
   var o = this;
   if(!o._root){
      o._root = p;
   }else{
      throw new TError(o, 'Root node is already exists.');
   }
}
function TXmlDocument_xml(){
   var s = new TString();
   s.append("<?xml version='1.0' encoding='UTF-8'?>");
   this.root().xml(s);
   return s.toString();
}
function TXmlDocument_dump(){
   var o = this;
   var r = new TString();
   r.appendLine(RClass.name(o));
   o.root().innerDump(r);
   return r.toString();
}
function TXmlNode(){
   var o = this;
   TNode(o);
   o.create   = TXmlNode_create;
   o.innerXml = TXmlNode_innerXml;
   o.xml      = TXmlNode_xml;
   o.toString = TXmlNode_toString;
   return o;
}
function TXmlNode_create(n, a){
   var r = new TNode();
   r._name = n;
   r._attributes = a;
   if(!RClass.isClass(attrs, TAttributes)){
      var a = arguments;
      var len = a.length;
      for(var n = 1; n < len; n += 2){
         if(n + 1 < len){
            r.set(a[n], a[n+1]);
         }else{
            r._value = a[n];
         }
      }
   }
   this.push(r);
   return r;
}
function TXmlNode_innerXml(s){
   var o = this;
   s.append('<', o._name);
   var as = o._attributes;
   if(as){
      var ac = as.count();
      for(var n = 0; n < ac; n++){
         s.append(' ', as.name(n), '="');
         RXml.buildText(s, as.value(n));
         s.append('"');
      }
   }
   if(!o._nodes && (o._value == null)){
      s.append('/');
   }
   s.append('>');
   var ns = o._nodes;
   if(ns){
      var c = ns.count();
      for(var n = 0; n < c; n++){
         ns.get(n).innerXml(s);
      }
   }
   RXml.buildText(s, o._value)
   if(o._nodes || o._value != null){
      s.append('</', o._name, '>');
   }
   return s;
}
function TXmlNode_xml(s){
   var s = new TString();
   this.innerXml(s);
   return s.toString();
}
function TXmlNode_toString(){
   return this.xml().toString();
}
