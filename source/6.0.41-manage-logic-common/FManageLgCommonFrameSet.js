//==========================================================
// <T>资源框架。</T>
//
// @author maocy
// @history 150121
//==========================================================
MO.FManageLgCommonFrameSet = function FManageLgCommonFrameSet(o){
   o = MO.Class.inherits(this, o, MO.FManageFrameSet);
   //..........................................................
   // @property
   o._frameName = 'manage.logic.common.FrameSet';
   //..........................................................
   // @process
   o.onBuilded  = MO.FManageLgCommonFrameSet_onBuilded;
   //..........................................................
   // @method
   o.construct  = MO.FManageLgCommonFrameSet_construct;
   // @method
   o.dispose    = MO.FManageLgCommonFrameSet_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
MO.FManageLgCommonFrameSet_onBuilded = function FManageLgCommonFrameSet_onBuilded(event){
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
   var control = o._catalogToolbar = MO.Class.create(MO.FManageLgCommonCatalogToolBar);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(event);
   o._frameCatalogToolBar.push(control);
   // 设置目录内容
   var control = o._catalogContent = MO.Class.create(MO.FManageLgCommonCatalogContent);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(event);
   o._frameCatalogContent.push(control);
   //..........................................................
   // 设置标题
   MO.Window.Html.textSet(o._frameCatalogTitle._hPanel, '共通业务');
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FManageLgCommonFrameSet_construct = function FManageLgCommonFrameSet_construct(){
   var o = this;
   // 父处理
   o.__base.FManageFrameSet.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FManageLgCommonFrameSet_dispose = function FManageLgCommonFrameSet_dispose(){
   var o = this;
   // 父处理
   o.__base.FManageFrameSet.dispose.call(o);
}
