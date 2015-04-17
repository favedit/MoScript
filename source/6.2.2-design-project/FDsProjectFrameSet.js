//==========================================================
// <T>模板工作区域。</T>
//
// @author maocy
// @history 150121
//==========================================================
function FDsProjectFrameSet(o){
   o = RClass.inherits(this, o, FUiFrameSet);
   //..........................................................
   // @property
   o._frameName            = 'resource.project.FrameSet';
   //..........................................................
   // @style
   o._stylePageControl     = RClass.register(o, new AStyle('_stylePageControl', 'PageControl'));
   o._styleToolbarGround   = RClass.register(o, new AStyle('_styleToolbarGround', 'Toolbar_Ground'));
   o._styleStatusbarGround = RClass.register(o, new AStyle('_styleStatusbarGround', 'Statusbar_Ground'));
   // @style
   o._styleCatalogGround   = RClass.register(o, new AStyle('_styleCatalogGround', 'Catalog_Ground'));
   o._styleCatalogContent  = RClass.register(o, new AStyle('_styleCatalogContent', 'Catalog_Content'));
   o._styleCanvasGround    = RClass.register(o, new AStyle('_styleCanvasGround', 'Canvas_Ground'));
   o._styleCanvasContent   = RClass.register(o, new AStyle('_styleCanvasContent', 'Canvas_Content'));
   o._stylePropertyGround  = RClass.register(o, new AStyle('_stylePropertyGround', 'Property_Ground'));
   o._stylePropertyContent = RClass.register(o, new AStyle('_stylePropertyContent', 'Property_Content'));
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
function FDsProjectFrameSet_onBuilded(event){
   var o = this;
   o.__base.FUiFrameSet.onBuilded.call(o, event);
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
   //..........................................................
   // 设置场景列表工具栏
   var control = o._sceneListToolbar = RClass.create(FDsProjectSceneListToolBar);
   control._frameSet = o;
   control.buildDefine(event);
   o._frameSceneListToolBar.push(control);
   // 设置场景列表内容
   var control = o._sceneListContent = RClass.create(FDsProjectSceneListContent);
   control._frameSet = o;
   control.build(event);
   o._frameSceneListContent.push(control);
   //..........................................................
   // 设置场景列表工具栏
   var control = o._sceneCatalogToolbar = RClass.create(FDsProjectSceneCatalogToolBar);
   control._frameSet = o;
   control.buildDefine(event);
   o._frameSceneCatalogToolBar.push(control);
   // 设置场景列表内容
   var control = o._sceneCatalogContent = RClass.create(FDsProjectSceneCatalogContent);
   control._frameSet = o;
   control.build(event);
   o._frameSceneCatalogContent.push(control);
   //..........................................................
   // 设置画板空间工具栏
   var control = o._canvasSpaceToolbar = RClass.create(FDsProjectCanvasSpaceToolBar);
   control._frameSet = o;
   control.buildDefine(event);
   o._frameCanvasSpaceToolBar.push(control);
   // 设置画板
   //var f = o._canvasFrame = o.searchControl('canvasFrame');
   //var c = o._canvas = RClass.create(FDsMeshCanvas);
   //c._workspace = o;
   //c._toolbar = o._canvasToolbar;
   //c.addLoadListener(o, o.onMeshLoad);
   //c._hParent = f._hPanel;
   //c._hParent.style.backgroundColor = '#000000';
   //c.build(p);
   //o._canvasFrame.push(c);
   //..........................................................
   // 设置画板空间工具栏
   var control = o._canvasPreviewToolbar = RClass.create(FDsProjectCanvasPreviewToolBar);
   control._frameSet = o;
   control.buildDefine(event);
   o._frameCanvasPreviewToolBar.push(control);
   // 设置画板
   //..........................................................
   // 设置属性栏
   var control = o._propertyToolbar = RClass.create(FDsProjectPropertyToolBar);
   control._frameSet = o;
   control.buildDefine(event);
   o._framePropertyAttributeToolBar.push(control);
}

//==========================================================
// <T>加载模板处理。</T>
//
// @method
// @param p:template:FTemplate3d 模板
//==========================================================
function FDsProjectFrameSet_onMeshLoad(p){
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
function FDsProjectFrameSet_onCatalogSelected(p, pc){
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

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsProjectFrameSet_construct(){
   var o = this;
   // 父处理
   o.__base.FUiFrameSet.construct.call(o);
   // 设置属性
   o._propertyFrames = new TDictionary();
}

//==========================================================
// <T>根据名称获得属性页面。</T>
//
// @method
// @return FUiFrame 页面
//==========================================================
function FDsProjectFrameSet_findPropertyFrame(p){
   var o = this;
   var f = o._propertyFrames.get(p);
   if(!f){
      var fc = RConsole.find(FFrameConsole);
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
function FDsProjectFrameSet_loadByGuid(guid){
   var o = this;
   o._activeGuid = guid;
   o._sceneListContent.serviceList(guid);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsProjectFrameSet_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiFrameSet.dispose.call(o);
   // 设置属性
   o._propertyFrames.dispose();
   o._propertyFrames = null;
}
