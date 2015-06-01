//==========================================================
// <T>界面消息控制台。</T>
//
// @class
// @author maocy
// @version 150409
//==========================================================
function FUiMessageConsole(o){
   o = RClass.inherits(this, o, FConsole, MUiStyle);
   //..........................................................
   // @attribute
   o._scopeCd       = EScope.Global;
   // @attribute
   o._result        = new Array();
   o._attributes    = new Array();
   o._messageBox    = null;
   o._messageWindow = null;
   //..........................................................
   // @method
   o.showInfo       = FUiMessageConsole_showInfo;
   o.showConfirm    = FUiMessageConsole_showConfirm;
   o.showError      = FUiMessageConsole_showError;
   o.popup          = FUiMessageConsole_popup;
   o.close          = FUiMessageConsole_close;
   // @method
   o.parse          = FUiMessageConsole_parse;
   o.check          = FUiMessageConsole_check;
   return o;
}

//==========================================================
// <T>显示提示窗口。</T>
//
// @method
// @param text:String 文本内容
//==========================================================
function FUiMessageConsole_showInfo(text){
   var dialog = RConsole.find(FUiWindowConsole).find(FUiInfoDialog);
   dialog.clearResultListeners();
   dialog.setText(text);
   dialog.showPosition(EUiPosition.Center);
   return dialog;
}

//==========================================================
// <T>显示确认窗口。</T>
//
// @method
// @param text:String 文本内容
//==========================================================
function FUiMessageConsole_showConfirm(text){
   var dialog = RConsole.find(FUiWindowConsole).find(FUiConfirmDialog);
   dialog.clearResultListeners();
   dialog.setText(text);
   dialog.showPosition(EUiPosition.Center);
   return dialog;
}

//==========================================================
// <T>显示错误窗口。</T>
//
// @method
// @param text:String 文本内容
//==========================================================
function FUiMessageConsole_showError(code, message, description){
   var dialog = RConsole.find(FUiWindowConsole).find(FUiErrorDialog);
   dialog.clearResultListeners();
   dialog.setCode(message);
   dialog.setDescription(description);
   dialog.showPosition(EUiPosition.Center);
   return dialog;
}

//==========================================================
// <T>界面消息控制台。</T>
//
// @class
// @author maocy
// @version 150409
//==========================================================
// g:argument:TMessageArg
function FUiMessageConsole_popup(g){
   var o = this;
   var w = o._messageWindow;
   if(!w){
      w = o._messageWindow = RControl.create(FUiMessageWindow);
   }
   w.loadMessages(g);
   w.show();
}

//==========================================================
// <T>界面消息控制台。</T>
//
// @class
// @author maocy
// @version 150409
//==========================================================
function FUiMessageConsole_close(){
   RWindow.setEnable(true);
}

//==========================================================
// <T>界面消息控制台。</T>
//
// @class
// @author maocy
// @version 150409
//==========================================================
function FUiMessageConsole_parse(config){
   var msgs = null;
   var msgsNode = config.find('Messages');
   if(msgsNode && msgsNode.nodes && msgsNode.nodes.count){
      msgs = new TMessages();
      for(var n=0; n<msgsNode.nodes.count; n++){
         var node = msgsNode.node(n);
         var msg = new TMessage();
         msg.loadConfig(msgsNode.node(n));
         msgs.push(msg);
      }
   }
   return msgs;
}

//==========================================================
// <T>界面消息控制台。</T>
//
// @class
// @author maocy
// @version 150409
//==========================================================
function FUiMessageConsole_check(g){
   var o = this;
   var ms = g.messages = o.parse(g.config);
   if(ms){
      var m = ms.message(EMessage.Fatal);
      if(m && m.attrType == "session.timeout"){
         // 检查线程超时例外，画面迁移到指定页面
         var ss = RString.splitTwo(m.redirect, '@');
         var s = RContext.context(ss[1] + '?do='+ss[0]);
         fmMain.action = s;
         fmMain.target = '_self';
         fmMain.submit();
      }else{
         // 弹出错误窗口
         o.popupMessage(g);
      }
      return false;
   }
   return true;
}
