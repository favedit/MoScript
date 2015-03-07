function FUiDataTreeView(o){
   o = RClass.inherits(this, o, FUiTreeView);
   o._serviceName     = RClass.register(o, new APtyString('_serviceName', 'service'));
   o._statusLoading   = false;
   o.lsnsLoaded       = new TListeners();
   o.lsnsNodeLoad     = new TListeners();
   o.lsnsNodeLoaded   = new TListeners();
   o.onLoaded         = FUiDataTreeView_onLoaded;
   o.onNodeLoaded     = FUiDataTreeView_onNodeLoaded;
   o.construct        = FUiDataTreeView_construct;
   o.buildNode        = FUiDataTreeView_buildNode;
   o.loadNode         = FUiDataTreeView_loadNode;
   o.loadUrl          = FUiDataTreeView_loadUrl;
   o.loadNodeUrl      = FUiDataTreeView_loadNodeUrl;
   o.loadService      = FUiDataTreeView_loadService;
   o.loadNodeService  = FUiDataTreeView_loadNodeService;
   o.reloadNode       = FUiDataTreeView_reloadNode;
   o.reload           = FUiDataTreeView_reload;
   o.dispose          = FUiDataTreeView_dispose;
   o._queryService    = RClass.register(o, new APtyString('_queryService'));
   o.onQueryLoaded    = FUiDataTreeView_onQueryLoaded;
   o.doQuery          = FUiDataTreeView_doQuery;
   o.removeNode       = FUiDataTreeView_removeNode;
   o.clearNodes       = FUiDataTreeView_clearNodes;
   o.getChangedChecks = FUiDataTreeView_getChangedChecks;
   o.fetchExtendsAll  = FUiDataTreeView_fetchExtendsAll;
   o.tempAppendNodes  = FUiDataTreeView_tempAppendNodes;
   o.removeNodes      = FUiDataTreeView_removeNodes;
   o.tempAppendChild  = FUiDataTreeView_tempAppendChild;
   return o;
}
function FUiDataTreeView_onLoaded(p){
   var o = this;
   var x = p.root;
   if(x == null){
      throw new TError(o, 'Load tree data failure.');
   }
   var xt = x.find('TreeView');
   RControl.build(o, xt, null, o._hPanel);
   o.lsnsLoaded.process(p);
   var s = xt.get('service');
   if(s){
      o.loadNodeService(s);
   }
}
function FUiDataTreeView_onNodeLoaded(p){
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
function FUiDataTreeView_construct(){
   var o = this;
   o.__base.FUiTreeView.construct.call(o);
}
function FUiDataTreeView_buildNode(pn, px){
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
function FUiDataTreeView_loadNode(pn, pf){
   var o = this;
   o._statusLoading = true;
   var nt = null;
   var fn = pn;
   var svc = o._serviceName;
   while(RClass.isClass(fn, FTreeNode)){
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
   o.lsnsNodeLoad.process(o, pn);
   var xd = new TXmlDocument();
   var x = xd.root();
   var fn = pn;
   while(RClass.isClass(fn, FTreeNode)){
      var xc = x.create('TreeNode');
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
   ln.setLevel(pn.level() + 1);
   ln.show();
   var sv = RService.parse(RString.nvl(svc, o._service));
   if(!sv){
      throw new TError(o, 'Unknown service.');
   }
   var xc = RConsole.find(FXmlConsole);
   var c = xc.sendAsync(sv.url, xd);
   c.parentNode = pn;
   c.lsnsLoad.register(o, o.onNodeLoaded);
}
function FUiDataTreeView_loadUrl(p){
   var o = this;
   var xc = RConsole.find(FXmlConsole);
   var c = xc.sendAsync(p);
   c.lsnsLoad.register(o, o.onLoaded);
}
function FUiDataTreeView_loadNodeUrl(p, n){
   var o = this;
   var xc = RConsole.find(FXmlConsole);
   var c = xc.sendAsync(p);
   c.parentNode = RObject.nvl(n, o._focusNode);
   c.lsnsLoad.register(o, o.onNodeLoaded);
}
function FUiDataTreeView_loadService(service, attrs){
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
function FUiDataTreeView_loadNodeService(ps, pa){
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
function FUiDataTreeView_reloadNode(n){
   var o = this;
   n = RObject.nvl(n, o._focusNode);
   if(!n){
      return o.reload();
   }
   n.removeChildren();
   o.loadNode(n);
}
function FUiDataTreeView_reload(){
   var o = this;
   o.clear();
   o.loadUrl();
}
function FUiDataTreeView_dispose(){
   var o = this;
   o.__base.FUiTreeView.dispose.call(o);
}
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
function FUiDataTreeView_doQuery(){
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
function FUiDataTreeView_removeNode(oNode){
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
function FUiDataTreeView_haveNodes(){
   return this.rootNode.hasChild();
}
function FUiDataTreeView_clearNodes(node){
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
function FUiDataTreeView_fetchExtendsAll(s){
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
function FUiDataTreeView_getChangedChecks(){
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
function FUiDataTreeView_tempAppendNodes(parent, config){
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
function FUiDataTreeView_removeNodes(node){
   node = RObject.nvl(node, this.workNode, this.rootNode);
   if(node.hasChild()){
      node.removeChildren();
   }
   node.remove();
}
function FUiDataTreeView_tempAppendChild(child){
   var o = this;
   var hc = o._hHeadLine.insertCell();
   hc.height = '100%';
   if(RClass.isClass(child, FTreeColumn)){
      hc.appendChild(child._hPanel);
   }
}
function FUiTreeColumn(o){
   o = RClass.inherits(this, o, FUiControl);
   o._icon        = RClass.register(o, new APtyString('_icon'));
   o._dataName    = RClass.register(o, new APtyString('_dataName'));
   o._display     = RClass.register(o, new APtyBoolean('_display'), EBoolean.False);
   o._config      = RClass.register(o, new APtyConfig('_config'));
   o.oeBuild      = FUiTreeColumn_oeBuild;
   o.onBuildPanel = FUiTreeColumn_onBuildPanel;
   return o;
}
function FUiTreeColumn_oeBuild(event){
   var o = this;
   var r = o.__base.FUiControl.oeBuild.call(o, event);
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
function FUiTreeColumn_onBuildPanel(){
   this.hPanel = RBuilder.create(null, 'TD');
}
function FUiTreeLevel(o){
   o = RClass.inherits(this, o, FUiControl);
   o._id        = RClass.register(o, new APtyString('_id'));
   o._color     = RClass.register(o, new APtyString('_color'));
   o._backColor = RClass.register(o, new APtyString('_backColor'));
   return o;
}
function FUiTreeNode(o){
   o = RClass.inherits(this, o, FUiContainer, MDataProperties);
   o._valid            = RClass.register(o, new APtyBoolean('_isValid'), true);
   o._typeName         = RClass.register(o, new APtyString('_typeName', 'type'));
   o._uuid             = RClass.register(o, new APtyString('_uuid'));
   o._icon             = RClass.register(o, new APtyString('_icon'));
   o._checked          = RClass.register(o, new APtyBoolean('_checked'), false);
   o._extended         = RClass.register(o, new APtyBoolean('_extended'), false);
   o._child            = RClass.register(o, new APtyBoolean('_child'), false);
   o._note             = RClass.register(o, new APtyString('_note'));
   o._tag              = RClass.register(o, new APtyString('_tag'));
   o._styleNormal      = RClass.register(o, new AStyle('_styleNormal'));
   o._styleHover       = RClass.register(o, new AStyle('_styleHover'));
   o._styleSelect      = RClass.register(o, new AStyle('_styleSelect'));
   o._styleImage       = RClass.register(o, new AStyle('_styleImage'));
   o._styleIcon        = RClass.register(o, new AStyle('_styleIcon'));
   o._styleIconDisable = RClass.register(o, new AStyle('_styleIconDisable'));
   o._styleLabel       = RClass.register(o, new AStyle('_styleLabel'));
   o._styleCell        = RClass.register(o, new AStyle('_styleCell'));
   o._tree             = null;
   o._level            = 0;
   o._attributes       = null;
   o._nodes            = null;
   o._cells            = null;
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
   o.onBuildPanel      = FUiTreeNode_onBuildPanel;
   o.onBuild           = FUiTreeNode_onBuild;
   o.onNodeEnter       = RClass.register(o, new AEventMouseEnter('onNodeEnter'), FUiTreeNode_onNodeEnter);
   o.onNodeLeave       = RClass.register(o, new AEventMouseLeave('onNodeLeave'), FUiTreeNode_onNodeLeave);
   o.onNodeClick       = RClass.register(o, new AEventClick('onNodeClick'), FUiTreeNode_onNodeClick);
   o.construct         = FUiTreeNode_construct;
   o.type              = FUiTreeNode_type;
   o.typeName          = FUiTreeNode_typeName;
   o.setTypeName       = FUiTreeNode_setTypeName;
   o.setLabel          = FUiTreeNode_setLabel;
   o.setNote           = FUiTreeNode_setNote;
   o.level             = FUiTreeNode_level;
   o.setLevel          = FUiTreeNode_setLevel;
   o.cell              = FUiTreeNode_cell;
   o.cells             = FUiTreeNode_cells;
   o.check             = FUiTreeNode_check;
   o.setCheck          = FUiTreeNode_setCheck;
   o.setImage          = FUiTreeNode_setImage;
   o.setIcon           = FUiTreeNode_setIcon;
   o.get               = FUiTreeNode_get;
   o.set               = FUiTreeNode_set;
   o.hasChild          = FUiTreeNode_hasChild;
   o.topNode           = FUiTreeNode_topNode;
   o.topNodeByType     = FUiTreeNode_topNodeByType;
   o.show              = FUiTreeNode_show;
   o.hide              = FUiTreeNode_hide;
   o.select            = FUiTreeNode_select;
   o.extend            = FUiTreeNode_extend;
   o.extendAll         = FUiTreeNode_extendAll;
   o.searchLast        = FUiTreeNode_searchLast;
   o.createChild       = FUiTreeNode_createChild;
   o.appendChild       = FUiTreeNode_appendChild;
   o.appendNode        = FUiTreeNode_appendNode;
   o.push              = FUiTreeNode_push;
   o.remove            = FUiTreeNode_remove;
   o.removeChildren    = FUiTreeNode_removeChildren;
   o.reset             = FUiTreeNode_reset;
   o.click             = FUiTreeNode_click;
   o.refreshStyle      = FUiTreeNode_refreshStyle;
   o.propertyLoad      = FUiTreeNode_propertyLoad;
   o.propertySave      = FUiTreeNode_propertySave;
   o.loadConfig        = FUiTreeNode_loadConfig;
   o.reload           = FUiTreeNode_reload;
   o.reloadParent     = FUiTreeNode_reloadParent;
   o.loadQuery        = FUiTreeNode_loadQuery;
   o.isFolder         = FUiTreeNode_isFolder;
   o.dispose          = FUiTreeNode_dispose;
   o.innerDump        = FUiTreeNode_innerDump;
   o.findByName       = FUiTreeNode_findByName;
   o.findByUuid       = FUiTreeNode_findByUuid;
   o.checkChanged     = FUiTreeNode_checkChanged;
   o.pushChanged      = FUiTreeNode_pushChanged;
   o.getFullPath      = FUiTreeNode_getFullPath;
   return o;
}
function FUiTreeNode_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createTableRow(p, o.styleName('Panel'));
}
function FUiTreeNode_onBuild(p){
   var o = this;
   var t = o._tree;
   var r = o.__base.FUiContainer.onBuild.call(o, p);
   var hp = o._hPanel;
   o.attachEvent('onNodeEnter', hp, o.onNodeEnter);
   o.attachEvent('onNodeLeave', hp, o.onNodeLeave);
   o.attachEvent('onNodeClick', hp);
   var hnp = o._hNodePanel = RBuilder.appendTableCell(hp, o.styleName('Normal'));
   hnp.noWrap = true;
   var hi = o._hImage = RBuilder.appendIcon(hnp, o.styleName('Image'), null, 16, 16);
   hi._linkType = 'image';
   o.setImage();
   var hi = o._hIcon = RBuilder.appendIcon(hnp, null, null, 16, 16)
   hi._linkType = 'icon';
   o.setIcon(o._icon);
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
   var cs = t._nodeColumns;
   if(cs){
      var cc = cs.count();
      for(var n = 0; n < cc; n++){
         var c = cs.value(n);
         var nc = RClass.create(FUiTreeNodeCell);
         nc._column = c;
         nc.build(p);
         o.push(nc);
      }
   }
}
function FUiTreeNode_onNodeEnter(e){
   var o = this;
   var t = o._tree;
   if(!t._focusNode || (t._focusNode && (t._focusNode != o))){
      o._statusHover = true;
      o.refreshStyle();
      t.lsnsEnter.process(t, o);
   }
}
function FUiTreeNode_onNodeLeave(e){
   var o = this;
   var t = o._tree;
   if(!t._focusNode || (t._focusNode && (t._focusNode != o))){
      o._statusHover = false;
      o.refreshStyle();
      t.lsnsLeave.process(t, o);
   }
}
function FUiTreeNode_onNodeClick(e){
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
function FUiTreeNode_construct(){
   var o = this;
   o.__base.FUiContainer.construct.call(o);
   o._attributes = new TAttributes();
}
function FUiTreeNode_type(){
   var o = this;
   var t = o._tree;
   if(RString.isEmpty(o._typeName)){
      return null;
   }
   return t.findType(o._typeName);
}
function FUiTreeNode_typeName(){
   return this._typeName;
}
function FUiTreeNode_setTypeName(p){
   var o = this;
   o._typeName = p;
   o.setIcon();
}
function FUiTreeNode_setLabel(p){
   var o = this;
   o.__base.FUiContainer.setLabel.call(o, p)
   var h = o._hLabel;
   if(h){
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
      h.innerHTML = s;
   }
}
function FUiTreeNode_setNote(p){
   var o = this;
   o._note = RString.empty(p);
   o.setLabel(o._label);
}
function FUiTreeNode_level(){
   return this._level;
}
function FUiTreeNode_setLevel(p){
   var o = this;
   o._level = p;
   var h = o._hNodePanel;
   if(h){
      h.style.paddingLeft = (o._tree._indent * p) + 'px';
   }
}
function FUiTreeNode_cell(p){
   return this._cells.get(p);
}
function FUiTreeNode_cells(){
   return this._cells;
}
function FUiTreeNode_check(){
   return this._checked;
}
function FUiTreeNode_setCheck(p){
   var o = this;
   o._checked = p;
   if(!RString.isEmpty(o._attributes.get('checked'))){
     o._checked = RBoolean.isTrue(o._attributes.get('checked'));
     if(o._hCheck){
         o._hCheck._checked = o._checked;
     }
   }
}
function FUiTreeNode_setImage(){
   var o = this;
   var t = o._tree;
   var h = o._hImage;
   if(h){
      var ni = o._child ? t._iconPlus : t._iconNode;
      h.src = RResource.iconPath(ni);
   }
}
function FUiTreeNode_setIcon(p){
   var o = this;
   o._icon = p;
   var h = o._hIcon;
   if(h){
      var ni = null;
      if(o._icon){
         ni = p;
      }else{
         var t = o.type();
         if(t){
            ni = t.icon();
         }
      }
      if(ni){
         RHtml.displaySet(h, true);
         h.style.width = 16;
         h.style.height = 16;
         h.className = o._valid ? o.styleName('Icon') : o.styleName('IconDisable');
         h.src = RResource.iconPath(ni);
      }else{
         RHtml.displaySet(h, false);
      }
   }
}
function FUiTreeNode_get(n){
   return this._attributes.get(n);
}
function FUiTreeNode_set(n, v){
   this._attributes.set(n, v);
}
function FUiTreeNode_hasChild(){
   var o = this;
   if(o._child){
      var ns = o._nodes;
      if(ns){
         return !ns.isEmpty();
      }
   }
   return false;
}
function FUiTreeNode_topNode(){
   var r = this;
   while(r._parent){
      r = r._parent;
   }
   return r;
}
function FUiTreeNode_topNodeByType(t){
   var r = this;
   while(r){
      if(r._typeName == t){
         return r;
      }
      r = r._parent;
   }
   return null;
}
function FUiTreeNode_show(){
   var o = this;
   var t = o._tree;
   RHtml.visibleSet(o._hPanel, true);
   var ns = o._nodes;
   if(ns){
      var c = ns.count();
      for(var i = 0; i < c; i++){
         var n = ns.get(i);
         if(!n._statusLinked){
            t.appendNode(n, o);
         }
         if(n._statusDisplay){
            RHtml.visibleSet(n._hPanel, true);
            if(n._extended){
               n.show();
            }
         }
      }
   }
}
function FUiTreeNode_hide(){
   var o = this;
   var t = o._tree;
   if(o._hPanel){
      RHtml.visibleSet(o._hPanel, false);
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
function FUiTreeNode_select(v){
   var o = this;
   o._statusSelected = v;
   if(v){
      o._statusHover = false;
   }
   o.refreshStyle();
}
function FUiTreeNode_extend(p){
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
function FUiTreeNode_extendAll(p){
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
function FUiTreeNode_searchLast(){
   var o = this;
   var s = o._nodes;
   if(s){
      for(var i = s.count() - 1; i >= 0; i--){
         var n = s.get(i)
         if(n._statusLinked){
            return n.searchLast();
         }
      }
   }
   return o;
}
function FUiTreeNode_createChild(x){
   var r = null;
   if(x.isName('Node') || x.isName('TreeNode')){
      r = RClass.create(FUiTreeNode);
      r._tree = this._tree;
   }
   return r;
}
function FUiTreeNode_appendChild(p){
   var o = this;
   if(RClass.isClass(p, FUiTreeNodeCell)){
      o._hPanel.appendChild(p._hPanel);
   }
}
function FUiTreeNode_appendNode(p){
   var o = this;
   var t = o._tree;
   o.push(p);
   t.appendNode(p, o);
   o.extend(true);
}
function FUiTreeNode_push(c){
   var o = this;
   var t = o._tree;
   o.__base.FUiContainer.push.call(o, c);
   if(RClass.isClass(c, FUiTreeNode)){
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
   if(RClass.isClass(c, FUiTreeNodeCell)){
      var cs = o._cells;
      if(!cs){
         cs = o._cells = new TDictionary();
      }
      c._parent = o;
      c._tree = t;
      c._node = o;
      cs.set(c._column._name, c);
   }
}
function FUiTreeNode_remove(){
   var o = this;
   var t = o._tree;
   if(o._statusLinked){
      o.removeChildren();
      t.freeNode(o);
   }
}
function FUiTreeNode_removeChildren(){
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
function FUiTreeNode_reset(){
   var o = this;
   o._typeName = null;
   o._uuid = null;
   o._valid = true;
   o._icon = null;
   o._tag = null;
   o._note = null;
   o._child = false;
   o._checked = false;
   o._extended = true;
   o._statusLinked = false;
   o._statusDisplay = true;
   o._statusHover = false;
   o._extended = false;
   o._statusSelected = false;
   o._statusLoaded = false;
   o._level = 0;
}
function FUiTreeNode_click(){
   var o = this;
   var t = o._tree;
   t.selectNode(o, true);
   t.lsnsClick.process(t, o);
}
function FUiTreeNode_refreshStyle(){
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
function FUiTreeNode_propertyLoad(x){
   var o = this;
   var t = o._tree;
   o.__base.FUiContainer.propertyLoad.call(o, x);
   o._attributes.append(x.attrs);
   var ap = x.get('attributes')
   if(ap){
      o._attributes.unpack(ap);
   }
}
function FUiTreeNode_propertySave(x){
   var o = this;
   o.__base.FUiContainer.propertySave.call(o, x);
   x.set('type_name', o._typeName);
   x.set('attributes', o._attributes.pack());
}
function FUiTreeNode_loadConfig(x){
   var o = this;
   o.reset();
   o.propertyLoad(x);
   o.setLabel(o._label);
   o.setCheck(o._checked);
   o.setImage();
   o.setIcon(o._icon);
}
function FUiTreeNode_reload(t){
   var o = this;
   if(t){
      o._tree.reload();
   }else{
      o._tree.reloadNode(o);
   }
}
function FUiTreeNode_reloadParent(){
   var o = this;
   if(o.parentNode){
      o._tree.reloadNode(o.parentNode);
   }else{
      o._tree.reload();
   }
}
function FUiTreeNode_loadQuery(x){
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
function FUiTreeNode_dispose(){
   var o = this;
   o.__base.FUiContainer.dispose.call(o);
   o._hNodePanel = null;
   o._hImage = null;
   o._hIcon = null;
   o._hCheck = null;
   o._hLabel = null;
}
function FUiTreeNode_innerDump(s){
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
function FUiTreeNode_findByName(n){
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
function FUiTreeNode_findByUuid(u){
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
function FUiTreeNode_pushChanged(trd){
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
         if(RClass.isClass(c, FUiTreeNode)){
            c.pushChanged(trd);
         }
      }
   }
}
function FUiTreeNode_checkChanged(){
   var o = this;
   if(o._checked != o.check()){
      return true;
   }
   return false;
}
function FUiTreeNode_getFullPath(){
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
function FUiTreeNode_isFolder(){
   if(this._typeName){
       return (this._typeName._typeNameName == 'collections') ? true : false;
   }
}
function FUiTreeNodeCell(o){
   o = RClass.inherits(this, o, FUiControl, MListenerClick, MListenerDoubleClick);
   o._stylePanel       = RClass.register(o, new AStyle('_stylePanel'));
   o._styleCell        = RClass.register(o, new AStyle('_styleCell', 'Cell'));
   o._tree             = null;
   o._column           = null;
   o._level            = 0;
   o._node             = null;
   o._hImage           = null;
   o._hIcon            = null;
   o._hLabel           = null;
   o.onBuildPanel      = FUiTreeNodeCell_onBuildPanel;
   o.onBuild           = FUiTreeNodeCell_onBuild;
   o.onClick           = RClass.register(o, new AEventClick('onClick'), FUiTreeNodeCell_onClick);
   o.onDoubleClick     = RClass.register(o, new AEventDoubleClick('onDoubleClick'), FUiTreeNodeCell_onDoubleClick);
   o.construct         = FUiTreeNodeCell_construct;
   o.icon              = FUiTreeNodeCell_icon;
   o.setIcon           = FUiTreeNodeCell_setIcon;
   o.get               = FUiTreeNodeCell_get;
   o.set               = FUiTreeNodeCell_set;
   return o;
}
function FUiTreeNodeCell_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createTableCell(p, o.styleName('Panel'));
}
function FUiTreeNodeCell_onBuild(p){
   var o = this;
   var t = o._tree;
   var r = o.__base.FUiControl.onBuild.call(o, p);
   var h = o._hPanel;
   o.attachEvent('onClick', h);
   o.attachEvent('onDoubleClick', h);
}
function FUiTreeNodeCell_onClick(p){
   var o = this;
   p.treeNode = o._node;
   p.treeColumn = o._column;
   p.treeNodeCell = o;
   o.processClickListener(p);
}
function FUiTreeNodeCell_onDoubleClick(p){
   var o = this;
   p.treeNode = o._node;
   p.treeColumn = o._column;
   p.treeNodeCell = o;
   o.processDoubleClickListener(p);
}
function FUiTreeNodeCell_construct(){
   var o = this;
   o.__base.FUiControl.construct.call(o);
   o._attributes = new TAttributes();
}
function FUiTreeNodeCell_icon(){
   return o._icon;
}
function FUiTreeNodeCell_setIcon(p){
   var o = this;
   var h = o._hIcon;
   if(!h){
      h = o._hIcon = RBuilder.appendIcon(o._hPanel, null, null, 16, 16)
   }
   h.src = RResource.iconPath(p);
}
function FUiTreeNodeCell_get(){
}
function FUiTreeNodeCell_set(p){
}
function FUiTreeNodeType(o){
   o = RClass.inherits(this, o, FUiComponent);
   o._linker   = RClass.register(o, new APtyString('_linker'));
   o._icon     = RClass.register(o, new APtyString('_icon'));
   o._service  = RClass.register(o, new APtyString('_service'));
   o._action   = RClass.register(o, new APtyString('_action'));
   o._config   = RClass.register(o, new APtyConfig('_config'));
   o.linker    = FUiTreeNodeType_linker;
   o.icon      = FUiTreeNodeType_icon;
   o.service   = FUiTreeNodeType_service;
   o.action    = FUiTreeNodeType_action;
   o.get       = FUiTreeNodeType_get;
   o.set       = FUiTreeNodeType_set;
   o.innerDump = FUiTreeNodeType_innerDump;
   return o;
}
function FUiTreeNodeType_linker(){
   return this._linker;
}
function FUiTreeNodeType_icon(){
   return this._icon;
}
function FUiTreeNodeType_service(){
   return this._service;
}
function FUiTreeNodeType_action(){
   return this._action;
}
function FUiTreeNodeType_get(n){
   var o = this;
   return o._config ? o._config.get(n) : null;
}
function FUiTreeNodeType_set(n, v){
   var o = this;
   if(o._config){
      o._config.set(n, v)
   }
}
function FUiTreeNodeType_innerDump(s){
   var o = this;
   s.append(RClass.dump(o));
   s.append('[linker=',  o._linker);
   s.append(', icon=',  o._icon);
   s.append(', service=', o._service);
   s.append(', action=', o._action);
   s.append(']');
}
function FUiTreeView(o){
   o = RClass.inherits(this, o, FUiContainer);
   o._optionCheck     = RClass.register(o, new APtyBoolean('_optionCheck'), false);
   o._indent          = RClass.register(o, new APtyInteger('_indent'), 16);
   o._stylePanel      = RClass.register(o, new AStyle('_stylePanel', 'Panel'));
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
   o.onBuildPanel     = FUiTreeView_onBuildPanel;
   o.onBuild          = FUiTreeView_onBuild;
   o.onNodeCheckClick = RClass.register(o, new AEventClick('onNodeCheckClick'), FUiTreeView_onNodeCheckClick);
   o.construct        = FUiTreeView_construct;
   o.attributes       = FUiTreeView_attributes;
   o.nodeTypes        = FUiTreeView_nodeTypes;
   o.nodeColumns      = FUiTreeView_nodeColumns;
   o.nodeLevels       = FUiTreeView_nodeLevels;
   o.nodes            = FUiTreeView_nodes;
   o.findType         = FUiTreeView_findType;
   o.findByName       = FUiTreeView_findByName;
   o.findByUuid       = FUiTreeView_findByUuid;
   o.createChild      = FUiTreeView_createChild;
   o.createNode       = FUiTreeView_createNode;
   o.appendNode       = FUiTreeView_appendNode;
   o.selectNode       = FUiTreeView_selectNode;
   o.push             = FUiTreeView_push;
   o.freeNode         = FUiTreeView_freeNode;
   o.calculateHeight  = FUiTreeView_calculateHeight;
   o.extendAuto       = FUiTreeView_extendAuto;
   o.extendAll        = FUiTreeView_extendAll;
   o.loadNode         = RMethod.empty;
   o.refresh          = FUiTreeView_refresh;
   o.filterNode       = FUiTreeView_filterNode;
   o.clear            = FUiTreeView_clear;
   o.dispose          = FUiTreeView_dispose;
   return o;
}
function FUiTreeView_onBuildPanel(e){
   var o = this;
   o._hPanel = RBuilder.createTable(e.hDocument, o.styleName('Panel'));
}
function FUiTreeView_onBuild(p){
   var o = this;
   o.__base.FUiContainer.onBuild.call(o, p);
   var hr = RBuilder.appendTableRow(o._hPanel);
   var hc = RBuilder.appendTableCell(hr);
   var hnp = o._hNodePanel = RBuilder.appendDiv(hc, o.styleName('NodePanel'));
   var hnf = o._hNodeForm = RBuilder.appendTable(hnp, o.styleName('NodeForm'));
   hnf.width = '100%';
   o._hHeadLine = RBuilder.appendTableRow(hnf);
   o._hNodeRows = hnf.children[0];
   var ln = o._loadingNode = RClass.create(FUiTreeNode);
   ln._tree = o;
   ln._label = RContext.get('FUiTreeView:loading');
   ln._icon = o._iconLoading;
   ln.build(p);
   o.appendNode(ln);
   ln.hide();
   var ns = o._nodes;
   if(!ns.isEmpty()){
      var nc = ns.count();
      for(var i = 0; i < nc; i++){
         o.appendNode(ns.get(i));
      }
   }
   o.extendAuto();
}
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
            for(var n=0; n<pcc; n++){
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
function FUiTreeView_construct(){
   var o = this;
   o.__base.FUiContainer.construct.call(o);
   o._attributes = new TAttributes();
   o._nodeTypes = new TDictionary();
   o._nodeColumns = new TDictionary();
   o._nodeLevels = new TDictionary();
   o._nodes = new TObjects();
   o._allNodes = new TObjects();
   o._freeNodes = new TObjects();
   o._defaultNodeType = RClass.create(FUiTreeNodeType);
}
function FUiTreeView_attributes(){
   return this._attributes;
}
function FUiTreeView_nodeTypes(){
   return this._nodeTypes;
}
function FUiTreeView_nodeColumns(){
   return this._nodeColumns;
}
function FUiTreeView_nodeLevels(){
   return this._nodeLevels;
}
function FUiTreeView_nodes(){
   return this._nodes;
}
function FUiTreeView_findType(p){
   return this._nodeTypes.get(p);
}
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
function FUiTreeView_findByUuid(p){
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
function FUiTreeView_createNode(){
   var o = this;
   var n = o._freeNodes.pop();
   if(!n){
      var n = RClass.create(FUiTreeNode);
      n._tree = o;
      n.build(o._hPanel);
   }
   RHtml.visibleSet(n._hPanel, true);
   o._allNodes.push(n);
   return n;
}
function FUiTreeView_appendNode(n, p){
   var o = this;
   if(!n._statusLinked){
      var nh = n._hPanel;
      if(p){
         var nl = p.searchLast();
         var nr = nl._hPanel.rowIndex;
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
      }
      n._statusLinked = true;
   }
}
function FUiTreeView_selectNode(n, s){
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
function FUiTreeView_push(p){
   var o = this;
   o.__base.FUiContainer.push.call(o, p);
   p._tree = o;
   if(RClass.isClass(p, FUiTreeColumn)){
      o._nodeColumns.set(p.name(), p);
   }else if(RClass.isClass(p, FUiTreeLevel)){
      o._nodeLevels.set(p.id(), p);
   }else if(RClass.isClass(p, FUiTreeNodeType)){
      o._nodeTypes.set(p.linker(), p);
   }else if(RClass.isClass(p, FUiTreeNode)){
      o._nodes.push(p);
      o._allNodes.push(p);
   }
}
function FUiTreeView_freeNode(p){
   var o = this;
   if(p._statusLinked){
      p._statusLinked = false;
      p.hidden();
      o._allNodes.remove(p);
      o._freeNodes.push(p);
   }
}
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
function FUiTreeView_refresh(){
   var o = this;
   if(o.parentObj){
      o.parentObj.style.height = o.calculateHeight();
   }
}
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
function FUiTreeView_clear(){
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
function FUiTreeView_dispose(){
   var o = this;
   o.__base.FUiContainer.dispose.call(o);
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
