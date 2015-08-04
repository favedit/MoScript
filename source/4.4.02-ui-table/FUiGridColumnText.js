//==========================================================
// <T>表格列。</T>
//
// @class
// @author maocy
// @version 150804
//==========================================================
MO.FUiGridColumnText = function FUiGridColumnText(o){
   o = MO.Class.inherits(this, o, MO.FUiGridColumn);
   //..........................................................
   // @attribute
   //..........................................................
   // @method
   o.dispose = MO.FUiGridColumnText_dispose;
   return o;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FUiGridColumnText_dispose = function FUiGridColumnText_dispose(){
   var o = this;
   // 释放属性
   // 父处理
   o.__base.FUiGridColumn.dispose.call(o);
}
