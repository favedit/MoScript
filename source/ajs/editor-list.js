MO.FEditorDsListCatalogContent = function FEditorDsListCatalogContent(o){
   o = MO.Class.inherits(this, o, MO.FEditorDsCatalogContent);
   o._defineCode = 'editor.design.list';
   return o;
}
MO.FEditorDsListCatalogToolBar = function FEditorDsListCatalogToolBar(o){
   o = MO.Class.inherits(this, o, MO.FDuiToolBar);
   o._frameName  = 'editor.design.list.CatalogToolBar';
   o.onListClick = MO.FEditorDsListCatalogToolBar_onListClick;
   o.onBuilded   = MO.FEditorDsListCatalogToolBar_onBuilded;
   o.construct   = MO.FEditorDsListCatalogToolBar_construct;
   o.dispose     = MO.FEditorDsListCatalogToolBar_dispose;
   return o;
}
MO.FEditorDsListCatalogToolBar_onListClick = function FEditorDsListCatalogToolBar_onListClick(event){
   this._frameSet.selectObject('editor.design.list.ListForm');
}
MO.FEditorDsListCatalogToolBar_onBuilded = function FEditorDsListCatalogToolBar_onBuilded(p){
   var o = this;
   o.__base.FDuiToolBar.onBuilded.call(o, p);
   o._controlList.addClickListener(o, o.onListClick);
}
MO.FEditorDsListCatalogToolBar_construct = function FEditorDsListCatalogToolBar_construct(){
   var o = this;
   o.__base.FDuiToolBar.construct.call(o);
}
MO.FEditorDsListCatalogToolBar_dispose = function FEditorDsListCatalogToolBar_dispose(){
   var o = this;
   o.__base.FDuiToolBar.dispose.call(o);
}
MO.FEditorDsListFrameSet = function FEditorDsListFrameSet(o){
   o = MO.Class.inherits(this, o, MO.FEditorDsFrameSet);
   o._frameName = 'editor.design.list.FrameSet';
   o.onBuilded  = MO.FEditorDsListFrameSet_onBuilded;
   o.construct  = MO.FEditorDsListFrameSet_construct;
   o.dispose    = MO.FEditorDsListFrameSet_dispose;
   return o;
}
MO.FEditorDsListFrameSet_onBuilded = function FEditorDsListFrameSet_onBuilded(event){
   var o = this;
   o.__base.FEditorDsFrameSet.onBuilded.call(o, event);
   o._frameCatalogTitle._hPanel.className = o.styleName('Title_Ground');
   o._frameCatalogToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
   o._framePropertyTitle._hPanel.className = o.styleName('Title_Ground');
   o._framePropertyToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._framePropertyContent._hPanel.className = o.styleName('Property_Content');
   var spliter = o._catalogSplitter = o.searchControl('catalogSpliter');
   spliter.setAlignCd(MO.EUiAlign.Left);
   spliter.setSizeHtml(o._frameCatalog._hPanel);
   var control = o._catalogToolbar = MO.Class.create(MO.FEditorDsListCatalogToolBar);
   control._frameSet = o;
   control.buildDefine(event);
   o._frameCatalogToolBar.push(control);
   var control = o._catalogContent = MO.Class.create(MO.FEditorDsListCatalogContent);
   control._frameSet = o;
   control.build(event);
   o._frameCatalogContent.push(control);
   MO.Window.Html.textSet(o._frameCatalogTitle._hPanel, '列表目录');
}
MO.FEditorDsListFrameSet_construct = function FEditorDsListFrameSet_construct(){
   var o = this;
   o.__base.FEditorDsFrameSet.construct.call(o);
}
MO.FEditorDsListFrameSet_dispose = function FEditorDsListFrameSet_dispose(){
   var o = this;
   o.__base.FEditorDsFrameSet.dispose.call(o);
}
MO.FEditorDsListMenuBar = function FEditorDsListMenuBar(o){
   o = MO.Class.inherits(this, o, MO.FEditorDsMenuBar);
   o._frameName = 'editor.design.list.MenuBar';
   o.onBuilded  = MO.FEditorDsListMenuBar_onBuilded;
   return o;
}
MO.FEditorDsListMenuBar_onBuilded = function FEditorDsListMenuBar_onBuilded(event){
   var o = this;
   o.__base.FEditorDsMenuBar.onBuilded.call(o, event);
   o._controlCreate.addClickListener(o, o.onCreateClick);
   o._controlUpdate.addClickListener(o, o.onUpdateClick);
   o._controlDelete.addClickListener(o, o.onDeleteClick);
}
MO.FEditorDsListPropertyToolBar = function FEditorDsListPropertyToolBar(o){
   o = MO.Class.inherits(this, o, MO.FDuiToolBar);
   o._frameName           = 'editor.design.frame.PropertyToolBar';
   o._controlInsertButton = null;
   o._controlUpdateButton = null;
   o._controlDeleteButton = null;
   o.onBuilded            = MO.FEditorDsListPropertyToolBar_onBuilded;
   o.onUpdateClick        = MO.FEditorDsListPropertyToolBar_onUpdateClick;
   o.construct            = MO.FEditorDsListPropertyToolBar_construct;
   o.dispose              = MO.FEditorDsListPropertyToolBar_dispose;
   return o;
}
MO.FEditorDsListPropertyToolBar_onBuilded = function FEditorDsListPropertyToolBar_onBuilded(p){
   var o = this;
   o.__base.FDuiToolBar.onBuilded.call(o, p);
}
MO.FEditorDsListPropertyToolBar_onUpdateClick = function FEditorDsListPropertyToolBar_onUpdateClick(event){
   var o = this;
   var guid = o._workspace._activeProjectGuid;
   window.location = 'Project.wa?do=detail&guid=' + guid;
}
MO.FEditorDsListPropertyToolBar_construct = function FEditorDsListPropertyToolBar_construct(){
   var o = this;
   o.__base.FDuiToolBar.construct.call(o);
}
MO.FEditorDsListPropertyToolBar_dispose = function FEditorDsListPropertyToolBar_dispose(){
   var o = this;
   o.__base.FDuiToolBar.dispose.call(o);
}
