//==========================================================
// <T>日志工具类。</T>
//
// @reference
// @author maocy
// @version 141229
//==========================================================
MO.RLogger = function RLogger(){
   var o = this;
   //..........................................................
   // @attribute
   o._labelLength = 40;
   //..........................................................
   // @listener
   o._logger       = new MO.SLogger();
   o.lsnsOutput   = new MO.TListeners();
   return o;
}

//==========================================================
// <T>输出日志信息。</T>
//
// @method
// @param sender:Object 发送者
// @param message:String 消息
//==========================================================
MO.RLogger.prototype.output = function RLogger_output(sender, message){
   var o = this;
   var logger = o._logger;
   logger.sender = sender
   logger.message = message;
   o.lsnsOutput.process(logger);
}

//==========================================================
//<T>显示一个调试信息。</T>
//
// @method
// @param owner:Object 消息对象
// @param message:String 消息内容
// @param params:Object... 消息参数列表
//==========================================================
MO.RLogger.prototype.debug = function RLogger_debug(owner, message, params){
   var o = this;
   // 获得函数名称
   var name = null;
   var caller = MO.Logger.debug.caller;
   if(caller){
      name = MO.Method.name(caller);
   }else if(arguments.caller){
      name = MO.Method.name(arguments.caller[0]);
   }
   if(name == null){
      name = 'unknown';
   }else{
      name = name.replace('_', '.');
   }
   if(owner && owner.hashCode){
      name += '@' + owner.hashCode();
   }
   //..........................................................
   var result = new MO.TString();
   result.append(MO.Lang.Date.format('yymmdd-hh24miss.ms'));
   result.append('|D [' + MO.Lang.String.rpad(name, o._labelLength) + '] ');
   // 格式化参数
   var count = arguments.length;
   for(var n = 2; n < count; n++){
      var parameter = arguments[n];
      var value = '';
      if(parameter != null){
         if(typeof(parameter) == 'function'){
            value = MO.Method.name(parameter);
         }else{
            value = parameter.toString();
         }
      }
      message = message.replace('{' + (n - 1) + '}', value);
   }
   result.append(message);
   //..........................................................
   o.output(owner, result.flush());
}

//==========================================================
//<T>显示一个提示信息。</T>
//
// @method
// @param owner:Object 消息对象
// @param message:String 消息内容
// @param params:Object... 消息参数列表
//==========================================================
MO.RLogger.prototype.info = function RLogger_info(owner, message, params){
   var o = this;
   // 获得函数名称
   var name = null;
   var caller = MO.Logger.info.caller;
   if(caller){
      name = MO.Method.name(caller);
   }else if(arguments.caller){
      name = MO.Method.name(arguments.caller[0]);
   }
   if(name == null){
      name = 'unknown';
   }else{
      name = name.replace('_', '.');
   }
   if(owner && owner.hashCode){
      name += '@' + owner.hashCode();
   }
   //..........................................................
   var result = new MO.TString();
   result.append(MO.Lang.Date.format('yymmdd-hh24miss.ms'));
   result.append('|I [' + MO.Lang.String.rpad(name, o._labelLength) + '] ');
   // 格式化参数
   var c = arguments.length;
   for(var n = 2; n < c; n++){
      var parameter = arguments[n];
      var value = '';
      if(parameter != null){
         if(typeof(parameter) == 'function'){
            value = MO.Method.name(parameter);
         }else{
            value = parameter.toString();
         }
      }
      message = message.replace('{' + (n - 1) + '}', value);
   }
   result.append(message);
   //..........................................................
   o.output(owner, result.flush());
}

//==========================================================
// <T>显示一个警告信息。</T>
//
// @method
// @param owner:Object 消息对象
// @param message:String 消息内容
// @param params:Object... 消息参数列表
//==========================================================
MO.RLogger.prototype.warn = function RLogger_warn(owner, message, params){
   var o = this;
   // 获得函数名称
   var name = null;
   var caller = MO.Logger.warn.caller;
   if(caller){
      name = MO.Method.name(caller);
   }else if(arguments.caller){
      name = MO.Method.name(arguments.caller[0]);
   }
   if(name == null){
      name = 'unknown';
   }else{
      name = name.replace('_', '.');
   }
   if(owner && owner.hashCode){
      name += '@' + owner.hashCode();
   }
   //..........................................................
   var result = new MO.TString();
   result.append(MO.Lang.Date.format('yymmdd-hh24miss.ms'));
   result.append('|W [' + MO.Lang.String.rpad(name, o._labelLength) + '] ');
   // 格式化参数
   var count = arguments.length;
   for(var n = 2; n < count; n++){
      var parameter = arguments[n];
      var value = '';
      if(parameter != null){
         if(typeof(parameter) == 'function'){
            value = MO.Method.name(parameter);
         }else{
            value = parameter.toString();
         }
      }
      message = message.replace('{' + (n - 1) + '}', value);
   }
   result.append(message);
   //..........................................................
   o.output(owner, result.flush());
}

//==========================================================
// <T>显示一个错误信息。</T>
//
// @method
// @param owner:Object 消息对象
// @param message:String 消息内容
// @param params:Object... 消息参数列表
//==========================================================
MO.RLogger.prototype.error = function RLogger_error(owner, message, params){
   var o = this;
   // 获得函数名称
   var name = null;
   var caller = MO.Logger.error.caller;
   if(caller){
      name = MO.Method.name(caller);
   }else if(arguments.caller){
      name = MO.Method.name(arguments.caller[0]);
   }
   if(name == null){
      name = 'unknown';
   }else{
      name = name.replace('_', '.');
   }
   if(owner && owner.hashCode){
      name += '@' + owner.hashCode();
   }
   //..........................................................
   var result = new MO.TString();
   result.append(MO.Lang.Date.format('yymmdd-hh24miss.ms'));
   result.append('|E [' + MO.Lang.String.rpad(name, o._labelLength) + '] ');
   // 格式化参数
   var c = arguments.length;
   for(var n = 2; n < c; n++){
      var parameter = arguments[n];
      var value = '';
      if(parameter != null){
         if(typeof(parameter) == 'function'){
            value = MO.Method.name(parameter);
         }else{
            value = parameter.toString();
         }
      }
      message = message.replace('{' + (n - 1) + '}', value);
   }
   result.append(message);
   //..........................................................
   o.output(owner, result.flush());
}

//==========================================================
// <T>显示一个例外信息。</T>
//
// @method
// @param owner:Object 消息对象
// @param error:Object 例外对象
// @param message:String 消息内容
// @param params:Object... 消息参数列表
//==========================================================
MO.RLogger.prototype.fatal = function RLogger_fatal(owner, error, message, params){
   var o = this;
   // 建立函数调用关系的堆栈
   var stack = new MO.TString();
   var stacks = new Array();
   var caller = MO.Logger.fatal.caller;
   while(caller){
      if(MO.Lang.Array.contains(stacks, caller)){
         break;
      }
      stacks.push(caller);
      caller = caller.caller;
   }
   var count = stacks.length;
   for(var i = 0; i < count; i++){
      caller = stacks[i];
      if(i > 0){
         stack.appendLine();
      }
      stack.append('   ' + (count - i) + ': ' + MO.Method.name(caller));
   }
   // 建立消息信息
   var result = new MO.TString();
   result.appendLine(MO.RContext.get('RMessage:fatal'));
   result.appendLine(MO.Lang.String.repeat('-', 60));
   result.append(MO.Class.dump(owner), ': ');
   if(message){
      var count = arguments.length;
      for(var i = 3; i < count; i++){
         var parameter = arguments[i];
         if('function' == typeof(parameter)){
            parameter = MO.Method.name(parameter);
         }
         message = message.replace('{' + (i - 2) + '}', parameter);
      }
   }
   result.appendLine(message);
   result.appendLine(MO.Lang.String.repeat('-', 60));
   result.appendLine('Stack:');
   result.append(stack.flush());
   var text = result.flush();
   o.output(owner, text);
   // 显示信息
   if(MO.Runtime.isPlatformPc() && !MO.Runtime.isRelease()){
      throw new Error(text);
   }
}

//==========================================================
//<T>显示一个弹出信息。</T>
//
// @method
// @param owner:Object 消息对象
// @param message:String 消息内容
// @param params:Object... 消息参数列表
//==========================================================
MO.RLogger.prototype.show = function RLogger_show(sf, message, params){
   var o = this;
   // 获得函数名称
   var name = null;
   var caller = MO.Logger.show.caller;
   if(caller){
      name = MO.Method.name(caller);
   }else if(arguments.caller){
      name = MO.Method.name(arguments.caller[0]);
   }
   if(name == null){
      name = 'unknown';
   }else{
      name = name.replace('_', '.');
   }
   if(owner.hashCode){
      name += '@' + owner.hashCode();
   }
   //..........................................................
   var result = new MO.TString();
   result.append(MO.Lang.Date.format('yymmdd-hh24miss.ms'));
   result.append('|I [' + MO.Lang.String.rpad(name, o._labelLength) + '] ');
   // 格式化参数
   var count = arguments.length;
   for(var n = 2; n < count; n++){
      var parameter = arguments[n];
      var value = '';
      if(parameter != null){
         if(typeof(parameter) == 'function'){
            value = MO.Method.name(parameter);
         }else{
            value = parameter.toString();
         }
      }
      message = message.replace('{' + (n - 1) + '}', value);
   }
   result.append(message);
   //..........................................................
   alert(result.flush());
}
//..........................................................
// 实例化内容
MO.Logger = new MO.RLogger();
