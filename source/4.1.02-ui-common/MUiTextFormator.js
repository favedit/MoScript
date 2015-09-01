//==========================================================
// <T>编辑格式化接口。</T>
//
// @face
// @author maocy
// @version 150410
//==========================================================
MO.MUiTextFormator = function MUiTextFormator(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @method
   o.formatText  = MO.MUiTextFormator_formatText;
   o.formatValue = MO.MUiTextFormator_formatValue;
   return o;
}

//==========================================================
// <T>格式化数据为文本。</T>
//
// @method
// @param value:String 数据
// @return 文本
//==========================================================
MO.MUiTextFormator_formatText = function MUiTextFormator_formatText(value){
   return value;
}

//==========================================================
// <T>格式化文本为数据。</T>
//
// @method
// @param text:String 文本
// @return 数据
//==========================================================
MO.MUiTextFormator_formatValue = function MUiTextFormator_formatValue(text){
   return text;
}
