// ============================================================
// FLoggerConsole
// ============================================================
MO.FLoggerConsole = function FLoggerConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._scopeCd   = MO.EScope.Page;
   o.iLogger    = null;
   //..........................................................
   // @event
   o.onKeyDown  = MO.FLoggerConsole_onKeyDown;
   //..........................................................
   // @method
   o.construct  = MO.FLoggerConsole_construct;
   o.connect    = MO.FLoggerConsole_connect;
   o.disconnect = MO.FLoggerConsole_disconnect;
   o.output     = MO.FLoggerConsole_output;
   return o;
}
// ------------------------------------------------------------
MO.FLoggerConsole_onKeyDown = function FLoggerConsole_onKeyDown(e){
   if(e.shiftKey && e.ctrlKey && EKey.L == e.keyCode){
      this.connect();
   }
}
// ------------------------------------------------------------
MO.FLoggerConsole_construct = function FLoggerConsole_construct(){
   var o = this;
   o.base.FConsole.construct.call(o);
   // Listener
   MO.RWindow.lsnsKeyDown.register(o, o.onKeyDown);
}
// ------------------------------------------------------------
MO.FLoggerConsole_connect = function FLoggerConsole_connect(){
   //var o = this;
   //if(!o.iLogger){
      // o.iLogger = new ActiveXObject('MobjLibrary.Logger');
   //}
}
// ------------------------------------------------------------
MO.FLoggerConsole_disconnect = function FLoggerConsole_disconnect(){
   this.iLogger = null;
}
// ------------------------------------------------------------
MO.FLoggerConsole_output = function FLoggerConsole_output(level, obj, method, ms, msg, stack){
   var o = this;
   // o.connect(); // 仅供调试使用
   if(o.iLogger){
      var m = MO.Class.dump(obj);
      if(ms){
         m += ' (' + ms + 'ms)';
      }
      var s = level + ' [' + MO.Lang.String.rpad(m, 36) + '] ';
      if(stack){
         s += MO.Lang.String.rpad(msg, 120) + ' [' + stack + ']';
      }else{
         s += msg;
      }
      o.iLogger.Output(s);
   }
}
// ------------------------------------------------------------
MO.FLoggerConsole_xml = function FLoggerConsole_xml(){
   if(!this.environment){
      this.connect()
   }
   if(this.environment){
      return this.environment.xml();
   }
   return null;
}
