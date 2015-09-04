//==========================================================
// <T>资源框架。</T>
//
// @author maocy
// @history 150121
//==========================================================
MO.FManageLgLoggerFrameSet = function FManageLgLoggerFrameSet(o){
   o = MO.Class.inherits(this, o, MO.FManageFrameSet);
   //..........................................................
   // @property
   o._frameName = 'manage.logic.logger.FrameSet';
   //..........................................................
   // @process
   o.onBuilded  = MO.FManageLgLoggerFrameSet_onBuilded;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
MO.FManageLgLoggerFrameSet_onBuilded = function FManageLgLoggerFrameSet_onBuilded(event){
   var o = this;
   o.__base.FManageFrameSet.onBuilded.call(o, event);
   // 设置样式
   o._frameCatalogTitle._hPanel.className = o.styleName('Title_Ground');
   o._frameCatalogToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
   o._frameSpaceTitle._hPanel.className = o.styleName('Title_Ground');
   o._frameSpaceToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._frameSpaceContent._hPanel.className = o.styleName('Space_Content');
   //..........................................................
   // 设置分割
   var spliter = o._catalogSplitter = o.searchControl('catalogSpliter');
   spliter.setAlignCd(MO.EUiAlign.Left);
   spliter.setSizeHtml(o._frameCatalog._hPanel);
   //..........................................................
   // 设置目录工具栏
   var control = o._catalogToolBar = MO.Class.create(MO.FManageLgLoggerCatalogToolBar);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(event);
   o._frameCatalogToolBar.push(control);
   // 设置目录内容
   var control = o._catalogContent = MO.Class.create(MO.FManageLgLoggerCatalogContent);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(event);
   o._frameCatalogContent.push(control);
   //..........................................................
   // 设置标题
   MO.Window.Html.textSet(o._frameCatalogTitle._hPanel, '日志业务');
}
