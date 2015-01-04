//==========================================================
// <T>节点通讯工具类。</T>
//
// @class
// @author maocy
// @version 150104
//==========================================================
function FXmlConnection(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._url         = null;
   o._sync        = false;
   o._statusUsing = false;
   o._statusFree  = true;
   // @attribute
   o._cnnControl  = null;
   o._docControl  = null;
   o._document    = null;
   //..........................................................
   // @event
   o.onLoad       = null;
   o.onFire       = FXmlConnection_onFire;
   o.onCnnReady   = FXmlConnection_onCnnReady;
   o.onDocReady   = FXmlConnection_onDocReady;
   //..........................................................
   // @method
   o.construct    = FXmlConnection_construct;
   o.setHeaders   = FXmlConnection_setHeaders;
   o.send         = FXmlConnection_send;
   o.receive      = FXmlConnection_receive;
   o.syncSend     = FXmlConnection_syncSend;
   o.syncReceive  = FXmlConnection_syncReceive;
   return o;
}

//==========================================================
// <T>事件响应处理。</T>
//==========================================================
function FXmlConnection_onFire(doc, element){
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
function FXmlConnection_onCnnReady(cnn, doc){
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
function FXmlConnection_onDocReady(dc, doc){
   if(dc.readyState == EXmlParse.Finish){
      if(dc._documentElement){
         this.onFire(doc, dc._documentElement);
      }else{
         alert('Read xml error.\n' + this._cnnControl.responseText);
      }
   }
}

//==========================================================
// <T>构造配置发送接收工具类。</T>
//==========================================================
function FXmlConnection_construct(){
   var o = this;
   o._cnnControl = RXml.newConnect();
   o._docControl = RXml.newDocument();
}

//==========================================================
// <T>设置头信息。</T>
//==========================================================
function FXmlConnection_setHeaders(cnn, len){
   cnn.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
   if(!RBrowser.isBrowser(EBrowser.Chrome)){
      cnn.setRequestHeader('content-length', len);
   }
}

//==========================================================
// <T>发送XML信息到指定地址。</T>
//==========================================================
function FXmlConnection_send(url, doc){
   var o = this;
   o._statusUsing = true;
   o._url = url;
   var xml = doc.xml().toString();
   var cnn = o._cnnControl;
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
function FXmlConnection_receive(url, doc){
   this.send(url, doc);
}

//==========================================================
// <T>异步发送一个配置请求。</T>
//
// @method
// @param u:url:String 网络地址
// @return XML信息
//==========================================================
function FXmlConnection_syncSend(u, doc){
   var o = this;
   o._statusUsing = true;
   o._url = u;
   // 发送文档到服务器，同步接收返回的文档信息
   var xml = doc.xml().toString();
   var cnn = o._cnnControl;
   cnn.open('POST', u, false);
   o.setHeaders(cnn, xml.length);
   cnn.send(xml);
   // 获得返回的文档对象
   var element = null;
   if(cnn.responseXML){
      element = cnn.responseXML.documentElement;
   }else if(cnn.responseXml){
      element = cnn.responseXml.documentElement;
   }else{
      throw new TError(o, "Fetch xml data failure.");
   }
   // 建立文档对象
   var xd = o._document = new TXmlDocument();
   if(element){
      RXml.buildNode(xd, null, element);
   }else{
      RMessage.fatal(o, null, 'Read xml error. (url={1})\n{2}', u, this._cnnControl.responseText)
   }
   o._statusUsing = false;
   return xd;
}

//==========================================================
//
//==========================================================
function FXmlConnection_syncReceive(url, doc){
   return this.syncSend(url, doc);
}
