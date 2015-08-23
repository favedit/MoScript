//==========================================================
// <T>资源目录工具栏。</T>
//
// @class
// @author maocy
// @history 150409
//==========================================================
MO.FEditorDsFrameCatalogToolBar = function FEditorDsFrameCatalogToolBar(o){
   o = MO.Class.inherits(this, o, MO.FDuiToolBar);
   //..........................................................
   // @property
   o._frameName  = 'editor.design.frame.CatalogToolBar';
   //..........................................................
   // @event
   o.onListClick = MO.FEditorDsListCatalogToolBar_onListClick;
   // @event
   o.onBuilded   = MO.FEditorDsFrameCatalogToolBar_onBuilded;
   //..........................................................
   // @method
   o.construct   = MO.FEditorDsFrameCatalogToolBar_construct;
   // @method
   o.dispose     = MO.FEditorDsFrameCatalogToolBar_dispose;
   return o;
}

//==========================================================
// <T>列表按键点击处理。</T>
//
// @method
// @param event:TEventProcess 事件信息
//==========================================================
MO.FEditorDsListCatalogToolBar_onListClick = function FEditorDsListCatalogToolBar_onListClick(event){
   this._frameSet.selectObject('editor.design.frame.ListForm');
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
MO.FEditorDsFrameCatalogToolBar_onBuilded = function FEditorDsFrameCatalogToolBar_onBuilded(p){
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
MO.FEditorDsFrameCatalogToolBar_construct = function FEditorDsFrameCatalogToolBar_construct(){
   var o = this;
   // 父处理
   o.__base.FDuiToolBar.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEditorDsFrameCatalogToolBar_dispose = function FEditorDsFrameCatalogToolBar_dispose(){
   var o = this;
   // 父处理
   o.__base.FDuiToolBar.dispose.call(o);
}
