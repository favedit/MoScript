//==========================================================
// <T>设计资源选取目录工具栏。</T>
//
// @class
// @author maocy
// @history 150506
//==========================================================
function FDsResourceSelectCatalogToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   //..........................................................
   // @property
   o._frameName          = 'resource.resource.SelectCatalogToolBar';
   //..........................................................
   // @attribute
   o._controlFolderOpen  = null;
   o._controlFolderClose = null;
   // @attribute
   o._activeNodeGuid     = null;
   //..........................................................
   // @event
   o.onBuilded           = FDsResourceSelectCatalogToolBar_onBuilded;
   // @event
   o.onFolderOpenClick   = FDsResourceSelectCatalogToolBar_onFolderOpenClick;
   o.onFolderCloseClick  = FDsResourceSelectCatalogToolBar_onFolderCloseClick;
   //..........................................................
   // @method
   o.construct           = FDsResourceSelectCatalogToolBar_construct;
   // @method
   o.dispose             = FDsResourceSelectCatalogToolBar_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsResourceSelectCatalogToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
   //..........................................................
   // 注册事件
   o._controlFolderOpen.addClickListener(o, o.onFolderOpenClick);
   o._controlFolderClose.addClickListener(o, o.onFolderCloseClick);
}

//==========================================================
// <T>文件夹打开点击处理。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
function FDsResourceSelectCatalogToolBar_onFolderOpenClick(event){
}

//==========================================================
// <T>文件夹关闭点击处理。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
function FDsResourceSelectCatalogToolBar_onFolderCloseClick(event){
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsResourceSelectCatalogToolBar_construct(){
   var o = this;
   // 父处理
   o.__base.FUiToolBar.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsResourceSelectCatalogToolBar_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiToolBar.dispose.call(o);
}
