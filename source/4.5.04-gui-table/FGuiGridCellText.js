//==========================================================
// <T>表格单元格。</T>
//
// @class
// @author maocy
// @version 150804
//==========================================================
MO.FGuiGridCellText = function FGuiGridCellText(o){
   o = MO.Class.inherits(this, o, MO.FGuiGridCell, MO.MUiGridCellText);
   //..........................................................
   // @method
   o.construct = MO.FGuiGridCellText_construct;
   // @method
   o.draw      = MO.FGuiGridCellText_draw;
   // @method
   o.dispose   = MO.FGuiGridCellText_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiGridCellText_construct = function FGuiGridCellText_construct(){
   var o = this;
   o.__base.FGuiGridCell.construct.call(o);
   o.__base.MUiGridCellText.construct.call(o);
}

//==========================================================
// <T>绘制处理。</T>
//
// @method
// @param context:SGuiGridPaintContext 绘制环境
//==========================================================
MO.FGuiGridCellText_draw = function FGuiGridCellText_draw(context){
   var o = this;
   var graphic = context.graphic;
   var rectangle = context.rectangle;
   var font = context.style.font;
   var column = o._column;
   var cellPadding = column.cellPadding();
   // 获得文本
   var text = o.text();
   // 绘制底框
   // graphic.fillRectangle(x, y, width, height, '#122A46');
   var column = o._column;
   // 绘制文字
   var contentWidth = rectangle.width - cellPadding.right;
   graphic.drawFontText(text, font, rectangle.left, rectangle.top, contentWidth, rectangle.height, column.textAlign());
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiGridCellText_dispose = function FGuiGridCellText_dispose(){
   var o = this;
   // 释放属性
   // 父处理
   o.__base.MUiGridCellText.dispose.call(o);
   o.__base.FGuiGridCell.dispose.call(o);
}
