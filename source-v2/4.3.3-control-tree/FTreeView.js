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
function FTreeView(o){
   o = RClass.inherits(this, o, FContainer);
   //..........................................................
   // @property
   o._optionCheck     = RClass.register(o, new APtyBoolean('_optionCheck'), false);
   o._indent          = RClass.register(o, new APtyInteger('_indent'), 16);
   //..........................................................
   // @style
   o._stylePanel      = RClass.register(o, new AStyle('_stylePanel', 'Panel'));
   o._styleNodePanel  = RClass.register(o, new AStyle('_styleNodePanel', 'NodePanel'));
   o._styleNodeForm   = RClass.register(o, new AStyle('_styleNodeForm', 'NodeForm'));
   //..........................................................
   // @attribute
   o._attributes      = null;
   o._nodeTypes       = null;
   o._nodeColumns     = null;
   o._nodeLevels      = null;
   o._nodes           = null;
   o._allNodes        = null;
   // @attribute
   o._defaultNodeType = null;
   o._focusNode       = null;
   o._loadingNode     = null;
   o._freeNodes       = null;
   //..........................................................
   // @icon
   o._iconPlus        = 'control.treeview.plus';
   o._iconMinus       = 'control.treeview.minus';
   o._iconNode        = 'control.treeview.node';
   o._iconLoading     = 'control.treeview.loading';
   //..........................................................
   // @html
   o._hNodePanel      = null;
   o._hNodeForm       = null;
   o._hHeadLine       = null;
   o._hNodeRows       = null;
   //..........................................................
   // @listener
   o.lsnsEnter        = new TListeners();
   o.lsnsLeave        = new TListeners();
   o.lsnsClick        = new TListeners();
   //..........................................................
   // @event
   o.onBuildPanel     = FTreeView_onBuildPanel;
   o.onBuild          = FTreeView_onBuild;
   o.onNodeCheckClick = RClass.register(o, new AEventClick('onNodeCheckClick'), FTreeView_onNodeCheckClick);
   //..........................................................
   // @method
   o.construct        = FTreeView_construct;
   // @method
   o.attributes       = FTreeView_attributes;
   o.nodeTypes        = FTreeView_nodeTypes;
   o.nodeColumns      = FTreeView_nodeColumns;
   o.nodeLevels       = FTreeView_nodeLevels;
   o.nodes            = FTreeView_nodes;
   // @method
   o.findType         = FTreeView_findType;
   o.findByName       = FTreeView_findByName;
   o.findByUuid       = FTreeView_findByUuid;
   // @method
   o.createChild      = FTreeView_createChild;
   o.createNode       = FTreeView_createNode;
   o.appendNode       = FTreeView_appendNode;
   o.selectNode       = FTreeView_selectNode;
   o.push             = FTreeView_push;
   o.freeNode         = FTreeView_freeNode;
   // @method
   o.calculateHeight  = FTreeView_calculateHeight;
   o.extendAuto       = FTreeView_extendAuto;
   o.extendAll        = FTreeView_extendAll;
   // @method
   o.loadNode         = RMethod.empty;
   o.refresh          = FTreeView_refresh;
   o.filterNode       = FTreeView_filterNode;
   // @method
   o.clear            = FTreeView_clear;
   // @method
   o.dispose          = FTreeView_dispose;
   return o;
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @return HtmlTag 页面元素
//==========================================================
function FTreeView_onBuildPanel(e){
   var o = this;
   o._hPanel = RBuilder.createTable(e.hDocument, o.styleName('Panel'));
}

//==========================================================
// <T>构建树目录。</T>
//
// @method
// @param p:event:TEventProcess 处理事件
//==========================================================
function FTreeView_onBuild(p){
   var o = this;
   o.__base.FContainer.onBuild.call(o, p);
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
   var ln = o._loadingNode = RClass.create(FTreeNode);
   ln._tree = o;
   ln._label = RContext.get('FTreeView:loading');
   ln._icon = o._iconLoading;
   ln.build(p);
   o.appendNode(ln);
   ln.hide();
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
function FTreeView_onNodeCheckClick(s, e){
   var o = this;
   if(s && RClass.isClass(s, FTreeNode)){
      var f = s.check();
      var cs = s.controls;
      if(cs){
         for(var n = 0; n < cs.count; n++){
            var nd = cs.value(n);
            if(nd && RClass.isClass(nd, FTreeNode)){
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
            for(var n=0; n<pcc; n++){
              var pnd = pcs.value(n);
               if(pnd && RClass.isClass(pnd, FTreeNode)){
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
function FTreeView_construct(){
   var o = this;
   o.__base.FContainer.construct.call(o);
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
   o._defaultNodeType = RClass.create(FTreeNodeType);
}

//==========================================================
// <T>获得属性表。</T>
//
// @method
// @return TAttributes 属性表
//==========================================================
function FTreeView_attributes(){
   return this._attributes;
}

//==========================================================
// <T>获得类型字典。</T>
//
// @method
// @return TDictionary 类型字典
//==========================================================
function FTreeView_nodeTypes(){
   return this._nodeTypes;
}

//==========================================================
// <T>获得分列字典。</T>
//
// @method
// @return TDictionary 分列字典
//==========================================================
function FTreeView_nodeColumns(){
   return this._nodeColumns;
}

//==========================================================
// <T>获得层级字典。</T>
//
// @method
// @return TDictionary 层级字典
//==========================================================
function FTreeView_nodeLevels(){
   return this._nodeLevels;
}

//==========================================================
// <T>获得节点集合。</T>
//
// @method
// @return TObjects 节点集合
//==========================================================
function FTreeView_nodes(){
   return this._nodes;
}

//==========================================================
// <T>根据类型名称查找类型信息。</T>
//
// @method
// @param p:name:String 类型名称
// @return FTreeNodeType 类型信息
//==========================================================
function FTreeView_findType(p){
   return this._nodeTypes.get(p);
}

//==========================================================
// <T>查询所有节点中，找到指定名称的节点。</T>
//
// @method
// @param p:name:String 节点名称
// @return FTreeNode 节点对象
//==========================================================
function FTreeView_findByName(p){
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
// @param p:uuid:String 节点标识
// @return FTreeNode 节点对象
//==========================================================
function FTreeView_findByUuid(p){
   var o = this;
   var ns = o._allNodes;
   var c = ns.count();
   if(c){
      for(var i = 0; i < c; i++){
         var n = ns.get(i);
         if(n._uuid == p){
            return n;
         }
      }
   }
}

//==========================================================
// <T>创建子对象。</T>
//
// @method
// @param x:config:TNode 数据节点
// @return 子对象
//==========================================================
function FTreeView_createChild(x){
   var o = this;
   var r = null;
   var n = x.name();
   switch(n){
      case 'TreeColumn':
         r = RClass.create(FTreeColumn);
         break;
      case 'TreeLevel':
         r = RClass.create(FTreeLevel);
         break;
      case 'TreeNodeType':
         r = RClass.create(FTreeNodeType);
         break;
      case 'TreeNode':
         r = RClass.create(FTreeNode);
         break;
      default:
         throw new TError(o, 'Unknown child type. (config={1})', x.xml());
   }
   r._tree = o;
   return r;
}

//==========================================================
// <T>创建一个树节点。</T>
// <P>如果有删除的节点，则优先复用已删除的节点。</P>
//
// @method
// @return FTreeNode 树节点
//==========================================================
function FTreeView_createNode(){
   var o = this;
   // 创建节点
   var n = o._freeNodes.pop();
   if(!n){
      var n = RClass.create(FTreeNode);
      n._tree = o;
      n.build(o._hPanel);
   }
   // 放入所有节点中
   RHtml.visibleSet(n._hPanel, true);
   o._allNodes.push(n);
   return n;
}

//==========================================================
// <T>追加一个节点到自己到自己的父节点内。</T>
// <P>如果父节点为空，则追加到跟节点下。</P>
//
// @method
// @param n:node:FTreeNode 节点对象
// @param p:parent:FTreeNode 父节点
//==========================================================
function FTreeView_appendNode(n, p){
   var o = this;
   if(!n._statusLinked){
      var nh = n._hPanel;
      if(p){
         // 计算最后一个已经连接节点的位置
         var nl = p.searchLast();
         var nr = nl._hPanel.rowIndex;
         // 关联节点
         if(nh.parentElement){
            if(nh.rowIndex > nr){
               nr++;
            }
            RHtml.tableMoveRow(o._hNodeForm, nh.rowIndex, nr);
         }else{
            o._hNodeRows.appendChild(nh);
            RHtml.tableMoveRow(o._hNodeForm, nh.rowIndex, nr+1);
         }
         // 设置层次
         n.setLevel(p._level + 1);
      }else{
         o._hNodeRows.appendChild(nh);
         n.setLevel(0);
      }
      n._statusLinked = true;
   }
}

//==========================================================
// <T>设置当前树获得焦点的节点。</T>
//
// @method
// @param n:node:FTreeNode 获得焦点的树节点
// @param s:select:Boolean 是否选中
//==========================================================
function FTreeView_selectNode(n, s){
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
// <T>追加控件到自己内部。</T>
//
// @method
// @param p:control:FControl 控件对象
// @return Boolean
//==========================================================
function FTreeView_push(p){
   var o = this;
   o.__base.FContainer.push.call(o, p);
   // 增加节点
   p._tree = o;
   if(RClass.isClass(p, FTreeColumn)){
      o._nodeColumns.set(p.name(), p);
   }else if(RClass.isClass(p, FTreeLevel)){
      o._nodeLevels.set(p.id(), p);
   }else if(RClass.isClass(p, FTreeNodeType)){
      o._nodeTypes.set(p.linker(), p);
   }else if(RClass.isClass(p, FTreeNode)){
      o._nodes.push(p);
      o._allNodes.push(p);
   }
}

//==========================================================
// <T>释放一个树节点。</T>
// <P>从节点表格移出，但是不释放，用来再创建节点时使用。</P>
//
// @method
// @param p:node:FTreeNode 树节点
//==========================================================
function FTreeView_freeNode(p){
   var o = this;
   if(p._statusLinked){
      p._statusLinked = false;
      p.hidden();
      o._allNodes.remove(p);
      o._freeNodes.push(p);
   }
}

//==========================================================
// <T>计算当前高度。</T>
//
// @method
//==========================================================
function FTreeView_calculateHeight(){
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
// <T>展开所有设置过展开的节点。</T>
//
// @method
// @param n:node:FTreeNode 要展开的节点，如果为空，则展开根节点
//==========================================================
function FTreeView_extendAuto(n){
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
// @param n:node:FTreeNode 树的根节点
// @param f:flag:Boolean 是否展开
//==========================================================
function FTreeView_extendAll(n, f){
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
function FTreeView_refresh(){
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
function FTreeView_filterNode(pl, pa){
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
// <T>清空处理。</T>
//
// @method
//==========================================================
function FTreeView_clear(){
   var o = this;
   var ns = o._nodes;
   if(ns){
      var c = ns.count();
      for(var i = c - 1; i >= 0; i--){
         ns.get(i).remove();
      }
      ns.clear();
   }
   o._allNodes.clear();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FTreeView_dispose(){
   var o = this;
   o.__base.FContainer.dispose.call(o);
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
