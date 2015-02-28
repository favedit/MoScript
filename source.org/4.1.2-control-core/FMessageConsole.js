// ============================================================
// FMessageConsole
// ============================================================
function FMessageConsole(o){
   o = RClass.inherits(this, o, FConsole, MStyle);
   // Constant
   o.scope        = EScope.Global;
   // Attribute
   o.result       = new Array();
   o.attributes   = new Array();
   o.messageBox   = null;
   o.messageWindow = null;
   // Method
   o.parse        = FMessageConsole_parse;
   o.popupMessage = FMessageConsole_popupMessage;
   o.closeMessage = FMessageConsole_closeMessage;
   o.checkResult  = FMessageConsole_checkResult;
   return o;
}
// ------------------------------------------------------------
function FMessageConsole_parse(config){
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
// ------------------------------------------------------------
// g:argument:TMessageArg
function FMessageConsole_popupMessage(g){
   var o = this;
   var w = o.messageWindow;
   if(!w){
      w = o.messageWindow = RControl.create('FMessageWindow');
   }
   w.loadMessages(g);
   w.show();
}
// ------------------------------------------------------------
function FMessageConsole_closeMessage(){
   RWindow.setEnable(true);
}
// ------------------------------------------------------------
function FMessageConsole_checkResult(g){
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
// ------------------------------------------------------------
