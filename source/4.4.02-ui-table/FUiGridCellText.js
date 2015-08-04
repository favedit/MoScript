//==========================================================
// <T>表格单元格。</T>
//
// @class
// @author maocy
// @version 150804
//==========================================================
MO.FUiGridCellText = function FUiGridCellText(o){
   o = MO.Class.inherits(this, o, MO.FUiGridCell);
   //..........................................................
   // @method
   o.dispose    = MO.FUiGridCellText_dispose;
   return o;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FUiGridCellText_dispose = function FUiGridCellText_dispose(){
   var o = this;
   // 释放属性
   // 父处理
   o.__base.FUiGridCell.dispose.call(o);
}
