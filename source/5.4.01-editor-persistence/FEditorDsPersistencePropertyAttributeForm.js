//==========================================================
// <T>设计列表列表属性页面。</T>
//
// @class
// @author maocy
// @history 150812
//==========================================================
MO.FEditorDsPersistencePropertyAttributeForm = function FEditorDsPersistencePropertyAttributeForm(o){
   o = MO.Class.inherits(this, o, MO.FEditorDsPropertyForm);
   //..........................................................
   // @attribute
   o._logicService = 'editor.design.persistence';
   o._logicGroup   = 'item';
   return o;
}
