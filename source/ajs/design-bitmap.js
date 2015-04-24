function FDsBitmapCanvasContent(o){
   o = RClass.inherits(this, o, FDsCanvas);
   o._activeGuid          = null;
   o._activeSpace         = null;
   o._activeBitmap        = null;
   o._autoDistance        = null;
   o._autoOutline         = null;
   o._autoMatrix          = null;
   o._capturePosition     = null;
   o._captureCameraPosition = null;
   o._dimensional         = null;
   o._templateMatrix      = null;
   o._templateRenderable  = null;
   o._templateFace        = null;
   o._templateTranslation = null;
   o._templateRotation    = null;
   o._templateScale       = null;
   o._templateViewScale   = 0.05;
   o.onBuild              = FDsBitmapCanvasContent_onBuild;
   o.onLoaded             = FDsBitmapCanvasContent_onLoaded;
   o.oeResize             = FDsBitmapCanvasContent_oeResize;
   o.oeRefresh            = FDsBitmapCanvasContent_oeRefresh;
   o.construct            = FDsBitmapCanvasContent_construct;
   o.viewAutoSize         = FDsBitmapCanvasContent_viewAutoSize;
   o.loadByGuid           = FDsBitmapCanvasContent_loadByGuid;
   o.dispose              = FDsBitmapCanvasContent_dispose;
   return o;
}
function FDsBitmapCanvasContent_onBuild(p){
   var o = this;
   o.__base.FDsCanvas.onBuild.call(o, p);
   var hPanel = o._hPanel;
   var space = o._activeSpace = RClass.create(FE3dSimpleStage);
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
   projection.size().set(hPanel.width, hPanel.height);
   projection._angle = 45;
   projection.update();
   var bitmap = o._activeBitmap = RClass.create(FE3dBitmap)
   bitmap.linkGraphicContext(o);
   bitmap.setup();
   space.spriteLayer().pushRenderable(bitmap);
}
function FDsBitmapCanvasContent_onMouseCaptureStart(event){
   var o = this;
   var space = o._activeSpace;
   if(!space){
      return;
   }
   o._capturePosition.set(event.clientX, event.clientY);
   o._captureCameraPosition.assign(space.camera().position());
   RHtml.cursorSet(o._hPanel, EUiCursor.Pointer);
}
function FDsBitmapCanvasContent_onMouseCapture(event){
   var o = this;
   var space = o._activeSpace;
   if(!space){
      return;
   }
   var cx = event.clientX - o._capturePosition.x;
   var cy = event.clientY - o._capturePosition.y;
   var mv = o._canvasMoveCd;
   var cm = o._captureMatrix;
   switch(o._canvasModeCd){
      case EDsCanvasMode.Drop:
         var camera = space.camera();
         camera.position().x = o._captureCameraPosition.x - cx * o._cameraMouseMove;
         camera.position().z = o._captureCameraPosition.z - cy * o._cameraMouseMove;
         camera.update();
         break;
   }
}
function FDsBitmapCanvasContent_onMouseCaptureStop(p){
   var o = this;
   RHtml.cursorSet(o._hPanel, EUiCursor.Auto);
}
function FDsBitmapCanvasContent_onLoaded(event){
   var o = this;
   RConsole.find(FUiDesktopConsole).hide();
}
function FDsBitmapCanvasContent_oeResize(p){
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
function FDsBitmapCanvasContent_oeRefresh(p){
   return EEventStatus.Stop;
}
function FDsBitmapCanvasContent_construct(){
   var o = this;
   o.__base.FDsCanvas.construct.call(o);
   o._autoDistance = new SPoint3(6, 6, 6);
   o._autoOutline = new SOutline3d();
   o._autoMatrix = new SMatrix3d();
   o._capturePosition = new SPoint2();
   o._captureCameraPosition = new SPoint3();
}
function FDsBitmapCanvasContent_selectDisplay(p){
   var o = this;
   o.selectNone();
   o._selectObject = p;
   o.innerSelectDisplay(p);
}
function FDsBitmapCanvasContent_viewAutoSize(flipX, flipY, flipZ, rotationX, rotationY, rotationZ){
   var o = this;
   var outline = o._autoOutline;
   var space = o._activeSpace;
   var display = space._display;
   var displayResource = display.resource();
   var displayMatrix = displayResource.matrix();
   var renderable = display._renderable;
   var renderableResource = renderable.resource();
   var renderableMatrix = renderableResource.matrix();
   if(rotationX){
      displayMatrix.rx += RConst.PI_2;
   }
   if(rotationY){
      displayMatrix.ry += RConst.PI_2;
   }
   if(rotationZ){
      displayMatrix.rz += RConst.PI_2;
   }
   var matrix = o._autoMatrix.identity();
   matrix.setRotation(displayMatrix.rx, displayMatrix.ry, displayMatrix.rz);
   matrix.update();
   var resource = space.resource();
   var resourceOutline = resource.calculateOutline();
   outline.calculateFrom(resourceOutline, matrix);
   if(flipX){
      displayMatrix.sx = -displayMatrix.sx;
   }
   if(flipY){
      displayMatrix.sy = -displayMatrix.sy;
   }
   if(flipZ){
      displayMatrix.sz = -displayMatrix.sz;
   }
   var autoDistance = o._autoDistance;
   var scaleX = autoDistance.x / outline.distance.x;
   var scaleY = autoDistance.y / outline.distance.y;
   var scaleZ = autoDistance.z / outline.distance.z;
   var scale = RMath.min(scaleX, scaleY, scaleZ);
   scaleX = scale * RMath.sign(displayMatrix.sx)
   scaleY = scale * RMath.sign(displayMatrix.sy)
   scaleZ = scale * RMath.sign(displayMatrix.sz)
   var x = -outline.center.x * scaleX;
   var y = -outline.min.y * scaleY;
   var z = -outline.center.z * scaleZ;
   displayMatrix.setTranslate(x, y, z);
   displayMatrix.setScale(scaleX, scaleY, scaleZ);
   displayMatrix.update();
   display.reloadResource();
   renderableMatrix.identity();
   renderable.reloadResource();
}
function FDsBitmapCanvasContent_loadByGuid(guid){
   var o = this;
   RConsole.find(FUiDesktopConsole).showLoading();
   var url = '/cloud.resource.bitmap.wv?do=view&guid=' + guid;
   var bitmap = o._activeBitmap;
   bitmap.loadUrl(url);
   bitmap.clearLoadListeners();
   bitmap.addLoadListener(o, o.onLoaded);
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
function FDsBitmapCatalogContent(o){
   o = RClass.inherits(this, o, FUiListView);
   o._activeItem       = null;
   o._activeGuid       = null;
   o._refreshButton    = null;
   o._saveButton       = null;
   o._runButton        = null;
   o.onBuilded         = FDsBitmapCatalogContent_onBuilded;
   o.onServiceLoad     = FDsBitmapCatalogContent_onServiceLoad;
   o.construct         = FDsBitmapCatalogContent_construct;
   o.doClickItem       = FDsBitmapCatalogContent_doClickItem;
   o.doDoubleClickItem = FDsBitmapCatalogContent_doDoubleClickItem;
   o.serviceList       = FDsBitmapCatalogContent_serviceList;
   o.dispose           = FDsBitmapCatalogContent_dispose;
   return o;
}
function FDsBitmapCatalogContent_onBuilded(p){
   var o = this;
   o.__base.FUiListView.onBuilded.call(o, p);
}
function FDsBitmapCatalogContent_onServiceLoad(event){
   var o = this;
   var xitems = event.root.findNode('ImageCollection');
   o.clear();
   var xnodes = xitems.nodes();
   var count = xnodes.count();
   for(var i = 0; i < count; i++){
      var xnode = xnodes.getAt(i);
      if(xnode.isName('Image')){
         var item = o.createItem(FDsBitmapCatalogItem);
         item.propertyLoad(xnode);
         item._guid = xnode.get('guid');
         item._code = xnode.get('code');
         item._updateDate = xnode.get('update_date');
         item.setLabel(RString.nvl(xnode.get('label'), xnode.get('code')));
         item.refreshStyle();
         o.push(item);
      }
   }
   RConsole.find(FUiDesktopConsole).hide();
}
function FDsBitmapCatalogContent_construct(){
   var o = this;
   o.__base.FUiListView.construct.call(o);
}
function FDsBitmapCatalogContent_doClickItem(control){
   var o = this;
   o.__base.FUiListView.doClickItem.call(o, control);
   var guid = control._guid;
   o._activeItem = control;
   var canvas = o._frameSet._canvasContent;
   canvas.loadByGuid(guid);
}
function FDsBitmapCatalogContent_doDoubleClickItem(control){
   var o = this;
   o.__base.FUiListView.doDoubleClickItem.call(o, control)
   var guid = control._guid;
   o._activeItem = control;
   o._activeGuid = control._guid;
}
function FDsBitmapCatalogContent_serviceList(guid){
   var o = this;
}
function FDsBitmapCatalogContent_dispose(){
   var o = this;
   o.__base.FUiListView.dispose.call(o);
}
function FDsBitmapCatalogItem(o){
   o = RClass.inherits(this, o, FUiListViewItem);
   o._styleTypePanel = RClass.register(o, new AStyle('_styleTypePanel'));
   o._styleTypeLabel = RClass.register(o, new AStyle('_styleTypeLabel'));
   o.onBuild         = FDsBitmapCatalogItem_onBuild;
   o.setTypeLabel    = FDsBitmapCatalogItem_setTypeLabel;
   o.refreshStyle    = FDsBitmapCatalogItem_refreshStyle;
   return o;
}
function FDsBitmapCatalogItem_onBuild(p){
   var o = this;
   o.__base.FUiListViewItem.onBuild.call(o, p);
   var h = o._hPanel;
   h.style.width = '200px';
   h.style.height = '150px';
   o._hLine1.className = o.styleName('TypePanel');
   o._hLine1.vAlign = 'top';
   o._hTypeLabel = RBuilder.appendDiv(o._hLine1, o.styleName('TypeLabel'));
}
function FDsBitmapCatalogItem_setTypeLabel(label){
   this._hTypeLabel.innerHTML = label;
}
function FDsBitmapCatalogItem_refreshStyle(){
   var o = this;
   var url = '/cloud.content2d.bitmap.image.wv?do=preview&guid=' + o._guid + '&update_date=' + o._updateDate;
   o._hForm.style.backgroundImage = 'url("' + url + '")';
}
function FDsBitmapCatalogToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   o._frameName                 = 'resource.bitmap.CatalogToolBar';
   o._canvasModeCd              = EDsCanvasMode.Drop;
   o._controlDrop               = null;
   o._controlSize1              = null;
   o._controlSize2              = null;
   o._controlSize3              = null;
   o._controlSize4              = null;
   o._controlSizeWidth          = null;
   o._controlSizeHeight         = null;
   o._controlRotationVisible = null;
   o._controlRotationWidth   = null;
   o._controlRotationHeight  = null;
   o._controlRotationAuto    = null;
   o._controlRotationFlipX   = null;
   o._controlRotationFlipY   = null;
   o._controlRotationFlipZ   = null;
   o._controlRotationX       = null;
   o._controlRotationY       = null;
   o._controlRotationZ       = null;
   o._controlRotation           = null;
   o.onBuilded                  = FDsBitmapCatalogToolBar_onBuilded;
   o.onModeClick                = FDsBitmapCatalogToolBar_onModeClick;
   o.onSizeClick                = FDsBitmapCatalogToolBar_onSizeClick;
   o.onRotationChange           = FDsBitmapCatalogToolBar_onRotationChange;
   o.onRotationAutoClick        = FDsBitmapCatalogToolBar_onRotationAutoClick;
   o.onRotationClick            = FDsBitmapCatalogToolBar_onRotationClick;
   o.construct                  = FDsBitmapCatalogToolBar_construct;
   o.dispose                    = FDsBitmapCatalogToolBar_dispose;
   return o;
}
function FDsBitmapCatalogToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
}
function FDsBitmapCatalogToolBar_onModeClick(p){
   var o = this;
}
function FDsBitmapCatalogToolBar_onSizeClick(event){
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
function FDsBitmapCatalogToolBar_onRotationChange(event){
   var o = this;
   var canvas = o._frameSet._canvas;
   var visible = o._controlRotationVisible.isCheck();
   var width = RInteger.parse(o._controlRotationWidth.text());
   var height = RInteger.parse(o._controlRotationHeight.text());
   canvas.switchRotation(visible, width, height);
}
function FDsBitmapCatalogToolBar_onRotationAutoClick(event){
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
function FDsBitmapCatalogToolBar_onRotationClick(event, v){
   var o = this;
   var button = event.sender;
   var canvas = o._frameSet._canvas;
   canvas.switchRotation(button.isCheck());
}
function FDsBitmapCatalogToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsBitmapCatalogToolBar_dispose(){
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
   var url = '/cloud.resource.bitmap.wv?do=importData&guid=' + guid + '&data_length=' + reader.length() + '&file_name=' + reader.fileName();
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
   o.onBackClick     = FDsBitmapMenuBar_onBackClick;
   o.onSaveLoad      = FDsBitmapMenuBar_onSaveLoad;
   o.onSaveClick     = FDsBitmapMenuBar_onSaveClick;
   o.onImportLoad    = FDsBitmapMenuBar_onImportLoad;
   o.onImportClick   = FDsBitmapMenuBar_onImportClick;
   o.construct       = FDsBitmapMenuBar_construct;
   o.dispose         = FDsBitmapMenuBar_dispose;
   return o;
}
function FDsBitmapMenuBar_onBuilded(event){
   var o = this;
   o.__base.FUiMenuBar.onBuilded.call(o, event);
}
function FDsBitmapMenuBar_onBackClick(event){
   var o = this;
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
function FDsBitmapMenuBar_onImportLoad(event){
   RConsole.find(FUiDesktopConsole).hide();
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
