function FDsResourceCatalogContent(o){
   o = RClass.inherits(this, o, FUiDataTreeView, MListenerSelected);
   o._activeSpace          = null;
   o._materials            = null;
   o.onBuild               = FDsResourceCatalogContent_onBuild;
   o.onLoadDisplay         = FDsResourceCatalogContent_onLoadDisplay;
   o.onNodeClick           = FDsResourceCatalogContent_onNodeClick;
   o.onNodeViewClick       = FDsResourceCatalogContent_onNodeViewClick;
   o.onNodeViewDoubleClick = FDsResourceCatalogContent_onNodeViewDoubleClick;
   o.lsnsSelect            = null;
   o.construct             = FDsResourceCatalogContent_construct;
   o.selectObject          = FDsResourceCatalogContent_selectObject;
   o.showObject            = FDsResourceCatalogContent_showObject;
   o.dispose               = FDsResourceCatalogContent_dispose;
   return o;
}
function FDsResourceCatalogContent_onBuild(p){
   var o = this;
   o.__base.FUiDataTreeView.onBuild.call(o, p);
   o.lsnsClick.register(o, o.onNodeClick);
   o.loadUrl('/cloud.describe.tree.ws?action=query&code=resource.catalog');
}
function FDsResourceCatalogContent_onLoadDisplay(p){
   var o = this;
   var n = p._linkNode;
   o.buildRenderable(n, p);
}
function FDsResourceCatalogContent_onNodeClick(t, n){
   var o = this;
}
function FDsResourceCatalogContent_onNodeViewClick(p){
   var o = this;
}
function FDsResourceCatalogContent_onNodeViewDoubleClick(p){
   var o = this;
}
function FDsResourceCatalogContent_construct(){
   var o = this;
   o.__base.FUiDataTreeView.construct.call(o);
   o._renderables = new TObjects();
   o._materials = new TObjects();
}
function FDsResourceCatalogContent_selectObject(p){
   var o = this;
   if(p != null){
      o.processSelectedListener(p, true);
   }
}
function FDsResourceCatalogContent_showObject(p){
   var o = this;
}
function FDsResourceCatalogContent_dispose(){
   var o = this;
   o.__base.FUiDataTreeView.dispose.call(o);
}
function FDsResourceCatalogToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   o._frameName                   = 'resource.resource.CatalogToolBar';
   o._controlFolderCreateButton   = null;
   o._controlFolderDeleteButton   = null;
   o._controlFolderPropertyButton  = null;
   o._controlFolderOpenButton     = null;
   o._controlFolderCloseButton    = null;
   o._activeNodeGuid              = null;
   o.onBuilded                    = FDsResourceCatalogToolBar_onBuilded;
   o.onFolderCreateClick          = FDsResourceCatalogToolBar_onFolderCreateClick;
   o.onFolderDeleteLoad           = FDsResourceCatalogToolBar_onFolderDeleteLoad;
   o.onFolderDeleteExcute         = FDsResourceCatalogToolBar_onFolderDeleteExcute;
   o.onFolderDeleteClick          = FDsResourceCatalogToolBar_onFolderDeleteClick;
   o.onFolderPropertyClick        = FDsResourceCatalogToolBar_onFolderPropertyClick;
   o.onFolderOpenClick            = FDsResourceCatalogToolBar_onFolderOpenClick;
   o.onFolderCloseClick           = FDsResourceCatalogToolBar_onFolderCloseClick;
   o.construct                    = FDsResourceCatalogToolBar_construct;
   o.dispose                      = FDsResourceCatalogToolBar_dispose;
   return o;
}
function FDsResourceCatalogToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
   o._controlFolderCreateButton.addClickListener(o, o.onFolderCreateClick);
   o._controlFolderDeleteButton.addClickListener(o, o.onFolderDeleteClick);
   o._controlFolderPropertyButton.addClickListener(o, o.onFolderPropertyClick);
   o._controlFolderOpenButton.addClickListener(o, o.onFolderOpenClick);
   o._controlFolderCloseButton.addClickListener(o, o.onFolderCloseClick);
}
function FDsResourceCatalogToolBar_onFolderCreateClick(event){
   var o = this;
   var parentGuid = null;
   var parentLabel = null;
   var catalog = o._frameSet._catalogContent;
   var node = catalog.focusNode();
   if(node){
      parentGuid = node.guid();
      parentLabel = node.label();
   }
   var dialog = RConsole.find(FUiWindowConsole).find(FDsResourceFolderDialog);
   dialog._workspace = o._workspace;
   dialog._frameSet = o._frameSet;
   dialog._parentGuid = parentGuid;
   dialog.setNodeParentLabel(parentLabel);
   dialog.setNodeLabel('');
   dialog.switchDataMode(EUiDataMode.Insert);
   dialog.showPosition(EUiPosition.Center);
}
function FDsResourceCatalogToolBar_onFolderDeleteLoad(event){
   var o = this;
   RConsole.find(FUiDesktopConsole).hide();
   var catalog = o._frameSet._catalogContent;
   var guid = o._activeNodeGuid;
   if(guid){
      var node = catalog.findByGuid(guid);
      node.removeSelf();
   }
   o._activeNodeGuid = null;
}
function FDsResourceCatalogToolBar_onFolderDeleteExcute(event){
   var o = this;
   if(event.resultCd != EResult.Success){
      return;
   }
   var catalog = o._frameSet._catalogContent;
   var node = catalog.focusNode();
   RConsole.find(FUiDesktopConsole).showUploading();
   o._activeNodeGuid = node._guid;
   var connection = RConsole.find(FDrResourceConsole).doFolderDelete(node._guid);
   connection.addLoadListener(o, o.onFolderDeleteLoad);
}
function FDsResourceCatalogToolBar_onFolderDeleteClick(event){
   var o = this;
   var catalog = o._frameSet._catalogContent;
   var node = catalog.focusNode();
   if(!node){
      return RConsole.find(FUiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
   }
   var dialog = RConsole.find(FUiMessageConsole).showConfirm('请确认是否删除当前目录？');
   dialog.addResultListener(o, o.onFolderDeleteExcute);
}
function FDsResourceCatalogToolBar_onFolderPropertyClick(event){
   var o = this;
   var catalog = o._frameSet._catalogContent;
   var node = catalog.focusNode();
   if(!node){
      return RConsole.find(FUiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
   }
   var parentLabel = null;
   if(node._parent){
      parentLabel = node._parent.label();
   }
   var dialog = RConsole.find(FUiWindowConsole).find(FDsResourceFolderDialog);
   dialog._workspace = o._workspace;
   dialog._frameSet = o._frameSet;
   dialog._nodeGuid = node._guid;
   dialog.setNodeParentLabel(parentLabel);
   dialog.setNodeLabel(node.label());
   dialog.switchDataMode(EUiDataMode.Update);
   dialog.showPosition(EUiPosition.Center);
}
function FDsResourceCatalogToolBar_onFolderOpenClick(event){
}
function FDsResourceCatalogToolBar_onFolderCloseClick(event){
}
function FDsResourceCatalogToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsResourceCatalogToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsResourceFolderDialog(o){
   o = RClass.inherits(this, o, FUiDialog);
   o._frameName            = 'resource.resource.FolderDialog';
   o._dataModeCd           = null;
   o._controlParentLabel   = null;
   o._controlLabel         = null;
   o._controlConfirmButton = null;
   o._controlCancelButton  = null;
   o.onBuilded             = FDsResourceFolderDialog_onBuilded;
   o.onConfirmLoad         = FDsResourceFolderDialog_onConfirmLoad;
   o.onConfirmClick        = FDsResourceFolderDialog_onConfirmClick;
   o.onCancelClick         = FDsResourceFolderDialog_onCancelClick;
   o.construct             = FDsResourceFolderDialog_construct;
   o.setNodeParentLabel    = FDsResourceFolderDialog_setNodeParentLabel;
   o.setNodeLabel          = FDsResourceFolderDialog_setNodeLabel;
   o.switchDataMode        = FDsResourceFolderDialog_switchDataMode;
   o.dispose               = FDsResourceFolderDialog_dispose;
   return o;
}
function FDsResourceFolderDialog_onBuilded(p){
   var o = this;
   o.__base.FUiDialog.onBuilded.call(o, p);
   o._controlParentLabel.setEditAble(false);
   o._controlConfirmButton.addClickListener(o, o.onConfirmClick);
   o._controlCancelButton.addClickListener(o, o.onCancelClick);
}
function FDsResourceFolderDialog_onConfirmLoad(event){
   var o = this;
   RConsole.find(FUiDesktopConsole).hide();
   o.hide();
   var catalog = o._frameSet._catalogContent;
   if(o._dataModeCd == EUiDataMode.Insert){
      if(o._parentGuid){
         var node = catalog.findByGuid(o._parentGuid);
         catalog.loadNode(node);
      }else{
         catalog.loadService();
      }
   }else{
      var label = o._controlLabel.get();
      var node = catalog.focusNode();
      node.setLabel(label);
   }
}
function FDsResourceFolderDialog_onConfirmClick(event){
   var o = this;
   RConsole.find(FUiDesktopConsole).showUploading();
   var label = o._controlLabel.get();
   var resourceConsole = RConsole.find(FDrResourceConsole);
   var connection = null;
   if(o._dataModeCd == EUiDataMode.Insert){
      connection = resourceConsole.doFolderCreate(o._parentGuid, null, label);
   }else{
      connection = resourceConsole.doFolderUpdate(o._nodeGuid, null, label);
   }
   connection.addLoadListener(o, o.onConfirmLoad);
}
function FDsResourceFolderDialog_onCancelClick(event){
   this.hide();
}
function FDsResourceFolderDialog_construct(){
   var o = this;
   o.__base.FUiDialog.construct.call(o);
}
function FDsResourceFolderDialog_setNodeParentLabel(label){
   this._controlParentLabel.set(label);
}
function FDsResourceFolderDialog_setNodeLabel(label){
   this._controlLabel.set(label);
}
function FDsResourceFolderDialog_switchDataMode(modeCd){
   var o = this;
   o._dataModeCd = modeCd;
   if(modeCd == EUiDataMode.Insert){
      o.setLabel('新建资源目录');
   }else if(modeCd == EUiDataMode.Update){
      o.setLabel('资源目录属性');
   }
}
function FDsResourceFolderDialog_dispose(){
   var o = this;
   o.__base.FUiDialog.dispose.call(o);
}
function FDsResourceFrameSet(o){
   o = RClass.inherits(this, o, FUiFrameSet);
   o._frameName            = 'resource.resource.FrameSet';
   o._styleCatalogGround   = RClass.register(o, new AStyle('_styleCatalogGround', 'Catalog_Ground'));
   o._styleCatalogToolbar  = RClass.register(o, new AStyle('_styleCatalogToolbar', 'Catalog_Toolbar'));
   o._styleSearchGround    = RClass.register(o, new AStyle('_styleSearchGround', 'List_Ground'));
   o._styleSearchToolbar   = RClass.register(o, new AStyle('_styleCatalogToolbar', 'List_Toolbar'));
   o._stylePreviewGround   = RClass.register(o, new AStyle('_stylePreviewGround', 'Property_Ground'));
   o._stylePreviewToolbar  = RClass.register(o, new AStyle('_stylePreviewToolbar', 'Property_Toolbar'));
   o._stylePropertyGround  = RClass.register(o, new AStyle('_stylePropertyGround', 'Property_Ground'));
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
   o.onBuilded             = FDsResourceFrameSet_onBuilded;
   o.onCatalogSelected     = FDsResourceFrameSet_onCatalogSelected;
   o.construct             = FDsResourceFrameSet_construct;
   o.findPropertyFrame     = FDsResourceFrameSet_findPropertyFrame;
   o.switchContent         = FDsResourceFrameSet_switchContent;
   o.load                  = FDsResourceFrameSet_load;
   o.dispose               = FDsResourceFrameSet_dispose;
   return o;
}
function FDsResourceFrameSet_onBuilded(p){
   var o = this;
   o.__base.FUiFrameSet.onBuilded.call(o, p);
   var frame = o._frameCatalog = o.searchControl('catalogFrame');
   frame._hPanel.className = o.styleName('Catalog_Ground');
   var frame = o._frameCatalogToolbar = o.searchControl('catalogToolbarFrame');
   frame._hPanel.className = o.styleName('Catalog_Toolbar');
   o._frameCatalogContent = o.searchControl('catalogContentFrame');
   var frame = o._frameSearch = o.searchControl('listFrame');
   frame._hPanel.className = o.styleName('List_Ground');
   var frame = o._frameSearchToolbar = o.searchControl('listToolbarFrame');
   frame._hPanel.className = o.styleName('List_Toolbar');
   o._frameSearchContent = o.searchControl('listContentFrame');
   var f = o._catalogSplitter = o.searchControl('catalogSpliter');
   f.setAlignCd(EUiAlign.Left);
   f.setSizeHtml(o._frameCatalog._hPanel);
   var control = o._catalogToolbar = RClass.create(FDsResourceCatalogToolBar);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(p);
   o._frameCatalogToolbar.push(control);
   var control = o._catalogContent = RClass.create(FDsResourceCatalogContent);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.build(p);
   o._frameCatalogContent.push(control);
   var control = o._listToolBar = RClass.create(FDsResourceListToolBar);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(p);
   o._frameSearchToolbar.push(control);
   var control = o._listContent = RClass.create(FDsResourceListContent);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.build(p);
   o._frameSearchContent.push(control);
}
function FDsResourceFrameSet_onCatalogSelected(p, pc){
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
function FDsResourceFrameSet_construct(){
   var o = this;
   o.__base.FUiFrameSet.construct.call(o);
   o._propertyFrames = new TDictionary();
}
function FDsResourceFrameSet_findPropertyFrame(p){
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
function FDsResourceFrameSet_switchContent(typeCd){
   var o = this;
   o._resourceTypeCd = typeCd;
   o._listContent.serviceSearch(typeCd, '', '', 40, 0);
}
function FDsResourceFrameSet_load(){
   var o = this;
   o._listToolBar.storageLoad();
}
function FDsResourceFrameSet_dispose(){
   var o = this;
   o.__base.FUiFrameSet.dispose.call(o);
   o._propertyFrames.dispose();
   o._propertyFrames = null;
}
function FDsResourceImportDialog(o){
   o = RClass.inherits(this, o, FUiDialog);
   o._frameName            = 'resource.resource.ImportDialog';
   o._nodeGuid             = null;
   o._controlPrivateButton = null;
   o._controlTeamButton    = null;
   o._controlShareButton   = null;
   o.onBuilded             = FDsResourceImportDialog_onBuilded;
   o.onFileChange          = FDsResourceImportDialog_onFileChange;
   o.onFileLoaded          = FDsResourceImportDialog_onFileLoaded;
   o.onConfirmLoad         = FDsResourceImportDialog_onConfirmLoad;
   o.onConfirmClick        = FDsResourceImportDialog_onConfirmClick;
   o.onCancelClick         = FDsResourceImportDialog_onCancelClick;
   o.construct             = FDsResourceImportDialog_construct;
   o.setNodeLabel          = FDsResourceImportDialog_setNodeLabel;
   o.switchMode            = FDsResourceFolderDialog_switchMode;
   o.dispose               = FDsResourceImportDialog_dispose;
   return o;
}
function FDsResourceImportDialog_onBuilded(p){
   var o = this;
   o.__base.FUiDialog.onBuilded.call(o, p);
   o._controlNodeLabel.setEditAble(false);
   o._controlFile.addDataChangedListener(o, o.onFileChange);
   o._controlConfirmButton.addClickListener(o, o.onConfirmClick);
   o._controlCancelButton.addClickListener(o, o.onCancelClick);
}
function FDsResourceImportDialog_onFileChange(event){
   var o = this;
   var name = o._controlFile.get();
   var code = RFile.name(name);
   if(RString.isEmpty(o._controlCode.get())){
      o._controlCode.set(code);
   }
   if(RString.isEmpty(o._controlLabel.get())){
      o._controlLabel.set(code);
   }
}
function FDsResourceImportDialog_onFileLoaded(event){
   var o = this;
   var reader = o._fileReader;
   var code = o._controlCode.get();
   var label = o._controlLabel.get();
   var url = null;
   if(o._modeCd == 'picture'){
      url = '/cloud.resource.bitmap.wv?do=importData';
   }else if(o._modeCd == 'mesh'){
      url = '/cloud.resource.model.wv?do=importData';
   }else{
      throw new TError(o, 'Type is invalid.');
   }
   if(o._nodeGuid){
      url += '&node_guid=' + o._nodeGuid;
   }
   url += '&code=' + code + '&label=' + label + '&data_length=' + reader.length() + '&file_name=' + reader.fileName();
   url = RBrowser.urlEncode(url);
   var connection = RConsole.find(FHttpConsole).send(url, reader.data());
   connection.addLoadListener(o, o.onConfirmLoad);
   o._fileReader = RObject.dispose(reader);
}
function FDsResourceImportDialog_onConfirmLoad(event){
   var o = this;
   RConsole.find(FUiDesktopConsole).hide();
   o.hide();
   var frame = o._frameSet._listContent;
   frame.serviceResearch();
}
function FDsResourceImportDialog_onConfirmClick(event){
   var o = this;
   RConsole.find(FUiDesktopConsole).showUploading();
   var file = o._controlFile._hInput.files[0];
   var reader = o._fileReader = RClass.create(FFileReader);
   reader.addLoadListener(o, o.onFileLoaded);
   reader.loadFile(file);
}
function FDsResourceImportDialog_onCancelClick(event){
   this.hide();
}
function FDsResourceImportDialog_construct(){
   var o = this;
   o.__base.FUiDialog.construct.call(o);
}
function FDsResourceImportDialog_setNodeLabel(label){
   var o = this;
   o._controlNodeLabel.set(label);
}
function FDsResourceFolderDialog_switchMode(modeCd){
   var o = this;
   o._modeCd = modeCd;
   if(modeCd == 'picture'){
      o.setLabel('导入图片资源');
   }else if(modeCd == 'mesh'){
      o.setLabel('导入网格资源');
   }else{
      throw new TError(o, 'Unknown mode.');
   }
   o._controlCode.set('');
   o._controlLabel.set('');
}
function FDsResourceImportDialog_dispose(){
   var o = this;
   o.__base.FUiDialog.dispose.call(o);
}
function FDsResourceListContent(o){
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
   o.onServiceLoad     = FDsResourceListContent_onServiceLoad;
   o.construct         = FDsResourceListContent_construct;
   o.doClickItem       = FDsResourceListContent_doClickItem;
   o.doDoubleClickItem = FDsResourceListContent_doDoubleClickItem;
   o.serviceSearch     = FDsResourceListContent_serviceSearch;
   o.serviceResearch   = FDsResourceListContent_serviceResearch;
   o.dispose           = FDsResourceListContent_dispose;
   return o;
}
function FDsResourceListContent_onServiceLoad(p){
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
         var item = o.createItem(FDsResourceListItem);
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
function FDsResourceListContent_construct(){
   var o = this;
   o.__base.FUiListView.construct.call(o);
}
function FDsResourceListContent_doClickItem(control){
   var o = this;
   o.__base.FUiListView.doClickItem.call(o, control);
}
function FDsResourceListContent_doDoubleClickItem(control){
   var o = this;
   o.__base.FUiListView.doDoubleClickItem.call(o, control)
   var guid = control._guid;
   o._activeItem = control;
   o._activeGuid = control._guid;
   var workspace = o._frameSet._workspace;
   var typeCd = control._typeCd;
   if(typeCd == EE3sResource.Bitmap){
      workspace.selectFrameSet(EDsFrameSet.BitmapFrameSet, guid);
   }else if(typeCd == EE3sResource.Material){
      workspace.selectFrameSet(EDsFrameSet.MaterialFrameSet, guid);
   }else if(typeCd == EE3sResource.Model){
      workspace.selectFrameSet(EDsFrameSet.ModelFrameSet, guid);
   }else if(typeCd == EE3sResource.Template){
      workspace.selectFrameSet(EDsFrameSet.TemplateFrameSet, guid);
   }else if(typeCd == EE3sResource.Scene){
      workspace.selectFrameSet(EDsFrameSet.SceneFrameSet, guid);
   }else{
      throw new TError(o, 'Unsupport resource format.');
   }
}
function FDsResourceListContent_serviceSearch(typeCd, search, order, pageSize, page){
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
   var connection = RConsole.find(FDrResourceConsole).doList(o._contentTypeCd, o._contentSerach, o._contentOrder, o._contentPageSize, o._contentPage);
   connection.addLoadListener(o, o.onServiceLoad);
}
function FDsResourceListContent_serviceResearch(){
   var o = this;
   o.serviceSearch(o._contentTypeCd, o._contentSerach, o._contentOrder, o._contentPageSize, o._contentPage);
}
function FDsResourceListContent_dispose(){
   var o = this;
   o.__base.FUiListView.dispose.call(o);
}
function FDsResourceListItem(o){
   o = RClass.inherits(this, o, FUiListViewItem);
   o._styleTypePanel        = RClass.register(o, new AStyle('_styleTypePanel'));
   o._styleTypePrivateLabel = RClass.register(o, new AStyle('_styleTypePublicLabel'));
   o._styleTypePublicLabel  = RClass.register(o, new AStyle('_styleTypePrivateLabel'));
   o.onBuild         = FDsResourceListItem_onBuild;
   o.setTypeLabel    = FDsResourceListItem_setTypeLabel;
   o.refreshStyle    = FDsResourceListItem_refreshStyle;
   return o;
}
function FDsResourceListItem_onBuild(p){
   var o = this;
   o.__base.FUiListViewItem.onBuild.call(o, p);
   var h = o._hPanel;
   h.style.width = '200px';
   h.style.height = '150px';
   o._hLine1.className = o.styleName('TypePanel');
   o._hLine1.vAlign = 'top';
   o._hTypeLabel = RBuilder.appendDiv(o._hLine1, o.styleName('TypePrivateLabel'));
}
function FDsResourceListItem_setTypeLabel(label){
   this._hTypeLabel.innerHTML = label;
}
function FDsResourceListItem_refreshStyle(){
   var o = this;
   if(o._shareCd == 'Public'){
      o._hTypeLabel.className = o.styleName('TypePublicLabel');
   }else{
      o._hTypeLabel.className = o.styleName('TypePrivateLabel');
   }
   var url = '/cloud.resource.preview.wv?type_cd=' + o._typeCd + '&guid=' + o._guid + '&update_date=' + o._updateDate;
   o._hForm.style.backgroundImage = 'url("' + url + '")';
}
function FDsResourceListToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar, MUiStorage);
   o._frameName        = 'resource.resource.ListToolBar';
   o._storageCode      = o._frameName;
   o._dropButton       = null;
   o._selectButton     = null;
   o._translateButton  = null;
   o._rotationButton   = null;
   o._scaleButton      = null;
   o._lookFrontButton  = null;
   o._lookUpButton     = null;
   o._lookLeftButton   = null;
   o._playButton       = null;
   o._viewButton       = null;
   o.onBuilded         = FDsResourceListToolBar_onBuilded;
   o.onSearchClick     = FDsResourceListToolBar_onSearchClick;
   o.onNavigatorClick  = FDsResourceListToolBar_onNavigatorClick;
   o.onTypeClick       = FDsResourceListToolBar_onTypeClick;
   o.construct         = FDsResourceListToolBar_construct;
   o.makeTypeCd        = FDsResourceListToolBar_makeTypeCd;
   o.setNavigator      = FDsResourceListToolBar_setNavigator;
   o.doNavigator       = FDsResourceListToolBar_doNavigator;
   o.storageLoad       = FDsResourceListToolBar_storageLoad;
   o.dispose           = FDsResourceListToolBar_dispose;
   return o;
}
function FDsResourceListToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
   o._controlSearchEdit.addClickListener(o, o.onSearchClick);
   o._controlFirstButton.addClickListener(o, o.onNavigatorClick);
   o._controlPriorButton.addClickListener(o, o.onNavigatorClick);
   o._controlNextButton.addClickListener(o, o.onNavigatorClick);
   o._controlLastButton.addClickListener(o, o.onNavigatorClick);
   o._controlTypeAll.addClickListener(o, o.onTypeClick);
   o._controlTypeNone.addClickListener(o, o.onTypeClick);
   o._controlTypeBitmap.addClickListener(o, o.onTypeClick);
   o._controlTypeBitmap.check(true);
   o._controlTypeMaterial.addClickListener(o, o.onTypeClick);
   o._controlTypeMaterial.check(true);
   o._controlTypeModel.addClickListener(o, o.onTypeClick);
   o._controlTypeModel.check(true);
   o._controlTypeTemplate.addClickListener(o, o.onTypeClick);
   o._controlTypeTemplate.check(true);
   o._controlTypeScene.addClickListener(o, o.onTypeClick);
   o._controlTypeScene.check(true);
}
function FDsResourceListToolBar_onSearchClick(p){
   this.doNavigator(0);
}
function FDsResourceListToolBar_onNavigatorClick(event){
   var o = this;
   var sender = event.sender;
   var name = sender.name();
   var page = o._contentPage;
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
         page = o._contentPageCount - 1;
         break;
   }
   o.doNavigator(page);
}
function FDsResourceListToolBar_onTypeClick(event){
   var o = this;
   var sender = event.sender;
   var name = sender.name();
   var page = o._contentPage;
   switch(name){
      case 'typeAll':
         o._controlTypeBitmap.check(true);
         o._controlTypeMaterial.check(true);
         o._controlTypeModel.check(true);
         o._controlTypeTemplate.check(true);
         o._controlTypeScene.check(true);
         break;
      case 'typeNone':
         o._controlTypeBitmap.check(false);
         o._controlTypeMaterial.check(false);
         o._controlTypeModel.check(false);
         o._controlTypeTemplate.check(false);
         o._controlTypeScene.check(false);
         break;
      case 'typeBitmap':
         page = 0;
         break;
      case 'typeMaterial':
         page--;
         break;
      case 'typeMesh':
         page++;
         break;
      case 'typeTemplate':
         page = o._contentPageCount - 1;
         break;
      case 'typeScene':
         page = o._contentPageCount - 1;
         break;
   }
   var typeCd = o.makeTypeCd();
   var search = o._controlSearchEdit.text();
   o._frameSet._listContent.serviceSearch(typeCd, search, '', o._contentPageSize, 0)
   o.storageSet('resource_type_cd', typeCd);
   o.storageSet('control_type_bitmap:check', RBoolean.toString(o._controlTypeBitmap.isCheck()))
   o.storageSet('control_type_material:check', RBoolean.toString(o._controlTypeMaterial.isCheck()))
   o.storageSet('control_type_model:check', RBoolean.toString(o._controlTypeModel.isCheck()))
   o.storageSet('control_type_template:check', RBoolean.toString(o._controlTypeTemplate.isCheck()))
   o.storageSet('control_type_scene:check', RBoolean.toString(o._controlTypeScene.isCheck()))
   o.storageUpdate();
}
function FDsResourceListToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsResourceListToolBar_makeTypeCd(){
   var o = this;
   var types = '';
   if(o._controlTypeBitmap.isCheck()){
      types += '|Bitmap';
   }
   if(o._controlTypeMaterial.isCheck()){
      types += '|Material';
   }
   if(o._controlTypeModel.isCheck()){
      types += '|Model';
   }
   if(o._controlTypeTemplate.isCheck()){
      types += '|Template';
   }
   if(o._controlTypeScene.isCheck()){
      types += '|Scene';
   }
   if(types != ''){
      types = types.substring(1);
   }
   if(RString.isEmpty(types)){
      types = 'All';
   }
   return types;
}
function FDsResourceListToolBar_setNavigator(pageSize, pageCount, page){
   var o = this;
   o._contentPageSize = pageSize;
   o._contentPageCount = pageCount;
   o._contentPage = page;
   o._controlPageEdit.setText(page);
   if(page == 0){
   }
}
function FDsResourceListToolBar_doNavigator(page){
   var o = this;
   var typeCd = o.makeTypeCd();
   var search = o._controlSearchEdit.text();
   page = RInteger.toRange(page, 0, o._contentPageCount);
   if((o._contentTypeCd != typeCd) || (o._contentSerach != search) || (o._contentPage != page)){
      o._frameSet._listContent.serviceSearch(typeCd, search, '', o._contentPageSize, page)
   }
   o._contentTypeCd = typeCd;
   o._contentSerach = search;
}
function FDsResourceListToolBar_storageLoad(){
   var o = this;
   o._controlTypeBitmap.check(o.storageGetBoolean('control_type_bitmap:check', true));
   o._controlTypeMaterial.check(o.storageGetBoolean('control_type_material:check', true));
   o._controlTypeModel.check(o.storageGetBoolean('control_type_model:check', true));
   o._controlTypeTemplate.check(o.storageGetBoolean('control_type_template:check', true));
   o._controlTypeScene.check(o.storageGetBoolean('control_type_scene:check', true));
   var typeCd = o.makeTypeCd();
   var types = o.storageGet('resource_type_cd', 'All');
   var search = o._controlSearchEdit.text();
   o._frameSet._listContent.serviceSearch(types, search, '', o._contentPageSize, 0)
}
function FDsResourceListToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsResourceMenuBar(o){
   o = RClass.inherits(this, o, FUiMenuBar);
   o._frameName            = 'resource.resource.MenuBar';
   o._controlImportPicture = null;
   o._controlImportMesh    = null;
   o._controlDelete        = null;
   o._controlShareOpen     = null;
   o._controlShareClose    = null;
   o.onBuilded             = FDsResourceMenuBar_onBuilded;
   o.onImportPictureClick  = FDsResourceMenuBar_onImportPictureClick;
   o.onImportMeshClick     = FDsResourceMenuBar_onImportMeshClick;
   o.onDeleteLoad          = FDsResourceMenuBar_onDeleteLoad;
   o.onDeleteExecute       = FDsResourceMenuBar_onDeleteExecute;
   o.onDeleteClick         = FDsResourceMenuBar_onDeleteClick;
   o.onShareLoad           = FDsResourceMenuBar_onShareLoad;
   o.onShareClick          = FDsResourceMenuBar_onShareClick;
   o.construct             = FDsResourceMenuBar_construct;
   o.dispose               = FDsResourceMenuBar_dispose;
   return o;
}
function FDsResourceMenuBar_onBuilded(p){
   var o = this;
   o.__base.FUiMenuBar.onBuilded.call(o, p);
   o._controlImportPicture.addClickListener(o, o.onImportPictureClick);
   o._controlImportMesh.addClickListener(o, o.onImportMeshClick);
   o._controlDelete.addClickListener(o, o.onDeleteClick);
   o._controlShareOpen.addClickListener(o, o.onShareClick);
   o._controlShareClose.addClickListener(o, o.onShareClick);
}
function FDsResourceMenuBar_onImportPictureClick(p){
   var o = this;
   var frameSet = o._workspace._activeFrameSet;
   var catalog = frameSet._catalogContent;
   var node = catalog.focusNode();
   var nodeGuid = null;
   var nodeLabel = null;
   if(node){
      nodeGuid = node.guid();
      nodeLabel = node.label();
   }
   var dialog = RConsole.find(FUiWindowConsole).find(FDsResourceImportDialog);
   dialog._frameSet = o._frameSet;
   dialog._workspace = o._workspace;
   dialog._nodeGuid = nodeGuid;
   dialog.setNodeLabel(nodeLabel);
   dialog.switchMode('picture');
   dialog.showPosition(EUiPosition.Center);
}
function FDsResourceMenuBar_onImportMeshClick(p){
   var o = this;
   var frameSet = o._workspace._activeFrameSet;
   var catalog = frameSet._catalogContent;
   var node = catalog.focusNode();
   var nodeGuid = null;
   var nodeLabel = null;
   if(node){
      nodeGuid = node.guid();
      nodeLabel = node.label();
   }
   var dialog = RConsole.find(FUiWindowConsole).find(FDsResourceImportDialog);
   dialog._frameSet = o._frameSet;
   dialog._workspace = o._workspace;
   dialog._nodeGuid = nodeGuid;
   dialog.setNodeLabel(nodeLabel);
   dialog.switchMode('mesh');
   dialog.showPosition(EUiPosition.Center);
}
function FDsResourceMenuBar_onDeleteLoad(event){
   var o = this;
   var frame = o._frameSet._listContent;
   frame.serviceResearch();
   RWindow.enable();
}
function FDsResourceMenuBar_onDeleteExecute(event){
   var o = this;
   var item = o._frameSet._listContent._activeItem;
   var typeCd = item._typeCd;
   var guid = item._guid;
   RWindow.disable();
   var connection = RConsole.find(FDrResourceConsole).doDelete(typeCd, guid);
   connection.addLoadListener(o, o.onDeleteLoad);
}
function FDsResourceMenuBar_onDeleteClick(event){
   var o = this;
   var item = o._frameSet._listContent._activeItem;
   if(!item){
      return alert('请选中后再点击删除');
   }
   var dialog = RConsole.find(FUiMessageConsole).showConfirm('请确认是否删除当前资源？');
   dialog.addResultListener(o, o.onDeleteExecute);
}
function FDsResourceMenuBar_onShareLoad(){
   var o = this;
   RConsole.find(FUiDesktopConsole).hide();
}
function FDsResourceMenuBar_onShareClick(event){
   var o = this;
   var item = o._frameSet._listContent.focusItem();
   if(!item){
      return alert('请选中后再点击删除');
   }
   var sender = event.sender;
   var name = sender.name();
   var shareCd = null;
   if(name == 'shareOpen'){
      shareCd = 'Public';
   }else{
      shareCd = 'Private';
   }
   var guid = item._guid;
   RConsole.find(FUiDesktopConsole).showUploading();
   var connection = RConsole.find(FDrResourceConsole).doShare(guid, shareCd);
   connection.addLoadListener(o, o.onShareLoad);
}
function FDsResourceMenuBar_construct(){
   var o = this;
   o.__base.FUiMenuBar.construct.call(o);
}
function FDsResourceMenuBar_dispose(){
   var o = this;
   o.__base.FUiMenuBar.dispose.call(o);
}
function FDsResourceMeshFrameSet(o){
   o = RClass.inherits(this, o, FUiFrameSet);
   o._frameName            = 'design3d.mesh.FrameSet';
   o._styleToolbarGround   = RClass.register(o, new AStyle('_styleToolbarGround', 'Toolbar_Ground'));
   o._styleStatusbarGround = RClass.register(o, new AStyle('_styleStatusbarGround', 'Statusbar_Ground'));
   o._styleCatalogGround   = RClass.register(o, new AStyle('_styleCatalogGround', 'Catalog_Ground'));
   o._styleWorkspaceGround = RClass.register(o, new AStyle('_styleWorkspaceGround', 'Workspace_Ground'));
   o._stylePropertyGround  = RClass.register(o, new AStyle('_stylePropertyGround', 'Property_Ground'));
   o._activeSpace          = null;
   o._activeMesh           = null;
   o._framesetMain         = null;
   o._framesetBody         = null;
   o._frameToolBar         = null;
   o._frameBody            = null;
   o._frameProperty        = null;
   o._frameCatalog         = null;
   o._frameWorkspace       = null;
   o._frameStatusBar       = null;
   o._propertyFrames       = null;
   o.onBuilded             = FDsResourceMeshFrameSet_onBuilded;
   o.onMeshLoad            = FDsResourceMeshFrameSet_onMeshLoad;
   o.onCatalogSelected     = FDsResourceMeshFrameSet_onCatalogSelected;
   o.construct             = FDsResourceMeshFrameSet_construct;
   o.findPropertyFrame     = FDsResourceMeshFrameSet_findPropertyFrame;
   o.loadMeshByGuid        = FDsResourceMeshFrameSet_loadMeshByGuid;
   o.loadMeshByCode        = FDsResourceMeshFrameSet_loadMeshByCode;
   o.dispose               = FDsResourceMeshFrameSet_dispose;
   return o;
}
function FDsResourceMeshFrameSet_onBuilded(p){
   var o = this;
   o.__base.FUiFrameSet.onBuilded.call(o, p);
   var f = o._frameCatalog = o.searchControl('catalogFrame');
   f._hPanel.className = o.styleName('Catalog_Ground');
   var f = o._frameWorkspace = o.searchControl('spaceFrame');
   f._hPanel.className = o.styleName('Workspace_Ground');
   var f = o._frameProperty = o.searchControl('propertyFrame');
   f._hPanel.className = o.styleName('Property_Ground');
   var f = o._catalogSplitter = o.searchControl('catalogSpliter');
   f.setAlignCd(EUiAlign.Left);
   f.setSizeHtml(o._frameCatalog._hPanel);
   var f = o._propertySpliter = o.searchControl('propertySpliter');
   f.setAlignCd(EUiAlign.Right);
   f.setSizeHtml(o._frameProperty._hPanel);
   var c = o._catalog = RClass.create(FDsMeshCatalog);
   c._workspace = o;
   c.build(p);
   c.addSelectedListener(o, o.onCatalogSelected);
   o._frameCatalog.push(c);
   var f = o._canvasToolbarFrame = o.searchControl('canvasToolbarFrame');
   var c = o._canvasToolbar = RClass.create(FDsMeshCanvasToolBar);
   c._workspace = o;
   c.buildDefine(p);
   o._canvasToolbarFrame.push(c);
   var f = o._canvasFrame = o.searchControl('canvasFrame');
   var c = o._canvas = RClass.create(FDsMeshCanvas);
   c._workspace = o;
   c._toolbar = o._canvasToolbar;
   c.addLoadListener(o, o.onMeshLoad);
   c._hParent = f._hPanel;
   c._hParent.style.backgroundColor = '#000000';
   c.build(p);
   o._canvasFrame.push(c);
}
function FDsResourceMeshFrameSet_onMeshLoad(p){
   var o = this;
   o._activeSpace = p._activeSpace;
   o._catalog.buildSpace(o._activeSpace);
}
function FDsResourceMeshFrameSet_onCatalogSelected(p, pc){
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
function FDsResourceMeshFrameSet_construct(){
   var o = this;
   o.__base.FUiFrameSet.construct.call(o);
   o._propertyFrames = new TDictionary();
}
function FDsResourceMeshFrameSet_findPropertyFrame(p){
   var o = this;
   var f = o._propertyFrames.get(p);
   if(!f){
      var fc = RConsole.find(FFrameConsole);
      f = fc.get(o, p, o._frameProperty._hContainer);
      f._workspace = o;
      o._propertyFrames.set(p, f);
   }
   return f;
}
function FDsResourceMeshFrameSet_loadMeshByGuid(p){
   var o = this;
   o._meshGuid = p;
   o._canvas.loadMeshByGuid(p);
}
function FDsResourceMeshFrameSet_loadMeshByCode(p){
   var o = this;
   o._meshCode = p;
   o._canvas.loadMeshByCode(p);
}
function FDsResourceMeshFrameSet_dispose(){
   var o = this;
   o.__base.FUiFrameSet.dispose.call(o);
   o._propertyFrames.dispose();
   o._propertyFrames = null;
}
function FDsResourcePropertyContent(o){
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
   o.onBuild              = FDsResourcePropertyContent_onBuild;
   o.onMouseCaptureStart  = FDsResourcePropertyContent_onMouseCaptureStart;
   o.onMouseCapture       = FDsResourcePropertyContent_onMouseCapture;
   o.onMouseCaptureStop   = FDsResourcePropertyContent_onMouseCaptureStop;
   o.onEnterFrame         = FDsResourcePropertyContent_onEnterFrame;
   o.onMeshLoad           = FDsResourcePropertyContent_onMeshLoad;
   o.oeResize             = FDsResourcePropertyContent_oeResize;
   o.oeRefresh            = FDsResourcePropertyContent_oeRefresh;
   o.construct            = FDsResourcePropertyContent_construct;
   o.innerSelectDisplay   = FDsResourcePropertyContent_innerSelectDisplay;
   o.innerSelectLayer     = FDsResourcePropertyContent_innerSelectLayer;
   o.selectNone           = FDsResourcePropertyContent_selectNone;
   o.selectDisplay        = FDsResourcePropertyContent_selectDisplay;
   o.selectMaterial       = FDsResourcePropertyContent_selectMaterial;
   o.selectRenderable     = FDsResourcePropertyContent_selectRenderable;
   o.switchRotation       = FDsResourcePropertyContent_switchRotation;
   o.reloadRegion         = FDsResourcePropertyContent_reloadRegion;
   o.loadMeshByGuid       = FDsResourcePropertyContent_loadMeshByGuid;
   o.loadMeshByCode       = FDsResourcePropertyContent_loadMeshByCode;
   o.dispose              = FDsResourcePropertyContent_dispose;
   return o;
}
function FDsResourcePropertyContent_onBuild(p){
   var o = this;
   o.__base.FDsCanvas.onBuild.call(o, p);
}
function FDsResourcePropertyContent_onMouseCaptureStart(p){
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
function FDsResourcePropertyContent_onMouseCapture(p){
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
function FDsResourcePropertyContent_onMouseCaptureStop(p){
   var o = this;
   RHtml.cursorSet(o._hPanel, EUiCursor.Auto);
}
function FDsResourcePropertyContent_onEnterFrame(){
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
function FDsResourcePropertyContent_onMeshLoad(p){
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
function FDsResourcePropertyContent_oeResize(p){
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
function FDsResourcePropertyContent_oeRefresh(p){
   return EEventStatus.Stop;
}
function FDsResourcePropertyContent_construct(){
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
function FDsResourcePropertyContent_innerSelectDisplay(p){
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
function FDsResourcePropertyContent_innerSelectLayer(p){
   var o = this;
   var s = p.displays();
   var c = s.count();
   for(var i = 0; i < c; i++){
      var d = s.getAt(i);
      o.innerSelectDisplay(d)
   }
}
function FDsResourcePropertyContent_selectNone(){
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
function FDsResourcePropertyContent_selectDisplay(p){
   var o = this;
   o.selectNone();
   o._selectObject = p;
   o.innerSelectDisplay(p);
}
function FDsResourcePropertyContent_selectMaterial(p){
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
function FDsResourcePropertyContent_selectRenderable(p){
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
function FDsResourcePropertyContent_switchMode(p){
   var o = this;
   o._canvasModeCd = p;
   o.selectRenderable(o._selectRenderable);
}
function FDsResourcePropertyContent_switchRotation(p){
   this._optionRotation = p;
}
function FDsResourcePropertyContent_reloadRegion(region){
   var o = this;
   var resource = region.resource();
   o._cameraMoveRate = resource.moveSpeed();
   o._cameraKeyRotation = resource.rotationKeySpeed();
   o._cameraMouseRotation = resource.rotationMouseSpeed();
}
function FDsResourcePropertyContent_loadMeshByGuid(p){
   var o = this;
   var rmc = RConsole.find(FE3dMeshConsole);
   if(o._activeSpace != null){
   }
   var space = o._activeSpace = rmc.allocByGuid(o, p);
   space.addLoadListener(o, o.onMeshLoad);
   space._layer.pushRenderable(o._dimensional);
   RStage.register('mesh3d', space);
}
function FDsResourcePropertyContent_loadMeshByCode(p){
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
function FDsResourcePropertyContent_dispose(){
   var o = this;
   o._rotation = RObject.dispose(o._rotation);
x   // 父处理
   o.__base.FDsCanvas.dispose.call(o);
}
function FDsResourcePropertyToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   o._frameName             = 'resource.resource.PropertyToolBar';
   o._controlInsertButton   = null;
   o._controlUpdateButton   = null;
   o._controlDeleteButton   = null;
   o._controlRotationButton = null;
   o.onBuilded              = FDsResourcePropertyToolBar_onBuilded;
   o.onUpdateClick          = FDsResourcePropertyToolBar_onUpdateClick;
   o.onRotationClick        = FDsResourcePropertyToolBar_onRotationClick;
   o.construct              = FDsResourcePropertyToolBar_construct;
   o.dispose                = FDsResourcePropertyToolBar_dispose;
   return o;
}
function FDsResourcePropertyToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
   o._controlUpdateButton.addClickListener(o, o.onUpdateClick);
   o._controlRotationButton.addClickListener(o, o.onRotationClick);
}
function FDsResourcePropertyToolBar_onUpdateClick(event){
   var o = this;
}
function FDsResourcePropertyToolBar_onRotationClick(event){
   var o = this;
   var previewContent = o._workspace._previewContent;
   previewContent.switchRotation(event.checked);
}
function FDsResourcePropertyToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsResourcePropertyToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsResourceTabBar(o){
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
   o.onBuilded              = FDsResourceTabBar_onBuilded;
   o.onButtonClick          = FDsResourceTabBar_onButtonClick;
   o.construct              = FDsResourceTabBar_construct;
   o.dispose                = FDsResourceTabBar_dispose;
   return o;
}
function FDsResourceTabBar_onBuilded(p){
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
function FDsResourceTabBar_onButtonClick(event){
   var o = this;
   var sender = event.sender;
   var name = sender.name();
   o._resourceTypeCd = name;
   R
}
function FDsResourceTabBar_construct(){
   var o = this;
   o.__base.FUiTabBar.construct.call(o);
}
function FDsResourceTabBar_dispose(){
   var o = this;
   o.__base.FUiTabBar.dispose.call(o);
}
function FDsResourceWorkspace(o){
   o = RClass.inherits(this, o, FUiWorkspace);
   o._frameName            = 'resource.resource.Workspace';
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
   o.onBuilded             = FDsResourceWorkspace_onBuilded;
   o.onMeshLoad            = FDsResourceWorkspace_onMeshLoad;
   o.onCatalogSelected     = FDsResourceWorkspace_onCatalogSelected;
   o.construct             = FDsResourceWorkspace_construct;
   o.findPropertyFrame     = FDsResourceWorkspace_findPropertyFrame;
   o.switchContent         = FDsResourceWorkspace_switchContent;
   o.load                  = FDsResourceWorkspace_load;
   o.dispose               = FDsResourceWorkspace_dispose;
   return o;
}
function FDsResourceWorkspace_onBuilded(p){
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
   var c = o._toolbar = RClass.create(FDsResourceMenuBar);
   c._workspace = o;
   c.buildDefine(p);
   var hCell = RBuilder.appendTableCell(hRow);
   hCell.appendChild(c._hPanel);
   var c = o._tabBar = RClass.create(FDsResourceTabBar);
   c._workspace = o;
   c.buildDefine(p);
   var hCell = RBuilder.appendTableCell(hRow);
   hCell.width = '450px';
   hCell.align = 'right';
   hCell.vAlign = 'bottom';
   hCell.appendChild(c._hPanel);
   o._frameToolBar._hPanel.appendChild(hTable);
   var frameSet = o._frameSet = RClass.create(FDsResourceFrameSet);
   frameSet._workspace = o;
   frameSet.buildDefine(p);
   o._frameBody.push(frameSet);
   frameSet.switchContent(o._resourceTypeCd);
}
function FDsResourceWorkspace_onMeshLoad(p){
   var o = this;
   o._activeSpace = p._activeSpace;
   o._catalog.buildSpace(o._activeSpace);
}
function FDsResourceWorkspace_onCatalogSelected(p, pc){
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
function FDsResourceWorkspace_construct(){
   var o = this;
   o.__base.FUiWorkspace.construct.call(o);
   o._propertyFrames = new TDictionary();
}
function FDsResourceWorkspace_findPropertyFrame(p){
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
function FDsResourceWorkspace_switchContent(typeCd){
   this._frameSet.switchContent(typeCd);
}
function FDsResourceWorkspace_load(){
   var o = this;
}
function FDsResourceWorkspace_dispose(){
   var o = this;
   o.__base.FUiWorkspace.dispose.call(o);
   o._propertyFrames.dispose();
   o._propertyFrames = null;
}
