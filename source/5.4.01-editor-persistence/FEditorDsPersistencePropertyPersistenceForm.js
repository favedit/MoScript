//==========================================================
// <T>设计持久化属性页面。</T>
//
// @class
// @author maocy
// @history 150812
//==========================================================
MO.FEditorDsPersistencePropertyPersistenceForm = function FEditorDsPersistencePropertyPersistenceForm(o){
   o = MO.Class.inherits(this, o, MO.FEditorDsPropertyForm);
   //..........................................................
   // @attribute
   o._logicService = 'editor.design.persistence';
   o._logicGroup   = 'container';
   return o;
}
