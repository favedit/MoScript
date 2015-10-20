//==========================================================
// <T>界面表格文本列。</T>
//
// @class
// @author maocy
// @version 150805
//==========================================================
MO.FGuiGridColumnPicture = function FGuiGridColumnPicture(o) {
   o = MO.Class.inherits(this, o, MO.FGuiGridColumn, MO.MUiGridColumnText);

   o._align   = MO.Class.register(o, new MO.AGetSet('_align'));
   o._drawScale = MO.Class.register(o, new MO.AGetSet('_drawScale'), 1.0);

   //..........................................................
   // @method
   o.construct = MO.FGuiGridColumnPicture_construct;
   // @method
   o.dispose   = MO.FGuiGridColumnPicture_dispose;
   return o;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiGridColumnPicture_construct = function FGuiGridColumnPicture_construct() {
   var o = this;
   o.__base.FGuiGridColumn.construct.call(o);
   o.__base.MUiGridColumnText.construct.call(o);
   // 设置属性
   o._cellClass = MO.FGuiGridCellPicture;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiGridColumnPicture_dispose = function FGuiGridColumnPicture_dispose() {
   var o = this;
   // 父处理
   o.__base.MUiGridColumnText.dispose.call(o);
   o.__base.FGuiGridColumn.dispose.call(o);
}