//==========================================================
// <T>表格时间单元格。</T>
//
// @class
// @author maocy
// @version 150804
//==========================================================
MO.FGuiGridCellBigNumber = function FGuiGridCellBigNumber(o){
   o = MO.Class.inherits(this, o, MO.FGuiGridCell, MO.MUiGridCellCurrency);
   //..........................................................
   o._fontColor  = null;
   o._numberFont = null;
   //..........................................................
   // @method
   o.construct   = MO.FGuiGridCellBigNumber_construct;
   // @method
   o.formatText  = MO.FGuiGridCellBigNumber_formatText;
   o.draw        = MO.FGuiGridCellBigNumber_draw;
   // @method
   o.dispose     = MO.FGuiGridCellBigNumber_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiGridCellBigNumber_construct = function FGuiGridCellBigNumber_construct(){
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
MO.FGuiGridCellBigNumber_formatText = function FGuiGridCellBigNumber_formatText(value){
   return this.__base.MUiGridColumnDate.formatText.call(this, value)
}

//==========================================================
// <T>绘制处理。</T>
//
// @method
// @param context:SGuiGridPaintContext 绘制环境
//==========================================================
MO.FGuiGridCellBigNumber_draw = function FGuiGridCellBigNumber_draw(context){
   var o = this;
   var graphic = context.graphic;
   var rectangle = context.rectangle;
   var font = context.style.font;
   var x = rectangle.left;
   var y = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   var column = o._column;
   var cellPadding = column.cellPadding();
   // 获得字体
   var value = o.value();
   var text = o.text();
   var textLength = text.length;
   var numberFont = o._numberFont;
   numberFont.assign(font);
   var contentWidth = width - cellPadding.right;
   // 绘制文字
   if(value >= 0){
      if(textLength > 7){
         var fontColor = null;
         fontColor = column.highColor();
         var high = text.substring(0, text.length - 11);
         var low = text.substring(text.length - 11, text.length - 7) + '.' +text.substring(text.length - 7, text.length - 5);
         var highWidth = graphic.textWidth(high);
         var lowWidth = graphic.textWidth(low);
         numberFont.color = column.highColor();
         graphic.drawFontText(high, numberFont, x, y, contentWidth - lowWidth, height, MO.EUiAlign.Right);
         numberFont.color = column.normalColor();
         graphic.drawFontText(low, numberFont, x, y, contentWidth, height, MO.EUiAlign.Right);
      }
      else if(textLength > 5){
         var low = '0.' + text.substring(text.length - 7, text.length - 5);
         numberFont.color = column.normalColor();
         graphic.drawFontText(low, numberFont, x, y, contentWidth, height, MO.EUiAlign.Right);
      }
      else {
         numberFont.color = column.normalColor();
         graphic.drawFontText('0.00', numberFont, x, y, contentWidth, height, MO.EUiAlign.Right);
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
MO.FGuiGridCellBigNumber_dispose = function FGuiGridCellBigNumber_dispose(){
   var o = this;
   // 释放属性
   o._numberFont = MO.Lang.Object.dispose(o._numberFont);
   // 父处理
   o.__base.MUiGridCellCurrency.dispose.call(o);
   o.__base.FGuiGridCell.dispose.call(o);
}
