//==========================================================
// <T>界面表格货币列。</T>
//
// @class
// @author maocy
// @version 150805
//==========================================================
MO.FGuiGridColumnCurrency = function FGuiGridColumnCurrency(o){
   o = MO.Class.inherits(this, o, MO.FGuiGridColumn, MO.MUiGridColumnCurrency);
   //..........................................................
   // @method
   o.construct    = MO.FGuiGridColumnCurrency_construct;
   // @method
   o.formatText   = MO.FGuiGridColumnCurrency_formatText;
   // @method
   o.dispose      = MO.FGuiGridColumnCurrency_dispose;
   return o;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiGridColumnCurrency_construct = function FGuiGridColumnCurrency_construct(){
   var o = this;
   o.__base.FGuiGridColumn.construct.call(o);
   o.__base.MUiGridColumnCurrency.construct.call(o);
   // 设置属性
   o._cellClass = MO.FGuiGridCellCurrency;
}

//==========================================================
// <T>格式化数据为文本。</T>
//
// @method
// @param value:String 数据
// @return String 文本
//==========================================================
MO.FGuiGridColumnCurrency_formatText = function FGuiGridColumnCurrency_formatText(value){
   return this.__base.MUiGridColumnCurrency.formatText.call(this, value)
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiGridColumnCurrency_dispose = function FGuiGridColumnCurrency_dispose(){
   var o = this;
   // 父处理
   o.__base.MUiGridColumnCurrency.dispose.call(o);
   o.__base.FGuiGridColumn.dispose.call(o);
}
