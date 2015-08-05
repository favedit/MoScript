//==========================================================
// <T>表格时间单元格。</T>
//
// @class
// @author maocy
// @version 150804
//==========================================================
MO.FGuiGridCellDate = function FGuiGridCellDate(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MUiGridCellDate);
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
   o.__base.FObject.construct.call(o);
   o.__base.MUiGridCellDate.construct.call(o);
}

//==========================================================
// <T>绘制处理。</T>
//
// @method
// @return 绘制处理
//==========================================================
MO.FGuiGridCellDate_draw = function FGuiGridCellDate_draw(graphic, x, y, width, height){
   var o = this;
   // 获得字体
   var text = o.text();
   var font = o.findFont();
   // 绘制底框
   // graphic.fillRectangle(x, y, width, height, '#122A46');
   // 绘制文字
   graphic.drawFontText(text, font, x, y, width, height, MO.EUiAlign.Center);
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
   o.__base.FObject.dispose.call(o);
}
