function FDsShareBitmapCanvasContent(o){
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
   o.onBuild              = FDsShareBitmapCanvasContent_onBuild;
   o.onMouseCaptureStart  = FDsShareBitmapCanvasContent_onMouseCaptureStart;
   o.onMouseCapture       = FDsShareBitmapCanvasContent_onMouseCapture;
   o.onMouseCaptureStop   = FDsShareBitmapCanvasContent_onMouseCaptureStop;
   o.onEnterFrame         = FDsShareBitmapCanvasContent_onEnterFrame;
   o.onLoaded             = FDsShareBitmapCanvasContent_onLoaded;
   o.oeResize             = FDsShareBitmapCanvasContent_oeResize;
   o.oeRefresh            = FDsShareBitmapCanvasContent_oeRefresh;
   o.construct            = FDsShareBitmapCanvasContent_construct;
   o.switchSize           = FDsShareBitmapCanvasContent_switchSize;
   o.viewAutoSize         = FDsShareBitmapCanvasContent_viewAutoSize;
   o.reloadRegion         = FDsShareBitmapCanvasContent_reloadRegion;
   o.loadByGuid           = FDsShareBitmapCanvasContent_loadByGuid;
   o.dispose              = FDsShareBitmapCanvasContent_dispose;
   return o;
}
function FDsShareBitmapCanvasContent_onBuild(p){
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
function FDsShareBitmapCanvasContent_onMouseCaptureStart(event){
   var o = this;
   var space = o._activeSpace;
   if(!space){
      return;
   }
   o._capturePosition.set(event.clientX, event.clientY);
   o._captureCameraPosition.assign(space.camera().position());
   RHtml.cursorSet(o._hPanel, EUiCursor.Pointer);
}
function FDsShareBitmapCanvasContent_onMouseCapture(event){
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
function FDsShareBitmapCanvasContent_onMouseCaptureStop(p){
   var o = this;
   RHtml.cursorSet(o._hPanel, EUiCursor.Auto);
}
function FDsShareBitmapCanvasContent_onEnterFrame(){
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
}
function FDsShareBitmapCanvasContent_onLoaded(event){
   var o = this;
   RConsole.find(FUiDesktopConsole).hide();
}
function FDsShareBitmapCanvasContent_oeResize(p){
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
function FDsShareBitmapCanvasContent_oeRefresh(p){
   return EEventStatus.Stop;
}
function FDsShareBitmapCanvasContent_construct(){
   var o = this;
   o.__base.FDsCanvas.construct.call(o);
   o._autoDistance = new SPoint3(6, 6, 6);
   o._autoOutline = new SOutline3d();
   o._autoMatrix = new SMatrix3d();
   o._capturePosition = new SPoint2();
   o._captureCameraPosition = new SPoint3();
}
function FDsShareBitmapCanvasContent_selectDisplay(p){
   var o = this;
   o.selectNone();
   o._selectObject = p;
   o.innerSelectDisplay(p);
}
function FDsShareBitmapCanvasContent_switchMode(p){
   var o = this;
   o._canvasModeCd = p;
}
function FDsShareBitmapCanvasContent_switchSize(width, height){
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
function FDsShareBitmapCanvasContent_viewAutoSize(flipX, flipY, flipZ, rotationX, rotationY, rotationZ){
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
function FDsShareBitmapCanvasContent_reloadRegion(region){
   var o = this;
   var resource = region.resource();
   o._cameraMoveRate = resource.moveSpeed();
   o._cameraKeyRotation = resource.rotationKeySpeed();
   o._cameraMouseMove = resource.rotationMouseSpeed();
}
function FDsShareBitmapCanvasContent_loadByGuid(guid){
   var o = this;
   RConsole.find(FUiDesktopConsole).showLoading();
   var url = '/cloud.content2d.bitmap.image.wv?do=view&guid=' + guid;
   var bitmap = o._activeBitmap;
   bitmap.loadUrl(url);
   bitmap.clearLoadListeners();
   bitmap.addLoadListener(o, o.onLoaded);
}
function FDsShareBitmapCanvasContent_dispose(){
   var o = this;
   o.__base.FDsCanvas.dispose.call(o);
}
function FDsShareBitmapCanvasToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   o._frameName                 = 'resource.share.bitmap.CanvasToolBar';
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
   o.onBuilded                  = FDsShareBitmapCanvasToolBar_onBuilded;
   o.onModeClick                = FDsShareBitmapCanvasToolBar_onModeClick;
   o.onSizeClick                = FDsShareBitmapCanvasToolBar_onSizeClick;
   o.onRotationChange           = FDsShareBitmapCanvasToolBar_onRotationChange;
   o.onRotationAutoClick        = FDsShareBitmapCanvasToolBar_onRotationAutoClick;
   o.onRotationClick            = FDsShareBitmapCanvasToolBar_onRotationClick;
   o.construct                  = FDsShareBitmapCanvasToolBar_construct;
   o.dispose                    = FDsShareBitmapCanvasToolBar_dispose;
   return o;
}
function FDsShareBitmapCanvasToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
   var control = o._controlDrop;
   control._canvasModeCd = EDsCanvasMode.Drop;
   control.addClickListener(o, o.onModeClick);
   control.check(true);
   o._controlSize1.addClickListener(o, o.onSizeClick);
   o._controlSize2.addClickListener(o, o.onSizeClick);
   o._controlSize3.addClickListener(o, o.onSizeClick);
   o._controlSize4.addClickListener(o, o.onSizeClick);
}
function FDsShareBitmapCanvasToolBar_onModeClick(p){
   var o = this;
}
function FDsShareBitmapCanvasToolBar_onSizeClick(event){
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
function FDsShareBitmapCanvasToolBar_onRotationChange(event){
   var o = this;
   var canvas = o._frameSet._canvas;
   var visible = o._controlRotationVisible.isCheck();
   var width = RInteger.parse(o._controlRotationWidth.text());
   var height = RInteger.parse(o._controlRotationHeight.text());
   canvas.switchRotation(visible, width, height);
}
function FDsShareBitmapCanvasToolBar_onRotationAutoClick(event){
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
function FDsShareBitmapCanvasToolBar_onRotationClick(event, v){
   var o = this;
   var button = event.sender;
   var canvas = o._frameSet._canvas;
   canvas.switchRotation(button.isCheck());
}
function FDsShareBitmapCanvasToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsShareBitmapCanvasToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsShareBitmapCatalogContent(o){
   o = RClass.inherits(this, o, FUiListView);
   o._activeItem       = null;
   o._activeGuid       = null;
   o._refreshButton    = null;
   o._saveButton       = null;
   o._runButton        = null;
   o.onBuilded         = FDsShareBitmapCatalogContent_onBuilded;
   o.onServiceLoad     = FDsShareBitmapCatalogContent_onServiceLoad;
   o.construct         = FDsShareBitmapCatalogContent_construct;
   o.doClickItem       = FDsShareBitmapCatalogContent_doClickItem;
   o.doDoubleClickItem = FDsShareBitmapCatalogContent_doDoubleClickItem;
   o.serviceList       = FDsShareBitmapCatalogContent_serviceList;
   o.dispose           = FDsShareBitmapCatalogContent_dispose;
   return o;
}
function FDsShareBitmapCatalogContent_onBuilded(p){
   var o = this;
   o.__base.FUiListView.onBuilded.call(o, p);
}
function FDsShareBitmapCatalogContent_onServiceLoad(event){
   var o = this;
   var xitems = event.root.findNode('ImageCollection');
   o.clear();
   var xnodes = xitems.nodes();
   var count = xnodes.count();
   for(var i = 0; i < count; i++){
      var xnode = xnodes.getAt(i);
      if(xnode.isName('Image')){
         var item = o.createItem(FDsShareBitmapCatalogItem);
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
function FDsShareBitmapCatalogContent_construct(){
   var o = this;
   o.__base.FUiListView.construct.call(o);
}
function FDsShareBitmapCatalogContent_doClickItem(control){
   var o = this;
   o.__base.FUiListView.doClickItem.call(o, control);
   var guid = control._guid;
   o._activeItem = control;
   var canvas = o._frameSet._canvasContent;
   canvas.loadByGuid(guid);
}
function FDsShareBitmapCatalogContent_doDoubleClickItem(control){
   var o = this;
   o.__base.FUiListView.doDoubleClickItem.call(o, control)
   var guid = control._guid;
   o._activeItem = control;
   o._activeGuid = control._guid;
}
function FDsShareBitmapCatalogContent_serviceList(guid){
   var o = this;
}
function FDsShareBitmapCatalogContent_dispose(){
   var o = this;
   o.__base.FUiListView.dispose.call(o);
}
function FDsShareBitmapCatalogItem(o){
   o = RClass.inherits(this, o, FUiListViewItem);
   o._styleTypePanel = RClass.register(o, new AStyle('_styleTypePanel'));
   o._styleTypeLabel = RClass.register(o, new AStyle('_styleTypeLabel'));
   o.onBuild         = FDsShareBitmapCatalogItem_onBuild;
   o.setTypeLabel    = FDsShareBitmapCatalogItem_setTypeLabel;
   o.refreshStyle    = FDsShareBitmapCatalogItem_refreshStyle;
   return o;
}
function FDsShareBitmapCatalogItem_onBuild(p){
   var o = this;
   o.__base.FUiListViewItem.onBuild.call(o, p);
   var h = o._hPanel;
   h.style.width = '200px';
   h.style.height = '150px';
   o._hLine1.className = o.styleName('TypePanel');
   o._hLine1.vAlign = 'top';
   o._hTypeLabel = RBuilder.appendDiv(o._hLine1, o.styleName('TypeLabel'));
}
function FDsShareBitmapCatalogItem_setTypeLabel(label){
   this._hTypeLabel.innerHTML = label;
}
function FDsShareBitmapCatalogItem_refreshStyle(){
   var o = this;
   var url = '/cloud.content2d.bitmap.image.wv?do=preview&guid=' + o._guid + '&update_date=' + o._updateDate;
   o._hForm.style.backgroundImage = 'url("' + url + '")';
}
function FDsShareBitmapCatalogToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   o._frameName                 = 'resource.share.bitmap.CatalogToolBar';
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
   o.onBuilded                  = FDsShareBitmapCatalogToolBar_onBuilded;
   o.onModeClick                = FDsShareBitmapCatalogToolBar_onModeClick;
   o.onSizeClick                = FDsShareBitmapCatalogToolBar_onSizeClick;
   o.onRotationChange           = FDsShareBitmapCatalogToolBar_onRotationChange;
   o.onRotationAutoClick        = FDsShareBitmapCatalogToolBar_onRotationAutoClick;
   o.onRotationClick            = FDsShareBitmapCatalogToolBar_onRotationClick;
   o.construct                  = FDsShareBitmapCatalogToolBar_construct;
   o.dispose                    = FDsShareBitmapCatalogToolBar_dispose;
   return o;
}
function FDsShareBitmapCatalogToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
}
function FDsShareBitmapCatalogToolBar_onModeClick(p){
   var o = this;
}
function FDsShareBitmapCatalogToolBar_onSizeClick(event){
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
function FDsShareBitmapCatalogToolBar_onRotationChange(event){
   var o = this;
   var canvas = o._frameSet._canvas;
   var visible = o._controlRotationVisible.isCheck();
   var width = RInteger.parse(o._controlRotationWidth.text());
   var height = RInteger.parse(o._controlRotationHeight.text());
   canvas.switchRotation(visible, width, height);
}
function FDsShareBitmapCatalogToolBar_onRotationAutoClick(event){
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
function FDsShareBitmapCatalogToolBar_onRotationClick(event, v){
   var o = this;
   var button = event.sender;
   var canvas = o._frameSet._canvas;
   canvas.switchRotation(button.isCheck());
}
function FDsShareBitmapCatalogToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsShareBitmapCatalogToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsShareBitmapFrameSet(o){
   o = RClass.inherits(this, o, FDsBitmapFrameSet);
   o._frameName        = 'resource.share.bitmap.FrameSet';
   o.onBuilded         = FDsShareBitmapFrameSet_onBuilded;
   o.onCatalogSelected = FDsShareBitmapFrameSet_onCatalogSelected;
   return o;
}
function FDsShareBitmapFrameSet_onBuilded(p){
   var o = this;
   o.__base.FDsBitmapFrameSet.onBuilded.call(o, p);
   var frame = o._catalogToolbarFrame = o.searchControl('catalogToolbarFrame');
   frame._hPanel.className = o.styleName('ToolBar_Ground');
   var toolbar = o._catalogToolbar = RClass.create(FDsShareBitmapCatalogToolBar);
   toolbar._frameSet = o;
   toolbar._workspace = o._worksapce;
   toolbar.buildDefine(p);
   frame.push(toolbar);
   var frame = o._catalogContentFrame = o.searchControl('catalogContentFrame');
   var catalogContent = o._catalogContent = RClass.create(FDsShareBitmapCatalogContent);
   catalogContent._frameSet = o;
   catalogContent._workspace = o._worksapce;
   catalogContent.build(p);
   frame.push(catalogContent);
   var frame = o._canvasToolbarFrame = o.searchControl('canvasToolbarFrame');
   frame._hPanel.className = o.styleName('ToolBar_Ground');
   var toolbar = o._canvasToolbar = RClass.create(FDsShareBitmapCanvasToolBar);
   toolbar._frameSet = o;
   toolbar._workspace = o._worksapce;
   toolbar.buildDefine(p);
   frame.push(toolbar);
   var frame = o._canvasContentFrame = o.searchControl('canvasContentFrame');
   var canvas = o._canvasContent = RClass.create(FDsShareBitmapCanvasContent);
   canvas._frameSet = o;
   canvas._workspace = o._workspace;
   canvas._toolbar = o._canvasToolbar;
   canvas._hParent = frame._hPanel;
   canvas._hParent.style.backgroundColor = '#333333';
   canvas._hParent.style.scroll = 'auto';
   canvas.build(p);
   frame.push(canvas);
   var frame = o._propertyToolbarFrame = o.searchControl('propertyToolbarFrame');
   frame._hPanel.className = o.styleName('ToolBar_Ground');
   var toolbar = o._propertyToolbar = RClass.create(FDsShareBitmapPropertyToolBar);
   toolbar._frameSet = o;
   toolbar._workspace = o._worksapce;
   toolbar.buildDefine(p);
   frame.push(toolbar);
}
function FDsShareBitmapFrameSet_onCatalogSelected(p, pc){
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
function FDsShareBitmapMenuBar(o){
   o = RClass.inherits(this, o, FUiMenuBar);
   o._frameName            = 'resource.share.bitmap.MenuBar';
   o._controlSaveButton    = null;
   o._controlCaptureButton = null;
   o.onBuilded             = FDsShareBitmapMenuBar_onBuilded;
   o.onSaveLoad            = FDsShareBitmapMenuBar_onSaveLoad;
   o.onSaveClick           = FDsShareBitmapMenuBar_onSaveClick;
   o.onCaptureLoad         = FDsShareBitmapMenuBar_onCaptureLoad;
   o.onCaptureClick        = FDsShareBitmapMenuBar_onCaptureClick;
   o.construct             = FDsShareBitmapMenuBar_construct;
   o.dispose               = FDsShareBitmapMenuBar_dispose;
   return o;
}
function FDsShareBitmapMenuBar_onBuilded(p){
   var o = this;
   o.__base.FUiMenuBar.onBuilded.call(o, p);
   o._controlSaveButton.addClickListener(o, o.onSaveClick);
   o._controlImportButton.addClickListener(o, o.onCaptureClick);
}
function FDsShareBitmapMenuBar_onSaveLoad(event){
   RConsole.find(FUiDesktopConsole).hide();
}
function FDsShareBitmapMenuBar_onSaveClick(p){
   var o = this;
   var space = o._frameSet._activeSpace;
   var resource = space.resource();
   RConsole.find(FUiDesktopConsole).showUploading();
   var xconfig = new TXmlNode();
   resource.saveConfig(xconfig);
   var connection = RConsole.find(FE3sMeshConsole).update(xconfig);
   connection.addLoadListener(o, o.onSaveLoad);
}
function FDsShareBitmapMenuBar_onCaptureLoad(event){
   RConsole.find(FUiDesktopConsole).hide();
}
function FDsShareBitmapMenuBar_onCaptureClick(event){
   var o = this;
   RConsole.find(FUiDesktopConsole).showUploading();
   var connection = o._frameSet._canvas.capture();
   connection.addLoadListener(o, o.onCaptureLoad);
}
function FDsShareBitmapMenuBar_construct(){
   var o = this;
   o.__base.FUiMenuBar.construct.call(o);
}
function FDsShareBitmapMenuBar_dispose(){
   var o = this;
   o.__base.FUiMenuBar.dispose.call(o);
}
function FDsShareBitmapPropertyToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   o._frameName                 = 'resource.share.bitmap.CatalogToolBar';
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
   o.onBuilded                  = FDsShareBitmapPropertyToolBar_onBuilded;
   o.onModeClick                = FDsShareBitmapPropertyToolBar_onModeClick;
   o.onSizeClick                = FDsShareBitmapPropertyToolBar_onSizeClick;
   o.onRotationChange           = FDsShareBitmapPropertyToolBar_onRotationChange;
   o.onRotationAutoClick        = FDsShareBitmapPropertyToolBar_onRotationAutoClick;
   o.onRotationClick            = FDsShareBitmapPropertyToolBar_onRotationClick;
   o.construct                  = FDsShareBitmapPropertyToolBar_construct;
   o.dispose                    = FDsShareBitmapPropertyToolBar_dispose;
   return o;
}
function FDsShareBitmapPropertyToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
}
function FDsShareBitmapPropertyToolBar_onModeClick(p){
   var o = this;
}
function FDsShareBitmapPropertyToolBar_onSizeClick(event){
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
function FDsShareBitmapPropertyToolBar_onRotationChange(event){
   var o = this;
   var canvas = o._frameSet._canvas;
   var visible = o._controlRotationVisible.isCheck();
   var width = RInteger.parse(o._controlRotationWidth.text());
   var height = RInteger.parse(o._controlRotationHeight.text());
   canvas.switchRotation(visible, width, height);
}
function FDsShareBitmapPropertyToolBar_onRotationAutoClick(event){
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
function FDsShareBitmapPropertyToolBar_onRotationClick(event, v){
   var o = this;
   var button = event.sender;
   var canvas = o._frameSet._canvas;
   canvas.switchRotation(button.isCheck());
}
function FDsShareBitmapPropertyToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsShareBitmapPropertyToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsShareBitmapWorkspace(o){
   o = RClass.inherits(this, o, FUiWorkspace);
   o._frameName            = 'resource.share.bitmap.Workspace';
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
   o.onBuilded             = FDsShareBitmapWorkspace_onBuilded;
   o.onMeshLoad            = FDsShareBitmapWorkspace_onMeshLoad;
   o.onCatalogSelected     = FDsShareBitmapWorkspace_onCatalogSelected;
   o.construct             = FDsShareBitmapWorkspace_construct;
   o.findPropertyFrame     = FDsShareBitmapWorkspace_findPropertyFrame;
   o.loadByGuid            = FDsShareBitmapWorkspace_loadByGuid;
   o.loadByCode            = FDsShareBitmapWorkspace_loadByCode;
   o.dispose               = FDsShareBitmapWorkspace_dispose;
   return o;
}
function FDsShareBitmapWorkspace_onBuilded(p){
   var o = this;
   o.__base.FUiWorkspace.onBuilded.call(o, p);
   var frame = o._frameToolBar = o.searchControl('toolbarFrame');
   frame._hPanel.className = o.styleName('Toolbar_Ground');
   var frame = o._frameBody = o.searchControl('bodyFrame');
   frame._hPanel.className = o.styleName('Body_Ground');
   var frame = o._frameStatusBar = o.searchControl('statusFrame');
   frame._hPanel.className = o.styleName('Statusbar_Ground');
   var menuBar = o._menuBar = RClass.create(FDsShareBitmapMenuBar);
   menuBar._workspace = o;
   menuBar.buildDefine(p);
   o._frameToolBar.push(menuBar);
   var frameSet = o._frameSet = RClass.create(FDsShareBitmapFrameSet);
   frameSet._workspace = o;
   frameSet.buildDefine(p);
   o._frameBody.push(frameSet);
   menuBar._frameSet = frameSet;
}
function FDsShareBitmapWorkspace_onMeshLoad(p){
   var o = this;
   o._activeSpace = p._activeSpace;
   o._catalog.buildSpace(o._activeSpace);
}
function FDsShareBitmapWorkspace_onCatalogSelected(p, pc){
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
function FDsShareBitmapWorkspace_construct(){
   var o = this;
   o.__base.FUiWorkspace.construct.call(o);
   o._propertyFrames = new TDictionary();
}
function FDsShareBitmapWorkspace_findPropertyFrame(p){
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
function FDsShareBitmapWorkspace_loadByGuid(guid){
   this._frameSet.loadByGuid(guid);
}
function FDsShareBitmapWorkspace_loadByCode(code){
   this._frameSet.loadByCode(code);
}
function FDsShareBitmapWorkspace_dispose(){
   var o = this;
   o.__base.FUiWorkspace.dispose.call(o);
   o._propertyFrames.dispose();
   o._propertyFrames = null;
}
