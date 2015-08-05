//==========================================================
// <T>界面表格文本列。</T>
//
// @class
// @author maocy
// @version 150805
//==========================================================
MO.FGuiGridColumnText = function FGuiGridColumnText(o){
   o = MO.Class.inherits(this, o, MO.FGuiGridColumn, MO.MUiGridColumnText);
   //..........................................................
   // @method
   o.construct = MO.FGuiGridColumnText_construct;
   // @method
   o.dispose   = MO.FGuiGridColumnText_dispose;
   return o;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiGridColumnText_construct = function FGuiGridColumnText_construct(){
   var o = this;
   o.__base.FGuiGridColumn.construct.call(o);
   o.__base.MUiGridColumnText.construct.call(o);
   // 设置属性
   o._cellClass = MO.FGuiGridCellText;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiGridColumnText_dispose = function FGuiGridColumnText_dispose(){
   var o = this;
   // 父处理
   o.__base.MUiGridColumnText.dispose.call(o);
   o.__base.FGuiGridColumn.dispose.call(o);
}
