//==========================================================
// <T>资源目录工具栏。</T>
//
// @class
// @author maocy
// @history 150409
//==========================================================
MO.FManageCatalogToolBar = function FManageCatalogToolBar(o){
   o = MO.Class.inherits(this, o, MO.FDuiToolBar);
   //..........................................................
   // @attribute
   o._listFrameName = null;
   //..........................................................
   // @event
   o.onSearchClick  = MO.FManageCatalogToolBar_onSearchClick;
   o.onRefreshClick = MO.FManageCatalogToolBar_onRefreshClick;
   o.onListClick    = MO.FManageCatalogToolBar_onListClick;
   // @event
   o.onBuilded      = MO.FManageCatalogToolBar_onBuilded;
   //..........................................................
   // @method
   o.construct      = MO.FManageCatalogToolBar_construct;
   // @method
   o.dispose        = MO.FManageCatalogToolBar_dispose;
   return o;
}

//==========================================================
// <T>搜索按键点击处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FManageCatalogToolBar_onSearchClick = function FManageCatalogToolBar_onSearchClick(event){
}

//==========================================================
// <T>刷新按键点击处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FManageCatalogToolBar_onRefreshClick = function FManageCatalogToolBar_onRefreshClick(event){
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
MO.FManageCatalogToolBar_onListClick = function FManageCatalogToolBar_onListClick(event){
   var o = this;
   o._frameSet.selectObject(o._listFrameName);
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
MO.FManageCatalogToolBar_onBuilded = function FManageCatalogToolBar_onBuilded(p){
   var o = this;
   o.__base.FDuiToolBar.onBuilded.call(o, p);
   //..........................................................
   // 注册事件
   //o._controlSearch.addClickListener(o, o.onSearchClick);
   //o._controlRefresh.addClickListener(o, o.onRefreshClick);
   //o._controlList.addClickListener(o, o.onListClick);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FManageCatalogToolBar_construct = function FManageCatalogToolBar_construct(){
   var o = this;
   // 父处理
   o.__base.FDuiToolBar.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FManageCatalogToolBar_dispose = function FManageCatalogToolBar_dispose(){
   var o = this;
   // 父处理
   o.__base.FDuiToolBar.dispose.call(o);
}
