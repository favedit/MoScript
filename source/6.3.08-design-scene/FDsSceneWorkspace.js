with(MO){
   //==========================================================
   // <T>场景工作区。</T>
   //
   // @class
   // @author maocy
   // @history 150121
   //==========================================================
   MO.FDsSceneWorkspace = function FDsSceneWorkspace(o){
      o = RClass.inherits(this, o, FDuiWorkspace);
      //..........................................................
      // @property
      o._frameName            = 'resource.share.scene.Workspace';
      //..........................................................
      // @style
      o._styleToolbarGround   = RClass.register(o, new AStyle('_styleToolbarGround', 'Toolbar_Ground'));
      o._styleStatusbarGround = RClass.register(o, new AStyle('_styleStatusbarGround', 'Statusbar_Ground'));
      o._styleCatalogGround   = RClass.register(o, new AStyle('_styleCatalogGround', 'Catalog_Ground'));
      o._styleWorkspaceGround = RClass.register(o, new AStyle('_styleWorkspaceGround', 'Workspace_Ground'));
      o._stylePropertyGround  = RClass.register(o, new AStyle('_stylePropertyGround', 'Property_Ground'));
      //..........................................................
      // @attribute
      o._framesetMain         = null;
      o._framesetBody         = null;
      // @attribute
      o._frameToolBar         = null;
      o._frameBody            = null;
      o._frameProperty        = null;
      // @attribute
      o._frameCatalog         = null;
      o._frameWorkspace       = null;
      o._frameStatusBar       = null;
      // @attribute
      o._propertyFrames       = null;
      //..........................................................
      // @process
      o.onBuilded             = FDsSceneWorkspace_onBuilded;
      o.onSceneLoad           = FDsSceneWorkspace_onSceneLoad;
      o.onCatalogSelected     = FDsSceneWorkspace_onCatalogSelected;
      //..........................................................
      // @method
      o.construct             = FDsSceneWorkspace_construct;
      // @method
      o.findPropertyFrame     = FDsSceneWorkspace_findPropertyFrame;
      // @method
      o.loadScene             = FDsSceneWorkspace_loadScene;
      // @method
      o.dispose               = FDsSceneWorkspace_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsSceneWorkspace_onBuilded = function FDsSceneWorkspace_onBuilded(p){
      var o = this;
      o.__base.FDuiWorkspace.onBuilded.call(o, p);
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
      var c = o._toolbar = RClass.create(FDsSceneMenuBar);
      c._workspace = o;
      c.buildDefine(p);
      //c.setPanel(o._frameToolBar._hPanel);
      //o.push(c);
      o._frameToolBar.push(c);
      //..........................................................
      // 设置目录栏
      var c = o._catalog = RClass.create(FDsSceneCatalog);
      c._workspace = o;
      c.build(p);
      //c.setPanel(o._frameCatalog._hPanel);
      c.addSelectedListener(o, o.onCatalogSelected);
      o._frameCatalog.push(c);
      //o.push(c);
      //..........................................................
      // 设置画板工具栏
      var f = o._canvasToolbarFrame = o.searchControl('canvasToolbarFrame');
      var c = o._canvasToolbar = RClass.create(FDsSceneCanvasToolBar);
      c._workspace = o;
      c.buildDefine(p);
      o._canvasToolbarFrame.push(c);
      //c.build(p);
      //c.setPanel(f._hPanel);
      //o.push(c);
      // 设置画板
      var f = o._canvasFrame = o.searchControl('canvasFrame');
      var c = o._canvas = RClass.create(FDsSceneCanvas);
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
   MO.FDsSceneWorkspace_onSceneLoad = function FDsSceneWorkspace_onSceneLoad(p){
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
   MO.FDsSceneWorkspace_onCatalogSelected = function FDsSceneWorkspace_onCatalogSelected(p, pc){
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
   MO.FDsSceneWorkspace_construct = function FDsSceneWorkspace_construct(){
      var o = this;
      // 父处理
      o.__base.FDuiWorkspace.construct.call(o);
      // 设置属性
      o._propertyFrames = new TDictionary();
   }

   //==========================================================
   // <T>根据名称获得属性页面。</T>
   //
   // @method
   // @return FUiFrame 页面
   //==========================================================
   MO.FDsSceneWorkspace_findPropertyFrame = function FDsSceneWorkspace_findPropertyFrame(p){
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
   MO.FDsSceneWorkspace_loadScene = function FDsSceneWorkspace_loadScene(p){
      var o = this;
      o._sceneCode = p;
      o._canvas.loadScene(p);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSceneWorkspace_dispose = function FDsSceneWorkspace_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiWorkspace.dispose.call(o);
      // 设置属性
      o._propertyFrames.dispose();
      o._propertyFrames = null;
   }
}
