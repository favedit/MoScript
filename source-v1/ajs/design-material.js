function FDsMaterialCanvasBitmap(o){
   o = RClass.inherits(this, o, FDsBitmapCanvas);
   return o;
}
function FDsMaterialCanvasContent(o){
   o = RClass.inherits(this, o, FDsCanvas);
   o._activeResource      = null;
   o._activeMaterial      = null;
   o._capturePosition     = null;
   o._captureCameraPosition = null;
   o._templateMatrix      = null;
   o._templateRenderable  = null;
   o._templateFace        = null;
   o._templateTranslation = null;
   o._templateRotation    = null;
   o._templateScale       = null;
   o._templateViewScale   = 0.05;
   o.onBuild              = FDsMaterialCanvasContent_onBuild;
   o.onLoaded             = FDsMaterialCanvasContent_onLoaded;
   o.oeResize             = FDsMaterialCanvasContent_oeResize;
   o.oeRefresh            = FDsMaterialCanvasContent_oeRefresh;
   o.construct            = FDsMaterialCanvasContent_construct;
   o.reloadRegion         = FDsMaterialCanvasContent_reloadRegion;
   o.loadByGuid           = FDsMaterialCanvasContent_loadByGuid;
   o.dispose              = FDsMaterialCanvasContent_dispose;
   return o;
}
function FDsMaterialCanvasContent_onBuild(p){
   var o = this;
   o.__base.FDsCanvas.onBuild.call(o, p);
   var hPanel = o._hPanel;
   var space = o._activeSpace = RClass.create(FE3dSimpleStage);
   space.linkGraphicContext(o);
   space.selectTechnique(o, FE3dGeneralTechnique);
   space.region().backgroundColor().set(1, 1, 1, 1);
   space.region().linkGraphicContext(o);
   RStage.register('space.material', space);
   var camera = space.camera();
   camera.setPosition(0, 0, -10);
   camera.lookAt(0, 0, 0);
   camera.update();
   var projection = camera.projection();
   projection.size().set(hPanel.width, hPanel.height);
   projection._angle = 45;
   projection.update();
}
function FDsMaterialCanvasContent_onLoaded(event){
   var o = this;
   var material = o._activeMaterial = o._activeResource.material();
   RConsole.find(FUiDesktopConsole).hide();
}
function FDsMaterialCanvasContent_oeResize(p){
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
function FDsMaterialCanvasContent_oeRefresh(p){
   return EEventStatus.Stop;
}
function FDsMaterialCanvasContent_construct(){
   var o = this;
   o.__base.FDsCanvas.construct.call(o);
   o._capturePosition = new SPoint2();
   o._captureCameraPosition = new SPoint3();
}
function FDsMaterialCanvasContent_selectDisplay(p){
   var o = this;
   o.selectNone();
   o._selectObject = p;
   o.innerSelectDisplay(p);
}
function FDsMaterialCanvasContent_switchMode(p){
   var o = this;
   o._canvasModeCd = p;
}
function FDsMaterialCanvasContent_reloadRegion(region){
   var o = this;
   var resource = region.resource();
   o._cameraMoveRate = resource.moveSpeed();
   o._cameraKeyRotation = resource.rotationKeySpeed();
   o._cameraMouseMove = resource.rotationMouseSpeed();
}
function FDsMaterialCanvasContent_loadByGuid(guid){
   var o = this;
   RConsole.find(FUiDesktopConsole).showLoading();
   var resource = o._activeResource = RConsole.find(FE3sMaterialConsole).loadByGuid(guid);
   resource.addLoadListener(o, o.onLoaded);
}
function FDsMaterialCanvasContent_dispose(){
   var o = this;
   o.__base.FDsCanvas.dispose.call(o);
}
function FDsMaterialCanvasToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   o._controlSize1      = null;
   o._controlSize2      = null;
   o._controlSize3      = null;
   o._controlSize4      = null;
   o._controlSizeWidth  = null;
   o._controlSizeHeight = null;
   o.onBuilded          = FDsMaterialCanvasToolBar_onBuilded;
   o.onSizeClick        = FDsMaterialCanvasToolBar_onSizeClick;
   o.construct          = FDsMaterialCanvasToolBar_construct;
   o.dispose            = FDsMaterialCanvasToolBar_dispose;
   return o;
}
function FDsMaterialCanvasToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
   o._controlSize1.addClickListener(o, o.onSizeClick);
   o._controlSize2.addClickListener(o, o.onSizeClick);
   o._controlSize3.addClickListener(o, o.onSizeClick);
   o._controlSize4.addClickListener(o, o.onSizeClick);
   o._controlSizeWidth.setText('*');
   o._controlSizeHeight.setText('*');
}
function FDsMaterialCanvasToolBar_onModeClick(p){
   var o = this;
}
function FDsMaterialCanvasToolBar_onSizeClick(event){
   var o = this;
   var button = event.sender;
   var width = '*';
   var height = '*';
   var name = button.name();
   var label = button.label();
   if(name != 'sizeAuto'){
      var size = label.split('x');
      width = parseInt(size[0]);
      height = parseInt(size[1]);
   }
   o._controlSizeWidth.setText(width);
   o._controlSizeHeight.setText(height);
}
function FDsMaterialCanvasToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsMaterialCanvasToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsMaterialCatalogContent(o){
   o = RClass.inherits(this, o, FUiListView);
   o._activeItem       = null;
   o._activeGuid       = null;
   o._refreshButton    = null;
   o._saveButton       = null;
   o._runButton        = null;
   o.onBuilded         = FDsMaterialCatalogContent_onBuilded;
   o.onServiceLoad     = FDsMaterialCatalogContent_onServiceLoad;
   o.construct         = FDsMaterialCatalogContent_construct;
   o.doClickItem       = FDsMaterialCatalogContent_doClickItem;
   o.doDoubleClickItem = FDsMaterialCatalogContent_doDoubleClickItem;
   o.serviceList       = FDsMaterialCatalogContent_serviceList;
   o.dispose           = FDsMaterialCatalogContent_dispose;
   return o;
}
function FDsMaterialCatalogContent_onBuilded(p){
   var o = this;
   o.__base.FUiListView.onBuilded.call(o, p);
}
function FDsMaterialCatalogContent_onServiceLoad(event){
   var o = this;
   var xitems = event.root.findNode('BitmapCollection');
   o.clear();
   var xnodes = xitems.nodes();
   var count = xnodes.count();
   for(var i = 0; i < count; i++){
      var xnode = xnodes.getAt(i);
      if(xnode.isName('Bitmap')){
         var code = xnode.get('code');
         var item = o.createItem(FDsMaterialCatalogItem);
         item.propertyLoad(xnode);
         item._guid = xnode.get('guid');
         item._linkGuid = xnode.get('link_guid');
         item._code = code;
         item._updateDate = xnode.get('update_date');
         item.setTypeLabel(code);
         item.setLabel(RString.nvl(xnode.get('label'), xnode.get('code')));
         item.refreshStyle();
         o.push(item);
      }
   }
   RConsole.find(FUiDesktopConsole).hide();
}
function FDsMaterialCatalogContent_construct(){
   var o = this;
   o.__base.FUiListView.construct.call(o);
}
function FDsMaterialCatalogContent_doClickItem(control){
   var o = this;
   o.__base.FUiListView.doClickItem.call(o, control);
}
function FDsMaterialCatalogContent_doDoubleClickItem(control){
   var o = this;
   o.__base.FUiListView.doDoubleClickItem.call(o, control)
   var guid = control._guid;
   o._activeItem = control;
   o._activeGuid = guid;
   o._frameSet.switchCanvas('Bitmap', guid);
}
function FDsMaterialCatalogContent_serviceList(guid){
   var o = this;
   RConsole.find(FUiDesktopConsole).showLoading();
   var url = '/cloud.resource.material.ws?action=listBitmap&guid=' + guid;
   var connection = RConsole.find(FXmlConsole).sendAsync(url);
   connection.addLoadListener(o, o.onServiceLoad);
}
function FDsMaterialCatalogContent_dispose(){
   var o = this;
   o.__base.FUiListView.dispose.call(o);
}
function FDsMaterialCatalogItem(o){
   o = RClass.inherits(this, o, FUiListViewItem);
   o._styleTypePanel = RClass.register(o, new AStyle('_styleTypePanel'));
   o._styleTypeLabel = RClass.register(o, new AStyle('_styleTypeLabel'));
   o.onBuild         = FDsMaterialCatalogItem_onBuild;
   o.setTypeLabel    = FDsMaterialCatalogItem_setTypeLabel;
   o.refreshStyle    = FDsMaterialCatalogItem_refreshStyle;
   return o;
}
function FDsMaterialCatalogItem_onBuild(p){
   var o = this;
   o.__base.FUiListViewItem.onBuild.call(o, p);
   var h = o._hPanel;
   h.style.width = '200px';
   h.style.height = '150px';
   o._hLine1.className = o.styleName('TypePanel');
   o._hLine1.vAlign = 'top';
   o._hTypeLabel = RBuilder.appendDiv(o._hLine1, o.styleName('TypeLabel'));
}
function FDsMaterialCatalogItem_setTypeLabel(label){
   this._hTypeLabel.innerHTML = label;
}
function FDsMaterialCatalogItem_refreshStyle(){
   var o = this;
   var url = '/cloud.resource.bitmap.wv?do=preview&guid=' + o._guid + '&update_date=' + o._updateDate;
   o._hForm.style.backgroundImage = 'url("' + url + '")';
}
function FDsMaterialCatalogToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   o._controlCreate   = null;
   o._controlDelete   = null;
   o._controlMoveUp   = null;
   o._controlMoveDown = null;
   o.onBuilded        = FDsMaterialCatalogToolBar_onBuilded;
   o.onCreateClick    = FDsMaterialCatalogToolBar_onCreateClick;
   o.onDeleteClick    = FDsMaterialCatalogToolBar_onDeleteClick;
   o.onMoveClick      = FDsMaterialCatalogToolBar_onMoveClick;
   o.construct        = FDsMaterialCatalogToolBar_construct;
   o.dispose          = FDsMaterialCatalogToolBar_dispose;
   return o;
}
function FDsMaterialCatalogToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
   o._controlCreate.addClickListener(o, o.onCreateClick);
   o._controlDelete.addClickListener(o, o.onDeleteClick);
   o._controlMoveUp.addClickListener(o, o.onMoveClick);
   o._controlMoveDown.addClickListener(o, o.onMoveClick);
}
function FDsMaterialCatalogToolBar_onCreateClick(p){
   var o = this;
}
function FDsMaterialCatalogToolBar_onDeleteClick(event){
   var o = this;
}
function FDsMaterialCatalogToolBar_onMoveClick(event){
   var o = this;
}
function FDsMaterialCatalogToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsMaterialCatalogToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsMaterialFrameSet(o){
   o = RClass.inherits(this, o, FDsFrameSet);
   o._frameCatalog         = null;
   o._frameCatalogToolBar  = null;
   o._frameCatalogContent  = null;
   o._frameCanvas          = null;
   o._frameCanvasToolBar   = null;
   o._frameCanvasContent   = null;
   o._frameProperty        = null;
   o._framePropertyToolBar = null;
   o._framePropertyContent = null;
   o.onBuilded             = FDsMaterialFrameSet_onBuilded;
   o.onDataLoaded          = FDsMaterialFrameSet_onDataLoaded;
   o.onCatalogSelected     = FDsMaterialFrameSet_onCatalogSelected;
   o.construct             = FDsMaterialFrameSet_construct;
   o.switchCanvas          = FDsMaterialFrameSet_switchCanvas;
   o.loadByGuid            = FDsMaterialFrameSet_loadByGuid;
   o.loadByCode            = FDsMaterialFrameSet_loadByCode;
   o.dispose               = FDsMaterialFrameSet_dispose;
   return o;
}
function FDsMaterialFrameSet_onBuilded(event){
   var o = this;
   o.__base.FDsFrameSet.onBuilded.call(o, event);
   o._frameCatalogToolBar._hPanel.className = o.styleName('ToolBar_Ground');
   o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
   o._frameCanvasToolBar._hPanel.className = o.styleName('ToolBar_Ground');
   o._frameCanvasContent._hPanel.className = o.styleName('Canvas_Content');
   o._framePropertyToolBar._hPanel.className = o.styleName('ToolBar_Ground');
   o._framePropertyContent._hPanel.className = o.styleName('Property_Content');
   var spliterCatalog = o._spliterCatalog;
   spliterCatalog.setAlignCd(EUiAlign.Left);
   spliterCatalog.setSizeHtml(o._frameCatalog._hPanel);
   var spliterProperty = o._spliterProperty;
   spliterProperty.setAlignCd(EUiAlign.Right);
   spliterProperty.setSizeHtml(o._frameProperty._hPanel);
   var canvas = o._canvasContent = RClass.create(FDsMaterialCanvasContent);
   canvas._frameSet = o;
   canvas._hParent = o._frameCanvasContent._hPanel;
   canvas._hParent.style.scroll = 'auto';
   canvas.build(event);
   var canvas = o._canvasBitmap = RClass.create(FDsMaterialCanvasBitmap);
   canvas._frameSet = o;
   canvas._hParent = o._frameCanvasContent._hPanel;
   canvas._hParent.style.scroll = 'auto';
   canvas.build(event);
   o._frameCanvasContent.push(canvas);
}
function FDsMaterialFrameSet_onDataLoaded(p){
   var o = this;
   o._activeSpace = p._activeSpace;
   o._catalog.buildSpace(o._activeSpace);
}
function FDsMaterialFrameSet_onCatalogSelected(select, flag){
   var o = this;
   var space = o._activeSpace;
   if(!space){
      return;
   }
   o.hidePropertyFrames();
   if(RClass.isClass(select, FE3dStage)){
      var frame = o.findPropertyFrame(EDsFrame.MeshSpacePropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else if(RClass.isClass(select, FG3dTechnique)){
      var frame = o.findPropertyFrame(EDsFrame.MeshTechniquePropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else if(RClass.isClass(select, FE3dRegion)){
      var frame = o.findPropertyFrame(EDsFrame.MeshRegionPropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else if(RClass.isClass(select, FE3dCamera)){
      var frame = o.findPropertyFrame(EDsFrame.MeshCameraPropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else if(RClass.isClass(select, FG3dDirectionalLight)){
      var frame = o.findPropertyFrame(EDsFrame.MeshLightPropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else if(RClass.isClass(select, FE3dMeshDisplay)){
      var frame = o.findPropertyFrame(EDsFrame.MeshDisplayPropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else if(RClass.isClass(select, FG3dMaterial)){
      var frame = o.findPropertyFrame(EDsFrame.MeshMaterialPropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else if(RClass.isClass(select, FE3dMeshRenderable)){
      var frame = o.findPropertyFrame(EDsFrame.MeshRenderablePropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else{
      throw new TError('Unknown select object type. (select={1})', select);
   }
}
function FDsMaterialFrameSet_construct(){
   var o = this;
   o.__base.FDsFrameSet.construct.call(o);
}
function FDsMaterialFrameSet_switchCanvas(typeCd, guid){
   var o = this;
   if(typeCd == 'Bitmap'){
      var canvas = o._canvasBitmap;
      canvas.loadByGuid(guid);
   }else{
   }
}
function FDsMaterialFrameSet_loadByGuid(guid){
   var o = this;
   o._activeGuid = guid;
   var resource = o._activeResource = RConsole.find(FDrMaterialConsole).query(guid);
   o._catalogContent.serviceList(guid);
   var canvas = o._canvasContent;
   canvas.loadByGuid(guid);
   var frame = o.findPropertyFrame(EDsFrame.MaterialPropertyFrame);
   frame.loadObject(resource);
}
function FDsMaterialFrameSet_loadByCode(code){
   var o = this;
   o._activeCode = code;
   o._canvas.loadByCode(code);
}
function FDsMaterialFrameSet_dispose(){
   var o = this;
   o.__base.FDsFrameSet.dispose.call(o);
}
function FDsMaterialImportDialog(o){
   o = RClass.inherits(this, o, FUiDialog);
   o._frameName            = 'resource.material.ImportDialog';
   o._modeCd               = null;
   o._nodeGuid             = null;
   o._controlPrivateButton = null;
   o._controlTeamButton    = null;
   o._controlShareButton   = null;
   o.onBuilded             = FDsMaterialImportDialog_onBuilded;
   o.onFileLoaded          = FDsMaterialImportDialog_onFileLoaded;
   o.onConfirmLoad         = FDsMaterialImportDialog_onConfirmLoad;
   o.onConfirmClick        = FDsMaterialImportDialog_onConfirmClick;
   o.onCancelClick         = FDsMaterialImportDialog_onCancelClick;
   o.construct             = FDsMaterialImportDialog_construct;
   o.switchModeCd          = FDsMaterialImportDialog_switchModeCd;
   o.dispose               = FDsMaterialImportDialog_dispose;
   return o;
}
function FDsMaterialImportDialog_onBuilded(event){
   var o = this;
   o.__base.FUiDialog.onBuilded.call(o, event);
   o._controlConfirmButton.addClickListener(o, o.onConfirmClick);
   o._controlCancelButton.addClickListener(o, o.onCancelClick);
}
function FDsMaterialImportDialog_onFileLoaded(event){
   var o = this;
   var item = o._activeItem;
   var resource = o._frameSet._activeResource;
   var guid = resource.guid();
   var typeCode = o._controlTypeCode.get();
   var code = o._controlCode.get();
   if(RString.isEmpty(code)){
      code = typeCode;
   }
   var label = o._controlLabel.get();
   var url = null;
   var reader = o._fileReader;
   switch(o._modeCd){
      case 'select':
         var linkGuid = item._linkGuid;
         var bitmapGuid = item._guid;
         url = '/cloud.resource.material.wv?do=replaceData&material_guid=' + guid + '&link_guid=' + linkGuid + '&bitmap_guid=' + bitmapGuid + '&code=' + code + '&label=' + label + '&data_length=' + reader.length() + '&file_name=' + reader.fileName();
         break;
      case 'import':
         url = '/cloud.resource.material.wv?do=importData&material_guid=' + guid + '&code=' + code + '&label=' + label + '&data_length=' + reader.length() + '&file_name=' + reader.fileName();
         break;
      default:
         throw new TError(o, 'Unknown mode. (mode_cd={1})', modeCd);
   }
   url = RBrowser.urlEncode(url);
   var connection = RConsole.find(FHttpConsole).send(url, reader.data());
   connection.addLoadListener(o, o.onConfirmLoad);
   o._fileReader = RObject.dispose(reader);
}
function FDsMaterialImportDialog_onConfirmLoad(event){
   var o = this;
   RConsole.find(FUiDesktopConsole).hide();
   o.hide();
}
function FDsMaterialImportDialog_onConfirmClick(event){
   var o = this;
   RConsole.find(FUiDesktopConsole).showUploading();
   var file = o._controlFile._hInput.files[0];
   var reader = o._fileReader = RClass.create(FFileReader);
   reader.addLoadListener(o, o.onFileLoaded);
   reader.loadFile(file);
}
function FDsMaterialImportDialog_onCancelClick(event){
   this.hide();
}
function FDsMaterialImportDialog_construct(){
   var o = this;
   o.__base.FUiDialog.construct.call(o);
}
function FDsMaterialImportDialog_switchModeCd(modeCd){
   var o = this;
   o._modeCd = modeCd;
   switch(modeCd){
      case 'select':
         o.setLabel('替换位图资源');
         break;
      case 'import':
         o.setLabel('导入位图资源');
         break;
      default:
         throw new TError(o, 'Unknown mode. (mode_cd={1})', modeCd);
   }
   o._controlCode.set('');
   o._controlLabel.set('');
}
function FDsMaterialImportDialog_dispose(){
   var o = this;
   o.__base.FUiDialog.dispose.call(o);
}
function FDsMaterialMenuBar(o){
   o = RClass.inherits(this, o, FUiMenuBar);
   o._controlBack     = null;
   o._controlSave     = null;
   o._controlProperty = null;
   o._controlSelect   = null;
   o._controlImport   = null;
   o._controlCapture  = null;
   o.onBuilded        = FDsMaterialMenuBar_onBuilded;
   o.onBackClick      = FDsMaterialMenuBar_onBackClick;
   o.onSaveLoad       = FDsMaterialMenuBar_onSaveLoad;
   o.onSaveClick      = FDsMaterialMenuBar_onSaveClick;
   o.onPropertyClick  = FDsMaterialMenuBar_onPropertyClick;
   o.onSelectLoad     = FDsMaterialMenuBar_onSelectLoad;
   o.onSelectConfirm  = FDsMaterialMenuBar_onSelectConfirm;
   o.onSelectClick    = FDsMaterialMenuBar_onSelectClick;
   o.onImportClick    = FDsMaterialMenuBar_onImportClick;
   o.onDeleteLoad     = FDsMaterialMenuBar_onDeleteLoad;
   o.onDeleteExecute  = FDsMaterialMenuBar_onDeleteExecute;
   o.onDeleteClick    = FDsMaterialMenuBar_onDeleteClick;
   o.onCaptureLoad    = FDsMaterialMenuBar_onCaptureLoad;
   o.onCaptureClick   = FDsMaterialMenuBar_onCaptureClick;
   o.construct        = FDsMaterialMenuBar_construct;
   o.dispose          = FDsMaterialMenuBar_dispose;
   return o;
}
function FDsMaterialMenuBar_onBuilded(p){
   var o = this;
   o.__base.FUiMenuBar.onBuilded.call(o, p);
   o._controlBack.addClickListener(o, o.onBackClick);
   o._controlSave.addClickListener(o, o.onSaveClick);
   o._controlProperty.addClickListener(o, o.onPropertyClick);
   o._controlSelect.addClickListener(o, o.onSelectClick);
   o._controlImport.addClickListener(o, o.onImportClick);
   o._controlDelete.addClickListener(o, o.onDeleteClick);
   o._controlCapture.addClickListener(o, o.onCaptureClick);
}
function FDsMaterialMenuBar_onBackClick(event){
   var o = this;
}
function FDsMaterialMenuBar_onSaveLoad(event){
   RConsole.find(FUiDesktopConsole).hide();
}
function FDsMaterialMenuBar_onSaveClick(p){
   var o = this;
   var space = o._frameSet._activeSpace;
   var resource = space.resource();
   RConsole.find(FUiDesktopConsole).showUploading();
   var xconfig = new TXmlNode();
   resource.saveConfig(xconfig);
   var connection = RConsole.find(FE3sMeshConsole).update(xconfig);
   connection.addLoadListener(o, o.onSaveLoad);
}
function FDsMaterialMenuBar_onPropertyClick(event){
   var o = this;
}
function FDsMaterialMenuBar_onSelectLoad(event){
}
function FDsMaterialMenuBar_onSelectConfirm(event){
}
function FDsMaterialMenuBar_onSelectClick(event){
   var o = this;
   var item = o._frameSet._catalogContent.focusItem();
   if(!item){
      return alert('请选中位图');
   }
   var dialog = RConsole.find(FUiWindowConsole).find(FDsMaterialImportDialog);
   dialog._frameSet = o._frameSet;
   dialog._activeItem = item;
   dialog.switchModeCd('select');
   dialog._controlTypeCode.set(item._code);
   dialog._controlCode.set(item._code);
   dialog._controlLabel.set(item._label);
   dialog.showPosition(EUiPosition.Center);
}
function FDsMaterialMenuBar_onImportClick(event){
   var o = this;
   var dialog = RConsole.find(FUiWindowConsole).find(FDsMaterialImportDialog);
   dialog._frameSet = o._frameSet;
   dialog.switchModeCd('import');
   dialog._controlCode.set('');
   dialog._controlLabel.set('');
   dialog.showPosition(EUiPosition.Center);
}
function FDsMaterialMenuBar_onDeleteLoad(event){
   var o = this;
   RConsole.find(FUiDesktopConsole).hide();
}
function FDsMaterialMenuBar_onDeleteExecute(event){
   var o = this;
   var item = o._frameSet._catalogContent.focusItem();
   RConsole.find(FUiDesktopConsole).showUploading();
   var connection = RConsole.find(FDrMaterialConsole).deleteBitmap(item._linkGuid);
   connection.addLoadListener(o, o.onDeleteLoad);
}
function FDsMaterialMenuBar_onDeleteClick(event){
   var o = this;
   var item = o._frameSet._catalogContent.focusItem();
   if(!item){
      return alert('请选中后再点击删除');
   }
   var dialog = RConsole.find(FUiMessageConsole).showConfirm('请确认是否删除当前资源？');
   dialog.addResultListener(o, o.onDeleteExecute);
}
function FDsMaterialMenuBar_onCaptureLoad(event){
   RConsole.find(FUiDesktopConsole).hide();
}
function FDsMaterialMenuBar_onCaptureClick(event){
   var o = this;
   RConsole.find(FUiDesktopConsole).showUploading();
   var connection = o._frameSet._canvas.capture();
   connection.addLoadListener(o, o.onCaptureLoad);
}
function FDsMaterialMenuBar_construct(){
   var o = this;
   o.__base.FUiMenuBar.construct.call(o);
}
function FDsMaterialMenuBar_dispose(){
   var o = this;
   o.__base.FUiMenuBar.dispose.call(o);
}
function FDsMaterialPropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._activeResource = null;
   o._controlGuid    = null;
   o._controlCode    = null;
   o._controlLabel   = null;
   o.onBuilded       = FDsMaterialPropertyFrame_onBuilded;
   o.onDataChanged   = FDsMaterialPropertyFrame_onDataChanged;
   o.construct       = FDsMaterialPropertyFrame_construct;
   o.loadObject      = FDsMaterialPropertyFrame_loadObject;
   o.dispose         = FDsMaterialPropertyFrame_dispose;
   return o;
}
function FDsMaterialPropertyFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsMaterialPropertyFrame_onBuilded(event){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, event);
   o._controlCode.addDataChangedListener(o, o.onDataChanged);
   o._controlLabel.addDataChangedListener(o, o.onDataChanged);
}
function FDsMaterialPropertyFrame_onDataChanged(p){
   var o = this;
   var resource = o._activeResource;
   resource.setCode(o._controlCode.get());
   resource.setLabel(o._controlLabel.get());
}
function FDsMaterialPropertyFrame_loadObject(resource){
   var o = this;
   o._activeResource = resource;
   o._controlGuid.set(resource.guid());
   o._controlCode.set(resource.code());
   o._controlLabel.set(resource.label());
}
function FDsMaterialPropertyFrame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsMaterialPropertyToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   o._frameName      = 'resource.material.PropertyToolBar';
   o._controlRefresh = null;
   o.onBuilded       = FDsMaterialPropertyToolBar_onBuilded;
   o.onRefreshClick  = FDsMaterialPropertyToolBar_onRefreshClick;
   o.construct       = FDsMaterialPropertyToolBar_construct;
   o.dispose         = FDsMaterialPropertyToolBar_dispose;
   return o;
}
function FDsMaterialPropertyToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
   o._controlRefresh.addClickListener(o, o.onRefreshClick);
}
function FDsMaterialPropertyToolBar_onRefreshClick(p){
   var o = this;
}
function FDsMaterialPropertyToolBar_onSizeClick(event){
   var o = this;
   var button = event.sender;
   var width = '*';
   var height = '*';
   var name = button.name();
   var label = button.label();
   if(name != 'sizeAuto'){
      var size = label.split('x');
      width = parseInt(size[0]);
      height = parseInt(size[1]);
   }
   o._controlSizeWidth.setText(width);
   o._controlSizeHeight.setText(height);
   o._frameSet._canvas.switchSize(width, height);
}
function FDsMaterialPropertyToolBar_onRotationChange(event){
   var o = this;
   var canvas = o._frameSet._canvas;
   var visible = o._controlRotationVisible.isCheck();
   var width = RInteger.parse(o._controlRotationWidth.text());
   var height = RInteger.parse(o._controlRotationHeight.text());
   canvas.switchRotation(visible, width, height);
}
function FDsMaterialPropertyToolBar_onRotationAutoClick(event){
   var o = this;
   var sender = event.sender;
   var name = sender.name();
   var flipX = false;
   var flipY = false;
   var flipZ = false;
   var rotationX = false;
   var rotationY = false;
   var rotationZ = false;
   switch(name){
      case 'dimensionalAuto':
         break;
      case 'dimensionalFlipX':
         flipX = true;
         break;
      case 'dimensionalFlipY':
         flipY = true;
         break;
      case 'dimensionalFlipZ':
         flipZ = true;
         break;
      case 'dimensionalX':
         rotationX = true;
         break;
      case 'dimensionalY':
         rotationY = true;
         break;
      case 'dimensionalZ':
         rotationZ = true;
         break;
      default:
         throw new TError(o, 'Unknown command.');
   }
   o._frameSet._canvas.viewAutoSize(flipX, flipY, flipZ, rotationX, rotationY, rotationZ);
}
function FDsMaterialPropertyToolBar_onRotationClick(event, v){
   var o = this;
   var button = event.sender;
   var canvas = o._frameSet._canvas;
   canvas.switchRotation(button.isCheck());
}
function FDsMaterialPropertyToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsMaterialPropertyToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsMaterialSelectDialog(o){
   o = RClass.inherits(this, o, FUiDialog);
   o._frameName            = 'resource.material.SelectDialog';
   o._nodeGuid             = null;
   o._controlPrivateButton = null;
   o._controlTeamButton    = null;
   o._controlShareButton   = null;
   o.onBuilded             = FDsMaterialSelectDialog_onBuilded;
   o.onFileLoaded          = FDsMaterialSelectDialog_onFileLoaded;
   o.onConfirmLoad         = FDsMaterialSelectDialog_onConfirmLoad;
   o.onConfirmClick        = FDsMaterialSelectDialog_onConfirmClick;
   o.onCancelClick         = FDsMaterialSelectDialog_onCancelClick;
   o.construct             = FDsMaterialSelectDialog_construct;
   o.dispose               = FDsMaterialSelectDialog_dispose;
   return o;
}
function FDsMaterialSelectDialog_onBuilded(event){
   var o = this;
   o.__base.FUiDialog.onBuilded.call(o, event);
   o._controlConfirmButton.addClickListener(o, o.onConfirmClick);
   o._controlCancelButton.addClickListener(o, o.onCancelClick);
}
function FDsMaterialSelectDialog_onFileLoaded(event){
   var o = this;
   var reader = o._fileReader;
   var resource = o._resource;
   var guid = resource.guid();
   var url = '/cloud.resource.material.wv?do=importData&guid=' + guid + '&data_length=' + reader.length() + '&file_name=' + reader.fileName();
   url = RBrowser.urlEncode(url);
   var connection = RConsole.find(FHttpConsole).send(url, reader.data());
   connection.addLoadListener(o, o.onConfirmLoad);
   o._fileReader = RObject.dispose(reader);
}
function FDsMaterialSelectDialog_onConfirmLoad(event){
   var o = this;
   RConsole.find(FUiDesktopConsole).hide();
   o.hide();
   o._frameSet.reload();
}
function FDsMaterialSelectDialog_onConfirmClick(event){
   var o = this;
   RConsole.find(FUiDesktopConsole).showUploading();
   var file = o._controlFile._hInput.files[0];
   var reader = o._fileReader = RClass.create(FFileReader);
   reader.addLoadListener(o, o.onFileLoaded);
   reader.loadFile(file);
}
function FDsMaterialSelectDialog_onCancelClick(event){
   this.hide();
}
function FDsMaterialSelectDialog_construct(){
   var o = this;
   o.__base.FUiDialog.construct.call(o);
}
function FDsMaterialSelectDialog_dispose(){
   var o = this;
   o.__base.FUiDialog.dispose.call(o);
}
function FDsMaterialWorkspace(o){
   o = RClass.inherits(this, o, FUiWorkspace);
   o._frameName            = 'design2d.bitmap.Workspace';
   o._styleWorkspaceGround = RClass.register(o, new AStyle('_styleWorkspaceGround', 'Workspace_Ground'));
   o._styleToolbarGround   = RClass.register(o, new AStyle('_styleToolbarGround', 'Toolbar_Ground'));
   o._styleBodyGround      = RClass.register(o, new AStyle('_styleBodyGround', 'Body_Ground'));
   o._styleStatusbarGround = RClass.register(o, new AStyle('_styleStatusbarGround', 'Statusbar_Ground'));
   o._activeSpace          = null;
   o._activeMesh           = null;
   o._framesetMain         = null;
   o._framesetBody         = null;
   o._frameToolBar         = null;
   o._frameBody            = null;
   o._frameProperty        = null;
   o._frameSet             = null;
   o._propertyFrames       = null;
   o.onBuilded             = FDsMaterialWorkspace_onBuilded;
   o.onMeshLoad            = FDsMaterialWorkspace_onMeshLoad;
   o.onCatalogSelected     = FDsMaterialWorkspace_onCatalogSelected;
   o.construct             = FDsMaterialWorkspace_construct;
   o.findPropertyFrame     = FDsMaterialWorkspace_findPropertyFrame;
   o.loadByGuid            = FDsMaterialWorkspace_loadByGuid;
   o.loadByCode            = FDsMaterialWorkspace_loadByCode;
   o.dispose               = FDsMaterialWorkspace_dispose;
   return o;
}
function FDsMaterialWorkspace_onBuilded(p){
   var o = this;
   o.__base.FUiWorkspace.onBuilded.call(o, p);
   var frame = o._frameToolBar = o.searchControl('toolbarFrame');
   frame._hPanel.className = o.styleName('Toolbar_Ground');
   var frame = o._frameBody = o.searchControl('bodyFrame');
   frame._hPanel.className = o.styleName('Body_Ground');
   var frame = o._frameStatusBar = o.searchControl('statusFrame');
   frame._hPanel.className = o.styleName('Statusbar_Ground');
   var menuBar = o._menuBar = RClass.create(FDsMaterialMenuBar);
   menuBar._workspace = o;
   menuBar.buildDefine(p);
   o._frameToolBar.push(menuBar);
   var frameSet = o._frameSet = RClass.create(FDsMaterialFrameSet);
   frameSet._workspace = o;
   frameSet.buildDefine(p);
   o._frameBody.push(frameSet);
   menuBar._frameSet = frameSet;
}
function FDsMaterialWorkspace_onMeshLoad(p){
   var o = this;
   o._activeSpace = p._activeSpace;
   o._catalog.buildSpace(o._activeSpace);
}
function FDsMaterialWorkspace_onCatalogSelected(p, pc){
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
function FDsMaterialWorkspace_construct(){
   var o = this;
   o.__base.FUiWorkspace.construct.call(o);
   o._propertyFrames = new TDictionary();
}
function FDsMaterialWorkspace_findPropertyFrame(p){
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
function FDsMaterialWorkspace_loadByGuid(guid){
   this._frameSet.loadByGuid(guid);
}
function FDsMaterialWorkspace_loadByCode(code){
   this._frameSet.loadByCode(code);
}
function FDsMaterialWorkspace_dispose(){
   var o = this;
   o.__base.FUiWorkspace.dispose.call(o);
   o._propertyFrames.dispose();
   o._propertyFrames = null;
}
