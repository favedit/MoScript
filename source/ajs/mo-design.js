var EDsCanvasDrag = new function EDsCanvasDrag(){
   var o = this;
   o.Unknown = 0;
   o.X       = 1;
   o.Y       = 2;
   o.Z       = 3;
   o.All     = 4;
   return o;
}
var EDsCanvasMode = new function EDsCanvasMode(){
   var o = this;
   o.Unknown   = 0;
   o.Drop      = 1;
   o.Select    = 2;
   o.Translate = 3;
   o.Rotation  = 4;
   o.Scale     = 5;
   return o;
}
var EDsFrame = new function EDsFrame(){
   var o = this;
   o.SolutionProjectPropertyFrame = 'design3d.solution.property.ProjectFrame';
   o.ResourcePropertyFrame        = 'design3d.resource.property.SpaceFrame';
   o.MeshSpacePropertyFrame       = 'design3d.mesh.property.SpaceFrame';
   o.MeshTechniquePropertyFrame   = 'design3d.mesh.property.TechniqueFrame';
   o.MeshRegionPropertyFrame      = 'design3d.mesh.property.RegionFrame';
   o.MeshCameraPropertyFrame      = 'design3d.mesh.property.CameraFrame';
   o.MeshLightPropertyFrame       = 'design3d.mesh.property.LightFrame';
   o.MeshLayerPropertyFrame       = 'design3d.mesh.property.LayerFrame';
   o.MeshDisplayPropertyFrame     = 'design3d.mesh.property.DisplayFrame';
   o.MeshMaterialPropertyFrame    = 'design3d.mesh.property.MaterialFrame';
   o.MeshRenderablePropertyFrame  = 'design3d.mesh.property.RenderableFrame';
   o.SceneSpacePropertyFrame      = 'design3d.scene.property.SpaceFrame';
   o.SceneTechniquePropertyFrame  = 'design3d.scene.property.TechniqueFrame';
   o.SceneRegionPropertyFrame     = 'design3d.scene.property.RegionFrame';
   o.SceneCameraPropertyFrame     = 'design3d.scene.property.CameraFrame';
   o.SceneLightPropertyFrame      = 'design3d.scene.property.LightFrame';
   o.SceneLayerPropertyFrame      = 'design3d.scene.property.LayerFrame';
   o.SceneDisplayPropertyFrame    = 'design3d.scene.property.DisplayFrame';
   o.SceneMaterialPropertyFrame   = 'design3d.scene.property.MaterialFrame';
   o.SceneAnimationPropertyFrame  = 'design3d.scene.property.AnimationFrame';
   o.SceneMoviePropertyFrame      = 'design3d.scene.property.MovieFrame';
   o.SceneRenderablePropertyFrame = 'design3d.scene.property.RenderableFrame';
   return o;
}
var EDsFrameSet = new function EDsFrameSet(){
   var o = this;
   o.SolutionFrameSet = 'design3d.solution.FrameSet';
   o.ProjectFrameSet  = 'design3d.project.FrameSet';
   o.ResourceFrameSet = 'design3d.resource.FrameSet';
   o.BitmapFrameSet   = 'design2d.bitmap.FrameSet';
   o.TextureFrameSet  = 'design3d.texture.FrameSet';
   o.MaterialFrameSet = 'design3d.material.FrameSet';
   o.MeshFrameSet     = 'design3d.mesh.FrameSet';
   o.ModelFrameSet    = 'design3d.model.FrameSet';
   o.TemplateFrameSet = 'design3d.template.FrameSet';
   o.SceneFrameSet    = 'design3d.scene.FrameSet';
   return o;
}
function MDsBoundBox(o){
   o = RClass.inherits(this, o);
   o._boundVisible = false;
   o._boundBox     = null;
   o.boundBox      = MDsBoundBox_boundBox;
   o.showBoundBox  = MDsBoundBox_showBoundBox;
   o.hideBoundBox  = MDsBoundBox_hideBoundBox;
   return o;
}
function MDsBoundBox_boundBox(){
   var o = this;
   var b = o._boundBox;
   if(!b){
      b = o._boundBox = RClass.create(FE3dBoundBox);
      b.linkGraphicContext(o);
      b.setup();
   }
   return b;
}
function MDsBoundBox_showBoundBox(){
   var o = this;
   var b = o.boundBox();
   b.remove();
   var r = o.resource();
   var rm = r.mesh();
   var rl = rm.outline();
   b.outline().assign(rl);
   b.upload();
   o.pushDrawable(b);
   o._boundVisible = true;
}
function MDsBoundBox_hideBoundBox(){
   var o = this;
   var b = o._boundBox;
   o.removeDrawable(b);
   o._boundVisible = false;
}
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
function FDsCanvas(o){
   o = RClass.inherits(this, o, FUiCanvas, MGraphicObject, MListenerLoad, MMouseCapture);
   o._stage              = null;
   o._rotation           = null;
   o._rotationAble       = false;
   o._capturePosition    = null;
   o._captureMatrix      = null;
   o._captureRotation    = null;
   o._dimensional        = null;
   o.onBuild             = FDsCanvas_onBuild;
   o.onMouseCaptureStart = FDsCanvas_onMouseCaptureStart;
   o.onMouseCapture      = FDsCanvas_onMouseCapture;
   o.onMouseCaptureStop  = FDsCanvas_onMouseCaptureStop;
   o.onEnterFrame        = FDsCanvas_onEnterFrame;
   o.oeResize            = FDsCanvas_oeResize;
   o.oeRefresh           = FDsCanvas_oeRefresh;
   o.construct           = FDsCanvas_construct;
   o.dispose             = FDsCanvas_dispose;
   return o;
}
function FDsCanvas_onBuild(p){
   var o = this;
   o.__base.FUiCanvas.onBuild.call(o, p);
   var h = o._hPanel;
   h.__linker = o;
   h.style.width = '100%';
   h.style.height = '100%';
   var a = new Object();
   a.alpha = false;
   a.antialias = true;
   var c = o._graphicContext = REngine3d.createContext(FWglContext, h, a);
   var dm = o._dimensional = RClass.create(FE3dDimensional);
   dm.linkGraphicContext(c);
   dm.setup();
   RStage.lsnsEnterFrame.register(o, o.onEnterFrame);
   RStage.start(1000 / 60);
   RConsole.find(FMouseConsole).register(o);
}
function FDsCanvas_onMouseCaptureStart(p){
   var o = this;
}
function FDsCanvas_onMouseCapture(p){
   var o = this;
   var s = o._activeScene;
   if(!s){
      return;
   }
   var cx = p.clientX - o._capturePosition.x;
   var cy = p.clientY - o._capturePosition.y;
   switch(o._toolbar._canvasModeCd){
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
         break;
      case EDsCanvasMode.Rotation:
         break;
      case EDsCanvasMode.Scale:
         break;
   }
}
function FDsCanvas_onMouseCaptureStop(p){
}
function FDsCanvas_onEnterFrame(){
   var o = this;
   return;
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
}
function FDsCanvas_oeResize(p){
   var o = this;
   o.__base.FUiCanvas.oeResize.call(o, p);
   var hp = o._hPanel;
   var w = hp.offsetWidth;
   var h = hp.offsetHeight - 6;
   hp.width = w;
   hp.height = h;
   o._graphicContext.setViewport(0, 0, w, h);
   return EEventStatus.Stop;
}
function FDsCanvas_oeRefresh(p){
   return EEventStatus.Stop;
}
function FDsCanvas_construct(){
   var o = this;
   o.__base.FUiCanvas.construct.call(o);
   o._capturePosition = new SPoint2();
   o._captureMatrix = new SMatrix3d();
   o._rotation = new SVector3();
   o._captureRotation = new SVector3();
}
function FDsCanvas_dispose(){
   var o = this;
   var v = o._rotation;
   if(v){
      v.dispose();
      o._rotation = null;
   }
   o.__base.FUiCanvas.dispose.call(o);
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
   var tc = RConsole.find(FE3sThemeConsole);
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
function FDrAbsResourceConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd     = EScope.Local;
   o._serviceCode = null;
   o._resources   = null;
   o.construct    = FDrAbsResourceConsole_construct;
   o.doList       = FDrAbsResourceConsole_doList;
   o.doQuery      = FDrAbsResourceConsole_doQuery;
   o.doCreate     = FDrAbsResourceConsole_doCreate;
   o.doUpdate     = FDrAbsResourceConsole_doUpdate;
   o.doDelete     = FDrAbsResourceConsole_doDelete;
   return o;
}
function FDrAbsResourceConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._resources = new TDictionary();
}
function FDrAbsResourceConsole_doList(search, order, pageSize, page){
   var o = this;
   var url = '/' + o._serviceCode + '.ws?action=list';
   if(!RString.isEmpty(search)){
      url += '&search=' + search;
   }
   if(!RString.isEmpty(order)){
      url += '&order=' + order;
   }
   if(pageSize >= 0){
      url += '&page_size=' + pageSize;
   }
   if(page >= 0){
      url += '&page=' + page;
   }
   return RConsole.find(FXmlConsole).sendAsync(url);
}
function FDrAbsResourceConsole_doQuery(guid){
   var o = this;
   var url = '/' + o._serviceCode + '.ws?action=query&guid=' + guid;
   return RConsole.find(FXmlConsole).sendAsync(url);
}
function FDrAbsResourceConsole_doCreate(resource){
   var o = this;
   var xdocument = new TXmlDocument();
   var xroot = xdocument.root();
   xroot.set('action', 'create');
   var xdata = xroot.create(resource.classCode());
   resource.saveConfig(xdata);
   return RConsole.find(FXmlConsole).sendAsync('/' + o._serviceCode + '.ws', xdocument);
}
function FDrAbsResourceConsole_doUpdate(resource){
   var o = this;
   var xdocument = new TXmlDocument();
   var xroot = xdocument.root();
   xroot.set('action', 'update');
   var xdata = xroot.create(resource.classCode());
   resource.saveConfig(xdata);
   return RConsole.find(FXmlConsole).sendAsync('/' + o._serviceCode + '.ws', xdocument);
}
function FDrAbsResourceConsole_doDelete(guid){
   var o = this;
   var url = '/' + o._serviceCode + '.ws?action=delete&guid=' + guid;
   return RConsole.find(FXmlConsole).sendAsync(url);
}
function FDrMesh(o){
   o = RClass.inherits(this, o, FDrResource);
   o._classCode = 'Mesh';
   return o;
}
function FDrMeshConsole(o){
   o = RClass.inherits(this, o, FDrAbsResourceConsole);
   o._serviceCode = 'cloud.content3d.mesh';
   return o;
}
function FDrObject(o){
   o = RClass.inherits(this, o, FObject);
   o._guid       = null;
   o._code       = null;
   o._label      = null;
   o.guid        = FDrObject_guid;
   o.code        = FDrObject_code;
   o.setCode     = FDrObject_setCode;
   o.label       = FDrObject_label;
   o.setLabel    = FDrObject_setLabel;
   o.unserialize = FDrObject_unserialize;
   o.saveConfig  = FDrObject_saveConfig;
   return o;
}
function FDrObject_guid(){
   return this._guid;
}
function FDrObject_code(){
   return this._code;
}
function FDrObject_setCode(p){
   this._code = p;
}
function FDrObject_label(){
   return this._label;
}
function FDrObject_setLabel(p){
   this._label = p;
}
function FDrObject_unserialize(p){
   var o = this;
   o._guid = p.readString();
   o._code = p.readString();
   o._label = p.readString();
}
function FDrObject_saveConfig(xconfig){
   var o = this;
   xconfig.setNvl('guid', o._guid);
   xconfig.setNvl('code', o._code);
   xconfig.setNvl('label', o._label);
}
function FDrProject(o){
   o = RClass.inherits(this, o, FDrResource);
   o._classCode = 'Project';
   return o;
}
function FDrProjectConsole(o){
   o = RClass.inherits(this, o, FDrAbsResourceConsole);
   o._serviceCode = 'cloud.solution.project';
   return o;
}
function FDrResource(o){
   o = RClass.inherits(this, o, FDrObject);
   o._classCode = null;
   o.classCode  = FDrResource_classCode;
   return o;
}
function FDrResource_classCode(){
   return this._classCode;
}
function FDrResourceConsole(o){
   o = RClass.inherits(this, o, FDrAbsResourceConsole);
   o._serviceCode   = 'cloud.content3d.resource';
   o._catalogCode   = 'cloud.content3d.resource.catalog';
   o._resources     = null;
   o.construct      = FDrResourceConsole_construct;
   o.fetch          = FDrResourceConsole_fetch;
   o.doDelete       = FDrResourceConsole_doDelete;
   o.doFolderCreate = FDrResourceConsole_doFolderCreate;
   o.doFolderUpdate = FDrResourceConsole_doFolderUpdate;
   o.doFolderDelete = FDrResourceConsole_doFolderDelete;
   return o;
}
function FDrResourceConsole_construct(){
   var o = this;
   o.__base.FDrAbsResourceConsole.construct.call(o);
   o._resources = new TDictionary();
}
function FDrResourceConsole_fetch(typeCd, search, order, pageSize, page){
   var o = this;
   var url = '/' + o._serviceCode + '.ws?action=fetch&type_cd=' + typeCd + '&serach=' + serach + '&order=' + order + '&page_size=' + pageSize + '&page=' + page;
   return RConsole.find(FXmlConsole).sendAsync(url);
}
function FDrResourceConsole_doDelete(typeCd, guid){
   var o = this;
   var url = '/' + o._serviceCode + '.ws?action=delete&type_cd=' + typeCd + '&guid=' + guid;
   return RConsole.find(FXmlConsole).sendAsync(url);
}
function FDrResourceConsole_doFolderCreate(parentGuid, code, label){
   var o = this;
   var xdocument = new TXmlDocument();
   var xroot = xdocument.root();
   xroot.set('action', 'create');
   var xfolder = xroot.create('Folder');
   xfolder.set('parent_guid', parentGuid);
   xfolder.set('code', code);
   xfolder.set('label', label);
   return RConsole.find(FXmlConsole).sendAsync('/' + o._catalogCode + '.ws', xdocument);
}
function FDrResourceConsole_doFolderUpdate(guid, code, label){
   var o = this;
   var xdocument = new TXmlDocument();
   var xroot = xdocument.root();
   xroot.set('action', 'update');
   var xfolder = xroot.create('Folder');
   xfolder.set('guid', guid);
   xfolder.set('code', code);
   xfolder.set('label', label);
   return RConsole.find(FXmlConsole).sendAsync('/' + o._catalogCode + '.ws', xdocument);
}
function FDrResourceConsole_doFolderDelete(guid){
   var o = this;
   var url = '/' + o._catalogCode + '.ws?action=delete&guid=' + guid;
   return RConsole.find(FXmlConsole).sendAsync(url);
}
var temp = 0;
function FDsSpacePropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._visible      = false;
   o._workspace    = null;
   o._activeSpace  = null;
   o._controlGuid  = null;
   o._controlCode  = null;
   o._controlLabel = null;
   o.onBuilded     = FDsSpacePropertyFrame_onBuilded;
   o.onDataChanged = FDsSpacePropertyFrame_onDataChanged;
   o.construct     = FDsSpacePropertyFrame_construct;
   o.loadObject    = FDsSpacePropertyFrame_loadObject;
   o.dispose       = FDsSpacePropertyFrame_dispose;
   return o;
}
function FDsSpacePropertyFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   o._controlLabel.addDataChangedListener(o, o.onDataChanged);
}
function FDsSpacePropertyFrame_onDataChanged(p){
   var o = this;
   var space = o._activeSpace;
   var resource = space.resource();
   resource.setLabel(o._controlLabel.get());
}
function FDsSpacePropertyFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsSpacePropertyFrame_loadObject(space){
   var o = this;
   var resource = space.resource();
   o._activeSpace = space;
   o._controlGuid.set(resource.guid());
   o._controlCode.set(resource.code());
   o._controlLabel.set(resource.label());
}
function FDsSpacePropertyFrame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsSolutionCatalogContent(o){
   o = RClass.inherits(this, o, FUiDataTreeView, MListenerSelected);
   o._iconView             = 'design3d.mesh.view';
   o._iconViewNot          = 'design3d.mesh.viewno';
   o._activeSpace          = null;
   o._materials            = null;
   o.onLoaded              = FDsSolutionCatalogContent_onLoaded;
   o.onBuild               = FDsSolutionCatalogContent_onBuild;
   o.onLoadDisplay         = FDsSolutionCatalogContent_onLoadDisplay;
   o.onNodeClick           = FDsSolutionCatalogContent_onNodeClick;
   o.onNodeViewClick       = FDsSolutionCatalogContent_onNodeViewClick;
   o.onNodeViewDoubleClick = FDsSolutionCatalogContent_onNodeViewDoubleClick;
   o.lsnsSelect            = null;
   o.construct             = FDsSolutionCatalogContent_construct;
   o.buildPrivate          = FDsSolutionCatalogContent_buildPrivate;
   o.buildRecommend        = FDsSolutionCatalogContent_buildRecommend;
   o.buildGroup            = FDsSolutionCatalogContent_buildGroup;
   o.buildCatalog          = FDsSolutionCatalogContent_buildCatalog;
   o.selectObject          = FDsSolutionCatalogContent_selectObject;
   o.showObject            = FDsSolutionCatalogContent_showObject;
   o.dispose               = FDsSolutionCatalogContent_dispose;
   return o;
}
function FDsSolutionCatalogContent_onLoaded(p){
   var o = this;
   o.__base.FUiDataTreeView.onLoaded.call(o, p);
   this.buildCatalog();
}
function FDsSolutionCatalogContent_onBuild(p){
   var o = this;
   o.__base.FUiDataTreeView.onBuild.call(o, p);
   o.lsnsClick.register(o, o.onNodeClick);
   o.loadUrl('/cloud.describe.tree.ws?action=query&code=design3d.solution');
}
function FDsSolutionCatalogContent_onLoadDisplay(p){
   var o = this;
   var n = p._linkNode;
   o.buildRecommend(n, p);
}
function FDsSolutionCatalogContent_onNodeClick(t, n){
   var o = this;
   var s = n.dataPropertyGet('linker');
   o.selectObject(s);
}
function FDsSolutionCatalogContent_onNodeViewClick(p){
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
function FDsSolutionCatalogContent_onNodeViewDoubleClick(p){
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
function FDsSolutionCatalogContent_construct(){
   var o = this;
   o.__base.FUiDataTreeView.construct.call(o);
   o._renderables = new TObjects();
   o._materials = new TObjects();
}
function FDsSolutionCatalogContent_buildTechnique(n, p){
   var o = this;
   var nt = o.createNode();
   nt.setLabel('Technique');
   nt.setTypeCode('technique');
   nt.dataPropertySet('linker', p);
   n.appendNode(nt);
}
function FDsSolutionCatalogContent_buildPrivate(parent){
   var o = this;
   var node = o.createNode();
   node.setTypeCode('space');
   node.setLabel('全部项目');
   parent.appendNode(node);
   var node = o.createNode();
   node.setTypeCode('space');
   node.setLabel('收藏项目');
   parent.appendNode(node);
   var node = o.createNode();
   node.setTypeCode('space');
   node.setLabel('最近使用');
   parent.appendNode(node);
}
function FDsSolutionCatalogContent_buildRecommend(parent){
   var o = this;
   var node = o.createNode();
   node.setTypeCode('space');
   node.setLabel('本周排行');
   parent.appendNode(node);
   var node = o.createNode();
   node.setTypeCode('space');
   node.setLabel('本月排行');
   parent.appendNode(node);
   var node = o.createNode();
   node.setTypeCode('space');
   node.setLabel('全部排行');
   parent.appendNode(node);
}
function FDsSolutionCatalogContent_buildGroup(parent){
   var o = this;
   var node = o.createNode();
   node.setTypeCode('space');
   node.setLabel('汽车');
   parent.appendNode(node);
   var node = o.createNode();
   node.setTypeCode('space');
   node.setLabel('教育');
   parent.appendNode(node);
   var node = o.createNode();
   node.setTypeCode('space');
   node.setLabel('人物');
   parent.appendNode(node);
}
function FDsSolutionCatalogContent_buildCatalog(){
   var o = this;
   var node = o.createNode();
   node.setTypeCode('space');
   node.setLabel('我的项目');
   o.appendNode(node);
   o.buildPrivate(node);
   var node = o.createNode();
   node.setTypeCode('space');
   node.setLabel('推荐项目');
   o.appendNode(node);
   o.buildRecommend(node);
   var node = o.createNode();
   node.setTypeCode('space');
   node.setLabel('项目分类');
   o.appendNode(node);
   o.buildGroup(node)
}
function FDsSolutionCatalogContent_selectObject(p){
   var o = this;
   if(p != null){
      o.processSelectedListener(p, true);
   }
}
function FDsSolutionCatalogContent_showObject(p){
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
function FDsSolutionCatalogContent_dispose(){
   var o = this;
   o._displays = RObject.dispose(o._displays);
   o._renderables = RObject.dispose(o._renderables);
   o._materials = RObject.dispose(o._materials);
   o.__base.FUiDataTreeView.dispose.call(o);
}
function FDsSolutionCatalogToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   o._frameName       = 'design3d.solution.CatalogToolBar';
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
   o.onBuilded        = FDsSolutionCatalogToolBar_onBuilded;
   o.onModeClick      = FDsSolutionCatalogToolBar_onModeClick;
   o.onRotationClick  = FDsSolutionCatalogToolBar_onRotationClick;
   o.construct        = FDsSolutionCatalogToolBar_construct;
   o.dispose          = FDsSolutionCatalogToolBar_dispose;
   return o;
}
function FDsSolutionCatalogToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
}
function FDsSolutionCatalogToolBar_onModeClick(p){
   var o = this;
   o._canvasModeCd = p._canvasModeCd;
   o._workspace._canvas.switchMode(p._canvasModeCd);
}
function FDsSolutionCatalogToolBar_onRotationClick(p, v){
   var o = this;
   var c = o._workspace._canvas;
   c.switchRotation(v);
}
function FDsSolutionCatalogToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsSolutionCatalogToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsSolutionFrameSet(o){
   o = RClass.inherits(this, o, FUiFrameSet, MUiStorage);
   o._frameName            = 'design3d.solution.FrameSet';
   o._storageCode          = o._frameName;
   o._styleCatalogGround   = RClass.register(o, new AStyle('_styleCatalogGround', 'Catalog_Ground'));
   o._styleCatalogToolbar  = RClass.register(o, new AStyle('_styleCatalogToolbar', 'Catalog_Toolbar'));
   o._styleSearchGround    = RClass.register(o, new AStyle('_styleSearchGround', 'List_Ground'));
   o._styleSearchToolbar   = RClass.register(o, new AStyle('_styleCatalogToolbar', 'List_Toolbar'));
   o._stylePreviewGround   = RClass.register(o, new AStyle('_stylePreviewGround', 'Property_Ground'));
   o._stylePreviewToolbar  = RClass.register(o, new AStyle('_stylePreviewToolbar', 'Property_Toolbar'));
   o._stylePropertyGround  = RClass.register(o, new AStyle('_stylePropertyGround', 'Property_Ground'));
   o._pageSize             = 40;
   o._activeResourceCd     = 'private';
   o._activeProjectGuid    = null;
   o._frameCatalog         = null;
   o._frameCatalogToolbar  = null;
   o._frameCatalogContent  = null;
   o._frameList            = null;
   o._frameListToolbar     = null;
   o._frameListContent     = null;
   o._frameProperty        = null;
   o._framePropertyToolbar = null;
   o._framePropertyContent = null;
   o._propertyFrames       = null;
   o.onBuilded             = FDsSolutionFrameSet_onBuilded;
   o.construct             = FDsSolutionFrameSet_construct;
   o.findPropertyFrame     = FDsSolutionFrameSet_findPropertyFrame;
   o.selectObject          = FDsSolutionFrameSet_selectObject;
   o.switchContent         = FDsSolutionFrameSet_switchContent;
   o.load                  = FDsSolutionFrameSet_load;
   o.dispose               = FDsSolutionFrameSet_dispose;
   return o;
}
function FDsSolutionFrameSet_onBuilded(p){
   var o = this;
   o.__base.FUiFrameSet.onBuilded.call(o, p);
   var frame = o._frameCatalog = o.searchControl('catalogFrame');
   frame._hPanel.className = o.styleName('Catalog_Ground');
   var frame = o._frameCatalogToolbar = o.searchControl('catalogToolbarFrame');
   frame._hPanel.className = o.styleName('Catalog_Toolbar');
   var frame = o._frameCatalogContent = o.searchControl('catalogContentFrame');
   var frame = o._frameList = o.searchControl('listFrame');
   frame._hPanel.className = o.styleName('List_Ground');
   var frame = o._frameListToolbar = o.searchControl('listToolbarFrame');
   frame._hPanel.className = o.styleName('List_Toolbar');
   var frame = o._frameListContent = o.searchControl('listContentFrame');
   var spliter = o._catalogSplitter = o.searchControl('catalogSpliter');
   spliter.setAlignCd(EUiAlign.Left);
   spliter.setSizeHtml(o._frameCatalog._hPanel);
   var control = o._catalogToolbar = RClass.create(FDsSolutionCatalogToolBar);
   control._frameSet = o;
   control.buildDefine(p);
   o._frameCatalogToolbar.push(control);
   var control = o._catalogContent = RClass.create(FDsSolutionCatalogContent);
   control._frameSet = o;
   control.build(p);
   o._frameCatalogContent.push(control);
   var control = o._listToolbar = RClass.create(FDsSolutionListToolBar);
   control._frameSet = o;
   control.buildDefine(p);
   o._frameListToolbar.push(control);
   var control = o._listContent = RClass.create(FDsSolutionListContent);
   control._frameSet = o;
   control.build(p);
   o._frameListContent.push(control);
   o.switchContent('private');
}
function FDsSolutionFrameSet_construct(){
   var o = this;
   o.__base.FUiFrameSet.construct.call(o);
   o._propertyFrames = new TDictionary();
}
function FDsSolutionFrameSet_findPropertyFrame(p){
   var o = this;
   var f = o._propertyFrames.get(p);
   if(!f){
      var fc = RConsole.find(FFrameConsole);
      f = fc.get(o, p, o._framePropertyProperty._hContainer);
      f._workspace = o;
      o._propertyFrames.set(p, f);
   }
   return f;
}
function FDsSolutionFrameSet_selectObject(control){
   var o = this;
   var space = o._activeSpace;
   var fs = o._propertyFrames;
   var c = fs.count();
   for(var i = 0; i < c; i++){
      var f = fs.value(i);
      f.hide();
   }
   if(RClass.isClass(control, FDsSolutionListItem)){
      var f = o.findPropertyFrame(EDsFrame.SolutionProjectPropertyFrame);
      f.show();
      f.loadObject(control);
      o._activeProjectGuid = control._guid;
   }else{
      throw new TError('Unknown select object type. (value={1})', p);
   }
}
function FDsSolutionFrameSet_switchContent(typeCd){
   var o = this;
   o._activeResourceCd = typeCd;
   o._listContent.serviceSearch(typeCd, '', o._pageSize, 0);
}
function FDsSolutionFrameSet_load(){
   var o = this;
   o._listContent.serviceSearch('private', '', o._pageSize, 0);
}
function FDsSolutionFrameSet_dispose(){
   var o = this;
   o.__base.FUiFrameSet.dispose.call(o);
   o._propertyFrames.dispose();
   o._propertyFrames = null;
}
function FDsSolutionListContent(o){
   o = RClass.inherits(this, o, FUiListView);
   o._activeControl    = null;
   o._activeGuid       = null;
   o._refreshButton    = null;
   o._saveButton       = null;
   o._runButton        = null;
   o.onBuilded         = FDsSolutionListContent_onBuilded;
   o.onServiceLoad     = FDsSolutionListContent_onServiceLoad;
   o.construct         = FDsSolutionListContent_construct;
   o.doClickItem       = FDsSolutionListContent_doClickItem;
   o.doDoubleClickItem = FDsSolutionListContent_doDoubleClickItem;
   o.serviceSearch     = FDsSolutionListContent_serviceSearch;
   o.serviceResearch   = FDsSolutionListContent_serviceResearch;
   o.dispose           = FDsSolutionListContent_dispose;
   return o;
}
function FDsSolutionListContent_onBuilded(p){
   var o = this;
   o.__base.FUiListView.onBuilded.call(o, p);
}
function FDsSolutionListContent_onServiceLoad(p){
   var o = this;
   var xprojects = p.root.findNode('ProjectCollection');
   var pageSize = xprojects.getInteger('page_size');
   var pageCount = xprojects.getInteger('page_count');
   var page = xprojects.getInteger('page');
   o._frameSet._listToolbar.setNavigator(pageSize, pageCount, page);
   o.clear();
   var xnodes = xprojects.nodes();
   var count = xnodes.count();
   for(var i = 0; i < count; i++){
      var xnode = xnodes.getAt(i);
      if(xnode.isName('Project')){
         var item = o.createItem(FDsSolutionListItem);
         item.propertyLoad(xnode);
         item._typeCd = xnode.get('type');
         item._guid = xnode.get('guid');
         item.setLabel(RString.nvl(xnode.get('label'), xnode.get('code')));
         item.refreshStyle();
         o.push(item);
      }
   }
   RWindow.enable();
}
function FDsSolutionListContent_construct(){
   var o = this;
   o.__base.FUiListView.construct.call(o);
}
function FDsSolutionListContent_doClickItem(control){
   var o = this;
   o.__base.FUiListView.doClickItem.call(o, control);
   o._activeControl = control;
   o._activeGuid = control._guid;
}
function FDsSolutionListContent_doDoubleClickItem(control){
   var o = this;
   o.__base.FUiListView.doDoubleClickItem.call(o, control);
   var guid = control._guid;
   o._activeControl = control;
   o._activeGuid = guid;
   var workspace = o._frameSet._workspace;
   workspace.selectFrameSet(EDsFrameSet.ProjectFrameSet, guid);
}
function FDsSolutionListContent_serviceSearch(typeCd, serach, pageSize, page){
   var o = this;
   o._typeCd = typeCd;
   o._serach = serach;
   o._pageSize = pageSize;
   o._page = page;
   RWindow.disable();
   var connection = RConsole.find(FDrProjectConsole).doList(serach, null, pageSize, page);
   connection.addLoadListener(o, o.onServiceLoad);
}
function FDsSolutionListContent_serviceResearch(){
   var o = this;
   o.serviceSearch(o._typeCd, o._serach, o._pageSize, o._page);
}
function FDsSolutionListContent_dispose(){
   var o = this;
   o.__base.FUiListView.dispose.call(o);
}
function FDsSolutionListItem(o){
   o = RClass.inherits(this, o, FUiListViewItem);
   o.onBuild      = FDsSolutionListItem_onBuild;
   o.refreshStyle = FDsSolutionListItem_refreshStyle;
   return o;
}
function FDsSolutionListItem_onBuild(p){
   var o = this;
   o.__base.FUiListViewItem.onBuild.call(o, p);
   var h = o._hPanel;
   h.style.width = '200px';
   h.style.height = '150px';
}
function FDsSolutionListItem_refreshStyle(){
   var o = this;
   var url = '/cloud.content.resource.preview.wv?type_cd=' + o._typeCd + '&guid=' + o._guid;
   o._hForm.style.backgroundImage = 'url("' + url + '")';
}
function FDsSolutionListToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   o._frameName       = 'design3d.solution.ListToolBar';
   o._pageCount       = 0;
   o._page            = 0;
   o._serach          = null;
   o._resourceTypeCd  = null;
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
   o.onBuilded        = FDsSolutionListToolBar_onBuilded;
   o.onSearchClick    = FDsSolutionListToolBar_onSearchClick;
   o.onNavigatorClick = FDsSolutionListToolBar_onNavigatorClick;
   o.construct        = FDsSolutionListToolBar_construct;
   o.setNavigator     = FDsSolutionListToolBar_setNavigator;
   o.doNavigator      = FDsSolutionListToolBar_doNavigator;
   o.dispose          = FDsSolutionListToolBar_dispose;
   return o;
}
function FDsSolutionListToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
   o._controlSearchEdit.addClickListener(o, o.onSearchClick);
   o._controlFirstButton.addClickListener(o, o.onNavigatorClick);
   o._controlPriorButton.addClickListener(o, o.onNavigatorClick);
   o._controlNextButton.addClickListener(o, o.onNavigatorClick);
   o._controlLastButton.addClickListener(o, o.onNavigatorClick);
}
function FDsSolutionListToolBar_onSearchClick(p){
   this.doNavigator(0);
}
function FDsSolutionListToolBar_onNavigatorClick(event){
   var o = this;
   var sender = event.sender;
   var name = sender.name();
   var page = o._page;
   switch(name){
      case 'firstButton':
         page = 0;
         break;
      case 'priorButton':
         page--;
         break;
      case 'nextButton':
         page++;
         break;
      case 'lastButton':
         page = o._pageCount;
         break;
   }
   o.doNavigator(page);
}
function FDsSolutionListToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsSolutionListToolBar_setNavigator(pageSize, pageCount, page){
   var o = this;
   o._pageSize = pageSize;
   o._pageCount = pageCount;
   o._page = page;
   o._controlPageEdit.setText(page);
   if(page == 0){
   }
}
function FDsSolutionListToolBar_doNavigator(page){
   var o = this;
   page = RInteger.toRange(page, 0, o._pageCount);
   var search = o._controlSearchEdit.text();
   var typeCd = o._frameSet._resourceTypeCd;
   if((o._resourceTypeCd != typeCd) || (o._serach != search) || (o._page != page)){
      o._frameSet._searchContent.serviceSearch(typeCd, search, o._pageSize, page)
   }
   o._resourceTypeCd = typeCd;
   o._serach = search;
}
function FDsSolutionListToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsSolutionMenuBar(o){
   o = RClass.inherits(this, o, FUiMenuBar);
   o._frameName     = 'design3d.solution.MenuBar';
   o._refreshButton = null;
   o._saveButton    = null;
   o._runButton     = null;
   o.onBuilded      = FDsSolutionMenuBar_onBuilded;
   o.onCreateClick  = FDsSolutionMenuBar_onCreateClick;
   o.onDeleteLoad   = FDsSolutionMenuBar_onDeleteLoad;
   o.onDeleteClick  = FDsSolutionMenuBar_onDeleteClick;
   o.construct      = FDsSolutionMenuBar_construct;
   o.dispose        = FDsSolutionMenuBar_dispose;
   return o;
}
function FDsSolutionMenuBar_onBuilded(p){
   var o = this;
   o.__base.FUiMenuBar.onBuilded.call(o, p);
   o._controlCreateButton.addClickListener(o, o.onCreateClick);
   o._controlDeleteButton.addClickListener(o, o.onDeleteClick);
}
function FDsSolutionMenuBar_onCreateClick(event){
   var o = this;
   var dialog = RConsole.find(FUiWindowConsole).find(FDsSolutionProjectDialog);
   dialog._frameSet = o._frameSet;
   dialog._workspace = o._workspace;
   dialog.showPosition(EUiPosition.Center);
}
function FDsSolutionMenuBar_onDeleteLoad(event){
   var o = this;
   var frame = o._frameSet._listContent;
   frame.serviceResearch();
   RWindow.enable();
}
function FDsSolutionMenuBar_onDeleteClick(event){
   var o = this;
   var listContent = o._frameSet._listContent;
   var guid = listContent._activeGuid;
   RWindow.disable();
   var connection = RConsole.find(FDrProjectConsole).doDelete(guid);
   connection.addLoadListener(o, o.onDeleteLoad);
}
function FDsSolutionMenuBar_construct(){
   var o = this;
   o.__base.FUiMenuBar.construct.call(o);
}
function FDsSolutionMenuBar_dispose(){
   var o = this;
   o.__base.FUiMenuBar.dispose.call(o);
}
function FDsSolutionProjectDialog(o){
   o = RClass.inherits(this, o, FUiDialog);
   o._frameName            = 'design3d.solution.ProjectDialog';
   o._resourceTypeCd       = 'private';
   o._controlPrivateButton = null;
   o._controlTeamButton    = null;
   o._controlShareButton   = null;
   o.onBuilded             = FDsSolutionProjectDialog_onBuilded;
   o.onConfirmLoad         = FDsSolutionProjectDialog_onConfirmLoad;
   o.onConfirmClick        = FDsSolutionProjectDialog_onConfirmClick;
   o.onCancelClick         = FDsSolutionProjectDialog_onCancelClick;
   o.construct             = FDsSolutionProjectDialog_construct;
   o.dispose               = FDsSolutionProjectDialog_dispose;
   return o;
}
function FDsSolutionProjectDialog_onBuilded(p){
   var o = this;
   o.__base.FUiDialog.onBuilded.call(o, p);
   o._controlConfirmButton.addClickListener(o, o.onConfirmClick);
   o._controlCancelButton.addClickListener(o, o.onCancelClick);
}
function FDsSolutionProjectDialog_onConfirmLoad(event){
   var o = this;
   var frame = o._frameSet._listContent;
   frame.serviceResearch();
   o.hide();
   RWindow.enable();
}
function FDsSolutionProjectDialog_onConfirmClick(event){
   var o = this;
   RWindow.disable();
   var code = o._controlCode.get();
   var label = o._controlLabel.get();
   var project = RClass.create(FDrProject);
   project.setCode(code);
   project.setLabel(label);
   var connection = RConsole.find(FDrProjectConsole).doCreate(project);
   connection.addLoadListener(o, o.onConfirmLoad);
}
function FDsSolutionProjectDialog_onCancelClick(event){
   this.hide();
}
function FDsSolutionProjectDialog_construct(){
   var o = this;
   o.__base.FUiDialog.construct.call(o);
}
function FDsSolutionProjectDialog_dispose(){
   var o = this;
   o.__base.FUiDialog.dispose.call(o);
}
function FDsSolutionProjectProperty(o){
   o = RClass.inherits(this, o, FUiForm);
   o._visible          = false;
   o._workspace        = null;
   o._activeSpace      = null;
   o._activeCamera     = null;
   o._controlGuid      = null;
   o._controlCode      = null;
   o._controlLabel     = null;
   o._controlPosition  = null;
   o._controlDirection = null;
   o.onBuilded         = FDsSolutionProjectProperty_onBuilded;
   o.onDataChanged     = FDsSolutionProjectProperty_onDataChanged;
   o.onLoadProject     = FDsSolutionProjectProperty_onLoadProject;
   o.construct         = FDsSolutionProjectProperty_construct;
   o.loadObject        = FDsSolutionProjectProperty_loadObject;
   o.dispose           = FDsSolutionProjectProperty_dispose;
   return o;
}
function FDsSolutionProjectProperty_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
}
function FDsSolutionProjectProperty_onDataChanged(p){
   var o = this;
   var camera = o._activeCamera;
   var resource = camera.resource();
   resource.position().assign(o._controlPosition.get());
   resource.direction().assign(o._controlDirection.get());
   camera.position().assign(resource.position());
   camera.direction().assign(resource.direction());
   camera.update();
}
function FDsSolutionProjectProperty_onLoadProject(event){
   var o = this;
   var xproject = event.root.findNode('Project');
   o._controlCode.set(xproject.get('code'));
   o._controlLabel.set(xproject.get('label'));
}
function FDsSolutionProjectProperty_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsSolutionProjectProperty_loadObject(control){
   var o = this;
   var guid = control._guid;
   o._controlGuid.set(guid);
   var connection = RConsole.find(FDrProjectConsole).doQuery(guid);
   connection.addLoadListener(o, o.onLoadProject);
}
function FDsSolutionProjectProperty_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsSolutionPropertyContent(o){
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
   o.onBuild              = FDsSolutionPropertyContent_onBuild;
   o.onMouseCaptureStart  = FDsSolutionPropertyContent_onMouseCaptureStart;
   o.onMouseCapture       = FDsSolutionPropertyContent_onMouseCapture;
   o.onMouseCaptureStop   = FDsSolutionPropertyContent_onMouseCaptureStop;
   o.onEnterFrame         = FDsSolutionPropertyContent_onEnterFrame;
   o.onMeshLoad           = FDsSolutionPropertyContent_onMeshLoad;
   o.oeResize             = FDsSolutionPropertyContent_oeResize;
   o.oeRefresh            = FDsSolutionPropertyContent_oeRefresh;
   o.construct            = FDsSolutionPropertyContent_construct;
   o.innerSelectDisplay   = FDsSolutionPropertyContent_innerSelectDisplay;
   o.innerSelectLayer     = FDsSolutionPropertyContent_innerSelectLayer;
   o.selectNone           = FDsSolutionPropertyContent_selectNone;
   o.selectDisplay        = FDsSolutionPropertyContent_selectDisplay;
   o.selectMaterial       = FDsSolutionPropertyContent_selectMaterial;
   o.selectRenderable     = FDsSolutionPropertyContent_selectRenderable;
   o.switchRotation       = FDsSolutionPropertyContent_switchRotation;
   o.reloadRegion         = FDsSolutionPropertyContent_reloadRegion;
   o.loadMeshByGuid       = FDsSolutionPropertyContent_loadMeshByGuid;
   o.loadMeshByCode       = FDsSolutionPropertyContent_loadMeshByCode;
   o.dispose              = FDsSolutionPropertyContent_dispose;
   return o;
}
function FDsSolutionPropertyContent_onBuild(p){
   var o = this;
   o.__base.FDsCanvas.onBuild.call(o, p);
}
function FDsSolutionPropertyContent_onMouseCaptureStart(p){
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
function FDsSolutionPropertyContent_onMouseCapture(p){
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
function FDsSolutionPropertyContent_onMouseCaptureStop(p){
   var o = this;
   RHtml.cursorSet(o._hPanel, EUiCursor.Auto);
}
function FDsSolutionPropertyContent_onEnterFrame(){
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
function FDsSolutionPropertyContent_onMeshLoad(p){
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
function FDsSolutionPropertyContent_oeResize(p){
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
function FDsSolutionPropertyContent_oeRefresh(p){
   return EEventStatus.Stop;
}
function FDsSolutionPropertyContent_construct(){
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
function FDsSolutionPropertyContent_innerSelectDisplay(p){
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
function FDsSolutionPropertyContent_innerSelectLayer(p){
   var o = this;
   var s = p.displays();
   var c = s.count();
   for(var i = 0; i < c; i++){
      var d = s.getAt(i);
      o.innerSelectDisplay(d)
   }
}
function FDsSolutionPropertyContent_selectNone(){
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
function FDsSolutionPropertyContent_selectDisplay(p){
   var o = this;
   o.selectNone();
   o._selectObject = p;
   o.innerSelectDisplay(p);
}
function FDsSolutionPropertyContent_selectMaterial(p){
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
function FDsSolutionPropertyContent_selectRenderable(p){
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
function FDsSolutionPropertyContent_switchMode(p){
   var o = this;
   o._canvasModeCd = p;
   o.selectRenderable(o._selectRenderable);
}
function FDsSolutionPropertyContent_switchRotation(p){
   this._optionRotation = p;
}
function FDsSolutionPropertyContent_reloadRegion(region){
   var o = this;
   var resource = region.resource();
   o._cameraMoveRate = resource.moveSpeed();
   o._cameraKeyRotation = resource.rotationKeySpeed();
   o._cameraMouseRotation = resource.rotationMouseSpeed();
}
function FDsSolutionPropertyContent_loadMeshByGuid(p){
   var o = this;
   var rmc = RConsole.find(FE3dMeshConsole);
   if(o._activeSpace != null){
   }
   var space = o._activeSpace = rmc.allocByGuid(o, p);
   space.addLoadListener(o, o.onMeshLoad);
   space._layer.pushRenderable(o._dimensional);
   RStage.register('mesh3d', space);
}
function FDsSolutionPropertyContent_loadMeshByCode(p){
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
function FDsSolutionPropertyContent_dispose(){
   var o = this;
   o._rotation = RObject.dispose(o._rotation);
x   // 父处理
   o.__base.FDsCanvas.dispose.call(o);
}
function FDsSolutionPropertyToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   o._frameName           = 'design3d.solution.PropertyToolBar';
   o._controlInsertButton = null;
   o._controlUpdateButton = null;
   o._controlDeleteButton = null;
   o.onBuilded            = FDsSolutionPropertyToolBar_onBuilded;
   o.onUpdateClick        = FDsSolutionPropertyToolBar_onUpdateClick;
   o.construct            = FDsSolutionPropertyToolBar_construct;
   o.dispose              = FDsSolutionPropertyToolBar_dispose;
   return o;
}
function FDsSolutionPropertyToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
   o._controlUpdateButton.addClickListener(o, o.onUpdateClick);
}
function FDsSolutionPropertyToolBar_onUpdateClick(event){
   var o = this;
   var guid = o._workspace._activeProjectGuid;
   window.location = 'Project.wa?do=detail&guid=' + guid;
}
function FDsSolutionPropertyToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsSolutionPropertyToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsSolutionTabBar(o){
   o = RClass.inherits(this, o, FUiTabBar);
   o._frameName            = 'design3d.solution.TabBar';
   o._resourceTypeCd       = 'private';
   o._controlPrivateButton = null;
   o._controlTeamButton    = null;
   o._controlShareButton   = null;
   o.onBuilded             = FDsSolutionTabBar_onBuilded;
   o.onButtonClick         = FDsSolutionTabBar_onButtonClick;
   o.construct             = FDsSolutionTabBar_construct;
   o.dispose               = FDsSolutionTabBar_dispose;
   return o;
}
function FDsSolutionTabBar_onBuilded(p){
   var o = this;
   o.__base.FUiTabBar.onBuilded.call(o, p);
   o._controlProjectButton.addClickListener(o, o.onButtonClick);
   o._controlResourceButton.addClickListener(o, o.onButtonClick);
   o._controlTeamButton.addClickListener(o, o.onButtonClick);
   o._controlPublishButton.addClickListener(o, o.onButtonClick);
}
function FDsSolutionTabBar_onButtonClick(event){
   var o = this;
   var sender = event.sender;
   var name = sender.name();
   if(name == 'solution'){
      o._workspace.selectFrameSet(EDsFrameSet.SolutionFrameSet);
   }else if(name == 'project'){
      o._workspace.selectFrameSet(EDsFrameSet.ProjectFrameSet);
   }else if(name == 'resource'){
      o._workspace.selectFrameSet(EDsFrameSet.ResourceFrameSet);
   }else{
      alert('功能未开启，请以后关注。');
   }
}
function FDsSolutionTabBar_construct(){
   var o = this;
   o.__base.FUiTabBar.construct.call(o);
}
function FDsSolutionTabBar_dispose(){
   var o = this;
   o.__base.FUiTabBar.dispose.call(o);
}
function FDsSolutionWorkspace(o){
   o = RClass.inherits(this, o, FUiWorkspace, MUiStorage);
   o._frameName            = 'design3d.solution.Workspace';
   o._storageCode          = o._frameName;
   o._styleWorkspaceGround = RClass.register(o, new AStyle('_styleWorkspaceGround', 'Workspace_Ground'));
   o._styleToolbarGround   = RClass.register(o, new AStyle('_styleToolbarGround', 'Toolbar_Ground'));
   o._styleBodyGround      = RClass.register(o, new AStyle('_styleBodyGround', 'Body_Ground'));
   o._styleStatusbarGround = RClass.register(o, new AStyle('_styleStatusbarGround', 'Statusbar_Ground'));
   o._activeFrameSetCode   = null;
   o._activeProjectGuid    = null;
   o._frameToolBar         = null;
   o._frameStatusBar       = null;
   o._activeFrameSet       = null;
   o._frameSets            = null;
   o._propertyFrames       = null;
   o.onBuilded             = FDsSolutionWorkspace_onBuilded;
   o.construct             = FDsSolutionWorkspace_construct;
   o.selectFrameSet        = FDsSolutionWorkspace_selectFrameSet;
   o.load                  = FDsSolutionWorkspace_load;
   o.dispose               = FDsSolutionWorkspace_dispose;
   return o;
}
function FDsSolutionWorkspace_onBuilded(p){
   var o = this;
   o.__base.FUiWorkspace.onBuilded.call(o, p);
   var frame = o._frameToolBar = o.searchControl('toolbarFrame');
   frame._hPanel.className = o.styleName('Toolbar_Ground');
   var frame = o._frameBody = o.searchControl('bodyFrame');
   frame._hPanel.className = o.styleName('Body_Ground');
   var frame = o._frameStatusBar = o.searchControl('statusFrame');
   frame._hPanel.className = o.styleName('Statusbar_Ground');
   var hTable = RBuilder.createTable(p);
   hTable.width = '100%';
   var hRow = RBuilder.appendTableRow(hTable);
   o._hMenuPanel = RBuilder.appendTableCell(hRow);
   var control = o._tabBar = RClass.create(FDsSolutionTabBar);
   control._workspace = o;
   control.buildDefine(p);
   var hCell = RBuilder.appendTableCell(hRow);
   hCell.width = '150px';
   hCell.align = 'right';
   hCell.vAlign = 'bottom';
   hCell.appendChild(control._hPanel);
   o._frameToolBar._hPanel.appendChild(hTable);
}
function FDsSolutionWorkspace_construct(){
   var o = this;
   o.__base.FUiWorkspace.construct.call(o);
   o._frameSets = new TDictionary();
   o._propertyFrames = new TDictionary();
}
function FDsSolutionWorkspace_selectFrameSet(name, guid){
   var o = this;
   var frameSet = o._frameSets.get(name);
   if(!frameSet){
      if(name == EDsFrameSet.SolutionFrameSet){
         var menuBar = RClass.create(FDsSolutionMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsSolutionFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else if(name == EDsFrameSet.ProjectFrameSet){
         var menuBar = RClass.create(FDsProjectMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsProjectFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else if(name == EDsFrameSet.ResourceFrameSet){
         var menuBar = RClass.create(FDsResourceMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsResourceFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else if(name == EDsFrameSet.BitmapFrameSet){
         var menuBar = RClass.create(FDsBitmapMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsBitmapFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else if(name == EDsFrameSet.MeshFrameSet){
         var menuBar = RClass.create(FDsMeshMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsMeshFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else{
         throw new TError('Unknown frameset. (name={1})', name);
      }
      o._frameSets.set(name, frameSet);
   }
   var activeFrameSet = o._activeFrameSet;
   if(activeFrameSet != frameSet){
      if(activeFrameSet){
         o._hMenuPanel.removeChild(activeFrameSet._menuBar._hPanel);
         o._frameBody.remove(activeFrameSet);
      }
      o._hMenuPanel.appendChild(frameSet._menuBar._hPanel);
      o._frameBody.push(frameSet);
      frameSet.psResize();
   }
   o._activeFrameSet = frameSet;
   switch(name){
      case EDsFrameSet.SolutionFrameSet:
         frameSet.load();
         break;
      case EDsFrameSet.ProjectFrameSet:
         break;
      case EDsFrameSet.ResourceFrameSet:
         frameSet.load();
         break;
      case EDsFrameSet.BitmapFrameSet:
         frameSet.loadByGuid(guid);
         break;
      case EDsFrameSet.MeshFrameSet:
         frameSet.loadByGuid(guid);
         break;
      default:
         throw new TError('Unknown frameset. (name={1})', name);
   }
   o.storageSet('frameset_code', name)
   o.storageSet('frameset_guid', guid)
   o.storageUpdate();
   return frameSet;
}
function FDsSolutionWorkspace_load(){
   var o = this;
   var code = o._activeFrameSetCode = o.storageGet('frameset_code', EDsFrameSet.SolutionFrameSet);
   var guid = o._activeFrameSetGuid = o.storageGet('frameset_guid');
   var button = null;
   if(code == EDsFrameSet.SolutionFrameSet){
      button = o._tabBar.findControl('solution');
      button.doClick();
   }else if(code == EDsFrameSet.ProjectFrameSet){
      button = o._tabBar.findControl('solution');
      o._tabBar.select(button);
      o.selectFrameSet(code, guid)
   }else if(code == EDsFrameSet.ResourceFrameSet){
      button = o._tabBar.findControl('resource');
      button.doClick();
   }else if(code == EDsFrameSet.BitmapFrameSet){
      button = o._tabBar.findControl('resource');
      o._tabBar.select(button);
      o.selectFrameSet(code, guid)
   }else if(code == EDsFrameSet.MeshFrameSet){
      button = o._tabBar.findControl('resource');
      o._tabBar.select(button);
      o.selectFrameSet(code, guid)
   }else{
      button = o._tabBar.findControl('solution');
      button.doClick();
   }
}
function FDsSolutionWorkspace_dispose(){
   var o = this;
   o._propertyFrames.dispose();
   o._propertyFrames = null;
   o.__base.FUiWorkspace.dispose.call(o);
}
function FDsProjectCanvasContent(o){
   o = RClass.inherits(this, o, FUiListView);
   o._refreshButton = null;
   o._saveButton    = null;
   o._runButton     = null;
   o.onBuilded      = FDsProjectCanvasContent_onBuilded;
   o.onServiceLoad  = FDsProjectCanvasContent_onServiceLoad;
   o.construct      = FDsProjectCanvasContent_construct;
   o.clickItem      = FDsProjectCanvasContent_clickItem;
   o.serviceSearch  = FDsProjectCanvasContent_serviceSearch;
   o.dispose        = FDsProjectCanvasContent_dispose;
   return o;
}
function FDsProjectCanvasContent_onBuilded(p){
   var o = this;
   o.__base.FUiListView.onBuilded.call(o, p);
}
function FDsProjectCanvasContent_onServiceLoad(p){
   var o = this;
   var xprojects = p.root.findNode('ProjectCollection');
   var pageSize = xprojects.getInteger('page_size');
   var pageCount = xprojects.getInteger('page_count');
   var page = xprojects.getInteger('page');
   o._workspace._searchToolbar.setNavigator(pageSize, pageCount, page);
   o.clear();
   var xnodes = xitems.nodes();
   var count = xnodes.count();
   for(var i = 0; i < count; i++){
      var xnode = xnodes.getAt(i);
      if(xnode.isName('Project')){
         var item = o.createItem(FDsProjectSearchItem);
         item.propertyLoad(xnode);
         item._typeCd = xnode.get('type');
         item._guid = xnode.get('guid');
         item.setLabel(RString.nvl(xnode.get('label'), xnode.get('code')));
         item.refreshStyle();
         o.push(item);
      }
   }
   RWindow.enable();
}
function FDsProjectCanvasContent_construct(){
   var o = this;
   o.__base.FUiListView.construct.call(o);
}
function FDsProjectCanvasContent_clickItem(p){
   var o = this;
   var frame = o._workspace._previewContent;
   frame._activeItem = p;
   frame.loadMeshByGuid(p._guid);
}
function FDsProjectCanvasContent_serviceSearch(typeCd, serach, pageSize, page){
   var o = this;
   RWindow.disable();
   var connection = RConsole.find(FDrResourceConsole).fetch(typeCd, serach, null, pageSize, page);
   connection.addLoadListener(o, o.onServiceLoad);
}
function FDsProjectCanvasContent_dispose(){
   var o = this;
   o.__base.FUiListView.dispose.call(o);
}
function FDsProjectCanvasToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   o._frameName       = 'design3d.project.CanvasToolBar';
   o._pageCount       = 0;
   o._page            = 0;
   o._serach          = null;
   o._resourceTypeCd  = null;
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
   o.onBuilded        = FDsProjectCanvasToolBar_onBuilded;
   o.onSearchClick    = FDsProjectCanvasToolBar_onSearchClick;
   o.onNavigatorClick = FDsProjectCanvasToolBar_onNavigatorClick;
   o.construct        = FDsProjectCanvasToolBar_construct;
   o.setNavigator     = FDsProjectCanvasToolBar_setNavigator;
   o.doNavigator      = FDsProjectCanvasToolBar_doNavigator;
   o.dispose          = FDsProjectCanvasToolBar_dispose;
   return o;
}
function FDsProjectCanvasToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
   o._controlSearchEdit.addClickListener(o, o.onSearchClick);
   o._controlFirstButton.addClickListener(o, o.onNavigatorClick);
   o._controlPriorButton.addClickListener(o, o.onNavigatorClick);
   o._controlNextButton.addClickListener(o, o.onNavigatorClick);
   o._controlLastButton.addClickListener(o, o.onNavigatorClick);
}
function FDsProjectCanvasToolBar_onSearchClick(p){
   this.doNavigator(0);
}
function FDsProjectCanvasToolBar_onNavigatorClick(event){
   var o = this;
   var sender = event.sender;
   var name = sender.name();
   var page = o._page;
   switch(name){
      case 'firstButton':
         page = 0;
         break;
      case 'priorButton':
         page--;
         break;
      case 'nextButton':
         page++;
         break;
      case 'lastButton':
         page = o._pageCount;
         break;
   }
   o.doNavigator(page);
}
function FDsProjectCanvasToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsProjectCanvasToolBar_setNavigator(pageSize, pageCount, page){
   var o = this;
   o._pageSize = pageSize;
   o._pageCount = pageCount;
   o._page = page;
   o._controlPageEdit.setText(page);
   if(page == 0){
   }
}
function FDsProjectCanvasToolBar_doNavigator(page){
   var o = this;
   page = RInteger.toRange(page, 0, o._pageCount);
   var search = o._controlSearchEdit.text();
   var typeCd = o._workspace._resourceTypeCd;
   if((o._resourceTypeCd != typeCd) || (o._serach != search) || (o._page != page)){
      o._workspace._searchContent.serviceSearch(typeCd, search, o._pageSize, page)
   }
   o._resourceTypeCd = typeCd;
   o._serach = search;
}
function FDsProjectCanvasToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsProjectCatalogContent(o){
   o = RClass.inherits(this, o, FUiDataTreeView, MListenerSelected);
   o._iconView             = 'design3d.mesh.view';
   o._iconViewNot          = 'design3d.mesh.viewno';
   o._activeSpace          = null;
   o._materials            = null;
   o.onBuild               = FDsProjectCatalogContent_onBuild;
   o.onLoadDisplay         = FDsProjectCatalogContent_onLoadDisplay;
   o.onNodeClick           = FDsProjectCatalogContent_onNodeClick;
   o.onNodeViewClick       = FDsProjectCatalogContent_onNodeViewClick;
   o.onNodeViewDoubleClick = FDsProjectCatalogContent_onNodeViewDoubleClick;
   o.lsnsSelect            = null;
   o.construct             = FDsProjectCatalogContent_construct;
   o.buildTechnique        = FDsProjectCatalogContent_buildTechnique;
   o.buildRegion           = FDsProjectCatalogContent_buildRegion;
   o.buildRenderable       = FDsProjectCatalogContent_buildRenderable;
   o.buildDisplay          = FDsProjectCatalogContent_buildDisplay;
   o.buildSpace            = FDsProjectCatalogContent_buildSpace;
   o.selectObject          = FDsProjectCatalogContent_selectObject;
   o.showObject            = FDsProjectCatalogContent_showObject;
   o.dispose               = FDsProjectCatalogContent_dispose;
   return o;
}
function FDsProjectCatalogContent_onBuild(p){
   var o = this;
   o.__base.FUiDataTreeView.onBuild.call(o, p);
   o.lsnsClick.register(o, o.onNodeClick);
   o.loadUrl('/cloud.describe.tree.ws?action=query&code=design3d.resource');
}
function FDsProjectCatalogContent_onLoadDisplay(p){
   var o = this;
   var n = p._linkNode;
   o.buildRenderable(n, p);
}
function FDsProjectCatalogContent_onNodeClick(t, n){
   var o = this;
   var s = n.dataPropertyGet('linker');
   o.selectObject(s);
}
function FDsProjectCatalogContent_onNodeViewClick(p){
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
function FDsProjectCatalogContent_onNodeViewDoubleClick(p){
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
function FDsProjectCatalogContent_construct(){
   var o = this;
   o.__base.FUiDataTreeView.construct.call(o);
   o._renderables = new TObjects();
   o._materials = new TObjects();
}
function FDsProjectCatalogContent_buildTechnique(n, p){
   var o = this;
   var nt = o.createNode();
   nt.setLabel('Technique');
   nt.setTypeCode('technique');
   nt.dataPropertySet('linker', p);
   n.appendNode(nt);
}
function FDsProjectCatalogContent_buildRegion(n, p){
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
function FDsProjectCatalogContent_buildRenderable(n, p){
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
function FDsProjectCatalogContent_buildDisplay(n, p){
   var o = this;
   var node = o.createNode();
   node.setTypeCode('display');
   node.setLabel('Mesh');
   node.dataPropertySet('linker', p);
   n.appendNode(node);
   o.buildRenderable(node, p);
}
function FDsProjectCatalogContent_buildSpace(space){
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
function FDsProjectCatalogContent_selectObject(p){
   var o = this;
   if(p != null){
      o.processSelectedListener(p, true);
   }
}
function FDsProjectCatalogContent_showObject(p){
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
function FDsProjectCatalogContent_dispose(){
   var o = this;
   o._displays = RObject.dispose(o._displays);
   o._renderables = RObject.dispose(o._renderables);
   o._materials = RObject.dispose(o._materials);
   o.__base.FUiDataTreeView.dispose.call(o);
}
function FDsProjectCatalogToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   o._frameName       = 'design3d.project.CatalogToolBar';
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
   o.onBuilded        = FDsProjectCatalogToolBar_onBuilded;
   o.onModeClick      = FDsProjectCatalogToolBar_onModeClick;
   o.onRotationClick  = FDsProjectCatalogToolBar_onRotationClick;
   o.construct        = FDsProjectCatalogToolBar_construct;
   o.dispose          = FDsProjectCatalogToolBar_dispose;
   return o;
}
function FDsProjectCatalogToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
}
function FDsProjectCatalogToolBar_onModeClick(p){
   var o = this;
   o._canvasModeCd = p._canvasModeCd;
   o._workspace._canvas.switchMode(p._canvasModeCd);
}
function FDsProjectCatalogToolBar_onRotationClick(p, v){
   var o = this;
   var c = o._workspace._canvas;
   c.switchRotation(v);
}
function FDsProjectCatalogToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsProjectCatalogToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsProjectFrameSet(o){
   o = RClass.inherits(this, o, FUiFrameSet);
   o._frameName            = 'design3d.project.FrameSet';
   o._stylePageControl     = RClass.register(o, new AStyle('_stylePageControl', 'PageControl'));
   o._styleToolbarGround   = RClass.register(o, new AStyle('_styleToolbarGround', 'Toolbar_Ground'));
   o._styleStatusbarGround = RClass.register(o, new AStyle('_styleStatusbarGround', 'Statusbar_Ground'));
   o._styleCatalogGround   = RClass.register(o, new AStyle('_styleCatalogGround', 'Catalog_Ground'));
   o._styleCatalogContent  = RClass.register(o, new AStyle('_styleCatalogContent', 'Catalog_Content'));
   o._styleCanvasGround    = RClass.register(o, new AStyle('_styleCanvasGround', 'Canvas_Ground'));
   o._styleCanvasContent   = RClass.register(o, new AStyle('_styleCanvasContent', 'Canvas_Content'));
   o._stylePropertyGround  = RClass.register(o, new AStyle('_stylePropertyGround', 'Property_Ground'));
   o._stylePropertyContent = RClass.register(o, new AStyle('_stylePropertyContent', 'Property_Content'));
   o._activeSpace          = null;
   o._activeMesh           = null;
   o._framesetMain         = null;
   o._framesetBody         = null;
   o._frameToolBar         = null;
   o._frameBody            = null;
   o._frameProperty        = null;
   o._frameCatalog         = null;
   o._frameCanvas          = null;
   o._frameStatusBar       = null;
   o._propertyFrames       = null;
   o.onBuilded             = FDsProjectFrameSet_onBuilded;
   o.onMeshLoad            = FDsProjectFrameSet_onMeshLoad;
   o.onCatalogSelected     = FDsProjectFrameSet_onCatalogSelected;
   o.construct             = FDsProjectFrameSet_construct;
   o.findPropertyFrame     = FDsProjectFrameSet_findPropertyFrame;
   o.load                  = FDsProjectFrameSet_load;
   o.dispose               = FDsProjectFrameSet_dispose;
   return o;
}
function FDsProjectFrameSet_onBuilded(event){
   var o = this;
   o.__base.FUiFrameSet.onBuilded.call(o, event);
   var frame = o._frameCatalog = o.searchControl('catalogFrame');
   frame._hPanel.className = o.styleName('Catalog_Ground');
   var control = o._frameCatalogPageControl = o.searchControl('catalogPageControl');
   control._hPanel.className = o.styleName('PageControl');
   var frame = o._frameCatalogToolBar = o.searchControl('catalogToolbarFrame');
   frame._hPanel.className = o.styleName('Toolbar_Ground');
   var frame = o._frameCatalogContent = o.searchControl('catalogContentFrame');
   frame._hPanel.className = o.styleName('Catalog_Content');
   var frame = o._frameCanvas = o.searchControl('canvasFrame');
   frame._hPanel.className = o.styleName('Canvas_Ground');
   var control = o._frameCanvasPageControl = o.searchControl('canvasPageControl');
   control._hPanel.className = o.styleName('PageControl');
   var frame = o._frameCanvasToolBar = o.searchControl('canvasToolbarFrame');
   frame._hPanel.className = o.styleName('Toolbar_Ground');
   var frame = o._frameCanvasContent = o.searchControl('canvasContentFrame');
   frame._hPanel.className = o.styleName('Canvas_Content');
   var frame = o._frameProperty = o.searchControl('propertyFrame');
   frame._hPanel.className = o.styleName('Property_Ground');
   var control = o._framePropertyPageControl = o.searchControl('propertyPageControl');
   control._hPanel.className = o.styleName('PageControl');
   var frame = o._framePropertyToolBar = o.searchControl('propertyToolbarFrame');
   frame._hPanel.className = o.styleName('Toolbar_Ground');
   var frame = o._framePropertyContent = o.searchControl('propertyContentFrame');
   frame._hPanel.className = o.styleName('Property_Content');
   var f = o._catalogSplitter = o.searchControl('catalogSpliter');
   f.setAlignCd(EUiAlign.Left);
   f.setSizeHtml(o._frameCatalog._hPanel);
   var f = o._propertySpliter = o.searchControl('propertySpliter');
   f.setAlignCd(EUiAlign.Right);
   f.setSizeHtml(o._frameProperty._hPanel);
   var toolbar = o._catalogToolbar = RClass.create(FDsProjectCatalogToolBar);
   toolbar._workspace = o;
   toolbar.buildDefine(event);
   o._frameCatalogToolBar.push(toolbar);
   var toolbar = o._canvasToolbar = RClass.create(FDsProjectCanvasToolBar);
   toolbar._workspace = o;
   toolbar.buildDefine(event);
   o._frameCanvasToolBar.push(toolbar);
   var toolbar = o._propertyToolbar = RClass.create(FDsProjectPropertyToolBar);
   toolbar._workspace = o;
   toolbar.buildDefine(event);
   o._framePropertyToolBar.push(toolbar);
}
function FDsProjectFrameSet_onMeshLoad(p){
   var o = this;
   o._activeSpace = p._activeSpace;
   o._catalog.buildSpace(o._activeSpace);
}
function FDsProjectFrameSet_onCatalogSelected(p, pc){
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
function FDsProjectFrameSet_construct(){
   var o = this;
   o.__base.FUiFrameSet.construct.call(o);
   o._propertyFrames = new TDictionary();
}
function FDsProjectFrameSet_findPropertyFrame(p){
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
function FDsProjectFrameSet_load(guid){
}
function FDsProjectFrameSet_dispose(){
   var o = this;
   o.__base.FUiFrameSet.dispose.call(o);
   o._propertyFrames.dispose();
   o._propertyFrames = null;
}
function FDsProjectMenuBar(o){
   o = RClass.inherits(this, o, FUiMenuBar);
   o._frameName     = 'design3d.project.MenuBar';
   o._refreshButton = null;
   o._saveButton    = null;
   o._runButton     = null;
   o.onBuilded      = FDsProjectMenuBar_onBuilded;
   o.onSaveClick    = FDsProjectMenuBar_onSaveClick;
   o.construct      = FDsProjectMenuBar_construct;
   o.dispose        = FDsProjectMenuBar_dispose;
   return o;
}
function FDsProjectMenuBar_onBuilded(p){
   var o = this;
   o.__base.FUiMenuBar.onBuilded.call(o, p);
   o._controlSaveButton.addClickListener(o, o.onSaveClick);
}
function FDsProjectMenuBar_onSaveClick(p){
   var o = this;
   var space = o._workspace._activeSpace;
   var resource = space.resource();
   var xconfig = new TXmlNode();
   resource.saveConfig(xconfig);
   RConsole.find(FE3sMeshConsole).update(xconfig);
}
function FDsProjectMenuBar_construct(){
   var o = this;
   o.__base.FUiMenuBar.construct.call(o);
}
function FDsProjectMenuBar_dispose(){
   var o = this;
   o.__base.FUiMenuBar.dispose.call(o);
}
function FDsProjectPropertyContent(o){
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
   o.onBuild              = FDsProjectPropertyContent_onBuild;
   o.onMouseCaptureStart  = FDsProjectPropertyContent_onMouseCaptureStart;
   o.onMouseCapture       = FDsProjectPropertyContent_onMouseCapture;
   o.onMouseCaptureStop   = FDsProjectPropertyContent_onMouseCaptureStop;
   o.onEnterFrame         = FDsProjectPropertyContent_onEnterFrame;
   o.onMeshLoad           = FDsProjectPropertyContent_onMeshLoad;
   o.oeResize             = FDsProjectPropertyContent_oeResize;
   o.oeRefresh            = FDsProjectPropertyContent_oeRefresh;
   o.construct            = FDsProjectPropertyContent_construct;
   o.innerSelectDisplay   = FDsProjectPropertyContent_innerSelectDisplay;
   o.innerSelectLayer     = FDsProjectPropertyContent_innerSelectLayer;
   o.selectNone           = FDsProjectPropertyContent_selectNone;
   o.selectDisplay        = FDsProjectPropertyContent_selectDisplay;
   o.selectMaterial       = FDsProjectPropertyContent_selectMaterial;
   o.selectRenderable     = FDsProjectPropertyContent_selectRenderable;
   o.switchRotation       = FDsProjectPropertyContent_switchRotation;
   o.reloadRegion         = FDsProjectPropertyContent_reloadRegion;
   o.loadMeshByGuid       = FDsProjectPropertyContent_loadMeshByGuid;
   o.loadMeshByCode       = FDsProjectPropertyContent_loadMeshByCode;
   o.dispose              = FDsProjectPropertyContent_dispose;
   return o;
}
function FDsProjectPropertyContent_onBuild(p){
   var o = this;
   o.__base.FDsCanvas.onBuild.call(o, p);
}
function FDsProjectPropertyContent_onMouseCaptureStart(p){
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
function FDsProjectPropertyContent_onMouseCapture(p){
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
function FDsProjectPropertyContent_onMouseCaptureStop(p){
   var o = this;
   RHtml.cursorSet(o._hPanel, EUiCursor.Auto);
}
function FDsProjectPropertyContent_onEnterFrame(){
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
function FDsProjectPropertyContent_onMeshLoad(p){
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
function FDsProjectPropertyContent_oeResize(p){
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
function FDsProjectPropertyContent_oeRefresh(p){
   return EEventStatus.Stop;
}
function FDsProjectPropertyContent_construct(){
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
function FDsProjectPropertyContent_innerSelectDisplay(p){
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
function FDsProjectPropertyContent_innerSelectLayer(p){
   var o = this;
   var s = p.displays();
   var c = s.count();
   for(var i = 0; i < c; i++){
      var d = s.getAt(i);
      o.innerSelectDisplay(d)
   }
}
function FDsProjectPropertyContent_selectNone(){
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
function FDsProjectPropertyContent_selectDisplay(p){
   var o = this;
   o.selectNone();
   o._selectObject = p;
   o.innerSelectDisplay(p);
}
function FDsProjectPropertyContent_selectMaterial(p){
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
function FDsProjectPropertyContent_selectRenderable(p){
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
function FDsProjectPropertyContent_switchMode(p){
   var o = this;
   o._canvasModeCd = p;
   o.selectRenderable(o._selectRenderable);
}
function FDsProjectPropertyContent_switchRotation(p){
   this._optionRotation = p;
}
function FDsProjectPropertyContent_reloadRegion(region){
   var o = this;
   var resource = region.resource();
   o._cameraMoveRate = resource.moveSpeed();
   o._cameraKeyRotation = resource.rotationKeySpeed();
   o._cameraMouseRotation = resource.rotationMouseSpeed();
}
function FDsProjectPropertyContent_loadMeshByGuid(p){
   var o = this;
   var rmc = RConsole.find(FE3dMeshConsole);
   if(o._activeSpace != null){
   }
   var space = o._activeSpace = rmc.allocByGuid(o, p);
   space.addLoadListener(o, o.onMeshLoad);
   space._layer.pushRenderable(o._dimensional);
   RStage.register('mesh3d', space);
}
function FDsProjectPropertyContent_loadMeshByCode(p){
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
function FDsProjectPropertyContent_dispose(){
   var o = this;
   o._rotation = RObject.dispose(o._rotation);
x   // 父处理
   o.__base.FDsCanvas.dispose.call(o);
}
function FDsProjectPropertyToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   o._frameName             = 'design3d.project.PropertyToolBar';
   o._controlInsertButton   = null;
   o._controlUpdateButton   = null;
   o._controlDeleteButton   = null;
   o._controlRotationButton = null;
   o.onBuilded              = FDsProjectPropertyToolBar_onBuilded;
   o.onInsertClick          = FDsProjectPropertyToolBar_onInsertClick;
   o.onUpdateClick          = FDsProjectPropertyToolBar_onUpdateClick;
   o.onDeleteClick          = FDsProjectPropertyToolBar_onDeleteClick;
   o.onRotationClick        = FDsProjectPropertyToolBar_onRotationClick;
   o.construct              = FDsProjectPropertyToolBar_construct;
   o.dispose                = FDsProjectPropertyToolBar_dispose;
   return o;
}
function FDsProjectPropertyToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
   o._controlInsertButton.addClickListener(o, o.onInsertClick);
   o._controlUpdateButton.addClickListener(o, o.onUpdateClick);
   o._controlDeleteButton.addClickListener(o, o.onDeleteClick);
   o._controlRotationButton.addClickListener(o, o.onRotationClick);
}
function FDsProjectPropertyToolBar_onInsertClick(event){
}
function FDsProjectPropertyToolBar_onUpdateClick(event){
   var o = this;
   var frame = o._workspace._previewContent;
   var item = frame._activeItem;
   var url = '/script/design/mesh.html?guid=' + item._guid;
   window.open(url, '_blank', '');
}
function FDsProjectPropertyToolBar_onDeleteClick(event){
}
function FDsProjectPropertyToolBar_onRotationClick(event){
   var o = this;
   var previewContent = o._workspace._previewContent;
   previewContent.switchRotation(event.checked);
}
function FDsProjectPropertyToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsProjectPropertyToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsProjectTabBar(o){
   o = RClass.inherits(this, o, FUiTabBar);
   o._frameName             = 'design3d.project.TabBar';
   o._resourceTypeCd        = 'mesh';
   o._controlProjectButton  = null;
   o._controlResourceButton = null;
   o.onBuilded              = FDsProjectTabBar_onBuilded;
   o.onButtonClick          = FDsProjectTabBar_onButtonClick;
   o.construct              = FDsProjectTabBar_construct;
   o.dispose                = FDsProjectTabBar_dispose;
   return o;
}
function FDsProjectTabBar_onBuilded(p){
   var o = this;
   o.__base.FUiTabBar.onBuilded.call(o, p);
   o._controlProjectButton.addClickListener(o, o.onButtonClick);
   o._controlResourceButton.addClickListener(o, o.onButtonClick);
}
function FDsProjectTabBar_onButtonClick(event){
   var o = this;
   var sender = event.sender;
   var name = sender.name();
   if(name == 'project'){
      o._workspace.selectFrameSet(EDsFrameSet.ProjectFrameSet);
   }else if(name == 'resource'){
      o._workspace.selectFrameSet(EDsFrameSet.ResourceFrameSet);
   }
}
function FDsProjectTabBar_construct(){
   var o = this;
   o.__base.FUiTabBar.construct.call(o);
}
function FDsProjectTabBar_dispose(){
   var o = this;
   o.__base.FUiTabBar.dispose.call(o);
}
function FDsProjectWorkspace(o){
   o = RClass.inherits(this, o, FUiWorkspace);
   o._frameName            = 'design3d.project.Workspace';
   o._styleToolbarGround   = RClass.register(o, new AStyle('_styleToolbarGround', 'Toolbar_Ground'));
   o._styleStatusbarGround = RClass.register(o, new AStyle('_styleStatusbarGround', 'Statusbar_Ground'));
   o._styleCatalogGround   = RClass.register(o, new AStyle('_styleCatalogGround', 'Catalog_Ground'));
   o._styleCatalogToolbar  = RClass.register(o, new AStyle('_styleCatalogToolbar', 'Catalog_Toolbar'));
   o._styleSearchGround    = RClass.register(o, new AStyle('_styleSearchGround', 'Search_Ground'));
   o._styleSearchToolbar   = RClass.register(o, new AStyle('_styleCatalogToolbar', 'Search_Toolbar'));
   o._stylePropertyGround  = RClass.register(o, new AStyle('_stylePropertyGround', 'Property_Ground'));
   o._stylePropertyToolbar = RClass.register(o, new AStyle('_stylePropertyToolbar', 'Property_Toolbar'));
   o._stylePropertyContent = RClass.register(o, new AStyle('_stylePropertyContent', 'Property_Content'));
   o._styleWorkspaceGround = RClass.register(o, new AStyle('_styleWorkspaceGround', 'Workspace_Ground'));
   o._resourceTypeCd       = 'project';
   o._frameToolBar         = null;
   o._frameStatusBar       = null;
   o._frameCatalog         = null;
   o._frameCatalogToolbar  = null;
   o._frameCatalogContent  = null;
   o._frameSearch          = null;
   o._frameSearchToolbar   = null;
   o._frameSearchContent   = null;
   o._framePreview         = null;
   o._framePreviewToolbar  = null;
   o._framePreviewContent  = null;
   o._activeFrameSet       = null;
   o._frameSets            = null;
   o._propertyFrames       = null;
   o.onBuilded             = FDsProjectWorkspace_onBuilded;
   o.onMeshLoad            = FDsProjectWorkspace_onMeshLoad;
   o.onCatalogSelected     = FDsProjectWorkspace_onCatalogSelected;
   o.construct             = FDsProjectWorkspace_construct;
   o.selectFrameSet        = FDsProjectWorkspace_selectFrameSet;
   o.findPropertyFrame     = FDsProjectWorkspace_findPropertyFrame;
   o.switchContent         = FDsProjectWorkspace_switchContent;
   o.load                  = FDsProjectWorkspace_load;
   o.dispose               = FDsProjectWorkspace_dispose;
   return o;
}
function FDsProjectWorkspace_onBuilded(p){
   var o = this;
   o.__base.FUiWorkspace.onBuilded.call(o, p);
   var frame = o._frameToolBar = o.searchControl('toolbarFrame');
   frame._hPanel.className = o.styleName('Toolbar_Ground');
   o._frameBody = o.searchControl('bodyFrame');
   var frame = o._frameStatusBar = o.searchControl('statusFrame');
   frame._hPanel.className = o.styleName('Statusbar_Ground');
   var hTable = RBuilder.createTable(p);
   hTable.width = '100%';
   var hRow = RBuilder.appendTableRow(hTable);
   o._hMenuPanel = RBuilder.appendTableCell(hRow);
   var c = o._tabBar = RClass.create(FDsProjectTabBar);
   c._workspace = o;
   c.buildDefine(p);
   var hCell = RBuilder.appendTableCell(hRow);
   hCell.width = '150px';
   hCell.align = 'right';
   hCell.vAlign = 'bottom';
   hCell.appendChild(c._hPanel);
   o._frameToolBar._hPanel.appendChild(hTable);
   o.selectFrameSet(EDsFrameSet.ProjectFrameSet);
}
function FDsProjectWorkspace_onMeshLoad(p){
   var o = this;
   o._activeSpace = p._activeSpace;
   o._catalog.buildSpace(o._activeSpace);
}
function FDsProjectWorkspace_onCatalogSelected(p, pc){
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
function FDsProjectWorkspace_construct(){
   var o = this;
   o.__base.FUiWorkspace.construct.call(o);
   o._frameSets = new TDictionary();
   o._propertyFrames = new TDictionary();
}
function FDsProjectWorkspace_selectFrameSet(name, guid){
   var o = this;
   var frameSet = o._frameSets.get(name);
   if(!frameSet){
      if(name == EDsFrameSet.ProjectFrameSet){
         var menuBar = RClass.create(FDsProjectMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         frameSet = RConsole.find(FFrameConsole).findByClass(o, FDsProjectFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else if(name == EDsFrameSet.ResourceFrameSet){
         var menuBar = RClass.create(FDsResourceMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         frameSet = RConsole.find(FFrameConsole).findByClass(o, FDsResourceFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else if(name == EDsFrameSet.MeshFrameSet){
         var menuBar = RClass.create(FDsMeshMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         frameSet = RConsole.find(FFrameConsole).findByClass(o, FDsMeshFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else{
         throw new TError('Unknown frameset. (name={1})', name);
      }
      o._frameSets.set(name, frameSet);
   }
   var activeFrameSet = o._activeFrameSet;
   if(activeFrameSet != frameSet){
      if(activeFrameSet){
         o._hMenuPanel.removeChild(activeFrameSet._menuBar._hPanel);
         o._frameBody.remove(activeFrameSet);
      }
      o._hMenuPanel.appendChild(frameSet._menuBar._hPanel);
      o._frameBody.push(frameSet);
      frameSet.psResize();
   }
   o._activeFrameSet = frameSet;
   if(name == EDsFrameSet.ProjectFrameSet){
   }else if(name == EDsFrameSet.ResourceFrameSet){
      frameSet.load();
   }else if(name == EDsFrameSet.MeshFrameSet){
      frameSet.loadByGuid(guid);
   }else{
      throw new TError('Unknown frameset. (name={1})', name);
   }
   return frameSet;
}
function FDsProjectWorkspace_findPropertyFrame(p){
   var o = this;
   var f = o._propertyFrames.get(p);
   if(!f){
      var fc = RConsole.find(FFrameConsole);
      f = fc.get(o, p, o._framePreview._hContainer);
      f._workspace = o;
      o._propertyFrames.set(p, f);
   }
   return f;
}
function FDsProjectWorkspace_switchContent(typeCd){
   var o = this;
   o._resourceTypeCd = typeCd;
   o._searchContent.serviceSearch(typeCd, '', 40, 0);
}
function FDsProjectWorkspace_load(){
   var o = this;
}
function FDsProjectWorkspace_dispose(){
   var o = this;
   o.__base.FUiWorkspace.dispose.call(o);
   o._propertyFrames.dispose();
   o._propertyFrames = null;
}
function FDsResourceCatalogContent(o){
   o = RClass.inherits(this, o, FUiDataTreeView, MListenerSelected);
   o._activeSpace          = null;
   o._materials            = null;
   o.onBuild               = FDsResourceCatalogContent_onBuild;
   o.onLoadDisplay         = FDsResourceCatalogContent_onLoadDisplay;
   o.onNodeClick           = FDsResourceCatalogContent_onNodeClick;
   o.onNodeViewClick       = FDsResourceCatalogContent_onNodeViewClick;
   o.onNodeViewDoubleClick = FDsResourceCatalogContent_onNodeViewDoubleClick;
   o.lsnsSelect            = null;
   o.construct             = FDsResourceCatalogContent_construct;
   o.selectObject          = FDsResourceCatalogContent_selectObject;
   o.showObject            = FDsResourceCatalogContent_showObject;
   o.dispose               = FDsResourceCatalogContent_dispose;
   return o;
}
function FDsResourceCatalogContent_onBuild(p){
   var o = this;
   o.__base.FUiDataTreeView.onBuild.call(o, p);
   o.lsnsClick.register(o, o.onNodeClick);
   o.loadUrl('/cloud.describe.tree.ws?action=query&code=design3d.resource');
}
function FDsResourceCatalogContent_onLoadDisplay(p){
   var o = this;
   var n = p._linkNode;
   o.buildRenderable(n, p);
}
function FDsResourceCatalogContent_onNodeClick(t, n){
   var o = this;
}
function FDsResourceCatalogContent_onNodeViewClick(p){
   var o = this;
}
function FDsResourceCatalogContent_onNodeViewDoubleClick(p){
   var o = this;
}
function FDsResourceCatalogContent_construct(){
   var o = this;
   o.__base.FUiDataTreeView.construct.call(o);
   o._renderables = new TObjects();
   o._materials = new TObjects();
}
function FDsResourceCatalogContent_selectObject(p){
   var o = this;
   if(p != null){
      o.processSelectedListener(p, true);
   }
}
function FDsResourceCatalogContent_showObject(p){
   var o = this;
}
function FDsResourceCatalogContent_dispose(){
   var o = this;
   o.__base.FUiDataTreeView.dispose.call(o);
}
function FDsResourceCatalogToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   o._frameName                   = 'design3d.resource.CatalogToolBar';
   o._controlFolderCreateButton   = null;
   o._controlFolderDeleteButton   = null;
   o._controlFolderPropertyButton  = null;
   o._controlFolderOpenButton     = null;
   o._controlFolderCloseButton    = null;
   o._activeNodeGuid              = null;
   o.onBuilded                    = FDsResourceCatalogToolBar_onBuilded;
   o.onFolderCreateClick          = FDsResourceCatalogToolBar_onFolderCreateClick;
   o.onFolderDeleteLoad           = FDsResourceCatalogToolBar_onFolderDeleteLoad;
   o.onFolderDeleteExcute         = FDsResourceCatalogToolBar_onFolderDeleteExcute;
   o.onFolderDeleteClick          = FDsResourceCatalogToolBar_onFolderDeleteClick;
   o.onFolderPropertyClick        = FDsResourceCatalogToolBar_onFolderPropertyClick;
   o.onFolderOpenClick            = FDsResourceCatalogToolBar_onFolderOpenClick;
   o.onFolderCloseClick           = FDsResourceCatalogToolBar_onFolderCloseClick;
   o.construct                    = FDsResourceCatalogToolBar_construct;
   o.dispose                      = FDsResourceCatalogToolBar_dispose;
   return o;
}
function FDsResourceCatalogToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
   o._controlFolderCreateButton.addClickListener(o, o.onFolderCreateClick);
   o._controlFolderDeleteButton.addClickListener(o, o.onFolderDeleteClick);
   o._controlFolderPropertyButton.addClickListener(o, o.onFolderPropertyClick);
   o._controlFolderOpenButton.addClickListener(o, o.onFolderOpenClick);
   o._controlFolderCloseButton.addClickListener(o, o.onFolderCloseClick);
}
function FDsResourceCatalogToolBar_onFolderCreateClick(event){
   var o = this;
   var parentGuid = null;
   var parentLabel = null;
   var catalog = o._frameSet._catalogContent;
   var node = catalog.focusNode();
   if(node){
      parentGuid = node.guid();
      parentLabel = node.label();
   }
   var dialog = RConsole.find(FUiWindowConsole).find(FDsResourceFolderDialog);
   dialog._workspace = o._workspace;
   dialog._frameSet = o._frameSet;
   dialog._parentGuid = parentGuid;
   dialog.setNodeParentLabel(parentLabel);
   dialog.setNodeLabel('');
   dialog.switchDataMode(EUiDataMode.Insert);
   dialog.showPosition(EUiPosition.Center);
}
function FDsResourceCatalogToolBar_onFolderDeleteLoad(event){
   var o = this;
   RConsole.find(FUiDesktopConsole).hide();
   var catalog = o._frameSet._catalogContent;
   var guid = o._activeNodeGuid;
   if(guid){
      var node = catalog.findByGuid(guid);
      node.removeSelf();
   }
   o._activeNodeGuid = null;
}
function FDsResourceCatalogToolBar_onFolderDeleteExcute(event){
   var o = this;
   if(event.resultCd != EResult.Success){
      return;
   }
   var catalog = o._frameSet._catalogContent;
   var node = catalog.focusNode();
   RConsole.find(FUiDesktopConsole).showUploading();
   o._activeNodeGuid = node._guid;
   var connection = RConsole.find(FDrResourceConsole).doFolderDelete(node._guid);
   connection.addLoadListener(o, o.onFolderDeleteLoad);
}
function FDsResourceCatalogToolBar_onFolderDeleteClick(event){
   var o = this;
   var catalog = o._frameSet._catalogContent;
   var node = catalog.focusNode();
   if(!node){
      return RConsole.find(FUiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
   }
   var dialog = RConsole.find(FUiMessageConsole).showConfirm('请确认是否删除当前目录？');
   dialog.addResultListener(o, o.onFolderDeleteExcute);
}
function FDsResourceCatalogToolBar_onFolderPropertyClick(event){
   var o = this;
   var catalog = o._frameSet._catalogContent;
   var node = catalog.focusNode();
   if(!node){
      return RConsole.find(FUiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
   }
   var parentLabel = null;
   if(node._parent){
      parentLabel = node._parent.label();
   }
   var dialog = RConsole.find(FUiWindowConsole).find(FDsResourceFolderDialog);
   dialog._workspace = o._workspace;
   dialog._frameSet = o._frameSet;
   dialog._nodeGuid = node._guid;
   dialog.setNodeParentLabel(parentLabel);
   dialog.setNodeLabel(node.label());
   dialog.switchDataMode(EUiDataMode.Update);
   dialog.showPosition(EUiPosition.Center);
}
function FDsResourceCatalogToolBar_onFolderOpenClick(event){
}
function FDsResourceCatalogToolBar_onFolderCloseClick(event){
}
function FDsResourceCatalogToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsResourceCatalogToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsResourceFolderDialog(o){
   o = RClass.inherits(this, o, FUiDialog);
   o._frameName            = 'design3d.resource.FolderDialog';
   o._dataModeCd           = null;
   o._controlParentLabel   = null;
   o._controlLabel         = null;
   o._controlConfirmButton = null;
   o._controlCancelButton  = null;
   o.onBuilded             = FDsResourceFolderDialog_onBuilded;
   o.onConfirmLoad         = FDsResourceFolderDialog_onConfirmLoad;
   o.onConfirmClick        = FDsResourceFolderDialog_onConfirmClick;
   o.onCancelClick         = FDsResourceFolderDialog_onCancelClick;
   o.construct             = FDsResourceFolderDialog_construct;
   o.setNodeParentLabel    = FDsResourceFolderDialog_setNodeParentLabel;
   o.setNodeLabel          = FDsResourceFolderDialog_setNodeLabel;
   o.switchDataMode        = FDsResourceFolderDialog_switchDataMode;
   o.dispose               = FDsResourceFolderDialog_dispose;
   return o;
}
function FDsResourceFolderDialog_onBuilded(p){
   var o = this;
   o.__base.FUiDialog.onBuilded.call(o, p);
   o._controlParentLabel.setEditAble(false);
   o._controlConfirmButton.addClickListener(o, o.onConfirmClick);
   o._controlCancelButton.addClickListener(o, o.onCancelClick);
}
function FDsResourceFolderDialog_onConfirmLoad(event){
   var o = this;
   RConsole.find(FUiDesktopConsole).hide();
   o.hide();
   var catalog = o._frameSet._catalogContent;
   if(o._dataModeCd == EUiDataMode.Insert){
      if(o._parentGuid){
         var node = catalog.findByGuid(o._parentGuid);
         catalog.loadNode(node);
      }else{
         catalog.loadService();
      }
   }else{
      var label = o._controlLabel.get();
      var node = catalog.focusNode();
      node.setLabel(label);
   }
}
function FDsResourceFolderDialog_onConfirmClick(event){
   var o = this;
   RConsole.find(FUiDesktopConsole).showUploading();
   var label = o._controlLabel.get();
   var resourceConsole = RConsole.find(FDrResourceConsole);
   var connection = null;
   if(o._dataModeCd == EUiDataMode.Insert){
      connection = resourceConsole.doFolderCreate(o._parentGuid, null, label);
   }else{
      connection = resourceConsole.doFolderUpdate(o._nodeGuid, null, label);
   }
   connection.addLoadListener(o, o.onConfirmLoad);
}
function FDsResourceFolderDialog_onCancelClick(event){
   this.hide();
}
function FDsResourceFolderDialog_construct(){
   var o = this;
   o.__base.FUiDialog.construct.call(o);
}
function FDsResourceFolderDialog_setNodeParentLabel(label){
   this._controlParentLabel.set(label);
}
function FDsResourceFolderDialog_setNodeLabel(label){
   this._controlLabel.set(label);
}
function FDsResourceFolderDialog_switchDataMode(modeCd){
   var o = this;
   o._dataModeCd = modeCd;
   if(modeCd == EUiDataMode.Insert){
      o.setLabel('新建资源目录');
   }else if(modeCd == EUiDataMode.Update){
      o.setLabel('资源目录属性');
   }
}
function FDsResourceFolderDialog_dispose(){
   var o = this;
   o.__base.FUiDialog.dispose.call(o);
}
function FDsResourceFrameSet(o){
   o = RClass.inherits(this, o, FUiFrameSet);
   o._frameName            = 'design3d.resource.FrameSet';
   o._styleCatalogGround   = RClass.register(o, new AStyle('_styleCatalogGround', 'Catalog_Ground'));
   o._styleCatalogToolbar  = RClass.register(o, new AStyle('_styleCatalogToolbar', 'Catalog_Toolbar'));
   o._styleSearchGround    = RClass.register(o, new AStyle('_styleSearchGround', 'List_Ground'));
   o._styleSearchToolbar   = RClass.register(o, new AStyle('_styleCatalogToolbar', 'List_Toolbar'));
   o._stylePreviewGround   = RClass.register(o, new AStyle('_stylePreviewGround', 'Property_Ground'));
   o._stylePreviewToolbar  = RClass.register(o, new AStyle('_stylePreviewToolbar', 'Property_Toolbar'));
   o._stylePropertyGround  = RClass.register(o, new AStyle('_stylePropertyGround', 'Property_Ground'));
   o._resourceTypeCd       = 'picture';
   o._frameCatalog         = null;
   o._frameCatalogToolbar  = null;
   o._frameCatalogContent  = null;
   o._frameSearch          = null;
   o._frameSearchToolbar   = null;
   o._frameSearchContent   = null;
   o._framePreview         = null;
   o._framePreviewToolbar  = null;
   o._framePreviewContent  = null;
   o._propertyFrames       = null;
   o.onBuilded             = FDsResourceFrameSet_onBuilded;
   o.onCatalogSelected     = FDsResourceFrameSet_onCatalogSelected;
   o.construct             = FDsResourceFrameSet_construct;
   o.findPropertyFrame     = FDsResourceFrameSet_findPropertyFrame;
   o.switchContent         = FDsResourceFrameSet_switchContent;
   o.load                  = FDsResourceFrameSet_load;
   o.dispose               = FDsResourceFrameSet_dispose;
   return o;
}
function FDsResourceFrameSet_onBuilded(p){
   var o = this;
   o.__base.FUiFrameSet.onBuilded.call(o, p);
   var frame = o._frameCatalog = o.searchControl('catalogFrame');
   frame._hPanel.className = o.styleName('Catalog_Ground');
   var frame = o._frameCatalogToolbar = o.searchControl('catalogToolbarFrame');
   frame._hPanel.className = o.styleName('Catalog_Toolbar');
   o._frameCatalogContent = o.searchControl('catalogContentFrame');
   var frame = o._frameSearch = o.searchControl('listFrame');
   frame._hPanel.className = o.styleName('List_Ground');
   var frame = o._frameSearchToolbar = o.searchControl('listToolbarFrame');
   frame._hPanel.className = o.styleName('List_Toolbar');
   o._frameSearchContent = o.searchControl('listContentFrame');
   var f = o._catalogSplitter = o.searchControl('catalogSpliter');
   f.setAlignCd(EUiAlign.Left);
   f.setSizeHtml(o._frameCatalog._hPanel);
   var control = o._catalogToolbar = RClass.create(FDsResourceCatalogToolBar);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(p);
   o._frameCatalogToolbar.push(control);
   var control = o._catalogContent = RClass.create(FDsResourceCatalogContent);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.build(p);
   o._frameCatalogContent.push(control);
   var control = o._listToolbar = RClass.create(FDsResourceListToolBar);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(p);
   o._frameSearchToolbar.push(control);
   var control = o._listContent = RClass.create(FDsResourceListContent);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.build(p);
   o._frameSearchContent.push(control);
}
function FDsResourceFrameSet_onCatalogSelected(p, pc){
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
function FDsResourceFrameSet_construct(){
   var o = this;
   o.__base.FUiFrameSet.construct.call(o);
   o._propertyFrames = new TDictionary();
}
function FDsResourceFrameSet_findPropertyFrame(p){
   var o = this;
   var f = o._propertyFrames.get(p);
   if(!f){
      var fc = RConsole.find(FFrameConsole);
      f = fc.get(o, p, o._framePreview._hContainer);
      f._workspace = o;
      o._propertyFrames.set(p, f);
   }
   return f;
}
function FDsResourceFrameSet_switchContent(typeCd){
   var o = this;
   o._resourceTypeCd = typeCd;
   o._listContent.serviceSearch(typeCd, '', 40, 0);
}
function FDsResourceFrameSet_load(){
   var o = this;
   o.switchContent('mesh');
}
function FDsResourceFrameSet_dispose(){
   var o = this;
   o.__base.FUiFrameSet.dispose.call(o);
   o._propertyFrames.dispose();
   o._propertyFrames = null;
}
function FDsResourceImportDialog(o){
   o = RClass.inherits(this, o, FUiDialog);
   o._frameName            = 'design3d.resource.ImportDialog';
   o._nodeGuid             = null;
   o._controlPrivateButton = null;
   o._controlTeamButton    = null;
   o._controlShareButton   = null;
   o.onBuilded             = FDsResourceImportDialog_onBuilded;
   o.onFileChange          = FDsResourceImportDialog_onFileChange;
   o.onFileLoaded          = FDsResourceImportDialog_onFileLoaded;
   o.onConfirmLoad         = FDsResourceImportDialog_onConfirmLoad;
   o.onConfirmClick        = FDsResourceImportDialog_onConfirmClick;
   o.onCancelClick         = FDsResourceImportDialog_onCancelClick;
   o.construct             = FDsResourceImportDialog_construct;
   o.setNodeLabel          = FDsResourceImportDialog_setNodeLabel;
   o.switchMode            = FDsResourceFolderDialog_switchMode;
   o.dispose               = FDsResourceImportDialog_dispose;
   return o;
}
function FDsResourceImportDialog_onBuilded(p){
   var o = this;
   o.__base.FUiDialog.onBuilded.call(o, p);
   o._controlNodeLabel.setEditAble(false);
   o._controlFile.addDataChangedListener(o, o.onFileChange);
   o._controlConfirmButton.addClickListener(o, o.onConfirmClick);
   o._controlCancelButton.addClickListener(o, o.onCancelClick);
}
function FDsResourceImportDialog_onFileChange(event){
   var o = this;
   var name = o._controlFile.get();
   var code = RFile.name(name);
   if(RString.isEmpty(o._controlCode.get())){
      o._controlCode.set(code);
   }
   if(RString.isEmpty(o._controlLabel.get())){
      o._controlLabel.set(code);
   }
}
function FDsResourceImportDialog_onFileLoaded(event){
   var o = this;
   var reader = o._fileReader;
   var code = o._controlCode.get();
   var label = o._controlLabel.get();
   var url = null;
   if(o._modeCd == 'picture'){
      url = '/cloud.content2d.bitmap.wv?do=importData';
   }else if(o._modeCd == 'mesh'){
      url = '/cloud.content.mesh.wv?do=importData';
   }else{
      throw new TError(o, 'Mode is invalid.');
   }
   if(o._nodeGuid){
      url += '&node_guid=' + o._nodeGuid;
   }
   url += '&code=' + code + '&label=' + label + '&data_length=' + reader.length() + '&file_name=' + reader.fileName();
   url = RBrowser.urlEncode(url);
   var connection = RConsole.find(FHttpConsole).send(url, reader.data());
   connection.addLoadListener(o, o.onConfirmLoad);
   o._fileReader = RObject.dispose(reader);
}
function FDsResourceImportDialog_onConfirmLoad(event){
   var o = this;
   RConsole.find(FUiDesktopConsole).hide();
   o.hide();
   var frame = o._frameSet._listContent;
   frame.serviceResearch();
}
function FDsResourceImportDialog_onConfirmClick(event){
   var o = this;
   RConsole.find(FUiDesktopConsole).showUploading();
   var file = o._controlFile._hInput.files[0];
   var reader = o._fileReader = RClass.create(FFileReader);
   reader.addLoadListener(o, o.onFileLoaded);
   reader.loadFile(file);
}
function FDsResourceImportDialog_onCancelClick(event){
   this.hide();
}
function FDsResourceImportDialog_construct(){
   var o = this;
   o.__base.FUiDialog.construct.call(o);
}
function FDsResourceImportDialog_setNodeLabel(label){
   var o = this;
   o._controlNodeLabel.set(label);
}
function FDsResourceFolderDialog_switchMode(modeCd){
   var o = this;
   o._modeCd = modeCd;
   if(modeCd == 'picture'){
      o.setLabel('导入图片资源');
   }else if(modeCd == 'mesh'){
      o.setLabel('倒入网格资源');
   }else{
      throw new TError(o, 'Unknown mode.');
   }
}
function FDsResourceImportDialog_dispose(){
   var o = this;
   o.__base.FUiDialog.dispose.call(o);
}
function FDsResourceListContent(o){
   o = RClass.inherits(this, o, FUiListView);
   o._activeItem       = null;
   o._activeGuid       = null;
   o._refreshButton    = null;
   o._saveButton       = null;
   o._runButton        = null;
   o.onBuilded         = FDsResourceListContent_onBuilded;
   o.onServiceLoad     = FDsResourceListContent_onServiceLoad;
   o.construct         = FDsResourceListContent_construct;
   o.doClickItem       = FDsResourceListContent_doClickItem;
   o.doDoubleClickItem = FDsResourceListContent_doDoubleClickItem;
   o.serviceSearch     = FDsResourceListContent_serviceSearch;
   o.serviceResearch   = FDsResourceListContent_serviceResearch;
   o.dispose           = FDsResourceListContent_dispose;
   return o;
}
function FDsResourceListContent_onBuilded(p){
   var o = this;
   o.__base.FUiListView.onBuilded.call(o, p);
}
function FDsResourceListContent_onServiceLoad(p){
   var o = this;
   var xitems = p.root.findNode('ResourceCollection');
   var pageSize = xitems.getInteger('page_size');
   var pageCount = xitems.getInteger('page_count');
   var page = xitems.getInteger('page');
   o._frameSet._listToolbar.setNavigator(pageSize, pageCount, page);
   o.clear();
   var xnodes = xitems.nodes();
   var count = xnodes.count();
   for(var i = 0; i < count; i++){
      var xnode = xnodes.getAt(i);
      if(xnode.isName('Resource')){
         var item = o.createItem(FDsResourceListItem);
         item.propertyLoad(xnode);
         item._guid = xnode.get('guid');
         item._typeCd = xnode.get('type_cd');
         item._code = xnode.get('code');
         item._updateDate = xnode.get('update_date');
         item.setTypeLabel(item._typeCd);
         item.setLabel(RString.nvl(xnode.get('label'), xnode.get('code')));
         item.refreshStyle();
         o.push(item);
      }
   }
   RConsole.find(FUiDesktopConsole).hide();
}
function FDsResourceListContent_construct(){
   var o = this;
   o.__base.FUiListView.construct.call(o);
}
function FDsResourceListContent_doClickItem(control){
   var o = this;
   o.__base.FUiListView.doClickItem.call(o, control);
   o._activeItem = control;
   o._activeGuid = control._guid;
}
function FDsResourceListContent_doDoubleClickItem(control){
   var o = this;
   o.__base.FUiListView.doDoubleClickItem.call(o, control)
   var guid = control._guid;
   o._activeItem = control;
   o._activeGuid = control._guid;
   var workspace = o._frameSet._workspace;
   var typeCd = control._typeCd;
   if(typeCd == 'Bitmap'){
      workspace.selectFrameSet(EDsFrameSet.BitmapFrameSet, guid);
   }else if(typeCd == 'Mesh3d'){
      workspace.selectFrameSet(EDsFrameSet.MeshFrameSet, guid);
   }else{
      throw new TError(o, 'Unsupport format.');
   }
}
function FDsResourceListContent_serviceSearch(typeCd, serach, pageSize, page){
   var o = this;
   o._typeCd = typeCd;
   o._serach = serach;
   o._pageSize = pageSize;
   o._page = page;
   RConsole.find(FUiDesktopConsole).showLoading();
   var url = '/cloud.content3d.resource.ws?action=list&type_cd=' + typeCd + '&serach=' + serach + '&page_size=' + pageSize + '&page=' + page;
   var connection = RConsole.find(FXmlConsole).sendAsync(url);
   connection.addLoadListener(o, o.onServiceLoad);
}
function FDsResourceListContent_serviceResearch(){
   var o = this;
   o.serviceSearch(o._typeCd, o._serach, o._pageSize, o._page);
}
function FDsResourceListContent_dispose(){
   var o = this;
   o.__base.FUiListView.dispose.call(o);
}
function FDsResourceListItem(o){
   o = RClass.inherits(this, o, FUiListViewItem);
   o._styleTypePanel = RClass.register(o, new AStyle('_styleTypePanel'));
   o._styleTypeLabel = RClass.register(o, new AStyle('_styleTypeLabel'));
   o.onBuild         = FDsResourceListItem_onBuild;
   o.setTypeLabel    = FDsResourceListItem_setTypeLabel;
   o.refreshStyle    = FDsResourceListItem_refreshStyle;
   return o;
}
function FDsResourceListItem_onBuild(p){
   var o = this;
   o.__base.FUiListViewItem.onBuild.call(o, p);
   var h = o._hPanel;
   h.style.width = '200px';
   h.style.height = '150px';
   o._hLine1.className = o.styleName('TypePanel');
   o._hLine1.vAlign = 'top';
   o._hTypeLabel = RBuilder.appendDiv(o._hLine1, o.styleName('TypeLabel'));
}
function FDsResourceListItem_setTypeLabel(label){
   this._hTypeLabel.innerHTML = label;
}
function FDsResourceListItem_refreshStyle(){
   var o = this;
   var url = '/cloud.content.resource.preview.wv?type_cd=' + o._typeCd + '&guid=' + o._guid + '&update_date=' + o._updateDate;
   o._hForm.style.backgroundImage = 'url("' + url + '")';
}
function FDsResourceListToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   o._frameName       = 'design3d.resource.ListToolBar';
   o._pageCount       = 0;
   o._page            = 0;
   o._serach          = null;
   o._resourceTypeCd  = null;
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
   o.onBuilded        = FDsResourceListToolBar_onBuilded;
   o.onSearchClick    = FDsResourceListToolBar_onSearchClick;
   o.onNavigatorClick = FDsResourceListToolBar_onNavigatorClick;
   o.construct        = FDsResourceListToolBar_construct;
   o.setNavigator     = FDsResourceListToolBar_setNavigator;
   o.doNavigator      = FDsResourceListToolBar_doNavigator;
   o.dispose          = FDsResourceListToolBar_dispose;
   return o;
}
function FDsResourceListToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
   o._controlSearchEdit.addClickListener(o, o.onSearchClick);
   o._controlFirstButton.addClickListener(o, o.onNavigatorClick);
   o._controlPriorButton.addClickListener(o, o.onNavigatorClick);
   o._controlNextButton.addClickListener(o, o.onNavigatorClick);
   o._controlLastButton.addClickListener(o, o.onNavigatorClick);
}
function FDsResourceListToolBar_onSearchClick(p){
   this.doNavigator(0);
}
function FDsResourceListToolBar_onNavigatorClick(event){
   var o = this;
   var sender = event.sender;
   var name = sender.name();
   var page = o._page;
   switch(name){
      case 'firstButton':
         page = 0;
         break;
      case 'priorButton':
         page--;
         break;
      case 'nextButton':
         page++;
         break;
      case 'lastButton':
         page = o._pageCount;
         break;
   }
   o.doNavigator(page);
}
function FDsResourceListToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsResourceListToolBar_setNavigator(pageSize, pageCount, page){
   var o = this;
   o._pageSize = pageSize;
   o._pageCount = pageCount;
   o._page = page;
   o._controlPageEdit.setText(page);
   if(page == 0){
   }
}
function FDsResourceListToolBar_doNavigator(page){
   var o = this;
   page = RInteger.toRange(page, 0, o._pageCount);
   var search = o._controlSearchEdit.text();
   var typeCd = o._frameSet._resourceTypeCd;
   if((o._resourceTypeCd != typeCd) || (o._serach != search) || (o._page != page)){
      o._frameSet._listContent.serviceSearch(typeCd, search, o._pageSize, page)
   }
   o._resourceTypeCd = typeCd;
   o._serach = search;
}
function FDsResourceListToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsResourceMenuBar(o){
   o = RClass.inherits(this, o, FUiMenuBar);
   o._frameName                  = 'design3d.resource.MenuBar';
   o._controlImportPictureButton = null;
   o._controlImportMeshButton    = null;
   o._controlDeleteButton        = null;
   o.onBuilded                   = FDsResourceMenuBar_onBuilded;
   o.onImportPictureClick        = FDsResourceMenuBar_onImportPictureClick;
   o.onImportMeshClick           = FDsResourceMenuBar_onImportMeshClick;
   o.onDeleteLoad                = FDsResourceMenuBar_onDeleteLoad;
   o.onDeleteExecute             = FDsResourceMenuBar_onDeleteExecute;
   o.onDeleteClick               = FDsResourceMenuBar_onDeleteClick;
   o.construct                   = FDsResourceMenuBar_construct;
   o.dispose                     = FDsResourceMenuBar_dispose;
   return o;
}
function FDsResourceMenuBar_onBuilded(p){
   var o = this;
   o.__base.FUiMenuBar.onBuilded.call(o, p);
   o._controlImportPictureButton.addClickListener(o, o.onImportPictureClick);
   o._controlImportMeshButton.addClickListener(o, o.onImportMeshClick);
   o._controlDeleteButton.addClickListener(o, o.onDeleteClick);
}
function FDsResourceMenuBar_onImportPictureClick(p){
   var o = this;
   var frameSet = o._workspace._activeFrameSet;
   var catalog = frameSet._catalogContent;
   var node = catalog.focusNode();
   var nodeGuid = null;
   var nodeLabel = null;
   if(node){
      nodeGuid = node.guid();
      nodeLabel = node.label();
   }
   var dialog = RConsole.find(FUiWindowConsole).find(FDsResourceImportDialog);
   dialog._frameSet = o._frameSet;
   dialog._workspace = o._workspace;
   dialog._nodeGuid = nodeGuid;
   dialog.setNodeLabel(nodeLabel);
   dialog.switchMode('picture');
   dialog.showPosition(EUiPosition.Center);
}
function FDsResourceMenuBar_onImportMeshClick(p){
   var o = this;
   var frameSet = o._workspace._activeFrameSet;
   var catalog = frameSet._catalogContent;
   var node = catalog.focusNode();
   var nodeGuid = null;
   var nodeLabel = null;
   if(node){
      nodeGuid = node.guid();
      nodeLabel = node.label();
   }
   var dialog = RConsole.find(FUiWindowConsole).find(FDsResourceImportDialog);
   dialog._frameSet = o._frameSet;
   dialog._workspace = o._workspace;
   dialog._nodeGuid = nodeGuid;
   dialog.setNodeLabel(nodeLabel);
   dialog.switchMode('mesh');
   dialog.showPosition(EUiPosition.Center);
}
function FDsResourceMenuBar_onDeleteLoad(event){
   var o = this;
   var frame = o._frameSet._listContent;
   frame.serviceResearch();
   RWindow.enable();
}
function FDsResourceMenuBar_onDeleteExecute(event){
   var o = this;
   var item = o._frameSet._listContent._activeItem;
   var typeCd = item._typeCd;
   var guid = item._guid;
   RWindow.disable();
   var connection = RConsole.find(FDrResourceConsole).doDelete(typeCd, guid);
   connection.addLoadListener(o, o.onDeleteLoad);
}
function FDsResourceMenuBar_onDeleteClick(event){
   var o = this;
   var item = o._frameSet._listContent._activeItem;
   if(!item){
      return alert('请选中后再点击删除');
   }
   var dialog = RConsole.find(FUiMessageConsole).showConfirm('请确认是否删除当前资源？');
   dialog.addResultListener(o, o.onDeleteExecute);
}
function FDsResourceMenuBar_construct(){
   var o = this;
   o.__base.FUiMenuBar.construct.call(o);
}
function FDsResourceMenuBar_dispose(){
   var o = this;
   o.__base.FUiMenuBar.dispose.call(o);
}
function FDsResourceMeshFrameSet(o){
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
   o.onBuilded             = FDsResourceMeshFrameSet_onBuilded;
   o.onMeshLoad            = FDsResourceMeshFrameSet_onMeshLoad;
   o.onCatalogSelected     = FDsResourceMeshFrameSet_onCatalogSelected;
   o.construct             = FDsResourceMeshFrameSet_construct;
   o.findPropertyFrame     = FDsResourceMeshFrameSet_findPropertyFrame;
   o.loadMeshByGuid        = FDsResourceMeshFrameSet_loadMeshByGuid;
   o.loadMeshByCode        = FDsResourceMeshFrameSet_loadMeshByCode;
   o.dispose               = FDsResourceMeshFrameSet_dispose;
   return o;
}
function FDsResourceMeshFrameSet_onBuilded(p){
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
function FDsResourceMeshFrameSet_onMeshLoad(p){
   var o = this;
   o._activeSpace = p._activeSpace;
   o._catalog.buildSpace(o._activeSpace);
}
function FDsResourceMeshFrameSet_onCatalogSelected(p, pc){
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
function FDsResourceMeshFrameSet_construct(){
   var o = this;
   o.__base.FUiFrameSet.construct.call(o);
   o._propertyFrames = new TDictionary();
}
function FDsResourceMeshFrameSet_findPropertyFrame(p){
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
function FDsResourceMeshFrameSet_loadMeshByGuid(p){
   var o = this;
   o._meshGuid = p;
   o._canvas.loadMeshByGuid(p);
}
function FDsResourceMeshFrameSet_loadMeshByCode(p){
   var o = this;
   o._meshCode = p;
   o._canvas.loadMeshByCode(p);
}
function FDsResourceMeshFrameSet_dispose(){
   var o = this;
   o.__base.FUiFrameSet.dispose.call(o);
   o._propertyFrames.dispose();
   o._propertyFrames = null;
}
function FDsResourcePropertyContent(o){
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
   o.onBuild              = FDsResourcePropertyContent_onBuild;
   o.onMouseCaptureStart  = FDsResourcePropertyContent_onMouseCaptureStart;
   o.onMouseCapture       = FDsResourcePropertyContent_onMouseCapture;
   o.onMouseCaptureStop   = FDsResourcePropertyContent_onMouseCaptureStop;
   o.onEnterFrame         = FDsResourcePropertyContent_onEnterFrame;
   o.onMeshLoad           = FDsResourcePropertyContent_onMeshLoad;
   o.oeResize             = FDsResourcePropertyContent_oeResize;
   o.oeRefresh            = FDsResourcePropertyContent_oeRefresh;
   o.construct            = FDsResourcePropertyContent_construct;
   o.innerSelectDisplay   = FDsResourcePropertyContent_innerSelectDisplay;
   o.innerSelectLayer     = FDsResourcePropertyContent_innerSelectLayer;
   o.selectNone           = FDsResourcePropertyContent_selectNone;
   o.selectDisplay        = FDsResourcePropertyContent_selectDisplay;
   o.selectMaterial       = FDsResourcePropertyContent_selectMaterial;
   o.selectRenderable     = FDsResourcePropertyContent_selectRenderable;
   o.switchRotation       = FDsResourcePropertyContent_switchRotation;
   o.reloadRegion         = FDsResourcePropertyContent_reloadRegion;
   o.loadMeshByGuid       = FDsResourcePropertyContent_loadMeshByGuid;
   o.loadMeshByCode       = FDsResourcePropertyContent_loadMeshByCode;
   o.dispose              = FDsResourcePropertyContent_dispose;
   return o;
}
function FDsResourcePropertyContent_onBuild(p){
   var o = this;
   o.__base.FDsCanvas.onBuild.call(o, p);
}
function FDsResourcePropertyContent_onMouseCaptureStart(p){
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
function FDsResourcePropertyContent_onMouseCapture(p){
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
function FDsResourcePropertyContent_onMouseCaptureStop(p){
   var o = this;
   RHtml.cursorSet(o._hPanel, EUiCursor.Auto);
}
function FDsResourcePropertyContent_onEnterFrame(){
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
function FDsResourcePropertyContent_onMeshLoad(p){
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
function FDsResourcePropertyContent_oeResize(p){
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
function FDsResourcePropertyContent_oeRefresh(p){
   return EEventStatus.Stop;
}
function FDsResourcePropertyContent_construct(){
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
function FDsResourcePropertyContent_innerSelectDisplay(p){
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
function FDsResourcePropertyContent_innerSelectLayer(p){
   var o = this;
   var s = p.displays();
   var c = s.count();
   for(var i = 0; i < c; i++){
      var d = s.getAt(i);
      o.innerSelectDisplay(d)
   }
}
function FDsResourcePropertyContent_selectNone(){
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
function FDsResourcePropertyContent_selectDisplay(p){
   var o = this;
   o.selectNone();
   o._selectObject = p;
   o.innerSelectDisplay(p);
}
function FDsResourcePropertyContent_selectMaterial(p){
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
function FDsResourcePropertyContent_selectRenderable(p){
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
function FDsResourcePropertyContent_switchMode(p){
   var o = this;
   o._canvasModeCd = p;
   o.selectRenderable(o._selectRenderable);
}
function FDsResourcePropertyContent_switchRotation(p){
   this._optionRotation = p;
}
function FDsResourcePropertyContent_reloadRegion(region){
   var o = this;
   var resource = region.resource();
   o._cameraMoveRate = resource.moveSpeed();
   o._cameraKeyRotation = resource.rotationKeySpeed();
   o._cameraMouseRotation = resource.rotationMouseSpeed();
}
function FDsResourcePropertyContent_loadMeshByGuid(p){
   var o = this;
   var rmc = RConsole.find(FE3dMeshConsole);
   if(o._activeSpace != null){
   }
   var space = o._activeSpace = rmc.allocByGuid(o, p);
   space.addLoadListener(o, o.onMeshLoad);
   space._layer.pushRenderable(o._dimensional);
   RStage.register('mesh3d', space);
}
function FDsResourcePropertyContent_loadMeshByCode(p){
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
function FDsResourcePropertyContent_dispose(){
   var o = this;
   o._rotation = RObject.dispose(o._rotation);
x   // 父处理
   o.__base.FDsCanvas.dispose.call(o);
}
function FDsResourcePropertyToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   o._frameName             = 'design3d.resource.PropertyToolBar';
   o._controlInsertButton   = null;
   o._controlUpdateButton   = null;
   o._controlDeleteButton   = null;
   o._controlRotationButton = null;
   o.onBuilded              = FDsResourcePropertyToolBar_onBuilded;
   o.onUpdateClick          = FDsResourcePropertyToolBar_onUpdateClick;
   o.onRotationClick        = FDsResourcePropertyToolBar_onRotationClick;
   o.construct              = FDsResourcePropertyToolBar_construct;
   o.dispose                = FDsResourcePropertyToolBar_dispose;
   return o;
}
function FDsResourcePropertyToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
   o._controlUpdateButton.addClickListener(o, o.onUpdateClick);
   o._controlRotationButton.addClickListener(o, o.onRotationClick);
}
function FDsResourcePropertyToolBar_onUpdateClick(event){
   var o = this;
}
function FDsResourcePropertyToolBar_onRotationClick(event){
   var o = this;
   var previewContent = o._workspace._previewContent;
   previewContent.switchRotation(event.checked);
}
function FDsResourcePropertyToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsResourcePropertyToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsResourceTabBar(o){
   o = RClass.inherits(this, o, FUiTabBar);
   o._frameName             = 'design3d.resource.TabBar';
   o._resourceTypeCd        = 'mesh';
   o._controlPictureButton  = null;
   o._controlSoundButton    = null;
   o._controlVidioButton    = null;
   o._controlTextureButton  = null;
   o._controlMaterialButton = null;
   o._controlMeshButton     = null;
   o._controlModelButton    = null;
   o._controlTemplateButton = null;
   o._controlSceneButton    = null;
   o.onBuilded              = FDsResourceTabBar_onBuilded;
   o.onButtonClick          = FDsResourceTabBar_onButtonClick;
   o.construct              = FDsResourceTabBar_construct;
   o.dispose                = FDsResourceTabBar_dispose;
   return o;
}
function FDsResourceTabBar_onBuilded(p){
   var o = this;
   o.__base.FUiTabBar.onBuilded.call(o, p);
   o._controlPictureButton.addClickListener(o, o.onButtonClick);
   o._controlSoundButton.addClickListener(o, o.onButtonClick);
   o._controlVidioButton.addClickListener(o, o.onButtonClick);
   o._controlTextureButton.addClickListener(o, o.onButtonClick);
   o._controlMaterialButton.addClickListener(o, o.onButtonClick);
   o._controlMeshButton.addClickListener(o, o.onButtonClick);
   o._controlModelButton.addClickListener(o, o.onButtonClick);
   o._controlTemplateButton.addClickListener(o, o.onButtonClick);
   o._controlSceneButton.addClickListener(o, o.onButtonClick);
}
function FDsResourceTabBar_onButtonClick(event){
   var o = this;
   var sender = event.sender;
   var name = sender.name();
   o._resourceTypeCd = name;
   R
}
function FDsResourceTabBar_construct(){
   var o = this;
   o.__base.FUiTabBar.construct.call(o);
}
function FDsResourceTabBar_dispose(){
   var o = this;
   o.__base.FUiTabBar.dispose.call(o);
}
function FDsResourceWorkspace(o){
   o = RClass.inherits(this, o, FUiWorkspace);
   o._frameName            = 'design3d.resource.Workspace';
   o._styleToolbarGround   = RClass.register(o, new AStyle('_styleToolbarGround', 'Toolbar_Ground'));
   o._styleStatusbarGround = RClass.register(o, new AStyle('_styleStatusbarGround', 'Statusbar_Ground'));
   o._styleCatalogGround   = RClass.register(o, new AStyle('_styleCatalogGround', 'Catalog_Ground'));
   o._styleCatalogToolbar  = RClass.register(o, new AStyle('_styleCatalogToolbar', 'Catalog_Toolbar'));
   o._styleSearchGround    = RClass.register(o, new AStyle('_styleSearchGround', 'Search_Ground'));
   o._styleSearchToolbar   = RClass.register(o, new AStyle('_styleCatalogToolbar', 'Search_Toolbar'));
   o._stylePreviewGround   = RClass.register(o, new AStyle('_stylePreviewGround', 'Preview_Ground'));
   o._stylePreviewToolbar  = RClass.register(o, new AStyle('_stylePreviewToolbar', 'Preview_Toolbar'));
   o._stylePropertyGround  = RClass.register(o, new AStyle('_stylePropertyGround', 'Property_Ground'));
   o._styleWorkspaceGround = RClass.register(o, new AStyle('_styleWorkspaceGround', 'Workspace_Ground'));
   o._resourceTypeCd       = 'picture';
   o._frameToolBar         = null;
   o._frameStatusBar       = null;
   o._frameCatalog         = null;
   o._frameCatalogToolbar  = null;
   o._frameCatalogContent  = null;
   o._frameSearch          = null;
   o._frameSearchToolbar   = null;
   o._frameSearchContent   = null;
   o._framePreview         = null;
   o._framePreviewToolbar  = null;
   o._framePreviewContent  = null;
   o._propertyFrames       = null;
   o.onBuilded             = FDsResourceWorkspace_onBuilded;
   o.onMeshLoad            = FDsResourceWorkspace_onMeshLoad;
   o.onCatalogSelected     = FDsResourceWorkspace_onCatalogSelected;
   o.construct             = FDsResourceWorkspace_construct;
   o.findPropertyFrame     = FDsResourceWorkspace_findPropertyFrame;
   o.switchContent         = FDsResourceWorkspace_switchContent;
   o.load                  = FDsResourceWorkspace_load;
   o.dispose               = FDsResourceWorkspace_dispose;
   return o;
}
function FDsResourceWorkspace_onBuilded(p){
   var o = this;
   o.__base.FUiWorkspace.onBuilded.call(o, p);
   var frame = o._frameToolBar = o.searchControl('toolbarFrame');
   frame._hPanel.className = o.styleName('Toolbar_Ground');
   var frame = o._frameBody = o.searchControl('bodyFrame');
   frame._hPanel.className = o.styleName('Catalog_Ground');
   var frame = o._frameStatusBar = o.searchControl('statusFrame');
   frame._hPanel.className = o.styleName('Statusbar_Ground');
   var hTable = RBuilder.createTable(p);
   hTable.width = '100%';
   var hRow = RBuilder.appendTableRow(hTable);
   var c = o._toolbar = RClass.create(FDsResourceMenuBar);
   c._workspace = o;
   c.buildDefine(p);
   var hCell = RBuilder.appendTableCell(hRow);
   hCell.appendChild(c._hPanel);
   var c = o._tabBar = RClass.create(FDsResourceTabBar);
   c._workspace = o;
   c.buildDefine(p);
   var hCell = RBuilder.appendTableCell(hRow);
   hCell.width = '450px';
   hCell.align = 'right';
   hCell.vAlign = 'bottom';
   hCell.appendChild(c._hPanel);
   o._frameToolBar._hPanel.appendChild(hTable);
   var frameSet = o._frameSet = RClass.create(FDsResourceFrameSet);
   frameSet._workspace = o;
   frameSet.buildDefine(p);
   o._frameBody.push(frameSet);
   frameSet.switchContent(o._resourceTypeCd);
}
function FDsResourceWorkspace_onMeshLoad(p){
   var o = this;
   o._activeSpace = p._activeSpace;
   o._catalog.buildSpace(o._activeSpace);
}
function FDsResourceWorkspace_onCatalogSelected(p, pc){
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
function FDsResourceWorkspace_construct(){
   var o = this;
   o.__base.FUiWorkspace.construct.call(o);
   o._propertyFrames = new TDictionary();
}
function FDsResourceWorkspace_findPropertyFrame(p){
   var o = this;
   var f = o._propertyFrames.get(p);
   if(!f){
      var fc = RConsole.find(FFrameConsole);
      f = fc.get(o, p, o._framePreview._hContainer);
      f._workspace = o;
      o._propertyFrames.set(p, f);
   }
   return f;
}
function FDsResourceWorkspace_switchContent(typeCd){
   this._frameSet.switchContent(typeCd);
}
function FDsResourceWorkspace_load(){
   var o = this;
}
function FDsResourceWorkspace_dispose(){
   var o = this;
   o.__base.FUiWorkspace.dispose.call(o);
   o._propertyFrames.dispose();
   o._propertyFrames = null;
}
var temp = 0;
function FDsBitmapCanvasContent(o){
   o = RClass.inherits(this, o, FDsCanvas);
   o._activeGuid          = null;
   o._activeSpace         = null;
   o._activeBitmap        = null;
   o._autoDistance        = null;
   o._autoOutline         = null;
   o._autoMatrix          = null;
   o._canvasModeCd        = EDsCanvasMode.Drop;
   o._canvasMoveCd        = EDsCanvasDrag.Unknown;
   o._capturePosition     = null;
   o._captureCameraPosition = null;
   o._dimensional         = null;
   o._switchWidth         = '*';
   o._switchHeight        = '*';
   o._cameraMoveRate      = 8;
   o._cameraKeyRotation   = 3;
   o._cameraMouseMove     = 0.05;
   o._templateMatrix      = null;
   o._templateRenderable  = null;
   o._templateFace        = null;
   o._templateTranslation = null;
   o._templateRotation    = null;
   o._templateScale       = null;
   o._templateViewScale   = 0.05;
   o.onBuild              = FDsBitmapCanvasContent_onBuild;
   o.onMouseCaptureStart  = FDsBitmapCanvasContent_onMouseCaptureStart;
   o.onMouseCapture       = FDsBitmapCanvasContent_onMouseCapture;
   o.onMouseCaptureStop   = FDsBitmapCanvasContent_onMouseCaptureStop;
   o.onEnterFrame         = FDsBitmapCanvasContent_onEnterFrame;
   o.onLoaded             = FDsBitmapCanvasContent_onLoaded;
   o.oeResize             = FDsBitmapCanvasContent_oeResize;
   o.oeRefresh            = FDsBitmapCanvasContent_oeRefresh;
   o.construct            = FDsBitmapCanvasContent_construct;
   o.switchSize           = FDsBitmapCanvasContent_switchSize;
   o.viewAutoSize         = FDsBitmapCanvasContent_viewAutoSize;
   o.reloadRegion         = FDsBitmapCanvasContent_reloadRegion;
   o.loadByGuid           = FDsBitmapCanvasContent_loadByGuid;
   o.dispose              = FDsBitmapCanvasContent_dispose;
   return o;
}
function FDsBitmapCanvasContent_onBuild(p){
   var o = this;
   o.__base.FDsCanvas.onBuild.call(o, p);
   var hPanel = o._hPanel;
   var space = o._activeSpace = RClass.create(FE3dSimpleStage);
   space.linkGraphicContext(o);
   space.selectTechnique(o, FE3dGeneralTechnique);
   space.region().backgroundColor().set(1, 1, 1, 1);
   space.region().linkGraphicContext(o);
   RStage.register('space', space);
   var camera = space.camera();
   camera.setPosition(0, 0, -10);
   camera.lookAt(0, 0, 0);
   camera.update();
   var projection = camera.projection();
   projection.size().set(hPanel.width, hPanel.height);
   projection._angle = 45;
   projection.update();
   var bitmap = o._activeBitmap = RClass.create(FE3dBitmap)
   bitmap.linkGraphicContext(o);
   bitmap.setup();
   space.spriteLayer().pushRenderable(bitmap);
}
function FDsBitmapCanvasContent_onMouseCaptureStart(event){
   var o = this;
   var space = o._activeSpace;
   if(!space){
      return;
   }
   o._capturePosition.set(event.clientX, event.clientY);
   o._captureCameraPosition.assign(space.camera().position());
   RHtml.cursorSet(o._hPanel, EUiCursor.Pointer);
}
function FDsBitmapCanvasContent_onMouseCapture(event){
   var o = this;
   var space = o._activeSpace;
   if(!space){
      return;
   }
   var cx = event.clientX - o._capturePosition.x;
   var cy = event.clientY - o._capturePosition.y;
   var mv = o._canvasMoveCd;
   var cm = o._captureMatrix;
   switch(o._canvasModeCd){
      case EDsCanvasMode.Drop:
         var camera = space.camera();
         camera.position().x = o._captureCameraPosition.x - cx * o._cameraMouseMove;
         camera.position().z = o._captureCameraPosition.z - cy * o._cameraMouseMove;
         camera.update();
         break;
   }
}
function FDsBitmapCanvasContent_onMouseCaptureStop(p){
   var o = this;
   RHtml.cursorSet(o._hPanel, EUiCursor.Auto);
}
function FDsBitmapCanvasContent_onEnterFrame(){
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
}
function FDsBitmapCanvasContent_onLoaded(event){
   var o = this;
   RConsole.find(FUiDesktopConsole).hide();
}
function FDsBitmapCanvasContent_oeResize(p){
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
function FDsBitmapCanvasContent_oeRefresh(p){
   return EEventStatus.Stop;
}
function FDsBitmapCanvasContent_construct(){
   var o = this;
   o.__base.FDsCanvas.construct.call(o);
   o._autoDistance = new SPoint3(6, 6, 6);
   o._autoOutline = new SOutline3d();
   o._autoMatrix = new SMatrix3d();
   o._capturePosition = new SPoint2();
   o._captureCameraPosition = new SPoint3();
}
function FDsBitmapCanvasContent_selectDisplay(p){
   var o = this;
   o.selectNone();
   o._selectObject = p;
   o.innerSelectDisplay(p);
}
function FDsBitmapCanvasContent_switchMode(p){
   var o = this;
   o._canvasModeCd = p;
}
function FDsBitmapCanvasContent_switchSize(width, height){
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
function FDsBitmapCanvasContent_viewAutoSize(flipX, flipY, flipZ, rotationX, rotationY, rotationZ){
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
function FDsBitmapCanvasContent_reloadRegion(region){
   var o = this;
   var resource = region.resource();
   o._cameraMoveRate = resource.moveSpeed();
   o._cameraKeyRotation = resource.rotationKeySpeed();
   o._cameraMouseMove = resource.rotationMouseSpeed();
}
function FDsBitmapCanvasContent_loadByGuid(guid){
   var o = this;
   RConsole.find(FUiDesktopConsole).showLoading();
   var url = '/cloud.content2d.bitmap.image.wv?do=view&guid=' + guid;
   var bitmap = o._activeBitmap;
   bitmap.loadUrl(url);
   bitmap.clearLoadListeners();
   bitmap.addLoadListener(o, o.onLoaded);
}
function FDsBitmapCanvasContent_dispose(){
   var o = this;
   o.__base.FDsCanvas.dispose.call(o);
}
function FDsBitmapCanvasToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   o._frameName                 = 'design2d.bitmap.CanvasToolBar';
   o._canvasModeCd              = EDsCanvasMode.Drop;
   o._controlDrop               = null;
   o._controlSize1              = null;
   o._controlSize2              = null;
   o._controlSize3              = null;
   o._controlSize4              = null;
   o._controlSizeWidth          = null;
   o._controlSizeHeight         = null;
   o._controlRotationVisible = null;
   o._controlRotationWidth   = null;
   o._controlRotationHeight  = null;
   o._controlRotationAuto    = null;
   o._controlRotationFlipX   = null;
   o._controlRotationFlipY   = null;
   o._controlRotationFlipZ   = null;
   o._controlRotationX       = null;
   o._controlRotationY       = null;
   o._controlRotationZ       = null;
   o._controlRotation           = null;
   o.onBuilded                  = FDsBitmapCanvasToolBar_onBuilded;
   o.onModeClick                = FDsBitmapCanvasToolBar_onModeClick;
   o.onSizeClick                = FDsBitmapCanvasToolBar_onSizeClick;
   o.onRotationChange           = FDsBitmapCanvasToolBar_onRotationChange;
   o.onRotationAutoClick        = FDsBitmapCanvasToolBar_onRotationAutoClick;
   o.onRotationClick            = FDsBitmapCanvasToolBar_onRotationClick;
   o.construct                  = FDsBitmapCanvasToolBar_construct;
   o.dispose                    = FDsBitmapCanvasToolBar_dispose;
   return o;
}
function FDsBitmapCanvasToolBar_onBuilded(p){
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
}
function FDsBitmapCanvasToolBar_onModeClick(p){
   var o = this;
}
function FDsBitmapCanvasToolBar_onSizeClick(event){
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
function FDsBitmapCanvasToolBar_onRotationChange(event){
   var o = this;
   var canvas = o._frameSet._canvas;
   var visible = o._controlRotationVisible.isCheck();
   var width = RInteger.parse(o._controlRotationWidth.text());
   var height = RInteger.parse(o._controlRotationHeight.text());
   canvas.switchRotation(visible, width, height);
}
function FDsBitmapCanvasToolBar_onRotationAutoClick(event){
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
function FDsBitmapCanvasToolBar_onRotationClick(event, v){
   var o = this;
   var button = event.sender;
   var canvas = o._frameSet._canvas;
   canvas.switchRotation(button.isCheck());
}
function FDsBitmapCanvasToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsBitmapCanvasToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsBitmapCatalogContent(o){
   o = RClass.inherits(this, o, FUiListView);
   o._activeItem       = null;
   o._activeGuid       = null;
   o._refreshButton    = null;
   o._saveButton       = null;
   o._runButton        = null;
   o.onBuilded         = FDsBitmapCatalogContent_onBuilded;
   o.onServiceLoad     = FDsBitmapCatalogContent_onServiceLoad;
   o.construct         = FDsBitmapCatalogContent_construct;
   o.doClickItem       = FDsBitmapCatalogContent_doClickItem;
   o.doDoubleClickItem = FDsBitmapCatalogContent_doDoubleClickItem;
   o.serviceList       = FDsBitmapCatalogContent_serviceList;
   o.dispose           = FDsBitmapCatalogContent_dispose;
   return o;
}
function FDsBitmapCatalogContent_onBuilded(p){
   var o = this;
   o.__base.FUiListView.onBuilded.call(o, p);
}
function FDsBitmapCatalogContent_onServiceLoad(event){
   var o = this;
   var xitems = event.root.findNode('ImageCollection');
   o.clear();
   var xnodes = xitems.nodes();
   var count = xnodes.count();
   for(var i = 0; i < count; i++){
      var xnode = xnodes.getAt(i);
      if(xnode.isName('Image')){
         var item = o.createItem(FDsBitmapCatalogItem);
         item.propertyLoad(xnode);
         item._guid = xnode.get('guid');
         item._code = xnode.get('code');
         item._updateDate = xnode.get('update_date');
         item.setLabel(RString.nvl(xnode.get('label'), xnode.get('code')));
         item.refreshStyle();
         o.push(item);
      }
   }
   RConsole.find(FUiDesktopConsole).hide();
}
function FDsBitmapCatalogContent_construct(){
   var o = this;
   o.__base.FUiListView.construct.call(o);
}
function FDsBitmapCatalogContent_doClickItem(control){
   var o = this;
   o.__base.FUiListView.doClickItem.call(o, control);
   var guid = control._guid;
   o._activeItem = control;
   var canvas = o._frameSet._canvasContent;
   canvas.loadByGuid(guid);
}
function FDsBitmapCatalogContent_doDoubleClickItem(control){
   var o = this;
   o.__base.FUiListView.doDoubleClickItem.call(o, control)
   var guid = control._guid;
   o._activeItem = control;
   o._activeGuid = control._guid;
}
function FDsBitmapCatalogContent_serviceList(guid){
   var o = this;
   RConsole.find(FUiDesktopConsole).showLoading();
   var url = '/cloud.content2d.bitmap.image.ws?action=list&guid=' + guid;
   var connection = RConsole.find(FXmlConsole).sendAsync(url);
   connection.addLoadListener(o, o.onServiceLoad);
}
function FDsBitmapCatalogContent_dispose(){
   var o = this;
   o.__base.FUiListView.dispose.call(o);
}
function FDsBitmapCatalogItem(o){
   o = RClass.inherits(this, o, FUiListViewItem);
   o._styleTypePanel = RClass.register(o, new AStyle('_styleTypePanel'));
   o._styleTypeLabel = RClass.register(o, new AStyle('_styleTypeLabel'));
   o.onBuild         = FDsBitmapCatalogItem_onBuild;
   o.setTypeLabel    = FDsBitmapCatalogItem_setTypeLabel;
   o.refreshStyle    = FDsBitmapCatalogItem_refreshStyle;
   return o;
}
function FDsBitmapCatalogItem_onBuild(p){
   var o = this;
   o.__base.FUiListViewItem.onBuild.call(o, p);
   var h = o._hPanel;
   h.style.width = '200px';
   h.style.height = '150px';
   o._hLine1.className = o.styleName('TypePanel');
   o._hLine1.vAlign = 'top';
   o._hTypeLabel = RBuilder.appendDiv(o._hLine1, o.styleName('TypeLabel'));
}
function FDsBitmapCatalogItem_setTypeLabel(label){
   this._hTypeLabel.innerHTML = label;
}
function FDsBitmapCatalogItem_refreshStyle(){
   var o = this;
   var url = '/cloud.content2d.bitmap.image.wv?do=preview&guid=' + o._guid + '&update_date=' + o._updateDate;
   o._hForm.style.backgroundImage = 'url("' + url + '")';
}
function FDsBitmapCatalogToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   o._frameName                 = 'design2d.bitmap.CatalogToolBar';
   o._canvasModeCd              = EDsCanvasMode.Drop;
   o._controlDrop               = null;
   o._controlSize1              = null;
   o._controlSize2              = null;
   o._controlSize3              = null;
   o._controlSize4              = null;
   o._controlSizeWidth          = null;
   o._controlSizeHeight         = null;
   o._controlRotationVisible = null;
   o._controlRotationWidth   = null;
   o._controlRotationHeight  = null;
   o._controlRotationAuto    = null;
   o._controlRotationFlipX   = null;
   o._controlRotationFlipY   = null;
   o._controlRotationFlipZ   = null;
   o._controlRotationX       = null;
   o._controlRotationY       = null;
   o._controlRotationZ       = null;
   o._controlRotation           = null;
   o.onBuilded                  = FDsBitmapCatalogToolBar_onBuilded;
   o.onModeClick                = FDsBitmapCatalogToolBar_onModeClick;
   o.onSizeClick                = FDsBitmapCatalogToolBar_onSizeClick;
   o.onRotationChange           = FDsBitmapCatalogToolBar_onRotationChange;
   o.onRotationAutoClick        = FDsBitmapCatalogToolBar_onRotationAutoClick;
   o.onRotationClick            = FDsBitmapCatalogToolBar_onRotationClick;
   o.construct                  = FDsBitmapCatalogToolBar_construct;
   o.dispose                    = FDsBitmapCatalogToolBar_dispose;
   return o;
}
function FDsBitmapCatalogToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
}
function FDsBitmapCatalogToolBar_onModeClick(p){
   var o = this;
}
function FDsBitmapCatalogToolBar_onSizeClick(event){
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
function FDsBitmapCatalogToolBar_onRotationChange(event){
   var o = this;
   var canvas = o._frameSet._canvas;
   var visible = o._controlRotationVisible.isCheck();
   var width = RInteger.parse(o._controlRotationWidth.text());
   var height = RInteger.parse(o._controlRotationHeight.text());
   canvas.switchRotation(visible, width, height);
}
function FDsBitmapCatalogToolBar_onRotationAutoClick(event){
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
function FDsBitmapCatalogToolBar_onRotationClick(event, v){
   var o = this;
   var button = event.sender;
   var canvas = o._frameSet._canvas;
   canvas.switchRotation(button.isCheck());
}
function FDsBitmapCatalogToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsBitmapCatalogToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsBitmapFrameSet(o){
   o = RClass.inherits(this, o, FUiFrameSet);
   o._frameName            = 'design2d.bitmap.FrameSet';
   o._styleToolBarGround   = RClass.register(o, new AStyle('_styleToolBarGround', 'ToolBar_Ground'));
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
   o.onBuilded             = FDsBitmapFrameSet_onBuilded;
   o.onMeshLoad            = FDsBitmapFrameSet_onMeshLoad;
   o.onCatalogSelected     = FDsBitmapFrameSet_onCatalogSelected;
   o.construct             = FDsBitmapFrameSet_construct;
   o.findPropertyFrame     = FDsBitmapFrameSet_findPropertyFrame;
   o.loadByGuid            = FDsBitmapFrameSet_loadByGuid;
   o.loadByCode            = FDsBitmapFrameSet_loadByCode;
   o.dispose               = FDsBitmapFrameSet_dispose;
   return o;
}
function FDsBitmapFrameSet_onBuilded(p){
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
   var frame = o._catalogToolbarFrame = o.searchControl('catalogToolbarFrame');
   frame._hPanel.className = o.styleName('ToolBar_Ground');
   var toolbar = o._catalogToolbar = RClass.create(FDsBitmapCatalogToolBar);
   toolbar._frameSet = o;
   toolbar._workspace = o._worksapce;
   toolbar.buildDefine(p);
   frame.push(toolbar);
   var frame = o._catalogContentFrame = o.searchControl('catalogContentFrame');
   var catalogContent = o._catalogContent = RClass.create(FDsBitmapCatalogContent);
   catalogContent._frameSet = o;
   catalogContent._workspace = o._worksapce;
   catalogContent.build(p);
   frame.push(catalogContent);
   var frame = o._canvasToolbarFrame = o.searchControl('canvasToolbarFrame');
   frame._hPanel.className = o.styleName('ToolBar_Ground');
   var toolbar = o._canvasToolbar = RClass.create(FDsBitmapCanvasToolBar);
   toolbar._frameSet = o;
   toolbar._workspace = o._worksapce;
   toolbar.buildDefine(p);
   frame.push(toolbar);
   var frame = o._canvasContentFrame = o.searchControl('canvasContentFrame');
   var canvas = o._canvasContent = RClass.create(FDsBitmapCanvasContent);
   canvas._frameSet = o;
   canvas._workspace = o._workspace;
   canvas._toolbar = o._canvasToolbar;
   canvas._hParent = frame._hPanel;
   canvas._hParent.style.backgroundColor = '#333333';
   canvas._hParent.style.scroll = 'auto';
   canvas.build(p);
   frame.push(canvas);
   var frame = o._propertyToolbarFrame = o.searchControl('propertyToolbarFrame');
   frame._hPanel.className = o.styleName('ToolBar_Ground');
   var toolbar = o._propertyToolbar = RClass.create(FDsBitmapPropertyToolBar);
   toolbar._frameSet = o;
   toolbar._workspace = o._worksapce;
   toolbar.buildDefine(p);
   frame.push(toolbar);
}
function FDsBitmapFrameSet_onMeshLoad(p){
   var o = this;
   o._activeSpace = p._activeSpace;
   o._catalog.buildSpace(o._activeSpace);
}
function FDsBitmapFrameSet_onCatalogSelected(p, pc){
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
function FDsBitmapFrameSet_construct(){
   var o = this;
   o.__base.FUiFrameSet.construct.call(o);
   o._propertyFrames = new TDictionary();
}
function FDsBitmapFrameSet_findPropertyFrame(code){
   var o = this;
   var frame = o._propertyFrames.get(code);
   if(!frame){
      frame = RConsole.find(FUiFrameConsole).get(o, code, o._frameProperty._hContainer);
      frame._workspace = o;
      o._propertyFrames.set(code, frame);
   }
   return frame;
}
function FDsBitmapFrameSet_loadByGuid(guid){
   var o = this;
   o._activeGuid = guid;
   o._catalogContent.serviceList(guid);
}
function FDsBitmapFrameSet_loadByCode(p){
   var o = this;
   o._meshCode = p;
   o._canvas.loadByCode(p);
}
function FDsBitmapFrameSet_dispose(){
   var o = this;
   o.__base.FUiFrameSet.dispose.call(o);
   o._propertyFrames.dispose();
   o._propertyFrames = null;
}
function FDsBitmapMenuBar(o){
   o = RClass.inherits(this, o, FUiMenuBar);
   o._frameName            = 'design2d.bitmap.MenuBar';
   o._controlSaveButton    = null;
   o._controlCaptureButton = null;
   o.onBuilded             = FDsBitmapMenuBar_onBuilded;
   o.onSaveLoad            = FDsBitmapMenuBar_onSaveLoad;
   o.onSaveClick           = FDsBitmapMenuBar_onSaveClick;
   o.onCaptureLoad         = FDsBitmapMenuBar_onCaptureLoad;
   o.onCaptureClick        = FDsBitmapMenuBar_onCaptureClick;
   o.construct             = FDsBitmapMenuBar_construct;
   o.dispose               = FDsBitmapMenuBar_dispose;
   return o;
}
function FDsBitmapMenuBar_onBuilded(p){
   var o = this;
   o.__base.FUiMenuBar.onBuilded.call(o, p);
   o._controlSaveButton.addClickListener(o, o.onSaveClick);
   o._controlImportButton.addClickListener(o, o.onCaptureClick);
}
function FDsBitmapMenuBar_onSaveLoad(event){
   RConsole.find(FUiDesktopConsole).hide();
}
function FDsBitmapMenuBar_onSaveClick(p){
   var o = this;
   var space = o._frameSet._activeSpace;
   var resource = space.resource();
   RConsole.find(FUiDesktopConsole).showUploading();
   var xconfig = new TXmlNode();
   resource.saveConfig(xconfig);
   var connection = RConsole.find(FE3sMeshConsole).update(xconfig);
   connection.addLoadListener(o, o.onSaveLoad);
}
function FDsBitmapMenuBar_onCaptureLoad(event){
   RConsole.find(FUiDesktopConsole).hide();
}
function FDsBitmapMenuBar_onCaptureClick(event){
   var o = this;
   RConsole.find(FUiDesktopConsole).showUploading();
   var connection = o._frameSet._canvas.capture();
   connection.addLoadListener(o, o.onCaptureLoad);
}
function FDsBitmapMenuBar_construct(){
   var o = this;
   o.__base.FUiMenuBar.construct.call(o);
}
function FDsBitmapMenuBar_dispose(){
   var o = this;
   o.__base.FUiMenuBar.dispose.call(o);
}
function FDsBitmapPropertyToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   o._frameName                 = 'design2d.bitmap.CatalogToolBar';
   o._canvasModeCd              = EDsCanvasMode.Drop;
   o._controlDrop               = null;
   o._controlSize1              = null;
   o._controlSize2              = null;
   o._controlSize3              = null;
   o._controlSize4              = null;
   o._controlSizeWidth          = null;
   o._controlSizeHeight         = null;
   o._controlRotationVisible = null;
   o._controlRotationWidth   = null;
   o._controlRotationHeight  = null;
   o._controlRotationAuto    = null;
   o._controlRotationFlipX   = null;
   o._controlRotationFlipY   = null;
   o._controlRotationFlipZ   = null;
   o._controlRotationX       = null;
   o._controlRotationY       = null;
   o._controlRotationZ       = null;
   o._controlRotation           = null;
   o.onBuilded                  = FDsBitmapPropertyToolBar_onBuilded;
   o.onModeClick                = FDsBitmapPropertyToolBar_onModeClick;
   o.onSizeClick                = FDsBitmapPropertyToolBar_onSizeClick;
   o.onRotationChange           = FDsBitmapPropertyToolBar_onRotationChange;
   o.onRotationAutoClick        = FDsBitmapPropertyToolBar_onRotationAutoClick;
   o.onRotationClick            = FDsBitmapPropertyToolBar_onRotationClick;
   o.construct                  = FDsBitmapPropertyToolBar_construct;
   o.dispose                    = FDsBitmapPropertyToolBar_dispose;
   return o;
}
function FDsBitmapPropertyToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
}
function FDsBitmapPropertyToolBar_onModeClick(p){
   var o = this;
}
function FDsBitmapPropertyToolBar_onSizeClick(event){
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
function FDsBitmapPropertyToolBar_onRotationChange(event){
   var o = this;
   var canvas = o._frameSet._canvas;
   var visible = o._controlRotationVisible.isCheck();
   var width = RInteger.parse(o._controlRotationWidth.text());
   var height = RInteger.parse(o._controlRotationHeight.text());
   canvas.switchRotation(visible, width, height);
}
function FDsBitmapPropertyToolBar_onRotationAutoClick(event){
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
function FDsBitmapPropertyToolBar_onRotationClick(event, v){
   var o = this;
   var button = event.sender;
   var canvas = o._frameSet._canvas;
   canvas.switchRotation(button.isCheck());
}
function FDsBitmapPropertyToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsBitmapPropertyToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsBitmapWorkspace(o){
   o = RClass.inherits(this, o, FUiWorkspace);
   o._frameName            = 'design2d.bitmap.Workspace';
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
   o.onBuilded             = FDsBitmapWorkspace_onBuilded;
   o.onMeshLoad            = FDsBitmapWorkspace_onMeshLoad;
   o.onCatalogSelected     = FDsBitmapWorkspace_onCatalogSelected;
   o.construct             = FDsBitmapWorkspace_construct;
   o.findPropertyFrame     = FDsBitmapWorkspace_findPropertyFrame;
   o.loadByGuid            = FDsBitmapWorkspace_loadByGuid;
   o.loadByCode            = FDsBitmapWorkspace_loadByCode;
   o.dispose               = FDsBitmapWorkspace_dispose;
   return o;
}
function FDsBitmapWorkspace_onBuilded(p){
   var o = this;
   o.__base.FUiWorkspace.onBuilded.call(o, p);
   var frame = o._frameToolBar = o.searchControl('toolbarFrame');
   frame._hPanel.className = o.styleName('Toolbar_Ground');
   var frame = o._frameBody = o.searchControl('bodyFrame');
   frame._hPanel.className = o.styleName('Body_Ground');
   var frame = o._frameStatusBar = o.searchControl('statusFrame');
   frame._hPanel.className = o.styleName('Statusbar_Ground');
   var menuBar = o._menuBar = RClass.create(FDsBitmapMenuBar);
   menuBar._workspace = o;
   menuBar.buildDefine(p);
   o._frameToolBar.push(menuBar);
   var frameSet = o._frameSet = RClass.create(FDsBitmapFrameSet);
   frameSet._workspace = o;
   frameSet.buildDefine(p);
   o._frameBody.push(frameSet);
   menuBar._frameSet = frameSet;
}
function FDsBitmapWorkspace_onMeshLoad(p){
   var o = this;
   o._activeSpace = p._activeSpace;
   o._catalog.buildSpace(o._activeSpace);
}
function FDsBitmapWorkspace_onCatalogSelected(p, pc){
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
function FDsBitmapWorkspace_construct(){
   var o = this;
   o.__base.FUiWorkspace.construct.call(o);
   o._propertyFrames = new TDictionary();
}
function FDsBitmapWorkspace_findPropertyFrame(p){
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
function FDsBitmapWorkspace_loadByGuid(guid){
   this._frameSet.loadByGuid(guid);
}
function FDsBitmapWorkspace_loadByCode(code){
   this._frameSet.loadByCode(code);
}
function FDsBitmapWorkspace_dispose(){
   var o = this;
   o.__base.FUiWorkspace.dispose.call(o);
   o._propertyFrames.dispose();
   o._propertyFrames = null;
}
var temp = 0;
var temp = 0;
function FDsMeshCameraFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._workspace        = null;
   o._camera           = null;
   o._controlPosition  = null;
   o._controlDirection = null;
   o.construct         = FDsMeshCameraFrame_construct;
   o.loadObject        = FDsMeshCameraFrame_loadObject;
   o.dispose           = FDsMeshCameraFrame_dispose;
   return o;
}
function FDsMeshCameraFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsMeshCameraFrame_loadObject(s, c){
   var o = this;
   var r = c._resource;
   o._camera = c;
   o._controlPosition.set(c.position());
   o._controlDirection.set(c.direction());
}
function FDsMeshCameraFrame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsMeshCameraPropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._visible          = false;
   o._workspace        = null;
   o._activeSpace      = null;
   o._activeCamera     = null;
   o._controlGuid      = null;
   o._controlCode      = null;
   o._controlLabel     = null;
   o._controlPosition  = null;
   o._controlDirection = null;
   o.onBuilded         = FDsMeshCameraPropertyFrame_onBuilded;
   o.onDataChanged     = FDsMeshCameraPropertyFrame_onDataChanged;
   o.construct         = FDsMeshCameraPropertyFrame_construct;
   o.loadObject        = FDsMeshCameraPropertyFrame_loadObject;
   o.dispose           = FDsMeshCameraPropertyFrame_dispose;
   return o;
}
function FDsMeshCameraPropertyFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   o._controlPosition.addDataChangedListener(o, o.onDataChanged);
   o._controlDirection.addDataChangedListener(o, o.onDataChanged);
}
function FDsMeshCameraPropertyFrame_onDataChanged(p){
   var o = this;
   var camera = o._activeCamera;
   var resource = camera.resource();
   resource.position().assign(o._controlPosition.get());
   resource.direction().assign(o._controlDirection.get());
   camera.position().assign(resource.position());
   camera.direction().assign(resource.direction());
   camera.update();
}
function FDsMeshCameraPropertyFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsMeshCameraPropertyFrame_loadObject(space, camera){
   var o = this;
   var resource = camera.resource();
   o._activeSpace = space;
   o._activeCamera = camera;
   o._controlGuid.set(resource.guid());
   o._controlCode.set(resource.code());
   o._controlLabel.set(resource.label());
   o._controlPosition.set(camera.position());
   o._controlDirection.set(camera.direction());
   resource.position().assign(camera.position());
   resource.direction().assign(camera.direction());
}
function FDsMeshCameraPropertyFrame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsMeshCanvas(o){
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
   o.onBuild              = FDsMeshCanvas_onBuild;
   o.onMouseCaptureStart  = FDsMeshCanvas_onMouseCaptureStart;
   o.onMouseCapture       = FDsMeshCanvas_onMouseCapture;
   o.onMouseCaptureStop   = FDsMeshCanvas_onMouseCaptureStop;
   o.onEnterFrame         = FDsMeshCanvas_onEnterFrame;
   o.onMeshLoad           = FDsMeshCanvas_onMeshLoad;
   o.oeResize             = FDsMeshCanvas_oeResize;
   o.oeRefresh            = FDsMeshCanvas_oeRefresh;
   o.construct            = FDsMeshCanvas_construct;
   o.innerSelectDisplay   = FDsMeshCanvas_innerSelectDisplay;
   o.innerSelectLayer     = FDsMeshCanvas_innerSelectLayer;
   o.selectNone           = FDsMeshCanvas_selectNone;
   o.selectDisplay        = FDsMeshCanvas_selectDisplay;
   o.selectMaterial       = FDsMeshCanvas_selectMaterial;
   o.selectRenderable     = FDsMeshCanvas_selectRenderable;
   o.switchSize           = FDsMeshCanvas_switchSize;
   o.switchDimensional    = FDsMeshCanvas_switchDimensional;
   o.switchRotation       = FDsMeshCanvas_switchRotation;
   o.viewAutoSize         = FDsMeshCanvas_viewAutoSize;
   o.reloadRegion         = FDsMeshCanvas_reloadRegion;
   o.capture              = FDsMeshCanvas_capture;
   o.loadByGuid           = FDsMeshCanvas_loadByGuid;
   o.loadByCode           = FDsMeshCanvas_loadByCode;
   o.dispose              = FDsMeshCanvas_dispose;
   return o;
}
function FDsMeshCanvas_onBuild(p){
   var o = this;
   o.__base.FDsCanvas.onBuild.call(o, p);
}
function FDsMeshCanvas_onMouseCaptureStart(p){
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
function FDsMeshCanvas_onMouseCapture(p){
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
function FDsMeshCanvas_onMouseCaptureStop(p){
   var o = this;
   RHtml.cursorSet(o._hPanel, EUiCursor.Auto);
}
function FDsMeshCanvas_onEnterFrame(){
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
function FDsMeshCanvas_onMeshLoad(p){
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
function FDsMeshCanvas_oeResize(p){
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
function FDsMeshCanvas_oeRefresh(p){
   return EEventStatus.Stop;
}
function FDsMeshCanvas_construct(){
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
function FDsMeshCanvas_innerSelectDisplay(p){
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
function FDsMeshCanvas_innerSelectLayer(p){
   var o = this;
   var s = p.displays();
   var c = s.count();
   for(var i = 0; i < c; i++){
      var d = s.getAt(i);
      o.innerSelectDisplay(d)
   }
}
function FDsMeshCanvas_selectNone(){
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
function FDsMeshCanvas_selectDisplay(p){
   var o = this;
   o.selectNone();
   o._selectObject = p;
   o.innerSelectDisplay(p);
}
function FDsMeshCanvas_selectMaterial(p){
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
function FDsMeshCanvas_selectRenderable(p){
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
function FDsMeshCanvas_switchMode(p){
   var o = this;
   o._canvasModeCd = p;
   o.selectRenderable(o._selectRenderable);
}
function FDsMeshCanvas_switchSize(width, height){
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
function FDsMeshCanvas_switchDimensional(visible, width, height){
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
function FDsMeshCanvas_switchRotation(p){
   this._optionRotation = p;
}
function FDsMeshCanvas_viewAutoSize(flipX, flipY, flipZ, rotationX, rotationY, rotationZ){
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
function FDsMeshCanvas_reloadRegion(region){
   var o = this;
   var resource = region.resource();
   o._cameraMoveRate = resource.moveSpeed();
   o._cameraKeyRotation = resource.rotationKeySpeed();
   o._cameraMouseRotation = resource.rotationMouseSpeed();
}
function FDsMeshCanvas_capture(){
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
function FDsMeshCanvas_loadByGuid(guid){
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
function FDsMeshCanvas_loadByCode(p){
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
function FDsMeshCanvas_dispose(){
   var o = this;
   o._rotation = RObject.dispose(o._rotation);
x   // 父处理
   o.__base.FDsCanvas.dispose.call(o);
}
function FDsMeshCanvasToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   o._frameName                 = 'design3d.mesh.CanvasToolBar';
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
   o.onBuilded                  = FDsMeshCanvasToolBar_onBuilded;
   o.onModeClick                = FDsMeshCanvasToolBar_onModeClick;
   o.onSizeClick                = FDsMeshCanvasToolBar_onSizeClick;
   o.onDimensionalChange        = FDsMeshCanvasToolBar_onDimensionalChange;
   o.onDimensionalAutoClick     = FDsMeshCanvasToolBar_onDimensionalAutoClick;
   o.onRotationClick            = FDsMeshCanvasToolBar_onRotationClick;
   o.construct                  = FDsMeshCanvasToolBar_construct;
   o.dispose                    = FDsMeshCanvasToolBar_dispose;
   return o;
}
function FDsMeshCanvasToolBar_onBuilded(p){
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
function FDsMeshCanvasToolBar_onModeClick(p){
   var o = this;
}
function FDsMeshCanvasToolBar_onSizeClick(event){
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
function FDsMeshCanvasToolBar_onDimensionalChange(event){
   var o = this;
   var canvas = o._frameSet._canvas;
   var visible = o._controlDimensionalVisible.isCheck();
   var width = RInteger.parse(o._controlDimensionalWidth.text());
   var height = RInteger.parse(o._controlDimensionalHeight.text());
   canvas.switchDimensional(visible, width, height);
}
function FDsMeshCanvasToolBar_onDimensionalAutoClick(event){
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
function FDsMeshCanvasToolBar_onRotationClick(event, v){
   var o = this;
   var button = event.sender;
   var canvas = o._frameSet._canvas;
   canvas.switchRotation(button.isCheck());
}
function FDsMeshCanvasToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsMeshCanvasToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsMeshCatalog(o){
   o = RClass.inherits(this, o, FUiDataTreeView, MListenerSelected);
   o._iconView             = 'design3d.mesh.view';
   o._iconViewNot          = 'design3d.mesh.viewno';
   o._activeSpace          = null;
   o._materials            = null;
   o.onBuild               = FDsMeshCatalog_onBuild;
   o.onLoadDisplay         = FDsMeshCatalog_onLoadDisplay;
   o.onNodeClick           = FDsMeshCatalog_onNodeClick;
   o.onNodeViewClick       = FDsMeshCatalog_onNodeViewClick;
   o.onNodeViewDoubleClick = FDsMeshCatalog_onNodeViewDoubleClick;
   o.lsnsSelect            = null;
   o.construct             = FDsMeshCatalog_construct;
   o.buildTechnique        = FDsMeshCatalog_buildTechnique;
   o.buildRegion           = FDsMeshCatalog_buildRegion;
   o.buildRenderable       = FDsMeshCatalog_buildRenderable;
   o.buildDisplay          = FDsMeshCatalog_buildDisplay;
   o.buildSpace            = FDsMeshCatalog_buildSpace;
   o.selectObject          = FDsMeshCatalog_selectObject;
   o.showObject            = FDsMeshCatalog_showObject;
   o.dispose               = FDsMeshCatalog_dispose;
   return o;
}
function FDsMeshCatalog_onBuild(p){
   var o = this;
   o.__base.FUiDataTreeView.onBuild.call(o, p);
   o.lsnsClick.register(o, o.onNodeClick);
   o.loadUrl('/cloud.describe.tree.ws?action=query&code=design3d.mesh');
}
function FDsMeshCatalog_onLoadDisplay(p){
   var o = this;
   var n = p._linkNode;
   o.buildRenderable(n, p);
}
function FDsMeshCatalog_onNodeClick(t, n){
   var o = this;
   var s = n.dataPropertyGet('linker');
   o.selectObject(s);
}
function FDsMeshCatalog_onNodeViewClick(p){
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
function FDsMeshCatalog_onNodeViewDoubleClick(p){
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
function FDsMeshCatalog_construct(){
   var o = this;
   o.__base.FUiDataTreeView.construct.call(o);
   o._renderables = new TObjects();
   o._materials = new TObjects();
}
function FDsMeshCatalog_buildTechnique(n, p){
   var o = this;
   var nt = o.createNode();
   nt.setLabel('Technique');
   nt.setTypeCode('technique');
   nt.dataPropertySet('linker', p);
   n.appendNode(nt);
}
function FDsMeshCatalog_buildRegion(n, p){
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
function FDsMeshCatalog_buildRenderable(n, p){
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
function FDsMeshCatalog_buildDisplay(n, p){
   var o = this;
   var node = o.createNode();
   node.setTypeCode('display');
   node.setLabel('Mesh');
   node.dataPropertySet('linker', p);
   n.appendNode(node);
   o.buildRenderable(node, p);
}
function FDsMeshCatalog_buildSpace(space){
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
function FDsMeshCatalog_selectObject(p){
   var o = this;
   if(p != null){
      o.processSelectedListener(p, true);
   }
}
function FDsMeshCatalog_showObject(p){
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
function FDsMeshCatalog_dispose(){
   var o = this;
   o._displays = RObject.dispose(o._displays);
   o._renderables = RObject.dispose(o._renderables);
   o._materials = RObject.dispose(o._materials);
   o.__base.FUiDataTreeView.dispose.call(o);
}
function FDsMeshDisplayFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._activeSpace   = null;
   o._activeDisplay = null;
   o.onBuilded      = FDsMeshDisplayFrame_onBuilded;
   o.onDataChanged  = FDsMeshDisplayFrame_onDataChanged;
   o.construct      = FDsMeshDisplayFrame_construct;
   o.loadObject     = FDsMeshDisplayFrame_loadObject;
   o.dispose        = FDsMeshDisplayFrame_dispose;
   return o;
}
function FDsMeshDisplayFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   o._controlTranslate.addDataChangedListener(o, o.onDataChanged);
   o._controlRotation.addDataChangedListener(o, o.onDataChanged);
   o._controlScale.addDataChangedListener(o, o.onDataChanged);
}
function FDsMeshDisplayFrame_onDataChanged(p){
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
function FDsMeshDisplayFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsMeshDisplayFrame_loadObject(space, display){
   var o = this;
   var resource = display.resource();
   o._activeSpace = space;
   o._activeDisplay = display;
   var matrix = resource.matrix();
   o._controlTranslate.set(matrix.tx, matrix.ty, matrix.tz);
   o._controlRotation.set(matrix.rx, matrix.ry, matrix.rz);
   o._controlScale.set(matrix.sx, matrix.sy, matrix.sz);
}
function FDsMeshDisplayFrame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsMeshDisplayPropertyFrame(o){
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
   o.onBuilded       = FDsMeshDisplayPropertyFrame_onBuilded;
   o.onDataChanged   = FDsMeshDisplayPropertyFrame_onDataChanged;
   o.construct       = FDsMeshDisplayPropertyFrame_construct;
   o.loadObject      = FDsMeshDisplayPropertyFrame_loadObject;
   o.dispose         = FDsMeshDisplayPropertyFrame_dispose;
   return o;
}
function FDsMeshDisplayPropertyFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   o._controlCode.addDataChangedListener(o, o.onDataChanged);
   o._controlLabel.addDataChangedListener(o, o.onDataChanged);
}
function FDsMeshDisplayPropertyFrame_onDataChanged(p){
   var o = this;
   var r = o._activeResource;
   r._code = o._controlCode.get();
   r._label = o._controlLabel.get();
}
function FDsMeshDisplayPropertyFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsMeshDisplayPropertyFrame_loadObject(space, display){
   var o = this;
   var resource = display._resource;
   o._activeSpace = space;
   o._activeDisplay = display;
   o._controlGuid.set(resource.guid());
   o._controlCode.set(resource.code());
   o._controlLabel.set(resource.label());
   o._frameDisplay.loadObject(space, display);
}
function FDsMeshDisplayPropertyFrame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsMeshFrameSet(o){
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
   o.onBuilded             = FDsMeshFrameSet_onBuilded;
   o.onMeshLoad            = FDsMeshFrameSet_onMeshLoad;
   o.onCatalogSelected     = FDsMeshFrameSet_onCatalogSelected;
   o.construct             = FDsMeshFrameSet_construct;
   o.findPropertyFrame     = FDsMeshFrameSet_findPropertyFrame;
   o.loadByGuid            = FDsMeshFrameSet_loadByGuid;
   o.loadByCode            = FDsMeshFrameSet_loadByCode;
   o.dispose               = FDsMeshFrameSet_dispose;
   return o;
}
function FDsMeshFrameSet_onBuilded(p){
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
   var catalog = o._catalog = RClass.create(FDsMeshCatalog);
   catalog._frameSet = o;
   catalog._workspace = o._worksapce;
   catalog.build(p);
   catalog.addSelectedListener(o, o.onCatalogSelected);
   o._frameCatalog.push(catalog);
   var frame = o._canvasToolbarFrame = o.searchControl('canvasToolbarFrame');
   var toolbar = o._canvasToolbar = RClass.create(FDsMeshCanvasToolBar);
   toolbar._frameSet = o;
   toolbar._workspace = o._worksapce;
   toolbar.buildDefine(p);
   frame.push(toolbar);
   var frame = o._canvasFrame = o.searchControl('canvasFrame');
   var canvas = o._canvas = RClass.create(FDsMeshCanvas);
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
function FDsMeshFrameSet_onMeshLoad(p){
   var o = this;
   o._activeSpace = p._activeSpace;
   o._catalog.buildSpace(o._activeSpace);
}
function FDsMeshFrameSet_onCatalogSelected(p, pc){
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
function FDsMeshFrameSet_construct(){
   var o = this;
   o.__base.FUiFrameSet.construct.call(o);
   o._propertyFrames = new TDictionary();
}
function FDsMeshFrameSet_findPropertyFrame(code){
   var o = this;
   var frame = o._propertyFrames.get(code);
   if(!frame){
      frame = RConsole.find(FUiFrameConsole).get(o, code, o._frameProperty._hContainer);
      frame._workspace = o;
      o._propertyFrames.set(code, frame);
   }
   return frame;
}
function FDsMeshFrameSet_loadByGuid(guid){
   var o = this;
   o._meshGuid = guid;
   o._canvas.loadByGuid(guid);
}
function FDsMeshFrameSet_loadByCode(p){
   var o = this;
   o._meshCode = p;
   o._canvas.loadByCode(p);
}
function FDsMeshFrameSet_dispose(){
   var o = this;
   o.__base.FUiFrameSet.dispose.call(o);
   o._propertyFrames.dispose();
   o._propertyFrames = null;
}
function FDsMeshLightPropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._visible      = false;
   o._workspace    = null;
   o._activeSpace  = null;
   o._activeLight  = null;
   o._controlGuid  = null;
   o._controlCode  = null;
   o._controlLabel = null;
   o.construct     = FDsMeshLightPropertyFrame_construct;
   o.loadObject    = FDsMeshLightPropertyFrame_loadObject;
   o.dispose       = FDsMeshLightPropertyFrame_dispose;
   return o;
}
function FDsMeshLightPropertyFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsMeshLightPropertyFrame_loadObject(space, light){
   var o = this;
   var resource = light.resource();
   o._activeSpace = space;
   o._activeLight = light;
   o._controlGuid.set(resource.guid());
   o._controlCode.set(resource.code());
   o._controlLabel.set(resource.label());
   o._frameCamera.loadObject(space, light.camera());
   o._frameMaterial1.loadObject(space, light.material());
}
function FDsMeshLightPropertyFrame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsMeshMaterial1Frame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._activeSpace                 = null;
   o._activeMaterial              = null;
   o._controlOptionDouble   = null;
   o._controlEffectCode     = null;
   o._controlOptionAlpha    = null;
   o._controlAlphaBase      = null;
   o._controlAlphaRate      = null;
   o._controlOptionColor    = null;
   o._controlColorMin       = null;
   o._controlColorMax       = null;
   o._controlColorRate      = null;
   o._controlColorMerge     = null;
   o._controlOptionAmbient  = null;
   o._controlAmbientColor   = null;
   o._controlOptionDiffuse  = null;
   o._controlDiffuseColor   = null;
   o._controlOptionSpecular = null;
   o._controlSpecularColor  = null;
   o._controlSpecularBase   = null;
   o._controlSpecularLevel  = null;
   o._controlOptionReflect  = null;
   o._controlReflectColor   = null;
   o._controlReflectMerge   = null;
   o._controlOptionEmissive = null;
   o._controlEmissiveColor  = null;
   o.onBuilded              = FDsMeshMaterial1Frame_onBuilded;
   o.onOptionChanged        = FDsMeshMaterial1Frame_onOptionChanged;
   o.onDataChanged          = FDsMeshMaterial1Frame_onDataChanged;
   o.construct              = FDsMeshMaterial1Frame_construct;
   o.loadObject             = FDsMeshMaterial1Frame_loadObject;
   o.dispose                = FDsMeshMaterial1Frame_dispose;
   return o;
}
function FDsMeshMaterial1Frame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   o._controlOptionDouble.addDataChangedListener(o, o.onDataChanged);
   o._controlEffectCode.addDataChangedListener(o, o.onDataChanged);
   o._controlOptionAlpha.addDataChangedListener(o, o.onDataChanged);
   o._controlAlphaBase.addDataChangedListener(o, o.onDataChanged);
   o._controlAlphaRate.addDataChangedListener(o, o.onDataChanged);
   o._controlOptionColor.addDataChangedListener(o, o.onOptionChanged);
   o._controlColorMin.addDataChangedListener(o, o.onDataChanged);
   o._controlColorMax.addDataChangedListener(o, o.onDataChanged);
   o._controlColorRate.addDataChangedListener(o, o.onDataChanged);
   o._controlColorMerge.addDataChangedListener(o, o.onDataChanged);
   o._controlOptionAmbient.addDataChangedListener(o, o.onOptionChanged);
   o._controlAmbientColor.addDataChangedListener(o, o.onDataChanged);
   o._controlOptionDiffuse.addDataChangedListener(o, o.onOptionChanged);
   o._controlDiffuseColor.addDataChangedListener(o, o.onDataChanged);
   o._controlOptionSpecular.addDataChangedListener(o, o.onOptionChanged);
   o._controlSpecularColor.addDataChangedListener(o, o.onDataChanged);
   o._controlSpecularBase.addDataChangedListener(o, o.onDataChanged);
   o._controlSpecularLevel.addDataChangedListener(o, o.onDataChanged);
   o._controlOptionReflect.addDataChangedListener(o, o.onOptionChanged);
   o._controlReflectColor.addDataChangedListener(o, o.onDataChanged);
   o._controlReflectMerge.addDataChangedListener(o, o.onDataChanged);
   o._controlOptionEmissive.addDataChangedListener(o, o.onOptionChanged);
   o._controlEmissiveColor.addDataChangedListener(o, o.onDataChanged);
}
function FDsMeshMaterial1Frame_onOptionChanged(p){
   var o = this;
}
function FDsMeshMaterial1Frame_onDataChanged(p){
   var o = this;
   var t = o._activeSpace;
   var m = o._activeMaterial;
   var mr = m.resource();
   var mi = mr.info();
   mi.optionDouble = o._controlOptionDouble.get();
   mi.effectCode = o._controlEffectCode.get();
   mi.optionAlpha = o._controlOptionAlpha.get();
   mi.alphaBase = o._controlAlphaBase.get();
   mi.alphaRate = o._controlAlphaRate.get();
   mi.colorMin = o._controlColorMin.get();
   mi.colorMax = o._controlColorMax.get();
   mi.colorRate = o._controlColorRate.get();
   mi.colorMerge = o._controlColorMerge.get();
   mi.ambientColor.assign(o._controlAmbientColor.get());
   mi.diffuseColor.assign(o._controlDiffuseColor.get());
   mi.specularColor.assign(o._controlSpecularColor.get());
   mi.specularBase = o._controlSpecularBase.get();
   mi.specularLevel = o._controlSpecularLevel.get();
   mi.reflectColor.assign(o._controlReflectColor.get());
   mi.reflectMerge = o._controlReflectMerge.get();
   mi.emissiveColor.assign(o._controlEmissiveColor.get());
   m.reloadResource();
}
function FDsMeshMaterial1Frame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsMeshMaterial1Frame_loadObject(space, material){
   var o = this;
   o._activeSpace = space;
   o._activeMaterial = material;
   var mr = material.resource();
   var mi = mr.info();
   o._controlOptionDouble.set(mi.optionDouble);
   o._controlEffectCode.set(mi.effectCode);
   o._controlOptionAlpha.set(mi.optionAlpha);
   o._controlAlphaBase.set(mi.alphaBase);
   o._controlAlphaRate.set(mi.alphaRate);
   o._controlOptionColor.set(mi.optionColor);
   o._controlColorMin.set(mi.colorMin);
   o._controlColorMax.set(mi.colorMax);
   o._controlColorRate.set(mi.colorRate);
   o._controlColorMerge.set(mi.colorMerge);
   o._controlOptionAmbient.set(mi.optionAmbient);
   o._controlAmbientColor.set(mi.ambientColor);
   o._controlOptionDiffuse.set(mi.optionDiffuse);
   o._controlDiffuseColor.set(mi.diffuseColor);
   o._controlOptionSpecular.set(mi.optionSpecular);
   o._controlSpecularColor.set(mi.specularColor);
   o._controlSpecularBase.set(mi.specularBase);
   o._controlSpecularLevel.set(mi.specularLevel);
   o._controlOptionReflect.set(mi.optionReflect);
   o._controlReflectColor.set(mi.reflectColor);
   o._controlReflectMerge.set(mi.reflectMerge);
   o._controlOptionEmissive.set(mi.optionEmissive);
   o._controlEmissiveColor.set(mi.emissiveColor);
}
function FDsMeshMaterial1Frame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsMeshMaterial2Frame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._scene                    = null;
   o._material                 = null;
   o._controlDiffuseViewColor  = null;
   o._controlSpecularViewColor = null;
   o._controlSpecularViewBase  = null;
   o._controlSpecularViewLevel = null;
   o.onBuilded                 = FDsMeshMaterial2Frame_onBuilded;
   o.onDataChanged             = FDsMeshMaterial2Frame_onDataChanged;
   o.construct                 = FDsMeshMaterial2Frame_construct;
   o.loadObject                = FDsMeshMaterial2Frame_loadObject;
   o.dispose                   = FDsMeshMaterial2Frame_dispose;
   return o;
}
function FDsMeshMaterial2Frame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   o._controlOptionView.addDataChangedListener(o, o.onDataChanged);
   o._controlOptionNormalInvert.addDataChangedListener(o, o.onDataChanged);
   o._controlOptionShadow.addDataChangedListener(o, o.onDataChanged);
   o._controlOptionShadowSelf.addDataChangedListener(o, o.onDataChanged);
   o._controlDiffuseViewColor.addDataChangedListener(o, o.onDataChanged);
   o._controlSpecularViewColor.addDataChangedListener(o, o.onDataChanged);
   o._controlSpecularViewBase.addDataChangedListener(o, o.onDataChanged);
   o._controlSpecularViewLevel.addDataChangedListener(o, o.onDataChanged);
}
function FDsMeshMaterial2Frame_onDataChanged(p){
   var o = this;
   var t = o._scene;
   var m = o._material;
   var mr = m.resource();
   var mi = mr.info();
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
   m.reloadResource();
}
function FDsMeshMaterial2Frame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsMeshMaterial2Frame_loadObject(s, m){
   var o = this;
   o._scene = s;
   o._material = m;
   var mr = m.resource();
   var mi = mr.info();
   o._controlOptionView.set(mi.optionView);
   o._controlOptionNormalInvert.set(mi.optionNormalInvert);
   o._controlOptionShadow.set(mi.optionShadow);
   o._controlOptionShadowSelf.set(mi.optionShadowSelf);
   o._controlDiffuseViewColor.set(mi.diffuseViewColor);
   o._controlSpecularViewColor.set(mi.specularViewColor);
   o._controlSpecularViewBase.set(mi.specularViewBase);
   o._controlSpecularViewLevel.set(mi.specularViewLevel);
}
function FDsMeshMaterial2Frame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsMeshMaterialPropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._visible        = false;
   o._workspace      = null;
   o._activeMaterial       = null;
   o._controlGuid    = null;
   o._controlCode    = null;
   o._controlLabel   = null;
   o._frameMaterial1 = null;
   o._frameMaterial2 = null;
   o.onBuilded       = FDsMeshMaterialPropertyFrame_onBuilded;
   o.onDataChanged   = FDsMeshMaterialPropertyFrame_onDataChanged;
   o.construct       = FDsMeshMaterialPropertyFrame_construct;
   o.loadObject      = FDsMeshMaterialPropertyFrame_loadObject;
   o.dispose         = FDsMeshMaterialPropertyFrame_dispose;
   return o;
}
function FDsMeshMaterialPropertyFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   o._controlLabel.addDataChangedListener(o, o.onDataChanged);
}
function FDsMeshMaterialPropertyFrame_onDataChanged(p){
   var o = this;
   var m = o._activeMaterial;
   var mr = m.resource();
   mr.setLabel(o._controlLabel.get());
}
function FDsMeshMaterialPropertyFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsMeshMaterialPropertyFrame_loadObject(space, material){
   var o = this;
   var resource = material.resource();
   o._activeSpace = space;
   o._activeMaterial = material;
   o._controlGuid.set(resource.guid());
   o._controlCode.set(resource.code());
   o._controlLabel.set(resource.label());
   o._frameMaterial1.loadObject(space, material);
   o._frameMaterial2.loadObject(space, material);
}
function FDsMeshMaterialPropertyFrame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsMeshMenuBar(o){
   o = RClass.inherits(this, o, FUiMenuBar);
   o._frameName            = 'design3d.mesh.MenuBar';
   o._controlSaveButton    = null;
   o._controlCaptureButton = null;
   o.onBuilded             = FDsMeshMenuBar_onBuilded;
   o.onSaveLoad            = FDsMeshMenuBar_onSaveLoad;
   o.onSaveClick           = FDsMeshMenuBar_onSaveClick;
   o.onCaptureLoad         = FDsMeshMenuBar_onCaptureLoad;
   o.onCaptureClick        = FDsMeshMenuBar_onCaptureClick;
   o.construct             = FDsMeshMenuBar_construct;
   o.dispose               = FDsMeshMenuBar_dispose;
   return o;
}
function FDsMeshMenuBar_onBuilded(p){
   var o = this;
   o.__base.FUiMenuBar.onBuilded.call(o, p);
   o._controlSaveButton.addClickListener(o, o.onSaveClick);
   o._controlCaptureButton.addClickListener(o, o.onCaptureClick);
}
function FDsMeshMenuBar_onSaveLoad(event){
   RConsole.find(FUiDesktopConsole).hide();
}
function FDsMeshMenuBar_onSaveClick(p){
   var o = this;
   var space = o._frameSet._activeSpace;
   var resource = space.resource();
   RConsole.find(FUiDesktopConsole).showUploading();
   var xconfig = new TXmlNode();
   resource.saveConfig(xconfig);
   var connection = RConsole.find(FE3sMeshConsole).update(xconfig);
   connection.addLoadListener(o, o.onSaveLoad);
}
function FDsMeshMenuBar_onCaptureLoad(event){
   RConsole.find(FUiDesktopConsole).hide();
}
function FDsMeshMenuBar_onCaptureClick(event){
   var o = this;
   RConsole.find(FUiDesktopConsole).showUploading();
   var connection = o._frameSet._canvas.capture();
   connection.addLoadListener(o, o.onCaptureLoad);
}
function FDsMeshMenuBar_construct(){
   var o = this;
   o.__base.FUiMenuBar.construct.call(o);
}
function FDsMeshMenuBar_dispose(){
   var o = this;
   o.__base.FUiMenuBar.dispose.call(o);
}
function FDsMeshRegionPropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._visible                   = false;
   o._workspace                 = null;
   o._activeSpace               = null;
   o._activeRegion              = null;
   o._controlMoveSpeed          = null;
   o._controlRotationKeySpeed   = null;
   o._controlRotationMouseSpeed = null;
   o._controlOptionBackground   = null;
   o._controlBackgroundColor    = null;
   o.onBuilded                  = FDsMeshRegionPropertyFrame_onBuilded;
   o.onDataChanged              = FDsMeshRegionPropertyFrame_onDataChanged;
   o.construct                  = FDsMeshRegionPropertyFrame_construct;
   o.loadObject                 = FDsMeshRegionPropertyFrame_loadObject;
   o.dispose                    = FDsMeshRegionPropertyFrame_dispose;
   return o;
}
function FDsMeshRegionPropertyFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   o._controlMoveSpeed.addDataChangedListener(o, o.onDataChanged);
   o._controlRotationKeySpeed.addDataChangedListener(o, o.onDataChanged);
   o._controlRotationMouseSpeed.addDataChangedListener(o, o.onDataChanged);
   o._controlOptionBackground.addDataChangedListener(o, o.onDataChanged);
   o._controlBackgroundColor.addDataChangedListener(o, o.onDataChanged);
}
function FDsMeshRegionPropertyFrame_onDataChanged(p){
   var o = this;
   var region = o._activeRegion;
   var resource = region.resource();
   resource.setOptionBackground(o._controlOptionBackground.get());
   resource.backgroundColor().assign(o._controlBackgroundColor.get());
   resource.setMoveSpeed(o._controlMoveSpeed.get());
   resource.setRotationKeySpeed(o._controlRotationKeySpeed.get());
   resource.setRotationMouseSpeed(o._controlRotationMouseSpeed.get());
   region.reloadResource();
   o._workspace._canvas.reloadRegion(region);
}
function FDsMeshRegionPropertyFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsMeshRegionPropertyFrame_loadObject(space, region){
   var o = this;
   var resource = region.resource();
   o._activeSpace = space;
   o._activeRegion = region;
   o._controlMoveSpeed.set(resource.moveSpeed());
   o._controlRotationKeySpeed.set(resource.rotationKeySpeed());
   o._controlRotationMouseSpeed.set(resource.rotationMouseSpeed());
   o._controlOptionBackground.set(resource.optionBackground());
   o._controlBackgroundColor.set(resource.backgroundColor());
}
function FDsMeshRegionPropertyFrame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsMeshRenderableFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._activeSpace      = null;
   o._activeRenderable = null;
   o.onBuilded         = FDsMeshRenderableFrame_onBuilded;
   o.onDataChanged     = FDsMeshRenderableFrame_onDataChanged;
   o.onEffectClick     = FDsMeshRenderableFrame_onEffectClick;
   o.construct         = FDsMeshRenderableFrame_construct;
   o.loadObject        = FDsMeshRenderableFrame_loadObject;
   o.dispose           = FDsMeshRenderableFrame_dispose;
   return o;
}
function FDsMeshRenderableFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   o._controlTranslate.addDataChangedListener(o, o.onDataChanged);
   o._controlRotation.addDataChangedListener(o, o.onDataChanged);
   o._controlScale.addDataChangedListener(o, o.onDataChanged);
   o._controlEffects.addClickListener(o, o.onEffectClick);
}
function FDsMeshRenderableFrame_onDataChanged(p){
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
function FDsMeshRenderableFrame_onEffectClick(ps, pi){
   var o = this;
   var e = pi.tag();
   var p = e._program;
   var s = p._vertexShader;
   alert(s._source);
   var s = p._fragmentShader;
   alert(s._source);
}
function FDsMeshRenderableFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsMeshRenderableFrame_loadObject(space, renderable){
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
function FDsMeshRenderableFrame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsMeshRenderablePropertyFrame(o){
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
   o.construct         = FDsMeshRenderablePropertyFrame_construct;
   o.loadObject        = FDsMeshRenderablePropertyFrame_loadObject;
   o.dispose           = FDsMeshRenderablePropertyFrame_dispose;
   return o;
}
function FDsMeshRenderablePropertyFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsMeshRenderablePropertyFrame_loadObject(space, renderable){
   var o = this;
   var resource = renderable.resource();
   o._activeSpace = space;
   o._activeRenderable = renderable;
   o._controlGuid.set(resource.guid());
   o._controlCode.set(resource.code());
   o._controlLabel.set(resource.label());
   o._frameRenderable.loadObject(space, renderable);
}
function FDsMeshRenderablePropertyFrame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsMeshSpacePropertyFrame(o){
   o = RClass.inherits(this, o, FDsSpacePropertyFrame);
   return o;
}
function FDsMeshTechniquePropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._visible              = false;
   o._workspace            = null;
   o._activeSpace          = null;
   o._activeTechnique      = null;
   o._controlTriangleCount = null;
   o._controlDrawCount     = null;
   o._thread               = null;
   o._interval             = 2000;
   o.onBuilded             = FDsMeshTechniquePropertyFrame_onBuilded;
   o.onDataChanged         = FDsMeshTechniquePropertyFrame_onDataChanged;
   o.onModeClick           = FDsMeshTechniquePropertyFrame_onModeClick;
   o.onRefresh             = FDsMeshTechniquePropertyFrame_onRefresh;
   o.construct             = FDsMeshTechniquePropertyFrame_construct;
   o.loadObject            = FDsMeshTechniquePropertyFrame_loadObject;
   o.dispose               = FDsMeshTechniquePropertyFrame_dispose;
   return o;
}
function FDsMeshTechniquePropertyFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   o._controlRenderModes.addClickListener(o, o.onModeClick);
}
function FDsMeshTechniquePropertyFrame_onDataChanged(p){
   var o = this;
   var r = o._activeTechnique;
   r._code = o._controlCode.get();
   r._label = o._controlLabel.get();
   r._activeTechniqueCode = o._controlTechniqueCode.get();
}
function FDsMeshTechniquePropertyFrame_onModeClick(ps, pi){
   var o = this;
   var m = pi.tag();
   o._activeTechnique._activeMode = m;
   o._activeSpace.dirty();
}
function FDsMeshTechniquePropertyFrame_onRefresh(){
   var o = this;
   if(!o._statusVisible){
      return;
   }
   var s = o._activeSpace;
   var ss = s.statistics();
   var gs = s._graphicContext.statistics();
   o._controlFrameTick.set(ss._frame.toString());
   o._controlProcessTick.set(ss._frameProcess.toString() + ' | ' + ss._frameDrawRenderable.toString());
   o._controlDrawTick.set(ss._frameDraw.toString() + ' | ' + ss._frameDrawSort.toString());
   o._controlClearCount.set(gs._frameClearCount);
   o._controlModeInfo.set(
      'FIL:' + gs._frameFillModeCount +
      ' | DEP:' + gs._frameDepthModeCount +
      ' | CUL:' + gs._frameCullModeCount +
      ' | BLD:' + gs._frameBlendModeCount);
   o._controlProgramCount.set(gs._frameProgramCount);
   o._controlConstInfo.set(gs._frameConstCount + ' : length=' + gs._frameConstLength);
   o._controlBufferCount.set(gs._frameBufferCount);
   o._controlTextureCount.set(gs._frameTextureCount);
   o._controlTargetCount.set(gs._frameTargetCount);
   o._controlDrawInfo.set(gs._frameDrawCount + ' : triangle=' + gs._frameTriangleCount);
   o._controlProgramTotal.set(gs._programTotal);
   o._controlLayoutTotal.set(gs._layoutTotal);
   o._controlBufferInfo.set('Vertex:' + gs._vertexBufferTotal + ' Index:' + gs._indexBufferTotal);
   o._controlTextureInfo.set('Flat:' + gs._flatTextureTotal + ' Cube:' + gs._cubeTextureTotal);
   o._controlTargetTotal.set(gs._targetTotal);
}
function FDsMeshTechniquePropertyFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.addProcessListener(o, o.onRefresh);
   RConsole.find(FThreadConsole).start(t);
}
function FDsMeshTechniquePropertyFrame_loadObject(space, technique){
   var o = this;
   o._activeSpace = space;
   o._activeTechnique = technique;
   var ctlModes = o._controlRenderModes;
   ctlModes.clear();
   var modes = technique.modes();
   var c = modes.count();
   for(var i = 0; i < c; i++){
      var mode = modes.getAt(i);
      var item = ctlModes.createItem(null, mode.code());
      item.setTag(mode);
      ctlModes.push(item);
   }
   o.onRefresh();
}
function FDsMeshTechniquePropertyFrame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsMeshWorkspace(o){
   o = RClass.inherits(this, o, FUiWorkspace);
   o._frameName            = 'design3d.mesh.Workspace';
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
   o.onBuilded             = FDsMeshWorkspace_onBuilded;
   o.onMeshLoad            = FDsMeshWorkspace_onMeshLoad;
   o.onCatalogSelected     = FDsMeshWorkspace_onCatalogSelected;
   o.construct             = FDsMeshWorkspace_construct;
   o.findPropertyFrame     = FDsMeshWorkspace_findPropertyFrame;
   o.loadByGuid            = FDsMeshWorkspace_loadByGuid;
   o.loadByCode            = FDsMeshWorkspace_loadByCode;
   o.dispose               = FDsMeshWorkspace_dispose;
   return o;
}
function FDsMeshWorkspace_onBuilded(p){
   var o = this;
   o.__base.FUiWorkspace.onBuilded.call(o, p);
   var frame = o._frameToolBar = o.searchControl('toolbarFrame');
   frame._hPanel.className = o.styleName('Toolbar_Ground');
   var frame = o._frameBody = o.searchControl('bodyFrame');
   frame._hPanel.className = o.styleName('Body_Ground');
   var frame = o._frameStatusBar = o.searchControl('statusFrame');
   frame._hPanel.className = o.styleName('Statusbar_Ground');
   var menuBar = o._menuBar = RClass.create(FDsMeshMenuBar);
   menuBar._workspace = o;
   menuBar.buildDefine(p);
   o._frameToolBar.push(menuBar);
   var frameSet = o._frameSet = RClass.create(FDsMeshFrameSet);
   frameSet._workspace = o;
   frameSet.buildDefine(p);
   o._frameBody.push(frameSet);
   menuBar._frameSet = frameSet;
}
function FDsMeshWorkspace_onMeshLoad(p){
   var o = this;
   o._activeSpace = p._activeSpace;
   o._catalog.buildSpace(o._activeSpace);
}
function FDsMeshWorkspace_onCatalogSelected(p, pc){
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
function FDsMeshWorkspace_construct(){
   var o = this;
   o.__base.FUiWorkspace.construct.call(o);
   o._propertyFrames = new TDictionary();
}
function FDsMeshWorkspace_findPropertyFrame(p){
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
function FDsMeshWorkspace_loadByGuid(guid){
   this._frameSet.loadByGuid(guid);
}
function FDsMeshWorkspace_loadByCode(code){
   this._frameSet.loadByCode(code);
}
function FDsMeshWorkspace_dispose(){
   var o = this;
   o.__base.FUiWorkspace.dispose.call(o);
   o._propertyFrames.dispose();
   o._propertyFrames = null;
}
function FDsModelCanvas(o){
   o = RClass.inherits(this, o, FDsCanvas);
   o._graphicContext      = null;
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
   o._cameraMoveRate      = 0.8;
   o._cameraKeyRotation   = 0.03;
   o._cameraMouseRotation = 0.005;
   o._templateMatrix      = null;
   o._templateRenderable  = null;
   o._templateFace        = null;
   o._templateTranslation = null;
   o._templateRotation    = null;
   o._templateScale       = null;
   o._templateViewScale   = 0.05;
   o.onBuild              = FDsModelCanvas_onBuild;
   o.onMouseCaptureStart  = FDsModelCanvas_onMouseCaptureStart;
   o.onMouseCapture       = FDsModelCanvas_onMouseCapture;
   o.onMouseCaptureStop   = FDsModelCanvas_onMouseCaptureStop;
   o.onEnterFrame         = FDsModelCanvas_onEnterFrame;
   o.onSceneLoad          = FDsModelCanvas_onSceneLoad;
   o.oeResize             = FDsModelCanvas_oeResize;
   o.oeRefresh            = FDsModelCanvas_oeRefresh;
   o.construct            = FDsModelCanvas_construct;
   o.innerSelectDisplay   = FDsModelCanvas_innerSelectDisplay;
   o.innerSelectLayer     = FDsModelCanvas_innerSelectLayer;
   o.selectNone           = FDsModelCanvas_selectNone;
   o.selectLayers         = FDsModelCanvas_selectLayers;
   o.selectLayer          = FDsModelCanvas_selectLayer;
   o.selectDisplay        = FDsModelCanvas_selectDisplay;
   o.selectMaterial       = FDsModelCanvas_selectMaterial;
   o.selectRenderable     = FDsModelCanvas_selectRenderable;
   o.switchMode           = FDsModelCanvas_switchMode;
   o.switchPlay           = FDsModelCanvas_switchPlay;
   o.switchMovie          = FDsModelCanvas_switchMovie;
   o.reloadRegion         = FDsModelCanvas_reloadRegion;
   o.loadScene            = FDsModelCanvas_loadScene;
   o.dispose              = FDsModelCanvas_dispose;
   return o;
}
function FDsModelCanvas_onBuild(p){
   var o = this;
   o.__base.FDsCanvas.onBuild.call(o, p);
   var c = o._graphicContext;
   var tc = RConsole.find(FE3dTemplateConsole);
   var t = o._templateTranslation = tc.allocByCode(c, 'com.design.translation');
   t._optionFace = true;
   t.hide();
   var t = o._templateRotation = tc.allocByCode(c, 'com.design.rotation');
   t._optionFace = true;
   t.hide();
   var t = o._templateScale = tc.allocByCode(c, 'com.design.scale');
   t._optionFace = true;
   t.hide();
}
function FDsModelCanvas_onMouseCaptureStart(p){
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
function FDsModelCanvas_onMouseCapture(p){
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
   var tf = o._templateFace;
   var tm = o._templateMatrix;
   switch(mc){
      case EDsCanvasMode.Drop:
         var c = o._activeScene.camera();
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
function FDsModelCanvas_onMouseCaptureStop(p){
}
function FDsModelCanvas_onEnterFrame(){
   var o = this;
   var s = o._activeScene;
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
function FDsModelCanvas_onSceneLoad(p){
   var o = this;
   var c = o._graphicContext;
   var s = o._activeScene;
   var l = RClass.create(FDisplayUiLayer);
   l.selectTechnique(c, FG3dControlTechnique);
   l.pushDisplay(o._templateTranslation);
   l.pushDisplay(o._templateRotation);
   l.pushDisplay(o._templateScale);
   s.registerLayer('ui', l);
   o.reloadRegion();
   o.processLoadListener(o);
}
function FDsModelCanvas_oeResize(p){
   var o = this;
   o.__base.FDsCanvas.oeResize.call(o, p);
   var hp = o._hPanel;
   var w = hp.offsetWidth;
   var h = hp.offsetHeight;
   var s = o._activeScene;
   if(s){
      var cp = s.camera().projection();
      cp.size().set(w, h);
      cp.update();
   }
   return EEventStatus.Stop;
}
function FDsModelCanvas_oeRefresh(p){
   return EEventStatus.Stop;
}
function FDsModelCanvas_construct(){
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
function FDsModelCanvas_innerSelectDisplay(p){
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
function FDsModelCanvas_innerSelectLayer(p){
   var o = this;
   var s = p.displays();
   var c = s.count();
   for(var i = 0; i < c; i++){
      var d = s.getAt(i);
      o.innerSelectDisplay(d)
   }
}
function FDsModelCanvas_selectNone(){
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
function FDsModelCanvas_selectLayers(p){
   var o = this;
   o.selectNone();
   var s = o._activeScene.layers();
   for(var i = s.count() - 1; i >= 0; i--){
      o.innerSelectLayer(s.valueAt(i));
   }
}
function FDsModelCanvas_selectLayer(p){
   var o = this;
   o.selectNone();
   o._selectObject = p;
   o.innerSelectLayer(p);
}
function FDsModelCanvas_selectDisplay(p){
   var o = this;
   o.selectNone();
   o._selectObject = p;
   o.innerSelectDisplay(p);
}
function FDsModelCanvas_selectMaterial(p){
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
function FDsModelCanvas_selectRenderable(p){
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
function FDsModelCanvas_switchMode(p){
   var o = this;
   o._canvasModeCd = p;
   o.selectRenderable(o._selectRenderable);
}
function FDsModelCanvas_switchPlay(p){
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
function FDsModelCanvas_switchMovie(p, f){
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
function FDsModelCanvas_reloadRegion(p){
   var o = this;
   var s = o._activeScene;
   var r = s._region._resource;
   o._cameraMoveRate = r.moveSpeed();
   o._cameraKeyRotation = r.rotationKeySpeed();
   o._cameraMouseRotation = r.rotationMouseSpeed();
}
function FDsModelCanvas_loadScene(p){
   var o = this;
   var c = o._graphicContext;
   var sc = RConsole.find(FE3dSceneConsole);
   if(o._activeScene != null){
      sc.free(o._activeScene);
   }
   var s = sc.alloc(o._graphicContext, p);
   s.addLoadListener(o, o.onSceneLoad);
   s.selectTechnique(c, FE3dGeneralTechnique);
   o._stage = o._activeScene = s;
   RStage.register('stage3d', s);
}
function FDsModelCanvas_dispose(){
   var o = this;
   var v = o._rotation;
   if(v){
      v.dispose();
      o._rotation = null;
   }
   o.__base.FDsCanvas.dispose.call(o);
}
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
   g.region().backgroundColor().set(0.5, 0.5, 0.5, 1);
   g.selectTechnique(o, FE3dGeneralTechnique);
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
         m.ry = cm.ry + cx * RConst.DEGREE_RATE;
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
      m.scale().set(0.002, 0.002, 0.002); // Car01
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
   var m = rmc.allocByCode(o._graphicContext, p);
   m.addLoadListener(o, o.onTemplateLoad);
   o._layer.pushDisplay(m);
   o._activeTemplate = m;
}
function FDsTemplateCanvas_dispose(){
   var o = this;
  o._rotation = RObject.dispose(o._rotation);
x   // 父处理
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
      var mc = RConsole.find(FE3sMaterialConsole);
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
      var mgc = RConsole.find(FE3sMaterialGroupConsole);
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
   RConsole.find(FE3sTemplateConsole).update(xr);
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
   fs._directionCd = EUiDirection.Horizontal;
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
   }else if(RClass.isClass(p, FE3sTemplateTheme)){
      var f = o.themePropertyFrame();
      f.show();
      f.loadObject(t, p);
   }else if(RClass.isClass(p, FE3sMaterial)){
      var f = o.materialPropertyFrame();
      f.show();
      f.loadObject(t, p);
   }else if(RClass.isClass(p, MG3dRenderable)){
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
function FDsSceneCameraFrame(o){
   o = RClass.inherits(this, o, FUiForm);
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
   o._graphicContext      = null;
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
   o._cameraMoveRate      = 0.8;
   o._cameraKeyRotation   = 0.03;
   o._cameraMouseRotation = 0.005;
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
   o.onEnterFrame         = FDsSceneCanvas_onEnterFrame;
   o.onSceneLoad          = FDsSceneCanvas_onSceneLoad;
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
   o.reloadRegion         = FDsSceneCanvas_reloadRegion;
   o.loadScene            = FDsSceneCanvas_loadScene;
   o.dispose              = FDsSceneCanvas_dispose;
   return o;
}
function FDsSceneCanvas_onBuild(p){
   var o = this;
   o.__base.FDsCanvas.onBuild.call(o, p);
   var c = o._graphicContext;
   var tc = RConsole.find(FE3dTemplateConsole);
   var t = o._templateTranslation = tc.allocByCode(c, 'com.design.translation');
   t._optionFace = true;
   t.hide();
   var t = o._templateRotation = tc.allocByCode(c, 'com.design.rotation');
   t._optionFace = true;
   t.hide();
   var t = o._templateScale = tc.allocByCode(c, 'com.design.scale');
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
   var tf = o._templateFace;
   var tm = o._templateMatrix;
   switch(mc){
      case EDsCanvasMode.Drop:
         var c = o._activeScene.camera();
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
function FDsSceneCanvas_onEnterFrame(){
   var o = this;
   var s = o._activeScene;
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
   o.reloadRegion();
   o.processLoadListener(o);
}
function FDsSceneCanvas_oeResize(p){
   var o = this;
   o.__base.FDsCanvas.oeResize.call(o, p);
   var hp = o._hPanel;
   var w = hp.offsetWidth;
   var h = hp.offsetHeight;
   var s = o._activeScene;
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
   var s = o._activeScene.layers();
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
function FDsSceneCanvas_switchMovie(p, f){
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
function FDsSceneCanvas_reloadRegion(p){
   var o = this;
   var s = o._activeScene;
   var r = s._region._resource;
   o._cameraMoveRate = r.moveSpeed();
   o._cameraKeyRotation = r.rotationKeySpeed();
   o._cameraMouseRotation = r.rotationMouseSpeed();
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
   s.selectTechnique(c, FE3dGeneralTechnique);
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
   o._iconView             = 'design3d.scene.view';
   o._iconViewNot          = 'design3d.scene.viewno';
   o._displays             = null;
   o._renderables          = null;
   o._materials            = null;
   o.onBuild               = FDsSceneCatalog_onBuild;
   o.onLoadDisplay         = FDsSceneCatalog_onLoadDisplay;
   o.onNodeClick           = FDsSceneCatalog_onNodeClick;
   o.onNodeViewClick       = FDsSceneCatalog_onNodeViewClick;
   o.onNodeViewDoubleClick = FDsSceneCatalog_onNodeViewDoubleClick;
   o.lsnsSelect            = null;
   o.construct             = FDsSceneCatalog_construct;
   o.buildNodeView         = FDsSceneCatalog_buildNodeView;
   o.buildTechnique        = FDsSceneCatalog_buildTechnique;
   o.buildRegion           = FDsSceneCatalog_buildRegion;
   o.buildRenderable       = FDsSceneCatalog_buildRenderable;
   o.buildDisplay          = FDsSceneCatalog_buildDisplay;
   o.buildLayer            = FDsSceneCatalog_buildLayer;
   o.buildScene            = FDsSceneCatalog_buildScene;
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
   o.__base.FUiDataTreeView.construct.call(o);
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
function FDsSceneCatalog_buildTechnique(n, p){
   var o = this;
   var nt = o.createNode();
   nt.setLabel('Technique');
   nt.setTypeCode('technique');
   nt.dataPropertySet('linker', p);
   n.appendNode(nt);
}
function FDsSceneCatalog_buildRegion(n, p){
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
function FDsSceneCatalog_buildScene(p){
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
   o._visible       = false;
   o._workspace     = null;
   o._layer         = null;
   o._layerResource = null;
   o._controlGuid   = null;
   o._controlCode   = null;
   o._controlLabel  = null;
   o.onBuilded      = FDsSceneLayerPropertyFrame_onBuilded;
   o.onDataChanged  = FDsSceneLayerPropertyFrame_onDataChanged;
   o.construct      = FDsSceneLayerPropertyFrame_construct;
   o.loadObject     = FDsSceneLayerPropertyFrame_loadObject;
   o.dispose        = FDsSceneLayerPropertyFrame_dispose;
   return o;
}
function FDsSceneLayerPropertyFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsSceneLayerPropertyFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   o._controlCode.addDataChangedListener(o, o.onDataChanged);
   o._controlLabel.addDataChangedListener(o, o.onDataChanged);
   o._controlTypeCd.addDataChangedListener(o, o.onDataChanged);
   o._controlTransformCd.addDataChangedListener(o, o.onDataChanged);
}
function FDsSceneLayerPropertyFrame_onDataChanged(p){
   var o = this;
   var r = o._layerResource;
   r.setCode(o._controlCode.get());
   r.setLabel(o._controlLabel.get());
   r.setTypeCd(o._controlTypeCd.get());
   r.setTransformCd(o._controlTransformCd.get());
}
function FDsSceneLayerPropertyFrame_loadObject(s, l){
   var o = this;
   var r = l.resource();
   o._layer = l;
   o._layerResource = r;
   o._controlGuid.set(r.guid());
   o._controlCode.set(r.code());
   o._controlLabel.set(r.label());
   o._controlTypeCd.set(r.typeCd());
   o._controlTransformCd.set(r.transformCd());
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
   o._scene                 = null;
   o._material              = null;
   o._controlOptionDouble   = null;
   o._controlEffectCode     = null;
   o._controlOptionAlpha    = null;
   o._controlAlphaBase      = null;
   o._controlAlphaRate      = null;
   o._controlOptionColor    = null;
   o._controlColorMin       = null;
   o._controlColorMax       = null;
   o._controlColorRate      = null;
   o._controlColorMerge     = null;
   o._controlOptionAmbient  = null;
   o._controlAmbientColor   = null;
   o._controlOptionDiffuse  = null;
   o._controlDiffuseColor   = null;
   o._controlOptionSpecular = null;
   o._controlSpecularColor  = null;
   o._controlSpecularBase   = null;
   o._controlSpecularLevel  = null;
   o._controlOptionReflect  = null;
   o._controlReflectColor   = null;
   o._controlReflectMerge   = null;
   o._controlOptionEmissive = null;
   o._controlEmissiveColor  = null;
   o.onBuilded              = FDsSceneMaterial1Frame_onBuilded;
   o.onOptionChanged        = FDsSceneMaterial1Frame_onOptionChanged;
   o.onDataChanged          = FDsSceneMaterial1Frame_onDataChanged;
   o.construct              = FDsSceneMaterial1Frame_construct;
   o.loadObject             = FDsSceneMaterial1Frame_loadObject;
   o.dispose                = FDsSceneMaterial1Frame_dispose;
   return o;
}
function FDsSceneMaterial1Frame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   o._controlOptionDouble.addDataChangedListener(o, o.onDataChanged);
   o._controlEffectCode.addDataChangedListener(o, o.onDataChanged);
   o._controlOptionAlpha.addDataChangedListener(o, o.onDataChanged);
   o._controlAlphaBase.addDataChangedListener(o, o.onDataChanged);
   o._controlAlphaRate.addDataChangedListener(o, o.onDataChanged);
   o._controlOptionColor.addDataChangedListener(o, o.onOptionChanged);
   o._controlColorMin.addDataChangedListener(o, o.onDataChanged);
   o._controlColorMax.addDataChangedListener(o, o.onDataChanged);
   o._controlColorRate.addDataChangedListener(o, o.onDataChanged);
   o._controlColorMerge.addDataChangedListener(o, o.onDataChanged);
   o._controlOptionAmbient.addDataChangedListener(o, o.onOptionChanged);
   o._controlAmbientColor.addDataChangedListener(o, o.onDataChanged);
   o._controlOptionDiffuse.addDataChangedListener(o, o.onOptionChanged);
   o._controlDiffuseColor.addDataChangedListener(o, o.onDataChanged);
   o._controlOptionSpecular.addDataChangedListener(o, o.onOptionChanged);
   o._controlSpecularColor.addDataChangedListener(o, o.onDataChanged);
   o._controlSpecularBase.addDataChangedListener(o, o.onDataChanged);
   o._controlSpecularLevel.addDataChangedListener(o, o.onDataChanged);
   o._controlOptionReflect.addDataChangedListener(o, o.onOptionChanged);
   o._controlReflectColor.addDataChangedListener(o, o.onDataChanged);
   o._controlReflectMerge.addDataChangedListener(o, o.onDataChanged);
   o._controlOptionEmissive.addDataChangedListener(o, o.onOptionChanged);
   o._controlEmissiveColor.addDataChangedListener(o, o.onDataChanged);
}
function FDsSceneMaterial1Frame_onOptionChanged(p){
   var o = this;
   var t = o._scene;
   var m = o._material;
   var mr = m.resource();
   var mi = mr.info();
   mi.optionColor = o._controlOptionColor.get();
   mi.optionAmbient = o._controlOptionAmbient.get();
   mi.optionDiffuse = o._controlOptionDiffuse.get();
   mi.optionSpecular = o._controlOptionSpecular.get();
   mi.optionReflect = o._controlOptionReflect.get();
   mi.optionEmissive = o._controlOptionEmissive.get();
   m.reload();
   m._display.reloadResource();
   o._scene.dirty();
}
function FDsSceneMaterial1Frame_onDataChanged(p){
   var o = this;
   var t = o._scene;
   var m = o._material;
   var mr = m.resource();
   var mi = mr.info();
   mi.optionDouble = o._controlOptionDouble.get();
   mi.effectCode = o._controlEffectCode.get();
   mi.optionAlpha = o._controlOptionAlpha.get();
   mi.alphaBase = o._controlAlphaBase.get();
   mi.alphaRate = o._controlAlphaRate.get();
   mi.colorMin = o._controlColorMin.get();
   mi.colorMax = o._controlColorMax.get();
   mi.colorRate = o._controlColorRate.get();
   mi.colorMerge = o._controlColorMerge.get();
   mi.ambientColor.assign(o._controlAmbientColor.get());
   mi.diffuseColor.assign(o._controlDiffuseColor.get());
   mi.specularColor.assign(o._controlSpecularColor.get());
   mi.specularBase = o._controlSpecularBase.get();
   mi.specularLevel = o._controlSpecularLevel.get();
   mi.reflectColor.assign(o._controlReflectColor.get());
   mi.reflectMerge = o._controlReflectMerge.get();
   mi.emissiveColor.assign(o._controlEmissiveColor.get());
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
   o._controlOptionDouble.set(mi.optionDouble);
   o._controlEffectCode.set(mi.effectCode);
   o._controlOptionAlpha.set(mi.optionAlpha);
   o._controlAlphaBase.set(mi.alphaBase);
   o._controlAlphaRate.set(mi.alphaRate);
   o._controlOptionColor.set(mi.optionColor);
   o._controlColorMin.set(mi.colorMin);
   o._controlColorMax.set(mi.colorMax);
   o._controlColorRate.set(mi.colorRate);
   o._controlColorMerge.set(mi.colorMerge);
   o._controlOptionAmbient.set(mi.optionAmbient);
   o._controlAmbientColor.set(mi.ambientColor);
   o._controlOptionDiffuse.set(mi.optionDiffuse);
   o._controlDiffuseColor.set(mi.diffuseColor);
   o._controlOptionSpecular.set(mi.optionSpecular);
   o._controlSpecularColor.set(mi.specularColor);
   o._controlSpecularBase.set(mi.specularBase);
   o._controlSpecularLevel.set(mi.specularLevel);
   o._controlOptionReflect.set(mi.optionReflect);
   o._controlReflectColor.set(mi.reflectColor);
   o._controlReflectMerge.set(mi.reflectMerge);
   o._controlOptionEmissive.set(mi.optionEmissive);
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
   o._material       = null;
   o._controlGuid    = null;
   o._controlCode    = null;
   o._controlLabel   = null;
   o._frameMaterial1 = null;
   o._frameMaterial2 = null;
   o.onBuilded       = FDsSceneMaterialPropertyFrame_onBuilded;
   o.onDataChanged   = FDsSceneMaterialPropertyFrame_onDataChanged;
   o.construct       = FDsSceneMaterialPropertyFrame_construct;
   o.loadObject      = FDsSceneMaterialPropertyFrame_loadObject;
   o.dispose         = FDsSceneMaterialPropertyFrame_dispose;
   return o;
}
function FDsSceneMaterialPropertyFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   o._controlLabel.addDataChangedListener(o, o.onDataChanged);
}
function FDsSceneMaterialPropertyFrame_onDataChanged(p){
   var o = this;
   var m = o._material;
   var mr = m.resource();
   mr.setLabel(o._controlLabel.get());
}
function FDsSceneMaterialPropertyFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsSceneMaterialPropertyFrame_loadObject(s, m){
   var o = this;
   var r = m.resource();
   o._material = m;
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
   RConsole.find(FE3sSceneConsole).update(x);
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
function FDsSceneRegionPropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._visible                 = false;
   o._workspace               = null;
   o._scene                   = null;
   o._region                  = null;
   o._regionResource          = null;
   o._controlOptionBackground = null;
   o._controlBackgroundColor  = null;
   o.onBuilded                = FDsSceneRegionPropertyFrame_onBuilded;
   o.onDataChanged            = FDsSceneRegionPropertyFrame_onDataChanged;
   o.construct                = FDsSceneRegionPropertyFrame_construct;
   o.loadObject               = FDsSceneRegionPropertyFrame_loadObject;
   o.dispose                  = FDsSceneRegionPropertyFrame_dispose;
   return o;
}
function FDsSceneRegionPropertyFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   o._controlMoveSpeed.addDataChangedListener(o, o.onDataChanged);
   o._controlRotationKeySpeed.addDataChangedListener(o, o.onDataChanged);
   o._controlRotationMouseSpeed.addDataChangedListener(o, o.onDataChanged);
   o._controlOptionBackground.addDataChangedListener(o, o.onDataChanged);
   o._controlBackgroundColor.addDataChangedListener(o, o.onDataChanged);
}
function FDsSceneRegionPropertyFrame_onDataChanged(p){
   var o = this;
   var r = o._regionResource;
   r.setOptionBackground(o._controlOptionBackground.get());
   r.backgroundColor().assign(o._controlBackgroundColor.get());
   r.setMoveSpeed(o._controlMoveSpeed.get());
   r.setRotationKeySpeed(o._controlRotationKeySpeed.get());
   r.setRotationMouseSpeed(o._controlRotationMouseSpeed.get());
   o._region.reloadResource();
   o._workspace._canvas.reloadRegion();
}
function FDsSceneRegionPropertyFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsSceneRegionPropertyFrame_loadObject(s, t){
   var o = this;
   o._scene = s;
   o._region = t;
   var r = o._regionResource = t._resource;
   o._controlMoveSpeed.set(r.moveSpeed());
   o._controlRotationKeySpeed.set(r.rotationKeySpeed());
   o._controlRotationMouseSpeed.set(r.rotationMouseSpeed());
   o._controlOptionBackground.set(r.optionBackground());
   o._controlBackgroundColor.set(r.backgroundColor());
}
function FDsSceneRegionPropertyFrame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
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
function FDsSceneTechniquePropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._visible              = false;
   o._thread               = null;
   o._interval             = 2000;
   o._workspace            = null;
   o._scene                = null;
   o._technique            = null;
   o._techniqueResource    = null;
   o._controlGuid          = null;
   o._controlCode          = null;
   o._controlLabel         = null;
   o._controlTriangleCount = null;
   o._controlDrawCount     = null;
   o.onBuilded             = FDsSceneTechniquePropertyFrame_onBuilded;
   o.onDataChanged         = FDsSceneTechniquePropertyFrame_onDataChanged;
   o.onModeClick           = FDsSceneTechniquePropertyFrame_onModeClick;
   o.onRefresh             = FDsSceneTechniquePropertyFrame_onRefresh;
   o.construct             = FDsSceneTechniquePropertyFrame_construct;
   o.loadObject            = FDsSceneTechniquePropertyFrame_loadObject;
   o.dispose               = FDsSceneTechniquePropertyFrame_dispose;
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
   var m = pi.tag();
   o._technique._activeMode = m;
   o._scene.dirty();
}
function FDsSceneTechniquePropertyFrame_onRefresh(){
   var o = this;
   if(!o._statusVisible){
      return;
   }
   var s = o._scene;
   var ss = s.statistics();
   var gs = s._graphicContext.statistics();
   o._controlFrameTick.set(ss._frame.toString());
   o._controlProcessTick.set(ss._frameProcess.toString() + ' | ' + ss._frameDrawRenderable.toString());
   o._controlDrawTick.set(ss._frameDraw.toString() + ' | ' + ss._frameDrawSort.toString());
   o._controlClearCount.set(gs._frameClearCount);
   o._controlModeInfo.set(
      'FIL:' + gs._frameFillModeCount +
      ' | DEP:' + gs._frameDepthModeCount +
      ' | CUL:' + gs._frameCullModeCount +
      ' | BLD:' + gs._frameBlendModeCount);
   o._controlProgramCount.set(gs._frameProgramCount);
   o._controlConstInfo.set(gs._frameConstCount + ' : length=' + gs._frameConstLength);
   o._controlBufferCount.set(gs._frameBufferCount);
   o._controlTextureCount.set(gs._frameTextureCount);
   o._controlTargetCount.set(gs._frameTargetCount);
   o._controlDrawInfo.set(gs._frameDrawCount + ' : triangle=' + gs._frameTriangleCount);
   o._controlProgramTotal.set(gs._programTotal);
   o._controlLayoutTotal.set(gs._layoutTotal);
   o._controlBufferInfo.set('Vertex:' + gs._vertexBufferTotal + ' Index:' + gs._indexBufferTotal);
   o._controlTextureInfo.set('Flat:' + gs._flatTextureTotal + ' Cube:' + gs._cubeTextureTotal);
   o._controlTargetTotal.set(gs._targetTotal);
}
function FDsSceneTechniquePropertyFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.addProcessListener(o, o.onRefresh);
   RConsole.find(FThreadConsole).start(t);
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
      cm.setTag(m);
      cms.push(cm);
   }
   o.onRefresh();
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
   var sf = RConsole.find(FE3dSceneConsole).factory();
   sf.register(EE3dScene.Layer, FDsSceneLayer);
   sf.register(EE3dScene.Display, FDsSceneDisplay);
   sf.register(EE3dScene.Renderable, FDsSceneRenderable);
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
