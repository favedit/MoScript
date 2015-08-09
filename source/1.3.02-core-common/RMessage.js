//==========================================================
// <T>消息的管理类。</T>
//
// @reference
// @author maocy
// @version 1.0.1
//==========================================================
MO.RMessage = function RMessage(){
   var o = this;
   //..........................................................
   // @attribute
   o._hasError     = false;
   o._messages     = null;
   //..........................................................
   // @method
   o.push          = MO.RMessage_push;
   o.fatal         = MO.RMessage_fatal;
   o.confirmResult = false;
   o.error         = MO.RMessage_error;
   o.warn          = MO.RMessage_warn;
   o.onWindowClose = MO.RMessage_onWindowClose;
   o.confirm       = MO.RMessage_confirm;
   o.info          = MO.RMessage_info;
   return o;
}

//==========================================================
// <T>追加一个消息信息。</T>
//
// @method
//==========================================================
MO.RMessage_push = function RMessage_push(msg){
   if(!this._messages){
      this._messages = new FLoopList();
   }
   this._messages.push(msg);
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
MO.RMessage_fatal = function RMessage_fatal(sf, er, ms, pm){
   var o = this;
   // 检查是否已经弹出过错误
   if(o._hasError){
      return;
   }
   o._hasError = true;
   // 建立函数调用关系的堆栈
   var s = new MO.TString();
   var t = new Array();
   var f = MO.RMessage_fatal.caller;
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
   var m = new MO.TString();
   m.appendLine(MO.RContext.get('RMessage:fatal'));
   m.appendLine(MO.Lang.String.repeat('-', 60));
   m.append(MO.Class.dump(sf), ': ');
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
   m.appendLine(ms);
   m.appendLine(MO.String.repeat('-', 60));
   m.appendLine('Stack:');
   m.append(s);
   alert(m);
}

//==========================================================
// <T>显示一个错误信息。</T>
//
// @method
//==========================================================
MO.RMessage_error = function RMessage_error(self, method, msg, params){
   // 检查是否已经弹出过错误
   if(this._hasError){
      return;
   }
   this._hasError = true;
   throw new Error(msg);
}

//==========================================================
// <T>显示一个警告信息。</T>
//
// @method
//==========================================================
MO.RMessage_warn = function RMessage_warn(self, message, params){
   var s = new MO.TString();
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
   var aw = top.MO.RControl.create(MO.FAlertWindow);
   aw.setText(message);
   aw.show();
}

//==========================================================
//<T>显示一个警告信息。</T>
//
//@method
//==========================================================
MO.RMessage_info = function RMessage_info(self, message, params){
   var s = new MO.TString();
   var n = 0;
   var aw = top.MO.RControl.create(MO.FInfoWindow);
   aw.setText(message);
   aw.show();
}

//==========================================================
//<T>显示一个警告信息。</T>
//
//@method
//==========================================================
MO.RMessage_confirm = function RMessage_confirm(message,callback){
   var o = this;
   var ls = top.MO.RControl.create(MO.FConfirmWindow);
   ls.setText(message);
   ls.lsns.register(o, callback);
   ls.show();
}

//==========================================================
//<T>显示一个警告信息。</T>
//
//@method
//==========================================================
MO.RMessage_onWindowClose = function RMessage_onWindowClose(v){
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
//..........................................................
// 实例化内容
MO.RMessage = new MO.RMessage();
