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

//==========================================================
// <T>事件响应处理。</T>
//
// @method
//==========================================================
MO.FXmlConnection_onConnectionComplete = function FXmlConnection_onConnectionComplete(){
   var o = this;
   var handle = o._handle;
   // 获得返回的文档对象
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
   // 建立文档对象
   var document = new MO.TXmlDocument();
   MO.Lang.Xml.buildNode(document, null, element);
   var root = o._outputNode = document.root();
   // 完成处理
   o._statusFree = true;
   // 完成处理
   var event = o._event;
   event.connection = o;
   event.document = document;
   event.root = root;
   event.content = root;
   event.parameters = o._parameters;
   o.processLoadListener(event);
   event.dispose();
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
