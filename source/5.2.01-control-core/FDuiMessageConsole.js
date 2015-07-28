//==========================================================
// <T>界面消息控制台。</T>
//
// @class
// @author maocy
// @version 150409
//==========================================================
MO.FUiMessageConsole = function FUiMessageConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole, MO.MUiStyle);
   //..........................................................
   // @attribute
   o._scopeCd       = MO.EScope.Global;
   // @attribute
   o._result        = new Array();
   o._attributes    = new Array();
   o._messageBox    = null;
   o._messageWindow = null;
   //..........................................................
   // @method
   o.showInfo       = MO.FUiMessageConsole_showInfo;
   o.showConfirm    = MO.FUiMessageConsole_showConfirm;
   o.showError      = MO.FUiMessageConsole_showError;
   o.popup          = MO.FUiMessageConsole_popup;
   o.close          = MO.FUiMessageConsole_close;
   // @method
   o.parse          = MO.FUiMessageConsole_parse;
   o.check          = MO.FUiMessageConsole_check;
   return o;
}

//==========================================================
// <T>显示提示窗口。</T>
//
// @method
// @param text:String 文本内容
//==========================================================
MO.FUiMessageConsole_showInfo = function FUiMessageConsole_showInfo(text){
   var dialog = MO.Console.find(MO.FDuiWindowConsole).find(MO.FUiInfoDialog);
   dialog.clearResultListeners();
   dialog.setText(text);
   dialog.showPosition(MO.EUiPosition.Center);
   return dialog;
}

//==========================================================
// <T>显示确认窗口。</T>
//
// @method
// @param text:String 文本内容
//==========================================================
MO.FUiMessageConsole_showConfirm = function FUiMessageConsole_showConfirm(text){
   var dialog = MO.Console.find(MO.FDuiWindowConsole).find(MO.FUiConfirmDialog);
   dialog.clearResultListeners();
   dialog.setText(text);
   dialog.showPosition(MO.EUiPosition.Center);
   return dialog;
}

//==========================================================
// <T>显示错误窗口。</T>
//
// @method
// @param text:String 文本内容
//==========================================================
MO.FUiMessageConsole_showError = function FUiMessageConsole_showError(code, message, description){
   var dialog = MO.Console.find(MO.FDuiWindowConsole).find(MO.FUiErrorDialog);
   dialog.clearResultListeners();
   dialog.setCode(message);
   dialog.setDescription(description);
   dialog.showPosition(MO.EUiPosition.Center);
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
MO.FUiMessageConsole_popup = function FUiMessageConsole_popup(g){
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
MO.FUiMessageConsole_close = function FUiMessageConsole_close(){
   RWindow.setEnable(true);
}

//==========================================================
// <T>界面消息控制台。</T>
//
// @class
// @author maocy
// @version 150409
//==========================================================
MO.FUiMessageConsole_parse = function FUiMessageConsole_parse(config){
   var msgs = null;
   var msgsNode = config.find('Messages');
   if(msgsNode && msgsNode.nodes && msgsNode.nodes.count){
      msgs = new MO.TMessages();
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
MO.FUiMessageConsole_check = function FUiMessageConsole_check(g){
   var o = this;
   var ms = g.messages = o.parse(g.config);
   if(ms){
      var m = ms.message(MO.EMessage.Fatal);
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
