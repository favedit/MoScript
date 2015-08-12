//==========================================================
// <T>表格单元格。</T>
//
// @class
// @author maocy
// @version 150804
//==========================================================
MO.FGuiGridCellImage = function FGuiGridCellImage(o) {
   o = MO.Class.inherits(this, o, MO.FObject, MO.MUiGridCellText);
   //..........................................................
   // @attribute
   o._image           = null;
   //..........................................................
   // @method
   o.onPaint = MO.FGuiGridCellImage_onPaint;
   //..........................................................
   // @method
   o.construct = MO.FGuiGridCellImage_construct;
   // @method
   o.draw = MO.FGuiGridCellImage_draw;
   // @method
   o.dispose = MO.FGuiGridCellImage_dispose;
   return o;
}

//==========================================================
// <T>绘制事件处理。</T>
//
// @method
// @return 绘制事件处理
//==========================================================
MO.FGuiGridCellImage_onPaint = function FGuiGridCellImage_onPaint(event) {
   var o = this;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiGridCellImage_construct = function FGuiGridCellImage_construct() {
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
MO.FGuiGridCellImage_draw = function FGuiGridCellImage_draw(graphic, x, y, width, height) {
   var o = this;
   var imageConsole = MO.Console.find(MO.FImageConsole);
   // 获得文本
   var imageurl = o.text();
   // 创建图片
   var image = o._image = imageConsole.load(imageurl);
   image.testReady();
   // 绘制图片
   graphic.drawImage(image, x, y,image.size().width,image.size().height);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiGridCellImage_dispose = function FGuiGridCellImage_dispose() {
   var o = this;
   // 释放属性
   // 父处理
   o.__base.MUiGridCellText.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}