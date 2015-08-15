MO.SGuiGridPaintContext = function SGuiGridPaintContext(){
   var o = this;
   o.graphic   = null;
   o.rectangle = new MO.SRectangle();
   o.style     = new MO.SUiGridCellStyle();
   o.dispose   = MO.SGuiGridPaintContext_dispose;
   return o;
}
MO.SGuiGridPaintContext_dispose = function SGuiGridPaintContext_dispose(){
   var o = this;
   o.graphic = null;
   o.rectangle = MO.Lang.Object.dispose(o.rectangle);
   o.style = MO.Lang.Object.dispose(o.style);
}
MO.FGuiGridCell = function FGuiGridCell(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MUiGridCell);
   o.onPaint   = MO.FGuiGridCell_onPaint;
   o.construct = MO.FGuiGridCell_construct;
   o.testReady = MO.Method.emptyTrue;
   o.draw      = MO.Method.empty;
   o.dispose   = MO.FGuiGridCell_dispose;
   return o;
}
MO.FGuiGridCell_construct = function FGuiGridCell_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o.__base.MUiGridCell.construct.call(o);
}
MO.FGuiGridCell_dispose = function FGuiGridCell_dispose(){
   var o = this;
   o.__base.MUiGridCell.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
MO.FGuiGridCellCurrency = function FGuiGridCellCurrency(o){
   o = MO.Class.inherits(this, o, MO.FGuiGridCell, MO.MUiGridCellCurrency);
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
   o.__base.FGuiGridCell.construct.call(o);
   o.__base.MUiGridCellCurrency.construct.call(o);
   o._numberFont = new MO.SUiFont();
}
MO.FGuiGridCellCurrency_formatText = function FGuiGridCellCurrency_formatText(value){
   return this.__base.MUiGridColumnDate.formatText.call(this, value)
}
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
   var cellPadding = column.cellPadding();
   var value = o.value();
   var text = o.text();
   var textLength = text.length;
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
   o.__base.MUiGridCellCurrency.dispose.call(o);
   o.__base.FGuiGridCell.dispose.call(o);
}
MO.FGuiGridCellDate = function FGuiGridCellDate(o){
   o = MO.Class.inherits(this, o, MO.FGuiGridCell, MO.MUiGridCellDate);
   o.construct = MO.FGuiGridCellDate_construct;
   o.draw      = MO.FGuiGridCellDate_draw;
   o.dispose   = MO.FGuiGridCellDate_dispose;
   return o;
}
MO.FGuiGridCellDate_construct = function FGuiGridCellDate_construct(){
   var o = this;
   o.__base.FGuiGridCell.construct.call(o);
   o.__base.MUiGridCellDate.construct.call(o);
}
MO.FGuiGridCellDate_draw = function FGuiGridCellDate_draw(context){
   var o = this;
   var graphic = context.graphic;
   var rectangle = context.rectangle;
   var font = context.style.font;
   var text = o.text();
   graphic.drawFontText(text, font, rectangle.left, rectangle.top, rectangle.width, rectangle.height, MO.EUiAlign.Center);
}
MO.FGuiGridCellDate_dispose = function FGuiGridCellDate_dispose(){
   var o = this;
   o.__base.MUiGridCellDate.dispose.call(o);
   o.__base.FGuiGridCell.dispose.call(o);
}
MO.FGuiGridCellPicture = function FGuiGridCellPicture(o) {
   o = MO.Class.inherits(this, o, MO.FGuiGridCell, MO.MUiGridCellPicture);
   o._image    = null;
   o.construct = MO.FGuiGridCellPicture_construct;
   o.testReady = MO.FGuiGridCellPicture_testReady;
   o.setValue  = MO.FGuiGridCellPicture_setValue;
   o.draw      = MO.FGuiGridCellPicture_draw;
   o.dispose   = MO.FGuiGridCellPicture_dispose;
   return o;
}
MO.FGuiGridCellPicture_construct = function FGuiGridCellPicture_construct() {
   var o = this;
   o.__base.FGuiGridCell.construct.call(o);
   o.__base.MUiGridCellPicture.construct.call(o);
}
MO.FGuiGridCellPicture_testReady = function FGuiGridCellPicture_testReady(){
   var o = this;
   var image = o._image;
   if(image){
      return image.testReady();
   }
   return true;
}
MO.FGuiGridCellPicture_draw = function FGuiGridCellPicture_draw(context) {
   var o = this;
   var graphic = context.graphic;
   var rectangle = context.rectangle;
   var imageurl = o.text();
   var image = o._image;
   if(!image){
      return;
   }
   var imageSize = image.size();
   var imageWidth = imageSize.width;
   var imageHeight = imageSize.height;
   var align = o._column._align;
   var imageX = 0;
   var imageY = (rectangle.height / 2) - (imageHeight / 2) + rectangle.top;
   if (align == MO.EUiAlign.Left) {
      imageX = rectangle.left;
   } else if (align == MO.EUiAlign.Center) {
      imageX = (rectangle.width / 2) - (imageWidth / 2) + rectangle.left;
   } else if (align == MO.EUiAlign.Right) {
      imageX = (rectangle.width / 2) + (imageWidth / 2) + rectangle.left;
   }
   graphic.drawImage(image, imageX, imageY, imageWidth, imageHeight);
}
MO.FGuiGridCellPicture_setValue = function FGuiGridCellPicture_setValue(value){
   var o = this;
   o.__base.FGuiGridCell.setValue.call(o, value);
   var url = o.text();
   if(MO.Lang.String.isEmpty(url)){
      o._image = null;
   }else{
      o._image = MO.Console.find(MO.FImageConsole).load(url);
   }
}
MO.FGuiGridCellPicture_dispose = function FGuiGridCellPicture_dispose() {
   var o = this;
   o.__base.MUiGridCellPicture.dispose.call(o);
   o.__base.FGuiGridCell.dispose.call(o);
}
MO.FGuiGridCellText = function FGuiGridCellText(o){
   o = MO.Class.inherits(this, o, MO.FGuiGridCell, MO.MUiGridCellText);
   o.construct = MO.FGuiGridCellText_construct;
   o.draw      = MO.FGuiGridCellText_draw;
   o.dispose   = MO.FGuiGridCellText_dispose;
   return o;
}
MO.FGuiGridCellText_construct = function FGuiGridCellText_construct(){
   var o = this;
   o.__base.FGuiGridCell.construct.call(o);
   o.__base.MUiGridCellText.construct.call(o);
}
MO.FGuiGridCellText_draw = function FGuiGridCellText_draw(context){
   var o = this;
   var graphic = context.graphic;
   var rectangle = context.rectangle;
   var font = context.style.font;
   var text = o.text();
   graphic.drawFontText(text, font, rectangle.left, rectangle.top, rectangle.width, rectangle.height, MO.EUiAlign.Center);
}
MO.FGuiGridCellText_dispose = function FGuiGridCellText_dispose(){
   var o = this;
   o.__base.MUiGridCellText.dispose.call(o);
   o.__base.FGuiGridCell.dispose.call(o);
}
MO.FGuiGridColumn = function FGuiGridColumn(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MUiGridColumn);
   o.construct = MO.FGuiGridColumn_construct;
   o.testReady = MO.Method.emptyTrue;
   o.draw      = MO.FGuiGridColumn_draw;
   o.dispose   = MO.FGuiGridColumn_dispose;
   return o;
}
MO.FGuiGridColumn_construct = function FGuiGridColumn_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o.__base.MUiGridColumn.construct.call(o);
}
MO.FGuiGridColumn_draw = function FGuiGridColumn_draw(context){
   var o = this;
   var graphic = context.graphic;
   var rectangle = context.rectangle;
   var padding = o._padding;
   var contentX = rectangle.left + padding.left;
   var contentY = rectangle.top + padding.top;
   var contentWidth = rectangle.width - padding.left - padding.right;
   var contentHeight = rectangle.height - padding.top - padding.bottom;
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
MO.FGuiGridColumnPicture = function FGuiGridColumnPicture(o) {
   o = MO.Class.inherits(this, o, MO.FGuiGridColumn, MO.MUiGridColumnText);
   o._align   = MO.Class.register(o, new MO.AGetSet('_align'));
   o.construct = MO.FGuiGridColumnPicture_construct;
   o.dispose   = MO.FGuiGridColumnPicture_dispose;
   return o;
}
MO.FGuiGridColumnPicture_construct = function FGuiGridColumnPicture_construct() {
   var o = this;
   o.__base.FGuiGridColumn.construct.call(o);
   o.__base.MUiGridColumnText.construct.call(o);
   o._cellClass = MO.FGuiGridCellPicture;
}
MO.FGuiGridColumnPicture_dispose = function FGuiGridColumnPicture_dispose() {
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
   o._optionClip     = MO.Class.register(o, new MO.AGetSet('_optionClip'), true);
   o._rowScroll      = 0;
   o._rowScrollSpeed = 1;
   o._paintContext   = null;
   o.onPaintBegin    = MO.FGuiGridControl_onPaintBegin;
   o.construct       = MO.FGuiGridControl_construct;
   o.dispose         = MO.FGuiGridControl_dispose;
   return o;
}
MO.FGuiGridControl_onPaintBegin = function FGuiGridControl_onPaintBegin(event){
   var o = this;
   var dirty = false;
   var padding = o._padding;
   var context = o._paintContext;
   var contextStyle = context.style;
   var contextRectangle = context.rectangle;
   var graphic = event.graphic;
   context.graphic = graphic;
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
         if(!column.testReady()){
            dirty = true;
            continue;
         }
         var columnWidth = gridWidth * column.width() / columnWidthTotal;
         contextRectangle.set(columnX, columnY, columnWidth, headHeight);
         column.draw(context);
         columnX += columnWidth;
      }
      drawY += headHeight;
   }
   var rowsHeight = bottom - drawY;
   var rowHeight = o._rowHeight;
   if(o._optionClip){
      graphic.clip(drawX, drawY, gridWidth, rowsHeight);
   }
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
            if(!cell.testReady()){
               dirty = true;
               continue;
            }
            cell.calculateStyle(contextStyle);
            contextRectangle.set(columnX, drawY, columnWidth, rowHeight);
            cell.draw(context);
            columnX += columnWidth;
         }
      }
      drawY += rowHeight;
      if(drawY > bottom){
         break;
      }
   }
   if(dirty){
      o.dirty();
   }
}
MO.FGuiGridControl_construct = function FGuiGridControl_construct(){
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o.__base.MUiGridControl.construct.call(o);
   o._rowClass = MO.FGuiGridRow;
   o._paintContext = new MO.SGuiGridPaintContext();
}
MO.FGuiGridControl_dispose = function FGuiGridControl_dispose(){
   var o = this;
   o._rowClass = null;
   o._paintContext = MO.Lang.Object.dispose(o._paintContext);
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
