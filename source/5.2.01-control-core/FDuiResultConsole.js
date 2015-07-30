//==========================================================
// <T>数据结果控制台。</T>
//
// @class
// @author maocy
// @version 150507
//==========================================================
MO.FDuiResultConsole = function FDuiResultConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   // Attribute
   o.scope          = MO.EScope.Page;
   // Method
   o.executeCommand = MO.FDuiResultConsole_executeCommand;
   o.checkService   = MO.FDuiResultConsole_checkService;
   o.checkEvent     = MO.FDuiResultConsole_checkEvent;
   return o;
}
// ------------------------------------------------------------
MO.FDuiResultConsole_executeCommand = function FDuiResultConsole_executeCommand(command){
   var name = command.get('name');
   if(EResultCommand.TreeReload == name){
      var tv = MO.RGlobal.get('catalog.tree');
      if(tv){
         tv.reload();
      }
   }else if(EResultCommand.TreeNodeRefresh == name){
      // var tree = RGlobal.get(command.get('tree'));
      var tv = MO.RGlobal.get('catalog.tree');
      if(tv){
         var uuid = command.get('uuid');
         if(uuid){
            var fn = tv.findByUuid(uuid);
            if(fn){
               tv.reloadNode(fn);
            }else{
               return alert("Can't find tree node. (uuid="+uuid+")");
            }
         }else{
            tv.reloadNode();
         }
      }
   }else if(EResultCommand.TreeParentRefresh == name){
      var tv = MO.RGlobal.get('catalog.tree');
      if(tv){
         var fn = tv.focusNode;
         if(fn){
            tv.reloadNode(fn.parentNode);
         }
      }
   }else if(EResultCommand.PageRedirect == name){
      var action = command.get('action');
      var page = top.MO.RContext.context(command.get('page'));
      if(action){
         page += '?do=' + action;
      }
      fmMain.action = page;
      fmMain.target = '';
      fmMain.submit();
   }
}

//==========================================================
// <T>检查处理结果。</T>
//
// @class
// @author maocy
// @version 150507
//==========================================================
MO.FDuiResultConsole_checkService = function FDuiResultConsole_checkService(config){
   var o = this;
   if(config){
      // 检查消息
      if(!MO.Console.find(MO.FMessageConsole).checkResult(new MO.TMessageArg(config))){
         return false;
      }
      // 检查命令
      var cmdsNode = config.find('Commands');
      if(cmdsNode && cmdsNode.nodes && cmdsNode.nodes.count){
         for(var n=0; n<cmdsNode.nodes.count; n++){
            var node = cmdsNode.node(n);
            if(node.isName('Command')){
               o.executeCommand(node);
            }
         }
      }
      // 如果能够恢复焦点的情况下，自动恢复默认焦点
      MO.Console.find(MO.FFocusConsole).restoreFocus();
   }
   return true;
}

//==========================================================
// <T>检查事件。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
MO.FDuiResultConsole_checkEvent = function FDuiResultConsole_checkEvent(event){
   var o = this;
   var xconfig = event.root;
   if(xconfig){
      // 检查消息
      //if(!RConsole.find(FMessageConsole).checkResult(new TMessageArg(config))){
      //   return false;
      //}
      // 检查命令
      var resultCd = xconfig.get('result_cd');
      if(resultCd == 'success'){
         return true;
      }
      var messageCd = xconfig.get('message_cd');
      var xmessages = xconfig.find('Messages');
      if(xmessages){
         var count = xmessages.nodeCount();
         for(var i = 0; i < count; i++){
            var xmessage = xmessages.node(i);
            if(xmessage.isName('Message')){
               //var typeCd = xmessage.get('type');
               var code = xmessage.get('code');
               var message = xmessage.get('message');
               var description = xmessage.get('description');
               MO.Console.find(MO.FDuiMessageConsole).showError(code, message, description);
               return false;
            }
         }
      }
      // 如果能够恢复焦点的情况下，自动恢复默认焦点
      //RConsole.find(FFocusConsole).restoreFocus();
   }
   return true;
}
