//==========================================================
// <T>设计页面工具栏属性页面。</T>
//
// @class
// @author maocy
// @history 150812
//==========================================================
MO.FEditorDsFramePropertyToolBarForm = function FEditorDsFramePropertyToolBarForm(o){
   o = MO.Class.inherits(this, o, MO.FEditorDsPropertyForm);
   //..........................................................
   // @attribute
   o._logicService = 'editor.design.frame';
   o._logicGroup   = 'item';
   return o;
}
