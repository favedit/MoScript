function FDsBitmapCanvasContent(o){
   o = RClass.inherits(this, o, FDsCanvas);
   o._activeBitmap        = null;
   o._capturePosition     = null;
   o._captureMatrix       = null;
   o._templateMatrix      = null;
   o._templateRenderable  = null;
   o._templateFace        = null;
   o._templateTranslation = null;
   o._templateRotation    = null;
   o._templateScale       = null;
   o._templateViewScale   = 0.05;
   o.onBuild              = FDsBitmapCanvasContent_onBuild;
   o.onMouseCaptureStart  = FDsBitmapCanvasContent_onMouseCaptureStart;
   o.onMouseCapture       = FDsBitmapCanvasContent_onMouseCapture;
   o.onMouseCaptureStop   = FDsBitmapCanvasContent_onMouseCaptureStop;
   o.onMouseWheel         = FDsBitmapCanvasContent_onMouseWheel;
   o.onLoaded             = FDsBitmapCanvasContent_onLoaded;
   o.oeResize             = FDsBitmapCanvasContent_oeResize;
   o.oeRefresh            = FDsBitmapCanvasContent_oeRefresh;
   o.construct            = FDsBitmapCanvasContent_construct;
   o.loadByGuid           = FDsBitmapCanvasContent_loadByGuid;
   o.dispose              = FDsBitmapCanvasContent_dispose;
   return o;
}
function FDsBitmapCanvasContent_onBuild(p){
   var o = this;
   o.__base.FDsCanvas.onBuild.call(o, p);
   var hPanel = o._hPanel;
   var space = o._activeSpace = RClass.create(FE3dFlatStage);
   space.linkGraphicContext(o);
   space.selectTechnique(o, FE3dGeneralTechnique);
   space.region().backgroundColor().set(1, 1, 1, 1);
   space.region().linkGraphicContext(o);
   RStage.register('space', space);
   var camera = space.camera();
   camera.setPosition(0, 0, -10);
   camera.lookAt(0, 0, 0);
   camera.update();
   var projection = camera.projection();
   projection._angle = 45;
   projection.size().set(hPanel.width, hPanel.height);
   projection.update();
   RWindow.lsnsMouseWheel.register(o, o.onMouseWheel);
}
function FDsBitmapCanvasContent_onMouseCaptureStart(event){
   var o = this;
   var space = o._activeSpace;
   if(!space){
      return;
   }
   var bitmap = o._activeBitmap;
   if(!bitmap){
      return;
   }
   o._capturePosition.set(event.clientX, event.clientY);
   o._captureMatrix.assign(bitmap.matrix());
   RHtml.cursorSet(o._hPanel, EUiCursor.Pointer);
}
function FDsBitmapCanvasContent_onMouseCapture(event){
   var o = this;
   var space = o._activeSpace;
   if(!space){
      return;
   }
   var bitmap = o._activeBitmap;
   if(!bitmap){
      return;
   }
   var matrix = bitmap.matrix();
   var cx = event.clientX - o._capturePosition.x;
   var cy = event.clientY - o._capturePosition.y;
   var captureMatrix = o._captureMatrix;
   matrix.tx = captureMatrix.tx + cx;
   matrix.ty = captureMatrix.ty + cy;
   matrix.updateForce();
}
function FDsBitmapCanvasContent_onMouseCaptureStop(event){
   var o = this;
   RHtml.cursorSet(o._hPanel, EUiCursor.Auto);
}
function FDsBitmapCanvasContent_onMouseWheel(event){
   var o = this;
   var scale = 1.0;
   if(event.deltaY < 0){
      scale = 1.1;
   }else if(event.deltaY > 0){
      scale = 0.9;
   }
   var bitmap = o._activeBitmap;
   var matrix = bitmap.matrix();
   matrix.sx *= scale;
   matrix.sy *= scale;
   matrix.updateForce();
}
function FDsBitmapCanvasContent_onLoaded(event){
   var o = this;
   RConsole.find(FUiDesktopConsole).hide();
}
function FDsBitmapCanvasContent_oeResize(event){
   var o = this;
   o.__base.FDsCanvas.oeResize.call(o, event);
   return EEventStatus.Stop;
}
function FDsBitmapCanvasContent_oeRefresh(p){
   return EEventStatus.Stop;
}
function FDsBitmapCanvasContent_construct(){
   var o = this;
   o.__base.FDsCanvas.construct.call(o);
   o._captureMatrix = new SMatrix3d();
}
function FDsBitmapCanvasContent_loadByGuid(guid){
   var o = this;
   var size = o._graphicContext.size();
   RConsole.find(FUiDesktopConsole).showLoading();
   var url = '/cloud.resource.bitmap.wv?do=view&guid=' + guid;
   var resource = o._activeResource = o._frameSet._activeResource;
   var bitmap = o._activeBitmap = RClass.create(FE3dBitmap)
   bitmap.linkGraphicContext(o);
   bitmap.setup();
   bitmap.material().info().effectCode = 'flat';
   bitmap.addLoadListener(o, o.onLoaded);
   bitmap.loadUrl(url);
   var matrix = bitmap.matrix();
   var left = Math.max((size.width - resource.sizeWidth()) / 2, 0);
   var top = Math.max((size.height - resource.sizeHeight()) / 2, 0);
   matrix.setTranslate(left, top);
   matrix.setScale(resource.sizeWidth(), resource.sizeHeight());
   matrix.update();
   var space = o._activeSpace;
   var layer = space.layer();
   layer.clearRenderables();
   layer.pushRenderable(bitmap);
}
function FDsBitmapCanvasContent_dispose(){
   var o = this;
   o.__base.FDsCanvas.dispose.call(o);
}
function FDsBitmapCanvasToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   o._canvasModeCd      = EDsCanvasMode.Drop;
   o._controlSize1      = null;
   o._controlSize2      = null;
   o._controlSize3      = null;
   o._controlSize4      = null;
   o._controlSizeWidth  = null;
   o._controlSizeHeight = null;
   o.onBuilded          = FDsBitmapCanvasToolBar_onBuilded;
   o.onSizeClick        = FDsBitmapCanvasToolBar_onSizeClick;
   o.construct          = FDsBitmapCanvasToolBar_construct;
   o.dispose            = FDsBitmapCanvasToolBar_dispose;
   return o;
}
function FDsBitmapCanvasToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
}
function FDsBitmapCanvasToolBar_onSizeClick(event){
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
function FDsBitmapCanvasToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsBitmapCanvasToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsBitmapFrameSet(o){
   o = RClass.inherits(this, o, FDsFrameSet);
   o._frameCanvas          = null;
   o._frameCanvasToolBar   = null;
   o._frameCanvasContent   = null;
   o._frameProperty        = null;
   o._framePropertyToolBar = null;
   o._framePropertyContent = null;
   o.onBuilded             = FDsBitmapFrameSet_onBuilded;
   o.onDataLoaded          = FDsBitmapFrameSet_onDataLoaded;
   o.construct             = FDsBitmapFrameSet_construct;
   o.loadByGuid            = FDsBitmapFrameSet_loadByGuid;
   o.loadByCode            = FDsBitmapFrameSet_loadByCode;
   o.reload                = FDsBitmapFrameSet_reload;
   o.dispose               = FDsBitmapFrameSet_dispose;
   return o;
}
function FDsBitmapFrameSet_onBuilded(p){
   var o = this;
   o.__base.FDsFrameSet.onBuilded.call(o, p);
   o._frameCanvasToolBar._hPanel.className = o.styleName('ToolBar_Ground');
   o._frameCanvasContent._hPanel.className = o.styleName('Canvas_Content');
   o._framePropertyToolBar._hPanel.className = o.styleName('ToolBar_Ground');
   o._framePropertyContent._hPanel.className = o.styleName('Property_Content');
   var spliterProperty = o._spliterProperty;
   spliterProperty.setAlignCd(EUiAlign.Right);
   spliterProperty.setSizeHtml(o._frameProperty._hPanel);
}
function FDsBitmapFrameSet_onDataLoaded(event){
   var o = this;
   debugger
   o._activeSpace = event._activeSpace;
}
function FDsBitmapFrameSet_construct(){
   var o = this;
   o.__base.FDsFrameSet.construct.call(o);
}
function FDsBitmapFrameSet_loadByGuid(guid){
   var o = this;
   o._activeGuid = guid;
   var bitmap = o._activeResource = RConsole.find(FDrBitmapConsole).query(guid);
   var canvas = o._canvasContent;
   canvas.loadByGuid(guid);
   var frame = o.findPropertyFrame(EDsFrame.BitmapPropertyFrame);
   frame.loadObject(bitmap);
}
function FDsBitmapFrameSet_loadByCode(code){
   var o = this;
   o._activeCode = code;
   var connection = RConsole.find(FDrBitmapConsole).query(code);
   connection.addLoadListener(o, o.onDataLoaded);
}
function FDsBitmapFrameSet_reload(){
   var o = this;
}
function FDsBitmapFrameSet_dispose(){
   var o = this;
   o.__base.FDsFrameSet.dispose.call(o);
}
function FDsBitmapImportDialog(o){
   o = RClass.inherits(this, o, FUiDialog);
   o._frameName            = 'resource.bitmap.ImportDialog';
   o._nodeGuid             = null;
   o._controlPrivateButton = null;
   o._controlTeamButton    = null;
   o._controlShareButton   = null;
   o.onBuilded             = FDsBitmapImportDialog_onBuilded;
   o.onFileLoaded          = FDsBitmapImportDialog_onFileLoaded;
   o.onConfirmLoad         = FDsBitmapImportDialog_onConfirmLoad;
   o.onConfirmClick        = FDsBitmapImportDialog_onConfirmClick;
   o.onCancelClick         = FDsBitmapImportDialog_onCancelClick;
   o.construct             = FDsBitmapImportDialog_construct;
   o.dispose               = FDsBitmapImportDialog_dispose;
   return o;
}
function FDsBitmapImportDialog_onBuilded(event){
   var o = this;
   o.__base.FUiDialog.onBuilded.call(o, event);
   o._controlConfirmButton.addClickListener(o, o.onConfirmClick);
   o._controlCancelButton.addClickListener(o, o.onCancelClick);
}
function FDsBitmapImportDialog_onFileLoaded(event){
   var o = this;
   var reader = o._fileReader;
   var resource = o._resource;
   var guid = resource.guid();
   var url = '/cloud.resource.bitmap.wv?do=updateData&guid=' + guid + '&data_length=' + reader.length() + '&file_name=' + reader.fileName();
   url = RBrowser.urlEncode(url);
   var connection = RConsole.find(FHttpConsole).send(url, reader.data());
   connection.addLoadListener(o, o.onConfirmLoad);
   o._fileReader = RObject.dispose(reader);
}
function FDsBitmapImportDialog_onConfirmLoad(event){
   var o = this;
   RConsole.find(FUiDesktopConsole).hide();
   o.hide();
   o._frameSet.reload();
}
function FDsBitmapImportDialog_onConfirmClick(event){
   var o = this;
   RConsole.find(FUiDesktopConsole).showUploading();
   var file = o._controlFile._hInput.files[0];
   var reader = o._fileReader = RClass.create(FFileReader);
   reader.addLoadListener(o, o.onFileLoaded);
   reader.loadFile(file);
}
function FDsBitmapImportDialog_onCancelClick(event){
   this.hide();
}
function FDsBitmapImportDialog_construct(){
   var o = this;
   o.__base.FUiDialog.construct.call(o);
}
function FDsBitmapImportDialog_dispose(){
   var o = this;
   o.__base.FUiDialog.dispose.call(o);
}
function FDsBitmapMenuBar(o){
   o = RClass.inherits(this, o, FUiMenuBar);
   o._controlBack    = null;
   o._controlSave    = null;
   o._controlCapture = null;
   o.onBuilded       = FDsBitmapMenuBar_onBuilded;
   o.onSaveLoad      = FDsBitmapMenuBar_onSaveLoad;
   o.onSaveClick     = FDsBitmapMenuBar_onSaveClick;
   o.onImportClick   = FDsBitmapMenuBar_onImportClick;
   o.construct       = FDsBitmapMenuBar_construct;
   o.dispose         = FDsBitmapMenuBar_dispose;
   return o;
}
function FDsBitmapMenuBar_onBuilded(event){
   var o = this;
   o.__base.FUiMenuBar.onBuilded.call(o, event);
}
function FDsBitmapMenuBar_onSaveLoad(event){
   RConsole.find(FUiDesktopConsole).hide();
}
function FDsBitmapMenuBar_onSaveClick(event){
   var o = this;
   var bitmap = o._frameSet._activeResource;
   RConsole.find(FUiDesktopConsole).showUploading();
   var connection = RConsole.find(FDrBitmapConsole).doUpdate(bitmap);
   connection.addLoadListener(o, o.onSaveLoad);
}
function FDsBitmapMenuBar_onImportClick(event){
   var o = this;
   var resource = o._frameSet._activeResource;
   var dialog = RConsole.find(FUiWindowConsole).find(FDsBitmapImportDialog);
   dialog._resource = resource;
   dialog._frameSet = o._frameSet;
   dialog.showPosition(EUiPosition.Center);
}
function FDsBitmapMenuBar_construct(){
   var o = this;
   o.__base.FUiMenuBar.construct.call(o);
}
function FDsBitmapMenuBar_dispose(){
   var o = this;
   o.__base.FUiMenuBar.dispose.call(o);
}
function FDsBitmapPropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._activeBitmap      = null;
   o._controlGuid       = null;
   o._controlCode       = null;
   o._controlLabel      = null;
   o._controlSizeWidth  = null;
   o._controlSizeHeight = null;
   o.onBuilded          = FDsBitmapPropertyFrame_onBuilded;
   o.onDataChanged      = FDsBitmapPropertyFrame_onDataChanged;
   o.construct          = FDsBitmapPropertyFrame_construct;
   o.loadObject         = FDsBitmapPropertyFrame_loadObject;
   o.dispose            = FDsBitmapPropertyFrame_dispose;
   return o;
}
function FDsBitmapPropertyFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsBitmapPropertyFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   o._controlCode.addDataChangedListener(o, o.onDataChanged);
   o._controlLabel.addDataChangedListener(o, o.onDataChanged);
}
function FDsBitmapPropertyFrame_onDataChanged(p){
   var o = this;
   var bitmap = o._activeBitmap;
   bitmap.setCode(o._controlCode.get());
   bitmap.setLabel(o._controlLabel.get());
}
function FDsBitmapPropertyFrame_loadObject(bitmap){
   var o = this;
   o._activeBitmap = bitmap;
   o._controlGuid.set(bitmap.guid());
   o._controlCode.set(bitmap.code());
   o._controlLabel.set(bitmap.label());
   o._controlSizeWidth.set(bitmap.sizeWidth());
   o._controlSizeHeight.set(bitmap.sizeHeight());
}
function FDsBitmapPropertyFrame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsBitmapPropertyToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   o._controlRefresh = null;
   o.onBuilded       = FDsBitmapPropertyToolBar_onBuilded;
   o.onRefreshClick  = FDsBitmapPropertyToolBar_onRefreshClick;
   o.construct       = FDsBitmapPropertyToolBar_construct;
   o.dispose         = FDsBitmapPropertyToolBar_dispose;
   return o;
}
function FDsBitmapPropertyToolBar_onBuilded(event){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, event);
   o._controlRefresh.addClickListener(o, o.onRefreshClick);
}
function FDsBitmapPropertyToolBar_onRefreshClick(event){
   var o = this;
}
function FDsBitmapPropertyToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsBitmapPropertyToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsBitmapWorkspace(o){
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
   o.onBuilded             = FDsBitmapWorkspace_onBuilded;
   o.onMeshLoad            = FDsBitmapWorkspace_onMeshLoad;
   o.onCatalogSelected     = FDsBitmapWorkspace_onCatalogSelected;
   o.construct             = FDsBitmapWorkspace_construct;
   o.findPropertyFrame     = FDsBitmapWorkspace_findPropertyFrame;
   o.loadByGuid            = FDsBitmapWorkspace_loadByGuid;
   o.loadByCode            = FDsBitmapWorkspace_loadByCode;
   o.dispose               = FDsBitmapWorkspace_dispose;
   return o;
}
function FDsBitmapWorkspace_onBuilded(p){
   var o = this;
   o.__base.FUiWorkspace.onBuilded.call(o, p);
   var frame = o._frameToolBar = o.searchControl('toolbarFrame');
   frame._hPanel.className = o.styleName('Toolbar_Ground');
   var frame = o._frameBody = o.searchControl('bodyFrame');
   frame._hPanel.className = o.styleName('Body_Ground');
   var frame = o._frameStatusBar = o.searchControl('statusFrame');
   frame._hPanel.className = o.styleName('Statusbar_Ground');
   var menuBar = o._menuBar = RClass.create(FDsBitmapMenuBar);
   menuBar._workspace = o;
   menuBar.buildDefine(p);
   o._frameToolBar.push(menuBar);
   var frameSet = o._frameSet = RClass.create(FDsBitmapFrameSet);
   frameSet._workspace = o;
   frameSet.buildDefine(p);
   o._frameBody.push(frameSet);
   menuBar._frameSet = frameSet;
}
function FDsBitmapWorkspace_onMeshLoad(p){
   var o = this;
   o._activeSpace = p._activeSpace;
   o._catalog.buildSpace(o._activeSpace);
}
function FDsBitmapWorkspace_onCatalogSelected(p, pc){
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
function FDsBitmapWorkspace_construct(){
   var o = this;
   o.__base.FUiWorkspace.construct.call(o);
   o._propertyFrames = new TDictionary();
}
function FDsBitmapWorkspace_findPropertyFrame(p){
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
function FDsBitmapWorkspace_loadByGuid(guid){
   this._frameSet.loadByGuid(guid);
}
function FDsBitmapWorkspace_loadByCode(code){
   this._frameSet.loadByCode(code);
}
function FDsBitmapWorkspace_dispose(){
   var o = this;
   o.__base.FUiWorkspace.dispose.call(o);
   o._propertyFrames.dispose();
   o._propertyFrames = null;
}
