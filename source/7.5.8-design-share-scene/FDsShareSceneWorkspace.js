//==========================================================
// <T>共享场景工作区域。</T>
//
// @class
// @author maocy
// @history 150422
//==========================================================
function FDsShareSceneWorkspace(o){
   o = RClass.inherits(this, o, FDsSceneWorkspace);
   //..........................................................
   // @property
   o._frameName            = 'resource.share.scene.Workspace';
   //..........................................................
   // @process
   o.onBuilded             = FDsShareSceneWorkspace_onBuilded;
   o.onSceneLoad           = FDsShareSceneWorkspace_onSceneLoad;
   o.onCatalogSelected     = FDsShareSceneWorkspace_onCatalogSelected;
   //..........................................................
   // @method
   o.construct             = FDsShareSceneWorkspace_construct;
   // @method
   o.findPropertyFrame     = FDsShareSceneWorkspace_findPropertyFrame;
   // @method
   o.loadScene             = FDsShareSceneWorkspace_loadScene;
   // @method
   o.dispose               = FDsShareSceneWorkspace_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsShareSceneWorkspace_onBuilded(p){
   var o = this;
   o.__base.FDsSceneWorkspace.onBuilded.call(o, p);
   //..........................................................
   // 设置工具区
   var f = o._frameToolBar = o.searchControl('toolbarFrame');
   f._hPanel.className = o.styleName('Toolbar_Ground');
   // 设置目录区
   var f = o._frameCatalog = o.searchControl('catalogFrame');
   f._hPanel.className = o.styleName('Catalog_Ground');
   // 设置属性区
   var f = o._frameWorkspace = o.searchControl('spaceFrame');
   f._hPanel.className = o.styleName('Workspace_Ground');
   // 设置属性区
   var f = o._frameProperty = o.searchControl('propertyFrame');
   f._hPanel.className = o.styleName('Property_Ground');
   // 设置状态区
   var f = o._frameStatusBar = o.searchControl('statusFrame');
   f._hPanel.className = o.styleName('Statusbar_Ground');
   // 设置分割
   var f = o._catalogSplitter = o.searchControl('catalogSpliter');
   f.setAlignCd(EUiAlign.Left);
   f.setSizeHtml(o._frameCatalog._hPanel);
   var f = o._propertySpliter = o.searchControl('propertySpliter');
   f.setAlignCd(EUiAlign.Right);
   f.setSizeHtml(o._frameProperty._hPanel);
   //..........................................................
   // 设置工具栏
   var c = o._toolbar = RClass.create(FDsShareSceneMenuBar);
   c._workspace = o;
   c.buildDefine(p);
   //c.setPanel(o._frameToolBar._hPanel);
   //o.push(c);
   o._frameToolBar.push(c);
   //..........................................................
   // 设置目录栏
   var c = o._catalog = RClass.create(FDsShareSceneCatalog);
   c._workspace = o;
   c.build(p);
   //c.setPanel(o._frameCatalog._hPanel);
   c.addSelectedListener(o, o.onCatalogSelected);
   o._frameCatalog.push(c);
   //o.push(c);
   //..........................................................
   // 设置画板工具栏
   var f = o._canvasToolbarFrame = o.searchControl('canvasToolbarFrame');
   var c = o._canvasToolbar = RClass.create(FDsShareSceneCanvasToolBar);
   c._workspace = o;
   c.buildDefine(p);
   o._canvasToolbarFrame.push(c);
   //c.build(p);
   //c.setPanel(f._hPanel);
   //o.push(c);
   // 设置画板
   var f = o._canvasFrame = o.searchControl('canvasFrame');
   var c = o._canvas = RClass.create(FDsShareSceneCanvas);
   c._workspace = o;
   c._toolbar = o._canvasToolbar;
   c.addLoadListener(o, o.onSceneLoad);
   c._hParent = f._hPanel;
   c._hParent.style.backgroundColor = '#000000';
   c.build(p);
   o._canvasFrame.push(c);
   //c.setPanel(f._hPanel);
   //o.push(c);
}

//==========================================================
// <T>加载模板处理。</T>
//
// @method
// @param p:template:FTemplate3d 模板
//==========================================================
function FDsShareSceneWorkspace_onSceneLoad(p){
   var o = this;
   var t = o._activeScene = p._activeScene;
   // 加载完成
   o._catalog.buildScene(t);
   // 设置属性
   //o.onCatalogSelected(t);
   //o.onCatalogSelected(t.technique());
}

//==========================================================
// <T>目录对象选择处理。</T>
//
// @method
// @param p:value:Object 对象
//==========================================================
function FDsShareSceneWorkspace_onCatalogSelected(p, pc){
   var o = this;
   var s = o._activeScene;
   // 隐藏所有属性面板
   var fs = o._propertyFrames;
   var c = fs.count();
   for(var i = 0; i < c; i++){
      var f = fs.value(i);
      f.hide();
   }
   // 显示选中属性面板
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
      // 选中场景所有层
      if(pc){
         o._canvas.selectLayers(p);
      }
   }else if(RClass.isClass(p, FE3dSceneLayer)){
      // 选中场景层
      if(pc){
         o._canvas.selectLayer(p);
      }
      // 显示属性栏
      var f = o.findPropertyFrame(EDsFrame.SceneLayerPropertyFrame);
      f.show();
      f.loadObject(s, p);
   }else if(RClass.isClass(p, FE3dSceneDisplay)){
      // 选中显示对象
      if(pc){
         o._canvas.selectDisplay(p);
      }
      // 显示属性栏
      var f = o.findPropertyFrame(EDsFrame.SceneDisplayPropertyFrame);
      f.show();
      f.loadObject(s, p);
   }else if(RClass.isClass(p, FE3dSceneMaterial)){
      // 选中材质
      if(pc){
         o._canvas.selectMaterial(p);
      }
      // 显示属性栏
      var f = o.findPropertyFrame(EDsFrame.SceneMaterialPropertyFrame);
      f.show();
      f.loadObject(s, p);
   }else if(RClass.isClass(p, FE3rAnimation)){
      // 显示属性栏
      var f = o.findPropertyFrame(EDsFrame.SceneAnimationPropertyFrame);
      f.show();
      f.loadObject(s, p);
   }else if(RClass.isClass(p, FE3dRenderable)){
      // 选中渲染对象
      if(pc){
         o._canvas.selectRenderable(p);
      }
      // 显示属性栏
      var f = o.findPropertyFrame(EDsFrame.SceneRenderablePropertyFrame);
      f.show();
      f.loadObject(s, p);
   }else{
      throw new TError('Unknown select object type. (value={1})', p);
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsShareSceneWorkspace_construct(){
   var o = this;
   // 父处理
   o.__base.FDsSceneWorkspace.construct.call(o);
   // 设置属性
   o._propertyFrames = new TDictionary();
}

//==========================================================
// <T>根据名称获得属性页面。</T>
//
// @method
// @return FUiFrame 页面
//==========================================================
function FDsShareSceneWorkspace_findPropertyFrame(p){
   var o = this;
   var frame = o._propertyFrames.get(p);
   if(!frame){
      frame = RConsole.find(FUiFrameConsole).get(o, p, o._frameProperty._hContainer);
      frame._workspace = o;
      o._propertyFrames.set(p, frame);
   }
   return frame;
}

//==========================================================
// <T>加载模板处理。</T>
//
// @method
//==========================================================
function FDsShareSceneWorkspace_loadScene(p){
   var o = this;
   o._sceneCode = p;
   o._canvas.loadScene(p);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsShareSceneWorkspace_dispose(){
   var o = this;
   // 父处理
   o.__base.FDsSceneWorkspace.dispose.call(o);
   // 设置属性
   o._propertyFrames.dispose();
   o._propertyFrames = null;
}
