//==========================================================
// <T>表格时间单元格。</T>
//
// @class
// @author maocy
// @version 150804
//==========================================================
MO.FGuiGridCellCurrency = function FGuiGridCellCurrency(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MUiGridCellDate);
   //..........................................................
   o._fontColor  = null;
   o._numberFont = null;
   //..........................................................
   // @method
   o.construct   = MO.FGuiGridCellCurrency_construct;
   // @method
   o.formatText  = MO.FGuiGridCellCurrency_formatText;
   o.draw        = MO.FGuiGridCellCurrency_draw;
   // @method
   o.dispose     = MO.FGuiGridCellCurrency_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiGridCellCurrency_construct = function FGuiGridCellCurrency_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o.__base.MUiGridCellDate.construct.call(o);
   // 设置属性
   o._numberFont = new MO.SUiFont();
}

//==========================================================
// <T>格式化数据为文本。</T>
//
// @method
// @param value:String 数据
// @return String 文本
//==========================================================
MO.FGuiGridCellCurrency_formatText = function FGuiGridCellCurrency_formatText(value){
   return this.__base.MUiGridColumnDate.formatText.call(this, value)
}

//==========================================================
// <T>绘制处理。</T>
//
// @method
// @return 绘制处理
//==========================================================
MO.FGuiGridCellCurrency_draw = function FGuiGridCellCurrency_draw(graphic, x, y, width, height){
   var o = this;
   var column = o._column;
   var cellPadding = column.cellPadding();
   // 获得字体
   var value = o.value();
   var text = o.text();
   var textLength = text.length;
   var font = o.findFont();
   var numberFont = o._numberFont;
   numberFont.assign(font);
   var contentWidth = width - cellPadding.right;
   // 绘制文字
   if(value >= 0){
      if(textLength > 7){
         var fontColor = null;
         if(textLength > 9){
            fontColor = column.highColor();
         }else{
            fontColor = column.lowerColor();
         }
         var high = text.substring(0, text.length - 7);
         var low = text.substring(text.length - 7, text.length);
         var highWidth = graphic.textWidth(high);
         var lowWidth = graphic.textWidth(low);
         numberFont.color = fontColor;
         graphic.drawFontText(high, numberFont, x, y, contentWidth - lowWidth, height, MO.EUiAlign.Right);
         numberFont.color = column.normalColor();
         graphic.drawFontText(low, numberFont, x, y, contentWidth, height, MO.EUiAlign.Right);
      }else{
         numberFont.color = column.normalColor();
         graphic.drawFontText(text, numberFont, x, y, contentWidth, height, MO.EUiAlign.Right);
      }
   }else if(value < 0){
      numberFont.color = column.negativeColor();
      graphic.drawFontText(text, numberFont, x, y, contentWidth, height, MO.EUiAlign.Right);
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiGridCellCurrency_dispose = function FGuiGridCellCurrency_dispose(){
   var o = this;
   // 释放属性
   o._numberFont = MO.Lang.Object.dispose(o._numberFont);
   // 父处理
   o.__base.MUiGridCellDate.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
