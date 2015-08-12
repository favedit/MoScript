//==========================================================
// <T>设计页面目录。</T>
//
// @class
// @author maocy
// @history 150812
//==========================================================
MO.FEditorDsFrameCatalogContent = function FEditorDsFrameCatalogContent(o){
   o = MO.Class.inherits(this, o, MO.FEditorDsCatalogContent);
   //..........................................................
   // @attributes
   o._defineCode = 'editor.design.frame';
   //..........................................................
   // @method
   o.construct   = MO.FEditorDsFrameCatalogContent_construct;
   // @method
   o.dispose     = MO.FEditorDsFrameCatalogContent_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEditorDsFrameCatalogContent_construct = function FEditorDsFrameCatalogContent_construct(){
   var o = this;
   o.__base.FEditorDsCatalogContent.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEditorDsFrameCatalogContent_dispose = function FEditorDsFrameCatalogContent_dispose(){
   var o = this;
   o.__base.FEditorDsCatalogContent.dispose.call(o);
}
