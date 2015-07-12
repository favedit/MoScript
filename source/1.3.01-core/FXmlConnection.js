//==========================================================
// <T>配置通讯链接。</T>
//
// @class
// @author maocy
// @version 150104
//==========================================================
MO.FXmlConnection = function FXmlConnection(o){
   o = MO.Class.inherits(this, o, MO.FHttpConnection);
   //..........................................................
   // @attribute
   o._contentCd           = MO.EHttpContent.Text;
   // @attribute
   o._inputNode           = null;
   o._outputNode          = null;
   // @attribute
   //..........................................................
   // @event
   o.onConnectionSend     = MO.FXmlConnection_onConnectionSend;
   o.onConnectionComplete = MO.FXmlConnection_onConnectionComplete;
   //..........................................................
   // @method
   o.content              = MO.FXmlConnection_content;
   return o;
}

//==========================================================
// <T>响应链接发送处理。</T>
//
// @method
//==========================================================
MO.FXmlConnection_onConnectionSend = function FXmlConnection_onConnectionSend(){
   var o = this;
   var d = o._input;
   if(d){
      var s = null;
      if(d.constructor == String){
         s = d;
         o._inputNode = null;
      }else if(d.constructor == MO.TXmlNode){
         var x = new MO.TXmlDocument();
         x.setRoot(d);
         s = x.xml();
         o._inputNode = d;
      }else if(d.constructor == MO.TXmlDocument){
         s = d.xml();
         o._inputNode = d.root();
      }else{
         throw new MO.TError('Unknown send data type.');
      }
      o._inputData = s;
      o._contentLength = s.length;
   }
}

//==========================================================
// <T>事件响应处理。</T>
//
// @method
//==========================================================
MO.FXmlConnection_onConnectionComplete = function FXmlConnection_onConnectionComplete(){
   var o = this;
   var c = o._connection;
   // 获得返回的文档对象
   var e = null;
   if(c.responseXML){
      e = c.responseXML.documentElement;
   }else if(c.responseXml){
      e = c.responseXml.documentElement;
   }else{
      throw new MO.TError(o, "Fetch xml data failure.");
   }
   if(!e){
      return MO.RMessage.fatal(o, null, 'Read xml error. (url={1})\n{2}', o._url, c._outputText)
   }
   // 建立文档对象
   var d = new MO.TXmlDocument();
   MO.RXml.buildNode(d, null, e);
   var r = o._outputNode = d.root();
   // 完成处理
   o._statusFree = true;
   // 完成处理
   var e = new MO.SXmlEvent();
   e.connection = o;
   e.document = d;
   e.root = r;
   e.parameters = o._parameters;
   o.processLoadListener(e);
   e.dispose();
   // 异步处理后清空属性
   if(o._asynchronous){
      o._input = null;
      o._inputNode = null;
      o._output = null;
      o._outputNode = null;
      o._parameters = null;
   }
}

//==========================================================
// <T>获得内容。</T>
//
// @return Object 内容
//==========================================================
MO.FXmlConnection_content = function FXmlConnection_content(){
   return this._outputNode;
}
