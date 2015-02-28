// ============================================================
// FResultConsole
// ============================================================
function FResultConsole(o){
   o = RClass.inherits(this, o, FConsole);
   // Attribute
   o.scope          = EScope.Page;
   // Method
   o.executeCommand = FResultConsole_executeCommand;
   o.checkService   = FResultConsole_checkService;
   return o;
}
// ------------------------------------------------------------
function FResultConsole_executeCommand(command){
   var name = command.get('name');
   if(EResultCommand.TreeReload == name){
      var tv = RGlobal.get('catalog.tree');
      if(tv){
         tv.reload();
      }
   }else if(EResultCommand.TreeNodeRefresh == name){
      // var tree = RGlobal.get(command.get('tree'));
      var tv = RGlobal.get('catalog.tree');
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
      var tv = RGlobal.get('catalog.tree');
      if(tv){
         var fn = tv.focusNode;
         if(fn){
            tv.reloadNode(fn.parentNode);
         }
      }
   }else if(EResultCommand.PageRedirect == name){
      var action = command.get('action');
      var page = top.RContext.context(command.get('page'));
      if(action){
         page += '?do=' + action;
      }
      fmMain.action = page;
      fmMain.target = '';
      fmMain.submit();
   }
}
// ------------------------------------------------------------
function FResultConsole_checkService(config){
   var o = this;
   if(config){
      // 检查消息
      if(!RConsole.find(FMessageConsole).checkResult(new TMessageArg(config))){
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
      RConsole.find(FFocusConsole).restoreFocus();
   }
   return true;
}
// ------------------------------------------------------------
