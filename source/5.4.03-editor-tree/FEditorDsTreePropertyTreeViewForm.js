//==========================================================
// <T>设计目录属性页面。</T>
//
// @class
// @author maocy
// @history 150812
//==========================================================
MO.FEditorDsTreePropertyTreeViewForm = function FEditorDsTreePropertyTreeViewForm(o){
   o = MO.Class.inherits(this, o, MO.FEditorDsPropertyForm);
   //..........................................................
   // @attribute
   o._logicService = 'editor.design.tree';
   o._logicGroup   = 'container';
   return o;
}
