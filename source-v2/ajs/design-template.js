function FDsTemplateCanvas(o){
   o = RClass.inherits(this, o, FCanvas, MListenerLoad);
   o._context        = null;
   o._stage          = null;
   o._layer          = null;
   o._activeTemplate = null;
   o._rotation       = null;
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
   o.__base.FCanvas.onBuild.call(o, p);
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
      m.location().set(0, -6.0, 0);
      m.rotation().set(0, r.y, 0);
      m.scale().set(0.1, 0.1, 0.1);
      m.update();
   }
}
function FDsTemplateCanvas_onTemplateLoad(p){
   var o = this;
   o.processLoadListener(o);
}
function FDsTemplateCanvas_oeRefresh(p){
   var o = this;
   var c = o._context;
   o.__base.FCanvas.oeRefresh.call(o, p);
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
   o.__base.FCanvas.construct.call(o);
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
   o.__base.FCanvas.dispose.call(o);
}
function FDsTemplateCatalog(o){
   o = RClass.inherits(this, o, FDataTreeView);
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
   o.__base.FDataTreeView.onBuild.call(o, p);
   o.lsnsClick.register(o, o.onNodeClick);
   o.loadUrl('/cloud.describe.tree.ws?action=query&code=design3d.template');
}
function FDsTemplateCatalog_onNodeClick(t, n){
   var o = this;
}
function FDsTemplateCatalog_construct(){
   var o = this;
   o.__base.FDataTreeView.construct.call(o);
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
   o.__base.FDataTreeView.dispose.call(o);
}
function FDsTemplateMaterialFrame(o){
   o = RClass.inherits(this, o, FForm);
   o.construct      = FDsTemplateMaterialFrame_construct;
   o.dispose        = FDsTemplateMaterialFrame_dispose;
   return o;
}
function FDsTemplateMaterialFrame_construct(){
   var o = this;
   o.__base.FForm.construct.call(o);
}
function FDsTemplateMaterialFrame_dispose(){
   var o = this;
   o.__base.FForm.dispose.call(o);
}
function FDsTemplateToolBar(o){
   o = RClass.inherits(this, o, FToolBar);
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
   o.__base.FToolBar.onBuild.call(o, p);
   var b = o._refreshButton  = RClass.create(FToolButton);
   b.setLabel('刷新');
   b.build(p);
   b.lsnsClick.register(o, o.onRefreshClick);
   o.appendButton(b);
   var b = o._saveButton = RClass.create(FToolButton);
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
   o.__base.FToolBar.construct.call(o);
}
function FDsTemplateToolBar_dispose(){
   var o = this;
   o.__base.FToolBar.dispose.call(o);
}
function FDsTemplateWorkspace(o){
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
   o.onBuild               = FDsTemplateWorkspace_onBuild;
   o.onTemplateLoad        = FDsTemplateWorkspace_onTemplateLoad;
   o.construct             = FDsTemplateWorkspace_construct;
   o.loadTemplate          = FDsTemplateWorkspace_loadTemplate;
   o.dispose               = FDsTemplateWorkspace_dispose;
   return o;
}
function FDsTemplateWorkspace_onBuild(p){
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
   var f = o._frameStatusBar = RClass.create(FFrame);
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
   var f = o._frameProperty = RClass.create(FFrame);
   f.setWidth(360);
   f.build(p);
   f._hPanel.className = o.styleName('Property_Ground');
   fs.appendFrame(f);
   fs.setPanel(o._frameBody._hPanel);
   sp1._alignCd = EAlign.Left;
   sp1._hSize = o._frameCatalog._hPanel;
   sp2._alignCd = EAlign.Right;
   sp2._hSize = o._frameStatusBar._hPanel;
   var c = o._catalog = RClass.create(FDsTemplateCatalog);
   c._worksapce = o;
   c.build(p);
   c.setPanel(o._frameCatalog._hPanel);
   o.push(c);
   var c = o._toolbar = RClass.create(FDsTemplateToolBar);
   c._worksapce = o;
   c.build(p);
   c.setPanel(o._frameToolBar._hPanel);
   o.push(c);
   var c = o._canvas = RClass.create(FDsTemplateCanvas);
   c.addLoadListener(o, o.onTemplateLoad);
   c._worksapce = o;
   c.build(p);
   c.setPanel(o._frameWorkspace._hPanel);
   o.push(c);
   var dfc = RConsole.find(FDescribeFrameConsole);
   var xframe = dfc.load('design3d.template.MaterialForm');
   var c = o._materialFrame = RClass.create(FDsTemplateMaterialFrame);
   c._worksapce = o;
   RControl.build(c, xframe, null, o._frameProperty._hPanel);
   c.setPanel(o._frameProperty._hPanel);
   c._hPanel.width = '100%';
}
function FDsTemplateWorkspace_onTemplateLoad(p){
   var o = this;
   o._catalog.buildTemplate(p._activeTemplate);
}
function FDsTemplateWorkspace_construct(){
   var o = this;
   o.__base.FWorkspace.construct.call(o);
}
function FDsTemplateWorkspace_loadTemplate(p){
   var o = this;
   o._canvas.loadTemplate(p);
}
function FDsTemplateWorkspace_dispose(){
   var o = this;
   o.__base.FWorkspace.dispose.call(o);
}
