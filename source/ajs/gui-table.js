MO.FGuiGridCell = function FGuiGridCell(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MUiGridCellText);
   o.onPaint   = MO.FGuiGridCell_onPaint;
   o.construct = MO.FGuiGridCell_construct;
   o.draw      = MO.FGuiGridCell_draw;
   o.dispose   = MO.FGuiGridCell_dispose;
   return o;
}
MO.FGuiGridCell_onPaint = function FGuiGridCell_onPaint(event){
   var o = this;
}
MO.FGuiGridCell_construct = function FGuiGridCell_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o.__base.MUiGridCellText.construct.call(o);
}
MO.FGuiGridCell_draw = function FGuiGridCell_draw(graphic, x, y, width, height){
   var o = this;
   var text = o.text();
   var font = o.findFont();
   graphic.drawFontText(text, font, x, y, width, height, MO.EUiAlign.Center);
}
MO.FGuiGridCell_dispose = function FGuiGridCell_dispose(){
   var o = this;
   o.__base.MUiGridCellText.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
MO.FGuiGridCellCurrency = function FGuiGridCellCurrency(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MUiGridCellDate);
   o._fontColor  = null;
   o._numberFont = null;
   o.construct   = MO.FGuiGridCellCurrency_construct;
   o.formatText  = MO.FGuiGridCellCurrency_formatText;
   o.draw        = MO.FGuiGridCellCurrency_draw;
   o.dispose     = MO.FGuiGridCellCurrency_dispose;
   return o;
}
MO.FGuiGridCellCurrency_construct = function FGuiGridCellCurrency_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o.__base.MUiGridCellDate.construct.call(o);
   o._numberFont = new MO.SUiFont();
}
MO.FGuiGridCellCurrency_formatText = function FGuiGridCellCurrency_formatText(value){
   return this.__base.MUiGridColumnDate.formatText.call(this, value)
}
MO.FGuiGridCellCurrency_draw = function FGuiGridCellCurrency_draw(graphic, x, y, width, height){
   var o = this;
   var column = o._column;
   var cellPadding = column.cellPadding();
   var value = o.value();
   var text = o.text();
   var textLength = text.length;
   var font = o.findFont();
   var numberFont = o._numberFont;
   numberFont.assign(font);
   var contentWidth = width - cellPadding.right;
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
MO.FGuiGridCellCurrency_dispose = function FGuiGridCellCurrency_dispose(){
   var o = this;
   o._numberFont = MO.Lang.Object.dispose(o._numberFont);
   o.__base.MUiGridCellDate.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
MO.FGuiGridCellDate = function FGuiGridCellDate(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MUiGridCellDate);
   o.construct = MO.FGuiGridCellDate_construct;
   o.draw      = MO.FGuiGridCellDate_draw;
   o.dispose   = MO.FGuiGridCellDate_dispose;
   return o;
}
MO.FGuiGridCellDate_construct = function FGuiGridCellDate_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o.__base.MUiGridCellDate.construct.call(o);
}
MO.FGuiGridCellDate_draw = function FGuiGridCellDate_draw(graphic, x, y, width, height){
   var o = this;
   var text = o.text();
   var font = o.findFont();
   graphic.drawFontText(text, font, x, y, width, height, MO.EUiAlign.Center);
}
MO.FGuiGridCellDate_dispose = function FGuiGridCellDate_dispose(){
   var o = this;
   o.__base.MUiGridCellDate.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
MO.FGuiGridCellImage = function FGuiGridCellImage(o) {
   o = MO.Class.inherits(this, o, MO.FObject, MO.MUiGridCellText);
   o._image           = null;
   o.onPaint = MO.FGuiGridCellImage_onPaint;
   o.construct = MO.FGuiGridCellImage_construct;
   o.draw = MO.FGuiGridCellImage_draw;
   o.dispose = MO.FGuiGridCellImage_dispose;
   return o;
}
MO.FGuiGridCellImage_onPaint = function FGuiGridCellImage_onPaint(event) {
   var o = this;
}
MO.FGuiGridCellImage_construct = function FGuiGridCellImage_construct() {
   var o = this;
   o.__base.FObject.construct.call(o);
   o.__base.MUiGridCellText.construct.call(o);
}
MO.FGuiGridCellImage_draw = function FGuiGridCellImage_draw(graphic, x, y, width, height) {
   var o = this;
   var imageConsole = MO.Console.find(MO.FImageConsole);
   var imageurl = o.text();
   var image = o._image = imageConsole.load(imageurl);
   image.testReady();
    var imageX = (width/2)-(image.size().width/2)+x;
   var imageY = (height/2)-(image.size().height/2)+y;
   graphic.drawImage(image, imageX, imageY,image.size().width,image.size().height);
}
MO.FGuiGridCellImage_dispose = function FGuiGridCellImage_dispose() {
   var o = this;
   o.__base.MUiGridCellText.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
MO.FGuiGridCellText = function FGuiGridCellText(o){
   o = MO.Class.inherits(this, o, MO.FGuiGridCell, MO.MUiGridCellText);
   o.onPaint   = MO.FGuiGridCellText_onPaint;
   o.construct = MO.FGuiGridCellText_construct;
   o.draw      = MO.FGuiGridCellText_draw;
   o.dispose   = MO.FGuiGridCellText_dispose;
   return o;
}
MO.FGuiGridCellText_onPaint = function FGuiGridCellText_onPaint(event){
   var o = this;
}
MO.FGuiGridCellText_construct = function FGuiGridCellText_construct(){
   var o = this;
   o.__base.FGuiGridCell.construct.call(o);
   o.__base.MUiGridCellText.construct.call(o);
}
MO.FGuiGridCellText_draw = function FGuiGridCellText_draw(graphic, x, y, width, height){
   var o = this;
   var text = o.text();
   var font = o.findFont();
   graphic.drawFontText(text, font, x, y, width, height, MO.EUiAlign.Center);
}
MO.FGuiGridCellText_dispose = function FGuiGridCellText_dispose(){
   var o = this;
   o.__base.MUiGridCellText.dispose.call(o);
   o.__base.FGuiGridCell.dispose.call(o);
}
MO.FGuiGridColumn = function FGuiGridColumn(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MUiGridColumn);
   o.construct = MO.FGuiGridColumn_construct;
   o.draw      = MO.FGuiGridColumn_draw;
   o.dispose   = MO.FGuiGridColumn_dispose;
   return o;
}
MO.FGuiGridColumn_construct = function FGuiGridColumn_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o.__base.MUiGridColumn.construct.call(o);
}
MO.FGuiGridColumn_draw = function FGuiGridColumn_draw(graphic, x, y, width, height){
   var o = this;
   var padding = o._padding;
   var contentX = x + padding.left;
   var contentY = y + padding.top;
   var contentWidth = width - padding.left - padding.right;
   var contentHeight = height - padding.top - padding.bottom;
   var backColor = o._backColor;
   if(!backColor){
      backColor = o._grid.headBackColor();
   }
   graphic.fillRectangle(contentX, contentY, contentWidth, contentHeight, backColor);
   var font = o.findFont();
   graphic.drawFontText(o._label, font, contentX, contentY - 3, contentWidth, contentHeight, MO.EUiAlign.Center);
}
MO.FGuiGridColumn_dispose = function FGuiGridColumn_dispose(){
   var o = this;
   o.__base.MUiGridColumn.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
MO.FGuiGridColumnCurrency = function FGuiGridColumnCurrency(o){
   o = MO.Class.inherits(this, o, MO.FGuiGridColumn, MO.MUiGridColumnCurrency);
   o.construct  = MO.FGuiGridColumnCurrency_construct;
   o.formatText = MO.FGuiGridColumnCurrency_formatText;
   o.dispose    = MO.FGuiGridColumnCurrency_dispose;
   return o;
}
MO.FGuiGridColumnCurrency_construct = function FGuiGridColumnCurrency_construct(){
   var o = this;
   o.__base.FGuiGridColumn.construct.call(o);
   o.__base.MUiGridColumnCurrency.construct.call(o);
   o._cellClass = MO.FGuiGridCellCurrency;
}
MO.FGuiGridColumnCurrency_formatText = function FGuiGridColumnCurrency_formatText(value){
   return this.__base.MUiGridColumnCurrency.formatText.call(this, value)
}
MO.FGuiGridColumnCurrency_dispose = function FGuiGridColumnCurrency_dispose(){
   var o = this;
   o.__base.MUiGridColumnCurrency.dispose.call(o);
   o.__base.FGuiGridColumn.dispose.call(o);
}
MO.FGuiGridColumnDate = function FGuiGridColumnDate(o){
   o = MO.Class.inherits(this, o, MO.FGuiGridColumn, MO.MUiGridColumnDate);
   o.construct  = MO.FGuiGridColumnDate_construct;
   o.formatText = MO.FGuiGridColumnDate_formatText;
   o.dispose    = MO.FGuiGridColumnDate_dispose;
   return o;
}
MO.FGuiGridColumnDate_construct = function FGuiGridColumnDate_construct(){
   var o = this;
   o.__base.FGuiGridColumn.construct.call(o);
   o.__base.MUiGridColumnDate.construct.call(o);
   o._cellClass = MO.FGuiGridCellDate;
}
MO.FGuiGridColumnDate_formatText = function FGuiGridColumnDate_formatText(value){
   return this.__base.MUiGridColumnDate.formatText.call(this, value)
}
MO.FGuiGridColumnDate_dispose = function FGuiGridColumnDate_dispose(){
   var o = this;
   o.__base.MUiGridColumnDate.dispose.call(o);
   o.__base.FGuiGridColumn.dispose.call(o);
}
MO.FGuiGridColumnImage = function FGuiGridColumnImage(o){
   o = MO.Class.inherits(this, o, MO.FGuiGridColumn, MO.MUiGridColumnText);
   o.construct = MO.FGuiGridColumnImage_construct;
   o.dispose   = MO.FGuiGridColumnImage_dispose;
   return o;
}
MO.FGuiGridColumnImage_construct = function FGuiGridColumnImage_construct(){
   var o = this;
   o.__base.FGuiGridColumn.construct.call(o);
   o.__base.MUiGridColumnText.construct.call(o);
   o._cellClass = MO.FGuiGridCellImage;
}
MO.FGuiGridColumnImage_dispose = function FGuiGridColumnImage_dispose(){
   var o = this;
   o.__base.MUiGridColumnText.dispose.call(o);
   o.__base.FGuiGridColumn.dispose.call(o);
}
MO.FGuiGridColumnText = function FGuiGridColumnText(o){
   o = MO.Class.inherits(this, o, MO.FGuiGridColumn, MO.MUiGridColumnText);
   o.construct = MO.FGuiGridColumnText_construct;
   o.dispose   = MO.FGuiGridColumnText_dispose;
   return o;
}
MO.FGuiGridColumnText_construct = function FGuiGridColumnText_construct(){
   var o = this;
   o.__base.FGuiGridColumn.construct.call(o);
   o.__base.MUiGridColumnText.construct.call(o);
   o._cellClass = MO.FGuiGridCellText;
}
MO.FGuiGridColumnText_dispose = function FGuiGridColumnText_dispose(){
   var o = this;
   o.__base.MUiGridColumnText.dispose.call(o);
   o.__base.FGuiGridColumn.dispose.call(o);
}
MO.FGuiGridControl = function FGuiGridControl(o){
   o = MO.Class.inherits(this, o, MO.FGuiControl, MO.MUiGridControl);
   o._rowScroll      = 0;
   o._rowScrollSpeed = 1;
   o.onPaintBegin = MO.FGuiGridControl_onPaintBegin;
   o.construct    = MO.FGuiGridControl_construct;
   o.dispose      = MO.FGuiGridControl_dispose;
   return o;
}
MO.FGuiGridControl_onPaintBegin = function FGuiGridControl_onPaintBegin(event){
   var o = this;
   var padding = o._padding;
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left + padding.left;
   var top = rectangle.top + padding.top;
   var bottom = rectangle.bottom() - padding.bottom;
   var width = rectangle.width - padding.left - padding.right;
   var height = rectangle.height - padding.top - padding.bottom;
   var drawX = left;
   var drawY = top;
   var gridWidth = width;
   var columnWidthTotal = 0;
   var columns = o._columns;
   var columnCount = columns.count();
   for(var i = 0; i < columnCount; i++){
      var column = columns.at(i);
      columnWidthTotal += column.width();
   }
   if(o._displayHead){
      var columnX = drawX;
      var columnY = top;
      var headTextTop = columnY + 0;
      var headHeight = o._headHeight;
      for(var i = 0; i < columnCount; i++){
         var column = columns.at(i);
         var columnWidth = gridWidth * column.width() / columnWidthTotal;
         column.draw(graphic, columnX, columnY, columnWidth, headHeight);
         columnX += columnWidth;
      }
      drawY += headHeight;
   }
   var rowsHeight = bottom - drawY;
   var rowHeight = o._rowHeight;
   graphic.clip(drawX, drawY, gridWidth, rowsHeight);
   var rows = o._rows;
   var rowCount = rows.count();
   drawY += o._rowScroll;
   for(var rowIndex = 0; rowIndex < rowCount; rowIndex++){
      var columnX = drawX;
      if(drawY > -rowHeight){
         var row = rows.at(rowIndex);
         for(var i = 0; i < columnCount; i++){
            var column = columns.at(i);
            var dataName = column.dataName();
            var columnWidth = gridWidth * column.width() / columnWidthTotal;
            var cell = row.cells().get(dataName);
            cell.draw(graphic, columnX, drawY, columnWidth, rowHeight);
            columnX += columnWidth;
         }
      }
      drawY += rowHeight;
      if(drawY > bottom){
         break;
      }
   }
}
MO.FGuiGridControl_construct = function FGuiGridControl_construct(){
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o.__base.MUiGridControl.construct.call(o);
   o._rowClass = MO.FGuiGridRow;
}
MO.FGuiGridControl_dispose = function FGuiGridControl_dispose(){
   var o = this;
   o.__base.MUiGridControl.dispose.call(o);
   o.__base.FGuiControl.dispose.call(o);
}
MO.FGuiGridRow = function FGuiGridRow(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MUiGridRow);
   o.construct = MO.FGuiGridRow_construct;
   o.dispose   = MO.FGuiGridRow_dispose;
   return o;
}
MO.FGuiGridRow_construct = function FGuiGridRow_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o.__base.MUiGridRow.construct.call(o);
}
MO.FGuiGridRow_dispose = function FGuiGridRow_dispose(){
   var o = this;
   o.__base.MUiGridRow.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
MO.FGuiTable = function FGuiTable(o){
   o = MO.Class.inherits(this, o, MO.FGuiGridControl);
   o.oeUpdate        = MO.FGuiTable_oeUpdate;
   o.construct       = MO.FGuiTable_construct;
   o.insertRow       = MO.FGuiTable_insertRow;
   o.dispose         = MO.FGuiTable_dispose;
   return o;
}
MO.FGuiTable_oeUpdate = function FGuiTable_oeUpdate(event){
   var o = this;
   o.__base.FGuiGridControl.oeUpdate.call(o, event);
   if(event.isBefore()){
      if(o._rowScroll < 0){
         var rows = o._rows;
         var scrollSpeed = Math.max(parseInt(-o._rowScroll / o._rowHeight), o._rowScrollSpeed);
         o._rowScroll += scrollSpeed;
         if(o._rowScroll >= 0){
            var limitCount = o._rowLimitCount;
            if(limitCount != 0){
               if(rows.count() > limitCount){
                  var row = rows.pop();
                  o.freeRow(row);
               }
            }
            o._rowScroll = 0;
         }
         o.dirty();
      }
   }
}
MO.FGuiTable_construct = function FGuiTable_construct(){
   var o = this;
   o.__base.FGuiGridControl.construct.call(o);
   o.__base.MUiGridControl.construct.call(o);
   o._rowClass = MO.FGuiGridRow;
}
MO.FGuiTable_insertRow = function FGuiTable_insertRow(row){
   var o = this;
   MO.Assert.debugNotNull(row);
   o._rows.unshift(row);
   o._rowScroll -= o._rowHeight;
   o.dirty();
}
MO.FGuiTable_dispose = function FGuiTable_dispose(){
   var o = this;
   o.__base.MUiGridControl.dispose.call(o);
   o.__base.FGuiGridControl.dispose.call(o);
}
