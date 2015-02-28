function FDsTemplateCanvas(o){
   o = RClass.inherits(this, o, FDsCanvas, MListenerLoad, MMouseCapture);
   o._toolbar            = null;
   o._context            = null;
   o._stage              = null;
   o._layer              = null;
   o._activeTemplate     = null;
   o._rotation           = null;
   o._rotationAble       = false;
   o._capturePosition    = null;
   o._captureMatrix      = null;
   o._captureRotation    = null;
   o._dimensional        = null;
   o._selectBoundBox     = null;
   o.onBuild             = FDsTemplateCanvas_onBuild;
   o.onMouseCaptureStart = FDsTemplateCanvas_onMouseCaptureStart;
   o.onMouseCapture      = FDsTemplateCanvas_onMouseCapture;
   o.onMouseCaptureStop  = FDsTemplateCanvas_onMouseCaptureStop;
   o.onEnterFrame        = FDsTemplateCanvas_onEnterFrame;
   o.onTemplateLoad      = FDsTemplateCanvas_onTemplateLoad;
   o.oeRefresh           = FDsTemplateCanvas_oeRefresh;
   o.construct           = FDsTemplateCanvas_construct;
   o.selectRenderable    = FDsTemplateCanvas_selectRenderable;
   o.loadTemplate        = FDsTemplateCanvas_loadTemplate;
   o.dispose             = FDsTemplateCanvas_dispose;
   return o;
}
function FDsTemplateCanvas_onBuild(p){
   var o = this;
   o.__base.FDsCanvas.onBuild.call(o, p);
   var g = o._stage = RClass.create(FE3dSimpleStage);
   g.backgroundColor().set(0.5, 0.5, 0.5, 1);
   g.selectTechnique(o, FG3dGeneralTechnique);
   var sl = o._layer = o._stage.spriteLayer();
   RStage.register('stage3d', o._stage);
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
   sl.pushRenderable(o._dimensional);
}
function FDsTemplateCanvas_onMouseCaptureStart(p){
   var o = this;
   var t = o._activeTemplate;
   if(!t){
      return;
   }
   var d = t.renderables().get(0);
   o._capturePosition.set(p.clientX, p.clientY);
   o._captureMatrix.assign(d.matrix());
   var c = o._stage.camera();
   o._captureRotation.assign(c._rotation);
}
function FDsTemplateCanvas_onMouseCapture(p){
   var o = this;
   var t = o._activeTemplate;
   if(!t){
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
         m.ry = cm.ry + cx * RMath.DEGREE_RATE;
         break;
      case EDsCanvasMode.Scale:
         m.sx = cm.sx + cx / 100;
         m.sy = cm.sy + cx / 100;
         m.sz = cm.sz + cx / 100;
         break;
   }
   m.updateForce();
}
function FDsTemplateCanvas_onMouseCaptureStop(p){
}
function FDsTemplateCanvas_onEnterFrame(){
   var o = this;
   var s = o._stage;
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
   var m = o._activeTemplate;
   if(m){
      var r = o._rotation;
      m.rotation().set(0, r.y, 0);
      m.update();
      if(o._rotationAble){
         r.y += 0.01;
      }
   }
}
function FDsTemplateCanvas_onTemplateLoad(p){
   var o = this;
   o.processLoadListener(o);
}
function FDsTemplateCanvas_oeRefresh(p){
   var o = this;
   var c = o._graphicContext;
   o.__base.FDsCanvas.oeRefresh.call(o, p);
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
function FDsTemplateCanvas_construct(){
   var o = this;
   o.__base.FDsCanvas.construct.call(o);
   o._capturePosition = new SPoint2();
   o._captureMatrix = new SMatrix3d();
   o._rotation = new SVector3();
   o._captureRotation = new SVector3();
}
function FDsTemplateCanvas_selectRenderable(p){
   var o = this;
   var r = p.resource();
   var rm = r.mesh();
   var rl = rm.outline();
}
function FDsTemplateCanvas_loadTemplate(p){
   var o = this;
   var rmc = RConsole.find(FE3dTemplateConsole);
   if(o._activeTemplate != null){
      rmc.free(o._activeTemplate);
   }
   var m = rmc.alloc(o._graphicContext, p);
   m.addLoadListener(o, o.onTemplateLoad);
   o._layer.pushDisplay(m);
   o._activeTemplate = m;
}
function FDsTemplateCanvas_dispose(){
   var o = this;
   var v = o._rotation;
   if(v){
      v.dispose();
      o._rotation = null;
   }
   o.__base.FDsCanvas.dispose.call(o);
}
function FDsTemplateCanvasToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   o._refreshButton  = null;
   o._saveButton     = null;
   o._canvasModeCd   = EDsCanvasMode.Drop;
   o.onBuild         = FDsTemplateCanvasToolBar_onBuild;
   o.onModeClick     = FDsTemplateCanvasToolBar_onModeClick;
   o.onLookClick     = FDsTemplateCanvasToolBar_onLookClick;
   o.onRotationClick = FDsTemplateCanvasToolBar_onRotationClick;
   o.construct       = FDsTemplateCanvasToolBar_construct;
   o.dispose         = FDsTemplateCanvasToolBar_dispose;
   return o;
}
function FDsTemplateCanvasToolBar_onBuild(p){
   var o = this;
   o.__base.FUiToolBar.onBuild.call(o, p);
   var b = o._dropButton = RClass.create(FUiToolButtonCheck);
   b.setName('dropButton');
   b.setIcon('design3d.canvas.hand');
   b.setGroupName('mode');
   b.setGroupDefault('dropButton');
   b.build(p);
   b._canvasModeCd = EDsCanvasMode.Drop;
   b.addClickListener(o, o.onModeClick);
   b.check(true);
   o.push(b);
   var b = o._selectButton = RClass.create(FUiToolButtonCheck);
   b.setName('selectButton');
   b.setIcon('design3d.canvas.pointer');
   b.setGroupName('mode');
   b.setGroupDefault('dropButton');
   b.build(p);
   b._canvasModeCd = EDsCanvasMode.Select;
   b.addClickListener(o, o.onModeClick);
   o.push(b);
   var b = RClass.create(FUiToolButtonSplit);
   b.build(p);
   o.push(b);
   var b = o._translateButton  = RClass.create(FUiToolButtonCheck);
   b.setName('translateButton');
   b.setIcon('design3d.canvas.translate');
   b.setGroupName('mode');
   b.setGroupDefault('dropButton');
   b.build(p);
   b._canvasModeCd = EDsCanvasMode.Translate;
   b.addClickListener(o, o.onModeClick);
   o.push(b);
   var b = o._rotationButton  = RClass.create(FUiToolButtonCheck);
   b.setName('rotationButton');
   b.setIcon('design3d.canvas.rotation');
   b.setGroupName('mode');
   b.setGroupDefault('dropButton');
   b.build(p);
   b._canvasModeCd = EDsCanvasMode.Rotation;
   b.addClickListener(o, o.onModeClick);
   o.push(b);
   var b = o._scaleButton  = RClass.create(FUiToolButtonCheck);
   b.setName('scaleButton');
   b.setIcon('design3d.canvas.scale');
   b.setGroupName('mode');
   b.setGroupDefault('dropButton');
   b.build(p);
   b._canvasModeCd = EDsCanvasMode.Scale;
   b.addClickListener(o, o.onModeClick);
   o.push(b);
   var b = RClass.create(FUiToolButtonSplit);
   b.build(p);
   o.push(b);
   var b = o._lookFrontButton = RClass.create(FUiToolButton);
   b.setName('lookFrontButton');
   b.setLabel('前');
   b.build(p);
   b.addClickListener(o, o.onLookClick);
   o.push(b);
   var b = o._lookUpButton = RClass.create(FUiToolButton);
   b.setName('lookUpButton');
   b.setLabel('上');
   b.build(p);
   b.addClickListener(o, o.onLookClick);
   o.push(b);
   var b = o._lookLeftButton = RClass.create(FUiToolButton);
   b.setName('lookLeftButton');
   b.setLabel('左');
   b.build(p);
   b.addClickListener(o, o.onLookClick);
   o.push(b);
   var b = RClass.create(FUiToolButtonSplit);
   b.build(p);
   o.push(b);
   var b = o._playButton  = RClass.create(FUiToolButtonCheck);
   b.setName('_playButton');
   b.setLabel('播放');
   b.setIcon('design3d.tools.play');
   b.build(p);
   b.addClickListener(o, o.onRotationClick);
   o.push(b);
   var b = o._viewButton  = RClass.create(FUiToolButtonCheck);
   b.setName('_viewButton');
   b.setLabel('旋转');
   b.setIcon('design3d.tools.rotation');
   b.build(p);
   b.addClickListener(o, o.onRotationClick);
   o.push(b);
}
function FDsTemplateCanvasToolBar_onModeClick(p){
   var o = this;
   o._canvasModeCd = p._canvasModeCd;
}
function FDsTemplateCanvasToolBar_onLookClick(p){
   var o = this;
   o._canvasModeCd = p._canvasModeCd;
}
function FDsTemplateCanvasToolBar_onRotationClick(p, v){
   var o = this;
   var c = o._workspace._canvas;
   c._rotationAble = v;
}
function FDsTemplateCanvasToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsTemplateCanvasToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsTemplateCatalog(o){
   o = RClass.inherits(this, o, FUiDataTreeView, MListenerSelected);
   o.onBuild       = FDsTemplateCatalog_onBuild;
   o.onNodeClick   = FDsTemplateCatalog_onNodeClick;
   o.lsnsSelect    = null;
   o.construct     = FDsTemplateCatalog_construct;
   o.buildTheme    = FDsTemplateCatalog_buildTheme;
   o.buildDisplay  = FDsTemplateCatalog_buildDisplay;
   o.buildTemplate = FDsTemplateCatalog_buildTemplate;
   o.selectObject  = FDsTemplateCatalog_selectObject;
   o.dispose       = FDsTemplateCatalog_dispose;
   return o;
}
function FDsTemplateCatalog_onBuild(p){
   var o = this;
   o.__base.FUiDataTreeView.onBuild.call(o, p);
   o.lsnsClick.register(o, o.onNodeClick);
   o.loadUrl('/cloud.describe.tree.ws?action=query&code=design3d.template');
}
function FDsTemplateCatalog_onNodeClick(t, n){
   var o = this;
   var s = n.dataPropertyGet('linker');
   o.selectObject(s);
}
function FDsTemplateCatalog_construct(){
   var o = this;
   o.__base.FUiDataTreeView.construct.call(o);
}
function FDsTemplateCatalog_buildTheme(pn, pt){
   var o = this;
   var n = o.createNode();
   n.setLabel(pt.code());
   n.setTypeName('theme');
   n.dataPropertySet('linker', pt);
   pn.appendNode(n);
   var s = pt.materials();
   var c = s.count();
   if(c > 0){
      var mc = RConsole.find(FRs3MaterialConsole);
      for(var i = 0; i < c; i++){
         var m = s.value(i);
         var mg = mc.findGroup(m.groupGuid());
         var mn = o.createNode();
         mn.setLabel(mg.code());
         mn.setTypeName('material');
         mn.dataPropertySet('linker', m);
         n.appendNode(mn);
      }
   }
}
function FDsTemplateCatalog_buildDisplay(pn, pt){
   var o = this;
   var n = o.createNode();
   n.setLabel(pt.code());
   n.setTypeName('theme');
   n.dataPropertySet('linker', pt);
   pn.appendNode(n);
   var s = pt.materials();
   var c = s.count();
   if(c > 0){
      var mgc = RConsole.find(FRs3MaterialGroupConsole);
      for(var i = 0; i < c; i++){
         var m = s.value(i);
         var mg = mgc.find(m.groupGuid());
         var mn = o.createNode();
         mn.setLabel(mg.code());
         mn.setTypeName('material');
         mn.dataPropertySet('linker', m);
         n.appendNode(mn);
      }
   }
}
function FDsTemplateCatalog_buildTemplate(p){
   var o = this;
   var r = p._resource;
   var nr = o.createNode();
   nr.setLabel(r.code());
   nr.setTypeName('template');
   nr.dataPropertySet('linker', p);
   o.appendNode(nr);
   var ts = r.themes();
   var c = ts.count();
   if(c > 0){
      var ns = o.createNode();
      ns.setLabel('Themes');
      ns.setTypeName('themes');
      nr.appendNode(ns);
      for(var i = 0; i < c; i++){
         o.buildTheme(ns, ts.get(i));
      }
   }
   var ds = p.renderables();
   var c = ds.count();
   if(c > 0){
      var ns = o.createNode();
      ns.setLabel('Renderables');
      ns.setTypeName('displays');
      nr.appendNode(ns);
      for(var i = 0; i < c; i++){
         var d = ds.get(i);
         var r = d.resource();
         var rd = r.model();
         var rm = r.mesh();
         var n = o.createNode();
         n.setLabel(rd.code() + ' - ' + rm.code());
         n.setTypeName('display');
         n.dataPropertySet('linker', d);
         ns.appendNode(n);
      }
   }
}
function FDsTemplateCatalog_selectObject(p){
   var o = this;
   if(p != null){
      o.processSelectedListener(p)
   }
}
function FDsTemplateCatalog_dispose(){
   var o = this;
   o.__base.FUiDataTreeView.dispose.call(o);
}
function FDsTemplateDisplayFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._renderTemplate = null;
   o._renderDisplay  = null;
   o.onBuilded       = FDsTemplateDisplayFrame_onBuilded;
   o.onDataChanged   = FDsTemplateDisplayFrame_onDataChanged;
   o.construct       = FDsTemplateDisplayFrame_construct;
   o.loadObject      = FDsTemplateDisplayFrame_loadObject;
   o.dispose         = FDsTemplateDisplayFrame_dispose;
   return o;
}
function FDsTemplateDisplayFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   var mp = o.searchControl('matrixPanel');
   var c = o._controlTranslate = mp.searchControl('translate');
   c.addDataChangedListener(o, o.onDataChanged);
   var c = o._controlRotation = mp.searchControl('rotation');
   c.addDataChangedListener(o, o.onDataChanged);
   var c = o._controlScale = mp.searchControl('scale');
   c.addDataChangedListener(o, o.onDataChanged);
}
function FDsTemplateDisplayFrame_onDataChanged(p){
   var o = this;
   var d = o._renderDisplay;
   var m = d.matrix();
   var v = o._controlTranslate.get();
   m.setTranslate(v.x, v.y, v.z);
   var v = o._controlRotation.get();
   m.setRotation(v.x, v.y, v.z);
   var v = o._controlScale.get();
   m.setScale(v.x, v.y, v.z);
   m.update();
}
function FDsTemplateDisplayFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsTemplateDisplayFrame_loadObject(t, d){
   var o = this;
   o._renderTemplate = t;
   o._renderDisplay = d;
   var m = d.matrix();
   o._controlTranslate.set(m.tx, m.ty, m.tz);
   o._controlRotation.set(m.rx, m.ry, m.rz);
   o._controlScale.set(m.sx, m.sy, m.sz);
}
function FDsTemplateDisplayFrame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsTemplateDisplayPropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._visible        = false;
   o._frameName      = 'design3d.template.property.DisplayFrame';
   o._workspace      = null;
   o._renderTemplate = null;
   o._renderDisplay  = null;
   o._renderMaterial = null;
   o._controlGuid    = null;
   o._controlCode    = null;
   o._controlLabel   = null;
   o._displayFrame   = null;
   o._materialFrame  = null;
   o.onBuilded       = FDsTemplateDisplayPropertyFrame_onBuilded;
   o.construct       = FDsTemplateDisplayPropertyFrame_construct;
   o.loadObject      = FDsTemplateDisplayPropertyFrame_loadObject;
   o.dispose         = FDsTemplateDisplayPropertyFrame_dispose;
   return o;
}
function FDsTemplateDisplayPropertyFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   o._controlGuid = o.searchControl('guid');
   o._controlCode = o.searchControl('code');
   o._controlLabel = o.searchControl('label');
   o._displayFrame = o.searchControl('design3d.template.DisplayFrame');
   o._materialFrame = o.searchControl('design3d.template.MaterialFrame');
}
function FDsTemplateDisplayPropertyFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsTemplateDisplayPropertyFrame_loadObject(t, d){
   var o = this;
   var rt = t._resource;
   var rd = d._resource;
   var rdm = rd.materials().first();
   var rtm = rt.themes().first();
   var m = rtm.materials().get(rdm.groupGuid());
   o._renderTemplate = t;
   o._renderDisplay = d;
   o._renderMaterial = m;
   o._displayFrame.loadObject(t, d);
   o._materialFrame.loadObject(t, m);
}
function FDsTemplateDisplayPropertyFrame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsTemplateMaterialFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._template             = null;
   o._material             = null;
   o._controlGuid          = null;
   o._controlCode          = null;
   o._controlLabel         = null;
   o._controlAmbientColor  = null;
   o._controlDiffuseColor  = null;
   o._controlSpecularColor = null;
   o._controlSpecularLevel = null;
   o._controlReflectColor  = null;
   o._controlReflectMerge  = null;
   o._controlEmissiveColor = null;
   o.onBuilded             = FDsTemplateMaterialFrame_onBuilded;
   o.onDataChanged         = FDsTemplateMaterialFrame_onDataChanged;
   o.construct             = FDsTemplateMaterialFrame_construct;
   o.loadObject            = FDsTemplateMaterialFrame_loadObject;
   o.dispose               = FDsTemplateMaterialFrame_dispose;
   return o;
}
function FDsTemplateMaterialFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   o._controlGuid = o.searchControl('guid');
   o._controlCode = o.searchControl('code');
   o._controlLabel = o.searchControl('label');
   var c = o._controlAmbientColor = o.searchControl('ambientColor');
   c.addDataChangedListener(o, o.onDataChanged);
   var c = o._controlDiffuseColor = o.searchControl('diffuseColor');
   c.addDataChangedListener(o, o.onDataChanged);
   var c = o._controlSpecularColor = o.searchControl('specularColor');
   c.addDataChangedListener(o, o.onDataChanged);
   var c = o._controlSpecularLevel = o.searchControl('specularLevel');
   c.addDataChangedListener(o, o.onDataChanged);
   var c = o._controlReflectColor = o.searchControl('reflectColor');
   c.addDataChangedListener(o, o.onDataChanged);
   var c = o._controlReflectMerge = o.searchControl('reflectMerge');
   c.addDataChangedListener(o, o.onDataChanged);
   var c = o._controlEmissiveColor = o.searchControl('emissiveColor');
   c.addDataChangedListener(o, o.onDataChanged);
}
function FDsTemplateMaterialFrame_onDataChanged(p){
   var o = this;
   var t = o._template;
   var m = o._material;
   var mi = m.info();
   var v = o._controlAmbientColor.get();
   mi.ambientColor.assign(v);
   var v = o._controlDiffuseColor.get();
   mi.diffuseColor.assign(v);
   var v = o._controlSpecularColor.get();
   mi.specularColor.assign(v);
   var v = o._controlSpecularLevel.get();
   mi.specularLevel = v;
   var v = o._controlReflectColor.get();
   mi.reflectColor.assign(v);
   var v = o._controlReflectMerge.get();
   mi.reflectMerge = v;
   var v = o._controlEmissiveColor.get();
   mi.emissiveColor.assign(v);
   t.reloadResource();
}
function FDsTemplateMaterialFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsTemplateMaterialFrame_loadObject(t, m){
   var o = this;
   o._template = t;
   o._material = m;
   var mp = m.group();
   var mi = m.info();
   o._controlGuid.set(m.guid());
   o._controlCode.set(mp.code());
   o._controlLabel.set(m._label);
   o._controlAmbientColor.set(mi.ambientColor);
   o._controlDiffuseColor.set(mi.diffuseColor);
   o._controlSpecularColor.set(mi.specularColor);
   o._controlSpecularLevel.set(mi.specularLevel);
   o._controlReflectColor.set(mi.reflectColor);
   o._controlReflectMerge.set(mi.reflectMerge);
   o._controlEmissiveColor.set(mi.emissiveColor);
}
function FDsTemplateMaterialFrame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsTemplateMaterialPropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._visible        = false;
   o._frameName      = 'design3d.template.property.MaterialFrame';
   o._workspace      = null;
   o._renderTemplate = null;
   o._renderMaterial = null;
   o._materialFrame  = null;
   o.onBuilded       = FDsTemplateMaterialPropertyFrame_onBuilded;
   o.construct       = FDsTemplateMaterialPropertyFrame_construct;
   o.loadObject      = FDsTemplateMaterialPropertyFrame_loadObject;
   o.dispose         = FDsTemplateMaterialPropertyFrame_dispose;
   return o;
}
function FDsTemplateMaterialPropertyFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   o._materialFrame = o.searchControl('design3d.template.MaterialFrame');
}
function FDsTemplateMaterialPropertyFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsTemplateMaterialPropertyFrame_loadObject(t, m){
   var o = this;
   o._renderTemplate = t;
   o._renderMaterial = m;
   o._materialFrame.loadObject(t, m);
}
function FDsTemplateMaterialPropertyFrame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsTemplatePropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._visible        = false;
   o._frameName      = 'design3d.template.property.TemplateFrame';
   o._workspace      = null;
   o._renderTemplate = null;
   o._controlGuid    = null;
   o._controlCode    = null;
   o._controlLabel   = null;
   o.onBuilded       = FDsTemplatePropertyFrame_onBuilded;
   o.construct       = FDsTemplatePropertyFrame_construct;
   o.loadObject      = FDsTemplatePropertyFrame_loadObject;
   o.dispose         = FDsTemplatePropertyFrame_dispose;
   return o;
}
function FDsTemplatePropertyFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   o._controlGuid = o.searchControl('guid');
   o._controlCode = o.searchControl('code');
   o._controlLabel = o.searchControl('label');
}
function FDsTemplatePropertyFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsTemplatePropertyFrame_loadObject(t){
   var o = this;
   var r = t._resource;
   o._renderTemplate = t;
   o._controlGuid.set(r.guid());
   o._controlCode.set(r.code());
   o._controlLabel.set(r._label);
}
function FDsTemplatePropertyFrame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsTemplateThemePropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._visible        = false;
   o._frameName      = 'design3d.template.property.ThemeFrame';
   o._workspace      = null;
   o._renderTemplate = null;
   o._renderTheme    = null;
   o._controlGuid    = null;
   o._controlCode    = null;
   o._controlLabel   = null;
   o.onBuilded       = FDsTemplateThemePropertyFrame_onBuilded;
   o.construct       = FDsTemplateThemePropertyFrame_construct;
   o.loadObject      = FDsTemplateThemePropertyFrame_loadObject;
   o.dispose         = FDsTemplateThemePropertyFrame_dispose;
   return o;
}
function FDsTemplateThemePropertyFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   o._controlGuid = o.searchControl('guid');
   o._controlCode = o.searchControl('code');
   o._controlLabel = o.searchControl('label');
}
function FDsTemplateThemePropertyFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsTemplateThemePropertyFrame_loadObject(t, m){
   var o = this;
   o._renderTemplate = t;
   o._renderTheme = m;
   o._controlGuid.set(m.guid());
   o._controlCode.set(m.code());
   o._controlLabel.set(m._label);
}
function FDsTemplateThemePropertyFrame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsTemplateToolBar(o){
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
function FDsTemplateToolBar_onBuild(p){
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
function FDsTemplateToolBar_onRefreshClick(p){
   var o = this;
}
function FDsTemplateToolBar_onSaveClick(p){
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
   RConsole.find(FRs3TemplateConsole).update(xr);
}
function FDsTemplateToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsTemplateToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsTemplateWorkspace(o){
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
function FDsTemplateWorkspace_onBuild(p){
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
   fs._directionCd = EDirection.Horizontal;
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
function FDsTemplateWorkspace_onTemplateLoad(p){
   var o = this;
   var t = o._activeTemplate = p._activeTemplate;
   o._catalog.buildTemplate(t);
   o.onCatalogSelected(t);
}
function FDsTemplateWorkspace_onCatalogSelected(p){
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
   }else if(RClass.isClass(p, FRs3TemplateTheme)){
      var f = o.themePropertyFrame();
      f.show();
      f.loadObject(t, p);
   }else if(RClass.isClass(p, FRs3Material)){
      var f = o.materialPropertyFrame();
      f.show();
      f.loadObject(t, p);
   }else if(RClass.isClass(p, FG3dRenderable)){
      var f = o.displayPropertyFrame();
      f.show();
      f.loadObject(t, p);
      o._canvas.selectRenderable(p);
   }else{
      throw new TError('Unknown select object type. (value={1})', p);
   }
}
function FDsTemplateWorkspace_construct(){
   var o = this;
   o.__base.FUiWorkspace.construct.call(o);
}
function FDsTemplateWorkspace_templatePropertyFrame(){
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
function FDsTemplateWorkspace_themePropertyFrame(){
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
function FDsTemplateWorkspace_materialPropertyFrame(){
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
function FDsTemplateWorkspace_displayPropertyFrame(){
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
function FDsTemplateWorkspace_loadTemplate(p){
   var o = this;
   o._canvas.loadTemplate(p);
}
function FDsTemplateWorkspace_dispose(){
   var o = this;
   o.__base.FUiWorkspace.dispose.call(o);
}
