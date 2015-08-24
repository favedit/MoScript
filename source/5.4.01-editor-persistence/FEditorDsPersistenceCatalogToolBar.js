//==========================================================
// <T>资源目录工具栏。</T>
//
// @class
// @author maocy
// @history 150409
//==========================================================
MO.FEditorDsPersistenceCatalogToolBar = function FEditorDsPersistenceCatalogToolBar(o){
   o = MO.Class.inherits(this, o, MO.FEditorDsCatalogToolBar);
   //..........................................................
   // @property
   o._frameName     = 'editor.design.persistence.CatalogToolBar';
   o._listFrameName = 'editor.design.persistence.ListForm';
   //..........................................................
   // @method
   o.construct      = MO.FEditorDsPersistenceCatalogToolBar_construct;
   // @method
   o.dispose        = MO.FEditorDsPersistenceCatalogToolBar_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEditorDsPersistenceCatalogToolBar_construct = function FEditorDsPersistenceCatalogToolBar_construct(){
   var o = this;
   // 父处理
   o.__base.FEditorDsCatalogToolBar.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEditorDsPersistenceCatalogToolBar_dispose = function FEditorDsPersistenceCatalogToolBar_dispose(){
   var o = this;
   // 父处理
   o.__base.FEditorDsCatalogToolBar.dispose.call(o);
}
