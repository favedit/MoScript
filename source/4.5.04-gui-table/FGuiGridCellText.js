//==========================================================
// <T>表格单元格。</T>
//
// @class
// @author maocy
// @version 150804
//==========================================================
MO.FGuiGridCellText = function FGuiGridCellText(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MUiGridCellText);
   //..........................................................
   // @method
   o.onPaint   = MO.FGuiGridCellText_onPaint;
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
// <T>绘制事件处理。</T>
//
// @method
// @return 绘制事件处理
//==========================================================
MO.FGuiGridCellText_onPaint = function FGuiGridCellText_onPaint(event){
   var o = this;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiGridCellText_construct = function FGuiGridCellText_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o.__base.MUiGridCellText.construct.call(o);
}

//==========================================================
// <T>绘制处理。</T>
//
// @method
// @return 绘制处理
//==========================================================
MO.FGuiGridCellText_draw = function FGuiGridCellText_draw(graphic, x, y, width, height){
   var o = this;
   // 获得文本
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
MO.FGuiGridCellText_dispose = function FGuiGridCellText_dispose(){
   var o = this;
   // 释放属性
   // 父处理
   o.__base.MUiGridCellText.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
