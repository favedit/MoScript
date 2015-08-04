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
   o = MO.Class.inherits(this, o, MO.FUiGridColumn);
   o._cellClass = MO.FGuiGridCellText;
   o.dispose    = MO.FGuiGridColumnText_dispose;
   return o;
}
MO.FGuiGridColumnText_dispose = function FGuiGridColumnText_dispose(){
   var o = this;
   o.__base.FUiGridColumn.dispose.call(o);
}
MO.FGuiGridControl = function FGuiGridControl(o){
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   o.onPaintBegin  = MO.FGuiGridControl_onPaintBegin;
   return o;
}
MO.FGuiGridControl_onPaintBegin = function FGuiGridControl_onPaintBegin(event){
   var o = this;
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   graphic.drawRectangle(rectangle.left, rectangle.top, rectangle.width, rectangle.height, '#FF0000', 1);
}
