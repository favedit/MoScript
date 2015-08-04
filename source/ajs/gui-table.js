MO.FGuiGridCellText = function FGuiGridCellText(o){
   o = MO.Class.inherits(this, o, MO.FUiGridCellText);
   o.onPaint = MO.FGuiGridCellText_onPaint;
   o.paint   = MO.FGuiGridCellText_paint;
   o.dispose = MO.FGuiGridCellText_dispose;
   return o;
}
MO.FGuiGridCellText_onPaint = function FGuiGridCellText_onPaint(event){
   var o = this;
}
MO.FGuiGridCellText_paint = function FGuiGridCellText_paint(){
   var o = this;
}
MO.FGuiGridCellText_dispose = function FGuiGridCellText_dispose(){
   var o = this;
   o._grid = null;
   o._column = null;
   o._row = null;
   o.__base.FUiGridCellText.dispose.call(o);
}
MO.FGuiGridColumnText = function FGuiGridColumnText(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MUiGridColumn, MO.MUiGridColumnText);
   o.construct  = MO.FGuiGridColumnText_construct;
   o.createCell = MO.FGuiGridColumnText_createCell;
   o.dispose    = MO.FGuiGridColumnText_dispose;
   return o;
}
MO.FGuiGridColumnText_construct = function FGuiGridColumnText_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o.__base.MUiGridColumn.construct.call(o);
}
MO.FGuiGridColumnText_createCell = function FGuiGridColumnText_createCell(){
   return MO.Class.create(MO.FGuiGridCellText);
}
MO.FGuiGridColumnText_dispose = function FGuiGridColumnText_dispose(){
   var o = this;
   o.__base.MUiGridColumn.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
MO.FGuiGridControl = function FGuiGridControl(o){
   o = MO.Class.inherits(this, o, MO.FGuiControl, MO.MUiGridControl);
   o.onPaintBegin = MO.FGuiGridControl_onPaintBegin;
   o.construct    = MO.FGuiGridControl_construct;
   o.dispose      = MO.FGuiGridControl_dispose;
   return o;
}
MO.FGuiGridControl_onPaintBegin = function FGuiGridControl_onPaintBegin(event){
   var o = this;
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   graphic.drawRectangle(left, top, width, height, '#FF0000', 1);
   var drawLeft = left + 12;
   var gridWidth = width - 24;
   var columnWidthTotal = 0;
   var columns = o._columns;
   var columnCount = columns.count();
   for(var i = 0; i < columnCount; i++){
      var column = columns.at(i);
      columnWidthTotal += column.width();
   }
   var columnX = drawLeft;
   var columnY = top + 12;
   var headTextTop = columnY + 0;
   var headHeight = o._headHeight;
   for(var i = 0; i < columnCount; i++){
      var column = columns.at(i);
      var columnLabel = column.label();
      var columnWidth = gridWidth * column.width() / columnWidthTotal;
      var columnFont = column.font();
      graphic.fillRectangle(columnX, columnY, columnWidth - 4, o._headHeight, '#122A46');
      graphic.drawFontText(columnLabel, columnFont, columnX, columnY, columnWidth, headHeight, MO.EUiDock.Center);
      columnX += columnWidth;
   }
}
MO.FGuiGridControl_construct = function FGuiGridControl_construct(){
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o.__base.MUiGridControl.construct.call(o);
}
MO.FGuiGridControl_dispose = function FGuiGridControl_dispose(){
   var o = this;
   o.__base.MUiGridControl.dispose.call(o);
   o.__base.FGuiControl.dispose.call(o);
}
