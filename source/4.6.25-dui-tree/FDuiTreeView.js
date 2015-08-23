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
MO.FDuiTreeView = function FDuiTreeView(o){
   o = MO.Class.inherits(this, o, MO.FDuiContainer);
   //..........................................................
   // @property
   o._optionCheck        = MO.Class.register(o, new MO.APtyBoolean('_optionCheck'), false);
   o._indent             = MO.Class.register(o, new MO.APtyInteger('_indent'), 16);
   //..........................................................
   // @style
   o._stylePanel         = MO.Class.register(o, new MO.AStyle('_stylePanel', 'Panel'));
   o._styleNodePanel     = MO.Class.register(o, new MO.AStyle('_styleNodePanel', 'NodePanel'));
   o._styleNodeForm      = MO.Class.register(o, new MO.AStyle('_styleNodeForm', 'NodeForm'));
   //..........................................................
   // @attribute
   o._attributes         = MO.Class.register(o, new MO.AGetter('_attributes'));
   o._nodeTypes          = MO.Class.register(o, new MO.AGetter('_nodeTypes'));
   o._nodeColumns        = MO.Class.register(o, new MO.AGetter('_nodeColumns'));
   o._nodeLevels         = MO.Class.register(o, new MO.AGetter('_nodeLevels'));
   o._nodes              = MO.Class.register(o, new MO.AGetter('_nodes'));
   o._allNodes           = null;
   // @attribute
   o._defaultNodeType    = null;
   o._focusNode          = MO.Class.register(o, new MO.AGetter('_focusNode'));
   o._loadingNode        = null;
   o._freeNodes          = null;
   //..........................................................
   // @icon
   o._iconPlus           = 'control.treeview.plus';
   o._iconMinus          = 'control.treeview.minus';
   o._iconNode           = 'control.treeview.node';
   o._iconLoading        = 'control.treeview.loading';
   //..........................................................
   // @html
   o._hNodePanel         = null;
   o._hNodeForm          = null;
   o._hHeadLine          = null;
   o._hNodeRows          = null;
   //..........................................................
   // @listener
   o._listenersNodeEnter = MO.Class.register(o, new MO.AListener('_listenersNodeEnter'));
   o._listenersNodeLeave = MO.Class.register(o, new MO.AListener('_listenersNodeLeave'));
   o._listenersNodeClick = MO.Class.register(o, new MO.AListener('_listenersNodeClick'));
   //..........................................................
   // @event
   o.onBuildPanel        = MO.FDuiTreeView_onBuildPanel;
   o.onBuild             = MO.FDuiTreeView_onBuild;
   o.onNodeClick         = MO.FDuiTreeView_onNodeClick;
   o.onClick             = MO.Class.register(o, new MO.AEventClick('onClick'), MO.FDuiTreeView_onClick);
   o.onNodeCheckClick    = MO.Class.register(o, new MO.AEventClick('onNodeCheckClick'), MO.FDuiTreeView_onNodeCheckClick);
   //..........................................................
   // @method
   o.construct           = MO.FDuiTreeView_construct;
   // @method
   o.hasNode             = MO.FDuiTreeView_hasNode;
   // @method
   o.findType            = MO.FDuiTreeView_findType;
   o.findByName          = MO.FDuiTreeView_findByName;
   o.findByGuid          = MO.FDuiTreeView_findByGuid;
   // @method
   o.createChild         = MO.FDuiTreeView_createChild;
   o.createNode          = MO.FDuiTreeView_createNode;
   o.appendChild         = MO.FDuiTreeView_appendChild;
   o.appendNode          = MO.FDuiTreeView_appendNode;
   o.appendNodes         = MO.FDuiTreeView_appendNodes;
   o.selectNode          = MO.FDuiTreeView_selectNode;
   o.push                = MO.FDuiTreeView_push;
   o.removeNode          = MO.FDuiTreeView_removeNode;
   o.removeNodes         = MO.FDuiTreeView_removeNodes;
   o.freeNode            = MO.FDuiTreeView_freeNode;
   o.clearNodes          = MO.FDuiTreeView_clearNodes;
   // @method
   o.nodeClick           = MO.FDuiTreeView_nodeClick;
   // @method
   o.calculateHeight     = MO.FDuiTreeView_calculateHeight;
   o.fetchChangedChecks  = MO.FDuiTreeView_fetchChangedChecks;
   o.extendAuto          = MO.FDuiTreeView_extendAuto;
   o.extendAll           = MO.FDuiTreeView_extendAll;
   // @method
   o.loadNode            = MO.Method.empty;
   o.refresh             = MO.FDuiTreeView_refresh;
   o.filterNode          = MO.FDuiTreeView_filterNode;
   // @method
   o.clearAllNodes       = MO.FDuiTreeView_clearAllNodes;
   o.clear               = MO.FDuiTreeView_clear;
   // @method
   o.dispose             = MO.FDuiTreeView_dispose;
   return o;
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @return HtmlTag 页面元素
//==========================================================
MO.FDuiTreeView_onBuildPanel = function FDuiTreeView_onBuildPanel(e){
   var o = this;
   o._hPanel = MO.Window.Builder.createTable(e.hDocument, o.styleName('Panel'));
}

//==========================================================
// <T>构建树目录。</T>
//
// @method
// @param event:TEventProcess 处理事件
//==========================================================
MO.FDuiTreeView_onBuild = function FDuiTreeView_onBuild(event){
   var o = this;
   o.__base.FDuiContainer.onBuild.call(o, event);
   // 关联事件
   var hPanel = o._hPanel;
   o.attachEvent('onClick', hPanel);
   // 构建标题表格
   var hr = MO.Window.Builder.appendTableRow(o._hPanel);
   var hc = MO.Window.Builder.appendTableCell(hr);
   // 构建节点底板
   var hnp = o._hNodePanel = MO.Window.Builder.appendDiv(hc, o.styleName('NodePanel'));
   // 构建节点表格
   var hnf = o._hNodeForm = MO.Window.Builder.appendTable(hnp, o.styleName('NodeForm'));
   hnf.width = '100%';
   // 表格第一行是标题栏
   o._hHeadLine = MO.Window.Builder.appendTableRow(hnf);
   o._hNodeRows = hnf.children[0];
   // 构建加载中节点
   var node = o._loadingNode = MO.Class.create(MO.FDuiTreeNode);
   node._tree = o;
   node._label = MO.RContext.get('FDuiTreeView:loading');
   node._icon = o._iconLoading;
   node.build(event);
   //o.appendNode(node);
   //node.hide();
   // 构建后处理
   var ns = o._nodes;
   if(!ns.isEmpty()){
      var nc = ns.count();
      for(var i = 0; i < nc; i++){
         o.appendNode(ns.get(i));
      }
   }
   o.extendAuto();
   //RConsole.find(FKeyConsole).register(EKey.Esc, new TListener(o, o.clear));
}

//==========================================================
// <T>节点点击事件处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FDuiTreeView_onNodeClick = function FDuiTreeView_onNodeClick(event){
   var o = this;
}

//==========================================================
// <T>响应鼠标点击树节点复选框处理。</T>
//
// @method
// @param s:source:FControl 源控件
// @param e:event:TEvent 事件对象
//==========================================================
MO.FDuiTreeView_onClick = function FDuiTreeView_onClick(s, e){
   var o = this;
   if(s.hSender == o._hNodePanel){
      var node = o._focusNode;
      if(node){
         node.select(false);
         o._focusNode = null;
      }
   }
}

//==========================================================
// <T>响应鼠标点击树节点复选框处理。</T>
//
// @method
// @param s:source:FControl 源控件
// @param e:event:TEvent 事件对象
//==========================================================
MO.FDuiTreeView_onNodeCheckClick = function FDuiTreeView_onNodeCheckClick(s, e){
   var o = this;
   if(s && MO.Class.isClass(s, FDuiTreeNode)){
      var f = s.check();
      var cs = s.controls;
      if(cs){
         for(var n = 0; n < cs.count; n++){
            var nd = cs.value(n);
            if(nd && MO.Class.isClass(nd, FDuiTreeNode)){
               nd.setCheck(f);
            }
         }
      }
      var p = s.parentNode;
      while(p){
         if(f){
            p.setCheck(f);
            p = p.parentNode;
         }else{
            var pcs = p.controls;
            var pcc = pcs.count;
            for(var n = 0; n < pcc; n++){
              var pnd = pcs.value(n);
               if(pnd && MO.Class.isClass(pnd, FDuiTreeNode)){
                  if(pnd.check()){
                     return;
                  }
               }
            }
            p.setCheck(false);
            p = p.parentNode;
         }
      }
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FDuiTreeView_construct = function FDuiTreeView_construct(){
   var o = this;
   o.__base.FDuiContainer.construct.call(o);
   // 初始化变量
   o._attributes = new MO.TAttributes();
   o._nodeTypes = new MO.TDictionary();
   o._nodeColumns = new MO.TDictionary();
   o._nodeLevels = new MO.TDictionary();
   o._nodes = new MO.TObjects();
   o._allNodes = new MO.TObjects();
   // 初始化变量
   o._freeNodes = new MO.TObjects();
   // 创建默认类型
   o._defaultNodeType = MO.Class.create(MO.FDuiTreeNodeType);
}

//==========================================================
// <T>是否含有子节点。</T>
//
// @method
// @return Boolean 是否含有
//==========================================================
MO.FDuiTreeView_hasNode = function FDuiTreeView_hasNode(){
   return this._rootNode.hasChild();
}

//==========================================================
// <T>根据类型名称查找类型信息。</T>
//
// @method
// @param p:name:String 类型名称
// @return FDuiTreeNodeType 类型信息
//==========================================================
MO.FDuiTreeView_findType = function FDuiTreeView_findType(p){
   return this._nodeTypes.get(p);
}

//==========================================================
// <T>查询所有节点中，找到指定名称的节点。</T>
//
// @method
// @param p:name:String 节点名称
// @return FDuiTreeNode 节点对象
//==========================================================
MO.FDuiTreeView_findByName = function FDuiTreeView_findByName(p){
   var o = this;
   var ns = o._allNodes;
   var c = ns.count();
   if(c){
      for(var i = 0; i < c; i++){
         var n = ns.get(i);
         if(n._name == p){
            return n;
         }
      }
   }
}

//==========================================================
// <T>查询所有节点中，找到指定标识的节点。</T>
//
// @method
// @param guid:String 节点标识
// @return FDuiTreeNode 节点对象
//==========================================================
MO.FDuiTreeView_findByGuid = function FDuiTreeView_findByGuid(guid){
   var o = this;
   var nodes = o._allNodes;
   var count = nodes.count();
   if(count){
      for(var i = 0; i < count; i++){
         var node = nodes.getAt(i);
         if(node._guid == guid){
            return node;
         }
      }
   }
}

//==========================================================
// <T>创建子控件。</T>
//
// @method
// @param x:config:TNode 数据节点
// @return 子对象
//==========================================================
MO.FDuiTreeView_createChild = function FDuiTreeView_createChild(x){
   var o = this;
   var r = null;
   var n = x.name();
   switch(n){
      case 'TreeColumn':
         r = MO.Class.create(MO.FDuiTreeColumn);
         break;
      case 'TreeLevel':
         r = MO.Class.create(MO.FDuiTreeLevel);
         break;
      case 'TreeNodeType':
         r = MO.Class.create(MO.FDuiTreeNodeType);
         break;
      case 'TreeNode':
         r = MO.Class.create(MO.FDuiTreeNode);
         break;
      default:
         throw new MO.TError(o, 'Unknown child type. (config={1})', x.xml());
   }
   r._tree = o;
   return r;
}

//==========================================================
// <T>追加子控件。</T>
//
// @method
// @param p:child:FDuiControl 子控件
//==========================================================
MO.FDuiTreeView_appendChild = function FDuiTreeView_appendChild(child){
   var o = this;
   //var hc = o._hHeadLine.insertCell();
   //hc.height = '100%';
   //if(RClass.isClass(child, FTreeColumn)){
   //   hc.appendChild(child._hPanel);
   //}
}

//==========================================================
// <T>创建一个树节点。</T>
// <P>如果有删除的节点，则优先复用已删除的节点。</P>
//
// @method
// @return FDuiTreeNode 树节点
//==========================================================
MO.FDuiTreeView_createNode = function FDuiTreeView_createNode(){
   var o = this;
   // 创建节点
   var node = o._freeNodes.pop();
   if(!node){
      node = MO.Class.create(MO.FDuiTreeNode);
      node._tree = o;
      node.build(o._hPanel);
   }
   // 放入所有节点中
   MO.Window.Html.visibleSet(node._hPanel, true);
   o._allNodes.push(node);
   return node;
}

//==========================================================
// <T>追加一个节点到自己到自己的父节点内。</T>
// <P>如果父节点为空，则追加到跟节点下。</P>
//
// @method
// @param node:FDuiTreeNode 节点对象
// @param parent:FDuiTreeNode 父节点
//==========================================================
MO.FDuiTreeView_appendNode = function FDuiTreeView_appendNode(node, parent){
   var o = this;
   if(node._statusLinked){
      return;
   }
   var hPanel = node._hPanel;
   if(parent){
      // 计算最后一个已经连接节点的位置
      var nl = parent.searchLast();
      var nr = nl._hPanel.rowIndex;
      // 关联节点
      if(hPanel.parentElement){
         if(hPanel.rowIndex > nr){
            nr++;
         }
         MO.Window.Html.tableMoveRow(o._hNodeForm, hPanel.rowIndex, nr);
      }else{
         o._hNodeRows.appendChild(hPanel);
         MO.Window.Html.tableMoveRow(o._hNodeForm, hPanel.rowIndex, nr+1);
      }
      // 设置层次
      node.setLevel(parent._level + 1);
   }else{
      o._hNodeRows.appendChild(hPanel);
      node.setLevel(0);
   }
   node._statusLinked = true;
}

//==========================================================
// <T>把xml解析为节点，添加到一个节点下面。</T>
//
// @method
// @todo: 未修复
// @param parent:parent:FDuiTreeNode 树节点
// @param config:config:TXmlDco XML文件
//==========================================================
MO.FDuiTreeView_appendNodes = function FDuiTreeView_appendNodes(parent, config){
   parent = MO.RObject.nvl(parent, this.workNode, this.rootNode);
   if(config && config._nodes){
      var count = config._nodes.count;
      if(count > 0){
         parent.child = true;
         parent.loaded = true;
         for(var n = 0; n < count; n++){
            var nc = config._nodes.get(n);
            if(nc && (nc.isName('Node') || nc.isName('TreeNode'))){
               var tn = MO.Class.create(FDuiTreeNode);
               tn.parent = parent;
               tn._tree = this;
               tn.loadConfig(nc);
               if(nc._nodes){
                  tn.icon = 'ctl.FBrowser_Folder';
               }else{
                  tn.icon = 'ctl.FBrowser_Txt';
               }
               tn.build(0);
               tn.hide();
               if(nc._nodes){
                  this.tempAppendNodes(tn, nc);
               }
               parent.push(tn);
               this._allNodes.push(tn);
            }
         }
      }
   }
   this.rootNode.extend(true);
}

//==========================================================
// <T>设置当前树获得焦点的节点。</T>
//
// @method
// @param n:node:FDuiTreeNode 获得焦点的树节点
// @param s:select:Boolean 是否选中
//==========================================================
MO.FDuiTreeView_selectNode = function FDuiTreeView_selectNode(n, s){
   var o = this;
   var fn = o._focusNode;
   if(s){
      // 选中节点处理
      if(n){
         if(fn){
            if(fn == n){
               return;
            }
            // 如果选中的不是文件夹，焦点节点才会失去焦点
            if(n.isFolder()){
               fn.select(true);
            }else{
               fn.select(false);
            }
         }
      // 如果选中的不是文件夹，节点才可获得焦点
         if(!n.isFolder()){
            n.select(true);
            o._focusNode = n;
         }
      }
   }else{
      // 非选中节点处理
      if(n){
         n.select(false);
      }
      if(fn){
         fn.select(false);
      }
   }
}

//==========================================================
// <T>增加一个子控件。</T>
//
// @method
// @param control:FControl 控件
//==========================================================
MO.FDuiTreeView_push = function FDuiTreeView_push(control){
   var o = this;
   o.__base.FDuiContainer.push.call(o, control);
   // 增加节点
   control._tree = o;
   if(MO.Class.isClass(control, MO.FDuiTreeColumn)){
      var columnName = control.name();
      MO.Assert.debugNotEmpty(columnName);
      o._nodeColumns.set(columnName, control);
   }else if(MO.Class.isClass(control, MO.FDuiTreeLevel)){
      var levelId = control.id();
      MO.Assert.debugNotEmpty(levelId);
      o._nodeLevels.set(levelId, control);
   }else if(MO.Class.isClass(control, MO.FDuiTreeNodeType)){
      var typeCode = control.code();
      MO.Assert.debugNotEmpty(typeCode);
      o._nodeTypes.set(typeCode, control);
   }else if(MO.Class.isClass(control, MO.FDuiTreeNode)){
      // 追加节点
      o._nodes.push(control);
      o._allNodes.push(control);
      // 追加节点显示
      o.appendNode(control);
   }
}

//==========================================================
// <T>移除一个树节点。</T>
//
// @method
// @todo: 未修复
// @param p:node:FTreeNode 目录节点
//==========================================================
MO.FDuiTreeView_removeNode = function FDuiTreeView_removeNode(oNode){
   var o = this;
   if(oNode){
      var nodes = new Array();
      var oLoopNode = null;
      var nCount = this._allNodes.length;
      for(var n=0; n<nCount; n++){
         oLoopNode = this._allNodes[n];
         if(oLoopNode != oNode){
            nodes[nodes.length] = oLoopNode;
         }
      }
      o._allNodes = nodes;
      var oParent = oNode.parent;
      if(oParent){
         nodes = new Array();
         nCount = oParent._nodes.length;
         for(var n=0; n<nCount; n++){
            oLoopNode = oParent._nodes[n];
            if(oLoopNode != oNode){
               nodes[nodes.length] = oLoopNode;
            }
         }
         oParent._nodes = nodes;
         oNode.parent.childrenHTML.removeChild(oNode.ownerHTML);
      }
      if(oParent._nodes.length == 0){
         oParent.imageHTML.src = o.imgEmpty;
      }
      return true;
   }
   return false;
}

//==========================================================
// <T>移除一个树节点集合。</T>
//
// @method
// @todo: 未修复
// @param u:uuid:String 节点的XML表示字符串
// @return FDuiTreeNode 节点对象
//==========================================================
MO.FDuiTreeView_removeNodes = function FDuiTreeView_removeNodes(node){
   var o = this;
   node = MO.RObject.nvl(node, o.workNode, o.rootNode);
   if(node.hasChild()){
      node.removeChildren();
   }
   node.remove();
}

//==========================================================
// <T>释放一个树节点。</T>
// <P>从节点表格移出，但是不释放，用来再创建节点时使用。</P>
//
// @method
// @param node:FDuiTreeNode 树节点
//==========================================================
MO.FDuiTreeView_freeNode = function FDuiTreeView_freeNode(node){
   var o = this;
   if(node._statusLinked){
      node._statusLinked = false;
      // 隐藏处理
      o._hNodeRows.removeChild(node._hPanel);
      // 释放节点事件
      var cells = node.cells();
      if(cells){
         var cellCount = cells.count();
         for(var i = 0; i < cellCount; i++){
            var cell = cells.at(i);
            cell.clearAllListeners();
         }
      }
      // 移除处理
      o._allNodes.remove(node);
      o._freeNodes.push(node);
   }
}

//==========================================================
// <T>清空指定节点下所有子节点。</T>
//
// @method
// @todo: 未修复
// @param p:node:FDuiTreeNode 树节点
//==========================================================
MO.FDuiTreeView_clearNodes = function FDuiTreeView_clearNodes(node){
   var o = this;
   if(node){
      node.removeChildren();
   }
   var nodes = new Array();
   var oLoopNode = null;
   var nCount = o._allNodes.length;
   for(var n = 0; n < nCount; n++){
      oLoopNode = o._allNodes[n];
      if(oLoopNode.parent != oNode){
         nodes[nodes.length] = oLoopNode;
      }else{
      oNode.childrenHTML.removeChild(oLoopNode.ownerHTML);
      }
   }
   oNode.imageHTML.src = o.imgEmpty ;
   o._allNodes = nodes;
   return true;
}

//==========================================================
// <T>点击目录节点处理。</T>
//
// @method
// @param node:FDuiTreeNode 树节点
//==========================================================
MO.FDuiTreeView_nodeClick = function FDuiTreeView_nodeClick(node){
   var o = this;
   //o.lsnsClick.process(o, node);
   // 分发事件
   var event = new MO.SEvent();
   event.tree = o;
   event.node = node;
   o.onNodeClick(event);
   o.processNodeClickListener(event);
   event.dispose();
}

//==========================================================
// <T>计算当前高度。</T>
//
// @method
//==========================================================
MO.FDuiTreeView_calculateHeight = function FDuiTreeView_calculateHeight(){
   var o = this;
   var ns = o._allNodes;
   var c = ns.count();
   for(var i = 0; i < c; i++){
      var n = ns.get(i);
      if(MO.RHtml.displayGet(n._hPanel)){
         c++;
      }
   }
   return c * 29;
}

//==========================================================
// <T>查找所有选中树节点集合。</T>
//
// @method
// @param u:uuid:String 节点的XML表示字符串
// @return FDuiTreeNode 节点对象
//==========================================================
MO.FDuiTreeView_fetchChangedChecks = function FDuiTreeView_fetchChangedChecks(){
   var o = this;
   // TreeView
   var treeView = new MO.TNode('TreeView');
   treeView.set('name', o.name);
   // TNode
   var rnd = MO.RObject.nvl(o.rootNode, o);
   var cs = rnd.controls;
   for(var n = 0; n < cs.count; n++){
      var c = cs.value(n);
      c.pushChanged(treeView);
   }
   //var fc = RConsole.find(FDatasetConsole);
   //var g = new TDatasetTreeViewArg();
   //fc._treeUpdate(g);
   return treeView;
}

//==========================================================
// <T>展开所有设置过展开的节点。</T>
//
// @method
// @param n:node:FDuiTreeNode 要展开的节点，如果为空，则展开根节点
//==========================================================
MO.FDuiTreeView_extendAuto = function FDuiTreeView_extendAuto(n){
   var o = this;
   var ns = n ? n._nodes : o._nodes;
   if(ns){
      var nc = ns.count;
      if(nc){
         for(var i = 0; i < nc; i++){
            var fn = ns.get(i);
            fn.extend(fn._extended);
            if(fn._extended){
               o.extendAuto(fn);
            }
         }
      }
   }
}

//==========================================================
// <T>展开所有的节点。</T>
//
// @method
// @param n:node:FDuiTreeNode 树的根节点
// @param f:flag:Boolean 是否展开
//==========================================================
MO.FDuiTreeView_extendAll = function FDuiTreeView_extendAll(n, f){
   var o = this;
   var ns = n ? n._nodes : o._nodes;
   if(ns){
      var nc = ns.count();
      if(nc){
         for(var i = 0; i < nc; i++){
            var fn = ns.get(i);
            fn.extend(f);
            o.extendAll(fn, f);
         }
      }
   }
}

//==========================================================
// <T>刷新处理。</T>
//
// @method
//==========================================================
MO.FDuiTreeView_refresh = function FDuiTreeView_refresh(){
   var o = this;
   if(o.parentObj){
      o.parentObj.style.height = o.calculateHeight();
   }
}

//==========================================================
// <T>根据条件过滤显示节点列表。</T>
//
// @method
// @param pl:label:String 标签
// @param pa:String:String 属性集合
//==========================================================
MO.FDuiTreeView_filterNode = function FDuiTreeView_filterNode(pl, pa){
   var o = this;
   var nc = o._allNodes.count();
   var nl = null;
   var na = null;
   if(!pl){
      for(var i = 0; i < nc; i++){
         var n = o._allNodes.get(i);
         if(!n.isDelete){
            n.show(true);
         }
      }
   }else{
      label = label.toLowerCase();
      var arAttr = null;
      var nAttrCount = 0;
      if(pa){
         pa = pa.toLowerCase();
         arAttr = pa.split("|");
         nAttrCount = arAttr.length;
      }
      for(var i = 0; i < nc; i++){
         var n = o._allNodes.get(i);
         if(!n.isDelete){
            nl = n.label.toLowerCase();
            if(arAttr){
               na = n.linkAttr.toLowerCase();
               for(var s = 0; s < nAttrCount; s++){
                  if(na.indexOf(arAttr[s]) != -1){
                     n.show((nl.indexOf(label) != -1));
                     break;
                  }
               }
            }else{
               n.show((nl.indexOf(label) != -1));
            }
         }
      }
   }
}

//==========================================================
// <T>清空所有节点。</T>
//
// @method
//==========================================================
MO.FDuiTreeView_clearAllNodes = function FDuiTreeView_clearAllNodes(){
   var o = this;
   // 清空节点
   var nodes = o._nodes;
   if(nodes){
      var count = nodes.count();
      for(var i = count - 1; i >= 0; i--){
         nodes.get(i).removeSelf();
      }
      nodes.clear();
   }
   o._allNodes.clear();
   // 清空焦点
   o._focusNode = null;
}

//==========================================================
// <T>清空处理。</T>
//
// @method
//==========================================================
MO.FDuiTreeView_clear = function FDuiTreeView_clear(){
   var o = this;
   o.clearAllNodes();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FDuiTreeView_dispose = function FDuiTreeView_dispose(){
   var o = this;
   // 清空属性
   o._nodes = MO.Lang.Object.dispose(o._nodes);
   o._allNodes = MO.Lang.Object.dispose(o._nodes);
   // 清空属性
   o._hNodePanel = null;
   o._hNodeForm = null;
   o._hHeadLine = null;
   // 父处理
   o.__base.FDuiContainer.dispose.call(o);
}
