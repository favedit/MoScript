function FDataTreeView(o){
   o = RClass.inherits(this, o, FTreeView);
   o._serviceName     = RClass.register(o, new APtyString('_serviceName', 'service'));
   o._statusLoading   = false;
   o.lsnsLoaded       = new TListeners();
   o.lsnsNodeLoaded   = new TListeners();
   o.onLoaded         = FDataTreeView_onLoaded;
   o.onNodeLoaded     = FDataTreeView_onNodeLoaded;
   o.construct        = FDataTreeView_construct;
   o.buildNode        = FDataTreeView_buildNode;
   o.loadNode         = FDataTreeView_loadNode;
   o.loadUrl          = FDataTreeView_loadUrl;
   o.loadNodeUrl      = FDataTreeView_loadNodeUrl;
   o.loadService      = FDataTreeView_loadService;
   o.loadNodeService  = FDataTreeView_loadNodeService;
   o.reloadNode       = FDataTreeView_reloadNode;
   o.reload           = FDataTreeView_reload;
   o.dispose          = FDataTreeView_dispose;
   o._queryService    = RClass.register(o, new APtyString('_queryService'));
   o.onQueryLoaded    = FDataTreeView_onQueryLoaded;
   o.doQuery          = FDataTreeView_doQuery;
   o.removeNode       = FDataTreeView_removeNode;
   o.clearNodes       = FDataTreeView_clearNodes;
   o.getChangedChecks = FDataTreeView_getChangedChecks;
   o.fetchExtendsAll  = FDataTreeView_fetchExtendsAll;
   o.tempAppendNodes  = FDataTreeView_tempAppendNodes;
   o.removeNodes      = FDataTreeView_removeNodes;
   o.tempAppendChild  = FDataTreeView_tempAppendChild;
   return o;
}
function FDataTreeView_onLoaded(p){
   var o = this;
   var x = p.root;
   if(x == null){
      throw new TError(o, 'Load tree data failure.');
   }
   var xt = x.find('TreeView');
   RControl.build(o, xt);
   o.lsnsLoaded.process(p);
   var s = xt.get('service');
   o.loadNodeService(s);
}
function FDataTreeView_onNodeLoaded(p){
   var o = this;
   var x = p.root;
   if(x == null){
      throw new TError(o, 'Load tree data failure.');
   }
   var np = p.connection.parentNode;
   o._loadingNode.hide();
   o._statusLoading = false;
   o.buildNode(np, x);
   o.lsnsNodeLoaded.process(p);
}
function FDataTreeView_construct(){
   var o = this;
   o.__base.FTreeView.construct.call(o);
}
function FDataTreeView_buildNode(pn, px){
   var o = this;
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
            if(xn.hasNode()){
               o.buildNode(n, xn);
               n.extend(false);
            }
         }
      }
   }
}
function FDataTreeView_loadNode(pn, pf){
   var o = this;
   o._statusLoading = true;
   var nt = null;
   var fn = pn;
   var svc = o._serviceName;
   while(RClass.isClass(fn, FTreeNode)){
      nt = fn.type();
      if(nt && nt._serviceName){
         svc = nt._serviceName;
         break;
      }
      fn = fn._parent;
   }
   if(!svc){
      throw new TError(o, 'Unknown service name.');
   }
   o.lsnsLoad.process(o, pn);
   var xd = new TXmlDocument();
   var x = xd.root();
   var fn = pn;
   while(RClass.isClass(fn, FTreeNode)){
      var xc = x.create('Node');
      fn.propertySave(xc);
      fn = fn._parent;
   }
   pn._extended = true;
   if(pn._child && pn._hImage){
      pn._hImage.src = RResource.iconPath(o._iconMinus);
   }
   var ln = o._loadingNode;
   var nr = pn._hPanel.rowIndex;
   if(ln._hPanel.rowIndex > nr){
      nr++;
   }
   RHtml.tableMoveRow(o._hNodeForm, ln._hPanel.rowIndex, nr);
   ln.setLevel(pn.level + 1);
   ln.show();
   var xc = RConsole.find(FXmlConsole);
   var c = xc.sendAsync(svc, xd);
   c.parentNode = pn;
   c.lsnsLoad.register(o, o.onLoaded);
}
function FDataTreeView_loadUrl(p){
   var o = this;
   var xc = RConsole.find(FXmlConsole);
   var c = xc.sendAsync(p);
   c.lsnsLoad.register(o, o.onLoaded);
}
function FDataTreeView_loadNodeUrl(p, n){
   var o = this;
   var xc = RConsole.find(FXmlConsole);
   var c = xc.sendAsync(p);
   c.parentNode = RObject.nvl(n, o._focusNode);
   c.lsnsLoad.register(o, o.onNodeLoaded);
}
function FDataTreeView_loadService(service, attrs){
   var o = this;
   var svc = RService.parse(RString.nvl(service, this._service));
   if(!svc){
      return alert('Unknown service');
   }
   attrs = RObject.nvl(attrs, o._attributes);
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
   var ln = o._loadingNode;
}
function FDataTreeView_loadNodeService(ps, pa){
   var o = this;
   var svc = RService.parse(RString.nvl(ps, o._service));
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
   c.lsnsLoad.register(o, o.onNodeLoaded);
}
function FDataTreeView_reloadNode(n){
   var o = this;
   n = RObject.nvl(n, o._focusNode);
   if(!n){
      return o.reload();
   }
   n.removeChildren();
   o.loadNode(n);
}
function FDataTreeView_reload(){
   var o = this;
   o.clear();
   o.loadUrl();
}
function FDataTreeView_dispose(){
   var o = this;
   o.__base.FTreeView.dispose.call(o);
}
function FDataTreeView_onQueryLoaded(e){
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
function FDataTreeView_doQuery(){
   var o = this;
   var svc = RService.parse(o._queryService);
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
function FDataTreeView_removeNode(oNode){
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
      this._allNodes = nodes;
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
         oParent.imageHTML.src = this.imgEmpty;
      }
      return true;
   }
   return false;
}
function FDataTreeView_haveNodes(){
   return this.rootNode.hasChild();
}
function FDataTreeView_clearNodes(node){
   if(node){
      node.removeChildren();
   }
   return true;
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
function FDataTreeView_fetchExtendsAll(s){
   var o = this;
   if(s && RClass.isClass(s, FTreeNode)){
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
function FDataTreeView_getChangedChecks(){
   var o = this;
   var treeView = new TNode('TreeView');
   treeView.set('name', o.name);
   var rnd = RObject.nvl(o.rootNode, o);
   var cs = rnd.controls;
   for(var n = 0; n < cs.count; n++){
      var c = cs.value(n);
      c.pushChanged(treeView);
   }
   return treeView;
}
function FDataTreeView_tempAppendNodes(parent, config){
   parent = RObject.nvl(parent, this.workNode, this.rootNode);
   if(config && config._nodes){
      var count = config._nodes.count;
      if(count > 0){
         parent.child = true;
         parent.loaded = true;
         for(var n = 0; n < count; n++){
            var nc = config._nodes.get(n);
            if(nc && (nc.isName('Node') || nc.isName('TreeNode'))){
               var tn = RClass.create(FTreeNode);
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
function FDataTreeView_removeNodes(node){
   node = RObject.nvl(node, this.workNode, this.rootNode);
   if(node.hasChild()){
      node.removeChildren();
   }
   node.remove();
}
function FDataTreeView_tempAppendChild(child){
   var o = this;
   var hc = o._hHeadLine.insertCell();
   hc.height = '100%';
   if(RClass.isClass(child, FTreeColumn)){
      hc.appendChild(child._hPanel);
   }
}
function FTreeColumn(o){
   o = RClass.inherits(this, o, FControl);
   o._icon        = RClass.register(o, new APtyString('_icon'));
   o._dataName    = RClass.register(o, new APtyString('_dataName'));
   o._display     = RClass.register(o, new APtyBoolean('_display'), EBoolean.False);
   o._config      = RClass.register(o, new APtyConfig('_config'));
   o.oeBuild      = FTreeColumn_oeBuild;
   o.onBuildPanel = FTreeColumn_onBuildPanel;
   return o;
}
function FTreeColumn_oeBuild(event){
   var o = this;
   var r = o.__base.FControl.oeBuild.call(o, event);
   var h = o.hPanel;
   h.innerText = RString.nvl(o.label);
   h.noWrap = true;
   if(!o.display){
      h.style.display = 'block';
   }
   if(o.width){
      h.width = o.width;
   }
   return EEventStatus.Stop;
}
function FTreeColumn_onBuildPanel(){
   this.hPanel = RBuilder.create(null, 'TD');
}
function FTreeLevel(o){
   o = RClass.inherits(this, o, FControl);
   o._id        = RClass.register(o, new APtyString('_id'));
   o._color     = RClass.register(o, new APtyString('_color'));
   o._backColor = RClass.register(o, new APtyString('_backColor'));
   return o;
}
function FTreeNode(o){
   o = RClass.inherits(this, o, FContainer);
   o._valid            = RClass.register(o, new APtyBoolean('_isValid'), true);
   o._typeName         = RClass.register(o, new APtyString('_typeName'));
   o._uuid             = RClass.register(o, new APtyString('_uuid'));
   o._icon             = RClass.register(o, new APtyString('_icon'));
   o._checked          = RClass.register(o, new APtyBoolean('_checked'), false);
   o._extended         = RClass.register(o, new APtyBoolean('_extended'), false);
   o._child            = RClass.register(o, new APtyBoolean('_child'), false);
   o._note             = RClass.register(o, new APtyString('_note'));
   o._tag              = RClass.register(o, new APtyString('_tag'));
   o._styleNormal      = RClass.register(o, new AStyle('_styleNormal', 'Normal'));
   o._styleHover       = RClass.register(o, new AStyle('_styleHover', 'Hover'));
   o._styleSelect      = RClass.register(o, new AStyle('_styleSelect', 'Select'));
   o._styleImage       = RClass.register(o, new AStyle('_styleImage', 'Image'));
   o._styleIcon        = RClass.register(o, new AStyle('_styleIcon', 'Icon'));
   o._styleIconDisable = RClass.register(o, new AStyle('_styleIconDisable', 'IconDisable'));
   o._styleLabel       = RClass.register(o, new AStyle('_styleLabel', 'Label'));
   o._styleCell        = RClass.register(o, new AStyle('_styleCell', 'Cell'));
   o._tree             = null;
   o._level            = 0;
   o._attributes       = null;
   o._nodes            = null;
   o._statusLinked     = false;
   o._statusDisplay    = true;
   o._statusSelected   = false;
   o._statusLoaded     = false;
   o._statusHover      = false;
   o._hNodePanel       = null;
   o._hCheck           = null;
   o._hImage           = null;
   o._hIcon            = null;
   o._hLabel           = null;
   o.onNodeEnter       = RClass.register(o, new AEventMouseEnter('onNodeEnter'), FTreeNode_onNodeEnter);
   o.onNodeLeave       = RClass.register(o, new AEventMouseLeave('onNodeLeave'), FTreeNode_onNodeLeave);
   o.onNodeClick       = RClass.register(o, new AEventClick('onNodeClick'), FTreeNode_onNodeClick);
   o.onBuildPanel      = FTreeNode_onBuildPanel;
   o.oeBuild           = FTreeNode_oeBuild;
   o.construct         = FTreeNode_construct;
   o.type              = FTreeNode_type;
   o.setLabel          = FTreeNode_setLabel;
   o.setLevel          = FTreeNode_setLevel;
   o.get               = FTreeNode_get;
   o.set               = FTreeNode_set;
   o.check             = FTreeNode_check;
   o.setCheck          = FTreeNode_setCheck;
   o.hasChild          = FTreeNode_hasChild;
   o.topNode           = FTreeNode_topNode;
   o.topNodeByType     = FTreeNode_topNodeByType;
   o.show              = FTreeNode_show;
   o.hide              = FTreeNode_hide;
   o.select            = FTreeNode_select;
   o.extend            = FTreeNode_extend;
   o.extendAll         = FTreeNode_extendAll;
   o.createChild       = FTreeNode_createChild;
   o.appendNode        = FTreeNode_appendNode;
   o.push              = FTreeNode_push;
   o.remove            = FTreeNode_remove;
   o.removeChildren    = FTreeNode_removeChildren;
   o.click             = FTreeNode_click;
   o.refreshStyle      = FTreeNode_refreshStyle;
   o.propertyLoad      = FTreeNode_propertyLoad;
   o.propertySave      = FTreeNode_propertySave;
   o.loadConfig        = FTreeNode_loadConfig;
   o.reload           = FTreeNode_reload;
   o.reloadParent     = FTreeNode_reloadParent;
   o.loadQuery        = FTreeNode_loadQuery;
   o.isFolder         = FTreeNode_isFolder;
   o.dispose          = FTreeNode_dispose;
   o.innerDump        = FTreeNode_innerDump;
   o.findByName       = FTreeNode_findByName;
   o.findByUuid       = FTreeNode_findByUuid;
   o.checkChanged     = FTreeNode_checkChanged;
   o.pushChanged      = FTreeNode_pushChanged;
   o.getFullPath      = FTreeNode_getFullPath;
   return o;
}
function FTreeNode_onNodeEnter(e){
   var o = this;
   var t = o._tree;
   if(!t._focusNode || (t._focusNode && (t._focusNode != o))){
      o._statusHover = true;
      o.refreshStyle();
      t.lsnsEnter.process(t, o);
   }
}
function FTreeNode_onNodeLeave(e){
   var o = this;
   var t = o._tree;
   if(!t._focusNode || (t._focusNode && (t._focusNode != o))){
      o._statusHover = false;
      o.refreshStyle();
      t.lsnsLeave.process(t, o);
   }
}
function FTreeNode_onNodeClick(e){
   var o = this;
   var t = o._tree;
   var esn = e.hSender.tagName;
   if('INPUT' == esn){
      return;
   }
   var isImg = false;
   if('IMG' == esn){
      isImg = ('image' == e.hSender._linkType);
   }
   var isParent = false;
   var find = t._focusNode;
   while(find){
      if(find == o){
         isParent = true;
         break;
      }
      find = find.parent;
   }
   if(!isImg || (isImg && (isParent || !o._child))){
      t.selectNode(o, true);
   }
   if(!o._statusLoaded && o._child){
      o.extend(true);
      if(!isImg){
         t.lsnsClick.process(t, o);
      }
   }else{
      if(o._child){
        if(o.isFolder()){
           o.extend(!o._extended);
        }else{
            if(isImg){
               o.extend(!o._extended);
            }else{
               o.extend(true);
            }
        }
      }
      if((isImg && isParent) || (isImg && !o._child) || !isImg){
         t.lsnsClick.process(t, o);
      }
   }
}
function FTreeNode_onBuildPanel(e){
   var o = this;
   o._hPanel = RBuilder.createTableRow(e.hDocument, o.styleName('Panel'));
}
function FTreeNode_oeBuild(e){
   var o = this;
   var t = o._tree;
   var r = o.__base.FContainer.oeBuild.call(o, e);
   if(e.isBefore()){
      var hp = o._hPanel;
      hp.style.border = '1 solid red';
      o.attachEvent('onNodeEnter', hp, o.onNodeEnter);
      o.attachEvent('onNodeLeave', hp, o.onNodeLeave);
      o.attachEvent('onNodeClick', hp);
      var hnp = o._hNodePanel = RBuilder.appendTableCell(hp, o.styleName('Normal'));
      hnp.noWrap = true;
      var ni = o._child ? t._iconPlus : t._iconNode;
      var hi = o._hImage = RBuilder.appendIcon(hnp, o.styleName('Image'), ni, 16, 16);
      hi._linkType = 'image';
      var ni = RString.nvl(o._icon, o._typeName ? o._typeName._icon : null);
      if(ni){
         var hi = o._hIcon = RBuilder.appendIcon(hnp, o._valid ? o.styleName('Icon') : o.styleName('IconDisable'), ni, 16, 16);
      }else{
        var hi = o._hIcon = RBuilder.appendIcon(hnp, o._valid ? o.styleName('Icon') : o.styleName('IconDisable'), t._iconEmpty, 1, 1);
      }
      hi._linkType = 'icon';
      if(t.dispChecked){
         var hc = o._hCheck = RBuilder.appendCheck(hnp);
         hc.width = 13;
         hc.height = 13;
         hc.style.borderWidth = 0;
         o.setCheck(o._checked);
         t.linkEvent(o, 'onNodeCheckClick', hc);
      }
      o._hLabel = RBuilder.appendText(hnp, o.styleName('Label'));
      o.setLabel(o._label);
      var cs = t.columns;
      if(cs){
         var cc = cs.count();
         for(var n = 1; n < cc; n++){
            var c = cs.value(n);
            var hc = RBuilder.appendTableCell(hp, o.styleName('Cell'));
            hc.align='center';
            hc.noWrap = true;
            hc.innerText = RString.nvl(o.get(c.dataName));
            RHtml.displaySet(hc, c.display);
         }
      }
   }
   return r;
}
function FTreeNode_construct(){
   var o = this;
   o.__base.FContainer.construct.call(o);
   o._attributes = new TAttributes();
}
function FTreeNode_type(){
   var o = this;
   var t = o._tree;
   if(RString.isEmpty(o._typeName)){
      return null;
   }
   return t.findType(o._typeName);
}
function FTreeNode_setLabel(p){
   var o = this;
   o.__base.FContainer.setLabel.call(o, p)
   var s = '';
   if(!RString.isEmpty(o._label)){
      s = '&nbsp;' + o._label;
      if(o._tag){
         s += '&nbsp;<FONT color=blue>(' + o._tag + ')</FONT>';
      }
      if(o._note){
         s += '&nbsp;<FONT color=green>[ ' + o._note + ' ]</FONT>';
      }
   }
   o._hLabel.innerHTML = s;
}
function FTreeNode_setLevel(p){
   var o = this;
   var t = o._tree;
   o._level = p;
   o._hImage.style.marginLeft = t._indent * p;
}
function FTreeNode_get(n){
   return this._attributes.get(n);
}
function FTreeNode_set(n, v){
   this._attributes.set(n, v);
}
function FTreeNode_check(){
   return this._checked;
}
function FTreeNode_setCheck(p){
   var o = this;
   o._checked = p;
   o._hCheck.checked = p;
}
function FTreeNode_hasChild(){
   var o = this;
   if(o._child){
      var ns = o._nodes;
      if(ns){
         return !ns.isEmpty();
      }
   }
   return false;
}
function FTreeNode_topNode(){
   var r = this;
   while(r._parent){
      r = r._parent;
   }
   return r;
}
function FTreeNode_topNodeByType(t){
   var r = this;
   while(r){
      if(r._typeName == t){
         return r;
      }
      r = r._parent;
   }
   return null;
}
function FTreeNode_show(){
   var o = this;
   var t = o._tree;
   RHtml.displaySet(o._hPanel, true);
   var ns = o._nodes;
   if(ns){
      var c = ns.count();
      for(var i = 0; i < c; i++){
         var n = ns.get(i);
         if(!n._statusLinked){
            t.appendNode(n, o);
         }
         if(n._statusDisplay){
            RHtml.displaySet(n._hPanel, true);
            if(n._extended){
               n.show();
            }
         }
      }
   }
}
function FTreeNode_hide(){
   var o = this;
   var t = o._tree;
   if(o._hPanel){
      RHtml.displaySet(o._hPanel, false);
   }
   var cs = o._components;
   if(cs){
      var c = cs.count();
      for(var i = 0; i < c; i++){
         var cv = cs.value(i);
         if(cv){
            cv.hide();
         }
      }
   }
}
function FTreeNode_select(v){
   var o = this;
   o._statusSelected = v;
   if(v){
      o._statusHover = false;
   }
   o.refreshStyle();
}
function FTreeNode_extend(p){
   var o = this;
   var t = o._tree;
   if(!o._statusLoaded && o._child){
      if(t.__loading){
         return;
      }
      t.loadNode(o);
   }else{
      if(o._hImage && !o.hasChild()){
         o._hImage.src = RResource.iconPath(t._iconNode);
         return false;
      }
      o._extended = p;
      if(o._child && o._hImage){
         o._hImage.src = RResource.iconPath(p ? t._iconMinus : t._iconPlus);
      }
      var ns = o._nodes;
      if(p){
         o.show();
      }else if(ns){
         var nc = ns.count();
         for(var i = nc - 1; i >= 0; i--){
            ns.get(i).hide();
         }
      }
   }
   t.refresh();
}
function FTreeNode_extendAll(p){
   var o = this;
   o.extend(p);
   var cs = o._components;
   if(cs){
      var cc = cs.count();
      for(var i = 0; i < cc; i++){
         var c = cs.value(i);
         c.extendAll(p);
      }
   }
}
function FTreeNode_createChild(x){
   var r = null;
   if(x.isName('Node') || x.isName('TreeNode')){
      r = RClass.create(FTreeNode);
      r._tree = this._tree;
   }
   return r;
}
function FTreeNode_appendNode(p){
   var o = this;
   var t = o._tree;
   o.push(p);
   t.appendNode(p, o);
   o.extend(true);
}
function FTreeNode_push(c){
   var o = this;
   var t = o._tree;
   o.__base.FContainer.push.call(o, c);
   if(RClass.isClass(c, FTreeNode)){
      o._child = true;
      o._statusLoaded = true;
      var ns = o._nodes;
      if(!ns){
         ns = o._nodes = new TObjects();
      }
      c._tree = t;
      c._parent = o;
      ns.push(c);
      t._allNodes.pushUnique(c);
   }
}
function FTreeNode_remove(){
   var o = this;
   var t = o._tree;
   if(o._statusLinked){
      o.removeChildren();
      t.freeNode(o);
   }
}
function FTreeNode_removeChildren(){
   var ns = this._nodes;
   if(ns){
      var c = ns.count();
      for(var i = c - 1; i >= 0; i--){
         var n = ns.get(i);
         if(n){
            n.remove();
         }
      }
      ns.clear();
   }
}
function FTreeNode_click(){
   var o = this;
   var t = o._tree;
   t.selectNode(o, true);
   t.lsnsClick.process(t, o);
}
function FTreeNode_refreshStyle(){
   var o = this;
   var cs = o._hPanel.cells;
   var c = cs.length;
   if(o._statusSelected){
      for(var i = 0; i < c; i++){
         cs[i].className = o.styleName('Select');
      }
   }else{
      if(o._statusHover){
         for(var i = 0; i < c; i++){
            cs[i].className = o.styleName('Hover');
         }
      }else{
         for(var i = 0; i < c; i++){
            cs[i].className = o.styleName('Normal');
         }
      }
   }
}
function FTreeNode_propertyLoad(x){
   var o = this;
   var t = o._tree;
   o.__base.FContainer.propertyLoad.call(o, x);
   o._attributes.append(x.attrs);
   var ap = x.get('attributes')
   if(ap){
      o._attributes.unpack(ap);
   }
}
function FTreeNode_propertySave(x){
   var o = this;
   o.__base.FContainer.propertySave.call(o, x);
   x.set('type_name', o._typeName);
   x.set('attributes', o._attributes.pack());
}
function FTreeNode_loadConfig(x){
   var o = this;
   var t = o._tree;
   o._typeName = null;
   o._uuid = null;
   o._valid = true;
   o._icon = null;
   o._tag = null;
   o._note = null;
   o._child = false;
   o._checked = false;
   o._extended = true;
   o.propertyLoad(x);
   o._statusLinked = false;
   o._statusDisplay = true;
   o._statusHover = false;
   o._extended = false;
   o._statusSelected = false;
   o._statusLoaded = false;
   o._level = 0;
   var ni = o._child ? t._iconPlus : t._iconNode;
   o._hImage.src = RResource.iconPath(ni);
   var ni = RString.nvl(o._icon, o._typeName ? o._typeName._icon : null);
   o._hIcon.className = o._valid ? o.styleName('Icon') : o.styleName('IconDisable');
   if(ni){
     o._hIcon.style.width = 16;
     o._hIcon.style.height = 16;
      o._hIcon.src = RResource.iconPath(ni);
   }else{
      o._hIcon.style.width = 1;
      o._hIcon.style.height = 1
   }
   if(!RString.isEmpty(o._attributes.get('checked'))){
     o._checked = RBoolean.isTrue(o._attributes.get('checked'));
     if(o._hCheck){
         o._hCheck._checked = o._checked;
     }
   }
   o.setLabel(o._label);
}
function FTreeNode_reload(t){
   var o = this;
   if(t){
      o._tree.reload();
   }else{
      o._tree.reloadNode(o);
   }
}
function FTreeNode_reloadParent(){
   var o = this;
   if(o.parentNode){
      o._tree.reloadNode(o.parentNode);
   }else{
      o._tree.reload();
   }
}
function FTreeNode_loadQuery(x){
   var o = this;
   var sl = RString.nvl(x.get('label'), o._label);
   var sn = RString.nvl(x.get('note'), o._note);
   var text = '&nbsp;' + sl;
   if(!RString.isEmpty(sn)){
      text += '&nbsp;<FONT color=green>[ ' + sn + ' ]</FONT>';
   }
   o._hLabel.innerHTML = text;
   if(x.contains('visible')){
      o._statusDisplay = RBool.isTrue(x.get('visible'));
      o.setVisible(o._statusDisplay);
   }
}
function FTreeNode_dispose(){
   var o = this;
   o.__base.FContainer.dispose.call(o);
   o._hNodePanel = null;
   o._hImage = null;
   o._hIcon = null;
   o._hCheck = null;
   o._hLabel = null;
}
function FTreeNode_innerDump(s){
   var o = this;
   s.append(RClass._typeNameOf(o));
   s.append('[level=',  o._level);
   if(o._typeName){
      s.append(' type=',  o._typeName.name);
   }
   s.append(', icon=',  o._icon);
   s.append(', caption=', o._label);
   s.append(', child=', o._child);
   s.append(']');
}
function FTreeNode_findByName(n){
   var o = this;
   if(o.name == n){
      return o;
   }
   var cs = o.components;
   if(cs){
      var cc = cs.count;
      for(var i=0; i<cc; i++){
         var c = cs.value(i);
         if(c){
            if(c.name == n){
               return c;
            }
            if(c.components){
               var f = c.findByName(n);
               if(f){
                  return f;
               }
            }
         }
      }
   }
   return null;
}
function FTreeNode_findByUuid(u){
   var o = this;
   if(o._uuid == u){
      return o;
   }
   var cs = o.components;
   if(cs){
      for(var n=0; n<cs.count; n++){
         var c = cs.value(n);
         if(c){
            if(c._uuid == u){
               return c;
            }
            if(c.components){
               var f = c.findByUuid(u);
               if(f){
                  return f;
               }
            }
         }
      }
   }
   return null;
}
function FTreeNode_pushChanged(trd){
   var o = this;
    var d = new TNode();
    d.attrs = o._attributes;
    if(d.attrs){
         d.attrs.set('checked', RBoolean.toString(o.check()));
    }
    trd.push(d);
   if(o.components && o.components.count > 0){
      var cc = o.components.count;
      for(var n = 0; n < cc; n++){
         var c = o.components.value(n);
         if(RClass.isClass(c, FTreeNode)){
            c.pushChanged(trd);
         }
      }
   }
}
function FTreeNode_checkChanged(){
   var o = this;
   if(o._checked != o.check()){
      return true;
   }
   return false;
}
function FTreeNode_getFullPath(){
   var o = this;
   var path = '';
   if(o._label){
       path = o._label;
   }
    if(o.parent){
       var s = o.parent.getFullPath();
       if(!RString.isEmpty(s)){
           path = s + "/" + path;
       }
    }
    return path;
}
function FTreeNode_isFolder(){
   if(this._typeName){
       return (this._typeName._typeNameName == 'collections') ? true : false;
   }
}
function FTreeNodeType(o){
   o = RClass.inherits(this, o, FComponent);
   o._typeName    = RClass.register(o, new APtyString('_typeName', 'type'));
   o._icon        = RClass.register(o, new APtyString('_icon'));
   o._serviceName = RClass.register(o, new APtyString('_serviceName', 'service'));
   o._actionName  = RClass.register(o, new APtyString('_actionName', 'action'));
   o._config      = RClass.register(o, new APtyConfig('_config'));
   o.typeName     = FTreeNodeType_typeName;
   o.icon         = FTreeNodeType_icon;
   o.serviceName  = FTreeNodeType_serviceName;
   o.actionName   = FTreeNodeType_actionName;
   o.get          = FTreeNodeType_get;
   o.set          = FTreeNodeType_set;
   o.innerDump    = FTreeNodeType_innerDump;
   return o;
}
function FTreeNodeType_typeName(){
   return this._typeName;
}
function FTreeNodeType_icon(){
   return this._icon;
}
function FTreeNodeType_serviceName(){
   return this._serviceName;
}
function FTreeNodeType_actionName(){
   return this._actionName;
}
function FTreeNodeType_get(n){
   var o = this;
   return o._config ? o._config.get(n) : null;
}
function FTreeNodeType_set(n, v){
   var o = this;
   if(o._config){
      o._config.set(n, v)
   }
}
function FTreeNodeType_innerDump(s){
   var o = this;
   s.append(RClass.dump(o));
   s.append('[type=',  o._typeName);
   s.append(', icon=',  o._icon);
   s.append(', service=', o._serviceName);
   s.append(', action=', o._actionName);
   s.append(']');
}
function FTreeView(o){
   o = RClass.inherits(this, o, FContainer);
   o._optionCheck     = RClass.register(o, new APtyBoolean('_optionCheck'), false);
   o._indent          = RClass.register(o, new APtyInteger('_indent'), 16);
   o._styleNodePanel  = RClass.register(o, new AStyle('_styleNodePanel', 'NodePanel'));
   o._styleNodeForm   = RClass.register(o, new AStyle('_styleNodeForm', 'NodeForm'));
   o._attributes      = null;
   o._nodeTypes       = null;
   o._nodeColumns     = null;
   o._nodeLevels      = null;
   o._nodes           = null;
   o._allNodes        = null;
   o._defaultNodeType = null;
   o._focusNode       = null;
   o._loadingNode     = null;
   o._freeNodes       = null;
   o._iconPlus        = 'control.treeview.plus';
   o._iconMinus       = 'control.treeview.minus';
   o._iconNode        = 'control.treeview.node';
   o._iconLoading     = 'control.treeview.loading';
   o._hNodePanel      = null;
   o._hNodeForm       = null;
   o._hHeadLine       = null;
   o._hNodeRows       = null;
   o.lsnsEnter        = new TListeners();
   o.lsnsLeave        = new TListeners();
   o.lsnsClick        = new TListeners();
   o.onBuildPanel     = FTreeView_onBuildPanel;
   o.onNodeCheckClick = RClass.register(o, new AEventClick('onNodeCheckClick'), FTreeView_onNodeCheckClick);
   o.oeBuild          = FTreeView_oeBuild;
   o.construct        = FTreeView_construct;
   o.attributes       = FTreeView_attributes;
   o.nodeTypes        = FTreeView_nodeTypes;
   o.nodeColumns      = FTreeView_nodeColumns;
   o.nodeLevels       = FTreeView_nodeLevels;
   o.nodes            = FTreeView_nodes;
   o.findType         = FTreeView_findType;
   o.findByName       = FTreeView_findByName;
   o.findByUuid       = FTreeView_findByUuid;
   o.createChild      = FTreeView_createChild;
   o.createNode       = FTreeView_createNode;
   o.appendNode       = FTreeView_appendNode;
   o.selectNode       = FTreeView_selectNode;
   o.push             = FTreeView_push;
   o.freeNode         = FTreeView_freeNode;
   o.calculateHeight  = FTreeView_calculateHeight;
   o.extendAuto       = FTreeView_extendAuto;
   o.extendAll        = FTreeView_extendAll;
   o.loadNode         = RMethod.empty;
   o.refresh          = FTreeView_refresh;
   o.filterNode       = FTreeView_filterNode;
   o.clear            = FTreeView_clear;
   o.dispose          = FTreeView_dispose;
   return o;
}
function FTreeView_onBuildPanel(e){
   var o = this;
   o._hPanel = RBuilder.createTable(e.hDocument, o.styleName('Panel'));
   o._hPanel.width = '100%';
}
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
function FTreeView_oeBuild(e){
   var o = this;
   var r = o.__base.FContainer.oeBuild.call(o, e);
   if(e.isBefore()){
      var hr = RBuilder.appendTableRow(o._hPanel);
      var hc = RBuilder.appendTableCell(hr);
      var hnp = o._hNodePanel = RBuilder.appendDiv(hc, o.styleName('NodePanel'));
      var hnf = o._hNodeForm = RBuilder.appendTable(hnp, o.styleName('NodeForm'));
      hnf.width = '100%';
      o._hHeadLine = RBuilder.appendTableRow(hnf);
      o._hNodeRows = hnf.children[0];
      var ln = o._loadingNode = RClass.create(FTreeNode);
      ln._tree = o;
      ln._label = RContext.get('FTreeView:loading');
      ln._icon = o._iconLoading;
      ln.process(e);
      o.appendNode(ln);
      ln.hide();
   }else if(e.isAfter()){
      var ns = o._nodes;
      if(!ns.isEmpty()){
         var nc = ns.count;
         for(var i = 0; i < nc; i++){
            o.appendNode(ns.get(i));
         }
      }
      o.extendAuto();
   }
   return r;
}
function FTreeView_construct(){
   var o = this;
   o.__base.FContainer.construct.call(o);
   o._attributes = new TAttributes();
   o._nodeTypes = new TDictionary();
   o._nodeColumns = new TDictionary();
   o._nodeLevels = new TDictionary();
   o._nodes = new TObjects();
   o._allNodes = new TObjects();
   o._freeNodes = new TObjects();
   o._defaultNodeType = RClass.create(FTreeNodeType);
}
function FTreeView_attributes(){
   return this._attributes;
}
function FTreeView_nodeTypes(){
   return this._nodeTypes;
}
function FTreeView_nodeColumns(){
   return this._nodeColumns;
}
function FTreeView_nodeLevels(){
   return this._nodeLevels;
}
function FTreeView_nodes(){
   return this._nodes;
}
function FTreeView_findType(p){
   return this._nodeTypes.get(p);
}
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
function FTreeView_createNode(){
   var o = this;
   var n = o._freeNodes.pop();
   if(!n){
      var n = RClass.create(FTreeNode);
      n._tree = o;
      n.psBuild(o._hPanel);
   }
   RHtml.displaySet(n._hPanel, true);
   o._allNodes.push(n);
   return n;
}
function FTreeView_appendNode(n, p){
   var o = this;
   if(!n._statusLinked){
      var nh = n._hPanel;
      if(p){
         var nr = p._hPanel.rowIndex;
         var ns = p._nodes;
         if(ns){
            var nc = ns.count();
            for(var i = nc - 1; i >= 0; i--){
               var pn = ns.get(i)
               if(pn._statusLinked){
                  nr = pn._hPanel.rowIndex;
                  break;
               }
            }
         }
         if(nh.parentElement){
            if(nh.rowIndex > nr){
               nr++;
            }
            RHtml.tableMoveRow(o._hNodeForm, nh.rowIndex, nr);
         }else{
            o._hNodeRows.appendChild(nh);
            RHtml.tableMoveRow(o._hNodeForm, nh.rowIndex, nr+1);
         }
         n.setLevel(p._level + 1);
      }else{
         o._hNodeRows.appendChild(nh);
         n.setLevel(0);
         o.push(n);
      }
      n._statusLinked = true;
   }
}
function FTreeView_selectNode(n, s){
   var o = this;
   var fn = o._focusNode;
   if(s){
      if(n){
         if(fn){
            if(fn == n){
               return;
            }
            if(n.isFolder()){
               fn.select(true);
            }else{
               fn.select(false);
            }
         }
         if(!n.isFolder()){
            n.select(true);
            o._focusNode = n;
         }
      }
   }else{
      if(n){
         n.select(false);
      }
      if(fn){
         fn.select(false);
      }
   }
}
function FTreeView_push(p){
   var o = this;
   o.__base.FContainer.push.call(o, p);
   p._tree = o;
   if(RClass.isClass(p, FTreeColumn)){
      o._nodeColumns.set(p._name, p);
   }else if(RClass.isClass(p, FTreeLevel)){
      o._nodeLevels.set(p._id, p);
   }else if(RClass.isClass(p, FTreeNodeType)){
      o._nodeTypes.set(p._typeName, p);
   }else if(RClass.isClass(p, FTreeNode)){
      o._nodes.push(p);
      o._allNodes.push(p);
   }
}
function FTreeView_freeNode(p){
   var o = this;
   if(p._statusLinked){
      p._statusLinked = false;
      p.hidden();
      o._allNodes.remove(p);
      o._freeNodes.push(p);
   }
}
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
function FTreeView_refresh(){
   var o = this;
   if(o.parentObj){
      o.parentObj.style.height = o.calculateHeight();
   }
}
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
function FTreeView_dispose(){
   var o = this;
   o.__base.FContainer.dispose.call(o);
   var ns = o._nodes;
   if(ns){
      ns.dispose();
      o._nodes = null;
   }
   var ns = o._allNodes;
   if(ns){
      ns.dispose();
      o._allNodes = null;
   }
   o._hNodePanel = null;
   o._hNodeForm = null;
   o._hHeadLine = null;
   return true;
}
