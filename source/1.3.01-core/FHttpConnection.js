with(MO){
   //==========================================================
   // <T>页面通讯链接。</T>
   //
   // @class
   // @author maocy
   // @version 150104
   //==========================================================
   MO.FHttpConnection = function FHttpConnection(o){
      o = RClass.inherits(this, o, FObject, MListenerLoad, MListenerProcess);
      //..........................................................
      // @attribute
      o._asynchronous        = false;
      o._methodCd            = EHttpMethod.Get;
      o._contentCd           = EHttpContent.Binary;
      o._url                 = null;
      // @attribute
      o._input               = null;
      o._inputData           = RClass.register(o, new AGetSet('_inputData'));
      o._output              = null;
      o._outputData          = RClass.register(o, new AGetter('_outputData'));
      // @attribute
      o._connection          = null;
      o._contentLength       = 0;
      o._statusFree          = true;
      //..........................................................
      // @event
      o.onConnectionSend     = FHttpConnection_onConnectionSend;
      o.onConnectionReady    = FHttpConnection_onConnectionReady;
      o.onConnectionComplete = FHttpConnection_onConnectionComplete;
      //..........................................................
      // @method
      o.construct            = FHttpConnection_construct;
      // @method
      o.setHeaders           = FHttpConnection_setHeaders;
      o.setOutputData        = FHttpConnection_setOutputData;
      o.content              = FHttpConnection_content;
      o.sendSync             = FHttpConnection_sendSync;
      o.sendAsync            = FHttpConnection_sendAsync;
      o.send                 = FHttpConnection_send;
      // @method
      o.dispose              = FHttpConnection_dispose;
      return o;
   }

   //==========================================================
   // <T>响应链接发送处理。</T>
   //
   // @method
   //==========================================================
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
            throw new TError('Unknown send data type.');
         }
      }
   }

   //==========================================================
   // <T>响应链接准备处理。</T>
   //
   // @method
   //==========================================================
   MO.FHttpConnection_onConnectionReady = function FHttpConnection_onConnectionReady(){
      var o = this._linker;
      if(o._asynchronous){
         var connection = o._connection;
         if(connection.readyState == EHttpStatus.Loaded){
            if(connection.status == 200){
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
   MO.FHttpConnection_onConnectionComplete = function FHttpConnection_onConnectionComplete(){
      var o = this;
      o._statusFree = true;
      // 完成处理
      o.processLoadListener(o);
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FHttpConnection_construct = function FHttpConnection_construct(){
      var o = this;
      var c = o._connection = RXml.createConnection();
      c._linker = o;
      c.onreadystatechange = o.onConnectionReady;
   }

   //==========================================================
   // <T>设置头信息集合。</T>
   //
   // @method
   //==========================================================
   MO.FHttpConnection_setHeaders = function FHttpConnection_setHeaders(){
      var o = this;
      var connection = o._connection;
      // 传输格式
      if(o._contentCd == EHttpContent.Binary){
         // 二进制内容
         if(RBrowser.isBrowser(EBrowser.Explorer)){
            connection.setRequestHeader('Accept-Charset', 'x-user-defined');
            connection.responseType = 'arraybuffer';
         }else{
            connection.overrideMimeType('text/plain; charset=x-user-defined');
            if(o._asynchronous){
               connection.responseType = 'arraybuffer';
            }
         }
      }else{
         // 文本内容
         connection.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      }
      // 数据长度
      if(!RBrowser.isBrowser(EBrowser.Chrome)){
         if(o._contentLength > 0){
            connection.setRequestHeader('content-length', o._contentLength);
         }
      }
   }

   //==========================================================
   // <T>设置接收信息。</T>
   //
   // @method
   //==========================================================
   MO.FHttpConnection_setOutputData = function FHttpConnection_setOutputData(){
      var o = this;
      var connection = o._connection;
      // 传输格式
      if(o._contentCd == EHttpContent.Binary){
         o._outputData = connection.response;
      }else{
         o._outputData = connection.responseText;
      }
   }

   //==========================================================
   // <T>获得内容。</T>
   //
   // @method
   // @return Object 内容
   //==========================================================
   MO.FHttpConnection_content = function FHttpConnection_content(){
      return this._outputData;
   }

   //==========================================================
   // <T>同步发送页面请求。</T>
   //
   // @method
   //==========================================================
   MO.FHttpConnection_sendSync = function FHttpConnection_sendSync(){
      var o = this;
      var connection = o._connection;
      connection.open(o._methodCd, o._url, false);
      o.setHeaders(connection, 0);
      connection.send(o._inputData);
      o.setOutputData();
      o.onConnectionComplete();
      MO.Logger.info(this, 'Send http sync request. (method={1}, url={2})', o._methodCd, o._url);
   }

   //==========================================================
   // <T>异步发送页面请求。</T>
   //
   // @method
   //==========================================================
   MO.FHttpConnection_sendAsync = function FHttpConnection_sendAsync(){
      var o = this;
      var connection = o._connection;
      connection.open(o._methodCd, o._url, true);
      o.setHeaders(connection, 0);
      connection.send(o._inputData);
      MO.Logger.info(this, 'Send http asynchronous request. (method={1}, url={2})', o._methodCd, o._url);
   }

   //==========================================================
   // <T>发送页面请求。</T>
   //
   // @method
   // @param url:String 发送地址
   // @param data:Object 发送数据
   //==========================================================
   MO.FHttpConnection_send = function FHttpConnection_send(url, data){
      var o = this;
      // 设置参数
      o._url = url;
      o._input = data;
      // 设置状态
      o._methodCd = (data != null) ? EHttpMethod.Post : EHttpMethod.Get;
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

   //==========================================================
   // <T>发送页面请求。</T>
   //
   // @method
   // @param url:String 发送地址
   // @param data:Object 发送数据
   //==========================================================
   MO.FHttpConnection_dispose = function FHttpConnection_dispose(){
      var o = this;
      // 释放属性
      o._input = null;
      o._inputData = null;
      o._output = null;
      o._outputData = null;
      var connection = o._connection;
      if(connection){
         connection.onreadystatechange = null;
         o._connection = null;
      }
      // 父处理
      o.__base.MListenerLoad.dispose.call(o);
      o.__base.FObject.dispose.call(o);
   }
}
