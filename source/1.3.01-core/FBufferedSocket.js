//==========================================================
// <T>网络端口。</T>
//
// @class
// @author maocy
// @history 15029
//==========================================================
MO.FBufferedSocket = function FBufferedSocket(o){
   o = MO.Class.inherits(this, o, MO.FSocket);
   //..........................................................
   // @attribute
   o._bufferSends    = MO.Class.register(o, new MO.AGetter('_bufferSends'));
   o._bufferReceives = MO.Class.register(o, new MO.AGetter('_bufferReceives'));
   //..........................................................
   // @event
   o.onOpen          = MO.FBufferedSocket_onOpen;
   //..........................................................
   // @method
   o.construct       = MO.FBufferedSocket_construct;
   // @method
   o.push            = MO.FBufferedSocket_push;
   o.process         = MO.FBufferedSocket_process;
   // @method
   o.dispose         = MO.FBufferedSocket_dispose;
   return o;
}

//==========================================================
// <T>打开处理。</T>
//
// @method
// @param event:Object 事件
//==========================================================
MO.FBufferedSocket_onOpen = function FBufferedSocket_onOpen(event){
   var o = this;
   o.__base.FSocket.onOpen.call(o, event);
   // 逻辑处理
   o.process();
}

//==========================================================
// <T>错误处理。</T>
//
// @method
// @param event:Object 事件
//==========================================================
MO.FBufferedSocket_ohError = function FBufferedSocket_ohError(event){
   var o = this._linker;
}

//==========================================================
// <T>消息处理。</T>
//
// @method
// @param event:Object 事件
//==========================================================
MO.FBufferedSocket_ohMessage = function FBufferedSocket_ohMessage(event){
   var o = this._linker;
}

//==========================================================
// <T>关闭处理。</T>
//
// @method
// @param event:Object 事件
//==========================================================
MO.FBufferedSocket_ohClose = function FBufferedSocket_ohClose(event){
   var o = this._linker;
   o._connected = false;
}

//==========================================================
// <T>构造处理。</T>
//
// @author maocy
// @history 141230
//==========================================================
MO.FBufferedSocket_construct = function FBufferedSocket_construct(){
   var o = this;
   o.__base.FSocket.construct.call(o);
   // 设置属性
   o._bufferSends = new MO.TObjects();
   o._bufferReceives = new MO.TObjects();
}

//==========================================================
// <T>增加一个发送数据。</T>
//
// @method
// @param message:String 消息
//==========================================================
MO.FBufferedSocket_push = function FBufferedSocket_push(message){
   this._bufferSends.push(message);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FBufferedSocket_process = function FBufferedSocket_process(){
   var o = this;
   // 检查是否已经链接
   if(!o._connected){
      return false;
   }
   // 发送未发送数据
   var sends = o._bufferSends;
   if(!sends.isEmpty()){
      var count = sends.count();
      for(var i = 0; i < count; i++){
         var message = sends.at(i);
         o.send(message);
      }
      sends.clear();
   }
   return true;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FBufferedSocket_dispose = function FBufferedSocket_dispose(){
   var o = this;
   // 释放属性
   o._bufferSends = MO.Lang.Object.dispose(o._bufferSends);
   o._bufferReceives = MO.Lang.Object.dispose(o._bufferReceives);
   // 父处理
   o.__base.FSocket.dispose.call(o);
}
