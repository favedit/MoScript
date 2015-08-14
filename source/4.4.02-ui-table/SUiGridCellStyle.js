//==========================================================
// <T>界面格子样式。</T>
//
// @struct
//==========================================================
MO.SUiGridCellStyle = function SUiGridCellStyle(){
   var o = this;
   //..........................................................
   // @attribute
   o.alignCd = null;
   o.font    = null;
   //..........................................................
   // @method
   o.dispose = MO.SUiGridCellStyle_dispose;
   return o;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.SUiGridCellStyle_dispose = function SUiGridCellStyle_dispose(){
   var o = this;
   // 释放属性
   o.alignCd = null;
   o.font = null;
}
