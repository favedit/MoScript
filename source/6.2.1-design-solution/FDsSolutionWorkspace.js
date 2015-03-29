//==========================================================
// <T>模板工作区域。</T>
//
// @author maocy
// @history 150121
//==========================================================
function FDsSolutionWorkspace(o){
   o = RClass.inherits(this, o, FUiWorkspace);
   //..........................................................
   // @property
   o._frameName            = 'design3d.solution.Workspace';
   //..........................................................
   // @style
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
   //..........................................................
   // @attribute
   o._resourceTypeCd       = 'private';
   o._activeProjectGuid    = null;
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
   o._propertyFrames       = null;
   //..........................................................
   // @process
   o.onBuilded             = FDsSolutionWorkspace_onBuilded;
   //..........................................................
   // @method
   o.construct             = FDsSolutionWorkspace_construct;
   // @method
   o.findPropertyFrame     = FDsSolutionWorkspace_findPropertyFrame;
   // @method
   o.selectObject          = FDsSolutionWorkspace_selectObject;
   o.switchContent         = FDsSolutionWorkspace_switchContent;
   o.load                  = FDsSolutionWorkspace_load;
   // @method
   o.dispose               = FDsSolutionWorkspace_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsSolutionWorkspace_onBuilded(p){
   var o = this;
   o.__base.FUiWorkspace.onBuilded.call(o, p);
   //..........................................................
   // 设置工具区
   var f = o._frameToolBar = o.searchControl('toolbarFrame');
   f._hPanel.className = o.styleName('Toolbar_Ground');
   // 设置目录区
   var f = o._frameCatalog = o.searchControl('catalogFrame');
   f._hPanel.className = o.styleName('Catalog_Ground');
   var f = o._frameCatalogToolbar = o.searchControl('catalogToolbarFrame');
   f._hPanel.className = o.styleName('Catalog_Toolbar');
   var f = o._frameCatalogContent = o.searchControl('catalogContentFrame');
   // 设置属性区
   var f = o._frameSearch = o.searchControl('searchFrame');
   f._hPanel.className = o.styleName('Search_Ground');
   var f = o._frameSearchToolbar = o.searchControl('searchToolbarFrame');
   f._hPanel.className = o.styleName('Search_Toolbar');
   var f = o._frameSearchContent = o.searchControl('searchContentFrame');
   // 设置属性区
   var f = o._framePreview = o.searchControl('previewFrame');
   f._hPanel.className = o.styleName('Preview_Ground');
   var f = o._framePreviewToolbar = o.searchControl('previewToolbarFrame');
   f._hPanel.className = o.styleName('Preview_Toolbar');
   var f = o._framePreviewProperty = o.searchControl('previewPropertyFrame');
   // 设置状态区
   var f = o._frameStatusBar = o.searchControl('statusFrame');
   f._hPanel.className = o.styleName('Statusbar_Ground');
   //..........................................................
   // 设置分割
   var f = o._catalogSplitter = o.searchControl('catalogSpliter');
   f.setAlignCd(EUiAlign.Left);
   f.setSizeHtml(o._frameCatalog._hPanel);
   var f = o._previewSpliter = o.searchControl('previewSpliter');
   f.setAlignCd(EUiAlign.Right);
   f.setSizeHtml(o._framePreview._hPanel);
   //..........................................................
   var hTable = RBuilder.createTable(p);
   hTable.width = '100%';
   var hRow = RBuilder.appendTableRow(hTable);
   // 设置工具栏
   var c = o._toolbar = RClass.create(FDsSolutionMenuBar);
   c._workspace = o;
   c.buildDefine(p);
   var hCell = RBuilder.appendTableCell(hRow);
   hCell.appendChild(c._hPanel);
   // 设置分页栏
   var c = o._tabBar = RClass.create(FDsSolutionTabBar);
   c._workspace = o;
   c.buildDefine(p);
   var hCell = RBuilder.appendTableCell(hRow);
   hCell.width = '170px';
   hCell.align = 'right';
   hCell.vAlign = 'bottom';
   hCell.appendChild(c._hPanel);
   //o._frameToolBar.push(c);
   o._frameToolBar._hPanel.appendChild(hTable);
   //..........................................................
   // 设置目录工具栏
   var control = o._catalogToolbar = RClass.create(FDsSolutionCatalogToolBar);
   control._workspace = o;
   control.buildDefine(p);
   o._frameCatalogToolbar.push(control);
   // 设置目录栏
   var control = o._catalogContent = RClass.create(FDsSolutionCatalogContent);
   control._workspace = o;
   control.build(p);
   //control.addSelectedListener(o, o.selectObject);
   o._frameCatalogContent.push(control);
   //..........................................................
   // 设置搜索栏
   var control = o._searchToolbar = RClass.create(FDsSolutionSearchToolBar);
   control._workspace = o;
   control.buildDefine(p);
   o._frameSearchToolbar.push(control);
   // 设置搜索内容
   var control = o._searchContent = RClass.create(FDsSolutionSearchContent);
   control._workspace = o;
   control.build(p);
   o._frameSearchContent.push(control);
   //..........................................................
   // 设置画板工具栏
   var control = o._previewToolbar = RClass.create(FDsSolutionPreviewToolBar);
   control._workspace = o;
   control.buildDefine(p);
   o._framePreviewToolbar.push(control);
   // 设置画板
   //var control = o._previewProperty = RClass.create(FDsSolutionProjectProperty);
   //control._workspace = o;
   //control._toolbar = o._previewToolbar;
   //control.buildDefine(p);
   //o._framePreviewProperty.push(control);
   //..........................................................
   o.switchContent(o._resourceTypeCd);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsSolutionWorkspace_construct(){
   var o = this;
   // 父处理
   o.__base.FUiWorkspace.construct.call(o);
   // 设置属性
   o._propertyFrames = new TDictionary();
}

//==========================================================
// <T>根据名称获得属性页面。</T>
//
// @method
// @return FUiFrame 页面
//==========================================================
function FDsSolutionWorkspace_findPropertyFrame(p){
   var o = this;
   var f = o._propertyFrames.get(p);
   if(!f){
      var fc = RConsole.find(FFrameConsole);
      f = fc.get(o, p, o._framePreviewProperty._hContainer);
      f._workspace = o;
      o._propertyFrames.set(p, f);
   }
   return f;
}

//==========================================================
// <T>目录对象选择处理。</T>
//
// @method
// @param p:value:Object 对象
//==========================================================
function FDsSolutionWorkspace_selectObject(control){
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
   if(RClass.isClass(control, FDsSolutionSearchItem)){
      var f = o.findPropertyFrame(EDsFrame.SolutionProjectPropertyFrame);
      f.show();
      f.loadObject(control);
      o._activeProjectGuid = control._guid;
   }else{
      throw new TError('Unknown select object type. (value={1})', p);
   }
}


//==========================================================
// <T>选择内容。</T>
//
// @method
// @param typeCd:String 内容类型
//==========================================================
function FDsSolutionWorkspace_switchContent(typeCd){
   var o = this;
   o._resourceTypeCd = typeCd;
   o._searchContent.serviceSearch(typeCd, '', 40, 0);
}

//==========================================================
// <T>加载处理。</T>
//
// @method
//==========================================================
function FDsSolutionWorkspace_load(){
   var o = this;
   //o._meshCode = p;
   //o._canvas.load(p);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsSolutionWorkspace_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiWorkspace.dispose.call(o);
   // 设置属性
   o._propertyFrames.dispose();
   o._propertyFrames = null;
}
