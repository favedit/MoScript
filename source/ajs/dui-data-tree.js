MO.FDuiDataTreeView = function FDuiDataTreeView(o){
   o = MO.Class.inherits(this, o, MO.FDuiTreeView);
   o._serviceDefine       = null;
   o._serviceCode         = MO.Class.register(o, new MO.APtyString('_serviceCode', 'service'));
   o._statusLoading       = false;
   o._listenersDefineLoad = MO.Class.register(o, new MO.AListener('_listenersDefineLoad'));
   o._listenersNodeLoad   = MO.Class.register(o, new MO.AListener('_listenersNodeLoad'));
   o.onDefineLoad         = MO.FDuiDataTreeView_onDefineLoad;
   o.onNodeLoaded         = MO.FDuiDataTreeView_onNodeLoaded;
   o.construct            = MO.FDuiDataTreeView_construct;
   o.buildNode            = MO.FDuiDataTreeView_buildNode;
   o.loadDefine           = MO.FDuiDataTreeView_loadDefine;
   o.loadService          = MO.FDuiDataTreeView_loadService;
   o.loadNode             = MO.FDuiDataTreeView_loadNode;
   o.reload               = MO.FDuiDataTreeView_reload;
   o.reloadNode           = MO.FDuiDataTreeView_reloadNode;
   o.reloadParentNode     = MO.FDuiDataTreeView_reloadParentNode;
   o.dispose              = MO.FDuiDataTreeView_dispose;
   return o;
}
MO.FDuiDataTreeView_onDefineLoad = function FDuiDataTreeView_onDefineLoad(event){
   var o = this;
   var xroot = event.root;
   if(xroot == null){
      throw new MO.TError(o, 'Load tree data failure.');
   }
   var xtree = event.xtree = xroot.find('TreeView');
   MO.RDuiControl.build(o, xtree, null, o._hPanel);
   o.processDefineLoadListener(event);
}
MO.FDuiDataTreeView_onNodeLoaded = function FDuiDataTreeView_onNodeLoaded(event){
   var o = this;
   var xroot = event.root;
   if(!xroot){
      throw new MO.TError(o, 'Load tree data failure.');
   }
   var parentNode = event.connection.parentNode;
   var ln = o._loadingNode;
   if(ln._hPanel.parentElement){
      o._hNodeRows.removeChild(ln._hPanel);
   }
   o._statusLoading = false;
   o.buildNode(parentNode, xroot);
   o.processNodeLoadListener(event);
}
MO.FDuiDataTreeView_construct = function FDuiDataTreeView_construct(){
   var o = this;
   o.__base.FDuiTreeView.construct.call(o);
}
MO.FDuiDataTreeView_buildNode = function FDuiDataTreeView_buildNode(parent, xconfig){
   var o = this;
   var xnodes = xconfig._nodes;
   if(xnodes){
      var count = xnodes.count();
      for(var i = 0; i < count; i++){
         var xnode = xnodes.get(i);
         if(xnode.isName('TreeNode')){
            var node = o.createNode();
            node.loadConfig(xnode);
            if(parent){
               parent.push(node);
            }else{
               o.push(node);
            }
            o.appendNode(node, parent);
            if(xnode.hasNode()){
               o.innerBuildNode(node, xnode);
               node.extend(false);
            }
         }
      }
   }
   if(parent){
      parent.calculateImage();
   }
}
MO.FDuiDataTreeView_loadDefine = function FDuiDataTreeView_loadDefine(code){
   var o = this;
   var url = MO.Lang.String.format('/{1}.ws?action=query&code={2}', o._serviceDefine, code);
   var connection = MO.Console.find(MO.FXmlConsole).sendAsync(url);
   connection.addLoadListener(o, o.onDefineLoad);
}
MO.FDuiDataTreeView_loadService = function FDuiDataTreeView_loadService(serviceCode, attributes){
   var o = this;
   o._serviceCode = serviceCode;
   o.clear();
   var service = MO.RDuiService.parse(serviceCode);
   if(!service){
      throw new MO.TError(o, 'Invalid service code.');
   }
   attributes = MO.Lang.Object.nvl(attributes, o._attributes);
   var xdocument = new MO.TXmlDocument();
   var xroot = xdocument.root();
   xroot.set('action', service.action);
   MO.Console.find(MO.FDuiEnvironmentConsole).build(xroot);
   if(!attributes.isEmpty()){
      if(MO.Class.isClass(attributes, MO.TNode)){
         xroot.push(attributes);
      }if(MO.Class.isClass(attributes, MO.TAttributes)){
         xroot.create('Tree').attributes = attributes;
         xroot.create('Attributes').attributes = attributes;
      }else{
         xroot.create('Tree').value = attributes;
         xroot.create('Attributes').value = attributes;
      }
   }
   o._focusNode = null;
   var connection = MO.Console.find(MO.FXmlConsole).sendAsync(service.url, xdocument);
   connection.addLoadListener(o, o.onNodeLoaded);
}
MO.FDuiDataTreeView_loadNode = function FDuiDataTreeView_loadNode(node, refresh){
   var o = this;
   o._statusLoading = true;
   node.removeChildren();
   var type = null;
   var findNode = node;
   var serviceCode = o._serviceCode;
   while(MO.Class.isClass(findNode, MO.FDuiTreeNode)){
      type = findNode.type();
      if(type && type._service){
         serviceCode = type._service;
         break;
      }
      findNode = findNode._parent;
   }
   if(!serviceCode){
      throw new MO.TError(o, 'Unknown service code.');
   }
   var service = MO.RDuiService.parse(serviceCode);
   if(!service){
      throw new MO.TError(o, 'Unknown service.');
   }
   var findNode = node;
   while(MO.Class.isClass(fn, MO.FDuiTreeNode)){
      type = findNode.type();
      if(type && type._action){
         break;
      }
      findNode = findNode._parent;
   }
   var action = MO.Lang.String.nvl(type._action, service.action);
   if(!action){
      throw new MO.TError(o, 'Unknown service action.');
   }
   var event = new MO.SEvent();
   event.tree = o;
   event.node = node;
   o.processNodeLoadListener(event);
   event.dispose();
   var xd = new MO.TXmlDocument();
   var x = xd.root();
   x.set('action', action);
   x.set('type', type._linker);
   x.create('Attributes', o._attributes);
   var fn = node;
   while(MO.Class.isClass(fn, MO.FDuiTreeNode)){
      x = x.create('TreeNode');
      fn.propertySave(x);
      fn = fn._parent;
   }
   node._extended = true;
   if(node._child && node._hImage){
      node._hImage.src = MO.RResource.iconPath(o._iconMinus);
   }
   var ln = o._loadingNode;
   var lastNode = node.searchLast();
   var nr = lastNode._hPanel.rowIndex;
   o._hNodeRows.appendChild(ln._hPanel);
   MO.Window.Html.tableMoveRow(o._hNodeForm, ln._hPanel.rowIndex, nr + 1);
   ln.setLevel(node.level() + 1);
   var url = MO.RDuiService.makeUrl(service.service, action);
   var connection = MO.Console.find(MO.FXmlConsole).sendAsync(url, xd);
   connection.parentNode = node;
   connection.addLoadListener(o, o.onNodeLoaded);
}
MO.FDuiDataTreeView_reload = function FDuiDataTreeView_reload(){
   var o = this;
   o.clear();
   o.loadService(o._serviceCode);
}
MO.FDuiDataTreeView_reloadNode = function FDuiDataTreeView_reloadNode(node){
   var o = this;
   var selectNode = MO.Runtime.nvl(node, o._focusNode);
   if(!selectNode){
      o.reload();
   }else{
      selectNode.removeChildren();
      o.loadNode(selectNode);
   }
}
MO.FDuiDataTreeView_reloadParentNode = function FDuiDataTreeView_reloadParentNode(node){
   var o = this;
   var selectNode = MO.Runtime.nvl(node, o._focusNode);
   if(selectNode){
      var parentNode = selectNode.parent();
      if(MO.Class.isClass(parentNode, MO.FDuiTreeNode)){
         selectNode = selectNode.parent();
      }else{
         selectNode = null;
      }
   }
   if(!selectNode){
      o.reload();
   }else{
      selectNode.removeChildren();
      o.loadNode(selectNode);
   }
}
MO.FDuiDataTreeView_dispose = function FDuiDataTreeView_dispose(){
   var o = this;
   o.__base.FDuiTreeView.dispose.call(o);
}
