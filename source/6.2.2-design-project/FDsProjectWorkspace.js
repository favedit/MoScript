//==========================================================
// <T>模板工作区域。</T>
//
// @author maocy
// @history 150121
//==========================================================
function FDsProjectWorkspace(o){
   o = RClass.inherits(this, o, FUiWorkspace);
   //..........................................................
   // @property
   o._frameName            = 'design3d.project.Workspace';
   //..........................................................
   // @style
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
   //..........................................................
   // @attribute
   o._resourceTypeCd       = 'project';
   // @attribute
   o._frameToolBar         = null;
   o._frameStatusBar       = null;
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
   o._frameSets            = null;
   o._propertyFrames       = null;
   //..........................................................
   // @process
   o.onBuilded             = FDsProjectWorkspace_onBuilded;
   o.onMeshLoad            = FDsProjectWorkspace_onMeshLoad;
   o.onCatalogSelected     = FDsProjectWorkspace_onCatalogSelected;
   //..........................................................
   // @method
   o.construct             = FDsProjectWorkspace_construct;
   // @method
   o.selectFrameSet        = FDsProjectWorkspace_selectFrameSet;
   o.findPropertyFrame     = FDsProjectWorkspace_findPropertyFrame;
   // @method
   o.switchContent         = FDsProjectWorkspace_switchContent;
   o.load                  = FDsProjectWorkspace_load;
   // @method
   o.dispose               = FDsProjectWorkspace_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsProjectWorkspace_onBuilded(p){
   var o = this;
   o.__base.FUiWorkspace.onBuilded.call(o, p);
   //..........................................................
   // 设置工具区
   var frame = o._frameToolBar = o.searchControl('toolbarFrame');
   frame._hPanel.className = o.styleName('Toolbar_Ground');
   // 设置工作区
   o._frameBody = o.searchControl('bodyFrame');
   // 设置目录区
   //var f = o._frameCatalog = o.searchControl('catalogFrame');
   //f._hPanel.className = o.styleName('Catalog_Ground');
   //var f = o._frameCatalogToolbar = o.searchControl('catalogToolbarFrame');
   //f._hPanel.className = o.styleName('Catalog_Toolbar');
   //var f = o._frameCatalogContent = o.searchControl('catalogContentFrame');
   // 设置属性区
   //var f = o._frameSearch = o.searchControl('searchFrame');
   //f._hPanel.className = o.styleName('Search_Ground');
   //var f = o._frameSearchToolbar = o.searchControl('searchToolbarFrame');
   //f._hPanel.className = o.styleName('Search_Toolbar');
   //var f = o._frameSearchContent = o.searchControl('searchContentFrame');
   // 设置属性区
   //var f = o._frameProperty = o.searchControl('propertyFrame');
   //f._hPanel.className = o.styleName('Property_Ground');
   //var f = o._framePropertyToolbar = o.searchControl('propertyToolbarFrame');
   //f._hPanel.className = o.styleName('Property_Toolbar');
   //var f = o._framePropertyContent = o.searchControl('propertyContentFrame');
   //f._hPanel.className = o.styleName('Property_Content');
   // 设置状态区
   var frame = o._frameStatusBar = o.searchControl('statusFrame');
   frame._hPanel.className = o.styleName('Statusbar_Ground');
   //..........................................................
   // 设置分割
   //var f = o._catalogSplitter = o.searchControl('catalogSpliter');
   //f.setAlignCd(EUiAlign.Left);
   //f.setSizeHtml(o._frameCatalog._hPanel);
   //var f = o._propertySpliter = o.searchControl('propertySpliter');
   //f.setAlignCd(EUiAlign.Right);
   //f.setSizeHtml(o._frameProperty._hPanel);
   //..........................................................
   var hTable = RBuilder.createTable(p);
   hTable.width = '100%';
   var hRow = RBuilder.appendTableRow(hTable);
   // 设置工具栏
   var c = o._toolbar = RClass.create(FDsProjectMenuBar);
   c._workspace = o;
   c.buildDefine(p);
   var hCell = RBuilder.appendTableCell(hRow);
   hCell.appendChild(c._hPanel);
   // 设置分页栏
   var c = o._tabBar = RClass.create(FDsProjectTabBar);
   c._workspace = o;
   c.buildDefine(p);
   var hCell = RBuilder.appendTableCell(hRow);
   hCell.width = '150px';
   hCell.align = 'right';
   hCell.vAlign = 'bottom';
   hCell.appendChild(c._hPanel);
   //o._frameToolBar.push(c);
   o._frameToolBar._hPanel.appendChild(hTable);
   //..........................................................
   // 设置目录工具栏
   //var control = o._catalogToolbar = RClass.create(FDsProjectCatalogToolBar);
   //control._workspace = o;
   //control.buildDefine(p);
   //o._frameCatalogToolbar.push(control);
   // 设置目录栏
   //var control = o._catalogContent = RClass.create(FDsProjectCatalogContent);
   //control._workspace = o;
   //control.build(p);
   //control.addSelectedListener(o, o.onCatalogSelected);
   //o._frameCatalogContent.push(control);
   //..........................................................
   // 设置搜索栏
   //var control = o._searchToolbar = RClass.create(FDsProjectSearchToolBar);
   //control._workspace = o;
   //control.buildDefine(p);
   //o._frameSearchToolbar.push(control);
   // 设置搜索内容
   //var control = o._searchContent = RClass.create(FDsProjectSearchContent);
   //control._workspace = o;
   //control.build(p);
   //o._frameSearchContent.push(control);
   //..........................................................
   // 设置画板工具栏
   //var control = o._propertyToolbar = RClass.create(FDsProjectPropertyToolBar);
   //control._workspace = o;
   //control.buildDefine(p);
   //o._framePropertyToolbar.push(control);
   // 设置画板
   //var control = o._propertyContent = RClass.create(FDsProjectPropertyContent);
   //control._workspace = o;
   //control._toolbar = o._propertyToolbar;
   //control._hParent = f._hPanel;
   //control.build(p);
   //o._framePropertyContent.push(control);
   //..........................................................
   //o.switchContent(o._resourceTypeCd);
   // 加载工作区
   o.selectFrameSet(EDsFrameSet.ProjectFrameSet);
   //frameset.load();
}

//==========================================================
// <T>加载模板处理。</T>
//
// @method
// @param p:template:FTemplate3d 模板
//==========================================================
function FDsProjectWorkspace_onMeshLoad(p){
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
function FDsProjectWorkspace_onCatalogSelected(p, pc){
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
function FDsProjectWorkspace_construct(){
   var o = this;
   // 父处理
   o.__base.FUiWorkspace.construct.call(o);
   // 设置属性
   o._frameSets = new TDictionary();
   o._propertyFrames = new TDictionary();
}

//==========================================================
// <T>根据名称获得属性页面。</T>
//
// @method
// @return FUiFrame 页面
//==========================================================
function FDsProjectWorkspace_selectFrameSet(name){
   var o = this;
   var frameSet = o._frameSets.get(name);
   if(!frameSet){
      if(name == EDsFrameSet.ProjectFrameSet){
         frameSet = RClass.create(FDsProjectFrameSet);
         frameSet.buildDefine(o._hPanel);
      }else if(name == EDsFrameSet.PictureFrameSet){
         frameSet = RClass.create(FDsPictureFrameSet);
         frameSet.buildDefine(o._hPanel);
      }else if(name == EDsFrameSet.MeshFrameSet){
         frameSet = RClass.create(FDsMeshFrameSet);
         frameSet.buildDefine(o._hPanel);
      }
      frameSet._name = name;
      o._frameSets.set(name, frameSet);
   }
   var count = o._frameSets.count();
   for(var i = 0; i < count; i++){
      var frameSet = o._frameSets.valueAt(i);
      if(frameSet._name == name){
         o._frameBody.push(frameSet);
      }else{
         o._frameBody.remove(frameSet);
      }
   }
   return frameSet;
}

//==========================================================
// <T>根据名称获得属性页面。</T>
//
// @method
// @return FUiFrame 页面
//==========================================================
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

//==========================================================
// <T>选择内容。</T>
//
// @method
// @param typeCd:String 内容类型
//==========================================================
function FDsProjectWorkspace_switchContent(typeCd){
   var o = this;
   o._resourceTypeCd = typeCd;
   o._searchContent.serviceSearch(typeCd, '', 40, 0);
}

//==========================================================
// <T>加载处理。</T>
//
// @method
//==========================================================
function FDsProjectWorkspace_load(){
   var o = this;
   //o._meshCode = p;
   //o._canvas.load(p);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsProjectWorkspace_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiWorkspace.dispose.call(o);
   // 设置属性
   o._propertyFrames.dispose();
   o._propertyFrames = null;
}
