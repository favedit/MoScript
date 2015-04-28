function FDsShareTabBar(o){
   o = RClass.inherits(this, o, FUiTabBar);
   o._frameName            = 'resource.share.TabBar';
   o._resourceTypeCd       = 'private';
   o._controlPrivateButton = null;
   o._controlTeamButton    = null;
   o._controlShareButton   = null;
   o.onBuilded             = FDsShareTabBar_onBuilded;
   o.onButtonClick         = FDsShareTabBar_onButtonClick;
   o.construct             = FDsShareTabBar_construct;
   o.dispose               = FDsShareTabBar_dispose;
   return o;
}
function FDsShareTabBar_onBuilded(p){
   var o = this;
   o.__base.FUiTabBar.onBuilded.call(o, p);
   o._controlResource.addClickListener(o, o.onButtonClick);
}
function FDsShareTabBar_onButtonClick(event){
   var o = this;
   var sender = event.sender;
   var name = sender.name();
   if(name == 'resource'){
      o._workspace.selectFrameSet(EDsFrameSet.ShareResourceFrameSet);
   }else{
      alert('功能未开启，请以后关注。');
   }
}
function FDsShareTabBar_construct(){
   var o = this;
   o.__base.FUiTabBar.construct.call(o);
}
function FDsShareTabBar_dispose(){
   var o = this;
   o.__base.FUiTabBar.dispose.call(o);
}
function FDsShareWorkspace(o){
   o = RClass.inherits(this, o, FUiWorkspace, MUiStorage);
   o._frameName            = 'resource.share.Workspace';
   o._storageCode          = o._frameName;
   o._styleMenubarGround   = RClass.register(o, new AStyle('_styleMenubarGround', 'Menubar_Ground'));
   o._styleBodyGround      = RClass.register(o, new AStyle('_styleBodyGround', 'Body_Ground'));
   o._styleStatusbarGround = RClass.register(o, new AStyle('_styleStatusbarGround', 'Statusbar_Ground'));
   o._activeFrameSetCode   = null;
   o._activeProjectGuid    = null;
   o._frameToolBar         = null;
   o._frameStatusBar       = null;
   o._activeFrameSet       = null;
   o._frameSets            = null;
   o.onBuilded             = FDsShareWorkspace_onBuilded;
   o.construct             = FDsShareWorkspace_construct;
   o.selectFrameSet        = FDsShareWorkspace_selectFrameSet;
   o.load                  = FDsShareWorkspace_load;
   o.dispose               = FDsShareWorkspace_dispose;
   return o;
}
function FDsShareWorkspace_onBuilded(event){
   var o = this;
   o.__base.FUiWorkspace.onBuilded.call(o, event);
   o._frameMenuBar._hPanel.className = o.styleName('Menubar_Ground');
   o._frameBody._hPanel.className = o.styleName('Body_Ground');
   o._frameStatusBar._hPanel.className = o.styleName('Statusbar_Ground');
   var hTable = RBuilder.createTable(event);
   hTable.width = '100%';
   var hRow = RBuilder.appendTableRow(hTable);
   o._hMenuPanel = RBuilder.appendTableCell(hRow);
   var control = o._tabBar = RClass.create(FDsShareTabBar);
   control._workspace = o;
   control.buildDefine(event);
   var hCell = RBuilder.appendTableCell(hRow);
   hCell.width = '100px';
   hCell.align = 'right';
   hCell.vAlign = 'bottom';
   hCell.appendChild(control._hPanel);
   o._frameMenuBar._hPanel.appendChild(hTable);
}
function FDsShareWorkspace_construct(){
   var o = this;
   o.__base.FUiWorkspace.construct.call(o);
   o._frameSets = new TDictionary();
}
function FDsShareWorkspace_selectFrameSet(name, guid){
   var o = this;
   var frameSet = o._frameSets.get(name);
   if(!frameSet){
      if(name == EDsFrameSet.ShareResourceFrameSet){
         var menuBar = RClass.create(FDsShareResourceMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsShareResourceFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else if(name == EDsFrameSet.ShareBitmapFrameSet){
         var menuBar = RClass.create(FDsShareBitmapMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsShareBitmapFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else if(name == EDsFrameSet.ShareMaterialFrameSet){
         var menuBar = RClass.create(FDsShareMaterialMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsShareMaterialFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else if(name == EDsFrameSet.ShareModelFrameSet){
         var menuBar = RClass.create(FDsShareModelMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsShareModelFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else if(name == EDsFrameSet.ShareTemplateFrameSet){
         var menuBar = RClass.create(FDsShareTemplateMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsShareTemplateFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else if(name == EDsFrameSet.ShareSceneFrameSet){
         var menuBar = RClass.create(FDsShareSceneMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsShareSceneFrameSet);
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
      case EDsFrameSet.ShareResourceFrameSet:
         frameSet.load();
         break;
      case EDsFrameSet.ShareBitmapFrameSet:
      case EDsFrameSet.ShareMaterialFrameSet:
      case EDsFrameSet.ShareModelFrameSet:
      case EDsFrameSet.ShareTemplateFrameSet:
      case EDsFrameSet.ShareSceneFrameSet:
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
function FDsShareWorkspace_load(){
   var o = this;
   var code = o._activeFrameSetCode = o.storageGet('frameset_code', EDsFrameSet.ShareResourceFrameSet);
   var guid = o._activeFrameSetGuid = o.storageGet('frameset_guid');
   var button = o._tabBar.findControl('resource');
   button.doClick();
}
function FDsShareWorkspace_dispose(){
   var o = this;
   o._frameSets = RObject.dispose(o._frameSets);
   o.__base.FUiWorkspace.dispose.call(o);
}
function FDsShareResourceCatalogContent(o){
   o = RClass.inherits(this, o, FUiDataTreeView, MListenerSelected);
   o._activeSpace          = null;
   o._materials            = null;
   o.onBuild               = FDsShareResourceCatalogContent_onBuild;
   o.onLoadDisplay         = FDsShareResourceCatalogContent_onLoadDisplay;
   o.onNodeClick           = FDsShareResourceCatalogContent_onNodeClick;
   o.onNodeViewClick       = FDsShareResourceCatalogContent_onNodeViewClick;
   o.onNodeViewDoubleClick = FDsShareResourceCatalogContent_onNodeViewDoubleClick;
   o.lsnsSelect            = null;
   o.construct             = FDsShareResourceCatalogContent_construct;
   o.selectObject          = FDsShareResourceCatalogContent_selectObject;
   o.showObject            = FDsShareResourceCatalogContent_showObject;
   o.dispose               = FDsShareResourceCatalogContent_dispose;
   return o;
}
function FDsShareResourceCatalogContent_onBuild(p){
   var o = this;
   o.__base.FUiDataTreeView.onBuild.call(o, p);
   o.lsnsClick.register(o, o.onNodeClick);
   o.loadUrl('/cloud.describe.tree.ws?action=query&code=resource.catalog');
}
function FDsShareResourceCatalogContent_onLoadDisplay(p){
   var o = this;
   var n = p._linkNode;
   o.buildRenderable(n, p);
}
function FDsShareResourceCatalogContent_onNodeClick(t, n){
   var o = this;
}
function FDsShareResourceCatalogContent_onNodeViewClick(p){
   var o = this;
}
function FDsShareResourceCatalogContent_onNodeViewDoubleClick(p){
   var o = this;
}
function FDsShareResourceCatalogContent_construct(){
   var o = this;
   o.__base.FUiDataTreeView.construct.call(o);
   o._renderables = new TObjects();
   o._materials = new TObjects();
}
function FDsShareResourceCatalogContent_selectObject(p){
   var o = this;
   if(p != null){
      o.processSelectedListener(p, true);
   }
}
function FDsShareResourceCatalogContent_showObject(p){
   var o = this;
}
function FDsShareResourceCatalogContent_dispose(){
   var o = this;
   o.__base.FUiDataTreeView.dispose.call(o);
}
function FDsShareResourceCatalogToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   o._frameName                = 'resource.share.resource.CatalogToolBar';
   o._controlFolderOpenButton  = null;
   o._controlFolderCloseButton = null;
   o._activeNodeGuid           = null;
   o.onBuilded                 = FDsShareResourceCatalogToolBar_onBuilded;
   o.onFolderOpenClick         = FDsShareResourceCatalogToolBar_onFolderOpenClick;
   o.onFolderCloseClick        = FDsShareResourceCatalogToolBar_onFolderCloseClick;
   o.construct                 = FDsShareResourceCatalogToolBar_construct;
   o.dispose                   = FDsShareResourceCatalogToolBar_dispose;
   return o;
}
function FDsShareResourceCatalogToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
   o._controlFolderOpen.addClickListener(o, o.onFolderOpenClick);
   o._controlFolderClose.addClickListener(o, o.onFolderCloseClick);
}
function FDsShareResourceCatalogToolBar_onFolderOpenClick(event){
}
function FDsShareResourceCatalogToolBar_onFolderCloseClick(event){
}
function FDsShareResourceCatalogToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsShareResourceCatalogToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsShareResourceFrameSet(o){
   o = RClass.inherits(this, o, FUiFrameSet);
   o._frameName            = 'resource.share.resource.FrameSet';
   o._styleToolbarGround   = RClass.register(o, new AStyle('_styleToolbarGround', 'Toolbar_Ground'));
   o._styleCatalogContent  = RClass.register(o, new AStyle('_styleCatalogContent', 'Catalog_Content'));
   o._styleListContent     = RClass.register(o, new AStyle('_styleListContent', 'List_Content'));
   o._stylePropertyContent = RClass.register(o, new AStyle('_stylePropertyContent', 'Property_Content'));
   o._resourceTypeCd       = 'picture';
   o._frameCatalog         = null;
   o._frameCatalogToolbar  = null;
   o._frameCatalogContent  = null;
   o._frameSearch          = null;
   o._frameSearchToolbar   = null;
   o._frameSearchContent   = null;
   o._framePreview         = null;
   o._framePreviewToolbar  = null;
   o._framePreviewContent  = null;
   o._propertyFrames       = null;
   o.onBuilded             = FDsShareResourceFrameSet_onBuilded;
   o.onCatalogSelected     = FDsShareResourceFrameSet_onCatalogSelected;
   o.construct             = FDsShareResourceFrameSet_construct;
   o.findPropertyFrame     = FDsShareResourceFrameSet_findPropertyFrame;
   o.switchContent         = FDsShareResourceFrameSet_switchContent;
   o.load                  = FDsShareResourceFrameSet_load;
   o.dispose               = FDsShareResourceFrameSet_dispose;
   return o;
}
function FDsShareResourceFrameSet_onBuilded(event){
   var o = this;
   o.__base.FUiFrameSet.onBuilded.call(o, event);
   o._frameCatalogToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
   o._frameListToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._frameListContent._hPanel.className = o.styleName('List_Content');
   var f = o._catalogSplitter = o.searchControl('catalogSpliter');
   f.setAlignCd(EUiAlign.Left);
   f.setSizeHtml(o._frameCatalog._hPanel);
   var control = o._catalogToolbar = RClass.create(FDsShareResourceCatalogToolBar);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(event);
   o._frameCatalogToolBar.push(control);
   var control = o._catalogContent = RClass.create(FDsShareResourceCatalogContent);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.build(event);
   o._frameCatalogContent.push(control);
   var control = o._listToolBar = RClass.create(FDsShareResourceListToolBar);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(event);
   o._frameListToolBar.push(control);
   var control = o._listContent = RClass.create(FDsShareResourceListContent);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.build(event);
   o._frameListContent.push(control);
}
function FDsShareResourceFrameSet_onCatalogSelected(p, pc){
   var o = this;
   var space = o._activeSpace;
   var fs = o._propertyFrames;
   var c = fs.count();
   for(var i = 0; i < c; i++){
      var f = fs.value(i);
      f.hide();
   }
   if(RClass.isClass(p, FE3dStage)){
      var f = o.findPropertyFrame(EDsFrame.MeshSpacePropertyFrame);
      f.show();
      f.loadObject(space, space);
   }else if(RClass.isClass(p, FG3dTechnique)){
      var f = o.findPropertyFrame(EDsFrame.MeshTechniquePropertyFrame);
      f.show();
      f.loadObject(space, p);
   }else if(RClass.isClass(p, FE3dRegion)){
      var f = o.findPropertyFrame(EDsFrame.MeshRegionPropertyFrame);
      f.show();
      f.loadObject(space, p);
   }else if(RClass.isClass(p, FE3dCamera)){
      var f = o.findPropertyFrame(EDsFrame.MeshCameraPropertyFrame);
      f.show();
      f.loadObject(space, p);
   }else if(RClass.isClass(p, FG3dDirectionalLight)){
      var f = o.findPropertyFrame(EDsFrame.MeshLightPropertyFrame);
      f.show();
      f.loadObject(space, p);
   }else if(RClass.isClass(p, FE3dMeshDisplay)){
      var f = o.findPropertyFrame(EDsFrame.MeshDisplayPropertyFrame);
      f.show();
      f.loadObject(space, p);
   }else if(RClass.isClass(p, FG3dMaterial)){
      var f = o.findPropertyFrame(EDsFrame.MeshMaterialPropertyFrame);
      f.show();
      f.loadObject(space, p);
   }else if(RClass.isClass(p, FE3dMeshRenderable)){
      var f = o.findPropertyFrame(EDsFrame.MeshRenderablePropertyFrame);
      f.show();
      f.loadObject(space, p);
   }else{
      throw new TError('Unknown select object type. (value={1})', p);
   }
}
function FDsShareResourceFrameSet_construct(){
   var o = this;
   o.__base.FUiFrameSet.construct.call(o);
   o._propertyFrames = new TDictionary();
}
function FDsShareResourceFrameSet_findPropertyFrame(p){
   var o = this;
   var f = o._propertyFrames.get(p);
   if(!f){
      var fc = RConsole.find(FFrameConsole);
      f = fc.get(o, p, o._framePreview._hContainer);
      f._workspace = o;
      o._propertyFrames.set(p, f);
   }
   return f;
}
function FDsShareResourceFrameSet_switchContent(typeCd){
   var o = this;
   o._resourceTypeCd = typeCd;
   o._listContent.serviceSearch(typeCd, '', '', 40, 0);
}
function FDsShareResourceFrameSet_load(){
   var o = this;
   o._listToolBar.storageLoad();
}
function FDsShareResourceFrameSet_dispose(){
   var o = this;
   o.__base.FUiFrameSet.dispose.call(o);
   o._propertyFrames.dispose();
   o._propertyFrames = null;
}
function FDsShareResourceListContent(o){
   o = RClass.inherits(this, o, FUiListView);
   o._contentFlag      = null;
   o._contentTypeCd    = EE3sResource.All;
   o._contentSerach    = '';
   o._contentOrder     = '';
   o._contentPageSize  = 40;
   o._contentPageCount = 0;
   o._contentPage      = 0;
   o._activeItem       = null;
   o._activeGuid       = null;
   o._refreshButton    = null;
   o._saveButton       = null;
   o._runButton        = null;
   o.onServiceLoad     = FDsShareResourceListContent_onServiceLoad;
   o.construct         = FDsShareResourceListContent_construct;
   o.doClickItem       = FDsShareResourceListContent_doClickItem;
   o.doDoubleClickItem = FDsShareResourceListContent_doDoubleClickItem;
   o.serviceSearch     = FDsShareResourceListContent_serviceSearch;
   o.serviceResearch   = FDsShareResourceListContent_serviceResearch;
   o.dispose           = FDsShareResourceListContent_dispose;
   return o;
}
function FDsShareResourceListContent_onServiceLoad(p){
   var o = this;
   var xitems = p.root.findNode('ResourceCollection');
   var pageSize = xitems.getInteger('page_size');
   var pageCount = xitems.getInteger('page_count');
   var page = xitems.getInteger('page');
   o._frameSet._listToolBar.setNavigator(pageSize, pageCount, page);
   o.clear();
   var xnodes = xitems.nodes();
   var count = xnodes.count();
   for(var i = 0; i < count; i++){
      var xnode = xnodes.getAt(i);
      if(xnode.isName('Resource')){
         var item = o.createItem(FDsShareResourceListItem);
         item.propertyLoad(xnode);
         item._guid = xnode.get('guid');
         item._typeCd = xnode.get('type_cd');
         item._shareCd = xnode.get('share_cd');
         item._code = xnode.get('code');
         item._updateDate = xnode.get('update_date');
         item.setTypeLabel(item._typeCd);
         item.setLabel(xnode.get('code') + ' - ' + xnode.get('label'));
         item.refreshStyle();
         o.push(item);
      }
   }
   RConsole.find(FUiDesktopConsole).hide();
}
function FDsShareResourceListContent_construct(){
   var o = this;
   o.__base.FUiListView.construct.call(o);
}
function FDsShareResourceListContent_doClickItem(control){
   var o = this;
   o.__base.FUiListView.doClickItem.call(o, control);
}
function FDsShareResourceListContent_doDoubleClickItem(control){
   var o = this;
   o.__base.FUiListView.doDoubleClickItem.call(o, control)
   var guid = control._guid;
   o._activeItem = control;
   o._activeGuid = control._guid;
   var workspace = o._frameSet._workspace;
   var typeCd = control._typeCd;
   if(typeCd == EE3sResource.Bitmap){
      workspace.selectFrameSet(EDsFrameSet.ShareBitmapFrameSet, guid);
   }else if(typeCd == EE3sResource.Material){
      workspace.selectFrameSet(EDsFrameSet.ShareMaterialFrameSet, guid);
   }else if(typeCd == EE3sResource.Model){
      workspace.selectFrameSet(EDsFrameSet.ShareModelFrameSet, guid);
   }else if(typeCd == EE3sResource.Template){
      workspace.selectFrameSet(EDsFrameSet.ShareTemplateFrameSet, guid);
   }else if(typeCd == EE3sResource.Scene){
      workspace.selectFrameSet(EDsFrameSet.ShareSceneFrameSet, guid);
   }else{
      throw new TError(o, 'Unsupport resource format.');
   }
}
function FDsShareResourceListContent_serviceSearch(typeCd, search, order, pageSize, page){
   var o = this;
   if(typeCd == null){
      typeCd = o._contentTypeCd;
   }
   if(search == null){
      search = o._contentSerach;
   }
   if(order == null){
      order = o._contentOrder;
   }
   if(pageSize == null){
      pageSize = o._contentPageSize;
   }
   if(page == null){
      page = o._contentPage;
   }
   var flag = typeCd + '|' + search + '|' + order + '|' + pageSize + '|' + page;
   if(o._contentFlag == flag){
      return;
   }
   o._contentFlag = flag;
   o._contentTypeCd = typeCd;
   o._contentSerach = search;
   o._contentOrder = order;
   o._contentPageSize = pageSize;
   o._contentPage = page;
   RConsole.find(FUiDesktopConsole).showLoading();
   var connection = RConsole.find(FDrResourceConsole).doListShare(o._contentTypeCd, o._contentSerach, o._contentOrder, o._contentPageSize, o._contentPage);
   connection.addLoadListener(o, o.onServiceLoad);
}
function FDsShareResourceListContent_serviceResearch(){
   var o = this;
   o.serviceSearch(o._contentTypeCd, o._contentSerach, o._contentOrder, o._contentPageSize, o._contentPage);
}
function FDsShareResourceListContent_dispose(){
   var o = this;
   o.__base.FUiListView.dispose.call(o);
}
function FDsShareResourceListItem(o){
   o = RClass.inherits(this, o, FDsResourceListItem);
   return o;
}
function FDsShareResourceListToolBar(o){
   o = RClass.inherits(this, o, FDsResourceListToolBar);
   o._frameName   = 'resource.share.resource.ListToolBar';
   o._storageCode = o._frameName;
   return o;
}
function FDsShareResourceMenuBar(o){
   o = RClass.inherits(this, o, FUiMenuBar);
   o._frameName      = 'resource.share.resource.MenuBar';
   o._controlRefresh = null;
   o.onBuilded       = FDsShareResourceMenuBar_onBuilded;
   o.onRefreshClick  = FDsShareResourceMenuBar_onRefreshClick;
   o.construct       = FDsShareResourceMenuBar_construct;
   o.dispose         = FDsShareResourceMenuBar_dispose;
   return o;
}
function FDsShareResourceMenuBar_onBuilded(p){
   var o = this;
   o.__base.FUiMenuBar.onBuilded.call(o, p);
   o._controlRefresh.addClickListener(o, o.onRefreshClick);
}
function FDsShareResourceMenuBar_onRefreshClick(event){
}
function FDsShareResourceMenuBar_construct(){
   var o = this;
   o.__base.FUiMenuBar.construct.call(o);
}
function FDsShareResourceMenuBar_dispose(){
   var o = this;
   o.__base.FUiMenuBar.dispose.call(o);
}
function FDsShareResourcePropertyContent(o){
   o = RClass.inherits(this, o, FDsResourcePropertyContent);
   return o;
}
function FDsShareResourcePropertyToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   o._frameName             = 'resource.resource.PropertyToolBar';
   o._controlInsertButton   = null;
   o._controlUpdateButton   = null;
   o._controlDeleteButton   = null;
   o._controlRotationButton = null;
   o.onBuilded              = FDsShareResourcePropertyToolBar_onBuilded;
   o.onUpdateClick          = FDsShareResourcePropertyToolBar_onUpdateClick;
   o.onRotationClick        = FDsShareResourcePropertyToolBar_onRotationClick;
   o.construct              = FDsShareResourcePropertyToolBar_construct;
   o.dispose                = FDsShareResourcePropertyToolBar_dispose;
   return o;
}
function FDsShareResourcePropertyToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
   o._controlUpdateButton.addClickListener(o, o.onUpdateClick);
   o._controlRotationButton.addClickListener(o, o.onRotationClick);
}
function FDsShareResourcePropertyToolBar_onUpdateClick(event){
   var o = this;
}
function FDsShareResourcePropertyToolBar_onRotationClick(event){
   var o = this;
   var previewContent = o._workspace._previewContent;
   previewContent.switchRotation(event.checked);
}
function FDsShareResourcePropertyToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsShareResourcePropertyToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsShareResourceTabBar(o){
   o = RClass.inherits(this, o, FUiTabBar);
   o._frameName             = 'design3d.resource.TabBar';
   o._resourceTypeCd        = 'mesh';
   o._controlPictureButton  = null;
   o._controlSoundButton    = null;
   o._controlVidioButton    = null;
   o._controlTextureButton  = null;
   o._controlMaterialButton = null;
   o._controlMeshButton     = null;
   o._controlModelButton    = null;
   o._controlTemplateButton = null;
   o._controlSceneButton    = null;
   o.onBuilded              = FDsShareResourceTabBar_onBuilded;
   o.onButtonClick          = FDsShareResourceTabBar_onButtonClick;
   o.construct              = FDsShareResourceTabBar_construct;
   o.dispose                = FDsShareResourceTabBar_dispose;
   return o;
}
function FDsShareResourceTabBar_onBuilded(p){
   var o = this;
   o.__base.FUiTabBar.onBuilded.call(o, p);
   o._controlPictureButton.addClickListener(o, o.onButtonClick);
   o._controlSoundButton.addClickListener(o, o.onButtonClick);
   o._controlVidioButton.addClickListener(o, o.onButtonClick);
   o._controlTextureButton.addClickListener(o, o.onButtonClick);
   o._controlMaterialButton.addClickListener(o, o.onButtonClick);
   o._controlMeshButton.addClickListener(o, o.onButtonClick);
   o._controlModelButton.addClickListener(o, o.onButtonClick);
   o._controlTemplateButton.addClickListener(o, o.onButtonClick);
   o._controlSceneButton.addClickListener(o, o.onButtonClick);
}
function FDsShareResourceTabBar_onButtonClick(event){
   var o = this;
   var sender = event.sender;
   var name = sender.name();
   o._resourceTypeCd = name;
}
function FDsShareResourceTabBar_construct(){
   var o = this;
   o.__base.FUiTabBar.construct.call(o);
}
function FDsShareResourceTabBar_dispose(){
   var o = this;
   o.__base.FUiTabBar.dispose.call(o);
}
function FDsShareResourceWorkspace(o){
   o = RClass.inherits(this, o, FUiWorkspace);
   o._frameName            = 'resource.share.resource.Workspace';
   o._styleToolbarGround   = RClass.register(o, new AStyle('_styleToolbarGround', 'Toolbar_Ground'));
   o._styleStatusbarGround = RClass.register(o, new AStyle('_styleStatusbarGround', 'Statusbar_Ground'));
   o._styleCatalogGround   = RClass.register(o, new AStyle('_styleCatalogGround', 'Catalog_Ground'));
   o._styleCatalogToolbar  = RClass.register(o, new AStyle('_styleCatalogToolbar', 'Catalog_Toolbar'));
   o._styleSearchGround    = RClass.register(o, new AStyle('_styleSearchGround', 'Search_Ground'));
   o._styleSearchToolbar   = RClass.register(o, new AStyle('_styleCatalogToolbar', 'Search_Toolbar'));
   o._stylePreviewGround   = RClass.register(o, new AStyle('_stylePreviewGround', 'Preview_Ground'));
   o._stylePreviewToolbar  = RClass.register(o, new AStyle('_stylePreviewToolbar', 'Preview_Toolbar'));
   o._stylePropertyGround  = RClass.register(o, new AStyle('_stylePropertyGround', 'Property_Ground'));
   o._styleWorkspaceGround = RClass.register(o, new AStyle('_styleWorkspaceGround', 'Workspace_Ground'));
   o._resourceTypeCd       = 'picture';
   o._frameToolBar         = null;
   o._frameStatusBar       = null;
   o._frameCatalog         = null;
   o._frameCatalogToolbar  = null;
   o._frameCatalogContent  = null;
   o._frameSearch          = null;
   o._frameSearchToolbar   = null;
   o._frameSearchContent   = null;
   o._framePreview         = null;
   o._framePreviewToolbar  = null;
   o._framePreviewContent  = null;
   o._propertyFrames       = null;
   o.onBuilded             = FDsShareResourceWorkspace_onBuilded;
   o.onMeshLoad            = FDsShareResourceWorkspace_onMeshLoad;
   o.onCatalogSelected     = FDsShareResourceWorkspace_onCatalogSelected;
   o.construct             = FDsShareResourceWorkspace_construct;
   o.findPropertyFrame     = FDsShareResourceWorkspace_findPropertyFrame;
   o.switchContent         = FDsShareResourceWorkspace_switchContent;
   o.load                  = FDsShareResourceWorkspace_load;
   o.dispose               = FDsShareResourceWorkspace_dispose;
   return o;
}
function FDsShareResourceWorkspace_onBuilded(p){
   var o = this;
   o.__base.FUiWorkspace.onBuilded.call(o, p);
   var frame = o._frameToolBar = o.searchControl('toolbarFrame');
   frame._hPanel.className = o.styleName('Toolbar_Ground');
   var frame = o._frameBody = o.searchControl('bodyFrame');
   frame._hPanel.className = o.styleName('Catalog_Ground');
   var frame = o._frameStatusBar = o.searchControl('statusFrame');
   frame._hPanel.className = o.styleName('Statusbar_Ground');
   var hTable = RBuilder.createTable(p);
   hTable.width = '100%';
   var hRow = RBuilder.appendTableRow(hTable);
   var c = o._toolbar = RClass.create(FDsShareResourceMenuBar);
   c._workspace = o;
   c.buildDefine(p);
   var hCell = RBuilder.appendTableCell(hRow);
   hCell.appendChild(c._hPanel);
   var c = o._tabBar = RClass.create(FDsShareResourceTabBar);
   c._workspace = o;
   c.buildDefine(p);
   var hCell = RBuilder.appendTableCell(hRow);
   hCell.width = '450px';
   hCell.align = 'right';
   hCell.vAlign = 'bottom';
   hCell.appendChild(c._hPanel);
   o._frameToolBar._hPanel.appendChild(hTable);
   var frameSet = o._frameSet = RClass.create(FDsShareResourceFrameSet);
   frameSet._workspace = o;
   frameSet.buildDefine(p);
   o._frameBody.push(frameSet);
   frameSet.switchContent(o._resourceTypeCd);
}
function FDsShareResourceWorkspace_onMeshLoad(p){
   var o = this;
   o._activeSpace = p._activeSpace;
   o._catalog.buildSpace(o._activeSpace);
}
function FDsShareResourceWorkspace_onCatalogSelected(p, pc){
   var o = this;
   var space = o._activeSpace;
   var fs = o._propertyFrames;
   var c = fs.count();
   for(var i = 0; i < c; i++){
      var f = fs.value(i);
      f.hide();
   }
   if(RClass.isClass(p, FE3dStage)){
      var f = o.findPropertyFrame(EDsFrame.MeshSpacePropertyFrame);
      f.show();
      f.loadObject(space, space);
   }else if(RClass.isClass(p, FG3dTechnique)){
      var f = o.findPropertyFrame(EDsFrame.MeshTechniquePropertyFrame);
      f.show();
      f.loadObject(space, p);
   }else if(RClass.isClass(p, FE3dRegion)){
      var f = o.findPropertyFrame(EDsFrame.MeshRegionPropertyFrame);
      f.show();
      f.loadObject(space, p);
   }else if(RClass.isClass(p, FE3dCamera)){
      var f = o.findPropertyFrame(EDsFrame.MeshCameraPropertyFrame);
      f.show();
      f.loadObject(space, p);
   }else if(RClass.isClass(p, FG3dDirectionalLight)){
      var f = o.findPropertyFrame(EDsFrame.MeshLightPropertyFrame);
      f.show();
      f.loadObject(space, p);
   }else if(RClass.isClass(p, FE3dMeshDisplay)){
      var f = o.findPropertyFrame(EDsFrame.MeshDisplayPropertyFrame);
      f.show();
      f.loadObject(space, p);
   }else if(RClass.isClass(p, FG3dMaterial)){
      var f = o.findPropertyFrame(EDsFrame.MeshMaterialPropertyFrame);
      f.show();
      f.loadObject(space, p);
   }else if(RClass.isClass(p, FE3dMeshRenderable)){
      var f = o.findPropertyFrame(EDsFrame.MeshRenderablePropertyFrame);
      f.show();
      f.loadObject(space, p);
   }else{
      throw new TError('Unknown select object type. (value={1})', p);
   }
}
function FDsShareResourceWorkspace_construct(){
   var o = this;
   o.__base.FUiWorkspace.construct.call(o);
   o._propertyFrames = new TDictionary();
}
function FDsShareResourceWorkspace_findPropertyFrame(p){
   var o = this;
   var f = o._propertyFrames.get(p);
   if(!f){
      var fc = RConsole.find(FFrameConsole);
      f = fc.get(o, p, o._framePreview._hContainer);
      f._workspace = o;
      o._propertyFrames.set(p, f);
   }
   return f;
}
function FDsShareResourceWorkspace_switchContent(typeCd){
   this._frameSet.switchContent(typeCd);
}
function FDsShareResourceWorkspace_load(){
   var o = this;
}
function FDsShareResourceWorkspace_dispose(){
   var o = this;
   o.__base.FUiWorkspace.dispose.call(o);
   o._propertyFrames.dispose();
   o._propertyFrames = null;
}
function FDsShareBitmapCanvasContent(o){
   o = RClass.inherits(this, o, FDsBitmapCanvasContent);
   return o;
}
function FDsShareBitmapCanvasToolBar(o){
   o = RClass.inherits(this, o, FDsBitmapCanvasToolBar);
   o._frameName = 'resource.share.bitmap.CanvasToolBar';
   return o;
}
function FDsShareBitmapFrameSet(o){
   o = RClass.inherits(this, o, FDsBitmapFrameSet);
   o._frameName = 'resource.share.bitmap.FrameSet';
   o.onBuilded  = FDsShareBitmapFrameSet_onBuilded;
   return o;
}
function FDsShareBitmapFrameSet_onBuilded(event){
   var o = this;
   o.__base.FDsBitmapFrameSet.onBuilded.call(o, event);
   var toolbar = o._canvasToolbar = RClass.create(FDsShareBitmapCanvasToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(event);
   o._frameCanvasToolBar.push(toolbar);
   var canvas = o._canvasContent = RClass.create(FDsShareBitmapCanvasContent);
   canvas._frameSet = o;
   canvas._hParent = o._frameCanvasContent._hPanel;
   canvas._hParent.style.backgroundColor = '#333333';
   canvas._hParent.style.scroll = 'auto';
   canvas.build(event);
   o._frameCanvasContent.push(canvas);
   var toolbar = o._propertyToolbar = RClass.create(FDsShareBitmapPropertyToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(event);
   o._framePropertyToolBar.push(toolbar);
   var frame = o.findPropertyFrame(EDsFrame.BitmapPropertyFrame);
   o._framePropertyContent.push(frame);
}
function FDsShareBitmapMenuBar(o){
   o = RClass.inherits(this, o, FDsBitmapMenuBar);
   o._frameName  = 'resource.share.bitmap.MenuBar';
   o.onBuilded   = FDsShareBitmapMenuBar_onBuilded;
   o.onBackClick = FDsShareBitmapMenuBar_onBackClick;
   return o;
}
function FDsShareBitmapMenuBar_onBuilded(event){
   var o = this;
   o.__base.FDsBitmapMenuBar.onBuilded.call(o, event);
   o._controlBack.addClickListener(o, o.onBackClick);
}
function FDsShareBitmapMenuBar_onBackClick(event){
   var o = this;
   var workspace = o._frameSet._workspace;
   workspace.selectFrameSet(EDsFrameSet.ShareResourceFrameSet);
}
function FDsShareBitmapPropertyToolBar(o){
   o = RClass.inherits(this, o, FDsBitmapPropertyToolBar);
   o._frameName = 'resource.share.bitmap.PropertyToolBar';
   return o;
}
function FDsShareBitmapWorkspace(o){
   o = RClass.inherits(this, o, FDsBitmapWorkspace);
   o._frameName = 'resource.share.bitmap.Workspace';
   return o;
}
function FDsShareMaterialCanvasContent(o){
   o = RClass.inherits(this, o, FDsMaterialCanvasContent);
   return o;
}
function FDsShareMaterialCanvasToolBar(o){
   o = RClass.inherits(this, o, FDsMaterialCanvasToolBar);
   o._frameName = 'resource.share.materail.CanvasToolBar';
   return o;
}
function FDsShareMaterialCatalogContent(o){
   o = RClass.inherits(this, o, FDsMaterialCatalogContent);
   return o;
}
function FDsShareMaterialFrameSet(o){
   o = RClass.inherits(this, o, FDsMaterialFrameSet);
   o._frameName = 'resource.share.material.FrameSet';
   o.onBuilded  = FDsShareMaterialFrameSet_onBuilded;
   return o;
}
function FDsShareMaterialFrameSet_onBuilded(event){
   var o = this;
   o.__base.FDsMaterialFrameSet.onBuilded.call(o, event);
   var toolbar = o._toolbar = RClass.create(FDsShareMaterialMenuBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(event);
   o._frameToolBar.push(toolbar);
   var catalog = o._catalogContent = RClass.create(FDsShareMaterialCatalog);
   catalog._frameSet = o;
   catalog.build(event);
   catalog.addSelectedListener(o, o.onCatalogSelected);
   o._frameCatalogContent.push(catalog);
   var toolbar = o._canvasToolbar = RClass.create(FDsShareMaterialCanvasToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(event);
   o._frameCanvasToolBar.push(toolbar);
   var canvas = o._canvasContent = RClass.create(FDsShareMaterialCanvas);
   canvas._frameSet = o;
   canvas._toolbar = o._canvasToolbar;
   canvas._hParent = o._frameCanvasContent._hPanel;
   canvas._hParent.style.backgroundColor = '#333333';
   canvas._hParent.style.scroll = 'auto';
   canvas.addLoadListener(o, o.onDataLoaded);
   canvas.build(event);
   o._frameCanvasContent.push(canvas);
}
function FDsShareMaterialMenuBar(o){
   o = RClass.inherits(this, o, FDsMaterialMenuBar);
   o._frameName = 'resource.share.material.MenuBar';
   return o;
}
function FDsShareMaterialWorkspace(o){
   o = RClass.inherits(this, o, FDsMaterialWorkspace);
   o._frameName = 'resource.share.material.Workspace';
   return o;
}
function FDsShareModelCanvasContent(o){
   o = RClass.inherits(this, o, FDsModelCanvasContent);
   return o;
}
function FDsShareModelCanvasToolBar(o){
   o = RClass.inherits(this, o, FDsModelCanvasToolBar);
   o._frameName = 'resource.share.model.CanvasToolBar';
   return o;
}
function FDsShareModelCatalogContent(o){
   o = RClass.inherits(this, o, FDsModelCatalogContent);
   return o;
}
function FDsShareModelCatalogToolBar(o){
   o = RClass.inherits(this, o, FDsModelCatalogToolBar);
   o._frameName = 'resource.share.model.CatalogToolBar';
   return o;
}
function FDsShareModelFrameSet(o){
   o = RClass.inherits(this, o, FDsModelFrameSet);
   o._frameName = 'resource.share.model.FrameSet';
   o.onBuilded  = FDsShareModelFrameSet_onBuilded;
   return o;
}
function FDsShareModelFrameSet_onBuilded(event){
   var o = this;
   o.__base.FDsModelFrameSet.onBuilded.call(o, event);
   var toolbar = o._catalogToolbar = RClass.create(FDsShareModelCatalogToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(event);
   o._frameCatalogToolBar.push(toolbar);
   var catalog = o._catalogContent = RClass.create(FDsShareModelCatalogContent);
   catalog._frameSet = o;
   catalog.build(event);
   catalog.addSelectedListener(o, o.onCatalogSelected);
   o._frameCatalogContent.push(catalog);
   var toolbar = o._canvasToolbar = RClass.create(FDsShareModelCanvasToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(event);
   o._frameCanvasToolBar.push(toolbar);
   var canvas = o._canvasContent = RClass.create(FDsShareModelCanvasContent);
   canvas._frameSet = o;
   canvas._toolbar = o._canvasToolbar;
   canvas._hParent = o._frameCanvasContent._hPanel;
   canvas._hParent.style.backgroundColor = '#333333';
   canvas._hParent.style.scroll = 'auto';
   canvas.addLoadListener(o, o.onDataLoaded);
   canvas.build(event);
   o._frameCanvasContent.push(canvas);
}
function FDsShareModelMenuBar(o){
   o = RClass.inherits(this, o, FDsModelMenuBar);
   o._frameName = 'resource.share.model.MenuBar';
   o.onBuilded  = FDsShareModelMenuBar_onBuilded;
   return o;
}
function FDsShareModelMenuBar_onBuilded(p){
   var o = this;
   o.__base.FDsModelMenuBar.onBuilded.call(o, p);
}
function FDsShareModelWorkspace(o){
   o = RClass.inherits(this, o, FDsModelWorkspace);
   o._frameName = 'resource.share.model.Workspace';
   return o;
}
function FDsShareTemplateCanvasContent(o){
   o = RClass.inherits(this, o, FDsTemplateCanvasContent);
   return o;
}
function FDsShareTemplateCanvasToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   o._frameName      = 'resource.share.template.CanvasToolBar';
   o._refreshButton  = null;
   o._saveButton     = null;
   o._canvasModeCd   = EDsCanvasMode.Drop;
   o.onBuilded       = FDsShareTemplateCanvasToolBar_onBuilded;
   o.onModeClick     = FDsShareTemplateCanvasToolBar_onModeClick;
   o.onLookClick     = FDsShareTemplateCanvasToolBar_onLookClick;
   o.onPlayClick     = FDsShareTemplateCanvasToolBar_onPlayClick;
   o.onViewClick     = FDsShareTemplateCanvasToolBar_onViewClick;
   o.construct       = FDsShareTemplateCanvasToolBar_construct;
   o.dispose         = FDsShareTemplateCanvasToolBar_dispose;
   return o;
}
function FDsShareTemplateCanvasToolBar_onBuilded(event){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, event);
   o._controlModeDrop.addClickListener(o, o.onModeClick);
   o._controlModeSelect.addClickListener(o, o.onModeClick);
   o._controlTranslate.addClickListener(o, o.onModeClick);
   o._controlRotation.addClickListener(o, o.onModeClick);
   o._controlScale.addClickListener(o, o.onModeClick);
   o._controlLookFront.addClickListener(o, o.onLookClick);
   o._controlLookUp.addClickListener(o, o.onLookClick);
   o._controlLookLeft.addClickListener(o, o.onLookClick);
   o._controlPlay.addClickListener(o, o.onPlayClick);
   o._controlView.addClickListener(o, o.onViewClick);
}
function FDsShareTemplateCanvasToolBar_onModeClick(p){
   var o = this;
   o._canvasModeCd = p._canvasModeCd;
}
function FDsShareTemplateCanvasToolBar_onLookClick(p){
   var o = this;
   o._canvasModeCd = p._canvasModeCd;
}
function FDsShareTemplateCanvasToolBar_onPlayClick(p, v){
   var o = this;
   var c = o._frameSet._canvasContent;
   c._rotationAble = v;
}
function FDsShareTemplateCanvasToolBar_onViewClick(p, v){
   var o = this;
   var c = o._frameSet._canvasContent;
   c._rotationAble = v;
}
function FDsShareTemplateCanvasToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsShareTemplateCanvasToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsShareTemplateCatalogContent(o){
   o = RClass.inherits(this, o, FDsTemplateCatalogContent);
   return o;
}
function FDsShareTemplateCatalogToolBar(o){
   o = RClass.inherits(this, o, FDsTemplateCatalogToolBar);
   o._frameName = 'resource.share.template.CatalogToolBar';
   return o;
}
function FDsShareTemplateFrameSet(o){
   o = RClass.inherits(this, o, FDsTemplateFrameSet);
   o._frameName = 'resource.share.template.FrameSet';
   o.onBuilded  = FDsShareTemplateFrameSet_onBuilded;
   return o;
}
function FDsShareTemplateFrameSet_onBuilded(event){
   var o = this;
   o.__base.FDsTemplateFrameSet.onBuilded.call(o, event);
   var toolbar = o._catalogToolbar = RClass.create(FDsShareTemplateCatalogToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(event);
   o._frameCatalogToolBar.push(toolbar);
   var catalog = o._catalogContent = RClass.create(FDsShareTemplateCatalogContent);
   catalog._frameSet = o;
   catalog.build(event);
   catalog.addSelectedListener(o, o.onCatalogSelected);
   o._frameCatalogContent.push(catalog);
   var toolbar = o._canvasToolbar = RClass.create(FDsShareTemplateCanvasToolBar);
   toolbar._frameSet = o;
   toolbar._workspace = o._worksapce;
   toolbar.buildDefine(event);
   o._frameCanvasToolBar.push(toolbar);
   var canvas = o._canvasContent = RClass.create(FDsShareTemplateCanvasContent);
   canvas._frameSet = o;
   canvas._toolbar = o._canvasToolbar;
   canvas._hParent = o._frameCanvasContent._hPanel;
   canvas._hParent.style.backgroundColor = '#333333';
   canvas._hParent.style.scroll = 'auto';
   canvas.addLoadListener(o, o.onDataLoaded);
   canvas.build(event);
   o._frameCanvasContent.push(canvas);
}
function FDsShareTemplateMenuBar(o){
   o = RClass.inherits(this, o, FDsTemplateMenuBar);
   o._frameName = 'resource.share.template.MenuBar';
   o.onBuilded  = FDsShareTemplateMenuBar_onBuilded;
   return o;
}
function FDsShareTemplateMenuBar_onBuilded(p){
   var o = this;
   o.__base.FDsTemplateMenuBar.onBuilded.call(o, p);
}
function FDsShareTemplateToolBar(o){
   o = RClass.inherits(this, o, FDsTemplateToolBar);
   return o;
}
function FDsShareTemplateToolBar_onBuild(p){
   var o = this;
   o.__base.FUiToolBar.onBuild.call(o, p);
   var b = o._refreshButton  = RClass.create(FUiToolButton);
   b.setLabel('刷新');
   b.setIcon('design3d.tools.refresh');
   b.build(p);
   b.addClickListener(o, o.onRefreshClick);
   o.push(b);
   var b = o._saveButton = RClass.create(FUiToolButton);
   b.setLabel('保存');
   b.setIcon('design3d.tools.save');
   b.build(p);
   b.addClickListener(o, o.onSaveClick);
   o.push(b);
}
function FDsShareTemplateToolBar_onRefreshClick(p){
   var o = this;
}
function FDsShareTemplateToolBar_onSaveClick(p){
   var o = this;
   var t = o._workspace._activeTemplate;
   var rt = t._resource;
   var ts = rt.themes();
   var tc = ts.count();
   var xr = new TXmlNode();
   for(var ti = 0; ti < tc; ti++){
      var t = ts.get(ti);
      var ms = t.materials();
      var mc = ms.count();
      for(var mi = 0; mi < mc; mi++){
         var m = ms.value(mi);
         m.saveConfig(xr.create('Material'));
      }
   }
   RConsole.find(FE3sTemplateConsole).update(xr);
}
function FDsShareTemplateToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsShareTemplateToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsShareTemplateWorkspace(o){
   o = RClass.inherits(this, o, FDsTemplateWorkspace);
   return o;
}
function FDsShareSceneCanvasContent(o){
   o = RClass.inherits(this, o, FDsSceneCanvasContent);
   return o;
}
function FDsShareSceneCanvasToolBar(o){
   o = RClass.inherits(this, o, FDsSceneCanvasToolBar);
   o._frameName = 'resource.share.scene.CanvasToolBar';
   return o;
}
function FDsShareSceneCatalogContent(o){
   o = RClass.inherits(this, o, FDsSceneCatalogContent);
   return o;
}
function FDsShareSceneCatalogToolBar(o){
   o = RClass.inherits(this, o, FDsSceneCatalogToolBar);
   o._frameName = 'resource.share.scene.CatalogToolBar';
   return o;
}
function FDsShareSceneFrameSet(o){
   o = RClass.inherits(this, o, FDsSceneFrameSet);
   o._frameName = 'resource.share.scene.FrameSet';
   o.onBuilded  = FDsShareSceneFrameSet_onBuilded;
   return o;
}
function FDsShareSceneFrameSet_onBuilded(event){
   var o = this;
   o.__base.FDsSceneFrameSet.onBuilded.call(o, event);
   var toolbar = o._catalogToolbar = RClass.create(FDsShareSceneCatalogToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(event);
   o._frameCatalogToolBar.push(toolbar);
   var catalog = o._catalogContent = RClass.create(FDsShareSceneCatalogContent);
   catalog._frameSet = o;
   catalog.build(event);
   catalog.addSelectedListener(o, o.onCatalogSelected);
   o._frameCatalogContent.push(catalog);
   var toolbar = o._canvasToolbar = RClass.create(FDsShareSceneCanvasToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(event);
   o._frameCanvasToolBar.push(toolbar);
   var canvas = o._canvasContent = RClass.create(FDsShareSceneCanvasContent);
   canvas._frameSet = o;
   canvas._toolbar = o._canvasToolbar;
   canvas._hParent = o._frameCanvasContent._hPanel;
   canvas._hParent.style.backgroundColor = '#333333';
   canvas._hParent.style.scroll = 'auto';
   canvas.addLoadListener(o, o.onDataLoaded);
   canvas.build(event);
   o._frameCanvasContent.push(canvas);
   var toolbar = o._propertyToolbar = RClass.create(FDsShareScenePropertyToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(event);
   o._framePropertyToolBar.push(toolbar);
}
function FDsShareSceneMenuBar(o){
   o = RClass.inherits(this, o, FDsSceneMenuBar);
   o._frameName = 'resource.share.scene.MenuBar';
   o.onBuilded  = FDsShareSceneMenuBar_onBuilded;
   return o;
}
function FDsShareSceneMenuBar_onBuilded(p){
   var o = this;
   o.__base.FDsSceneMenuBar.onBuilded.call(o, p);
   o._controlExecute.addClickListener(o, o.onExecuteClick);
}
function FDsShareScenePropertyToolBar(o){
   o = RClass.inherits(this, o, FDsScenePropertyToolBar);
   o._frameName = 'resource.share.scene.PropertyToolBar';
   return o;
}
function FDsShareSceneWorkspace(o){
   o = RClass.inherits(this, o, FDsSceneWorkspace);
   o._frameName = 'resource.share.scene.Workspace';
   return o;
}
