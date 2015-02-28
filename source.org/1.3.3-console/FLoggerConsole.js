// ============================================================
// FLoggerConsole
// ============================================================
function FLoggerConsole(o){
   o = RClass.inherits(this, o, FConsole);
   // Attribute
   o.scope      = EScope.Page;
   o.iLogger    = null;
   // Event
   o.onKeyDown  = FLoggerConsole_onKeyDown;
   // Method
   o.construct  = FLoggerConsole_construct;
   o.connect    = FLoggerConsole_connect;
   o.disconnect = FLoggerConsole_disconnect;
   o.output     = FLoggerConsole_output;
   return o;
}
// ------------------------------------------------------------
function FLoggerConsole_onKeyDown(e){
   if(e.shiftKey && e.ctrlKey && EKey.L == e.keyCode){
      this.connect();
   }
}
// ------------------------------------------------------------
function FLoggerConsole_construct(){
   var o = this;
   o.base.FConsole.construct.call(o);
   // Listener
   RWindow.lsnsKeyDown.register(o, o.onKeyDown);
}
// ------------------------------------------------------------
function FLoggerConsole_connect(){
   var o = this;
   if(!o.iLogger){
      // o.iLogger = new ActiveXObject('MobjLibrary.Logger');
   }
}
// ------------------------------------------------------------
function FLoggerConsole_disconnect(){
   this.iLogger = null;
}
// ------------------------------------------------------------
function FLoggerConsole_output(level, obj, method, ms, msg, stack){
   var o = this;
   // o.connect(); // 仅供调试使用
   if(o.iLogger){
      var m = RClass.dump(obj);
      if(ms){
         m += ' (' + ms + 'ms)';
      }
      var s = level + ' [' + RString.rpad(m, 36) + '] ';
      if(stack){
         s += RString.rpad(msg, 120) + ' [' + stack + ']';
      }else{
         s += msg;
      }
      o.iLogger.Output(s);
   }
}
// ------------------------------------------------------------
function FLoggerConsole_xml(){
   if(!this.environment){
      this.connect()
   }
   if(this.environment){
      return this.environment.xml();
   }
   return null;
}
// ------------------------------------------------------------
