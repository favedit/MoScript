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
function FUiDataTreeView(o){
   o = RClass.inherits(this, o, FUiTreeView);
   //..........................................................
   // @property
   o._serviceName     = RClass.register(o, new APtyString('_serviceName', 'service'));
   //..........................................................
   // @attribute
   o._statusLoading   = false;
   //..........................................................
   // @listener
   o.lsnsLoaded       = new TListeners();
   o.lsnsNodeLoad     = new TListeners();
   o.lsnsNodeLoaded   = new TListeners();
   //..........................................................
   // @event
   o.onLoaded         = FUiDataTreeView_onLoaded;
   o.onNodeLoaded     = FUiDataTreeView_onNodeLoaded;
   //..........................................................
   // @method
   o.construct        = FUiDataTreeView_construct;
   o.buildNode        = FUiDataTreeView_buildNode;
   o.loadNode         = FUiDataTreeView_loadNode;
   o.loadUrl          = FUiDataTreeView_loadUrl;
   o.loadNodeUrl      = FUiDataTreeView_loadNodeUrl;
   o.loadService      = FUiDataTreeView_loadService;
   o.loadNodeService  = FUiDataTreeView_loadNodeService;
   o.load             = FUiDataTreeView_load;
   o.reloadNode       = FUiDataTreeView_reloadNode;
   o.reload           = FUiDataTreeView_reload;
   o.dispose          = FUiDataTreeView_dispose;






   //..........................................................
   // @property
   //o._queryService    = RClass.register(o, new APtyString('_queryService'));
   //..........................................................
   // @event
   //o.onQueryLoaded    = FUiDataTreeView_onQueryLoaded;
   //..........................................................
   // @method
   //o.doQuery          = FUiDataTreeView_doQuery;
   //..........................................................
   // @method
   //o.getChangedChecks = FUiDataTreeView_getChangedChecks;
   //o.fetchExtendsAll  = FUiDataTreeView_fetchExtendsAll;
   return o;
}

//==========================================================
// <T>加载取回的服务器数据。</T>
//
// @method
// @param p:event:SXmlEvent 事件信息
//==========================================================
function FUiDataTreeView_onLoaded(p){
   var o = this;
   var x = p.root;
   if(x == null){
      throw new TError(o, 'Load tree data failure.');
   }
   var xt = x.find('TreeView');
   // 建立内部对象
   RControl.build(o, xt, null, o._hPanel);
   // 响应事件
   o.lsnsLoaded.process(p);
   // 加载主信息
   var s = xt.get('service');
   if(s){
      o.loadNodeService(s);
   }
}

//==========================================================
// <T>加载取回的服务器数据。</T>
//
// @method
// @param p:event:SXmlEvent 事件信息
//==========================================================
function FUiDataTreeView_onNodeLoaded(p){
   var o = this;
   var x = p.root;
   if(x == null){
      throw new TError(o, 'Load tree data failure.');
   }
   // 获得事件信息
   var np = p.connection.parentNode;
   // 加载完毕
   o._loadingNode.hide();
   o._statusLoading = false;
   // 加载数据节点
   o.buildNode(np, x);
   // 响应事件
   o.lsnsNodeLoaded.process(p);
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
function FUiDataTreeView_construct(){
   var o = this;
   o.__base.FUiTreeView.construct.call(o);
}

//==========================================================
// <T>从配置信息建立节点处理。</T>
//
// @method
// @param pn:treeNode:FUiTreeNode 目录节点
// @param px:node:FXmlNode 配置节点
//==========================================================
function FUiDataTreeView_buildNode(pn, px){
   var o = this;
   // 加载数据节点
   var xns = px._nodes;
   if(xns){
      var xnc = xns.count();
      for(var i = 0; i < xnc; i++){
         var xn = xns.get(i);
         if(xn.isName('TreeNode')){
            var n = o.createNode();
            n.loadConfig(xn);
            if(pn){
               pn.push(n);
            }else{
               o.push(n);
            }
            o.appendNode(n, pn);
            // 建立子节点
            if(xn.hasNode()){
               o.buildNode(n, xn);
               n.extend(false);
            }
         }
      }
   }
}

//==========================================================
// <T>加载指定节点的子节点信息。</T>
//
// @method
// @param pn:node:FUiTreeNode 指定节点
// @param pf:refresh:Boolean 是否刷新
//==========================================================
function FUiDataTreeView_loadNode(pn, pf){
   var o = this;
   o._statusLoading = true;
   // 查找服务名称
   var nt = null;
   var fn = pn;
   var svc = o._serviceName;
   while(RClass.isClass(fn, FUiTreeNode)){
      nt = fn.type();
      if(nt && nt._service){
         svc = nt._service;
         break;
      }
      fn = fn._parent;
   }
   if(!svc){
      throw new TError(o, 'Unknown service name.');
   }
   // 查找当前节点向上的第一个命令
   var fn = pn;
   while(RClass.isClass(fn, FUiTreeNode)){
      nt = fn.type();
      if(nt && nt._action){
         break;
      }
      fn = fn._parent;
   }
   var act = RString.nvl(nt._action, svc.action);
   if(!act){
      throw new TError(o, 'Unknown service action.');
   }
   // 相应加载节点事件
   o.lsnsNodeLoad.process(o, pn);
   // 建立节点的发送信息
   var xd = new TXmlDocument();
   var x = xd.root();
   x.set('action', act);
   x.set('type', nt._linker);
   x.create('Attributes', o._attributes);
   var fn = pn;
   while(RClass.isClass(fn, FUiTreeNode)){
      x = x.create('TreeNode');
      fn.propertySave(x);
      fn = fn._parent;
   }
   // 展开节点
   pn._extended = true;
   if(pn._child && pn._hImage){
      pn._hImage.src = RResource.iconPath(o._iconMinus); 
   }
   // 建立加载中的节点
   var ln = o._loadingNode;
   var nr = pn._hPanel.rowIndex;
   if(ln._hPanel.rowIndex > nr){
      nr++;
   }
   RHtml.tableMoveRow(o._hNodeForm, ln._hPanel.rowIndex, nr);
   ln.setLevel(pn.level() + 1);
   ln.show();
   // 建立事件对象，发送信息
   var sv = RService.parse(RString.nvl(svc, o._service));
   if(!sv){
      throw new TError(o, 'Unknown service.');
   }
   var u = RService.makeUrl(sv.service, act);
   // 建立事件对象，发送信息
   var c = RConsole.find(FXmlConsole).sendAsync(u, xd);
   c.parentNode = pn;
   c.addLoadListener(o, o.onNodeLoaded);
}

//==========================================================
// <T>从网络地址获得数据。</T>
//
// @method
// @param p:url:String 网络地址
// @param n:node:FUiTreeNode 目录节点
//==========================================================
function FUiDataTreeView_loadUrl(p){
   var o = this;
   // 加载数据
   var xc = RConsole.find(FXmlConsole);
   var c = xc.sendAsync(p);
   c.addLoadListener(o, o.onLoaded);
}

//==========================================================
// <T>从网络地址获得数据。</T>
//
// @method
// @param p:url:String 网络地址
// @param n:node:FUiTreeNode 目录节点
//==========================================================
function FUiDataTreeView_loadNodeUrl(p, n){
   var o = this;
   // 加载数据
   var xc = RConsole.find(FXmlConsole);
   var c = xc.sendAsync(p);
   c.parentNode = RObject.nvl(n, o._focusNode);
   c.addLoadListener(o, o.onNodeLoaded);
}

//==========================================================
// <T>从服务器获取节点数据。</T>
//
// @method
// @param service:service:String 服务器端的服务名称
//==========================================================
function FUiDataTreeView_loadService(service, attrs){
   var o = this;
   var svc = RService.parse(RString.nvl(service, this._service));
   if(!svc){
      return alert('Unknown service');
   }
   attrs = RObject.nvl(attrs, o._attributes);
   // 建立加载数据
   var xd = new TXmlDocument();
   var xr = xd.root();
   xr.set('action', svc.action);
   RConsole.find(FEnvironmentConsole).build(xr);
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
   var ln = o._loadingNode;
   //RHtml.tableMoveRow(o._hNodeForm, ln._hPanel.rowIndex, 0);
   //ln.setLevel(0);
   //ln.show();
   // 连接服务器
   var xc = RConsole.find(FXmlConsole);
   var c = xc.sendAsync(svc.url, xd);
   //c.parentNode = pn;
   c.addLoadListener(o, o.onNodeLoaded);
   //var e = new TEvent(o, EXmlEvent.Send, o.onLoaded);
   //e.url = svc.url;
   //e.document = xd;
   //RConsole.find(FXmlConsole).process(e);
}

//==========================================================
// <T>从服务器获取节点数据。</T>
//
// @method
// @param ps:service:String 服务名称
// @param pa:attributes:FAttributes 属性集合
//==========================================================
function FUiDataTreeView_loadNodeService(ps, pa){
   var o = this;
   // 获得服务信息
   var svc = RService.parse(RString.nvl(ps, o._service));
   if(!svc){
      throw new TError(o, 'Unknown service.');
   }
   var as = RObject.nvl(pa, o._attributes);
   // 建立加载数据
   var xd = new TXmlDocument();
   var xr = xd.root();
   xr.set('action', svc.action);
   //RConsole.find(FEnvironmentConsole).build(xr);
   if(!as.isEmpty()){
      if(RClass.isClass(as, TNode)){
         xr.push(attrs);
      }if(RClass.isClass(as, TAttributes)){
         //xr.create('Tree').attrs = attrs;
         //xr.create('Attributes').attrs = attrs;
      }else{
         //xr.create('Tree').value = attrs;
         //xr.create('Attributes').value = attrs;
      }
   }
   // 显示加载中的节点
   var ln = o._loadingNode;
   //RHtml.tableMoveRow(o._hNodeForm, ln._hPanel.rowIndex, 0);
   //ln.setLevel(0);
   //ln.show();
   // 加载数据
   var xc = RConsole.find(FXmlConsole);
   var c = xc.sendAsync(svc.url, xr);
   c.parentNode = o._focusNode;
   c.addLoadListener(o, o.onNodeLoaded);
}

//==========================================================
// <T>从服务器加载数据。</T>
//
// @method
// @param p:attributes:String 参数
//==========================================================
function FUiDataTreeView_load(p){
   var o = this;
   o.loadService(o._serviceName);
}

//==========================================================
// <T>重新加载节点。</T>
//
// @method
// @param n:node:FUiTreeNode 节点对象
//==========================================================
function FUiDataTreeView_reloadNode(n){
   var o = this;
   // 获得操作节点
   n = RObject.nvl(n, o._focusNode);
   // 展开目录树
   if(!n){
      return o.reload();
   }
   // 展开节点
   n.removeChildren();
   o.loadNode(n);
}

//==========================================================
// <T>重新加载树目录。</T>
//
// @method
//==========================================================
function FUiDataTreeView_reload(){
   var o = this;
   o.clear();
   o.loadUrl();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FUiDataTreeView_dispose(){
   var o = this;
   o.__base.FUiTreeView.dispose.call(o);
}















//==========================================================
// <T>加载取回的服务器数据。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FUiDataTreeView_onQueryLoaded(e){
   var o = this;
   var doc = e.document;
   if(doc){
      var tvn = doc.root().find('TreeView');
      if(tvn && tvn._nodes){
         var nc = tvn._nodes.count;
         for(var n=0; n<nc; n++){
            var nd = tvn._nodes.get(n);
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
// <T>发行一个查询。</T>
//
// @method
//==========================================================
function FUiDataTreeView_doQuery(){
   var o = this;
   var svc = RService.parse(o._queryService);
   if(!svc){
      return alert('Unknown query service');
   }
   // Build send info
   var doc = new TXmlDocument();
   var root = doc.root();
   root.set('action', svc.action);
   root.create('Attributes').attrs = o._attributes;
   // Build xml connection
   var e = new TEvent(o, EXmlEvent.Send, o.onQueryLoaded);
   e.url = svc.url;
   e.document = doc;
   RConsole.find(FXmlConsole).process(e);
}


//==========================================================
// 查找并展开所有的节点
//
// @method
//==========================================================
function FUiDataTreeView_fetchExtendsAll(s){
   var o = this;
   if(s && RClass.isClass(s, FUiTreeNode)){
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
