//==========================================================
// <T>配置通讯链接。</T>
//
// @class
// @author maocy
// @version 150104
//==========================================================
function FXmlConnection(o){
   o = RClass.inherits(this, o, FHttpConnection);
   //..........................................................
   // @attribute
   o._contentCd           = EHttpContent.Text;
   // @attribute
   o._inputNode           = null;
   o._outputNode          = null;
   // @attribute
   //..........................................................
   // @event
   o.onConnectionSend     = FXmlConnection_onConnectionSend;
   o.onConnectionComplete = FXmlConnection_onConnectionComplete;
   //..........................................................
   // @method
   o.content              = FXmlConnection_content;
   return o;
}

//==========================================================
// <T>响应链接发送处理。</T>
//==========================================================
function FXmlConnection_onConnectionSend(){
   var o = this;
   if(o._inputNode){
      var d = new TXmlDocument();
      d.setRoot(_inputNode);
      var s = s.xml().toString();
      o._inputData = s;
      o._contentLength = s.length;
   }
}

//==========================================================
// <T>事件响应处理。</T>
//==========================================================
function FXmlConnection_onConnectionComplete(){
   var o = this;
   var c = o._connection;
   // 获得返回的文档对象
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
   // 建立文档对象
   var d = new TXmlDocument();
   RXml.buildNode(d, null, e);
   o._outputNode = d.root();
   // 完成处理
   o._statusFree = true;
}

//==========================================================
// <T>获得内容。</T>
//
// @return Object 内容
//==========================================================
function FXmlConnection_content(){
   return this._outputNode;
}
