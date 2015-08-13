with(MO){
   MO.FDsModelCanvasContent = function FDsModelCanvasContent(o){
      o = MO.Class.inherits(this, o, FDsCanvas);
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
      var st = MO.Console.find(FG3dTechniqueConsole).find(o._graphicContext, FG3dSelectTechnique);
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
               r._dragMatrix = new MO.SMatrix3d();
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
      var event = new MO.SEvent(o);
      o.processLoadListener(event);
      event.dispose();
      MO.Console.find(FDuiDesktopConsole).hide();
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
      o._autoDistance = new MO.SPoint3(6, 6, 6);
      o._autoOutline = new MO.SOutline3d();
      o._autoMatrix = new MO.SMatrix3d();
      o._capturePosition = new MO.SPoint2();
      o._captureMatrix = new MO.SMatrix3d();
      o._templateMatrix = new MO.SMatrix3d();
      o._templateFaceMatrix = new MO.SMatrix3d();
      o._rotation = new MO.SVector3();
      o._captureRotation = new MO.SVector3();
      o._selectRenderables = new TObjects();
   }
   MO.FDsModelCanvasContent_innerSelectDisplay = function FDsModelCanvasContent_innerSelectDisplay(p){
      var o = this;
      var s = p.renderables();
      var c = s.count();
      for(var i = 0; i < c; i++){
         var r = s.getAt(i);
         if(MO.Class.isClass(r, FDsSceneRenderable)){
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
      var modelConsole = MO.Console.find(FE3dModelConsole);
      if(space){
         RStage.unregister(space);
         modelConsole.free(space);
      }
      space = o._activeSpace = modelConsole.allocByGuid(o, guid);
      if(!space._linked){
         MO.Console.find(FDuiDesktopConsole).showLoading();
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
      o = MO.Class.inherits(this, o, FDuiToolBar);
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
      o.__base.FDuiToolBar.onBuilded.call(o, p);
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
      o.__base.FDuiToolBar.construct.call(o);
   }
   MO.FDsModelCanvasToolBar_dispose = function FDsModelCanvasToolBar_dispose(){
      var o = this;
      o.__base.FDuiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsModelCatalogContent = function FDsModelCatalogContent(o){
      o = MO.Class.inherits(this, o, FDsCatalog);
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
      if(MO.Class.isClass(s, FDisplay)){
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
      if(MO.Class.isClass(s, FDrawable)){
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
      if(MO.Class.isClass(s, FDisplay)){
         var s = o._displays;
         for(var i = s.count() - 1; i >= 0; i--){
            var n = s.get(i);
            var d = n.dataPropertyGet('linker');
            d._visible = true;
            n.cell('view').setIcon(o._iconView);
         }
      }
      if(MO.Class.isClass(s, FDrawable)){
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
      if(MO.Class.isClass(p, FDsSceneRenderable)){
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
      o = MO.Class.inherits(this, o, FDuiToolBar);
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
      o.__base.FDuiToolBar.onBuilded.call(o, p);
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
      if(MO.Class.isClass(linker, FDisplayLayer)){
         layer = linker;
      }else if(MO.Class.isClass(linker, FE3dSprite)){
         layer = linker.findParent(FDisplayLayer);
         sprite = linker;
      }else{
         return alert('请选中显示层或者精灵节点。');
      }
      var frameSet = o._frameSet;
      var dialog = MO.Console.find(FDuiWindowConsole).find(FDsCommonSpriteDialog);
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
      MO.Console.find(FDuiDesktopConsole).hide();
   }
   MO.FDsModelCatalogToolBar_onCopyExecute = function FDsModelCatalogToolBar_onCopyExecute(event){
      var o = this;
      if(event.resultCd != EResult.Success){
         return;
      }
      var space = o._frameSet._activeSpace;
      var spaceGuid = space.resource().guid();
      MO.Console.find(FDuiDesktopConsole).showUploading();
      var connection = MO.Console.find(FDrSceneConsole).copyNode(spaceGuid, o._activeGuid);
      connection.addLoadListener(o, o.onDeleteLoad);
   }
   MO.FDsModelCatalogToolBar_onCopyClick = function FDsModelCatalogToolBar_onCopyClick(event){
      var o = this;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return MO.Console.find(FDuiMessageConsole).showInfo('请选中节点后，再点击操作。');
      }
      o._activeNodeGuid = node.guid();
      var sprite = null;
      var linker = node.dataPropertyGet('linker');
      if(MO.Class.isClass(linker, FE3dSprite)){
         sprite = linker;
         o._activeGuid = linker.resource().guid();
      }else{
         return alert('不能复制当前选中的节点.');
      }
      var resource = sprite.resource();
      var parentResource = resource.parent();
      var displayResource = resource.clone();
      parentResource.pushDisplay(displayResource);
      var display = MO.Console.find(FE3dInstanceConsole).create(EE3dInstance.SceneDisplay);
      display.linkGraphicContext(sprite);
      display.loadResource(displayResource);
      MO.Console.find(FE3dSceneConsole).loadDisplay(display);
      var parent = sprite.parent();
      parent.pushDisplay(display);
   }
   MO.FDsModelCatalogToolBar_onDeleteLoad = function FDsModelCatalogToolBar_onDeleteLoad(event){
      var o = this;
      MO.Console.find(FDuiDesktopConsole).hide();
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
      MO.Console.find(FDuiDesktopConsole).showUploading();
      var connection = MO.Console.find(FDrSceneConsole).deleteNode(spaceGuid, o._activeGuid);
      connection.addLoadListener(o, o.onDeleteLoad);
   }
   MO.FDsModelCatalogToolBar_onDeleteClick = function FDsModelCatalogToolBar_onDeleteClick(event){
      var o = this;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return MO.Console.find(FDuiMessageConsole).showInfo('请选中节点后，再点击操作。');
      }
      o._activeNodeGuid = node.guid();
      var linker = node.dataPropertyGet('linker');
      if(MO.Class.isClass(linker, FE3dSprite)){
         o._activeGuid = linker.resource().guid();
      }else{
         return alert('不能删除当前选中的节点.');
      }
      var dialog = MO.Console.find(FDuiMessageConsole).showConfirm('请确认是否删除当前节点？');
      dialog.addResultListener(o, o.onDeleteExecute);
   }
   MO.FDsModelCatalogToolBar_onFolderOpenClick = function FDsModelCatalogToolBar_onFolderOpenClick(event){
   }
   MO.FDsModelCatalogToolBar_onFolderCloseClick = function FDsModelCatalogToolBar_onFolderCloseClick(event){
   }
   MO.FDsModelCatalogToolBar_construct = function FDsModelCatalogToolBar_construct(){
      var o = this;
      o.__base.FDuiToolBar.construct.call(o);
   }
   MO.FDsModelCatalogToolBar_dispose = function FDsModelCatalogToolBar_dispose(){
      var o = this;
      o.__base.FDuiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsModelFrameSet = function FDsModelFrameSet(o){
      o = MO.Class.inherits(this, o, FDsFrameSet);
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
      if(MO.Class.isClass(select, FE3dSpace)){
         var frame = o.findPropertyFrame(EDsFrame.CommonSpacePropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(MO.Class.isClass(select, FG3dTechnique)){
         var frame = o.findPropertyFrame(EDsFrame.CommonTechniquePropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(MO.Class.isClass(select, FE3dRegion)){
         var frame = o.findPropertyFrame(EDsFrame.CommonRegionPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(MO.Class.isClass(select, FE3dCamera)){
         var frame = o.findPropertyFrame(EDsFrame.CommonCameraPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(MO.Class.isClass(select, FG3dLight)){
         var frame = o.findPropertyFrame(EDsFrame.CommonLightPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(MO.Class.isClass(select, FE3dModelDisplay)){
         var frame = o.findPropertyFrame(EDsFrame.CommonDisplayPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(MO.Class.isClass(select, FG3dMaterial)){
         var frame = o.findPropertyFrame(EDsFrame.CommonMaterialPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(MO.Class.isClass(select, FE3dModelRenderable)){
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
      o = MO.Class.inherits(this, o, FDuiMenuBar);
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
      MO.Console.find(FDuiDesktopConsole).hide();
   }
   MO.FDsModelMenuBar_onSaveClick = function FDsModelMenuBar_onSaveClick(p){
      var o = this;
      var space = o._frameSet._activeSpace;
      var resource = space.resource();
      MO.Console.find(FDuiDesktopConsole).showUploading();
      var xconfig = new TXmlNode();
      resource.saveConfig(xconfig);
      var connection = MO.Console.find(FDrModelConsole).update(xconfig);
      connection.addLoadListener(o, o.onSaveLoad);
   }
   MO.FDsModelMenuBar_onCaptureLoad = function FDsModelMenuBar_onCaptureLoad(event){
      MO.Console.find(FDuiDesktopConsole).hide();
   }
   MO.FDsModelMenuBar_onCaptureClick = function FDsModelMenuBar_onCaptureClick(event){
      var o = this;
      MO.Console.find(FDuiDesktopConsole).showUploading();
      var connection = o._frameSet._canvasContent.capture();
      connection.addLoadListener(o, o.onCaptureLoad);
   }
   MO.FDsModelMenuBar_construct = function FDsModelMenuBar_construct(){
      var o = this;
      o.__base.FDuiMenuBar.construct.call(o);
   }
   MO.FDsModelMenuBar_dispose = function FDsModelMenuBar_dispose(){
      var o = this;
      o.__base.FDuiMenuBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsModelWorkspace = function FDsModelWorkspace(o){
      o = MO.Class.inherits(this, o, FDuiWorkspace);
      o._frameName            = 'design3d.mesh.Workspace';
      o._styleWorkspaceGround = MO.Class.register(o, new AStyle('_styleWorkspaceGround', 'Workspace_Ground'));
      o._styleToolbarGround   = MO.Class.register(o, new AStyle('_styleToolbarGround', 'Toolbar_Ground'));
      o._styleBodyGround      = MO.Class.register(o, new AStyle('_styleBodyGround', 'Body_Ground'));
      o._styleStatusbarGround = MO.Class.register(o, new AStyle('_styleStatusbarGround', 'Statusbar_Ground'));
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
      o.__base.FDuiWorkspace.onBuilded.call(o, p);
      var frame = o._frameToolBar = o.searchControl('toolbarFrame');
      frame._hPanel.className = o.styleName('Toolbar_Ground');
      var frame = o._frameBody = o.searchControl('bodyFrame');
      frame._hPanel.className = o.styleName('Body_Ground');
      var frame = o._frameStatusBar = o.searchControl('statusFrame');
      frame._hPanel.className = o.styleName('Statusbar_Ground');
      var menuBar = o._menuBar = MO.Class.create(FDsModelMenuBar);
      menuBar._workspace = o;
      menuBar.buildDefine(p);
      o._frameToolBar.push(menuBar);
      var frameSet = o._frameSet = MO.Class.create(FDsModelFrameSet);
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
   MO.FDsModelWorkspace_construct = function FDsModelWorkspace_construct(){
      var o = this;
      o.__base.FDuiWorkspace.construct.call(o);
      o._propertyFrames = new TDictionary();
   }
   MO.FDsModelWorkspace_findPropertyFrame = function FDsModelWorkspace_findPropertyFrame(p){
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
   MO.FDsModelWorkspace_loadByGuid = function FDsModelWorkspace_loadByGuid(guid){
      this._frameSet.loadByGuid(guid);
   }
   MO.FDsModelWorkspace_loadByCode = function FDsModelWorkspace_loadByCode(code){
      this._frameSet.loadByCode(code);
   }
   MO.FDsModelWorkspace_dispose = function FDsModelWorkspace_dispose(){
      var o = this;
      o.__base.FDuiWorkspace.dispose.call(o);
      o._propertyFrames.dispose();
      o._propertyFrames = null;
   }
}
