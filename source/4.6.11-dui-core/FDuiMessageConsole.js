//==========================================================
// <T>界面消息控制台。</T>
//
// @class
// @author maocy
// @version 150409
//==========================================================
MO.FDuiMessageConsole = function FDuiMessageConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole, MO.MDuiStyle);
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
   o.showInfo       = MO.FDuiMessageConsole_showInfo;
   o.showConfirm    = MO.FDuiMessageConsole_showConfirm;
   o.showError      = MO.FDuiMessageConsole_showError;
   o.popup          = MO.FDuiMessageConsole_popup;
   o.close          = MO.FDuiMessageConsole_close;
   // @method
   o.parse          = MO.FDuiMessageConsole_parse;
   o.check          = MO.FDuiMessageConsole_check;
   return o;
}

//==========================================================
// <T>显示提示窗口。</T>
//
// @method
// @param text:String 文本内容
//==========================================================
MO.FDuiMessageConsole_showInfo = function FDuiMessageConsole_showInfo(text){
   var dialog = MO.Console.find(MO.FDuiWindowConsole).find(MO.FDuiInfoDialog);
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
MO.FDuiMessageConsole_showConfirm = function FDuiMessageConsole_showConfirm(text){
   var dialog = MO.Console.find(MO.FDuiWindowConsole).find(MO.FDuiConfirmDialog);
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
MO.FDuiMessageConsole_showError = function FDuiMessageConsole_showError(code, message, description){
   var dialog = MO.Console.find(MO.FDuiWindowConsole).find(MO.FDuiErrorDialog);
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
MO.FDuiMessageConsole_popup = function FDuiMessageConsole_popup(g){
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
MO.FDuiMessageConsole_close = function FDuiMessageConsole_close(){
   RWindow.setEnable(true);
}

//==========================================================
// <T>界面消息控制台。</T>
//
// @class
// @author maocy
// @version 150409
//==========================================================
MO.FDuiMessageConsole_parse = function FDuiMessageConsole_parse(config){
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
MO.FDuiMessageConsole_check = function FDuiMessageConsole_check(g){
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
