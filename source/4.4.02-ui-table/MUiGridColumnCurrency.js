//==========================================================
// <T>表格货币列。</T>
//
// @class
// @author maocy
// @version 150805
//==========================================================
MO.MUiGridColumnCurrency = function MUiGridColumnCurrency(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @attribute
   o._currencyPercent = MO.Class.register(o, new MO.AGetSet('_currencyPercent'), 2);
   o._normalColor     = MO.Class.register(o, new MO.AGetSet('_normalColor'), '#000000');
   o._highColor       = MO.Class.register(o, new MO.AGetSet('_highColor'), '#000000');
   o._lowerColor      = MO.Class.register(o, new MO.AGetSet('_lowerColor'), '#000000');
   o._negativeColor   = MO.Class.register(o, new MO.AGetSet('_negativeColor'), '#000000');
   // @attribute
   //..........................................................
   // @method
   o.construct        = MO.MUiGridColumnCurrency_construct;
   // @method
   o.formatText       = MO.MUiGridColumnCurrency_formatText;
   // @method
   o.dispose          = MO.MUiGridColumnCurrency_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.MUiGridColumnCurrency_construct = function MUiGridColumnCurrency_construct(){
   var o = this;
}

//==========================================================
// <T>格式化数据为文本。</T>
//
// @method
// @param value:String 数据
// @return 文本
//==========================================================
MO.MUiGridColumnCurrency_formatText = function MUiGridColumnCurrency_formatText(value){
   var o = this;
   var text = MO.Lang.Float.format(MO.Runtime.nvl(value, 0), null, null, o._currencyPercent, '0');
   return text;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.MUiGridColumnCurrency_dispose = function MUiGridColumnCurrency_dispose(){
   var o = this;
}
