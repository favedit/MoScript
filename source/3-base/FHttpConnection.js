//==========================================================
// <T>节点通讯工具类。</T>
//
// @class
// @author maocy
// @version 150104
//==========================================================
function FHttpConnection(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._contentCd   = EContent.Binary;
   o._url         = null;
   o._statusUsing = false;
   o._statusFree  = true;
   // @attribute
   o._control  = null;
   o._data        = null;
   //..........................................................
   // @event
   o.onLoad       = null;
   o.onFire       = FHttpConnection_onFire;
   o.onCnnReady   = FHttpConnection_onCnnReady;
   o.onDocReady   = FHttpConnection_onDocReady;
   //..........................................................
   // @method
   o.construct    = FHttpConnection_construct;
   o.setHeaders   = FHttpConnection_setHeaders;
   o.send         = FHttpConnection_send;
   o.receive      = FHttpConnection_receive;
   o.syncSend     = FHttpConnection_syncSend;
   o.syncReceive  = FHttpConnection_syncReceive;
   return o;
}

//==========================================================
// <T>事件响应处理。</T>
//==========================================================
function FHttpConnection_onFire(doc, element){
   if(doc){
      this._document = (doc.constructor == Function) ? new doc() : new doc.constructor();
   }else{
      this._document = new TXmlDocument();
   }
   if(element){
      RXml.buildNode(this._document, null, element)
   }
   if(this.onLoad){
      this.onLoad(this);
   }
   this.inUsing = false;
}

//==========================================================
// <T>链接准备处理。</T>
//==========================================================
function FHttpConnection_onCnnReady(cnn, doc){
   if(cnn.readyState == EXmlStatus.Finish){
      var dc = this._docControl;
      if(RXml.modeCd == EBrowser.IE){
         var self = this;
         dc.async = true;
         dc.onreadystatechange = function(){self.onDocReady(dc, doc)};
         dc.loadXML(cnn.responseText);
      }else{
         this.onFire(doc, cnn.responseXML._documentElement);
      }
   }
}

//==========================================================
// <T>文档准备处理。</T>
//==========================================================
function FHttpConnection_onDocReady(dc, doc){
   if(dc.readyState == EXmlParse.Finish){
      if(dc._documentElement){
         this.onFire(doc, dc._documentElement);
      }else{
         alert('Read xml error.\n' + this._control.responseText);
      }
   }
}

//==========================================================
// <T>构造配置发送接收工具类。</T>
//==========================================================
function FHttpConnection_construct(){
   var o = this;
   o._control = RXml.newConnect();
}

//==========================================================
// <T>设置头信息。</T>
//==========================================================
function FHttpConnection_setHeaders(cnn, len){
   var o = this;
   if(o._contentCd == EContent.Binary){
      if(RBrowser.isBrowser(EBrowser.Chrome)){
         cnn.overrideMimeType('text/plain; charset=x-user-defined');
      }else{
         cnn.setRequestHeader('Accept-Charset', 'x-user-defined');
         //cnn.setRequestHeader('Content-Type', 'application/pdf');
      }
   }else{
      cnn.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
   }
   if(!RBrowser.isBrowser(EBrowser.Chrome)){
      if(len > 0){
         cnn.setRequestHeader('content-length', len);
      }
   }
}

//==========================================================
// <T>发送XML信息到指定地址。</T>
//==========================================================
function FHttpConnection_send(url, doc){
   var o = this;
   o._statusUsing = true;
   o._url = url;
   var xml = doc.xml().toString();
   var cnn = o._control;
   RLogger.info(this, 'Send xml url. (url={0})', url);
   cnn.abort();
   // 发送信息
   cnn.open('POST', url, true);
   o.setHeaders(cnn, xml.length);
   var self = this;
   cnn.onreadystatechange = function(){self.onCnnReady(cnn, doc)};
   cnn.send(xml);
}

//==========================================================
//
//==========================================================
function FHttpConnection_receive(url, doc){
   this.send(url, doc);
}

//==========================================================
// <T>异步发送一个配置请求。</T>
//
// @method
// @param u:url:String 网络地址
// @return XML信息
//==========================================================
function FHttpConnection_syncSend(u, doc){
   var o = this;
   o._statusUsing = true;
   o._url = u;
   // 发送文档到服务器，同步接收返回的文档信息
   var cnn = o._control;
   cnn.open('GET', u, false);
   o.setHeaders(cnn, 0);
   cnn.send();
   // 获得返回的文档对象
   //console.log(cnn);
   RDump.dump(cnn, _dump);
   o._statusUsing = false;
   return null;
}

//==========================================================
//
//==========================================================
function FHttpConnection_syncReceive(url, doc){
   return this.syncSend(url, doc);
}
