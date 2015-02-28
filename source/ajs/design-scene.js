function FDsSceneCameraFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._visible          = false;
   o._workspace        = null;
   o._camera           = null;
   o._controlPosition  = null;
   o._controlDirection = null;
   o.construct         = FDsSceneCameraFrame_construct;
   o.loadObject        = FDsSceneCameraFrame_loadObject;
   o.dispose           = FDsSceneCameraFrame_dispose;
   return o;
}
function FDsSceneCameraFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsSceneCameraFrame_loadObject(s, c){
   var o = this;
   var r = c._resource;
   o._camera = c;
   o._controlPosition.set(c.position());
   o._controlDirection.set(c.direction());
}
function FDsSceneCameraFrame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsSceneCameraPropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._visible          = false;
   o._workspace        = null;
   o._camera           = null;
   o._controlGuid      = null;
   o._controlCode      = null;
   o._controlLabel     = null;
   o._controlPosition  = null;
   o._controlDirection = null;
   o.construct         = FDsSceneCameraPropertyFrame_construct;
   o.loadObject        = FDsSceneCameraPropertyFrame_loadObject;
   o.dispose           = FDsSceneCameraPropertyFrame_dispose;
   return o;
}
function FDsSceneCameraPropertyFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsSceneCameraPropertyFrame_loadObject(s, c){
   var o = this;
   var r = c._resource;
   o._camera = c;
   o._controlGuid.set(r.guid());
   o._controlCode.set(r.code());
   o._controlLabel.set(r.label());
   o._controlPosition.set(c.position());
   o._controlDirection.set(c.direction());
}
function FDsSceneCameraPropertyFrame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsSceneCanvas(o){
   o = RClass.inherits(this, o, FDsCanvas);
   o._graphicContext             = null;
   o._canvasModeCd        = EDsCanvasMode.Drop;
   o._canvasMoveCd        = EDsCanvasDrag.Unknown;
   o._activeScene         = null;
   o._rotation            = null;
   o._optionRotation      = false;
   o._capturePosition     = null;
   o._captureMatrix       = null;
   o._captureRotation     = null;
   o._dimensional         = null;
   o._selectObject        = null;
   o._selectRenderables   = null;
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
   o.onEnterFrame         = FDsSceneCanvas_onEnterFrame;
   o.onSceneLoad          = FDsSceneCanvas_onSceneLoad;
   o.oeRefresh            = FDsSceneCanvas_oeRefresh;
   o.construct            = FDsSceneCanvas_construct;
   o.innerSelectDisplay   = FDsSceneCanvas_innerSelectDisplay;
   o.selectNone           = FDsSceneCanvas_selectNone;
   o.selectLayer          = FDsSceneCanvas_selectLayer;
   o.selectDisplay        = FDsSceneCanvas_selectDisplay;
   o.selectMaterial       = FDsSceneCanvas_selectMaterial;
   o.selectRenderable     = FDsSceneCanvas_selectRenderable;
   o.switchMode           = FDsSceneCanvas_switchMode;
   o.switchPlay           = FDsSceneCanvas_switchPlay;
   o.switchMovie          = FDsSceneCanvas_switchMovie;
   o.loadScene            = FDsSceneCanvas_loadScene;
   o.dispose              = FDsSceneCanvas_dispose;
   return o;
}
function FDsSceneCanvas_onBuild(p){
   var o = this;
   o.__base.FDsCanvas.onBuild.call(o, p);
   var c = o._graphicContext;
   var tc = RConsole.find(FE3dTemplateConsole);
   var t = o._templateTranslation = tc.alloc(c, 'com.design.translation');
   t._optionFace = true;
   t.hide();
   var t = o._templateRotation = tc.alloc(c, 'com.design.rotation');
   t._optionFace = true;
   t.hide();
   var t = o._templateScale = tc.alloc(c, 'com.design.scale');
   t._optionFace = true;
   t.hide();
}
function FDsSceneCanvas_onMouseCaptureStart(p){
   var o = this;
   var s = o._activeScene;
   if(!s){
      return;
   }
   var r = o._activeScene.region();
   var st = RConsole.find(FG3dTechniqueConsole).find(o._graphicContext, FG3dSelectTechnique);
   var r = st.test(r, p.offsetX, p.offsetY);
   o.selectRenderable(r);
   o._capturePosition.set(p.clientX, p.clientY);
   o._captureRotation.assign(s.camera()._rotation);
   if(r){
      var d = r.display();
      o._captureMatrix.assign(d.matrix());
   }
}
function FDsSceneCanvas_onMouseCapture(p){
   var o = this;
   var s = o._activeScene;
   if(!s){
      return;
   }
   var cx = p.clientX - o._capturePosition.x;
   var cy = p.clientY - o._capturePosition.y;
   var mc = o._canvasModeCd;
   var mv = o._canvasMoveCd;
   var cm = o._captureMatrix;
   var sm = null;
   var sr = o._selectRenderable;
   if(sr){
      var sd = sr.display();
      sm = sd.matrix();
   }
   switch(mc){
      case EDsCanvasMode.Drop:
         var c = o._activeScene.camera();
         var r = c.rotation();
         var cr = o._captureRotation;
         r.x = cr.x + cy * 0.003;
         r.y = cr.y + cx * 0.003;
         break;
      case EDsCanvasMode.Select:
         break;
      case EDsCanvasMode.Translate:
         if(sr){
            if(mv == EDsCanvasDrag.X){
               sm.tx = cm.tx + cx / 10;
            }else if(mv == EDsCanvasDrag.Y){
               sm.ty = cm.ty + -cy / 10;
            }else if(mv == EDsCanvasDrag.Z){
               sm.tz = cm.tz + cx / 10;
            }
         }
         break;
      case EDsCanvasMode.Rotation:
         if(sr){
            if(mv == EDsCanvasDrag.X){
               sm.rx = cm.rx + cx / 10;
            }else if(mv == EDsCanvasDrag.Y){
               sm.ry = cm.ry + -cy / 10;
            }else if(mv == EDsCanvasDrag.Z){
               sm.rz = cm.rz + cx / 10;
            }
         }
         break;
      case EDsCanvasMode.Scale:
         if(sr){
            if(mv == EDsCanvasDrag.X){
               sm.sx = cm.sx + cx / 10;
            }else if(mv == EDsCanvasDrag.Y){
               sm.sy = cm.sy + -cy / 10;
            }else if(mv == EDsCanvasDrag.Z){
               sm.sz = cm.sz + cx / 10;
            }else if(mv == EDsCanvasDrag.All){
               sm.sx = cm.sx + cx / 10;
               sm.sy = cm.sy + cx / 10;
               sm.sz = cm.sz + cx / 10;
            }
         }
         break;
   }
   if(sm){
      sm.updateForce();
      if(o._templateFace){
         var tm = o._templateFace.matrix();
         tm.assign(sm);
         tm.setScaleAll(o._templateViewScale);
         tm.update();
      }
   }
}
function FDsSceneCanvas_onMouseCaptureStop(p){
}
function FDsSceneCanvas_onEnterFrame(){
   var o = this;
   var s = o._activeScene;
   if(!s){
      return;
   }
   var c = s.camera();
   var d = 0.5;
   var r = 0.05;
   var kw = RKeyboard.isPress(EKeyCode.W);
   var ks = RKeyboard.isPress(EKeyCode.S);
   if(kw && !ks){
      c.doWalk(d);
   }
   if(!kw && ks){
      c.doWalk(-d);
   }
   var ka = RKeyboard.isPress(EKeyCode.A);
   var kd = RKeyboard.isPress(EKeyCode.D);
   if(ka && !kd){
      c.doYaw(r);
   }
   if(!ka && kd){
      c.doYaw(-r);
   }
   var kq = RKeyboard.isPress(EKeyCode.Q);
   var ke = RKeyboard.isPress(EKeyCode.E);
   if(kq && !ke){
      c.doFly(d);
   }
   if(!kq && ke){
      c.doFly(-d);
   }
   var kz = RKeyboard.isPress(EKeyCode.Z);
   var kw = RKeyboard.isPress(EKeyCode.X);
   if(kz && !kw){
      c.doPitch(r);
   }
   if(!kz && kw){
      c.doPitch(-r);
   }
   c.update();
   if(o._optionRotation){
      var r = o._rotation;
      var ls = s.layers();
      var c = ls.count();
      for(var i = 0; i < c; i++){
         var l = ls.value(i);
         var m = l.matrix();
         m.setRotation(0, r.y, 0);
         m.update();
      }
      r.y += 0.01;
   }
}
function FDsSceneCanvas_onSceneLoad(p){
   var o = this;
   var c = o._graphicContext;
   var s = o._activeScene;
   var l = RClass.create(FDisplayUiLayer);
   l.selectTechnique(c, FG3dControlTechnique);
   l.pushDisplay(o._templateTranslation);
   l.pushDisplay(o._templateRotation);
   l.pushDisplay(o._templateScale);
   s.registerLayer('ui', l);
   o.processLoadListener(o);
}
function FDsSceneCanvas_oeRefresh(p){
   var o = this;
   var c = o._graphicContext;
   o.__base.FDsCanvas.oeRefresh.call(o, p);
   var w = o._hParent.offsetWidth;
   var h = o._hParent.offsetHeight - 6;
   var hc = o._hPanel;
   hc.width = w;
   hc.height = h;
   c.setViewport(0, 0, w, h);
   return EEventStatus.Stop;
}
function FDsSceneCanvas_construct(){
   var o = this;
   o.__base.FDsCanvas.construct.call(o);
   o._capturePosition = new SPoint2();
   o._captureMatrix = new SMatrix3d();
   o._rotation = new SVector3();
   o._captureRotation = new SVector3();
   o._selectRenderables = new TObjects();
}
function FDsSceneCanvas_innerSelectDisplay(p){
   var o = this;
   var s = p.renderables();
   var c = s.count();
   for(var i = 0; i < c; i++){
      var r = s.get(i);
      o._selectRenderables.push(r);
      r.showBoundBox();
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
function FDsSceneCanvas_selectLayer(p){
   var o = this;
   o.selectNone();
   o._selectObject = p;
   var s = p.displays();
   var c = s.count();
   for(var i = 0; i < c; i++){
      var d = s.get(i);
      o.innerSelectDisplay(d)
   }
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
         r.showBoundBox();
      }
   }
}
function FDsSceneCanvas_selectRenderable(p){
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
      p.showBoundBox();
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
   var s = o._activeScene;
   var ds = s.allDisplays();
   var c = ds.count();
   for(var i = 0; i < c; i++){
      var d = ds.get(i);
      if(d._movies){
         d._optionPlay = p;
      }
   }
}
function FDsSceneCanvas_switchMovie(p){
   var o = this;
   var s = o._activeScene;
   var ds = s.allDisplays();
   var c = ds.count();
   for(var i = 0; i < c; i++){
      var d = ds.get(i);
      if(d._movies){
         d._optionMovie = p;
      }
   }
}
function FDsSceneCanvas_loadScene(p){
   var o = this;
   var c = o._graphicContext;
   var sc = RConsole.find(FE3dSceneConsole);
   if(o._activeScene != null){
      sc.free(o._activeScene);
   }
   var s = sc.alloc(o._graphicContext, p);
   s.addLoadListener(o, o.onSceneLoad);
   s.selectTechnique(c, FG3dGeneralTechnique);
   o._stage = o._activeScene = s;
   RStage.register('stage3d', s);
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
   o._frameName       = 'design3d.scene.CanvasToolBar';
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
   o._workspace._canvas.switchMode(p._canvasModeCd);
}
function FDsSceneCanvasToolBar_onLookClick(p){
   var o = this;
   o._canvasModeCd = p._canvasModeCd;
}
function FDsSceneCanvasToolBar_onPlayClick(p, v){
   var o = this;
   var c = o._workspace._canvas;
   c.switchPlay(v);
}
function FDsSceneCanvasToolBar_onRotationClick(p, v){
   var o = this;
   var c = o._workspace._canvas;
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
   o = RClass.inherits(this, o, FUiDataTreeView, MListenerSelected);
   o.onBuild         = FDsSceneCatalog_onBuild;
   o.onLoadDisplay   = FDsSceneCatalog_onLoadDisplay;
   o.onNodeClick     = FDsSceneCatalog_onNodeClick;
   o.lsnsSelect      = null;
   o.construct       = FDsSceneCatalog_construct;
   o.buildTechnique  = FDsSceneCatalog_buildTechnique;
   o.buildRegion     = FDsSceneCatalog_buildRegion;
   o.buildRenderable = FDsSceneCatalog_buildRenderable;
   o.buildDisplay    = FDsSceneCatalog_buildDisplay;
   o.buildLayer      = FDsSceneCatalog_buildLayer;
   o.buildScene      = FDsSceneCatalog_buildScene;
   o.selectObject    = FDsSceneCatalog_selectObject;
   o.dispose         = FDsSceneCatalog_dispose;
   return o;
}
function FDsSceneCatalog_onBuild(p){
   var o = this;
   o.__base.FUiDataTreeView.onBuild.call(o, p);
   o.lsnsClick.register(o, o.onNodeClick);
   o.loadUrl('/cloud.describe.tree.ws?action=query&code=design3d.scene');
}
function FDsSceneCatalog_onLoadDisplay(p){
   var o = this;
   var n = p._linkNode;
   o.buildRenderable(n, p);
}
function FDsSceneCatalog_onNodeClick(t, n){
   var o = this;
   var s = n.dataPropertyGet('linker');
   o.selectObject(s);
}
function FDsSceneCatalog_construct(){
   var o = this;
   o.__base.FUiDataTreeView.construct.call(o);
}
function FDsSceneCatalog_buildTechnique(n, p){
   var o = this;
   var nt = o.createNode();
   nt.setLabel('Technique');
   nt.setTypeName('technique');
   nt.dataPropertySet('linker', p);
   n.appendNode(nt);
}
function FDsSceneCatalog_buildRegion(n, p){
   var o = this;
   var nr = o.createNode();
   nr.setLabel('Region');
   nr.setTypeName('region');
   n.appendNode(nr);
   var nc = o.createNode();
   nc.setLabel('Camera');
   nc.setTypeName('camera');
   nc.dataPropertySet('linker', p.camera());
   nr.appendNode(nc);
   var nl = o.createNode();
   nl.setLabel('Light');
   nl.setTypeName('light');
   nl.dataPropertySet('linker', p.directionalLight());
   nr.appendNode(nl);
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
         dn.setTypeName('material');
         dn.dataPropertySet('linker', m);
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
         dn.setTypeName('renderable');
         dn.dataPropertySet('linker', r);
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
         dn.setTypeName('display');
         dn.dataPropertySet('linker', d);
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
   ns.setTypeName('layers');
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
      nl.setTypeName('layer');
      nl.dataPropertySet('linker', l);
      ns.appendNode(nl);
      o.buildDisplay(nl, l)
   }
}
function FDsSceneCatalog_buildScene(p){
   var o = this;
   var r = p._resource;
   var nr = o.createNode();
   nr.setLabel(r.code());
   nr.setNote(r.label());
   nr.setTypeName('scene');
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
      o.processSelectedListener(p)
   }
}
function FDsSceneCatalog_dispose(){
   var o = this;
   o.__base.FUiDataTreeView.dispose.call(o);
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
function FDsSceneLayer(o){
   o = RClass.inherits(this, o, FE3dSceneLayer);
   return o;
}
function FDsSceneLayerPropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._visible      = false;
   o._workspace    = null;
   o._layer        = null;
   o._controlGuid  = null;
   o._controlCode  = null;
   o._controlLabel = null;
   o.construct     = FDsSceneLayerPropertyFrame_construct;
   o.loadObject    = FDsSceneLayerPropertyFrame_loadObject;
   o.dispose       = FDsSceneLayerPropertyFrame_dispose;
   return o;
}
function FDsSceneLayerPropertyFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsSceneLayerPropertyFrame_loadObject(s, l){
   var o = this;
   var r = l.resource();
   o._layer = l;
   o._controlGuid.set(r.guid());
   o._controlCode.set(r.code());
   o._controlLabel.set(r._label);
}
function FDsSceneLayerPropertyFrame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsSceneLightPropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._visible      = false;
   o._workspace    = null;
   o._light        = null;
   o._controlGuid  = null;
   o._controlCode  = null;
   o._controlLabel = null;
   o.construct     = FDsSceneLightPropertyFrame_construct;
   o.loadObject    = FDsSceneLightPropertyFrame_loadObject;
   o.dispose       = FDsSceneLightPropertyFrame_dispose;
   return o;
}
function FDsSceneLightPropertyFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsSceneLightPropertyFrame_loadObject(s, l){
   var o = this;
   var r = l._resource;
   var rm = r.material();
   var rc = r.camera();
   o._light = l;
   o._controlGuid.set(r.guid());
   o._controlCode.set(r.code());
   o._controlLabel.set(r._label);
   o._frameCamera.loadObject(s, rc);
}
function FDsSceneLightPropertyFrame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsSceneMaterial1Frame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._scene                = null;
   o._material             = null;
   o._controlGuid          = null;
   o._controlCode          = null;
   o._controlLabel         = null;
   o._controlAmbientColor  = null;
   o._controlDiffuseColor  = null;
   o._controlSpecularColor = null;
   o._controlSpecularBase  = null;
   o._controlSpecularLevel = null;
   o._controlReflectColor  = null;
   o._controlReflectMerge  = null;
   o._controlEmissiveColor = null;
   o.onBuilded             = FDsSceneMaterial1Frame_onBuilded;
   o.onDataChanged         = FDsSceneMaterial1Frame_onDataChanged;
   o.construct             = FDsSceneMaterial1Frame_construct;
   o.loadObject            = FDsSceneMaterial1Frame_loadObject;
   o.dispose               = FDsSceneMaterial1Frame_dispose;
   return o;
}
function FDsSceneMaterial1Frame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   o._controlEffectCode.addDataChangedListener(o, o.onDataChanged);
   o._controlOptionAlpha.addDataChangedListener(o, o.onDataChanged);
   o._controlAlphaBase.addDataChangedListener(o, o.onDataChanged);
   o._controlAlphaRate.addDataChangedListener(o, o.onDataChanged);
   o._controlColorMin.addDataChangedListener(o, o.onDataChanged);
   o._controlColorMax.addDataChangedListener(o, o.onDataChanged);
   o._controlColorRate.addDataChangedListener(o, o.onDataChanged);
   o._controlColorMerge.addDataChangedListener(o, o.onDataChanged);
   o._controlAmbientColor.addDataChangedListener(o, o.onDataChanged);
   o._controlDiffuseColor.addDataChangedListener(o, o.onDataChanged);
   o._controlSpecularColor.addDataChangedListener(o, o.onDataChanged);
   o._controlSpecularBase.addDataChangedListener(o, o.onDataChanged);
   o._controlSpecularLevel.addDataChangedListener(o, o.onDataChanged);
   o._controlReflectColor.addDataChangedListener(o, o.onDataChanged);
   o._controlReflectMerge.addDataChangedListener(o, o.onDataChanged);
   o._controlEmissiveColor.addDataChangedListener(o, o.onDataChanged);
}
function FDsSceneMaterial1Frame_onDataChanged(p){
   var o = this;
   var t = o._scene;
   var m = o._material;
   var mr = m.resource();
   var mi = mr.info();
   mi.effectCode = o._controlEffectCode.get();
   mi.optionAlpha = o._controlOptionAlpha.get();
   mi.alphaBase = o._controlAlphaBase.get();
   mi.alphaRate = o._controlAlphaRate.get();
   mi.colorMin = o._controlColorMin.get();
   mi.colorMax = o._controlColorMax.get();
   mi.colorRate = o._controlColorRate.get();
   mi.colorMerge = o._controlColorMerge.get();
   var v = o._controlAmbientColor.get();
   mi.ambientColor.assign(v);
   var v = o._controlDiffuseColor.get();
   mi.diffuseColor.assign(v);
   var v = o._controlSpecularColor.get();
   mi.specularColor.assign(v);
   mi.specularBase = o._controlSpecularBase.get();
   mi.specularLevel = o._controlSpecularLevel.get();
   var v = o._controlReflectColor.get();
   mi.reflectColor.assign(v);
   var v = o._controlReflectMerge.get();
   mi.reflectMerge = v;
   var v = o._controlEmissiveColor.get();
   mi.emissiveColor.assign(v);
   m.reload();
   m._display.reloadResource();
}
function FDsSceneMaterial1Frame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsSceneMaterial1Frame_loadObject(s, m){
   var o = this;
   o._scene = s;
   o._material = m;
   var mr = m.resource();
   var mi = mr.info();
   o._controlGuid.set(mr.guid());
   o._controlCode.set(mr.code());
   o._controlLabel.set(mr.label());
   o._controlEffectCode.set(mi.effectCode);
   o._controlOptionAlpha.set(mi.optionAlpha);
   o._controlAlphaBase.set(mi.alphaBase);
   o._controlAlphaRate.set(mi.alphaRate);
   o._controlColorMin.set(mi.colorMin);
   o._controlColorMax.set(mi.colorMax);
   o._controlColorRate.set(mi.colorRate);
   o._controlColorMerge.set(mi.colorMerge);
   o._controlAmbientColor.set(mi.ambientColor);
   o._controlDiffuseColor.set(mi.diffuseColor);
   o._controlSpecularColor.set(mi.specularColor);
   o._controlSpecularBase.set(mi.specularBase);
   o._controlSpecularLevel.set(mi.specularLevel);
   o._controlReflectColor.set(mi.reflectColor);
   o._controlReflectMerge.set(mi.reflectMerge);
   o._controlEmissiveColor.set(mi.emissiveColor);
}
function FDsSceneMaterial1Frame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsSceneMaterial2Frame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._scene                    = null;
   o._material                 = null;
   o._controlGuid              = null;
   o._controlCode              = null;
   o._controlLabel             = null;
   o._controlOptionDouble      = null;
   o._controlDiffuseViewColor  = null;
   o._controlSpecularViewColor = null;
   o._controlSpecularViewBase  = null;
   o._controlSpecularViewLevel = null;
   o.onBuilded                 = FDsSceneMaterial2Frame_onBuilded;
   o.onDataChanged             = FDsSceneMaterial2Frame_onDataChanged;
   o.construct                 = FDsSceneMaterial2Frame_construct;
   o.loadObject                = FDsSceneMaterial2Frame_loadObject;
   o.dispose                   = FDsSceneMaterial2Frame_dispose;
   return o;
}
function FDsSceneMaterial2Frame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   o._controlOptionDouble.addDataChangedListener(o, o.onDataChanged);
   o._controlOptionView.addDataChangedListener(o, o.onDataChanged);
   o._controlOptionNormalInvert.addDataChangedListener(o, o.onDataChanged);
   o._controlOptionShadow.addDataChangedListener(o, o.onDataChanged);
   o._controlOptionShadowSelf.addDataChangedListener(o, o.onDataChanged);
   o._controlDiffuseViewColor.addDataChangedListener(o, o.onDataChanged);
   o._controlSpecularViewColor.addDataChangedListener(o, o.onDataChanged);
   o._controlSpecularViewBase.addDataChangedListener(o, o.onDataChanged);
   o._controlSpecularViewLevel.addDataChangedListener(o, o.onDataChanged);
}
function FDsSceneMaterial2Frame_onDataChanged(p){
   var o = this;
   var t = o._scene;
   var m = o._material;
   var mr = m.resource();
   var mi = mr.info();
   mi.optionDouble = o._controlOptionDouble.get();
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
   m.reload();
   m._display.reloadResource();
}
function FDsSceneMaterial2Frame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsSceneMaterial2Frame_loadObject(s, m){
   var o = this;
   o._scene = s;
   o._material = m;
   var mr = m.resource();
   var mi = mr.info();
   o._controlGuid.set(mr.guid());
   o._controlCode.set(mr.code());
   o._controlLabel.set(mr.label());
   o._controlOptionDouble.set(mi.optionDouble);
   o._controlOptionView.set(mi.optionView);
   o._controlOptionNormalInvert.set(mi.optionNormalInvert);
   o._controlOptionShadow.set(mi.optionShadow);
   o._controlOptionShadowSelf.set(mi.optionShadowSelf);
   o._controlDiffuseViewColor.set(mi.diffuseViewColor);
   o._controlSpecularViewColor.set(mi.specularViewColor);
   o._controlSpecularViewBase.set(mi.specularViewBase);
   o._controlSpecularViewLevel.set(mi.specularViewLevel);
}
function FDsSceneMaterial2Frame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsSceneMaterialPropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._visible        = false;
   o._workspace      = null;
   o._activeMaterial = null;
   o._controlGuid    = null;
   o._controlCode    = null;
   o._controlLabel   = null;
   o._displayFrame   = null;
   o._materialFrame1 = null;
   o._materialFrame2 = null;
   o.construct       = FDsSceneMaterialPropertyFrame_construct;
   o.loadObject      = FDsSceneMaterialPropertyFrame_loadObject;
   o.dispose         = FDsSceneMaterialPropertyFrame_dispose;
   return o;
}
function FDsSceneMaterialPropertyFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsSceneMaterialPropertyFrame_loadObject(s, m){
   var o = this;
   var r = m.resource();
   o._activeMaterial = m;
   o._controlGuid.set(r.guid());
   o._controlCode.set(r.code());
   o._controlLabel.set(r.label());
   o._frameMaterial1.loadObject(s, m);
   o._frameMaterial2.loadObject(s, m);
}
function FDsSceneMaterialPropertyFrame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsSceneMenuBar(o){
   o = RClass.inherits(this, o, FUiMenuBar);
   o._frameName     = 'design3d.scene.MenuBar';
   o._refreshButton = null;
   o._saveButton    = null;
   o._runButton     = null;
   o.onBuilded      = FDsSceneMenuBar_onBuilded;
   o.onRefreshClick = FDsSceneMenuBar_onRefreshClick;
   o.onSaveClick    = FDsSceneMenuBar_onSaveClick;
   o.onRunClick     = FDsSceneMenuBar_onRunClick;
   o.construct      = FDsSceneMenuBar_construct;
   o.dispose        = FDsSceneMenuBar_dispose;
   return o;
}
function FDsSceneMenuBar_onBuilded(p){
   var o = this;
   o.__base.FUiMenuBar.onBuilded.call(o, p);
   o._refreshButton.addClickListener(o, o.onRefreshClick);
   o._saveButton.addClickListener(o, o.onSaveClick);
   o._runButton.addClickListener(o, o.onRunClick);
}
function FDsSceneMenuBar_onRefreshClick(p){
   var o = this;
}
function FDsSceneMenuBar_onSaveClick(p){
   var o = this;
   var s = o._workspace._activeScene;
   var r = s._resource;
   var x = new TXmlNode();
   r.saveConfig(x);
   RConsole.find(FRs3SceneConsole).update(x);
}
function FDsSceneMenuBar_onRunClick(p){
   var o = this;
   var u = '../design/view.html?code=' + o._workspace._sceneCode;
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
function FDsScenePropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._visible        = false;
   o._frameName      = 'design3d.scene.property.SceneFrame';
   o._workspace      = null;
   o._renderTemplate = null;
   o._controlGuid    = null;
   o._controlCode    = null;
   o._controlLabel   = null;
   o.onBuilded       = FDsScenePropertyFrame_onBuilded;
   o.construct       = FDsScenePropertyFrame_construct;
   o.loadObject      = FDsScenePropertyFrame_loadObject;
   o.dispose         = FDsScenePropertyFrame_dispose;
   return o;
}
function FDsScenePropertyFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   o._controlGuid = o.searchControl('guid');
   o._controlCode = o.searchControl('code');
   o._controlLabel = o.searchControl('label');
}
function FDsScenePropertyFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsScenePropertyFrame_loadObject(t){
   var o = this;
   var r = t._resource;
   o._renderTemplate = t;
   o._controlGuid.set(r.guid());
   o._controlCode.set(r.code());
   o._controlLabel.set(r._label);
}
function FDsScenePropertyFrame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsSceneRenderable(o){
   o = RClass.inherits(this, o, FE3dSceneDisplayRenderable, MDsBoundBox);
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
   var e = pi._effect;
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
      var l = ces.createItem(null, e.code());
      l._effect = e;
      ces.push(l);
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
function FDsSceneTechniquePropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._visible           = false;
   o._workspace         = null;
   o._scene             = null;
   o._technique         = null;
   o._techniqueResource = null;
   o._controlGuid       = null;
   o._controlCode       = null;
   o._controlLabel      = null;
   o.onBuilded          = FDsSceneTechniquePropertyFrame_onBuilded;
   o.onDataChanged      = FDsSceneTechniquePropertyFrame_onDataChanged;
   o.onModeClick        = FDsSceneTechniquePropertyFrame_onModeClick;
   o.construct          = FDsSceneTechniquePropertyFrame_construct;
   o.loadObject         = FDsSceneTechniquePropertyFrame_loadObject;
   o.dispose            = FDsSceneTechniquePropertyFrame_dispose;
   return o;
}
function FDsSceneTechniquePropertyFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   o._controlCode.addDataChangedListener(o, o.onDataChanged);
   o._controlLabel.addDataChangedListener(o, o.onDataChanged);
   o._controlTechniqueCode.addDataChangedListener(o, o.onDataChanged);
   o._controlRenderModes.addClickListener(o, o.onModeClick);
}
function FDsSceneTechniquePropertyFrame_onDataChanged(p){
   var o = this;
   var r = o._technique;
   r._code = o._controlCode.get();
   r._label = o._controlLabel.get();
   r._techniqueCode = o._controlTechniqueCode.get();
}
function FDsSceneTechniquePropertyFrame_onModeClick(ps, pi){
   var o = this;
   var m = pi._mode;
   o._technique._activeMode = m;
   var ds = o._scene.allDisplays();
   for(var di = ds.count() - 1; di >= 0; di--){
      var d = ds.getAt(di);
      var rs = d.renderables();
      for(var ri = rs.count() - 1; ri >= 0; ri--){
         var r = rs.getAt(ri);
         r.clearInfos();
      }
   }
}
function FDsSceneTechniquePropertyFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsSceneTechniquePropertyFrame_loadObject(s, t){
   var o = this;
   var r = t._resource;
   o._scene = s;
   o._technique = t;
   o._techniqueResource = r;
   o._controlGuid.set(r.guid());
   o._controlCode.set(r.code());
   o._controlLabel.set(r.label());
   var cms = o._controlRenderModes;
   cms.clear();
   var ms = t.modes();
   var c = ms.count();
   for(var i = 0; i < c; i++){
      var m = ms.getAt(i);
      var cm = cms.createItem(null, m.code());
      cm._mode = m;
      cms.push(cm);
   }
}
function FDsSceneTechniquePropertyFrame_dispose(){
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
   f._alignCd = EAlign.Left;
   f._hSize = o._frameCatalog._hPanel;
   var f = o._propertySpliter = o.searchControl('propertySpliter');
   f._alignCd = EAlign.Right;
   f._hSize = o._frameStatusBar._hPanel;
   var c = o._toolbar = RClass.create(FDsSceneMenuBar);
   c._workspace = o;
   c.buildDefine(p);
   c.setPanel(o._frameToolBar._hPanel);
   o.push(c);
   var c = o._catalog = RClass.create(FDsSceneCatalog);
   c._workspace = o;
   c.build(p);
   c.setPanel(o._frameCatalog._hPanel);
   c.addSelectedListener(o, o.onCatalogSelected);
   o.push(c);
   var f = o._canvasToolbarFrame = o.searchControl('canvasToolbarFrame');
   var c = o._canvasToolbar = RClass.create(FDsSceneCanvasToolBar);
   c._workspace = o;
   c.buildDefine(p);
   c.setPanel(f._hPanel);
   o.push(c);
   var f = o._canvasFrame = o.searchControl('canvasFrame');
   var c = o._canvas = RClass.create(FDsSceneCanvas);
   c._workspace = o;
   c._toolbar = o._canvasToolbar;
   c.addLoadListener(o, o.onSceneLoad);
   c.build(p);
   c.setPanel(f._hPanel);
   o.push(c);
}
function FDsSceneWorkspace_onSceneLoad(p){
   var o = this;
   var t = o._activeScene = p._activeScene;
   o._catalog.buildScene(t);
}
function FDsSceneWorkspace_onCatalogSelected(p){
   var o = this;
   var s = o._activeScene;
   var fs = o._propertyFrames;
   var c = fs.count();
   for(var i = 0; i < c; i++){
      var f = fs.value(i);
      f.hide();
   }
   if(RClass.isClass(p, FE3dScene)){
      var f = o.findPropertyFrame(EDsFrame.ScenePropertyFrame);
      f.show();
      f.loadObject(s, p);
   }else if(RClass.isClass(p, FG3dTechnique)){
      var f = o.findPropertyFrame(EDsFrame.SceneTechniquePropertyFrame);
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
   }else if(RClass.isClass(p, FE3dSceneLayer)){
      o._canvas.selectLayer(p);
      var f = o.findPropertyFrame(EDsFrame.SceneLayerPropertyFrame);
      f.show();
      f.loadObject(s, p);
   }else if(RClass.isClass(p, FE3dSceneDisplay)){
      o._canvas.selectDisplay(p);
      var f = o.findPropertyFrame(EDsFrame.SceneDisplayPropertyFrame);
      f.show();
      f.loadObject(s, p);
   }else if(RClass.isClass(p, FE3dSceneMaterial)){
      o._canvas.selectMaterial(p);
      var f = o.findPropertyFrame(EDsFrame.SceneMaterialPropertyFrame);
      f.show();
      f.loadObject(s, p);
   }else if(RClass.isClass(p, FRd3Renderable)){
      o._canvas.selectRenderable(p);
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
   var sf = RConsole.find(FE3dSceneConsole).factory();
   sf.register(EE3dScene.Layer, FDsSceneLayer);
   sf.register(EE3dScene.Display, FDsSceneDisplay);
   sf.register(EE3dScene.Renderable, FDsSceneRenderable);
}
function FDsSceneWorkspace_findPropertyFrame(p){
   var o = this;
   var f = o._propertyFrames.get(p);
   if(!f){
      var fc = RConsole.find(FFrameConsole);
      f = fc.get(o, p, o._frameProperty._hPanel);
      f._workspace = o;
      o._propertyFrames.set(p, f);
   }
   return f;
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
