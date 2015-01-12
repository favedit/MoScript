//==========================================================
// <T>消息的管理类。</T>
//
// @reference
// @author maocy
// @version 1.0.1
//==========================================================
var RMessage = new function(){
   var o = this;
   // Attribute
   o.hasError      = false;
   // Method
   o.messages      = null;
   // Method
   o.push          = RMessage_push;
   o.fatal         = RMessage_fatal;
   o.confirmResult = false;
   o.error         = RMessage_error;
   o.warn          = RMessage_warn;
   o.onWindowClose = RMessage_onWindowClose;
   o.confirm       = RMessage_confirm;
   o.info          = RMessage_info;
   return o;
}

//==========================================================
// <T>追加一个消息信息。</T>
//
// @method
//==========================================================
function RMessage_push(msg){
   if(!this.messages){
      this.messages = new FLoopList();
   }
   this.messages.push(msg);
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
function RMessage_fatal(sf, er, ms, pm){
   var o = this;
   // 检查是否已经弹出过错误
   if(o.hasError){
      return;
   }
   o.hasError = true;
   // 建立函数调用关系的堆栈
   var s = new TString();
   var t = new Array();
   var f = RMessage_fatal.caller;
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
function RMessage_error(self, method, msg, params){
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
function RMessage_warn(self, message, params){
   var s = new TString();
   var n = 0;
//   var msg = new TString();
//   msg.appendLine(RContext.get('RMessage:warn'));
//   msg.appendLine(RString.repeat('-', 60));
//   if(message){
//      var ag = arguments;
//      for(var n=2; n<ag.length; n++){
//        message = message.replace('{' + (n-1) + '}', ag[n]);
//      }
//   }
   //msg.appendLine(message);
   var aw = top.RControl.create(FAlertWindow);
   aw.setText(message);
   aw.show();
}

//==========================================================
//<T>显示一个警告信息。</T>
//
//@method
//==========================================================
function RMessage_info(self, message, params){
   var s = new TString();
   var n = 0;
   var aw = top.RControl.create(FInfoWindow);
   aw.setText(message);
   aw.show();
}

//==========================================================
//<T>显示一个警告信息。</T>
//
//@method
//==========================================================
function RMessage_confirm(message,callback){
   var o = this;
   var ls = top.RControl.create(FConfirmWindow);
   ls.setText(message);
   ls.lsns.register(o, callback);
   ls.show();
}

//==========================================================
//<T>显示一个警告信息。</T>
//
//@method
//==========================================================
function RMessage_onWindowClose(v){
   this.confirmResult = v;
}

//==========================================================
// <T>显示一个通知信息。</T>
//
// @method
//==========================================================
//function RMessage_info(self, method, msg, params){
//   this.push(msg);
//}
