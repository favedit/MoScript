with(MO){
   MO.FDsBitmapCanvasContent = function FDsBitmapCanvasContent(o){
      o = MO.Class.inherits(this, o, FDsBitmapCanvas);
      return o;
   }
}
with(MO){
   MO.FDsBitmapCanvasToolBar = function FDsBitmapCanvasToolBar(o){
      o = MO.Class.inherits(this, o, FDuiToolBar);
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
   MO.FDsBitmapCanvasToolBar_onBuilded = function FDsBitmapCanvasToolBar_onBuilded(p){
      var o = this;
      o.__base.FDuiToolBar.onBuilded.call(o, p);
   }
   MO.FDsBitmapCanvasToolBar_onSizeClick = function FDsBitmapCanvasToolBar_onSizeClick(event){
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
   MO.FDsBitmapCanvasToolBar_construct = function FDsBitmapCanvasToolBar_construct(){
      var o = this;
      o.__base.FDuiToolBar.construct.call(o);
   }
   MO.FDsBitmapCanvasToolBar_dispose = function FDsBitmapCanvasToolBar_dispose(){
      var o = this;
      o.__base.FDuiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsBitmapFrameSet = function FDsBitmapFrameSet(o){
      o = MO.Class.inherits(this, o, FDsFrameSet);
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
   MO.FDsBitmapFrameSet_onBuilded = function FDsBitmapFrameSet_onBuilded(p){
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
   MO.FDsBitmapFrameSet_onDataLoaded = function FDsBitmapFrameSet_onDataLoaded(event){
      var o = this;
      debugger
      o._activeSpace = event._activeSpace;
   }
   MO.FDsBitmapFrameSet_construct = function FDsBitmapFrameSet_construct(){
      var o = this;
      o.__base.FDsFrameSet.construct.call(o);
   }
   MO.FDsBitmapFrameSet_loadByGuid = function FDsBitmapFrameSet_loadByGuid(guid){
      var o = this;
      o._activeGuid = guid;
      var bitmap = o._activeResource = MO.Console.find(FDrBitmapConsole).query(guid);
      var canvas = o._canvasContent;
      canvas.loadByGuid(guid);
      var frame = o.findPropertyFrame(EDsFrame.BitmapPropertyFrame);
      frame.loadObject(bitmap);
   }
   MO.FDsBitmapFrameSet_loadByCode = function FDsBitmapFrameSet_loadByCode(code){
      var o = this;
      o._activeCode = code;
      var connection = MO.Console.find(FDrBitmapConsole).query(code);
      connection.addLoadListener(o, o.onDataLoaded);
   }
   MO.FDsBitmapFrameSet_reload = function FDsBitmapFrameSet_reload(){
      var o = this;
   }
   MO.FDsBitmapFrameSet_dispose = function FDsBitmapFrameSet_dispose(){
      var o = this;
      o.__base.FDsFrameSet.dispose.call(o);
   }
}
with(MO){
   MO.FDsBitmapImportDialog = function FDsBitmapImportDialog(o){
      o = MO.Class.inherits(this, o, FDuiDialog);
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
   MO.FDsBitmapImportDialog_onBuilded = function FDsBitmapImportDialog_onBuilded(event){
      var o = this;
      o.__base.FDuiDialog.onBuilded.call(o, event);
      o._controlConfirmButton.addClickListener(o, o.onConfirmClick);
      o._controlCancelButton.addClickListener(o, o.onCancelClick);
   }
   MO.FDsBitmapImportDialog_onFileLoaded = function FDsBitmapImportDialog_onFileLoaded(event){
      var o = this;
      var reader = o._fileReader;
      var resource = o._resource;
      var guid = resource.guid();
      var url = '/cloud.resource.bitmap.wv?do=updateData&guid=' + guid + '&data_length=' + reader.length() + '&file_name=' + reader.fileName();
      url = RBrowser.urlEncode(url);
      var connection = MO.Console.find(FHttpConsole).send(url, reader.data());
      connection.addLoadListener(o, o.onConfirmLoad);
      o._fileReader = RObject.dispose(reader);
   }
   MO.FDsBitmapImportDialog_onConfirmLoad = function FDsBitmapImportDialog_onConfirmLoad(event){
      var o = this;
      MO.Console.find(FDuiDesktopConsole).hide();
      o.hide();
      o._frameSet.reload();
   }
   MO.FDsBitmapImportDialog_onConfirmClick = function FDsBitmapImportDialog_onConfirmClick(event){
      var o = this;
      MO.Console.find(FDuiDesktopConsole).showUploading();
      var file = o._controlFile._hInput.files[0];
      var reader = o._fileReader = MO.Class.create(FFileReader);
      reader.addLoadListener(o, o.onFileLoaded);
      reader.loadFile(file);
   }
   MO.FDsBitmapImportDialog_onCancelClick = function FDsBitmapImportDialog_onCancelClick(event){
      this.hide();
   }
   MO.FDsBitmapImportDialog_construct = function FDsBitmapImportDialog_construct(){
      var o = this;
      o.__base.FDuiDialog.construct.call(o);
   }
   MO.FDsBitmapImportDialog_dispose = function FDsBitmapImportDialog_dispose(){
      var o = this;
      o.__base.FDuiDialog.dispose.call(o);
   }
}
with(MO){
   MO.FDsBitmapMenuBar = function FDsBitmapMenuBar(o){
      o = MO.Class.inherits(this, o, FDuiMenuBar);
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
   MO.FDsBitmapMenuBar_onBuilded = function FDsBitmapMenuBar_onBuilded(event){
      var o = this;
      o.__base.FDuiMenuBar.onBuilded.call(o, event);
   }
   MO.FDsBitmapMenuBar_onSaveLoad = function FDsBitmapMenuBar_onSaveLoad(event){
      MO.Console.find(FDuiDesktopConsole).hide();
   }
   MO.FDsBitmapMenuBar_onSaveClick = function FDsBitmapMenuBar_onSaveClick(event){
      var o = this;
      var bitmap = o._frameSet._activeResource;
      MO.Console.find(FDuiDesktopConsole).showUploading();
      var connection = MO.Console.find(FDrBitmapConsole).doUpdate(bitmap);
      connection.addLoadListener(o, o.onSaveLoad);
   }
   MO.FDsBitmapMenuBar_onImportClick = function FDsBitmapMenuBar_onImportClick(event){
      var o = this;
      var resource = o._frameSet._activeResource;
      var dialog = MO.Console.find(FDuiWindowConsole).find(FDsBitmapImportDialog);
      dialog._resource = resource;
      dialog._frameSet = o._frameSet;
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsBitmapMenuBar_construct = function FDsBitmapMenuBar_construct(){
      var o = this;
      o.__base.FDuiMenuBar.construct.call(o);
   }
   MO.FDsBitmapMenuBar_dispose = function FDsBitmapMenuBar_dispose(){
      var o = this;
      o.__base.FDuiMenuBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsBitmapPropertyFrame = function FDsBitmapPropertyFrame(o){
      o = MO.Class.inherits(this, o, FDuiForm);
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
   MO.FDsBitmapPropertyFrame_construct = function FDsBitmapPropertyFrame_construct(){
      var o = this;
      o.__base.FDuiForm.construct.call(o);
   }
   MO.FDsBitmapPropertyFrame_onBuilded = function FDsBitmapPropertyFrame_onBuilded(p){
      var o = this;
      o.__base.FDuiForm.onBuilded.call(o, p);
      o._controlCode.addDataChangedListener(o, o.onDataChanged);
      o._controlLabel.addDataChangedListener(o, o.onDataChanged);
   }
   MO.FDsBitmapPropertyFrame_onDataChanged = function FDsBitmapPropertyFrame_onDataChanged(p){
      var o = this;
      var bitmap = o._activeBitmap;
      bitmap.setCode(o._controlCode.get());
      bitmap.setLabel(o._controlLabel.get());
   }
   MO.FDsBitmapPropertyFrame_loadObject = function FDsBitmapPropertyFrame_loadObject(bitmap){
      var o = this;
      o._activeBitmap = bitmap;
      o._controlGuid.set(bitmap.guid());
      o._controlCode.set(bitmap.code());
      o._controlLabel.set(bitmap.label());
      o._controlSizeWidth.set(bitmap.sizeWidth());
      o._controlSizeHeight.set(bitmap.sizeHeight());
   }
   MO.FDsBitmapPropertyFrame_dispose = function FDsBitmapPropertyFrame_dispose(){
      var o = this;
      o.__base.FDuiForm.dispose.call(o);
   }
}
with(MO){
   MO.FDsBitmapPropertyToolBar = function FDsBitmapPropertyToolBar(o){
      o = MO.Class.inherits(this, o, FDuiToolBar);
      o._frameName      = 'resource.bitmap.PropertyToolBar';
      o._controlRefresh = null;
      o.onBuilded       = FDsBitmapPropertyToolBar_onBuilded;
      o.onRefreshClick  = FDsBitmapPropertyToolBar_onRefreshClick;
      o.construct       = FDsBitmapPropertyToolBar_construct;
      o.dispose         = FDsBitmapPropertyToolBar_dispose;
      return o;
   }
   MO.FDsBitmapPropertyToolBar_onBuilded = function FDsBitmapPropertyToolBar_onBuilded(event){
      var o = this;
      o.__base.FDuiToolBar.onBuilded.call(o, event);
      o._controlRefresh.addClickListener(o, o.onRefreshClick);
   }
   MO.FDsBitmapPropertyToolBar_onRefreshClick = function FDsBitmapPropertyToolBar_onRefreshClick(event){
      var o = this;
   }
   MO.FDsBitmapPropertyToolBar_construct = function FDsBitmapPropertyToolBar_construct(){
      var o = this;
      o.__base.FDuiToolBar.construct.call(o);
   }
   MO.FDsBitmapPropertyToolBar_dispose = function FDsBitmapPropertyToolBar_dispose(){
      var o = this;
      o.__base.FDuiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsBitmapWorkspace = function FDsBitmapWorkspace(o){
      o = MO.Class.inherits(this, o, FDuiWorkspace);
      o._frameName            = 'design2d.bitmap.Workspace';
      o._styleWorkspaceGround = MO.Class.register(o, new MO.AStyle('_styleWorkspaceGround', 'Workspace_Ground'));
      o._styleToolbarGround   = MO.Class.register(o, new MO.AStyle('_styleToolbarGround', 'Toolbar_Ground'));
      o._styleBodyGround      = MO.Class.register(o, new MO.AStyle('_styleBodyGround', 'Body_Ground'));
      o._styleStatusbarGround = MO.Class.register(o, new MO.AStyle('_styleStatusbarGround', 'Statusbar_Ground'));
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
   MO.FDsBitmapWorkspace_onBuilded = function FDsBitmapWorkspace_onBuilded(p){
      var o = this;
      o.__base.FDuiWorkspace.onBuilded.call(o, p);
      var frame = o._frameToolBar = o.searchControl('toolbarFrame');
      frame._hPanel.className = o.styleName('Toolbar_Ground');
      var frame = o._frameBody = o.searchControl('bodyFrame');
      frame._hPanel.className = o.styleName('Body_Ground');
      var frame = o._frameStatusBar = o.searchControl('statusFrame');
      frame._hPanel.className = o.styleName('Statusbar_Ground');
      var menuBar = o._menuBar = MO.Class.create(FDsBitmapMenuBar);
      menuBar._workspace = o;
      menuBar.buildDefine(p);
      o._frameToolBar.push(menuBar);
      var frameSet = o._frameSet = MO.Class.create(FDsBitmapFrameSet);
      frameSet._workspace = o;
      frameSet.buildDefine(p);
      o._frameBody.push(frameSet);
      menuBar._frameSet = frameSet;
   }
   MO.FDsBitmapWorkspace_onMeshLoad = function FDsBitmapWorkspace_onMeshLoad(p){
      var o = this;
      o._activeSpace = p._activeSpace;
      o._catalog.buildSpace(o._activeSpace);
   }
   MO.FDsBitmapWorkspace_onCatalogSelected = function FDsBitmapWorkspace_onCatalogSelected(p, pc){
      var o = this;
      var space = o._activeSpace;
      var fs = o._propertyFrames;
      var c = fs.count();
      for(var i = 0; i < c; i++){
         var f = fs.value(i);
         f.hide();
      }
      if(MO.Class.isClass(p, FE3dStage)){
         var f = o.findPropertyFrame(EDsFrame.MeshSpacePropertyFrame);
         f.show();
         f.loadObject(space, space);
      }else if(MO.Class.isClass(p, FG3dTechnique)){
         var f = o.findPropertyFrame(EDsFrame.MeshTechniquePropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(MO.Class.isClass(p, FE3dRegion)){
         var f = o.findPropertyFrame(EDsFrame.MeshRegionPropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(MO.Class.isClass(p, FE3dCamera)){
         var f = o.findPropertyFrame(EDsFrame.MeshCameraPropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(MO.Class.isClass(p, FG3dDirectionalLight)){
         var f = o.findPropertyFrame(EDsFrame.MeshLightPropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(MO.Class.isClass(p, FE3dMeshDisplay)){
         var f = o.findPropertyFrame(EDsFrame.MeshDisplayPropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(MO.Class.isClass(p, FG3dMaterial)){
         var f = o.findPropertyFrame(EDsFrame.MeshMaterialPropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(MO.Class.isClass(p, FE3dMeshRenderable)){
         var f = o.findPropertyFrame(EDsFrame.MeshRenderablePropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else{
         throw new TError('Unknown select object type. (value={1})', p);
      }
   }
   MO.FDsBitmapWorkspace_construct = function FDsBitmapWorkspace_construct(){
      var o = this;
      o.__base.FDuiWorkspace.construct.call(o);
      o._propertyFrames = new TDictionary();
   }
   MO.FDsBitmapWorkspace_findPropertyFrame = function FDsBitmapWorkspace_findPropertyFrame(p){
      var o = this;
      var f = o._propertyFrames.get(p);
      if(!f){
         var fc = MO.Console.find(FFrameConsole);
         f = fc.get(o, p, o._frameProperty._hContainer);
         f._workspace = o;
         o._propertyFrames.set(p, f);
      }
      return f;
   }
   MO.FDsBitmapWorkspace_loadByGuid = function FDsBitmapWorkspace_loadByGuid(guid){
      this._frameSet.loadByGuid(guid);
   }
   MO.FDsBitmapWorkspace_loadByCode = function FDsBitmapWorkspace_loadByCode(code){
      this._frameSet.loadByCode(code);
   }
   MO.FDsBitmapWorkspace_dispose = function FDsBitmapWorkspace_dispose(){
      var o = this;
      o.__base.FDuiWorkspace.dispose.call(o);
      o._propertyFrames.dispose();
      o._propertyFrames = null;
   }
}
