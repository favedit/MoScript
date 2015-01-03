//============================================================
// <T>配置发送接收工具类。</T>
//
// @tool
// @author maochunyang
// @version 1.0.1
//============================================================
function TXmlConnect(o){
   if(!o){o = this;}
   // @paramter
   o.address     = null;
   o.sync        = false;
   o.inUsing     = false;
   // @property
   o.document    = null;
   o.cnnControl  = null;
   o.docControl  = null;
   // @event
   o.onLoad      = null;
   o.onFire      = TXmlConnect_onFire;
   o.onCnnReady  = TXmlConnect_onCnnReady;
   o.onDocReady  = TXmlConnect_onDocReady;
   // @method
   o.construct   = TXmlConnect_construct;
   o.setHeaders  = TXmlConnect_setHeaders;
   o.send        = TXmlConnect_send;
   o.receive     = TXmlConnect_receive;
   o.syncSend    = TXmlConnect_syncSend;
   o.syncReceive = TXmlConnect_syncReceive;
   // @construct
   o.construct();
   return o;
}

//============================================================
// <T>事件响应处理。</T>
//============================================================
function TXmlConnect_onFire(doc, element){
   if(doc){
      this.document = (doc.constructor == Function) ? new doc() : new doc.constructor();
   }else{
      this.document = new TXmlDocument();
   }
   if(element){
      RXml.buildNode(this.document, null, element)
   }
   if(this.onLoad){
      this.onLoad(this);
   }
   this.inUsing = false;
}

//============================================================
// <T>链接准备处理。</T>
//============================================================
function TXmlConnect_onCnnReady(cnn, doc){
   if(cnn.readyState == EXmlStatus.Finish){
      var dc = this.docControl;
      if(RXml.modeCd == EBrowser.IE){
         var self = this;
         dc.async = true;
         dc.onreadystatechange = function(){self.onDocReady(dc, doc)};
         dc.loadXML(cnn.responseText);
      }else{
         this.onFire(doc, cnn.responseXML.documentElement);
      }
   }
}

//============================================================
// <T>文档准备处理。</T>
//============================================================
function TXmlConnect_onDocReady(dc, doc){
   if(dc.readyState == EXmlParse.Finish){
      if(dc.documentElement){
         this.onFire(doc, dc.documentElement);
      }else{
         alert('Read xml error.\n' + this.cnnControl.responseText);
      }
   }
}

//============================================================
// <T>构造配置发送接收工具类。</T>
//============================================================
function TXmlConnect_construct(){
   var o = this;
   o.cnnControl = RXml.newConnect();
   o.docControl = RXml.newDocument();
}

//============================================================
// <T>设置头信息。</T>
//============================================================
function TXmlConnect_setHeaders(cnn, len){
   if(RXml.modeCd == EBrowser.IE){
      cnn.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      cnn.setRequestHeader('content-length', len);
   }
}

//============================================================
// <T>发送XML信息到指定地址。</T>
//============================================================
function TXmlConnect_send(url, doc){
   var o = this;
   o.inUsing = true;
   o.address = url;
   var xml = doc.xml().toString();
   var cnn = o.cnnControl;
   RLogger.info(this, 'Send xml url. (url={0})', url);
   cnn.abort();
   // 发送信息
   cnn.open('POST', url, true);
   o.setHeaders(cnn, xml.length);
   var self = this;
   cnn.onreadystatechange = function(){self.onCnnReady(cnn, doc)};
   cnn.send(xml);
}

//============================================================
//
//============================================================
function TXmlConnect_receive(url, doc){
   this.send(url, doc);
}

//============================================================
//
//============================================================
function TXmlConnect_syncSend(url, doc){
   var o = this;
   o.inUsing = true;
   o.address = url;
   // 发送文档到服务器，同步接收返回的文档信息
   var xml = doc.xml().toString();
   var cnn = o.cnnControl;
   cnn.open('POST', url, false);
   o.setHeaders(cnn, xml.length);
   cnn.send(xml);
   // 获得返回的文档对象
   var element = null;
   if(o.xmlMode == EXmlCnnType.IE){
      element = cnn.responseXML.documentElement;
   }else{
      element = cnn.responseXml.documentElement;
   }
   // 建立文档对象
   o.document = new TXmlDocument();
   if(element){
      RXml.buildNode(this.document, null, element);
   }else{
      RMessage.fatal(o, null, 'Read xml error.\n{0}', this.cnnControl.responseText)
   }
   o.inUsing = false;
   return o.document;
}

//============================================================
//
//============================================================
function TXmlConnect_syncReceive(url, doc){
   return this.syncSend(url, doc);
}
