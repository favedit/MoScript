//==========================================================
// <T>资源框架。</T>
//
// @author maocy
// @history 150121
//==========================================================
function FDsResourceFrameSet(o){
   o = RClass.inherits(this, o, FUiFrameSet);
   //..........................................................
   // @property
   o._frameName            = 'design3d.resource.FrameSet';
   //..........................................................
   // @style
   o._styleCatalogGround   = RClass.register(o, new AStyle('_styleCatalogGround', 'Catalog_Ground'));
   o._styleCatalogToolbar  = RClass.register(o, new AStyle('_styleCatalogToolbar', 'Catalog_Toolbar'));
   o._styleSearchGround    = RClass.register(o, new AStyle('_styleSearchGround', 'Search_Ground'));
   o._styleSearchToolbar   = RClass.register(o, new AStyle('_styleCatalogToolbar', 'Search_Toolbar'));
   o._stylePreviewGround   = RClass.register(o, new AStyle('_stylePreviewGround', 'Preview_Ground'));
   o._stylePreviewToolbar  = RClass.register(o, new AStyle('_stylePreviewToolbar', 'Preview_Toolbar'));
   o._stylePropertyGround  = RClass.register(o, new AStyle('_stylePropertyGround', 'Property_Ground'));
   //..........................................................
   // @attribute
   o._resourceTypeCd       = 'picture';
   // @attribute
   o._frameCatalog         = null;
   o._frameCatalogToolbar  = null;
   o._frameCatalogContent  = null;
   o._frameSearch          = null;
   o._frameSearchToolbar   = null;
   o._frameSearchContent   = null;
   o._framePreview         = null;
   o._framePreviewToolbar  = null;
   o._framePreviewContent  = null;
   // @attribute
   o._propertyFrames       = null;
   //..........................................................
   // @process
   o.onBuilded             = FDsResourceFrameSet_onBuilded;
   o.onMeshLoad            = FDsResourceFrameSet_onMeshLoad;
   o.onCatalogSelected     = FDsResourceFrameSet_onCatalogSelected;
   //..........................................................
   // @method
   o.construct             = FDsResourceFrameSet_construct;
   // @method
   o.findPropertyFrame     = FDsResourceFrameSet_findPropertyFrame;
   // @method
   o.switchContent         = FDsResourceFrameSet_switchContent;
   o.load                  = FDsResourceFrameSet_load;
   // @method
   o.dispose               = FDsResourceFrameSet_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsResourceFrameSet_onBuilded(p){
   var o = this;
   o.__base.FUiFrameSet.onBuilded.call(o, p);
   //..........................................................
   // 设置目录区
   var frame = o._frameCatalog = o.searchControl('catalogFrame');
   frame._hPanel.className = o.styleName('Catalog_Ground');
   var frame = o._frameCatalogToolbar = o.searchControl('catalogToolbarFrame');
   frame._hPanel.className = o.styleName('Catalog_Toolbar');
   o._frameCatalogContent = o.searchControl('catalogContentFrame');
   // 设置属性区
   var frame = o._frameSearch = o.searchControl('searchFrame');
   frame._hPanel.className = o.styleName('Search_Ground');
   var frame = o._frameSearchToolbar = o.searchControl('searchToolbarFrame');
   frame._hPanel.className = o.styleName('Search_Toolbar');
   o._frameSearchContent = o.searchControl('searchContentFrame');
   // 设置属性区
   var frame = o._framePreview = o.searchControl('previewFrame');
   frame._hPanel.className = o.styleName('Preview_Ground');
   var frame = o._framePreviewToolbar = o.searchControl('previewToolbarFrame');
   frame._hPanel.className = o.styleName('Preview_Toolbar');
   o._framePreviewContent = o.searchControl('previewContentFrame');
   //..........................................................
   // 设置分割
   var f = o._catalogSplitter = o.searchControl('catalogSpliter');
   f.setAlignCd(EUiAlign.Left);
   f.setSizeHtml(o._frameCatalog._hPanel);
   var f = o._previewSpliter = o.searchControl('previewSpliter');
   f.setAlignCd(EUiAlign.Right);
   f.setSizeHtml(o._framePreview._hPanel);
   //..........................................................
   // 设置目录工具栏
   var control = o._catalogToolbar = RClass.create(FDsResourceCatalogToolBar);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(p);
   o._frameCatalogToolbar.push(control);
   // 设置目录栏
   var control = o._catalogContent = RClass.create(FDsResourceCatalogContent);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.build(p);
   //control.addSelectedListener(o, o.onCatalogSelected);
   o._frameCatalogContent.push(control);
   //..........................................................
   // 设置搜索栏
   var control = o._searchToolbar = RClass.create(FDsResourceSearchToolBar);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(p);
   o._frameSearchToolbar.push(control);
   // 设置搜索内容
   var control = o._searchContent = RClass.create(FDsResourceSearchContent);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.build(p);
   o._frameSearchContent.push(control);
   //..........................................................
   // 设置画板工具栏
   var control = o._previewToolbar = RClass.create(FDsResourcePreviewToolBar);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(p);
   o._framePreviewToolbar.push(control);
   // 设置画板
   var control = o._previewContent = RClass.create(FDsResourcePreviewContent);
   control._workspace = o._workspace;
   control._frameSet = o;
   control._toolbar = o._previewToolbar;
   control._hParent = f._hPanel;
   control.build(p);
   o._framePreviewContent.push(control);
}

//==========================================================
// <T>加载模板处理。</T>
//
// @method
// @param p:template:FTemplate3d 模板
//==========================================================
function FDsResourceFrameSet_onMeshLoad(p){
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
function FDsResourceFrameSet_onCatalogSelected(p, pc){
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
function FDsResourceFrameSet_construct(){
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

//==========================================================
// <T>选择内容。</T>
//
// @method
// @param typeCd:String 内容类型
//==========================================================
function FDsResourceFrameSet_switchContent(typeCd){
   var o = this;
   o._resourceTypeCd = typeCd;
   o._searchContent.serviceSearch(typeCd, '', 40, 0);
}

//==========================================================
// <T>加载处理。</T>
//
// @method
//==========================================================
function FDsResourceFrameSet_load(){
   var o = this;
   o.switchContent('mesh');
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsResourceFrameSet_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiFrameSet.dispose.call(o);
   // 设置属性
   o._propertyFrames.dispose();
   o._propertyFrames = null;
}
