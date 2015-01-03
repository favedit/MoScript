//==========================================================
// 树目录的容器类
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
// @class FContainer
// @author maochunyang
// @version 1.0.1
//==========================================================
function FTreeView(o){
   o = RClass.inherits(this, o, FContainer);
   //..........................................................
   // @property
   o.dispChecked      = RClass.register(o, new TPtyBool('dispChecked'), false);
   //o.dispChecked      = true;
   o.service          = RClass.register(o, new TPtyStr('service'));
   o.queryService     = RClass.register(o, new TPtyStr('queryService'));
   o.indent           = RClass.register(o, new TPtyInt('indent', 16));
   //..........................................................
   // @style
   o.stNodePanel      = RClass.register(o, new TStyle('NodePanel'));
   o.stNodeForm       = RClass.register(o, new TStyle('NodeForm'));
   //..........................................................
   // @icon
   o.iconNode         = 'ctl.tv-node';
   o.iconPlus         = 'ctl.tv-plus';
   o.iconMinus        = 'ctl.tv-minus';
   //..........................................................
   // @attribute
   o.__loading        = false;
   o.__loadingNode    = null;
   o.focusNode        = null;
   o.type             = null;
   o.allNodes         = null;
   o.dispNodeCount    = null;
   o.nodes            = null;
   o.freeNodes        = null;
   o.attributes       = null;
   o.types            = null;
   o.columns          = null;
   o.levels           = null;
   //..........................................................
   // @html
   o.hNodePanel       = null;
   o.hNodeForm        = null;
   o.hHeadLine        = null;
   //..........................................................
   // @listener
   o.lsnsEnter        = new TListeners();
   o.lsnsLeave        = new TListeners();
   o.lsnsLoad         = new TListeners();
   o.lsnsLoaded       = new TListeners();
   o.lsnsClick        = new TListeners();
   //..........................................................
   // @event
   o.onNodeCheckClick = RClass.register(o, new HClick('onNodeCheckClick'), FTreeView_onNodeCheckClick);
   o.onLoaded         = FTreeView_onLoaded;
   o.onQueryLoaded    = FTreeView_onQueryLoaded;
   o.onBuildPanel     = RBuilder.onBuildTablePanel;
   //..........................................................
   // @process
   o.oeBuild          = FTreeView_oeBuild;
   //..........................................................
   // @method
   o.construct        = FTreeView_construct;
   o.connect          = FTreeView_connect;
   o.findByName       = FTreeView_findByName;
   o.findByUuid       = FTreeView_findByUuid;
   o.selectNode       = FTreeView_selectNode;
   o.extendAuto       = FTreeView_extendAuto;
   o.extendAll        = FTreeView_extendAll;
   o.createChild      = FTreeView_createChild;
   o.createNode       = FTreeView_createNode;
   o.appendNode       = FTreeView_appendNode;
   o.loadNode         = FTreeView_loadNode;
   o.freeNode         = FTreeView_freeNode;
   o.push             = FTreeView_push;
   o.reload           = FTreeView_reload;
   o.reloadNode       = FTreeView_reloadNode;
   o.doQuery          = FTreeView_doQuery;
   o.clear            = FTreeView_clear;
   o.dispose          = FTreeView_dispose;
   o.getTreeHeight    = FTreeView_getTreeHeight;
   o.resetTreeHeight  = FTreeView_resetTreeHeight;








   //..........................................................
   // @method
   o.filterNode       = FTreeView_filterNode;
   o.removeNode       = FTreeView_removeNode;
   o.clearNodes       = FTreeView_clearNodes;
   o.haveNodes        = FTreeView_haveNodes;
   o.release          = FTreeView_release;
   o.getChangedChecks = FTreeView_getChangedChecks;
   o.fetchExtendsAll  = FTreeView_fetchExtendsAll;
   o.tempAppendNodes  = FTreeView_tempAppendNodes;
   o.removeNodes      = FTreeView_removeNodes;
   o.tempAppendChild  = FTreeView_tempAppendChild;
   return o;
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
// <T>加载取回的服务器数据。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FTreeView_onLoaded(e){
   var o = this;
   var xd = e.document;
   if(xd){
      var ne = e.node;
      // 加载完毕
      o.__loadingNode.hide();
      o.__loading = false;
      // 加载数据节点
      var xr = xd.root();
      var xns = xr.nodes;
      if(xns){
         var xnc = xns.count;
         for(var i=0; i<xnc; i++){
            var xn = xns.get(i);
            if(xn.isName('TreeNode')){
               var n = o.createNode();
               n.loadNode(xn);
               if(ne){
                  ne.push(n);
               }else{
                  o.push(n);
               }
               o.appendNode(n, ne);
            }
         }
      }
      // 响应事件
      o.lsnsLoaded.process(o, e.node);
      // 全部展开
      if(o.extendsAll){
          o.extendAll();
      }
   }
}

//==========================================================
// <T>加载取回的服务器数据。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FTreeView_onQueryLoaded(e){
   var o = this;
   var doc = e.document;
   if(doc){
      var tvn = doc.root().find('TreeView');
      if(tvn && tvn.nodes){
         var nc = tvn.nodes.count;
         for(var n=0; n<nc; n++){
            var nd = tvn.nodes.get(n);
            if(nd.isName('TreeNode')){
               var nm = nd.get('name');
               var fd = o.findByName(nm);
               if(fd){
                  fd.loadQuery(nd);
               }
            }
         }
      }
   }
}

//==========================================================
// <T>构建树目录。</T>
//
// @method
// @param e:event:TEvent 构建事件
//==========================================================
function FTreeView_oeBuild(e){
   var o = this;
   var r = o.base.FContainer.oeBuild.call(o, e);
   if(e.isBefore()){
      // 构建标题表格
      var hc = o.hPanel.insertRow().insertCell();
      // 构建节点底板(DIV)
      var hnp = o.hNodePanel = RBuilder.appendDiv(hc, o.style('NodePanel'));
      // 构建节点表格
      var hnf = o.hNodeForm = RBuilder.appendTable(hnp, o.style('NodeForm'));
      // 表格第一行是标题栏
      o.hHeadLine = hnf.insertRow();
      o.hNodeRows = hnf.children[0];
      // 构建加载中节点
      var ln = o.__loadingNode = RClass.create(FTreeNode);
      ln.tree = o;
      ln.label = RContext.get('FTreeView:loading');
      ln.icon = 'ctl.tv-load';
      ln.psBuild();
      o.appendNode(ln);
      ln.hide();
   }else if(e.isAfter()){
      var ns = o.nodes;
      if(!ns.isEmpty()){
         var nc = ns.count;
         for(var i=0; i<nc; i++){
            o.appendNode(ns.get(i));
         }
      }
      o.extendAuto();
      //RConsole.find(FKeyConsole).register(EKey.Esc, new TListener(o, o.clear));
   }
   return r;
}

//==========================================================
// <T>构造函数。</T>
//
// @method
//==========================================================
function FTreeView_construct(){
   var o = this;
   o.base.FContainer.construct.call(o);
   // 初始化变量
   o.nodes = new TList();
   o.allNodes = new TList();
   o.freeNodes = new TList();
   o.attributes = new TAttributes();
   o.types = new TMap();
   o.columns = new TMap();
   o.levels = new TMap();
   // 创建默认类型
   o.type = RClass.create(FTreeNodeType);
}

//==========================================================
// <T>从服务器获取节点数据。</T>
//
// @method
// @param service:service:String 服务器端的服务名称
//==========================================================
function FTreeView_connect(service, attrs){
   var o = this;
   var svc = RService.parse(RString.nvl(service, this.service));
   if(!svc){
      return alert('Unknown service');
   }
   attrs = RObject.nvl(attrs, o.attributes);
   // 建立加载数据
   var xd = new TXmlDocument();
   var xr = xd.root();
   xr.set('action', svc.action);
   RConsole.find(FEnvConsole).build(xr);
   if(!attrs.isEmpty()){
      if(RClass.isClass(attrs, TNode)){
         xr.push(attrs);
      }if(RClass.isClass(attrs, TAttributes)){
         xr.create('Tree').attrs = attrs;
         xr.create('Attributes').attrs = attrs;
      }else{
         xr.create('Tree').value = attrs;
         xr.create('Attributes').value = attrs;
      }
   }
   // 显示加载中的节点
   var ln = o.__loadingNode;
   RHtml.tableMoveRow(o.hNodeForm, ln.hPanel.rowIndex, 0);
   ln.setLevel(0);
   ln.show();
   // 连接服务器
   var e = new TEvent(o, EXmlEvent.Send, o.onLoaded);
   e.url = svc.url;
   e.document = xd;
   RConsole.find(FXmlConsole).process(e);
}

//==========================================================
// <T>查询所有节点中，找到指定名称的节点。</T>
//
// @method
// @param u:uuid:String 节点的XML表示字符串
// @return FTreeNode 节点对象
//==========================================================
function FTreeView_findByName(n){
   var o = this;
   var ns = o.allNodes;
   var nc = ns.count;
   if(nc){
      for(var i=0; i<nc; i++){
         var fn = ns.get(i);
         if(fn.name == n){
            return fn;
         }
      }
   }
}

//==========================================================
// <T>查询所有节点中，找到指定标识的节点。</T>
//
// @method
// @param u:uuid:String 节点的XML表示字符串
// @return FTreeNode 节点对象
//==========================================================
function FTreeView_findByUuid(u){
   var o = this;
   var ns = o.allNodes;
   var nc = ns.count;
   if(nc){
      for(var i=0; i<nc; i++){
         var fn = ns.get(i);
         if(fn.uuid == u){
            return fn;
         }
      }
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
   var fn = o.focusNode;
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
            o.focusNode = n;
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
// <T>展开所有设置过展开的节点。</T>
//
// @method
// @param n:node:FTreeNode 要展开的节点，如果为空，则展开根节点
//==========================================================
function FTreeView_extendAuto(n){
   var o = this;
   var ns = n ? n.nodes : o.nodes;
   if(ns){
      var nc = ns.count;
      if(nc){
         for(var i=0; i<nc; i++){
            var fn = ns.get(i);
            fn.extend(fn.extended);
            if(fn.extended){
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
//==========================================================
function FTreeView_extendAll(n){
   var o = this;
   var ns = n ? n.nodes : o.nodes;
   if(ns){
      var nc = ns.count;
      if(nc){
         for(var i=0; i<nc; i++){
            var fn = ns.get(i);
            fn.extend(true);
            o.extendAll(fn);
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
   if(x.isName('Column') || x.isName('TreeColumn')){
      r = RClass.create(FTreeColumn);
   }else if(x.isName('Level') || x.isName('TreeLevel')){
      r = RClass.create(FTreeLevel);
   }else if(x.isName('Type') || x.isName('TreeNodeType')){
      r = RClass.create(FTreeNodeType);
   }else if(x.isName('Node') || x.isName('TreeNode')){
      r = RClass.create(FTreeNode);
   }else{
      RMessage.fatal(o, null, 'Unknown child type (config={0})', x.xml());
   }
   r.tree = o;
   return r;
}

//==========================================================
// <T>创建一个树节点。</T>
// <P>如果有删除的节点，则优先复用已删除的节点。</P>
//
// @method
//==========================================================
function FTreeView_createNode(){
   var o = this;
   var n = o.freeNodes.pop();
   if(!n){
      var n = RClass.create(FTreeNode);
      n.tree = o;
      n.psBuild();
   }
   n.hPanel.style.display = 'block';
   o.allNodes.pushUnique(n);
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
   if(!n.__linked){
      if(p){
         // 计算最后一个已经连接节点的位置
         var nr = p.hPanel.rowIndex;
         var ns = p.nodes;
         for(var i=ns.count-1; i>=0; i--){
            var pn = ns.get(i)
            if(pn.__linked){
               nr = pn.hPanel.rowIndex;
               break;
            }
         }
         // 关联节点
         if(n.hPanel.parentElement){
            if(n.hPanel.rowIndex > nr){
               nr++;
            }
            RHtml.tableMoveRow(o.hNodeForm, n.hPanel.rowIndex, nr);
         }else{
            o.hNodeRows.appendChild(n.hPanel);
            RHtml.tableMoveRow(o.hNodeForm, n.hPanel.rowIndex, nr+1);
         }
         // 设置层次
         n.setLevel(p.level + 1);
      }else{
         o.hNodeRows.appendChild(n.hPanel);
         n.setLevel(0);
      }
      n.__linked = true;
   }
}

//==========================================================
// <T>加载指定节点的子节点信息。</T>
//
// @method
// @param node:FTreeNode 指定节点
// @param refresh:Boolean 是否刷新
//==========================================================
function FTreeView_loadNode(node, refresh){
   var o = this;
   o.__loading = true;
   // 查找当前节点向上的第一个服务
   var type = null;
   var fn = node;
   while(fn){
      type = fn.type;
      if(type && type.service){
         break;
      }
      fn = fn.parentNode;
   }
   var svc = RService.parse(RString.nvl(type.service, o.service));
   if(!svc){
      return alert('Unknown service');
   }
   // 查找当前节点向上的第一个命令
   var fn = node;
   while(fn){
      type = fn.type;
      if(type && type.action){
         break;
      }
      fn = fn.parentNode;
   }
   var act = RString.nvl(type.action, svc.action);
   if(!act){
      return alert('Unknown action');
   }
   // 相应加载节点事件
   o.lsnsLoad.process(o, node);
   // 建立节点的发送信息
   var doc = new TXmlDocument();
   var root = doc.root();
   root.set('type', type.name);
   root.set('action', act);
   root.create('Tree', o.attributes);
   root.create('Attributes', o.attributes);
   var fn = node;
   var xnode = root;
   while(fn){
      var xnode = xnode.create('Node');
      fn.saveConfig(xnode);
      fn = fn.parentNode;
   }
   // 展开节点
   node._extended = true;
   if(node.child && node.hImage){
      node.hImage.src = RResource.iconPath(o.iconMinus); 
   }
   // 建立加载中的节点
   var ln = o.__loadingNode;
   var nr = node.hPanel.rowIndex;
   if(ln.hPanel.rowIndex > nr){
      nr++;
   }
   RHtml.tableMoveRow(o.hNodeForm, ln.hPanel.rowIndex, nr);
   ln.setLevel(node.level + 1);
   ln.show();
   // 建立事件对象，发送信息
   var e = new TEvent(o, EXmlEvent.Send, o.onLoaded);
   e.node = node;
   e.url = svc.url;
   e.document = doc;
   RConsole.find(FXmlConsole).process(e);
}

//==========================================================
// <T>释放一个树节点。</T>
// <P>从节点表格移出，但是不释放，用来再创建节点时使用。</P>
//
// @method
// @param n:node:FTreeNode 树节点
//==========================================================
function FTreeView_freeNode(n){
   var o = this;
   if(n.__linked){
      n.__linked = false;
      n.hPanel.style.display = 'none';
      o.allNodes.extract(n);
      o.freeNodes.push(n);
   }
}

//==========================================================
// <T>追加控件到自己内部。</T>
//
// @method
// @param c:control:FControl 控件对象
// @return Boolean
//==========================================================
function FTreeView_push(c){
   var o = this;
   o.base.FContainer.push.call(o, c);
   c.tree = o;
   if(RClass.isClass(c, FTreeColumn)){
      o.columns.set(c.name, c);
   }else if(RClass.isClass(c, FTreeLevel)){
      o.levels.set(c.id.toString(), c);
   }else if(RClass.isClass(c, FTreeNodeType)){
      o.types.set(c.typeName, c);
   }else if(RClass.isClass(c, FTreeNode)){
      o.nodes.push(c);
      o.allNodes.pushUnique(c);
   }
}

//==========================================================
// <T>重新加载树目录。</T>
//
// @method
//==========================================================
function FTreeView_reload(){
   var o = this;
   o.clear();
   o.connect();
}

//==========================================================
// <T>重新加载节点。</T>
//
// @method
// @param n:node:FTreeNode 节点对象
//==========================================================
function FTreeView_reloadNode(n){
   var o = this;
   // 获得操作节点
   n = RObject.nvl(n, o.focusNode);
   // 展开目录树
   if(!n){
      return o.reload();
   }
   // 展开节点
   n.removeChildren();
   o.loadNode(n);
}

//==========================================================
// <T>发行一个查询。</T>
//
// @method
//==========================================================
function FTreeView_doQuery(){
   var o = this;
   var svc = RService.parse(o.queryService);
   if(!svc){
      return alert('Unknown query service');
   }
   // Build send info
   var doc = new TXmlDocument();
   var root = doc.root();
   root.set('action', svc.action);
   root.create('Attributes').attrs = o.attributes;
   // Build xml connection
   var e = new TEvent(o, EXmlEvent.Send, o.onQueryLoaded);
   e.url = svc.url;
   e.document = doc;
   RConsole.find(FXmlConsole).process(e);
}


//==========================================================
// 相应鼠标点击树节点的函数
//
// @method
//==========================================================
function FTreeView_clear(){
   var o = this;
   var ns = o.nodes;
   for(var i=ns.count-1; i>=0; i--){
      ns.get(i).remove();
   }
   ns.release();
   o.allNodes.release();
}

//==========================================================
// <T>释放对象。</T>
//
// @method
//==========================================================
function FTreeView_dispose(){
   var o = this;
   o.base.FContainer.dispose.call(o);
   o.hNodePanel = null;
   o.hNodeForm = null;
   o.hHeadLine = null;
}

//==========================================================
//<T>释放对象。</T>
//
//@method
//==========================================================
function FTreeView_getTreeHeight(){
   var o = this;
   var ns = o.allNodes;
   var c = 0;
   for(var n = 0; n<ns.count; n++){
      var cn = ns.get(n);
      if(cn.hPanel.style.display == 'block'||cn.hPanel.style.display == ''){
         c++;
      }
   }
   return c * 29;
}

//==========================================================
//<T>释放对象。</T>
//
//@method
//==========================================================
function FTreeView_resetTreeHeight(){
   var o = this;
   if(o.parentObj){
	   var h = o.getTreeHeight();
	   o.parentObj.style.height = h;
   }
}






























//==========================================================
// ？？？
//
// @method
// @return Boolean
//==========================================================
function FTreeView_filterNode(sCaption, sAttr){
   var oNode = null;
   var nCount = this.allNodes.length;
   var sNodeCaption = null;
   var sNodeAttr = null;
   if(!sCaption){
      for(var n=0; n<nCount; n++){
         oNode = this.allNodes[n];
         if(!oNode.isDelete){
            oNode.show(true);
         }
      }
   }else{
      sCaption = sCaption.toLowerCase();
      var arAttr = null;
      var nAttrCount = 0;
      if(sAttr){
         sAttr = sAttr.toLowerCase();
         arAttr = sAttr.split("|");
         nAttrCount = arAttr.length;
      }
      for(var n=0; n<nCount; n++){
         oNode = this.allNodes[n];
         if(!oNode.isDelete){
            sNodeCaption = oNode.label.toLowerCase();
            if(arAttr){
               sNodeAttr = oNode.linkAttr.toLowerCase();
               for(var s=0; s<nAttrCount; s++){
                  if(sNodeAttr.indexOf(arAttr[s]) != -1){
                     oNode.show((sNodeCaption.indexOf(sCaption) != -1));
                     break;
                  }
               }
            }else{
               oNode.show((sNodeCaption.indexOf(sCaption) != -1));
            }
         }
      }
   }
   return true;
}

//==========================================================
// ？？？
//
// @method
// @return Boolean
//==========================================================
function FTreeView_removeNode(oNode){
   if(oNode){
      var nodes = new Array();
      var oLoopNode = null;
      var nCount = this.allNodes.length;
      for(var n=0; n<nCount; n++){
         oLoopNode = this.allNodes[n];
         if(oLoopNode != oNode){
            nodes[nodes.length] = oLoopNode;
         }
      }
      this.allNodes = nodes;
      var oParent = oNode.parent;
      if(oParent){
         nodes = new Array();
         nCount = oParent.nodes.length;
         for(var n=0; n<nCount; n++){
            oLoopNode = oParent.nodes[n];
            if(oLoopNode != oNode){
               nodes[nodes.length] = oLoopNode;
            }
         }
         oParent.nodes = nodes;
         oNode.parent.childrenHTML.removeChild(oNode.ownerHTML);
      }
      if(oParent.nodes.length == 0){
         oParent.imageHTML.src = this.imgEmpty;
      }
      return true;
   }
   return false;
}

//==========================================================
// ？？？
//
// @method
// @return Boolean
//==========================================================
function FTreeView_haveNodes(){
   return this.rootNode.hasChild();
}

//==========================================================
// ？？？
//
// @method
// @return Boolean
//==========================================================
function FTreeView_clearNodes(node){
   if(node){
      node.removeChildren();
   }
   return true;
   var nodes = new Array();
   var oLoopNode = null;
   var nCount = this.allNodes.length;
   for(var n=0; n<nCount; n++){
      oLoopNode = this.allNodes[n];
      if(oLoopNode.parent != oNode){
         nodes[nodes.length] = oLoopNode;
      }else{
      oNode.childrenHTML.removeChild(oLoopNode.ownerHTML);
      }
   }
   oNode.imageHTML.src = this.imgEmpty ;
   this.allNodes = nodes;
   return true;
}

//==========================================================
// ？？？
//
// @method
// @return Boolean
//==========================================================
function FTreeView_release(){
   var nodes = this.allNodes;
   for(var n=0; n<nodes.length; n++){
      var node = nodes[n];
      node.release();
   }
   this.allNodes = null;
   this.allNodesUuid = null;
   this.allNodesProperty = null;
   this.allNodesPropertyExtend = null;
   this.nodes = null;
   return true;
}


//==========================================================
// 查找并展开所有的节点
//
// @method
//==========================================================
function FTreeView_fetchExtendsAll(s){
   var o = this;
   if(s && RClass.isClass(s, FTreeNode)){
      fmMain.target = 'frmMain';
      fmMain.form_search.value = '';
      fmMain.form_order.value = '';
      fmMain.form_values.value = '';
      // 处理点击节点事件
      var type = node.type.typeName;
      if('table' == type || 'form' == type){
         // 表格和表单类型
         fmMain.form_name.value = node.get('form');
         fmMain.action = top.RContext.context('/ent/apl/logic/form/InnerForm.wa?do=update');
         fmMain.submit();
      }else if('frameTree' == type){
         // 目录页面类型
         fmMain.action = top.RContext.context(node.get('redirect'));
         fmMain.submit();
      }
   }else{
      
   }
}
//==========================================================
// 根据uuid到树目录里查找一个节点
//
// @method
// @param u:uuid:String 节点的XML表示字符串
// @return FTreeNode 节点对象
//==========================================================
function FTreeView_getChangedChecks(){
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
   //fc.treeUpdate(g);
   return treeView;
}

//==========================================================
// 把xml解析为节点，添加到一个节点下面
//
// @method
// @param parent:parent:FTreeNode 树节点
// @param config:config:TXmlDco XML文件
//==========================================================
function FTreeView_tempAppendNodes(parent, config){
   parent = RObject.nvl(parent, this.workNode, this.rootNode);
   if(config && config.nodes){
      var count = config.nodes.count;
      if(count > 0){
         parent.child = true;
         parent.loaded = true;
         for(var n=0; n<count; n++){
            var nc = config.nodes.get(n);
            if(nc && (nc.isName('Node') || nc.isName('TreeNode'))){
               var tn = RClass.create(FTreeNode);
               tn.parent = parent;
               tn.tree = this;
               tn.loadConfig(nc);
               if(nc.nodes){
                  tn.icon = 'ctl.FBrowser_Folder';
               }else{
                  tn.icon = 'ctl.FBrowser_Txt';
               }
               tn.build(0);
               tn.hide();
               if(nc.nodes){
                  this.tempAppendNodes(tn, nc);
               }
               parent.push(tn);
               this.allNodes.push(tn);
            }
         }
      }
   }
   this.rootNode.extend(true);
}

//==========================================================
// 根据uuid到树目录里查找一个节点
//
// @method
// @param u:uuid:String 节点的XML表示字符串
// @return FTreeNode 节点对象
//==========================================================
function FTreeView_removeNodes(node){
   node = RObject.nvl(node, this.workNode, this.rootNode);
   if(node.hasChild()){
      node.removeChildren();
   }
   node.remove();
}

//==========================================================
// 添加新的子节点
//
// @method
// @param child:child:FTreeNode 构建时添加新的子节点对象
//==========================================================
function FTreeView_tempAppendChild(child){
   var o = this;
   var hc = o.hHeadLine.insertCell();
   hc.height = '100%';
   if(RClass.isClass(child, FTreeColumn)){
      hc.appendChild(child.hPanel);
   }
}
