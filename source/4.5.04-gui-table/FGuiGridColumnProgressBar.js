//==========================================================
// <T>界面表格进度条列。</T>
//
// @class
// @author sunpeng
// @version 151125
//==========================================================
MO.FGuiGridColumnProgressBar = function FGuiGridColumnProgressBar(o) {
   o = MO.Class.inherits(this, o, MO.FGuiGridColumn, MO.MUiGridColumnText);

   o._align = MO.Class.register(o, new MO.AGetSet('_align'));
   o._drawScale = MO.Class.register(o, new MO.AGetSet('_drawScale'), 1.0);

   o._bgImage = MO.Class.register(o, new MO.AGetSet('_bgImage'));
   o._fillImage = MO.Class.register(o, new MO.AGetSet('_fillImage'));

   o._maxValue = MO.Class.register(o, new MO.AGetSet('_maxValue'), 100);
   //..........................................................
   // @method
   o.construct = MO.FGuiGridColumnProgressBar_construct;
   o.setup = MO.FGuiGridColumnProgressBar_setup;
   // @method
   o.dispose   = MO.FGuiGridColumnProgressBar_dispose;
   return o;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiGridColumnProgressBar_construct = function FGuiGridColumnProgressBar_construct() {
   var o = this;
   o.__base.FGuiGridColumn.construct.call(o);
   o.__base.MUiGridColumnText.construct.call(o);
   // 设置属性
   o._cellClass = MO.FGuiGridCellProgressBar;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiGridColumnProgressBar_setup = function FGuiGridColumnProgressBar_setup(bgImageUrl, fillImageUrl) {
   var o = this;
   var imageConsole = MO.Console.find(MO.FImageConsole)
   o._bgImage = imageConsole.load(bgImageUrl);
   o._fillImage = imageConsole.load(fillImageUrl);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiGridColumnProgressBar_dispose = function FGuiGridColumnProgressBar_dispose() {
   var o = this;
   // 父处理
   o.__base.MUiGridColumnText.dispose.call(o);
   o.__base.FGuiGridColumn.dispose.call(o);
}