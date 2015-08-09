//==========================================================
// <T>网络端口。</T>
//
// @class
// @author maocy
// @history 15029
//==========================================================
MO.FSocket = function FSocket(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._connected = MO.Class.register(o, new MO.AGetter('_connected'), false);
   o._handle    = MO.Class.register(o, new MO.AGetter('_handle'));
   //..........................................................
   // @event
   o.onOpen     = MO.FSocket_onOpen;
   // @event
   o.ohOpen     = MO.FSocket_ohOpen;
   o.ohError    = MO.FSocket_ohError;
   o.ohMessage  = MO.FSocket_ohMessage;
   o.ohClose    = MO.FSocket_ohClose;
   //..........................................................
   // @method
   o.construct  = MO.FSocket_construct;
   // @method
   o.connect    = MO.FSocket_connect;
   o.send       = MO.FSocket_send;
   o.disconnect = MO.FSocket_disconnect;
   // @method
   o.dispose    = MO.FSocket_dispose;
   return o;
}

//==========================================================
// <T>打开处理。</T>
//
// @method
// @param event:Object 事件
//==========================================================
MO.FSocket_onOpen = function FSocket_onOpen(event){
   var o = this;
   o._connected = true;
}

//==========================================================
// <T>打开处理。</T>
//
// @method
// @param event:Object 事件
//==========================================================
MO.FSocket_ohOpen = function FSocket_ohOpen(event){
   this._linker.onOpen(event);
}

//==========================================================
// <T>错误处理。</T>
//
// @method
// @param event:Object 事件
//==========================================================
MO.FSocket_ohError = function FSocket_ohError(event){
   var o = this._linker;
}

//==========================================================
// <T>消息处理。</T>
//
// @method
// @param event:Object 事件
//==========================================================
MO.FSocket_ohMessage = function FSocket_ohMessage(event){
   var o = this._linker;
}

//==========================================================
// <T>关闭处理。</T>
//
// @method
// @param event:Object 事件
//==========================================================
MO.FSocket_ohClose = function FSocket_ohClose(event){
   var o = this._linker;
   o._connected = false;
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
}

//==========================================================
// <T>链接处理。</T>
//
// @method
// @param url:String 网络地址
//==========================================================
MO.FSocket_connect = function FSocket_connect(url){
   var o = this;
   var handle = o._handle = new WebSocket(url);
   handle._linker = o;
   handle.onopen = o.ohOpen;
   handle.onerror = o.ohError
   handle.onmessage = o.ohMessage;
   handle.onclose = o.ohClose;
}

//==========================================================
// <T>发送数据处理。</T>
//
// @method
// @param message:String 消息
//==========================================================
MO.FSocket_send = function FSocket_send(message){
   var o = this;
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
   o._handle = null;
   // 父处理
   o.__base.FObject.dispose.call(o);
}
