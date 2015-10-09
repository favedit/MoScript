//==========================================================
// <T>网络端口。</T>
//
// @class
// @author maocy
// @history 15029
//==========================================================
MO.FSocket = function FSocket(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListener);
   //..........................................................
   // @attribute
   o._connected        = MO.Class.register(o, new MO.AGetter('_connected'), false);
   o._handle           = MO.Class.register(o, new MO.AGetter('_handle'));
   // @attribute
   o._eventOpen        = null;
   o._eventSend        = null;
   o._eventReceive     = null;
   o._eventClose       = null;
   o._eventError       = null;
   // @attribute
   o._listenersOpen    = MO.Class.register(o, new MO.AListener('_listenersOpen'));
   o._listenersSend    = MO.Class.register(o, new MO.AListener('_listenersSend'));
   o._listenersReceive = MO.Class.register(o, new MO.AListener('_listenersReceive'));
   o._listenersClose   = MO.Class.register(o, new MO.AListener('_listenersClose'));
   o._listenersError   = MO.Class.register(o, new MO.AListener('_listenersError'));
   //..........................................................
   // @event
   o.onOpen            = MO.FSocket_onOpen;
   o.onReveive         = MO.FSocket_onReveive;
   o.onClose           = MO.FSocket_onClose;
   // @event
   o.ohOpen            = MO.FSocket_ohOpen;
   o.ohError           = MO.FSocket_ohError;
   o.ohReceive         = MO.FSocket_ohReceive;
   o.ohClose           = MO.FSocket_ohClose;
   //..........................................................
   // @method
   o.construct         = MO.FSocket_construct;
   // @method
   o.connect           = MO.FSocket_connect;
   o.send              = MO.FSocket_send;
   o.disconnect        = MO.FSocket_disconnect;
   // @method
   o.dispose           = MO.FSocket_dispose;
   return o;
}

//==========================================================
// <T>打开处理。</T>
//
// @method
// @param event:Event 事件信息
//==========================================================
MO.FSocket_onOpen = function FSocket_onOpen(event){
   var o = this;
   o._connected = true;
   o.processOpenListener(event);
}

//==========================================================
// <T>打开处理。</T>
//
// @method
// @param hEvent:HtmlEvent 页面事件
//==========================================================
MO.FSocket_ohOpen = function FSocket_ohOpen(hEvent){
   var o = this._linker;
   var event = o._eventOpen;
   o.onOpen(event);
}

//==========================================================
// <T>接收数据处理。</T>
//
// @method
// @param event:Event 事件信息
//==========================================================
MO.FSocket_onReveive = function FSocket_onReveive(event){
   var o = this;
   o.processReceiveListener(event);
}

//==========================================================
// <T>接收数据处理。</T>
//
// @method
// @param hEvent:HtmlEvent 页面事件
//==========================================================
MO.FSocket_ohReceive = function FSocket_ohReceive(hEvent){
   var o = this._linker;
   var event = o._eventReceive;
   event.message = hEvent.data;
   o.onReveive(event);
}

//==========================================================
// <T>关闭处理。</T>
//
// @method
// @param event:Event 事件信息
//==========================================================
MO.FSocket_onClose = function FSocket_onClose(event){
   var o = this;
   o._connected = false;
   o.processCloseListener(o._eventClose);
}

//==========================================================
// <T>关闭处理。</T>
//
// @method
// @param hEvent:HtmlEvent 页面事件
//==========================================================
MO.FSocket_ohClose = function FSocket_ohClose(hEvent){
   var o = this._linker;
   var event = o._eventClose;
   o.onClose(event);
}

//==========================================================
// <T>错误处理。</T>
//
// @method
// @param event:Event 事件信息
//==========================================================
MO.FSocket_onError = function FSocket_onError(event){
   var o = this;
   var event = o._eventError;
   o.processErrorListener(event);
}

//==========================================================
// <T>错误处理。</T>
//
// @method
// @param hEvent:HtmlEvent 页面事件
//==========================================================
MO.FSocket_ohError = function FSocket_ohError(hEvent){
   this._linker.onError(event);
}

//==========================================================
// <T>构造处理。</T>
//
// @author maocy
// @history 141230
//==========================================================
MO.FSocket_construct = function FSocket_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   // 设置属性
   o._eventOpen = new MO.SEvent(o);
   o._eventSend = new MO.SEvent(o);
   o._eventReceive = new MO.SEvent(o);
   o._eventClose = new MO.SEvent(o);
   o._eventError = new MO.SEvent(o);
}

//==========================================================
// <T>链接处理。</T>
//
// @method
// @param url:String 网络地址
//==========================================================
MO.FSocket_connect = function FSocket_connect(uri){
   var o = this;
   // 获得地址
   var url = MO.Console.find(MO.FEnvironmentConsole).parse(uri);
   // 链接服务器
   var handle = o._handle = new WebSocket(url);
   handle._linker = o;
   handle.onopen = o.ohOpen;
   handle.onmessage = o.ohReceive;
   handle.onclose = o.ohClose;
   handle.onerror = o.ohError
}

//==========================================================
// <T>发送数据处理。</T>
//
// @method
// @param message:String 消息
//==========================================================
MO.FSocket_send = function FSocket_send(message){
   var o = this;
   // 纷发消息
   var event = o._eventSend;
   event.message = message;
   o.processSendListener(event);
   // 发送内容
   o._handle.send(message);
}

//==========================================================
// <T>断开处理。</T>
//
// @method
//==========================================================
MO.FSocket_disconnect = function FSocket_disconnect(){
   var o = this;
   o._handle.close();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FSocket_dispose = function FSocket_dispose(){
   var o = this;
   // 释放属性
   o._eventOpen = MO.Lang.Object.dispose(o._eventOpen);
   o._eventSend = MO.Lang.Object.dispose(o._eventSend);
   o._eventReceive = MO.Lang.Object.dispose(o._eventReceive);
   o._eventClose = MO.Lang.Object.dispose(o._eventClose);
   o._eventError = MO.Lang.Object.dispose(o._eventError);
   o._handle = null;
   // 父处理
   o.__base.FObject.dispose.call(o);
}
