//==========================================================
// <T>日志工具类。</T>
//
// @reference
// @author maocy
// @version 141229
//==========================================================
var RLogger = new function RLogger(){
   var o = this;
   //..........................................................
   // @attribute
   o.hasError = false;
   //..........................................................
   // @method
   o.fatal    = RLogger_fatal;
   o.error    = RLogger_error;
   o.warn     = RLogger_warn;
   o.info     = RLogger_info;
   return o;
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
   if(o.hasError){
      return;
   }
   o.hasError = true;
   // 建立函数调用关系的堆栈
   var s = new TString();
   var t = new Array();
   var f = RLogger_fatal.caller;
   while(f){
      if(RArray.contains(t, f)){
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
      s.append('   ' + (c - n) + ': ' + RMethod.name(f));
   }
   // 建立消息信息
   var m = new TString();
   m.appendLine(RContext.get('RMessage:fatal'));
   m.appendLine(RString.repeat('-', 60));
   m.append(RClass.dump(sf), ': ');
   if(ms){
      var ag = arguments;
      c = ag.length;
      for(var n = 3; n < c; n++){
         var p = ag[n];
         if('function' == typeof(p)){
            p = RMethod.name(p);
         }
         var pi = n - 2;
         ms = ms.replace('{' + pi + '}', p);
      }
   }
   m.appendLine(ms);
   m.appendLine(RString.repeat('-', 60));
   m.appendLine('Stack:');
   m.append(s);
   alert(m);
}

//==========================================================
// <T>显示一个错误信息。</T>
//
// @method
//==========================================================
function RLogger_error(self, method, msg, params){
   // 检查是否已经弹出过错误
   if(this.hasError){
      return;
   }
   this.hasError = true;
   throw new Error(msg);
}

//==========================================================
// <T>显示一个警告信息。</T>
//
// @method
//==========================================================
function RLogger_warn(sf, ms, pm){
}

//==========================================================
//<T>显示一个警告信息。</T>
//
//@method
//==========================================================
function RLogger_info(sf, ms, pm){
}
