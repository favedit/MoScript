//==========================================================
// <T>资源目录工具栏。</T>
//
// @class
// @author maocy
// @history 150409
//==========================================================
MO.FManageLgCommonCatalogToolBar = function FManageLgCommonCatalogToolBar(o){
   o = MO.Class.inherits(this, o, MO.FManageCatalogToolBar);
   //..........................................................
   // @property
   o._frameName = 'manage.logic.common.CatalogToolBar';
   //..........................................................
   // @method
   o.construct  = MO.FManageLgCommonCatalogToolBar_construct;
   // @method
   o.dispose    = MO.FManageLgCommonCatalogToolBar_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FManageLgCommonCatalogToolBar_construct = function FManageLgCommonCatalogToolBar_construct(){
   var o = this;
   // 父处理
   o.__base.FManageCatalogToolBar.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FManageLgCommonCatalogToolBar_dispose = function FManageLgCommonCatalogToolBar_dispose(){
   var o = this;
   // 父处理
   o.__base.FManageCatalogToolBar.dispose.call(o);
}
