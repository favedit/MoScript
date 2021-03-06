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
function FUiTreeView(o){
   o = RClass.inherits(this, o, FUiContainer);
   //..........................................................
   // @property
   o._optionCheck       = RClass.register(o, new APtyBoolean('_optionCheck'), false);
   o._indent            = RClass.register(o, new APtyInteger('_indent'), 16);
   //..........................................................
   // @style
   o._stylePanel        = RClass.register(o, new AStyle('_stylePanel', 'Panel'));
   o._styleNodePanel    = RClass.register(o, new AStyle('_styleNodePanel', 'NodePanel'));
   o._styleNodeForm     = RClass.register(o, new AStyle('_styleNodeForm', 'NodeForm'));
   //..........................................................
   // @attribute
   o._attributes        = null;
   o._nodeTypes         = null;
   o._nodeColumns       = null;
   o._nodeLevels        = null;
   o._nodes             = null;
   o._allNodes          = null;
   // @attribute
   o._defaultNodeType   = null;
   o._focusNode         = null;
   o._loadingNode       = null;
   o._freeNodes         = null;
   //..........................................................
   // @icon
   o._iconPlus          = 'control.treeview.plus';
   o._iconMinus         = 'control.treeview.minus';
   o._iconNode          = 'control.treeview.node';
   o._iconLoading       = 'control.treeview.loading';
   //..........................................................
   // @html
   o._hNodePanel        = null;
   o._hNodeForm         = null;
   o._hHeadLine         = null;
   o._hNodeRows         = null;
   //..........................................................
   // @listener
   o.lsnsEnter          = new TListeners();
   o.lsnsLeave          = new TListeners();
   o.lsnsClick          = new TListeners();
   //..........................................................
   // @event
   o.onBuildPanel       = FUiTreeView_onBuildPanel;
   o.onBuild            = FUiTreeView_onBuild;
   o.onClick            = RClass.register(o, new AEventClick('onClick'), FUiTreeView_onClick);
   o.onNodeCheckClick   = RClass.register(o, new AEventClick('onNodeCheckClick'), FUiTreeView_onNodeCheckClick);
   //..........................................................
   // @method
   o.construct          = FUiTreeView_construct;
   // @method
   o.attributes         = FUiTreeView_attributes;
   o.nodeTypes          = FUiTreeView_nodeTypes;
   o.nodeColumns        = FUiTreeView_nodeColumns;
   o.nodeLevels         = FUiTreeView_nodeLevels;
   o.hasNode            = FUiTreeView_hasNode;
   o.focusNode          = FUiTreeView_focusNode;
   o.nodes              = FUiTreeView_nodes;
   // @method
   o.findType           = FUiTreeView_findType;
   o.findByName         = FUiTreeView_findByName;
   o.findByGuid         = FUiTreeView_findByGuid;
   // @method
   o.createChild        = FUiTreeView_createChild;
   o.createNode         = FUiTreeView_createNode;
   o.appendChild        = FUiTreeView_appendChild;
   o.appendNode         = FUiTreeView_appendNode;
   o.appendNodes        = FUiTreeView_appendNodes;
   o.selectNode         = FUiTreeView_selectNode;
   o.push               = FUiTreeView_push;
   o.removeNode         = FUiTreeView_removeNode;
   o.removeNodes        = FUiTreeView_removeNodes;
   o.freeNode           = FUiTreeView_freeNode;
   o.clearNodes         = FUiTreeView_clearNodes;
   // @method
   o.calculateHeight    = FUiTreeView_calculateHeight;
   o.fetchChangedChecks = FUiTreeView_fetchChangedChecks;
   o.extendAuto         = FUiTreeView_extendAuto;
   o.extendAll          = FUiTreeView_extendAll;
   // @method
   o.loadNode           = RMethod.empty;
   o.refresh            = FUiTreeView_refresh;
   o.filterNode         = FUiTreeView_filterNode;
   // @method
   o.clearAllNodes      = FUiTreeView_clearAllNodes;
   o.clear              = FUiTreeView_clear;
   // @method
   o.dispose            = FUiTreeView_dispose;
   return o;
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @return HtmlTag 页面元素
//==========================================================
function FUiTreeView_onBuildPanel(e){
   var o = this;
   o._hPanel = RBuilder.createTable(e.hDocument, o.styleName('Panel'));
}

//==========================================================
// <T>构建树目录。</T>
//
// @method
// @param event:TEventProcess 处理事件
//==========================================================
function FUiTreeView_onBuild(event){
   var o = this;
   o.__base.FUiContainer.onBuild.call(o, event);
   // 关联事件
   var hPanel = o._hPanel;
   o.attachEvent('onClick', hPanel);
   // 构建标题表格
   var hr = RBuilder.appendTableRow(o._hPanel);
   var hc = RBuilder.appendTableCell(hr);
   // 构建节点底板
   var hnp = o._hNodePanel = RBuilder.appendDiv(hc, o.styleName('NodePanel'));
   // 构建节点表格
   var hnf = o._hNodeForm = RBuilder.appendTable(hnp, o.styleName('NodeForm'));
   hnf.width = '100%';
   // 表格第一行是标题栏
   o._hHeadLine = RBuilder.appendTableRow(hnf);
   o._hNodeRows = hnf.children[0];
   // 构建加载中节点
   var node = o._loadingNode = RClass.create(FUiTreeNode);
   node._tree = o;
   node._label = RContext.get('FUiTreeView:loading');
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
// <T>响应鼠标点击树节点复选框处理。</T>
//
// @method
// @param s:source:FControl 源控件
// @param e:event:TEvent 事件对象
//==========================================================
function FUiTreeView_onClick(s, e){
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
function FUiTreeView_onNodeCheckClick(s, e){
   var o = this;
   if(s && RClass.isClass(s, FUiTreeNode)){
      var f = s.check();
      var cs = s.controls;
      if(cs){
         for(var n = 0; n < cs.count; n++){
            var nd = cs.value(n);
            if(nd && RClass.isClass(nd, FUiTreeNode)){
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
               if(pnd && RClass.isClass(pnd, FUiTreeNode)){
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
function FUiTreeView_construct(){
   var o = this;
   o.__base.FUiContainer.construct.call(o);
   // 初始化变量
   o._attributes = new TAttributes();
   o._nodeTypes = new TDictionary();
   o._nodeColumns = new TDictionary();
   o._nodeLevels = new TDictionary();
   o._nodes = new TObjects();
   o._allNodes = new TObjects();
   // 初始化变量
   o._freeNodes = new TObjects();
   // 创建默认类型
   o._defaultNodeType = RClass.create(FUiTreeNodeType);
}

//==========================================================
// <T>获得属性表。</T>
//
// @method
// @return TAttributes 属性表
//==========================================================
function FUiTreeView_attributes(){
   return this._attributes;
}

//==========================================================
// <T>获得类型字典。</T>
//
// @method
// @return TDictionary 类型字典
//==========================================================
function FUiTreeView_nodeTypes(){
   return this._nodeTypes;
}

//==========================================================
// <T>获得分列字典。</T>
//
// @method
// @return TDictionary 分列字典
//==========================================================
function FUiTreeView_nodeColumns(){
   return this._nodeColumns;
}

//==========================================================
// <T>获得层级字典。</T>
//
// @method
// @return TDictionary 层级字典
//==========================================================
function FUiTreeView_nodeLevels(){
   return this._nodeLevels;
}

//==========================================================
// <T>是否含有子节点。</T>
//
// @method
// @return Boolean 是否含有
//==========================================================
function FUiTreeView_hasNode(){
   return this._rootNode.hasChild();
}

//==========================================================
// <T>获得焦点节点。</T>
//
// @method
// @return FTreeNode 焦点节点
//==========================================================
function FUiTreeView_focusNode(){
   return this._focusNode;
}

//==========================================================
// <T>获得节点集合。</T>
//
// @method
// @return TObjects 节点集合
//==========================================================
function FUiTreeView_nodes(){
   return this._nodes;
}

//==========================================================
// <T>根据类型名称查找类型信息。</T>
//
// @method
// @param p:name:String 类型名称
// @return FUiTreeNodeType 类型信息
//==========================================================
function FUiTreeView_findType(p){
   return this._nodeTypes.get(p);
}

//==========================================================
// <T>查询所有节点中，找到指定名称的节点。</T>
//
// @method
// @param p:name:String 节点名称
// @return FUiTreeNode 节点对象
//==========================================================
function FUiTreeView_findByName(p){
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
// @return FUiTreeNode 节点对象
//==========================================================
function FUiTreeView_findByGuid(guid){
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
function FUiTreeView_createChild(x){
   var o = this;
   var r = null;
   var n = x.name();
   switch(n){
      case 'TreeColumn':
         r = RClass.create(FUiTreeColumn);
         break;
      case 'TreeLevel':
         r = RClass.create(FUiTreeLevel);
         break;
      case 'TreeNodeType':
         r = RClass.create(FUiTreeNodeType);
         break;
      case 'TreeNode':
         r = RClass.create(FUiTreeNode);
         break;
      default:
         throw new TError(o, 'Unknown child type. (config={1})', x.xml());
   }
   r._tree = o;
   return r;
}

//==========================================================
// <T>追加子控件。</T>
//
// @method
// @param p:child:FUiControl 子控件
//==========================================================
function FUiTreeView_appendChild(child){
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
// @return FUiTreeNode 树节点
//==========================================================
function FUiTreeView_createNode(){
   var o = this;
   // 创建节点
   var node = o._freeNodes.pop();
   if(!node){
      node = RClass.create(FUiTreeNode);
      node._tree = o;
      node.build(o._hPanel);
   }
   // 放入所有节点中
   RHtml.visibleSet(node._hPanel, true);
   o._allNodes.push(node);
   return node;
}

//==========================================================
// <T>追加一个节点到自己到自己的父节点内。</T>
// <P>如果父节点为空，则追加到跟节点下。</P>
//
// @method
// @param node:FUiTreeNode 节点对象
// @param parent:FUiTreeNode 父节点
//==========================================================
function FUiTreeView_appendNode(node, parent){
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
         RHtml.tableMoveRow(o._hNodeForm, hPanel.rowIndex, nr);
      }else{
         o._hNodeRows.appendChild(hPanel);
         RHtml.tableMoveRow(o._hNodeForm, hPanel.rowIndex, nr+1);
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
// @param parent:parent:FUiTreeNode 树节点
// @param config:config:TXmlDco XML文件
//==========================================================
function FUiTreeView_appendNodes(parent, config){
   parent = RObject.nvl(parent, this.workNode, this.rootNode);
   if(config && config._nodes){
      var count = config._nodes.count;
      if(count > 0){
         parent.child = true;
         parent.loaded = true;
         for(var n = 0; n < count; n++){
            var nc = config._nodes.get(n);
            if(nc && (nc.isName('Node') || nc.isName('TreeNode'))){
               var tn = RClass.create(FUiTreeNode);
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
// @param n:node:FUiTreeNode 获得焦点的树节点
// @param s:select:Boolean 是否选中
//==========================================================
function FUiTreeView_selectNode(n, s){
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
function FUiTreeView_push(control){
   var o = this;
   o.__base.FUiContainer.push.call(o, control);
   // 增加节点
   control._tree = o;
   if(RClass.isClass(control, FUiTreeColumn)){
      o._nodeColumns.set(control.name(), control);
   }else if(RClass.isClass(control, FUiTreeLevel)){
      o._nodeLevels.set(control.id(), control);
   }else if(RClass.isClass(control, FUiTreeNodeType)){
      o._nodeTypes.set(control.code(), control);
   }else if(RClass.isClass(control, FUiTreeNode)){
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
function FUiTreeView_removeNode(oNode){
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
// @return FUiTreeNode 节点对象
//==========================================================
function FUiTreeView_removeNodes(node){
   node = RObject.nvl(node, this.workNode, this.rootNode);
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
// @param node:FUiTreeNode 树节点
//==========================================================
function FUiTreeView_freeNode(node){
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
// @param p:node:FUiTreeNode 树节点
//==========================================================
function FUiTreeView_clearNodes(node){
   if(node){
      node.removeChildren();
   }
   var nodes = new Array();
   var oLoopNode = null;
   var nCount = this._allNodes.length;
   for(var n=0; n<nCount; n++){
      oLoopNode = this._allNodes[n];
      if(oLoopNode.parent != oNode){
         nodes[nodes.length] = oLoopNode;
      }else{
      oNode.childrenHTML.removeChild(oLoopNode.ownerHTML);
      }
   }
   oNode.imageHTML.src = this.imgEmpty ;
   this._allNodes = nodes;
   return true;
}

//==========================================================
// <T>计算当前高度。</T>
//
// @method
//==========================================================
function FUiTreeView_calculateHeight(){
   var o = this;
   var ns = o._allNodes;
   var c = ns.count();
   for(var i = 0; i < c; i++){
      var n = ns.get(i);
      if(RHtml.displayGet(n._hPanel)){
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
// @return FUiTreeNode 节点对象
//==========================================================
function FUiTreeView_fetchChangedChecks(){
   var o = this;
   // TreeView
   var treeView = new TNode('TreeView');
   treeView.set('name', o.name);
   // TNode
   var rnd = RObject.nvl(o.rootNode, o);
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
// @param n:node:FUiTreeNode 要展开的节点，如果为空，则展开根节点
//==========================================================
function FUiTreeView_extendAuto(n){
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
// @param n:node:FUiTreeNode 树的根节点
// @param f:flag:Boolean 是否展开
//==========================================================
function FUiTreeView_extendAll(n, f){
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
function FUiTreeView_refresh(){
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
function FUiTreeView_filterNode(pl, pa){
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
function FUiTreeView_clearAllNodes(){
   var o = this;
   var nodes = o._nodes;
   if(nodes){
      var count = nodes.count();
      for(var i = count - 1; i >= 0; i--){
         nodes.get(i).removeSelf();
      }
      nodes.clear();
   }
   o._allNodes.clear();
}

//==========================================================
// <T>清空处理。</T>
//
// @method
//==========================================================
function FUiTreeView_clear(){
   var o = this;
   o.clearAllNodes();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FUiTreeView_dispose(){
   var o = this;
   o.__base.FUiContainer.dispose.call(o);
   // 清空属性
   var ns = o._nodes;
   if(ns){
      ns.dispose();
      o._nodes = null;
   }
   // 清空属性
   var ns = o._allNodes;
   if(ns){
      ns.dispose();
      o._allNodes = null;
   }
   // 清空属性
   o._hNodePanel = null;
   o._hNodeForm = null;
   o._hHeadLine = null;
   return true;
}
