function FDsTemplateCanvas(o){
   o = RClass.inherits(this, o, FCanvas);
   o._context   = null;
   o._stage     = null;
   o._layer     = null;
   o._activeTemplate = null;
   o._rotationX = 0;
   o._rotationY = 0;
   o._rotationZ = 0;
   o.onBuild      = FDsTemplateCanvas_onBuild;
   o.onEnterFrame = FDsTemplateCanvas_onEnterFrame;
   o.oeRefresh    = FDsTemplateCanvas_oeRefresh;
   o.construct    = FDsTemplateCanvas_construct;
   o.loadTemplate = FDsTemplateCanvas_loadTemplate;
   o.dispose      = FDsTemplateCanvas_dispose;
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
      m.location().set(0, -6.0, 0);
      m.rotation().set(0, o._rotationY, 0);
      m.scale().set(2.0, 2.0, 2.0);
      m.update();
      o._rotationX += 0.01;
      o._rotationY += 0.01;
      o._rotationZ += 0.03;
   }
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
   hc.style.width = w;
   hc.style.height = h;
   var rp = o._stage.camera().projection();
   rp.size().set(w, h);
   rp.update();
   c._size.set(w, h);
   c.setViewport(0, 0, w, h);
   c.setScissorRectangle(0, 0, w, h);
   return EEventStatus.Stop;
}
function FDsTemplateCanvas_construct(){
   var o = this;
   o.__base.FCanvas.construct.call(o);
}
function FDsTemplateCanvas_loadTemplate(p){
   var o = this;
   var rmc = RConsole.find(FTemplate3dConsole);
   if(o._activeTemplate != null){
      rmc.free(o._activeTemplate);
   }
   var m = rmc.alloc(o._context, p);
   o._layer.pushDisplay(m);
   o._activeTemplate = m;
}
function FDsTemplateCanvas_dispose(){
   var o = this;
   o.__base.FCanvas.dispose.call(o);
}
function FDsTemplateCatalog(o){
   o = RClass.inherits(this, o, FDataTreeView);
   o.onBuild     = FDsTemplateCatalog_onBuild;
   o.onNodeClick = FDsTemplateCatalog_onNodeClick;
   o.construct   = FDsTemplateCatalog_construct;
   o.dispose     = FDsTemplateCatalog_dispose;
   return o;
}
function FDsTemplateCatalog_onBuild(p){
   var o = this;
   o.__base.FDataTreeView.onBuild.call(o, p);
   o.lsnsClick.register(o, o.onNodeClick);
}
function FDsTemplateCatalog_onNodeClick(t, n){
   var o = this;
   var c = o._worksapce._canvas;
   c.selectModel(n.name());
}
function FDsTemplateCatalog_construct(){
   var o = this;
   o.__base.FDataTreeView.construct.call(o);
}
function FDsTemplateCatalog_dispose(){
   var o = this;
   o.__base.FDataTreeView.dispose.call(o);
}
function FDsTemplateToolBar(o){
   o = RClass.inherits(this, o, FToolBar);
   o.onPersistenceClick   = FDsTemplateToolBar_onPersistenceClick;
   o.onBuild   = FDsTemplateToolBar_onBuild;
   o.construct = FDsTemplateToolBar_construct;
   o.dispose   = FDsTemplateToolBar_dispose;
   return o;
}
function FDsTemplateToolBar_onPersistenceClick(p){
   var o = this;
   var catalog = o._worksapce._catalog;
   catalog.loadUrl('/cloud.describe.tree.ws?action=query&code=resource3d.model');
}
function FDsTemplateToolBar_onBuild(p){
   var o = this;
   o.__base.FToolBar.onBuild.call(o, p);
   var b = o._persistenceButton  = RClass.create(FToolButton);
   b.setLabel('刷新');
   b.build(p);
   b.lsnsClick.register(o, o.onPersistenceClick);
   o.appendButton(b);
   var b = o._framesetMain = RClass.create(FToolButton);
   b.setLabel('保存');
   b.build(p);
   o.appendButton(b);
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
   o.construct             = FDsTemplateWorkspace_construct;
   o.dispose               = FDsTemplateWorkspace_dispose;
   return o;
}
function FDsTemplateWorkspace_construct(){
   var o = this;
   o.__base.FWorkspace.construct.call(o);
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
   c._worksapce = o;
   c.build(p);
   c.setPanel(o._frameWorkspace._hPanel);
   o.push(c);
   c.loadTemplate('24219F2C47F341B8BC2CD3191DA2A02D');
}
function FDsTemplateWorkspace_dispose(){
   var o = this;
   o.__base.FWorkspace.dispose.call(o);
}
