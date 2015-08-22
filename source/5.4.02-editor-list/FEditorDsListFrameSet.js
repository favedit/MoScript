//==========================================================
// <T>资源框架。</T>
//
// @author maocy
// @history 150121
//==========================================================
MO.FEditorDsListFrameSet = function FEditorDsListFrameSet(o){
   o = MO.Class.inherits(this, o, MO.FEditorDsFrameSet);
   //..........................................................
   // @property
   o._frameName = 'editor.design.list.FrameSet';
   //..........................................................
   // @process
   o.onBuilded  = MO.FEditorDsListFrameSet_onBuilded;
   //..........................................................
   // @method
   o.construct  = MO.FEditorDsListFrameSet_construct;
   // @method
   o.dispose    = MO.FEditorDsListFrameSet_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
MO.FEditorDsListFrameSet_onBuilded = function FEditorDsListFrameSet_onBuilded(event){
   var o = this;
   o.__base.FEditorDsFrameSet.onBuilded.call(o, event);
   // 设置样式
   o._frameCatalogTitle._hPanel.className = o.styleName('Title_Ground');
   o._frameCatalogToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
   o._framePropertyTitle._hPanel.className = o.styleName('Title_Ground');
   o._framePropertyToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._framePropertyContent._hPanel.className = o.styleName('Property_Content');
   //..........................................................
   // 设置分割
   var spliter = o._catalogSplitter = o.searchControl('catalogSpliter');
   spliter.setAlignCd(MO.EUiAlign.Left);
   spliter.setSizeHtml(o._frameCatalog._hPanel);
   //..........................................................
   // 设置目录工具栏
   var control = o._catalogToolbar = MO.Class.create(MO.FEditorDsListCatalogToolBar);
   control._frameSet = o;
   control.buildDefine(event);
   o._frameCatalogToolBar.push(control);
   // 设置目录内容
   var control = o._catalogContent = MO.Class.create(MO.FEditorDsListCatalogContent);
   control._frameSet = o;
   control.build(event);
   o._frameCatalogContent.push(control);
   //..........................................................
   // 设置属性工具栏
   var control = o._propertyToolbar = MO.Class.create(MO.FEditorDsListPropertyToolBar);
   control._frameSet = o;
   control.buildDefine(event);
   o._framePropertyToolBar.push(control);
   //..........................................................
   // 设置标题
   MO.Window.Html.textSet(o._frameCatalogTitle._hPanel, '列表目录');
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEditorDsListFrameSet_construct = function FEditorDsListFrameSet_construct(){
   var o = this;
   // 父处理
   o.__base.FEditorDsFrameSet.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEditorDsListFrameSet_dispose = function FEditorDsListFrameSet_dispose(){
   var o = this;
   // 父处理
   o.__base.FEditorDsFrameSet.dispose.call(o);
}
