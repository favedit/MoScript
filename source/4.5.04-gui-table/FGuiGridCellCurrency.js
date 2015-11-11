//==========================================================
// <T>表格时间单元格。</T>
//
// @class
// @author maocy
// @version 150804
//==========================================================
MO.FGuiGridCellCurrency = function FGuiGridCellCurrency(o){
   o = MO.Class.inherits(this, o, MO.FGuiGridCell, MO.MUiGridCellCurrency);
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
   o.__base.FGuiGridCell.construct.call(o);
   o.__base.MUiGridCellCurrency.construct.call(o);
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
// @param context:SGuiGridPaintContext 绘制环境
//==========================================================
MO.FGuiGridCellCurrency_draw = function FGuiGridCellCurrency_draw(context){
   var o = this;
   var graphic = context.graphic;
   var rectangle = context.rectangle;
   var font = context.style.font;
   var x = rectangle.left;
   var y = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   var column = o._column;
   var optionDecimal = column.optionDecimal();
   var cellPadding = column.cellPadding();
   // 获得字体
   var value = o.value();
   var text = o.text();
   var textLength = text.length;
   var numberFont = o._numberFont;
   numberFont.assign(font);
   var contentWidth = width - cellPadding.right;
   // 绘制文字
   if(optionDecimal){
      if(value >= 0){
         if(textLength > 11){
            var fontColor = null;
            var highest = text.substring(0, text.length - 11);
            var high = text.substring(textLength - 11, textLength - 7);
            var low = text.substring(textLength - 7, textLength);
            var highestWidth = graphic.textWidth(highest);
            var highWidth = graphic.textWidth(high);
            var lowWidth = graphic.textWidth(low);
            numberFont.color = column.highestColor();
            graphic.drawFontText(highest, numberFont, x, y, contentWidth - highWidth - lowWidth, height, MO.EUiAlign.Right);
            numberFont.color = column.highColor();
            graphic.drawFontText(high, numberFont, x, y, contentWidth - lowWidth, height, MO.EUiAlign.Right);
            numberFont.color = column.normalColor();
            graphic.drawFontText(low, numberFont, x, y, contentWidth, height, MO.EUiAlign.Right);
         }else if(textLength > 7){
            var fontColor = null;
            if(textLength > 9){
               fontColor = column.highColor();
            }else{
               fontColor = column.lowerColor();
            }
            var high = text.substring(0, textLength - 7);
            var low = text.substring(textLength - 7, textLength);
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
   }else{
      var text = value + '';
      var textLength = text.length;
      if(value >= 0){
         if(textLength > 8){
            var fontColor = null;
            var highest = text.substring(0, text.length - 8);
            var high = text.substring(textLength - 8, textLength - 4);
            var low = text.substring(textLength - 4, textLength);
            var highestWidth = graphic.textWidth(highest);
            var highWidth = graphic.textWidth(high);
            var lowWidth = graphic.textWidth(low);
            numberFont.color = column.highestColor();
            graphic.drawFontText(highest, numberFont, x, y, contentWidth - highWidth - lowWidth, height, MO.EUiAlign.Right);
            numberFont.color = column.highColor();
            graphic.drawFontText(high, numberFont, x, y, contentWidth - lowWidth, height, MO.EUiAlign.Right);
            numberFont.color = column.normalColor();
            graphic.drawFontText(low, numberFont, x, y, contentWidth, height, MO.EUiAlign.Right);
         }else if(textLength > 4){
            var fontColor = null;
            if(textLength > 6){
               fontColor = column.highColor();
            }else{
               fontColor = column.lowerColor();
            }
            var high = text.substring(0, textLength - 4);
            var low = text.substring(textLength - 4, textLength);
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
   o.__base.MUiGridCellCurrency.dispose.call(o);
   o.__base.FGuiGridCell.dispose.call(o);
}
