//==========================================================
// <T>单选组列控件。</T>
//
// @class FColumnEditControl
// @history 091112 MAOCY 创建
//==========================================================
function FColumnRadioGroup(o){
   o = RClass.inherits(this, o, FColumnEditControl);
   //..........................................................
   // @attribute
   o.__cellClass = FCellRadioGroup;
   return o;
}
