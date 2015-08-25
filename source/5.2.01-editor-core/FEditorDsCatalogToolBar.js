//==========================================================
// <T>资源目录工具栏。</T>
//
// @class
// @author maocy
// @history 150409
//==========================================================
MO.FEditorDsCatalogToolBar = function FEditorDsCatalogToolBar(o){
   o = MO.Class.inherits(this, o, MO.FDuiToolBar);
   //..........................................................
   // @attribute
   o._listFrameName = null;
   //..........................................................
   // @event
   o.onSearchClick  = MO.FEditorDsCatalogToolBar_onSearchClick;
   o.onRefreshClick = MO.FEditorDsCatalogToolBar_onRefreshClick;
   o.onListClick    = MO.FEditorDsCatalogToolBar_onListClick;
   // @event
   o.onBuilded      = MO.FEditorDsCatalogToolBar_onBuilded;
   //..........................................................
   // @method
   o.construct      = MO.FEditorDsCatalogToolBar_construct;
   // @method
   o.dispose        = MO.FEditorDsCatalogToolBar_dispose;
   return o;
}

//==========================================================
// <T>搜索按键点击处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEditorDsCatalogToolBar_onSearchClick = function FEditorDsCatalogToolBar_onSearchClick(event){
}

//==========================================================
// <T>刷新按键点击处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEditorDsCatalogToolBar_onRefreshClick = function FEditorDsCatalogToolBar_onRefreshClick(event){
   var o = this;
   var catalog = o._frameSet._catalogContent;
   catalog.reloadNode();
}

//==========================================================
// <T>列表按键点击处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEditorDsCatalogToolBar_onListClick = function FEditorDsCatalogToolBar_onListClick(event){
   var o = this;
   o._frameSet.selectObject(o._listFrameName);
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
MO.FEditorDsCatalogToolBar_onBuilded = function FEditorDsCatalogToolBar_onBuilded(p){
   var o = this;
   o.__base.FDuiToolBar.onBuilded.call(o, p);
   //..........................................................
   // 注册事件
   o._controlSearch.addClickListener(o, o.onSearchClick);
   o._controlRefresh.addClickListener(o, o.onRefreshClick);
   o._controlList.addClickListener(o, o.onListClick);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEditorDsCatalogToolBar_construct = function FEditorDsCatalogToolBar_construct(){
   var o = this;
   // 父处理
   o.__base.FDuiToolBar.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEditorDsCatalogToolBar_dispose = function FEditorDsCatalogToolBar_dispose(){
   var o = this;
   // 父处理
   o.__base.FDuiToolBar.dispose.call(o);
}
