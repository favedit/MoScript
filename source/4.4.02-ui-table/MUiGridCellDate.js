//==========================================================
// <T>表格单元格。</T>
//
// @class
// @author maocy
// @version 150804
//==========================================================
MO.MUiGridCellDate = function MUiGridCellDate(o){
   o = MO.Class.inherits(this, o, MO.MUiGridCell);
   //..........................................................
   // @method
   o.construct = MO.MUiGridCellDate_construct;
   o.dispose   = MO.MUiGridCellDate_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.MUiGridCellDate_construct = function MUiGridCellDate_construct(){
   var o = this;
   o.__base.MUiGridCell.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.MUiGridCellDate_dispose = function MUiGridCellDate_dispose(){
   var o = this;
   // 释放属性
   // 父处理
   o.__base.MUiGridCell.dispose.call(o);
}
