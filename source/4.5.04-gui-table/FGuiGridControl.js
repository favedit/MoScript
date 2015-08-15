//==========================================================
// <T>界面控件。</T>
//
// @class
// @author maocy
// @version 150804
//==========================================================
MO.FGuiGridControl = function FGuiGridControl(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl, MO.MUiGridControl);
   //..........................................................
   // @attribute
   o._optionClip = MO.Class.register(o, new MO.AGetSet('_optionClip'), true);
   o._headPadding = MO.Class.register(o, new MO.AGetter('_headPadding'));
   // @attribute
   o._rowScroll = 0;
   o._rowScrollSpeed = 1;
   // @attribute
   o._paintContext = null;
   //..........................................................
   // @event
   o.onPaintBegin = MO.FGuiGridControl_onPaintBegin;
   //..........................................................
   // @method
   o.construct = MO.FGuiGridControl_construct;
   // @method
   o.dispose = MO.FGuiGridControl_dispose;
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FGuiGridControl_onPaintBegin = function FGuiGridControl_onPaintBegin(event) {
   var o = this;
   var dirty = false;
   var padding = o._padding;
   var context = o._paintContext;
   var contextStyle = context.style;
   var contextRectangle = context.rectangle;
   var graphic = event.graphic;
   context.graphic = graphic;
   // 绘制边框
   var rectangle = event.rectangle;
   var left = rectangle.left + padding.left;
   var top = rectangle.top + padding.top;
   var bottom = rectangle.bottom() - padding.bottom;
   var width = rectangle.width - padding.left - padding.right;
   var height = rectangle.height - padding.top - padding.bottom;
   //graphic.drawRectangle(left, top, width, height, '#FF0000', 1);
   var headPadding = o._headPadding;
   var drawX = left;
   var drawY = top + headPadding.top;;
   // 计算列总长
   var gridWidth = width;
   var columnWidthTotal = 0;
   var columns = o._columns;
   var columnCount = columns.count();
   for (var i = 0; i < columnCount; i++) {
      var column = columns.at(i);
      columnWidthTotal += column.width();
   }
   //..........................................................
   // 绘制表头
   if (o._displayHead) {      
      var columnX = drawX;
      var columnY = drawY;
      var headTextTop = columnY + 0;
      var headHeight = o._headHeight;
      for (var i = 0; i < columnCount; i++) {
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
      drawY += headHeight + headPadding.bottom;
   }
   //..........................................................
   // 计算可绘制行数
   var rowsHeight = bottom - drawY;
   var rowHeight = o._rowHeight;
   if (o._optionClip) {
      graphic.clip(drawX, drawY, gridWidth, rowsHeight);
   }
   //..........................................................
   // 绘制数据
   var rows = o._rows;
   var rowCount = rows.count();
   drawY += o._rowScroll;
   for (var rowIndex = 0; rowIndex < rowCount; rowIndex++) {
      var columnX = drawX;
      if (drawY > -rowHeight) {
         var row = rows.at(rowIndex);
         for (var i = 0; i < columnCount; i++) {
            var column = columns.at(i);
            var dataName = column.dataName();
            var columnWidth = gridWidth * column.width() / columnWidthTotal;
            // 绘制单元格
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
      if (drawY > bottom) {
         break;
      }
   }
   // 脏处理
   if(dirty){
      o.dirty();
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiGridControl_construct = function FGuiGridControl_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o.__base.MUiGridControl.construct.call(o);
   // 设置变量
   o._rowClass = MO.FGuiGridRow;
   o._paintContext = new MO.SGuiGridPaintContext();
   o._headPadding = new MO.SPadding();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiGridControl_dispose = function FGuiGridControl_dispose() {
   var o = this;
   o._rowClass = null;
   o._headPadding = null;
   o._paintContext = MO.Lang.Object.dispose(o._paintContext);
   // 父处理
   o.__base.MUiGridControl.dispose.call(o);
   o.__base.FGuiControl.dispose.call(o);
}
