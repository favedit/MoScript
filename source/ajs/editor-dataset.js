MO.FEditorDsDatasetCatalogContent = function FEditorDsDatasetCatalogContent(o){
   o = MO.Class.inherits(this, o, MO.FEditorDsCatalogContent);
   o._defineCode = 'editor.design.dataset';
   return o;
}
MO.FEditorDsDatasetCatalogToolBar = function FEditorDsDatasetCatalogToolBar(o){
   o = MO.Class.inherits(this, o, MO.FDuiToolBar);
   o._frameName  = 'editor.design.dataset.CatalogToolBar';
   o.onListClick = MO.FEditorDsDatasetCatalogToolBar_onListClick;
   o.onBuilded   = MO.FEditorDsDatasetCatalogToolBar_onBuilded;
   o.construct   = MO.FEditorDsDatasetCatalogToolBar_construct;
   o.dispose     = MO.FEditorDsDatasetCatalogToolBar_dispose;
   return o;
}
MO.FEditorDsDatasetCatalogToolBar_onListClick = function FEditorDsDatasetCatalogToolBar_onListClick(event){
   this._frameSet.selectObject('editor.design.list.ListForm');
}
MO.FEditorDsDatasetCatalogToolBar_onBuilded = function FEditorDsDatasetCatalogToolBar_onBuilded(p){
   var o = this;
   o.__base.FDuiToolBar.onBuilded.call(o, p);
   o._controlList.addClickListener(o, o.onListClick);
}
MO.FEditorDsDatasetCatalogToolBar_construct = function FEditorDsDatasetCatalogToolBar_construct(){
   var o = this;
   o.__base.FDuiToolBar.construct.call(o);
}
MO.FEditorDsDatasetCatalogToolBar_dispose = function FEditorDsDatasetCatalogToolBar_dispose(){
   var o = this;
   o.__base.FDuiToolBar.dispose.call(o);
}
MO.FEditorDsDatasetFrameSet = function FEditorDsDatasetFrameSet(o){
   o = MO.Class.inherits(this, o, MO.FEditorDsFrameSet);
   o._frameName = 'editor.design.dataset.FrameSet';
   o.onBuilded  = MO.FEditorDsDatasetFrameSet_onBuilded;
   o.construct  = MO.FEditorDsDatasetFrameSet_construct;
   o.dispose    = MO.FEditorDsDatasetFrameSet_dispose;
   return o;
}
MO.FEditorDsDatasetFrameSet_onBuilded = function FEditorDsDatasetFrameSet_onBuilded(event){
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
   var control = o._catalogToolbar = MO.Class.create(MO.FEditorDsDatasetCatalogToolBar);
   control._frameSet = o;
   control.buildDefine(event);
   o._frameCatalogToolBar.push(control);
   var control = o._catalogContent = MO.Class.create(MO.FEditorDsDatasetCatalogContent);
   control._frameSet = o;
   control.build(event);
   o._frameCatalogContent.push(control);
   MO.Window.Html.textSet(o._frameCatalogTitle._hPanel, '数据集合');
}
MO.FEditorDsDatasetFrameSet_construct = function FEditorDsDatasetFrameSet_construct(){
   var o = this;
   o.__base.FEditorDsFrameSet.construct.call(o);
}
MO.FEditorDsDatasetFrameSet_dispose = function FEditorDsDatasetFrameSet_dispose(){
   var o = this;
   o.__base.FEditorDsFrameSet.dispose.call(o);
}
