//==========================================================
// <T>资源目录工具栏。</T>
//
// @class
// @author maocy
// @history 150409
//==========================================================
MO.FEditorDsListCatalogToolBar = function FEditorDsListCatalogToolBar(o){
   o = MO.Class.inherits(this, o, MO.FDuiToolBar);
   //..........................................................
   // @property
   o._frameName  = 'editor.design.list.CatalogToolBar';
   //..........................................................
   // @event
   o.onListClick = MO.FEditorDsListCatalogToolBar_onListClick;
   // @event
   o.onBuilded   = MO.FEditorDsListCatalogToolBar_onBuilded;
   //..........................................................
   // @method
   o.construct   = MO.FEditorDsListCatalogToolBar_construct;
   // @method
   o.dispose     = MO.FEditorDsListCatalogToolBar_dispose;
   return o;
}

//==========================================================
// <T>列表按键点击处理。</T>
//
// @method
// @param event:TEventProcess 事件信息
//==========================================================
MO.FEditorDsListCatalogToolBar_onListClick = function FEditorDsListCatalogToolBar_onListClick(event){
   this._frameSet.selectObject('editor.design.list.ListForm');
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
MO.FEditorDsListCatalogToolBar_onBuilded = function FEditorDsListCatalogToolBar_onBuilded(p){
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
MO.FEditorDsListCatalogToolBar_construct = function FEditorDsListCatalogToolBar_construct(){
   var o = this;
   // 父处理
   o.__base.FDuiToolBar.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEditorDsListCatalogToolBar_dispose = function FEditorDsListCatalogToolBar_dispose(){
   var o = this;
   // 父处理
   o.__base.FDuiToolBar.dispose.call(o);
}
