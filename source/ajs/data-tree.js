with(MO){
   MO.FUiDataTreeView = function FUiDataTreeView(o){
      o = RClass.inherits(this, o, FUiTreeView);
      o._serviceCode     = RClass.register(o, new APtyString('_serviceCode', 'service'));
      o._statusLoading   = false;
      o.lsnsLoaded       = new TListeners();
      o.lsnsNodeLoad     = new TListeners();
      o.lsnsNodeLoaded   = new TListeners();
      o.onLoaded         = FUiDataTreeView_onLoaded;
      o.onNodeLoaded     = FUiDataTreeView_onNodeLoaded;
      o.construct        = FUiDataTreeView_construct;
      o.innerBuildNode   = FUiDataTreeView_innerBuildNode;
      o.loadNode         = FUiDataTreeView_loadNode;
      o.loadUrl          = FUiDataTreeView_loadUrl;
      o.loadService      = FUiDataTreeView_loadService;
      o.dispose          = FUiDataTreeView_dispose;
      return o;
   }
   MO.FUiDataTreeView_onLoaded = function FUiDataTreeView_onLoaded(p){
      var o = this;
      var x = p.root;
      if(x == null){
         throw new TError(o, 'Load tree data failure.');
      }
      var xt = x.find('TreeView');
      RUiControl.build(o, xt, null, o._hPanel);
      o.lsnsLoaded.process(p);
      var serviceCode = xt.get('service');
      if(serviceCode){
         o.loadService(serviceCode);
      }
   }
   MO.FUiDataTreeView_onNodeLoaded = function FUiDataTreeView_onNodeLoaded(event){
      var o = this;
      var xroot = event.root;
      if(!xroot){
         throw new TError(o, 'Load tree data failure.');
      }
      var parentNode = event.connection.parentNode;
      var ln = o._loadingNode;
      if(ln._hPanel.parentElement){
         o._hNodeRows.removeChild(ln._hPanel);
      }
      o._statusLoading = false;
      o.innerBuildNode(parentNode, xroot);
      o.lsnsNodeLoaded.process(event);
   }
   MO.FUiDataTreeView_construct = function FUiDataTreeView_construct(){
      var o = this;
      o.__base.FUiTreeView.construct.call(o);
   }
   MO.FUiDataTreeView_innerBuildNode = function FUiDataTreeView_innerBuildNode(parent, xconfig){
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
   MO.FUiDataTreeView_loadNode = function FUiDataTreeView_loadNode(node, refresh){
      var o = this;
      o._statusLoading = true;
      node.removeChildren();
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
      var service = RUiService.parse(serviceCode);
      if(!service){
         throw new TError(o, 'Unknown service.');
      }
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
      o.lsnsNodeLoad.process(o, node);
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
      node._extended = true;
      if(node._child && node._hImage){
         node._hImage.src = RResource.iconPath(o._iconMinus);
      }
      var ln = o._loadingNode;
      var lastNode = node.searchLast();
      var nr = lastNode._hPanel.rowIndex;
      o._hNodeRows.appendChild(ln._hPanel);
      RHtml.tableMoveRow(o._hNodeForm, ln._hPanel.rowIndex, nr + 1);
      ln.setLevel(node.level() + 1);
      var url = RUiService.makeUrl(service.service, action);
      var connection = RConsole.find(FXmlConsole).sendAsync(url, xd);
      connection.parentNode = node;
      connection.addLoadListener(o, o.onNodeLoaded);
   }
   MO.FUiDataTreeView_loadUrl = function FUiDataTreeView_loadUrl(url, node){
      var o = this;
      var connection = RConsole.find(FXmlConsole).sendAsync(url);
      connection.addLoadListener(o, o.onLoaded);
   }
   MO.FUiDataTreeView_loadService = function FUiDataTreeView_loadService(serviceCode, attributes){
      var o = this;
      o.clear();
      if(!serviceCode){
         serviceCode = o._serviceCode;
      }
      var service = RUiService.parse(serviceCode);
      if(!service){
         return alert('Unknown service');
      }
      attributes = RObject.nvl(attributes, o._attributes);
      var xdocument = new TXmlDocument();
      var xroot = xdocument.root();
      xroot.set('action', service.action);
      RConsole.find(FUiEnvironmentConsole).build(xroot);
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
      o._focusNode = null;
      var connection = RConsole.find(FXmlConsole).sendAsync(service.url, xdocument);
      connection.addLoadListener(o, o.onNodeLoaded);
   }
   MO.FUiDataTreeView_dispose = function FUiDataTreeView_dispose(){
      var o = this;
      o.__base.FUiTreeView.dispose.call(o);
   }
   MO.FUiDataTreeView_load = function FUiDataTreeView_load(p){
      var o = this;
      o.loadService(o._serviceCode);
   }
   MO.FUiDataTreeView_reload = function FUiDataTreeView_reload(){
      var o = this;
      o.clear();
      o.loadUrl();
   }
   MO.FUiDataTreeView_loadNodeUrl = function FUiDataTreeView_loadNodeUrl(p, n){
      var o = this;
      var xc = RConsole.find(FXmlConsole);
      var c = xc.sendAsync(p);
      c.parentNode = RObject.nvl(n, o._focusNode);
      c.addLoadListener(o, o.onNodeLoaded);
   }
   MO.FUiDataTreeView_reloadService = function FUiDataTreeView_reloadService(serviceCode, attributes){
      var o = this;
      o.clear();
      return o.loadService(serviceCode, attributes)
   }
   MO.FUiDataTreeView_loadNodeService = function FUiDataTreeView_loadNodeService(ps, pa){
      var o = this;
      var svc = RUiService.parse(RString.nvl(ps, o._service));
      if(!svc){
         throw new TError(o, 'Unknown service.');
      }
      var as = RObject.nvl(pa, o._attributes);
      var xd = new TXmlDocument();
      var xr = xd.root();
      xr.set('action', svc.action);
      if(!as.isEmpty()){
         if(RClass.isClass(as, TNode)){
            xr.push(attrs);
         }if(RClass.isClass(as, TAttributes)){
         }else{
         }
      }
      var ln = o._loadingNode;
      var xc = RConsole.find(FXmlConsole);
      var c = xc.sendAsync(svc.url, xr);
      c.parentNode = o._focusNode;
      c.addLoadListener(o, o.onNodeLoaded);
   }
   MO.FUiDataTreeView_reloadNode = function FUiDataTreeView_reloadNode(n){
      var o = this;
      n = RObject.nvl(n, o._focusNode);
      if(!n){
         return o.reload();
      }
      n.removeChildren();
      o.loadNode(n);
   }
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
   MO.FUiDataTreeView_doQuery = function FUiDataTreeView_doQuery(){
      var o = this;
      var svc = RUiService.parse(o._queryService);
      if(!svc){
         return alert('Unknown query service');
      }
      var doc = new TXmlDocument();
      var root = doc.root();
      root.set('action', svc.action);
      root.create('Attributes').attrs = o._attributes;
      var e = new TEvent(o, EXmlEvent.Send, o.onQueryLoaded);
      e.url = svc.url;
      e.document = doc;
      RConsole.find(FXmlConsole).process(e);
   }
   MO.FUiDataTreeView_fetchExtendsAll = function FUiDataTreeView_fetchExtendsAll(s){
      var o = this;
      if(s && RClass.isClass(s, FUiTreeNode)){
         fmMain.target = 'frmMain';
         fmMain.form_search.value = '';
         fmMain.form_order.value = '';
         fmMain.form_values.value = '';
         var type = node.type.typeName;
         if('table' == type || 'form' == type){
            fmMain.form_name.value = node.get('form');
            fmMain.action = top.RContext.context('/ent/apl/logic/form/InnerForm.wa?do=update');
            fmMain.submit();
         }else if('frameTree' == type){
            fmMain.action = top.RContext.context(node.get('redirect'));
            fmMain.submit();
         }
      }else{
      }
   }
}
