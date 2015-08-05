//==========================================================
// <T>表格单元格。</T>
//
// @class
// @author maocy
// @version 150804
//==========================================================
MO.MUiGridCellText = function MUiGridCellText(o){
   o = MO.Class.inherits(this, o, MO.MUiGridCell);
   //..........................................................
   // @method
   o.construct = MO.MUiGridCellText_construct;
   o.dispose   = MO.MUiGridCellText_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.MUiGridCellText_construct = function MUiGridCellText_construct(){
   var o = this;
   o.__base.MUiGridCell.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.MUiGridCellText_dispose = function MUiGridCellText_dispose(){
   var o = this;
   // 释放属性
   // 父处理
   o.__base.MUiGridCell.dispose.call(o);
}