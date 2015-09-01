//==========================================================
// <T>资源目录工具栏。</T>
//
// @class
// @author maocy
// @history 150409
//==========================================================
MO.FEditorDsDatasetCatalogToolBar = function FEditorDsDatasetCatalogToolBar(o){
   o = MO.Class.inherits(this, o, MO.FDuiToolBar);
   //..........................................................
   // @property
   o._frameName  = 'editor.design.dataset.CatalogToolBar';
   //..........................................................
   // @event
   o.onListClick = MO.FEditorDsDatasetCatalogToolBar_onListClick;
   // @event
   o.onBuilded   = MO.FEditorDsDatasetCatalogToolBar_onBuilded;
   //..........................................................
   // @method
   o.construct   = MO.FEditorDsDatasetCatalogToolBar_construct;
   // @method
   o.dispose     = MO.FEditorDsDatasetCatalogToolBar_dispose;
   return o;
}

//==========================================================
// <T>列表按键点击处理。</T>
//
// @method
// @param event:TEventProcess 事件信息
//==========================================================
MO.FEditorDsDatasetCatalogToolBar_onListClick = function FEditorDsDatasetCatalogToolBar_onListClick(event){
   this._frameSet.selectObject('editor.design.list.ListForm');
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
MO.FEditorDsDatasetCatalogToolBar_onBuilded = function FEditorDsDatasetCatalogToolBar_onBuilded(p){
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
MO.FEditorDsDatasetCatalogToolBar_construct = function FEditorDsDatasetCatalogToolBar_construct(){
   var o = this;
   // 父处理
   o.__base.FDuiToolBar.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEditorDsDatasetCatalogToolBar_dispose = function FEditorDsDatasetCatalogToolBar_dispose(){
   var o = this;
   // 父处理
   o.__base.FDuiToolBar.dispose.call(o);
}
