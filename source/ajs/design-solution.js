function FDsSolutionCatalogContent(o){
   o = RClass.inherits(this, o, FUiDataTreeView, MListenerSelected);
   o._iconView             = 'design3d.mesh.view';
   o._iconViewNot          = 'design3d.mesh.viewno';
   o._activeSpace          = null;
   o._materials            = null;
   o.onLoaded              = FDsSolutionCatalogContent_onLoaded;
   o.onBuild               = FDsSolutionCatalogContent_onBuild;
   o.onLoadDisplay         = FDsSolutionCatalogContent_onLoadDisplay;
   o.onNodeClick           = FDsSolutionCatalogContent_onNodeClick;
   o.onNodeViewClick       = FDsSolutionCatalogContent_onNodeViewClick;
   o.onNodeViewDoubleClick = FDsSolutionCatalogContent_onNodeViewDoubleClick;
   o.lsnsSelect            = null;
   o.construct             = FDsSolutionCatalogContent_construct;
   o.buildPrivate          = FDsSolutionCatalogContent_buildPrivate;
   o.buildRecommend        = FDsSolutionCatalogContent_buildRecommend;
   o.buildGroup            = FDsSolutionCatalogContent_buildGroup;
   o.buildCatalog          = FDsSolutionCatalogContent_buildCatalog;
   o.selectObject          = FDsSolutionCatalogContent_selectObject;
   o.showObject            = FDsSolutionCatalogContent_showObject;
   o.dispose               = FDsSolutionCatalogContent_dispose;
   return o;
}
function FDsSolutionCatalogContent_onLoaded(p){
   var o = this;
   o.__base.FUiDataTreeView.onLoaded.call(o, p);
   this.buildCatalog();
}
function FDsSolutionCatalogContent_onBuild(p){
   var o = this;
   o.__base.FUiDataTreeView.onBuild.call(o, p);
   o.lsnsClick.register(o, o.onNodeClick);
   o.loadUrl('/cloud.describe.tree.ws?action=query&code=resource.solution');
}
function FDsSolutionCatalogContent_onLoadDisplay(p){
   var o = this;
   var n = p._linkNode;
   o.buildRecommend(n, p);
}
function FDsSolutionCatalogContent_onNodeClick(t, n){
   var o = this;
   var s = n.dataPropertyGet('linker');
   o.selectObject(s);
}
function FDsSolutionCatalogContent_onNodeViewClick(p){
   var o = this;
   var c = p.treeNodeCell;
   var s = p.treeNode.dataPropertyGet('linker');
   if(RClass.isClass(s, FDisplay)){
      if(p.ctrlKey){
         var ds = o._displays;
         for(var i = ds.count() - 1; i >= 0; i--){
            var nd = ds.get(i);
            var d = nd.dataPropertyGet('linker');
            d._visible = false;
            nd.cell('view').setIcon(o._iconViewNot);
         }
         s._visible = true;
         c.setIcon(o._iconView);
      }else{
         s._visible = !s._visible;
         c.setIcon(s._visible ? o._iconView : o._iconViewNot);
      }
   }
   if(RClass.isClass(s, FDrawable)){
      if(p.ctrlKey){
         var rs = o._renderables;
         for(var i = rs.count() - 1; i >= 0; i--){
            var nr = rs.get(i);
            var r = nr.dataPropertyGet('linker');
            r._visible = false;
            nr.cell('view').setIcon(o._iconViewNot);
         }
         s._visible = true;
         c.setIcon(o._iconView);
      }else{
         s._visible = !s._visible;
         c.setIcon(s._visible ? o._iconView : o._iconViewNot);
      }
   }
   if(RClass.isClass(s, FG3dMaterial)){
      if(p.ctrlKey){
         var ms = o._materials;
         for(var i = ms.count() - 1; i >= 0; i--){
            var nm = ms.get(i);
            var m = nm.dataPropertyGet('linker');
            m._visible = false;
            nm.cell('view').setIcon(o._iconViewNot);
         }
         s._visible = true;
         c.setIcon(o._iconView);
      }else{
         s._visible = !s._visible;
         c.setIcon(s._visible ? o._iconView : o._iconViewNot);
      }
   }
}
function FDsSolutionCatalogContent_onNodeViewDoubleClick(p){
   var o = this;
   var n = p.treeNode;
   var c = p.treeNodeCell;
   var s = n.dataPropertyGet('linker');
   if(RClass.isClass(s, FDisplay)){
      var s = o._displays;
      for(var i = s.count() - 1; i >= 0; i--){
         var n = s.get(i);
         var d = n.dataPropertyGet('linker');
         d._visible = true;
         n.cell('view').setIcon(o._iconView);
      }
   }
   if(RClass.isClass(s, FDrawable)){
      var s = o._renderables;
      for(var i = s.count() - 1; i >= 0; i--){
         var n = s.get(i);
         var r = n.dataPropertyGet('linker');
         r._visible = true;
         n.cell('view').setIcon(o._iconView);
      }
   }
   if(RClass.isClass(s, FG3dMaterial)){
      var s = o._materials;
      for(var i = s.count() - 1; i >= 0; i--){
         var n = s.get(i);
         var m = n.dataPropertyGet('linker');
         m._visible = true;
         n.cell('view').setIcon(o._iconView);
      }
   }
}
function FDsSolutionCatalogContent_construct(){
   var o = this;
   o.__base.FUiDataTreeView.construct.call(o);
   o._renderables = new TObjects();
   o._materials = new TObjects();
}
function FDsSolutionCatalogContent_buildTechnique(n, p){
   var o = this;
   var nt = o.createNode();
   nt.setLabel('Technique');
   nt.setTypeCode('technique');
   nt.dataPropertySet('linker', p);
   n.appendNode(nt);
}
function FDsSolutionCatalogContent_buildPrivate(parent){
   var o = this;
   var node = o.createNode();
   node.setTypeCode('space');
   node.setLabel('全部项目');
   parent.appendNode(node);
   var node = o.createNode();
   node.setTypeCode('space');
   node.setLabel('收藏项目');
   parent.appendNode(node);
   var node = o.createNode();
   node.setTypeCode('space');
   node.setLabel('最近使用');
   parent.appendNode(node);
}
function FDsSolutionCatalogContent_buildRecommend(parent){
   var o = this;
   var node = o.createNode();
   node.setTypeCode('space');
   node.setLabel('本周排行');
   parent.appendNode(node);
   var node = o.createNode();
   node.setTypeCode('space');
   node.setLabel('本月排行');
   parent.appendNode(node);
   var node = o.createNode();
   node.setTypeCode('space');
   node.setLabel('全部排行');
   parent.appendNode(node);
}
function FDsSolutionCatalogContent_buildGroup(parent){
   var o = this;
   var node = o.createNode();
   node.setTypeCode('space');
   node.setLabel('汽车');
   parent.appendNode(node);
   var node = o.createNode();
   node.setTypeCode('space');
   node.setLabel('教育');
   parent.appendNode(node);
   var node = o.createNode();
   node.setTypeCode('space');
   node.setLabel('人物');
   parent.appendNode(node);
}
function FDsSolutionCatalogContent_buildCatalog(){
   var o = this;
   var node = o.createNode();
   node.setTypeCode('space');
   node.setLabel('我的项目');
   o.appendNode(node);
   o.buildPrivate(node);
   var node = o.createNode();
   node.setTypeCode('space');
   node.setLabel('推荐项目');
   o.appendNode(node);
   o.buildRecommend(node);
   var node = o.createNode();
   node.setTypeCode('space');
   node.setLabel('项目分类');
   o.appendNode(node);
   o.buildGroup(node)
}
function FDsSolutionCatalogContent_selectObject(p){
   var o = this;
   if(p != null){
      o.processSelectedListener(p, true);
   }
}
function FDsSolutionCatalogContent_showObject(p){
   var o = this;
   if(RClass.isClass(p, FDsSceneRenderable)){
      var s = o._renderables;
      var c = s.count();
      for(var i = 0; i < c; i++){
         var nr = s.getAt(i);
         var r = nr.dataPropertyGet('linker');
         if(r == p){
            o.processSelectedListener(p, false);
         }
      }
   }
}
function FDsSolutionCatalogContent_dispose(){
   var o = this;
   o._displays = RObject.dispose(o._displays);
   o._renderables = RObject.dispose(o._renderables);
   o._materials = RObject.dispose(o._materials);
   o.__base.FUiDataTreeView.dispose.call(o);
}
function FDsSolutionCatalogToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   o._frameName       = 'resource.solution.CatalogToolBar';
   o._canvasModeCd    = EDsCanvasMode.Drop;
   o._dropButton      = null;
   o._selectButton    = null;
   o._translateButton = null;
   o._rotationButton  = null;
   o._scaleButton     = null;
   o._lookFrontButton = null;
   o._lookUpButton    = null;
   o._lookLeftButton  = null;
   o._playButton      = null;
   o._viewButton      = null;
   o.onBuilded        = FDsSolutionCatalogToolBar_onBuilded;
   o.onModeClick      = FDsSolutionCatalogToolBar_onModeClick;
   o.onRotationClick  = FDsSolutionCatalogToolBar_onRotationClick;
   o.construct        = FDsSolutionCatalogToolBar_construct;
   o.dispose          = FDsSolutionCatalogToolBar_dispose;
   return o;
}
function FDsSolutionCatalogToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
}
function FDsSolutionCatalogToolBar_onModeClick(p){
   var o = this;
   o._canvasModeCd = p._canvasModeCd;
   o._workspace._canvas.switchMode(p._canvasModeCd);
}
function FDsSolutionCatalogToolBar_onRotationClick(p, v){
   var o = this;
   var c = o._workspace._canvas;
   c.switchRotation(v);
}
function FDsSolutionCatalogToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsSolutionCatalogToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsSolutionFrameSet(o){
   o = RClass.inherits(this, o, FUiFrameSet, MUiStorage);
   o._frameName            = 'resource.solution.FrameSet';
   o._storageCode          = o._frameName;
   o._styleCatalogGround   = RClass.register(o, new AStyle('_styleCatalogGround', 'Catalog_Ground'));
   o._styleCatalogToolbar  = RClass.register(o, new AStyle('_styleCatalogToolbar', 'Catalog_Toolbar'));
   o._styleSearchGround    = RClass.register(o, new AStyle('_styleSearchGround', 'List_Ground'));
   o._styleSearchToolbar   = RClass.register(o, new AStyle('_styleCatalogToolbar', 'List_Toolbar'));
   o._stylePreviewGround   = RClass.register(o, new AStyle('_stylePreviewGround', 'Property_Ground'));
   o._stylePreviewToolbar  = RClass.register(o, new AStyle('_stylePreviewToolbar', 'Property_Toolbar'));
   o._stylePropertyGround  = RClass.register(o, new AStyle('_stylePropertyGround', 'Property_Ground'));
   o._pageSize             = 40;
   o._activeResourceCd     = 'private';
   o._activeProjectGuid    = null;
   o._frameCatalog         = null;
   o._frameCatalogToolbar  = null;
   o._frameCatalogContent  = null;
   o._frameList            = null;
   o._frameListToolbar     = null;
   o._frameListContent     = null;
   o._frameProperty        = null;
   o._framePropertyToolbar = null;
   o._framePropertyContent = null;
   o._propertyFrames       = null;
   o.onBuilded             = FDsSolutionFrameSet_onBuilded;
   o.construct             = FDsSolutionFrameSet_construct;
   o.findPropertyFrame     = FDsSolutionFrameSet_findPropertyFrame;
   o.selectObject          = FDsSolutionFrameSet_selectObject;
   o.switchContent         = FDsSolutionFrameSet_switchContent;
   o.load                  = FDsSolutionFrameSet_load;
   o.dispose               = FDsSolutionFrameSet_dispose;
   return o;
}
function FDsSolutionFrameSet_onBuilded(p){
   var o = this;
   o.__base.FUiFrameSet.onBuilded.call(o, p);
   var frame = o._frameCatalog = o.searchControl('catalogFrame');
   frame._hPanel.className = o.styleName('Catalog_Ground');
   var frame = o._frameCatalogToolbar = o.searchControl('catalogToolbarFrame');
   frame._hPanel.className = o.styleName('Catalog_Toolbar');
   var frame = o._frameCatalogContent = o.searchControl('catalogContentFrame');
   var frame = o._frameList = o.searchControl('listFrame');
   frame._hPanel.className = o.styleName('List_Ground');
   var frame = o._frameListToolbar = o.searchControl('listToolbarFrame');
   frame._hPanel.className = o.styleName('List_Toolbar');
   var frame = o._frameListContent = o.searchControl('listContentFrame');
   var spliter = o._catalogSplitter = o.searchControl('catalogSpliter');
   spliter.setAlignCd(EUiAlign.Left);
   spliter.setSizeHtml(o._frameCatalog._hPanel);
   var control = o._catalogToolbar = RClass.create(FDsSolutionCatalogToolBar);
   control._frameSet = o;
   control.buildDefine(p);
   o._frameCatalogToolbar.push(control);
   var control = o._catalogContent = RClass.create(FDsSolutionCatalogContent);
   control._frameSet = o;
   control.build(p);
   o._frameCatalogContent.push(control);
   var control = o._listToolbar = RClass.create(FDsSolutionListToolBar);
   control._frameSet = o;
   control.buildDefine(p);
   o._frameListToolbar.push(control);
   var control = o._listContent = RClass.create(FDsSolutionListContent);
   control._frameSet = o;
   control.build(p);
   o._frameListContent.push(control);
   o.switchContent('private');
}
function FDsSolutionFrameSet_construct(){
   var o = this;
   o.__base.FUiFrameSet.construct.call(o);
   o._propertyFrames = new TDictionary();
}
function FDsSolutionFrameSet_findPropertyFrame(p){
   var o = this;
   var f = o._propertyFrames.get(p);
   if(!f){
      var fc = RConsole.find(FFrameConsole);
      f = fc.get(o, p, o._framePropertyProperty._hContainer);
      f._workspace = o;
      o._propertyFrames.set(p, f);
   }
   return f;
}
function FDsSolutionFrameSet_selectObject(control){
   var o = this;
   var space = o._activeSpace;
   var fs = o._propertyFrames;
   var c = fs.count();
   for(var i = 0; i < c; i++){
      var f = fs.value(i);
      f.hide();
   }
   if(RClass.isClass(control, FDsSolutionListItem)){
      var f = o.findPropertyFrame(EDsFrame.SolutionProjectPropertyFrame);
      f.show();
      f.loadObject(control);
      o._activeProjectGuid = control._guid;
   }else{
      throw new TError('Unknown select object type. (value={1})', p);
   }
}
function FDsSolutionFrameSet_switchContent(typeCd){
   var o = this;
   o._activeResourceCd = typeCd;
   o._listContent.serviceSearch(typeCd, '', o._pageSize, 0);
}
function FDsSolutionFrameSet_load(){
   var o = this;
   o._listContent.serviceSearch('private', '', o._pageSize, 0);
}
function FDsSolutionFrameSet_dispose(){
   var o = this;
   o.__base.FUiFrameSet.dispose.call(o);
   o._propertyFrames.dispose();
   o._propertyFrames = null;
}
function FDsSolutionListContent(o){
   o = RClass.inherits(this, o, FUiListView);
   o._activeControl    = null;
   o._activeGuid       = null;
   o._refreshButton    = null;
   o._saveButton       = null;
   o._runButton        = null;
   o.onBuilded         = FDsSolutionListContent_onBuilded;
   o.onServiceLoad     = FDsSolutionListContent_onServiceLoad;
   o.construct         = FDsSolutionListContent_construct;
   o.doClickItem       = FDsSolutionListContent_doClickItem;
   o.doDoubleClickItem = FDsSolutionListContent_doDoubleClickItem;
   o.serviceSearch     = FDsSolutionListContent_serviceSearch;
   o.serviceResearch   = FDsSolutionListContent_serviceResearch;
   o.dispose           = FDsSolutionListContent_dispose;
   return o;
}
function FDsSolutionListContent_onBuilded(p){
   var o = this;
   o.__base.FUiListView.onBuilded.call(o, p);
}
function FDsSolutionListContent_onServiceLoad(p){
   var o = this;
   var xprojects = p.root.findNode('ProjectCollection');
   var pageSize = xprojects.getInteger('page_size');
   var pageCount = xprojects.getInteger('page_count');
   var page = xprojects.getInteger('page');
   o._frameSet._listToolbar.setNavigator(pageSize, pageCount, page);
   o.clear();
   var xnodes = xprojects.nodes();
   var count = xnodes.count();
   for(var i = 0; i < count; i++){
      var xnode = xnodes.getAt(i);
      if(xnode.isName('Project')){
         var item = o.createItem(FDsSolutionListItem);
         item.propertyLoad(xnode);
         item._typeCd = xnode.get('type');
         item._guid = xnode.get('guid');
         item.setLabel(RString.nvl(xnode.get('label'), xnode.get('code')));
         item.refreshStyle();
         o.push(item);
      }
   }
   RWindow.enable();
}
function FDsSolutionListContent_construct(){
   var o = this;
   o.__base.FUiListView.construct.call(o);
}
function FDsSolutionListContent_doClickItem(control){
   var o = this;
   o.__base.FUiListView.doClickItem.call(o, control);
   o._activeControl = control;
   o._activeGuid = control._guid;
}
function FDsSolutionListContent_doDoubleClickItem(control){
   var o = this;
   o.__base.FUiListView.doDoubleClickItem.call(o, control);
   var guid = control._guid;
   o._activeControl = control;
   o._activeGuid = guid;
   var workspace = o._frameSet._workspace;
   workspace.selectFrameSet(EDsFrameSet.ProjectFrameSet, guid);
}
function FDsSolutionListContent_serviceSearch(typeCd, serach, pageSize, page){
   var o = this;
   o._typeCd = typeCd;
   o._serach = serach;
   o._pageSize = pageSize;
   o._page = page;
   RWindow.disable();
   var connection = RConsole.find(FDrProjectConsole).doList(serach, null, pageSize, page);
   connection.addLoadListener(o, o.onServiceLoad);
}
function FDsSolutionListContent_serviceResearch(){
   var o = this;
   o.serviceSearch(o._typeCd, o._serach, o._pageSize, o._page);
}
function FDsSolutionListContent_dispose(){
   var o = this;
   o.__base.FUiListView.dispose.call(o);
}
function FDsSolutionListItem(o){
   o = RClass.inherits(this, o, FUiListViewItem);
   o.onBuild      = FDsSolutionListItem_onBuild;
   o.refreshStyle = FDsSolutionListItem_refreshStyle;
   return o;
}
function FDsSolutionListItem_onBuild(p){
   var o = this;
   o.__base.FUiListViewItem.onBuild.call(o, p);
   var h = o._hPanel;
   h.style.width = '200px';
   h.style.height = '150px';
}
function FDsSolutionListItem_refreshStyle(){
   var o = this;
   var url = '/cloud.content.resource.preview.wv?type_cd=' + o._typeCd + '&guid=' + o._guid;
   o._hForm.style.backgroundImage = 'url("' + url + '")';
}
function FDsSolutionListToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   o._frameName       = 'resource.solution.ListToolBar';
   o._pageCount       = 0;
   o._page            = 0;
   o._serach          = null;
   o._resourceTypeCd  = null;
   o._dropButton      = null;
   o._selectButton    = null;
   o._translateButton = null;
   o._rotationButton  = null;
   o._scaleButton     = null;
   o._lookFrontButton = null;
   o._lookUpButton    = null;
   o._lookLeftButton  = null;
   o._playButton      = null;
   o._viewButton      = null;
   o.onBuilded        = FDsSolutionListToolBar_onBuilded;
   o.onSearchClick    = FDsSolutionListToolBar_onSearchClick;
   o.onNavigatorClick = FDsSolutionListToolBar_onNavigatorClick;
   o.construct        = FDsSolutionListToolBar_construct;
   o.setNavigator     = FDsSolutionListToolBar_setNavigator;
   o.doNavigator      = FDsSolutionListToolBar_doNavigator;
   o.dispose          = FDsSolutionListToolBar_dispose;
   return o;
}
function FDsSolutionListToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
   o._controlSearchEdit.addClickListener(o, o.onSearchClick);
   o._controlFirstButton.addClickListener(o, o.onNavigatorClick);
   o._controlPriorButton.addClickListener(o, o.onNavigatorClick);
   o._controlNextButton.addClickListener(o, o.onNavigatorClick);
   o._controlLastButton.addClickListener(o, o.onNavigatorClick);
}
function FDsSolutionListToolBar_onSearchClick(p){
   this.doNavigator(0);
}
function FDsSolutionListToolBar_onNavigatorClick(event){
   var o = this;
   var sender = event.sender;
   var name = sender.name();
   var page = o._page;
   switch(name){
      case 'firstButton':
         page = 0;
         break;
      case 'priorButton':
         page--;
         break;
      case 'nextButton':
         page++;
         break;
      case 'lastButton':
         page = o._pageCount;
         break;
   }
   o.doNavigator(page);
}
function FDsSolutionListToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsSolutionListToolBar_setNavigator(pageSize, pageCount, page){
   var o = this;
   o._pageSize = pageSize;
   o._pageCount = pageCount;
   o._page = page;
   o._controlPageEdit.setText(page);
   if(page == 0){
   }
}
function FDsSolutionListToolBar_doNavigator(page){
   var o = this;
   page = RInteger.toRange(page, 0, o._pageCount);
   var search = o._controlSearchEdit.text();
   var typeCd = o._frameSet._resourceTypeCd;
   if((o._resourceTypeCd != typeCd) || (o._serach != search) || (o._page != page)){
      o._frameSet._searchContent.serviceSearch(typeCd, search, o._pageSize, page)
   }
   o._resourceTypeCd = typeCd;
   o._serach = search;
}
function FDsSolutionListToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsSolutionMenuBar(o){
   o = RClass.inherits(this, o, FUiMenuBar);
   o._frameName     = 'resource.solution.MenuBar';
   o._refreshButton = null;
   o._saveButton    = null;
   o._runButton     = null;
   o.onBuilded      = FDsSolutionMenuBar_onBuilded;
   o.onCreateClick  = FDsSolutionMenuBar_onCreateClick;
   o.onDeleteLoad   = FDsSolutionMenuBar_onDeleteLoad;
   o.onDeleteClick  = FDsSolutionMenuBar_onDeleteClick;
   o.construct      = FDsSolutionMenuBar_construct;
   o.dispose        = FDsSolutionMenuBar_dispose;
   return o;
}
function FDsSolutionMenuBar_onBuilded(p){
   var o = this;
   o.__base.FUiMenuBar.onBuilded.call(o, p);
   o._controlCreateButton.addClickListener(o, o.onCreateClick);
   o._controlDeleteButton.addClickListener(o, o.onDeleteClick);
}
function FDsSolutionMenuBar_onCreateClick(event){
   var o = this;
   var dialog = RConsole.find(FUiWindowConsole).find(FDsSolutionProjectDialog);
   dialog._frameSet = o._frameSet;
   dialog._workspace = o._workspace;
   dialog.showPosition(EUiPosition.Center);
}
function FDsSolutionMenuBar_onDeleteLoad(event){
   var o = this;
   var frame = o._frameSet._listContent;
   frame.serviceResearch();
   RWindow.enable();
}
function FDsSolutionMenuBar_onDeleteClick(event){
   var o = this;
   var listContent = o._frameSet._listContent;
   var guid = listContent._activeGuid;
   RWindow.disable();
   var connection = RConsole.find(FDrProjectConsole).doDelete(guid);
   connection.addLoadListener(o, o.onDeleteLoad);
}
function FDsSolutionMenuBar_construct(){
   var o = this;
   o.__base.FUiMenuBar.construct.call(o);
}
function FDsSolutionMenuBar_dispose(){
   var o = this;
   o.__base.FUiMenuBar.dispose.call(o);
}
function FDsSolutionProjectDialog(o){
   o = RClass.inherits(this, o, FUiDialog);
   o._frameName            = 'design3d.solution.ProjectDialog';
   o._resourceTypeCd       = 'private';
   o._controlPrivateButton = null;
   o._controlTeamButton    = null;
   o._controlShareButton   = null;
   o.onBuilded             = FDsSolutionProjectDialog_onBuilded;
   o.onConfirmLoad         = FDsSolutionProjectDialog_onConfirmLoad;
   o.onConfirmClick        = FDsSolutionProjectDialog_onConfirmClick;
   o.onCancelClick         = FDsSolutionProjectDialog_onCancelClick;
   o.construct             = FDsSolutionProjectDialog_construct;
   o.dispose               = FDsSolutionProjectDialog_dispose;
   return o;
}
function FDsSolutionProjectDialog_onBuilded(p){
   var o = this;
   o.__base.FUiDialog.onBuilded.call(o, p);
   o._controlConfirmButton.addClickListener(o, o.onConfirmClick);
   o._controlCancelButton.addClickListener(o, o.onCancelClick);
}
function FDsSolutionProjectDialog_onConfirmLoad(event){
   var o = this;
   var frame = o._frameSet._listContent;
   frame.serviceResearch();
   o.hide();
   RWindow.enable();
}
function FDsSolutionProjectDialog_onConfirmClick(event){
   var o = this;
   RWindow.disable();
   var code = o._controlCode.get();
   var label = o._controlLabel.get();
   var project = RClass.create(FDrProject);
   project.setCode(code);
   project.setLabel(label);
   var connection = RConsole.find(FDrProjectConsole).doCreate(project);
   connection.addLoadListener(o, o.onConfirmLoad);
}
function FDsSolutionProjectDialog_onCancelClick(event){
   this.hide();
}
function FDsSolutionProjectDialog_construct(){
   var o = this;
   o.__base.FUiDialog.construct.call(o);
}
function FDsSolutionProjectDialog_dispose(){
   var o = this;
   o.__base.FUiDialog.dispose.call(o);
}
function FDsSolutionProjectProperty(o){
   o = RClass.inherits(this, o, FUiForm);
   o._visible          = false;
   o._workspace        = null;
   o._activeSpace      = null;
   o._activeCamera     = null;
   o._controlGuid      = null;
   o._controlCode      = null;
   o._controlLabel     = null;
   o._controlPosition  = null;
   o._controlDirection = null;
   o.onBuilded         = FDsSolutionProjectProperty_onBuilded;
   o.onDataChanged     = FDsSolutionProjectProperty_onDataChanged;
   o.onLoadProject     = FDsSolutionProjectProperty_onLoadProject;
   o.construct         = FDsSolutionProjectProperty_construct;
   o.loadObject        = FDsSolutionProjectProperty_loadObject;
   o.dispose           = FDsSolutionProjectProperty_dispose;
   return o;
}
function FDsSolutionProjectProperty_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
}
function FDsSolutionProjectProperty_onDataChanged(p){
   var o = this;
   var camera = o._activeCamera;
   var resource = camera.resource();
   resource.position().assign(o._controlPosition.get());
   resource.direction().assign(o._controlDirection.get());
   camera.position().assign(resource.position());
   camera.direction().assign(resource.direction());
   camera.update();
}
function FDsSolutionProjectProperty_onLoadProject(event){
   var o = this;
   var xproject = event.root.findNode('Project');
   o._controlCode.set(xproject.get('code'));
   o._controlLabel.set(xproject.get('label'));
}
function FDsSolutionProjectProperty_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsSolutionProjectProperty_loadObject(control){
   var o = this;
   var guid = control._guid;
   o._controlGuid.set(guid);
   var connection = RConsole.find(FDrProjectConsole).doQuery(guid);
   connection.addLoadListener(o, o.onLoadProject);
}
function FDsSolutionProjectProperty_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsSolutionPropertyContent(o){
   o = RClass.inherits(this, o, FDsCanvas);
   o._activeSpace         = null;
   o._canvasModeCd        = EDsCanvasMode.Drop;
   o._canvasMoveCd        = EDsCanvasDrag.Unknown;
   o._optionRotation      = false;
   o._rotation            = null;
   o._capturePosition     = null;
   o._captureMatrix       = null;
   o._captureRotation     = null;
   o._dimensional         = null;
   o._selectObject        = null;
   o._selectBoundBox      = null;
   o._selectRenderables   = null;
   o._cameraMoveRate      = 8;
   o._cameraKeyRotation   = 3;
   o._cameraMouseRotation = 0.005;
   o._templateMatrix      = null;
   o._templateRenderable  = null;
   o._templateFace        = null;
   o._templateTranslation = null;
   o._templateRotation    = null;
   o._templateScale       = null;
   o._templateViewScale   = 0.05;
   o.onBuild              = FDsSolutionPropertyContent_onBuild;
   o.onMouseCaptureStart  = FDsSolutionPropertyContent_onMouseCaptureStart;
   o.onMouseCapture       = FDsSolutionPropertyContent_onMouseCapture;
   o.onMouseCaptureStop   = FDsSolutionPropertyContent_onMouseCaptureStop;
   o.onEnterFrame         = FDsSolutionPropertyContent_onEnterFrame;
   o.onMeshLoad           = FDsSolutionPropertyContent_onMeshLoad;
   o.oeResize             = FDsSolutionPropertyContent_oeResize;
   o.oeRefresh            = FDsSolutionPropertyContent_oeRefresh;
   o.construct            = FDsSolutionPropertyContent_construct;
   o.innerSelectDisplay   = FDsSolutionPropertyContent_innerSelectDisplay;
   o.innerSelectLayer     = FDsSolutionPropertyContent_innerSelectLayer;
   o.selectNone           = FDsSolutionPropertyContent_selectNone;
   o.selectDisplay        = FDsSolutionPropertyContent_selectDisplay;
   o.selectMaterial       = FDsSolutionPropertyContent_selectMaterial;
   o.selectRenderable     = FDsSolutionPropertyContent_selectRenderable;
   o.switchRotation       = FDsSolutionPropertyContent_switchRotation;
   o.reloadRegion         = FDsSolutionPropertyContent_reloadRegion;
   o.loadMeshByGuid       = FDsSolutionPropertyContent_loadMeshByGuid;
   o.loadMeshByCode       = FDsSolutionPropertyContent_loadMeshByCode;
   o.dispose              = FDsSolutionPropertyContent_dispose;
   return o;
}
function FDsSolutionPropertyContent_onBuild(p){
   var o = this;
   o.__base.FDsCanvas.onBuild.call(o, p);
}
function FDsSolutionPropertyContent_onMouseCaptureStart(p){
   var o = this;
   var s = o._activeSpace;
   if(!s){
      return;
   }
   var r = o._activeSpace.region();
   var st = RConsole.find(FG3dTechniqueConsole).find(o._graphicContext, FG3dSelectTechnique);
   var r = st.test(r, p.offsetX, p.offsetY);
   o.selectRenderable(r);
   o._capturePosition.set(p.clientX, p.clientY);
   o._captureRotation.assign(s.camera()._rotation);
   if(r){
      var d = r.display();
      o._captureMatrix.assign(d.matrix());
   }
   o._templateMatrix.identity();
   if(o._templateFace){
      o._templateFaceMatrix.assign(o._templateFace.matrix());
      var rs = o._selectRenderables;
      for(var i = rs.count() - 1; i >= 0; i--){
         var r = rs.getAt(i);
         if(!r._dragMatrix){
            r._dragMatrix = new SMatrix3d();
         }
         r._dragMatrix.assign(r.matrix());
      }
   }
   RHtml.cursorSet(o._hPanel, EUiCursor.Pointer);
}
function FDsSolutionPropertyContent_onMouseCapture(p){
   var o = this;
   var s = o._activeSpace;
   if(!s){
      return;
   }
   var cx = p.clientX - o._capturePosition.x;
   var cy = p.clientY - o._capturePosition.y;
   var mc = o._canvasModeCd;
   var mv = o._canvasMoveCd;
   var cm = o._captureMatrix;
   var sm = null;
   var tf = o._templateFace;
   var tm = o._templateMatrix;
   switch(mc){
      case EDsCanvasMode.Drop:
         var c = o._activeSpace.camera();
         var r = c.rotation();
         var cr = o._captureRotation;
         r.x = cr.x - cy * o._cameraMouseRotation;
         r.y = cr.y - cx * o._cameraMouseRotation;
         break;
      case EDsCanvasMode.Select:
         break;
      case EDsCanvasMode.Translate:
         if(tf){
            if(mv == EDsCanvasDrag.X){
               tm.tx = cx / 10;
            }else if(mv == EDsCanvasDrag.Y){
               tm.ty = -cy / 10;
            }else if(mv == EDsCanvasDrag.Z){
               tm.tz = cx / 10;
            }
         }
         break;
      case EDsCanvasMode.Rotation:
         if(tf){
            if(mv == EDsCanvasDrag.X){
               tm.rx = cx / 10;
            }else if(mv == EDsCanvasDrag.Y){
               tm.ry = -cy / 10;
            }else if(mv == EDsCanvasDrag.Z){
               tm.rz = cx / 10;
            }
         }
         break;
      case EDsCanvasMode.Scale:
         if(tf){
            if(mv == EDsCanvasDrag.X){
               tm.sx = cx / 10;
            }else if(mv == EDsCanvasDrag.Y){
               tm.sy = -cy / 10;
            }else if(mv == EDsCanvasDrag.Z){
               tm.sz = cx / 10;
            }else if(mv == EDsCanvasDrag.All){
               tm.sx = cx / 10;
               tm.sy = cx / 10;
               tm.sz = cx / 10;
            }
         }
         break;
   }
   if(tf){
      tf.matrix().merge(o._templateFaceMatrix, tm);
      var rs = o._selectRenderables;
      for(var i = rs.count() - 1; i >= 0; i--){
         var r = rs.getAt(i);
         r._matrix.merge(r._dragMatrix, tm);
      }
   }
}
function FDsSolutionPropertyContent_onMouseCaptureStop(p){
   var o = this;
   RHtml.cursorSet(o._hPanel, EUiCursor.Auto);
}
function FDsSolutionPropertyContent_onEnterFrame(){
   var o = this;
   var s = o._activeSpace;
   if(!s){
      return;
   }
   var st = s.timer();
   var ss = st.spanSecond();
   var c = s.camera();
   var d = o._cameraMoveRate * ss;
   var r = o._cameraKeyRotation * ss;
   var kf = RKeyboard.isPress(EStageKey.Forward);
   var kb = RKeyboard.isPress(EStageKey.Back);
   if(kf && !kb){
      c.doWalk(d);
   }
   if(!kf && kb){
      c.doWalk(-d);
   }
   var kq = RKeyboard.isPress(EStageKey.Up);
   var ke = RKeyboard.isPress(EStageKey.Down);
   if(kq && !ke){
      c.doFly(d);
   }
   if(!kq && ke){
      c.doFly(-d);
   }
   var ka = RKeyboard.isPress(EStageKey.RotationLeft);
   var kd = RKeyboard.isPress(EStageKey.RotationRight);
   if(ka && !kd){
      c.doYaw(r);
   }
   if(!ka && kd){
      c.doYaw(-r);
   }
   var kz = RKeyboard.isPress(EStageKey.RotationUp);
   var kw = RKeyboard.isPress(EStageKey.RotationDown);
   if(kz && !kw){
      c.doPitch(r);
   }
   if(!kz && kw){
      c.doPitch(-r);
   }
   c.update();
   if(o._optionRotation){
      var r = o._rotation;
      var display = o._activeSpace._display;
      var matrix = display.matrix();
      matrix.setRotation(matrix.rx, matrix.ry + r.y, matrix.rz);
      matrix.update();
      r.y = 0.01;
   }
}
function FDsSolutionPropertyContent_onMeshLoad(p){
   var o = this;
   var m = o._activeSpace;
   var g = m.region();
   var rc = g.camera();
   rc.setPosition(0, 3, -10);
   rc.lookAt(0, 3, 0);
   rc.update();
   var h = o._hPanel;
   var rp = rc.projection();
   rp.size().set(h.width, h.height);
   rp._angle = 45;
   rp.update();
   var l = g.directionalLight();
   var lc = l.camera();
   lc.setPosition(10, 10, 0);
   lc.lookAt(0, 0, 0);
   lc.update();
   o.processLoadListener(o);
}
function FDsSolutionPropertyContent_oeResize(p){
   var o = this;
   o.__base.FDsCanvas.oeResize.call(o, p);
   var hp = o._hPanel;
   var w = hp.offsetWidth;
   var h = hp.offsetHeight;
   var s = o._activeSpace;
   if(s){
      var cp = s.camera().projection();
      cp.size().set(w, h);
      cp.update();
   }
   return EEventStatus.Stop;
}
function FDsSolutionPropertyContent_oeRefresh(p){
   return EEventStatus.Stop;
}
function FDsSolutionPropertyContent_construct(){
   var o = this;
   o.__base.FDsCanvas.construct.call(o);
   o._capturePosition = new SPoint2();
   o._captureMatrix = new SMatrix3d();
   o._templateMatrix = new SMatrix3d();
   o._templateFaceMatrix = new SMatrix3d();
   o._rotation = new SVector3();
   o._captureRotation = new SVector3();
   o._selectRenderables = new TObjects();
}
function FDsSolutionPropertyContent_innerSelectDisplay(p){
   var o = this;
   var s = p.renderables();
   var c = s.count();
   for(var i = 0; i < c; i++){
      var r = s.getAt(i);
      if(RClass.isClass(r, FDsSceneRenderable)){
         o._selectRenderables.push(r);
         r.showBoundBox();
      }
   }
}
function FDsSolutionPropertyContent_innerSelectLayer(p){
   var o = this;
   var s = p.displays();
   var c = s.count();
   for(var i = 0; i < c; i++){
      var d = s.getAt(i);
      o.innerSelectDisplay(d)
   }
}
function FDsSolutionPropertyContent_selectNone(){
   var o = this;
   o._selectObject = null;
   var s = o._selectRenderables;
   var c = s.count();
   for(var i = 0; i < c; i++){
      var r = s.get(i);
      r.hideBoundBox();
   }
   o._selectRenderables.clear();
}
function FDsSolutionPropertyContent_selectDisplay(p){
   var o = this;
   o.selectNone();
   o._selectObject = p;
   o.innerSelectDisplay(p);
}
function FDsSolutionPropertyContent_selectMaterial(p){
   var o = this;
   o.selectNone();
   o._selectObject = p;
   var d = p._display;
   var s = d.renderables();
   var c = s.count();
   for(var i = 0; i < c; i++){
      var r = s.get(i);
      if(r._materialReference == p){
         o._selectRenderables.push(r);
         r._optionSelected = true;
         r.showBoundBox();
      }
   }
}
function FDsSolutionPropertyContent_selectRenderable(p){
   var o = this;
   return;
   var sr = p;
   if(sr){
      var n = sr._renderable._resource._code;
      switch(n){
         case 'ms_translation_x':
            o._canvasMoveCd = EDsCanvasDrag.X;
            o._templateRenderable = sr;
            return;
         case 'ms_translation_y':
            o._canvasMoveCd = EDsCanvasDrag.Y;
            o._templateRenderable = sr;
            return;
         case 'ms_translation_z':
            o._canvasMoveCd = EDsCanvasDrag.Z;
            o._templateRenderable = sr;
            return;
         case 'ms_rotation_x':
            o._canvasMoveCd = EDsCanvasDrag.X;
            o._templateRenderable = sr;
            return;
         case 'ms_rotation_y':
            o._canvasMoveCd = EDsCanvasDrag.Y;
            o._templateRenderable = sr;
            return;
         case 'ms_rotation_z':
            o._canvasMoveCd = EDsCanvasDrag.Z;
            o._templateRenderable = sr;
            return;
         case 'ms_scale_x':
            o._canvasMoveCd = EDsCanvasDrag.X;
            o._templateRenderable = sr;
            return;
         case 'ms_scale_y':
            o._canvasMoveCd = EDsCanvasDrag.Y;
            o._templateRenderable = sr;
            return;
         case 'ms_scale_z':
            o._canvasMoveCd = EDsCanvasDrag.Z;
            o._templateRenderable = sr;
            return;
         case 'ms_scale_all':
            o._canvasMoveCd = EDsCanvasDrag.All;
            o._templateRenderable = sr;
            return;
         default:
            o._canvasMoveCd = EDsCanvasDrag.Unknown;
            o._templateRenderable = null;
      }
   }
   o.selectNone();
   if(p){
      o._selectRenderables.push(p);
      p._optionSelected = true;
      p.showBoundBox();
      o._workspace._catalog.showObject(p);
   }
   var t = o._templateTranslation;
   var r = o._templateRotation;
   var s = o._templateScale;
   var mc = o._canvasModeCd;
   switch(mc){
      case EDsCanvasMode.Drop:
         break;
      case EDsCanvasMode.Select:
         break;
      case EDsCanvasMode.Translate:
         t.setVisible(sr != null);
         r.hide();
         s.hide();
         o._templateFace = t;
         break;
      case EDsCanvasMode.Rotation:
         t.hide();
         r.setVisible(sr != null);
         s.hide();
         o._templateFace = r;
         break;
      case EDsCanvasMode.Scale:
         t.hide();
         r.hide();
         s.setVisible(sr != null);
         o._templateFace = s;
         break;
   }
   var st = o._templateFace;
   if(sr && st){
      var d = sr.display();
      var m = st.matrix();
      m.assign(d.matrix());
      m.setScaleAll(o._templateViewScale);
      m.update();
   }
}
function FDsSolutionPropertyContent_switchMode(p){
   var o = this;
   o._canvasModeCd = p;
   o.selectRenderable(o._selectRenderable);
}
function FDsSolutionPropertyContent_switchRotation(p){
   this._optionRotation = p;
}
function FDsSolutionPropertyContent_reloadRegion(region){
   var o = this;
   var resource = region.resource();
   o._cameraMoveRate = resource.moveSpeed();
   o._cameraKeyRotation = resource.rotationKeySpeed();
   o._cameraMouseRotation = resource.rotationMouseSpeed();
}
function FDsSolutionPropertyContent_loadMeshByGuid(p){
   var o = this;
   var rmc = RConsole.find(FE3dMeshConsole);
   if(o._activeSpace != null){
   }
   var space = o._activeSpace = rmc.allocByGuid(o, p);
   space.addLoadListener(o, o.onMeshLoad);
   space._layer.pushRenderable(o._dimensional);
   RStage.register('mesh3d', space);
}
function FDsSolutionPropertyContent_loadMeshByCode(p){
   var o = this;
   var rmc = RConsole.find(FE3dMeshConsole);
   if(o._activeSpace != null){
      rmc.free(o._activeSpace);
   }
   var space = o._activeSpace = rmc.allocByCode(o, p);
   space.addLoadListener(o, o.onMeshLoad);
   space._layer.pushRenderable(o._dimensional);
   RStage.register('mesh3d', space);
}
function FDsSolutionPropertyContent_dispose(){
   var o = this;
   o._rotation = RObject.dispose(o._rotation);
x   // 父处理
   o.__base.FDsCanvas.dispose.call(o);
}
function FDsSolutionPropertyToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   o._frameName           = 'resource.solution.PropertyToolBar';
   o._controlInsertButton = null;
   o._controlUpdateButton = null;
   o._controlDeleteButton = null;
   o.onBuilded            = FDsSolutionPropertyToolBar_onBuilded;
   o.onUpdateClick        = FDsSolutionPropertyToolBar_onUpdateClick;
   o.construct            = FDsSolutionPropertyToolBar_construct;
   o.dispose              = FDsSolutionPropertyToolBar_dispose;
   return o;
}
function FDsSolutionPropertyToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
   o._controlUpdateButton.addClickListener(o, o.onUpdateClick);
}
function FDsSolutionPropertyToolBar_onUpdateClick(event){
   var o = this;
   var guid = o._workspace._activeProjectGuid;
   window.location = 'Project.wa?do=detail&guid=' + guid;
}
function FDsSolutionPropertyToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsSolutionPropertyToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsSolutionTabBar(o){
   o = RClass.inherits(this, o, FUiTabBar);
   o._frameName            = 'resource.solution.TabBar';
   o._resourceTypeCd       = 'private';
   o._controlPrivateButton = null;
   o._controlTeamButton    = null;
   o._controlShareButton   = null;
   o.onBuilded             = FDsSolutionTabBar_onBuilded;
   o.onButtonClick         = FDsSolutionTabBar_onButtonClick;
   o.construct             = FDsSolutionTabBar_construct;
   o.dispose               = FDsSolutionTabBar_dispose;
   return o;
}
function FDsSolutionTabBar_onBuilded(p){
   var o = this;
   o.__base.FUiTabBar.onBuilded.call(o, p);
   o._controlProjectButton.addClickListener(o, o.onButtonClick);
   o._controlResourceButton.addClickListener(o, o.onButtonClick);
   o._controlTeamButton.addClickListener(o, o.onButtonClick);
   o._controlPublishButton.addClickListener(o, o.onButtonClick);
}
function FDsSolutionTabBar_onButtonClick(event){
   var o = this;
   var sender = event.sender;
   var name = sender.name();
   if(name == 'solution'){
      o._workspace.selectFrameSet(EDsFrameSet.SolutionFrameSet);
   }else if(name == 'project'){
      o._workspace.selectFrameSet(EDsFrameSet.ProjectFrameSet);
   }else if(name == 'resource'){
      o._workspace.selectFrameSet(EDsFrameSet.ResourceFrameSet);
   }else{
      alert('功能未开启，请以后关注。');
   }
}
function FDsSolutionTabBar_construct(){
   var o = this;
   o.__base.FUiTabBar.construct.call(o);
}
function FDsSolutionTabBar_dispose(){
   var o = this;
   o.__base.FUiTabBar.dispose.call(o);
}
function FDsSolutionWorkspace(o){
   o = RClass.inherits(this, o, FUiWorkspace, MUiStorage);
   o._frameName            = 'resource.solution.Workspace';
   o._storageCode          = o._frameName;
   o._styleMenubarGround   = RClass.register(o, new AStyle('_styleMenubarGround', 'Menubar_Ground'));
   o._styleWorkspaceGround = RClass.register(o, new AStyle('_styleWorkspaceGround', 'Workspace_Ground'));
   o._styleToolbarGround   = RClass.register(o, new AStyle('_styleToolbarGround', 'Toolbar_Ground'));
   o._styleBodyGround      = RClass.register(o, new AStyle('_styleBodyGround', 'Body_Ground'));
   o._styleStatusbarGround = RClass.register(o, new AStyle('_styleStatusbarGround', 'Statusbar_Ground'));
   o._activeFrameSetCode   = null;
   o._activeProjectGuid    = null;
   o._frameToolBar         = null;
   o._frameStatusBar       = null;
   o._activeFrameSet       = null;
   o._frameSets            = null;
   o._propertyFrames       = null;
   o.onBuilded             = FDsSolutionWorkspace_onBuilded;
   o.construct             = FDsSolutionWorkspace_construct;
   o.selectFrameSet        = FDsSolutionWorkspace_selectFrameSet;
   o.load                  = FDsSolutionWorkspace_load;
   o.dispose               = FDsSolutionWorkspace_dispose;
   return o;
}
function FDsSolutionWorkspace_onBuilded(p){
   var o = this;
   o.__base.FUiWorkspace.onBuilded.call(o, p);
   var frame = o._frameToolBar = o.searchControl('toolbarFrame');
   frame._hPanel.className = o.styleName('Menubar_Ground');
   var frame = o._frameBody = o.searchControl('bodyFrame');
   frame._hPanel.className = o.styleName('Body_Ground');
   var frame = o._frameStatusBar = o.searchControl('statusFrame');
   frame._hPanel.className = o.styleName('Statusbar_Ground');
   var hTable = RBuilder.createTable(p);
   hTable.width = '100%';
   var hRow = RBuilder.appendTableRow(hTable);
   o._hMenuPanel = RBuilder.appendTableCell(hRow);
   var control = o._tabBar = RClass.create(FDsSolutionTabBar);
   control._workspace = o;
   control.buildDefine(p);
   var hCell = RBuilder.appendTableCell(hRow);
   hCell.width = '150px';
   hCell.align = 'right';
   hCell.vAlign = 'bottom';
   hCell.appendChild(control._hPanel);
   o._frameToolBar._hPanel.appendChild(hTable);
}
function FDsSolutionWorkspace_construct(){
   var o = this;
   o.__base.FUiWorkspace.construct.call(o);
   o._frameSets = new TDictionary();
   o._propertyFrames = new TDictionary();
}
function FDsSolutionWorkspace_selectFrameSet(name, guid){
   var o = this;
   var frameSet = o._frameSets.get(name);
   if(!frameSet){
      if(name == EDsFrameSet.SolutionFrameSet){
         var menuBar = RClass.create(FDsSolutionMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsSolutionFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else if(name == EDsFrameSet.ProjectFrameSet){
         var menuBar = RClass.create(FDsProjectMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsProjectFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else if(name == EDsFrameSet.ResourceFrameSet){
         var menuBar = RClass.create(FDsResourceMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsResourceFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else if(name == EDsFrameSet.BitmapFrameSet){
         var menuBar = RClass.create(FDsBitmapMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsBitmapFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else if(name == EDsFrameSet.MaterialFrameSet){
         var menuBar = RClass.create(FDsMaterialMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsMaterialFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else if(name == EDsFrameSet.MeshFrameSet){
         var menuBar = RClass.create(FDsMeshMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsMeshFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else if(name == EDsFrameSet.ModelFrameSet){
         var menuBar = RClass.create(FDsModelMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsModelFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else if(name == EDsFrameSet.PrivateTemplateFrameSet){
         var menuBar = RClass.create(FDsPrivateTemplateMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsPrivateTemplateFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else if(name == EDsFrameSet.PrivateSceneFrameSet){
         var menuBar = RClass.create(FDsPrivateSceneMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsPrivateSceneFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else{
         throw new TError('Unknown frameset. (name={1})', name);
      }
      o._frameSets.set(name, frameSet);
   }
   var activeFrameSet = o._activeFrameSet;
   if(activeFrameSet != frameSet){
      if(activeFrameSet){
         o._hMenuPanel.removeChild(activeFrameSet._menuBar._hPanel);
         o._frameBody.remove(activeFrameSet);
      }
      o._hMenuPanel.appendChild(frameSet._menuBar._hPanel);
      o._frameBody.push(frameSet);
      frameSet.psResize();
   }
   o._activeFrameSet = frameSet;
   switch(name){
      case EDsFrameSet.SolutionFrameSet:
         frameSet.load();
         break;
      case EDsFrameSet.ProjectFrameSet:
         frameSet.loadByGuid(guid);
         break;
      case EDsFrameSet.ResourceFrameSet:
         frameSet.load();
         break;
      case EDsFrameSet.BitmapFrameSet:
         frameSet.loadByGuid(guid);
         break;
      case EDsFrameSet.MaterialFrameSet:
         frameSet.loadByGuid(guid);
         break;
      case EDsFrameSet.MeshFrameSet:
         frameSet.loadByGuid(guid);
         break;
      case EDsFrameSet.ModelFrameSet:
         frameSet.loadByGuid(guid);
         break;
      case EDsFrameSet.PrivateTemplateFrameSet:
         frameSet.loadByGuid(guid);
         break;
      case EDsFrameSet.PrivateSceneFrameSet:
         frameSet.loadByGuid(guid);
         break;
      default:
         throw new TError('Unknown frameset. (name={1})', name);
   }
   o.storageSet('frameset_code', name)
   o.storageSet('frameset_guid', guid)
   o.storageUpdate();
   return frameSet;
}
function FDsSolutionWorkspace_load(){
   var o = this;
   var code = o._activeFrameSetCode = o.storageGet('frameset_code', EDsFrameSet.SolutionFrameSet);
   var guid = o._activeFrameSetGuid = o.storageGet('frameset_guid');
   var button = null;
   if(code == EDsFrameSet.SolutionFrameSet){
      button = o._tabBar.findControl('solution');
      button.doClick();
   }else if(code == EDsFrameSet.ProjectFrameSet){
      button = o._tabBar.findControl('solution');
      o._tabBar.select(button);
      o.selectFrameSet(code, guid)
   }else if(code == EDsFrameSet.ResourceFrameSet){
      button = o._tabBar.findControl('resource');
      button.doClick();
   }else if(code == EDsFrameSet.BitmapFrameSet){
      button = o._tabBar.findControl('resource');
      o._tabBar.select(button);
      o.selectFrameSet(code, guid)
   }else if(code == EDsFrameSet.MeshFrameSet){
      button = o._tabBar.findControl('resource');
      o._tabBar.select(button);
      o.selectFrameSet(code, guid)
   }else if(code == EDsFrameSet.ModelFrameSet){
      button = o._tabBar.findControl('resource');
      o._tabBar.select(button);
      o.selectFrameSet(code, guid)
   }else if(code == EDsFrameSet.PrivateTemplateFrameSet){
      button = o._tabBar.findControl('resource');
      o._tabBar.select(button);
      o.selectFrameSet(code, guid)
   }else if(code == EDsFrameSet.PrivateSceneFrameSet){
      button = o._tabBar.findControl('resource');
      o._tabBar.select(button);
      o.selectFrameSet(code, guid)
   }else{
      button = o._tabBar.findControl('solution');
      button.doClick();
   }
}
function FDsSolutionWorkspace_dispose(){
   var o = this;
   o._propertyFrames.dispose();
   o._propertyFrames = null;
   o.__base.FUiWorkspace.dispose.call(o);
}
