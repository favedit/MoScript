MO.FManageLgCommonCatalogContent = function FManageLgCommonCatalogContent(o){
   o = MO.Class.inherits(this, o, MO.FManageCatalogContent);
   o._frameName = 'manage.logic.common.CatalogContent';
   return o;
}
MO.FManageLgCommonCatalogToolBar = function FManageLgCommonCatalogToolBar(o){
   o = MO.Class.inherits(this, o, MO.FManageCatalogToolBar);
   o._frameName = 'manage.logic.common.CatalogToolBar';
   o.construct  = MO.FManageLgCommonCatalogToolBar_construct;
   o.dispose    = MO.FManageLgCommonCatalogToolBar_dispose;
   return o;
}
MO.FManageLgCommonCatalogToolBar_construct = function FManageLgCommonCatalogToolBar_construct(){
   var o = this;
   o.__base.FManageCatalogToolBar.construct.call(o);
}
MO.FManageLgCommonCatalogToolBar_dispose = function FManageLgCommonCatalogToolBar_dispose(){
   var o = this;
   o.__base.FManageCatalogToolBar.dispose.call(o);
}
MO.FManageLgCommonFrameSet = function FManageLgCommonFrameSet(o){
   o = MO.Class.inherits(this, o, MO.FManageFrameSet);
   o._frameName = 'manage.logic.common.FrameSet';
   o.onBuilded  = MO.FManageLgCommonFrameSet_onBuilded;
   o.construct  = MO.FManageLgCommonFrameSet_construct;
   o.dispose    = MO.FManageLgCommonFrameSet_dispose;
   return o;
}
MO.FManageLgCommonFrameSet_onBuilded = function FManageLgCommonFrameSet_onBuilded(event){
   var o = this;
   o.__base.FManageFrameSet.onBuilded.call(o, event);
   o._frameCatalogTitle._hPanel.className = o.styleName('Title_Ground');
   o._frameCatalogToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
   o._frameSpaceTitle._hPanel.className = o.styleName('Title_Ground');
   o._frameSpaceToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._frameSpaceContent._hPanel.className = o.styleName('Space_Content');
   var spliter = o._catalogSplitter = o.searchControl('catalogSpliter');
   spliter.setAlignCd(MO.EUiAlign.Left);
   spliter.setSizeHtml(o._frameCatalog._hPanel);
   var control = o._catalogToolBar = MO.Class.create(MO.FManageLgCommonCatalogToolBar);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(event);
   o._frameCatalogToolBar.push(control);
   var control = o._catalogContent = MO.Class.create(MO.FManageLgCommonCatalogContent);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(event);
   o._frameCatalogContent.push(control);
   MO.Window.Html.textSet(o._frameCatalogTitle._hPanel, '共通业务');
}
MO.FManageLgCommonFrameSet_construct = function FManageLgCommonFrameSet_construct(){
   var o = this;
   o.__base.FManageFrameSet.construct.call(o);
}
MO.FManageLgCommonFrameSet_dispose = function FManageLgCommonFrameSet_dispose(){
   var o = this;
   o.__base.FManageFrameSet.dispose.call(o);
}
