//==========================================================
// <T>界面表格文本列。</T>
//
// @class
// @author maocy
// @version 150805
//==========================================================
MO.FGuiGridColumnImage = function FGuiGridColumnImage(o){
   o = MO.Class.inherits(this, o, MO.FGuiGridColumn, MO.MUiGridColumnText);
   //..........................................................
   // @method
   o.construct = MO.FGuiGridColumnImage_construct;
   // @method
   o.dispose   = MO.FGuiGridColumnImage_dispose;
   return o;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiGridColumnImage_construct = function FGuiGridColumnImage_construct(){
   var o = this;
   o.__base.FGuiGridColumn.construct.call(o);
   o.__base.MUiGridColumnText.construct.call(o);
   // 设置属性
   o._cellClass = MO.FGuiGridCellImage;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiGridColumnImage_dispose = function FGuiGridColumnImage_dispose(){
   var o = this;
   // 父处理
   o.__base.MUiGridColumnText.dispose.call(o);
   o.__base.FGuiGridColumn.dispose.call(o);
}
