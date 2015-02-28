//==========================================================
// <T>日志工具类。</T>
//
// @reference
// @author maocy
// @version 141229
//==========================================================
MO.RLogger = new function RLogger(){
   var o = this;
   //..........................................................
   // @attribute
   o._statusError     = false;
   o._labelLength     = 40;
   //..........................................................
   // @listener
   o._outputListeners = null;
   //..........................................................
   // @method
   o.outputListeners  = RLogger_outputListeners;
   // @method
   o.output           = RLogger_output;
   o.debug            = RLogger_debug;
   o.info             = RLogger_info;
   o.warn             = RLogger_warn;
   o.error            = RLogger_error;
   o.fatal            = RLogger_fatal;
   return o;

   //==========================================================
   // <T>获得输出监听器集合。</T>
   //
   // @method
   // @param p:value:Object 消息内容
   //==========================================================
   function RLogger_outputListeners(s, p){
      var o = this;
      var r = o._outputListeners;
      if(!r){
         r = o._outputListeners = new MO.TListeners();
      }
      return r;
   }

   //==========================================================
   // <T>输出日志信息。</T>
   //
   // @method
   // @param p:value:Object 消息内容
   //==========================================================
   function RLogger_output(s, p){
      var r = this._outputListeners;
      if(r){
         r.process(s, p);
      }
   }

   //==========================================================
   //<T>显示一个调试信息。</T>
   //
   // @method
   // @param sf:self:Object 消息对象
   // @param ms:message:String 消息内容
   // @param pm:params:Object... 消息参数列表
   //==========================================================
   function RLogger_debug(sf, ms, pm){
      var o = this;
      // 获得函数名称
      var n = MO.RMethod.name(RLogger_debug.caller);
      n = n.replace('_', '.');
      //..........................................................
      var r = new MO.TString();
      r.append(MO.RDate.format('yymmdd-hh24miss.ms'));
      r.append('|D [' + MO.RString.rpad(n, o._labelLength) + '] ');
      // 格式化参数
      var as = arguments;
      var c = as.length;
      for(var n = 2; n < c; n++){
         var a = as[n];
         var s = '';
         if(a){
            if(typeof(a) == 'function'){
               s = MO.RMethod.name(a);
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
   //<T>显示一个警告信息。</T>
   //
   // @method
   // @param sf:self:Object 消息对象
   // @param ms:message:String 消息内容
   // @param pm:params:Object... 消息参数列表
   //==========================================================
   function RLogger_info(sf, ms, pm){
      var o = this;
      // 获得函数名称
      var n = MO.RMethod.name(RLogger_info.caller);
      n = n.replace('_', '.');
      //..........................................................
      var r = new MO.TString();
      r.append(MO.RDate.format('yymmdd-hh24miss.ms'));
      r.append('|I [' + MO.RString.rpad(n, o._labelLength) + '] ');
      // 格式化参数
      var as = arguments;
      var c = as.length;
      for(var n = 2; n < c; n++){
         var a = as[n];
         var s = '';
         if(a){
            if(typeof(a) == 'function'){
               s = MO.RMethod.name(a);
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
   // <T>显示一个警告信息。</T>
   //
   // @method
   //==========================================================
   function RLogger_warn(sf, ms, pm){
      var o = this;
      // 获得函数名称
      var n = MO.RMethod.name(RLogger_warn.caller);
      n = n.replace('_', '.');
      //..........................................................
      var r = new MO.TString();
      r.append(MO.RDate.format('yymmdd-hh24miss.ms'));
      r.append('|W [' + MO.RString.rpad(n, o._labelLength) + '] ');
      // 格式化参数
      var as = arguments;
      var c = as.length;
      for(var n = 2; n < c; n++){
         var a = as[n];
         var s = '';
         if(a){
            if(typeof(a) == 'function'){
               s = MO.RMethod.name(a);
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
   // <T>显示一个错误信息。</T>
   //
   // @method
   //==========================================================
   function RLogger_error(self, method, msg, params){
      // 检查是否已经弹出过错误
      if(this._statusError){
         return;
      }
      this._statusError = true;
      throw new Error(msg);
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
   function RLogger_fatal(sf, er, ms, pm){
      var o = this;
      // 检查是否已经弹出过错误
      if(o._statusError){
         return;
      }
      o._statusError = true;
      // 建立函数调用关系的堆栈
      var s = new MO.TString();
      var t = new Array();
      var f = RLogger_fatal.caller;
      while(f){
         if(MO.RArray.contains(t, f)){
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
         s.append('   ' + (c - n) + ': ' + MO.RMethod.name(f));
      }
      // 建立消息信息
      var m = new MO.TString();
      m.appendLine(MO.RContext.get('RMessage:fatal'));
      m.appendLine(MO.RString.repeat('-', 60));
      m.append(MO.RClass.dump(sf), ': ');
      if(ms){
         var ag = arguments;
         c = ag.length;
         for(var n = 3; n < c; n++){
            var p = ag[n];
            if('function' == typeof(p)){
               p = MO.RMethod.name(p);
            }
            var pi = n - 2;
            ms = ms.replace('{' + pi + '}', p);
         }
      }
      m.appendLine(ms);
      m.appendLine(MO.RString.repeat('-', 60));
      m.appendLine('Stack:');
      m.append(s);
      alert(m);
   }
}
