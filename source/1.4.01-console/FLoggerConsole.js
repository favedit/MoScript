//==========================================================
// <T>日志控制台。</T>
//
// @class
// @author maocy
// @version 150729
//==========================================================
MO.FLoggerConsole = function FLoggerConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._scopeCd   = MO.EScope.Global;
   // @attribute
   o._socket    = null;
   //..........................................................
   // @event
   o.onOutput   = MO.FLoggerConsole_onOutput;
   //..........................................................
   // @method
   o.construct  = MO.FLoggerConsole_construct;
   // @method
   o.connect    = MO.FLoggerConsole_connect;
   o.output     = MO.FLoggerConsole_output;
   o.disconnect = MO.FLoggerConsole_disconnect;
   // @method
   o.dispose    = MO.FLoggerConsole_dispose;
   return o;
}

//==========================================================
// <T>输出内容。</T>
//
// @method
//==========================================================
MO.FLoggerConsole_onOutput = function FLoggerConsole_onOutput(event){
   var message = event.message;
   this.output(message);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FLoggerConsole_construct = function FLoggerConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 设置属性
   MO.Logger.lsnsOutput.register(o, o.onOutput);
}

//==========================================================
// <T>链接处理。</T>
//
// @method
//==========================================================
MO.FLoggerConsole_connect = function FLoggerConsole_connect(url){
   var o = this;
   var socket = o._socket = MO.Class.create(MO.FBufferedSocket);
   socket.connect(url);
}

//==========================================================
// <T>输出内容。</T>
//
// @method
//==========================================================
MO.FLoggerConsole_output = function FLoggerConsole_output(message){
   var socket = this._socket;
   if(socket){
      var url = window.location.toString();
      socket.push('[' + url + '] - ' + message);
      socket.process();
   }
}

//==========================================================
// <T>断开处理。</T>
//
// @method
//==========================================================
MO.FLoggerConsole_disconnect = function FLoggerConsole_disconnect(){
   var socket = this._socket;
   if(socket){
      socket.close();
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FLoggerConsole_dispose = function FLoggerConsole_dispose(){
   var o = this;
   // 释放属性
   o._socket = MO.Lang.Object.dispose(o._socket);
   // 父处理
   o.__base.FConsole.dispose.call(o);
}
