//==========================================================
// <T>共享资源目录工具栏。</T>
//
// @class
// @author maocy
// @history 150422
//==========================================================
function FDsShareResourceCatalogToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   //..........................................................
   // @property
   o._frameName                = 'resource.share.resource.CatalogToolBar';
   //..........................................................
   // @attribute
   o._controlFolderOpenButton  = null;
   o._controlFolderCloseButton = null;
   // @attribute
   o._activeNodeGuid           = null;
   //..........................................................
   // @event
   o.onBuilded                 = FDsShareResourceCatalogToolBar_onBuilded;
   // @event
   o.onFolderOpenClick         = FDsShareResourceCatalogToolBar_onFolderOpenClick;
   o.onFolderCloseClick        = FDsShareResourceCatalogToolBar_onFolderCloseClick;
   //..........................................................
   // @method
   o.construct                 = FDsShareResourceCatalogToolBar_construct;
   // @method
   o.dispose                   = FDsShareResourceCatalogToolBar_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsShareResourceCatalogToolBar_onBuilded(p){
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
function FDsShareResourceCatalogToolBar_onFolderOpenClick(event){
}

//==========================================================
// <T>文件夹关闭点击处理。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
function FDsShareResourceCatalogToolBar_onFolderCloseClick(event){
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsShareResourceCatalogToolBar_construct(){
   var o = this;
   // 父处理
   o.__base.FUiToolBar.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsShareResourceCatalogToolBar_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiToolBar.dispose.call(o);
}
