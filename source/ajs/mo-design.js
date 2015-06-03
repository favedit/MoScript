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
   o.PrivateSolutionFrameSet = 'resource.private.solution.FrameSet';
   o.PrivateProjectFrameSet  = 'resource.private.project.FrameSet';
   o.PrivateResourceFrameSet = 'resource.private.resource.FrameSet';
   o.PrivateBitmapFrameSet   = 'resource.private.bitmap.FrameSet';
   o.PrivateMaterialFrameSet = 'resource.private.material.FrameSet';
   o.PrivateModelFrameSet    = 'resource.private.model.FrameSet';
   o.PrivateTemplateFrameSet = 'resource.private.template.FrameSet';
   o.PrivateSceneFrameSet    = 'resource.private.scene.FrameSet';
   o.ShareResourceFrameSet   = 'resource.share.resource.FrameSet';
   o.ShareBitmapFrameSet     = 'resource.share.bitmap.FrameSet';
   o.ShareMaterialFrameSet   = 'resource.share.material.FrameSet';
   o.ShareModelFrameSet      = 'resource.share.model.FrameSet';
   o.ShareTemplateFrameSet   = 'resource.share.template.FrameSet';
   o.ShareSceneFrameSet      = 'resource.share.scene.FrameSet';
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
      RConsole.find(FUiDesktopConsole).hide();
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
      RConsole.find(FUiDesktopConsole).showLoading();
      var resource = o._activeResource = RConsole.find(FDrBitmapConsole).query(guid);
      var url = '/cloud.resource.bitmap.wv?do=view&guid=' + guid;
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
   MO.FDsBitmapCanvas_dispose = function FDsBitmapCanvas_dispose(){
      var o = this;
      o.__base.FDsCanvas.dispose.call(o);
   }
}
with(MO){
   MO.FDsCanvas = function FDsCanvas(o){
      o = RClass.inherits(this, o, FUiCanvas, MGraphicObject, MListenerLoad, MMouseCapture);
      o._servicePreview      = 'cloud.resource.preview';
      o._resourceTypeCd      = null;
      o._optionRotation      = false;
      o._activeSpace         = null;
      o._canvasModeCd        = EDsCanvasMode.Drop;
      o._canvasMoveCd        = EDsCanvasDrag.Unknown;
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
      o.onBuild              = FDsCanvas_onBuild;
      o.onMouseCaptureStart  = FDsCanvas_onMouseCaptureStart;
      o.onMouseCapture       = FDsCanvas_onMouseCapture;
      o.onMouseCaptureStop   = FDsCanvas_onMouseCaptureStop;
      o.onEnterFrame         = FDsCanvas_onEnterFrame;
      o.oeResize             = FDsCanvas_oeResize;
      o.oeRefresh            = FDsCanvas_oeRefresh;
      o.construct            = FDsCanvas_construct;
      o.activeSpace          = FDsCanvas_activeSpace;
      o.switchSize           = FDsCanvas_switchSize;
      o.switchRotation       = FDsCanvas_switchRotation;
      o.reloadRegion         = FDsCanvas_reloadRegion;
      o.capture              = FDsCanvas_capture;
      o.dispose              = FDsCanvas_dispose;
      return o;
   }
   MO.FDsCanvas_onBuild = function FDsCanvas_onBuild(event){
      var o = this;
      o.__base.FUiCanvas.onBuild.call(o, event);
      var hPanel = o._hPanel;
      hPanel.__linker = o;
      hPanel.style.width = '100%';
      hPanel.style.height = '100%';
      var parameters = new Object();
      parameters.alpha = false;
      parameters.antialias = true;
      var context = o._graphicContext = REngine3d.createContext(FWglContext, hPanel, parameters);
      var dimensional = o._dimensional = RClass.create(FE3dDimensional);
      dimensional.linkGraphicContext(context);
      dimensional.setup();
      RStage.lsnsEnterFrame.register(o, o.onEnterFrame);
      RStage.start(1000 / 60);
      RConsole.find(FMouseConsole).register(o);
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
      RHtml.cursorSet(o._hPanel, EUiCursor.Pointer);
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
      RHtml.cursorSet(o._hPanel, EUiCursor.Auto);
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
      var keyForward = RKeyboard.isPress(EStageKey.Forward);
      var keyBack = RKeyboard.isPress(EStageKey.Back);
      if(keyForward && !keyBack){
         camera.doWalk(moveRate);
      }
      if(!keyForward && keyBack){
         camera.doWalk(-moveRate);
      }
      var keyUp = RKeyboard.isPress(EStageKey.Up);
      var keyDown = RKeyboard.isPress(EStageKey.Down);
      if(keyUp && !keyDown){
         camera.doFly(moveRate);
      }
      if(!keyUp && keyDown){
         camera.doFly(-moveRate);
      }
      var keyRleft = RKeyboard.isPress(EStageKey.RotationLeft);
      var keyRright = RKeyboard.isPress(EStageKey.RotationRight);
      if(keyRleft && !keyRright){
         camera.doYaw(rotationRate);
      }
      if(!keyRleft && keyRright){
         camera.doYaw(-rotationRate);
      }
      var keyRup = RKeyboard.isPress(EStageKey.RotationUp);
      var keyDown = RKeyboard.isPress(EStageKey.RotationDown);
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
      o.__base.FUiCanvas.oeResize.call(o, p);
      var hp = o._hPanel;
      var w = hp.offsetWidth;
      var h = hp.offsetHeight - 6;
      hp.width = w;
      hp.height = h;
      o._graphicContext.setViewport(0, 0, w, h);
      return EEventStatus.Stop;
   }
   MO.FDsCanvas_oeRefresh = function FDsCanvas_oeRefresh(p){
      return EEventStatus.Stop;
   }
   MO.FDsCanvas_construct = function FDsCanvas_construct(){
      var o = this;
      o.__base.FUiCanvas.construct.call(o);
      o._capturePosition = new SPoint2();
      o._captureMatrix = new SMatrix3d();
      o._rotation = new SVector3();
      o._captureRotation = new SVector3();
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
      RStage.process();
      var context = o._graphicContext;
      var size = context.size();
      var width = size.width;
      var height = size.height;
      var data = context.readPixels(0, 0, width, height);
      o.switchSize(switchWidth, switchHeight);
      RStage.process();
      var url = '/' + o._servicePreview + '.wv?do=upload&type_cd=' + o._resourceTypeCd + '&guid=' + guid + '&width=' + width + '&height=' + height;
      return RConsole.find(FHttpConsole).send(url, data.buffer);
   }
   MO.FDsCanvas_dispose = function FDsCanvas_dispose(){
      var o = this;
      o._rotation = RObject.dispose(o._rotation);
      o.__base.FUiCanvas.dispose.call(o);
   }
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
      o.lsnsClick.register(o, o.onNodeClick);
   }
   MO.FDsCatalog_onLoadDisplay = function FDsCatalog_onLoadDisplay(p){
      var o = this;
      var n = p._linkNode;
      o.buildRenderable(n, p);
   }
   MO.FDsCatalog_onNodeClick = function FDsCatalog_onNodeClick(tree, node){
      var o = this;
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
      o = RClass.inherits(this, o, FUiFrameSet);
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
      o.__base.FUiFrameSet.construct.call(o);
      o._propertyFrames = new TDictionary();
   }
   MO.FDsFrameSet_findPropertyFrame = function FDsFrameSet_findPropertyFrame(code){
      var o = this;
      var frame = o._propertyFrames.get(code);
      if(!frame){
         frame = RConsole.find(FUiFrameConsole).get(o, code, o._framePropertyContent._hContainer);
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
      o.__base.FUiFrameSet.dispose.call(o);
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
      RConsole.find(FUiDesktopConsole).hide();
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
   MO.FDsModelRenderable = function FDsModelRenderable(o){
      o = RClass.inherits(this, o, FE3dModelRenderable, MDsBoundBox);
      o._optionSelected = false;
      o.filterDrawables = FDsModelRenderable_filterDrawables;
      return o;
   }
   MO.FDsModelRenderable_filterDrawables = function FDsModelRenderable_filterDrawables(region){
      var o = this;
      var result = o.__base.FE3dSceneDisplayRenderable.filterDrawables.call(o, region);
      if(result){
         if(o._boundVisible){
            region.pushRenderable(o._boundBox);
         }
      }
      return result;
   }
}
with(MO){
   MO.FDsSceneDisplay = function FDsSceneDisplay(o){
      o = RClass.inherits(this, o, FE3dSceneDisplay);
      return o;
   }
}
with(MO){
   MO.FDsSceneLayer = function FDsSceneLayer(o){
      o = RClass.inherits(this, o, FE3dSceneLayer);
      return o;
   }
}
with(MO){
   MO.FDsSceneRenderable = function FDsSceneRenderable(o){
      o = RClass.inherits(this, o, FE3dSceneDisplayRenderable, MDsBoundBox);
      o._optionSelected = false;
      o.filterDrawables = FDsSceneRenderable_filterDrawables;
      return o;
   }
   MO.FDsSceneRenderable_filterDrawables = function FDsSceneRenderable_filterDrawables(region){
      var o = this;
      var result = o.__base.FE3dSceneDisplayRenderable.filterDrawables.call(o, region);
      if(result){
         if(o._boundVisible){
            region.pushRenderable(o._boundBox);
         }
      }
      return result;
   }
}
with(MO){
   MO.FDrAbsResourceConsole = function FDrAbsResourceConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd       = EScope.Local;
      o._serviceCode   = null;
      o._classUnit     = null;
      o._resources     = null;
      o.construct      = FDrAbsResourceConsole_construct;
      o.makeServiceUrl = FDrAbsResourceConsole_makeServiceUrl;
      o.loadResource   = FDrAbsResourceConsole_loadResource;
      o.doList         = FDrAbsResourceConsole_doList;
      o.doQuery        = FDrAbsResourceConsole_doQuery;
      o.doCreate       = FDrAbsResourceConsole_doCreate;
      o.doUpdate       = FDrAbsResourceConsole_doUpdate;
      o.doDelete       = FDrAbsResourceConsole_doDelete;
      return o;
   }
   MO.FDrAbsResourceConsole_construct = function FDrAbsResourceConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._resources = new TDictionary();
   }
   MO.FDrAbsResourceConsole_makeServiceUrl = function FDrAbsResourceConsole_makeServiceUrl(action){
      var o = this;
      var url = RBrowser.hostPath('/' + o._serviceCode + '.ws?action=' + action);
      if(MO.Runtime.isDebug()){
         url += '&date=' + RDate.format();
      }
      return url;
   }
   MO.FDrAbsResourceConsole_loadResource = function FDrAbsResourceConsole_loadResource(xconfig){
      var o = this;
      var guid = xconfig.get('guid');
      var resource = o._resources.get(guid);
      if(!resource){
         resource = RClass.create(o._classUnit);
         o._resources.set(guid, resource);
      }
      resource.loadConfig(xconfig);
      return resource;
   }
   MO.FDrAbsResourceConsole_doList = function FDrAbsResourceConsole_doList(search, order, pageSize, page){
      var o = this;
      var url = '/' + o._serviceCode + '.ws?action=list';
      if(!RString.isEmpty(search)){
         url += '&search=' + search;
      }
      if(!RString.isEmpty(order)){
         url += '&order=' + order;
      }
      if(pageSize >= 0){
         url += '&page_size=' + pageSize;
      }
      if(page >= 0){
         url += '&page=' + page;
      }
      return RConsole.find(FXmlConsole).sendAsync(url);
   }
   MO.FDrAbsResourceConsole_doQuery = function FDrAbsResourceConsole_doQuery(guid){
      var o = this;
      var url = '/' + o._serviceCode + '.ws?action=query&guid=' + guid;
      return RConsole.find(FXmlConsole).sendAsync(url);
   }
   MO.FDrAbsResourceConsole_doCreate = function FDrAbsResourceConsole_doCreate(resource){
      var o = this;
      var xdocument = new TXmlDocument();
      var xroot = xdocument.root();
      xroot.set('action', 'create');
      var xdata = xroot.create(resource.classCode());
      resource.saveConfig(xdata);
      return RConsole.find(FXmlConsole).sendAsync('/' + o._serviceCode + '.ws', xdocument);
   }
   MO.FDrAbsResourceConsole_doUpdate = function FDrAbsResourceConsole_doUpdate(resource){
      var o = this;
      var xdocument = new TXmlDocument();
      var xroot = xdocument.root();
      xroot.set('action', 'update');
      var xdata = xroot.create(resource.classCode());
      resource.saveConfig(xdata);
      return RConsole.find(FXmlConsole).sendAsync('/' + o._serviceCode + '.ws', xdocument);
   }
   MO.FDrAbsResourceConsole_doDelete = function FDrAbsResourceConsole_doDelete(guid){
      var o = this;
      var url = '/' + o._serviceCode + '.ws?action=delete&guid=' + guid;
      return RConsole.find(FXmlConsole).sendAsync(url);
   }
}
with(MO){
   MO.FDrBitmap = function FDrBitmap(o){
      o = RClass.inherits(this, o, FDrResource);
      o._classCode    = 'Bitmap';
      o._sizeWidth    = 0;
      o._sizeHeight   = 0;
      o.sizeWidth     = FDrBitmap_sizeWidth;
      o.setSizeWidth  = FDrBitmap_setSizeWidth;
      o.sizeHeight    = FDrBitmap_sizeHeight;
      o.setSizeHeight = FDrBitmap_setSizeHeight;
      o.loadConfig    = FDrBitmap_loadConfig;
      o.saveConfig    = FDrBitmap_saveConfig;
      return o;
   }
   MO.FDrBitmap_sizeWidth = function FDrBitmap_sizeWidth(){
      return this._sizeWidth;
   }
   MO.FDrBitmap_setSizeWidth = function FDrBitmap_setSizeWidth(width){
      this._sizeWidth = width;
   }
   MO.FDrBitmap_sizeHeight = function FDrBitmap_sizeHeight(){
      return this._sizeHeight;
   }
   MO.FDrBitmap_setSizeHeight = function FDrBitmap_setSizeHeight(height){
      this._sizeHeight = height;
   }
   MO.FDrBitmap_loadConfig = function FDrBitmap_loadConfig(xconfig){
      var o = this;
      o.__base.FDrResource.loadConfig.call(o, xconfig);
      o._sizeWidth = xconfig.getInteger('size_width');
      o._sizeHeight = xconfig.getInteger('size_height');
   }
   MO.FDrBitmap_saveConfig = function FDrBitmap_saveConfig(xconfig){
      var o = this;
      o.__base.FDrResource.saveConfig.call(o, xconfig);
      xconfig.set('size_width', o._sizeWidth);
      xconfig.set('size_height', o._sizeHeight);
   }
}
with(MO){
   MO.FDrBitmapConsole = function FDrBitmapConsole(o){
      o = RClass.inherits(this, o, FDrAbsResourceConsole);
      o._serviceCode = 'cloud.resource.bitmap';
      o._classUnit   = FDrBitmap;
      o.query        = FDrBitmapConsole_query;
      o.update       = FDrBitmapConsole_update;
      return o;
   }
   MO.FDrBitmapConsole_query = function FDrBitmapConsole_query(guid){
      var o = this;
      var uri = '/' + o._serviceCode + '.ws?action=query&guid=' + guid;
      var url = RBrowser.hostPath(uri);
      var xroot = RConsole.find(FXmlConsole).send(url);
      var nodeCount = xroot.nodeCount();
      for(var n = 0; n < nodeCount; n++){
         var xbitmap = xroot.node(n);
         if(xbitmap.isName('Bitmap')){
            o.loadResource(xbitmap);
         }
      }
      return o._resources.get(guid);
   }
   MO.FDrBitmapConsole_update = function FDrBitmapConsole_update(xconfig){
      var o = this;
      var uri = '/' + o._serviceCode + '.ws?action=update';
      var url = RBrowser.hostPath(uri);
      return RConsole.find(FXmlConsole).sendAsync(url, xconfig);
   }
}
with(MO){
   MO.FDrMaterial = function FDrMaterial(o){
      o = RClass.inherits(this, o, FDrResource);
      o._classCode = 'Material';
      o.loadConfig = FDrMaterial_loadConfig;
      o.saveConfig = FDrMaterial_saveConfig;
      return o;
   }
   MO.FDrMaterial_loadConfig = function FDrMaterial_loadConfig(xconfig){
      var o = this;
      o.__base.FDrResource.loadConfig.call(o, xconfig);
   }
   MO.FDrMaterial_saveConfig = function FDrMaterial_saveConfig(xconfig){
      var o = this;
      o.__base.FDrResource.saveConfig.call(o, xconfig);
   }
}
with(MO){
   MO.FDrMaterialConsole = function FDrMaterialConsole(o){
      o = RClass.inherits(this, o, FDrAbsResourceConsole);
      o._serviceCode = 'cloud.resource.material';
      o._classUnit   = FDrMaterial;
      o.query        = FDrMaterialConsole_query;
      o.update       = FDrMaterialConsole_update;
      o.deleteBitmap = FDrMaterialConsole_deleteBitmap;
      return o;
   }
   MO.FDrMaterialConsole_query = function FDrMaterialConsole_query(guid){
      var o = this;
      var uri = '/' + o._serviceCode + '.ws?action=query&guid=' + guid;
      var url = RBrowser.hostPath(uri);
      var xroot = RConsole.find(FXmlConsole).send(url);
      var nodeCount = xroot.nodeCount();
      for(var n = 0; n < nodeCount; n++){
         var xbitmap = xroot.node(n);
         if(xbitmap.isName('Material')){
            o.loadResource(xbitmap);
         }
      }
      return o._resources.get(guid);
   }
   MO.FDrMaterialConsole_update = function FDrMaterialConsole_update(xconfig){
      var o = this;
      var uri = '/' + o._serviceCode + '.ws?action=update';
      var url = RBrowser.hostPath(uri);
      return RConsole.find(FXmlConsole).sendAsync(url, xconfig);
   }
   MO.FDrMaterialConsole_deleteBitmap = function FDrMaterialConsole_deleteBitmap(guid){
      var o = this;
      var uri = '/' + o._serviceCode + '.ws?action=deleteBitmap&guid=' + guid;
      var url = RBrowser.hostPath(uri);
      return RConsole.find(FXmlConsole).sendAsync(url);
   }
}
with(MO){
   MO.FDrMesh = function FDrMesh(o){
      o = RClass.inherits(this, o, FDrResource);
      o._classCode = 'Mesh';
      return o;
   }
}
with(MO){
   MO.FDrMeshConsole = function FDrMeshConsole(o){
      o = RClass.inherits(this, o, FDrAbsResourceConsole);
      o._serviceCode = 'cloud.resource.mesh';
      o.update       = FDrMeshConsole_update;
      return o;
   }
   MO.FDrMeshConsole_update = function FDrMeshConsole_update(config){
      var o = this;
      var url = RBrowser.hostPath('/' + o._serviceCode + '.ws?action=update&date=' + RDate.format());
      return RConsole.find(FXmlConsole).sendAsync(url, config);
   }
}
with(MO){
   MO.FDrModel = function FDrModel(o){
      o = RClass.inherits(this, o, FDrResource);
      o._classCode = 'Model';
      return o;
   }
}
with(MO){
   MO.FDrModelConsole = function FDrModelConsole(o){
      o = RClass.inherits(this, o, FDrAbsResourceConsole);
      o._serviceCode = 'cloud.resource.model';
      o.update       = FDrModelConsole_update;
      return o;
   }
   MO.FDrModelConsole_update = function FDrModelConsole_update(config){
      var o = this;
      var url = RBrowser.hostPath('/' + o._serviceCode + '.ws?action=updateContent&date=' + RDate.format());
      return RConsole.find(FXmlConsole).sendAsync(url, config);
   }
}
with(MO){
   MO.FDrObject = function FDrObject(o){
      o = RClass.inherits(this, o, FObject);
      o._guid       = null;
      o._code       = null;
      o._label      = null;
      o.guid        = FDrObject_guid;
      o.code        = FDrObject_code;
      o.setCode     = FDrObject_setCode;
      o.label       = FDrObject_label;
      o.setLabel    = FDrObject_setLabel;
      o.unserialize = FDrObject_unserialize;
      o.saveConfig  = FDrObject_saveConfig;
      return o;
   }
   MO.FDrObject_guid = function FDrObject_guid(){
      return this._guid;
   }
   MO.FDrObject_code = function FDrObject_code(){
      return this._code;
   }
   MO.FDrObject_setCode = function FDrObject_setCode(p){
      this._code = p;
   }
   MO.FDrObject_label = function FDrObject_label(){
      return this._label;
   }
   MO.FDrObject_setLabel = function FDrObject_setLabel(p){
      this._label = p;
   }
   MO.FDrObject_unserialize = function FDrObject_unserialize(p){
      var o = this;
      o._guid = p.readString();
      o._code = p.readString();
      o._label = p.readString();
   }
   MO.FDrObject_saveConfig = function FDrObject_saveConfig(xconfig){
      var o = this;
      xconfig.setNvl('guid', o._guid);
      xconfig.setNvl('code', o._code);
      xconfig.setNvl('label', o._label);
   }
}
with(MO){
   MO.FDrProject = function FDrProject(o){
      o = RClass.inherits(this, o, FDrResource);
      o._classCode   = 'Project';
      o._projectGuid = null;
      o.saveConfig   = FDrProject_saveConfig;
      return o;
   }
   MO.FDrProject_saveConfig = function FDrProject_saveConfig(xconfig){
      var o = this;
      o.__base.FDrResource.saveConfig.call(o, xconfig);
      xconfig.setNvl('project_guid', o._projectGuid);
   }
}
with(MO){
   MO.FDrProjectConsole = function FDrProjectConsole(o){
      o = RClass.inherits(this, o, FDrAbsResourceConsole);
      o._serviceCode = 'cloud.solution.project';
      return o;
   }
}
with(MO){
   MO.FDrResource = function FDrResource(o){
      o = RClass.inherits(this, o, FDrObject, MAttributeGuid, MAttributeCode, MAttributeLabel);
      o._classCode = null;
      o.classCode  = FDrResource_classCode;
      o.loadConfig = FDrResource_loadConfig;
      o.saveConfig = FDrResource_saveConfig;
      return o;
   }
   MO.FDrResource_classCode = function FDrResource_classCode(){
      return this._classCode;
   }
   MO.FDrResource_loadConfig = function FDrResource_loadConfig(xconfig){
      var o = this;
      o._guid = xconfig.get('guid');
      o._code = xconfig.get('code');
      o._label = xconfig.get('label');
   }
   MO.FDrResource_saveConfig = function FDrResource_saveConfig(xconfig){
      var o = this;
      xconfig.setName(o._classCode);
      xconfig.set('guid', o._guid);
      xconfig.set('code', o._code);
      xconfig.set('label', o._label);
   }
}
with(MO){
   MO.FDrResourceConsole = function FDrResourceConsole(o){
      o = RClass.inherits(this, o, FDrAbsResourceConsole);
      o._serviceCode   = 'cloud.resource';
      o._catalogCode   = 'cloud.resource.catalog';
      o._resources     = null;
      o.construct      = FDrResourceConsole_construct;
      o.doList         = FDrResourceConsole_doList;
      o.doShare        = FDrResourceConsole_doShare;
      o.doDelete       = FDrResourceConsole_doDelete;
      o.doListShare    = FDrResourceConsole_doListShare;
      o.doFolderCreate = FDrResourceConsole_doFolderCreate;
      o.doFolderUpdate = FDrResourceConsole_doFolderUpdate;
      o.doFolderDelete = FDrResourceConsole_doFolderDelete;
      return o;
   }
   MO.FDrResourceConsole_construct = function FDrResourceConsole_construct(){
      var o = this;
      o.__base.FDrAbsResourceConsole.construct.call(o);
      o._resources = new TDictionary();
   }
   MO.FDrResourceConsole_doList = function FDrResourceConsole_doList(typeCd, search, order, pageSize, page){
      var o = this;
      var url = '/' + o._serviceCode + '.ws?action=list&type_cd=' + typeCd + '&serach=' + search + '&order=' + order + '&page_size=' + pageSize + '&page=' + page;
      return RConsole.find(FXmlConsole).sendAsync(url);
   }
   MO.FDrResourceConsole_doShare = function FDrResourceConsole_doShare(guid, shareCd){
      var o = this;
      var url = o.makeServiceUrl('share') + '&guid=' + guid + '&share_cd=' + shareCd;
      return RConsole.find(FXmlConsole).sendAsync(url);
   }
   MO.FDrResourceConsole_doDelete = function FDrResourceConsole_doDelete(typeCd, guid){
      var o = this;
      var url = '/' + o._serviceCode + '.ws?action=delete&type_cd=' + typeCd + '&guid=' + guid;
      return RConsole.find(FXmlConsole).sendAsync(url);
   }
   MO.FDrResourceConsole_doListShare = function FDrResourceConsole_doListShare(typeCd, search, order, pageSize, page){
      var o = this;
      var url = '/' + o._serviceCode + '.ws?action=listShare&type_cd=' + typeCd + '&serach=' + search + '&order=' + order + '&page_size=' + pageSize + '&page=' + page;
      return RConsole.find(FXmlConsole).sendAsync(url);
   }
   MO.FDrResourceConsole_doFolderCreate = function FDrResourceConsole_doFolderCreate(parentGuid, code, label){
      var o = this;
      var xdocument = new TXmlDocument();
      var xroot = xdocument.root();
      xroot.set('action', 'create');
      var xfolder = xroot.create('Folder');
      xfolder.set('parent_guid', parentGuid);
      xfolder.set('code', code);
      xfolder.set('label', label);
      return RConsole.find(FXmlConsole).sendAsync('/' + o._catalogCode + '.ws', xdocument);
   }
   MO.FDrResourceConsole_doFolderUpdate = function FDrResourceConsole_doFolderUpdate(guid, code, label){
      var o = this;
      var xdocument = new TXmlDocument();
      var xroot = xdocument.root();
      xroot.set('action', 'update');
      var xfolder = xroot.create('Folder');
      xfolder.set('guid', guid);
      xfolder.set('code', code);
      xfolder.set('label', label);
      return RConsole.find(FXmlConsole).sendAsync('/' + o._catalogCode + '.ws', xdocument);
   }
   MO.FDrResourceConsole_doFolderDelete = function FDrResourceConsole_doFolderDelete(guid){
      var o = this;
      var url = '/' + o._catalogCode + '.ws?action=delete&guid=' + guid;
      return RConsole.find(FXmlConsole).sendAsync(url);
   }
}
with(MO){
   MO.FDrScene = function FDrScene(o){
      o = RClass.inherits(this, o, FDrResource);
      o._classCode   = 'Scene';
      o._projectGuid = null;
      o.saveConfig   = FDrScene_saveConfig;
      return o;
   }
   MO.FDrScene_saveConfig = function FDrScene_saveConfig(xconfig){
      var o = this;
      o.__base.FDrResource.saveConfig.call(o, xconfig);
      xconfig.setNvl('project_guid', o._projectGuid);
   }
}
with(MO){
   MO.FDrSceneConsole = function FDrSceneConsole(o){
      o = RClass.inherits(this, o, FDrAbsResourceConsole);
      o._serviceCode = 'cloud.resource.scene';
      o.createCamera = FDrSceneConsole_createCamera;
      o.createLayer  = FDrSceneConsole_createLayer;
      o.createSprite = FDrSceneConsole_createSprite;
      o.createMovie  = FDrSceneConsole_createMovie;
      o.copyNode     = FDrSceneConsole_copyNode;
      o.deleteNode   = FDrSceneConsole_deleteNode;
      o.update       = FDrSceneConsole_update;
      return o;
   }
   MO.FDrSceneConsole_createCamera = function FDrSceneConsole_createCamera(xconfig){
      var o = this;
      var url = o.makeServiceUrl('createCamera');
      return RConsole.find(FXmlConsole).sendAsync(url, xconfig);
   }
   MO.FDrSceneConsole_createLayer = function FDrSceneConsole_createLayer(xconfig){
      var o = this;
      var url = o.makeServiceUrl('createLayer');
      return RConsole.find(FXmlConsole).sendAsync(url, xconfig);
   }
   MO.FDrSceneConsole_createSprite = function FDrSceneConsole_createSprite(xconfig){
      var o = this;
      var url = o.makeServiceUrl('createSprite');
      return RConsole.find(FXmlConsole).sendAsync(url, xconfig);
   }
   MO.FDrSceneConsole_createMovie = function FDrSceneConsole_createMovie(xconfig){
      var o = this;
      var url = o.makeServiceUrl('createMovie');
      return RConsole.find(FXmlConsole).sendAsync(url, xconfig);
   }
   MO.FDrSceneConsole_copyNode = function FDrSceneConsole_copyNode(sceneGuid, nodeGuid){
      var o = this;
      var url = o.makeServiceUrl('copyNode') + '&space_guid=' + sceneGuid + '&node_guid=' + nodeGuid;
      return RConsole.find(FXmlConsole).sendAsync(url);
   }
   MO.FDrSceneConsole_deleteNode = function FDrSceneConsole_deleteNode(sceneGuid, nodeGuid){
      var o = this;
      var url = o.makeServiceUrl('deleteNode') + '&space_guid=' + sceneGuid + '&node_guid=' + nodeGuid;
      return RConsole.find(FXmlConsole).sendAsync(url);
   }
   MO.FDrSceneConsole_update = function FDrSceneConsole_update(p){
      var o = this;
      var url = RBrowser.hostPath('/' + o._serviceCode + '.ws?action=updateContent&date=' + RDate.format());
      return RConsole.find(FXmlConsole).sendAsync(url, p);
   }
}
with(MO){
   MO.FDrTemplate = function FDrTemplate(o){
      o = RClass.inherits(this, o, FDrResource);
      o._classCode = 'Template';
      return o;
   }
}
with(MO){
   MO.FDrTemplateConsole = function FDrTemplateConsole(o){
      o = RClass.inherits(this, o, FDrAbsResourceConsole);
      o._serviceCode   = 'cloud.resource.template';
      o.selectMaterial = FDrTemplateConsole_selectMaterial;
      o.createDisplay  = FDrTemplateConsole_createDisplay;
      o.update         = FDrTemplateConsole_update;
      return o;
   }
   MO.FDrTemplateConsole_selectMaterial = function FDrTemplateConsole_selectMaterial(xconfig){
      var o = this;
      var url = o.makeServiceUrl('createMaterial');
      return RConsole.find(FXmlConsole).sendAsync(url, xconfig);
   }
   MO.FDrTemplateConsole_createDisplay = function FDrTemplateConsole_createDisplay(xconfig){
      var o = this;
      var url = o.makeServiceUrl('createDisplay');
      return RConsole.find(FXmlConsole).sendAsync(url, xconfig);
   }
   MO.FDrTemplateConsole_update = function FDrTemplateConsole_update(config){
      var o = this;
      var url = RBrowser.hostPath('/' + o._serviceCode + '.ws?action=updateContent&date=' + RDate.format());
      return RConsole.find(FXmlConsole).sendAsync(url, config);
   }
}
with(MO){
   MO.FDsCommonAnimationPropertyFrame = function FDsCommonAnimationPropertyFrame(o){
      o = RClass.inherits(this, o, FUiForm);
      o._visible         = false;
      o._activeSpace     = null;
      o._activeAnimation = null;
      o._controlGuid     = null;
      o._controlCode     = null;
      o._controlLabel    = null;
      o.onBuilded        = FDsCommonAnimationPropertyFrame_onBuilded;
      o.onDataChanged    = FDsCommonAnimationPropertyFrame_onDataChanged;
      o.construct        = FDsCommonAnimationPropertyFrame_construct;
      o.loadObject       = FDsCommonAnimationPropertyFrame_loadObject;
      o.dispose          = FDsCommonAnimationPropertyFrame_dispose;
      return o;
   }
   MO.FDsCommonAnimationPropertyFrame_construct = function FDsCommonAnimationPropertyFrame_construct(){
      var o = this;
      o.__base.FUiForm.construct.call(o);
   }
   MO.FDsCommonAnimationPropertyFrame_onBuilded = function FDsCommonAnimationPropertyFrame_onBuilded(p){
      var o = this;
      o.__base.FUiForm.onBuilded.call(o, p);
      o._controlCode.addDataChangedListener(o, o.onDataChanged);
      o._controlLabel.addDataChangedListener(o, o.onDataChanged);
      o._controlPlayRate.addDataChangedListener(o, o.onDataChanged);
   }
   MO.FDsCommonAnimationPropertyFrame_onDataChanged = function FDsCommonAnimationPropertyFrame_onDataChanged(p){
      var o = this;
      var animation = o._activeAnimation;
      var resource = animation.resource();
      resource.setCode(o._controlCode.get());
      resource.setLabel(o._controlLabel.get());
      resource._playRate = o._controlPlayRate.get();
      animation.reloadResource();
   }
   MO.FDsCommonAnimationPropertyFrame_loadObject = function FDsCommonAnimationPropertyFrame_loadObject(space, animation){
      var o = this;
      var resource = animation.resource();
      o._activeSpace = space;
      o._activeAnimation = animation;
      o._controlGuid.set(resource.guid());
      o._controlCode.set(resource.code());
      o._controlLabel.set(resource.label());
      o._controlPlayRate.set(resource.playRate());
   }
   MO.FDsCommonAnimationPropertyFrame_dispose = function FDsCommonAnimationPropertyFrame_dispose(){
      var o = this;
      o.__base.FUiForm.dispose.call(o);
   }
}
with(MO){
   MO.FDsCommonCameraFrame = function FDsCommonCameraFrame(o){
      o = RClass.inherits(this, o, FUiForm);
      o._workspace        = null;
      o._camera           = null;
      o._controlPosition  = null;
      o._controlDirection = null;
      o.construct         = FDsCommonCameraFrame_construct;
      o.loadObject        = FDsCommonCameraFrame_loadObject;
      o.dispose           = FDsCommonCameraFrame_dispose;
      return o;
   }
   MO.FDsCommonCameraFrame_construct = function FDsCommonCameraFrame_construct(){
      var o = this;
      o.__base.FUiForm.construct.call(o);
   }
   MO.FDsCommonCameraFrame_loadObject = function FDsCommonCameraFrame_loadObject(s, c){
      var o = this;
      var r = c._resource;
      o._camera = c;
      o._controlPosition.set(c.position());
      o._controlDirection.set(c.direction());
   }
   MO.FDsCommonCameraFrame_dispose = function FDsCommonCameraFrame_dispose(){
      var o = this;
      o.__base.FUiForm.dispose.call(o);
   }
}
with(MO){
   MO.FDsCommonCameraPropertyFrame = function FDsCommonCameraPropertyFrame(o){
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
      o.onBuilded         = FDsCommonCameraPropertyFrame_onBuilded;
      o.onDataChanged     = FDsCommonCameraPropertyFrame_onDataChanged;
      o.construct         = FDsCommonCameraPropertyFrame_construct;
      o.loadObject        = FDsCommonCameraPropertyFrame_loadObject;
      o.dispose           = FDsCommonCameraPropertyFrame_dispose;
      return o;
   }
   MO.FDsCommonCameraPropertyFrame_onBuilded = function FDsCommonCameraPropertyFrame_onBuilded(p){
      var o = this;
      o.__base.FUiForm.onBuilded.call(o, p);
      o._controlPosition.addDataChangedListener(o, o.onDataChanged);
      o._controlDirection.addDataChangedListener(o, o.onDataChanged);
   }
   MO.FDsCommonCameraPropertyFrame_onDataChanged = function FDsCommonCameraPropertyFrame_onDataChanged(p){
      var o = this;
      var camera = o._activeCamera;
      var resource = camera.resource();
      resource.position().assign(o._controlPosition.get());
      resource.direction().assign(o._controlDirection.get());
      camera.position().assign(resource.position());
      camera.direction().assign(resource.direction());
      camera.update();
   }
   MO.FDsCommonCameraPropertyFrame_construct = function FDsCommonCameraPropertyFrame_construct(){
      var o = this;
      o.__base.FUiForm.construct.call(o);
   }
   MO.FDsCommonCameraPropertyFrame_loadObject = function FDsCommonCameraPropertyFrame_loadObject(space, camera){
      var o = this;
      var resource = camera.resource();
      o._activeSpace = space;
      o._activeCamera = camera;
      o._controlGuid.set(resource.guid());
      o._controlCode.set(resource.code());
      o._controlLabel.set(resource.label());
      o._controlPosition.set(camera.position());
      o._controlDirection.set(camera.direction());
      resource.position().assign(camera.position());
      resource.direction().assign(camera.direction());
   }
   MO.FDsCommonCameraPropertyFrame_dispose = function FDsCommonCameraPropertyFrame_dispose(){
      var o = this;
      o.__base.FUiForm.dispose.call(o);
   }
}
with(MO){
   MO.FDsCommonDisplayDialog = function FDsCommonDisplayDialog(o){
      o = RClass.inherits(this, o, FUiDialog);
      o._frameName            = 'resource.common.dialog.DisplayDialog';
      o._displayModeCd        = null;
      o._controlLayerLabel    = null;
      o._controlDisplayLabel  = null;
      o._controlCode          = null;
      o._controlLabel         = null;
      o._controlTemplateCode  = null;
      o._controlConfirmButton = null;
      o._controlCancelButton  = null;
      o.onBuilded             = FDsCommonDisplayDialog_onBuilded;
      o.onConfirmLoad         = FDsCommonDisplayDialog_onConfirmLoad;
      o.onConfirmClick        = FDsCommonDisplayDialog_onConfirmClick;
      o.onCancelClick         = FDsCommonDisplayDialog_onCancelClick;
      o.construct             = FDsCommonDisplayDialog_construct;
      o.setSpace              = FDsCommonDisplayDialog_setSpace;
      o.setDisplayLabel       = FDsCommonDisplayDialog_setDisplayLabel;
      o.setContentCode        = FDsCommonDisplayDialog_setContentCode;
      o.setContentLabel       = FDsCommonDisplayDialog_setContentLabel;
      o.dispose               = FDsCommonDisplayDialog_dispose;
      return o;
   }
   MO.FDsCommonDisplayDialog_onBuilded = function FDsCommonDisplayDialog_onBuilded(p){
      var o = this;
      o.__base.FUiDialog.onBuilded.call(o, p);
      o._controlSpaceGuid.setEditAble(false);
      o._controlSpaceLabel.setEditAble(false);
      o._controlConfirm.addClickListener(o, o.onConfirmClick);
      o._controlCancel.addClickListener(o, o.onCancelClick);
   }
   MO.FDsCommonDisplayDialog_onConfirmLoad = function FDsCommonDisplayDialog_onConfirmLoad(event){
      var o = this;
      RConsole.find(FUiDesktopConsole).hide();
      o.hide();
   }
   MO.FDsCommonDisplayDialog_onConfirmClick = function FDsCommonDisplayDialog_onConfirmClick(event){
      var o = this;
      RConsole.find(FUiDesktopConsole).showUploading();
      var xaction = new TXmlNode('Action');
      var xsprite = xaction.create('Display');
      xsprite.set('space_guid', o._spaceGuid);
      xsprite.set('code', o._controlCode.get());
      xsprite.set('label', o._controlLabel.get());
      xsprite.set('model_guid', o._controlModelGuid.get());
      xsprite.set('model_code', o._controlModelCode.get());
      var connection = RConsole.find(FDrTemplateConsole).createDisplay(xaction);
      connection.addLoadListener(o, o.onConfirmLoad);
   }
   MO.FDsCommonDisplayDialog_onCancelClick = function FDsCommonDisplayDialog_onCancelClick(event){
      this.hide();
   }
   MO.FDsCommonDisplayDialog_construct = function FDsCommonDisplayDialog_construct(){
      var o = this;
      o.__base.FUiDialog.construct.call(o);
   }
   MO.FDsCommonDisplayDialog_setSpace = function FDsCommonDisplayDialog_setSpace(space){
      var o = this;
      var resource = space.resource();
      o._controlSpaceGuid.set(resource.guid());
      o._controlSpaceLabel.set(resource.makeLabel());
   }
   MO.FDsCommonDisplayDialog_setDisplayLabel = function FDsCommonDisplayDialog_setDisplayLabel(label){
      this._controlDisplayLabel.set(label);
   }
   MO.FDsCommonDisplayDialog_setContentCode = function FDsCommonDisplayDialog_setContentCode(label){
      this._controlCode.set(label);
   }
   MO.FDsCommonDisplayDialog_setContentLabel = function FDsCommonDisplayDialog_setContentLabel(label){
      this._controlLabel.set(label);
   }
   MO.FDsCommonDisplayDialog_dispose = function FDsCommonDisplayDialog_dispose(){
      var o = this;
      o.__base.FUiDialog.dispose.call(o);
   }
}
with(MO){
   MO.FDsCommonDisplayFrame = function FDsCommonDisplayFrame(o){
      o = RClass.inherits(this, o, FUiForm);
      o._activeSpace   = null;
      o._activeDisplay = null;
      o.onBuilded      = FDsCommonDisplayFrame_onBuilded;
      o.onDataChanged  = FDsCommonDisplayFrame_onDataChanged;
      o.construct      = FDsCommonDisplayFrame_construct;
      o.loadObject     = FDsCommonDisplayFrame_loadObject;
      o.dispose        = FDsCommonDisplayFrame_dispose;
      return o;
   }
   MO.FDsCommonDisplayFrame_onBuilded = function FDsCommonDisplayFrame_onBuilded(p){
      var o = this;
      o.__base.FUiForm.onBuilded.call(o, p);
      o._controlTranslate.addDataChangedListener(o, o.onDataChanged);
      o._controlRotation.addDataChangedListener(o, o.onDataChanged);
      o._controlScale.addDataChangedListener(o, o.onDataChanged);
   }
   MO.FDsCommonDisplayFrame_onDataChanged = function FDsCommonDisplayFrame_onDataChanged(p){
      var o = this;
      var display = o._activeDisplay;
      var resource = display.resource();
      var matrix = resource.matrix();
      var value = o._controlTranslate.get();
      matrix.setTranslate(value.x, value.y, value.z);
      var value = o._controlRotation.get();
      matrix.setRotation(value.x, value.y, value.z);
      var value = o._controlScale.get();
      matrix.setScale(value.x, value.y, value.z);
      matrix.update();
      display.matrix().assign(matrix);
   }
   MO.FDsCommonDisplayFrame_construct = function FDsCommonDisplayFrame_construct(){
      var o = this;
      o.__base.FUiForm.construct.call(o);
   }
   MO.FDsCommonDisplayFrame_loadObject = function FDsCommonDisplayFrame_loadObject(space, display){
      var o = this;
      var resource = display.resource();
      o._activeSpace = space;
      o._activeDisplay = display;
      var matrix = resource.matrix();
      o._controlTranslate.set(matrix.tx, matrix.ty, matrix.tz);
      o._controlRotation.set(matrix.rx, matrix.ry, matrix.rz);
      o._controlScale.set(matrix.sx, matrix.sy, matrix.sz);
   }
   MO.FDsCommonDisplayFrame_dispose = function FDsCommonDisplayFrame_dispose(){
      var o = this;
      o.__base.FUiForm.dispose.call(o);
   }
}
with(MO){
   MO.FDsCommonDisplayPropertyFrame = function FDsCommonDisplayPropertyFrame(o){
      o = RClass.inherits(this, o, FUiForm);
      o._visible        = false;
      o._workspace      = null;
      o._activeDisplay  = null;
      o._activeResource = null;
      o._controlGuid    = null;
      o._controlCode    = null;
      o._controlLabel   = null;
      o._displayFrame   = null;
      o._materialFrame  = null;
      o.onBuilded       = FDsCommonDisplayPropertyFrame_onBuilded;
      o.onDataChanged   = FDsCommonDisplayPropertyFrame_onDataChanged;
      o.construct       = FDsCommonDisplayPropertyFrame_construct;
      o.loadObject      = FDsCommonDisplayPropertyFrame_loadObject;
      o.dispose         = FDsCommonDisplayPropertyFrame_dispose;
      return o;
   }
   MO.FDsCommonDisplayPropertyFrame_onBuilded = function FDsCommonDisplayPropertyFrame_onBuilded(p){
      var o = this;
      o.__base.FUiForm.onBuilded.call(o, p);
      o._controlCode.addDataChangedListener(o, o.onDataChanged);
      o._controlLabel.addDataChangedListener(o, o.onDataChanged);
   }
   MO.FDsCommonDisplayPropertyFrame_onDataChanged = function FDsCommonDisplayPropertyFrame_onDataChanged(p){
      var o = this;
      var r = o._activeResource;
      r._code = o._controlCode.get();
      r._label = o._controlLabel.get();
   }
   MO.FDsCommonDisplayPropertyFrame_construct = function FDsCommonDisplayPropertyFrame_construct(){
      var o = this;
      o.__base.FUiForm.construct.call(o);
   }
   MO.FDsCommonDisplayPropertyFrame_loadObject = function FDsCommonDisplayPropertyFrame_loadObject(space, display){
      var o = this;
      var resource = display._resource;
      o._activeSpace = space;
      o._activeDisplay = display;
      o._controlGuid.set(resource.guid());
      o._controlCode.set(resource.code());
      o._controlLabel.set(resource.label());
      o._frameDisplay.loadObject(space, display);
   }
   MO.FDsCommonDisplayPropertyFrame_dispose = function FDsCommonDisplayPropertyFrame_dispose(){
      var o = this;
      o.__base.FUiForm.dispose.call(o);
   }
}
with(MO){
   MO.FDsCommonLayerDialog = function FDsCommonLayerDialog(o){
      o = RClass.inherits(this, o, FUiDialog);
      o._frameName            = 'resource.common.dialog.LayerDialog';
      o._displayModeCd        = null;
      o._controlSpaceGuid     = null;
      o._controlSpaceLabel    = null;
      o._controlCode          = null;
      o._controlLabel         = null;
      o._controlConfirmButton = null;
      o._controlCancelButton  = null;
      o.onBuilded             = FDsCommonLayerDialog_onBuilded;
      o.onConfirmLoad         = FDsCommonLayerDialog_onConfirmLoad;
      o.onConfirmClick        = FDsCommonLayerDialog_onConfirmClick;
      o.onCancelClick         = FDsCommonLayerDialog_onCancelClick;
      o.construct             = FDsCommonLayerDialog_construct;
      o.setSpace              = FDsCommonLayerDialog_setSpace;
      o.setDisplayLabel       = FDsCommonLayerDialog_setDisplayLabel;
      o.setContentCode        = FDsCommonLayerDialog_setContentCode;
      o.setContentLabel       = FDsCommonLayerDialog_setContentLabel;
      o.dispose               = FDsCommonLayerDialog_dispose;
      return o;
   }
   MO.FDsCommonLayerDialog_onBuilded = function FDsCommonLayerDialog_onBuilded(p){
      var o = this;
      o.__base.FUiDialog.onBuilded.call(o, p);
      o._controlSpaceGuid.setEditAble(false);
      o._controlSpaceLabel.setEditAble(false);
      o._controlConfirm.addClickListener(o, o.onConfirmClick);
      o._controlCancel.addClickListener(o, o.onCancelClick);
   }
   MO.FDsCommonLayerDialog_onConfirmLoad = function FDsCommonLayerDialog_onConfirmLoad(event){
      var o = this;
      RConsole.find(FUiDesktopConsole).hide();
      o.hide();
   }
   MO.FDsCommonLayerDialog_onConfirmClick = function FDsCommonLayerDialog_onConfirmClick(event){
      var o = this;
      RConsole.find(FUiDesktopConsole).showUploading();
      var xaction = new TXmlNode('Action');
      var xsprite = xaction.create('Layer');
      xsprite.set('space_guid', o._spaceGuid);
      xsprite.set('code', o._controlCode.get());
      xsprite.set('label', o._controlLabel.get());
      var connection = RConsole.find(FDrSceneConsole).createLayer(xaction);
      connection.addLoadListener(o, o.onConfirmLoad);
   }
   MO.FDsCommonLayerDialog_onCancelClick = function FDsCommonLayerDialog_onCancelClick(event){
      this.hide();
   }
   MO.FDsCommonLayerDialog_construct = function FDsCommonLayerDialog_construct(){
      var o = this;
      o.__base.FUiDialog.construct.call(o);
   }
   MO.FDsCommonLayerDialog_setSpace = function FDsCommonLayerDialog_setSpace(space){
      var o = this;
      var resource = space.resource();
      o._controlSpaceGuid.set(resource.guid());
      o._controlSpaceLabel.set(resource.makeLabel());
   }
   MO.FDsCommonLayerDialog_setDisplayLabel = function FDsCommonLayerDialog_setDisplayLabel(label){
      this._controlDisplayLabel.set(label);
   }
   MO.FDsCommonLayerDialog_setContentCode = function FDsCommonLayerDialog_setContentCode(label){
      this._controlCode.set(label);
   }
   MO.FDsCommonLayerDialog_setContentLabel = function FDsCommonLayerDialog_setContentLabel(label){
      this._controlLabel.set(label);
   }
   MO.FDsCommonLayerDialog_dispose = function FDsCommonLayerDialog_dispose(){
      var o = this;
      o.__base.FUiDialog.dispose.call(o);
   }
}
with(MO){
   MO.FDsCommonLayerPropertyFrame = function FDsCommonLayerPropertyFrame(o){
      o = RClass.inherits(this, o, FUiForm);
      o._visible       = false;
      o._workspace     = null;
      o._layer         = null;
      o._layerResource = null;
      o._controlGuid   = null;
      o._controlCode   = null;
      o._controlLabel  = null;
      o.onBuilded      = FDsCommonLayerPropertyFrame_onBuilded;
      o.onDataChanged  = FDsCommonLayerPropertyFrame_onDataChanged;
      o.construct      = FDsCommonLayerPropertyFrame_construct;
      o.loadObject     = FDsCommonLayerPropertyFrame_loadObject;
      o.dispose        = FDsCommonLayerPropertyFrame_dispose;
      return o;
   }
   MO.FDsCommonLayerPropertyFrame_construct = function FDsCommonLayerPropertyFrame_construct(){
      var o = this;
      o.__base.FUiForm.construct.call(o);
   }
   MO.FDsCommonLayerPropertyFrame_onBuilded = function FDsCommonLayerPropertyFrame_onBuilded(p){
      var o = this;
      o.__base.FUiForm.onBuilded.call(o, p);
      o._controlCode.addDataChangedListener(o, o.onDataChanged);
      o._controlLabel.addDataChangedListener(o, o.onDataChanged);
      o._controlTypeCd.addDataChangedListener(o, o.onDataChanged);
      o._controlTransformCd.addDataChangedListener(o, o.onDataChanged);
   }
   MO.FDsCommonLayerPropertyFrame_onDataChanged = function FDsCommonLayerPropertyFrame_onDataChanged(p){
      var o = this;
      var r = o._layerResource;
      r.setCode(o._controlCode.get());
      r.setLabel(o._controlLabel.get());
      r.setTypeCd(o._controlTypeCd.get());
      r.setTransformCd(o._controlTransformCd.get());
   }
   MO.FDsCommonLayerPropertyFrame_loadObject = function FDsCommonLayerPropertyFrame_loadObject(s, l){
      var o = this;
      var r = l.resource();
      o._layer = l;
      o._layerResource = r;
      o._controlGuid.set(r.guid());
      o._controlCode.set(r.code());
      o._controlLabel.set(r.label());
      o._controlTypeCd.set(r.typeCd());
      o._controlTransformCd.set(r.transformCd());
   }
   MO.FDsCommonLayerPropertyFrame_dispose = function FDsCommonLayerPropertyFrame_dispose(){
      var o = this;
      o.__base.FUiForm.dispose.call(o);
   }
}
with(MO){
   MO.FDsCommonLightPropertyFrame = function FDsCommonLightPropertyFrame(o){
      o = RClass.inherits(this, o, FUiForm);
      o._visible      = false;
      o._workspace    = null;
      o._activeSpace  = null;
      o._activeLight  = null;
      o._controlGuid  = null;
      o._controlCode  = null;
      o._controlLabel = null;
      o.construct     = FDsCommonLightPropertyFrame_construct;
      o.loadObject    = FDsCommonLightPropertyFrame_loadObject;
      o.dispose       = FDsCommonLightPropertyFrame_dispose;
      return o;
   }
   MO.FDsCommonLightPropertyFrame_construct = function FDsCommonLightPropertyFrame_construct(){
      var o = this;
      o.__base.FUiForm.construct.call(o);
   }
   MO.FDsCommonLightPropertyFrame_loadObject = function FDsCommonLightPropertyFrame_loadObject(space, light){
      var o = this;
      var resource = light.resource();
      o._activeSpace = space;
      o._activeLight = light;
      o._controlGuid.set(resource.guid());
      o._controlCode.set(resource.code());
      o._controlLabel.set(resource.label());
   }
   MO.FDsCommonLightPropertyFrame_dispose = function FDsCommonLightPropertyFrame_dispose(){
      var o = this;
      o.__base.FUiForm.dispose.call(o);
   }
}
with(MO){
   MO.FDsCommonMaterial1Frame = function FDsCommonMaterial1Frame(o){
      o = RClass.inherits(this, o, FUiForm);
      o._activeSpace           = null;
      o._activeMaterial        = null;
      o._controlOptionDouble   = null;
      o._controlEffectCode     = null;
      o._controlOptionAlpha    = null;
      o._controlAlphaBase      = null;
      o._controlAlphaRate      = null;
      o._controlOptionColor    = null;
      o._controlColorMin       = null;
      o._controlColorMax       = null;
      o._controlColorBalance   = null;
      o._controlColorRate      = null;
      o._controlOptionVertex   = null;
      o._controlVertexColor    = null;
      o._controlOptionAmbient  = null;
      o._controlAmbientColor   = null;
      o._controlOptionDiffuse  = null;
      o._controlDiffuseColor   = null;
      o._controlOptionSpecular = null;
      o._controlSpecularColor  = null;
      o._controlSpecularBase   = null;
      o._controlSpecularLevel  = null;
      o._controlOptionReflect  = null;
      o._controlReflectColor   = null;
      o._controlReflectMerge   = null;
      o._controlOptionEmissive = null;
      o._controlEmissiveColor  = null;
      o.onBuilded              = FDsCommonMaterial1Frame_onBuilded;
      o.onOptionChanged        = FDsCommonMaterial1Frame_onOptionChanged;
      o.onDataChanged          = FDsCommonMaterial1Frame_onDataChanged;
      o.construct              = FDsCommonMaterial1Frame_construct;
      o.loadObject             = FDsCommonMaterial1Frame_loadObject;
      o.dispose                = FDsCommonMaterial1Frame_dispose;
      return o;
   }
   MO.FDsCommonMaterial1Frame_onBuilded = function FDsCommonMaterial1Frame_onBuilded(p){
      var o = this;
      o.__base.FUiForm.onBuilded.call(o, p);
      o._controlOptionDouble.addDataChangedListener(o, o.onDataChanged);
      o._controlEffectCode.addDataChangedListener(o, o.onDataChanged);
      o._controlOptionAlpha.addDataChangedListener(o, o.onDataChanged);
      o._controlAlphaBase.addDataChangedListener(o, o.onDataChanged);
      o._controlAlphaRate.addDataChangedListener(o, o.onDataChanged);
      o._controlOptionColor.addDataChangedListener(o, o.onOptionChanged);
      o._controlColorMin.addDataChangedListener(o, o.onDataChanged);
      o._controlColorMax.addDataChangedListener(o, o.onDataChanged);
      o._controlColorBalance.addDataChangedListener(o, o.onDataChanged);
      o._controlColorRate.addDataChangedListener(o, o.onDataChanged);
      o._controlOptionVertex.addDataChangedListener(o, o.onOptionChanged);
      o._controlVertexColor.addDataChangedListener(o, o.onDataChanged);
      o._controlOptionAmbient.addDataChangedListener(o, o.onOptionChanged);
      o._controlAmbientColor.addDataChangedListener(o, o.onDataChanged);
      o._controlOptionDiffuse.addDataChangedListener(o, o.onOptionChanged);
      o._controlDiffuseColor.addDataChangedListener(o, o.onDataChanged);
      o._controlOptionSpecular.addDataChangedListener(o, o.onOptionChanged);
      o._controlSpecularColor.addDataChangedListener(o, o.onDataChanged);
      o._controlSpecularBase.addDataChangedListener(o, o.onDataChanged);
      o._controlSpecularLevel.addDataChangedListener(o, o.onDataChanged);
      o._controlOptionReflect.addDataChangedListener(o, o.onOptionChanged);
      o._controlReflectColor.addDataChangedListener(o, o.onDataChanged);
      o._controlReflectMerge.addDataChangedListener(o, o.onDataChanged);
      o._controlOptionEmissive.addDataChangedListener(o, o.onOptionChanged);
      o._controlEmissiveColor.addDataChangedListener(o, o.onDataChanged);
   }
   MO.FDsCommonMaterial1Frame_onOptionChanged = function FDsCommonMaterial1Frame_onOptionChanged(p){
      var o = this;
      var space = o._activeSpace;
      var material = o._activeMaterial;
   }
   MO.FDsCommonMaterial1Frame_onDataChanged = function FDsCommonMaterial1Frame_onDataChanged(p){
      var o = this;
      var space = o._activeSpace;
      var material = o._activeMaterial;
      var materialResource = material.resource();
      var infoResource = materialResource.info();
      infoResource.optionDouble = o._controlOptionDouble.get();
      infoResource.effectCode = o._controlEffectCode.get();
      infoResource.optionAlpha = o._controlOptionAlpha.get();
      infoResource.alphaBase = o._controlAlphaBase.get();
      infoResource.alphaRate = o._controlAlphaRate.get();
      infoResource.colorMin = o._controlColorMin.get();
      infoResource.colorMax = o._controlColorMax.get();
      infoResource.colorBalance = o._controlColorBalance.get();
      infoResource.colorRate = o._controlColorRate.get();
      infoResource.vertexColor.assign(o._controlVertexColor.get());
      infoResource.ambientColor.assign(o._controlAmbientColor.get());
      infoResource.diffuseColor.assign(o._controlDiffuseColor.get());
      infoResource.specularColor.assign(o._controlSpecularColor.get());
      infoResource.specularBase = o._controlSpecularBase.get();
      infoResource.specularLevel = o._controlSpecularLevel.get();
      infoResource.reflectColor.assign(o._controlReflectColor.get());
      infoResource.reflectMerge = o._controlReflectMerge.get();
      infoResource.emissiveColor.assign(o._controlEmissiveColor.get());
      material.reloadResource();
   }
   MO.FDsCommonMaterial1Frame_construct = function FDsCommonMaterial1Frame_construct(){
      var o = this;
      o.__base.FUiForm.construct.call(o);
   }
   MO.FDsCommonMaterial1Frame_loadObject = function FDsCommonMaterial1Frame_loadObject(space, material){
      var o = this;
      o._activeSpace = space;
      o._activeMaterial = material;
      var resource = material.resource();
      if(!resource){
         return;
      }
      var infoResource = resource.info();
      o._controlOptionDouble.set(infoResource.optionDouble);
      o._controlEffectCode.set(infoResource.effectCode);
      o._controlOptionAlpha.set(infoResource.optionAlpha);
      o._controlAlphaBase.set(infoResource.alphaBase);
      o._controlAlphaRate.set(infoResource.alphaRate);
      o._controlOptionColor.set(infoResource.optionColor);
      o._controlColorMin.set(infoResource.colorMin);
      o._controlColorMax.set(infoResource.colorMax);
      o._controlColorBalance.set(infoResource.colorBalance);
      o._controlColorRate.set(infoResource.colorRate);
      o._controlOptionVertex.set(infoResource.optionVertex);
      o._controlVertexColor.set(infoResource.vertexColor);
      o._controlOptionAmbient.set(infoResource.optionAmbient);
      o._controlAmbientColor.set(infoResource.ambientColor);
      o._controlOptionDiffuse.set(infoResource.optionDiffuse);
      o._controlDiffuseColor.set(infoResource.diffuseColor);
      o._controlOptionSpecular.set(infoResource.optionSpecular);
      o._controlSpecularColor.set(infoResource.specularColor);
      o._controlSpecularBase.set(infoResource.specularBase);
      o._controlSpecularLevel.set(infoResource.specularLevel);
      o._controlOptionReflect.set(infoResource.optionReflect);
      o._controlReflectColor.set(infoResource.reflectColor);
      o._controlReflectMerge.set(infoResource.reflectMerge);
      o._controlOptionEmissive.set(infoResource.optionEmissive);
      o._controlEmissiveColor.set(infoResource.emissiveColor);
   }
   MO.FDsCommonMaterial1Frame_dispose = function FDsCommonMaterial1Frame_dispose(){
      var o = this;
      o.__base.FUiForm.dispose.call(o);
   }
}
with(MO){
   MO.FDsCommonMaterial2Frame = function FDsCommonMaterial2Frame(o){
      o = RClass.inherits(this, o, FUiForm);
      o._activeSpace              = null;
      o._activeMaterial           = null;
      o._controlDiffuseViewColor  = null;
      o._controlSpecularViewColor = null;
      o._controlSpecularViewBase  = null;
      o._controlSpecularViewLevel = null;
      o.onBuilded                 = FDsCommonMaterial2Frame_onBuilded;
      o.onDataChanged             = FDsCommonMaterial2Frame_onDataChanged;
      o.construct                 = FDsCommonMaterial2Frame_construct;
      o.loadObject                = FDsCommonMaterial2Frame_loadObject;
      o.dispose                   = FDsCommonMaterial2Frame_dispose;
      return o;
   }
   MO.FDsCommonMaterial2Frame_onBuilded = function FDsCommonMaterial2Frame_onBuilded(p){
      var o = this;
      o.__base.FUiForm.onBuilded.call(o, p);
      o._controlOptionView.addDataChangedListener(o, o.onDataChanged);
      o._controlOptionNormalInvert.addDataChangedListener(o, o.onDataChanged);
      o._controlOptionShadow.addDataChangedListener(o, o.onDataChanged);
      o._controlOptionShadowSelf.addDataChangedListener(o, o.onDataChanged);
      o._controlDiffuseViewColor.addDataChangedListener(o, o.onDataChanged);
      o._controlSpecularViewColor.addDataChangedListener(o, o.onDataChanged);
      o._controlSpecularViewBase.addDataChangedListener(o, o.onDataChanged);
      o._controlSpecularViewLevel.addDataChangedListener(o, o.onDataChanged);
   }
   MO.FDsCommonMaterial2Frame_onDataChanged = function FDsCommonMaterial2Frame_onDataChanged(p){
      var o = this;
      var t = o._activeSpace;
      var m = o._activeMaterial;
      var mr = m.resource();
      var mi = mr.info();
      mi.optionView = o._controlOptionView.get();
      mi.optionNormalInvert = o._controlOptionNormalInvert.get();
      mi.optionShadow = o._controlOptionShadow.get();
      mi.optionShadowSelf = o._controlOptionShadowSelf.get();
      var v = o._controlDiffuseViewColor.get();
      mi.diffuseViewColor.assign(v);
      var v = o._controlSpecularViewColor.get();
      mi.specularViewColor.assign(v);
      mi.specularViewBase = o._controlSpecularViewBase.get();
      mi.specularViewLevel = o._controlSpecularViewLevel.get();
      m.reloadResource();
   }
   MO.FDsCommonMaterial2Frame_construct = function FDsCommonMaterial2Frame_construct(){
      var o = this;
      o.__base.FUiForm.construct.call(o);
   }
   MO.FDsCommonMaterial2Frame_loadObject = function FDsCommonMaterial2Frame_loadObject(space, material){
      var o = this;
      o._activeSpace = space;
      o._activeMaterial = material;
      var resource = material.resource();
      if(!resource){
         return;
      }
      var info = resource.info();
      o._controlOptionView.set(info.optionView);
      o._controlOptionNormalInvert.set(info.optionNormalInvert);
      o._controlOptionShadow.set(info.optionShadow);
      o._controlOptionShadowSelf.set(info.optionShadowSelf);
      o._controlDiffuseViewColor.set(info.diffuseViewColor);
      o._controlSpecularViewColor.set(info.specularViewColor);
      o._controlSpecularViewBase.set(info.specularViewBase);
      o._controlSpecularViewLevel.set(info.specularViewLevel);
   }
   MO.FDsCommonMaterial2Frame_dispose = function FDsCommonMaterial2Frame_dispose(){
      var o = this;
      o.__base.FUiForm.dispose.call(o);
   }
}
with(MO){
   MO.FDsCommonMaterialDialog = function FDsCommonMaterialDialog(o){
      o = RClass.inherits(this, o, FUiDialog);
      o._frameName            = 'resource.common.dialog.MaterialDialog';
      o._displayModeCd        = null;
      o._controlLayerLabel    = null;
      o._controlDisplayLabel  = null;
      o._controlCode          = null;
      o._controlLabel         = null;
      o._controlTemplateCode  = null;
      o._controlConfirmButton = null;
      o._controlCancelButton  = null;
      o.onBuilded             = FDsCommonMaterialDialog_onBuilded;
      o.onConfirmLoad         = FDsCommonMaterialDialog_onConfirmLoad;
      o.onConfirmClick        = FDsCommonMaterialDialog_onConfirmClick;
      o.onCancelClick         = FDsCommonMaterialDialog_onCancelClick;
      o.construct             = FDsCommonMaterialDialog_construct;
      o.setSpace              = FDsCommonMaterialDialog_setSpace;
      o.setDisplayLabel       = FDsCommonMaterialDialog_setDisplayLabel;
      o.setContentCode        = FDsCommonMaterialDialog_setContentCode;
      o.setContentLabel       = FDsCommonMaterialDialog_setContentLabel;
      o.dispose               = FDsCommonMaterialDialog_dispose;
      return o;
   }
   MO.FDsCommonMaterialDialog_onBuilded = function FDsCommonMaterialDialog_onBuilded(p){
      var o = this;
      o.__base.FUiDialog.onBuilded.call(o, p);
      o._controlSpaceGuid.setEditAble(false);
      o._controlSpaceLabel.setEditAble(false);
      o._controlConfirm.addClickListener(o, o.onConfirmClick);
      o._controlCancel.addClickListener(o, o.onCancelClick);
   }
   MO.FDsCommonMaterialDialog_onConfirmLoad = function FDsCommonMaterialDialog_onConfirmLoad(event){
      var o = this;
      RConsole.find(FUiDesktopConsole).hide();
      o.hide();
   }
   MO.FDsCommonMaterialDialog_onConfirmClick = function FDsCommonMaterialDialog_onConfirmClick(event){
      var o = this;
      RConsole.find(FUiDesktopConsole).showUploading();
      var xaction = new TXmlNode('Action');
      var xsprite = xaction.create('Material');
      xsprite.set('space_guid', o._spaceGuid);
      xsprite.set('code', o._controlCode.get());
      xsprite.set('label', o._controlLabel.get());
      xsprite.set('material_guid', o._controlMaterialGuid.get());
      xsprite.set('material_code', o._controlMaterialCode.get());
      var connection = RConsole.find(FDrTemplateConsole).selectMaterial(xaction);
      connection.addLoadListener(o, o.onConfirmLoad);
   }
   MO.FDsCommonMaterialDialog_onCancelClick = function FDsCommonMaterialDialog_onCancelClick(event){
      this.hide();
   }
   MO.FDsCommonMaterialDialog_construct = function FDsCommonMaterialDialog_construct(){
      var o = this;
      o.__base.FUiDialog.construct.call(o);
   }
   MO.FDsCommonMaterialDialog_setSpace = function FDsCommonMaterialDialog_setSpace(space){
      var o = this;
      var resource = space.resource();
      o._controlSpaceGuid.set(resource.guid());
      o._controlSpaceLabel.set(resource.makeLabel());
   }
   MO.FDsCommonMaterialDialog_setDisplayLabel = function FDsCommonMaterialDialog_setDisplayLabel(label){
      this._controlDisplayLabel.set(label);
   }
   MO.FDsCommonMaterialDialog_setContentCode = function FDsCommonMaterialDialog_setContentCode(label){
      this._controlCode.set(label);
   }
   MO.FDsCommonMaterialDialog_setContentLabel = function FDsCommonMaterialDialog_setContentLabel(label){
      this._controlLabel.set(label);
   }
   MO.FDsCommonMaterialDialog_dispose = function FDsCommonMaterialDialog_dispose(){
      var o = this;
      o.__base.FUiDialog.dispose.call(o);
   }
}
with(MO){
   MO.FDsCommonMaterialPropertyFrame = function FDsCommonMaterialPropertyFrame(o){
      o = RClass.inherits(this, o, FUiForm);
      o._visible        = false;
      o._workspace      = null;
      o._activeMaterial       = null;
      o._controlGuid    = null;
      o._controlCode    = null;
      o._controlLabel   = null;
      o._frameMaterial1 = null;
      o._frameMaterial2 = null;
      o.onBuilded       = FDsCommonMaterialPropertyFrame_onBuilded;
      o.onDataChanged   = FDsCommonMaterialPropertyFrame_onDataChanged;
      o.construct       = FDsCommonMaterialPropertyFrame_construct;
      o.loadObject      = FDsCommonMaterialPropertyFrame_loadObject;
      o.dispose         = FDsCommonMaterialPropertyFrame_dispose;
      return o;
   }
   MO.FDsCommonMaterialPropertyFrame_onBuilded = function FDsCommonMaterialPropertyFrame_onBuilded(p){
      var o = this;
      o.__base.FUiForm.onBuilded.call(o, p);
      o._controlLabel.addDataChangedListener(o, o.onDataChanged);
   }
   MO.FDsCommonMaterialPropertyFrame_onDataChanged = function FDsCommonMaterialPropertyFrame_onDataChanged(p){
      var o = this;
      var m = o._activeMaterial;
      var mr = m.resource();
      mr.setLabel(o._controlLabel.get());
   }
   MO.FDsCommonMaterialPropertyFrame_construct = function FDsCommonMaterialPropertyFrame_construct(){
      var o = this;
      o.__base.FUiForm.construct.call(o);
   }
   MO.FDsCommonMaterialPropertyFrame_loadObject = function FDsCommonMaterialPropertyFrame_loadObject(space, material){
      var o = this;
      var resource = material.resource();
      o._activeSpace = space;
      o._activeMaterial = material;
      o._controlGuid.set(resource.guid());
      o._controlCode.set(resource.code());
      o._controlLabel.set(resource.label());
      o._frameMaterial1.loadObject(space, material);
      o._frameMaterial2.loadObject(space, material);
   }
   MO.FDsCommonMaterialPropertyFrame_dispose = function FDsCommonMaterialPropertyFrame_dispose(){
      var o = this;
      o.__base.FUiForm.dispose.call(o);
   }
}
with(MO){
   MO.FDsCommonMaterialReferDialog = function FDsCommonMaterialReferDialog(o){
      o = RClass.inherits(this, o, FUiDialog);
      o._frameName      = 'resource.common.dialog.MaterialReferDialog';
      o._displayModeCd  = null;
      o._controlGuid    = null;
      o._controlCode    = null;
      o._controlLabel   = null;
      o._controlConfirm = null;
      o._controlCancel  = null;
      o.onBuilded       = FDsCommonMaterialReferDialog_onBuilded;
      o.onConfirmLoad   = FDsCommonMaterialReferDialog_onConfirmLoad;
      o.onConfirmClick  = FDsCommonMaterialReferDialog_onConfirmClick;
      o.onCancelClick   = FDsCommonMaterialReferDialog_onCancelClick;
      o.construct       = FDsCommonMaterialReferDialog_construct;
      o.setContentGuid  = FDsCommonMaterialReferDialog_setContentGuid;
      o.setContentCode  = FDsCommonMaterialReferDialog_setContentCode;
      o.setContentLabel = FDsCommonMaterialReferDialog_setContentLabel;
      o.dispose         = FDsCommonMaterialReferDialog_dispose;
      return o;
   }
   MO.FDsCommonMaterialReferDialog_onBuilded = function FDsCommonMaterialReferDialog_onBuilded(p){
      var o = this;
      o.__base.FUiDialog.onBuilded.call(o, p);
      o._controlConfirm.addClickListener(o, o.onConfirmClick);
      o._controlCancel.addClickListener(o, o.onCancelClick);
   }
   MO.FDsCommonMaterialReferDialog_onConfirmLoad = function FDsCommonMaterialReferDialog_onConfirmLoad(event){
      var o = this;
      RConsole.find(FUiDesktopConsole).hide();
      o.hide();
   }
   MO.FDsCommonMaterialReferDialog_onConfirmClick = function FDsCommonMaterialReferDialog_onConfirmClick(event){
      var o = this;
      o._materialRefer._guid = o._controlGuid.get();
      o.hide();
   }
   MO.FDsCommonMaterialReferDialog_onCancelClick = function FDsCommonMaterialReferDialog_onCancelClick(event){
      this.hide();
   }
   MO.FDsCommonMaterialReferDialog_construct = function FDsCommonMaterialReferDialog_construct(){
      var o = this;
      o.__base.FUiDialog.construct.call(o);
   }
   MO.FDsCommonMaterialReferDialog_setContentGuid = function FDsCommonMaterialReferDialog_setContentGuid(guid){
      this._controlGuid.set(guid);
   }
   MO.FDsCommonMaterialReferDialog_setContentCode = function FDsCommonMaterialReferDialog_setContentCode(code){
      this._controlCode.set(code);
   }
   MO.FDsCommonMaterialReferDialog_setContentLabel = function FDsCommonMaterialReferDialog_setContentLabel(label){
      this._controlLabel.set(label);
   }
   MO.FDsCommonMaterialReferDialog_dispose = function FDsCommonMaterialReferDialog_dispose(){
      var o = this;
      o.__base.FUiDialog.dispose.call(o);
   }
}
with(MO){
   MO.FDsCommonMovieDialog = function FDsCommonMovieDialog(o){
      o = RClass.inherits(this, o, FUiDialog);
      o._frameName            = 'resource.common.dialog.MovieDialog';
      o._displayModeCd        = null;
      o._controlLayerLabel    = null;
      o._controlDisplayLabel  = null;
      o._controlCode          = null;
      o._controlLabel         = null;
      o._controlTemplateCode  = null;
      o._controlConfirmButton = null;
      o._controlCancelButton  = null;
      o.onBuilded             = FDsCommonMovieDialog_onBuilded;
      o.onConfirmLoad         = FDsCommonMovieDialog_onConfirmLoad;
      o.onConfirmClick        = FDsCommonMovieDialog_onConfirmClick;
      o.onCancelClick         = FDsCommonMovieDialog_onCancelClick;
      o.construct             = FDsCommonMovieDialog_construct;
      o.setLayerLabel         = FDsCommonMovieDialog_setLayerLabel;
      o.setDisplayLabel       = FDsCommonMovieDialog_setDisplayLabel;
      o.setContentCode        = FDsCommonMovieDialog_setContentCode;
      o.setContentLabel       = FDsCommonMovieDialog_setContentLabel;
      o.dispose               = FDsCommonMovieDialog_dispose;
      return o;
   }
   MO.FDsCommonMovieDialog_onBuilded = function FDsCommonMovieDialog_onBuilded(p){
      var o = this;
      o.__base.FUiDialog.onBuilded.call(o, p);
      o._controlLayerLabel.setEditAble(false);
      o._controlDisplayLabel.setEditAble(false);
      o._controlConfirmButton.addClickListener(o, o.onConfirmClick);
      o._controlCancelButton.addClickListener(o, o.onCancelClick);
   }
   MO.FDsCommonMovieDialog_onConfirmLoad = function FDsCommonMovieDialog_onConfirmLoad(event){
      var o = this;
      RConsole.find(FUiDesktopConsole).hide();
      o.hide();
   }
   MO.FDsCommonMovieDialog_onConfirmClick = function FDsCommonMovieDialog_onConfirmClick(event){
      var o = this;
      RConsole.find(FUiDesktopConsole).showUploading();
      var xaction = new TXmlNode('Action');
      var xmovie = xaction.create('Movie');
      xmovie.set('space_guid', o._spaceGuid);
      xmovie.set('layer_guid', o._layerGuid);
      xmovie.set('display_guid', o._displayGuid);
      xmovie.set('code', o._controlCode.get());
      xmovie.set('label', o._controlLabel.get());
      xmovie.set('interval', o._controlInterval.get());
      xmovie.set('rotation', o._controlRotation.get());
      var console = RConsole.find(FDrSceneConsole);
      var connection = null;
      connection = console.createMovie(xaction);
      connection.addLoadListener(o, o.onConfirmLoad);
   }
   MO.FDsCommonMovieDialog_onCancelClick = function FDsCommonMovieDialog_onCancelClick(event){
      this.hide();
   }
   MO.FDsCommonMovieDialog_construct = function FDsCommonMovieDialog_construct(){
      var o = this;
      o.__base.FUiDialog.construct.call(o);
   }
   MO.FDsCommonMovieDialog_setLayerLabel = function FDsCommonMovieDialog_setLayerLabel(label){
      this._controlLayerLabel.set(label);
   }
   MO.FDsCommonMovieDialog_setDisplayLabel = function FDsCommonMovieDialog_setDisplayLabel(label){
      this._controlDisplayLabel.set(label);
   }
   MO.FDsCommonMovieDialog_setContentCode = function FDsCommonMovieDialog_setContentCode(label){
      this._controlCode.set(label);
   }
   MO.FDsCommonMovieDialog_setContentLabel = function FDsCommonMovieDialog_setContentLabel(label){
      this._controlLabel.set(label);
   }
   MO.FDsCommonMovieDialog_dispose = function FDsCommonMovieDialog_dispose(){
      var o = this;
      o.__base.FUiDialog.dispose.call(o);
   }
}
with(MO){
   MO.FDsCommonMoviePropertyFrame = function FDsCommonMoviePropertyFrame(o){
      o = RClass.inherits(this, o, FUiForm);
      o._visible         = false;
      o._activeSpace     = null;
      o._activeMovie = null;
      o._controlGuid     = null;
      o._controlCode     = null;
      o._controlLabel    = null;
      o.onBuilded        = FDsCommonMoviePropertyFrame_onBuilded;
      o.onDataChanged    = FDsCommonMoviePropertyFrame_onDataChanged;
      o.construct        = FDsCommonMoviePropertyFrame_construct;
      o.loadObject       = FDsCommonMoviePropertyFrame_loadObject;
      o.dispose          = FDsCommonMoviePropertyFrame_dispose;
      return o;
   }
   MO.FDsCommonMoviePropertyFrame_construct = function FDsCommonMoviePropertyFrame_construct(){
      var o = this;
      o.__base.FUiForm.construct.call(o);
   }
   MO.FDsCommonMoviePropertyFrame_onBuilded = function FDsCommonMoviePropertyFrame_onBuilded(p){
      var o = this;
      o.__base.FUiForm.onBuilded.call(o, p);
      o._controlCode.addDataChangedListener(o, o.onDataChanged);
      o._controlLabel.addDataChangedListener(o, o.onDataChanged);
      o._controlInterval.addDataChangedListener(o, o.onDataChanged);
      o._controlRotation.addDataChangedListener(o, o.onDataChanged);
   }
   MO.FDsCommonMoviePropertyFrame_onDataChanged = function FDsCommonMoviePropertyFrame_onDataChanged(p){
      var o = this;
      var movie = o._activeMovie;
      var resource = movie.resource();
      resource.setCode(o._controlCode.get());
      resource.setLabel(o._controlLabel.get());
      resource.setInterval(o._controlInterval.get());
      resource.rotation().assign(o._controlRotation.get());
      movie.reloadResource();
   }
   MO.FDsCommonMoviePropertyFrame_loadObject = function FDsCommonMoviePropertyFrame_loadObject(space, movie){
      var o = this;
      var resource = movie.resource();
      o._activeSpace = space;
      o._activeMovie = movie;
      o._controlGuid.set(resource.guid());
      o._controlCode.set(resource.code());
      o._controlLabel.set(resource.label());
      o._controlInterval.set(resource.interval());
      o._controlRotation.set(resource.rotation());
   }
   MO.FDsCommonMoviePropertyFrame_dispose = function FDsCommonMoviePropertyFrame_dispose(){
      var o = this;
      o.__base.FUiForm.dispose.call(o);
   }
}
with(MO){
   MO.FDsCommonProgramDialog = function FDsCommonProgramDialog(o){
      o = RClass.inherits(this, o, FUiDialog);
      o._frameName            = 'resource.common.dialog.ProgramDialog';
      o._displayModeCd        = null;
      o._controlLayerLabel    = null;
      o._controlDisplayLabel  = null;
      o._controlCode          = null;
      o._controlLabel         = null;
      o._controlTemplateCode  = null;
      o._controlConfirmButton = null;
      o._controlCancelButton  = null;
      o.onBuilded             = FDsCommonProgramDialog_onBuilded;
      o.onConfirmClick        = FDsCommonProgramDialog_onConfirmClick;
      o.construct             = FDsCommonProgramDialog_construct;
      o.setProgramCode        = FDsCommonProgramDialog_setProgramCode;
      o.setVertexSource       = FDsCommonProgramDialog_setVertexSource;
      o.setFragmentSource     = FDsCommonProgramDialog_setFragmentSource;
      o.dispose               = FDsCommonProgramDialog_dispose;
      return o;
   }
   MO.FDsCommonProgramDialog_onBuilded = function FDsCommonProgramDialog_onBuilded(p){
      var o = this;
      o.__base.FUiDialog.onBuilded.call(o, p);
      o._controlConfirm.addClickListener(o, o.onConfirmClick);
   }
   MO.FDsCommonProgramDialog_onConfirmClick = function FDsCommonProgramDialog_onConfirmClick(event){
      var o = this;
      o.hide();
   }
   MO.FDsCommonProgramDialog_construct = function FDsCommonProgramDialog_construct(){
      var o = this;
      o.__base.FUiDialog.construct.call(o);
   }
   MO.FDsCommonProgramDialog_setProgramCode = function FDsCommonProgramDialog_setProgramCode(value){
      this._controlCode.set(value);
   }
   MO.FDsCommonProgramDialog_setVertexSource = function FDsCommonProgramDialog_setVertexSource(source, targetSource){
      var o = this;
      o._controlVertexSource.set(source);
      o._controlVertexTargetSource.set(targetSource);
   }
   MO.FDsCommonProgramDialog_setFragmentSource = function FDsCommonProgramDialog_setFragmentSource(source, targetSource){
      var o = this;
      o._controlFragmentSource.set(source);
      o._controlFragmentTargetSource.set(targetSource);
   }
   MO.FDsCommonProgramDialog_dispose = function FDsCommonProgramDialog_dispose(){
      var o = this;
      o.__base.FUiDialog.dispose.call(o);
   }
}
with(MO){
   MO.FDsCommonRegionPropertyFrame = function FDsCommonRegionPropertyFrame(o){
      o = RClass.inherits(this, o, FUiForm);
      o._visible                   = false;
      o._workspace                 = null;
      o._activeSpace               = null;
      o._activeRegion              = null;
      o._controlMoveSpeed          = null;
      o._controlRotationKeySpeed   = null;
      o._controlRotationMouseSpeed = null;
      o._controlOptionBackground   = null;
      o._controlBackgroundColor    = null;
      o.onBuilded                  = FDsCommonRegionPropertyFrame_onBuilded;
      o.onDataChanged              = FDsCommonRegionPropertyFrame_onDataChanged;
      o.construct                  = FDsCommonRegionPropertyFrame_construct;
      o.loadObject                 = FDsCommonRegionPropertyFrame_loadObject;
      o.dispose                    = FDsCommonRegionPropertyFrame_dispose;
      return o;
   }
   MO.FDsCommonRegionPropertyFrame_onBuilded = function FDsCommonRegionPropertyFrame_onBuilded(p){
      var o = this;
      o.__base.FUiForm.onBuilded.call(o, p);
      o._controlMoveSpeed.addDataChangedListener(o, o.onDataChanged);
      o._controlRotationKeySpeed.addDataChangedListener(o, o.onDataChanged);
      o._controlRotationMouseSpeed.addDataChangedListener(o, o.onDataChanged);
      o._controlOptionBackground.addDataChangedListener(o, o.onDataChanged);
      o._controlBackgroundColor.addDataChangedListener(o, o.onDataChanged);
   }
   MO.FDsCommonRegionPropertyFrame_onDataChanged = function FDsCommonRegionPropertyFrame_onDataChanged(p){
      var o = this;
      var region = o._activeRegion;
      var resource = region.resource();
      resource.setOptionBackground(o._controlOptionBackground.get());
      resource.backgroundColor().assign(o._controlBackgroundColor.get());
      resource.setMoveSpeed(o._controlMoveSpeed.get());
      resource.setRotationKeySpeed(o._controlRotationKeySpeed.get());
      resource.setRotationMouseSpeed(o._controlRotationMouseSpeed.get());
      region.reloadResource();
      var canvasContent = o._frameSet._canvasContent;
      canvasContent.reloadRegion(region);
   }
   MO.FDsCommonRegionPropertyFrame_construct = function FDsCommonRegionPropertyFrame_construct(){
      var o = this;
      o.__base.FUiForm.construct.call(o);
   }
   MO.FDsCommonRegionPropertyFrame_loadObject = function FDsCommonRegionPropertyFrame_loadObject(space, region){
      var o = this;
      var resource = region.resource();
      o._activeSpace = space;
      o._activeRegion = region;
      o._controlMoveSpeed.set(resource.moveSpeed());
      o._controlRotationKeySpeed.set(resource.rotationKeySpeed());
      o._controlRotationMouseSpeed.set(resource.rotationMouseSpeed());
      o._controlOptionBackground.set(resource.optionBackground());
      o._controlBackgroundColor.set(resource.backgroundColor());
   }
   MO.FDsCommonRegionPropertyFrame_dispose = function FDsCommonRegionPropertyFrame_dispose(){
      var o = this;
      o.__base.FUiForm.dispose.call(o);
   }
}
with(MO){
   MO.FDsCommonRenderableFrame = function FDsCommonRenderableFrame(o){
      o = RClass.inherits(this, o, FUiForm);
      o._activeSpace      = null;
      o._activeRenderable = null;
      o.onBuilded         = FDsCommonRenderableFrame_onBuilded;
      o.onDataChanged     = FDsCommonRenderableFrame_onDataChanged;
      o.onMaterialClick   = FDsCommonRenderableFrame_onMaterialClick;
      o.onEffectClick     = FDsCommonRenderableFrame_onEffectClick;
      o.construct         = FDsCommonRenderableFrame_construct;
      o.loadObject        = FDsCommonRenderableFrame_loadObject;
      o.dispose           = FDsCommonRenderableFrame_dispose;
      return o;
   }
   MO.FDsCommonRenderableFrame_onBuilded = function FDsCommonRenderableFrame_onBuilded(p){
      var o = this;
      o.__base.FUiForm.onBuilded.call(o, p);
      o._controlTranslate.addDataChangedListener(o, o.onDataChanged);
      o._controlRotation.addDataChangedListener(o, o.onDataChanged);
      o._controlScale.addDataChangedListener(o, o.onDataChanged);
      o._controlMaterials.addClickListener(o, o.onMaterialClick);
      o._controlEffects.addClickListener(o, o.onEffectClick);
   }
   MO.FDsCommonRenderableFrame_onDataChanged = function FDsCommonRenderableFrame_onDataChanged(p){
      var o = this;
      var r = o._activeRenderable;
      var m = r.matrix();
      var v = o._controlTranslate.get();
      m.setTranslate(v.x, v.y, v.z);
      var v = o._controlRotation.get();
      m.setRotation(v.x, v.y, v.z);
      var v = o._controlScale.get();
      m.setScale(v.x, v.y, v.z);
      m.update();
   }
   MO.FDsCommonRenderableFrame_onMaterialClick = function FDsCommonRenderableFrame_onMaterialClick(event){
      var o = this;
      var item = event.item;
      var materialRefer = item.tag();
      var dialog = RConsole.find(FUiWindowConsole).find(FDsCommonMaterialReferDialog);
      dialog._frame = o;
      dialog._materialRefer = materialRefer;
      dialog.setContentCode('');
      dialog.setContentLabel('');
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsCommonRenderableFrame_onEffectClick = function FDsCommonRenderableFrame_onEffectClick(event){
      var o = this;
      var item = event.item;
      var effect = item.tag();
      var program = effect._program;
      var vertexShader = program.vertexShader();
      var fragmentShader = program.fragmentShader();
      var dialog = RConsole.find(FUiWindowConsole).find(FDsCommonProgramDialog);
      dialog._frameSet = o._frameSet;
      dialog.setProgramCode(effect._code);
      dialog.setVertexSource(vertexShader.source(), vertexShader.targetSource());
      dialog.setFragmentSource(fragmentShader.source(), fragmentShader.targetSource());
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsCommonRenderableFrame_construct = function FDsCommonRenderableFrame_construct(){
      var o = this;
      o.__base.FUiForm.construct.call(o);
   }
   MO.FDsCommonRenderableFrame_loadObject = function FDsCommonRenderableFrame_loadObject(space, renderable){
      var o = this;
      o._activeSpace = space;
      o._activeRenderable = renderable;
      var resource = renderable.resource();
      var matrix = renderable.matrix();
      o._controlTranslate.set(matrix.tx, matrix.ty, matrix.tz);
      o._controlRotation.set(matrix.rx, matrix.ry, matrix.rz);
      o._controlScale.set(matrix.sx, matrix.sy, matrix.sz);
      if(resource){
         var materialBox = o._controlMaterials;
         materialBox.clear();
         var indexBuffers = renderable.indexBuffers();
         var count = indexBuffers.count();
         for(var i = 0; i < count; i++){
            var materialRefer = resource.syncMaterialRefer(i);
            var item = materialBox.createItem(null, i + ': ' + materialRefer.guid());
            item.setTag(materialRefer);
            materialBox.push(item);
         }
      }
      var effectBox = o._controlEffects;
      effectBox.clear();
      var infos = renderable.infos();
      var count = infos.count();
      for(var i = 0; i < count; i++){
         var effect = infos.at(i).effect;
         if(effect){
            var item = effectBox.createItem(null, effect.code());
            item.setTag(effect);
            effectBox.push(item);
         }
      }
   }
   MO.FDsCommonRenderableFrame_dispose = function FDsCommonRenderableFrame_dispose(){
      var o = this;
      o.__base.FUiForm.dispose.call(o);
   }
}
with(MO){
   MO.FDsCommonRenderablePropertyFrame = function FDsCommonRenderablePropertyFrame(o){
      o = RClass.inherits(this, o, FUiForm);
      o._visible          = false;
      o._activeRenderable = null;
      o._activeMaterial   = null;
      o._controlGuid      = null;
      o._controlCode      = null;
      o._controlLabel     = null;
      o._frameRenderable  = null;
      o._frameMaterial1   = null;
      o._frameMaterial2   = null;
      o.construct         = FDsCommonRenderablePropertyFrame_construct;
      o.loadObject        = FDsCommonRenderablePropertyFrame_loadObject;
      o.dispose           = FDsCommonRenderablePropertyFrame_dispose;
      return o;
   }
   MO.FDsCommonRenderablePropertyFrame_construct = function FDsCommonRenderablePropertyFrame_construct(){
      var o = this;
      o.__base.FUiForm.construct.call(o);
   }
   MO.FDsCommonRenderablePropertyFrame_loadObject = function FDsCommonRenderablePropertyFrame_loadObject(space, renderable){
      var o = this;
      var material = renderable.material();
      var resource = renderable.renderable().resource();
      o._activeRenderable = renderable;
      o._activeMaterial = material;
      o._controlGuid.set(resource.guid());
      o._controlCode.set(resource.code());
      o._controlLabel.set(resource.label());
      o._frameRenderable.loadObject(space, renderable);
      o._frameMaterial1.loadObject(space, material);
      o._frameMaterial2.loadObject(space, material);
   }
   MO.FDsCommonRenderablePropertyFrame_dispose = function FDsCommonRenderablePropertyFrame_dispose(){
      var o = this;
      o.__base.FUiForm.dispose.call(o);
   }
}
with(MO){
   MO.FDsCommonShaderDialog = function FDsCommonShaderDialog(o){
      o = RClass.inherits(this, o, FUiDialog);
      o._frameName            = 'resource.common.dialog.ShaderDialog';
      o._displayModeCd        = null;
      o._controlLayerLabel    = null;
      o._controlDisplayLabel  = null;
      o._controlCode          = null;
      o._controlLabel         = null;
      o._controlTemplateCode  = null;
      o._controlConfirmButton = null;
      o._controlCancelButton  = null;
      o.onBuilded             = FDsCommonShaderDialog_onBuilded;
      o.onConfirmLoad         = FDsCommonShaderDialog_onConfirmLoad;
      o.onConfirmClick        = FDsCommonShaderDialog_onConfirmClick;
      o.onCancelClick         = FDsCommonShaderDialog_onCancelClick;
      o.construct             = FDsCommonShaderDialog_construct;
      o.setSpace              = FDsCommonShaderDialog_setSpace;
      o.setDisplayLabel       = FDsCommonShaderDialog_setDisplayLabel;
      o.setVertexSource       = FDsCommonShaderDialog_setVertexSource;
      o.setFragmentSource     = FDsCommonShaderDialog_setFragmentSource;
      o.dispose               = FDsCommonShaderDialog_dispose;
      return o;
   }
   MO.FDsCommonShaderDialog_onBuilded = function FDsCommonShaderDialog_onBuilded(p){
      var o = this;
      o.__base.FUiDialog.onBuilded.call(o, p);
      o._controlConfirm.addClickListener(o, o.onConfirmClick);
   }
   MO.FDsCommonShaderDialog_onConfirmClick = function FDsCommonShaderDialog_onConfirmClick(event){
      var o = this;
      o.hide();
   }
   MO.FDsCommonShaderDialog_construct = function FDsCommonShaderDialog_construct(){
      var o = this;
      o.__base.FUiDialog.construct.call(o);
   }
   MO.FDsCommonShaderDialog_setSpace = function FDsCommonShaderDialog_setSpace(space){
      var o = this;
   }
   MO.FDsCommonShaderDialog_setDisplayLabel = function FDsCommonShaderDialog_setDisplayLabel(label){
   }
   MO.FDsCommonShaderDialog_setVertexSource = function FDsCommonShaderDialog_setVertexSource(label){
   }
   MO.FDsCommonShaderDialog_setFragmentSource = function FDsCommonShaderDialog_setFragmentSource(label){
   }
   MO.FDsCommonShaderDialog_dispose = function FDsCommonShaderDialog_dispose(){
      var o = this;
      o.__base.FUiDialog.dispose.call(o);
   }
}
with(MO){
   MO.FDsCommonSpacePropertyFrame = function FDsCommonSpacePropertyFrame(o){
      o = RClass.inherits(this, o, FUiForm);
      o._visible      = false;
      o._workspace    = null;
      o._activeSpace  = null;
      o._controlGuid  = null;
      o._controlCode  = null;
      o._controlLabel = null;
      o.onBuilded     = FDsCommonSpacePropertyFrame_onBuilded;
      o.onDataChanged = FDsCommonSpacePropertyFrame_onDataChanged;
      o.construct     = FDsCommonSpacePropertyFrame_construct;
      o.loadObject    = FDsCommonSpacePropertyFrame_loadObject;
      o.dispose       = FDsCommonSpacePropertyFrame_dispose;
      return o;
   }
   MO.FDsCommonSpacePropertyFrame_onBuilded = function FDsCommonSpacePropertyFrame_onBuilded(p){
      var o = this;
      o.__base.FUiForm.onBuilded.call(o, p);
      o._controlLabel.addDataChangedListener(o, o.onDataChanged);
   }
   MO.FDsCommonSpacePropertyFrame_onDataChanged = function FDsCommonSpacePropertyFrame_onDataChanged(p){
      var o = this;
      var space = o._activeSpace;
      var resource = space.resource();
      resource.setLabel(o._controlLabel.get());
   }
   MO.FDsCommonSpacePropertyFrame_construct = function FDsCommonSpacePropertyFrame_construct(){
      var o = this;
      o.__base.FUiForm.construct.call(o);
   }
   MO.FDsCommonSpacePropertyFrame_loadObject = function FDsCommonSpacePropertyFrame_loadObject(space){
      var o = this;
      var resource = space.resource();
      o._activeSpace = space;
      o._controlGuid.set(resource.guid());
      o._controlCode.set(resource.code());
      o._controlLabel.set(resource.label());
   }
   MO.FDsCommonSpacePropertyFrame_dispose = function FDsCommonSpacePropertyFrame_dispose(){
      var o = this;
      o.__base.FUiForm.dispose.call(o);
   }
}
with(MO){
   MO.FDsCommonSpriteDialog = function FDsCommonSpriteDialog(o){
      o = RClass.inherits(this, o, FUiDialog);
      o._frameName            = 'resource.common.dialog.SpriteDialog';
      o._displayModeCd        = null;
      o._controlLayerLabel    = null;
      o._controlDisplayLabel  = null;
      o._controlCode          = null;
      o._controlLabel         = null;
      o._controlTemplateCode  = null;
      o._controlConfirmButton = null;
      o._controlCancelButton  = null;
      o.onBuilded             = FDsCommonSpriteDialog_onBuilded;
      o.onConfirmLoad         = FDsCommonSpriteDialog_onConfirmLoad;
      o.onConfirmClick        = FDsCommonSpriteDialog_onConfirmClick;
      o.onCancelClick         = FDsCommonSpriteDialog_onCancelClick;
      o.construct             = FDsCommonSpriteDialog_construct;
      o.setLayerLabel         = FDsCommonSpriteDialog_setLayerLabel;
      o.setDisplayLabel       = FDsCommonSpriteDialog_setDisplayLabel;
      o.setContentCode        = FDsCommonSpriteDialog_setContentCode;
      o.setContentLabel       = FDsCommonSpriteDialog_setContentLabel;
      o.dispose               = FDsCommonSpriteDialog_dispose;
      return o;
   }
   MO.FDsCommonSpriteDialog_onBuilded = function FDsCommonSpriteDialog_onBuilded(p){
      var o = this;
      o.__base.FUiDialog.onBuilded.call(o, p);
      o._controlLayerLabel.setEditAble(false);
      o._controlDisplayLabel.setEditAble(false);
      o._controlConfirmButton.addClickListener(o, o.onConfirmClick);
      o._controlCancelButton.addClickListener(o, o.onCancelClick);
   }
   MO.FDsCommonSpriteDialog_onConfirmLoad = function FDsCommonSpriteDialog_onConfirmLoad(event){
      var o = this;
      RConsole.find(FUiDesktopConsole).hide();
      o.hide();
      var catalog = o._frameSet._catalogContent;
      if(o._displayModeCd == EUiDataMode.Insert){
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
   MO.FDsCommonSpriteDialog_onConfirmClick = function FDsCommonSpriteDialog_onConfirmClick(event){
      var o = this;
      RConsole.find(FUiDesktopConsole).showUploading();
      var xaction = new TXmlNode('Action');
      var xsprite = xaction.create('Sprite');
      xsprite.set('space_guid', o._spaceGuid);
      xsprite.set('layer_guid', o._layerGuid);
      xsprite.set('display_guid', o._displayGuid);
      xsprite.set('code', o._controlCode.get());
      xsprite.set('label', o._controlLabel.get());
      xsprite.set('template_guid', o._controlTemplateGuid.get());
      xsprite.set('template_code', o._controlTemplateCode.get());
      var console = RConsole.find(FDrSceneConsole);
      var connection = null;
      connection = console.createSprite(xaction);
      connection.addLoadListener(o, o.onConfirmLoad);
   }
   MO.FDsCommonSpriteDialog_onCancelClick = function FDsCommonSpriteDialog_onCancelClick(event){
      this.hide();
   }
   MO.FDsCommonSpriteDialog_construct = function FDsCommonSpriteDialog_construct(){
      var o = this;
      o.__base.FUiDialog.construct.call(o);
   }
   MO.FDsCommonSpriteDialog_setLayerLabel = function FDsCommonSpriteDialog_setLayerLabel(label){
      this._controlLayerLabel.set(label);
   }
   MO.FDsCommonSpriteDialog_setDisplayLabel = function FDsCommonSpriteDialog_setDisplayLabel(label){
      this._controlDisplayLabel.set(label);
   }
   MO.FDsCommonSpriteDialog_setContentCode = function FDsCommonSpriteDialog_setContentCode(label){
      this._controlCode.set(label);
   }
   MO.FDsCommonSpriteDialog_setContentLabel = function FDsCommonSpriteDialog_setContentLabel(label){
      this._controlLabel.set(label);
   }
   MO.FDsCommonSpriteDialog_dispose = function FDsCommonSpriteDialog_dispose(){
      var o = this;
      o.__base.FUiDialog.dispose.call(o);
   }
}
with(MO){
   MO.FDsCommonTechniquePropertyFrame = function FDsCommonTechniquePropertyFrame(o){
      o = RClass.inherits(this, o, FUiForm);
      o._visible              = false;
      o._workspace            = null;
      o._activeSpace          = null;
      o._activeTechnique      = null;
      o._controlTriangleCount = null;
      o._controlDrawCount     = null;
      o._thread               = null;
      o._interval             = 2000;
      o.onBuilded             = FDsCommonTechniquePropertyFrame_onBuilded;
      o.onDataChanged         = FDsCommonTechniquePropertyFrame_onDataChanged;
      o.onModeClick           = FDsCommonTechniquePropertyFrame_onModeClick;
      o.onRefresh             = FDsCommonTechniquePropertyFrame_onRefresh;
      o.construct             = FDsCommonTechniquePropertyFrame_construct;
      o.loadObject            = FDsCommonTechniquePropertyFrame_loadObject;
      o.dispose               = FDsCommonTechniquePropertyFrame_dispose;
      return o;
   }
   MO.FDsCommonTechniquePropertyFrame_onBuilded = function FDsCommonTechniquePropertyFrame_onBuilded(p){
      var o = this;
      o.__base.FUiForm.onBuilded.call(o, p);
      o._controlRenderModes.addClickListener(o, o.onModeClick);
   }
   MO.FDsCommonTechniquePropertyFrame_onDataChanged = function FDsCommonTechniquePropertyFrame_onDataChanged(p){
      var o = this;
      var r = o._activeTechnique;
      r._code = o._controlCode.get();
      r._label = o._controlLabel.get();
      r._activeTechniqueCode = o._controlTechniqueCode.get();
   }
   MO.FDsCommonTechniquePropertyFrame_onModeClick = function FDsCommonTechniquePropertyFrame_onModeClick(ps, pi){
      var o = this;
      var m = pi.tag();
      o._activeTechnique._activeMode = m;
      o._activeSpace.dirty();
   }
   MO.FDsCommonTechniquePropertyFrame_onRefresh = function FDsCommonTechniquePropertyFrame_onRefresh(){
      var o = this;
      if(!o._statusVisible){
         return;
      }
      var s = o._activeSpace;
      var ss = s.statistics();
      var gs = s._graphicContext.statistics();
      o._controlFrameTick.set(ss._frame.toString());
      o._controlProcessTick.set(ss._frameProcess.toString() + ' | ' + ss._frameDrawRenderable.toString());
      o._controlDrawTick.set(ss._frameDraw.toString() + ' | ' + ss._frameDrawSort.toString());
      o._controlClearCount.set(gs._frameClearCount);
      o._controlModeInfo.set(
         'FIL:' + gs._frameFillModeCount +
         ' | DEP:' + gs._frameDepthModeCount +
         ' | CUL:' + gs._frameCullModeCount +
         ' | BLD:' + gs._frameBlendModeCount);
      o._controlProgramCount.set(gs._frameProgramCount);
      o._controlConstInfo.set(gs._frameConstCount + ' : length=' + gs._frameConstLength);
      o._controlBufferCount.set(gs._frameBufferCount);
      o._controlTextureCount.set(gs._frameTextureCount);
      o._controlTargetCount.set(gs._frameTargetCount);
      o._controlDrawInfo.set(gs._frameDrawCount + ' : triangle=' + gs._frameTriangleCount);
      o._controlProgramTotal.set(gs._programTotal);
      o._controlLayoutTotal.set(gs._layoutTotal);
      o._controlBufferInfo.set('Vertex:' + gs._vertexBufferTotal + ' Index:' + gs._indexBufferTotal);
      o._controlTextureInfo.set('Flat:' + gs._flatTextureTotal + ' Cube:' + gs._cubeTextureTotal);
      o._controlTargetTotal.set(gs._targetTotal);
   }
   MO.FDsCommonTechniquePropertyFrame_construct = function FDsCommonTechniquePropertyFrame_construct(){
      var o = this;
      o.__base.FUiForm.construct.call(o);
      var t = o._thread = RClass.create(FThread);
      t.setInterval(o._interval);
      t.addProcessListener(o, o.onRefresh);
      RConsole.find(FThreadConsole).start(t);
   }
   MO.FDsCommonTechniquePropertyFrame_loadObject = function FDsCommonTechniquePropertyFrame_loadObject(space, technique){
      var o = this;
      o._activeSpace = space;
      o._activeTechnique = technique;
      var ctlModes = o._controlRenderModes;
      ctlModes.clear();
      var modes = technique.modes();
      var c = modes.count();
      for(var i = 0; i < c; i++){
         var mode = modes.getAt(i);
         var item = ctlModes.createItem(null, mode.code());
         item.setTag(mode);
         ctlModes.push(item);
      }
      o.onRefresh();
   }
   MO.FDsCommonTechniquePropertyFrame_dispose = function FDsCommonTechniquePropertyFrame_dispose(){
      var o = this;
      o.__base.FUiForm.dispose.call(o);
   }
}
with(MO){
   MO.FDsCommonTemplateDialog = function FDsCommonTemplateDialog(o){
      o = RClass.inherits(this, o, FUiDialog);
      o._frameName            = 'resource.common.dialog.TemplateDialog';
      o._displayModeCd        = null;
      o._controlLayerLabel    = null;
      o._controlDisplayLabel  = null;
      o._controlCode          = null;
      o._controlLabel         = null;
      o._controlTemplateCode  = null;
      o._controlConfirmButton = null;
      o._controlCancelButton  = null;
      o.onBuilded             = FDsCommonTemplateDialog_onBuilded;
      o.onConfirmLoad         = FDsCommonTemplateDialog_onConfirmLoad;
      o.onConfirmClick        = FDsCommonTemplateDialog_onConfirmClick;
      o.onCancelClick         = FDsCommonTemplateDialog_onCancelClick;
      o.construct             = FDsCommonTemplateDialog_construct;
      o.setSpace              = FDsCommonTemplateDialog_setSpace;
      o.setDisplayLabel       = FDsCommonTemplateDialog_setDisplayLabel;
      o.setContentCode        = FDsCommonTemplateDialog_setContentCode;
      o.setContentLabel       = FDsCommonTemplateDialog_setContentLabel;
      o.dispose               = FDsCommonTemplateDialog_dispose;
      return o;
   }
   MO.FDsCommonTemplateDialog_onBuilded = function FDsCommonTemplateDialog_onBuilded(p){
      var o = this;
      o.__base.FUiDialog.onBuilded.call(o, p);
      o._controlConfirm.addClickListener(o, o.onConfirmClick);
      o._controlCancel.addClickListener(o, o.onCancelClick);
   }
   MO.FDsCommonTemplateDialog_onConfirmLoad = function FDsCommonTemplateDialog_onConfirmLoad(event){
      var o = this;
      RConsole.find(FUiDesktopConsole).hide();
      o.hide();
   }
   MO.FDsCommonTemplateDialog_onConfirmClick = function FDsCommonTemplateDialog_onConfirmClick(event){
      var o = this;
      RConsole.find(FUiDesktopConsole).showUploading();
      var xaction = new TXmlNode('Action');
      var xsprite = xaction.create('Display');
      xsprite.set('space_guid', o._spaceGuid);
      xsprite.set('code', o._controlCode.get());
      xsprite.set('label', o._controlLabel.get());
      xsprite.set('model_guid', o._controlModelGuid.get());
      xsprite.set('model_code', o._controlModelCode.get());
      var connection = RConsole.find(FDrTemplateConsole).createDisplay(xaction);
      connection.addLoadListener(o, o.onConfirmLoad);
   }
   MO.FDsCommonTemplateDialog_onCancelClick = function FDsCommonTemplateDialog_onCancelClick(event){
      this.hide();
   }
   MO.FDsCommonTemplateDialog_construct = function FDsCommonTemplateDialog_construct(){
      var o = this;
      o.__base.FUiDialog.construct.call(o);
   }
   MO.FDsCommonTemplateDialog_setSpace = function FDsCommonTemplateDialog_setSpace(space){
      var o = this;
      var resource = space.resource();
      o._controlSpaceGuid.set(resource.guid());
      o._controlSpaceLabel.set(resource.makeLabel());
   }
   MO.FDsCommonTemplateDialog_setDisplayLabel = function FDsCommonTemplateDialog_setDisplayLabel(label){
      this._controlDisplayLabel.set(label);
   }
   MO.FDsCommonTemplateDialog_setContentCode = function FDsCommonTemplateDialog_setContentCode(label){
      this._controlCode.set(label);
   }
   MO.FDsCommonTemplateDialog_setContentLabel = function FDsCommonTemplateDialog_setContentLabel(label){
      this._controlLabel.set(label);
   }
   MO.FDsCommonTemplateDialog_dispose = function FDsCommonTemplateDialog_dispose(){
      var o = this;
      o.__base.FUiDialog.dispose.call(o);
   }
}
with(MO){
   MO.FDsSolutionCatalogContent = function FDsSolutionCatalogContent(o){
      o = RClass.inherits(this, o, FUiDataTreeView, MListenerSelected);
      o._iconView             = 'resource.solution.view';
      o._iconViewNot          = 'resource.solution.viewno';
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
   MO.FDsSolutionCatalogContent_onLoaded = function FDsSolutionCatalogContent_onLoaded(p){
      var o = this;
      o.__base.FUiDataTreeView.onLoaded.call(o, p);
      this.buildCatalog();
   }
   MO.FDsSolutionCatalogContent_onBuild = function FDsSolutionCatalogContent_onBuild(p){
      var o = this;
      o.__base.FUiDataTreeView.onBuild.call(o, p);
      o.lsnsClick.register(o, o.onNodeClick);
      o.loadUrl('/cloud.describe.tree.ws?action=query&code=resource.solution');
   }
   MO.FDsSolutionCatalogContent_onLoadDisplay = function FDsSolutionCatalogContent_onLoadDisplay(p){
      var o = this;
      var n = p._linkNode;
      o.buildRecommend(n, p);
   }
   MO.FDsSolutionCatalogContent_onNodeClick = function FDsSolutionCatalogContent_onNodeClick(t, n){
      var o = this;
      var s = n.dataPropertyGet('linker');
      o.selectObject(s);
   }
   MO.FDsSolutionCatalogContent_onNodeViewClick = function FDsSolutionCatalogContent_onNodeViewClick(p){
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
   MO.FDsSolutionCatalogContent_onNodeViewDoubleClick = function FDsSolutionCatalogContent_onNodeViewDoubleClick(p){
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
   MO.FDsSolutionCatalogContent_construct = function FDsSolutionCatalogContent_construct(){
      var o = this;
      o.__base.FUiDataTreeView.construct.call(o);
      o._renderables = new TObjects();
      o._materials = new TObjects();
   }
   MO.FDsSolutionCatalogContent_buildTechnique = function FDsSolutionCatalogContent_buildTechnique(n, p){
      var o = this;
      var nt = o.createNode();
      nt.setLabel('Technique');
      nt.setTypeCode('technique');
      nt.dataPropertySet('linker', p);
      n.appendNode(nt);
   }
   MO.FDsSolutionCatalogContent_buildPrivate = function FDsSolutionCatalogContent_buildPrivate(parent){
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
   MO.FDsSolutionCatalogContent_buildRecommend = function FDsSolutionCatalogContent_buildRecommend(parent){
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
   MO.FDsSolutionCatalogContent_buildGroup = function FDsSolutionCatalogContent_buildGroup(parent){
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
   MO.FDsSolutionCatalogContent_buildCatalog = function FDsSolutionCatalogContent_buildCatalog(){
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
   MO.FDsSolutionCatalogContent_selectObject = function FDsSolutionCatalogContent_selectObject(p){
      var o = this;
      if(p != null){
         o.processSelectedListener(p, true);
      }
   }
   MO.FDsSolutionCatalogContent_showObject = function FDsSolutionCatalogContent_showObject(p){
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
   MO.FDsSolutionCatalogContent_dispose = function FDsSolutionCatalogContent_dispose(){
      var o = this;
      o._displays = RObject.dispose(o._displays);
      o._renderables = RObject.dispose(o._renderables);
      o._materials = RObject.dispose(o._materials);
      o.__base.FUiDataTreeView.dispose.call(o);
   }
}
with(MO){
   MO.FDsSolutionCatalogToolBar = function FDsSolutionCatalogToolBar(o){
      o = RClass.inherits(this, o, FUiToolBar);
      o._frameName       = 'resource.private.solution.CatalogToolBar';
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
   MO.FDsSolutionCatalogToolBar_onBuilded = function FDsSolutionCatalogToolBar_onBuilded(p){
      var o = this;
      o.__base.FUiToolBar.onBuilded.call(o, p);
   }
   MO.FDsSolutionCatalogToolBar_onModeClick = function FDsSolutionCatalogToolBar_onModeClick(p){
      var o = this;
      o._canvasModeCd = p._canvasModeCd;
      o._workspace._canvas.switchMode(p._canvasModeCd);
   }
   MO.FDsSolutionCatalogToolBar_onRotationClick = function FDsSolutionCatalogToolBar_onRotationClick(p, v){
      var o = this;
      var c = o._workspace._canvas;
      c.switchRotation(v);
   }
   MO.FDsSolutionCatalogToolBar_construct = function FDsSolutionCatalogToolBar_construct(){
      var o = this;
      o.__base.FUiToolBar.construct.call(o);
   }
   MO.FDsSolutionCatalogToolBar_dispose = function FDsSolutionCatalogToolBar_dispose(){
      var o = this;
      o.__base.FUiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsSolutionFrameSet = function FDsSolutionFrameSet(o){
      o = RClass.inherits(this, o, FUiFrameSet, MUiStorage);
      o._frameName            = 'resource.private.solution.FrameSet';
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
   MO.FDsSolutionFrameSet_onBuilded = function FDsSolutionFrameSet_onBuilded(p){
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
   MO.FDsSolutionFrameSet_construct = function FDsSolutionFrameSet_construct(){
      var o = this;
      o.__base.FUiFrameSet.construct.call(o);
      o._propertyFrames = new TDictionary();
   }
   MO.FDsSolutionFrameSet_findPropertyFrame = function FDsSolutionFrameSet_findPropertyFrame(p){
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
   MO.FDsSolutionFrameSet_selectObject = function FDsSolutionFrameSet_selectObject(control){
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
   MO.FDsSolutionFrameSet_switchContent = function FDsSolutionFrameSet_switchContent(typeCd){
      var o = this;
      o._activeResourceCd = typeCd;
      o._listContent.serviceSearch(typeCd, '', o._pageSize, 0);
   }
   MO.FDsSolutionFrameSet_load = function FDsSolutionFrameSet_load(){
      var o = this;
      o._listContent.serviceSearch('private', '', o._pageSize, 0);
   }
   MO.FDsSolutionFrameSet_dispose = function FDsSolutionFrameSet_dispose(){
      var o = this;
      o.__base.FUiFrameSet.dispose.call(o);
      o._propertyFrames.dispose();
      o._propertyFrames = null;
   }
}
with(MO){
   MO.FDsSolutionListContent = function FDsSolutionListContent(o){
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
   MO.FDsSolutionListContent_onBuilded = function FDsSolutionListContent_onBuilded(p){
      var o = this;
      o.__base.FUiListView.onBuilded.call(o, p);
   }
   MO.FDsSolutionListContent_onServiceLoad = function FDsSolutionListContent_onServiceLoad(p){
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
   MO.FDsSolutionListContent_construct = function FDsSolutionListContent_construct(){
      var o = this;
      o.__base.FUiListView.construct.call(o);
   }
   MO.FDsSolutionListContent_doClickItem = function FDsSolutionListContent_doClickItem(control){
      var o = this;
      o.__base.FUiListView.doClickItem.call(o, control);
      o._activeControl = control;
      o._activeGuid = control._guid;
   }
   MO.FDsSolutionListContent_doDoubleClickItem = function FDsSolutionListContent_doDoubleClickItem(control){
      var o = this;
      o.__base.FUiListView.doDoubleClickItem.call(o, control);
      var guid = control._guid;
      o._activeControl = control;
      o._activeGuid = guid;
      var workspace = o._frameSet._workspace;
      workspace.selectFrameSet(EDsFrameSet.PrivateProjectFrameSet, guid);
   }
   MO.FDsSolutionListContent_serviceSearch = function FDsSolutionListContent_serviceSearch(typeCd, serach, pageSize, page){
      var o = this;
      o._typeCd = typeCd;
      o._serach = serach;
      o._pageSize = pageSize;
      o._page = page;
      RWindow.disable();
      var connection = RConsole.find(FDrProjectConsole).doList(serach, null, pageSize, page);
      connection.addLoadListener(o, o.onServiceLoad);
   }
   MO.FDsSolutionListContent_serviceResearch = function FDsSolutionListContent_serviceResearch(){
      var o = this;
      o.serviceSearch(o._typeCd, o._serach, o._pageSize, o._page);
   }
   MO.FDsSolutionListContent_dispose = function FDsSolutionListContent_dispose(){
      var o = this;
      o.__base.FUiListView.dispose.call(o);
   }
}
with(MO){
   MO.FDsSolutionListItem = function FDsSolutionListItem(o){
      o = RClass.inherits(this, o, FUiListViewItem);
      o.onBuild      = FDsSolutionListItem_onBuild;
      o.refreshStyle = FDsSolutionListItem_refreshStyle;
      return o;
   }
   MO.FDsSolutionListItem_onBuild = function FDsSolutionListItem_onBuild(p){
      var o = this;
      o.__base.FUiListViewItem.onBuild.call(o, p);
      var h = o._hPanel;
      h.style.width = '200px';
      h.style.height = '150px';
   }
   MO.FDsSolutionListItem_refreshStyle = function FDsSolutionListItem_refreshStyle(){
      var o = this;
      var url = '/cloud.content.resource.preview.wv?type_cd=' + o._typeCd + '&guid=' + o._guid;
      o._hForm.style.backgroundImage = 'url("' + url + '")';
   }
}
with(MO){
   MO.FDsSolutionListToolBar = function FDsSolutionListToolBar(o){
      o = RClass.inherits(this, o, FUiToolBar);
      o._frameName       = 'resource.private.solution.ListToolBar';
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
   MO.FDsSolutionListToolBar_onBuilded = function FDsSolutionListToolBar_onBuilded(p){
      var o = this;
      o.__base.FUiToolBar.onBuilded.call(o, p);
      o._controlSearchEdit.addClickListener(o, o.onSearchClick);
      o._controlFirstButton.addClickListener(o, o.onNavigatorClick);
      o._controlPriorButton.addClickListener(o, o.onNavigatorClick);
      o._controlNextButton.addClickListener(o, o.onNavigatorClick);
      o._controlLastButton.addClickListener(o, o.onNavigatorClick);
   }
   MO.FDsSolutionListToolBar_onSearchClick = function FDsSolutionListToolBar_onSearchClick(p){
      this.doNavigator(0);
   }
   MO.FDsSolutionListToolBar_onNavigatorClick = function FDsSolutionListToolBar_onNavigatorClick(event){
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
   MO.FDsSolutionListToolBar_construct = function FDsSolutionListToolBar_construct(){
      var o = this;
      o.__base.FUiToolBar.construct.call(o);
   }
   MO.FDsSolutionListToolBar_setNavigator = function FDsSolutionListToolBar_setNavigator(pageSize, pageCount, page){
      var o = this;
      o._pageSize = pageSize;
      o._pageCount = pageCount;
      o._page = page;
      o._controlPageEdit.setText(page);
   }
   MO.FDsSolutionListToolBar_doNavigator = function FDsSolutionListToolBar_doNavigator(page){
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
   MO.FDsSolutionListToolBar_dispose = function FDsSolutionListToolBar_dispose(){
      var o = this;
      o.__base.FUiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsSolutionMenuBar = function FDsSolutionMenuBar(o){
      o = RClass.inherits(this, o, FUiMenuBar);
      o._frameName      = 'resource.private.solution.MenuBar';
      o._refreshButton  = null;
      o._saveButton     = null;
      o._runButton      = null;
      o.onBuilded       = FDsSolutionMenuBar_onBuilded;
      o.onCreateClick   = FDsSolutionMenuBar_onCreateClick;
      o.onDeleteLoad    = FDsSolutionMenuBar_onDeleteLoad;
      o.onDeleteExecute = FDsSolutionMenuBar_onDeleteExecute;
      o.onDeleteClick   = FDsSolutionMenuBar_onDeleteClick;
      o.construct       = FDsSolutionMenuBar_construct;
      o.dispose         = FDsSolutionMenuBar_dispose;
      return o;
   }
   MO.FDsSolutionMenuBar_onBuilded = function FDsSolutionMenuBar_onBuilded(p){
      var o = this;
      o.__base.FUiMenuBar.onBuilded.call(o, p);
      o._controlCreateButton.addClickListener(o, o.onCreateClick);
      o._controlDeleteButton.addClickListener(o, o.onDeleteClick);
   }
   MO.FDsSolutionMenuBar_onCreateClick = function FDsSolutionMenuBar_onCreateClick(event){
      var o = this;
      var dialog = RConsole.find(FUiWindowConsole).find(FDsSolutionProjectDialog);
      dialog._frameSet = o._frameSet;
      dialog._workspace = o._workspace;
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsSolutionMenuBar_onDeleteLoad = function FDsSolutionMenuBar_onDeleteLoad(event){
      var o = this;
      RConsole.find(FUiDesktopConsole).hide();
      var frame = o._frameSet._listContent;
      frame.serviceResearch();
   }
   MO.FDsSolutionMenuBar_onDeleteExecute = function FDsSolutionMenuBar_onDeleteExecute(event){
      var o = this;
      if(event.resultCd != EResult.Success){
         RConsole.find(FUiDesktopConsole).hide();
         return
      }
      var listContent = o._frameSet._listContent;
      var guid = listContent._activeGuid;
      RConsole.find(FUiDesktopConsole).showUploading();
      var connection = RConsole.find(FDrProjectConsole).doDelete(guid);
      connection.addLoadListener(o, o.onDeleteLoad);
   }
   MO.FDsSolutionMenuBar_onDeleteClick = function FDsSolutionMenuBar_onDeleteClick(event){
      var o = this;
      var item = o._frameSet._listContent.focusItem();
      if(!item){
         return alert('请选中后再点击删除');
      }
      var dialog = RConsole.find(FUiMessageConsole).showConfirm('请确认是否删除当前项目？');
      dialog.addResultListener(o, o.onDeleteExecute);
   }
   MO.FDsSolutionMenuBar_construct = function FDsSolutionMenuBar_construct(){
      var o = this;
      o.__base.FUiMenuBar.construct.call(o);
   }
   MO.FDsSolutionMenuBar_dispose = function FDsSolutionMenuBar_dispose(){
      var o = this;
      o.__base.FUiMenuBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsSolutionProjectDialog = function FDsSolutionProjectDialog(o){
      o = RClass.inherits(this, o, FUiDialog);
      o._frameName            = 'resource.private.solution.ProjectDialog';
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
   MO.FDsSolutionProjectDialog_onBuilded = function FDsSolutionProjectDialog_onBuilded(p){
      var o = this;
      o.__base.FUiDialog.onBuilded.call(o, p);
      o._controlConfirmButton.addClickListener(o, o.onConfirmClick);
      o._controlCancelButton.addClickListener(o, o.onCancelClick);
   }
   MO.FDsSolutionProjectDialog_onConfirmLoad = function FDsSolutionProjectDialog_onConfirmLoad(event){
      var o = this;
      var frame = o._frameSet._listContent;
      frame.serviceResearch();
      o.hide();
      RWindow.enable();
   }
   MO.FDsSolutionProjectDialog_onConfirmClick = function FDsSolutionProjectDialog_onConfirmClick(event){
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
   MO.FDsSolutionProjectDialog_onCancelClick = function FDsSolutionProjectDialog_onCancelClick(event){
      this.hide();
   }
   MO.FDsSolutionProjectDialog_construct = function FDsSolutionProjectDialog_construct(){
      var o = this;
      o.__base.FUiDialog.construct.call(o);
   }
   MO.FDsSolutionProjectDialog_dispose = function FDsSolutionProjectDialog_dispose(){
      var o = this;
      o.__base.FUiDialog.dispose.call(o);
   }
}
with(MO){
   MO.FDsSolutionProjectProperty = function FDsSolutionProjectProperty(o){
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
   MO.FDsSolutionProjectProperty_onBuilded = function FDsSolutionProjectProperty_onBuilded(p){
      var o = this;
      o.__base.FUiForm.onBuilded.call(o, p);
   }
   MO.FDsSolutionProjectProperty_onDataChanged = function FDsSolutionProjectProperty_onDataChanged(p){
      var o = this;
      var camera = o._activeCamera;
      var resource = camera.resource();
      resource.position().assign(o._controlPosition.get());
      resource.direction().assign(o._controlDirection.get());
      camera.position().assign(resource.position());
      camera.direction().assign(resource.direction());
      camera.update();
   }
   MO.FDsSolutionProjectProperty_onLoadProject = function FDsSolutionProjectProperty_onLoadProject(event){
      var o = this;
      var xproject = event.root.findNode('Project');
      o._controlCode.set(xproject.get('code'));
      o._controlLabel.set(xproject.get('label'));
   }
   MO.FDsSolutionProjectProperty_construct = function FDsSolutionProjectProperty_construct(){
      var o = this;
      o.__base.FUiForm.construct.call(o);
   }
   MO.FDsSolutionProjectProperty_loadObject = function FDsSolutionProjectProperty_loadObject(control){
      var o = this;
      var guid = control._guid;
      o._controlGuid.set(guid);
      var connection = RConsole.find(FDrProjectConsole).doQuery(guid);
      connection.addLoadListener(o, o.onLoadProject);
   }
   MO.FDsSolutionProjectProperty_dispose = function FDsSolutionProjectProperty_dispose(){
      var o = this;
      o.__base.FUiForm.dispose.call(o);
   }
}
with(MO){
   MO.FDsSolutionPropertyContent = function FDsSolutionPropertyContent(o){
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
      o.switchRotation       = FDsSolutionPropertyContent_switchRotation;
      o.reloadRegion         = FDsSolutionPropertyContent_reloadRegion;
      o.loadMeshByGuid       = FDsSolutionPropertyContent_loadMeshByGuid;
      o.loadMeshByCode       = FDsSolutionPropertyContent_loadMeshByCode;
      o.dispose              = FDsSolutionPropertyContent_dispose;
      return o;
   }
   MO.FDsSolutionPropertyContent_onBuild = function FDsSolutionPropertyContent_onBuild(p){
      var o = this;
      o.__base.FDsCanvas.onBuild.call(o, p);
   }
   MO.FDsSolutionPropertyContent_onMouseCaptureStart = function FDsSolutionPropertyContent_onMouseCaptureStart(p){
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
   MO.FDsSolutionPropertyContent_onMouseCapture = function FDsSolutionPropertyContent_onMouseCapture(p){
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
   MO.FDsSolutionPropertyContent_onMouseCaptureStop = function FDsSolutionPropertyContent_onMouseCaptureStop(p){
      var o = this;
      RHtml.cursorSet(o._hPanel, EUiCursor.Auto);
   }
   MO.FDsSolutionPropertyContent_onEnterFrame = function FDsSolutionPropertyContent_onEnterFrame(){
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
   MO.FDsSolutionPropertyContent_onMeshLoad = function FDsSolutionPropertyContent_onMeshLoad(p){
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
   MO.FDsSolutionPropertyContent_oeResize = function FDsSolutionPropertyContent_oeResize(p){
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
   MO.FDsSolutionPropertyContent_oeRefresh = function FDsSolutionPropertyContent_oeRefresh(p){
      return EEventStatus.Stop;
   }
   MO.FDsSolutionPropertyContent_construct = function FDsSolutionPropertyContent_construct(){
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
   MO.FDsSolutionPropertyContent_innerSelectDisplay = function FDsSolutionPropertyContent_innerSelectDisplay(p){
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
   MO.FDsSolutionPropertyContent_innerSelectLayer = function FDsSolutionPropertyContent_innerSelectLayer(p){
      var o = this;
      var s = p.displays();
      var c = s.count();
      for(var i = 0; i < c; i++){
         var d = s.getAt(i);
         o.innerSelectDisplay(d)
      }
   }
   MO.FDsSolutionPropertyContent_switchMode = function FDsSolutionPropertyContent_switchMode(p){
      var o = this;
      o._canvasModeCd = p;
   }
   MO.FDsSolutionPropertyContent_switchRotation = function FDsSolutionPropertyContent_switchRotation(p){
      this._optionRotation = p;
   }
   MO.FDsSolutionPropertyContent_reloadRegion = function FDsSolutionPropertyContent_reloadRegion(region){
      var o = this;
      var resource = region.resource();
      o._cameraMoveRate = resource.moveSpeed();
      o._cameraKeyRotation = resource.rotationKeySpeed();
      o._cameraMouseRotation = resource.rotationMouseSpeed();
   }
   MO.FDsSolutionPropertyContent_loadMeshByGuid = function FDsSolutionPropertyContent_loadMeshByGuid(p){
      var o = this;
      var rmc = RConsole.find(FE3dMeshConsole);
      if(o._activeSpace != null){
         rmc.free(o._activeSpace);
      }
      var space = o._activeSpace = rmc.allocByGuid(o, p);
      space.addLoadListener(o, o.onMeshLoad);
      space._layer.pushRenderable(o._dimensional);
      RStage.register('mesh3d', space);
   }
   MO.FDsSolutionPropertyContent_loadMeshByCode = function FDsSolutionPropertyContent_loadMeshByCode(p){
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
   MO.FDsSolutionPropertyContent_dispose = function FDsSolutionPropertyContent_dispose(){
      var o = this;
      o._rotation = RObject.dispose(o._rotation);
      o.__base.FDsCanvas.dispose.call(o);
   }
}
with(MO){
   MO.FDsSolutionPropertyToolBar = function FDsSolutionPropertyToolBar(o){
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
   MO.FDsSolutionPropertyToolBar_onBuilded = function FDsSolutionPropertyToolBar_onBuilded(p){
      var o = this;
      o.__base.FUiToolBar.onBuilded.call(o, p);
      o._controlUpdateButton.addClickListener(o, o.onUpdateClick);
   }
   MO.FDsSolutionPropertyToolBar_onUpdateClick = function FDsSolutionPropertyToolBar_onUpdateClick(event){
      var o = this;
      var guid = o._workspace._activeProjectGuid;
      window.location = 'Project.wa?do=detail&guid=' + guid;
   }
   MO.FDsSolutionPropertyToolBar_construct = function FDsSolutionPropertyToolBar_construct(){
      var o = this;
      o.__base.FUiToolBar.construct.call(o);
   }
   MO.FDsSolutionPropertyToolBar_dispose = function FDsSolutionPropertyToolBar_dispose(){
      var o = this;
      o.__base.FUiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsProjectCanvasContent = function FDsProjectCanvasContent(o){
      o = RClass.inherits(this, o, FUiListView);
      o._refreshButton = null;
      o._saveButton    = null;
      o._runButton     = null;
      o.onBuilded      = FDsProjectCanvasContent_onBuilded;
      o.onServiceLoad  = FDsProjectCanvasContent_onServiceLoad;
      o.construct      = FDsProjectCanvasContent_construct;
      o.clickItem      = FDsProjectCanvasContent_clickItem;
      o.serviceSearch  = FDsProjectCanvasContent_serviceSearch;
      o.dispose        = FDsProjectCanvasContent_dispose;
      return o;
   }
   MO.FDsProjectCanvasContent_onBuilded = function FDsProjectCanvasContent_onBuilded(p){
      var o = this;
      o.__base.FUiListView.onBuilded.call(o, p);
   }
   MO.FDsProjectCanvasContent_onServiceLoad = function FDsProjectCanvasContent_onServiceLoad(p){
      var o = this;
      var xprojects = p.root.findNode('ProjectCollection');
      var pageSize = xprojects.getInteger('page_size');
      var pageCount = xprojects.getInteger('page_count');
      var page = xprojects.getInteger('page');
      o._workspace._searchToolbar.setNavigator(pageSize, pageCount, page);
      o.clear();
      var xnodes = xitems.nodes();
      var count = xnodes.count();
      for(var i = 0; i < count; i++){
         var xnode = xnodes.getAt(i);
         if(xnode.isName('Project')){
            var item = o.createItem(FDsProjectSearchItem);
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
   MO.FDsProjectCanvasContent_construct = function FDsProjectCanvasContent_construct(){
      var o = this;
      o.__base.FUiListView.construct.call(o);
   }
   MO.FDsProjectCanvasContent_clickItem = function FDsProjectCanvasContent_clickItem(p){
      var o = this;
      var frame = o._workspace._previewContent;
      frame._activeItem = p;
      frame.loadMeshByGuid(p._guid);
   }
   MO.FDsProjectCanvasContent_serviceSearch = function FDsProjectCanvasContent_serviceSearch(typeCd, serach, pageSize, page){
      var o = this;
      RWindow.disable();
      var connection = RConsole.find(FDrResourceConsole).fetch(typeCd, serach, null, pageSize, page);
      connection.addLoadListener(o, o.onServiceLoad);
   }
   MO.FDsProjectCanvasContent_dispose = function FDsProjectCanvasContent_dispose(){
      var o = this;
      o.__base.FUiListView.dispose.call(o);
   }
}
with(MO){
   MO.FDsProjectCanvasPreviewToolBar = function FDsProjectCanvasPreviewToolBar(o){
      o = RClass.inherits(this, o, FUiToolBar);
      o._frameName       = 'resource.project.CanvasPreviewToolBar';
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
      o.onBuilded        = FDsProjectCanvasPreviewToolBar_onBuilded;
      o.onSearchClick    = FDsProjectCanvasPreviewToolBar_onSearchClick;
      o.onNavigatorClick = FDsProjectCanvasPreviewToolBar_onNavigatorClick;
      o.construct        = FDsProjectCanvasPreviewToolBar_construct;
      o.setNavigator     = FDsProjectCanvasPreviewToolBar_setNavigator;
      o.doNavigator      = FDsProjectCanvasPreviewToolBar_doNavigator;
      o.dispose          = FDsProjectCanvasPreviewToolBar_dispose;
      return o;
   }
   MO.FDsProjectCanvasPreviewToolBar_onBuilded = function FDsProjectCanvasPreviewToolBar_onBuilded(p){
      var o = this;
      o.__base.FUiToolBar.onBuilded.call(o, p);
   }
   MO.FDsProjectCanvasPreviewToolBar_onSearchClick = function FDsProjectCanvasPreviewToolBar_onSearchClick(p){
      this.doNavigator(0);
   }
   MO.FDsProjectCanvasPreviewToolBar_onNavigatorClick = function FDsProjectCanvasPreviewToolBar_onNavigatorClick(event){
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
   MO.FDsProjectCanvasPreviewToolBar_construct = function FDsProjectCanvasPreviewToolBar_construct(){
      var o = this;
      o.__base.FUiToolBar.construct.call(o);
   }
   MO.FDsProjectCanvasPreviewToolBar_setNavigator = function FDsProjectCanvasPreviewToolBar_setNavigator(pageSize, pageCount, page){
      var o = this;
      o._pageSize = pageSize;
      o._pageCount = pageCount;
      o._page = page;
      o._controlPageEdit.setText(page);
   }
   MO.FDsProjectCanvasPreviewToolBar_doNavigator = function FDsProjectCanvasPreviewToolBar_doNavigator(page){
      var o = this;
      page = RInteger.toRange(page, 0, o._pageCount);
      var search = o._controlSearchEdit.text();
      var typeCd = o._workspace._resourceTypeCd;
      if((o._resourceTypeCd != typeCd) || (o._serach != search) || (o._page != page)){
         o._workspace._searchContent.serviceSearch(typeCd, search, o._pageSize, page)
      }
      o._resourceTypeCd = typeCd;
      o._serach = search;
   }
   MO.FDsProjectCanvasPreviewToolBar_dispose = function FDsProjectCanvasPreviewToolBar_dispose(){
      var o = this;
      o.__base.FUiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsProjectCanvasSpaceToolBar = function FDsProjectCanvasSpaceToolBar(o){
      o = RClass.inherits(this, o, FUiToolBar);
      o._frameName       = 'resource.project.CanvasSpaceToolBar';
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
      o.onBuilded        = FDsProjectCanvasSpaceToolBar_onBuilded;
      o.onSearchClick    = FDsProjectCanvasSpaceToolBar_onSearchClick;
      o.onNavigatorClick = FDsProjectCanvasSpaceToolBar_onNavigatorClick;
      o.construct        = FDsProjectCanvasSpaceToolBar_construct;
      o.setNavigator     = FDsProjectCanvasSpaceToolBar_setNavigator;
      o.doNavigator      = FDsProjectCanvasSpaceToolBar_doNavigator;
      o.dispose          = FDsProjectCanvasSpaceToolBar_dispose;
      return o;
   }
   MO.FDsProjectCanvasSpaceToolBar_onBuilded = function FDsProjectCanvasSpaceToolBar_onBuilded(p){
      var o = this;
      o.__base.FUiToolBar.onBuilded.call(o, p);
   }
   MO.FDsProjectCanvasSpaceToolBar_onSearchClick = function FDsProjectCanvasSpaceToolBar_onSearchClick(p){
      this.doNavigator(0);
   }
   MO.FDsProjectCanvasSpaceToolBar_onNavigatorClick = function FDsProjectCanvasSpaceToolBar_onNavigatorClick(event){
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
   MO.FDsProjectCanvasSpaceToolBar_construct = function FDsProjectCanvasSpaceToolBar_construct(){
      var o = this;
      o.__base.FUiToolBar.construct.call(o);
   }
   MO.FDsProjectCanvasSpaceToolBar_setNavigator = function FDsProjectCanvasSpaceToolBar_setNavigator(pageSize, pageCount, page){
      var o = this;
      o._pageSize = pageSize;
      o._pageCount = pageCount;
      o._page = page;
      o._controlPageEdit.setText(page);
   }
   MO.FDsProjectCanvasSpaceToolBar_doNavigator = function FDsProjectCanvasSpaceToolBar_doNavigator(page){
      var o = this;
      page = RInteger.toRange(page, 0, o._pageCount);
      var search = o._controlSearchEdit.text();
      var typeCd = o._workspace._resourceTypeCd;
      if((o._resourceTypeCd != typeCd) || (o._serach != search) || (o._page != page)){
         o._workspace._searchContent.serviceSearch(typeCd, search, o._pageSize, page)
      }
      o._resourceTypeCd = typeCd;
      o._serach = search;
   }
   MO.FDsProjectCanvasSpaceToolBar_dispose = function FDsProjectCanvasSpaceToolBar_dispose(){
      var o = this;
      o.__base.FUiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsProjectCatalogContent = function FDsProjectCatalogContent(o){
      o = RClass.inherits(this, o, FUiDataTreeView, MListenerSelected);
      o._iconView             = 'design3d.mesh.view';
      o._iconViewNot          = 'design3d.mesh.viewno';
      o._activeSpace          = null;
      o._materials            = null;
      o.onBuild               = FDsProjectCatalogContent_onBuild;
      o.onLoadDisplay         = FDsProjectCatalogContent_onLoadDisplay;
      o.onNodeClick           = FDsProjectCatalogContent_onNodeClick;
      o.onNodeViewClick       = FDsProjectCatalogContent_onNodeViewClick;
      o.onNodeViewDoubleClick = FDsProjectCatalogContent_onNodeViewDoubleClick;
      o.lsnsSelect            = null;
      o.construct             = FDsProjectCatalogContent_construct;
      o.buildTechnique        = FDsProjectCatalogContent_buildTechnique;
      o.buildRegion           = FDsProjectCatalogContent_buildRegion;
      o.buildRenderable       = FDsProjectCatalogContent_buildRenderable;
      o.buildDisplay          = FDsProjectCatalogContent_buildDisplay;
      o.buildSpace            = FDsProjectCatalogContent_buildSpace;
      o.selectObject          = FDsProjectCatalogContent_selectObject;
      o.showObject            = FDsProjectCatalogContent_showObject;
      o.dispose               = FDsProjectCatalogContent_dispose;
      return o;
   }
   MO.FDsProjectCatalogContent_onBuild = function FDsProjectCatalogContent_onBuild(p){
      var o = this;
      o.__base.FUiDataTreeView.onBuild.call(o, p);
      o.lsnsClick.register(o, o.onNodeClick);
      o.loadUrl('/cloud.describe.tree.ws?action=query&code=resource.project');
   }
   MO.FDsProjectCatalogContent_onLoadDisplay = function FDsProjectCatalogContent_onLoadDisplay(p){
      var o = this;
      var n = p._linkNode;
      o.buildRenderable(n, p);
   }
   MO.FDsProjectCatalogContent_onNodeClick = function FDsProjectCatalogContent_onNodeClick(t, n){
      var o = this;
      var s = n.dataPropertyGet('linker');
      o.selectObject(s);
   }
   MO.FDsProjectCatalogContent_onNodeViewClick = function FDsProjectCatalogContent_onNodeViewClick(p){
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
   MO.FDsProjectCatalogContent_onNodeViewDoubleClick = function FDsProjectCatalogContent_onNodeViewDoubleClick(p){
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
   MO.FDsProjectCatalogContent_construct = function FDsProjectCatalogContent_construct(){
      var o = this;
      o.__base.FUiDataTreeView.construct.call(o);
      o._renderables = new TObjects();
      o._materials = new TObjects();
   }
   MO.FDsProjectCatalogContent_buildTechnique = function FDsProjectCatalogContent_buildTechnique(n, p){
      var o = this;
      var nt = o.createNode();
      nt.setLabel('Technique');
      nt.setTypeCode('technique');
      nt.dataPropertySet('linker', p);
      n.appendNode(nt);
   }
   MO.FDsProjectCatalogContent_buildRegion = function FDsProjectCatalogContent_buildRegion(n, p){
      var o = this;
      var nr = o.createNode();
      nr.setLabel('Region');
      nr.setTypeCode('region');
      nr.dataPropertySet('linker', p);
      n.appendNode(nr);
      var nc = o.createNode();
      nc.setLabel('Camera');
      nc.setTypeCode('camera');
      nc.dataPropertySet('linker', p.camera());
      nr.appendNode(nc);
      var nl = o.createNode();
      nl.setLabel('Light');
      nl.setTypeCode('light');
      nl.dataPropertySet('linker', p.directionalLight());
      nr.appendNode(nl);
   }
   MO.FDsProjectCatalogContent_buildRenderable = function FDsProjectCatalogContent_buildRenderable(n, p){
      var o = this;
      var m = p._renderable._material;
      var dn = o.createNode();
      dn.setTypeCode('material');
      dn.setLabel('Material');
      dn.dataPropertySet('linker', m);
      o._materials.push(dn);
      n.appendNode(dn);
      var r = p._renderable;
      var dn = o.createNode();
      dn.setTypeCode('renderable');
      dn.setLabel('Renderable');
      dn.dataPropertySet('linker', r);
      o._renderables.push(dn);
      n.appendNode(dn);
   }
   MO.FDsProjectCatalogContent_buildDisplay = function FDsProjectCatalogContent_buildDisplay(n, p){
      var o = this;
      var node = o.createNode();
      node.setTypeCode('display');
      node.setLabel('Mesh');
      node.dataPropertySet('linker', p);
      n.appendNode(node);
      o.buildRenderable(node, p);
   }
   MO.FDsProjectCatalogContent_buildSpace = function FDsProjectCatalogContent_buildSpace(space){
      var o = this;
      var resource = space.resource();
      o._activeSpace = space;
      var node = o.createNode();
      node.setTypeCode('space');
      node.setLabel(resource.code());
      node.setNote(resource.label());
      node.dataPropertySet('linker', space);
      o.appendNode(node);
      o.buildTechnique(node, space.technique())
      o.buildRegion(node, space.region());
      o.buildDisplay(node, space._display);
      node.click();
   }
   MO.FDsProjectCatalogContent_selectObject = function FDsProjectCatalogContent_selectObject(p){
      var o = this;
      if(p != null){
         o.processSelectedListener(p, true);
      }
   }
   MO.FDsProjectCatalogContent_showObject = function FDsProjectCatalogContent_showObject(p){
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
   MO.FDsProjectCatalogContent_dispose = function FDsProjectCatalogContent_dispose(){
      var o = this;
      o._displays = RObject.dispose(o._displays);
      o._renderables = RObject.dispose(o._renderables);
      o._materials = RObject.dispose(o._materials);
      o.__base.FUiDataTreeView.dispose.call(o);
   }
}
with(MO){
   MO.FDsProjectCatalogToolBar = function FDsProjectCatalogToolBar(o){
      o = RClass.inherits(this, o, FUiToolBar);
      o._frameName       = 'resource.project.CatalogToolBar';
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
      o.onBuilded        = FDsProjectCatalogToolBar_onBuilded;
      o.onModeClick      = FDsProjectCatalogToolBar_onModeClick;
      o.onRotationClick  = FDsProjectCatalogToolBar_onRotationClick;
      o.construct        = FDsProjectCatalogToolBar_construct;
      o.dispose          = FDsProjectCatalogToolBar_dispose;
      return o;
   }
   MO.FDsProjectCatalogToolBar_onBuilded = function FDsProjectCatalogToolBar_onBuilded(p){
      var o = this;
      o.__base.FUiToolBar.onBuilded.call(o, p);
   }
   MO.FDsProjectCatalogToolBar_onModeClick = function FDsProjectCatalogToolBar_onModeClick(p){
      var o = this;
      o._canvasModeCd = p._canvasModeCd;
      o._workspace._canvas.switchMode(p._canvasModeCd);
   }
   MO.FDsProjectCatalogToolBar_onRotationClick = function FDsProjectCatalogToolBar_onRotationClick(p, v){
      var o = this;
      var c = o._workspace._canvas;
      c.switchRotation(v);
   }
   MO.FDsProjectCatalogToolBar_construct = function FDsProjectCatalogToolBar_construct(){
      var o = this;
      o.__base.FUiToolBar.construct.call(o);
   }
   MO.FDsProjectCatalogToolBar_dispose = function FDsProjectCatalogToolBar_dispose(){
      var o = this;
      o.__base.FUiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsProjectFrameSet = function FDsProjectFrameSet(o){
      o = RClass.inherits(this, o, FUiFrameSet);
      o._frameName            = 'resource.project.FrameSet';
      o._stylePageControl     = RClass.register(o, new AStyle('_stylePageControl', 'PageControl'));
      o._styleToolbarGround   = RClass.register(o, new AStyle('_styleToolbarGround', 'Toolbar_Ground'));
      o._styleStatusbarGround = RClass.register(o, new AStyle('_styleStatusbarGround', 'Statusbar_Ground'));
      o._styleCatalogGround   = RClass.register(o, new AStyle('_styleCatalogGround', 'Catalog_Ground'));
      o._styleCatalogContent  = RClass.register(o, new AStyle('_styleCatalogContent', 'Catalog_Content'));
      o._styleCanvasGround    = RClass.register(o, new AStyle('_styleCanvasGround', 'Canvas_Ground'));
      o._styleCanvasContent   = RClass.register(o, new AStyle('_styleCanvasContent', 'Canvas_Content'));
      o._stylePropertyGround  = RClass.register(o, new AStyle('_stylePropertyGround', 'Property_Ground'));
      o._stylePropertyContent = RClass.register(o, new AStyle('_stylePropertyContent', 'Property_Content'));
      o._activeSpace          = null;
      o._activeMesh           = null;
      o._framesetMain         = null;
      o._framesetBody         = null;
      o._frameToolBar         = null;
      o._frameBody            = null;
      o._frameProperty        = null;
      o._frameCatalog         = null;
      o._frameCanvas          = null;
      o._frameStatusBar       = null;
      o._propertyFrames       = null;
      o.onBuilded             = FDsProjectFrameSet_onBuilded;
      o.onMeshLoad            = FDsProjectFrameSet_onMeshLoad;
      o.onCatalogSelected     = FDsProjectFrameSet_onCatalogSelected;
      o.construct             = FDsProjectFrameSet_construct;
      o.findPropertyFrame     = FDsProjectFrameSet_findPropertyFrame;
      o.loadByGuid            = FDsProjectFrameSet_loadByGuid;
      o.dispose               = FDsProjectFrameSet_dispose;
      return o;
   }
   MO.FDsProjectFrameSet_onBuilded = function FDsProjectFrameSet_onBuilded(event){
      var o = this;
      o.__base.FUiFrameSet.onBuilded.call(o, event);
      var frame = o._frameCatalog = o.searchControl('catalogFrame');
      frame._hPanel.className = o.styleName('Catalog_Ground');
      var control = o._frameCatalogPageControl = o.searchControl('catalogPageControl');
      control._hPanel.className = o.styleName('PageControl');
      var frame = o._frameSceneListToolBar = o.searchControl('sceneListToolbarFrame');
      frame._hPanel.className = o.styleName('Toolbar_Ground');
      var frame = o._frameSceneListContent = o.searchControl('sceneListContentFrame');
      frame._hPanel.className = o.styleName('Catalog_Content');
      var frame = o._frameSceneCatalogToolBar = o.searchControl('sceneCatalogToolbarFrame');
      frame._hPanel.className = o.styleName('Toolbar_Ground');
      var frame = o._frameSceneCatalogContent = o.searchControl('sceneCatalogContentFrame');
      frame._hPanel.className = o.styleName('Catalog_Content');
      var frame = o._frameCanvas = o.searchControl('canvasFrame');
      frame._hPanel.className = o.styleName('Canvas_Ground');
      var control = o._frameCanvasPageControl = o.searchControl('canvasPageControl');
      control._hPanel.className = o.styleName('PageControl');
      var frame = o._frameCanvasSpaceToolBar = o.searchControl('canvasSpaceToolbarFrame');
      frame._hPanel.className = o.styleName('Toolbar_Ground');
      var frame = o._frameCanvasSpaceContent = o.searchControl('canvasSpaceContentFrame');
      frame._hPanel.className = o.styleName('Canvas_Content');
      var frame = o._frameCanvasPreviewToolBar = o.searchControl('canvasPreviewToolbarFrame');
      frame._hPanel.className = o.styleName('Toolbar_Ground');
      var frame = o._frameCanvasPreviewContent = o.searchControl('canvasPreviewContentFrame');
      frame._hPanel.className = o.styleName('Canvas_Content');
      var frame = o._frameProperty = o.searchControl('propertyFrame');
      frame._hPanel.className = o.styleName('Property_Ground');
      var control = o._framePropertyPageControl = o.searchControl('propertyPageControl');
      control._hPanel.className = o.styleName('PageControl');
      var frame = o._framePropertyAttributeToolBar = o.searchControl('propertyAttributeToolbarFrame');
      frame._hPanel.className = o.styleName('Toolbar_Ground');
      var frame = o._framePropertyAttributeContent = o.searchControl('propertyAttributeContentFrame');
      frame._hPanel.className = o.styleName('Property_Content');
      var f = o._catalogSplitter = o.searchControl('catalogSpliter');
      f.setAlignCd(EUiAlign.Left);
      f.setSizeHtml(o._frameCatalog._hPanel);
      var f = o._propertySpliter = o.searchControl('propertySpliter');
      f.setAlignCd(EUiAlign.Right);
      f.setSizeHtml(o._frameProperty._hPanel);
   }
   MO.FDsProjectFrameSet_onMeshLoad = function FDsProjectFrameSet_onMeshLoad(p){
      var o = this;
      o._activeSpace = p._activeSpace;
      o._catalog.buildSpace(o._activeSpace);
   }
   MO.FDsProjectFrameSet_onCatalogSelected = function FDsProjectFrameSet_onCatalogSelected(p, pc){
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
   MO.FDsProjectFrameSet_construct = function FDsProjectFrameSet_construct(){
      var o = this;
      o.__base.FUiFrameSet.construct.call(o);
      o._propertyFrames = new TDictionary();
   }
   MO.FDsProjectFrameSet_findPropertyFrame = function FDsProjectFrameSet_findPropertyFrame(p){
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
   MO.FDsProjectFrameSet_loadByGuid = function FDsProjectFrameSet_loadByGuid(guid){
      var o = this;
      o._activeGuid = guid;
      o._sceneListContent.serviceList(guid);
   }
   MO.FDsProjectFrameSet_dispose = function FDsProjectFrameSet_dispose(){
      var o = this;
      o.__base.FUiFrameSet.dispose.call(o);
      o._propertyFrames.dispose();
      o._propertyFrames = null;
   }
}
with(MO){
   MO.FDsProjectMenuBar = function FDsProjectMenuBar(o){
      o = RClass.inherits(this, o, FUiMenuBar);
      o._refreshButton = null;
      o._saveButton    = null;
      o._runButton     = null;
      o.onBuilded      = FDsProjectMenuBar_onBuilded;
      o.onSaveClick    = FDsProjectMenuBar_onSaveClick;
      o.construct      = FDsProjectMenuBar_construct;
      o.dispose        = FDsProjectMenuBar_dispose;
      return o;
   }
   MO.FDsProjectMenuBar_onBuilded = function FDsProjectMenuBar_onBuilded(p){
      var o = this;
      o.__base.FUiMenuBar.onBuilded.call(o, p);
      o._controlSave.addClickListener(o, o.onSaveClick);
   }
   MO.FDsProjectMenuBar_onSaveClick = function FDsProjectMenuBar_onSaveClick(p){
      var o = this;
      var space = o._workspace._activeSpace;
      var resource = space.resource();
      var xconfig = new TXmlNode();
      resource.saveConfig(xconfig);
      RConsole.find(FE3sMeshConsole).update(xconfig);
   }
   MO.FDsProjectMenuBar_construct = function FDsProjectMenuBar_construct(){
      var o = this;
      o.__base.FUiMenuBar.construct.call(o);
   }
   MO.FDsProjectMenuBar_dispose = function FDsProjectMenuBar_dispose(){
      var o = this;
      o.__base.FUiMenuBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsProjectPropertyContent = function FDsProjectPropertyContent(o){
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
      o.onBuild              = FDsProjectPropertyContent_onBuild;
      o.onMouseCaptureStart  = FDsProjectPropertyContent_onMouseCaptureStart;
      o.onMouseCapture       = FDsProjectPropertyContent_onMouseCapture;
      o.onMouseCaptureStop   = FDsProjectPropertyContent_onMouseCaptureStop;
      o.onEnterFrame         = FDsProjectPropertyContent_onEnterFrame;
      o.onMeshLoad           = FDsProjectPropertyContent_onMeshLoad;
      o.oeResize             = FDsProjectPropertyContent_oeResize;
      o.oeRefresh            = FDsProjectPropertyContent_oeRefresh;
      o.construct            = FDsProjectPropertyContent_construct;
      o.innerSelectDisplay   = FDsProjectPropertyContent_innerSelectDisplay;
      o.innerSelectLayer     = FDsProjectPropertyContent_innerSelectLayer;
      o.selectNone           = FDsProjectPropertyContent_selectNone;
      o.selectDisplay        = FDsProjectPropertyContent_selectDisplay;
      o.selectMaterial       = FDsProjectPropertyContent_selectMaterial;
      o.selectRenderable     = FDsProjectPropertyContent_selectRenderable;
      o.switchRotation       = FDsProjectPropertyContent_switchRotation;
      o.reloadRegion         = FDsProjectPropertyContent_reloadRegion;
      o.loadMeshByGuid       = FDsProjectPropertyContent_loadMeshByGuid;
      o.loadMeshByCode       = FDsProjectPropertyContent_loadMeshByCode;
      o.dispose              = FDsProjectPropertyContent_dispose;
      return o;
   }
   MO.FDsProjectPropertyContent_onBuild = function FDsProjectPropertyContent_onBuild(p){
      var o = this;
      o.__base.FDsCanvas.onBuild.call(o, p);
   }
   MO.FDsProjectPropertyContent_onMouseCaptureStart = function FDsProjectPropertyContent_onMouseCaptureStart(p){
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
   MO.FDsProjectPropertyContent_onMouseCapture = function FDsProjectPropertyContent_onMouseCapture(p){
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
   MO.FDsProjectPropertyContent_onMouseCaptureStop = function FDsProjectPropertyContent_onMouseCaptureStop(p){
      var o = this;
      RHtml.cursorSet(o._hPanel, EUiCursor.Auto);
   }
   MO.FDsProjectPropertyContent_onEnterFrame = function FDsProjectPropertyContent_onEnterFrame(){
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
   MO.FDsProjectPropertyContent_onMeshLoad = function FDsProjectPropertyContent_onMeshLoad(p){
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
   MO.FDsProjectPropertyContent_oeResize = function FDsProjectPropertyContent_oeResize(p){
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
   MO.FDsProjectPropertyContent_oeRefresh = function FDsProjectPropertyContent_oeRefresh(p){
      return EEventStatus.Stop;
   }
   MO.FDsProjectPropertyContent_construct = function FDsProjectPropertyContent_construct(){
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
   MO.FDsProjectPropertyContent_innerSelectDisplay = function FDsProjectPropertyContent_innerSelectDisplay(p){
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
   MO.FDsProjectPropertyContent_innerSelectLayer = function FDsProjectPropertyContent_innerSelectLayer(p){
      var o = this;
      var s = p.displays();
      var c = s.count();
      for(var i = 0; i < c; i++){
         var d = s.getAt(i);
         o.innerSelectDisplay(d)
      }
   }
   MO.FDsProjectPropertyContent_selectNone = function FDsProjectPropertyContent_selectNone(){
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
   MO.FDsProjectPropertyContent_selectDisplay = function FDsProjectPropertyContent_selectDisplay(p){
      var o = this;
      o.selectNone();
      o._selectObject = p;
      o.innerSelectDisplay(p);
   }
   MO.FDsProjectPropertyContent_selectMaterial = function FDsProjectPropertyContent_selectMaterial(p){
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
   MO.FDsProjectPropertyContent_selectRenderable = function FDsProjectPropertyContent_selectRenderable(p){
      var o = this;
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
   MO.FDsProjectPropertyContent_switchMode = function FDsProjectPropertyContent_switchMode(p){
      var o = this;
      o._canvasModeCd = p;
      o.selectRenderable(o._selectRenderable);
   }
   MO.FDsProjectPropertyContent_switchRotation = function FDsProjectPropertyContent_switchRotation(p){
      this._optionRotation = p;
   }
   MO.FDsProjectPropertyContent_reloadRegion = function FDsProjectPropertyContent_reloadRegion(region){
      var o = this;
      var resource = region.resource();
      o._cameraMoveRate = resource.moveSpeed();
      o._cameraKeyRotation = resource.rotationKeySpeed();
      o._cameraMouseRotation = resource.rotationMouseSpeed();
   }
   MO.FDsProjectPropertyContent_loadMeshByGuid = function FDsProjectPropertyContent_loadMeshByGuid(p){
      var o = this;
      var rmc = RConsole.find(FE3dMeshConsole);
      if(o._activeSpace != null){
         rmc.free(o._activeSpace);
      }
      var space = o._activeSpace = rmc.allocByGuid(o, p);
      space.addLoadListener(o, o.onMeshLoad);
      space._layer.pushRenderable(o._dimensional);
      RStage.register('mesh3d', space);
   }
   MO.FDsProjectPropertyContent_loadMeshByCode = function FDsProjectPropertyContent_loadMeshByCode(p){
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
   MO.FDsProjectPropertyContent_dispose = function FDsProjectPropertyContent_dispose(){
      var o = this;
      o._rotation = RObject.dispose(o._rotation);
      o.__base.FDsCanvas.dispose.call(o);
   }
}
with(MO){
   MO.FDsProjectPropertyToolBar = function FDsProjectPropertyToolBar(o){
      o = RClass.inherits(this, o, FUiToolBar);
      o._frameName             = 'resource.project.PropertyToolBar';
      o._controlInsertButton   = null;
      o._controlUpdateButton   = null;
      o._controlDeleteButton   = null;
      o._controlRotationButton = null;
      o.onBuilded              = FDsProjectPropertyToolBar_onBuilded;
      o.onInsertClick          = FDsProjectPropertyToolBar_onInsertClick;
      o.onUpdateClick          = FDsProjectPropertyToolBar_onUpdateClick;
      o.onDeleteClick          = FDsProjectPropertyToolBar_onDeleteClick;
      o.onRotationClick        = FDsProjectPropertyToolBar_onRotationClick;
      o.construct              = FDsProjectPropertyToolBar_construct;
      o.dispose                = FDsProjectPropertyToolBar_dispose;
      return o;
   }
   MO.FDsProjectPropertyToolBar_onBuilded = function FDsProjectPropertyToolBar_onBuilded(p){
      var o = this;
      o.__base.FUiToolBar.onBuilded.call(o, p);
   }
   MO.FDsProjectPropertyToolBar_onInsertClick = function FDsProjectPropertyToolBar_onInsertClick(event){
   }
   MO.FDsProjectPropertyToolBar_onUpdateClick = function FDsProjectPropertyToolBar_onUpdateClick(event){
      var o = this;
      var frame = o._workspace._previewContent;
      var item = frame._activeItem;
      var url = '/script/design/mesh.html?guid=' + item._guid;
      window.open(url, '_blank', '');
   }
   MO.FDsProjectPropertyToolBar_onDeleteClick = function FDsProjectPropertyToolBar_onDeleteClick(event){
   }
   MO.FDsProjectPropertyToolBar_onRotationClick = function FDsProjectPropertyToolBar_onRotationClick(event){
      var o = this;
      var previewContent = o._workspace._previewContent;
      previewContent.switchRotation(event.checked);
   }
   MO.FDsProjectPropertyToolBar_construct = function FDsProjectPropertyToolBar_construct(){
      var o = this;
      o.__base.FUiToolBar.construct.call(o);
   }
   MO.FDsProjectPropertyToolBar_dispose = function FDsProjectPropertyToolBar_dispose(){
      var o = this;
      o.__base.FUiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsProjectSceneCatalogContent = function FDsProjectSceneCatalogContent(o){
      o = RClass.inherits(this, o, FUiDataTreeView, MListenerSelected);
      o._iconView             = 'design3d.mesh.view';
      o._iconViewNot          = 'design3d.mesh.viewno';
      o._activeSpace          = null;
      o._materials            = null;
      o.onBuild               = FDsProjectSceneCatalogContent_onBuild;
      o.onLoadDisplay         = FDsProjectSceneCatalogContent_onLoadDisplay;
      o.onNodeClick           = FDsProjectSceneCatalogContent_onNodeClick;
      o.onNodeViewClick       = FDsProjectSceneCatalogContent_onNodeViewClick;
      o.onNodeViewDoubleClick = FDsProjectSceneCatalogContent_onNodeViewDoubleClick;
      o.lsnsSelect            = null;
      o.construct             = FDsProjectSceneCatalogContent_construct;
      o.buildTechnique        = FDsProjectSceneCatalogContent_buildTechnique;
      o.buildRegion           = FDsProjectSceneCatalogContent_buildRegion;
      o.buildRenderable       = FDsProjectSceneCatalogContent_buildRenderable;
      o.buildDisplay          = FDsProjectSceneCatalogContent_buildDisplay;
      o.buildSpace            = FDsProjectSceneCatalogContent_buildSpace;
      o.selectObject          = FDsProjectSceneCatalogContent_selectObject;
      o.showObject            = FDsProjectSceneCatalogContent_showObject;
      o.dispose               = FDsProjectSceneCatalogContent_dispose;
      return o;
   }
   MO.FDsProjectSceneCatalogContent_onBuild = function FDsProjectSceneCatalogContent_onBuild(p){
      var o = this;
      o.__base.FUiDataTreeView.onBuild.call(o, p);
      o.lsnsClick.register(o, o.onNodeClick);
      o.loadUrl('/cloud.describe.tree.ws?action=query&code=resource.project');
   }
   MO.FDsProjectSceneCatalogContent_onLoadDisplay = function FDsProjectSceneCatalogContent_onLoadDisplay(p){
      var o = this;
      var n = p._linkNode;
      o.buildRenderable(n, p);
   }
   MO.FDsProjectSceneCatalogContent_onNodeClick = function FDsProjectSceneCatalogContent_onNodeClick(t, n){
      var o = this;
      var s = n.dataPropertyGet('linker');
      o.selectObject(s);
   }
   MO.FDsProjectSceneCatalogContent_onNodeViewClick = function FDsProjectSceneCatalogContent_onNodeViewClick(p){
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
   MO.FDsProjectSceneCatalogContent_onNodeViewDoubleClick = function FDsProjectSceneCatalogContent_onNodeViewDoubleClick(p){
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
   MO.FDsProjectSceneCatalogContent_construct = function FDsProjectSceneCatalogContent_construct(){
      var o = this;
      o.__base.FUiDataTreeView.construct.call(o);
      o._renderables = new TObjects();
      o._materials = new TObjects();
   }
   MO.FDsProjectSceneCatalogContent_buildTechnique = function FDsProjectSceneCatalogContent_buildTechnique(n, p){
      var o = this;
      var nt = o.createNode();
      nt.setLabel('Technique');
      nt.setTypeCode('technique');
      nt.dataPropertySet('linker', p);
      n.appendNode(nt);
   }
   MO.FDsProjectSceneCatalogContent_buildRegion = function FDsProjectSceneCatalogContent_buildRegion(n, p){
      var o = this;
      var nr = o.createNode();
      nr.setLabel('Region');
      nr.setTypeCode('region');
      nr.dataPropertySet('linker', p);
      n.appendNode(nr);
      var nc = o.createNode();
      nc.setLabel('Camera');
      nc.setTypeCode('camera');
      nc.dataPropertySet('linker', p.camera());
      nr.appendNode(nc);
      var nl = o.createNode();
      nl.setLabel('Light');
      nl.setTypeCode('light');
      nl.dataPropertySet('linker', p.directionalLight());
      nr.appendNode(nl);
   }
   MO.FDsProjectSceneCatalogContent_buildRenderable = function FDsProjectSceneCatalogContent_buildRenderable(n, p){
      var o = this;
      var m = p._renderable._material;
      var dn = o.createNode();
      dn.setTypeCode('material');
      dn.setLabel('Material');
      dn.dataPropertySet('linker', m);
      o._materials.push(dn);
      n.appendNode(dn);
      var r = p._renderable;
      var dn = o.createNode();
      dn.setTypeCode('renderable');
      dn.setLabel('Renderable');
      dn.dataPropertySet('linker', r);
      o._renderables.push(dn);
      n.appendNode(dn);
   }
   MO.FDsProjectSceneCatalogContent_buildDisplay = function FDsProjectSceneCatalogContent_buildDisplay(n, p){
      var o = this;
      var node = o.createNode();
      node.setTypeCode('display');
      node.setLabel('Mesh');
      node.dataPropertySet('linker', p);
      n.appendNode(node);
      o.buildRenderable(node, p);
   }
   MO.FDsProjectSceneCatalogContent_buildSpace = function FDsProjectSceneCatalogContent_buildSpace(space){
      var o = this;
      var resource = space.resource();
      o._activeSpace = space;
      var node = o.createNode();
      node.setTypeCode('space');
      node.setLabel(resource.code());
      node.setNote(resource.label());
      node.dataPropertySet('linker', space);
      o.appendNode(node);
      o.buildTechnique(node, space.technique())
      o.buildRegion(node, space.region());
      o.buildDisplay(node, space._display);
      node.click();
   }
   MO.FDsProjectSceneCatalogContent_selectObject = function FDsProjectSceneCatalogContent_selectObject(p){
      var o = this;
      if(p != null){
         o.processSelectedListener(p, true);
      }
   }
   MO.FDsProjectSceneCatalogContent_showObject = function FDsProjectSceneCatalogContent_showObject(p){
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
   MO.FDsProjectSceneCatalogContent_dispose = function FDsProjectSceneCatalogContent_dispose(){
      var o = this;
      o._displays = RObject.dispose(o._displays);
      o._renderables = RObject.dispose(o._renderables);
      o._materials = RObject.dispose(o._materials);
      o.__base.FUiDataTreeView.dispose.call(o);
   }
}
with(MO){
   MO.FDsProjectSceneCatalogToolBar = function FDsProjectSceneCatalogToolBar(o){
      o = RClass.inherits(this, o, FUiToolBar);
      o._frameName       = 'resource.project.SceneCatalogToolBar';
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
      o.onBuilded        = FDsProjectSceneCatalogToolBar_onBuilded;
      o.onModeClick      = FDsProjectSceneCatalogToolBar_onModeClick;
      o.onRotationClick  = FDsProjectSceneCatalogToolBar_onRotationClick;
      o.construct        = FDsProjectSceneCatalogToolBar_construct;
      o.dispose          = FDsProjectSceneCatalogToolBar_dispose;
      return o;
   }
   MO.FDsProjectSceneCatalogToolBar_onBuilded = function FDsProjectSceneCatalogToolBar_onBuilded(p){
      var o = this;
      o.__base.FUiToolBar.onBuilded.call(o, p);
   }
   MO.FDsProjectSceneCatalogToolBar_onModeClick = function FDsProjectSceneCatalogToolBar_onModeClick(p){
      var o = this;
      o._canvasModeCd = p._canvasModeCd;
      o._workspace._canvas.switchMode(p._canvasModeCd);
   }
   MO.FDsProjectSceneCatalogToolBar_onRotationClick = function FDsProjectSceneCatalogToolBar_onRotationClick(p, v){
      var o = this;
      var c = o._workspace._canvas;
      c.switchRotation(v);
   }
   MO.FDsProjectSceneCatalogToolBar_construct = function FDsProjectSceneCatalogToolBar_construct(){
      var o = this;
      o.__base.FUiToolBar.construct.call(o);
   }
   MO.FDsProjectSceneCatalogToolBar_dispose = function FDsProjectSceneCatalogToolBar_dispose(){
      var o = this;
      o.__base.FUiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsProjectCatalogToolBar = function FDsProjectCatalogToolBar(o){
      o = RClass.inherits(this, o, FUiToolBar);
      o._frameName       = 'resource.project.CatalogToolBar';
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
      o.onBuilded        = FDsProjectCatalogToolBar_onBuilded;
      o.onModeClick      = FDsProjectCatalogToolBar_onModeClick;
      o.onRotationClick  = FDsProjectCatalogToolBar_onRotationClick;
      o.construct        = FDsProjectCatalogToolBar_construct;
      o.dispose          = FDsProjectCatalogToolBar_dispose;
      return o;
   }
   MO.FDsProjectCatalogToolBar_onBuilded = function FDsProjectCatalogToolBar_onBuilded(p){
      var o = this;
      o.__base.FUiToolBar.onBuilded.call(o, p);
   }
   MO.FDsProjectCatalogToolBar_onModeClick = function FDsProjectCatalogToolBar_onModeClick(p){
      var o = this;
      o._canvasModeCd = p._canvasModeCd;
      o._workspace._canvas.switchMode(p._canvasModeCd);
   }
   MO.FDsProjectCatalogToolBar_onRotationClick = function FDsProjectCatalogToolBar_onRotationClick(p, v){
      var o = this;
      var c = o._workspace._canvas;
      c.switchRotation(v);
   }
   MO.FDsProjectCatalogToolBar_construct = function FDsProjectCatalogToolBar_construct(){
      var o = this;
      o.__base.FUiToolBar.construct.call(o);
   }
   MO.FDsProjectCatalogToolBar_dispose = function FDsProjectCatalogToolBar_dispose(){
      var o = this;
      o.__base.FUiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsProjectSceneDialog = function FDsProjectSceneDialog(o){
      o = RClass.inherits(this, o, FUiDialog);
      o._frameName            = 'design3d.project.SceneDialog';
      o._dataModeCd           = null;
      o._controlParentLabel   = null;
      o._controlLabel         = null;
      o._controlConfirmButton = null;
      o._controlCancelButton  = null;
      o.onBuilded             = FDsProjectSceneDialog_onBuilded;
      o.onConfirmLoad         = FDsProjectSceneDialog_onConfirmLoad;
      o.onConfirmClick        = FDsProjectSceneDialog_onConfirmClick;
      o.onCancelClick         = FDsProjectSceneDialog_onCancelClick;
      o.construct             = FDsProjectSceneDialog_construct;
      o.setDataCode           = FDsProjectSceneDialog_setDataCode;
      o.setDataLabel          = FDsProjectSceneDialog_setDataLabel;
      o.switchDataMode        = FDsProjectSceneDialog_switchDataMode;
      o.dispose               = FDsProjectSceneDialog_dispose;
      return o;
   }
   MO.FDsProjectSceneDialog_onBuilded = function FDsProjectSceneDialog_onBuilded(p){
      var o = this;
      o.__base.FUiDialog.onBuilded.call(o, p);
      o._controlConfirmButton.addClickListener(o, o.onConfirmClick);
      o._controlCancelButton.addClickListener(o, o.onCancelClick);
   }
   MO.FDsProjectSceneDialog_onConfirmLoad = function FDsProjectSceneDialog_onConfirmLoad(event){
      var o = this;
      RConsole.find(FUiDesktopConsole).hide();
      o.hide();
      var listContent = o._frameSet._sceneListContent;
      listContent.serviceRelist();
   }
   MO.FDsProjectSceneDialog_onConfirmClick = function FDsProjectSceneDialog_onConfirmClick(event){
      var o = this;
      RConsole.find(FUiDesktopConsole).showUploading();
      var code = o._controlCode.get();
      var label = o._controlLabel.get();
      var sceneConsole = RConsole.find(FDrSceneConsole);
      var connection = null;
      if(o._dataModeCd == EUiDataMode.Insert){
         var scene = RClass.create(FDrScene);
         scene._projectGuid = o._projectGuid;
         scene._code = code;
         scene._label = label;
         connection = sceneConsole.doCreate(scene);
         scene.dispose();
      }else{
         throw new TError(o, 'Unknown mode.');
      }
      connection.addLoadListener(o, o.onConfirmLoad);
   }
   MO.FDsProjectSceneDialog_onCancelClick = function FDsProjectSceneDialog_onCancelClick(event){
      this.hide();
   }
   MO.FDsProjectSceneDialog_construct = function FDsProjectSceneDialog_construct(){
      var o = this;
      o.__base.FUiDialog.construct.call(o);
   }
   MO.FDsProjectSceneDialog_setDataCode = function FDsProjectSceneDialog_setDataCode(code){
      this._controlCode.set(code);
   }
   MO.FDsProjectSceneDialog_setDataLabel = function FDsProjectSceneDialog_setDataLabel(label){
      this._controlLabel.set(label);
   }
   MO.FDsProjectSceneDialog_switchDataMode = function FDsProjectSceneDialog_switchDataMode(modeCd){
      var o = this;
      o._dataModeCd = modeCd;
      if(modeCd == EUiDataMode.Insert){
         o.setLabel('新建场景');
      }else if(modeCd == EUiDataMode.Update){
         o.setLabel('场景属性');
      }
   }
   MO.FDsProjectSceneDialog_dispose = function FDsProjectSceneDialog_dispose(){
      var o = this;
      o.__base.FUiDialog.dispose.call(o);
   }
}
with(MO){
   MO.FDsProjectSceneListContent = function FDsProjectSceneListContent(o){
      o = RClass.inherits(this, o, FUiListView);
      o._activeItem       = null;
      o._activeGuid       = null;
      o._refreshButton    = null;
      o._saveButton       = null;
      o._runButton        = null;
      o.onBuilded         = FDsProjectSceneListContent_onBuilded;
      o.onServiceLoad     = FDsProjectSceneListContent_onServiceLoad;
      o.construct         = FDsProjectSceneListContent_construct;
      o.doClickItem       = FDsProjectSceneListContent_doClickItem;
      o.doDoubleClickItem = FDsProjectSceneListContent_doDoubleClickItem;
      o.serviceList       = FDsProjectSceneListContent_serviceList;
      o.serviceRelist     = FDsProjectSceneListContent_serviceRelist;
      o.dispose           = FDsProjectSceneListContent_dispose;
      return o;
   }
   MO.FDsProjectSceneListContent_onBuilded = function FDsProjectSceneListContent_onBuilded(p){
      var o = this;
      o.__base.FUiListView.onBuilded.call(o, p);
   }
   MO.FDsProjectSceneListContent_onServiceLoad = function FDsProjectSceneListContent_onServiceLoad(event){
      var o = this;
      var xitems = event.root.findNode('SceneCollection');
      o.clear();
      var xnodes = xitems.nodes();
      var count = xnodes.count();
      for(var i = 0; i < count; i++){
         var xnode = xnodes.getAt(i);
         if(xnode.isName('Scene')){
            var item = o.createItem(FDsProjectSceneListItem);
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
   MO.FDsProjectSceneListContent_construct = function FDsProjectSceneListContent_construct(){
      var o = this;
      o.__base.FUiListView.construct.call(o);
   }
   MO.FDsProjectSceneListContent_doClickItem = function FDsProjectSceneListContent_doClickItem(control){
      var o = this;
      o.__base.FUiListView.doClickItem.call(o, control);
      var guid = control._guid;
      o._activeItem = control;
   }
   MO.FDsProjectSceneListContent_doDoubleClickItem = function FDsProjectSceneListContent_doDoubleClickItem(control){
      var o = this;
      o.__base.FUiListView.doDoubleClickItem.call(o, control)
      var guid = control._guid;
      o._activeItem = control;
      o._activeGuid = control._guid;
   }
   MO.FDsProjectSceneListContent_serviceList = function FDsProjectSceneListContent_serviceList(guid){
      var o = this;
      o._activeGuid = guid;
      RConsole.find(FUiDesktopConsole).showLoading();
      var url = '/cloud.solution.project.ws?action=listProject&project_guid=' + guid;
      var connection = RConsole.find(FXmlConsole).sendAsync(url);
      connection.addLoadListener(o, o.onServiceLoad);
      return connection;
   }
   MO.FDsProjectSceneListContent_serviceRelist = function FDsProjectSceneListContent_serviceRelist(){
      var o = this;
      return o.serviceList(o._activeGuid);
   }
   MO.FDsProjectSceneListContent_dispose = function FDsProjectSceneListContent_dispose(){
      var o = this;
      o.__base.FUiListView.dispose.call(o);
   }
}
with(MO){
   MO.FDsProjectSceneListItem = function FDsProjectSceneListItem(o){
      o = RClass.inherits(this, o, FUiListViewItem);
      o.onBuild      = FDsProjectSceneListItem_onBuild;
      o.refreshStyle = FDsProjectSceneListItem_refreshStyle;
      return o;
   }
   MO.FDsProjectSceneListItem_onBuild = function FDsProjectSceneListItem_onBuild(p){
      var o = this;
      o.__base.FUiListViewItem.onBuild.call(o, p);
      var h = o._hPanel;
      h.style.width = '260px';
      h.style.height = '150px';
   }
   MO.FDsProjectSceneListItem_refreshStyle = function FDsProjectSceneListItem_refreshStyle(){
      var o = this;
      var url = '/cloud.content.scene.wv?do=preview&guid=' + o._guid;
      o._hForm.style.backgroundImage = 'url("' + url + '")';
   }
}
with(MO){
   MO.FDsProjectSceneListToolBar = function FDsProjectSceneListToolBar(o){
      o = RClass.inherits(this, o, FUiToolBar);
      o._frameName           = 'resource.project.SceneListToolBar';
      o._controlSceneCreate  = null;
      o._controlSceneDelete  = null;
      o.onBuilded            = FDsProjectSceneListToolBar_onBuilded;
      o.onSceneCreateClick   = FDsProjectSceneListToolBar_onSceneCreateClick;
      o.onSceneDeleteLoad    = FDsProjectSceneListToolBar_onSceneDeleteLoad;
      o.onSceneDeleteExecute = FDsProjectSceneListToolBar_onSceneDeleteExecute;
      o.onSceneDeleteClick   = FDsProjectSceneListToolBar_onSceneDeleteClick;
      o.construct            = FDsProjectSceneListToolBar_construct;
      o.dispose              = FDsProjectSceneListToolBar_dispose;
      return o;
   }
   MO.FDsProjectSceneListToolBar_onBuilded = function FDsProjectSceneListToolBar_onBuilded(p){
      var o = this;
      o.__base.FUiToolBar.onBuilded.call(o, p);
      o._controlSceneCreate.addClickListener(o, o.onSceneCreateClick);
      o._controlSceneDelete.addClickListener(o, o.onSceneDeleteClick);
   }
   MO.FDsProjectSceneListToolBar_onSceneCreateClick = function FDsProjectSceneListToolBar_onSceneCreateClick(event){
      var o = this;
      var projectGuid = o._frameSet._activeGuid;
      if(RString.isEmpty(projectGuid)){
         throw new TError(o, 'Project guid is empty.');
      }
      var dialog = RConsole.find(FUiWindowConsole).find(FDsProjectSceneDialog);
      dialog._frameSet = o._frameSet;
      dialog._projectGuid = projectGuid;
      dialog.setDataCode('');
      dialog.setDataLabel('');
      dialog.switchDataMode(EUiDataMode.Insert);
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsProjectSceneListToolBar_onSceneDeleteLoad = function FDsProjectSceneListToolBar_onSceneDeleteLoad(event){
      var o = this;
      RConsole.find(FUiDesktopConsole).hide();
      var listContent = o._frameSet._sceneListContent;
      listContent.serviceRelist();
   }
   MO.FDsProjectSceneListToolBar_onSceneDeleteExecute = function FDsProjectSceneListToolBar_onSceneDeleteExecute(event){
      var o = this;
      if(event.resultCd != EResult.Success){
         return;
      }
      var listContent = o._frameSet._sceneListContent;
      var item = listContent.focusItem();
      RConsole.find(FUiDesktopConsole).showUploading();
      var connection = RConsole.find(FDrSceneConsole).doDelete(item._guid);
      connection.addLoadListener(o, o.onSceneDeleteLoad);
   }
   MO.FDsProjectSceneListToolBar_onSceneDeleteClick = function FDsProjectSceneListToolBar_onSceneDeleteClick(event){
      var o = this;
      var listContent = o._frameSet._sceneListContent;
      var item = listContent.focusItem();
      if(!item){
         return RConsole.find(FUiMessageConsole).showInfo('请选中场景后，再点击操作。');
      }
      var dialog = RConsole.find(FUiMessageConsole).showConfirm('请确认是否删除当前场景？');
      dialog.addResultListener(o, o.onSceneDeleteExecute);
   }
   MO.FDsProjectSceneListToolBar_construct = function FDsProjectSceneListToolBar_construct(){
      var o = this;
      o.__base.FUiToolBar.construct.call(o);
   }
   MO.FDsProjectSceneListToolBar_dispose = function FDsProjectSceneListToolBar_dispose(){
      var o = this;
      o.__base.FUiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsProjectTabBar = function FDsProjectTabBar(o){
      o = RClass.inherits(this, o, FUiTabBar);
      o._frameName             = 'design3d.project.TabBar';
      o._resourceTypeCd        = 'mesh';
      o._controlProjectButton  = null;
      o._controlResourceButton = null;
      o.onBuilded              = FDsProjectTabBar_onBuilded;
      o.onButtonClick          = FDsProjectTabBar_onButtonClick;
      o.construct              = FDsProjectTabBar_construct;
      o.dispose                = FDsProjectTabBar_dispose;
      return o;
   }
   MO.FDsProjectTabBar_onBuilded = function FDsProjectTabBar_onBuilded(p){
      var o = this;
      o.__base.FUiTabBar.onBuilded.call(o, p);
      o._controlProjectButton.addClickListener(o, o.onButtonClick);
      o._controlResourceButton.addClickListener(o, o.onButtonClick);
   }
   MO.FDsProjectTabBar_onButtonClick = function FDsProjectTabBar_onButtonClick(event){
      var o = this;
      var sender = event.sender;
      var name = sender.name();
      if(name == 'project'){
         o._workspace.selectFrameSet(EDsFrameSet.ProjectFrameSet);
      }else if(name == 'resource'){
         o._workspace.selectFrameSet(EDsFrameSet.ResourceFrameSet);
      }
   }
   MO.FDsProjectTabBar_construct = function FDsProjectTabBar_construct(){
      var o = this;
      o.__base.FUiTabBar.construct.call(o);
   }
   MO.FDsProjectTabBar_dispose = function FDsProjectTabBar_dispose(){
      var o = this;
      o.__base.FUiTabBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsProjectWorkspace = function FDsProjectWorkspace(o){
      o = RClass.inherits(this, o, FUiWorkspace);
      o._frameName            = 'design3d.project.Workspace';
      o._styleToolbarGround   = RClass.register(o, new AStyle('_styleToolbarGround', 'Toolbar_Ground'));
      o._styleStatusbarGround = RClass.register(o, new AStyle('_styleStatusbarGround', 'Statusbar_Ground'));
      o._styleCatalogGround   = RClass.register(o, new AStyle('_styleCatalogGround', 'Catalog_Ground'));
      o._styleCatalogToolbar  = RClass.register(o, new AStyle('_styleCatalogToolbar', 'Catalog_Toolbar'));
      o._styleSearchGround    = RClass.register(o, new AStyle('_styleSearchGround', 'Search_Ground'));
      o._styleSearchToolbar   = RClass.register(o, new AStyle('_styleCatalogToolbar', 'Search_Toolbar'));
      o._stylePropertyGround  = RClass.register(o, new AStyle('_stylePropertyGround', 'Property_Ground'));
      o._stylePropertyToolbar = RClass.register(o, new AStyle('_stylePropertyToolbar', 'Property_Toolbar'));
      o._stylePropertyContent = RClass.register(o, new AStyle('_stylePropertyContent', 'Property_Content'));
      o._styleWorkspaceGround = RClass.register(o, new AStyle('_styleWorkspaceGround', 'Workspace_Ground'));
      o._resourceTypeCd       = 'project';
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
      o._activeFrameSet       = null;
      o._frameSets            = null;
      o._propertyFrames       = null;
      o.onBuilded             = FDsProjectWorkspace_onBuilded;
      o.onMeshLoad            = FDsProjectWorkspace_onMeshLoad;
      o.onCatalogSelected     = FDsProjectWorkspace_onCatalogSelected;
      o.construct             = FDsProjectWorkspace_construct;
      o.selectFrameSet        = FDsProjectWorkspace_selectFrameSet;
      o.findPropertyFrame     = FDsProjectWorkspace_findPropertyFrame;
      o.switchContent         = FDsProjectWorkspace_switchContent;
      o.load                  = FDsProjectWorkspace_load;
      o.dispose               = FDsProjectWorkspace_dispose;
      return o;
   }
   MO.FDsProjectWorkspace_onBuilded = function FDsProjectWorkspace_onBuilded(p){
      var o = this;
      o.__base.FUiWorkspace.onBuilded.call(o, p);
      var frame = o._frameToolBar = o.searchControl('toolbarFrame');
      frame._hPanel.className = o.styleName('Toolbar_Ground');
      o._frameBody = o.searchControl('bodyFrame');
      var frame = o._frameStatusBar = o.searchControl('statusFrame');
      frame._hPanel.className = o.styleName('Statusbar_Ground');
      var hTable = RBuilder.createTable(p);
      hTable.width = '100%';
      var hRow = RBuilder.appendTableRow(hTable);
      o._hMenuPanel = RBuilder.appendTableCell(hRow);
      var c = o._tabBar = RClass.create(FDsProjectTabBar);
      c._workspace = o;
      c.buildDefine(p);
      var hCell = RBuilder.appendTableCell(hRow);
      hCell.width = '150px';
      hCell.align = 'right';
      hCell.vAlign = 'bottom';
      hCell.appendChild(c._hPanel);
      o._frameToolBar._hPanel.appendChild(hTable);
      o.selectFrameSet(EDsFrameSet.ProjectFrameSet);
   }
   MO.FDsProjectWorkspace_onMeshLoad = function FDsProjectWorkspace_onMeshLoad(p){
      var o = this;
      o._activeSpace = p._activeSpace;
      o._catalog.buildSpace(o._activeSpace);
   }
   MO.FDsProjectWorkspace_onCatalogSelected = function FDsProjectWorkspace_onCatalogSelected(p, pc){
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
   MO.FDsProjectWorkspace_construct = function FDsProjectWorkspace_construct(){
      var o = this;
      o.__base.FUiWorkspace.construct.call(o);
      o._frameSets = new TDictionary();
      o._propertyFrames = new TDictionary();
   }
   MO.FDsProjectWorkspace_selectFrameSet = function FDsProjectWorkspace_selectFrameSet(name, guid){
      var o = this;
      var frameSet = o._frameSets.get(name);
      if(!frameSet){
         if(name == EDsFrameSet.ProjectFrameSet){
            var menuBar = RClass.create(FDsProjectMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            frameSet = RConsole.find(FFrameConsole).findByClass(o, FDsProjectFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else if(name == EDsFrameSet.ResourceFrameSet){
            var menuBar = RClass.create(FDsResourceMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            frameSet = RConsole.find(FFrameConsole).findByClass(o, FDsResourceFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else if(name == EDsFrameSet.MeshFrameSet){
            var menuBar = RClass.create(FDsMeshMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            frameSet = RConsole.find(FFrameConsole).findByClass(o, FDsMeshFrameSet);
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
      if(name == EDsFrameSet.ProjectFrameSet){
      }else if(name == EDsFrameSet.ResourceFrameSet){
         frameSet.load();
      }else if(name == EDsFrameSet.MeshFrameSet){
         frameSet.loadByGuid(guid);
      }else{
         throw new TError('Unknown frameset. (name={1})', name);
      }
      return frameSet;
   }
   MO.FDsProjectWorkspace_findPropertyFrame = function FDsProjectWorkspace_findPropertyFrame(p){
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
   MO.FDsProjectWorkspace_switchContent = function FDsProjectWorkspace_switchContent(typeCd){
      var o = this;
      o._resourceTypeCd = typeCd;
      o._searchContent.serviceSearch(typeCd, '', 40, 0);
   }
   MO.FDsProjectWorkspace_load = function FDsProjectWorkspace_load(){
      var o = this;
   }
   MO.FDsProjectWorkspace_dispose = function FDsProjectWorkspace_dispose(){
      var o = this;
      o.__base.FUiWorkspace.dispose.call(o);
      o._propertyFrames.dispose();
      o._propertyFrames = null;
   }
}
with(MO){
   MO.FDsResourceCatalogContent = function FDsResourceCatalogContent(o){
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
   MO.FDsResourceCatalogContent_onBuild = function FDsResourceCatalogContent_onBuild(p){
      var o = this;
      o.__base.FUiDataTreeView.onBuild.call(o, p);
      o.lsnsClick.register(o, o.onNodeClick);
      o.loadUrl('/cloud.describe.tree.ws?action=query&code=resource.catalog');
   }
   MO.FDsResourceCatalogContent_onLoadDisplay = function FDsResourceCatalogContent_onLoadDisplay(p){
      var o = this;
      var n = p._linkNode;
      o.buildRenderable(n, p);
   }
   MO.FDsResourceCatalogContent_onNodeClick = function FDsResourceCatalogContent_onNodeClick(t, n){
      var o = this;
   }
   MO.FDsResourceCatalogContent_onNodeViewClick = function FDsResourceCatalogContent_onNodeViewClick(p){
      var o = this;
   }
   MO.FDsResourceCatalogContent_onNodeViewDoubleClick = function FDsResourceCatalogContent_onNodeViewDoubleClick(p){
      var o = this;
   }
   MO.FDsResourceCatalogContent_construct = function FDsResourceCatalogContent_construct(){
      var o = this;
      o.__base.FUiDataTreeView.construct.call(o);
      o._renderables = new TObjects();
      o._materials = new TObjects();
   }
   MO.FDsResourceCatalogContent_selectObject = function FDsResourceCatalogContent_selectObject(p){
      var o = this;
      if(p != null){
         o.processSelectedListener(p, true);
      }
   }
   MO.FDsResourceCatalogContent_showObject = function FDsResourceCatalogContent_showObject(p){
      var o = this;
   }
   MO.FDsResourceCatalogContent_dispose = function FDsResourceCatalogContent_dispose(){
      var o = this;
      o.__base.FUiDataTreeView.dispose.call(o);
   }
}
with(MO){
   MO.FDsResourceCatalogToolBar = function FDsResourceCatalogToolBar(o){
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
   MO.FDsResourceCatalogToolBar_onBuilded = function FDsResourceCatalogToolBar_onBuilded(p){
      var o = this;
      o.__base.FUiToolBar.onBuilded.call(o, p);
      o._controlFolderCreateButton.addClickListener(o, o.onFolderCreateClick);
      o._controlFolderDeleteButton.addClickListener(o, o.onFolderDeleteClick);
      o._controlFolderPropertyButton.addClickListener(o, o.onFolderPropertyClick);
      o._controlFolderOpenButton.addClickListener(o, o.onFolderOpenClick);
      o._controlFolderCloseButton.addClickListener(o, o.onFolderCloseClick);
   }
   MO.FDsResourceCatalogToolBar_onFolderCreateClick = function FDsResourceCatalogToolBar_onFolderCreateClick(event){
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
   MO.FDsResourceCatalogToolBar_onFolderDeleteLoad = function FDsResourceCatalogToolBar_onFolderDeleteLoad(event){
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
   MO.FDsResourceCatalogToolBar_onFolderDeleteExcute = function FDsResourceCatalogToolBar_onFolderDeleteExcute(event){
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
   MO.FDsResourceCatalogToolBar_onFolderDeleteClick = function FDsResourceCatalogToolBar_onFolderDeleteClick(event){
      var o = this;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return RConsole.find(FUiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
      }
      var dialog = RConsole.find(FUiMessageConsole).showConfirm('请确认是否删除当前目录？');
      dialog.addResultListener(o, o.onFolderDeleteExcute);
   }
   MO.FDsResourceCatalogToolBar_onFolderPropertyClick = function FDsResourceCatalogToolBar_onFolderPropertyClick(event){
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
   MO.FDsResourceCatalogToolBar_onFolderOpenClick = function FDsResourceCatalogToolBar_onFolderOpenClick(event){
   }
   MO.FDsResourceCatalogToolBar_onFolderCloseClick = function FDsResourceCatalogToolBar_onFolderCloseClick(event){
   }
   MO.FDsResourceCatalogToolBar_construct = function FDsResourceCatalogToolBar_construct(){
      var o = this;
      o.__base.FUiToolBar.construct.call(o);
   }
   MO.FDsResourceCatalogToolBar_dispose = function FDsResourceCatalogToolBar_dispose(){
      var o = this;
      o.__base.FUiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsResourceCreateDialog = function FDsResourceCreateDialog(o){
      o = RClass.inherits(this, o, FUiDialog);
      o._frameName        = 'resource.resource.CreateDialog';
      o._nodeGuid         = null;
      o._controlNodeLabel = null;
      o._controlCode      = null;
      o._controlLabel     = null;
      o._controlConfirm   = null;
      o._controlCancel    = null;
      o.onBuilded         = FDsResourceCreateDialog_onBuilded;
      o.onConfirmLoad     = FDsResourceCreateDialog_onConfirmLoad;
      o.onConfirmClick    = FDsResourceCreateDialog_onConfirmClick;
      o.onCancelClick     = FDsResourceCreateDialog_onCancelClick;
      o.construct         = FDsResourceCreateDialog_construct;
      o.setNodeLabel      = FDsResourceCreateDialog_setNodeLabel;
      o.switchMode        = FDsResourceCreateDialog_switchMode;
      o.dispose           = FDsResourceCreateDialog_dispose;
      return o;
   }
   MO.FDsResourceCreateDialog_onBuilded = function FDsResourceCreateDialog_onBuilded(p){
      var o = this;
      o.__base.FUiDialog.onBuilded.call(o, p);
      o._controlNodeLabel.setEditAble(false);
      o._controlConfirm.addClickListener(o, o.onConfirmClick);
      o._controlCancel.addClickListener(o, o.onCancelClick);
   }
   MO.FDsResourceCreateDialog_onConfirmLoad = function FDsResourceCreateDialog_onConfirmLoad(event){
      var o = this;
      o.hide();
      RConsole.find(FUiDesktopConsole).hide();
      if(RConsole.find(FUiResultConsole).checkEvent(event)){
         var frame = o._frameSet._listContent;
         frame.serviceResearch();
      }
   }
   MO.FDsResourceCreateDialog_onConfirmClick = function FDsResourceCreateDialog_onConfirmClick(event){
      var o = this;
      RConsole.find(FUiDesktopConsole).showUploading();
      var code = o._controlCode.get();
      var label = o._controlLabel.get();
      var connection = null;
      switch(o._modeCd){
         case EE3sResource.Material:
            var material = RClass.create(FDrMaterial);
            material.setCode(code);
            material.setLabel(label);
            connection = RConsole.find(FDrMaterialConsole).doCreate(material);
            break;
         case EE3sResource.Template:
            var template = RClass.create(FDrTemplate);
            template.setCode(code);
            template.setLabel(label);
            connection = RConsole.find(FDrTemplateConsole).doCreate(template);
            break;
         case EE3sResource.Scene:
            var scene = RClass.create(FDrScene);
            scene.setCode(code);
            scene.setLabel(label);
            connection = RConsole.find(FDrSceneConsole).doCreate(scene);
            break;
         default:
            throw new TError(o, 'Unknown mode. (mode_cd={1})', modeCd);
      }
      connection.addLoadListener(o, o.onConfirmLoad);
   }
   MO.FDsResourceCreateDialog_onCancelClick = function FDsResourceCreateDialog_onCancelClick(event){
      this.hide();
   }
   MO.FDsResourceCreateDialog_construct = function FDsResourceCreateDialog_construct(){
      var o = this;
      o.__base.FUiDialog.construct.call(o);
   }
   MO.FDsResourceCreateDialog_setNodeLabel = function FDsResourceCreateDialog_setNodeLabel(label){
      var o = this;
      o._controlNodeLabel.set(label);
   }
   MO.FDsResourceCreateDialog_switchMode = function FDsResourceCreateDialog_switchMode(modeCd){
      var o = this;
      o._modeCd = modeCd;
      switch(modeCd){
         case EE3sResource.Material:
            o.setLabel('创建材质');
            break;
         case EE3sResource.Template:
            o.setLabel('创建模板');
            break;
         case EE3sResource.Scene:
            o.setLabel('创建场景');
            break;
         default:
            throw new TError(o, 'Unknown mode. (mode_cd={1})', modeCd);
      }
      o._controlCode.set('');
      o._controlLabel.set('');
   }
   MO.FDsResourceCreateDialog_dispose = function FDsResourceCreateDialog_dispose(){
      var o = this;
      o.__base.FUiDialog.dispose.call(o);
   }
}
with(MO){
   MO.FDsResourceFolderDialog = function FDsResourceFolderDialog(o){
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
   MO.FDsResourceFolderDialog_onBuilded = function FDsResourceFolderDialog_onBuilded(p){
      var o = this;
      o.__base.FUiDialog.onBuilded.call(o, p);
      o._controlParentLabel.setEditAble(false);
      o._controlConfirmButton.addClickListener(o, o.onConfirmClick);
      o._controlCancelButton.addClickListener(o, o.onCancelClick);
   }
   MO.FDsResourceFolderDialog_onConfirmLoad = function FDsResourceFolderDialog_onConfirmLoad(event){
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
   MO.FDsResourceFolderDialog_onConfirmClick = function FDsResourceFolderDialog_onConfirmClick(event){
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
   MO.FDsResourceFolderDialog_onCancelClick = function FDsResourceFolderDialog_onCancelClick(event){
      this.hide();
   }
   MO.FDsResourceFolderDialog_construct = function FDsResourceFolderDialog_construct(){
      var o = this;
      o.__base.FUiDialog.construct.call(o);
   }
   MO.FDsResourceFolderDialog_setNodeParentLabel = function FDsResourceFolderDialog_setNodeParentLabel(label){
      this._controlParentLabel.set(label);
   }
   MO.FDsResourceFolderDialog_setNodeLabel = function FDsResourceFolderDialog_setNodeLabel(label){
      this._controlLabel.set(label);
   }
   MO.FDsResourceFolderDialog_switchDataMode = function FDsResourceFolderDialog_switchDataMode(modeCd){
      var o = this;
      o._dataModeCd = modeCd;
      if(modeCd == EUiDataMode.Insert){
         o.setLabel('新建资源目录');
      }else if(modeCd == EUiDataMode.Update){
         o.setLabel('资源目录属性');
      }
   }
   MO.FDsResourceFolderDialog_dispose = function FDsResourceFolderDialog_dispose(){
      var o = this;
      o.__base.FUiDialog.dispose.call(o);
   }
}
with(MO){
   MO.FDsResourceFrameSet = function FDsResourceFrameSet(o){
      o = RClass.inherits(this, o, FDsFrameSet);
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
      o.onBuilded             = FDsResourceFrameSet_onBuilded;
      o.onCatalogSelected     = FDsResourceFrameSet_onCatalogSelected;
      o.construct             = FDsResourceFrameSet_construct;
      o.switchContent         = FDsResourceFrameSet_switchContent;
      o.load                  = FDsResourceFrameSet_load;
      o.dispose               = FDsResourceFrameSet_dispose;
      return o;
   }
   MO.FDsResourceFrameSet_onBuilded = function FDsResourceFrameSet_onBuilded(p){
      var o = this;
      o.__base.FDsFrameSet.onBuilded.call(o, p);
   }
   MO.FDsResourceFrameSet_onCatalogSelected = function FDsResourceFrameSet_onCatalogSelected(select, flag){
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
   MO.FDsResourceFrameSet_construct = function FDsResourceFrameSet_construct(){
      var o = this;
      o.__base.FDsFrameSet.construct.call(o);
   }
   MO.FDsResourceFrameSet_switchContent = function FDsResourceFrameSet_switchContent(typeCd){
      var o = this;
      o._resourceTypeCd = typeCd;
      o._listContent.serviceSearch(typeCd, '', '', 40, 0);
   }
   MO.FDsResourceFrameSet_load = function FDsResourceFrameSet_load(){
      var o = this;
      o._listToolBar.storageLoad();
   }
   MO.FDsResourceFrameSet_dispose = function FDsResourceFrameSet_dispose(){
      var o = this;
      o.__base.FDsFrameSet.dispose.call(o);
   }
}
with(MO){
   MO.FDsResourceImportDialog = function FDsResourceImportDialog(o){
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
      o.switchMode            = FDsResourceImportDialog_switchMode;
      o.dispose               = FDsResourceImportDialog_dispose;
      return o;
   }
   MO.FDsResourceImportDialog_onBuilded = function FDsResourceImportDialog_onBuilded(p){
      var o = this;
      o.__base.FUiDialog.onBuilded.call(o, p);
      o._controlNodeLabel.setEditAble(false);
      o._controlFile.addDataChangedListener(o, o.onFileChange);
      o._controlConfirmButton.addClickListener(o, o.onConfirmClick);
      o._controlCancelButton.addClickListener(o, o.onCancelClick);
   }
   MO.FDsResourceImportDialog_onFileChange = function FDsResourceImportDialog_onFileChange(event){
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
   MO.FDsResourceImportDialog_onFileLoaded = function FDsResourceImportDialog_onFileLoaded(event){
      var o = this;
      var reader = o._fileReader;
      var code = o._controlCode.get();
      var label = o._controlLabel.get();
      var url = null;
      if(o._modeCd == EE3sResource.Bitmap){
         url = '/cloud.resource.bitmap.wv?do=importData';
      }else if(o._modeCd == EE3sResource.Model){
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
   MO.FDsResourceImportDialog_onConfirmLoad = function FDsResourceImportDialog_onConfirmLoad(event){
      var o = this;
      RConsole.find(FUiDesktopConsole).hide();
      o.hide();
      var frame = o._frameSet._listContent;
      frame.serviceResearch();
   }
   MO.FDsResourceImportDialog_onConfirmClick = function FDsResourceImportDialog_onConfirmClick(event){
      var o = this;
      RConsole.find(FUiDesktopConsole).showUploading();
      var file = o._controlFile._hInput.files[0];
      var reader = o._fileReader = RClass.create(FFileReader);
      reader.addLoadListener(o, o.onFileLoaded);
      reader.loadFile(file);
   }
   MO.FDsResourceImportDialog_onCancelClick = function FDsResourceImportDialog_onCancelClick(event){
      this.hide();
   }
   MO.FDsResourceImportDialog_construct = function FDsResourceImportDialog_construct(){
      var o = this;
      o.__base.FUiDialog.construct.call(o);
   }
   MO.FDsResourceImportDialog_setNodeLabel = function FDsResourceImportDialog_setNodeLabel(label){
      var o = this;
      o._controlNodeLabel.set(label);
   }
   MO.FDsResourceImportDialog_switchMode = function FDsResourceImportDialog_switchMode(modeCd){
      var o = this;
      o._modeCd = modeCd;
      switch(modeCd){
         case EE3sResource.Bitmap:
            o.setLabel('导入图片资源');
            break;
         case EE3sResource.Model:
            o.setLabel('导入模型资源');
            break;
         default:
            throw new TError(o, 'Unknown mode. (mode_cd={1})', modeCd);
      }
      o._controlCode.set('');
      o._controlLabel.set('');
   }
   MO.FDsResourceImportDialog_dispose = function FDsResourceImportDialog_dispose(){
      var o = this;
      o.__base.FUiDialog.dispose.call(o);
   }
}
with(MO){
   MO.FDsResourceListContent = function FDsResourceListContent(o){
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
   MO.FDsResourceListContent_onServiceLoad = function FDsResourceListContent_onServiceLoad(p){
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
   MO.FDsResourceListContent_construct = function FDsResourceListContent_construct(){
      var o = this;
      o.__base.FUiListView.construct.call(o);
   }
   MO.FDsResourceListContent_doClickItem = function FDsResourceListContent_doClickItem(control){
      var o = this;
      o.__base.FUiListView.doClickItem.call(o, control);
   }
   MO.FDsResourceListContent_doDoubleClickItem = function FDsResourceListContent_doDoubleClickItem(control){
      var o = this;
      o.__base.FUiListView.doDoubleClickItem.call(o, control)
      var guid = control._guid;
      o._activeItem = control;
      o._activeGuid = control._guid;
      var workspace = o._frameSet._workspace;
      var typeCd = control._typeCd;
      if(typeCd == EE3sResource.Bitmap){
         workspace.selectFrameSet(EDsFrameSet.PrivateBitmapFrameSet, guid);
      }else if(typeCd == EE3sResource.Material){
         workspace.selectFrameSet(EDsFrameSet.PrivateMaterialFrameSet, guid);
      }else if(typeCd == EE3sResource.Model){
         workspace.selectFrameSet(EDsFrameSet.PrivateModelFrameSet, guid);
      }else if(typeCd == EE3sResource.Template){
         workspace.selectFrameSet(EDsFrameSet.PrivateTemplateFrameSet, guid);
      }else if(typeCd == EE3sResource.Scene){
         workspace.selectFrameSet(EDsFrameSet.PrivateSceneFrameSet, guid);
      }else{
         throw new TError(o, 'Unsupport resource format.');
      }
   }
   MO.FDsResourceListContent_serviceSearch = function FDsResourceListContent_serviceSearch(typeCd, search, order, pageSize, page, force){
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
      if(!force){
         var flag = typeCd + '|' + search + '|' + order + '|' + pageSize + '|' + page;
         if(o._contentFlag == flag){
            return;
         }
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
   MO.FDsResourceListContent_serviceResearch = function FDsResourceListContent_serviceResearch(){
      var o = this;
      o.serviceSearch(o._contentTypeCd, o._contentSerach, o._contentOrder, o._contentPageSize, o._contentPage, true);
   }
   MO.FDsResourceListContent_dispose = function FDsResourceListContent_dispose(){
      var o = this;
      o.__base.FUiListView.dispose.call(o);
   }
}
with(MO){
   MO.FDsResourceListItem = function FDsResourceListItem(o){
      o = RClass.inherits(this, o, FUiListViewItem);
      o._styleTypePanel        = RClass.register(o, new AStyle('_styleTypePanel'));
      o._styleTypePrivateLabel = RClass.register(o, new AStyle('_styleTypePublicLabel'));
      o._styleTypePublicLabel  = RClass.register(o, new AStyle('_styleTypePrivateLabel'));
      o.onBuild         = FDsResourceListItem_onBuild;
      o.setTypeLabel    = FDsResourceListItem_setTypeLabel;
      o.refreshStyle    = FDsResourceListItem_refreshStyle;
      return o;
   }
   MO.FDsResourceListItem_onBuild = function FDsResourceListItem_onBuild(p){
      var o = this;
      o.__base.FUiListViewItem.onBuild.call(o, p);
      var h = o._hPanel;
      h.style.width = '200px';
      h.style.height = '150px';
      o._hLine1.className = o.styleName('TypePanel');
      o._hLine1.vAlign = 'top';
      o._hTypeLabel = RBuilder.appendDiv(o._hLine1, o.styleName('TypePrivateLabel'));
   }
   MO.FDsResourceListItem_setTypeLabel = function FDsResourceListItem_setTypeLabel(label){
      this._hTypeLabel.innerHTML = label;
   }
   MO.FDsResourceListItem_refreshStyle = function FDsResourceListItem_refreshStyle(){
      var o = this;
      if(o._shareCd == 'Public'){
         o._hTypeLabel.className = o.styleName('TypePublicLabel');
      }else{
         o._hTypeLabel.className = o.styleName('TypePrivateLabel');
      }
      var url = '/cloud.resource.preview.wv?type_cd=' + o._typeCd + '&guid=' + o._guid + '&update_date=' + o._updateDate;
      o._hForm.style.backgroundImage = 'url("' + url + '")';
   }
}
with(MO){
   MO.FDsResourceListToolBar = function FDsResourceListToolBar(o){
      o = RClass.inherits(this, o, FUiToolBar, MUiStorage);
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
   MO.FDsResourceListToolBar_onBuilded = function FDsResourceListToolBar_onBuilded(p){
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
   MO.FDsResourceListToolBar_onSearchClick = function FDsResourceListToolBar_onSearchClick(p){
      this.doNavigator(0);
   }
   MO.FDsResourceListToolBar_onNavigatorClick = function FDsResourceListToolBar_onNavigatorClick(event){
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
   MO.FDsResourceListToolBar_onTypeClick = function FDsResourceListToolBar_onTypeClick(event){
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
   MO.FDsResourceListToolBar_construct = function FDsResourceListToolBar_construct(){
      var o = this;
      o.__base.FUiToolBar.construct.call(o);
   }
   MO.FDsResourceListToolBar_makeTypeCd = function FDsResourceListToolBar_makeTypeCd(){
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
   MO.FDsResourceListToolBar_setNavigator = function FDsResourceListToolBar_setNavigator(pageSize, pageCount, page){
      var o = this;
      o._contentPageSize = pageSize;
      o._contentPageCount = pageCount;
      o._contentPage = page;
      o._controlPageEdit.setText(page);
   }
   MO.FDsResourceListToolBar_doNavigator = function FDsResourceListToolBar_doNavigator(page){
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
   MO.FDsResourceListToolBar_storageLoad = function FDsResourceListToolBar_storageLoad(){
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
   MO.FDsResourceListToolBar_dispose = function FDsResourceListToolBar_dispose(){
      var o = this;
      o.__base.FUiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsResourceMenuBar = function FDsResourceMenuBar(o){
      o = RClass.inherits(this, o, FUiMenuBar);
      o._controlImportPicture  = null;
      o._controlImportModel    = null;
      o._controlCreateMaterial = null;
      o._controlCreateTemplate = null;
      o._controlCreateScene    = null;
      o._controlDelete         = null;
      o._controlShareOpen      = null;
      o._controlShareClose     = null;
      o.onImportPictureClick   = FDsResourceMenuBar_onImportPictureClick;
      o.onImportModelClick     = FDsResourceMenuBar_onImportModelClick;
      o.onCreateMaterialClick  = FDsResourceMenuBar_onCreateMaterialClick;
      o.onCreateTemplateClick  = FDsResourceMenuBar_onCreateTemplateClick;
      o.onCreateSceneClick     = FDsResourceMenuBar_onCreateSceneClick;
      o.onDeleteLoad           = FDsResourceMenuBar_onDeleteLoad;
      o.onDeleteExecute        = FDsResourceMenuBar_onDeleteExecute;
      o.onDeleteClick          = FDsResourceMenuBar_onDeleteClick;
      o.onShareLoad            = FDsResourceMenuBar_onShareLoad;
      o.onShareClick           = FDsResourceMenuBar_onShareClick;
      o.construct              = FDsResourceMenuBar_construct;
      o.dispose                = FDsResourceMenuBar_dispose;
      return o;
   }
   MO.FDsResourceMenuBar_onImportPictureClick = function FDsResourceMenuBar_onImportPictureClick(p){
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
      dialog.switchMode(EE3sResource.Bitmap);
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsResourceMenuBar_onImportModelClick = function FDsResourceMenuBar_onImportModelClick(p){
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
      dialog.switchMode(EE3sResource.Model);
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsResourceMenuBar_onCreateMaterialClick = function FDsResourceMenuBar_onCreateMaterialClick(){
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
      var dialog = RConsole.find(FUiWindowConsole).find(FDsResourceCreateDialog);
      dialog._frameSet = o._frameSet;
      dialog._workspace = o._workspace;
      dialog._nodeGuid = nodeGuid;
      dialog.setNodeLabel(nodeLabel);
      dialog.switchMode(EE3sResource.Material);
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsResourceMenuBar_onCreateTemplateClick = function FDsResourceMenuBar_onCreateTemplateClick(){
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
      var dialog = RConsole.find(FUiWindowConsole).find(FDsResourceCreateDialog);
      dialog._frameSet = o._frameSet;
      dialog._workspace = o._workspace;
      dialog._nodeGuid = nodeGuid;
      dialog.setNodeLabel(nodeLabel);
      dialog.switchMode(EE3sResource.Template);
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsResourceMenuBar_onCreateSceneClick = function FDsResourceMenuBar_onCreateSceneClick(){
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
      var dialog = RConsole.find(FUiWindowConsole).find(FDsResourceCreateDialog);
      dialog._frameSet = o._frameSet;
      dialog._workspace = o._workspace;
      dialog._nodeGuid = nodeGuid;
      dialog.setNodeLabel(nodeLabel);
      dialog.switchMode(EE3sResource.Scene);
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsResourceMenuBar_onDeleteLoad = function FDsResourceMenuBar_onDeleteLoad(event){
      var o = this;
      RConsole.find(FUiDesktopConsole).hide();
      var frame = o._frameSet._listContent;
      frame.serviceResearch();
   }
   MO.FDsResourceMenuBar_onDeleteExecute = function FDsResourceMenuBar_onDeleteExecute(event){
      var o = this;
      if(event.resultCd != EResult.Success){
         RConsole.find(FUiDesktopConsole).hide();
         return
      }
      var item = o._frameSet._listContent.focusItem();
      var typeCd = item._typeCd;
      var guid = item._guid;
      RConsole.find(FUiDesktopConsole).showUploading();
      var connection = RConsole.find(FDrResourceConsole).doDelete(typeCd, guid);
      connection.addLoadListener(o, o.onDeleteLoad);
   }
   MO.FDsResourceMenuBar_onDeleteClick = function FDsResourceMenuBar_onDeleteClick(event){
      var o = this;
      var item = o._frameSet._listContent.focusItem();
      if(!item){
         return alert('请选中后再点击删除');
      }
      var dialog = RConsole.find(FUiMessageConsole).showConfirm('请确认是否删除当前资源？');
      dialog.addResultListener(o, o.onDeleteExecute);
   }
   MO.FDsResourceMenuBar_onShareLoad = function FDsResourceMenuBar_onShareLoad(){
      var o = this;
      RConsole.find(FUiDesktopConsole).hide();
   }
   MO.FDsResourceMenuBar_onShareClick = function FDsResourceMenuBar_onShareClick(event){
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
   MO.FDsResourceMenuBar_construct = function FDsResourceMenuBar_construct(){
      var o = this;
      o.__base.FUiMenuBar.construct.call(o);
   }
   MO.FDsResourceMenuBar_dispose = function FDsResourceMenuBar_dispose(){
      var o = this;
      o.__base.FUiMenuBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsResourcePropertyContent = function FDsResourcePropertyContent(o){
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
   MO.FDsResourcePropertyContent_onBuild = function FDsResourcePropertyContent_onBuild(p){
      var o = this;
      o.__base.FDsCanvas.onBuild.call(o, p);
   }
   MO.FDsResourcePropertyContent_onMouseCaptureStart = function FDsResourcePropertyContent_onMouseCaptureStart(p){
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
   MO.FDsResourcePropertyContent_onMouseCapture = function FDsResourcePropertyContent_onMouseCapture(p){
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
   MO.FDsResourcePropertyContent_onMouseCaptureStop = function FDsResourcePropertyContent_onMouseCaptureStop(p){
      var o = this;
      RHtml.cursorSet(o._hPanel, EUiCursor.Auto);
   }
   MO.FDsResourcePropertyContent_onEnterFrame = function FDsResourcePropertyContent_onEnterFrame(){
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
   MO.FDsResourcePropertyContent_onMeshLoad = function FDsResourcePropertyContent_onMeshLoad(p){
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
   MO.FDsResourcePropertyContent_oeResize = function FDsResourcePropertyContent_oeResize(p){
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
   MO.FDsResourcePropertyContent_oeRefresh = function FDsResourcePropertyContent_oeRefresh(p){
      return EEventStatus.Stop;
   }
   MO.FDsResourcePropertyContent_construct = function FDsResourcePropertyContent_construct(){
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
   MO.FDsResourcePropertyContent_innerSelectDisplay = function FDsResourcePropertyContent_innerSelectDisplay(p){
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
   MO.FDsResourcePropertyContent_innerSelectLayer = function FDsResourcePropertyContent_innerSelectLayer(p){
      var o = this;
      var s = p.displays();
      var c = s.count();
      for(var i = 0; i < c; i++){
         var d = s.getAt(i);
         o.innerSelectDisplay(d)
      }
   }
   MO.FDsResourcePropertyContent_selectNone = function FDsResourcePropertyContent_selectNone(){
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
   MO.FDsResourcePropertyContent_selectDisplay = function FDsResourcePropertyContent_selectDisplay(p){
      var o = this;
      o.selectNone();
      o._selectObject = p;
      o.innerSelectDisplay(p);
   }
   MO.FDsResourcePropertyContent_selectMaterial = function FDsResourcePropertyContent_selectMaterial(p){
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
   MO.FDsResourcePropertyContent_selectRenderable = function FDsResourcePropertyContent_selectRenderable(p){
      var o = this;
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
   MO.FDsResourcePropertyContent_switchMode = function FDsResourcePropertyContent_switchMode(p){
      var o = this;
      o._canvasModeCd = p;
      o.selectRenderable(o._selectRenderable);
   }
   MO.FDsResourcePropertyContent_switchRotation = function FDsResourcePropertyContent_switchRotation(p){
      this._optionRotation = p;
   }
   MO.FDsResourcePropertyContent_reloadRegion = function FDsResourcePropertyContent_reloadRegion(region){
      var o = this;
      var resource = region.resource();
      o._cameraMoveRate = resource.moveSpeed();
      o._cameraKeyRotation = resource.rotationKeySpeed();
      o._cameraMouseRotation = resource.rotationMouseSpeed();
   }
   MO.FDsResourcePropertyContent_loadMeshByGuid = function FDsResourcePropertyContent_loadMeshByGuid(p){
      var o = this;
      var rmc = RConsole.find(FE3dMeshConsole);
      if(o._activeSpace != null){
         rmc.free(o._activeSpace);
      }
      var space = o._activeSpace = rmc.allocByGuid(o, p);
      space.addLoadListener(o, o.onMeshLoad);
      space._layer.pushRenderable(o._dimensional);
      RStage.register('mesh3d', space);
   }
   MO.FDsResourcePropertyContent_loadMeshByCode = function FDsResourcePropertyContent_loadMeshByCode(p){
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
   MO.FDsResourcePropertyContent_dispose = function FDsResourcePropertyContent_dispose(){
      var o = this;
      o._rotation = RObject.dispose(o._rotation);
      o.__base.FDsCanvas.dispose.call(o);
   }
}
with(MO){
   MO.FDsResourcePropertyToolBar = function FDsResourcePropertyToolBar(o){
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
   MO.FDsResourcePropertyToolBar_onBuilded = function FDsResourcePropertyToolBar_onBuilded(p){
      var o = this;
      o.__base.FUiToolBar.onBuilded.call(o, p);
      o._controlUpdateButton.addClickListener(o, o.onUpdateClick);
      o._controlRotationButton.addClickListener(o, o.onRotationClick);
   }
   MO.FDsResourcePropertyToolBar_onUpdateClick = function FDsResourcePropertyToolBar_onUpdateClick(event){
      var o = this;
   }
   MO.FDsResourcePropertyToolBar_onRotationClick = function FDsResourcePropertyToolBar_onRotationClick(event){
      var o = this;
      var previewContent = o._workspace._previewContent;
      previewContent.switchRotation(event.checked);
   }
   MO.FDsResourcePropertyToolBar_construct = function FDsResourcePropertyToolBar_construct(){
      var o = this;
      o.__base.FUiToolBar.construct.call(o);
   }
   MO.FDsResourcePropertyToolBar_dispose = function FDsResourcePropertyToolBar_dispose(){
      var o = this;
      o.__base.FUiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsResourceSelectCatalogToolBar = function FDsResourceSelectCatalogToolBar(o){
      o = RClass.inherits(this, o, FUiToolBar);
      o._frameName          = 'resource.resource.SelectCatalogToolBar';
      o._controlFolderOpen  = null;
      o._controlFolderClose = null;
      o._activeNodeGuid     = null;
      o.onBuilded           = FDsResourceSelectCatalogToolBar_onBuilded;
      o.onFolderOpenClick   = FDsResourceSelectCatalogToolBar_onFolderOpenClick;
      o.onFolderCloseClick  = FDsResourceSelectCatalogToolBar_onFolderCloseClick;
      o.construct           = FDsResourceSelectCatalogToolBar_construct;
      o.dispose             = FDsResourceSelectCatalogToolBar_dispose;
      return o;
   }
   MO.FDsResourceSelectCatalogToolBar_onBuilded = function FDsResourceSelectCatalogToolBar_onBuilded(p){
      var o = this;
      o.__base.FUiToolBar.onBuilded.call(o, p);
      o._controlFolderOpen.addClickListener(o, o.onFolderOpenClick);
      o._controlFolderClose.addClickListener(o, o.onFolderCloseClick);
   }
   MO.FDsResourceSelectCatalogToolBar_onFolderOpenClick = function FDsResourceSelectCatalogToolBar_onFolderOpenClick(event){
   }
   MO.FDsResourceSelectCatalogToolBar_onFolderCloseClick = function FDsResourceSelectCatalogToolBar_onFolderCloseClick(event){
   }
   MO.FDsResourceSelectCatalogToolBar_construct = function FDsResourceSelectCatalogToolBar_construct(){
      var o = this;
      o.__base.FUiToolBar.construct.call(o);
   }
   MO.FDsResourceSelectCatalogToolBar_dispose = function FDsResourceSelectCatalogToolBar_dispose(){
      var o = this;
      o.__base.FUiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsResourceSelectDialog = function FDsResourceSelectDialog(o){
      o = RClass.inherits(this, o, FUiDialog);
      o._frameName            = 'resource.resource.SelectDialog';
      o._styleToolbarGround   = RClass.register(o, new AStyle('_styleToolbarGround', 'Toolbar_Ground'));
      o._styleCatalogContent  = RClass.register(o, new AStyle('_styleCatalogContent', 'Catalog_Content'));
      o._styleListContent     = RClass.register(o, new AStyle('_styleListContent', 'List_Content'));
      o._dataModeCd           = null;
      o._controlParentLabel   = null;
      o._controlLabel         = null;
      o._controlConfirmButton = null;
      o._controlCancelButton  = null;
      o.onBuilded             = FDsResourceSelectDialog_onBuilded;
      o.onConfirmLoad         = FDsResourceSelectDialog_onConfirmLoad;
      o.onConfirmClick        = FDsResourceSelectDialog_onConfirmClick;
      o.onCancelClick         = FDsResourceSelectDialog_onCancelClick;
      o.construct             = FDsResourceSelectDialog_construct;
      o.setNodeParentLabel    = FDsResourceSelectDialog_setNodeParentLabel;
      o.setNodeLabel          = FDsResourceSelectDialog_setNodeLabel;
      o.switchDataMode        = FDsResourceSelectDialog_switchDataMode;
      o.dispose               = FDsResourceSelectDialog_dispose;
      return o;
   }
   MO.FDsResourceSelectDialog_onBuilded = function FDsResourceSelectDialog_onBuilded(event){
      var o = this;
      o.__base.FUiDialog.onBuilded.call(o, event);
      o._controlConfirm.addClickListener(o, o.onConfirmClick);
      o._controlCancel.addClickListener(o, o.onCancelClick);
      o._frameCatalogToolBar._hPanel.className = o.styleName('Toolbar_Ground');
      o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
      o._frameListToolBar._hPanel.className = o.styleName('Toolbar_Ground');
      o._frameListContent._hPanel.className = o.styleName('List_Content');
      var splitterCatalog = o._catalogSplitter = o.searchControl('catalogSpliter');
      splitterCatalog.setAlignCd(EUiAlign.Left);
      splitterCatalog.setSizeHtml(o._frameCatalog._hPanel);
      var control = o._catalogToolbar = RClass.create(FDsResourceSelectCatalogToolBar);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.buildDefine(event);
      o._frameCatalogToolBar.push(control);
      var control = o._catalogContent = RClass.create(FDsResourceCatalogContent);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.build(event);
      o._frameCatalogContent.push(control);
      var control = o._listToolBar = RClass.create(FDsResourceSelectListToolBar);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.buildDefine(event);
      o._frameListToolBar.push(control);
      var control = o._listContent = RClass.create(FDsResourceListContent);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.build(event);
      o._frameListContent.push(control);
      o._listContent.serviceSearch();
   }
   MO.FDsResourceSelectDialog_onConfirmLoad = function FDsResourceSelectDialog_onConfirmLoad(event){
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
   MO.FDsResourceSelectDialog_onConfirmClick = function FDsResourceSelectDialog_onConfirmClick(event){
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
   MO.FDsResourceSelectDialog_onCancelClick = function FDsResourceSelectDialog_onCancelClick(event){
      this.hide();
   }
   MO.FDsResourceSelectDialog_construct = function FDsResourceSelectDialog_construct(){
      var o = this;
      o.__base.FUiDialog.construct.call(o);
   }
   MO.FDsResourceSelectDialog_setNodeParentLabel = function FDsResourceSelectDialog_setNodeParentLabel(label){
      this._controlParentLabel.set(label);
   }
   MO.FDsResourceSelectDialog_setNodeLabel = function FDsResourceSelectDialog_setNodeLabel(label){
      this._controlLabel.set(label);
   }
   MO.FDsResourceSelectDialog_switchDataMode = function FDsResourceSelectDialog_switchDataMode(modeCd){
      var o = this;
      o._dataModeCd = modeCd;
      if(modeCd == EUiDataMode.Insert){
         o.setLabel('新建资源目录');
      }else if(modeCd == EUiDataMode.Update){
         o.setLabel('资源目录属性');
      }
   }
   MO.FDsResourceSelectDialog_dispose = function FDsResourceSelectDialog_dispose(){
      var o = this;
      o.__base.FUiDialog.dispose.call(o);
   }
}
with(MO){
   MO.FDsResourceSelectListToolBar = function FDsResourceSelectListToolBar(o){
      o = RClass.inherits(this, o, FUiToolBar, MUiStorage);
      o._frameName        = 'resource.resource.SelectListToolBar';
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
      o.onBuilded         = FDsResourceSelectListToolBar_onBuilded;
      o.onSearchClick     = FDsResourceSelectListToolBar_onSearchClick;
      o.onNavigatorClick  = FDsResourceSelectListToolBar_onNavigatorClick;
      o.onTypeClick       = FDsResourceSelectListToolBar_onTypeClick;
      o.construct         = FDsResourceSelectListToolBar_construct;
      o.makeTypeCd        = FDsResourceSelectListToolBar_makeTypeCd;
      o.setNavigator      = FDsResourceSelectListToolBar_setNavigator;
      o.doNavigator       = FDsResourceSelectListToolBar_doNavigator;
      o.storageLoad       = FDsResourceSelectListToolBar_storageLoad;
      o.dispose           = FDsResourceSelectListToolBar_dispose;
      return o;
   }
   MO.FDsResourceSelectListToolBar_onBuilded = function FDsResourceSelectListToolBar_onBuilded(p){
      var o = this;
      o.__base.FUiToolBar.onBuilded.call(o, p);
      o._controlSearchEdit.addClickListener(o, o.onSearchClick);
      o._controlFirstButton.addClickListener(o, o.onNavigatorClick);
      o._controlPriorButton.addClickListener(o, o.onNavigatorClick);
      o._controlNextButton.addClickListener(o, o.onNavigatorClick);
      o._controlLastButton.addClickListener(o, o.onNavigatorClick);
   }
   MO.FDsResourceSelectListToolBar_onSearchClick = function FDsResourceSelectListToolBar_onSearchClick(p){
      this.doNavigator(0);
   }
   MO.FDsResourceSelectListToolBar_onNavigatorClick = function FDsResourceSelectListToolBar_onNavigatorClick(event){
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
   MO.FDsResourceSelectListToolBar_onTypeClick = function FDsResourceSelectListToolBar_onTypeClick(event){
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
            break;
         case 'typeNone':
            o._controlTypeBitmap.check(false);
            o._controlTypeMaterial.check(false);
            o._controlTypeModel.check(false);
            o._controlTypeTemplate.check(false);
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
   MO.FDsResourceSelectListToolBar_construct = function FDsResourceSelectListToolBar_construct(){
      var o = this;
      o.__base.FUiToolBar.construct.call(o);
   }
   MO.FDsResourceSelectListToolBar_makeTypeCd = function FDsResourceSelectListToolBar_makeTypeCd(){
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
      return 'All';
   }
   MO.FDsResourceSelectListToolBar_setNavigator = function FDsResourceSelectListToolBar_setNavigator(pageSize, pageCount, page){
      var o = this;
      o._contentPageSize = pageSize;
      o._contentPageCount = pageCount;
      o._contentPage = page;
      o._controlPageEdit.setText(page);
   }
   MO.FDsResourceSelectListToolBar_doNavigator = function FDsResourceSelectListToolBar_doNavigator(page){
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
   MO.FDsResourceSelectListToolBar_storageLoad = function FDsResourceSelectListToolBar_storageLoad(){
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
   MO.FDsResourceSelectListToolBar_dispose = function FDsResourceSelectListToolBar_dispose(){
      var o = this;
      o.__base.FUiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsResourceTabBar = function FDsResourceTabBar(o){
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
   MO.FDsResourceTabBar_onBuilded = function FDsResourceTabBar_onBuilded(p){
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
   MO.FDsResourceTabBar_onButtonClick = function FDsResourceTabBar_onButtonClick(event){
      var o = this;
      var sender = event.sender;
      var name = sender.name();
      o._resourceTypeCd = name;
   }
   MO.FDsResourceTabBar_construct = function FDsResourceTabBar_construct(){
      var o = this;
      o.__base.FUiTabBar.construct.call(o);
   }
   MO.FDsResourceTabBar_dispose = function FDsResourceTabBar_dispose(){
      var o = this;
      o.__base.FUiTabBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsResourceWorkspace = function FDsResourceWorkspace(o){
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
   MO.FDsResourceWorkspace_onBuilded = function FDsResourceWorkspace_onBuilded(p){
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
   MO.FDsResourceWorkspace_onMeshLoad = function FDsResourceWorkspace_onMeshLoad(p){
      var o = this;
      o._activeSpace = p._activeSpace;
      o._catalog.buildSpace(o._activeSpace);
   }
   MO.FDsResourceWorkspace_onCatalogSelected = function FDsResourceWorkspace_onCatalogSelected(p, pc){
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
   MO.FDsResourceWorkspace_construct = function FDsResourceWorkspace_construct(){
      var o = this;
      o.__base.FUiWorkspace.construct.call(o);
      o._propertyFrames = new TDictionary();
   }
   MO.FDsResourceWorkspace_findPropertyFrame = function FDsResourceWorkspace_findPropertyFrame(p){
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
   MO.FDsResourceWorkspace_switchContent = function FDsResourceWorkspace_switchContent(typeCd){
      this._frameSet.switchContent(typeCd);
   }
   MO.FDsResourceWorkspace_load = function FDsResourceWorkspace_load(){
      var o = this;
   }
   MO.FDsResourceWorkspace_dispose = function FDsResourceWorkspace_dispose(){
      var o = this;
      o.__base.FUiWorkspace.dispose.call(o);
      o._propertyFrames.dispose();
      o._propertyFrames = null;
   }
}
with(MO){
   MO.FDsBitmapCanvasContent = function FDsBitmapCanvasContent(o){
      o = RClass.inherits(this, o, FDsBitmapCanvas);
      return o;
   }
}
with(MO){
   MO.FDsBitmapCanvasToolBar = function FDsBitmapCanvasToolBar(o){
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
   MO.FDsBitmapCanvasToolBar_onBuilded = function FDsBitmapCanvasToolBar_onBuilded(p){
      var o = this;
      o.__base.FUiToolBar.onBuilded.call(o, p);
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
      o.__base.FUiToolBar.construct.call(o);
   }
   MO.FDsBitmapCanvasToolBar_dispose = function FDsBitmapCanvasToolBar_dispose(){
      var o = this;
      o.__base.FUiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsBitmapFrameSet = function FDsBitmapFrameSet(o){
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
      var bitmap = o._activeResource = RConsole.find(FDrBitmapConsole).query(guid);
      var canvas = o._canvasContent;
      canvas.loadByGuid(guid);
      var frame = o.findPropertyFrame(EDsFrame.BitmapPropertyFrame);
      frame.loadObject(bitmap);
   }
   MO.FDsBitmapFrameSet_loadByCode = function FDsBitmapFrameSet_loadByCode(code){
      var o = this;
      o._activeCode = code;
      var connection = RConsole.find(FDrBitmapConsole).query(code);
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
   MO.FDsBitmapImportDialog_onBuilded = function FDsBitmapImportDialog_onBuilded(event){
      var o = this;
      o.__base.FUiDialog.onBuilded.call(o, event);
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
      var connection = RConsole.find(FHttpConsole).send(url, reader.data());
      connection.addLoadListener(o, o.onConfirmLoad);
      o._fileReader = RObject.dispose(reader);
   }
   MO.FDsBitmapImportDialog_onConfirmLoad = function FDsBitmapImportDialog_onConfirmLoad(event){
      var o = this;
      RConsole.find(FUiDesktopConsole).hide();
      o.hide();
      o._frameSet.reload();
   }
   MO.FDsBitmapImportDialog_onConfirmClick = function FDsBitmapImportDialog_onConfirmClick(event){
      var o = this;
      RConsole.find(FUiDesktopConsole).showUploading();
      var file = o._controlFile._hInput.files[0];
      var reader = o._fileReader = RClass.create(FFileReader);
      reader.addLoadListener(o, o.onFileLoaded);
      reader.loadFile(file);
   }
   MO.FDsBitmapImportDialog_onCancelClick = function FDsBitmapImportDialog_onCancelClick(event){
      this.hide();
   }
   MO.FDsBitmapImportDialog_construct = function FDsBitmapImportDialog_construct(){
      var o = this;
      o.__base.FUiDialog.construct.call(o);
   }
   MO.FDsBitmapImportDialog_dispose = function FDsBitmapImportDialog_dispose(){
      var o = this;
      o.__base.FUiDialog.dispose.call(o);
   }
}
with(MO){
   MO.FDsBitmapMenuBar = function FDsBitmapMenuBar(o){
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
   MO.FDsBitmapMenuBar_onBuilded = function FDsBitmapMenuBar_onBuilded(event){
      var o = this;
      o.__base.FUiMenuBar.onBuilded.call(o, event);
   }
   MO.FDsBitmapMenuBar_onSaveLoad = function FDsBitmapMenuBar_onSaveLoad(event){
      RConsole.find(FUiDesktopConsole).hide();
   }
   MO.FDsBitmapMenuBar_onSaveClick = function FDsBitmapMenuBar_onSaveClick(event){
      var o = this;
      var bitmap = o._frameSet._activeResource;
      RConsole.find(FUiDesktopConsole).showUploading();
      var connection = RConsole.find(FDrBitmapConsole).doUpdate(bitmap);
      connection.addLoadListener(o, o.onSaveLoad);
   }
   MO.FDsBitmapMenuBar_onImportClick = function FDsBitmapMenuBar_onImportClick(event){
      var o = this;
      var resource = o._frameSet._activeResource;
      var dialog = RConsole.find(FUiWindowConsole).find(FDsBitmapImportDialog);
      dialog._resource = resource;
      dialog._frameSet = o._frameSet;
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsBitmapMenuBar_construct = function FDsBitmapMenuBar_construct(){
      var o = this;
      o.__base.FUiMenuBar.construct.call(o);
   }
   MO.FDsBitmapMenuBar_dispose = function FDsBitmapMenuBar_dispose(){
      var o = this;
      o.__base.FUiMenuBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsBitmapPropertyFrame = function FDsBitmapPropertyFrame(o){
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
   MO.FDsBitmapPropertyFrame_construct = function FDsBitmapPropertyFrame_construct(){
      var o = this;
      o.__base.FUiForm.construct.call(o);
   }
   MO.FDsBitmapPropertyFrame_onBuilded = function FDsBitmapPropertyFrame_onBuilded(p){
      var o = this;
      o.__base.FUiForm.onBuilded.call(o, p);
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
      o.__base.FUiForm.dispose.call(o);
   }
}
with(MO){
   MO.FDsBitmapPropertyToolBar = function FDsBitmapPropertyToolBar(o){
      o = RClass.inherits(this, o, FUiToolBar);
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
      o.__base.FUiToolBar.onBuilded.call(o, event);
      o._controlRefresh.addClickListener(o, o.onRefreshClick);
   }
   MO.FDsBitmapPropertyToolBar_onRefreshClick = function FDsBitmapPropertyToolBar_onRefreshClick(event){
      var o = this;
   }
   MO.FDsBitmapPropertyToolBar_construct = function FDsBitmapPropertyToolBar_construct(){
      var o = this;
      o.__base.FUiToolBar.construct.call(o);
   }
   MO.FDsBitmapPropertyToolBar_dispose = function FDsBitmapPropertyToolBar_dispose(){
      var o = this;
      o.__base.FUiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsBitmapWorkspace = function FDsBitmapWorkspace(o){
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
   MO.FDsBitmapWorkspace_onBuilded = function FDsBitmapWorkspace_onBuilded(p){
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
   MO.FDsBitmapWorkspace_construct = function FDsBitmapWorkspace_construct(){
      var o = this;
      o.__base.FUiWorkspace.construct.call(o);
      o._propertyFrames = new TDictionary();
   }
   MO.FDsBitmapWorkspace_findPropertyFrame = function FDsBitmapWorkspace_findPropertyFrame(p){
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
   MO.FDsBitmapWorkspace_loadByGuid = function FDsBitmapWorkspace_loadByGuid(guid){
      this._frameSet.loadByGuid(guid);
   }
   MO.FDsBitmapWorkspace_loadByCode = function FDsBitmapWorkspace_loadByCode(code){
      this._frameSet.loadByCode(code);
   }
   MO.FDsBitmapWorkspace_dispose = function FDsBitmapWorkspace_dispose(){
      var o = this;
      o.__base.FUiWorkspace.dispose.call(o);
      o._propertyFrames.dispose();
      o._propertyFrames = null;
   }
}
with(MO){
   MO.FDsMaterialCanvasBitmap = function FDsMaterialCanvasBitmap(o){
      o = RClass.inherits(this, o, FDsBitmapCanvas);
      return o;
   }
}
with(MO){
   MO.FDsMaterialCanvasContent = function FDsMaterialCanvasContent(o){
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
   MO.FDsMaterialCanvasContent_onBuild = function FDsMaterialCanvasContent_onBuild(p){
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
   MO.FDsMaterialCanvasContent_onLoaded = function FDsMaterialCanvasContent_onLoaded(event){
      var o = this;
      var material = o._activeMaterial = o._activeResource.material();
      RConsole.find(FUiDesktopConsole).hide();
   }
   MO.FDsMaterialCanvasContent_oeResize = function FDsMaterialCanvasContent_oeResize(p){
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
   MO.FDsMaterialCanvasContent_oeRefresh = function FDsMaterialCanvasContent_oeRefresh(p){
      return EEventStatus.Stop;
   }
   MO.FDsMaterialCanvasContent_construct = function FDsMaterialCanvasContent_construct(){
      var o = this;
      o.__base.FDsCanvas.construct.call(o);
      o._capturePosition = new SPoint2();
      o._captureCameraPosition = new SPoint3();
   }
   MO.FDsMaterialCanvasContent_selectDisplay = function FDsMaterialCanvasContent_selectDisplay(p){
      var o = this;
      o.selectNone();
      o._selectObject = p;
      o.innerSelectDisplay(p);
   }
   MO.FDsMaterialCanvasContent_switchMode = function FDsMaterialCanvasContent_switchMode(p){
      var o = this;
      o._canvasModeCd = p;
   }
   MO.FDsMaterialCanvasContent_reloadRegion = function FDsMaterialCanvasContent_reloadRegion(region){
      var o = this;
      var resource = region.resource();
      o._cameraMoveRate = resource.moveSpeed();
      o._cameraKeyRotation = resource.rotationKeySpeed();
      o._cameraMouseMove = resource.rotationMouseSpeed();
   }
   MO.FDsMaterialCanvasContent_loadByGuid = function FDsMaterialCanvasContent_loadByGuid(guid){
      var o = this;
      RConsole.find(FUiDesktopConsole).showLoading();
      var resource = o._activeResource = RConsole.find(FE3sMaterialConsole).loadByGuid(guid);
      resource.addLoadListener(o, o.onLoaded);
   }
   MO.FDsMaterialCanvasContent_dispose = function FDsMaterialCanvasContent_dispose(){
      var o = this;
      o.__base.FDsCanvas.dispose.call(o);
   }
}
with(MO){
   MO.FDsMaterialCanvasToolBar = function FDsMaterialCanvasToolBar(o){
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
   MO.FDsMaterialCanvasToolBar_onBuilded = function FDsMaterialCanvasToolBar_onBuilded(p){
      var o = this;
      o.__base.FUiToolBar.onBuilded.call(o, p);
      o._controlSize1.addClickListener(o, o.onSizeClick);
      o._controlSize2.addClickListener(o, o.onSizeClick);
      o._controlSize3.addClickListener(o, o.onSizeClick);
      o._controlSize4.addClickListener(o, o.onSizeClick);
      o._controlSizeWidth.setText('*');
      o._controlSizeHeight.setText('*');
   }
   MO.FDsMaterialCanvasToolBar_onModeClick = function FDsMaterialCanvasToolBar_onModeClick(p){
      var o = this;
   }
   MO.FDsMaterialCanvasToolBar_onSizeClick = function FDsMaterialCanvasToolBar_onSizeClick(event){
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
   MO.FDsMaterialCanvasToolBar_construct = function FDsMaterialCanvasToolBar_construct(){
      var o = this;
      o.__base.FUiToolBar.construct.call(o);
   }
   MO.FDsMaterialCanvasToolBar_dispose = function FDsMaterialCanvasToolBar_dispose(){
      var o = this;
      o.__base.FUiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsMaterialCatalogContent = function FDsMaterialCatalogContent(o){
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
   MO.FDsMaterialCatalogContent_onBuilded = function FDsMaterialCatalogContent_onBuilded(p){
      var o = this;
      o.__base.FUiListView.onBuilded.call(o, p);
   }
   MO.FDsMaterialCatalogContent_onServiceLoad = function FDsMaterialCatalogContent_onServiceLoad(event){
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
   MO.FDsMaterialCatalogContent_construct = function FDsMaterialCatalogContent_construct(){
      var o = this;
      o.__base.FUiListView.construct.call(o);
   }
   MO.FDsMaterialCatalogContent_doClickItem = function FDsMaterialCatalogContent_doClickItem(control){
      var o = this;
      o.__base.FUiListView.doClickItem.call(o, control);
   }
   MO.FDsMaterialCatalogContent_doDoubleClickItem = function FDsMaterialCatalogContent_doDoubleClickItem(control){
      var o = this;
      o.__base.FUiListView.doDoubleClickItem.call(o, control)
      var guid = control._guid;
      o._activeItem = control;
      o._activeGuid = guid;
      o._frameSet.switchCanvas('Bitmap', guid);
   }
   MO.FDsMaterialCatalogContent_serviceList = function FDsMaterialCatalogContent_serviceList(guid){
      var o = this;
      RConsole.find(FUiDesktopConsole).showLoading();
      var url = '/cloud.resource.material.ws?action=listBitmap&guid=' + guid;
      var connection = RConsole.find(FXmlConsole).sendAsync(url);
      connection.addLoadListener(o, o.onServiceLoad);
   }
   MO.FDsMaterialCatalogContent_dispose = function FDsMaterialCatalogContent_dispose(){
      var o = this;
      o.__base.FUiListView.dispose.call(o);
   }
}
with(MO){
   MO.FDsMaterialCatalogItem = function FDsMaterialCatalogItem(o){
      o = RClass.inherits(this, o, FUiListViewItem);
      o._styleTypePanel = RClass.register(o, new AStyle('_styleTypePanel'));
      o._styleTypeLabel = RClass.register(o, new AStyle('_styleTypeLabel'));
      o.onBuild         = FDsMaterialCatalogItem_onBuild;
      o.setTypeLabel    = FDsMaterialCatalogItem_setTypeLabel;
      o.refreshStyle    = FDsMaterialCatalogItem_refreshStyle;
      return o;
   }
   MO.FDsMaterialCatalogItem_onBuild = function FDsMaterialCatalogItem_onBuild(p){
      var o = this;
      o.__base.FUiListViewItem.onBuild.call(o, p);
      var h = o._hPanel;
      h.style.width = '200px';
      h.style.height = '150px';
      o._hLine1.className = o.styleName('TypePanel');
      o._hLine1.vAlign = 'top';
      o._hTypeLabel = RBuilder.appendDiv(o._hLine1, o.styleName('TypeLabel'));
   }
   MO.FDsMaterialCatalogItem_setTypeLabel = function FDsMaterialCatalogItem_setTypeLabel(label){
      this._hTypeLabel.innerHTML = label;
   }
   MO.FDsMaterialCatalogItem_refreshStyle = function FDsMaterialCatalogItem_refreshStyle(){
      var o = this;
      var url = '/cloud.resource.bitmap.wv?do=preview&guid=' + o._guid + '&update_date=' + o._updateDate;
      o._hForm.style.backgroundImage = 'url("' + url + '")';
   }
}
with(MO){
   MO.FDsMaterialCatalogToolBar = function FDsMaterialCatalogToolBar(o){
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
   MO.FDsMaterialCatalogToolBar_onBuilded = function FDsMaterialCatalogToolBar_onBuilded(p){
      var o = this;
      o.__base.FUiToolBar.onBuilded.call(o, p);
      o._controlCreate.addClickListener(o, o.onCreateClick);
      o._controlDelete.addClickListener(o, o.onDeleteClick);
      o._controlMoveUp.addClickListener(o, o.onMoveClick);
      o._controlMoveDown.addClickListener(o, o.onMoveClick);
   }
   MO.FDsMaterialCatalogToolBar_onCreateClick = function FDsMaterialCatalogToolBar_onCreateClick(p){
      var o = this;
   }
   MO.FDsMaterialCatalogToolBar_onDeleteClick = function FDsMaterialCatalogToolBar_onDeleteClick(event){
      var o = this;
   }
   MO.FDsMaterialCatalogToolBar_onMoveClick = function FDsMaterialCatalogToolBar_onMoveClick(event){
      var o = this;
   }
   MO.FDsMaterialCatalogToolBar_construct = function FDsMaterialCatalogToolBar_construct(){
      var o = this;
      o.__base.FUiToolBar.construct.call(o);
   }
   MO.FDsMaterialCatalogToolBar_dispose = function FDsMaterialCatalogToolBar_dispose(){
      var o = this;
      o.__base.FUiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsMaterialFrameSet = function FDsMaterialFrameSet(o){
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
   MO.FDsMaterialFrameSet_onBuilded = function FDsMaterialFrameSet_onBuilded(event){
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
   MO.FDsMaterialFrameSet_onDataLoaded = function FDsMaterialFrameSet_onDataLoaded(p){
      var o = this;
      o._activeSpace = p._activeSpace;
      o._catalog.buildSpace(o._activeSpace);
   }
   MO.FDsMaterialFrameSet_onCatalogSelected = function FDsMaterialFrameSet_onCatalogSelected(select, flag){
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
   MO.FDsMaterialFrameSet_construct = function FDsMaterialFrameSet_construct(){
      var o = this;
      o.__base.FDsFrameSet.construct.call(o);
   }
   MO.FDsMaterialFrameSet_switchCanvas = function FDsMaterialFrameSet_switchCanvas(typeCd, guid){
      var o = this;
      if(typeCd == 'Bitmap'){
         var canvas = o._canvasBitmap;
         canvas.loadByGuid(guid);
      }else{
      }
   }
   MO.FDsMaterialFrameSet_loadByGuid = function FDsMaterialFrameSet_loadByGuid(guid){
      var o = this;
      o._activeGuid = guid;
      var resource = o._activeResource = RConsole.find(FDrMaterialConsole).query(guid);
      o._catalogContent.serviceList(guid);
      var canvas = o._canvasContent;
      canvas.loadByGuid(guid);
      var frame = o.findPropertyFrame(EDsFrame.MaterialPropertyFrame);
      frame.loadObject(resource);
   }
   MO.FDsMaterialFrameSet_loadByCode = function FDsMaterialFrameSet_loadByCode(code){
      var o = this;
      o._activeCode = code;
      o._canvas.loadByCode(code);
   }
   MO.FDsMaterialFrameSet_dispose = function FDsMaterialFrameSet_dispose(){
      var o = this;
      o.__base.FDsFrameSet.dispose.call(o);
   }
}
with(MO){
   MO.FDsMaterialImportDialog = function FDsMaterialImportDialog(o){
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
   MO.FDsMaterialImportDialog_onBuilded = function FDsMaterialImportDialog_onBuilded(event){
      var o = this;
      o.__base.FUiDialog.onBuilded.call(o, event);
      o._controlConfirmButton.addClickListener(o, o.onConfirmClick);
      o._controlCancelButton.addClickListener(o, o.onCancelClick);
   }
   MO.FDsMaterialImportDialog_onFileLoaded = function FDsMaterialImportDialog_onFileLoaded(event){
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
   MO.FDsMaterialImportDialog_onConfirmLoad = function FDsMaterialImportDialog_onConfirmLoad(event){
      var o = this;
      RConsole.find(FUiDesktopConsole).hide();
      o.hide();
   }
   MO.FDsMaterialImportDialog_onConfirmClick = function FDsMaterialImportDialog_onConfirmClick(event){
      var o = this;
      RConsole.find(FUiDesktopConsole).showUploading();
      var file = o._controlFile._hInput.files[0];
      var reader = o._fileReader = RClass.create(FFileReader);
      reader.addLoadListener(o, o.onFileLoaded);
      reader.loadFile(file);
   }
   MO.FDsMaterialImportDialog_onCancelClick = function FDsMaterialImportDialog_onCancelClick(event){
      this.hide();
   }
   MO.FDsMaterialImportDialog_construct = function FDsMaterialImportDialog_construct(){
      var o = this;
      o.__base.FUiDialog.construct.call(o);
   }
   MO.FDsMaterialImportDialog_switchModeCd = function FDsMaterialImportDialog_switchModeCd(modeCd){
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
   MO.FDsMaterialImportDialog_dispose = function FDsMaterialImportDialog_dispose(){
      var o = this;
      o.__base.FUiDialog.dispose.call(o);
   }
}
with(MO){
   MO.FDsMaterialMenuBar = function FDsMaterialMenuBar(o){
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
   MO.FDsMaterialMenuBar_onBuilded = function FDsMaterialMenuBar_onBuilded(p){
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
   MO.FDsMaterialMenuBar_onBackClick = function FDsMaterialMenuBar_onBackClick(event){
      var o = this;
   }
   MO.FDsMaterialMenuBar_onSaveLoad = function FDsMaterialMenuBar_onSaveLoad(event){
      RConsole.find(FUiDesktopConsole).hide();
   }
   MO.FDsMaterialMenuBar_onSaveClick = function FDsMaterialMenuBar_onSaveClick(p){
      var o = this;
      var space = o._frameSet._activeSpace;
      var resource = space.resource();
      RConsole.find(FUiDesktopConsole).showUploading();
      var xconfig = new TXmlNode();
      resource.saveConfig(xconfig);
      var connection = RConsole.find(FE3sMeshConsole).update(xconfig);
      connection.addLoadListener(o, o.onSaveLoad);
   }
   MO.FDsMaterialMenuBar_onPropertyClick = function FDsMaterialMenuBar_onPropertyClick(event){
      var o = this;
   }
   MO.FDsMaterialMenuBar_onSelectLoad = function FDsMaterialMenuBar_onSelectLoad(event){
   }
   MO.FDsMaterialMenuBar_onSelectConfirm = function FDsMaterialMenuBar_onSelectConfirm(event){
   }
   MO.FDsMaterialMenuBar_onSelectClick = function FDsMaterialMenuBar_onSelectClick(event){
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
   MO.FDsMaterialMenuBar_onImportClick = function FDsMaterialMenuBar_onImportClick(event){
      var o = this;
      var dialog = RConsole.find(FUiWindowConsole).find(FDsMaterialImportDialog);
      dialog._frameSet = o._frameSet;
      dialog.switchModeCd('import');
      dialog._controlCode.set('');
      dialog._controlLabel.set('');
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsMaterialMenuBar_onDeleteLoad = function FDsMaterialMenuBar_onDeleteLoad(event){
      var o = this;
      RConsole.find(FUiDesktopConsole).hide();
   }
   MO.FDsMaterialMenuBar_onDeleteExecute = function FDsMaterialMenuBar_onDeleteExecute(event){
      var o = this;
      var item = o._frameSet._catalogContent.focusItem();
      RConsole.find(FUiDesktopConsole).showUploading();
      var connection = RConsole.find(FDrMaterialConsole).deleteBitmap(item._linkGuid);
      connection.addLoadListener(o, o.onDeleteLoad);
   }
   MO.FDsMaterialMenuBar_onDeleteClick = function FDsMaterialMenuBar_onDeleteClick(event){
      var o = this;
      var item = o._frameSet._catalogContent.focusItem();
      if(!item){
         return alert('请选中后再点击删除');
      }
      var dialog = RConsole.find(FUiMessageConsole).showConfirm('请确认是否删除当前资源？');
      dialog.addResultListener(o, o.onDeleteExecute);
   }
   MO.FDsMaterialMenuBar_onCaptureLoad = function FDsMaterialMenuBar_onCaptureLoad(event){
      RConsole.find(FUiDesktopConsole).hide();
   }
   MO.FDsMaterialMenuBar_onCaptureClick = function FDsMaterialMenuBar_onCaptureClick(event){
      var o = this;
      RConsole.find(FUiDesktopConsole).showUploading();
      var connection = o._frameSet._canvas.capture();
      connection.addLoadListener(o, o.onCaptureLoad);
   }
   MO.FDsMaterialMenuBar_construct = function FDsMaterialMenuBar_construct(){
      var o = this;
      o.__base.FUiMenuBar.construct.call(o);
   }
   MO.FDsMaterialMenuBar_dispose = function FDsMaterialMenuBar_dispose(){
      var o = this;
      o.__base.FUiMenuBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsMaterialPropertyFrame = function FDsMaterialPropertyFrame(o){
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
   MO.FDsMaterialPropertyFrame_construct = function FDsMaterialPropertyFrame_construct(){
      var o = this;
      o.__base.FUiForm.construct.call(o);
   }
   MO.FDsMaterialPropertyFrame_onBuilded = function FDsMaterialPropertyFrame_onBuilded(event){
      var o = this;
      o.__base.FUiForm.onBuilded.call(o, event);
      o._controlCode.addDataChangedListener(o, o.onDataChanged);
      o._controlLabel.addDataChangedListener(o, o.onDataChanged);
   }
   MO.FDsMaterialPropertyFrame_onDataChanged = function FDsMaterialPropertyFrame_onDataChanged(p){
      var o = this;
      var resource = o._activeResource;
      resource.setCode(o._controlCode.get());
      resource.setLabel(o._controlLabel.get());
   }
   MO.FDsMaterialPropertyFrame_loadObject = function FDsMaterialPropertyFrame_loadObject(resource){
      var o = this;
      o._activeResource = resource;
      o._controlGuid.set(resource.guid());
      o._controlCode.set(resource.code());
      o._controlLabel.set(resource.label());
   }
   MO.FDsMaterialPropertyFrame_dispose = function FDsMaterialPropertyFrame_dispose(){
      var o = this;
      o.__base.FUiForm.dispose.call(o);
   }
}
with(MO){
   MO.FDsMaterialPropertyToolBar = function FDsMaterialPropertyToolBar(o){
      o = RClass.inherits(this, o, FUiToolBar);
      o._frameName      = 'resource.material.PropertyToolBar';
      o._controlRefresh = null;
      o.onBuilded       = FDsMaterialPropertyToolBar_onBuilded;
      o.onRefreshClick  = FDsMaterialPropertyToolBar_onRefreshClick;
      o.construct       = FDsMaterialPropertyToolBar_construct;
      o.dispose         = FDsMaterialPropertyToolBar_dispose;
      return o;
   }
   MO.FDsMaterialPropertyToolBar_onBuilded = function FDsMaterialPropertyToolBar_onBuilded(p){
      var o = this;
      o.__base.FUiToolBar.onBuilded.call(o, p);
      o._controlRefresh.addClickListener(o, o.onRefreshClick);
   }
   MO.FDsMaterialPropertyToolBar_onRefreshClick = function FDsMaterialPropertyToolBar_onRefreshClick(p){
      var o = this;
   }
   MO.FDsMaterialPropertyToolBar_onSizeClick = function FDsMaterialPropertyToolBar_onSizeClick(event){
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
   MO.FDsMaterialPropertyToolBar_onRotationChange = function FDsMaterialPropertyToolBar_onRotationChange(event){
      var o = this;
      var canvas = o._frameSet._canvas;
      var visible = o._controlRotationVisible.isCheck();
      var width = RInteger.parse(o._controlRotationWidth.text());
      var height = RInteger.parse(o._controlRotationHeight.text());
      canvas.switchRotation(visible, width, height);
   }
   MO.FDsMaterialPropertyToolBar_onRotationAutoClick = function FDsMaterialPropertyToolBar_onRotationAutoClick(event){
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
   MO.FDsMaterialPropertyToolBar_onRotationClick = function FDsMaterialPropertyToolBar_onRotationClick(event, v){
      var o = this;
      var button = event.sender;
      var canvas = o._frameSet._canvas;
      canvas.switchRotation(button.isCheck());
   }
   MO.FDsMaterialPropertyToolBar_construct = function FDsMaterialPropertyToolBar_construct(){
      var o = this;
      o.__base.FUiToolBar.construct.call(o);
   }
   MO.FDsMaterialPropertyToolBar_dispose = function FDsMaterialPropertyToolBar_dispose(){
      var o = this;
      o.__base.FUiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsMaterialSelectDialog = function FDsMaterialSelectDialog(o){
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
   MO.FDsMaterialSelectDialog_onBuilded = function FDsMaterialSelectDialog_onBuilded(event){
      var o = this;
      o.__base.FUiDialog.onBuilded.call(o, event);
      o._controlConfirmButton.addClickListener(o, o.onConfirmClick);
      o._controlCancelButton.addClickListener(o, o.onCancelClick);
   }
   MO.FDsMaterialSelectDialog_onFileLoaded = function FDsMaterialSelectDialog_onFileLoaded(event){
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
   MO.FDsMaterialSelectDialog_onConfirmLoad = function FDsMaterialSelectDialog_onConfirmLoad(event){
      var o = this;
      RConsole.find(FUiDesktopConsole).hide();
      o.hide();
      o._frameSet.reload();
   }
   MO.FDsMaterialSelectDialog_onConfirmClick = function FDsMaterialSelectDialog_onConfirmClick(event){
      var o = this;
      RConsole.find(FUiDesktopConsole).showUploading();
      var file = o._controlFile._hInput.files[0];
      var reader = o._fileReader = RClass.create(FFileReader);
      reader.addLoadListener(o, o.onFileLoaded);
      reader.loadFile(file);
   }
   MO.FDsMaterialSelectDialog_onCancelClick = function FDsMaterialSelectDialog_onCancelClick(event){
      this.hide();
   }
   MO.FDsMaterialSelectDialog_construct = function FDsMaterialSelectDialog_construct(){
      var o = this;
      o.__base.FUiDialog.construct.call(o);
   }
   MO.FDsMaterialSelectDialog_dispose = function FDsMaterialSelectDialog_dispose(){
      var o = this;
      o.__base.FUiDialog.dispose.call(o);
   }
}
with(MO){
   MO.FDsMaterialWorkspace = function FDsMaterialWorkspace(o){
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
   MO.FDsMaterialWorkspace_onBuilded = function FDsMaterialWorkspace_onBuilded(p){
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
   MO.FDsMaterialWorkspace_onMeshLoad = function FDsMaterialWorkspace_onMeshLoad(p){
      var o = this;
      o._activeSpace = p._activeSpace;
      o._catalog.buildSpace(o._activeSpace);
   }
   MO.FDsMaterialWorkspace_onCatalogSelected = function FDsMaterialWorkspace_onCatalogSelected(p, pc){
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
   MO.FDsMaterialWorkspace_construct = function FDsMaterialWorkspace_construct(){
      var o = this;
      o.__base.FUiWorkspace.construct.call(o);
      o._propertyFrames = new TDictionary();
   }
   MO.FDsMaterialWorkspace_findPropertyFrame = function FDsMaterialWorkspace_findPropertyFrame(p){
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
   MO.FDsMaterialWorkspace_loadByGuid = function FDsMaterialWorkspace_loadByGuid(guid){
      this._frameSet.loadByGuid(guid);
   }
   MO.FDsMaterialWorkspace_loadByCode = function FDsMaterialWorkspace_loadByCode(code){
      this._frameSet.loadByCode(code);
   }
   MO.FDsMaterialWorkspace_dispose = function FDsMaterialWorkspace_dispose(){
      var o = this;
      o.__base.FUiWorkspace.dispose.call(o);
      o._propertyFrames.dispose();
      o._propertyFrames = null;
   }
}
with(MO){
   MO.FDsModelCanvasContent = function FDsModelCanvasContent(o){
      o = RClass.inherits(this, o, FDsCanvas);
      o._resourceTypeCd      = EE3sResource.Model;
      o._autoDistance        = null;
      o._autoOutline         = null;
      o._autoMatrix          = null;
      o._optionRotation      = false;
      o._rotation            = null;
      o._capturePosition     = null;
      o._captureMatrix       = null;
      o._captureRotation     = null;
      o._selectObject        = null;
      o._selectBoundBox      = null;
      o._selectRenderables   = null;
      o._templateMatrix      = null;
      o._templateRenderable  = null;
      o._templateFace        = null;
      o._templateTranslation = null;
      o._templateRotation    = null;
      o._templateScale       = null;
      o._templateViewScale   = 0.05;
      o.onBuild              = FDsModelCanvasContent_onBuild;
      o.onMouseCaptureStart  = FDsModelCanvasContent_onMouseCaptureStart;
      o.onMouseCapture       = FDsModelCanvasContent_onMouseCapture;
      o.onMouseCaptureStop   = FDsModelCanvasContent_onMouseCaptureStop;
      o.onDataLoaded         = FDsModelCanvasContent_onDataLoaded;
      o.oeResize             = FDsModelCanvasContent_oeResize;
      o.oeRefresh            = FDsModelCanvasContent_oeRefresh;
      o.construct            = FDsModelCanvasContent_construct;
      o.innerSelectDisplay   = FDsModelCanvasContent_innerSelectDisplay;
      o.innerSelectLayer     = FDsModelCanvasContent_innerSelectLayer;
      o.selectNone           = FDsModelCanvasContent_selectNone;
      o.selectDisplay        = FDsModelCanvasContent_selectDisplay;
      o.selectMaterial       = FDsModelCanvasContent_selectMaterial;
      o.selectRenderable     = FDsModelCanvasContent_selectRenderable;
      o.switchDimensional    = FDsModelCanvasContent_switchDimensional;
      o.switchRotation       = FDsModelCanvasContent_switchRotation;
      o.viewAutoSize         = FDsModelCanvasContent_viewAutoSize;
      o.loadByGuid           = FDsModelCanvasContent_loadByGuid;
      o.loadByCode           = FDsModelCanvasContent_loadByCode;
      o.dispose              = FDsModelCanvasContent_dispose;
      return o;
   }
   MO.FDsModelCanvasContent_onBuild = function FDsModelCanvasContent_onBuild(p){
      var o = this;
      o.__base.FDsCanvas.onBuild.call(o, p);
   }
   MO.FDsModelCanvasContent_onMouseCaptureStart = function FDsModelCanvasContent_onMouseCaptureStart(p){
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
   MO.FDsModelCanvasContent_onMouseCapture = function FDsModelCanvasContent_onMouseCapture(p){
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
   MO.FDsModelCanvasContent_onMouseCaptureStop = function FDsModelCanvasContent_onMouseCaptureStop(p){
      var o = this;
      RHtml.cursorSet(o._hPanel, EUiCursor.Auto);
   }
   MO.FDsModelCanvasContent_onDataLoaded = function FDsModelCanvasContent_onDataLoaded(p){
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
      var event = new SEvent(o);
      o.processLoadListener(event);
      event.dispose();
      RConsole.find(FUiDesktopConsole).hide();
   }
   MO.FDsModelCanvasContent_oeResize = function FDsModelCanvasContent_oeResize(p){
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
   MO.FDsModelCanvasContent_oeRefresh = function FDsModelCanvasContent_oeRefresh(p){
      return EEventStatus.Stop;
   }
   MO.FDsModelCanvasContent_construct = function FDsModelCanvasContent_construct(){
      var o = this;
      o.__base.FDsCanvas.construct.call(o);
      o._autoDistance = new SPoint3(6, 6, 6);
      o._autoOutline = new SOutline3d();
      o._autoMatrix = new SMatrix3d();
      o._capturePosition = new SPoint2();
      o._captureMatrix = new SMatrix3d();
      o._templateMatrix = new SMatrix3d();
      o._templateFaceMatrix = new SMatrix3d();
      o._rotation = new SVector3();
      o._captureRotation = new SVector3();
      o._selectRenderables = new TObjects();
   }
   MO.FDsModelCanvasContent_innerSelectDisplay = function FDsModelCanvasContent_innerSelectDisplay(p){
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
   MO.FDsModelCanvasContent_innerSelectLayer = function FDsModelCanvasContent_innerSelectLayer(p){
      var o = this;
      var s = p.displays();
      var c = s.count();
      for(var i = 0; i < c; i++){
         var d = s.getAt(i);
         o.innerSelectDisplay(d)
      }
   }
   MO.FDsModelCanvasContent_selectNone = function FDsModelCanvasContent_selectNone(){
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
   MO.FDsModelCanvasContent_selectDisplay = function FDsModelCanvasContent_selectDisplay(p){
      var o = this;
      o.selectNone();
      o._selectObject = p;
      o.innerSelectDisplay(p);
   }
   MO.FDsModelCanvasContent_selectMaterial = function FDsModelCanvasContent_selectMaterial(p){
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
   MO.FDsModelCanvasContent_selectRenderable = function FDsModelCanvasContent_selectRenderable(p){
      var o = this;
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
         o._frameSet._catalog.showObject(p);
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
   MO.FDsModelCanvasContent_switchMode = function FDsModelCanvasContent_switchMode(p){
      var o = this;
      o._canvasModeCd = p;
      o.selectRenderable(o._selectRenderable);
   }
   MO.FDsModelCanvasContent_switchDimensional = function FDsModelCanvasContent_switchDimensional(visible, width, height){
      var o = this;
      o._dimensional.setVisible(visible);
      var matrix = o._dimensional.matrix();
      if(width > 0){
         matrix.sx = width;
      }
      if(height > 0){
         matrix.sz = height;
      }
      matrix.updateForce();
   }
   MO.FDsModelCanvasContent_switchRotation = function FDsModelCanvasContent_switchRotation(p){
      this._optionRotation = p;
   }
   MO.FDsModelCanvasContent_viewAutoSize = function FDsModelCanvasContent_viewAutoSize(flipX, flipY, flipZ, rotationX, rotationY, rotationZ){
      var o = this;
      var outline = o._autoOutline;
      var space = o._activeSpace;
      var display = space.display();
      var displayResource = display.resource();
      var displayMatrix = displayResource.matrix();
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
      var resourceOutline = displayResource.calculateOutline();
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
   }
   MO.FDsModelCanvasContent_loadByGuid = function FDsModelCanvasContent_loadByGuid(guid){
      var o = this;
      var space = o._activeSpace;
      var modelConsole = RConsole.find(FE3dModelConsole);
      if(space){
         RStage.unregister(space);
         modelConsole.free(space);
      }
      space = o._activeSpace = modelConsole.allocByGuid(o, guid);
      if(!space._linked){
         RConsole.find(FUiDesktopConsole).showLoading();
         space._layer.pushRenderable(o._dimensional);
         space.addLoadListener(o, o.onDataLoaded);
         space._linked = true;
      }
      RStage.register('space', space);
   }
   MO.FDsModelCanvasContent_loadByCode = function FDsModelCanvasContent_loadByCode(code){
      var o = this;
   }
   MO.FDsModelCanvasContent_dispose = function FDsModelCanvasContent_dispose(){
      var o = this;
      o._rotation = RObject.dispose(o._rotation);
      o.__base.FDsCanvas.dispose.call(o);
   }
}
with(MO){
   MO.FDsModelCanvasToolBar = function FDsModelCanvasToolBar(o){
      o = RClass.inherits(this, o, FUiToolBar);
      o._frameName                 = 'resource.model.CanvasToolBar';
      o._canvasModeCd              = EDsCanvasMode.Drop;
      o._controlDrop               = null;
      o._controlSize1              = null;
      o._controlSize2              = null;
      o._controlSize3              = null;
      o._controlSize4              = null;
      o._controlSizeWidth          = null;
      o._controlSizeHeight         = null;
      o._controlDimensionalVisible = null;
      o._controlDimensionalWidth   = null;
      o._controlDimensionalHeight  = null;
      o._controlDimensionalAuto    = null;
      o._controlDimensionalFlipX   = null;
      o._controlDimensionalFlipY   = null;
      o._controlDimensionalFlipZ   = null;
      o._controlDimensionalX       = null;
      o._controlDimensionalY       = null;
      o._controlDimensionalZ       = null;
      o._controlRotation           = null;
      o.onBuilded                  = FDsModelCanvasToolBar_onBuilded;
      o.onModeClick                = FDsModelCanvasToolBar_onModeClick;
      o.onSizeClick                = FDsModelCanvasToolBar_onSizeClick;
      o.onDimensionalChange        = FDsModelCanvasToolBar_onDimensionalChange;
      o.onDimensionalAutoClick     = FDsModelCanvasToolBar_onDimensionalAutoClick;
      o.onRotationClick            = FDsModelCanvasToolBar_onRotationClick;
      o.construct                  = FDsModelCanvasToolBar_construct;
      o.dispose                    = FDsModelCanvasToolBar_dispose;
      return o;
   }
   MO.FDsModelCanvasToolBar_onBuilded = function FDsModelCanvasToolBar_onBuilded(p){
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
      o._controlSizeWidth.setText('*');
      o._controlSizeHeight.setText('*');
      o._controlDimensionalVisible.addClickListener(o, o.onDimensionalChange);
      o._controlDimensionalVisible.check(true);
      o._controlDimensionalWidth.addDataChangedListener(o, o.onDimensionalChange);
      o._controlDimensionalWidth.setText(1);
      o._controlDimensionalHeight.addDataChangedListener(o, o.onDimensionalChange);
      o._controlDimensionalHeight.setText(1);
      o._controlDimensionalAuto.addClickListener(o, o.onDimensionalAutoClick);
      o._controlDimensionalFlipX.addClickListener(o, o.onDimensionalAutoClick);
      o._controlDimensionalFlipY.addClickListener(o, o.onDimensionalAutoClick);
      o._controlDimensionalFlipZ.addClickListener(o, o.onDimensionalAutoClick);
      o._controlDimensionalX.addClickListener(o, o.onDimensionalAutoClick);
      o._controlDimensionalY.addClickListener(o, o.onDimensionalAutoClick);
      o._controlDimensionalZ.addClickListener(o, o.onDimensionalAutoClick);
      o._controlRotation.addClickListener(o, o.onRotationClick);
   }
   MO.FDsModelCanvasToolBar_onModeClick = function FDsModelCanvasToolBar_onModeClick(p){
      var o = this;
   }
   MO.FDsModelCanvasToolBar_onSizeClick = function FDsModelCanvasToolBar_onSizeClick(event){
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
      o._frameSet._canvasContent.switchSize(width, height);
   }
   MO.FDsModelCanvasToolBar_onDimensionalChange = function FDsModelCanvasToolBar_onDimensionalChange(event){
      var o = this;
      var canvas = o._frameSet._canvasContent;
      var visible = o._controlDimensionalVisible.isCheck();
      var width = RInteger.parse(o._controlDimensionalWidth.text());
      var height = RInteger.parse(o._controlDimensionalHeight.text());
      canvas.switchDimensional(visible, width, height);
   }
   MO.FDsModelCanvasToolBar_onDimensionalAutoClick = function FDsModelCanvasToolBar_onDimensionalAutoClick(event){
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
      o._frameSet._canvasContent.viewAutoSize(flipX, flipY, flipZ, rotationX, rotationY, rotationZ);
   }
   MO.FDsModelCanvasToolBar_onRotationClick = function FDsModelCanvasToolBar_onRotationClick(event, v){
      var o = this;
      var button = event.sender;
      var canvas = o._frameSet._canvasContent;
      canvas.switchRotation(button.isCheck());
   }
   MO.FDsModelCanvasToolBar_construct = function FDsModelCanvasToolBar_construct(){
      var o = this;
      o.__base.FUiToolBar.construct.call(o);
   }
   MO.FDsModelCanvasToolBar_dispose = function FDsModelCanvasToolBar_dispose(){
      var o = this;
      o.__base.FUiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsModelCatalogContent = function FDsModelCatalogContent(o){
      o = RClass.inherits(this, o, FDsCatalog);
      o._iconView             = 'resource.tools.view';
      o._iconViewNot          = 'resource.tools.viewno';
      o.onBuild               = FDsModelCatalogContent_onBuild;
      o.onLoadDisplay         = FDsModelCatalogContent_onLoadDisplay;
      o.onNodeViewClick       = FDsModelCatalogContent_onNodeViewClick;
      o.onNodeViewDoubleClick = FDsModelCatalogContent_onNodeViewDoubleClick;
      o.lsnsSelect            = null;
      o.construct             = FDsModelCatalogContent_construct;
      o.buildRenderable       = FDsModelCatalogContent_buildRenderable;
      o.buildDisplay          = FDsModelCatalogContent_buildDisplay;
      o.buildSpace            = FDsModelCatalogContent_buildSpace;
      o.selectObject          = FDsModelCatalogContent_selectObject;
      o.showObject            = FDsModelCatalogContent_showObject;
      o.dispose               = FDsModelCatalogContent_dispose;
      return o;
   }
   MO.FDsModelCatalogContent_onBuild = function FDsModelCatalogContent_onBuild(p){
      var o = this;
      o.__base.FDsCatalog.onBuild.call(o, p);
      o.loadUrl('/cloud.describe.tree.ws?action=query&code=resource.model');
   }
   MO.FDsModelCatalogContent_onLoadDisplay = function FDsModelCatalogContent_onLoadDisplay(p){
      var o = this;
      var n = p._linkNode;
      o.buildRenderable(n, p);
   }
   MO.FDsModelCatalogContent_onNodeViewClick = function FDsModelCatalogContent_onNodeViewClick(p){
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
   }
   MO.FDsModelCatalogContent_onNodeViewDoubleClick = function FDsModelCatalogContent_onNodeViewDoubleClick(p){
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
   }
   MO.FDsModelCatalogContent_construct = function FDsModelCatalogContent_construct(){
      var o = this;
      o.__base.FDsCatalog.construct.call(o);
      o._renderables = new TObjects();
   }
   MO.FDsModelCatalogContent_buildRenderable = function FDsModelCatalogContent_buildRenderable(parentNode, geometry){
      var o = this;
      var renderable = geometry._renderable;
      var resource = renderable.resource();
      var code = resource.code();
      var label = resource.label();
      var node = o.createNode();
      node.setTypeCode('renderable');
      node.setLabel(code);
      node.setNote(label);
      node.dataPropertySet('linker', geometry);
      parentNode.appendNode(node);
   }
   MO.FDsModelCatalogContent_buildDisplay = function FDsModelCatalogContent_buildDisplay(parent, display){
      var o = this;
      var resource = display.resource();
      var shapes = display.shapes();
      var count = shapes.count();
      var displayNode = o.createNode();
      displayNode.setTypeCode('display');
      displayNode.setLabel('Model (' + count + ')');
      displayNode.dataPropertySet('linker', display);
      parent.appendNode(displayNode);
      var material = display.material();
      var materialResource = resource.material();
      var materialNode = o.createNode();
      materialNode.setTypeCode('material');
      materialNode.setLabel('Material');
      materialNode.dataPropertySet('linker', material);
      materialNode.dataPropertySet('resource', materialResource);
      displayNode.appendNode(materialNode);
      for(var i = 0; i < count; i++){
         var shape = shapes.get(i);
         o.buildRenderable(displayNode, shape);
      }
   }
   MO.FDsModelCatalogContent_buildSpace = function FDsModelCatalogContent_buildSpace(space){
      var o = this;
      o.clearAllNodes();
      var resource = space.resource();
      o.clear();
      var node = o.createNode();
      node.setTypeCode('space');
      node.setLabel(resource.code());
      node.setNote(resource.label());
      node.dataPropertySet('linker', space);
      o.appendNode(node);
      o.buildTechnique(node, space.technique())
      o.buildRegion(node, space.region());
      o.buildDisplay(node, space._display);
      node.click();
   }
   MO.FDsModelCatalogContent_selectObject = function FDsModelCatalogContent_selectObject(p){
      var o = this;
      if(p != null){
         o.processSelectedListener(p, true);
      }
   }
   MO.FDsModelCatalogContent_showObject = function FDsModelCatalogContent_showObject(p){
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
   MO.FDsModelCatalogContent_dispose = function FDsModelCatalogContent_dispose(){
      var o = this;
      o._displays = RObject.dispose(o._displays);
      o._renderables = RObject.dispose(o._renderables);
      o._materials = RObject.dispose(o._materials);
      o.__base.FDsCatalog.dispose.call(o);
   }
}
with(MO){
   MO.FDsModelCatalogToolBar = function FDsModelCatalogToolBar(o){
      o = RClass.inherits(this, o, FUiToolBar);
      o._frameName             = 'resource.model.CatalogToolBar';
      o._activeNodeGuid        = null;
      o._controlCreateCamera   = null;
      o._controlCreateLayer    = null;
      o._controlCreateSprite   = null;
      o._controlDelete         = null;
      o._controlFolderOpen     = null;
      o._controlFolderClose    = null;
      o.onBuilded              = FDsModelCatalogToolBar_onBuilded;
      o.onCreateCameraClick    = FDsModelCatalogToolBar_onCreateCameraClick;
      o.onCreateLayerClick     = FDsModelCatalogToolBar_onCreateLayerClick;
      o.onCreateSpriteClick    = FDsModelCatalogToolBar_onCreateSpriteClick;
      o.onDeleteLoad           = FDsModelCatalogToolBar_onDeleteLoad;
      o.onDeleteExecute        = FDsModelCatalogToolBar_onDeleteExecute;
      o.onCopyLoad             = FDsModelCatalogToolBar_onCopyLoad;
      o.onCopyExecute          = FDsModelCatalogToolBar_onCopyExecute;
      o.onCopyClick            = FDsModelCatalogToolBar_onCopyClick;
      o.onDeleteClick          = FDsModelCatalogToolBar_onDeleteClick;
      o.onFolderOpenClick      = FDsModelCatalogToolBar_onFolderOpenClick;
      o.onFolderCloseClick     = FDsModelCatalogToolBar_onFolderCloseClick;
      o.construct              = FDsModelCatalogToolBar_construct;
      o.dispose                = FDsModelCatalogToolBar_dispose;
      return o;
   }
   MO.FDsModelCatalogToolBar_onBuilded = function FDsModelCatalogToolBar_onBuilded(p){
      var o = this;
      o.__base.FUiToolBar.onBuilded.call(o, p);
      o._controlFolderOpen.addClickListener(o, o.onFolderOpenClick);
      o._controlFolderClose.addClickListener(o, o.onFolderCloseClick);
   }
   MO.FDsModelCatalogToolBar_onCreateCameraClick = function FDsModelCatalogToolBar_onCreateCameraClick(event){
      var o = this;
   }
   MO.FDsModelCatalogToolBar_onCreateLayerClick = function FDsModelCatalogToolBar_onCreateLayerClick(event){
      var o = this;
   }
   MO.FDsModelCatalogToolBar_onCreateSpriteClick = function FDsModelCatalogToolBar_onCreateSpriteClick(event){
      var o = this;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return alert('请选中目录节点。');
      }
      var linker = node.dataPropertyGet('linker');
      var layer = null;
      var sprite = null;
      if(RClass.isClass(linker, FDisplayLayer)){
         layer = linker;
      }else if(RClass.isClass(linker, FE3dSprite)){
         layer = linker.findParent(FDisplayLayer);
         sprite = linker;
      }else{
         return alert('请选中显示层或者精灵节点。');
      }
      var frameSet = o._frameSet;
      var dialog = RConsole.find(FUiWindowConsole).find(FDsCommonSpriteDialog);
      dialog._frameSet = frameSet;
      dialog._spaceGuid = frameSet._activeSpace.resource().guid();
      dialog._layerGuid = layer.resource().guid();
      if(sprite){
         dialog._displayGuid = sprite.resource().guid();
      }else{
         dialog._displayGuid = null;
      }
      if(layer){
         dialog.setLayerLabel(layer.makeLabel());
      }
      if(sprite){
         dialog.setDisplayLabel(sprite.makeLabel());
      }
      dialog.setContentCode('');
      dialog.setContentLabel('');
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsModelCatalogToolBar_onCopyLoad = function FDsModelCatalogToolBar_onCopyLoad(event){
      var o = this;
      RConsole.find(FUiDesktopConsole).hide();
   }
   MO.FDsModelCatalogToolBar_onCopyExecute = function FDsModelCatalogToolBar_onCopyExecute(event){
      var o = this;
      if(event.resultCd != EResult.Success){
         return;
      }
      var space = o._frameSet._activeSpace;
      var spaceGuid = space.resource().guid();
      RConsole.find(FUiDesktopConsole).showUploading();
      var connection = RConsole.find(FDrSceneConsole).copyNode(spaceGuid, o._activeGuid);
      connection.addLoadListener(o, o.onDeleteLoad);
   }
   MO.FDsModelCatalogToolBar_onCopyClick = function FDsModelCatalogToolBar_onCopyClick(event){
      var o = this;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return RConsole.find(FUiMessageConsole).showInfo('请选中节点后，再点击操作。');
      }
      o._activeNodeGuid = node.guid();
      var sprite = null;
      var linker = node.dataPropertyGet('linker');
      if(RClass.isClass(linker, FE3dSprite)){
         sprite = linker;
         o._activeGuid = linker.resource().guid();
      }else{
         return alert('不能复制当前选中的节点.');
      }
      var resource = sprite.resource();
      var parentResource = resource.parent();
      var displayResource = resource.clone();
      parentResource.pushDisplay(displayResource);
      var display = RConsole.find(FE3dInstanceConsole).create(EE3dInstance.SceneDisplay);
      display.linkGraphicContext(sprite);
      display.loadResource(displayResource);
      RConsole.find(FE3dSceneConsole).loadDisplay(display);
      var parent = sprite.parent();
      parent.pushDisplay(display);
   }
   MO.FDsModelCatalogToolBar_onDeleteLoad = function FDsModelCatalogToolBar_onDeleteLoad(event){
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
   MO.FDsModelCatalogToolBar_onDeleteExecute = function FDsModelCatalogToolBar_onDeleteExecute(event){
      var o = this;
      if(event.resultCd != EResult.Success){
         return;
      }
      var space = o._frameSet._activeSpace;
      var spaceGuid = space.resource().guid();
      RConsole.find(FUiDesktopConsole).showUploading();
      var connection = RConsole.find(FDrSceneConsole).deleteNode(spaceGuid, o._activeGuid);
      connection.addLoadListener(o, o.onDeleteLoad);
   }
   MO.FDsModelCatalogToolBar_onDeleteClick = function FDsModelCatalogToolBar_onDeleteClick(event){
      var o = this;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return RConsole.find(FUiMessageConsole).showInfo('请选中节点后，再点击操作。');
      }
      o._activeNodeGuid = node.guid();
      var linker = node.dataPropertyGet('linker');
      if(RClass.isClass(linker, FE3dSprite)){
         o._activeGuid = linker.resource().guid();
      }else{
         return alert('不能删除当前选中的节点.');
      }
      var dialog = RConsole.find(FUiMessageConsole).showConfirm('请确认是否删除当前节点？');
      dialog.addResultListener(o, o.onDeleteExecute);
   }
   MO.FDsModelCatalogToolBar_onFolderOpenClick = function FDsModelCatalogToolBar_onFolderOpenClick(event){
   }
   MO.FDsModelCatalogToolBar_onFolderCloseClick = function FDsModelCatalogToolBar_onFolderCloseClick(event){
   }
   MO.FDsModelCatalogToolBar_construct = function FDsModelCatalogToolBar_construct(){
      var o = this;
      o.__base.FUiToolBar.construct.call(o);
   }
   MO.FDsModelCatalogToolBar_dispose = function FDsModelCatalogToolBar_dispose(){
      var o = this;
      o.__base.FUiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsModelFrameSet = function FDsModelFrameSet(o){
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
      o.onBuilded             = FDsModelFrameSet_onBuilded;
      o.onDataLoaded          = FDsModelFrameSet_onDataLoaded;
      o.onCatalogSelected     = FDsModelFrameSet_onCatalogSelected;
      o.construct             = FDsModelFrameSet_construct;
      o.loadByGuid            = FDsModelFrameSet_loadByGuid;
      o.loadByCode            = FDsModelFrameSet_loadByCode;
      o.dispose               = FDsModelFrameSet_dispose;
      return o;
   }
   MO.FDsModelFrameSet_onBuilded = function FDsModelFrameSet_onBuilded(event){
      var o = this;
      o.__base.FDsFrameSet.onBuilded.call(o, event);
      o._frameCatalogToolBar._hPanel.className = o.styleName('ToolBar_Ground');
      o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
      o._frameCanvasToolBar._hPanel.className = o.styleName('ToolBar_Ground');
      o._frameCanvasContent._hPanel.className = o.styleName('Canvas_Content');
      o._framePropertyToolBar._hPanel.className = o.styleName('ToolBar_Ground');
      o._framePropertyContent._hPanel.className = o.styleName('Property_Content');
      var spliter = o._spliterCatalog;
      spliter.setAlignCd(EUiAlign.Left);
      spliter.setSizeHtml(o._frameCatalog._hPanel);
      var spliter = o._spliterProperty;
      spliter.setAlignCd(EUiAlign.Right);
      spliter.setSizeHtml(o._frameProperty._hPanel);
   }
   MO.FDsModelFrameSet_onDataLoaded = function FDsModelFrameSet_onDataLoaded(event){
      var o = this;
      var sender = event.sender;
      var space = o._activeSpace = sender.activeSpace();
      o._catalogContent.buildSpace(space);
   }
   MO.FDsModelFrameSet_onCatalogSelected = function FDsModelFrameSet_onCatalogSelected(select, flag){
      var o = this;
      var space = o._activeSpace;
      if(!space){
         return;
      }
      o.hidePropertyFrames();
      if(RClass.isClass(select, FE3dSpace)){
         var frame = o.findPropertyFrame(EDsFrame.CommonSpacePropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(RClass.isClass(select, FG3dTechnique)){
         var frame = o.findPropertyFrame(EDsFrame.CommonTechniquePropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(RClass.isClass(select, FE3dRegion)){
         var frame = o.findPropertyFrame(EDsFrame.CommonRegionPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(RClass.isClass(select, FE3dCamera)){
         var frame = o.findPropertyFrame(EDsFrame.CommonCameraPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(RClass.isClass(select, FG3dLight)){
         var frame = o.findPropertyFrame(EDsFrame.CommonLightPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(RClass.isClass(select, FE3dModelDisplay)){
         var frame = o.findPropertyFrame(EDsFrame.CommonDisplayPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(RClass.isClass(select, FG3dMaterial)){
         var frame = o.findPropertyFrame(EDsFrame.CommonMaterialPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(RClass.isClass(select, FE3dModelRenderable)){
         var frame = o.findPropertyFrame(EDsFrame.CommonRenderablePropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else{
         throw new TError('Unknown select object type. (select={1})', select);
      }
   }
   MO.FDsModelFrameSet_construct = function FDsModelFrameSet_construct(){
      var o = this;
      o.__base.FDsFrameSet.construct.call(o);
   }
   MO.FDsModelFrameSet_loadByGuid = function FDsModelFrameSet_loadByGuid(guid){
      var o = this;
      o._activeGuid = guid;
      o._canvasContent.loadByGuid(guid);
   }
   MO.FDsModelFrameSet_loadByCode = function FDsModelFrameSet_loadByCode(code){
      var o = this;
      o._activeCode = code;
      o._canvasContent.loadByCode(code);
   }
   MO.FDsModelFrameSet_dispose = function FDsModelFrameSet_dispose(){
      var o = this;
      o.__base.FDsFrameSet.dispose.call(o);
   }
}
with(MO){
   MO.FDsModelMenuBar = function FDsModelMenuBar(o){
      o = RClass.inherits(this, o, FUiMenuBar);
      o._controlSaveButton    = null;
      o._controlCaptureButton = null;
      o.onSaveLoad            = FDsModelMenuBar_onSaveLoad;
      o.onSaveClick           = FDsModelMenuBar_onSaveClick;
      o.onCaptureLoad         = FDsModelMenuBar_onCaptureLoad;
      o.onCaptureClick        = FDsModelMenuBar_onCaptureClick;
      o.construct             = FDsModelMenuBar_construct;
      o.dispose               = FDsModelMenuBar_dispose;
      return o;
   }
   MO.FDsModelMenuBar_onSaveLoad = function FDsModelMenuBar_onSaveLoad(event){
      RConsole.find(FUiDesktopConsole).hide();
   }
   MO.FDsModelMenuBar_onSaveClick = function FDsModelMenuBar_onSaveClick(p){
      var o = this;
      var space = o._frameSet._activeSpace;
      var resource = space.resource();
      RConsole.find(FUiDesktopConsole).showUploading();
      var xconfig = new TXmlNode();
      resource.saveConfig(xconfig);
      var connection = RConsole.find(FDrModelConsole).update(xconfig);
      connection.addLoadListener(o, o.onSaveLoad);
   }
   MO.FDsModelMenuBar_onCaptureLoad = function FDsModelMenuBar_onCaptureLoad(event){
      RConsole.find(FUiDesktopConsole).hide();
   }
   MO.FDsModelMenuBar_onCaptureClick = function FDsModelMenuBar_onCaptureClick(event){
      var o = this;
      RConsole.find(FUiDesktopConsole).showUploading();
      var connection = o._frameSet._canvasContent.capture();
      connection.addLoadListener(o, o.onCaptureLoad);
   }
   MO.FDsModelMenuBar_construct = function FDsModelMenuBar_construct(){
      var o = this;
      o.__base.FUiMenuBar.construct.call(o);
   }
   MO.FDsModelMenuBar_dispose = function FDsModelMenuBar_dispose(){
      var o = this;
      o.__base.FUiMenuBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsModelWorkspace = function FDsModelWorkspace(o){
      o = RClass.inherits(this, o, FUiWorkspace);
      o._frameName            = 'design3d.mesh.Workspace';
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
      o.onBuilded             = FDsModelWorkspace_onBuilded;
      o.onMeshLoad            = FDsModelWorkspace_onMeshLoad;
      o.onCatalogSelected     = FDsModelWorkspace_onCatalogSelected;
      o.construct             = FDsModelWorkspace_construct;
      o.findPropertyFrame     = FDsModelWorkspace_findPropertyFrame;
      o.loadByGuid            = FDsModelWorkspace_loadByGuid;
      o.loadByCode            = FDsModelWorkspace_loadByCode;
      o.dispose               = FDsModelWorkspace_dispose;
      return o;
   }
   MO.FDsModelWorkspace_onBuilded = function FDsModelWorkspace_onBuilded(p){
      var o = this;
      o.__base.FUiWorkspace.onBuilded.call(o, p);
      var frame = o._frameToolBar = o.searchControl('toolbarFrame');
      frame._hPanel.className = o.styleName('Toolbar_Ground');
      var frame = o._frameBody = o.searchControl('bodyFrame');
      frame._hPanel.className = o.styleName('Body_Ground');
      var frame = o._frameStatusBar = o.searchControl('statusFrame');
      frame._hPanel.className = o.styleName('Statusbar_Ground');
      var menuBar = o._menuBar = RClass.create(FDsModelMenuBar);
      menuBar._workspace = o;
      menuBar.buildDefine(p);
      o._frameToolBar.push(menuBar);
      var frameSet = o._frameSet = RClass.create(FDsModelFrameSet);
      frameSet._workspace = o;
      frameSet.buildDefine(p);
      o._frameBody.push(frameSet);
      menuBar._frameSet = frameSet;
   }
   MO.FDsModelWorkspace_onMeshLoad = function FDsModelWorkspace_onMeshLoad(p){
      var o = this;
      o._activeSpace = p._activeSpace;
      o._catalog.buildSpace(o._activeSpace);
   }
   MO.FDsModelWorkspace_onCatalogSelected = function FDsModelWorkspace_onCatalogSelected(p, pc){
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
   MO.FDsModelWorkspace_construct = function FDsModelWorkspace_construct(){
      var o = this;
      o.__base.FUiWorkspace.construct.call(o);
      o._propertyFrames = new TDictionary();
   }
   MO.FDsModelWorkspace_findPropertyFrame = function FDsModelWorkspace_findPropertyFrame(p){
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
   MO.FDsModelWorkspace_loadByGuid = function FDsModelWorkspace_loadByGuid(guid){
      this._frameSet.loadByGuid(guid);
   }
   MO.FDsModelWorkspace_loadByCode = function FDsModelWorkspace_loadByCode(code){
      this._frameSet.loadByCode(code);
   }
   MO.FDsModelWorkspace_dispose = function FDsModelWorkspace_dispose(){
      var o = this;
      o.__base.FUiWorkspace.dispose.call(o);
      o._propertyFrames.dispose();
      o._propertyFrames = null;
   }
}
with(MO){
   MO.FDsTemplateCanvasContent = function FDsTemplateCanvasContent(o){
      o = RClass.inherits(this, o, FDsSpaceCanvas);
      o._resourceTypeCd     = EE3sResource.Template;
      o._context            = null;
      o._stage              = null;
      o._layer              = null;
      o._rotation           = null;
      o._rotationAble       = false;
      o._capturePosition    = null;
      o._captureMatrix      = null;
      o._captureRotation    = null;
      o._dimensional        = null;
      o._selectBoundBox     = null;
      o.onBuild             = FDsTemplateCanvasContent_onBuild;
      o.onDataLoaded        = FDsTemplateCanvasContent_onDataLoaded;
      o.oeRefresh           = FDsTemplateCanvasContent_oeRefresh;
      o.construct           = FDsTemplateCanvasContent_construct;
      o.loadByGuid          = FDsTemplateCanvasContent_loadByGuid;
      o.loadByCode          = FDsTemplateCanvasContent_loadByCode;
      o.dispose             = FDsTemplateCanvasContent_dispose;
      return o;
   }
   MO.FDsTemplateCanvasContent_onBuild = function FDsTemplateCanvasContent_onBuild(p){
      var o = this;
      o.__base.FDsSpaceCanvas.onBuild.call(o, p);
   }
   MO.FDsTemplateCanvasContent_onMouseCaptureStart = function FDsTemplateCanvasContent_onMouseCaptureStart(p){
      var o = this;
      var space = o._activeSpace;
      if(!space){
         return;
      }
      var camera = space.camera();
      o._captureRotation.assign(camera._rotation);
   }
   MO.FDsTemplateCanvasContent_onMouseCapture = function FDsTemplateCanvasContent_onMouseCapture(p){
      var o = this;
      var space = o._activeSpace;
      if(!space){
         return;
      }
      var cx = p.clientX - o._capturePosition.x;
      var cy = p.clientY - o._capturePosition.y;
      var d = t.renderables().get(0);
      var m = d.matrix();
      var cm = o._captureMatrix;
      switch(o._toolbar._canvasModeCd){
         case EDsCanvasMode.Drop:
            var c = o._stage.camera();
            var r = c.rotation();
            var cr = o._captureRotation;
            r.x = cr.x + cy * 0.003;
            r.y = cr.y + cx * 0.003;
            break;
         case EDsCanvasMode.Select:
            break;
         case EDsCanvasMode.Translate:
            m.tx = cm.tx + cx / 360 * 3.14;
            m.ty = cm.ty + cy / 360 * 3.14;
            break;
         case EDsCanvasMode.Rotation:
            m.ry = cm.ry + cx * RConst.DEGREE_RATE;
            break;
         case EDsCanvasMode.Scale:
            m.sx = cm.sx + cx / 100;
            m.sy = cm.sy + cx / 100;
            m.sz = cm.sz + cx / 100;
            break;
      }
      m.updateForce();
   }
   MO.FDsTemplateCanvasContent_onMouseCaptureStop = function FDsTemplateCanvasContent_onMouseCaptureStop(p){
   }
   MO.FDsTemplateCanvasContent_onDataLoaded = function FDsTemplateCanvasContent_onDataLoaded(p){
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
      var event = new SEvent(o);
      o.processLoadListener(event);
      event.dispose();
      RConsole.find(FUiDesktopConsole).hide();
   }
   MO.FDsTemplateCanvasContent_oeRefresh = function FDsTemplateCanvasContent_oeRefresh(p){
      var o = this;
      var c = o._graphicContext;
      o.__base.FDsSpaceCanvas.oeRefresh.call(o, p);
      var w = o._hParent.offsetWidth;
      var h = o._hParent.offsetHeight;
      var hc = o._hPanel;
      hc.width = w;
      hc.height = h;
      var rp = o._stage.camera().projection();
      rp.size().set(w, h);
      rp.update();
      c.setViewport(0, 0, w, h);
      return EEventStatus.Stop;
   }
   MO.FDsTemplateCanvasContent_construct = function FDsTemplateCanvasContent_construct(){
      var o = this;
      o.__base.FDsSpaceCanvas.construct.call(o);
      o._capturePosition = new SPoint2();
      o._captureMatrix = new SMatrix3d();
      o._rotation = new SVector3();
      o._captureRotation = new SVector3();
   }
   MO.FDsTemplateCanvasContent_loadByGuid = function FDsTemplateCanvasContent_loadByGuid(guid){
      var o = this;
      var space = o._activeSpace;
      var templateConsole = RConsole.find(FE3dTemplateConsole);
      if(space){
         RStage.unregister(space);
         templateConsole.free(space);
      }
      space = o._activeSpace = templateConsole.allocByGuid(o, guid);
      if(!space._linked){
         RConsole.find(FUiDesktopConsole).showLoading();
         space._layer.pushRenderable(o._dimensional);
         space.addLoadListener(o, o.onDataLoaded);
         space._linked = true;
      }
      RStage.register('space', space);
   }
   MO.FDsTemplateCanvasContent_loadByCode = function FDsTemplateCanvasContent_loadByCode(code){
      var o = this;
      var space = o._activeSpace;
      var templateConsole = RConsole.find(FE3dTemplateConsole);
      if(space){
         RStage.unregister(space);
         templateConsole.free(space);
      }
      space = o._activeSpace = templateConsole.allocByGuid(o, guid);
      if(!space._linked){
         RConsole.find(FUiDesktopConsole).showLoading();
         space._layer.pushRenderable(o._dimensional);
         space.addLoadListener(o, o.onDataLoaded);
         space._linked = true;
      }
      RStage.register('space', space);
   }
   MO.FDsTemplateCanvasContent_dispose = function FDsTemplateCanvasContent_dispose(){
      var o = this;
     o._rotation = RObject.dispose(o._rotation);
      o.__base.FDsSpaceCanvas.dispose.call(o);
   }
}
with(MO){
   MO.FDsTemplateCanvasToolBar = function FDsTemplateCanvasToolBar(o){
      o = RClass.inherits(this, o, FUiToolBar);
      o._refreshButton  = null;
      o._saveButton     = null;
      o._canvasModeCd   = EDsCanvasMode.Drop;
      o.onBuilded       = FDsTemplateCanvasToolBar_onBuilded;
      o.onModeClick     = FDsTemplateCanvasToolBar_onModeClick;
      o.onLookClick     = FDsTemplateCanvasToolBar_onLookClick;
      o.onPlayClick     = FDsTemplateCanvasToolBar_onPlayClick;
      o.onViewClick     = FDsTemplateCanvasToolBar_onViewClick;
      o.construct       = FDsTemplateCanvasToolBar_construct;
      o.dispose         = FDsTemplateCanvasToolBar_dispose;
      return o;
   }
   MO.FDsTemplateCanvasToolBar_onBuilded = function FDsTemplateCanvasToolBar_onBuilded(event){
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
   MO.FDsTemplateCanvasToolBar_onModeClick = function FDsTemplateCanvasToolBar_onModeClick(p){
      var o = this;
      o._canvasModeCd = p._canvasModeCd;
   }
   MO.FDsTemplateCanvasToolBar_onLookClick = function FDsTemplateCanvasToolBar_onLookClick(p){
      var o = this;
      o._canvasModeCd = p._canvasModeCd;
   }
   MO.FDsTemplateCanvasToolBar_onPlayClick = function FDsTemplateCanvasToolBar_onPlayClick(p, v){
      var o = this;
      var c = o._frameSet._canvasContent;
      c._rotationAble = v;
   }
   MO.FDsTemplateCanvasToolBar_onViewClick = function FDsTemplateCanvasToolBar_onViewClick(event){
      var o = this;
      var checked = event.checked;
      var canvas = o._frameSet._canvasContent;
      canvas.switchRotation(checked);
   }
   MO.FDsTemplateCanvasToolBar_construct = function FDsTemplateCanvasToolBar_construct(){
      var o = this;
      o.__base.FUiToolBar.construct.call(o);
   }
   MO.FDsTemplateCanvasToolBar_dispose = function FDsTemplateCanvasToolBar_dispose(){
      var o = this;
      o.__base.FUiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsTemplateCatalogContent = function FDsTemplateCatalogContent(o){
      o = RClass.inherits(this, o, FDsCatalog);
      o.onBuild        = FDsTemplateCatalogContent_onBuild;
      o.onNodeClick    = FDsTemplateCatalogContent_onNodeClick;
      o.construct      = FDsTemplateCatalogContent_construct;
      o.buildTechnique = FDsTemplateCatalogContent_buildTechnique;
      o.buildRegion    = FDsTemplateCatalogContent_buildRegion;
      o.buildMaterial  = FDsTemplateCatalogContent_buildMaterial;
      o.buildDisplay   = FDsTemplateCatalogContent_buildDisplay;
      o.buildSpace     = FDsTemplateCatalogContent_buildSpace;
      o.dispose        = FDsTemplateCatalogContent_dispose;
      return o;
   }
   MO.FDsTemplateCatalogContent_onBuild = function FDsTemplateCatalogContent_onBuild(p){
      var o = this;
      o.__base.FDsCatalog.onBuild.call(o, p);
      o.loadUrl('/cloud.describe.tree.ws?action=query&code=resource.template');
   }
   MO.FDsTemplateCatalogContent_onNodeClick = function FDsTemplateCatalogContent_onNodeClick(t, n){
      var o = this;
      var s = n.dataPropertyGet('linker');
      o.selectObject(s);
   }
   MO.FDsTemplateCatalogContent_construct = function FDsTemplateCatalogContent_construct(){
      var o = this;
      o.__base.FDsCatalog.construct.call(o);
   }
   MO.FDsTemplateCatalogContent_buildTechnique = function FDsTemplateCatalogContent_buildTechnique(n, p){
      var o = this;
      var nt = o.createNode();
      nt.setLabel('Technique');
      nt.setTypeCode('technique');
      nt.dataPropertySet('linker', p);
      n.appendNode(nt);
   }
   MO.FDsTemplateCatalogContent_buildRegion = function FDsTemplateCatalogContent_buildRegion(n, p){
      var o = this;
      var nr = o.createNode();
      nr.setLabel('Region');
      nr.setTypeCode('region');
      nr.dataPropertySet('linker', p);
      n.appendNode(nr);
      var nc = o.createNode();
      nc.setLabel('Camera');
      nc.setTypeCode('camera');
      nc.dataPropertySet('linker', p.camera());
      nr.appendNode(nc);
      var nl = o.createNode();
      nl.setLabel('Light');
      nl.setTypeCode('light');
      nl.dataPropertySet('linker', p.directionalLight());
      nr.appendNode(nl);
   }
   MO.FDsTemplateCatalogContent_buildMaterial = function FDsTemplateCatalogContent_buildMaterial(parentNode, material){
      var o = this;
      var resource = material.resource();
      var node = o.createNode();
      node.setTypeCode('Material');
      node.setLabel(resource.code());
      node.setNote(resource.label());
      node.dataPropertySet('linker', material);
      parentNode.appendNode(node);
   }
   MO.FDsTemplateCatalogContent_buildDisplay = function FDsTemplateCatalogContent_buildDisplay(parentNode, display){
      var o = this;
      var resource = display.resource();
      var node = o.createNode();
      node.setTypeCode('Display');
      node.setLabel(RString.nvl(resource.code(), 'Display'));
      node.setNote(resource.label());
      node.dataPropertySet('linker', display);
      parentNode.appendNode(node);
      var renderables = display.renderables();
      var renderableCount = renderables.count();
      if(renderableCount > 0){
         for(var i = 0; i < renderableCount; i++){
            var renderable = renderables.at(i);
            var renderableResource = renderable.resource();
            var renderableNode = o.createNode();
            renderableNode.setTypeCode('Renderable');
            renderableNode.setLabel(renderableResource.code());
            renderableNode.setNote(renderableResource.label());
            renderableNode.dataPropertySet('linker', renderable);
            node.appendNode(renderableNode);
         }
      }
   }
   MO.FDsTemplateCatalogContent_buildSpace = function FDsTemplateCatalogContent_buildSpace(space){
      var o = this;
      o.clearAllNodes();
      var resource = space.resource();
      var spaceNode = o.createNode();
      spaceNode.setTypeCode('Space');
      spaceNode.setLabel(resource.code());
      spaceNode.setNote(resource.label());
      spaceNode.dataPropertySet('linker', space);
      o.appendNode(spaceNode);
      o.buildTechnique(spaceNode, space.technique())
      o.buildRegion(spaceNode, space.region());
      var materialsNode = o.createNode();
      materialsNode.setTypeCode('Region');
      materialsNode.setLabel('Materials');
      spaceNode.appendNode(materialsNode);
      var materials = space.materials();
      var materialCount = materials.count();
      for(var i = 0; i < materialCount; i++){
         var material = materials.at(i);
         o.buildMaterial(materialsNode, material);
      }
      var displaysNode = o.createNode();
      displaysNode.setTypeCode('Region');
      displaysNode.setLabel('Displays');
      spaceNode.appendNode(displaysNode);
      var displays = space._sprites;
      var displayCount = displays.count();
      for(var i = 0; i < displayCount; i++){
         var display = displays.at(i);
         o.buildDisplay(displaysNode, display);
      }
      spaceNode.click();
   }
   MO.FDsTemplateCatalogContent_dispose = function FDsTemplateCatalogContent_dispose(){
      var o = this;
      o.__base.FDsCatalog.dispose.call(o);
   }
}
with(MO){
   MO.FDsTemplateCatalogToolBar = function FDsTemplateCatalogToolBar(o){
      o = RClass.inherits(this, o, FUiToolBar);
      o._frameName             = 'resource.template.CatalogToolBar';
      o._activeNodeGuid        = null;
      o._controlCreateCamera   = null;
      o._controlCreateLayer    = null;
      o._controlCreateSprite   = null;
      o._controlDelete         = null;
      o._controlFolderOpen     = null;
      o._controlFolderClose    = null;
      o.onBuilded              = FDsTemplateCatalogToolBar_onBuilded;
      o.onCreateCameraClick    = FDsTemplateCatalogToolBar_onCreateCameraClick;
      o.onCreateDisplayClick   = FDsTemplateCatalogToolBar_onCreateDisplayClick;
      o.onDeleteLoad           = FDsTemplateCatalogToolBar_onDeleteLoad;
      o.onDeleteExecute        = FDsTemplateCatalogToolBar_onDeleteExecute;
      o.onCopyLoad             = FDsTemplateCatalogToolBar_onCopyLoad;
      o.onCopyExecute          = FDsTemplateCatalogToolBar_onCopyExecute;
      o.onCopyClick            = FDsTemplateCatalogToolBar_onCopyClick;
      o.onDeleteClick          = FDsTemplateCatalogToolBar_onDeleteClick;
      o.onFolderOpenClick      = FDsTemplateCatalogToolBar_onFolderOpenClick;
      o.onFolderCloseClick     = FDsTemplateCatalogToolBar_onFolderCloseClick;
      o.construct              = FDsTemplateCatalogToolBar_construct;
      o.dispose                = FDsTemplateCatalogToolBar_dispose;
      return o;
   }
   MO.FDsTemplateCatalogToolBar_onBuilded = function FDsTemplateCatalogToolBar_onBuilded(p){
      var o = this;
      o.__base.FUiToolBar.onBuilded.call(o, p);
      o._controlCreateCamera.addClickListener(o, o.onCreateCameraClick);
      o._controlCreateDisplay.addClickListener(o, o.onCreateDisplayClick);
      o._controlCopy.addClickListener(o, o.onCopyClick);
      o._controlDelete.addClickListener(o, o.onDeleteClick);
      o._controlFolderOpen.addClickListener(o, o.onFolderOpenClick);
      o._controlFolderClose.addClickListener(o, o.onFolderCloseClick);
   }
   MO.FDsTemplateCatalogToolBar_onCreateCameraClick = function FDsTemplateCatalogToolBar_onCreateCameraClick(event){
      var o = this;
   }
   MO.FDsTemplateCatalogToolBar_onCreateDisplayClick = function FDsTemplateCatalogToolBar_onCreateDisplayClick(event){
      var o = this;
      var frameSet = o._frameSet;
      var space = frameSet._activeSpace;
      var dialog = RConsole.find(FUiWindowConsole).find(FDsCommonSpriteDialog);
      dialog._frameSet = frameSet;
      dialog._spaceGuid = space.resource().guid();
      dialog.setContentCode('');
      dialog.setContentLabel('');
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsTemplateCatalogToolBar_onCopyLoad = function FDsTemplateCatalogToolBar_onCopyLoad(event){
      var o = this;
      RConsole.find(FUiDesktopConsole).hide();
   }
   MO.FDsTemplateCatalogToolBar_onCopyExecute = function FDsTemplateCatalogToolBar_onCopyExecute(event){
      var o = this;
      if(event.resultCd != EResult.Success){
         return;
      }
      var space = o._frameSet._activeSpace;
      var spaceGuid = space.resource().guid();
      RConsole.find(FUiDesktopConsole).showUploading();
      var connection = RConsole.find(FDrSceneConsole).copyNode(spaceGuid, o._activeGuid);
      connection.addLoadListener(o, o.onDeleteLoad);
   }
   MO.FDsTemplateCatalogToolBar_onCopyClick = function FDsTemplateCatalogToolBar_onCopyClick(event){
      var o = this;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return RConsole.find(FUiMessageConsole).showInfo('请选中节点后，再点击操作。');
      }
      o._activeNodeGuid = node.guid();
      var sprite = null;
      var linker = node.dataPropertyGet('linker');
      if(RClass.isClass(linker, FE3dSprite)){
         sprite = linker;
         o._activeGuid = linker.resource().guid();
      }else{
         return alert('不能复制当前选中的节点.');
      }
      var resource = sprite.resource();
      var parentResource = resource.parent();
      var displayResource = resource.clone();
      parentResource.pushDisplay(displayResource);
      var display = RConsole.find(FE3dInstanceConsole).create(EE3dInstance.SceneDisplay);
      display.linkGraphicContext(sprite);
      display.loadResource(displayResource);
      RConsole.find(FE3dSceneConsole).loadDisplay(display);
      var parent = sprite.parent();
      parent.pushDisplay(display);
   }
   MO.FDsTemplateCatalogToolBar_onDeleteLoad = function FDsTemplateCatalogToolBar_onDeleteLoad(event){
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
   MO.FDsTemplateCatalogToolBar_onDeleteExecute = function FDsTemplateCatalogToolBar_onDeleteExecute(event){
      var o = this;
      if(event.resultCd != EResult.Success){
         return;
      }
      var space = o._frameSet._activeSpace;
      var spaceGuid = space.resource().guid();
      RConsole.find(FUiDesktopConsole).showUploading();
      var connection = RConsole.find(FDrSceneConsole).deleteNode(spaceGuid, o._activeGuid);
      connection.addLoadListener(o, o.onDeleteLoad);
   }
   MO.FDsTemplateCatalogToolBar_onDeleteClick = function FDsTemplateCatalogToolBar_onDeleteClick(event){
      var o = this;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return RConsole.find(FUiMessageConsole).showInfo('请选中节点后，再点击操作。');
      }
      o._activeNodeGuid = node.guid();
      var linker = node.dataPropertyGet('linker');
      if(RClass.isClass(linker, FE3dSprite)){
         o._activeGuid = linker.resource().guid();
      }else{
         return alert('不能删除当前选中的节点.');
      }
      var dialog = RConsole.find(FUiMessageConsole).showConfirm('请确认是否删除当前节点？');
      dialog.addResultListener(o, o.onDeleteExecute);
   }
   MO.FDsTemplateCatalogToolBar_onFolderOpenClick = function FDsTemplateCatalogToolBar_onFolderOpenClick(event){
   }
   MO.FDsTemplateCatalogToolBar_onFolderCloseClick = function FDsTemplateCatalogToolBar_onFolderCloseClick(event){
   }
   MO.FDsTemplateCatalogToolBar_construct = function FDsTemplateCatalogToolBar_construct(){
      var o = this;
      o.__base.FUiToolBar.construct.call(o);
   }
   MO.FDsTemplateCatalogToolBar_dispose = function FDsTemplateCatalogToolBar_dispose(){
      var o = this;
      o.__base.FUiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsTemplateFrameSet = function FDsTemplateFrameSet(o){
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
      o.onBuilded             = FDsTemplateFrameSet_onBuilded;
      o.onDataLoaded          = FDsTemplateFrameSet_onDataLoaded;
      o.onCatalogSelected     = FDsTemplateFrameSet_onCatalogSelected;
      o.construct             = FDsTemplateFrameSet_construct;
      o.loadByGuid            = FDsTemplateFrameSet_loadByGuid;
      o.loadByCode            = FDsTemplateFrameSet_loadByCode;
      o.dispose               = FDsTemplateFrameSet_dispose;
      return o;
   }
   MO.FDsTemplateFrameSet_onBuilded = function FDsTemplateFrameSet_onBuilded(event){
      var o = this;
      o.__base.FDsFrameSet.onBuilded.call(o, event);
      o._frameCatalogToolBar._hPanel.className = o.styleName('ToolBar_Ground');
      o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
      o._frameCanvasToolBar._hPanel.className = o.styleName('ToolBar_Ground');
      o._frameCanvasContent._hPanel.className = o.styleName('Canvas_Content');
      o._framePropertyToolBar._hPanel.className = o.styleName('ToolBar_Ground');
      o._framePropertyContent._hPanel.className = o.styleName('Property_Content');
      var spliter = o._spliterCatalog;
      spliter.setAlignCd(EUiAlign.Left);
      spliter.setSizeHtml(o._frameCatalog._hPanel);
      var spliter = o._spliterProperty;
      spliter.setAlignCd(EUiAlign.Right);
      spliter.setSizeHtml(o._frameProperty._hPanel);
   }
   MO.FDsTemplateFrameSet_onDataLoaded = function FDsTemplateFrameSet_onDataLoaded(event){
      var o = this;
      var canvas = event.sender;
      var space = o._activeSpace = canvas.activeSpace();
      o._catalogContent.buildSpace(space);
   }
   MO.FDsTemplateFrameSet_onCatalogSelected = function FDsTemplateFrameSet_onCatalogSelected(select, flag){
      var o = this;
      var space = o._activeSpace;
      if(!space){
         return;
      }
      o.hidePropertyFrames();
      if(RClass.isClass(select, FE3dSpace)){
         var frame = o.findPropertyFrame(EDsFrame.CommonSpacePropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(RClass.isClass(select, FG3dTechnique)){
         var frame = o.findPropertyFrame(EDsFrame.CommonTechniquePropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(RClass.isClass(select, FE3dRegion)){
         var frame = o.findPropertyFrame(EDsFrame.CommonRegionPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(RClass.isClass(select, FE3dCamera)){
         var frame = o.findPropertyFrame(EDsFrame.CommonCameraPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(RClass.isClass(select, FG3dDirectionalLight)){
         var frame = o.findPropertyFrame(EDsFrame.CommonLightPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(RClass.isClass(select, FE3dTemplateDisplay)){
         var frame = o.findPropertyFrame(EDsFrame.CommonDisplayPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(RClass.isClass(select, FG3dMaterial)){
         var frame = o.findPropertyFrame(EDsFrame.CommonMaterialPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(RClass.isClass(select, FE3dRenderable)){
         var frame = o.findPropertyFrame(EDsFrame.CommonRenderablePropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else{
         throw new TError('Unknown select object type. (select={1})', select);
      }
   }
   MO.FDsTemplateFrameSet_construct = function FDsTemplateFrameSet_construct(){
      var o = this;
      o.__base.FDsFrameSet.construct.call(o);
   }
   MO.FDsTemplateFrameSet_loadByGuid = function FDsTemplateFrameSet_loadByGuid(guid){
      var o = this;
      o._activeGuid = guid;
      o._canvasContent.loadByGuid(guid);
   }
   MO.FDsTemplateFrameSet_loadByCode = function FDsTemplateFrameSet_loadByCode(code){
      var o = this;
      o._activeCode = code;
      o._canvasContent.loadByCode(code);
   }
   MO.FDsTemplateFrameSet_dispose = function FDsTemplateFrameSet_dispose(){
      var o = this;
      o.__base.FDsFrameSet.dispose.call(o);
   }
}
with(MO){
   MO.FDsTemplateMenuBar = function FDsTemplateMenuBar(o){
      o = RClass.inherits(this, o, FUiMenuBar);
      o._controlSave           = null;
      o._controlCapture        = null;
      o._controlSelectMaterial = null;
      o._controlCreateDisplay  = null;
      o._controlDelete         = null;
      o.onSaveLoad            = FDsTemplateMenuBar_onSaveLoad;
      o.onSaveClick           = FDsTemplateMenuBar_onSaveClick;
      o.onCaptureLoad         = FDsTemplateMenuBar_onCaptureLoad;
      o.onCaptureClick        = FDsTemplateMenuBar_onCaptureClick;
      o.onSelectMaterialClick = FDsTemplateMenuBar_onSelectMaterialClick;
      o.onCreateDisplayClick  = FDsTemplateMenuBar_onCreateDisplayClick;
      o.onDeleteClick         = FDsTemplateMenuBar_onDeleteClick;
      o.construct             = FDsTemplateMenuBar_construct;
      o.dispose               = FDsTemplateMenuBar_dispose;
      return o;
   }
   MO.FDsTemplateMenuBar_onSaveLoad = function FDsTemplateMenuBar_onSaveLoad(event){
      RConsole.find(FUiDesktopConsole).hide();
   }
   MO.FDsTemplateMenuBar_onSaveClick = function FDsTemplateMenuBar_onSaveClick(p){
      var o = this;
      var space = o._frameSet._activeSpace;
      var resource = space.resource();
      RConsole.find(FUiDesktopConsole).showUploading();
      var xconfig = new TXmlNode();
      resource.saveConfig(xconfig);
      var connection = RConsole.find(FDrTemplateConsole).update(xconfig);
      connection.addLoadListener(o, o.onSaveLoad);
   }
   MO.FDsTemplateMenuBar_onCaptureLoad = function FDsTemplateMenuBar_onCaptureLoad(event){
      RConsole.find(FUiDesktopConsole).hide();
   }
   MO.FDsTemplateMenuBar_onCaptureClick = function FDsTemplateMenuBar_onCaptureClick(event){
      var o = this;
      RConsole.find(FUiDesktopConsole).showUploading();
      var canvas = o._frameSet._canvasContent;
      var connection = canvas.capture();
      connection.addLoadListener(o, o.onCaptureLoad);
   }
   MO.FDsTemplateMenuBar_onSelectMaterialClick = function FDsTemplateMenuBar_onSelectMaterialClick(event){
      var o = this;
      var frameSet = o._frameSet;
      var space = frameSet._activeSpace;
      var dialog = RConsole.find(FUiWindowConsole).find(FDsCommonMaterialDialog);
      dialog._frameSet = frameSet;
      dialog._spaceGuid = space.resource().guid();
      dialog.setSpace(space);
      dialog.setContentCode('');
      dialog.setContentLabel('');
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsTemplateMenuBar_onCreateDisplayClick = function FDsTemplateMenuBar_onCreateDisplayClick(event){
      var o = this;
      var frameSet = o._frameSet;
      var space = frameSet._activeSpace;
      var dialog = RConsole.find(FUiWindowConsole).find(FDsCommonDisplayDialog);
      dialog._frameSet = frameSet;
      dialog._spaceGuid = space.resource().guid();
      dialog.setSpace(space);
      dialog.setContentCode('');
      dialog.setContentLabel('');
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsTemplateMenuBar_onDeleteClick = function FDsTemplateMenuBar_onDeleteClick(event){
      var o = this;
      var frameSet = o._frameSet;
      var space = frameSet._activeSpace;
      var dialog = RConsole.find(FUiWindowConsole).find(FDsCommonDisplayDialog);
      dialog._frameSet = frameSet;
      dialog._spaceGuid = space.resource().guid();
      dialog.setContentCode('');
      dialog.setContentLabel('');
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsTemplateMenuBar_construct = function FDsTemplateMenuBar_construct(){
      var o = this;
      o.__base.FUiMenuBar.construct.call(o);
   }
   MO.FDsTemplateMenuBar_dispose = function FDsTemplateMenuBar_dispose(){
      var o = this;
      o.__base.FUiMenuBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsTemplateToolBar = function FDsTemplateToolBar(o){
      o = RClass.inherits(this, o, FUiToolBar);
      o._refreshButton = null;
      o._saveButton    = null;
      o.onBuild        = FDsTemplateToolBar_onBuild;
      o.onRefreshClick = FDsTemplateToolBar_onRefreshClick;
      o.onSaveClick    = FDsTemplateToolBar_onSaveClick;
      o.construct      = FDsTemplateToolBar_construct;
      o.dispose        = FDsTemplateToolBar_dispose;
      return o;
   }
   MO.FDsTemplateToolBar_onBuild = function FDsTemplateToolBar_onBuild(p){
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
   MO.FDsTemplateToolBar_onRefreshClick = function FDsTemplateToolBar_onRefreshClick(p){
      var o = this;
   }
   MO.FDsTemplateToolBar_onSaveClick = function FDsTemplateToolBar_onSaveClick(p){
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
   MO.FDsTemplateToolBar_construct = function FDsTemplateToolBar_construct(){
      var o = this;
      o.__base.FUiToolBar.construct.call(o);
   }
   MO.FDsTemplateToolBar_dispose = function FDsTemplateToolBar_dispose(){
      var o = this;
      o.__base.FUiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsTemplateWorkspace = function FDsTemplateWorkspace(o){
      o = RClass.inherits(this, o, FUiWorkspace);
      o._styleToolbarGround    = RClass.register(o, new AStyle('_styleToolbarGround', 'Toolbar_Ground'));
      o._styleStatusbarGround  = RClass.register(o, new AStyle('_styleStatusbarGround', 'Statusbar_Ground'));
      o._styleCatalogGround    = RClass.register(o, new AStyle('_styleCatalogGround', 'Catalog_Ground'));
      o._styleWorkspaceGround  = RClass.register(o, new AStyle('_styleWorkspaceGround', 'Workspace_Ground'));
      o._stylePropertyGround   = RClass.register(o, new AStyle('_stylePropertyGround', 'Property_Ground'));
      o._framesetMain          = null;
      o._framesetBody          = null;
      o._frameToolBar          = null;
      o._frameBody             = null;
      o._frameProperty         = null;
      o._frameCatalog          = null;
      o._frameWorkspace        = null;
      o._frameStatusBar        = null;
      o._templatePropertyFrame = null;
      o._themePropertyFrame    = null;
      o._materialPropertyFrame = null;
      o._displayPropertyFrame  = null;
      o.onBuild                = FDsTemplateWorkspace_onBuild;
      o.onTemplateLoad         = FDsTemplateWorkspace_onTemplateLoad;
      o.onCatalogSelected      = FDsTemplateWorkspace_onCatalogSelected;
      o.construct              = FDsTemplateWorkspace_construct;
      o.templatePropertyFrame  = FDsTemplateWorkspace_templatePropertyFrame;
      o.themePropertyFrame     = FDsTemplateWorkspace_themePropertyFrame;
      o.materialPropertyFrame  = FDsTemplateWorkspace_materialPropertyFrame;
      o.displayPropertyFrame   = FDsTemplateWorkspace_displayPropertyFrame;
      o.loadTemplate           = FDsTemplateWorkspace_loadTemplate;
      o.dispose                = FDsTemplateWorkspace_dispose;
      return o;
   }
   MO.FDsTemplateWorkspace_onBuild = function FDsTemplateWorkspace_onBuild(p){
      var o = this;
      o.__base.FUiWorkspace.onBuild.call(o, p);
      o._hPanel.style.width = '100%';
      o._hPanel.style.height = '100%';
      var fs = o._framesetMain = RClass.create(FUiFrameSet);
      fs.build(p);
      var f = o._frameToolBar = RClass.create(FUiFramePage);
      f.setHeight(26);
      f.build(p);
      f._hPanel.className = o.styleName('Toolbar_Ground');
      fs.appendFrame(f);
      var f = o._frameBody = RClass.create(FUiFramePage);
      f.build(p);
      fs.appendFrame(f);
      var f = o._frameStatusBar = RClass.create(FUiFramePage);
      f.setHeight(18);
      f.build(p);
      f._hPanel.className = o.styleName('Statusbar_Ground');
      fs.appendFrame(f);
      fs.setPanel(o._hPanel);
      var fs = RClass.create(FUiFrameSet);
      fs._directionCd = EUiDirection.Horizontal;
      fs.build(p);
      var f = o._frameCatalog = RClass.create(FUiFramePage);
      f.setWidth(400);
      f.build(p);
      f._hPanel.className = o.styleName('Catalog_Ground');
      fs.appendFrame(f);
      var sp1 = fs.appendSpliter();
      var f = o._frameWorkspace = RClass.create(FUiFramePage);
      f.build(p);
      f._hPanel.className = o.styleName('Workspace_Ground');
      fs.appendFrame(f);
      var sp2 = fs.appendSpliter();
      var f = o._frameProperty = RClass.create(FUiFramePage);
      f.setWidth(240);
      f.build(p);
      f._hPanel.className = o.styleName('Property_Ground');
      fs.appendFrame(f);
      fs.setPanel(o._frameBody._hPanel);
      sp1._alignCd = EUiAlign.Left;
      sp1._hSize = o._frameCatalog._hPanel;
      sp2._alignCd = EUiAlign.Right;
      sp2._hSize = o._frameStatusBar._hPanel;
      var c = o._catalog = RClass.create(FDsTemplateCatalog);
      c._workspace = o;
      c.build(p);
      c.setPanel(o._frameCatalog._hPanel);
      c.addSelectedListener(o, o.onCatalogSelected);
      o.push(c);
      var c = o._toolbar = RClass.create(FDsTemplateToolBar);
      c._workspace = o;
      c.build(p);
      c.setPanel(o._frameToolBar._hPanel);
      o.push(c);
      var hf = RBuilder.appendTable(o._frameWorkspace._hPanel);
      hf.style.width = '100%';
      hf.style.height = '100%';
      var hc = RBuilder.appendTableRowCell(hf);
      hc.height = 20;
      var c = o._canvasToolbar = RClass.create(FDsTemplateCanvasToolBar);
      c._workspace = o;
      c.build(p);
      c.setPanel(hc);
      o.push(c);
      var hc = RBuilder.appendTableRowCell(hf);
      hc.vAlign = 'top';
      var c = o._canvas = RClass.create(FDsTemplateCanvas);
      c.addLoadListener(o, o.onTemplateLoad);
      c._workspace = o;
      c._toolbar = o._canvasToolbar;
      c.build(p);
      c.setPanel(hc);
      o.push(c);
   }
   MO.FDsTemplateWorkspace_onTemplateLoad = function FDsTemplateWorkspace_onTemplateLoad(p){
      var o = this;
      var t = o._activeTemplate = p._activeTemplate;
      o._catalog.buildTemplate(t);
      o.onCatalogSelected(t);
   }
   MO.FDsTemplateWorkspace_onCatalogSelected = function FDsTemplateWorkspace_onCatalogSelected(p){
      var o = this;
      var t = o._activeTemplate;
      if(o._templatePropertyFrame){
         o._templatePropertyFrame.hide();
      }
      if(o._themePropertyFrame){
         o._themePropertyFrame.hide();
      }
      if(o._materialPropertyFrame){
         o._materialPropertyFrame.hide();
      }
      if(o._displayPropertyFrame){
         o._displayPropertyFrame.hide();
      }
      if(RClass.isClass(p, FE3dTemplate)){
         var f = o.templatePropertyFrame();
         f.show();
         f.loadObject(t);
      }else if(RClass.isClass(p, FE3sTemplateTheme)){
         var f = o.themePropertyFrame();
         f.show();
         f.loadObject(t, p);
      }else if(RClass.isClass(p, FE3sMaterial)){
         var f = o.materialPropertyFrame();
         f.show();
         f.loadObject(t, p);
      }else if(RClass.isClass(p, MG3dRenderable)){
         var f = o.displayPropertyFrame();
         f.show();
         f.loadObject(t, p);
         o._canvas.selectRenderable(p);
      }else{
         throw new TError('Unknown select object type. (value={1})', p);
      }
   }
   MO.FDsTemplateWorkspace_construct = function FDsTemplateWorkspace_construct(){
      var o = this;
      o.__base.FUiWorkspace.construct.call(o);
   }
   MO.FDsTemplateWorkspace_templatePropertyFrame = function FDsTemplateWorkspace_templatePropertyFrame(){
      var o = this;
      var f = o._templatePropertyFrame;
      if(!f){
         f = o._templatePropertyFrame = RClass.create(FDsTemplatePropertyFrame);
         f._workspace = o;
         f.buildDefine(o._hPanel);
         f.setPanel(o._frameProperty._hPanel);
      }
      return f;
   }
   MO.FDsTemplateWorkspace_themePropertyFrame = function FDsTemplateWorkspace_themePropertyFrame(){
      var o = this;
      var f = o._themePropertyFrame;
      if(!f){
         var f = o._themePropertyFrame = RClass.create(FDsTemplateThemePropertyFrame);
         f._workspace = o;
         f.buildDefine(o._hPanel);
         f.setPanel(o._frameProperty._hPanel);
      }
      return f;
   }
   MO.FDsTemplateWorkspace_materialPropertyFrame = function FDsTemplateWorkspace_materialPropertyFrame(){
      var o = this;
      var f = o._materialPropertyFrame;
      if(!f){
         f = o._materialPropertyFrame = RClass.create(FDsTemplateMaterialPropertyFrame);
         f._workspace = o;
         f.buildDefine(o._hPanel);
         f.setPanel(o._frameProperty._hPanel);
      }
      return f;
   }
   MO.FDsTemplateWorkspace_displayPropertyFrame = function FDsTemplateWorkspace_displayPropertyFrame(){
      var o = this;
      var f = o._displayPropertyFrame;
      if(!f){
         f = o._displayPropertyFrame = RClass.create(FDsTemplateDisplayPropertyFrame);
         f._workspace = o;
         f.buildDefine(o._hPanel);
         f.setPanel(o._frameProperty._hPanel);
      }
      return f;
   }
   MO.FDsTemplateWorkspace_loadTemplate = function FDsTemplateWorkspace_loadTemplate(p){
      var o = this;
      o._canvas.loadTemplate(p);
   }
   MO.FDsTemplateWorkspace_dispose = function FDsTemplateWorkspace_dispose(){
      var o = this;
      o.__base.FUiWorkspace.dispose.call(o);
   }
}
with(MO){
   MO.FDsSceneCanvasContent = function FDsSceneCanvasContent(o){
      o = RClass.inherits(this, o, FDsSpaceDesignCanvas);
      o._resourceTypeCd = EE3sResource.Scene;
      o.loadByGuid      = FDsSceneCanvasContent_loadByGuid;
      o.dispose         = FDsSceneCanvasContent_dispose;
      return o;
   }
   MO.FDsSceneCanvasContent_onDataLoaded = function FDsSceneCanvasContent_onDataLoaded(p){
      var o = this;
      o.reloadRegion()
      o.processLoadListener(o);
      RConsole.find(FUiDesktopConsole).hide();
   }
   MO.FDsSceneCanvasContent_loadByGuid = function FDsSceneCanvasContent_loadByGuid(guid){
      var o = this;
      var space = o._activeSpace;
      var sceneConsole = RConsole.find(FE3dSceneConsole);
      if(space){
         RStage.unregister(space);
         sceneConsole.free(space);
      }
      space = o._activeSpace = sceneConsole.allocByGuid(o, guid);
      if(!space._linked){
         RConsole.find(FUiDesktopConsole).showLoading();
         space.addLoadListener(o, o.onDataLoaded);
         space._linked = true;
      }
      RStage.register('space', space);
   }
   MO.FDsSceneCanvasContent_dispose = function FDsSceneCanvasContent_dispose(){
      var o = this;
      o.__base.FDsSpaceDesignCanvas.dispose.call(o);
   }
}
with(MO){
   MO.FDsSceneCanvasToolBar = function FDsSceneCanvasToolBar(o){
      o = RClass.inherits(this, o, FUiToolBar);
      o._frameName         = 'resource.scene.CanvasToolBar';
      o._canvasModeCd      = EDsCanvasMode.Drop;
      o._controlModeDrop   = null;
      o._controlModeSelect = null;
      o._controlTranslate  = null;
      o._controlRotation   = null;
      o._controlScale      = null;
      o._controlLookFront  = null;
      o._controlLookUp     = null;
      o._controlLookLeft   = null;
      o._controlPlay       = null;
      o._controlView       = null;
      o.onBuilded         = FDsSceneCanvasToolBar_onBuilded;
      o.onModeClick       = FDsSceneCanvasToolBar_onModeClick;
      o.onLookClick       = FDsSceneCanvasToolBar_onLookClick;
      o.onPlayClick       = FDsSceneCanvasToolBar_onPlayClick;
      o.onRotationClick   = FDsSceneCanvasToolBar_onRotationClick;
      o.construct         = FDsSceneCanvasToolBar_construct;
      o.dispose           = FDsSceneCanvasToolBar_dispose;
      return o;
   }
   MO.FDsSceneCanvasToolBar_onBuilded = function FDsSceneCanvasToolBar_onBuilded(p){
      var o = this;
      o.__base.FUiToolBar.onBuilded.call(o, p);
      var button = o._controlModeDrop;
      button._canvasModeCd = EDsCanvasMode.Drop;
      button.addClickListener(o, o.onModeClick);
      button.check(true);
      var button = o._controlModeSelect;
      button._canvasModeCd = EDsCanvasMode.Select;
      button.addClickListener(o, o.onModeClick);
      var button = o._controlTranslate;
      button._canvasModeCd = EDsCanvasMode.Translate;
      button.addClickListener(o, o.onModeClick);
      var button = o._controlRotation;
      button._canvasModeCd = EDsCanvasMode.Rotation;
      button.addClickListener(o, o.onModeClick);
      var button = o._controlScale;
      button._canvasModeCd = EDsCanvasMode.Scale;
      button.addClickListener(o, o.onModeClick);
      o._controlLookFront.addClickListener(o, o.onLookClick);
      o._controlLookUp.addClickListener(o, o.onLookClick);
      o._controlLookLeft.addClickListener(o, o.onLookClick);
      o._controlPlay.addClickListener(o, o.onPlayClick);
      o._controlView.addClickListener(o, o.onRotationClick);
   }
   MO.FDsSceneCanvasToolBar_onModeClick = function FDsSceneCanvasToolBar_onModeClick(event){
      var o = this;
      var sender = event.sender;
      var modeCd = sender._canvasModeCd;
      o._canvasModeCd = modeCd;
      o._frameSet._canvasContent.switchMode(modeCd);
   }
   MO.FDsSceneCanvasToolBar_onLookClick = function FDsSceneCanvasToolBar_onLookClick(event){
      var o = this;
      o._canvasModeCd = p._canvasModeCd;
   }
   MO.FDsSceneCanvasToolBar_onPlayClick = function FDsSceneCanvasToolBar_onPlayClick(event){
      var o = this;
      o._frameSet._canvasContent.switchPlay(event.checked);
   }
   MO.FDsSceneCanvasToolBar_onRotationClick = function FDsSceneCanvasToolBar_onRotationClick(event){
      var o = this;
      o._frameSet._canvasContent.switchMovie(event.checked);
   }
   MO.FDsSceneCanvasToolBar_construct = function FDsSceneCanvasToolBar_construct(){
      var o = this;
      o.__base.FUiToolBar.construct.call(o);
   }
   MO.FDsSceneCanvasToolBar_dispose = function FDsSceneCanvasToolBar_dispose(){
      var o = this;
      o.__base.FUiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsSceneCatalogContent = function FDsSceneCatalogContent(o){
      o = RClass.inherits(this, o, FDsCatalog);
      o._catalogCode    = 'resource.scene';
      o.onBuild         = FDsSceneCatalogContent_onBuild;
      o.onLoadDisplay   = FDsSceneCatalogContent_onLoadDisplay;
      o.construct       = FDsSceneCatalogContent_construct;
      o.buildRenderable = FDsSceneCatalogContent_buildRenderable;
      o.buildDisplay    = FDsSceneCatalogContent_buildDisplay;
      o.buildLayer      = FDsSceneCatalogContent_buildLayer;
      o.buildSpace      = FDsSceneCatalogContent_buildSpace;
      o.dispose         = FDsSceneCatalogContent_dispose;
      return o;
   }
   MO.FDsSceneCatalogContent_onBuild = function FDsSceneCatalogContent_onBuild(event){
      var o = this;
      var column = RClass.create(FUiTreeColumn);
      column.setName('view');
      o.push(column);
      o.__base.FDsCatalog.onBuild.call(o, event);
      o.loadUrl('/cloud.describe.tree.ws?action=query&code=' + o._catalogCode);
   }
   MO.FDsSceneCatalogContent_onLoadDisplay = function FDsSceneCatalogContent_onLoadDisplay(event){
      var o = this;
      var node = event._linkNode;
      o.buildRenderable(node, event);
   }
   MO.FDsSceneCatalogContent_construct = function FDsSceneCatalogContent_construct(){
      var o = this;
      o.__base.FDsCatalog.construct.call(o);
   }
   MO.FDsSceneCatalogContent_buildRenderable = function FDsSceneCatalogContent_buildRenderable(parentNode, sprite){
      var o = this;
      var movies = sprite.movies();
      if(movies){
         var movieCount = movies.count();
         for(var i = 0; i < movieCount; i++){
            var movie = movies.at(i);
            var movieResource = movie.resource();
            var movieNode = o.createNode();
            movieNode.setTypeCode('Movie');
            movieNode.setLabel(movieResource.code());
            movieNode.setNote(movieResource.label());
            movieNode.dataPropertySet('linker', movie);
            parentNode.appendNode(movieNode);
         }
      }
      var materials = sprite.materials();
      if(materials){
         var materialCount = materials.count();
         for(var i = 0; i < materialCount; i++){
            var material = materials.at(i);
            var materialResource = material.resource();
            var materialNode = o.createNode();
            materialNode.setTypeCode('Material');
            materialNode.setLabel(materialResource.code());
            materialNode.setNote(materialResource.label());
            materialNode.dataPropertySet('linker', material);
            o.buildNodeView(materialNode, true);
            parentNode.appendNode(materialNode);
            o._materialNodes.push(materialNode);
         }
      }
      var animations = sprite.animations();
      if(animations){
         var animationCount = animations.count();
         for(var i = 0; i < animationCount; i++){
            var animation = animations.at(i);
            var animationResource = animation.resource();
            var animationNode = o.createNode();
            animationNode.setTypeCode('Animation');
            animationNode.setLabel(animationResource.code());
            animationNode.setNote(animationResource.label());
            animationNode.dataPropertySet('linker', animation);
            parentNode.appendNode(animationNode);
            o.buildNodeView(animationNode, true);
         }
      }
      var renderables = sprite.meshRenderables();
      if(renderables){
         var renderableCount = renderables.count();
         for(var i = 0; i < renderableCount; i++){
            var renderable = renderables.at(i);
            var renderableResource = renderable.resource();
            var modelResource = renderableResource.model();
            var meshResource = renderableResource.mesh();
            var renderableNode = o.createNode();
            renderableNode.setTypeCode('Renderable');
            renderableNode.setLabel(meshResource.code());
            renderableNode.dataPropertySet('linker', renderable);
            o.buildNodeView(renderableNode, true);
            parentNode.appendNode(renderableNode);
            o._renderableNodes.push(renderableNode);
         }
      }
   }
   MO.FDsSceneCatalogContent_buildDisplay = function FDsSceneCatalogContent_buildDisplay(parentNode, p){
      var o = this;
      var displays = p.displays();
      if(displays){
         var displayCount = displays.count();
         for(var i = 0; i < displayCount; i++){
            var display = displays.at(i);
            var resource = display.resource();
            var displayNode = o.createNode();
            displayNode.setTypeCode('display');
            displayNode.setLabel(resource.code());
            displayNode.setNote(resource.label());
            displayNode.dataPropertySet('linker', display);
            o.buildNodeView(displayNode, true);
            o._displayNodes.push(displayNode);
            parentNode.appendNode(displayNode);
            display.addLoadListener(o, o.onLoadDisplay);
            display._linkNode = displayNode;
         }
      }
   }
   MO.FDsSceneCatalogContent_buildLayer = function FDsSceneCatalogContent_buildLayer(parentNode, space){
      var o = this;
      var layersNode = o.createNode();
      layersNode.setTypeCode('Layers');
      layersNode.setLabel('Layers');
      layersNode.dataPropertySet('linker', 'layers');
      o.buildNodeView(layersNode, true);
      parentNode.appendNode(layersNode);
      var layers = space.layers();
      var layerCount = layers.count();
      for(var i = 0; i < layerCount; i++){
         var layer = layers.at(i);
         if(RClass.isClass(layer, FDisplayUiLayer)){
            continue;
         }
         var layerResource = layer.resource();
         var layerNode = o.createNode();
         layerNode.setTypeCode('Layer');
         layerNode.setLabel('Layer:' + layerResource.code());
         layerNode.dataPropertySet('linker', layer);
         o.buildNodeView(layerNode, true);
         layersNode.appendNode(layerNode);
         o.buildDisplay(layerNode, layer)
      }
   }
   MO.FDsSceneCatalogContent_buildSpace = function FDsSceneCatalogContent_buildSpace(space){
      var o = this;
      o.clearAllNodes();
      var resource = space.resource();
      var spaceNode = o.createNode();
      spaceNode.setTypeCode('Scene');
      spaceNode.setLabel(resource.code());
      spaceNode.setNote(resource.label());
      spaceNode.dataPropertySet('linker', space);
      o.push(spaceNode);
      o.buildTechnique(spaceNode, space.technique())
      o.buildRegion(spaceNode, space.region());
      o.buildLayer(spaceNode, space);
      spaceNode.click();
   }
   MO.FDsSceneCatalogContent_dispose = function FDsSceneCatalogContent_dispose(){
      var o = this;
      o.__base.FDsCatalog.dispose.call(o);
   }
}
with(MO){
   MO.FDsSceneCatalogToolBar = function FDsSceneCatalogToolBar(o){
      o = RClass.inherits(this, o, FUiToolBar);
      o._activeNodeGuid        = null;
      o._controlCreateCamera   = null;
      o._controlCreateLayer    = null;
      o._controlCreateSprite   = null;
      o._controlCreateMovie    = null;
      o._controlDelete         = null;
      o._controlFolderOpen     = null;
      o._controlFolderClose    = null;
      o.onBuilded              = FDsSceneCatalogToolBar_onBuilded;
      o.onCreateCameraClick    = FDsSceneCatalogToolBar_onCreateCameraClick;
      o.onCreateLayerClick     = FDsSceneCatalogToolBar_onCreateLayerClick;
      o.onCreateSpriteClick    = FDsSceneCatalogToolBar_onCreateSpriteClick;
      o.onCreateMovieClick     = FDsSceneCatalogToolBar_onCreateMovieClick;
      o.onDeleteLoad           = FDsSceneCatalogToolBar_onDeleteLoad;
      o.onDeleteExecute        = FDsSceneCatalogToolBar_onDeleteExecute;
      o.onCopyLoad             = FDsSceneCatalogToolBar_onCopyLoad;
      o.onCopyExecute          = FDsSceneCatalogToolBar_onCopyExecute;
      o.onCopyClick            = FDsSceneCatalogToolBar_onCopyClick;
      o.onDeleteClick          = FDsSceneCatalogToolBar_onDeleteClick;
      o.onFolderOpenClick      = FDsSceneCatalogToolBar_onFolderOpenClick;
      o.onFolderCloseClick     = FDsSceneCatalogToolBar_onFolderCloseClick;
      o.construct              = FDsSceneCatalogToolBar_construct;
      o.dispose                = FDsSceneCatalogToolBar_dispose;
      return o;
   }
   MO.FDsSceneCatalogToolBar_onBuilded = function FDsSceneCatalogToolBar_onBuilded(p){
      var o = this;
      o.__base.FUiToolBar.onBuilded.call(o, p);
      o._controlCreateCamera.addClickListener(o, o.onCreateCameraClick);
      o._controlCreateLayer.addClickListener(o, o.onCreateLayerClick);
      o._controlCreateSprite.addClickListener(o, o.onCreateSpriteClick);
      o._controlCreateMovie.addClickListener(o, o.onCreateMovieClick);
      o._controlCopy.addClickListener(o, o.onCopyClick);
      o._controlDelete.addClickListener(o, o.onDeleteClick);
      o._controlFolderOpen.addClickListener(o, o.onFolderOpenClick);
      o._controlFolderClose.addClickListener(o, o.onFolderCloseClick);
   }
   MO.FDsSceneCatalogToolBar_onCreateCameraClick = function FDsSceneCatalogToolBar_onCreateCameraClick(event){
      var o = this;
   }
   MO.FDsSceneCatalogToolBar_onCreateLayerClick = function FDsSceneCatalogToolBar_onCreateLayerClick(event){
      var o = this;
   }
   MO.FDsSceneCatalogToolBar_onCreateSpriteClick = function FDsSceneCatalogToolBar_onCreateSpriteClick(event){
      var o = this;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return alert('请选中目录节点。');
      }
      var linker = node.dataPropertyGet('linker');
      var layer = null;
      var sprite = null;
      if(RClass.isClass(linker, FDisplayLayer)){
         layer = linker;
      }else if(RClass.isClass(linker, FE3dSprite)){
         layer = linker.findParent(FDisplayLayer);
         sprite = linker;
      }else{
         return alert('请选中显示层或者精灵节点。');
      }
      var frameSet = o._frameSet;
      var dialog = RConsole.find(FUiWindowConsole).find(FDsCommonSpriteDialog);
      dialog._frameSet = frameSet;
      dialog._spaceGuid = frameSet._activeSpace.resource().guid();
      dialog._layerGuid = layer.resource().guid();
      if(sprite){
         dialog._displayGuid = sprite.resource().guid();
      }else{
         dialog._displayGuid = null;
      }
      if(layer){
         dialog.setLayerLabel(layer.makeLabel());
      }
      if(sprite){
         dialog.setDisplayLabel(sprite.makeLabel());
      }
      dialog.setContentCode('');
      dialog.setContentLabel('');
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsSceneCatalogToolBar_onCreateMovieClick = function FDsSceneCatalogToolBar_onCreateMovieClick(event){
      var o = this;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return alert('请选中目录节点。');
      }
      var linker = node.dataPropertyGet('linker');
      var layer = null;
      var sprite = null;
      if(RClass.isClass(linker, FE3dSprite)){
         layer = linker.findParent(FDisplayLayer);
         sprite = linker;
      }else{
         return alert('请选中精灵节点。');
      }
      var frameSet = o._frameSet;
      var dialog = RConsole.find(FUiWindowConsole).find(FDsCommonMovieDialog);
      dialog._frameSet = frameSet;
      dialog._spaceGuid = frameSet._activeSpace.resource().guid();
      dialog._layerGuid = layer.resource().guid();
      dialog._displayGuid = sprite.resource().guid();
      if(layer){
         dialog.setLayerLabel(layer.makeLabel());
      }
      if(sprite){
         dialog.setDisplayLabel(sprite.makeLabel());
      }
      dialog.setContentCode('');
      dialog.setContentLabel('');
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsSceneCatalogToolBar_onCopyLoad = function FDsSceneCatalogToolBar_onCopyLoad(event){
      var o = this;
      RConsole.find(FUiDesktopConsole).hide();
   }
   MO.FDsSceneCatalogToolBar_onCopyExecute = function FDsSceneCatalogToolBar_onCopyExecute(event){
      var o = this;
      if(event.resultCd != EResult.Success){
         return;
      }
      var space = o._frameSet._activeSpace;
      var spaceGuid = space.resource().guid();
      RConsole.find(FUiDesktopConsole).showUploading();
      var connection = RConsole.find(FDrSceneConsole).copyNode(spaceGuid, o._activeGuid);
      connection.addLoadListener(o, o.onDeleteLoad);
   }
   MO.FDsSceneCatalogToolBar_onCopyClick = function FDsSceneCatalogToolBar_onCopyClick(event){
      var o = this;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return RConsole.find(FUiMessageConsole).showInfo('请选中节点后，再点击操作。');
      }
      o._activeNodeGuid = node.guid();
      var sprite = null;
      var linker = node.dataPropertyGet('linker');
      if(RClass.isClass(linker, FE3dSprite)){
         sprite = linker;
         o._activeGuid = linker.resource().guid();
      }else{
         return alert('不能复制当前选中的节点.');
      }
      var resource = sprite.resource();
      var parentResource = resource.parent();
      var displayResource = resource.clone();
      parentResource.pushDisplay(displayResource);
      var display = RConsole.find(FE3dInstanceConsole).create(EE3dInstance.SceneDisplay);
      display.linkGraphicContext(sprite);
      display.loadResource(displayResource);
      RConsole.find(FE3dSceneConsole).loadDisplay(display);
      var parent = sprite.parent();
      parent.pushDisplay(display);
   }
   MO.FDsSceneCatalogToolBar_onDeleteLoad = function FDsSceneCatalogToolBar_onDeleteLoad(event){
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
   MO.FDsSceneCatalogToolBar_onDeleteExecute = function FDsSceneCatalogToolBar_onDeleteExecute(event){
      var o = this;
      if(event.resultCd != EResult.Success){
         return;
      }
      var space = o._frameSet._activeSpace;
      var spaceGuid = space.resource().guid();
      RConsole.find(FUiDesktopConsole).showUploading();
      var connection = RConsole.find(FDrSceneConsole).deleteNode(spaceGuid, o._activeGuid);
      connection.addLoadListener(o, o.onDeleteLoad);
   }
   MO.FDsSceneCatalogToolBar_onDeleteClick = function FDsSceneCatalogToolBar_onDeleteClick(event){
      var o = this;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return RConsole.find(FUiMessageConsole).showInfo('请选中节点后，再点击操作。');
      }
      o._activeNodeGuid = node.guid();
      var linker = node.dataPropertyGet('linker');
      if(RClass.isClass(linker, FE3dSprite)){
         o._activeGuid = linker.resource().guid();
      }else{
         return alert('不能删除当前选中的节点.');
      }
      var dialog = RConsole.find(FUiMessageConsole).showConfirm('请确认是否删除当前节点？');
      dialog.addResultListener(o, o.onDeleteExecute);
   }
   MO.FDsSceneCatalogToolBar_onFolderOpenClick = function FDsSceneCatalogToolBar_onFolderOpenClick(event){
   }
   MO.FDsSceneCatalogToolBar_onFolderCloseClick = function FDsSceneCatalogToolBar_onFolderCloseClick(event){
   }
   MO.FDsSceneCatalogToolBar_construct = function FDsSceneCatalogToolBar_construct(){
      var o = this;
      o.__base.FUiToolBar.construct.call(o);
   }
   MO.FDsSceneCatalogToolBar_dispose = function FDsSceneCatalogToolBar_dispose(){
      var o = this;
      o.__base.FUiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsSceneFrameSet = function FDsSceneFrameSet(o){
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
      o.onBuilded             = FDsSceneFrameSet_onBuilded;
      o.onDataLoaded          = FDsSceneFrameSet_onDataLoaded;
      o.onCatalogSelected     = FDsSceneFrameSet_onCatalogSelected;
      o.construct             = FDsSceneFrameSet_construct;
      o.loadByGuid            = FDsSceneFrameSet_loadByGuid;
      o.loadByCode            = FDsSceneFrameSet_loadByCode;
      o.dispose               = FDsSceneFrameSet_dispose;
      return o;
   }
   MO.FDsSceneFrameSet_onBuilded = function FDsSceneFrameSet_onBuilded(event){
      var o = this;
      o.__base.FDsFrameSet.onBuilded.call(o, event);
      o._frameCatalogToolBar._hPanel.className = o.styleName('ToolBar_Ground');
      o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
      o._frameCanvasToolBar._hPanel.className = o.styleName('ToolBar_Ground');
      o._frameCanvasContent._hPanel.className = o.styleName('Canvas_Content');
      o._framePropertyToolBar._hPanel.className = o.styleName('ToolBar_Ground');
      o._framePropertyContent._hPanel.className = o.styleName('Property_Content');
      var spliter = o._spliterCatalog;
      spliter.setAlignCd(EUiAlign.Left);
      spliter.setSizeHtml(o._frameCatalog._hPanel);
      var spliter = o._spliterProperty;
      spliter.setAlignCd(EUiAlign.Right);
      spliter.setSizeHtml(o._frameProperty._hPanel);
      var sceneConsole = RConsole.find(FE3dInstanceConsole);
      sceneConsole.register(EE3dInstance.TemplateRenderable, FDsSceneRenderable);
      sceneConsole.register(EE3dInstance.SceneLayer, FDsSceneLayer);
      sceneConsole.register(EE3dInstance.SceneDisplay, FDsSceneDisplay);
      sceneConsole.register(EE3dInstance.SceneRenderable, FDsSceneRenderable);
   }
   MO.FDsSceneFrameSet_onDataLoaded = function FDsSceneFrameSet_onDataLoaded(canvas){
      var o = this;
      var space = o._activeSpace = canvas._activeSpace;
      o._catalogContent.buildSpace(space);
   }
   MO.FDsSceneFrameSet_onCatalogSelected = function FDsSceneFrameSet_onCatalogSelected(select, flag){
      var o = this;
      var space = o._activeSpace;
      if(!space){
         return;
      }
      var canvas = o._canvasContent;
      o.hidePropertyFrames();
      if(RClass.isClass(select, FE3dScene)){
         var frame = o.findPropertyFrame(EDsFrame.CommonSpacePropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(RClass.isClass(select, FG3dTechnique)){
         var frame = o.findPropertyFrame(EDsFrame.CommonTechniquePropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(RClass.isClass(select, FE3dRegion)){
         var frame = o.findPropertyFrame(EDsFrame.CommonRegionPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(RClass.isClass(select, FE3dCamera)){
         var frame = o.findPropertyFrame(EDsFrame.CommonCameraPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(RClass.isClass(select, FG3dDirectionalLight)){
         var frame = o.findPropertyFrame(EDsFrame.CommonLightPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(select == 'layers'){
         if(flag){
            canvas.selectLayers(select);
         }
      }else if(RClass.isClass(select, FE3dSceneLayer)){
         if(flag){
            canvas.selectLayer(select);
         }
         var frame = o.findPropertyFrame(EDsFrame.CommonLayerPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(RClass.isClass(select, FE3dSceneDisplay)){
         if(flag){
            canvas.selectDisplay(select);
         }
         var frame = o.findPropertyFrame(EDsFrame.CommonDisplayPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(RClass.isClass(select, FE3dSceneMaterial)){
         if(flag){
            canvas.selectMaterial(select);
         }
         var frame = o.findPropertyFrame(EDsFrame.CommonMaterialPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(RClass.isClass(select, FE3dAnimation)){
         var frame = o.findPropertyFrame(EDsFrame.CommonAnimationPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(RClass.isClass(select, FE3dMovie)){
         var frame = o.findPropertyFrame(EDsFrame.CommonMoviePropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(RClass.isClass(select, FE3dRenderable)){
         if(flag){
            canvas.selectRenderable(select);
         }
         var frame = o.findPropertyFrame(EDsFrame.CommonRenderablePropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else{
         throw new TError('Unknown select type. (select={1})', select);
      }
   }
   MO.FDsSceneFrameSet_construct = function FDsSceneFrameSet_construct(){
      var o = this;
      o.__base.FDsFrameSet.construct.call(o);
   }
   MO.FDsSceneFrameSet_loadByGuid = function FDsSceneFrameSet_loadByGuid(guid){
      var o = this;
      o._activeGuid = guid;
      o._canvasContent.loadByGuid(guid);
   }
   MO.FDsSceneFrameSet_loadByCode = function FDsSceneFrameSet_loadByCode(code){
      var o = this;
      o._avtiveCode = code;
      o._canvasContent.loadByCode(code);
   }
   MO.FDsSceneFrameSet_dispose = function FDsSceneFrameSet_dispose(){
      var o = this;
      o.__base.FDsFrameSet.dispose.call(o);
   }
}
with(MO){
   MO.FDsSceneMenuBar = function FDsSceneMenuBar(o){
      o = RClass.inherits(this, o, FUiMenuBar);
      o._refreshButton        = null;
      o._saveButton           = null;
      o._runButton            = null;
      o.onBuilded             = FDsSceneMenuBar_onBuilded;
      o.onSaveLoad            = FDsSceneMenuBar_onSaveLoad;
      o.onSaveClick           = FDsSceneMenuBar_onSaveClick;
      o.onCaptureLoad         = FDsSceneMenuBar_onCaptureLoad;
      o.onCaptureClick        = FDsSceneMenuBar_onCaptureClick;
      o.onCreateLayerClick    = FDsSceneMenuBar_onCreateLayerClick;
      o.onImportTemplateClick = FDsSceneMenuBar_onImportTemplateClick;
      o.onExecuteClick        = FDsSceneMenuBar_onExecuteClick;
      o.construct             = FDsSceneMenuBar_construct;
      o.dispose               = FDsSceneMenuBar_dispose;
      return o;
   }
   MO.FDsSceneMenuBar_onBuilded = function FDsSceneMenuBar_onBuilded(p){
      var o = this;
      o.__base.FUiMenuBar.onBuilded.call(o, p);
   }
   MO.FDsSceneMenuBar_onSaveLoad = function FDsSceneMenuBar_onSaveLoad(event){
      RConsole.find(FUiDesktopConsole).hide();
   }
   MO.FDsSceneMenuBar_onSaveClick = function FDsSceneMenuBar_onSaveClick(p){
      var o = this;
      var space = o._frameSet._activeSpace;
      space.commitResource();
      var resource = space.resource();
      RConsole.find(FUiDesktopConsole).showUploading();
      var xconfig = new TXmlNode();
      resource.saveConfig(xconfig);
      var connection = RConsole.find(FDrSceneConsole).update(xconfig);
      connection.addLoadListener(o, o.onSaveLoad);
   }
   MO.FDsSceneMenuBar_onCaptureLoad = function FDsSceneMenuBar_onCaptureLoad(event){
      RConsole.find(FUiDesktopConsole).hide();
   }
   MO.FDsSceneMenuBar_onCaptureClick = function FDsSceneMenuBar_onCaptureClick(event){
      var o = this;
      RConsole.find(FUiDesktopConsole).showUploading();
      var canvasContent = o._frameSet._canvasContent;
      var connection = canvasContent.capture();
      connection.addLoadListener(o, o.onCaptureLoad);
   }
   MO.FDsSceneMenuBar_onCreateLayerClick = function FDsSceneMenuBar_onCreateLayerClick(event){
      var o = this;
      var frameSet = o._frameSet;
      var space = frameSet._activeSpace;
      var dialog = RConsole.find(FUiWindowConsole).find(FDsCommonLayerDialog);
      dialog._frameSet = frameSet;
      dialog._spaceGuid = space.resource().guid();
      dialog.setSpace(space);
      dialog.setContentCode('');
      dialog.setContentLabel('');
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsSceneMenuBar_onImportTemplateClick = function FDsSceneMenuBar_onImportTemplateClick(){
      var o = this;
      var frameSet = o._frameSet;
      var space = frameSet._activeSpace;
      var dialog = RConsole.find(FUiWindowConsole).find(FDsCommonTemplateDialog);
      dialog._frameSet = frameSet;
      dialog._spaceGuid = space.resource().guid();
      dialog.setSpace(space);
      dialog.setContentCode('');
      dialog.setContentLabel('');
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsSceneMenuBar_onExecuteClick = function FDsSceneMenuBar_onExecuteClick(event){
      var o = this;
      var url = 'Space.wa?do=run&guid=' + o._frameSet._activeGuid;
      window.location = url;
   }
   MO.FDsSceneMenuBar_construct = function FDsSceneMenuBar_construct(){
      var o = this;
      o.__base.FUiMenuBar.construct.call(o);
   }
   MO.FDsSceneMenuBar_dispose = function FDsSceneMenuBar_dispose(){
      var o = this;
      o.__base.FUiMenuBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsScenePropertyToolBar = function FDsScenePropertyToolBar(o){
      o = RClass.inherits(this, o, FUiToolBar);
      o._frameName                   = 'resource.scene.PropertyToolBar';
      o._controlRefresh   = null;
      o._activeNodeGuid              = null;
      o.onBuilded                    = FDsScenePropertyToolBar_onBuilded;
      o.onFolderCreateClick          = FDsScenePropertyToolBar_onFolderCreateClick;
      o.onFolderDeleteLoad           = FDsScenePropertyToolBar_onFolderDeleteLoad;
      o.onFolderDeleteExcute         = FDsScenePropertyToolBar_onFolderDeleteExcute;
      o.onFolderDeleteClick          = FDsScenePropertyToolBar_onFolderDeleteClick;
      o.onFolderPropertyClick        = FDsScenePropertyToolBar_onFolderPropertyClick;
      o.onFolderOpenClick            = FDsScenePropertyToolBar_onFolderOpenClick;
      o.onFolderCloseClick           = FDsScenePropertyToolBar_onFolderCloseClick;
      o.construct                    = FDsScenePropertyToolBar_construct;
      o.dispose                      = FDsScenePropertyToolBar_dispose;
      return o;
   }
   MO.FDsScenePropertyToolBar_onBuilded = function FDsScenePropertyToolBar_onBuilded(p){
      var o = this;
      o.__base.FUiToolBar.onBuilded.call(o, p);
   }
   MO.FDsScenePropertyToolBar_onFolderCreateClick = function FDsScenePropertyToolBar_onFolderCreateClick(event){
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
   MO.FDsScenePropertyToolBar_onFolderDeleteLoad = function FDsScenePropertyToolBar_onFolderDeleteLoad(event){
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
   MO.FDsScenePropertyToolBar_onFolderDeleteExcute = function FDsScenePropertyToolBar_onFolderDeleteExcute(event){
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
   MO.FDsScenePropertyToolBar_onFolderDeleteClick = function FDsScenePropertyToolBar_onFolderDeleteClick(event){
      var o = this;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return RConsole.find(FUiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
      }
      var dialog = RConsole.find(FUiMessageConsole).showConfirm('请确认是否删除当前目录？');
      dialog.addResultListener(o, o.onFolderDeleteExcute);
   }
   MO.FDsScenePropertyToolBar_onFolderPropertyClick = function FDsScenePropertyToolBar_onFolderPropertyClick(event){
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
   MO.FDsScenePropertyToolBar_onFolderOpenClick = function FDsScenePropertyToolBar_onFolderOpenClick(event){
   }
   MO.FDsScenePropertyToolBar_onFolderCloseClick = function FDsScenePropertyToolBar_onFolderCloseClick(event){
   }
   MO.FDsScenePropertyToolBar_construct = function FDsScenePropertyToolBar_construct(){
      var o = this;
      o.__base.FUiToolBar.construct.call(o);
   }
   MO.FDsScenePropertyToolBar_dispose = function FDsScenePropertyToolBar_dispose(){
      var o = this;
      o.__base.FUiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsSceneWorkspace = function FDsSceneWorkspace(o){
      o = RClass.inherits(this, o, FUiWorkspace);
      o._frameName            = 'resource.share.scene.Workspace';
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
      o._propertyFrames       = null;
      o.onBuilded             = FDsSceneWorkspace_onBuilded;
      o.onSceneLoad           = FDsSceneWorkspace_onSceneLoad;
      o.onCatalogSelected     = FDsSceneWorkspace_onCatalogSelected;
      o.construct             = FDsSceneWorkspace_construct;
      o.findPropertyFrame     = FDsSceneWorkspace_findPropertyFrame;
      o.loadScene             = FDsSceneWorkspace_loadScene;
      o.dispose               = FDsSceneWorkspace_dispose;
      return o;
   }
   MO.FDsSceneWorkspace_onBuilded = function FDsSceneWorkspace_onBuilded(p){
      var o = this;
      o.__base.FUiWorkspace.onBuilded.call(o, p);
      var f = o._frameToolBar = o.searchControl('toolbarFrame');
      f._hPanel.className = o.styleName('Toolbar_Ground');
      var f = o._frameCatalog = o.searchControl('catalogFrame');
      f._hPanel.className = o.styleName('Catalog_Ground');
      var f = o._frameWorkspace = o.searchControl('spaceFrame');
      f._hPanel.className = o.styleName('Workspace_Ground');
      var f = o._frameProperty = o.searchControl('propertyFrame');
      f._hPanel.className = o.styleName('Property_Ground');
      var f = o._frameStatusBar = o.searchControl('statusFrame');
      f._hPanel.className = o.styleName('Statusbar_Ground');
      var f = o._catalogSplitter = o.searchControl('catalogSpliter');
      f.setAlignCd(EUiAlign.Left);
      f.setSizeHtml(o._frameCatalog._hPanel);
      var f = o._propertySpliter = o.searchControl('propertySpliter');
      f.setAlignCd(EUiAlign.Right);
      f.setSizeHtml(o._frameProperty._hPanel);
      var c = o._toolbar = RClass.create(FDsSceneMenuBar);
      c._workspace = o;
      c.buildDefine(p);
      o._frameToolBar.push(c);
      var c = o._catalog = RClass.create(FDsSceneCatalog);
      c._workspace = o;
      c.build(p);
      c.addSelectedListener(o, o.onCatalogSelected);
      o._frameCatalog.push(c);
      var f = o._canvasToolbarFrame = o.searchControl('canvasToolbarFrame');
      var c = o._canvasToolbar = RClass.create(FDsSceneCanvasToolBar);
      c._workspace = o;
      c.buildDefine(p);
      o._canvasToolbarFrame.push(c);
      var f = o._canvasFrame = o.searchControl('canvasFrame');
      var c = o._canvas = RClass.create(FDsSceneCanvas);
      c._workspace = o;
      c._toolbar = o._canvasToolbar;
      c.addLoadListener(o, o.onSceneLoad);
      c._hParent = f._hPanel;
      c._hParent.style.backgroundColor = '#000000';
      c.build(p);
      o._canvasFrame.push(c);
   }
   MO.FDsSceneWorkspace_onSceneLoad = function FDsSceneWorkspace_onSceneLoad(p){
      var o = this;
      var t = o._activeScene = p._activeScene;
      o._catalog.buildScene(t);
   }
   MO.FDsSceneWorkspace_onCatalogSelected = function FDsSceneWorkspace_onCatalogSelected(p, pc){
      var o = this;
      var s = o._activeScene;
      var fs = o._propertyFrames;
      var c = fs.count();
      for(var i = 0; i < c; i++){
         var f = fs.value(i);
         f.hide();
      }
      if(RClass.isClass(p, FE3dScene)){
         var f = o.findPropertyFrame(EDsFrame.SceneSpacePropertyFrame);
         f.show();
         f.loadObject(s, p);
      }else if(RClass.isClass(p, FG3dTechnique)){
         var f = o.findPropertyFrame(EDsFrame.SceneTechniquePropertyFrame);
         f.show();
         f.loadObject(s, p);
      }else if(RClass.isClass(p, FE3dRegion)){
         var f = o.findPropertyFrame(EDsFrame.SceneRegionPropertyFrame);
         f.show();
         f.loadObject(s, p);
      }else if(RClass.isClass(p, FE3dCamera)){
         var f = o.findPropertyFrame(EDsFrame.SceneCameraPropertyFrame);
         f.show();
         f.loadObject(s, p);
      }else if(RClass.isClass(p, FG3dDirectionalLight)){
         var f = o.findPropertyFrame(EDsFrame.SceneLightPropertyFrame);
         f.show();
         f.loadObject(s, p);
      }else if(p == 'layers'){
         if(pc){
            o._canvas.selectLayers(p);
         }
      }else if(RClass.isClass(p, FE3dSceneLayer)){
         if(pc){
            o._canvas.selectLayer(p);
         }
         var f = o.findPropertyFrame(EDsFrame.SceneLayerPropertyFrame);
         f.show();
         f.loadObject(s, p);
      }else if(RClass.isClass(p, FE3dSceneDisplay)){
         if(pc){
            o._canvas.selectDisplay(p);
         }
         var f = o.findPropertyFrame(EDsFrame.SceneDisplayPropertyFrame);
         f.show();
         f.loadObject(s, p);
      }else if(RClass.isClass(p, FE3dSceneMaterial)){
         if(pc){
            o._canvas.selectMaterial(p);
         }
         var f = o.findPropertyFrame(EDsFrame.SceneMaterialPropertyFrame);
         f.show();
         f.loadObject(s, p);
      }else if(RClass.isClass(p, FE3rAnimation)){
         var f = o.findPropertyFrame(EDsFrame.SceneAnimationPropertyFrame);
         f.show();
         f.loadObject(s, p);
      }else if(RClass.isClass(p, FE3dRenderable)){
         if(pc){
            o._canvas.selectRenderable(p);
         }
         var f = o.findPropertyFrame(EDsFrame.SceneRenderablePropertyFrame);
         f.show();
         f.loadObject(s, p);
      }else{
         throw new TError('Unknown select object type. (value={1})', p);
      }
   }
   MO.FDsSceneWorkspace_construct = function FDsSceneWorkspace_construct(){
      var o = this;
      o.__base.FUiWorkspace.construct.call(o);
      o._propertyFrames = new TDictionary();
   }
   MO.FDsSceneWorkspace_findPropertyFrame = function FDsSceneWorkspace_findPropertyFrame(p){
      var o = this;
      var frame = o._propertyFrames.get(p);
      if(!frame){
         frame = RConsole.find(FUiFrameConsole).get(o, p, o._frameProperty._hContainer);
         frame._workspace = o;
         o._propertyFrames.set(p, frame);
      }
      return frame;
   }
   MO.FDsSceneWorkspace_loadScene = function FDsSceneWorkspace_loadScene(p){
      var o = this;
      o._sceneCode = p;
      o._canvas.loadScene(p);
   }
   MO.FDsSceneWorkspace_dispose = function FDsSceneWorkspace_dispose(){
      var o = this;
      o.__base.FUiWorkspace.dispose.call(o);
      o._propertyFrames.dispose();
      o._propertyFrames = null;
   }
}
