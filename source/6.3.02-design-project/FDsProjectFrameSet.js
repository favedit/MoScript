with(MO){
   //==========================================================
   // <T>模板工作区域。</T>
   //
   // @author maocy
   // @history 150121
   //==========================================================
   MO.FDsProjectFrameSet = function FDsProjectFrameSet(o){
      o = MO.Class.inherits(this, o, FDuiFrameSet);
      //..........................................................
      // @property
      o._frameName            = 'resource.project.FrameSet';
      //..........................................................
      // @style
      o._stylePageControl     = MO.Class.register(o, new MO.AStyle('_stylePageControl', 'PageControl'));
      o._styleToolbarGround   = MO.Class.register(o, new MO.AStyle('_styleToolbarGround', 'Toolbar_Ground'));
      o._styleStatusbarGround = MO.Class.register(o, new MO.AStyle('_styleStatusbarGround', 'Statusbar_Ground'));
      // @style
      o._styleCatalogGround   = MO.Class.register(o, new MO.AStyle('_styleCatalogGround', 'Catalog_Ground'));
      o._styleCatalogContent  = MO.Class.register(o, new MO.AStyle('_styleCatalogContent', 'Catalog_Content'));
      o._styleCanvasGround    = MO.Class.register(o, new MO.AStyle('_styleCanvasGround', 'Canvas_Ground'));
      o._styleCanvasContent   = MO.Class.register(o, new MO.AStyle('_styleCanvasContent', 'Canvas_Content'));
      o._stylePropertyGround  = MO.Class.register(o, new MO.AStyle('_stylePropertyGround', 'Property_Ground'));
      o._stylePropertyContent = MO.Class.register(o, new MO.AStyle('_stylePropertyContent', 'Property_Content'));
      //..........................................................
      // @attribute
      o._activeSpace          = null;
      o._activeMesh           = null;
      // @attribute
      o._framesetMain         = null;
      o._framesetBody         = null;
      // @attribute
      o._frameToolBar         = null;
      o._frameBody            = null;
      o._frameProperty        = null;
      // @attribute
      o._frameCatalog         = null;
      o._frameCanvas          = null;
      o._frameStatusBar       = null;
      // @attribute
      o._propertyFrames       = null;
      //..........................................................
      // @process
      o.onBuilded             = FDsProjectFrameSet_onBuilded;
      o.onMeshLoad            = FDsProjectFrameSet_onMeshLoad;
      o.onCatalogSelected     = FDsProjectFrameSet_onCatalogSelected;
      //..........................................................
      // @method
      o.construct             = FDsProjectFrameSet_construct;
      // @method
      o.findPropertyFrame     = FDsProjectFrameSet_findPropertyFrame;
      // @method
      o.loadByGuid            = FDsProjectFrameSet_loadByGuid;
      // @method
      o.dispose               = FDsProjectFrameSet_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsProjectFrameSet_onBuilded = function FDsProjectFrameSet_onBuilded(event){
      var o = this;
      o.__base.FDuiFrameSet.onBuilded.call(o, event);
      //..........................................................
      // 设置目录区
      var frame = o._frameCatalog = o.searchControl('catalogFrame');
      frame._hPanel.className = o.styleName('Catalog_Ground');
      var control = o._frameCatalogPageControl = o.searchControl('catalogPageControl');
      control._hPanel.className = o.styleName('PageControl');
      // 设置场景列表区
      var frame = o._frameSceneListToolBar = o.searchControl('sceneListToolbarFrame');
      frame._hPanel.className = o.styleName('Toolbar_Ground');
      var frame = o._frameSceneListContent = o.searchControl('sceneListContentFrame');
      frame._hPanel.className = o.styleName('Catalog_Content');
      // 设置场景目录区
      var frame = o._frameSceneCatalogToolBar = o.searchControl('sceneCatalogToolbarFrame');
      frame._hPanel.className = o.styleName('Toolbar_Ground');
      var frame = o._frameSceneCatalogContent = o.searchControl('sceneCatalogContentFrame');
      frame._hPanel.className = o.styleName('Catalog_Content');
      //..........................................................
      // 设置画板区
      var frame = o._frameCanvas = o.searchControl('canvasFrame');
      frame._hPanel.className = o.styleName('Canvas_Ground');
      var control = o._frameCanvasPageControl = o.searchControl('canvasPageControl');
      control._hPanel.className = o.styleName('PageControl');
      // 设置画板空间区
      var frame = o._frameCanvasSpaceToolBar = o.searchControl('canvasSpaceToolbarFrame');
      frame._hPanel.className = o.styleName('Toolbar_Ground');
      var frame = o._frameCanvasSpaceContent = o.searchControl('canvasSpaceContentFrame');
      frame._hPanel.className = o.styleName('Canvas_Content');
      // 设置画板预览区
      var frame = o._frameCanvasPreviewToolBar = o.searchControl('canvasPreviewToolbarFrame');
      frame._hPanel.className = o.styleName('Toolbar_Ground');
      var frame = o._frameCanvasPreviewContent = o.searchControl('canvasPreviewContentFrame');
      frame._hPanel.className = o.styleName('Canvas_Content');
      //..........................................................
      // 设置属性区
      var frame = o._frameProperty = o.searchControl('propertyFrame');
      frame._hPanel.className = o.styleName('Property_Ground');
      var control = o._framePropertyPageControl = o.searchControl('propertyPageControl');
      control._hPanel.className = o.styleName('PageControl');
      var frame = o._framePropertyAttributeToolBar = o.searchControl('propertyAttributeToolbarFrame');
      frame._hPanel.className = o.styleName('Toolbar_Ground');
      var frame = o._framePropertyAttributeContent = o.searchControl('propertyAttributeContentFrame');
      frame._hPanel.className = o.styleName('Property_Content');
      //..........................................................
      // 设置分割
      var f = o._catalogSplitter = o.searchControl('catalogSpliter');
      f.setAlignCd(EUiAlign.Left);
      f.setSizeHtml(o._frameCatalog._hPanel);
      var f = o._propertySpliter = o.searchControl('propertySpliter');
      f.setAlignCd(EUiAlign.Right);
      f.setSizeHtml(o._frameProperty._hPanel);
   }

   //==========================================================
   // <T>加载模板处理。</T>
   //
   // @method
   // @param p:template:FTemplate3d 模板
   //==========================================================
   MO.FDsProjectFrameSet_onMeshLoad = function FDsProjectFrameSet_onMeshLoad(p){
      var o = this;
      o._activeSpace = p._activeSpace;
      // 加载完成
      o._catalog.buildSpace(o._activeSpace);
   }

   //==========================================================
   // <T>目录对象选择处理。</T>
   //
   // @method
   // @param p:value:Object 对象
   //==========================================================
   MO.FDsProjectFrameSet_onCatalogSelected = function FDsProjectFrameSet_onCatalogSelected(p, pc){
      var o = this;
      var space = o._activeSpace;
      // 隐藏所有属性面板
      var fs = o._propertyFrames;
      var c = fs.count();
      for(var i = 0; i < c; i++){
         var f = fs.value(i);
         f.hide();
      }
      // 显示选中属性面板
      if(MO.Class.isClass(p, FE3dStage)){
         var f = o.findPropertyFrame(EDsFrame.MeshSpacePropertyFrame);
         f.show();
         f.loadObject(space, space);
      }else if(MO.Class.isClass(p, FG3dTechnique)){
         var f = o.findPropertyFrame(EDsFrame.MeshTechniquePropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(MO.Class.isClass(p, FE3dRegion)){
         var f = o.findPropertyFrame(EDsFrame.MeshRegionPropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(MO.Class.isClass(p, FE3dCamera)){
         var f = o.findPropertyFrame(EDsFrame.MeshCameraPropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(MO.Class.isClass(p, FG3dDirectionalLight)){
         var f = o.findPropertyFrame(EDsFrame.MeshLightPropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(MO.Class.isClass(p, FE3dMeshDisplay)){
         var f = o.findPropertyFrame(EDsFrame.MeshDisplayPropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(MO.Class.isClass(p, FG3dMaterial)){
         var f = o.findPropertyFrame(EDsFrame.MeshMaterialPropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(MO.Class.isClass(p, FE3dMeshRenderable)){
         var f = o.findPropertyFrame(EDsFrame.MeshRenderablePropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else{
         throw new TError('Unknown select object type. (value={1})', p);
      }
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsProjectFrameSet_construct = function FDsProjectFrameSet_construct(){
      var o = this;
      // 父处理
      o.__base.FDuiFrameSet.construct.call(o);
      // 设置属性
      o._propertyFrames = new TDictionary();
   }

   //==========================================================
   // <T>根据名称获得属性页面。</T>
   //
   // @method
   // @return FDuiFrame 页面
   //==========================================================
   MO.FDsProjectFrameSet_findPropertyFrame = function FDsProjectFrameSet_findPropertyFrame(p){
      var o = this;
      var f = o._propertyFrames.get(p);
      if(!f){
         var fc = MO.Console.find(FFrameConsole);
         //f = fc.get(o, p, o._frameProperty._hPanel);
         f = fc.get(o, p, o._frameProperty._hContainer);
         f._workspace = o;
         o._propertyFrames.set(p, f);
      }
      return f;
   }

   //==========================================================
   // <T>加载项目信息。</T>
   //
   // @method
   // @paam guid:String 唯一编号
   //==========================================================
   MO.FDsProjectFrameSet_loadByGuid = function FDsProjectFrameSet_loadByGuid(guid){
      var o = this;
      o._activeGuid = guid;
      o._sceneListContent.serviceList(guid);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsProjectFrameSet_dispose = function FDsProjectFrameSet_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiFrameSet.dispose.call(o);
      // 设置属性
      o._propertyFrames.dispose();
      o._propertyFrames = null;
   }
}
