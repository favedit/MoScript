//==========================================================
// <T>设计列表项目属性页面。</T>
//
// @class
// @author maocy
// @history 150812
//==========================================================
MO.FEditorDsListItemProperty = function FEditorDsListItemProperty(o){
   o = MO.Class.inherits(this, o, MO.FEditorDsPropertyForm);
   //..........................................................
   // @attribute
   o._logicService = 'editor.design.list';
   o._logicGroup   = 'item';
   return o;
}
