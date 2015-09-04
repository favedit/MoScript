MO.FManageLgPersonCatalogContent = function FManageLgPersonCatalogContent(o){
   o = MO.Class.inherits(this, o, MO.FManageCatalogContent);
   o._frameName = 'manage.logic.person.CatalogContent';
   return o;
}
MO.FManageLgPersonCatalogToolBar = function FManageLgPersonCatalogToolBar(o){
   o = MO.Class.inherits(this, o, MO.FManageCatalogToolBar);
   o._frameName = 'manage.logic.person.CatalogToolBar';
   return o;
}
MO.FManageLgPersonFrameSet = function FManageLgPersonFrameSet(o){
   o = MO.Class.inherits(this, o, MO.FManageFrameSet);
   o._frameName = 'manage.logic.person.FrameSet';
   o.onBuilded  = MO.FManageLgPersonFrameSet_onBuilded;
   return o;
}
MO.FManageLgPersonFrameSet_onBuilded = function FManageLgPersonFrameSet_onBuilded(event){
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
   var control = o._catalogToolBar = MO.Class.create(MO.FManageLgPersonCatalogToolBar);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(event);
   o._frameCatalogToolBar.push(control);
   var control = o._catalogContent = MO.Class.create(MO.FManageLgPersonCatalogContent);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(event);
   o._frameCatalogContent.push(control);
   MO.Window.Html.textSet(o._frameCatalogTitle._hPanel, '用户业务');
}
