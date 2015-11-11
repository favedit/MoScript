//==========================================================
// <T>表格货币列。</T>
//
// @class
// @author maocy
// @version 150805
//==========================================================
MO.MUiGridColumnCurrencyInt = function MUiGridColumnCurrencyInt(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @attribute
   o._currencyPercent = MO.Class.register(o, new MO.AGetSet('_currencyPercent'), 0);
   o._normalColor     = MO.Class.register(o, new MO.AGetSet('_normalColor'), '#000000');
   o._lowerestColor   = MO.Class.register(o, new MO.AGetSet('_lowerestColor'), '#000000');
   o._lowerColor      = MO.Class.register(o, new MO.AGetSet('_lowerColor'), '#000000');
   o._highColor       = MO.Class.register(o, new MO.AGetSet('_highColor'), '#000000');
   o._highestColor    = MO.Class.register(o, new MO.AGetSet('_highestColor'), '#000000');
   o._negativeColor   = MO.Class.register(o, new MO.AGetSet('_negativeColor'), '#000000');
   // @attribute
   //..........................................................
   // @method
   o.construct        = MO.MUiGridColumnCurrencyInt_construct;
   // @method
   o.formatText       = MO.MUiGridColumnCurrencyInt_formatText;
   // @method
   o.dispose          = MO.MUiGridColumnCurrencyInt_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.MUiGridColumnCurrencyInt_construct = function MUiGridColumnCurrencyInt_construct(){
   var o = this;
}

//==========================================================
// <T>格式化数据为文本。</T>
//
// @method
// @param value:String 数据
// @return 文本
//==========================================================
MO.MUiGridColumnCurrencyInt_formatText = function MUiGridColumnCurrencyInt_formatText(value){
   var o = this;
   var text = MO.Lang.Integer.format(MO.Runtime.nvl(value, 0), null, null, o._currencyPercent, '0');
   return text;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.MUiGridColumnCurrencyInt_dispose = function MUiGridColumnCurrencyInt_dispose(){
   var o = this;
}
