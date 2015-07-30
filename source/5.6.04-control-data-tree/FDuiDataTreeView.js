with(MO){
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
   MO.FUiDataTreeView = function FUiDataTreeView(o){
      o = RClass.inherits(this, o, FUiTreeView);
      //..........................................................
      // @property
      o._serviceCode     = RClass.register(o, new APtyString('_serviceCode', 'service'));
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
      // @method
      o.innerBuildNode   = FUiDataTreeView_innerBuildNode;
      // @method
      o.loadNode         = FUiDataTreeView_loadNode;
      o.loadUrl          = FUiDataTreeView_loadUrl;
      o.loadService      = FUiDataTreeView_loadService;
      // @method
      o.dispose          = FUiDataTreeView_dispose;

      //o.reloadService    = FUiDataTreeView_reloadService;
      //o.load             = FUiDataTreeView_load;
      //o.reload           = FUiDataTreeView_reload;
      //o.reloadNode       = FUiDataTreeView_reloadNode;
      //o.loadNodeUrl      = FUiDataTreeView_loadNodeUrl;
      //o.loadNodeService  = FUiDataTreeView_loadNodeService;
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
   MO.FUiDataTreeView_onLoaded = function FUiDataTreeView_onLoaded(p){
      var o = this;
      var x = p.root;
      if(x == null){
         throw new TError(o, 'Load tree data failure.');
      }
      var xt = x.find('TreeView');
      // 建立内部对象
      RDuiControl.build(o, xt, null, o._hPanel);
      // 响应事件
      o.lsnsLoaded.process(p);
      // 加载主信息
      var serviceCode = xt.get('service');
      if(serviceCode){
         o.loadService(serviceCode);
      }
   }

   //==========================================================
   // <T>加载取回的服务器数据。</T>
   //
   // @method
   // @param event:SXmlEvent 事件信息
   //==========================================================
   MO.FUiDataTreeView_onNodeLoaded = function FUiDataTreeView_onNodeLoaded(event){
      var o = this;
      // 检查结果
      var xroot = event.root;
      if(!xroot){
         throw new TError(o, 'Load tree data failure.');
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
      o.innerBuildNode(parentNode, xroot);
      // 响应事件
      o.lsnsNodeLoaded.process(event);
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
   MO.FUiDataTreeView_construct = function FUiDataTreeView_construct(){
      var o = this;
      o.__base.FUiTreeView.construct.call(o);
   }

   //==========================================================
   // <T>从配置信息建立节点处理。</T>
   //
   // @method
   // @param parent:FUiTreeNode 目录节点
   // @param xconfig:FXmlNode 配置节点
   //==========================================================
   MO.FUiDataTreeView_innerBuildNode = function FUiDataTreeView_innerBuildNode(parent, xconfig){
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
   // <T>加载指定节点的子节点信息。</T>
   //
   // @method
   // @param node:FUiTreeNode 指定节点
   // @param refresh:Boolean 是否刷新
   //==========================================================
   MO.FUiDataTreeView_loadNode = function FUiDataTreeView_loadNode(node, refresh){
      var o = this;
      o._statusLoading = true;
      // 删除当前节点的所有子节点
      node.removeChildren();
      // 查找服务名称
      var type = null;
      var findNode = node;
      var serviceCode = o._serviceCode;
      while(RClass.isClass(findNode, FUiTreeNode)){
         type = findNode.type();
         if(type && type._service){
            serviceCode = type._service;
            break;
         }
         findNode = findNode._parent;
      }
      if(!serviceCode){
         throw new TError(o, 'Unknown service code.');
      }
      var service = RDuiService.parse(serviceCode);
      if(!service){
         throw new TError(o, 'Unknown service.');
      }
      // 查找当前节点向上的第一个命令
      var findNode = node;
      while(RClass.isClass(fn, FUiTreeNode)){
         type = findNode.type();
         if(type && type._action){
            break;
         }
         findNode = findNode._parent;
      }
      var action = RString.nvl(type._action, service.action);
      if(!action){
         throw new TError(o, 'Unknown service action.');
      }
      // 相应加载节点事件
      o.lsnsNodeLoad.process(o, node);
      // 建立节点的发送信息
      var xd = new TXmlDocument();
      var x = xd.root();
      x.set('action', action);
      x.set('type', type._linker);
      x.create('Attributes', o._attributes);
      var fn = node;
      while(RClass.isClass(fn, FUiTreeNode)){
         x = x.create('TreeNode');
         fn.propertySave(x);
         fn = fn._parent;
      }
      // 展开节点
      node._extended = true;
      if(node._child && node._hImage){
         node._hImage.src = RResource.iconPath(o._iconMinus); 
      }
      // 建立加载中的节点
      var ln = o._loadingNode;
      var lastNode = node.searchLast();
      var nr = lastNode._hPanel.rowIndex;
      o._hNodeRows.appendChild(ln._hPanel);
      RHtml.tableMoveRow(o._hNodeForm, ln._hPanel.rowIndex, nr + 1);
      ln.setLevel(node.level() + 1);
      //ln.show();
      // 建立事件对象，发送信息
      var url = RDuiService.makeUrl(service.service, action);
      var connection = RConsole.find(FXmlConsole).sendAsync(url, xd);
      connection.parentNode = node;
      connection.addLoadListener(o, o.onNodeLoaded);
   }

   //==========================================================
   // <T>从网络地址加载数据。</T>
   //
   // @method
   // @param url:String 网络地址
   // @param node:FUiTreeNode 目录节点
   //==========================================================
   MO.FUiDataTreeView_loadUrl = function FUiDataTreeView_loadUrl(url, node){
      var o = this;
      // 加载数据
      var connection = RConsole.find(FXmlConsole).sendAsync(url);
      connection.addLoadListener(o, o.onLoaded);
   }

   //==========================================================
   // <T>从服务器获取节点数据。</T>
   //
   // @method
   // @param service:String 服务器端的服务名称
   // @param attributes:TAttributes 属性集合
   //==========================================================
   MO.FUiDataTreeView_loadService = function FUiDataTreeView_loadService(serviceCode, attributes){
      var o = this;
      // 清空当前所有节点
      o.clear();
      // 获得服务描述
      if(!serviceCode){
         serviceCode = o._serviceCode;
      }
      var service = RDuiService.parse(serviceCode);
      if(!service){
         return alert('Unknown service');
      }
      attributes = RObject.nvl(attributes, o._attributes);
      // 建立加载数据
      var xdocument = new TXmlDocument();
      var xroot = xdocument.root();
      xroot.set('action', service.action);
      RConsole.find(FDuiEnvironmentConsole).build(xroot);
      if(!attributes.isEmpty()){
         if(RClass.isClass(attributes, TNode)){
            xr.push(attributes);
         }if(RClass.isClass(attributes, TAttributes)){
            xr.create('Tree').attributes = attributes;
            xr.create('Attributes').attributes = attributes;
         }else{
            xr.create('Tree').value = attributes;
            xr.create('Attributes').value = attributes;
         }
      }
      // 显示加载中的节点
      o._focusNode = null;
      //var ln = o._loadingNode;
      //RHtml.tableMoveRow(o._hNodeForm, ln._hPanel.rowIndex, 0);
      //ln.setLevel(0);
      //ln.show();
      // 连接服务器
      var connection = RConsole.find(FXmlConsole).sendAsync(service.url, xdocument);
      //c.parentNode = pn;
      connection.addLoadListener(o, o.onNodeLoaded);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FUiDataTreeView_dispose = function FUiDataTreeView_dispose(){
      var o = this;
      o.__base.FUiTreeView.dispose.call(o);
   }












   //==========================================================
   // <T>从服务器加载数据。</T>
   //
   // @method
   // @param p:attributes:String 参数
   //==========================================================
   MO.FUiDataTreeView_load = function FUiDataTreeView_load(p){
      var o = this;
      o.loadService(o._serviceCode);
   }

   //==========================================================
   // <T>重新加载树目录。</T>
   //
   // @method
   //==========================================================
   MO.FUiDataTreeView_reload = function FUiDataTreeView_reload(){
      var o = this;
      o.clear();
      o.loadUrl();
   }

   //==========================================================
   // <T>从网络地址获得数据。</T>
   //
   // @method
   // @param p:url:String 网络地址
   // @param n:node:FUiTreeNode 目录节点
   //==========================================================
   MO.FUiDataTreeView_loadNodeUrl = function FUiDataTreeView_loadNodeUrl(p, n){
      var o = this;
      // 加载数据
      var xc = RConsole.find(FXmlConsole);
      var c = xc.sendAsync(p);
      c.parentNode = RObject.nvl(n, o._focusNode);
      c.addLoadListener(o, o.onNodeLoaded);
   }

   //==========================================================
   // <T>从服务器重新获取节点数据。</T>
   //
   // @method
   // @param serviceCode:String 服务代码
   // @param attributes:TAttributes 属性集合
   //==========================================================
   MO.FUiDataTreeView_reloadService = function FUiDataTreeView_reloadService(serviceCode, attributes){
      var o = this;
      o.clear();
      return o.loadService(serviceCode, attributes)
   }

   //==========================================================
   // <T>从服务器获取节点数据。</T>
   //
   // @method
   // @param ps:service:String 服务名称
   // @param pa:attributes:FAttributes 属性集合
   //==========================================================
   MO.FUiDataTreeView_loadNodeService = function FUiDataTreeView_loadNodeService(ps, pa){
      var o = this;
      // 获得服务信息
      var svc = RDuiService.parse(RString.nvl(ps, o._service));
      if(!svc){
         throw new TError(o, 'Unknown service.');
      }
      var as = RObject.nvl(pa, o._attributes);
      // 建立加载数据
      var xd = new TXmlDocument();
      var xr = xd.root();
      xr.set('action', svc.action);
      //RConsole.find(FDuiEnvironmentConsole).build(xr);
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
   // <T>重新加载节点。</T>
   //
   // @method
   // @param n:node:FUiTreeNode 节点对象
   //==========================================================
   MO.FUiDataTreeView_reloadNode = function FUiDataTreeView_reloadNode(n){
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
   // <T>加载取回的服务器数据。</T>
   //
   // @method
   // @param e:event:TEvent 事件对象
   //==========================================================
   MO.FUiDataTreeView_onQueryLoaded = function FUiDataTreeView_onQueryLoaded(e){
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
   MO.FUiDataTreeView_doQuery = function FUiDataTreeView_doQuery(){
      var o = this;
      var svc = RDuiService.parse(o._queryService);
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
   MO.FUiDataTreeView_fetchExtendsAll = function FUiDataTreeView_fetchExtendsAll(s){
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
}
