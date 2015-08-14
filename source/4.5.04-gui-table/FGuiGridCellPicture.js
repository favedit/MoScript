//==========================================================
// <T>表格单元格。</T>
//
// @class
// @author maocy
// @version 150804
//==========================================================
MO.FGuiGridCellPicture = function FGuiGridCellPicture(o) {
   o = MO.Class.inherits(this, o, MO.FGuiGridCell, MO.MUiGridCellText);
   //..........................................................
   // @attribute
   o._image = null;
   //..........................................................
   // @method
   o.onPaint = MO.FGuiGridCellPicture_onPaint;
   //..........................................................
   // @method
   o.construct = MO.FGuiGridCellPicture_construct;
   // @method
   o.draw = MO.FGuiGridCellPicture_draw;
   // @method
   o.dispose = MO.FGuiGridCellPicture_dispose;
   return o;
}

//==========================================================
// <T>绘制事件处理。</T>
//
// @method
// @return 绘制事件处理
//==========================================================
MO.FGuiGridCellPicture_onPaint = function FGuiGridCellPicture_onPaint(event) {
   var o = this;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiGridCellPicture_construct = function FGuiGridCellPicture_construct() {
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
MO.FGuiGridCellPicture_draw = function FGuiGridCellPicture_draw(context){
   var o = this;
   var graphic = context.graphic;
   var rectangle = context.rectangle;
   // 获得文本
   var imageurl = o.text();
   // 创建图片
   var image = o._image = MO.Console.find(MO.FImageConsole).load(imageurl);
   image.testReady();
   var imageSize   = image.size();
   var imageWidth  = imageSize.width;
   var imageHeight = imageSize.height;
   var imageX = (rectangle.width / 2) - (imageWidth / 2) + rectangle.left;
   var imageY = (rectangle.height / 2) - (imageHeight / 2) + rectangle.right;
   // 绘制图片
   graphic.drawImage(image, imageX, imageY, imageWidth, imageHeight);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiGridCellPicture_dispose = function FGuiGridCellPicture_dispose() {
   var o = this;
   // 释放属性
   // 父处理
   o.__base.MUiGridCellText.dispose.call(o);
   o.__base.FGuiGridCell.dispose.call(o);
}