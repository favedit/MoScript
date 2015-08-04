//==========================================================
// <T>表格列。</T>
//
// @class
// @author maocy
// @version 150804
//==========================================================
MO.FGuiGridColumnText = function FGuiGridColumnText(o){
   o = MO.Class.inherits(this, o, MO.FUiGridColumn);
   //..........................................................
   // @attribute
   o._cellClass = MO.FGuiGridCellText;
   //..........................................................
   // @method
   o.dispose    = MO.FGuiGridColumnText_dispose;
   return o;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiGridColumnText_dispose = function FGuiGridColumnText_dispose(){
   var o = this;
   // 释放属性
   // 父处理
   o.__base.FUiGridColumn.dispose.call(o);
}
