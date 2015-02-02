function FDsTemplateCanvas(o){
   o = RClass.inherits(this, o, FUiCanvas, MListenerLoad);
   o._context        = null;
   o._stage          = null;
   o._layer          = null;
   o._activeTemplate = null;
   o._rotation       = null;
   o._rotationAble   = false;
   o.onBuild         = FDsTemplateCanvas_onBuild;
   o.onEnterFrame    = FDsTemplateCanvas_onEnterFrame;
   o.onTemplateLoad  = FDsTemplateCanvas_onTemplateLoad;
   o.oeRefresh       = FDsTemplateCanvas_oeRefresh;
   o.construct       = FDsTemplateCanvas_construct;
   o.loadTemplate    = FDsTemplateCanvas_loadTemplate;
   o.dispose         = FDsTemplateCanvas_dispose;
   return o;
}
function FDsTemplateCanvas_onBuild(p){
   var o = this;
   o.__base.FUiCanvas.onBuild.call(o, p);
   var h = o._hPanel;
   o._context = REngine3d.createContext(FWglContext, h);
   var g = o._stage = RClass.create(FSimpleStage3d);
   g.backgroundColor().set(0.5, 0.5, 0.5, 1);
   g.selectTechnique(o._context, FG3dGeneralTechnique);
   o._layer = o._stage.spriteLayer();
   RStage.register('stage3d', o._stage);
   var rc = g.camera();
   rc.setPosition(0, 3, -20);
   rc.lookAt(0, 0, 0);
   rc.update();
   var rp = rc.projection();
   rp.size().set(h.width, h.height);
   rp.update();
   var l = g.directionalLight();
   var lc = l.camera();
   lc.setPosition(10, 10, 0);
   lc.lookAt(0, 0, 0);
   lc.update();
   RStage.lsnsEnterFrame.register(o, o.onEnterFrame);
   RStage.start();
}
function FDsTemplateCanvas_onEnterFrame(){
   var o = this;
   var m = o._activeTemplate;
   if(m){
      var r = o._rotation;
      m.location().set(0, -8.0, 0);
      m.rotation().set(0, r.y, 0);
      m.scale().set(0.5, 0.5, 0.5);
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
   var c = o._context;
   o.__base.FUiCanvas.oeRefresh.call(o, p);
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
   o.__base.FUiCanvas.construct.call(o);
   o._rotation = new SVector3();
}
function FDsTemplateCanvas_loadTemplate(p){
   var o = this;
   var rmc = RConsole.find(FTemplate3dConsole);
   if(o._activeTemplate != null){
      rmc.free(o._activeTemplate);
   }
   var m = rmc.alloc(o._context, p);
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
   o.__base.FUiCanvas.dispose.call(o);
}
function FDsTemplateCanvasToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   o._refreshButton = null;
   o._saveButton    = null;
   o.onBuild        = FDsTemplateCanvasToolBar_onBuild;
   o.onRotationClick = FDsTemplateCanvasToolBar_onRotationClick;
   o.onRotationStopClick = FDsTemplateCanvasToolBar_onRotationStopClick;
   o.onSaveClick    = FDsTemplateCanvasToolBar_onSaveClick;
   o.construct      = FDsTemplateCanvasToolBar_construct;
   o.dispose        = FDsTemplateCanvasToolBar_dispose;
   return o;
}
function FDsTemplateCanvasToolBar_onBuild(p){
   var o = this;
   o.__base.FUiToolBar.onBuild.call(o, p);
   var b = o._refreshButton  = RClass.create(FUiToolButton);
   b.setLabel('旋转');
   b.build(p);
   b.lsnsClick.register(o, o.onRotationClick);
   o.appendButton(b);
   var b = o._saveButton = RClass.create(FUiToolButton);
   b.setLabel('暂停');
   b.build(p);
   b.lsnsClick.register(o, o.onRotationStopClick);
   o.appendButton(b);
   var b = o._saveButton = RClass.create(FUiToolButton);
   b.setLabel('前视角');
   b.build(p);
   b.lsnsClick.register(o, o.onSaveClick);
   o.appendButton(b);
   var b = o._saveButton = RClass.create(FUiToolButton);
   b.setLabel('上视角');
   b.build(p);
   b.lsnsClick.register(o, o.onSaveClick);
   o.appendButton(b);
   var b = o._saveButton = RClass.create(FUiToolButton);
   b.setLabel('左视角');
   b.build(p);
   b.lsnsClick.register(o, o.onSaveClick);
   o.appendButton(b);
}
function FDsTemplateCanvasToolBar_onRotationClick(p){
   var o = this;
   var c = o._workspace._canvas;
   c._rotationAble = true;
}
function FDsTemplateCanvasToolBar_onRotationStopClick(p){
   var o = this;
   var c = o._workspace._canvas;
   c._rotationAble = false;
}
function FDsTemplateCanvasToolBar_onSaveClick(p){
   var o = this;
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
   o = RClass.inherits(this, o, FUiDataTreeView);
   o.onBuild       = FDsTemplateCatalog_onBuild;
   o.onNodeClick   = FDsTemplateCatalog_onNodeClick;
   o.construct     = FDsTemplateCatalog_construct;
   o.buildTheme    = FDsTemplateCatalog_buildTheme;
   o.buildTemplate = FDsTemplateCatalog_buildTemplate;
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
   var ds = r.displays();
   var c = ds.count();
   if(c > 0){
      var ns = o.createNode();
      ns.setLabel('Displays');
      ns.setTypeName('displays');
      nr.appendNode(ns);
      for(var i = 0; i < c; i++){
         var d = ds.get(i);
         var n = o.createNode();
         n.setLabel('Sprite');
         n.setTypeName('display');
         ns.appendNode(n);
      }
   }
}
function FDsTemplateCatalog_dispose(){
   var o = this;
   o.__base.FUiDataTreeView.dispose.call(o);
}
function FDsTemplateMaterialFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._template      = null;
   o._material      = null;
   o.onBuilded      = FDsTemplateMaterialFrame_onBuilded;
   o.onDataChanged  = FDsTemplateMaterialFrame_onDataChanged;
   o.construct      = FDsTemplateMaterialFrame_construct;
   o.loadMaterial   = FDsTemplateMaterialFrame_loadMaterial;
   o.dispose        = FDsTemplateMaterialFrame_dispose;
   return o;
}
function FDsTemplateMaterialFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   o._controlGuid = o.searchControl('guid');
   o._controlCode = o.searchControl('code');
   o._controlLabel = o.searchControl('label');
   var ac = o._controlAmbientColor = o.searchControl('ambientColor');
   ac.addDataChangedListener(o, o.onDataChanged);
   var dc = o._controlDiffuseColor = o.searchControl('diffuseColor');
   dc.addDataChangedListener(o, o.onDataChanged);
   var sc = o._controlSpecularColor = o.searchControl('specularColor');
   sc.addDataChangedListener(o, o.onDataChanged);
   var sl = o._controlSpecularLevel = o.searchControl('specularLevel');
   sl.addDataChangedListener(o, o.onDataChanged);
}
function FDsTemplateMaterialFrame_onDataChanged(p){
   var o = this;
   var t = o._template;
   var m = o._material;
   var mi = m.info();
   var ac = o._controlAmbientColor.get();
   mi.ambientColor.assign(ac);
   var dc = o._controlDiffuseColor.get();
   mi.diffuseColor.assign(dc);
   var sc = o._controlSpecularColor.get();
   mi.specularColor.assign(sc);
   var sl = o._controlSpecularLevel.get();
   mi.specularLevel = sl;
   t.reloadResource();
}
function FDsTemplateMaterialFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsTemplateMaterialFrame_loadMaterial(t, m){
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
}
function FDsTemplateMaterialFrame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsTemplateMaterialPropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._workspace   = null;
   o._template    = null;
   o._material    = null;
   o.onBuilded    = FDsTemplateMaterialPropertyFrame_onBuilded;
   o.construct    = FDsTemplateMaterialPropertyFrame_construct;
   o.loadMaterial = FDsTemplateMaterialPropertyFrame_loadMaterial;
   o.dispose      = FDsTemplateMaterialPropertyFrame_dispose;
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
function FDsTemplateMaterialPropertyFrame_loadMaterial(t, m){
   var o = this;
   o._template = t;
   o._material = m;
   o._materialFrame.loadMaterial(t, m);
}
function FDsTemplateMaterialPropertyFrame_dispose(){
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
   b.build(p);
   b.lsnsClick.register(o, o.onRefreshClick);
   o.appendButton(b);
   var b = o._saveButton = RClass.create(FUiToolButton);
   b.setLabel('保存');
   b.build(p);
   b.lsnsClick.register(o, o.onSaveClick);
   o.appendButton(b);
}
function FDsTemplateToolBar_onRefreshClick(p){
   var o = this;
   var catalog = o._worksapce._catalog;
   catalog.loadUrl('/cloud.describe.tree.ws?action=query&code=resource3d.model');
}
function FDsTemplateToolBar_onSaveClick(p){
   var o = this;
   var catalog = o._worksapce._catalog;
   catalog.loadUrl('/cloud.describe.tree.ws?action=query&code=resource3d.model');
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
   o.onBuild               = FDsTemplateWorkspace_onBuild;
   o.onTemplateLoad        = FDsTemplateWorkspace_onTemplateLoad;
   o.construct             = FDsTemplateWorkspace_construct;
   o.loadTemplate          = FDsTemplateWorkspace_loadTemplate;
   o.dispose               = FDsTemplateWorkspace_dispose;
   return o;
}
function FDsTemplateWorkspace_onBuild(p){
   var o = this;
   o.__base.FUiWorkspace.onBuild.call(o, p);
   o._hPanel.style.width = '100%';
   o._hPanel.style.height = '100%';
   var fs = o._framesetMain = RClass.create(FUiFrameSet);
   fs.build(p);
   var f = o._frameToolBar = RClass.create(FUiFrameContainer);
   f.setHeight(26);
   f.build(p);
   f._hPanel.className = o.styleName('Toolbar_Ground');
   fs.appendFrame(f);
   var f = o._frameBody = RClass.create(FUiFrameContainer);
   f.build(p);
   fs.appendFrame(f);
   var f = o._frameStatusBar = RClass.create(FUiFrameContainer);
   f.setHeight(18);
   f.build(p);
   f._hPanel.className = o.styleName('Statusbar_Ground');
   fs.appendFrame(f);
   fs.setPanel(o._hPanel);
   var fs = RClass.create(FUiFrameSet);
   fs._directionCd = EDirection.Horizontal;
   fs.build(p);
   var f = o._frameCatalog = RClass.create(FUiFrameContainer);
   f.setWidth(300);
   f.build(p);
   f._hPanel.className = o.styleName('Catalog_Ground');
   fs.appendFrame(f);
   var sp1 = fs.appendSpliter();
   var f = o._frameWorkspace = RClass.create(FUiFrameContainer);
   f.build(p);
   f._hPanel.className = o.styleName('Workspace_Ground');
   fs.appendFrame(f);
   var sp2 = fs.appendSpliter();
   var f = o._frameProperty = RClass.create(FUiFrameContainer);
   f.setWidth(240);
   f.build(p);
   f._hPanel.className = o.styleName('Property_Ground');
   fs.appendFrame(f);
   fs.setPanel(o._frameBody._hPanel);
   sp1._alignCd = EAlign.Left;
   sp1._hSize = o._frameCatalog._hPanel;
   sp2._alignCd = EAlign.Right;
   sp2._hSize = o._frameStatusBar._hPanel;
   var c = o._catalog = RClass.create(FDsTemplateCatalog);
   c._workspace = o;
   c.build(p);
   c.setPanel(o._frameCatalog._hPanel);
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
   var c = o._canvas = RClass.create(FDsTemplateCanvas);
   c.addLoadListener(o, o.onTemplateLoad);
   c._workspace = o;
   c.build(p);
   c.setPanel(hc);
   o.push(c);
   var c = o._materialProperty = RClass.create(FDsTemplateMaterialPropertyFrame);
   c._workspace = o;
   c.buildDefine('design3d.template.MaterialPropertyFrame', p);
   c.setPanel(o._frameProperty._hPanel);
}
function FDsTemplateWorkspace_onTemplateLoad(p){
   var o = this;
   var t = p._activeTemplate;
   o._catalog.buildTemplate(t);
   var t = p._activeTemplate;
   var rt = t._resource;
   var rtm = rt._themes.get(0);
   var rm = rtm.materials().value(0);
   o._materialProperty.loadMaterial(t, rm);
}
function FDsTemplateWorkspace_construct(){
   var o = this;
   o.__base.FUiWorkspace.construct.call(o);
}
function FDsTemplateWorkspace_loadTemplate(p){
   var o = this;
   o._canvas.loadTemplate(p);
}
function FDsTemplateWorkspace_dispose(){
   var o = this;
   o.__base.FUiWorkspace.dispose.call(o);
}
