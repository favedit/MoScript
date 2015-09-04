//==========================================================
// <T>表格文本列。</T>
//
// @class
// @author maocy
// @version 150904
//==========================================================
MO.FDuiColumnText = function FDuiColumnText(o){
   o = MO.Class.inherits(this, o, MO.FDuiColumn);
   //..........................................................
   // @attribute
   o._cellClass = MO.FDuiCellText;
   return o;
}
