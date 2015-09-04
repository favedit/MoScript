//==========================================================
// <T>树目录控件。</T>
//  hPanel<TABLE>
// ┌-------------------------------------------------------┐
// │ hNodePanel<DIV>                                       │
// │┌---------------------------------------------------┐│
// ││ hNodeForm<TABLE>                                  ││
// ││┌-----------------------------------------------┐││
// │││hHeadLine<TR>                                  │││
// ││├-----------------------------------------------┤││
// │││(Nodes)                                        │││
// ││└-----------------------------------------------┘││
// │└---------------------------------------------------┘│
// └-------------------------------------------------------┘
//
// @control
// @author maocy
// @version 150119
//==========================================================
MO.FDuiDataTreeView = function FDuiDataTreeView(o){
   o = MO.Class.inherits(this, o, MO.FDuiTreeView);
   //..........................................................
   // @property
   o._serviceDefine       = null;
   o._serviceCode         = MO.Class.register(o, new MO.APtyString('_serviceCode', 'service'));
   //..........................................................
   // @attribute
   o._statusLoading       = false;
   // @attribute
   o._listenersDefineLoad = MO.Class.register(o, new MO.AListener('_listenersDefineLoad'));
   o._listenersNodeLoad   = MO.Class.register(o, new MO.AListener('_listenersNodeLoad'));
   //..........................................................
   // @event
   o.onDefineLoad         = MO.FDuiDataTreeView_onDefineLoad;
   o.onNodeLoaded         = MO.FDuiDataTreeView_onNodeLoaded;
   //..........................................................
   // @method
   o.construct            = MO.FDuiDataTreeView_construct;
   // @method
   o.buildNode            = MO.FDuiDataTreeView_buildNode;
   // @method
   o.loadDefine           = MO.FDuiDataTreeView_loadDefine;
   o.loadService          = MO.FDuiDataTreeView_loadService;
   o.loadNode             = MO.FDuiDataTreeView_loadNode;
   // @method
   o.reload               = MO.FDuiDataTreeView_reload;
   o.reloadNode           = MO.FDuiDataTreeView_reloadNode;
   o.reloadParentNode     = MO.FDuiDataTreeView_reloadParentNode;
   // @method
   o.dispose              = MO.FDuiDataTreeView_dispose;
   return o;
}

//==========================================================
// <T>定义加载完成处理。</T>
//
// @method
// @param event:SXmlEvent 事件信息
//==========================================================
MO.FDuiDataTreeView_onDefineLoad = function FDuiDataTreeView_onDefineLoad(event){
   var o = this;
   var xroot = event.root;
   if(xroot == null){
      throw new MO.TError(o, 'Load tree data failure.');
   }
   var xtree = event.xtree = xroot.find('TreeView');
   // 建立内部对象
   MO.Dui.Control.build(o, xtree, null, o._hPanel);
   // 响应事件
   o.processDefineLoadListener(event);
}

//==========================================================
// <T>加载节点信息处理。</T>
//
// @method
// @param event:SXmlEvent 事件信息
//==========================================================
MO.FDuiDataTreeView_onNodeLoaded = function FDuiDataTreeView_onNodeLoaded(event){
   var o = this;
   // 检查结果
   var xroot = event.root;
   if(!xroot){
      throw new MO.TError(o, 'Load tree data failure.');
   }
   // 获得事件信息
   var parentNode = event.connection.parentNode;
   // 加载完毕
   var ln = o._loadingNode;
   if(ln._hPanel.parentElement){
      o._hNodeRows.removeChild(ln._hPanel);
   }
   //o._loadingNode.hide();
   o._statusLoading = false;
   // 加载数据节点
   o.buildNode(parentNode, xroot);
   // 响应事件
   o.processNodeLoadListener(event);
   // 全部展开
   //if(o.extendsAll){
   //    o.extendAll();
   //}
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FDuiDataTreeView_construct = function FDuiDataTreeView_construct(){
   var o = this;
   o.__base.FDuiTreeView.construct.call(o);
}


//==========================================================
// <T>从配置信息建立节点处理。</T>
//
// @method
// @param parent:FDuiTreeNode 目录节点
// @param xconfig:FXmlNode 配置节点
//==========================================================
MO.FDuiDataTreeView_buildNode = function FDuiDataTreeView_buildNode(parent, xconfig){
   var o = this;
   // 加载数据节点
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
            // 建立子节点
            if(xnode.hasNode()){
               o.innerBuildNode(node, xnode);
               node.extend(false);
            }
         }
      }
   }
   // 计算图标
   if(parent){
      parent.calculateImage();
   }
}

//==========================================================
// <T>从网络地址加载数据。</T>
//
// @method
// @param url:String 网络地址
// @param node:FDuiTreeNode 目录节点
//==========================================================
MO.FDuiDataTreeView_loadDefine = function FDuiDataTreeView_loadDefine(code){
   var o = this;
   // 获得地址
   var url = MO.Lang.String.format('/{1}.ws?action=query&code={2}', o._serviceDefine, code);
   // 加载数据
   var connection = MO.Console.find(MO.FXmlConsole).sendAsync(url);
   connection.addLoadListener(o, o.onDefineLoad);
}

//==========================================================
// <T>从服务器获取节点数据。</T>
//
// @method
// @param service:String 服务器端的服务名称
// @param attributes:TAttributes 属性集合
//==========================================================
MO.FDuiDataTreeView_loadService = function FDuiDataTreeView_loadService(serviceCode, attributes){
   var o = this;
   // 检查参数
   MO.Assert.debugNotEmpty(serviceCode);
   o._serviceCode = serviceCode;
   // 清空当前所有节点
   o.clear();
   // 获得服务描述
   var service = MO.RDuiService.parse(serviceCode);
   if(!service){
      throw new MO.TError(o, 'Invalid service code.');
   }
   attributes = MO.Lang.Object.nvl(attributes, o._attributes);
   // 建立加载数据
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
   // 显示加载中的节点
   o._focusNode = null;
   //var ln = o._loadingNode;
   //RHtml.tableMoveRow(o._hNodeForm, ln._hPanel.rowIndex, 0);
   //ln.setLevel(0);
   //ln.show();
   // 连接服务器
   var connection = MO.Console.find(MO.FXmlConsole).sendAsync(service.url, xdocument);
   connection.addLoadListener(o, o.onNodeLoaded);
}

//==========================================================
// <T>加载指定节点的子节点信息。</T>
//
// @method
// @param node:FDuiTreeNode 指定节点
// @param refresh:Boolean 是否刷新
//==========================================================
MO.FDuiDataTreeView_loadNode = function FDuiDataTreeView_loadNode(node, refresh){
   var o = this;
   o._statusLoading = true;
   // 删除当前节点的所有子节点
   node.removeChildren();
   // 查找服务名称
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
   // 查找当前节点向上的第一个命令
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
   // 相应加载节点事件
   var event = new MO.SEvent();
   event.tree = o;
   event.node = node;
   o.processNodeLoadListener(event);
   event.dispose();
   // 建立节点的发送信息
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
   // 展开节点
   node._extended = true;
   if(node._child && node._hImage){
      node._hImage.src = MO.RResource.iconPath(o._iconMinus); 
   }
   // 建立加载中的节点
   var ln = o._loadingNode;
   var lastNode = node.searchLast();
   var nr = lastNode._hPanel.rowIndex;
   o._hNodeRows.appendChild(ln._hPanel);
   MO.Window.Html.tableMoveRow(o._hNodeForm, ln._hPanel.rowIndex, nr + 1);
   ln.setLevel(node.level() + 1);
   //ln.show();
   // 建立事件对象，发送信息
   var url = MO.RDuiService.makeUrl(service.service, action);
   var connection = MO.Console.find(MO.FXmlConsole).sendAsync(url, xd);
   connection.parentNode = node;
   connection.addLoadListener(o, o.onNodeLoaded);
}

//==========================================================
// <T>重新加载树目录。</T>
//
// @method
//==========================================================
MO.FDuiDataTreeView_reload = function FDuiDataTreeView_reload(){
   var o = this;
   o.clear();
   o.loadService(o._serviceCode);
}

//==========================================================
// <T>重新加载节点。</T>
//
// @method
// @param node:FDuiTreeNode 节点对象
//==========================================================
MO.FDuiDataTreeView_reloadNode = function FDuiDataTreeView_reloadNode(node){
   var o = this;
   // 获得操作节点
   var selectNode = MO.Runtime.nvl(node, o._focusNode);
   // 加载节点
   if(!selectNode){
      o.reload();
   }else{
      selectNode.removeChildren();
      o.loadNode(selectNode);
   }
}

//==========================================================
// <T>重新加载节点。</T>
//
// @method
// @param n:node:FDuiTreeNode 节点对象
//==========================================================
MO.FDuiDataTreeView_reloadParentNode = function FDuiDataTreeView_reloadParentNode(node){
   var o = this;
   // 获得操作节点
   var selectNode = MO.Runtime.nvl(node, o._focusNode);
   if(selectNode){
      var parentNode = selectNode.parent();
      if(MO.Class.isClass(parentNode, MO.FDuiTreeNode)){
         selectNode = selectNode.parent();
      }else{
         selectNode = null;
      }
   }
   // 加载节点
   if(!selectNode){
      o.reload();
   }else{
      selectNode.removeChildren();
      o.loadNode(selectNode);
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FDuiDataTreeView_dispose = function FDuiDataTreeView_dispose(){
   var o = this;
   o.__base.FDuiTreeView.dispose.call(o);
}
