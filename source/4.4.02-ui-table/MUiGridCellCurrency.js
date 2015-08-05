//==========================================================
// <T>表格货币单元格。</T>
//
// @class
// @author maocy
// @version 150805
//==========================================================
MO.MUiGridCellCurrency = function MUiGridCellCurrency(o){
   o = MO.Class.inherits(this, o, MO.MUiGridCell);
   //..........................................................
   // @method
   o.construct = MO.MUiGridCellCurrency_construct;
   o.dispose   = MO.MUiGridCellCurrency_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.MUiGridCellCurrency_construct = function MUiGridCellCurrency_construct(){
   var o = this;
   o.__base.MUiGridCell.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.MUiGridCellCurrency_dispose = function MUiGridCellCurrency_dispose(){
   var o = this;
   // 释放属性
   // 父处理
   o.__base.MUiGridCell.dispose.call(o);
}
