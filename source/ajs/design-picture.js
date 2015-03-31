function FDsPictureCanvas(o){
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
   o.onBuild              = FDsPictureCanvas_onBuild;
   o.onMouseCaptureStart  = FDsPictureCanvas_onMouseCaptureStart;
   o.onMouseCapture       = FDsPictureCanvas_onMouseCapture;
   o.onMouseCaptureStop   = FDsPictureCanvas_onMouseCaptureStop;
   o.onEnterFrame         = FDsPictureCanvas_onEnterFrame;
   o.onMeshLoad           = FDsPictureCanvas_onMeshLoad;
   o.oeResize             = FDsPictureCanvas_oeResize;
   o.oeRefresh            = FDsPictureCanvas_oeRefresh;
   o.construct            = FDsPictureCanvas_construct;
   o.innerSelectDisplay   = FDsPictureCanvas_innerSelectDisplay;
   o.innerSelectLayer     = FDsPictureCanvas_innerSelectLayer;
   o.selectNone           = FDsPictureCanvas_selectNone;
   o.selectDisplay        = FDsPictureCanvas_selectDisplay;
   o.selectMaterial       = FDsPictureCanvas_selectMaterial;
   o.selectRenderable     = FDsPictureCanvas_selectRenderable;
   o.switchRotation       = FDsPictureCanvas_switchRotation;
   o.reloadRegion         = FDsPictureCanvas_reloadRegion;
   o.capture              = FDsPictureCanvas_capture;
   o.loadMeshByGuid       = FDsPictureCanvas_loadMeshByGuid;
   o.loadMeshByCode       = FDsPictureCanvas_loadMeshByCode;
   o.dispose              = FDsPictureCanvas_dispose;
   return o;
}
function FDsPictureCanvas_onBuild(p){
   var o = this;
   o.__base.FDsCanvas.onBuild.call(o, p);
}
function FDsPictureCanvas_onMouseCaptureStart(p){
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
function FDsPictureCanvas_onMouseCapture(p){
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
function FDsPictureCanvas_onMouseCaptureStop(p){
   var o = this;
   RHtml.cursorSet(o._hPanel, EUiCursor.Auto);
}
function FDsPictureCanvas_onEnterFrame(){
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
function FDsPictureCanvas_onMeshLoad(p){
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
function FDsPictureCanvas_oeResize(p){
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
function FDsPictureCanvas_oeRefresh(p){
   return EEventStatus.Stop;
}
function FDsPictureCanvas_construct(){
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
function FDsPictureCanvas_innerSelectDisplay(p){
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
function FDsPictureCanvas_innerSelectLayer(p){
   var o = this;
   var s = p.displays();
   var c = s.count();
   for(var i = 0; i < c; i++){
      var d = s.getAt(i);
      o.innerSelectDisplay(d)
   }
}
function FDsPictureCanvas_selectNone(){
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
function FDsPictureCanvas_selectDisplay(p){
   var o = this;
   o.selectNone();
   o._selectObject = p;
   o.innerSelectDisplay(p);
}
function FDsPictureCanvas_selectMaterial(p){
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
function FDsPictureCanvas_selectRenderable(p){
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
function FDsPictureCanvas_switchMode(p){
   var o = this;
   o._canvasModeCd = p;
   o.selectRenderable(o._selectRenderable);
}
function FDsPictureCanvas_switchRotation(p){
   this._optionRotation = p;
}
function FDsPictureCanvas_reloadRegion(region){
   var o = this;
   var resource = region.resource();
   o._cameraMoveRate = resource.moveSpeed();
   o._cameraKeyRotation = resource.rotationKeySpeed();
   o._cameraMouseRotation = resource.rotationMouseSpeed();
}
function FDsPictureCanvas_capture(){
   var o = this;
   debugger;
   var c = o._graphicContext;
   var s = c.size();
   var g = c._native;
   var l = s.width * s.height;
   var data = new Uint8Array(4 * l);
   g.readPixels(0, 0, s.width, s.height, g.RGBA, g.UNSIGNED_BYTE, data);
   debugger
}
function FDsPictureCanvas_loadMeshByGuid(p){
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
function FDsPictureCanvas_loadMeshByCode(p){
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
function FDsPictureCanvas_dispose(){
   var o = this;
   o._rotation = RObject.dispose(o._rotation);
x   // 父处理
   o.__base.FDsCanvas.dispose.call(o);
}
function FDsPictureCanvasToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   o._frameName       = 'design3d.mesh.CanvasToolBar';
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
   o.onBuilded        = FDsPictureCanvasToolBar_onBuilded;
   o.onModeClick      = FDsPictureCanvasToolBar_onModeClick;
   o.onRotationClick  = FDsPictureCanvasToolBar_onRotationClick;
   o.construct        = FDsPictureCanvasToolBar_construct;
   o.dispose          = FDsPictureCanvasToolBar_dispose;
   return o;
}
function FDsPictureCanvasToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
   var b = o._dropButton = o.searchControl('dropButton');
   b._canvasModeCd = EDsCanvasMode.Drop;
   b.addClickListener(o, o.onModeClick);
   b.check(true);
   var b = o._viewButton = o.searchControl('viewButton');
   b.addClickListener(o, o.onRotationClick);
}
function FDsPictureCanvasToolBar_onModeClick(p){
   var o = this;
   o._canvasModeCd = p._canvasModeCd;
   o._workspace._canvas.switchMode(p._canvasModeCd);
}
function FDsPictureCanvasToolBar_onRotationClick(p, v){
   var o = this;
   var c = o._workspace._canvas;
   c.switchRotation(v);
}
function FDsPictureCanvasToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsPictureCanvasToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsPictureCatalog(o){
   o = RClass.inherits(this, o, FUiDataTreeView, MListenerSelected);
   o._iconView             = 'design3d.mesh.view';
   o._iconViewNot          = 'design3d.mesh.viewno';
   o._activeSpace          = null;
   o._materials            = null;
   o.onBuild               = FDsPictureCatalog_onBuild;
   o.onLoadDisplay         = FDsPictureCatalog_onLoadDisplay;
   o.onNodeClick           = FDsPictureCatalog_onNodeClick;
   o.onNodeViewClick       = FDsPictureCatalog_onNodeViewClick;
   o.onNodeViewDoubleClick = FDsPictureCatalog_onNodeViewDoubleClick;
   o.lsnsSelect            = null;
   o.construct             = FDsPictureCatalog_construct;
   o.buildTechnique        = FDsPictureCatalog_buildTechnique;
   o.buildRegion           = FDsPictureCatalog_buildRegion;
   o.buildRenderable       = FDsPictureCatalog_buildRenderable;
   o.buildDisplay          = FDsPictureCatalog_buildDisplay;
   o.buildSpace            = FDsPictureCatalog_buildSpace;
   o.selectObject          = FDsPictureCatalog_selectObject;
   o.showObject            = FDsPictureCatalog_showObject;
   o.dispose               = FDsPictureCatalog_dispose;
   return o;
}
function FDsPictureCatalog_onBuild(p){
   var o = this;
   o.__base.FUiDataTreeView.onBuild.call(o, p);
   o.lsnsClick.register(o, o.onNodeClick);
   o.loadUrl('/cloud.describe.tree.ws?action=query&code=design3d.mesh');
}
function FDsPictureCatalog_onLoadDisplay(p){
   var o = this;
   var n = p._linkNode;
   o.buildRenderable(n, p);
}
function FDsPictureCatalog_onNodeClick(t, n){
   var o = this;
   var s = n.dataPropertyGet('linker');
   o.selectObject(s);
}
function FDsPictureCatalog_onNodeViewClick(p){
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
function FDsPictureCatalog_onNodeViewDoubleClick(p){
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
function FDsPictureCatalog_construct(){
   var o = this;
   o.__base.FUiDataTreeView.construct.call(o);
   o._renderables = new TObjects();
   o._materials = new TObjects();
}
function FDsPictureCatalog_buildTechnique(n, p){
   var o = this;
   var nt = o.createNode();
   nt.setLabel('Technique');
   nt.setTypeCode('technique');
   nt.dataPropertySet('linker', p);
   n.appendNode(nt);
}
function FDsPictureCatalog_buildRegion(n, p){
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
function FDsPictureCatalog_buildRenderable(n, p){
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
function FDsPictureCatalog_buildDisplay(n, p){
   var o = this;
   var node = o.createNode();
   node.setTypeCode('display');
   node.setLabel('Mesh');
   node.dataPropertySet('linker', p);
   n.appendNode(node);
   o.buildRenderable(node, p);
}
function FDsPictureCatalog_buildSpace(space){
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
function FDsPictureCatalog_selectObject(p){
   var o = this;
   if(p != null){
      o.processSelectedListener(p, true);
   }
}
function FDsPictureCatalog_showObject(p){
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
function FDsPictureCatalog_dispose(){
   var o = this;
   o._displays = RObject.dispose(o._displays);
   o._renderables = RObject.dispose(o._renderables);
   o._materials = RObject.dispose(o._materials);
   o.__base.FUiDataTreeView.dispose.call(o);
}
function FDsPictureFrameSet(o){
   o = RClass.inherits(this, o, FUiFrameSet);
   o._frameName            = 'design3d.mesh.FrameSet';
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
   o.onBuilded             = FDsPictureFrameSet_onBuilded;
   o.onMeshLoad            = FDsPictureFrameSet_onMeshLoad;
   o.onCatalogSelected     = FDsPictureFrameSet_onCatalogSelected;
   o.construct             = FDsPictureFrameSet_construct;
   o.findPropertyFrame     = FDsPictureFrameSet_findPropertyFrame;
   o.loadMeshByGuid        = FDsPictureFrameSet_loadMeshByGuid;
   o.loadMeshByCode        = FDsPictureFrameSet_loadMeshByCode;
   o.dispose               = FDsPictureFrameSet_dispose;
   return o;
}
function FDsPictureFrameSet_onBuilded(p){
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
   var c = o._catalog = RClass.create(FDsMeshCatalog);
   c._workspace = o;
   c.build(p);
   c.addSelectedListener(o, o.onCatalogSelected);
   o._frameCatalog.push(c);
   var f = o._canvasToolbarFrame = o.searchControl('canvasToolbarFrame');
   var c = o._canvasToolbar = RClass.create(FDsMeshCanvasToolBar);
   c._workspace = o;
   c.buildDefine(p);
   o._canvasToolbarFrame.push(c);
   var f = o._canvasFrame = o.searchControl('canvasFrame');
   var c = o._canvas = RClass.create(FDsMeshCanvas);
   c._workspace = o;
   c._toolbar = o._canvasToolbar;
   c.addLoadListener(o, o.onMeshLoad);
   c._hParent = f._hPanel;
   c._hParent.style.backgroundColor = '#000000';
   c.build(p);
   o._canvasFrame.push(c);
}
function FDsPictureFrameSet_onMeshLoad(p){
   var o = this;
   o._activeSpace = p._activeSpace;
   o._catalog.buildSpace(o._activeSpace);
}
function FDsPictureFrameSet_onCatalogSelected(p, pc){
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
function FDsPictureFrameSet_construct(){
   var o = this;
   o.__base.FUiFrameSet.construct.call(o);
   o._propertyFrames = new TDictionary();
}
function FDsPictureFrameSet_findPropertyFrame(p){
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
function FDsPictureFrameSet_loadMeshByGuid(p){
   var o = this;
   o._meshGuid = p;
   o._canvas.loadMeshByGuid(p);
}
function FDsPictureFrameSet_loadMeshByCode(p){
   var o = this;
   o._meshCode = p;
   o._canvas.loadMeshByCode(p);
}
function FDsPictureFrameSet_dispose(){
   var o = this;
   o.__base.FUiFrameSet.dispose.call(o);
   o._propertyFrames.dispose();
   o._propertyFrames = null;
}
