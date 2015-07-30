MO.EDsCanvasDrag = new function EDsCanvasDrag(){
   var o = this;
   o.Unknown = 0;
   o.X       = 1;
   o.Y       = 2;
   o.Z       = 3;
   o.All     = 4;
   return o;
}
MO.EDsCanvasMode = new function EDsCanvasMode(){
   var o = this;
   o.Unknown   = 0;
   o.Drop      = 1;
   o.Select    = 2;
   o.Translate = 3;
   o.Rotation  = 4;
   o.Scale     = 5;
   return o;
}
MO.EDsFrame = new function EDsFrame(){
   var o = this;
   o.CommonSpacePropertyFrame      = 'resource.common.property.SpaceFrame';
   o.CommonTechniquePropertyFrame  = 'resource.common.property.TechniqueFrame';
   o.CommonRegionPropertyFrame     = 'resource.common.property.RegionFrame';
   o.CommonCameraPropertyFrame     = 'resource.common.property.CameraFrame';
   o.CommonLightPropertyFrame      = 'resource.common.property.LightFrame';
   o.CommonMaterialPropertyFrame   = 'resource.common.property.MaterialFrame';
   o.CommonLayerPropertyFrame      = 'resource.common.property.LayerFrame';
   o.CommonDisplayPropertyFrame    = 'resource.common.property.DisplayFrame';
   o.CommonAnimationPropertyFrame  = 'resource.common.property.AnimationFrame';
   o.CommonMoviePropertyFrame      = 'resource.common.property.MovieFrame';
   o.CommonRenderablePropertyFrame = 'resource.common.property.RenderableFrame';
   o.SolutionProjectPropertyFrame  = 'resource.solution.property.ProjectFrame';
   o.ResourcePropertyFrame         = 'resource.resource.property.SpaceFrame';
   o.BitmapPropertyFrame           = 'resource.bitmap.property.Frame';
   o.MaterialPropertyFrame         = 'resource.material.property.Frame';
   o.MeshSpacePropertyFrame        = 'resource.mesh.property.SpaceFrame';
   o.MeshLayerPropertyFrame        = 'resource.mesh.property.LayerFrame';
   o.MeshDisplayPropertyFrame      = 'resource.mesh.property.DisplayFrame';
   o.MeshRenderablePropertyFrame   = 'resource.mesh.property.RenderableFrame';
   o.ModelSpacePropertyFrame       = 'resource.model.property.SpaceFrame';
   o.ModelLayerPropertyFrame       = 'resource.model.property.LayerFrame';
   o.ModelDisplayPropertyFrame     = 'resource.model.property.DisplayFrame';
   o.ModelRenderablePropertyFrame  = 'resource.model.property.RenderableFrame';
   o.SceneSpacePropertyFrame       = 'resource.scene.property.SpaceFrame';
   o.SceneDisplayPropertyFrame     = 'resource.scene.property.DisplayFrame';
   o.SceneMoviePropertyFrame       = 'resource.scene.property.MovieFrame';
   o.SceneRenderablePropertyFrame  = 'resource.scene.property.RenderableFrame';
   return o;
}
MO.EDsFrameSet = new function EDsFrameSet(){
   var o = this;
   o.PrivateSolutionFrameSet         = 'resource.private.solution.FrameSet';
   o.PrivateProjectFrameSet          = 'resource.private.project.FrameSet';
   o.PrivateResourceFrameSet         = 'resource.private.resource.FrameSet';
   o.PrivateBitmapFrameSet           = 'resource.private.bitmap.FrameSet';
   o.PrivateMaterialFrameSet         = 'resource.private.material.FrameSet';
   o.PrivateModelFrameSet            = 'resource.private.model.FrameSet';
   o.PrivateTemplateFrameSet         = 'resource.private.template.FrameSet';
   o.PrivateSceneFrameSet            = 'resource.private.scene.FrameSet';
   o.ShareResourceFrameSet           = 'resource.share.resource.FrameSet';
   o.ShareBitmapFrameSet             = 'resource.share.bitmap.FrameSet';
   o.ShareMaterialFrameSet           = 'resource.share.material.FrameSet';
   o.ShareModelFrameSet              = 'resource.share.model.FrameSet';
   o.ShareTemplateFrameSet           = 'resource.share.template.FrameSet';
   o.ShareSceneFrameSet              = 'resource.share.scene.FrameSet';
   o.SystemDesignPersistenceFrameSet = 'system.design.persistence.FrameSet';
   o.SystemDesignListFrameSet        = 'system.design.list.FrameSet';
   o.SystemDesignTreeFrameSet        = 'system.design.tree.FrameSet';
   o.SystemDesignFrameFrameSet       = 'system.design.frame.FrameSet';
   return o;
}
with(MO){
   MO.MDsBoundBox = function MDsBoundBox(o){
      o = RClass.inherits(this, o);
      o._boundVisible = false;
      o._boundBox     = null;
      o.boundBox      = MDsBoundBox_boundBox;
      o.showBoundBox  = MDsBoundBox_showBoundBox;
      o.hideBoundBox  = MDsBoundBox_hideBoundBox;
      return o;
   }
   MO.MDsBoundBox_boundBox = function MDsBoundBox_boundBox(){
      var o = this;
      var boundBox = o._boundBox;
      if(!boundBox){
         boundBox = o._boundBox = RClass.create(FE3dBoundBox);
         boundBox.linkGraphicContext(o);
         boundBox._drawable = o;
         boundBox._parent = o;
         boundBox.setup();
      }
      return boundBox;
   }
   MO.MDsBoundBox_showBoundBox = function MDsBoundBox_showBoundBox(){
      var o = this;
      var boundBox = o.boundBox();
      var resource = o.resource();
      var meshResource = resource.mesh();
      var outline = meshResource.outline();
      boundBox.outline().assign(outline);
      boundBox.upload();
      o._boundVisible = true;
   }
   MO.MDsBoundBox_hideBoundBox = function MDsBoundBox_hideBoundBox(){
      var o = this;
      var boundBox = o._boundBox;
      o._boundVisible = false;
   }
}
with(MO){
   MO.FDsApplication = function FDsApplication(o){
      o = RClass.inherits(this, o, FObject);
      o._name             = null;
      o._matrix           = null;
      o._location         = null;
      o._rotation         = null;
      o._scale            = null;
      o._visible          = true;
      o._renderables      = null;
      o.construct         = FDsApplication_construct;
      o.isName            = FDsApplication_isName;
      o.name              = FDsApplication_name;
      o.matrix            = FDsApplication_matrix;
      o.location          = FDsApplication_location;
      o.rotation          = FDsApplication_rotation;
      o.scale             = FDsApplication_scale;
      o.hasRenderable     = FDsApplication_hasRenderable;
      o.filterRenderables = FDsApplication_filterRenderables;
      o.renderables       = FDsApplication_renderables;
      o.pushRenderable    = FDsApplication_pushRenderable;
      o.process           = FDsApplication_process;
      o.update            = FDsApplication_update;
      o.dispose           = FDsApplication_dispose;
      return o;
   }
   MO.FDsApplication_construct = function FDsApplication_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._matrix = new SMatrix3d();
      o._location = new SPoint3();
      o._rotation = new SVector3();
      o._scale = new SVector3();
      o._scale.set(1, 1, 1);
   }
   MO.FDsApplication_isName = function FDsApplication_isName(p){
      return this._name == p;
   }
   MO.FDsApplication_name = function FDsApplication_name(){
      return this._name;
   }
   MO.FDsApplication_matrix = function FDsApplication_matrix(){
      return this._matrix;
   }
   MO.FDsApplication_location = function FDsApplication_location(){
      return this._location;
   }
   MO.FDsApplication_rotation = function FDsApplication_rotation(){
      return this._rotation;
   }
   MO.FDsApplication_scale = function FDsApplication_scale(){
      return this._scale;
   }
   MO.FDsApplication_hasRenderable = function FDsApplication_hasRenderable(){
      var r = this._renderables;
      if(r != null){
         return !r.isEmpty();
      }
      return false;
   }
   MO.FDsApplication_filterRenderables = function FDsApplication_filterRenderables(p){
      var o = this;
      if(!o._visible){
         return false;
      }
      var rs = o._renderables;
      if(rs != null){
         var c = rs.count();
         for(var n = 0; n < c; n++){
            var r = rs.get(n);
            if(r.testVisible()){
               p.pushRenderable(r);
            }
         }
      }
      return true;
   }
   MO.FDsApplication_renderables = function FDsApplication_renderables(){
      var o = this;
      var r = o._renderables;
      if(r == null){
         r = o._renderables = new TObjects();
      }
      return r;
   }
   MO.FDsApplication_pushRenderable = function FDsApplication_pushRenderable(p){
      this.renderables().push(p);
   }
   MO.FDsApplication_update = function FDsApplication_update(){
      var o = this;
      var m = o._matrix;
      m.set(o._location, o._rotation, o._scale);
      m.update();
   }
   MO.FDsApplication_process = function FDsApplication_process(){
      var o = this;
      var rs = o._renderables;
      if(rs != null){
         var c = rs.count();
         for(var i = 0; i < c; i++){
            rs.get(i).process();
         }
      }
   }
   MO.FDsApplication_dispose = function FDsApplication_dispose(){
      var o = this;
      o._matrix = null;
      o._position = null;
      o._direction = null;
      o._scale = null;
      var rs = o._renderables;
      if(rs != null){
         rs.dispose();
         o._renderables = null
      }
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FDsBitmapCanvas = function FDsBitmapCanvas(o){
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
      o.onBuild              = FDsBitmapCanvas_onBuild;
      o.onMouseCaptureStart  = FDsBitmapCanvas_onMouseCaptureStart;
      o.onMouseCapture       = FDsBitmapCanvas_onMouseCapture;
      o.onMouseCaptureStop   = FDsBitmapCanvas_onMouseCaptureStop;
      o.onMouseWheel         = FDsBitmapCanvas_onMouseWheel;
      o.onLoaded             = FDsBitmapCanvas_onLoaded;
      o.oeResize             = FDsBitmapCanvas_oeResize;
      o.oeRefresh            = FDsBitmapCanvas_oeRefresh;
      o.construct            = FDsBitmapCanvas_construct;
      o.loadByGuid           = FDsBitmapCanvas_loadByGuid;
      o.dispose              = FDsBitmapCanvas_dispose;
      return o;
   }
   MO.FDsBitmapCanvas_onBuild = function FDsBitmapCanvas_onBuild(p){
      var o = this;
      o.__base.FDsCanvas.onBuild.call(o, p);
      var hPanel = o._hPanel;
      var space = o._activeSpace = RClass.create(FE3dFlatStage);
      space.linkGraphicContext(o);
      space.selectTechnique(o, FE3dGeneralTechnique);
      space.region().backgroundColor().set(1, 1, 1, 1);
      space.region().linkGraphicContext(o);
      RStage.register('space.bitmap', space);
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
   MO.FDsBitmapCanvas_onMouseCaptureStart = function FDsBitmapCanvas_onMouseCaptureStart(event){
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
   MO.FDsBitmapCanvas_onMouseCapture = function FDsBitmapCanvas_onMouseCapture(event){
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
   MO.FDsBitmapCanvas_onMouseCaptureStop = function FDsBitmapCanvas_onMouseCaptureStop(event){
      var o = this;
      RHtml.cursorSet(o._hPanel, EUiCursor.Auto);
   }
   MO.FDsBitmapCanvas_onMouseWheel = function FDsBitmapCanvas_onMouseWheel(event){
      var o = this;
      var bitmap = o._activeBitmap;
      if(!bitmap){
         return;
      }
      var scale = 1.0;
      if(event.deltaY < 0){
         scale = 1.1;
      }else if(event.deltaY > 0){
         scale = 0.9;
      }
      var matrix = bitmap.matrix();
      matrix.sx *= scale;
      matrix.sy *= scale;
      matrix.updateForce();
   }
   MO.FDsBitmapCanvas_onLoaded = function FDsBitmapCanvas_onLoaded(event){
      var o = this;
      RConsole.find(FDuiDesktopConsole).hide();
   }
   MO.FDsBitmapCanvas_oeResize = function FDsBitmapCanvas_oeResize(event){
      var o = this;
      o.__base.FDsCanvas.oeResize.call(o, event);
      return EEventStatus.Stop;
   }
   MO.FDsBitmapCanvas_oeRefresh = function FDsBitmapCanvas_oeRefresh(p){
      return EEventStatus.Stop;
   }
   MO.FDsBitmapCanvas_construct = function FDsBitmapCanvas_construct(){
      var o = this;
      o.__base.FDsCanvas.construct.call(o);
      o._captureMatrix = new SMatrix3d();
   }
   MO.FDsBitmapCanvas_loadByGuid = function FDsBitmapCanvas_loadByGuid(guid){
      var o = this;
      var size = o._graphicContext.size();
      RConsole.find(FDuiDesktopConsole).showLoading();
      var resource = o._activeResource = RConsole.find(FDrBitmapConsole).query(guid);
      var url = '/cloud.resource.bitmap.wv?do=view&guid=' + guid;
      var bitmap = o._activeBitmap = RConsole.find(FE3dBitmapConsole).loadByGuid(o, guid);
      bitmap.material().info().effectCode = 'flat';
      bitmap.setLoadListener(o, o.onLoaded);
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
   MO.FDsBitmapCanvas_dispose = function FDsBitmapCanvas_dispose(){
      var o = this;
      o.__base.FDsCanvas.dispose.call(o);
   }
}
MO.FDsCanvas = function FDsCanvas(o){
   o = MO.Class.inherits(this, o, MO.FDuiCanvas, MO.MGraphicObject, MO.MListenerLoad, MO.MMouseCapture);
   o._servicePreview      = 'cloud.resource.preview';
   o._resourceTypeCd      = null;
   o._optionRotation      = false;
   o._activeSpace         = null;
   o._canvasModeCd        = MO.EDsCanvasMode.Drop;
   o._canvasMoveCd        = MO.EDsCanvasDrag.Unknown;
   o._switchWidth         = '*';
   o._switchHeight        = '*';
   o._capturePosition     = null;
   o._captureMatrix       = null;
   o._captureRotation     = null;
   o._cameraMoveRate      = 8;
   o._cameraKeyRotation   = 3;
   o._cameraMouseRotation = 0.005;
   o._dimensional         = null;
   o._rotation            = null;
   o.onBuild              = MO.FDsCanvas_onBuild;
   o.onMouseCaptureStart  = MO.FDsCanvas_onMouseCaptureStart;
   o.onMouseCapture       = MO.FDsCanvas_onMouseCapture;
   o.onMouseCaptureStop   = MO.FDsCanvas_onMouseCaptureStop;
   o.onEnterFrame         = MO.FDsCanvas_onEnterFrame;
   o.oeResize             = MO.FDsCanvas_oeResize;
   o.oeRefresh            = MO.FDsCanvas_oeRefresh;
   o.construct            = MO.FDsCanvas_construct;
   o.activeSpace          = MO.FDsCanvas_activeSpace;
   o.switchSize           = MO.FDsCanvas_switchSize;
   o.switchRotation       = MO.FDsCanvas_switchRotation;
   o.reloadRegion         = MO.FDsCanvas_reloadRegion;
   o.capture              = MO.FDsCanvas_capture;
   o.dispose              = MO.FDsCanvas_dispose;
   return o;
}
MO.FDsCanvas_onBuild = function FDsCanvas_onBuild(event){
   var o = this;
   o.__base.FDuiCanvas.onBuild.call(o, event);
   var hPanel = o._hPanel;
   hPanel.__linker = o;
   hPanel.style.width = '100%';
   hPanel.style.height = '100%';
   var parameters = new Object();
   parameters.alpha = false;
   parameters.antialias = true;
   var context = o._graphicContext = MO.REngine3d.createContext(MO.FWglContext, hPanel, parameters);
   var dimensional = o._dimensional = MO.Class.create(MO.FE3dDimensional);
   dimensional.linkGraphicContext(context);
   dimensional.setup();
   MO.RStage.lsnsEnterFrame.register(o, o.onEnterFrame);
   MO.RStage.start(1000 / 60);
   MO.Console.find(MO.FMouseConsole).register(o);
}
MO.FDsCanvas_onMouseCaptureStart = function FDsCanvas_onMouseCaptureStart(event){
   var o = this;
   var space = o._activeSpace;
   if(!space){
      return;
   }
   var camera = space.camera();
   o._capturePosition.set(event.clientX, event.clientY);
   o._captureRotation.assign(camera._rotation);
   MO.RHtml.cursorSet(o._hPanel, MO.EUiCursor.Pointer);
}
MO.FDsCanvas_onMouseCapture = function FDsCanvas_onMouseCapture(event){
   var o = this;
   var space = o._activeSpace;
   if(!space){
      return;
   }
   var camera = space.camera();
   var cx = event.clientX - o._capturePosition.x;
   var cy = event.clientY - o._capturePosition.y;
   var mc = o._canvasModeCd;
   var toolbar = o._frameSet._canvasToolBar;
   switch(toolbar._canvasModeCd){
      case EDsCanvasMode.Drop:
         var rotation = camera.rotation();
         var captureRotation = o._captureRotation;
         rotation.x = captureRotation.x - cy * o._cameraMouseRotation;
         rotation.y = captureRotation.y - cx * o._cameraMouseRotation;
         break;
      case EDsCanvasMode.Select:
         break;
      case EDsCanvasMode.Translate:
         break;
      case EDsCanvasMode.Rotation:
         break;
      case EDsCanvasMode.Scale:
         break;
   }
}
MO.FDsCanvas_onMouseCaptureStop = function FDsCanvas_onMouseCaptureStop(event){
   var o = this;
   MO.RHtml.cursorSet(o._hPanel, EUiCursor.Auto);
}
MO.FDsCanvas_onEnterFrame = function FDsCanvas_onEnterFrame(){
   var o = this;
   var space = o._activeSpace;
   if(!space){
      return;
   }
   var camera = space.camera();
   var timer = space.timer();
   var span = timer.spanSecond();
   var moveRate = o._cameraMoveRate * span;
   var rotationRate = o._cameraKeyRotation * span;
   var keyForward = MO.Window.Keyboard.isPress(MO.EStageKey.Forward);
   var keyBack = MO.Window.Keyboard.isPress(MO.EStageKey.Back);
   if(keyForward && !keyBack){
      camera.doWalk(moveRate);
   }
   if(!keyForward && keyBack){
      camera.doWalk(-moveRate);
   }
   var keyUp = MO.Window.Keyboard.isPress(MO.EStageKey.Up);
   var keyDown = MO.Window.Keyboard.isPress(MO.EStageKey.Down);
   if(keyUp && !keyDown){
      camera.doFly(moveRate);
   }
   if(!keyUp && keyDown){
      camera.doFly(-moveRate);
   }
   var keyRleft = MO.Window.Keyboard.isPress(MO.EStageKey.RotationLeft);
   var keyRright = MO.Window.Keyboard.isPress(MO.EStageKey.RotationRight);
   if(keyRleft && !keyRright){
      camera.doYaw(rotationRate);
   }
   if(!keyRleft && keyRright){
      camera.doYaw(-rotationRate);
   }
   var keyRup = MO.Window.Keyboard.isPress(MO.EStageKey.RotationUp);
   var keyDown = MO.Window.Keyboard.isPress(MO.EStageKey.RotationDown);
   if(keyRup && !keyDown){
      camera.doPitch(rotationRate);
   }
   if(!keyRup && keyDown){
      camera.doPitch(-rotationRate);
   }
   camera.update();
   if(o._optionRotation){
      var rotation = o._rotation;
      var layers = space.layers();
      var count = layers.count();
      for(var i = 0; i < count; i++){
         var layer = layers.at(i);
         var matrix = layer.matrix();
         matrix.setRotation(0, rotation.y, 0);
         matrix.update();
      }
      rotation.y += 0.01;
   }
}
MO.FDsCanvas_oeResize = function FDsCanvas_oeResize(p){
   var o = this;
   o.__base.FDuiCanvas.oeResize.call(o, p);
   var hp = o._hPanel;
   var w = hp.offsetWidth;
   var h = hp.offsetHeight - 6;
   hp.width = w;
   hp.height = h;
   o._graphicContext.setViewport(0, 0, w, h);
   return MO.EEventStatus.Stop;
}
MO.FDsCanvas_oeRefresh = function FDsCanvas_oeRefresh(p){
   return MO.EEventStatus.Stop;
}
MO.FDsCanvas_construct = function FDsCanvas_construct(){
   var o = this;
   o.__base.FDuiCanvas.construct.call(o);
   o._capturePosition = new MO.SPoint2();
   o._captureMatrix = new MO.SMatrix3d();
   o._rotation = new MO.SVector3();
   o._captureRotation = new MO.SVector3();
}
MO.FDsCanvas_activeSpace = function FDsCanvas_activeSpace(){
   return this._activeSpace;
}
MO.FDsCanvas_switchSize = function FDsCanvas_switchSize(width, height){
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
MO.FDsCanvas_switchRotation = function FDsCanvas_switchRotation(flag){
   this._optionRotation = flag;
}
MO.FDsCanvas_reloadRegion = function FDsCanvas_reloadRegion(){
   var o = this;
   var space = o._activeSpace;
   var region = space.region();
   var resource = region.resource();
   o._cameraMoveRate = resource.moveSpeed();
   o._cameraKeyRotation = resource.rotationKeySpeed();
   o._cameraMouseRotation = resource.rotationMouseSpeed();
}
MO.FDsCanvas_capture = function FDsCanvas_capture(){
   var o = this;
   var space = o._activeSpace;
   var resource = space.resource();
   var guid = resource.guid();
   var switchWidth = o._switchWidth;
   var switchHeight = o._switchHeight;
   o.switchSize(200, 150);
   MO.RStage.process();
   var context = o._graphicContext;
   var size = context.size();
   var width = size.width;
   var height = size.height;
   var data = context.readPixels(0, 0, width, height);
   o.switchSize(switchWidth, switchHeight);
   MO.RStage.process();
   var url = '/' + o._servicePreview + '.wv?do=upload&type_cd=' + o._resourceTypeCd + '&guid=' + guid + '&width=' + width + '&height=' + height;
   return MO.Console.find(MO.FHttpConsole).send(url, data.buffer);
}
MO.FDsCanvas_dispose = function FDsCanvas_dispose(){
   var o = this;
   o._rotation = MO.Lang.Object.dispose(o._rotation);
   o.__base.FDuiCanvas.dispose.call(o);
}
with(MO){
   MO.FDsCatalog = function FDsCatalog(o){
      o = RClass.inherits(this, o, FUiDataTreeView, MListenerSelected);
      o._iconView             = 'resource.scene.view';
      o._iconViewNot          = 'resource.scene.viewno';
      o._displayNodes         = null;
      o._renderableNodes      = null;
      o._materialNodes        = null;
      o.onBuild               = FDsCatalog_onBuild;
      o.onLoadDisplay         = FDsCatalog_onLoadDisplay;
      o.onNodeClick           = FDsCatalog_onNodeClick;
      o.onNodeViewClick       = FDsCatalog_onNodeViewClick;
      o.onNodeViewDoubleClick = FDsCatalog_onNodeViewDoubleClick;
      o.construct             = FDsCatalog_construct;
      o.buildNodeView         = FDsCatalog_buildNodeView;
      o.buildTechnique        = FDsCatalog_buildTechnique;
      o.buildRegion           = FDsCatalog_buildRegion;
      o.buildRenderable       = FDsCatalog_buildRenderable;
      o.buildDisplay          = FDsCatalog_buildDisplay;
      o.buildLayer            = FDsCatalog_buildLayer;
      o.buildSpace            = FDsCatalog_buildSpace;
      o.selectObject          = FDsCatalog_selectObject;
      o.showObject            = FDsCatalog_showObject;
      o.dispose               = FDsCatalog_dispose;
      return o;
   }
   MO.FDsCatalog_onBuild = function FDsCatalog_onBuild(p){
      var o = this;
      o.__base.FUiDataTreeView.onBuild.call(o, p);
      o.addNodeClickListener(o, o.onNodeClick);
   }
   MO.FDsCatalog_onLoadDisplay = function FDsCatalog_onLoadDisplay(p){
      var o = this;
      var n = p._linkNode;
      o.buildRenderable(n, p);
   }
   MO.FDsCatalog_onNodeClick = function FDsCatalog_onNodeClick(event){
      var o = this;
      var node = event.node;
      var linker = node.dataPropertyGet('linker');
      if(linker){
         o.selectObject(linker);
      }
   }
   MO.FDsCatalog_onNodeViewClick = function FDsCatalog_onNodeViewClick(event){
      var o = this;
      var cell = event.treeNodeCell;
      var linker = event.treeNode.dataPropertyGet('linker');
      if(RClass.isClass(linker, FDisplay)){
         if(event.ctrlKey){
            var displayNodes = o._displayNodes;
            var displayCount = displayNodes.count()
            for(var i = 0; i < displayCount; i++){
               var displayNode = displayNodes.at(i);
               var display = displayNode.dataPropertyGet('linker');
               display._visible = false;
               displayNode.cell('view').setIcon(o._iconViewNot);
            }
            linker.setVisible(true);
            cell.setIcon(o._iconView);
         }else{
            linker.setVisible(!linker.visible());
            cell.setIcon(linker.visible() ? o._iconView : o._iconViewNot);
         }
      }
      if(RClass.isClass(linker, FDrawable)){
         if(event.ctrlKey){
            var renderableNodes = o._renderableNodes;
            var renderableCount = renderableNodes.count();
            for(var i = 0; i < renderableCount; i++){
               var renderableNode = renderableNodes.at(i);
               var renderable = renderableNode.dataPropertyGet('linker');
               renderable._visible = false;
               renderableNode.cell('view').setIcon(o._iconViewNot);
            }
            linker.setVisible(true);
            cell.setIcon(o._iconView);
         }else{
            linker.setVisible(!linker.visible());
            cell.setIcon(linker.visible() ? o._iconView : o._iconViewNot);
         }
      }
      if(RClass.isClass(linker, FG3dMaterial)){
         if(event.ctrlKey){
            var materialNodes = o._materialNodes;
            var materialCount = materialNodes.count();
            for(var i = 0; i < materialCount; i++){
               var materialNode = materialNodes.at(i);
               var material = materialNode.dataPropertyGet('linker');
               material.setVisible(false);
               materialNode.cell('view').setIcon(o._iconViewNot);
            }
            linker.setVisible(true);
            cell.setIcon(o._iconView);
         }else{
            linker.setVisible(!linker.visible());
            cell.setIcon(linker.visible() ? o._iconView : o._iconViewNot);
         }
      }
   }
   MO.FDsCatalog_onNodeViewDoubleClick = function FDsCatalog_onNodeViewDoubleClick(event){
      var o = this;
      var node = event.treeNode;
      var linker = node.dataPropertyGet('linker');
      if(RClass.isClass(linker, FDisplay)){
         var displayNodes = o._displayNodes;
         var displayCount = displayNodes.count()
         for(var i = 0; i < displayCount; i++){
            var displayNode = displayNodes.at(i);
            var display = displayNode.dataPropertyGet('linker');
            display.setVisible(true);
            displayNode.cell('view').setIcon(o._iconView);
         }
      }
      if(RClass.isClass(linker, FDrawable)){
         var renderableNodes = o._renderableNodes;
         var renderableCount = renderableNodes.count();
         for(var i = 0; i < renderableCount; i++){
            var renderableNode = renderableNodes.at(i);
            var renderable = renderableNode.dataPropertyGet('linker');
            renderable.setVisible(true);
            renderableNode.cell('view').setIcon(o._iconView);
         }
      }
      if(RClass.isClass(linker, FG3dMaterial)){
         var materialNodes = o._materialNodes;
         var materialCount = materialNodes.count();
         for(var i = 0; i < materialCount; i++){
            var materialNode = materialNodes.at(i);
            var material = materialNode.dataPropertyGet('linker');
            material.setVisible(true);
            materialNode.cell('view').setIcon(o._iconView);
         }
      }
   }
   MO.FDsCatalog_construct = function FDsCatalog_construct(){
      var o = this;
      o.__base.FUiDataTreeView.construct.call(o);
      o._displayNodes = new TObjects();
      o._renderableNodes = new TObjects();
      o._materialNodes = new TObjects();
   }
   MO.FDsCatalog_buildNodeView = function FDsCatalog_buildNodeView(pn, pv){
      var o = this;
      var c = pn.cell('view');
      c.setIcon(o._iconView);
      c.addClickListener(o, o.onNodeViewClick);
      c.addDoubleClickListener(o, o.onNodeViewDoubleClick);
   }
   MO.FDsCatalog_buildTechnique = function FDsCatalog_buildTechnique(parentNode, technique){
      var o = this;
      var node = o.createNode();
      node.setTypeCode('technique');
      node.setLabel('Technique');
      node.dataPropertySet('linker', technique);
      parentNode.appendNode(node);
   }
   MO.FDsCatalog_buildRegion = function FDsCatalog_buildRegion(parentNode, region){
      var o = this;
      var regionNode = o.createNode();
      regionNode.setTypeCode('Region');
      regionNode.setLabel('Region');
      regionNode.dataPropertySet('linker', region);
      parentNode.appendNode(regionNode);
      var cameraNode = o.createNode();
      cameraNode.setTypeCode('Camera');
      cameraNode.setLabel('Camera');
      cameraNode.dataPropertySet('linker', region.camera());
      regionNode.appendNode(cameraNode);
      var lightNode = o.createNode();
      lightNode.setTypeCode('Light');
      lightNode.setLabel('Light');
      lightNode.dataPropertySet('linker', region.directionalLight());
      regionNode.appendNode(lightNode);
   }
   MO.FDsCatalog_buildRenderable = function FDsCatalog_buildRenderable(n, p){
      var o = this;
      var s = p.materials();
      if(s){
         var c = s.count();
         for(var i = 0; i < c; i++){
            var m = s.value(i);
            var mr = m.resource();
            var dn = o.createNode();
            dn.setLabel(mr.code());
            dn.setNote(mr.label());
            dn.setTypeCode('material');
            dn.dataPropertySet('linker', m);
            o.buildNodeView(dn, true);
            o._materialNodes.push(dn);
            n.appendNode(dn);
         }
      }
      var s = p.animations();
      if(s){
         var c = s.count();
         for(var i = 0; i < c; i++){
            var m = s.value(i);
            var mr = m.resource();
            var dn = o.createNode();
            dn.setLabel(mr.code());
            dn.setNote(mr.label());
            dn.setTypeCode('animation');
            dn.dataPropertySet('linker', m);
            o.buildNodeView(dn, true);
            n.appendNode(dn);
         }
      }
      var s = p.meshRenderables();
      if(s){
         var c = s.count();
         for(var i = 0; i < c; i++){
            var r = s.get(i);
            var rr = r.resource();
            var rd = rr.model();
            var rm = rr.mesh();
            var dn = o.createNode();
            dn.setLabel(rm.code());
            dn.setTypeCode('renderable');
            dn.dataPropertySet('linker', r);
            o.buildNodeView(dn, true);
            o._renderableNodes.push(dn);
            n.appendNode(dn);
         }
      }
   }
   MO.FDsCatalog_buildDisplay = function FDsCatalog_buildDisplay(n, p){
      var o = this;
      var s = p.displays();
      if(s){
         var c = s.count();
         for(var i = 0; i < c; i++){
            var d = s.get(i);
            var dr = d.resourceScene();
            var dn = o.createNode();
            dn.setLabel(dr.code());
            dn.setNote(dr.label());
            dn.setTypeCode('display');
            dn.dataPropertySet('linker', d);
            o.buildNodeView(dn, true);
            o._displayNodes.push(dn);
            n.appendNode(dn);
            d.addLoadListener(o, o.onLoadDisplay);
            d._linkNode = dn;
         }
      }
   }
   MO.FDsCatalog_buildLayer = function FDsCatalog_buildLayer(n, p){
      var o = this;
      var ns = o.createNode();
      ns.setLabel('Layers');
      ns.setTypeCode('layers');
      ns.dataPropertySet('linker', 'layers');
      o.buildNodeView(ns, true);
      n.appendNode(ns);
      var ds = p.layers();
      var c = ds.count();
      for(var i = 0; i < c; i++){
         var l = ds.value(i);
         if(RClass.isClass(l, FDisplayUiLayer)){
            continue;
         }
         var lr = l.resource();
         var nl = o.createNode();
         nl.setLabel('Layer:' + lr.code());
         nl.setTypeCode('layer');
         nl.dataPropertySet('linker', l);
         o.buildNodeView(nl, true);
         ns.appendNode(nl);
         o.buildDisplay(nl, l)
      }
   }
   MO.FDsCatalog_buildSpace = function FDsCatalog_buildSpace(p){
      var o = this;
      var r = p._resource;
      var nr = o.createNode();
      nr.setLabel(r.code());
      nr.setNote(r.label());
      nr.setTypeCode('scene');
      nr.dataPropertySet('linker', p);
      o.appendNode(nr);
      o.buildTechnique(nr, p.technique())
      o.buildRegion(nr, p.region());
      o.buildLayer(nr, p);
      nr.click();
   }
   MO.FDsCatalog_selectObject = function FDsCatalog_selectObject(item){
      var o = this;
      if(item){
         o.processSelectedListener(item, true);
      }
   }
   MO.FDsCatalog_showObject = function FDsCatalog_showObject(item){
      var o = this;
      if(RClass.isClass(item, FDsSceneRenderable)){
         var renderableNodes = o._renderableNodes;
         var renderableCount = renderableNodes.count();
         for(var i = 0; i < renderableCount; i++){
            var renderableNode = renderableNodes.at(i);
            var renderable = renderableNode.dataPropertyGet('linker');
            if(renderable == item){
               o.processSelectedListener(item, false);
            }
         }
      }
   }
   MO.FDsCatalog_dispose = function FDsCatalog_dispose(){
      var o = this;
      o._displayNodes = RObject.dispose(o._displayNodes);
      o._renderableNodes = RObject.dispose(o._renderableNodes);
      o._materialNodes = RObject.dispose(o._materialNodes);
      o.__base.FUiDataTreeView.dispose.call(o);
   }
}
with(MO){
   MO.FDsFrameSet = function FDsFrameSet(o){
      o = RClass.inherits(this, o, FDuiFrameSet);
      o._styleToolBarGround   = RClass.register(o, new AStyle('_styleToolBarGround', 'ToolBar_Ground'));
      o._styleCatalogContent  = RClass.register(o, new AStyle('_styleCatalogContent', 'Catalog_Content'));
      o._styleCanvasContent   = RClass.register(o, new AStyle('_styleCanvasContent', 'Canvas_Content'));
      o._stylePropertyContent = RClass.register(o, new AStyle('_stylePropertyContent', 'Property_Content'));
      o._activeGuid           = null;
      o._activeCode           = null;
      o._activeSpace          = null;
      o._propertyFrames       = null;
      o.construct             = FDsFrameSet_construct;
      o.findPropertyFrame     = FDsFrameSet_findPropertyFrame;
      o.propertyFrames        = FDsFrameSet_propertyFrames;
      o.hidePropertyFrames    = FDsFrameSet_hidePropertyFrames;
      o.dispose               = FDsFrameSet_dispose;
      return o;
   }
   MO.FDsFrameSet_construct = function FDsFrameSet_construct(){
      var o = this;
      o.__base.FDuiFrameSet.construct.call(o);
      o._propertyFrames = new TDictionary();
   }
   MO.FDsFrameSet_findPropertyFrame = function FDsFrameSet_findPropertyFrame(code){
      var o = this;
      var frame = o._propertyFrames.get(code);
      if(!frame){
         frame = RConsole.find(FDuiFrameConsole).get(o, code, o._framePropertyContent._hContainer);
         frame._frameSet = o;
         o._propertyFrames.set(code, frame);
      }
      return frame;
   }
   MO.FDsFrameSet_propertyFrames = function FDsFrameSet_propertyFrames(){
      return this._propertyFrames;
   }
   MO.FDsFrameSet_hidePropertyFrames = function FDsFrameSet_hidePropertyFrames(){
      var o = this;
      var frames = o._propertyFrames;
      var count = frames.count();
      for(var i = 0; i < count; i++){
         var frame = frames.at(i);
         frame.hide();
      }
   }
   MO.FDsFrameSet_dispose = function FDsFrameSet_dispose(){
      var o = this;
      o._activeSpace = null;
      var frames = o._propertyFrames;
      var count = frames.count();
      for(var i = 0; i < count; i++){
         var frame = frames.at(i);
         frame.dispose();
      }
      o._propertyFrames = RObject.dispose(o._propertyFrames);
      o.__base.FDuiFrameSet.dispose.call(o);
   }
}
with(MO){
   MO.FDsMainCanvas = function FDsMainCanvas(o){
      o = RClass.inherits(this, o, FCanvas);
      o._context   = null;
      o._stage     = null;
      o._layer     = null;
      o._activeModel = null;
      o._rotationX = 0;
      o._rotationY = 0;
      o._rotationZ = 0;
      o.onBuild      = FDsMainCanvas_onBuild;
      o.onEnterFrame = FDsMainCanvas_onEnterFrame;
      o.onThemeLoad  = FDsMainCanvas_onThemeLoad;
      o.oeRefresh    = FDsMainCanvas_oeRefresh;
      o.construct    = FDsMainCanvas_construct;
      o.selectModel  = FDsMainCanvas_selectModel;
      o.dispose      = FDsMainCanvas_dispose;
      return o;
   }
   MO.FDsMainCanvas_onEnterFrame= function FDsMainCanvas_onEnterFrame(){
      var o = this;
      var m = o._activeModel;
      if(m){
         m.location().set(0, -6.0, 0);
         m.rotation().set(0, o._rotationY, 0);
         m.scale().set(2, 2, 2);
         m.update();
         o._rotationX += 0.01;
         o._rotationY += 0.01;
         o._rotationZ += 0.03;
      }
   }
   MO.FDsMainCanvas_onThemeLoad = function FDsMainCanvas_onThemeLoad(){
      var o = this;
      var hCanvas = o._hPanel;
      hCanvas.width = o._hParent.offsetWidth;
      hCanvas.height = o._hParent.offsetHeight;
      o._context = REngine3d.createContext(FWglContext, hCanvas);
      var g = o._stage = RClass.create(FSimpleStage3d);
      g.backgroundColor().set(0.5, 0.5, 0.5, 1);
      g.selectTechnique(o._context, FG3dGeneralTechnique);
      o._layer = o._stage.spriteLayer();
      RStage.register('stage3d', o._stage);
      var rc = o._stage.camera();
      rc.setPosition(0, 3, -20);
      rc.lookAt(0, 0, 0);
      rc.update();
      o._stage.directionalLight().direction().set(0.7, -0.7, 0);
      var rp = o._stage.camera().projection();
      rp.size().set(hCanvas.width, hCanvas.height);
      rp.update();
      RStage.lsnsEnterFrame.register(o, o.onEnterFrame);
      RStage.start();
   }
   MO.FDsMainCanvas_onBuild = function FDsMainCanvas_onBuild(p){
      var o = this;
      o.__base.FCanvas.onBuild.call(o, p);
      var tc = RConsole.find(FE3sThemeConsole);
      var m = tc.select('color');
      m.loadListener().register(o, o.onThemeLoad);
   }
   MO.FDsMainCanvas_oeRefresh = function FDsMainCanvas_oeRefresh(p){
      var o = this;
      o.__base.FCanvas.oeRefresh.call(o, p);
      return EEventStatus.Stop;
   }
   MO.FDsMainCanvas_construct = function FDsMainCanvas_construct(){
      var o = this;
      o.__base.FCanvas.construct.call(o);
   }
   MO.FDsMainCanvas_selectModel = function FDsMainCanvas_selectModel(p){
      var o = this;
      var rmc = RConsole.find(FModel3dConsole);
      if(o._activeModel != null){
         rmc.free(o._activeModel);
      }
      var m = rmc.alloc(o._context, p);
      o._layer.pushDisplay(m);
      o._activeModel = m;
   }
   MO.FDsMainCanvas_dispose = function FDsMainCanvas_dispose(){
      var o = this;
      o.__base.FCanvas.dispose.call(o);
   }
}
with(MO){
   MO.FDsMainCatalog = function FDsMainCatalog(o){
      o = RClass.inherits(this, o, FDataTreeView);
      o.onBuild     = FDsMainCatalog_onBuild;
      o.onNodeClick = FDsMainCatalog_onNodeClick;
      o.construct   = FDsMainCatalog_construct;
      o.dispose     = FDsMainCatalog_dispose;
      return o;
   }
   MO.FDsMainCatalog_onBuild = function FDsMainCatalog_onBuild(p){
      var o = this;
      o.__base.FDataTreeView.onBuild.call(o, p);
      o.lsnsClick.register(o, o.onNodeClick);
   }
   MO.FDsMainCatalog_onNodeClick = function FDsMainCatalog_onNodeClick(t, n){
      var o = this;
      var c = o._worksapce._canvas;
      c.selectModel(n.name());
   }
   MO.FDsMainCatalog_construct = function FDsMainCatalog_construct(){
      var o = this;
      o.__base.FDataTreeView.construct.call(o);
   }
   MO.FDsMainCatalog_dispose = function FDsMainCatalog_dispose(){
      var o = this;
      o.__base.FDataTreeView.dispose.call(o);
   }
}
with(MO){
   MO.FDsMainMenuBar = function FDsMainMenuBar(o){
      o = RClass.inherits(this, o, FMenuBar);
      o.onBuild   = FDsMainMenuBar_onBuild;
      o.construct = FDsMainMenuBar_construct;
      o.dispose   = FDsMainMenuBar_dispose;
      return o;
   }
   MO.FDsMainMenuBar_onBuild = function FDsMainMenuBar_onBuild(p){
      var o = this;
      o.__base.FMenuBar.onBuild.call(o, p);
      var b = o._framesetMain = RClass.create(FMenuButton);
      b.setLabel('文件');
      b.setIcon('design.menu.build');
      b.build(p);
      o.appendButton(b);
      var b = o._framesetMain = RClass.create(FMenuButton);
      b.setLabel('保存');
      b.setIcon('design.menu.save');
      b.build(p);
      o.appendButton(b);
      var b = o._framesetMain = RClass.create(FMenuButton);
      b.setLabel('帮助');
      b.setIcon('design.menu.help');
      b.build(p);
      o.appendButton(b);
   }
   MO.FDsMainMenuBar_construct = function FDsMainMenuBar_construct(){
      var o = this;
      o.__base.FMenuBar.construct.call(o);
   }
   MO.FDsMainMenuBar_dispose = function FDsMainMenuBar_dispose(){
      var o = this;
      o.__base.FMenuBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsMainToolBar = function FDsMainToolBar(o){
      o = RClass.inherits(this, o, FToolBar);
      o.onPersistenceClick   = FDsMainToolBar_onPersistenceClick;
      o.onBuild   = FDsMainToolBar_onBuild;
      o.construct = FDsMainToolBar_construct;
      o.dispose   = FDsMainToolBar_dispose;
      return o;
   }
   MO.FDsMainToolBar_onPersistenceClick = function FDsMainToolBar_onPersistenceClick(p){
      var o = this;
      var catalog = o._worksapce._catalog;
      catalog.loadUrl('/cloud.describe.tree.ws?action=query&code=resource3d.model');
   }
   MO.FDsMainToolBar_onBuild = function FDsMainToolBar_onBuild(p){
      var o = this;
      o.__base.FToolBar.onBuild.call(o, p);
      var b = o._persistenceButton  = RClass.create(FToolButton);
      b.setLabel('模型管理');
      b.build(p);
      b.lsnsClick.register(o, o.onPersistenceClick);
      o.appendButton(b);
      var b = o._framesetMain = RClass.create(FToolButton);
      b.setLabel('材质管理');
      b.build(p);
      o.appendButton(b);
      var b = o._framesetMain = RClass.create(FToolButton);
      b.setLabel('模板管理');
      b.build(p);
      o.appendButton(b);
      var b = o._framesetMain = RClass.create(FToolButton);
      b.setLabel('场景管理');
      b.build(p);
      o.appendButton(b);
   }
   MO.FDsMainToolBar_construct = function FDsMainToolBar_construct(){
      var o = this;
      o.__base.FToolBar.construct.call(o);
   }
   MO.FDsMainToolBar_dispose = function FDsMainToolBar_dispose(){
      var o = this;
      o.__base.FToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsMainWindow = function FDsMainWindow(o){
      o = RClass.inherits(this, o, FObject);
      o._name             = null;
      o._matrix           = null;
      o._location         = null;
      o._rotation         = null;
      o._scale            = null;
      o._visible          = true;
      o._renderables      = null;
      o.construct         = FDsMainWindow_construct;
      o.isName            = FDsMainWindow_isName;
      o.name              = FDsMainWindow_name;
      o.matrix            = FDsMainWindow_matrix;
      o.location          = FDsMainWindow_location;
      o.rotation          = FDsMainWindow_rotation;
      o.scale             = FDsMainWindow_scale;
      o.hasRenderable     = FDsMainWindow_hasRenderable;
      o.filterRenderables = FDsMainWindow_filterRenderables;
      o.renderables       = FDsMainWindow_renderables;
      o.pushRenderable    = FDsMainWindow_pushRenderable;
      o.process           = FDsMainWindow_process;
      o.update            = FDsMainWindow_update;
      o.dispose           = FDsMainWindow_dispose;
      return o;
   }
   MO.FDsMainWindow_construct = function FDsMainWindow_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._matrix = new SMatrix3d();
      o._location = new SPoint3();
      o._rotation = new SVector3();
      o._scale = new SVector3();
      o._scale.set(1, 1, 1);
   }
   MO.FDsMainWindow_isName = function FDsMainWindow_isName(p){
      return this._name == p;
   }
   MO.FDsMainWindow_name = function FDsMainWindow_name(){
      return this._name;
   }
   MO.FDsMainWindow_matrix = function FDsMainWindow_matrix(){
      return this._matrix;
   }
   MO.FDsMainWindow_location = function FDsMainWindow_location(){
      return this._location;
   }
   MO.FDsMainWindow_rotation = function FDsMainWindow_rotation(){
      return this._rotation;
   }
   MO.FDsMainWindow_scale = function FDsMainWindow_scale(){
      return this._scale;
   }
   MO.FDsMainWindow_hasRenderable = function FDsMainWindow_hasRenderable(){
      var r = this._renderables;
      if(r != null){
         return !r.isEmpty();
      }
      return false;
   }
   MO.FDsMainWindow_filterRenderables = function FDsMainWindow_filterRenderables(p){
      var o = this;
      if(!o._visible){
         return false;
      }
      var rs = o._renderables;
      if(rs != null){
         var c = rs.count();
         for(var n = 0; n < c; n++){
            var r = rs.get(n);
            if(r.testVisible()){
               p.pushRenderable(r);
            }
         }
      }
      return true;
   }
   MO.FDsMainWindow_renderables = function FDsMainWindow_renderables(){
      var o = this;
      var r = o._renderables;
      if(r == null){
         r = o._renderables = new TObjects();
      }
      return r;
   }
   MO.FDsMainWindow_pushRenderable = function FDsMainWindow_pushRenderable(p){
      this.renderables().push(p);
   }
   MO.FDsMainWindow_update = function FDsMainWindow_update(){
      var o = this;
      var m = o._matrix;
      m.set(o._location, o._rotation, o._scale);
      m.update();
   }
   MO.FDsMainWindow_process = function FDsMainWindow_process(){
      var o = this;
      var rs = o._renderables;
      if(rs != null){
         var c = rs.count();
         for(var i = 0; i < c; i++){
            rs.get(i).process();
         }
      }
   }
   MO.FDsMainWindow_dispose = function FDsMainWindow_dispose(){
      var o = this;
      o._matrix = null;
      o._position = null;
      o._direction = null;
      o._scale = null;
      var rs = o._renderables;
      if(rs != null){
         rs.dispose();
         o._renderables = null
      }
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FDsMainWorkspace = function FDsMainWorkspace(o){
      o = RClass.inherits(this, o, FWorkspace);
      o._styleToolbarGround   = RClass.register(o, new AStyle('_styleToolbarGround', 'Toolbar_Ground'));
      o._styleStatusbarGround = RClass.register(o, new AStyle('_styleStatusbarGround', 'Statusbar_Ground'));
      o._styleCatalogGround   = RClass.register(o, new AStyle('_styleCatalogGround', 'Catalog_Ground'));
      o._styleWorkspaceGround = RClass.register(o, new AStyle('_styleWorkspaceGround', 'Workspace_Ground'));
      o._stylePropertyGround  = RClass.register(o, new AStyle('_stylePropertyGround', 'Property_Ground'));
      o._framesetMain         = null;
      o._framesetBody         = null;
      o._frameToolBar         = null;
      o._frameBody            = null;
      o._frameProperty        = null;
      o._frameCatalog         = null;
      o._frameWorkspace       = null;
      o._frameStatusBar       = null;
      o.onBuild               = FDsMainWorkspace_onBuild;
      o.construct             = FDsMainWorkspace_construct;
      o.dispose               = FDsMainWorkspace_dispose;
      return o;
   }
   MO.FDsMainWorkspace_construct = function FDsMainWorkspace_construct(){
      var o = this;
      o.__base.FWorkspace.construct.call(o);
   }
   MO.FDsMainWorkspace_onBuild = function FDsMainWorkspace_onBuild(p){
      var o = this;
      o.__base.FWorkspace.onBuild.call(o, p);
      o._hPanel.style.width = '100%';
      o._hPanel.style.height = '100%';
      var fs = o._framesetMain = RClass.create(FFrameSet);
      fs.build(p);
      var f = o._frameToolBar = RClass.create(FFrame);
      f.setHeight(26);
      f.build(p);
      f._hPanel.className = o.styleName('Toolbar_Ground');
      fs.appendFrame(f);
      var f = o._frameBody = RClass.create(FFrame);
      f.build(p);
      fs.appendFrame(f);
      var f = o._frameProperty = RClass.create(FFrame);
      f.setHeight(18);
      f.build(p);
      f._hPanel.className = o.styleName('Statusbar_Ground');
      fs.appendFrame(f);
      fs.setPanel(o._hPanel);
      var fs = RClass.create(FFrameSet);
      fs._directionCd = EDirection.Horizontal;
      fs.build(p);
      var f = o._frameCatalog = RClass.create(FFrame);
      f.setWidth(300);
      f.build(p);
      f._hPanel.className = o.styleName('Catalog_Ground');
      fs.appendFrame(f);
      var sp1 = fs.appendSpliter();
      var f = o._frameWorkspace = RClass.create(FFrame);
      f.build(p);
      f._hPanel.className = o.styleName('Workspace_Ground');
      fs.appendFrame(f);
      var sp2 = fs.appendSpliter();
      var f = o._frameStatusBar = RClass.create(FFrame);
      f.setWidth(360);
      f.build(p);
      f._hPanel.className = o.styleName('Property_Ground');
      fs.appendFrame(f);
      fs.setPanel(o._frameBody._hPanel);
      sp1._alignCd = EAlign.Left;
      sp1._hSize = o._frameCatalog._hPanel;
      sp2._alignCd = EAlign.Right;
      sp2._hSize = o._frameStatusBar._hPanel;
      var c = o._catalog = RClass.create(FDsMainCatalog);
      c._worksapce = o;
      c.build(p);
      c.setPanel(o._frameCatalog._hPanel);
      o.push(c);
      var c = o._toolbar = RClass.create(FDsMainToolBar);
      c._worksapce = o;
      c.build(p);
      c.setPanel(o._frameToolBar._hPanel);
      c._persistenceButton.click();
      o.push(c);
      var c = o._canvas = RClass.create(FDsMainCanvas);
      c._worksapce = o;
      c.build(p);
      c.setPanel(o._frameWorkspace._hPanel);
      o.push(c);
   }
   MO.FDsMainWorkspace_dispose = function FDsMainWorkspace_dispose(){
      var o = this;
      o.__base.FWorkspace.dispose.call(o);
   }
}
with(MO){
   MO.FDsSpaceCanvas = function FDsSpaceCanvas(o){
      o = RClass.inherits(this, o, FDsCanvas);
      o._rotation             = null;
      o._optionRotation       = false;
      o._capturePosition      = null;
      o._captureMatrix        = null;
      o._captureRotation      = null;
      o._selectObject         = null;
      o._selectRenderables    = null;
      o._templateMatrix       = null;
      o._templateRenderable   = null;
      o.onBuild               = FDsSpaceCanvas_onBuild;
      o.onMouseCaptureStart   = FDsSpaceCanvas_onMouseCaptureStart;
      o.onMouseCapture        = FDsSpaceCanvas_onMouseCapture;
      o.onMouseCaptureStop    = FDsSpaceCanvas_onMouseCaptureStop;
      o.oeResize              = FDsSpaceCanvas_oeResize;
      o.oeRefresh             = FDsSpaceCanvas_oeRefresh;
      o.construct             = FDsSpaceCanvas_construct;
      o.innerSelectRenderable = FDsSpaceCanvas_innerSelectRenderable;
      o.innerSelectDisplay    = FDsSpaceCanvas_innerSelectDisplay;
      o.innerSelectLayer      = FDsSpaceCanvas_innerSelectLayer;
      o.selectNone            = FDsSpaceCanvas_selectNone;
      o.selectLayers          = FDsSpaceCanvas_selectLayers;
      o.selectLayer           = FDsSpaceCanvas_selectLayer;
      o.selectDisplay         = FDsSpaceCanvas_selectDisplay;
      o.selectMaterial        = FDsSpaceCanvas_selectMaterial;
      o.selectRenderable      = FDsSpaceCanvas_selectRenderable;
      o.switchPlay            = FDsSpaceCanvas_switchPlay;
      o.switchMovie           = FDsSpaceCanvas_switchMovie;
      o.dispose               = FDsSpaceCanvas_dispose;
      return o;
   }
   MO.FDsSpaceCanvas_onBuild = function FDsSpaceCanvas_onBuild(p){
      var o = this;
      o.__base.FDsCanvas.onBuild.call(o, p);
   }
   MO.FDsSpaceCanvas_onMouseCaptureStart = function FDsSpaceCanvas_onMouseCaptureStart(event){
      var o = this;
      o.__base.FDsCanvas.onMouseCaptureStart.call(o, event)
      var space = o._activeSpace;
      if(!space){
         return;
      }
      var region = space.region();
      var selectTechnique = RConsole.find(FG3dTechniqueConsole).find(o._graphicContext, FG3dSelectTechnique);
      var renderable = selectTechnique.test(region, event.offsetX, event.offsetY);
      o.selectRenderable(renderable);
      if(renderable){
         var display = renderable.display();
         o._captureMatrix.assign(display.matrix());
      }
   }
   MO.FDsSpaceCanvas_onMouseCapture = function FDsSpaceCanvas_onMouseCapture(event){
      var o = this;
      o.__base.FDsCanvas.onMouseCapture.call(o, event);
   }
   MO.FDsSpaceCanvas_onMouseCaptureStop = function FDsSpaceCanvas_onMouseCaptureStop(event){
      var o = this;
      o.__base.FDsCanvas.onMouseCaptureStop.call(o, event);
   }
   MO.FDsSpaceCanvas_oeResize = function FDsSpaceCanvas_oeResize(p){
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
   MO.FDsSpaceCanvas_oeRefresh = function FDsSpaceCanvas_oeRefresh(p){
      return EEventStatus.Stop;
   }
   MO.FDsSpaceCanvas_construct = function FDsSpaceCanvas_construct(){
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
   MO.FDsSpaceCanvas_innerSelectRenderable = function FDsSpaceCanvas_innerSelectRenderable(renderable){
      var o = this;
      renderable._optionSelected = true;
      if(RClass.isClass(renderable, MDsBoundBox)){
         renderable.showBoundBox();
      }
      o._selectRenderables.push(renderable);
   }
   MO.FDsSpaceCanvas_innerSelectDisplay = function FDsSpaceCanvas_innerSelectDisplay(select){
      var o = this;
      var displays = select.displays();
      var count = displays.count();
      for(var i = 0; i < count; i++){
         var display = displays.at(i);
         o.innerSelectDisplay(display);
      }
      var renderables = select.renderables();
      var count = renderables.count();
      for(var i = 0; i < count; i++){
         var renderable = renderables.at(i);
         if(RClass.isClass(renderable, FDsSceneRenderable)){
            o.innerSelectRenderable(renderable);
         }
      }
   }
   MO.FDsSpaceCanvas_innerSelectLayer = function FDsSpaceCanvas_innerSelectLayer(layer){
      var o = this;
      var displays = layer.displays();
      var count = displays.count();
      for(var i = 0; i < count; i++){
         var display = displays.at(i);
         o.innerSelectDisplay(display)
      }
   }
   MO.FDsSpaceCanvas_selectNone = function FDsSpaceCanvas_selectNone(){
      var o = this;
      var renderables = o._selectRenderables;
      var count = renderables.count();
      for(var i = 0; i < count; i++){
         var renderable = renderables.at(i);
         renderable._optionSelected = false;
         if(RClass.isClass(renderable, MDsBoundBox)){
            renderable.hideBoundBox();
         }
      }
      o._selectObject = null;
      o._selectRenderables.clear();
   }
   MO.FDsSpaceCanvas_selectLayers = function FDsSpaceCanvas_selectLayers(){
      var o = this;
      o.selectNone();
      var layers = o._activeSpace.layers();
      var layerCount = layers.count();
      for(var i = 0; i < layerCount; i++){
         var layer = layers.at(i);
         o.innerSelectLayer(layer);
      }
   }
   MO.FDsSpaceCanvas_selectLayer = function FDsSpaceCanvas_selectLayer(layer){
      var o = this;
      o.selectNone();
      o._selectObject = layer;
      o.innerSelectLayer(layer);
   }
   MO.FDsSpaceCanvas_selectDisplay = function FDsSpaceCanvas_selectDisplay(display){
      var o = this;
      o.selectNone();
      o._selectObject = display;
      o.innerSelectDisplay(display);
   }
   MO.FDsSpaceCanvas_selectMaterial = function FDsSpaceCanvas_selectMaterial(material){
      var o = this;
      o.selectNone();
      o._selectObject = material;
      var display = material._display;
      var sprite = display._sprite;
      var renderables = sprite.renderables();
      var count = renderables.count();
      for(var i = 0; i < count; i++){
         var renderable = renderables.at(i);
         if(renderable.material() == material){
            o.innerSelectRenderable(renderable);
         }
      }
   }
   MO.FDsSpaceCanvas_selectRenderable = function FDsSpaceCanvas_selectRenderable(renderable){
      var o = this;
      o.selectNone();
      if(renderable){
         o.innerSelectRenderable(renderable);
         o._frameSet._catalogContent.showObject(renderable);
      }
   }
   MO.FDsSpaceCanvas_switchPlay = function FDsSpaceCanvas_switchPlay(flag){
      var o = this;
      var space = o._activeSpace;
      var displays = space.allDisplays();
      var count = displays.count();
      for(var i = 0; i < count; i++){
         var display = displays.at(i);
         if(RClass.isClass(display, FE3dSceneDisplay)){
            var sprite = display._sprite;
            sprite._optionPlay = flag;
            display._optionPlay = flag;
         }
      }
   }
   MO.FDsSpaceCanvas_switchMovie = function FDsSpaceCanvas_switchMovie(flag){
      var o = this;
      var space = o._activeSpace;
      var displays = space.allDisplays();
      var count = displays.count();
      for(var i = 0; i < count; i++){
         var display = displays.at(i);
         if(RClass.isClass(display, FE3dSceneDisplay)){
            var sprite = display._sprite;
            if(sprite){
               sprite._optionMovie = flag;
            }
            display._optionMovie = flag;
         }
      }
   }
   MO.FDsSpaceCanvas_dispose = function FDsSpaceCanvas_dispose(){
      var o = this;
      o._rotation = RObject.dispose(o._rotation);
      o.__base.FDsCanvas.dispose.call(o);
   }
}
with(MO){
   MO.FDsSpaceDesignCanvas = function FDsSpaceDesignCanvas(o){
      o = RClass.inherits(this, o, FDsSpaceCanvas);
      o._templateMatrix       = null;
      o._templateRenderable   = null;
      o._templateFace         = null;
      o._templateTranslation  = null;
      o._templateRotation     = null;
      o._templateScale        = null;
      o._templateViewScale    = 0.05;
      o.onBuild               = FDsSpaceDesignCanvas_onBuild;
      o.onDataLoaded          = FDsSpaceDesignCanvas_onDataLoaded;
      o.construct             = FDsSpaceDesignCanvas_construct;
      o.selectRenderable      = FDsSpaceDesignCanvas_selectRenderable;
      o.refreshOperationFace  = FDsSpaceDesignCanvas_refreshOperationFace;
      o.switchMode            = FDsSpaceDesignCanvas_switchMode;
      o.dispose               = FDsSpaceDesignCanvas_dispose;
      return o;
   }
   MO.FDsSpaceDesignCanvas_onBuild = function FDsSpaceDesignCanvas_onBuild(p){
      var o = this;
      o.__base.FDsSpaceCanvas.onBuild.call(o, p);
      var templateConsole = RConsole.find(FE3dTemplateConsole);
      var templateTranslation = o._templateTranslation = templateConsole.allocByCode(o, 'com.design.translation');
      templateTranslation.addLoadListener(o, o.onDataLoaded);
      var templateRotation = o._templateRotation = templateConsole.allocByCode(o, 'com.design.rotation');
      templateRotation.addLoadListener(o, o.onDataLoaded);
      var templateScale = o._templateScale = templateConsole.allocByCode(o, 'com.design.scale');
      templateScale.addLoadListener(o, o.onDataLoaded);
   }
   MO.FDsSpaceDesignCanvas_onDataLoaded = function FDsSpaceDesignCanvas_onDataLoaded(p){
      var o = this;
      var context = o._graphicContext;
      var space = o._activeSpace;
      var templateTranslation = o._templateTranslation;
      if(!templateTranslation.testReady()){
         return;
      }
      var templateRotation = o._templateRotation;
      if(!templateRotation.testReady()){
         return;
      }
      var templateScale = o._templateScale;
      if(!templateScale.testReady()){
         return;
      }
      if(!space.testReady()){
         return;
      }
      var translationSprite = o._translationSprite = o._templateTranslation.sprite();
      translationSprite.setVisible(false);
      var rotationSprite = o._rotationSprite = o._templateRotation.sprite();
      rotationSprite.setVisible(false);
      var scaleSprite = o._scaleSprite = o._templateScale.sprite();
      scaleSprite.setVisible(false);
      var layer = o._uiLayer = RClass.create(FDisplayUiLayer);
      layer.selectTechnique(context, FE3dControlTechnique);
      layer.pushDisplay(translationSprite);
      layer.pushDisplay(rotationSprite);
      layer.pushDisplay(scaleSprite);
      space.registerLayer('ui', layer);
      o.reloadRegion()
      o.processLoadListener(o);
      RConsole.find(FDuiDesktopConsole).hide();
   }
   MO.FDsSpaceDesignCanvas_onMouseCaptureStart = function FDsSpaceDesignCanvas_onMouseCaptureStart(event){
      var o = this;
      o.__base.FDsSpaceCanvas.onMouseCaptureStart.call(o, event)
      var space = o._activeSpace;
      if(!space){
         return;
      }
      var region = space.region();
      var selectTechnique = RConsole.find(FG3dTechniqueConsole).find(o._graphicContext, FG3dSelectTechnique);
      var renderable = selectTechnique.test(region, event.offsetX, event.offsetY);
      o.selectRenderable(renderable);
      if(renderable){
         var display = renderable.display();
         o._captureMatrix.assign(display.matrix());
      }
   }
   MO.FDsSpaceDesignCanvas_onMouseCapture = function FDsSpaceDesignCanvas_onMouseCapture(event){
      var o = this;
      o.__base.FDsSpaceCanvas.onMouseCapture.call(o, event);
   }
   MO.FDsSpaceDesignCanvas_onMouseCaptureStop = function FDsSpaceDesignCanvas_onMouseCaptureStop(event){
      var o = this;
      o.__base.FDsSpaceCanvas.onMouseCaptureStop.call(o, event);
   }
   MO.FDsSpaceDesignCanvas_oeResize = function FDsSpaceDesignCanvas_oeResize(p){
      var o = this;
      o.__base.FDsSpaceCanvas.oeResize.call(o, p);
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
   MO.FDsSpaceDesignCanvas_oeRefresh = function FDsSpaceDesignCanvas_oeRefresh(p){
      return EEventStatus.Stop;
   }
   MO.FDsSpaceDesignCanvas_construct = function FDsSpaceDesignCanvas_construct(){
      var o = this;
      o.__base.FDsSpaceCanvas.construct.call(o);
      o._templateMatrix = new SMatrix3d();
      o._templateFaceMatrix = new SMatrix3d();
   }
   MO.FDsSpaceDesignCanvas_selectRenderable = function FDsSpaceDesignCanvas_selectRenderable(renderable){
      var o = this;
      var space = o._activeSpace;
      if(!space){
         return;
      }
      o.selectNone();
      if(renderable){
         o.innerSelectRenderable(renderable);
         o._frameSet._catalogContent.showObject(renderable);
      }
   }
   MO.FDsSpaceDesignCanvas_refreshOperationFace = function FDsSpaceDesignCanvas_refreshOperationFace(){
      var o = this;
      var modeCd = o._canvasModeCd;
      var hasRenderable = !o._selectRenderables.isEmpty();
      var templateTranslation = o._translationSprite;
      var templateRotation = o._rotationSprite;
      var templateScale = o._scaleSprite;
      o._templateFace = null;
      switch(modeCd){
         case EDsCanvasMode.Translate:
            templateTranslation.setVisible(hasRenderable);
            templateRotation.setVisible(false);
            templateScale.setVisible(false);
            o._templateFace = templateTranslation;
            break;
         case EDsCanvasMode.Rotation:
            templateTranslation.setVisible(false);
            templateRotation.setVisible(hasRenderable);
            templateScale.setVisible(false);
            o._templateFace = templateScale;
            break;
         case EDsCanvasMode.Scale:
            templateTranslation.setVisible(false);
            templateRotation.setVisible(false);
            templateScale.setVisible(hasRenderable);
            o._templateFace = templateScale;
            break;
      }
      var templateFace = o._templateFace;
      if(hasRenderable && templateFace){
         var renderable = o._selectRenderables.first();
         var display = renderable.display();
         var matrix = templateFace.matrix();
         matrix.assign(display.matrix());
         matrix.update();
      }
   }
   MO.FDsSpaceDesignCanvas_switchMode = function FDsSpaceDesignCanvas_switchMode(modeCd){
      var o = this;
      o._canvasModeCd = modeCd;
   }
   MO.FDsSpaceDesignCanvas_dispose = function FDsSpaceDesignCanvas_dispose(){
      var o = this;
      o._rotation = RObject.dispose(o._rotation);
      o.__base.FDsSpaceCanvas.dispose.call(o);
   }
}
with(MO){
   MO.FDsStage = function FDsStage(o){
      o = RClass.inherits(this, o, FE3dStage);
      o._mapLayer    = RClass.register(o, new AGetter('_mapLayer'));
      o._spriteLayer = RClass.register(o, new AGetter('_spriteLayer'));
      o._faceLayer   = RClass.register(o, new AGetter('_faceLayer'));
      o.construct    = FDsStage_construct;
      o.active       = FDsStage_active;
      o.deactive     = FDsStage_deactive;
      return o;
   }
   MO.FDsStage_construct = function FDsStage_construct(){
      var o = this;
      o.__base.FE3dStage.construct.call(o);
      var layer = o._mapLayer = RClass.create(FDisplayLayer);
      o.registerLayer('MapLayer', layer);
      var layer = o._spriteLayer = RClass.create(FDisplayLayer);
      o.registerLayer('SpriteLayer', layer);
      var layer = o._faceLayer = RClass.create(FDisplayLayer);
      o.registerLayer('FaceLayer', layer);
   }
   MO.FDsStage_active = function FDsStage_active(){
      var o = this;
      o.__base.FE3dStage.active.call(o);
   }
   MO.FDsStage_deactive = function FDsStage_deactive(){
      var o = this;
      o.__base.FE3dStage.deactive.call(o);
   }
}
