//==========================================================
// <T>资源目录工具栏。</T>
//
// @class
// @author maocy
// @history 150409
//==========================================================
MO.FEditorDsTreeCatalogToolBar = function FEditorDsTreeCatalogToolBar(o){
   o = MO.Class.inherits(this, o, MO.FDuiToolBar);
   //..........................................................
   // @property
   o._frameName  = 'editor.design.tree.CatalogToolBar';
   //..........................................................
   // @event
   o.onListClick = MO.FEditorDsTreeCatalogToolBar_onListClick;
   // @event
   o.onBuilded   = MO.FEditorDsTreeCatalogToolBar_onBuilded;
   //..........................................................
   // @method
   o.construct   = MO.FEditorDsTreeCatalogToolBar_construct;
   // @method
   o.dispose     = MO.FEditorDsTreeCatalogToolBar_dispose;
   return o;
}

//==========================================================
// <T>列表按键点击处理。</T>
//
// @method
// @param event:TEventProcess 事件信息
//==========================================================
MO.FEditorDsTreeCatalogToolBar_onListClick = function FEditorDsTreeCatalogToolBar_onListClick(event){
   this._frameSet.selectObject('editor.design.tree.ListForm');
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
MO.FEditorDsTreeCatalogToolBar_onBuilded = function FEditorDsTreeCatalogToolBar_onBuilded(p){
   var o = this;
   o.__base.FDuiToolBar.onBuilded.call(o, p);
   //..........................................................
   // 注册事件
   o._controlList.addClickListener(o, o.onListClick);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEditorDsTreeCatalogToolBar_construct = function FEditorDsTreeCatalogToolBar_construct(){
   var o = this;
   // 父处理
   o.__base.FDuiToolBar.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEditorDsTreeCatalogToolBar_dispose = function FEditorDsTreeCatalogToolBar_dispose(){
   var o = this;
   // 父处理
   o.__base.FDuiToolBar.dispose.call(o);
}
