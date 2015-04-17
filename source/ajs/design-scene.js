function FDsSceneAnimationPropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._visible       = false;
   o._workspace     = null;
   o._animation         = null;
   o._animationResource = null;
   o._controlGuid   = null;
   o._controlCode   = null;
   o._controlLabel  = null;
   o.onBuilded      = FDsSceneAnimationPropertyFrame_onBuilded;
   o.onDataChanged  = FDsSceneAnimationPropertyFrame_onDataChanged;
   o.construct      = FDsSceneAnimationPropertyFrame_construct;
   o.loadObject     = FDsSceneAnimationPropertyFrame_loadObject;
   o.dispose        = FDsSceneAnimationPropertyFrame_dispose;
   return o;
}
function FDsSceneAnimationPropertyFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsSceneAnimationPropertyFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   o._controlCode.addDataChangedListener(o, o.onDataChanged);
   o._controlLabel.addDataChangedListener(o, o.onDataChanged);
   o._controlPlayRate.addDataChangedListener(o, o.onDataChanged);
}
function FDsSceneAnimationPropertyFrame_onDataChanged(p){
   var o = this;
   var a = o._animation;
   var r = a.resource();
   var g = r.guid();
   var d = a._display;
   var rd = d.resourceScene();
   var ra = rd.findAnimation(g);
   if(!ra){
      ra = rd.syncAnimation(g);
      ra.setCode(r.code());
      ra.setLabel(r.label());
   }
   r.setCode(o._controlCode.get());
   r.setLabel(o._controlLabel.get());
   var pr = o._controlPlayRate.get();
   ra.setPlayRate(pr);
   a._playRate = pr;
}
function FDsSceneAnimationPropertyFrame_loadObject(s, a){
   var o = this;
   var r = a.resource();
   o._animation = a;
   var d = a._display;
   var rd = d.resourceScene();
   var ra = rd.findAnimation(r.guid());
   o._controlGuid.set(r.guid());
   o._controlCode.set(r.code());
   o._controlLabel.set(r.label());
   if(ra){
      o._controlPlayRate.set(ra.playRate());
   }
}
function FDsSceneAnimationPropertyFrame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsSceneCanvas(o){
   o = RClass.inherits(this, o, FDsCanvas);
   o._rotation            = null;
   o._optionRotation      = false;
   o._capturePosition     = null;
   o._captureMatrix       = null;
   o._captureRotation     = null;
   o._dimensional         = null;
   o._selectObject        = null;
   o._selectRenderables   = null;
   o._templateMatrix      = null;
   o._templateRenderable  = null;
   o._templateFace        = null;
   o._templateTranslation = null;
   o._templateRotation    = null;
   o._templateScale       = null;
   o._templateViewScale   = 0.05;
   o.onBuild              = FDsSceneCanvas_onBuild;
   o.onMouseCaptureStart  = FDsSceneCanvas_onMouseCaptureStart;
   o.onMouseCapture       = FDsSceneCanvas_onMouseCapture;
   o.onMouseCaptureStop   = FDsSceneCanvas_onMouseCaptureStop;
   o.onDataLoaded         = FDsSceneCanvas_onDataLoaded;
   o.oeResize             = FDsSceneCanvas_oeResize;
   o.oeRefresh            = FDsSceneCanvas_oeRefresh;
   o.construct            = FDsSceneCanvas_construct;
   o.innerSelectDisplay   = FDsSceneCanvas_innerSelectDisplay;
   o.innerSelectLayer     = FDsSceneCanvas_innerSelectLayer;
   o.selectNone           = FDsSceneCanvas_selectNone;
   o.selectLayers         = FDsSceneCanvas_selectLayers;
   o.selectLayer          = FDsSceneCanvas_selectLayer;
   o.selectDisplay        = FDsSceneCanvas_selectDisplay;
   o.selectMaterial       = FDsSceneCanvas_selectMaterial;
   o.selectRenderable     = FDsSceneCanvas_selectRenderable;
   o.switchMode           = FDsSceneCanvas_switchMode;
   o.switchPlay           = FDsSceneCanvas_switchPlay;
   o.switchMovie          = FDsSceneCanvas_switchMovie;
   o.capture              = FDsSceneCanvas_capture;
   o.loadByGuid           = FDsSceneCanvas_loadByGuid;
   o.dispose              = FDsSceneCanvas_dispose;
   return o;
}
function FDsSceneCanvas_onBuild(p){
   var o = this;
   o.__base.FDsCanvas.onBuild.call(o, p);
   var c = o._graphicContext;
   var tc = RConsole.find(FE3dTemplateConsole);
}
function FDsSceneCanvas_onMouseCaptureStart(p){
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
}
function FDsSceneCanvas_onMouseCapture(p){
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
function FDsSceneCanvas_onMouseCaptureStop(p){
}
function FDsSceneCanvas_onDataLoaded(p){
   var o = this;
   var c = o._graphicContext;
   var s = o._activeSpace;
   o.processLoadListener(o);
}
function FDsSceneCanvas_oeResize(p){
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
function FDsSceneCanvas_oeRefresh(p){
   return EEventStatus.Stop;
}
function FDsSceneCanvas_construct(){
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
function FDsSceneCanvas_innerSelectDisplay(p){
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
function FDsSceneCanvas_innerSelectLayer(p){
   var o = this;
   var s = p.displays();
   var c = s.count();
   for(var i = 0; i < c; i++){
      var d = s.getAt(i);
      o.innerSelectDisplay(d)
   }
}
function FDsSceneCanvas_selectNone(){
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
function FDsSceneCanvas_selectLayers(p){
   var o = this;
   o.selectNone();
   var s = o._activeSpace.layers();
   for(var i = s.count() - 1; i >= 0; i--){
      o.innerSelectLayer(s.valueAt(i));
   }
}
function FDsSceneCanvas_selectLayer(p){
   var o = this;
   o.selectNone();
   o._selectObject = p;
   o.innerSelectLayer(p);
}
function FDsSceneCanvas_selectDisplay(p){
   var o = this;
   o.selectNone();
   o._selectObject = p;
   o.innerSelectDisplay(p);
}
function FDsSceneCanvas_selectMaterial(p){
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
function FDsSceneCanvas_selectRenderable(renderable){
   var o = this;
   var sr = renderable;
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
   if(renderable){
      renderable._optionSelected = true;
      renderable.showBoundBox();
      o._selectRenderables.push(renderable);
      o._frameSet._catalog.showObject(renderable);
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
function FDsSceneCanvas_switchMode(p){
   var o = this;
   o._canvasModeCd = p;
   o.selectRenderable(o._selectRenderable);
}
function FDsSceneCanvas_switchPlay(p){
   var o = this;
   var s = o._activeSpace;
   var ds = s.allDisplays();
   var c = ds.count();
   for(var i = 0; i < c; i++){
      var d = ds.get(i);
      if(d._movies){
         d._optionPlay = p;
      }
   }
}
function FDsSceneCanvas_switchMovie(p, f){
   var o = this;
   var s = o._activeSpace;
   var ds = s.allDisplays();
   var c = ds.count();
   for(var i = 0; i < c; i++){
      var d = ds.get(i);
      if(d._movies){
         d._optionMovie = p;
      }
   }
}
function FDsSceneCanvas_capture(){
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
   var url = '/cloud.resource.preview.wv?do=upload&type_cd=' + EE3sResource.Scene + '&guid=' + guid + '&width=' + width + '&height=' + height;
   return RConsole.find(FHttpConsole).send(url, data.buffer);
}
function FDsSceneCanvas_loadByGuid(guid){
   var o = this;
   var context = o._graphicContext;
   var space = o._activeSpace;
   var sceneConsole = RConsole.find(FE3dInstanceConsole);
   sceneConsole.register(EE3dInstance.TemplateRenderable, FDsSceneRenderable);
   sceneConsole.register(EE3dInstance.SceneLayer, FDsSceneLayer);
   sceneConsole.register(EE3dInstance.SceneDisplay, FDsSceneDisplay);
   sceneConsole.register(EE3dInstance.SceneRenderable, FDsSceneRenderable);
   var sceneConsole = RConsole.find(FE3dSceneConsole);
   if(space){
      RStage.unregister(space);
      sceneConsole.free(o._activeSpace);
   }
   var space = sceneConsole.allocByGuid(context, guid);
   space.addLoadListener(o, o.onDataLoaded);
   o._activeSpace = space;
   RStage.register('stage3d', space);
}
function FDsSceneCanvas_dispose(){
   var o = this;
   var v = o._rotation;
   if(v){
      v.dispose();
      o._rotation = null;
   }
   o.__base.FDsCanvas.dispose.call(o);
}
function FDsSceneCanvasToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   o._frameName       = 'resource.scene.CanvasToolBar';
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
   o.onBuilded        = FDsSceneCanvasToolBar_onBuilded;
   o.onModeClick      = FDsSceneCanvasToolBar_onModeClick;
   o.onLookClick      = FDsSceneCanvasToolBar_onLookClick;
   o.onPlayClick      = FDsSceneCanvasToolBar_onPlayClick;
   o.onRotationClick  = FDsSceneCanvasToolBar_onRotationClick;
   o.construct        = FDsSceneCanvasToolBar_construct;
   o.dispose          = FDsSceneCanvasToolBar_dispose;
   return o;
}
function FDsSceneCanvasToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
   var b = o._dropButton = o.searchControl('dropButton');
   b._canvasModeCd = EDsCanvasMode.Drop;
   b.addClickListener(o, o.onModeClick);
   b.check(true);
   var b = o._selectButton = o.searchControl('selectButton');
   b._canvasModeCd = EDsCanvasMode.Select;
   b.addClickListener(o, o.onModeClick);
   var b = o._translateButton = o.searchControl('translateButton');
   b._canvasModeCd = EDsCanvasMode.Translate;
   b.addClickListener(o, o.onModeClick);
   var b = o._rotationButton = o.searchControl('rotationButton');
   b._canvasModeCd = EDsCanvasMode.Rotation;
   b.addClickListener(o, o.onModeClick);
   var b = o._scaleButton = o.searchControl('scaleButton');
   b._canvasModeCd = EDsCanvasMode.Scale;
   b.addClickListener(o, o.onModeClick);
   var b = o._lookFrontButton = o.searchControl('lookFrontButton');
   b.addClickListener(o, o.onLookClick);
   var b = o._lookUpButton = o.searchControl('lookUpButton');
   b.addClickListener(o, o.onLookClick);
   var b = o._lookLeftButton = o.searchControl('lookLeftButton');
   b.addClickListener(o, o.onLookClick);
   var b = o._playButton = o.searchControl('playButton');
   b.addClickListener(o, o.onPlayClick);
   var b = o._viewButton = o.searchControl('viewButton');
   b.addClickListener(o, o.onRotationClick);
}
function FDsSceneCanvasToolBar_onModeClick(p){
   var o = this;
   o._canvasModeCd = p._canvasModeCd;
   o._frameSet._canvas.switchMode(p._canvasModeCd);
}
function FDsSceneCanvasToolBar_onLookClick(p){
   var o = this;
   o._canvasModeCd = p._canvasModeCd;
}
function FDsSceneCanvasToolBar_onPlayClick(p, v){
   var o = this;
   var c = o._frameSet._canvas;
   c.switchPlay(v);
}
function FDsSceneCanvasToolBar_onRotationClick(p, v){
   var o = this;
   var c = o._frameSet._canvas;
   c.switchMovie(v);
}
function FDsSceneCanvasToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsSceneCanvasToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsSceneCatalog(o){
   o = RClass.inherits(this, o, FDsCatalog);
   o._iconView             = 'design3d.scene.view';
   o._iconViewNot          = 'design3d.scene.viewno';
   o._displays             = null;
   o._renderables          = null;
   o._materials            = null;
   o.onBuild               = FDsSceneCatalog_onBuild;
   o.onLoadDisplay         = FDsSceneCatalog_onLoadDisplay;
   o.onNodeViewClick       = FDsSceneCatalog_onNodeViewClick;
   o.onNodeViewDoubleClick = FDsSceneCatalog_onNodeViewDoubleClick;
   o.lsnsSelect            = null;
   o.construct             = FDsSceneCatalog_construct;
   o.buildNodeView         = FDsSceneCatalog_buildNodeView;
   o.buildRenderable       = FDsSceneCatalog_buildRenderable;
   o.buildDisplay          = FDsSceneCatalog_buildDisplay;
   o.buildLayer            = FDsSceneCatalog_buildLayer;
   o.buildSpace            = FDsSceneCatalog_buildSpace;
   o.selectObject          = FDsSceneCatalog_selectObject;
   o.showObject            = FDsSceneCatalog_showObject;
   o.dispose               = FDsSceneCatalog_dispose;
   return o;
}
function FDsSceneCatalog_onBuild(p){
   var o = this;
   var c = RClass.create(FUiTreeColumn);
   c.setName('view');
   o.push(c);
   o.__base.FDsCatalog.onBuild.call(o, p);
   o.loadUrl('/cloud.describe.tree.ws?action=query&code=resource.scene');
}
function FDsSceneCatalog_onLoadDisplay(p){
   var o = this;
   var n = p._linkNode;
   o.buildRenderable(n, p);
}
function FDsSceneCatalog_onNodeViewClick(p){
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
function FDsSceneCatalog_onNodeViewDoubleClick(p){
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
function FDsSceneCatalog_construct(){
   var o = this;
   o.__base.FDsCatalog.construct.call(o);
   o._displays = new TObjects();
   o._renderables = new TObjects();
   o._materials = new TObjects();
}
function FDsSceneCatalog_buildNodeView(pn, pv){
   var o = this;
   var c = pn.cell('view');
   c.setIcon(o._iconView);
   c.addClickListener(o, o.onNodeViewClick);
   c.addDoubleClickListener(o, o.onNodeViewDoubleClick);
}
function FDsSceneCatalog_buildRenderable(n, p){
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
         o._materials.push(dn);
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
         o._renderables.push(dn);
         n.appendNode(dn);
      }
   }
}
function FDsSceneCatalog_buildDisplay(n, p){
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
         o._displays.push(dn);
         n.appendNode(dn);
         d.addLoadListener(o, o.onLoadDisplay);
         d._linkNode = dn;
      }
   }
}
function FDsSceneCatalog_buildLayer(n, p){
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
function FDsSceneCatalog_buildSpace(p){
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
function FDsSceneCatalog_selectObject(p){
   var o = this;
   if(p != null){
      o.processSelectedListener(p, true);
   }
}
function FDsSceneCatalog_showObject(p){
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
function FDsSceneCatalog_dispose(){
   var o = this;
   o._displays = RObject.dispose(o._displays);
   o._renderables = RObject.dispose(o._renderables);
   o._materials = RObject.dispose(o._materials);
   o.__base.FDsCatalog.dispose.call(o);
}
function FDsSceneDisplay(o){
   o = RClass.inherits(this, o, FE3dSceneDisplay);
   return o;
}
function FDsSceneDisplayFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._activeScene   = null;
   o._activeDisplay = null;
   o.onBuilded      = FDsSceneDisplayFrame_onBuilded;
   o.onDataChanged  = FDsSceneDisplayFrame_onDataChanged;
   o.construct      = FDsSceneDisplayFrame_construct;
   o.loadObject     = FDsSceneDisplayFrame_loadObject;
   o.dispose        = FDsSceneDisplayFrame_dispose;
   return o;
}
function FDsSceneDisplayFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   o._controlTranslate.addDataChangedListener(o, o.onDataChanged);
   o._controlRotation.addDataChangedListener(o, o.onDataChanged);
   o._controlScale.addDataChangedListener(o, o.onDataChanged);
}
function FDsSceneDisplayFrame_onDataChanged(p){
   var o = this;
   var d = o._activeDisplay;
   var r = o._activeResource;
   var m = r.matrix();
   var v = o._controlTranslate.get();
   m.setTranslate(v.x, v.y, v.z);
   var v = o._controlRotation.get();
   m.setRotation(v.x, v.y, v.z);
   var v = o._controlScale.get();
   m.setScale(v.x, v.y, v.z);
   m.update();
   d.matrix().assign(m);
}
function FDsSceneDisplayFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsSceneDisplayFrame_loadObject(s, d){
   var o = this;
   o._activeScene = s;
   o._activeDisplay = d;
   var c = o._activeResource = d.resourceScene();
   var m = o._activeResource.matrix();
   o._controlTranslate.set(m.tx, m.ty, m.tz);
   o._controlRotation.set(m.rx, m.ry, m.rz);
   o._controlScale.set(m.sx, m.sy, m.sz);
}
function FDsSceneDisplayFrame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsSceneDisplayPropertyFrame(o){
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
   o.onBuilded       = FDsSceneDisplayPropertyFrame_onBuilded;
   o.onDataChanged   = FDsSceneDisplayPropertyFrame_onDataChanged;
   o.construct       = FDsSceneDisplayPropertyFrame_construct;
   o.loadObject      = FDsSceneDisplayPropertyFrame_loadObject;
   o.dispose         = FDsSceneDisplayPropertyFrame_dispose;
   return o;
}
function FDsSceneDisplayPropertyFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   o._controlCode.addDataChangedListener(o, o.onDataChanged);
   o._controlLabel.addDataChangedListener(o, o.onDataChanged);
}
function FDsSceneDisplayPropertyFrame_onDataChanged(p){
   var o = this;
   var r = o._activeResource;
   r._code = o._controlCode.get();
   r._label = o._controlLabel.get();
}
function FDsSceneDisplayPropertyFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsSceneDisplayPropertyFrame_loadObject(s, d){
   var o = this;
   o._activeDisplay = d;
   var sr = s.resource();
   var dr = o._activeResource = d.resourceScene();
   o._controlGuid.set(dr.guid());
   o._controlCode.set(dr.code());
   o._controlLabel.set(dr.label());
   o._frameDisplay.loadObject(s, d);
}
function FDsSceneDisplayPropertyFrame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsSceneFrameSet(o){
   o = RClass.inherits(this, o, FUiFrameSet);
   o._frameName            = 'resource.scene.FrameSet';
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
   o.onBuilded             = FDsSceneFrameSet_onBuilded;
   o.onDataLoaded          = FDsSceneFrameSet_onDataLoaded;
   o.onCatalogSelected     = FDsSceneFrameSet_onCatalogSelected;
   o.construct             = FDsSceneFrameSet_construct;
   o.findPropertyFrame     = FDsSceneFrameSet_findPropertyFrame;
   o.loadByGuid            = FDsSceneFrameSet_loadByGuid;
   o.loadByCode            = FDsSceneFrameSet_loadByCode;
   o.dispose               = FDsSceneFrameSet_dispose;
   return o;
}
function FDsSceneFrameSet_onBuilded(p){
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
   var catalog = o._catalog = RClass.create(FDsSceneCatalog);
   catalog._frameSet = o;
   catalog._workspace = o._worksapce;
   catalog.build(p);
   catalog.addSelectedListener(o, o.onCatalogSelected);
   o._frameCatalog.push(catalog);
   var frame = o._canvasToolbarFrame = o.searchControl('canvasToolbarFrame');
   var toolbar = o._canvasToolbar = RClass.create(FDsSceneCanvasToolBar);
   toolbar._frameSet = o;
   toolbar._workspace = o._worksapce;
   toolbar.buildDefine(p);
   frame.push(toolbar);
   var frame = o._canvasFrame = o.searchControl('canvasFrame');
   var canvas = o._canvas = RClass.create(FDsSceneCanvas);
   canvas._frameSet = o;
   canvas._workspace = o._workspace;
   canvas._toolbar = o._canvasToolbar;
   canvas.addLoadListener(o, o.onDataLoaded);
   canvas._hParent = frame._hPanel;
   canvas._hParent.style.backgroundColor = '#333333';
   canvas._hParent.style.scroll = 'auto';
   canvas.build(p);
   frame.push(canvas);
}
function FDsSceneFrameSet_onDataLoaded(p){
   var o = this;
   o._activeSpace = p._activeSpace;
   o._catalog.buildSpace(o._activeSpace);
}
function FDsSceneFrameSet_onCatalogSelected(p, pc){
   var o = this;
   var s = o._activeSpace;
   var fs = o._propertyFrames;
   var c = fs.count();
   for(var i = 0; i < c; i++){
      var f = fs.value(i);
      f.hide();
   }
   if(RClass.isClass(p, FE3dScene)){
      var f = o.findPropertyFrame(EDsFrame.CommonSpacePropertyFrame);
      f.show();
      f.loadObject(s, p);
   }else if(RClass.isClass(p, FG3dTechnique)){
      var f = o.findPropertyFrame(EDsFrame.CommonTechniquePropertyFrame);
      f.show();
      f.loadObject(s, p);
   }else if(RClass.isClass(p, FE3dRegion)){
      var f = o.findPropertyFrame(EDsFrame.CommonRegionPropertyFrame);
      f.show();
      f.loadObject(s, p);
   }else if(RClass.isClass(p, FE3dCamera)){
      var f = o.findPropertyFrame(EDsFrame.CommonCameraPropertyFrame);
      f.show();
      f.loadObject(s, p);
   }else if(RClass.isClass(p, FG3dDirectionalLight)){
      var f = o.findPropertyFrame(EDsFrame.CommonLightPropertyFrame);
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
      var f = o.findPropertyFrame(EDsFrame.CommonLayerPropertyFrame);
      f.show();
      f.loadObject(s, p);
   }else if(RClass.isClass(p, FE3dSceneDisplay)){
      if(pc){
         o._canvas.selectDisplay(p);
      }
      var f = o.findPropertyFrame(EDsFrame.CommonDisplayPropertyFrame);
      f.show();
      f.loadObject(s, p);
   }else if(RClass.isClass(p, FE3dSceneMaterial)){
      if(pc){
         o._canvas.selectMaterial(p);
      }
      var f = o.findPropertyFrame(EDsFrame.CommonMaterialPropertyFrame);
      f.show();
      f.loadObject(s, p);
   }else if(RClass.isClass(p, FE3rAnimation)){
      var f = o.findPropertyFrame(EDsFrame.CommonAnimationPropertyFrame);
      f.show();
      f.loadObject(s, p);
   }else if(RClass.isClass(p, FE3dRenderable)){
      if(pc){
         o._canvas.selectRenderable(p);
      }
      var f = o.findPropertyFrame(EDsFrame.CommonRenderablePropertyFrame);
      f.show();
      f.loadObject(s, p);
   }else{
      throw new TError('Unknown select object type. (value={1})', p);
   }
}
function FDsSceneFrameSet_construct(){
   var o = this;
   o.__base.FUiFrameSet.construct.call(o);
   o._propertyFrames = new TDictionary();
}
function FDsSceneFrameSet_findPropertyFrame(code){
   var o = this;
   var frame = o._propertyFrames.get(code);
   if(!frame){
      frame = RConsole.find(FUiFrameConsole).get(o, code, o._frameProperty._hContainer);
      frame._frameSet = o;
      o._propertyFrames.set(code, frame);
   }
   return frame;
}
function FDsSceneFrameSet_loadByGuid(guid){
   var o = this;
   o._activeGuid = guid;
   o._canvas.loadByGuid(guid);
}
function FDsSceneFrameSet_loadByCode(p){
   var o = this;
   o._meshCode = p;
   o._canvas.loadByCode(p);
}
function FDsSceneFrameSet_dispose(){
   var o = this;
   o.__base.FUiFrameSet.dispose.call(o);
   o._propertyFrames.dispose();
   o._propertyFrames = null;
}
function FDsSceneLayer(o){
   o = RClass.inherits(this, o, FE3dSceneLayer);
   return o;
}
function FDsSceneMenuBar(o){
   o = RClass.inherits(this, o, FUiMenuBar);
   o._frameName     = 'resource.scene.MenuBar';
   o._refreshButton = null;
   o._saveButton    = null;
   o._runButton     = null;
   o.onBuilded      = FDsSceneMenuBar_onBuilded;
   o.onSaveLoad     = FDsSceneMenuBar_onSaveLoad;
   o.onSaveClick    = FDsSceneMenuBar_onSaveClick;
   o.onCaptureLoad  = FDsSceneMenuBar_onCaptureLoad;
   o.onCaptureClick = FDsSceneMenuBar_onCaptureClick;
   o.onExecuteClick = FDsSceneMenuBar_onExecuteClick;
   o.construct      = FDsSceneMenuBar_construct;
   o.dispose        = FDsSceneMenuBar_dispose;
   return o;
}
function FDsSceneMenuBar_onBuilded(p){
   var o = this;
   o.__base.FUiMenuBar.onBuilded.call(o, p);
   o._controlSave.addClickListener(o, o.onSaveClick);
   o._controlCapture.addClickListener(o, o.onCaptureClick);
   o._controlExecute.addClickListener(o, o.onExecuteClick);
}
function FDsSceneMenuBar_onSaveLoad(event){
   RConsole.find(FUiDesktopConsole).hide();
}
function FDsSceneMenuBar_onSaveClick(p){
   var o = this;
   var space = o._frameSet._activeSpace;
   var resource = space.resource();
   RConsole.find(FUiDesktopConsole).showUploading();
   var xconfig = new TXmlNode();
   resource.saveConfig(xconfig);
   var connection = RConsole.find(FDrSceneConsole).update(xconfig);
   connection.addLoadListener(o, o.onSaveLoad);
}
function FDsSceneMenuBar_onCaptureLoad(event){
   RConsole.find(FUiDesktopConsole).hide();
}
function FDsSceneMenuBar_onCaptureClick(event){
   var o = this;
   RConsole.find(FUiDesktopConsole).showUploading();
   var connection = o._frameSet._canvas.capture();
   connection.addLoadListener(o, o.onCaptureLoad);
}
function FDsSceneMenuBar_onExecuteClick(p){
   var o = this;
   var u = '../design/view.html?code=' + o._frameSet._sceneCode;
   window.location = u;
}
function FDsSceneMenuBar_construct(){
   var o = this;
   o.__base.FUiMenuBar.construct.call(o);
}
function FDsSceneMenuBar_dispose(){
   var o = this;
   o.__base.FUiMenuBar.dispose.call(o);
}
function FDsSceneRenderable(o){
   o = RClass.inherits(this, o, FE3dSceneDisplayRenderable, MDsBoundBox);
   o._optionSelected = false;
   return o;
}
function FDsSceneRenderableFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._activeScene      = null;
   o._activeRenderable = null;
   o.onBuilded         = FDsSceneRenderableFrame_onBuilded;
   o.onDataChanged     = FDsSceneRenderableFrame_onDataChanged;
   o.onEffectClick     = FDsSceneRenderableFrame_onEffectClick;
   o.construct         = FDsSceneRenderableFrame_construct;
   o.loadObject        = FDsSceneRenderableFrame_loadObject;
   o.dispose           = FDsSceneRenderableFrame_dispose;
   return o;
}
function FDsSceneRenderableFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   o._controlTranslate.addDataChangedListener(o, o.onDataChanged);
   o._controlRotation.addDataChangedListener(o, o.onDataChanged);
   o._controlScale.addDataChangedListener(o, o.onDataChanged);
   o._controlEffects.addClickListener(o, o.onEffectClick);
}
function FDsSceneRenderableFrame_onDataChanged(p){
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
function FDsSceneRenderableFrame_onEffectClick(ps, pi){
   var o = this;
   var e = pi.tag();
   var p = e._program;
   var s = p._vertexShader;
   alert(s._source);
   var s = p._fragmentShader;
   alert(s._source);
}
function FDsSceneRenderableFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsSceneRenderableFrame_loadObject(s, r){
   var o = this;
   o._activeScene = s;
   o._activeRenderable = r;
   var m = r.matrix();
   o._controlTranslate.set(m.tx, m.ty, m.tz);
   o._controlRotation.set(m.rx, m.ry, m.rz);
   o._controlScale.set(m.sx, m.sy, m.sz);
   var ces = o._controlEffects;
   ces.clear();
   var es = r.infos();
   var c = es.count();
   for(var i = 0; i < c; i++){
      var e = es.value(i).effect;
      if(e){
         var l = ces.createItem(null, e.code());
         l.setTag(e);
         ces.push(l);
      }
   }
}
function FDsSceneRenderableFrame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsSceneRenderablePropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._visible          = false;
   o._workspace        = null;
   o._activeRenderable = null;
   o._activeMaterial   = null;
   o._controlGuid      = null;
   o._controlCode      = null;
   o._controlLabel     = null;
   o._frameRenderable  = null;
   o._frameMaterial1   = null;
   o._frameMaterial2   = null;
   o.construct         = FDsSceneRenderablePropertyFrame_construct;
   o.loadObject        = FDsSceneRenderablePropertyFrame_loadObject;
   o.dispose           = FDsSceneRenderablePropertyFrame_dispose;
   return o;
}
function FDsSceneRenderablePropertyFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsSceneRenderablePropertyFrame_loadObject(s, r){
   var o = this;
   var m = r.materialReference();
   var s = r.renderable().resource();
   o._activeRenderable = r;
   o._activeMaterial = m;
   o._controlGuid.set(s.guid());
   o._controlCode.set(s.code());
   o._controlLabel.set(s.label());
   o._frameRenderable.loadObject(s, r);
   o._frameMaterial1.loadObject(s, m);
   o._frameMaterial2.loadObject(s, m);
}
function FDsSceneRenderablePropertyFrame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsSceneSpacePropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._visible        = false;
   o._frameName      = 'design3d.scene.property.SpaceFrame';
   o._workspace      = null;
   o._renderTemplate = null;
   o._controlGuid    = null;
   o._controlCode    = null;
   o._controlLabel   = null;
   o.onBuilded       = FDsSceneSpacePropertyFrame_onBuilded;
   o.construct       = FDsSceneSpacePropertyFrame_construct;
   o.loadObject      = FDsSceneSpacePropertyFrame_loadObject;
   o.dispose         = FDsSceneSpacePropertyFrame_dispose;
   return o;
}
function FDsSceneSpacePropertyFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   o._controlGuid = o.searchControl('guid');
   o._controlCode = o.searchControl('code');
   o._controlLabel = o.searchControl('label');
}
function FDsSceneSpacePropertyFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsSceneSpacePropertyFrame_loadObject(t){
   var o = this;
   var r = t._resource;
   o._renderTemplate = t;
   o._controlGuid.set(r.guid());
   o._controlCode.set(r.code());
   o._controlLabel.set(r._label);
}
function FDsSceneSpacePropertyFrame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsSceneWorkspace(o){
   o = RClass.inherits(this, o, FUiWorkspace);
   o._frameName            = 'design3d.scene.Workspace';
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
function FDsSceneWorkspace_onBuilded(p){
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
function FDsSceneWorkspace_onSceneLoad(p){
   var o = this;
   var t = o._activeScene = p._activeScene;
   o._catalog.buildScene(t);
}
function FDsSceneWorkspace_onCatalogSelected(p, pc){
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
function FDsSceneWorkspace_construct(){
   var o = this;
   o.__base.FUiWorkspace.construct.call(o);
   o._propertyFrames = new TDictionary();
}
function FDsSceneWorkspace_findPropertyFrame(p){
   var o = this;
   var frame = o._propertyFrames.get(p);
   if(!frame){
      frame = RConsole.find(FUiFrameConsole).get(o, p, o._frameProperty._hContainer);
      frame._workspace = o;
      o._propertyFrames.set(p, frame);
   }
   return frame;
}
function FDsSceneWorkspace_loadScene(p){
   var o = this;
   o._sceneCode = p;
   o._canvas.loadScene(p);
}
function FDsSceneWorkspace_dispose(){
   var o = this;
   o.__base.FUiWorkspace.dispose.call(o);
   o._propertyFrames.dispose();
   o._propertyFrames = null;
}
