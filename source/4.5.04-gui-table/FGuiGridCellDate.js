//==========================================================
// <T>表格时间单元格。</T>
//
// @class
// @author maocy
// @version 150804
//==========================================================
MO.FGuiGridCellDate = function FGuiGridCellDate(o){
   o = MO.Class.inherits(this, o, MO.FGuiGridCell, MO.MUiGridCellDate);
   //..........................................................
   // @method
   o.construct = MO.FGuiGridCellDate_construct;
   // @method
   o.draw      = MO.FGuiGridCellDate_draw;
   // @method
   o.dispose   = MO.FGuiGridCellDate_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiGridCellDate_construct = function FGuiGridCellDate_construct(){
   var o = this;
   o.__base.FGuiGridCell.construct.call(o);
   o.__base.MUiGridCellDate.construct.call(o);
}

//==========================================================
// <T>绘制处理。</T>
//
// @method
// @param context:SGuiGridPaintContext 绘制环境
//==========================================================
MO.FGuiGridCellDate_draw = function FGuiGridCellDate_draw(context){
   var o = this;
   var graphic = context.graphic;
   var rectangle = context.rectangle;
   var font = context.style.font;
   var text = o.text();
   // 绘制底框
   // graphic.fillRectangle(x, y, width, height, '#122A46');
   // 绘制文字
   graphic.drawFontText(text, font, rectangle.left, rectangle.top, rectangle.width, rectangle.height, MO.EUiAlign.Center);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiGridCellDate_dispose = function FGuiGridCellDate_dispose(){
   var o = this;
   // 释放属性
   // 父处理
   o.__base.MUiGridCellDate.dispose.call(o);
   o.__base.FGuiGridCell.dispose.call(o);
}
