//==========================================================
// <T>设计目录节点类型属性页面。</T>
//
// @class
// @author maocy
// @history 150812
//==========================================================
MO.FEditorDsTreePropertyTreeNodeTypeForm = function FEditorDsTreePropertyTreeNodeTypeForm(o){
   o = MO.Class.inherits(this, o, MO.FEditorDsPropertyForm);
   //..........................................................
   // @attribute
   o._logicService = 'editor.design.tree';
   o._logicGroup   = 'item';
   return o;
}
