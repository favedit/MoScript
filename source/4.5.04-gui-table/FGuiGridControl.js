//==========================================================
// <T>界面控件。</T>
//
// @class
// @author maocy
// @version 150804
//==========================================================
MO.FGuiGridControl = function FGuiGridControl(o){
   o = MO.Class.inherits(this, o, MO.FGuiControl, MO.MUiGridControl);
   //..........................................................
   // @attribute
   //..........................................................
   // @event
   o.onPaintBegin = MO.FGuiGridControl_onPaintBegin;
   //..........................................................
   // @method
   o.construct    = MO.FGuiGridControl_construct;
   o.dispose      = MO.FGuiGridControl_dispose;
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FGuiGridControl_onPaintBegin = function FGuiGridControl_onPaintBegin(event){
   var o = this;
   // 绘制边框
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   graphic.drawRectangle(left, top, width, height, '#FF0000', 1);
   var drawLeft = left + 12;
   // 计算列总长
   var gridWidth = width - 24;
   var columnWidthTotal = 0;
   var columns = o._columns;
   var columnCount = columns.count();
   for(var i = 0; i < columnCount; i++){
      var column = columns.at(i);
      columnWidthTotal += column.width();
   }
   //..........................................................
   // 绘制表头
   var columnX = drawLeft;
   var columnY = top + 12;
   var headTextTop = columnY + 0;
   var headHeight = o._headHeight;
   for(var i = 0; i < columnCount; i++){
      var column = columns.at(i);
      var columnLabel = column.label();
      var columnWidth = gridWidth * column.width() / columnWidthTotal;
      var columnFont = column.font();
      // 绘制底框
      graphic.fillRectangle(columnX, columnY, columnWidth - 4, o._headHeight, '#122A46');
      // 绘制文字
      graphic.drawFontText(columnLabel, columnFont, columnX, columnY, columnWidth, headHeight, MO.EUiDock.Center);
      //graphic.setFont(columnFont);
      //var columnTextWidth = graphic.textWidth(columnLabel);
      //graphic.drawText(columnLabel, columnX + (columnWidth - columnTextWidth - 4) * 0.5, headTextTop, '#00B2F2');
      columnX += columnWidth;
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiGridControl_construct = function FGuiGridControl_construct(){
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o.__base.MUiGridControl.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiGridControl_dispose = function FGuiGridControl_dispose(){
   var o = this;
   // 父处理
   o.__base.MUiGridControl.dispose.call(o);
   o.__base.FGuiControl.dispose.call(o);
}
