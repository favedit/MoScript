with(MO){
   MO.FDsSystemFrameCatalogContent = function FDsSystemFrameCatalogContent(o){
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
      o.onBuild              = FDsSystemFrameCatalogContent_onBuild;
      o.onMouseCaptureStart  = FDsSystemFrameCatalogContent_onMouseCaptureStart;
      o.onMouseCapture       = FDsSystemFrameCatalogContent_onMouseCapture;
      o.onMouseCaptureStop   = FDsSystemFrameCatalogContent_onMouseCaptureStop;
      o.onEnterFrame         = FDsSystemFrameCatalogContent_onEnterFrame;
      o.onMeshLoad           = FDsSystemFrameCatalogContent_onMeshLoad;
      o.oeResize             = FDsSystemFrameCatalogContent_oeResize;
      o.oeRefresh            = FDsSystemFrameCatalogContent_oeRefresh;
      o.construct            = FDsSystemFrameCatalogContent_construct;
      o.innerSelectDisplay   = FDsSystemFrameCatalogContent_innerSelectDisplay;
      o.innerSelectLayer     = FDsSystemFrameCatalogContent_innerSelectLayer;
      o.switchRotation       = FDsSystemFrameCatalogContent_switchRotation;
      o.reloadRegion         = FDsSystemFrameCatalogContent_reloadRegion;
      o.loadMeshByGuid       = FDsSystemFrameCatalogContent_loadMeshByGuid;
      o.loadMeshByCode       = FDsSystemFrameCatalogContent_loadMeshByCode;
      o.dispose              = FDsSystemFrameCatalogContent_dispose;
      return o;
   }
   MO.FDsSystemFrameCatalogContent_onBuild = function FDsSystemFrameCatalogContent_onBuild(p){
      var o = this;
      o.__base.FDsCanvas.onBuild.call(o, p);
   }
   MO.FDsSystemFrameCatalogContent_onMouseCaptureStart = function FDsSystemFrameCatalogContent_onMouseCaptureStart(p){
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
   MO.FDsSystemFrameCatalogContent_onMouseCapture = function FDsSystemFrameCatalogContent_onMouseCapture(p){
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
   MO.FDsSystemFrameCatalogContent_onMouseCaptureStop = function FDsSystemFrameCatalogContent_onMouseCaptureStop(p){
      var o = this;
      RHtml.cursorSet(o._hPanel, EUiCursor.Auto);
   }
   MO.FDsSystemFrameCatalogContent_onEnterFrame = function FDsSystemFrameCatalogContent_onEnterFrame(){
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
   MO.FDsSystemFrameCatalogContent_onMeshLoad = function FDsSystemFrameCatalogContent_onMeshLoad(p){
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
   MO.FDsSystemFrameCatalogContent_oeResize = function FDsSystemFrameCatalogContent_oeResize(p){
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
   MO.FDsSystemFrameCatalogContent_oeRefresh = function FDsSystemFrameCatalogContent_oeRefresh(p){
      return EEventStatus.Stop;
   }
   MO.FDsSystemFrameCatalogContent_construct = function FDsSystemFrameCatalogContent_construct(){
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
   MO.FDsSystemFrameCatalogContent_innerSelectDisplay = function FDsSystemFrameCatalogContent_innerSelectDisplay(p){
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
   MO.FDsSystemFrameCatalogContent_innerSelectLayer = function FDsSystemFrameCatalogContent_innerSelectLayer(p){
      var o = this;
      var s = p.displays();
      var c = s.count();
      for(var i = 0; i < c; i++){
         var d = s.getAt(i);
         o.innerSelectDisplay(d)
      }
   }
   MO.FDsSystemFrameCatalogContent_switchMode = function FDsSystemFrameCatalogContent_switchMode(p){
      var o = this;
      o._canvasModeCd = p;
   }
   MO.FDsSystemFrameCatalogContent_switchRotation = function FDsSystemFrameCatalogContent_switchRotation(p){
      this._optionRotation = p;
   }
   MO.FDsSystemFrameCatalogContent_reloadRegion = function FDsSystemFrameCatalogContent_reloadRegion(region){
      var o = this;
      var resource = region.resource();
      o._cameraMoveRate = resource.moveSpeed();
      o._cameraKeyRotation = resource.rotationKeySpeed();
      o._cameraMouseRotation = resource.rotationMouseSpeed();
   }
   MO.FDsSystemFrameCatalogContent_loadMeshByGuid = function FDsSystemFrameCatalogContent_loadMeshByGuid(p){
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
   MO.FDsSystemFrameCatalogContent_loadMeshByCode = function FDsSystemFrameCatalogContent_loadMeshByCode(p){
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
   MO.FDsSystemFrameCatalogContent_dispose = function FDsSystemFrameCatalogContent_dispose(){
      var o = this;
      o._rotation = RObject.dispose(o._rotation);
      o.__base.FDsCanvas.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemFrameCatalogToolBar = function FDsSystemFrameCatalogToolBar(o){
      o = RClass.inherits(this, o, FDsResourceCatalogToolBar);
      o._frameName = 'system.design.frame.CatalogToolBar';
      return o;
   }
}
with(MO){
   MO.FDsSystemFrameFrameSet = function FDsSystemFrameFrameSet(o){
      o = RClass.inherits(this, o, FDsResourceFrameSet);
      o._frameName        = 'system.design.frame.FrameSet';
      o.onBuilded         = FDsSystemFrameFrameSet_onBuilded;
      o.onCatalogSelected = FDsSystemFrameFrameSet_onCatalogSelected;
      return o;
   }
   MO.FDsSystemFrameFrameSet_onBuilded = function FDsSystemFrameFrameSet_onBuilded(event){
      var o = this;
      o.__base.FDsResourceFrameSet.onBuilded.call(o, event);
      o._frameCatalogToolBar._hPanel.className = o.styleName('Toolbar_Ground');
      o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
      o._frameSpaceToolBar._hPanel.className = o.styleName('Toolbar_Ground');
      o._frameSpaceContent._hPanel.className = o.styleName('List_Content');
      var f = o._catalogSplitter = o.searchControl('catalogSpliter');
      f.setAlignCd(EUiAlign.Left);
      f.setSizeHtml(o._frameCatalog._hPanel);
      var control = o._catalogToolbar = RClass.create(FDsSystemFrameCatalogToolBar);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.buildDefine(event);
      o._frameCatalogToolBar.push(control);
      var control = o._catalogContent = RClass.create(FDsSystemFrameCatalogContent);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.build(event);
      o._frameCatalogContent.push(control);
      var control = o._spaceToolBar = RClass.create(FDsSystemFrameSpaceToolBar);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.buildDefine(event);
      o._frameSpaceToolBar.push(control);
      var control = o._spaceContent = RClass.create(FDsSystemFrameSpaceContent);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.build(event);
      o._frameSpaceContent.push(control);
      var control = o._propertyToolbar = RClass.create(FDsSystemFramePropertyToolBar);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.buildDefine(event);
      o._framePropertyToolBar.push(control);
      var control = o._propertyContent = RClass.create(FDsSystemFramePropertyContent);
      control._workspace = o._workspace;
      control._frameSet = o;
      control._toolbar = o._propertyToolbar;
      control._hParent = f._hPanel;
      control.build(event);
      o._framePropertyContent.push(control);
   }
   MO.FDsSystemFrameFrameSet_onCatalogSelected = function FDsSystemFrameFrameSet_onCatalogSelected(p, pc){
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
}
with(MO){
   MO.FDsSystemFrameMenuBar = function FDsSystemFrameMenuBar(o){
      o = RClass.inherits(this, o, FDsResourceMenuBar);
      o._frameName      = 'system.design.frame.MenuBar';
      o._controlRefresh = null;
      o.onBuilded       = FDsSystemFrameMenuBar_onBuilded;
      o.onRefreshClick  = FDsSystemFrameMenuBar_onRefreshClick;
      return o;
   }
   MO.FDsSystemFrameMenuBar_onBuilded = function FDsSystemFrameMenuBar_onBuilded(p){
      var o = this;
      o.__base.FDsResourceMenuBar.onBuilded.call(o, p);
   }
   MO.FDsSystemFrameMenuBar_onRefreshClick = function FDsSystemFrameMenuBar_onRefreshClick(event){
   }
}
with(MO){
   MO.FDsSystemFramePropertyContent = function FDsSystemFramePropertyContent(o){
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
      o.onBuild              = FDsSystemFramePropertyContent_onBuild;
      o.onMouseCaptureStart  = FDsSystemFramePropertyContent_onMouseCaptureStart;
      o.onMouseCapture       = FDsSystemFramePropertyContent_onMouseCapture;
      o.onMouseCaptureStop   = FDsSystemFramePropertyContent_onMouseCaptureStop;
      o.onEnterFrame         = FDsSystemFramePropertyContent_onEnterFrame;
      o.onMeshLoad           = FDsSystemFramePropertyContent_onMeshLoad;
      o.oeResize             = FDsSystemFramePropertyContent_oeResize;
      o.oeRefresh            = FDsSystemFramePropertyContent_oeRefresh;
      o.construct            = FDsSystemFramePropertyContent_construct;
      o.innerSelectDisplay   = FDsSystemFramePropertyContent_innerSelectDisplay;
      o.innerSelectLayer     = FDsSystemFramePropertyContent_innerSelectLayer;
      o.switchRotation       = FDsSystemFramePropertyContent_switchRotation;
      o.reloadRegion         = FDsSystemFramePropertyContent_reloadRegion;
      o.loadMeshByGuid       = FDsSystemFramePropertyContent_loadMeshByGuid;
      o.loadMeshByCode       = FDsSystemFramePropertyContent_loadMeshByCode;
      o.dispose              = FDsSystemFramePropertyContent_dispose;
      return o;
   }
   MO.FDsSystemFramePropertyContent_onBuild = function FDsSystemFramePropertyContent_onBuild(p){
      var o = this;
      o.__base.FDsCanvas.onBuild.call(o, p);
   }
   MO.FDsSystemFramePropertyContent_onMouseCaptureStart = function FDsSystemFramePropertyContent_onMouseCaptureStart(p){
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
   MO.FDsSystemFramePropertyContent_onMouseCapture = function FDsSystemFramePropertyContent_onMouseCapture(p){
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
   MO.FDsSystemFramePropertyContent_onMouseCaptureStop = function FDsSystemFramePropertyContent_onMouseCaptureStop(p){
      var o = this;
      RHtml.cursorSet(o._hPanel, EUiCursor.Auto);
   }
   MO.FDsSystemFramePropertyContent_onEnterFrame = function FDsSystemFramePropertyContent_onEnterFrame(){
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
   MO.FDsSystemFramePropertyContent_onMeshLoad = function FDsSystemFramePropertyContent_onMeshLoad(p){
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
   MO.FDsSystemFramePropertyContent_oeResize = function FDsSystemFramePropertyContent_oeResize(p){
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
   MO.FDsSystemFramePropertyContent_oeRefresh = function FDsSystemFramePropertyContent_oeRefresh(p){
      return EEventStatus.Stop;
   }
   MO.FDsSystemFramePropertyContent_construct = function FDsSystemFramePropertyContent_construct(){
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
   MO.FDsSystemFramePropertyContent_innerSelectDisplay = function FDsSystemFramePropertyContent_innerSelectDisplay(p){
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
   MO.FDsSystemFramePropertyContent_innerSelectLayer = function FDsSystemFramePropertyContent_innerSelectLayer(p){
      var o = this;
      var s = p.displays();
      var c = s.count();
      for(var i = 0; i < c; i++){
         var d = s.getAt(i);
         o.innerSelectDisplay(d)
      }
   }
   MO.FDsSystemFramePropertyContent_switchMode = function FDsSystemFramePropertyContent_switchMode(p){
      var o = this;
      o._canvasModeCd = p;
   }
   MO.FDsSystemFramePropertyContent_switchRotation = function FDsSystemFramePropertyContent_switchRotation(p){
      this._optionRotation = p;
   }
   MO.FDsSystemFramePropertyContent_reloadRegion = function FDsSystemFramePropertyContent_reloadRegion(region){
      var o = this;
      var resource = region.resource();
      o._cameraMoveRate = resource.moveSpeed();
      o._cameraKeyRotation = resource.rotationKeySpeed();
      o._cameraMouseRotation = resource.rotationMouseSpeed();
   }
   MO.FDsSystemFramePropertyContent_loadMeshByGuid = function FDsSystemFramePropertyContent_loadMeshByGuid(p){
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
   MO.FDsSystemFramePropertyContent_loadMeshByCode = function FDsSystemFramePropertyContent_loadMeshByCode(p){
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
   MO.FDsSystemFramePropertyContent_dispose = function FDsSystemFramePropertyContent_dispose(){
      var o = this;
      o._rotation = RObject.dispose(o._rotation);
      o.__base.FDsCanvas.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemFramePropertyToolBar = function FDsSystemFramePropertyToolBar(o){
      o = RClass.inherits(this, o, FUiToolBar);
      o._frameName           = 'system.design.frame.PropertyToolBar';
      o._controlInsertButton = null;
      o._controlUpdateButton = null;
      o._controlDeleteButton = null;
      o.onBuilded            = FDsSystemFramePropertyToolBar_onBuilded;
      o.onUpdateClick        = FDsSystemFramePropertyToolBar_onUpdateClick;
      o.construct            = FDsSystemFramePropertyToolBar_construct;
      o.dispose              = FDsSystemFramePropertyToolBar_dispose;
      return o;
   }
   MO.FDsSystemFramePropertyToolBar_onBuilded = function FDsSystemFramePropertyToolBar_onBuilded(p){
      var o = this;
      o.__base.FUiToolBar.onBuilded.call(o, p);
   }
   MO.FDsSystemFramePropertyToolBar_onUpdateClick = function FDsSystemFramePropertyToolBar_onUpdateClick(event){
      var o = this;
      var guid = o._workspace._activeProjectGuid;
      window.location = 'Project.wa?do=detail&guid=' + guid;
   }
   MO.FDsSystemFramePropertyToolBar_construct = function FDsSystemFramePropertyToolBar_construct(){
      var o = this;
      o.__base.FUiToolBar.construct.call(o);
   }
   MO.FDsSystemFramePropertyToolBar_dispose = function FDsSystemFramePropertyToolBar_dispose(){
      var o = this;
      o.__base.FUiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemFrameSpaceContent = function FDsSystemFrameSpaceContent(o){
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
      o.onBuild              = FDsSystemFrameSpaceContent_onBuild;
      o.onMouseCaptureStart  = FDsSystemFrameSpaceContent_onMouseCaptureStart;
      o.onMouseCapture       = FDsSystemFrameSpaceContent_onMouseCapture;
      o.onMouseCaptureStop   = FDsSystemFrameSpaceContent_onMouseCaptureStop;
      o.onEnterFrame         = FDsSystemFrameSpaceContent_onEnterFrame;
      o.onMeshLoad           = FDsSystemFrameSpaceContent_onMeshLoad;
      o.oeResize             = FDsSystemFrameSpaceContent_oeResize;
      o.oeRefresh            = FDsSystemFrameSpaceContent_oeRefresh;
      o.construct            = FDsSystemFrameSpaceContent_construct;
      o.innerSelectDisplay   = FDsSystemFrameSpaceContent_innerSelectDisplay;
      o.innerSelectLayer     = FDsSystemFrameSpaceContent_innerSelectLayer;
      o.switchRotation       = FDsSystemFrameSpaceContent_switchRotation;
      o.reloadRegion         = FDsSystemFrameSpaceContent_reloadRegion;
      o.loadMeshByGuid       = FDsSystemFrameSpaceContent_loadMeshByGuid;
      o.loadMeshByCode       = FDsSystemFrameSpaceContent_loadMeshByCode;
      o.dispose              = FDsSystemFrameSpaceContent_dispose;
      return o;
   }
   MO.FDsSystemFrameSpaceContent_onBuild = function FDsSystemFrameSpaceContent_onBuild(p){
      var o = this;
      o.__base.FDsCanvas.onBuild.call(o, p);
   }
   MO.FDsSystemFrameSpaceContent_onMouseCaptureStart = function FDsSystemFrameSpaceContent_onMouseCaptureStart(p){
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
   MO.FDsSystemFrameSpaceContent_onMouseCapture = function FDsSystemFrameSpaceContent_onMouseCapture(p){
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
   MO.FDsSystemFrameSpaceContent_onMouseCaptureStop = function FDsSystemFrameSpaceContent_onMouseCaptureStop(p){
      var o = this;
      RHtml.cursorSet(o._hPanel, EUiCursor.Auto);
   }
   MO.FDsSystemFrameSpaceContent_onEnterFrame = function FDsSystemFrameSpaceContent_onEnterFrame(){
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
   MO.FDsSystemFrameSpaceContent_onMeshLoad = function FDsSystemFrameSpaceContent_onMeshLoad(p){
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
   MO.FDsSystemFrameSpaceContent_oeResize = function FDsSystemFrameSpaceContent_oeResize(p){
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
   MO.FDsSystemFrameSpaceContent_oeRefresh = function FDsSystemFrameSpaceContent_oeRefresh(p){
      return EEventStatus.Stop;
   }
   MO.FDsSystemFrameSpaceContent_construct = function FDsSystemFrameSpaceContent_construct(){
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
   MO.FDsSystemFrameSpaceContent_innerSelectDisplay = function FDsSystemFrameSpaceContent_innerSelectDisplay(p){
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
   MO.FDsSystemFrameSpaceContent_innerSelectLayer = function FDsSystemFrameSpaceContent_innerSelectLayer(p){
      var o = this;
      var s = p.displays();
      var c = s.count();
      for(var i = 0; i < c; i++){
         var d = s.getAt(i);
         o.innerSelectDisplay(d)
      }
   }
   MO.FDsSystemFrameSpaceContent_switchMode = function FDsSystemFrameSpaceContent_switchMode(p){
      var o = this;
      o._canvasModeCd = p;
   }
   MO.FDsSystemFrameSpaceContent_switchRotation = function FDsSystemFrameSpaceContent_switchRotation(p){
      this._optionRotation = p;
   }
   MO.FDsSystemFrameSpaceContent_reloadRegion = function FDsSystemFrameSpaceContent_reloadRegion(region){
      var o = this;
      var resource = region.resource();
      o._cameraMoveRate = resource.moveSpeed();
      o._cameraKeyRotation = resource.rotationKeySpeed();
      o._cameraMouseRotation = resource.rotationMouseSpeed();
   }
   MO.FDsSystemFrameSpaceContent_loadMeshByGuid = function FDsSystemFrameSpaceContent_loadMeshByGuid(p){
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
   MO.FDsSystemFrameSpaceContent_loadMeshByCode = function FDsSystemFrameSpaceContent_loadMeshByCode(p){
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
   MO.FDsSystemFrameSpaceContent_dispose = function FDsSystemFrameSpaceContent_dispose(){
      var o = this;
      o._rotation = RObject.dispose(o._rotation);
      o.__base.FDsCanvas.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemFrameSpaceToolBar = function FDsSystemFrameSpaceToolBar(o){
      o = RClass.inherits(this, o, FDsResourceListToolBar);
      o._frameName   = 'system.design.frame.SpaceToolBar';
      o._storageCode = o._frameName;
      return o;
   }
}
