//==========================================================
// <T>表格单元格。</T>
//
// @class
// @author maocy
// @version 150804
//==========================================================
MO.FGuiGridCellPicture = function FGuiGridCellPicture(o) {
   o = MO.Class.inherits(this, o, MO.FGuiGridCell, MO.MUiGridCellPicture);
   //..........................................................
   // @attribute
   o._image = null;
   //..........................................................
   // @method
   o.construct = MO.FGuiGridCellPicture_construct;
   // @method
   o.testReady = MO.FGuiGridCellPicture_testReady;
   o.setValue  = MO.FGuiGridCellPicture_setValue;
   o.draw      = MO.FGuiGridCellPicture_draw;
   // @method
   o.dispose = MO.FGuiGridCellPicture_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiGridCellPicture_construct = function FGuiGridCellPicture_construct() {
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
MO.FGuiGridCellPicture_testReady = function FGuiGridCellPicture_testReady() {
   var o = this;
   var image = o._image;
   if (image) {
      return image.testReady();
   }
   return true;
}

//==========================================================
// <T>绘制处理。</T>
//
// @method
// @param context:SGuiGridPaintContext 绘制环境
//==========================================================
MO.FGuiGridCellPicture_draw = function FGuiGridCellPicture_draw(context) {
   var o = this;
   var graphic = context.graphic;
   var rectangle = context.rectangle;
   // 获得文本
   var imageurl = o.text();
   // 创建图片
   var image = o._image;
   if (!image) {
      return;
   }
   var imageSize = image.size();
   var imageWidth = imageSize.width;
   var imageHeight = imageSize.height;
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
   // 绘制图片
   graphic.drawImage(image, imageX, imageY, imageWidth * drawScale, imageHeight * drawScale);
}

//==========================================================
// <T>设置内容。</T>
//
// @method
//==========================================================
MO.FGuiGridCellPicture_setValue = function FGuiGridCellPicture_setValue(value) {
   var o = this;
   o.__base.FGuiGridCell.setValue.call(o, value);
   // 获得文本
   var url = o.text();
   if(MO.Lang.String.isEmpty(url)){
      o._image = null;
   }else{
      o._image = o._grid.loadResourceImage(url);
      //o._image = MO.Console.find(MO.FImageConsole).load(url);
   }
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
   o.__base.MUiGridCellPicture.dispose.call(o);
   o.__base.FGuiGridCell.dispose.call(o);
}