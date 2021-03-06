//==========================================================
// <T>资源框架。</T>
//
// @author maocy
// @history 150121
//==========================================================
function FDsShareResourceFrameSet(o){
   o = RClass.inherits(this, o, FUiFrameSet);
   //..........................................................
   // @property
   o._frameName            = 'resource.share.resource.FrameSet';
   //..........................................................
   // @style
   o._styleToolbarGround   = RClass.register(o, new AStyle('_styleToolbarGround', 'Toolbar_Ground'));
   o._styleCatalogContent  = RClass.register(o, new AStyle('_styleCatalogContent', 'Catalog_Content'));
   o._styleListContent     = RClass.register(o, new AStyle('_styleListContent', 'List_Content'));
   o._stylePropertyContent = RClass.register(o, new AStyle('_stylePropertyContent', 'Property_Content'));
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
   o.onBuilded             = FDsShareResourceFrameSet_onBuilded;
   o.onCatalogSelected     = FDsShareResourceFrameSet_onCatalogSelected;
   //..........................................................
   // @method
   o.construct             = FDsShareResourceFrameSet_construct;
   // @method
   o.findPropertyFrame     = FDsShareResourceFrameSet_findPropertyFrame;
   // @method
   o.switchContent         = FDsShareResourceFrameSet_switchContent;
   o.load                  = FDsShareResourceFrameSet_load;
   // @method
   o.dispose               = FDsShareResourceFrameSet_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
function FDsShareResourceFrameSet_onBuilded(event){
   var o = this;
   o.__base.FUiFrameSet.onBuilded.call(o, event);
   // 设置样式
   o._frameCatalogToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
   o._frameListToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._frameListContent._hPanel.className = o.styleName('List_Content');
   //o._framePropertyToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   //o._framePropertyContent._hPanel.className = o.styleName('Property_Content');
   //..........................................................
   // 设置分割
   var f = o._catalogSplitter = o.searchControl('catalogSpliter');
   f.setAlignCd(EUiAlign.Left);
   f.setSizeHtml(o._frameCatalog._hPanel);
   //var f = o._propertySpliter = o.searchControl('propertySpliter');
   //f.setAlignCd(EUiAlign.Right);
   //f.setSizeHtml(o._framePreview._hPanel);
   //..........................................................
   // 设置目录工具栏
   var control = o._catalogToolbar = RClass.create(FDsShareResourceCatalogToolBar);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(event);
   o._frameCatalogToolBar.push(control);
   // 设置目录栏
   var control = o._catalogContent = RClass.create(FDsShareResourceCatalogContent);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.build(event);
   //control.addSelectedListener(o, o.onCatalogSelected);
   o._frameCatalogContent.push(control);
   //..........................................................
   // 设置搜索栏
   var control = o._listToolBar = RClass.create(FDsShareResourceListToolBar);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(event);
   o._frameListToolBar.push(control);
   // 设置搜索内容
   var control = o._listContent = RClass.create(FDsShareResourceListContent);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.build(event);
   o._frameListContent.push(control);
   //..........................................................
   // 设置画板工具栏
   //var control = o._propertyToolbar = RClass.create(FDsShareResourcePropertyToolBar);
   //control._workspace = o._workspace;
   //control._frameSet = o;
   //control.buildDefine(p);
   //o._framePreviewToolbar.push(control);
   // 设置画板
   //var control = o._propertyContent = RClass.create(FDsShareResourcePropertyContent);
   //control._workspace = o._workspace;
   //control._frameSet = o;
   //control._toolbar = o._propertyToolbar;
   //control._hParent = f._hPanel;
   //control.build(p);
   //o._framePreviewContent.push(control);
}

//==========================================================
// <T>目录对象选择处理。</T>
//
// @method
// @param p:value:Object 对象
//==========================================================
function FDsShareResourceFrameSet_onCatalogSelected(p, pc){
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
function FDsShareResourceFrameSet_construct(){
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
function FDsShareResourceFrameSet_findPropertyFrame(p){
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
function FDsShareResourceFrameSet_switchContent(typeCd){
   var o = this;
   o._resourceTypeCd = typeCd;
   o._listContent.serviceSearch(typeCd, '', '', 40, 0);
}

//==========================================================
// <T>加载处理。</T>
//
// @method
//==========================================================
function FDsShareResourceFrameSet_load(){
   var o = this;
   o._listToolBar.storageLoad();
   //var typeCd = o._listToolBar.storageGet('resource_type_cd', 'All')
   //o.switchContent(typeCd);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsShareResourceFrameSet_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiFrameSet.dispose.call(o);
   // 设置属性
   o._propertyFrames.dispose();
   o._propertyFrames = null;
}
