//==========================================================
// <T>页面通讯链接。</T>
//
// @class
// @author maocy
// @version 150104
//==========================================================
MO.FHttpConnection = function FHttpConnection(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListener);
   //..........................................................
   // @attribute
   o._asynchronous        = MO.Class.register(o, new MO.AGetSet('_asynchronous'), false);
   o._methodCd            = MO.EHttpMethod.Get;
   o._contentCd           = MO.EHttpContent.Binary;
   o._url                 = null;
   // @attribute
   o._heads               = MO.Class.register(o, new MO.AGetter('_heads'));
   o._input               = null;
   o._inputData           = MO.Class.register(o, new MO.AGetSet('_inputData'));
   o._output              = null;
   o._outputData          = MO.Class.register(o, new MO.AGetter('_outputData'));
   // @attribute
   o._handle              = null;
   o._contentLength       = 0;
   o._statusFree          = true;
   o._event               = null;
   // @attribute
   o._listenersLoad       = MO.Class.register(o, new MO.AListener('_listenersLoad', MO.EEvent.Load));
   o._listenersComplete   = MO.Class.register(o, new MO.AListener('_listenersComplete', MO.EEvent.Complete));
   //..........................................................
   // @event
   o.onConnectionSend     = MO.FHttpConnection_onConnectionSend;
   o.onConnectionReady    = MO.FHttpConnection_onConnectionReady;
   o.onConnectionComplete = MO.FHttpConnection_onConnectionComplete;
   //..........................................................
   // @method
   o.construct            = MO.FHttpConnection_construct;
   // @method
   o.header               = MO.FHttpConnection_header;
   o.setHeader            = MO.FHttpConnection_setHeader;
   o.setHeaders           = MO.FHttpConnection_setHeaders;
   o.setOutputData        = MO.FHttpConnection_setOutputData;
   o.content              = MO.FHttpConnection_content;
   // @method
   o.reset                = MO.FHttpConnection_reset;
   o.sendSync             = MO.FHttpConnection_sendSync;
   o.sendAsync            = MO.FHttpConnection_sendAsync;
   o.send                 = MO.FHttpConnection_send;
   o.post                 = MO.FHttpConnection_post;
   // @method
   o.dispose              = MO.FHttpConnection_dispose;
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
         throw new MO.TError('Unknown send data type.');
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

//==========================================================
// <T>响应链接完成处理。</T>
//
// @method
//==========================================================
MO.FHttpConnection_onConnectionComplete = function FHttpConnection_onConnectionComplete(){
   var o = this;
   o._statusFree = true;
   // 加载处理
   var event = o._event;
   event.connection = o;
   event.content = o._outputData;
   o.processLoadListener(event);
   // 完成处理
   o.processCompleteListener(event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FHttpConnection_construct = function FHttpConnection_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   // 设置属性
   o._heads = new MO.TAttributes();
   o._event = new MO.SEvent();
   // 创建链接
   var handle = o._handle = MO.Window.Xml.createConnection();
   handle._linker = o;
   handle.onreadystatechange = o.onConnectionReady;
}

//==========================================================
// <T>获得头信息。</T>
//
// @method
// @param name:String 名称
// @return String 内容
//==========================================================
MO.FHttpConnection_header = function FHttpConnection_header(name){
   return this._heads.get(name);
}

//==========================================================
// <T>设置头信息。</T>
//
// @method
// @param name:String 名称
// @param value:String 内容
//==========================================================
MO.FHttpConnection_setHeader = function FHttpConnection_setHeader(name, value){
   this._heads.set(name, value);
}

//==========================================================
// <T>设置头信息集合。</T>
//
// @method
//==========================================================
MO.FHttpConnection_setHeaders = function FHttpConnection_setHeaders(){
   var o = this;
   var handle = o._handle;
   // 传输格式
   if(o._contentCd == MO.EHttpContent.Binary){
      // 二进制内容
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
      // 文本内容
      handle.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
   }
   // 设置自定义头信息
   var heads = o._heads;
   var count = heads.count();
   if(count > 0){
      // 设置头信息
      for(var i = 0; i < count; i++){
         var headName = heads.name(i);
         var headValue = heads.value(i);
         handle.setRequestHeader(headName, headValue);
      }
   }
   // 数据长度
   if(!MO.Window.Browser.isBrowser(MO.EBrowser.Chrome)){
      var contentLength = o._contentLength;
      if(contentLength > 0){
         handle.setRequestHeader('content-length', contentLength);
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
   var handle = o._handle;
   // 传输格式
   if(o._contentCd == MO.EHttpContent.Binary){
      o._outputData = handle.response;
   }else{
      o._outputData = handle.responseText;
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
// <T>重置处理。</T>
//
// @method
//==========================================================
MO.FHttpConnection_reset = function FHttpConnection_reset(){
   var o = this;
   // 重置链接
   o._handle.abort()
   // 清空监听器
   o.clearAllListeners();
}

//==========================================================
// <T>同步发送页面请求。</T>
//
// @method
//==========================================================
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

//==========================================================
// <T>异步发送页面请求。</T>
//
// @method
//==========================================================
MO.FHttpConnection_sendAsync = function FHttpConnection_sendAsync(){
   var o = this;
   var handle = o._handle;
   handle.open(o._methodCd, o._url, true);
   o.setHeaders(handle, 0);
   handle.send(o._inputData);
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
   o._methodCd = (data != null) ? MO.EHttpMethod.Post : MO.EHttpMethod.Get;
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
MO.FHttpConnection_post = function FHttpConnection_send(url, data){
   var o = this;
   // 设置参数
   o._url = url;
   o._input = data;
   // 设置状态
   o._methodCd = MO.EHttpMethod.Post;
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
   o._heads = MO.Lang.Object.dispose(o._heads);
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
   // 父处理
   o.__base.MListener.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
