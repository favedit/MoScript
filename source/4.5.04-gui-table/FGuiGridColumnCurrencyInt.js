//==========================================================
// <T>界面表格货币列。</T>
//
// @class
// @author maocy
// @version 150805
//==========================================================
MO.FGuiGridColumnCurrencyInt = function FGuiGridColumnCurrencyInt(o){
   o = MO.Class.inherits(this, o, MO.FGuiGridColumn, MO.MUiGridColumnCurrencyInt);
   //..........................................................
   // @method
   o.construct    = MO.FGuiGridColumnCurrencyInt_construct;
   // @method
   o.formatText   = MO.FGuiGridColumnCurrencyInt_formatText;
   // @method
   o.dispose      = MO.FGuiGridColumnCurrencyInt_dispose;
   return o;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiGridColumnCurrencyInt_construct = function FGuiGridColumnCurrencyInt_construct(){
   var o = this;
   o.__base.FGuiGridColumn.construct.call(o);
   o.__base.MUiGridColumnCurrencyInt.construct.call(o);
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
MO.FGuiGridColumnCurrencyInt_formatText = function FGuiGridColumnCurrencyInt_formatText(value){
   return this.__base.MUiGridColumnCurrencyInt.formatText.call(this, value)
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiGridColumnCurrencyInt_dispose = function FGuiGridColumnCurrencyInt_dispose(){
   var o = this;
   // 父处理
   o.__base.MUiGridColumnCurrencyInt.dispose.call(o);
   o.__base.FGuiGridColumn.dispose.call(o);
}
