function FDsMaterialCanvasBitmap(o){
   o = RClass.inherits(this, o, FDsBitmapCanvas);
   return o;
}
function FDsMaterialCanvasContent(o){
   o = RClass.inherits(this, o, FDsCanvas);
   o._activeGuid          = null;
   o._activeSpace         = null;
   o._activeBitmap        = null;
   o._autoDistance        = null;
   o._autoOutline         = null;
   o._autoMatrix          = null;
   o._canvasModeCd        = EDsCanvasMode.Drop;
   o._canvasMoveCd        = EDsCanvasDrag.Unknown;
   o._capturePosition     = null;
   o._captureCameraPosition = null;
   o._dimensional         = null;
   o._switchWidth         = '*';
   o._switchHeight        = '*';
   o._cameraMoveRate      = 8;
   o._cameraKeyRotation   = 3;
   o._cameraMouseMove     = 0.05;
   o._templateMatrix      = null;
   o._templateRenderable  = null;
   o._templateFace        = null;
   o._templateTranslation = null;
   o._templateRotation    = null;
   o._templateScale       = null;
   o._templateViewScale   = 0.05;
   o.onBuild              = FDsMaterialCanvasContent_onBuild;
   o.onMouseCaptureStart  = FDsMaterialCanvasContent_onMouseCaptureStart;
   o.onMouseCapture       = FDsMaterialCanvasContent_onMouseCapture;
   o.onMouseCaptureStop   = FDsMaterialCanvasContent_onMouseCaptureStop;
   o.onLoaded             = FDsMaterialCanvasContent_onLoaded;
   o.oeResize             = FDsMaterialCanvasContent_oeResize;
   o.oeRefresh            = FDsMaterialCanvasContent_oeRefresh;
   o.construct            = FDsMaterialCanvasContent_construct;
   o.switchSize           = FDsMaterialCanvasContent_switchSize;
   o.viewAutoSize         = FDsMaterialCanvasContent_viewAutoSize;
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
function FDsMaterialCanvasContent_onMouseCaptureStart(event){
   var o = this;
   var space = o._activeSpace;
   if(!space){
      return;
   }
   o._capturePosition.set(event.clientX, event.clientY);
   o._captureCameraPosition.assign(space.camera().position());
   RHtml.cursorSet(o._hPanel, EUiCursor.Pointer);
}
function FDsMaterialCanvasContent_onMouseCapture(event){
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
function FDsMaterialCanvasContent_onMouseCaptureStop(p){
   var o = this;
   RHtml.cursorSet(o._hPanel, EUiCursor.Auto);
}
function FDsMaterialCanvasContent_onLoaded(event){
   var o = this;
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
   o._autoDistance = new SPoint3(6, 6, 6);
   o._autoOutline = new SOutline3d();
   o._autoMatrix = new SMatrix3d();
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
function FDsMaterialCanvasContent_switchSize(width, height){
   var o = this;
   o._switchWidth = width;
   o._switchHeight = height;
   var hCanvas = o._hPanel;
   var hParent = o._hParent;
   if(width == '*'){
      width = hParent.offsetWidth;
   }
   if(height == '*'){
      height = hParent.offsetHeight;
   }
   hCanvas.width = width;
   hCanvas.style.width = width + 'px';
   hCanvas.height = height;
   hCanvas.style.height = height + 'px';
   o._graphicContext.setViewport(0, 0, width, height);
   var space = o._activeSpace;
   if(space){
      var projection = space.camera().projection();
      projection.size().set(width, height);
      projection.update();
   }
}
function FDsMaterialCanvasContent_viewAutoSize(flipX, flipY, flipZ, rotationX, rotationY, rotationZ){
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
function FDsMaterialCanvasContent_reloadRegion(region){
   var o = this;
   var resource = region.resource();
   o._cameraMoveRate = resource.moveSpeed();
   o._cameraKeyRotation = resource.rotationKeySpeed();
   o._cameraMouseMove = resource.rotationMouseSpeed();
}
function FDsMaterialCanvasContent_loadByGuid(guid){
   var o = this;
   debugger
   RConsole.find(FUiDesktopConsole).showLoading();
   var url = '/cloud.content2d.bitmap.image.wv?do=view&guid=' + guid;
   var bitmap = o._activeBitmap;
   bitmap.loadUrl(url);
   bitmap.clearLoadListeners();
   bitmap.addLoadListener(o, o.onLoaded);
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
function FDsMaterialMenuBar(o){
   o = RClass.inherits(this, o, FUiMenuBar);
   o._controlSaveButton    = null;
   o._controlCaptureButton = null;
   o.onBuilded             = FDsMaterialMenuBar_onBuilded;
   o.onSaveLoad            = FDsMaterialMenuBar_onSaveLoad;
   o.onSaveClick           = FDsMaterialMenuBar_onSaveClick;
   o.onCaptureLoad         = FDsMaterialMenuBar_onCaptureLoad;
   o.onCaptureClick        = FDsMaterialMenuBar_onCaptureClick;
   o.construct             = FDsMaterialMenuBar_construct;
   o.dispose               = FDsMaterialMenuBar_dispose;
   return o;
}
function FDsMaterialMenuBar_onBuilded(p){
   var o = this;
   o.__base.FUiMenuBar.onBuilded.call(o, p);
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
