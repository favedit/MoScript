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
   o._statusError = false;
   o._labelLength = 40;
   //..........................................................
   // @listener
   o.lsnsOutput   = new MO.TListeners();
   return o;
}

//==========================================================
// <T>输出日志信息。</T>
//
// @method
// @param p:value:Object 消息内容
//==========================================================
MO.RLogger.prototype.output = function RLogger_output(s, p){
   this.lsnsOutput.process(s, p);
}

//==========================================================
//<T>显示一个调试信息。</T>
//
// @method
// @param sf:self:Object 消息对象
// @param ms:message:String 消息内容
// @param pm:params:Object... 消息参数列表
//==========================================================
MO.RLogger.prototype.debug = function RLogger_debug(sf, ms, pm){
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
   //..........................................................
   var r = new MO.TString();
   r.append(MO.Lang.Date.format('yymmdd-hh24miss.ms'));
   r.append('|D [' + MO.Lang.String.rpad(name, o._labelLength) + '] ');
   // 格式化参数
   var as = arguments;
   var c = as.length;
   for(var n = 2; n < c; n++){
      var a = as[n];
      var s = '';
      if(a != null){
         if(typeof(a) == 'function'){
            s = MO.Method.name(a);
         }else{
            s = a.toString();
         }
      }
      ms = ms.replace('{' + (n - 1) + '}', s);
   }
   r.append(ms);
   //..........................................................
   o.output(sf, r.flush());
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
   //..........................................................
   var result = new MO.TString();
   result.append(MO.Lang.Date.format('yymmdd-hh24miss.ms'));
   result.append('|I [' + MO.Lang.String.rpad(name, o._labelLength) + '] ');
   // 格式化参数
   var as = arguments;
   var c = as.length;
   for(var n = 2; n < c; n++){
      var a = as[n];
      var s = '';
      if(a != null){
         if(typeof(a) == 'function'){
            s = MO.Method.name(a);
         }else{
            s = a.toString();
         }
      }
      message = message.replace('{' + (n - 1) + '}', s);
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
   //..........................................................
   var result = new MO.TString();
   result.append(MO.Lang.Date.format('yymmdd-hh24miss.ms'));
   result.append('|W [' + MO.Lang.String.rpad(name, o._labelLength) + '] ');
   // 格式化参数
   var as = arguments;
   var c = as.length;
   for(var n = 2; n < c; n++){
      var a = as[n];
      var s = '';
      if(a != null){
         if(typeof(a) == 'function'){
            s = MO.Method.name(a);
         }else{
            s = a.toString();
         }
      }
      message = message.replace('{' + (n - 1) + '}', s);
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
MO.RLogger.prototype.error = function RLogger_error(sf, ms, params){
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
   //..........................................................
   var r = new MO.TString();
   r.append(MO.Lang.Date.format('yymmdd-hh24miss.ms'));
   r.append('|E [' + MO.Lang.String.rpad(name, o._labelLength) + '] ');
   // 格式化参数
   var as = arguments;
   var c = as.length;
   for(var n = 2; n < c; n++){
      var a = as[n];
      var s = '';
      if(a != null){
         if(typeof(a) == 'function'){
            s = MO.Method.name(a);
         }else{
            s = a.toString();
         }
      }
      ms = ms.replace('{' + (n - 1) + '}', s);
   }
   r.append(ms);
   //..........................................................
   o.output(sf, r.flush());
}

//==========================================================
// <T>显示一个例外信息。</T>
//
// @method
// @param sf:self:Object 消息对象
// @param er:error:Object 例外对象
// @param ms:message:String 消息内容
// @param pm:params:Object... 消息参数列表
//==========================================================
MO.RLogger.prototype.fatal = function RLogger_fatal(sf, er, ms, params){
   var o = this;
   // 检查是否已经弹出过错误
   if(o._statusError){
      return;
   }
   o._statusError = true;
   // 建立函数调用关系的堆栈
   var s = new MO.TString();
   var t = new Array();
   var f = RLogger.fatal.caller;
   while(f){
      if(MO.Lang.Array.contains(t, f)){
         break;
      }
      t.push(f);
      f = f.caller;
   }
   var c = t.length;
   for(var n = 0; n < c; n++){
      f = t[n];
      if(n > 0){
         s.appendLine();
      }
      s.append('   ' + (c - n) + ': ' + MO.Method.name(f));
   }
   // 建立消息信息
   var message = new MO.TString();
   message.appendLine(MO.RContext.get('RMessage:fatal'));
   message.appendLine(MO.Lang.String.repeat('-', 60));
   message.append(MO.Class.dump(sf), ': ');
   if(ms){
      var ag = arguments;
      c = ag.length;
      for(var n = 3; n < c; n++){
         var p = ag[n];
         if('function' == typeof(p)){
            p = MO.Method.name(p);
         }
         var pi = n - 2;
         ms = ms.replace('{' + pi + '}', p);
      }
   }
   message.appendLine(ms);
   message.appendLine(MO.Lang.String.repeat('-', 60));
   message.appendLine('Stack:');
   message.append(s);
   var text = message.toString();
   // 显示信息
   if(!MO.Runtime.isRelease()){
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
MO.RLogger.prototype.show = function RLogger_show(sf, ms, params){
   var o = this;
   // 获得函数名称
   var name = null;
   var caller = MO.Logger_show.caller;
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
   //..........................................................
   var r = new TString();
   r.append(MO.Lang.Date.format('yymmdd-hh24miss.ms'));
   r.append('|I [' + MO.String.rpad(name, o._labelLength) + '] ');
   // 格式化参数
   var as = arguments;
   var c = as.length;
   for(var n = 2; n < c; n++){
      var a = as[n];
      var s = '';
      if(a != null){
         if(typeof(a) == 'function'){
            s = MO.Method.name(a);
         }else{
            s = a.toString();
         }
      }
      ms = ms.replace('{' + (n - 1) + '}', s);
   }
   r.append(ms);
   //..........................................................
   alert(r.flush());
}
//..........................................................
// 实例化内容
MO.Logger = new MO.RLogger();
