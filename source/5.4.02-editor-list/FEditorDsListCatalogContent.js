//==========================================================
// <T>设计列表目录。</T>
//
// @class
// @author maocy
// @history 150812
//==========================================================
MO.FEditorDsListCatalogContent = function FEditorDsListCatalogContent(o){
   o = MO.Class.inherits(this, o, MO.FEditorDsCatalogContent);
   //..........................................................
   // @attributes
   o._defineCode = 'editor.design.list';
   //..........................................................
   // @method
   o.construct   = MO.FEditorDsListCatalogContent_construct;
   // @method
   o.dispose     = MO.FEditorDsListCatalogContent_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEditorDsListCatalogContent_construct = function FEditorDsListCatalogContent_construct(){
   var o = this;
   o.__base.FEditorDsCatalogContent.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEditorDsListCatalogContent_dispose = function FEditorDsListCatalogContent_dispose(){
   var o = this;
   // 父处理
   o.__base.FEditorDsCatalogContent.dispose.call(o);
}
