//==========================================================
// <T>界面表格货币列。</T>
//
// @class
// @author maocy
// @version 150805
//==========================================================
MO.FGuiGridColumnBigNumber = function FGuiGridColumnBigNumber(o){
   o = MO.Class.inherits(this, o, MO.FGuiGridColumn, MO.MUiGridColumnCurrency);
   //..........................................................
   // @method
   o.construct  = MO.FGuiGridColumnBigNumber_construct;
   // @method
   o.formatText = MO.FGuiGridColumnBigNumber_formatText;
   // @method
   o.dispose    = MO.FGuiGridColumnBigNumber_dispose;
   return o;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiGridColumnBigNumber_construct = function FGuiGridColumnBigNumber_construct(){
   var o = this;
   o.__base.FGuiGridColumn.construct.call(o);
   o.__base.MUiGridColumnCurrency.construct.call(o);
   // 设置属性
   o._cellClass = MO.FGuiGridCellBigNumber;
}

//==========================================================
// <T>格式化数据为文本。</T>
//
// @method
// @param value:String 数据
// @return String 文本
//==========================================================
MO.FGuiGridColumnBigNumber_formatText = function FGuiGridColumnBigNumber_formatText(value){
   return this.__base.MUiGridColumnCurrency.formatText.call(this, value)
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiGridColumnBigNumber_dispose = function FGuiGridColumnBigNumber_dispose(){
   var o = this;
   // 父处理
   o.__base.MUiGridColumnCurrency.dispose.call(o);
   o.__base.FGuiGridColumn.dispose.call(o);
}
