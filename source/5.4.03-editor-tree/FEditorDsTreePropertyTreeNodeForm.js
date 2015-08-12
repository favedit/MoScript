//==========================================================
// <T>设计目录节点属性页面。</T>
//
// @class
// @author maocy
// @history 150812
//==========================================================
MO.FEditorDsTreePropertyTreeNodeForm = function FEditorDsTreePropertyTreeNodeForm(o){
   o = MO.Class.inherits(this, o, MO.FEditorDsPropertyForm);
   //..........................................................
   // @attribute
   o._logicService = 'editor.design.tree';
   o._logicGroup   = 'item';
   return o;
}
