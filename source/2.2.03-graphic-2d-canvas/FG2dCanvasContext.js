//==========================================================
// <T>WebGL渲染环境。</T>
//
// @author maocy
// @refer https://www.khronos.org/registry/webgl
// @history 141230
//==========================================================
MO.FG2dCanvasContext = function FG2dCanvasContext(o) {
   o = MO.Class.inherits(this, o, MO.FG2dContext);
   //..........................................................
   // @attribute
   o._handle              = null;
   // @attribute
   o._gridSourceX         = null;
   o._gridSourceY         = null;
   o._gridSourceWidth     = null;
   o._gridSourceHeight    = null;
   o._gridDrawX           = null;
   o._gridDrawY           = null;
   o._gridDrawWidth       = null;
   o._gridDrawHeight      = null;
   //..........................................................
   // @method
   o.construct            = MO.FG2dCanvasContext_construct;
   // @method
   o.linkCanvas           = MO.FG2dCanvasContext_linkCanvas;
   // @method
   o.setScale             = MO.FG2dCanvasContext_setScale;
   o.setFont              = MO.FG2dCanvasContext_setFont;
   // @method
   o.store                = MO.FG2dCanvasContext_store;
   o.restore              = MO.FG2dCanvasContext_restore;
   // @method
   o.clear                = MO.FG2dCanvasContext_clear;
   o.clearRectangle       = MO.FG2dCanvasContext_clearRectangle;
   // @method
   o.textWidth            = MO.FG2dCanvasContext_textWidth;
   // @method
   o.createLinearGradient = MO.FG2dCanvasContext_createLinearGradient;
   // @method
   o.drawLine             = MO.FG2dCanvasContext_drawLine;
   o.drawRectangle        = MO.FG2dCanvasContext_drawRectangle;
   o.drawTriangle         = MO.FG2dCanvasContext_drawTriangle;
   o.drawCircle           = MO.FG2dCanvasContext_drawCircle;
   o.drawText             = MO.FG2dCanvasContext_drawText;
   o.drawImage            = MO.FG2dCanvasContext_drawImage;
   o.drawGridImage        = MO.FG2dCanvasContext_drawGridImage;
   o.drawQuadrilateral    = MO.FG2dCanvasContext_drawQuadrilateral;
   // @method
   o.drawBorderLine       = MO.FG2dCanvasContext_drawBorderLine;
   o.drawBorder           = MO.FG2dCanvasContext_drawBorder;
   // @method
   o.fillRectangle        = MO.FG2dCanvasContext_fillRectangle;
   // @method
   o.toBytes              = MO.FG2dCanvasContext_toBytes;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FG2dCanvasContext_construct = function FG2dCanvasContext_construct() {
   var o = this;
   o.__base.FG2dContext.construct.call(o);

   o._gridSourceX = new Array(3);
   o._gridSourceY = new Array(3);
   o._gridSourceWidth = new Array(3);
   o._gridSourceHeight = new Array(3);
   o._gridDrawX = new Array(3);
   o._gridDrawY = new Array(3);
   o._gridDrawWidth = new Array(3);
   o._gridDrawHeight = new Array(3);
}

//==========================================================
// <T>关联页面画布标签。</T>
//
// @method
// @param hCanvas:HtmlCanvasTag 页面画布标签
//==========================================================
MO.FG2dCanvasContext_linkCanvas = function FG2dCanvasContext_linkCanvas(hCanvas) {
   var o = this;
   o.__base.FG2dContext.linkCanvas.call(o, hCanvas);
   // 获得环境
   if (hCanvas.getContext) {
      // 初始化对象
      var handle = hCanvas.getContext('2d');
      if (!handle) {
         throw new MO.TError(o, "Current browser can't support Context2D technique.");
      }
      o._handle = handle;
   }
   o._hCanvas = hCanvas;
}

//==========================================================
// <T>设置缩放。</T>
//
// @method
// @param width:Number 横向缩放
// @param height:Number 纵向缩放
//==========================================================
MO.FG2dCanvasContext_setScale = function FG2dCanvasContext_setScale(width, height){
   var o = this;
   if(!o._scale.equalsData(width, height)){
      o._handle.scale(width, height);
      o._scale.set(width, height);
   }
}

//==========================================================
// <T>设置字体。</T>
//
// @method
// @param font:String 字体
//==========================================================
MO.FG2dCanvasContext_setFont = function FG2dCanvasContext_setFont(font) {
   this._handle.font = font;
}

//==========================================================
// <T>存储当前状态。</T>
//
// @method
//==========================================================
MO.FG2dCanvasContext_store = function FG2dCanvasContext_store(){
   this._handle.save();
}

//==========================================================
// <T>回复当前状态。</T>
//
// @method
//==========================================================
MO.FG2dCanvasContext_restore = function FG2dCanvasContext_restore(){
   this._handle.restore();
}

//==========================================================
// <T>清空内容。</T>
//
// @method
//==========================================================
MO.FG2dCanvasContext_clear = function FG2dCanvasContext_clear(){
   var o = this;
   var hCanvas = o._handle.canvas;
   var offsetWidth = hCanvas.offsetWidth;
   var offsetHeight = hCanvas.offsetHeight;
   o._size.set(offsetWidth, offsetHeight);
   var width = offsetWidth / o._scale.width;
   var height = offsetHeight / o._scale.height;
   o._handle.clearRect(0, 0, width, height);
   //var size = o._size;
   //var width = size.width / o._scale.width;
   //var height = size.height / o._scale.height;
   //o._handle.clearRect(0, 0, width, height);
}

//==========================================================
// <T>清空矩形内容。</T>
//
// @method
//==========================================================
MO.FG2dCanvasContext_clearRectangle = function FG2dCanvasContext_clearRectangle(rectangle){
   this._handle.clearRect(rectangle.left, rectangle.top, rectangle.width, rectangle.height);
}

//==========================================================
// <T>获得文本长度。</T>
//
// @method
// @param text:String 文本
// @return Integer 文本长度
//==========================================================
MO.FG2dCanvasContext_textWidth = function FG2dCanvasContext_textWidth(text){
   var info = this._handle.measureText(text);
   return info.width;
}

//==========================================================
// <T>创建线性渐变填充。</T>
//
// @method
// @param x1,y1,x2,y2:Integer 起始、终止坐标
// @return gradient 渐变
//==========================================================
MO.FG2dCanvasContext_createLinearGradient = function FG2dCanvasContext_createLinearGradient(x1, y1, x2, y2) {
   var o = this;
   var handle = o._handle;
   return handle.createLinearGradient(x1, y1, x2, y2);
}

//==========================================================
// <T>绘制直线。</T>
//
// @method
// @param x1:Integer 横坐标1
// @param y1:Integer 纵坐标1
// @param x2:Integer 横坐标2
// @param y2:Integer 纵坐标2
// @param color:String 颜色
// @param lineWidth:Integer 线宽
//==========================================================
MO.FG2dCanvasContext_drawLine = function FG2dCanvasContext_drawLine(x1, y1, x2, y2, color, lineWidth) {
   var o = this;
   var handle = o._handle;
   handle.strokeStyle = color;
   handle.lineWidth = lineWidth;
   handle.beginPath();
   handle.moveTo(x1, y1);
   handle.lineTo(x2, y2);
   handle.closePath();
   handle.stroke();
}

//==========================================================
// <T>绘制矩形。</T>
//
// @method
// @param x:Integer 横坐标
// @param y:Integer 纵坐标
// @param width:Integer 宽度
// @param height:Integer 高度
// @param color:String 颜色
// @param lineWidth:Integer 线宽
//==========================================================
MO.FG2dCanvasContext_drawRectangle = function FG2dCanvasContext_drawRectangle(x, y, width, height, color, lineWidth) {
   var o = this;
   var handle = o._handle;
   handle.strokeStyle = color;
   handle.lineWidth = lineWidth;
   handle.strokeRect(x, y, width, height);
}

//==========================================================
// <T>绘制文字。</T>
//
// @method
// @param text:String 文本
// @param x:Integer 横坐标
// @param y:Integer 纵坐标
//==========================================================
MO.FG2dCanvasContext_drawText = function FG2dCanvasContext_drawText(text, x, y, color) {
   var o = this;
   var handle = o._handle;
   handle.fillStyle = color;
   handle.fillText(text, x, y);
}

//==========================================================
// <T>绘制图像。</T>
//
// @method
// @param content:Object 图像内容
// @param x:Integer 横坐标
// @param y:Integer 纵坐标
// @param width:Integer 宽度
// @param height:Integer 高度
//==========================================================
MO.FG2dCanvasContext_drawImage = function FG2dCanvasContext_drawImage(content, x, y, width, height){
   var o = this;
   var handle = o._handle;
   var size = o._size;
   // 获得数据
   var data = null
   if(content.tagName == 'IMG'){
      data = content;
   }else if(MO.Class.isClass(content, MO.FImage)){
      data = content.image();
   }else{
      throw new MO.TError(o, 'Unknown content type');
   }
   // 绘制位图
   handle.drawImage(data, x, y, width, height);
}

//==========================================================
// <T>绘制九宫格图像。</T>
//
// @method
// @param content:Object 原始图像内容
// @param x:Integer 在父级的横向位置
// @param y:Integer 在父级的纵向位置
// @param width:Integer 要绘制宽度
// @param height:Integer 要绘制高度
// @param padding:SPadding 不参与拉伸的边界分割信息
//==========================================================
MO.FG2dCanvasContext_drawGridImage = function FG2dCanvasContext_drawGridImage(content, x, y, width, height, padding) {
   var o = this;
   var handle = o._handle;
   // 获得数据
   var data = null
   if (MO.Class.isClass(content, MO.FImage)) {
      data = content.image();
   } else {
      throw new TError(o, 'Unknown content type');
   }

   var ssize = content.size();
   var sx = o._gridSourceX;
   sx[0] = 0;
   sx[1] = padding.left;
   sx[2] = ssize.width - padding.right;
   var sy = o._gridSourceY;
   sy[0] = 0;
   sy[1] = padding.top;
   sy[2] = ssize.height - padding.bottom;
   var dx = o._gridDrawX;
   dx[0] = x;
   dx[1] = x + padding.left;
   dx[2] = x + width - padding.right;
   var dy = o._gridDrawY;
   dy[0] = y;
   dy[1] = y + padding.top;
   dy[2] = y + height - padding.bottom;
   var sw = o._gridSourceWidth;
   sw[0] = padding.left;
   sw[1] = ssize.width - padding.left - padding.right;
   sw[2] = padding.right;
   var sh = o._gridSourceHeight;
   sh[0] = padding.top;
   sh[1] = ssize.height - padding.top - padding.bottom;
   sh[2] = padding.bottom;
   var dw = o._gridDrawWidth;
   dw[0] = padding.left;
   dw[1] = width - padding.left - padding.right;
   dw[2] = padding.right;
   var dh = o._gridDrawHeight;
   dh[0] = padding.top;
   dh[1] = height - padding.top - padding.bottom;
   dh[2] = padding.bottom;
   //drawImage(image,sx,sy,sw,sh,dx,dy,dw,dh)
   for (var i = 0; i < 9; i++) {
      var row = parseInt(i / 3);
      var column = i % 3;
      if (dh[row] > 0 && dw[column] > 0) {
         handle.drawImage(data, sx[column], sy[row], sw[column], sh[row], dx[column], dy[row], dw[column], dh[row]);
      }
   }
   //handle.drawImage(data, 0, 1, 1, 1, 1, 1, 100, 100);
}

//==========================================================
// <T>绘制图像。</T>
//
// @method
// @param content:Object 图像内容
// @param rectangle:SRectangle 矩形
//==========================================================
MO.FG2dCanvasContext_drawImageRectangle = function FG2dCanvasContext_drawImageRectangle(content, rectangle){
   return this.drawImage(content, rectangle.left, rectangle.top, rectangle.width, rectangle.height);
}

//==========================================================
// <T>绘制边框线。</T>
//
// @method
// @param rectangle:SRectangle 矩形
// @param border:SBorder 边框
//==========================================================
MO.FG2dCanvasContext_drawBorderLine = function FG2dCanvasContext_drawBorderLine(x1, y1, x2, y2, borderLine){
   var o = this;
   var handle = o._handle;
   handle.strokeStyle = borderLine.color;
   handle.lineWidth = borderLine.width;
   handle.beginPath();
   handle.moveTo(x1 + 0.5, y1 + 0.5);
   handle.lineTo(x2 + 0.5, y2 + 0.5);
   handle.closePath();
   handle.stroke();
}

//==========================================================
// <T>绘制边框。</T>
//
// @method
// @param content:Object 图像内容
// @param rectangle:SRectangle 矩形
// @param border:SBorder 边框
//==========================================================
MO.FG2dCanvasContext_drawBorder = function FG2dCanvasContext_drawBorder(rectangle, border) {
   var o = this;
   // 计算位置
   var left = rectangle.left;
   var top = rectangle.top;
   var right = rectangle.left + rectangle.width - 1;
   var bottom = rectangle.top + rectangle.height - 1;
   // 绘制边框
   o.drawBorderLine(left, bottom, left, top, border.left);
   o.drawBorderLine(left - 0.5, top, right + 0.5, top, border.top);
   o.drawBorderLine(right, top, right, bottom, border.right);
   o.drawBorderLine(left - 0.5, bottom, right + 0.5, bottom, border.bottom);
}

//==========================================================
// <T>绘制矩形。</T>
//
// @method
// @param x:Integer 横坐标
// @param y:Integer 纵坐标
// @param width:Integer 宽度
// @param height:Integer 高度
// @param color:String 颜色
// @param lineWidth:Integer 线宽
//==========================================================
MO.FG2dCanvasContext_fillRectangle = function FG2dCanvasContext_fillRectangle(x, y, width, height, color) {
   var o = this;
   var handle = o._handle;
   handle.fillStyle = color;
   handle.beginPath();
   handle.fillRect(x, y, width, height);
   handle.closePath();
}

//==========================================================
// <T>绘制四边形。</T>
//
// @method
// @param x1,y1...x4,y4:Integer 四个点
// @param lineWidth:Integer 线宽
// @param strokeColor:String 描边色
// @param fillColor:String 填充色
//==========================================================
MO.FG2dCanvasContext_drawQuadrilateral = function FG2dCanvasContext_drawQuadrilateral(x1, y1, x2, y2, x3, y3, x4, y4, lineWidth, strokeColor, fillColor) {
   var o = this;
   var handle = o._handle;
   handle.beginPath();
   handle.lineWidth = lineWidth;
   handle.strokeStyle = strokeColor;
   handle.fillStyle = fillColor;
   handle.moveTo(x1 + 0.5, y1 + 0.5);
   handle.lineTo(x2 + 0.5, y2 + 0.5);
   handle.lineTo(x3 + 0.5, y3 + 0.5);
   handle.lineTo(x4 + 0.5, y4 + 0.5);
   handle.lineTo(x1 + 0.5, y1 + 0.5);
   handle.closePath();
   if(lineWidth != null && strokeColor != null){
      handle.stroke();
   }
   if (fillColor != null) {
      handle.fill();
   }
}

//==========================================================
// <T>绘制三角形。</T>
//
// @method
// @param x1,y1,x2,y2,x3,y3:Integer 三个点的坐标
// @param lineWidth:Integer 线宽
// @param strokeColor:String 边线色
// @param fillColor:String 填充色
//==========================================================
MO.FG2dCanvasContext_drawTriangle = function FG2dCanvasContext_drawTriangle(x1, y1, x2, y2, x3, y3, lineWidth, strokeColor, fillColor) {
   var o = this;
   var handle = o._handle;
   handle.lineWidth = lineWidth;
   handle.strokeStyle = strokeColor;
   handle.fillStyle = fillColor;
   handle.beginPath();
   handle.moveTo(x1 + 0.5, y1 + 0.5);
   handle.lineTo(x2 + 0.5, y2 + 0.5);
   handle.lineTo(x3 + 0.5, y3 + 0.5);
   handle.closePath();
   handle.fill();
   handle.stroke();
}

//==========================================================
// <T>画圈。</T>
//
// @method
// @param x,y:Integer 圆心坐标
// @param radius:Integer 半径
// @param lineWidth:Integer 线宽
// @param strokeColor:String 边线色
// @param fillColor:String 填充色
//==========================================================
MO.FG2dCanvasContext_drawCircle = function FG2dCanvasContext_drawCircle(x, y, radius, lineWidth, strokeColor, fillColor) {
   var o = this;
   var handle = o._handle;
   handle.lineWidth = lineWidth;
   handle.strokeStyle = strokeColor;
   handle.fillStyle = fillColor;
   handle.beginPath();
   handle.arc(x, y, radius, 0, 2 * Math.PI, false);
   handle.closePath();
   handle.fill();
   handle.stroke();
}

//==========================================================
// <T>获得数据。</T>
//
// @method
// @return Uint8Array 数据
//==========================================================
MO.FG2dCanvasContext_toBytes = function FG2dCanvasContext_toBytes() {
   var o = this;
   var size = o._size;
   return o._handle.getImageData(0, 0, size.width, size.height);
}
