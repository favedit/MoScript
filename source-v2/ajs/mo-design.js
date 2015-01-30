function FDsApplication(o){
   o = RClass.inherits(this, o, FObject);
   o._name             = null;
   o._matrix           = null;
   o._location         = null;
   o._rotation         = null;
   o._scale            = null;
   o._visible          = true;
   o._renderables      = null;
   o.construct         = FDsApplication_construct;
   o.isName            = FDsApplication_isName;
   o.name              = FDsApplication_name;
   o.matrix            = FDsApplication_matrix;
   o.location          = FDsApplication_location;
   o.rotation          = FDsApplication_rotation;
   o.scale             = FDsApplication_scale;
   o.hasRenderable     = FDsApplication_hasRenderable;
   o.filterRenderables = FDsApplication_filterRenderables;
   o.renderables       = FDsApplication_renderables;
   o.pushRenderable    = FDsApplication_pushRenderable;
   o.process           = FDsApplication_process;
   o.update            = FDsApplication_update;
   o.dispose           = FDsApplication_dispose;
   return o;
}
function FDsApplication_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SMatrix3d();
   o._location = new SPoint3();
   o._rotation = new SVector3();
   o._scale = new SVector3();
   o._scale.set(1, 1, 1);
}
function FDsApplication_isName(p){
   return this._name == p;
}
function FDsApplication_name(){
   return this._name;
}
function FDsApplication_matrix(){
   return this._matrix;
}
function FDsApplication_location(){
   return this._location;
}
function FDsApplication_rotation(){
   return this._rotation;
}
function FDsApplication_scale(){
   return this._scale;
}
function FDsApplication_hasRenderable(){
   var r = this._renderables;
   if(r != null){
      return !r.isEmpty();
   }
   return false;
}
function FDsApplication_filterRenderables(p){
   var o = this;
   if(!o._visible){
      return false;
   }
   var rs = o._renderables;
   if(rs != null){
      var c = rs.count();
      for(var n = 0; n < c; n++){
         var r = rs.get(n);
         if(r.testVisible()){
            p.pushRenderable(r);
         }
      }
   }
   return true;
}
function FDsApplication_renderables(){
   var o = this;
   var r = o._renderables;
   if(r == null){
      r = o._renderables = new TObjects();
   }
   return r;
}
function FDsApplication_pushRenderable(p){
   this.renderables().push(p);
}
function FDsApplication_update(){
   var o = this;
   var m = o._matrix;
   m.set(o._location, o._rotation, o._scale);
   m.update();
}
function FDsApplication_process(){
   var o = this;
   var rs = o._renderables;
   if(rs != null){
      var c = rs.count();
      for(var i = 0; i < c; i++){
         rs.get(i).process();
      }
   }
}
function FDsApplication_dispose(){
   var o = this;
   o._matrix = null;
   o._position = null;
   o._direction = null;
   o._scale = null;
   var rs = o._renderables;
   if(rs != null){
      rs.dispose();
      o._renderables = null
   }
   o.__base.FObject.dispose.call(o);
}
function FDsMainCanvas(o){
   o = RClass.inherits(this, o, FCanvas);
   o._context   = null;
   o._stage     = null;
   o._layer     = null;
   o._activeModel = null;
   o._rotationX = 0;
   o._rotationY = 0;
   o._rotationZ = 0;
   o.onBuild      = FDsMainCanvas_onBuild;
   o.onEnterFrame = FDsMainCanvas_onEnterFrame;
   o.onThemeLoad  = FDsMainCanvas_onThemeLoad;
   o.oeRefresh    = FDsMainCanvas_oeRefresh;
   o.construct    = FDsMainCanvas_construct;
   o.selectModel  = FDsMainCanvas_selectModel;
   o.dispose      = FDsMainCanvas_dispose;
   return o;
}
function FDsMainCanvas_onEnterFrame(){
   var o = this;
   var m = o._activeModel;
   if(m){
      m.location().set(0, -6.0, 0);
      m.rotation().set(0, o._rotationY, 0);
      m.scale().set(2, 2, 2);
      m.update();
      o._rotationX += 0.01;
      o._rotationY += 0.01;
      o._rotationZ += 0.03;
   }
}
function FDsMainCanvas_onThemeLoad(){
   var o = this;
   var hCanvas = o._hPanel;
   hCanvas.width = o._hParent.offsetWidth;
   hCanvas.height = o._hParent.offsetHeight;
   o._context = REngine3d.createContext(FWglContext, hCanvas);
   var g = o._stage = RClass.create(FSimpleStage3d);
   g.backgroundColor().set(0.5, 0.5, 0.5, 1);
   g.selectTechnique(o._context, FG3dGeneralTechnique);
   o._layer = o._stage.spriteLayer();
   RStage.register('stage3d', o._stage);
   var rc = o._stage.camera();
   rc.setPosition(0, 3, -20);
   rc.lookAt(0, 0, 0);
   rc.update();
   o._stage.directionalLight().direction().set(0.7, -0.7, 0);
   var rp = o._stage.camera().projection();
   rp.size().set(hCanvas.width, hCanvas.height);
   rp.update();
   RStage.lsnsEnterFrame.register(o, o.onEnterFrame);
   RStage.start();
}
function FDsMainCanvas_onBuild(p){
   var o = this;
   o.__base.FCanvas.onBuild.call(o, p);
   var tc = RConsole.find(FRs3ThemeConsole);
   var m = tc.select('color');
   m.loadListener().register(o, o.onThemeLoad);
}
function FDsMainCanvas_oeRefresh(p){
   var o = this;
   o.__base.FCanvas.oeRefresh.call(o, p);
   return EEventStatus.Stop;
}
function FDsMainCanvas_construct(){
   var o = this;
   o.__base.FCanvas.construct.call(o);
}
function FDsMainCanvas_selectModel(p){
   var o = this;
   var rmc = RConsole.find(FModel3dConsole);
   if(o._activeModel != null){
      rmc.free(o._activeModel);
   }
   var m = rmc.alloc(o._context, p);
   o._layer.pushDisplay(m);
   o._activeModel = m;
}
function FDsMainCanvas_dispose(){
   var o = this;
   o.__base.FCanvas.dispose.call(o);
}
function FDsMainCatalog(o){
   o = RClass.inherits(this, o, FDataTreeView);
   o.onBuild     = FDsMainCatalog_onBuild;
   o.onNodeClick = FDsMainCatalog_onNodeClick;
   o.construct   = FDsMainCatalog_construct;
   o.dispose     = FDsMainCatalog_dispose;
   return o;
}
function FDsMainCatalog_onBuild(p){
   var o = this;
   o.__base.FDataTreeView.onBuild.call(o, p);
   o.lsnsClick.register(o, o.onNodeClick);
}
function FDsMainCatalog_onNodeClick(t, n){
   var o = this;
   var c = o._worksapce._canvas;
   c.selectModel(n.name());
}
function FDsMainCatalog_construct(){
   var o = this;
   o.__base.FDataTreeView.construct.call(o);
}
function FDsMainCatalog_dispose(){
   var o = this;
   o.__base.FDataTreeView.dispose.call(o);
}
function FDsMainMenuBar(o){
   o = RClass.inherits(this, o, FMenuBar);
   o.onBuild   = FDsMainMenuBar_onBuild;
   o.construct = FDsMainMenuBar_construct;
   o.dispose   = FDsMainMenuBar_dispose;
   return o;
}
function FDsMainMenuBar_onBuild(p){
   var o = this;
   o.__base.FMenuBar.onBuild.call(o, p);
   var b = o._framesetMain = RClass.create(FMenuButton);
   b.setLabel('文件');
   b.setIcon('design.menu.build');
   b.build(p);
   o.appendButton(b);
   var b = o._framesetMain = RClass.create(FMenuButton);
   b.setLabel('保存');
   b.setIcon('design.menu.save');
   b.build(p);
   o.appendButton(b);
   var b = o._framesetMain = RClass.create(FMenuButton);
   b.setLabel('帮助');
   b.setIcon('design.menu.help');
   b.build(p);
   o.appendButton(b);
}
function FDsMainMenuBar_construct(){
   var o = this;
   o.__base.FMenuBar.construct.call(o);
}
function FDsMainMenuBar_dispose(){
   var o = this;
   o.__base.FMenuBar.dispose.call(o);
}
function FDsMainToolBar(o){
   o = RClass.inherits(this, o, FToolBar);
   o.onPersistenceClick   = FDsMainToolBar_onPersistenceClick;
   o.onBuild   = FDsMainToolBar_onBuild;
   o.construct = FDsMainToolBar_construct;
   o.dispose   = FDsMainToolBar_dispose;
   return o;
}
function FDsMainToolBar_onPersistenceClick(p){
   var o = this;
   var catalog = o._worksapce._catalog;
   catalog.loadUrl('/cloud.describe.tree.ws?action=query&code=resource3d.model');
}
function FDsMainToolBar_onBuild(p){
   var o = this;
   o.__base.FToolBar.onBuild.call(o, p);
   var b = o._persistenceButton  = RClass.create(FToolButton);
   b.setLabel('模型管理');
   b.build(p);
   b.lsnsClick.register(o, o.onPersistenceClick);
   o.appendButton(b);
   var b = o._framesetMain = RClass.create(FToolButton);
   b.setLabel('材质管理');
   b.build(p);
   o.appendButton(b);
   var b = o._framesetMain = RClass.create(FToolButton);
   b.setLabel('模板管理');
   b.build(p);
   o.appendButton(b);
   var b = o._framesetMain = RClass.create(FToolButton);
   b.setLabel('场景管理');
   b.build(p);
   o.appendButton(b);
}
function FDsMainToolBar_construct(){
   var o = this;
   o.__base.FToolBar.construct.call(o);
}
function FDsMainToolBar_dispose(){
   var o = this;
   o.__base.FToolBar.dispose.call(o);
}
function FDsMainWindow(o){
   o = RClass.inherits(this, o, FObject);
   o._name             = null;
   o._matrix           = null;
   o._location         = null;
   o._rotation         = null;
   o._scale            = null;
   o._visible          = true;
   o._renderables      = null;
   o.construct         = FDsMainWindow_construct;
   o.isName            = FDsMainWindow_isName;
   o.name              = FDsMainWindow_name;
   o.matrix            = FDsMainWindow_matrix;
   o.location          = FDsMainWindow_location;
   o.rotation          = FDsMainWindow_rotation;
   o.scale             = FDsMainWindow_scale;
   o.hasRenderable     = FDsMainWindow_hasRenderable;
   o.filterRenderables = FDsMainWindow_filterRenderables;
   o.renderables       = FDsMainWindow_renderables;
   o.pushRenderable    = FDsMainWindow_pushRenderable;
   o.process           = FDsMainWindow_process;
   o.update            = FDsMainWindow_update;
   o.dispose           = FDsMainWindow_dispose;
   return o;
}
function FDsMainWindow_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SMatrix3d();
   o._location = new SPoint3();
   o._rotation = new SVector3();
   o._scale = new SVector3();
   o._scale.set(1, 1, 1);
}
function FDsMainWindow_isName(p){
   return this._name == p;
}
function FDsMainWindow_name(){
   return this._name;
}
function FDsMainWindow_matrix(){
   return this._matrix;
}
function FDsMainWindow_location(){
   return this._location;
}
function FDsMainWindow_rotation(){
   return this._rotation;
}
function FDsMainWindow_scale(){
   return this._scale;
}
function FDsMainWindow_hasRenderable(){
   var r = this._renderables;
   if(r != null){
      return !r.isEmpty();
   }
   return false;
}
function FDsMainWindow_filterRenderables(p){
   var o = this;
   if(!o._visible){
      return false;
   }
   var rs = o._renderables;
   if(rs != null){
      var c = rs.count();
      for(var n = 0; n < c; n++){
         var r = rs.get(n);
         if(r.testVisible()){
            p.pushRenderable(r);
         }
      }
   }
   return true;
}
function FDsMainWindow_renderables(){
   var o = this;
   var r = o._renderables;
   if(r == null){
      r = o._renderables = new TObjects();
   }
   return r;
}
function FDsMainWindow_pushRenderable(p){
   this.renderables().push(p);
}
function FDsMainWindow_update(){
   var o = this;
   var m = o._matrix;
   m.set(o._location, o._rotation, o._scale);
   m.update();
}
function FDsMainWindow_process(){
   var o = this;
   var rs = o._renderables;
   if(rs != null){
      var c = rs.count();
      for(var i = 0; i < c; i++){
         rs.get(i).process();
      }
   }
}
function FDsMainWindow_dispose(){
   var o = this;
   o._matrix = null;
   o._position = null;
   o._direction = null;
   o._scale = null;
   var rs = o._renderables;
   if(rs != null){
      rs.dispose();
      o._renderables = null
   }
   o.__base.FObject.dispose.call(o);
}
function FDsMainWorkspace(o){
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
   o.onBuild               = FDsMainWorkspace_onBuild;
   o.construct             = FDsMainWorkspace_construct;
   o.dispose               = FDsMainWorkspace_dispose;
   return o;
}
function FDsMainWorkspace_construct(){
   var o = this;
   o.__base.FWorkspace.construct.call(o);
}
function FDsMainWorkspace_onBuild(p){
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
   var c = o._catalog = RClass.create(FDsMainCatalog);
   c._worksapce = o;
   c.build(p);
   c.setPanel(o._frameCatalog._hPanel);
   o.push(c);
   var c = o._toolbar = RClass.create(FDsMainToolBar);
   c._worksapce = o;
   c.build(p);
   c.setPanel(o._frameToolBar._hPanel);
   c._persistenceButton.click();
   o.push(c);
   var c = o._canvas = RClass.create(FDsMainCanvas);
   c._worksapce = o;
   c.build(p);
   c.setPanel(o._frameWorkspace._hPanel);
   o.push(c);
}
function FDsMainWorkspace_dispose(){
   var o = this;
   o.__base.FWorkspace.dispose.call(o);
}
var temp = 0;
var temp = 0;
var temp = 0;
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
var temp = 0;
