//==========================================================
// <T>页面通讯链接。</T>
//
// @class
// @author maocy
// @version 150104
//==========================================================
function FHttpConnection(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._asynchronous        = false;
   o._methodCd            = EHttpMethod.Get;
   o._contentCd           = EHttpContent.Binary;
   o._url                 = null;
   // @attribute
   o._input               = null;
   o._inputData           = null;
   o._output              = null;
   o._outputData          = null;
   // @attribute
   o._connection          = null;
   o._contentLength       = 0;
   o._statusFree          = true;
   //..........................................................
   // @listener
   o.lsnsLoad             = null;
   //..........................................................
   // @event
   o.onConnectionSend     = FHttpConnection_onConnectionSend;
   o.onConnectionReady    = FHttpConnection_onConnectionReady;
   o.onConnectionComplete = FHttpConnection_onConnectionComplete;
   //..........................................................
   // @method
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

//==========================================================
// <T>响应链接发送处理。</T>
//
// @method
//==========================================================
function FHttpConnection_onConnectionSend(){
   var o = this;
   if(o._inputData){
      o._contentLength = o._inputData.length;
   }
}

//==========================================================
// <T>响应链接准备处理。</T>
//
// @method
//==========================================================
function FHttpConnection_onConnectionReady(){
   var o = this._linker;
   if(o._asynchronous){
      var c = o._connection;
      if(c.readyState == EHttpStatus.Finish){
         if(c.status == 200){
            o.setOutputData();
            o.onConnectionComplete();
         }else{
            throw new TError(o, 'Connection failure. (url={1})', o._url);
         }
      }
   }
}

//==========================================================
// <T>响应链接完成处理。</T>
//
// @method
//==========================================================
function FHttpConnection_onConnectionComplete(){
   var o = this;
   o._statusFree = true;
   // 完成处理
   o.lsnsLoad.process(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FHttpConnection_construct(){
   var o = this;
   o.lsnsLoad = new TListeners();
   var c = o._connection = RXml.createConnection();
   c._linker = o;
   c.onreadystatechange = o.onConnectionReady;
}

//==========================================================
// <T>设置头信息集合。</T>
//
// @method
//==========================================================
function FHttpConnection_setHeaders(){
   var o = this;
   var c = o._connection;
   // 传输格式
   if(o._contentCd == EHttpContent.Binary){
      // 二进制
      if(RBrowser.isBrowser(EBrowser.Explorer)){
         c.setRequestHeader('Accept-Charset', 'x-user-defined');
         c.responseType = 'arraybuffer';
      }else{
         c.overrideMimeType('text/plain; charset=x-user-defined');
         if(o._asynchronous){
            c.responseType = 'arraybuffer';
         }
      }
   }else{
      // 文本
      c.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
   }
   // 数据长度
   if(!RBrowser.isBrowser(EBrowser.Chrome)){
      if(o._contentLength > 0){
         c.setRequestHeader('content-length', o._contentLength);
      }
   }
}

//==========================================================
// <T>获得发送信息。</T>
//
// @method
// @param p:value:String 内容
//==========================================================
function FHttpConnection_inputData(){
   return this._inputData;
}

//==========================================================
// <T>设置发送信息。</T>
//
// @method
// @param p:value:String 内容
//==========================================================
function FHttpConnection_setInputData(p){
   this._inputData = p;
}

//==========================================================
// <T>获得接收信息。</T>
//
// @method
// @param p:value:String 内容
//==========================================================
function FHttpConnection_outputData(){
   return this._outputData;
}

//==========================================================
// <T>设置接收信息。</T>
//
// @method
//==========================================================
function FHttpConnection_setOutputData(){
   var o = this;
   var c = o._connection;
   // 传输格式
   if(o._contentCd == EHttpContent.Binary){
      o._outputData = c.response;
   }else{
      o._outputData = c.responseText;
   }
}

//==========================================================
// <T>获得内容。</T>
//
// @method
// @return Object 内容
//==========================================================
function FHttpConnection_content(){
   return this._outputData;
}

//==========================================================
// <T>同步发送页面请求。</T>
//
// @method
//==========================================================
function FHttpConnection_sendSync(){
   var o = this;
   var c = o._connection;
   c.open(o._methodCd, o._url, false);
   o.setHeaders(c, 0);
   c.send(o._inputData);
   o.setOutputData();
   o.onConnectionComplete();
   RLogger.info(this, 'Send http sync request. (method={1}, url={2})', o._methodCd, o._url);
}

//==========================================================
// <T>异步发送页面请求。</T>
//
// @method
//==========================================================
function FHttpConnection_sendAsync(){
   var o = this;
   var c = o._connection;
   c.open(o._methodCd, o._url, true);
   o.setHeaders(c, 0);
   c.send(o._inputData);
   RLogger.info(this, 'Send http asynchronous request. (method={1}, url={2})', o._methodCd, o._url);
}

//==========================================================
// <T>发送页面请求。</T>
//
// @method
// @param p:url:String 页面地址
//==========================================================
function FHttpConnection_send(p, d){
   var o = this;
   // 设置参数
   o._url = p;
   o._input = d;
   // 设置状态
   o._methodCd = (d != null) ? EHttpMethod.Post : EHttpMethod.Get;
   o._statusFree = false;
   // 发送信息
   o.onConnectionSend();
   if(o._asynchronous){
      o.sendAsync();
   }else{
      o.sendSync();
   }
   return o.content();
}
