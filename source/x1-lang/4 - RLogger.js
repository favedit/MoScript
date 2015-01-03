//==========================================================
// <T>日志记录的管理类。</T>
//
// @reference
// @author maocy
// @version 1.0.1
//==========================================================
var RLogger = new function(){
   var o = this;
   // Define
   o.LEVEL_DEBUG = 0;
   o.LEVEL_INFO  = 1;
   o.LEVEL_WARN  = 2;
   o.LEVEL_ERROR = 3;
   o.LEVEL_FATAL = 4;
   // Attribute
   o.dumpLevel   = 20;
   o.colors      = ['#FFFFFF', '#E0F0F0', '#F0E0F0', '#F0F0E0'];
   // Method
   o.canDebug    = RLogger_canDebug;
   o.stack       = RLogger_stack;
   o.debug       = RLogger_debug;
   o.info        = RLogger_info;
   o.warn        = RLogger_warn;
   o.error       = RLogger_error;
   o.fatal       = RLogger_fatal;
   o.log         = RLogger_log;
   o.dump        = RLogger_dump;
   // Construct
   RMemory.register('RLogger', o);
   return o;
}
var RLog = RLogger;

//==========================================================
//
//==========================================================
function RLogger_canDebug(){
   return ERun.Debug == RClass.mode
}

//==========================================================
// 链接日志打印的HTML
//
// @method
// @param hObj:hObj:HTML html容器
//==========================================================
// object, message, params
function RLogger_stack(){
   var o = RLogger_stack.caller;
   var s = new TString();
   while(o){
      s.append(RMethod.name(o));
      o = o.caller;
      if(o){
         s.appendLine();
      }
   }
   this.log(ELogger.Debug, s, arguments);
   return s;
}

//==========================================================
// <T>输出一条调试用的日志。</T>
//
// @method
// @param sf:self:Object 消息对象
// @param ms:message:String 消息内容
// @param pm:params:Object... 消息参数列表
//==========================================================
function RLogger_debug(){
   var o = RLogger_debug.caller;
   var s = new TString();
   var n = this.dumpLevel;
   while(o && n>0){
      s.append(RMethod.name(o).replace('_', '.'));
      o = o.caller;
      if(o){
         s.append(' > ');
      }
      n--;
   }
   this.log(ELogger.Debug, RMethod.name(RLogger_debug.caller), 0, arguments, s);
}

//==========================================================
// object, message, params
//==========================================================
function RLogger_info(){
   var o = RLogger_info.caller;
   var s = new TString();
   var n = this.dumpLevel;
   while(o && n>0){
      s.append(RMethod.name(o).replace('_', '.'));
      o = o.caller;
      if(o){
         s.append(' > ');
      }
      n--;
   }
   this.log(ELogger.Info, RMethod.name(RLogger_info.caller), 0, arguments, s);
}

//==========================================================
// object, message, params
//==========================================================
function RLogger_warn(){
   var o = RLogger_warn.caller;
   var s = new TString();
   var n = this.dumpLevel;
   while(o && n>0){
      s.append(RMethod.name(o).replace('_', '.'));
      o = o.caller;
      if(o){
         s.append(' > ');
      }
      n--;
   }
   this.log(ELogger.Warn, RMethod.name(RLogger_warn.caller), 0, arguments, s);
}

//==========================================================
// object, message, params
//==========================================================
function RLogger_error(){
   var o = RLogger_error.caller;
   var s = new TString();
   var n = this.dumpLevel;
   while(o && n>0){
      s.append(RMethod.name(o).replace('_', '.'));
      o = o.caller;
      if(o){
         s.append(' > ');
      }
      n--;
   }
   this.log(ELogger.Error, RMethod.name(RLogger_error.caller), 0, arguments, s);
}

//==========================================================
// object, message, params
//==========================================================
function RLogger_fatal(){
   var o = RLogger_fatal.caller;
   var s = new TString();
   var n = this.dumpLevel;
   while(o && n>0){
      s.append(RMethod.name(o).replace('_', '.'));
      o = o.caller;
      if(o){
         s.append(' > ');
      }
      n--;
   }
   this.log(ELogger.Fatal, RMethod.name(RLogger_fatal.caller), 0, arguments, s);
}

//==========================================================
// level, args[object, method, message, params...]
//==========================================================
function RLogger_log(level, method, ms, args, stack){
   var o = this;
   var obj = args[0];
   if(null != args[1]){
      var msg = args[1].toString();
      for(var n=2; n<args.length; n++){
         if(null == args[n]){
            msg = msg.replace('{' + (n-2) + '}', '');
         }else{
            msg = msg.replace('{' + (n-2) + '}', args[n]);
         }
      }
   }
   RConsole.find(FLoggerConsole).output(level, obj, method, ms, msg, stack);
}

//==========================================================
//
//==========================================================
function RLogger_dump(level, obj){
   RConsole.find(FLoggerConsole).output(level, obj, method, 0, RClass.dump(obj));
}
