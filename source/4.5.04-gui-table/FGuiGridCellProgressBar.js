//==========================================================
// <T>表格进度条单元格。</T>
//
// @class
// @author sunpeng
// @version 151125
//==========================================================
MO.FGuiGridCellProgressBar = function FGuiGridCellProgressBar(o) {
   o = MO.Class.inherits(this, o, MO.FGuiGridCell, MO.MUiGridCellPicture);
   //..........................................................
   // @method
   o.construct = MO.FGuiGridCellProgressBar_construct;
   // @method
   o.testReady = MO.FGuiGridCellProgressBar_testReady;
   o.draw      = MO.FGuiGridCellProgressBar_draw;
   // @method
   o.dispose   = MO.FGuiGridCellProgressBar_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiGridCellProgressBar_construct = function FGuiGridCellProgressBar_construct() {
   var o = this;
   o.__base.FGuiGridCell.construct.call(o);
   o.__base.MUiGridCellPicture.construct.call(o);
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @method
// @return Boolean 是否测试好
//==========================================================
MO.FGuiGridCellProgressBar_testReady = function FGuiGridCellProgressBar_testReady() {
   var o = this;
   var bgImage = o._column._bgImage;
   var fillImage = o._column._fillImage;
   if (bgImage && fillImage) {
      return (bgImage.testReady() && fillImage.testReady());
   }
   return false;
}

//==========================================================
// <T>绘制处理。</T>
//
// @method
// @param context:SGuiGridPaintContext 绘制环境
//==========================================================
MO.FGuiGridCellProgressBar_draw = function FGuiGridCellProgressBar_draw(context) {
   var o = this;
   var graphic = context.graphic;
   var rectangle = context.rectangle;

   var bgImage = o._column._bgImage;
   var fillImage = o._column._fillImage;

   var imageSize = bgImage.size();
   var imageWidth = bgImage.width;
   var imageHeight = bgImage.height;
   var rectangleHeight = rectangle.height;
   var align = o._column._align;
   var imageX = 0;
   var imageY = rectangle.top;
   if (rectangleHeight >= imageHeight) {
      imageY = (rectangleHeight / 2) - (imageHeight / 2) + imageY + 3;
   } else {
      imageY = imageY - (imageHeight - rectangleHeight);
   }

   if (align == MO.EUiAlign.Left) {
      imageX = rectangle.left;
   } else if (align == MO.EUiAlign.Center) {
      imageX = (rectangle.width / 2) - (imageWidth / 2) + rectangle.left;
   } else if (align == MO.EUiAlign.Right) {
      imageX = (rectangle.width / 2) + (imageWidth / 2) + rectangle.left;
   }
   var drawScale = o._column._drawScale;

   graphic.drawImage(bgImage, imageX, imageY, imageWidth * drawScale, imageHeight * drawScale);

   var percent = o.value() / o._column.maxValue();
   var clipWidth = imageWidth * drawScale * percent;
   var clipHeight = imageHeight * drawScale;
   graphic._handle.save();
   graphic._handle.rect(imageX, imageY, clipWidth, clipHeight);
   graphic._handle.clip();
   graphic.drawImage(fillImage, imageX, imageY, imageWidth * drawScale, imageHeight * drawScale);
   graphic._handle.restore();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiGridCellProgressBar_dispose = function FGuiGridCellProgressBar_dispose() {
   var o = this;
   // 释放属性
   // 父处理
   o.__base.MUiGridCellPicture.dispose.call(o);
   o.__base.FGuiGridCell.dispose.call(o);
}
