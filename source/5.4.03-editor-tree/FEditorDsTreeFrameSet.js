//==========================================================
// <T>资源框架。</T>
//
// @author maocy
// @history 150121
//==========================================================
MO.FEditorDsTreeFrameSet = function FEditorDsTreeFrameSet(o){
   o = MO.Class.inherits(this, o, MO.FEditorDsFrameSet);
   //..........................................................
   // @property
   o._frameName = 'editor.design.tree.FrameSet';
   //..........................................................
   // @process
   o.onBuilded  = MO.FEditorDsTreeFrameSet_onBuilded;
   //..........................................................
   // @method
   o.construct  = MO.FEditorDsTreeFrameSet_construct;
   // @method
   o.dispose    = MO.FEditorDsTreeFrameSet_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
MO.FEditorDsTreeFrameSet_onBuilded = function FEditorDsTreeFrameSet_onBuilded(event){
   var o = this;
   o.__base.FEditorDsFrameSet.onBuilded.call(o, event);
   // 设置样式
   o._frameCatalogToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
   o._framePropertyToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._framePropertyContent._hPanel.className = o.styleName('Property_Content');
   //..........................................................
   // 设置分割
   var spliter = o._catalogSplitter = o.searchControl('catalogSpliter');
   spliter.setAlignCd(MO.EUiAlign.Left);
   spliter.setSizeHtml(o._frameCatalog._hPanel);
   //..........................................................
   // 设置目录工具栏
   var control = o._catalogToolbar = MO.Class.create(MO.FEditorDsTreeCatalogToolBar);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(event);
   o._frameCatalogToolBar.push(control);
   // 设置目录内容
   var control = o._catalogContent = MO.Class.create(MO.FEditorDsTreeCatalogContent);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.build(event);
   //control.addSelectedListener(o, o.selectObject);
   o._frameCatalogContent.push(control);
   //..........................................................
   // 设置属性工具栏
   var control = o._propertyToolbar = MO.Class.create(MO.FEditorDsTreePropertyToolBar);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(event);
   o._framePropertyToolBar.push(control);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEditorDsTreeFrameSet_construct = function FEditorDsTreeFrameSet_construct(){
   var o = this;
   // 父处理
   o.__base.FEditorDsFrameSet.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEditorDsTreeFrameSet_dispose = function FEditorDsTreeFrameSet_dispose(){
   var o = this;
   // 父处理
   o.__base.FEditorDsFrameSet.dispose.call(o);
}
