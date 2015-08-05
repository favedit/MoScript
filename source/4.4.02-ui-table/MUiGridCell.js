//==========================================================
// <T>表格单元格。</T>
//
// @class
// @author maocy
// @version 150804
//==========================================================
MO.MUiGridCell = function MUiGridCell(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._grid      = MO.Class.register(o, new MO.AGetSet('_grid'));
   o._column    = MO.Class.register(o, new MO.AGetSet('_column'));
   o._row       = MO.Class.register(o, new MO.AGetSet('_row'));
   // @attribute
   o._font      = MO.Class.register(o, new MO.AGetSet('_font'));
   o._value     = MO.Class.register(o, new MO.AGetSet('_value'));
   //..........................................................
   // @method
   o.findFont   = MO.MUiGridCell_findFont;
   o.text       = MO.MUiGridCell_text;
   o.setText    = MO.MUiGridCell_setText;
   // @method
   o.dispose    = MO.MUiGridCell_dispose;
   return o;
}

//==========================================================
// <T>查找字体。</T>
//
// @method
// @return 字体
//==========================================================
MO.MUiGridCell_findFont = function MUiGridCell_findFont(){
   var o = this;
   // 获得字体
   var font = o._font;
   if(font){
      font = o._row.font();
   }
   if(!font){
      font = o._column.font();
   }
   if(!font){
      font = o._grid.rowFont();
   }
   return font;
}

//==========================================================
// <T>获取文本内容。</T>
//
// @method
// @return 文本内容
//==========================================================
MO.MUiGridCell_text = function MUiGridCell_text(){
   var o = this;
   var text = o._column.formatText(o._value);
   return text;
}

//==========================================================
// <T>设置文本内容。</T>
//
// @method
// @param text:String 文本内容
//==========================================================
MO.MUiGridCell_setText = function MUiGridCell_setText(text){
   var o = this;
   var value = o._column.formatValue(text);
   o.setValue(value);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.MUiGridCell_dispose = function MUiGridCell_dispose(){
   var o = this;
   // 释放属性
   o._grid = null;
   o._column = null;
   o._row = null;
   // 父处理
   o.__base.FObject.dispose.call(o);
}
