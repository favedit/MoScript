function FDsPrivateMeshCanvas(o){
   o = RClass.inherits(this, o, FDsCanvas);
   o._activeGuid          = null;
   o._activeSpace         = null;
   o._autoDistance        = null;
   o._autoOutline         = null;
   o._autoMatrix          = null;
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
   o._switchWidth         = '*';
   o._switchHeight        = '*';
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
   o.onBuild              = FDsPrivateMeshCanvas_onBuild;
   o.onMouseCaptureStart  = FDsPrivateMeshCanvas_onMouseCaptureStart;
   o.onMouseCapture       = FDsPrivateMeshCanvas_onMouseCapture;
   o.onMouseCaptureStop   = FDsPrivateMeshCanvas_onMouseCaptureStop;
   o.onEnterFrame         = FDsPrivateMeshCanvas_onEnterFrame;
   o.onMeshLoad           = FDsPrivateMeshCanvas_onMeshLoad;
   o.oeResize             = FDsPrivateMeshCanvas_oeResize;
   o.oeRefresh            = FDsPrivateMeshCanvas_oeRefresh;
   o.construct            = FDsPrivateMeshCanvas_construct;
   o.innerSelectDisplay   = FDsPrivateMeshCanvas_innerSelectDisplay;
   o.innerSelectLayer     = FDsPrivateMeshCanvas_innerSelectLayer;
   o.selectNone           = FDsPrivateMeshCanvas_selectNone;
   o.selectDisplay        = FDsPrivateMeshCanvas_selectDisplay;
   o.selectMaterial       = FDsPrivateMeshCanvas_selectMaterial;
   o.selectRenderable     = FDsPrivateMeshCanvas_selectRenderable;
   o.switchSize           = FDsPrivateMeshCanvas_switchSize;
   o.switchDimensional    = FDsPrivateMeshCanvas_switchDimensional;
   o.switchRotation       = FDsPrivateMeshCanvas_switchRotation;
   o.viewAutoSize         = FDsPrivateMeshCanvas_viewAutoSize;
   o.reloadRegion         = FDsPrivateMeshCanvas_reloadRegion;
   o.capture              = FDsPrivateMeshCanvas_capture;
   o.loadByGuid           = FDsPrivateMeshCanvas_loadByGuid;
   o.loadByCode           = FDsPrivateMeshCanvas_loadByCode;
   o.dispose              = FDsPrivateMeshCanvas_dispose;
   return o;
}
function FDsPrivateMeshCanvas_onBuild(p){
   var o = this;
   o.__base.FDsCanvas.onBuild.call(o, p);
}
function FDsPrivateMeshCanvas_onMouseCaptureStart(p){
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
function FDsPrivateMeshCanvas_onMouseCapture(p){
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
function FDsPrivateMeshCanvas_onMouseCaptureStop(p){
   var o = this;
   RHtml.cursorSet(o._hPanel, EUiCursor.Auto);
}
function FDsPrivateMeshCanvas_onEnterFrame(){
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
function FDsPrivateMeshCanvas_onMeshLoad(p){
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
   RConsole.find(FUiDesktopConsole).hide();
}
function FDsPrivateMeshCanvas_oeResize(p){
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
function FDsPrivateMeshCanvas_oeRefresh(p){
   return EEventStatus.Stop;
}
function FDsPrivateMeshCanvas_construct(){
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
function FDsPrivateMeshCanvas_innerSelectDisplay(p){
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
function FDsPrivateMeshCanvas_innerSelectLayer(p){
   var o = this;
   var s = p.displays();
   var c = s.count();
   for(var i = 0; i < c; i++){
      var d = s.getAt(i);
      o.innerSelectDisplay(d)
   }
}
function FDsPrivateMeshCanvas_selectNone(){
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
function FDsPrivateMeshCanvas_selectDisplay(p){
   var o = this;
   o.selectNone();
   o._selectObject = p;
   o.innerSelectDisplay(p);
}
function FDsPrivateMeshCanvas_selectMaterial(p){
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
function FDsPrivateMeshCanvas_selectRenderable(p){
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
function FDsPrivateMeshCanvas_switchMode(p){
   var o = this;
   o._canvasModeCd = p;
   o.selectRenderable(o._selectRenderable);
}
function FDsPrivateMeshCanvas_switchSize(width, height){
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
function FDsPrivateMeshCanvas_switchDimensional(visible, width, height){
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
function FDsPrivateMeshCanvas_switchRotation(p){
   this._optionRotation = p;
}
function FDsPrivateMeshCanvas_viewAutoSize(flipX, flipY, flipZ, rotationX, rotationY, rotationZ){
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
function FDsPrivateMeshCanvas_reloadRegion(region){
   var o = this;
   var resource = region.resource();
   o._cameraMoveRate = resource.moveSpeed();
   o._cameraKeyRotation = resource.rotationKeySpeed();
   o._cameraMouseRotation = resource.rotationMouseSpeed();
}
function FDsPrivateMeshCanvas_capture(){
   var o = this;
   var space = o._activeSpace;
   var guid = space._resource._guid;
   var switchWidth = o._switchWidth;
   var switchHeight = o._switchHeight;
   o.switchSize(200, 150);
   RStage.process();
   var context = o._graphicContext;
   var size = context.size();
   var native = context._native;
   var width = size.width;
   var height = size.height;
   var data = new Uint8Array(4 * width * height);
   native.readPixels(0, 0, width, height, native.RGBA, native.UNSIGNED_BYTE, data);
   o.switchSize(switchWidth, switchHeight);
   RStage.process();
   var url = '/cloud.content.resource.preview.wv?do=upload&type_cd=mesh&guid=' + guid + '&width=' + width + '&height=' + height;
   return RConsole.find(FHttpConsole).send(url, data.buffer);
}
function FDsPrivateMeshCanvas_loadByGuid(guid){
   var o = this;
   RConsole.find(FUiDesktopConsole).showLoading();
   var rmc = RConsole.find(FE3dMeshConsole);
   if(o._activeSpace != null){
      rmc.free(o._activeSpace);
   }
   var space = o._activeSpace = rmc.allocByGuid(o, guid);
   space.addLoadListener(o, o.onMeshLoad);
   space._layer.pushRenderable(o._dimensional);
   RStage.register('space', space);
}
function FDsPrivateMeshCanvas_loadByCode(p){
   var o = this;
   RConsole.find(FUiDesktopConsole).showLoading();
   var rmc = RConsole.find(FE3dMeshConsole);
   if(o._activeSpace != null){
      rmc.free(o._activeSpace);
   }
   var space = o._activeSpace = rmc.allocByCode(o, p);
   space.addLoadListener(o, o.onMeshLoad);
   space._layer.pushRenderable(o._dimensional);
   RStage.register('space', space);
}
function FDsPrivateMeshCanvas_dispose(){
   var o = this;
   o._rotation = RObject.dispose(o._rotation);
x   // 父处理
   o.__base.FDsCanvas.dispose.call(o);
}
function FDsPrivateMeshCanvasToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   o._frameName                 = 'resource.private.mesh.CanvasToolBar';
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
   o.onBuilded                  = FDsPrivateMeshCanvasToolBar_onBuilded;
   o.onModeClick                = FDsPrivateMeshCanvasToolBar_onModeClick;
   o.onSizeClick                = FDsPrivateMeshCanvasToolBar_onSizeClick;
   o.onDimensionalChange        = FDsPrivateMeshCanvasToolBar_onDimensionalChange;
   o.onDimensionalAutoClick     = FDsPrivateMeshCanvasToolBar_onDimensionalAutoClick;
   o.onRotationClick            = FDsPrivateMeshCanvasToolBar_onRotationClick;
   o.construct                  = FDsPrivateMeshCanvasToolBar_construct;
   o.dispose                    = FDsPrivateMeshCanvasToolBar_dispose;
   return o;
}
function FDsPrivateMeshCanvasToolBar_onBuilded(p){
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
function FDsPrivateMeshCanvasToolBar_onModeClick(p){
   var o = this;
}
function FDsPrivateMeshCanvasToolBar_onSizeClick(event){
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
function FDsPrivateMeshCanvasToolBar_onDimensionalChange(event){
   var o = this;
   var canvas = o._frameSet._canvas;
   var visible = o._controlDimensionalVisible.isCheck();
   var width = RInteger.parse(o._controlDimensionalWidth.text());
   var height = RInteger.parse(o._controlDimensionalHeight.text());
   canvas.switchDimensional(visible, width, height);
}
function FDsPrivateMeshCanvasToolBar_onDimensionalAutoClick(event){
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
function FDsPrivateMeshCanvasToolBar_onRotationClick(event, v){
   var o = this;
   var button = event.sender;
   var canvas = o._frameSet._canvas;
   canvas.switchRotation(button.isCheck());
}
function FDsPrivateMeshCanvasToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsPrivateMeshCanvasToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsPrivateMeshCatalog(o){
   o = RClass.inherits(this, o, FUiDataTreeView, MListenerSelected);
   o._iconView             = 'design3d.mesh.view';
   o._iconViewNot          = 'design3d.mesh.viewno';
   o._activeSpace          = null;
   o._materials            = null;
   o.onBuild               = FDsPrivateMeshCatalog_onBuild;
   o.onLoadDisplay         = FDsPrivateMeshCatalog_onLoadDisplay;
   o.onNodeClick           = FDsPrivateMeshCatalog_onNodeClick;
   o.onNodeViewClick       = FDsPrivateMeshCatalog_onNodeViewClick;
   o.onNodeViewDoubleClick = FDsPrivateMeshCatalog_onNodeViewDoubleClick;
   o.lsnsSelect            = null;
   o.construct             = FDsPrivateMeshCatalog_construct;
   o.buildTechnique        = FDsPrivateMeshCatalog_buildTechnique;
   o.buildRegion           = FDsPrivateMeshCatalog_buildRegion;
   o.buildRenderable       = FDsPrivateMeshCatalog_buildRenderable;
   o.buildDisplay          = FDsPrivateMeshCatalog_buildDisplay;
   o.buildSpace            = FDsPrivateMeshCatalog_buildSpace;
   o.selectObject          = FDsPrivateMeshCatalog_selectObject;
   o.showObject            = FDsPrivateMeshCatalog_showObject;
   o.dispose               = FDsPrivateMeshCatalog_dispose;
   return o;
}
function FDsPrivateMeshCatalog_onBuild(p){
   var o = this;
   o.__base.FUiDataTreeView.onBuild.call(o, p);
   o.lsnsClick.register(o, o.onNodeClick);
   o.loadUrl('/cloud.describe.tree.ws?action=query&code=design3d.mesh');
}
function FDsPrivateMeshCatalog_onLoadDisplay(p){
   var o = this;
   var n = p._linkNode;
   o.buildRenderable(n, p);
}
function FDsPrivateMeshCatalog_onNodeClick(t, n){
   var o = this;
   var s = n.dataPropertyGet('linker');
   o.selectObject(s);
}
function FDsPrivateMeshCatalog_onNodeViewClick(p){
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
function FDsPrivateMeshCatalog_onNodeViewDoubleClick(p){
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
function FDsPrivateMeshCatalog_construct(){
   var o = this;
   o.__base.FUiDataTreeView.construct.call(o);
   o._renderables = new TObjects();
   o._materials = new TObjects();
}
function FDsPrivateMeshCatalog_buildTechnique(n, p){
   var o = this;
   var nt = o.createNode();
   nt.setLabel('Technique');
   nt.setTypeCode('technique');
   nt.dataPropertySet('linker', p);
   n.appendNode(nt);
}
function FDsPrivateMeshCatalog_buildRegion(n, p){
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
function FDsPrivateMeshCatalog_buildRenderable(n, p){
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
function FDsPrivateMeshCatalog_buildDisplay(n, p){
   var o = this;
   var node = o.createNode();
   node.setTypeCode('display');
   node.setLabel('Mesh');
   node.dataPropertySet('linker', p);
   n.appendNode(node);
   o.buildRenderable(node, p);
}
function FDsPrivateMeshCatalog_buildSpace(space){
   var o = this;
   var resource = space.resource();
   o._activeSpace = space;
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
function FDsPrivateMeshCatalog_selectObject(p){
   var o = this;
   if(p != null){
      o.processSelectedListener(p, true);
   }
}
function FDsPrivateMeshCatalog_showObject(p){
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
function FDsPrivateMeshCatalog_dispose(){
   var o = this;
   o._displays = RObject.dispose(o._displays);
   o._renderables = RObject.dispose(o._renderables);
   o._materials = RObject.dispose(o._materials);
   o.__base.FUiDataTreeView.dispose.call(o);
}
function FDsPrivateMeshDisplayFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._activeSpace   = null;
   o._activeDisplay = null;
   o.onBuilded      = FDsPrivateMeshDisplayFrame_onBuilded;
   o.onDataChanged  = FDsPrivateMeshDisplayFrame_onDataChanged;
   o.construct      = FDsPrivateMeshDisplayFrame_construct;
   o.loadObject     = FDsPrivateMeshDisplayFrame_loadObject;
   o.dispose        = FDsPrivateMeshDisplayFrame_dispose;
   return o;
}
function FDsPrivateMeshDisplayFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   o._controlTranslate.addDataChangedListener(o, o.onDataChanged);
   o._controlRotation.addDataChangedListener(o, o.onDataChanged);
   o._controlScale.addDataChangedListener(o, o.onDataChanged);
}
function FDsPrivateMeshDisplayFrame_onDataChanged(p){
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
function FDsPrivateMeshDisplayFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsPrivateMeshDisplayFrame_loadObject(space, display){
   var o = this;
   var resource = display.resource();
   o._activeSpace = space;
   o._activeDisplay = display;
   var matrix = resource.matrix();
   o._controlTranslate.set(matrix.tx, matrix.ty, matrix.tz);
   o._controlRotation.set(matrix.rx, matrix.ry, matrix.rz);
   o._controlScale.set(matrix.sx, matrix.sy, matrix.sz);
}
function FDsPrivateMeshDisplayFrame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsPrivateMeshDisplayPropertyFrame(o){
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
   o.onBuilded       = FDsPrivateMeshDisplayPropertyFrame_onBuilded;
   o.onDataChanged   = FDsPrivateMeshDisplayPropertyFrame_onDataChanged;
   o.construct       = FDsPrivateMeshDisplayPropertyFrame_construct;
   o.loadObject      = FDsPrivateMeshDisplayPropertyFrame_loadObject;
   o.dispose         = FDsPrivateMeshDisplayPropertyFrame_dispose;
   return o;
}
function FDsPrivateMeshDisplayPropertyFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   o._controlCode.addDataChangedListener(o, o.onDataChanged);
   o._controlLabel.addDataChangedListener(o, o.onDataChanged);
}
function FDsPrivateMeshDisplayPropertyFrame_onDataChanged(p){
   var o = this;
   var r = o._activeResource;
   r._code = o._controlCode.get();
   r._label = o._controlLabel.get();
}
function FDsPrivateMeshDisplayPropertyFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsPrivateMeshDisplayPropertyFrame_loadObject(space, display){
   var o = this;
   var resource = display._resource;
   o._activeSpace = space;
   o._activeDisplay = display;
   o._controlGuid.set(resource.guid());
   o._controlCode.set(resource.code());
   o._controlLabel.set(resource.label());
   o._frameDisplay.loadObject(space, display);
}
function FDsPrivateMeshDisplayPropertyFrame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsPrivateMeshFrameSet(o){
   o = RClass.inherits(this, o, FUiFrameSet);
   o._frameName            = 'resource.private.mesh.FrameSet';
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
   o.onBuilded             = FDsPrivateMeshFrameSet_onBuilded;
   o.onMeshLoad            = FDsPrivateMeshFrameSet_onMeshLoad;
   o.onCatalogSelected     = FDsPrivateMeshFrameSet_onCatalogSelected;
   o.construct             = FDsPrivateMeshFrameSet_construct;
   o.findPropertyFrame     = FDsPrivateMeshFrameSet_findPropertyFrame;
   o.loadByGuid            = FDsPrivateMeshFrameSet_loadByGuid;
   o.loadByCode            = FDsPrivateMeshFrameSet_loadByCode;
   o.dispose               = FDsPrivateMeshFrameSet_dispose;
   return o;
}
function FDsPrivateMeshFrameSet_onBuilded(p){
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
   var catalog = o._catalog = RClass.create(FDsPrivateMeshCatalog);
   catalog._frameSet = o;
   catalog._workspace = o._worksapce;
   catalog.build(p);
   catalog.addSelectedListener(o, o.onCatalogSelected);
   o._frameCatalog.push(catalog);
   var frame = o._canvasToolbarFrame = o.searchControl('canvasToolbarFrame');
   var toolbar = o._canvasToolbar = RClass.create(FDsPrivateMeshCanvasToolBar);
   toolbar._frameSet = o;
   toolbar._workspace = o._worksapce;
   toolbar.buildDefine(p);
   frame.push(toolbar);
   var frame = o._canvasFrame = o.searchControl('canvasFrame');
   var canvas = o._canvas = RClass.create(FDsPrivateMeshCanvas);
   canvas._frameSet = o;
   canvas._workspace = o._workspace;
   canvas._toolbar = o._canvasToolbar;
   canvas.addLoadListener(o, o.onMeshLoad);
   canvas._hParent = frame._hPanel;
   canvas._hParent.style.backgroundColor = '#333333';
   canvas._hParent.style.scroll = 'auto';
   canvas.build(p);
   frame.push(canvas);
}
function FDsPrivateMeshFrameSet_onMeshLoad(p){
   var o = this;
   o._activeSpace = p._activeSpace;
   o._catalog.buildSpace(o._activeSpace);
}
function FDsPrivateMeshFrameSet_onCatalogSelected(p, pc){
   var o = this;
   var space = o._activeSpace;
   var frames = o._propertyFrames;
   var count = frames.count();
   for(var i = 0; i < count; i++){
      var frame = frames.at(i);
      frame.hide();
   }
   if(RClass.isClass(p, FE3dStage)){
      var f = o.findPropertyFrame(EDsFrame.CommonSpacePropertyFrame);
      f.show();
      f.loadObject(space, space);
   }else if(RClass.isClass(p, FG3dTechnique)){
      var f = o.findPropertyFrame(EDsFrame.CommonTechniquePropertyFrame);
      f.show();
      f.loadObject(space, p);
   }else if(RClass.isClass(p, FE3dRegion)){
      var f = o.findPropertyFrame(EDsFrame.CommonRegionPropertyFrame);
      f.show();
      f.loadObject(space, p);
   }else if(RClass.isClass(p, FE3dCamera)){
      var f = o.findPropertyFrame(EDsFrame.CommonCameraPropertyFrame);
      f.show();
      f.loadObject(space, p);
   }else if(RClass.isClass(p, FG3dDirectionalLight)){
      var f = o.findPropertyFrame(EDsFrame.CommonLightPropertyFrame);
      f.show();
      f.loadObject(space, p);
   }else if(RClass.isClass(p, FE3dMeshDisplay)){
      var f = o.findPropertyFrame(EDsFrame.MeshDisplayPropertyFrame);
      f.show();
      f.loadObject(space, p);
   }else if(RClass.isClass(p, FG3dMaterial)){
      var f = o.findPropertyFrame(EDsFrame.CommonMaterialPropertyFrame);
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
function FDsPrivateMeshFrameSet_construct(){
   var o = this;
   o.__base.FUiFrameSet.construct.call(o);
   o._propertyFrames = new TDictionary();
}
function FDsPrivateMeshFrameSet_findPropertyFrame(code){
   var o = this;
   var frame = o._propertyFrames.get(code);
   if(!frame){
      frame = RConsole.find(FUiFrameConsole).get(o, code, o._frameProperty._hContainer);
      frame._workspace = o;
      o._propertyFrames.set(code, frame);
   }
   return frame;
}
function FDsPrivateMeshFrameSet_loadByGuid(guid){
   var o = this;
   o._meshGuid = guid;
   o._canvas.loadByGuid(guid);
}
function FDsPrivateMeshFrameSet_loadByCode(p){
   var o = this;
   o._meshCode = p;
   o._canvas.loadByCode(p);
}
function FDsPrivateMeshFrameSet_dispose(){
   var o = this;
   o.__base.FUiFrameSet.dispose.call(o);
   o._propertyFrames.dispose();
   o._propertyFrames = null;
}
function FDsPrivateMeshMenuBar(o){
   o = RClass.inherits(this, o, FUiMenuBar);
   o._frameName            = 'resource.private.mesh.MenuBar';
   o._controlSaveButton    = null;
   o._controlCaptureButton = null;
   o.onBuilded             = FDsPrivateMeshMenuBar_onBuilded;
   o.onSaveLoad            = FDsPrivateMeshMenuBar_onSaveLoad;
   o.onSaveClick           = FDsPrivateMeshMenuBar_onSaveClick;
   o.onCaptureLoad         = FDsPrivateMeshMenuBar_onCaptureLoad;
   o.onCaptureClick        = FDsPrivateMeshMenuBar_onCaptureClick;
   o.construct             = FDsPrivateMeshMenuBar_construct;
   o.dispose               = FDsPrivateMeshMenuBar_dispose;
   return o;
}
function FDsPrivateMeshMenuBar_onBuilded(p){
   var o = this;
   o.__base.FUiMenuBar.onBuilded.call(o, p);
   o._controlSaveButton.addClickListener(o, o.onSaveClick);
   o._controlCaptureButton.addClickListener(o, o.onCaptureClick);
}
function FDsPrivateMeshMenuBar_onSaveLoad(event){
   RConsole.find(FUiDesktopConsole).hide();
}
function FDsPrivateMeshMenuBar_onSaveClick(p){
   var o = this;
   var space = o._frameSet._activeSpace;
   var resource = space.resource();
   RConsole.find(FUiDesktopConsole).showUploading();
   var xconfig = new TXmlNode();
   resource.saveConfig(xconfig);
   var connection = RConsole.find(FE3sMeshConsole).update(xconfig);
   connection.addLoadListener(o, o.onSaveLoad);
}
function FDsPrivateMeshMenuBar_onCaptureLoad(event){
   RConsole.find(FUiDesktopConsole).hide();
}
function FDsPrivateMeshMenuBar_onCaptureClick(event){
   var o = this;
   RConsole.find(FUiDesktopConsole).showUploading();
   var connection = o._frameSet._canvas.capture();
   connection.addLoadListener(o, o.onCaptureLoad);
}
function FDsPrivateMeshMenuBar_construct(){
   var o = this;
   o.__base.FUiMenuBar.construct.call(o);
}
function FDsPrivateMeshMenuBar_dispose(){
   var o = this;
   o.__base.FUiMenuBar.dispose.call(o);
}
function FDsPrivateMeshRenderableFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._activeSpace      = null;
   o._activeRenderable = null;
   o.onBuilded         = FDsPrivateMeshRenderableFrame_onBuilded;
   o.onDataChanged     = FDsPrivateMeshRenderableFrame_onDataChanged;
   o.onEffectClick     = FDsPrivateMeshRenderableFrame_onEffectClick;
   o.construct         = FDsPrivateMeshRenderableFrame_construct;
   o.loadObject        = FDsPrivateMeshRenderableFrame_loadObject;
   o.dispose           = FDsPrivateMeshRenderableFrame_dispose;
   return o;
}
function FDsPrivateMeshRenderableFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   o._controlTranslate.addDataChangedListener(o, o.onDataChanged);
   o._controlRotation.addDataChangedListener(o, o.onDataChanged);
   o._controlScale.addDataChangedListener(o, o.onDataChanged);
   o._controlEffects.addClickListener(o, o.onEffectClick);
}
function FDsPrivateMeshRenderableFrame_onDataChanged(p){
   var o = this;
   var renderable = o._activeRenderable;
   var resource = renderable.resource();
   var matrix = resource.matrix();
   var value = o._controlTranslate.get();
   matrix.setTranslate(value.x, value.y, value.z);
   var value = o._controlRotation.get();
   matrix.setRotation(value.x, value.y, value.z);
   var value = o._controlScale.get();
   matrix.setScale(value.x, value.y, value.z);
   matrix.update();
   renderable.matrix().assign(matrix);
}
function FDsPrivateMeshRenderableFrame_onEffectClick(ps, pi){
   var o = this;
   var e = pi.tag();
   var p = e._program;
   var s = p._vertexShader;
   alert(s._source);
   var s = p._fragmentShader;
   alert(s._source);
}
function FDsPrivateMeshRenderableFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsPrivateMeshRenderableFrame_loadObject(space, renderable){
   var o = this;
   var resource = renderable.resource();
   o._activeSpace = space;
   o._activeRenderable = renderable;
   var matrix = resource.matrix();
   o._controlTranslate.set(matrix.tx, matrix.ty, matrix.tz);
   o._controlRotation.set(matrix.rx, matrix.ry, matrix.rz);
   o._controlScale.set(matrix.sx, matrix.sy, matrix.sz);
   var ces = o._controlEffects;
   ces.clear();
   var es = renderable.infos();
   var c = es.count();
   for(var i = 0; i < c; i++){
      var e = es.valueAt(i).effect;
      if(e){
         var l = ces.createItem(null, e.code());
         l.setTag(e);
         ces.push(l);
      }
   }
}
function FDsPrivateMeshRenderableFrame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsPrivateMeshRenderablePropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._visible          = false;
   o._workspace        = null;
   o._activeSpace = null;
   o._activeRenderable   = null;
   o._controlGuid      = null;
   o._controlCode      = null;
   o._controlLabel     = null;
   o._frameRenderable  = null;
   o._frameMaterial1   = null;
   o._frameMaterial2   = null;
   o.construct         = FDsPrivateMeshRenderablePropertyFrame_construct;
   o.loadObject        = FDsPrivateMeshRenderablePropertyFrame_loadObject;
   o.dispose           = FDsPrivateMeshRenderablePropertyFrame_dispose;
   return o;
}
function FDsPrivateMeshRenderablePropertyFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsPrivateMeshRenderablePropertyFrame_loadObject(space, renderable){
   var o = this;
   var resource = renderable.resource();
   o._activeSpace = space;
   o._activeRenderable = renderable;
   o._controlGuid.set(resource.guid());
   o._controlCode.set(resource.code());
   o._controlLabel.set(resource.label());
   o._frameRenderable.loadObject(space, renderable);
}
function FDsPrivateMeshRenderablePropertyFrame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsPrivateMeshWorkspace(o){
   o = RClass.inherits(this, o, FUiWorkspace);
   o._frameName            = 'resource.private.mesh.Workspace';
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
   o.onBuilded             = FDsPrivateMeshWorkspace_onBuilded;
   o.onMeshLoad            = FDsPrivateMeshWorkspace_onMeshLoad;
   o.onCatalogSelected     = FDsPrivateMeshWorkspace_onCatalogSelected;
   o.construct             = FDsPrivateMeshWorkspace_construct;
   o.findPropertyFrame     = FDsPrivateMeshWorkspace_findPropertyFrame;
   o.loadByGuid            = FDsPrivateMeshWorkspace_loadByGuid;
   o.loadByCode            = FDsPrivateMeshWorkspace_loadByCode;
   o.dispose               = FDsPrivateMeshWorkspace_dispose;
   return o;
}
function FDsPrivateMeshWorkspace_onBuilded(p){
   var o = this;
   o.__base.FUiWorkspace.onBuilded.call(o, p);
   var frame = o._frameToolBar = o.searchControl('toolbarFrame');
   frame._hPanel.className = o.styleName('Toolbar_Ground');
   var frame = o._frameBody = o.searchControl('bodyFrame');
   frame._hPanel.className = o.styleName('Body_Ground');
   var frame = o._frameStatusBar = o.searchControl('statusFrame');
   frame._hPanel.className = o.styleName('Statusbar_Ground');
   var menuBar = o._menuBar = RClass.create(FDsPrivateMeshMenuBar);
   menuBar._workspace = o;
   menuBar.buildDefine(p);
   o._frameToolBar.push(menuBar);
   var frameSet = o._frameSet = RClass.create(FDsPrivateMeshFrameSet);
   frameSet._workspace = o;
   frameSet.buildDefine(p);
   o._frameBody.push(frameSet);
   menuBar._frameSet = frameSet;
}
function FDsPrivateMeshWorkspace_onMeshLoad(p){
   var o = this;
   o._activeSpace = p._activeSpace;
   o._catalog.buildSpace(o._activeSpace);
}
function FDsPrivateMeshWorkspace_onCatalogSelected(p, pc){
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
function FDsPrivateMeshWorkspace_construct(){
   var o = this;
   o.__base.FUiWorkspace.construct.call(o);
   o._propertyFrames = new TDictionary();
}
function FDsPrivateMeshWorkspace_findPropertyFrame(p){
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
function FDsPrivateMeshWorkspace_loadByGuid(guid){
   this._frameSet.loadByGuid(guid);
}
function FDsPrivateMeshWorkspace_loadByCode(code){
   this._frameSet.loadByCode(code);
}
function FDsPrivateMeshWorkspace_dispose(){
   var o = this;
   o.__base.FUiWorkspace.dispose.call(o);
   o._propertyFrames.dispose();
   o._propertyFrames = null;
}
