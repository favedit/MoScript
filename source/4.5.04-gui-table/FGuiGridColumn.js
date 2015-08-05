//==========================================================
// <T>界面表格列。</T>
//
// @class
// @author maocy
// @version 150805
//==========================================================
MO.FGuiGridColumn = function FGuiGridColumn(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MUiGridColumn);
   //..........................................................
   // @method
   o.construct = MO.FGuiGridColumn_construct;
   // @method
   o.draw      = MO.FGuiGridColumn_draw;
   // @method
   o.dispose   = MO.FGuiGridColumn_dispose;
   return o;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiGridColumn_construct = function FGuiGridColumn_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o.__base.MUiGridColumn.construct.call(o);
}

//==========================================================
// <T>绘制处理。</T>
//
// @method
//==========================================================
MO.FGuiGridColumn_draw = function FGuiGridColumn_draw(graphic, x, y, width, height){
   var o = this;
   var padding = o._padding;
   var contentX = x + padding.left;
   var contentY = y + padding.top;
   var contentWidth = width - padding.left - padding.right;
   var contentHeight = height - padding.top - padding.bottom;
   // 绘制底框
   var backColor = o._backColor;
   if(!backColor){
      backColor = o._grid.headBackColor();
   }
   graphic.fillRectangle(contentX, contentY, contentWidth, contentHeight, backColor);
   // 绘制文字
   var font = o.findFont();
   graphic.drawFontText(o._label, font, contentX, contentY, contentWidth, contentHeight, MO.EUiAlign.Center);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiGridColumn_dispose = function FGuiGridColumn_dispose(){
   var o = this;
   // 父处理
   o.__base.MUiGridColumn.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
