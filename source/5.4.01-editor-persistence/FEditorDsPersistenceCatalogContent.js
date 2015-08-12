//==========================================================
// <T>设计持久化目录。</T>
//
// @class
// @author maocy
// @history 150812
//==========================================================
MO.FEditorDsPersistenceCatalogContent = function FEditorDsPersistenceCatalogContent(o){
   o = MO.Class.inherits(this, o, MO.FEditorDsCatalogContent);
   //..........................................................
   // @attributes
   o._defineCode = 'editor.design.persistence';
   return o;
}
