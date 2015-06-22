with (MO) {
   //==========================================================
   // <T>WebGL渲染环境。</T>
   //
   // @author maocy
   // @refer https://www.khronos.org/registry/webgl
   // @history 141230
   //==========================================================
   MO.FG2dCanvasContext = function FG2dCanvasContext(o) {
      o = RClass.inherits(this, o, FG2dContext);
      //..........................................................
      // @attribute
      o._handle        = null;
      //..........................................................
      // @method
      o.construct      = FG2dCanvasContext_construct;
      // @method
      o.linkCanvas     = FG2dCanvasContext_linkCanvas;
      // @method
      o.setFont        = FG2dCanvasContext_setFont;
      // @method
      o.clear          = FG2dCanvasContext_clear;
      // @method
      o.drawLine       = FG2dCanvasContext_drawLine;
      o.drawRectangle  = FG2dCanvasContext_drawRectangle;
      o.drawTriangle   = FG2dCanvasContext_drawTriangle;
      o.drawText       = FG2dCanvasContext_drawText;
      o.drawImage      = FG2dCanvasContext_drawImage;
      // @method
      o.drawBorderLine = FG2dCanvasContext_drawBorderLine;
      o.drawBorder     = FG2dCanvasContext_drawBorder;
      o.drawGridImage  = FG2dCanvasContext_drawGridImage;
      // @method
      o.fillRectangle  = FG2dCanvasContext_fillRectangle;
      // @method
      o.toBytes        = FG2dCanvasContext_toBytes;
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
            throw new TError(o, "Current browser can't support Context2D technique.");
         }
         o._handle = handle;
      }
      o._hCanvas = hCanvas;
   }

   //==========================================================
   // <T>设置字体。</T>
   //
   // @param font:String 字体
   //==========================================================
   MO.FG2dCanvasContext_setFont = function FG2dCanvasContext_setFont(font) {
      this._handle.font = font;
   }

   //==========================================================
   // <T>清空内容。</T>
   //
   // @param r:red:Float 红色
   // @param g:green:Float 绿色
   // @param b:blue:Float 蓝色
   // @param a:alpha:Float 透明
   // @param d:depth:Float 深度
   //==========================================================
   MO.FG2dCanvasContext_clear = function FG2dCanvasContext_clear(r, g, b, a, d) {
      var o = this;
      var handle = o._handle;
      var size = o._size;
      handle.clearRect(0, 0, size.width, size.height);
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
      handle.moveTo(x1, y1);
      handle.lineTo(x2, y2);
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
      //handle.font = "italic 200 36px/2 Unknown Font, sans-serif"; 
      //handle.strokeStyle = "blue";
      //handle.fillStyle = "red";
      //handle.lineWidth = "10";
      //handle.strokeText(text, x, y);
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
      if (content.tagName == 'IMG') {
         data = content;
      } else if (RClass.isClass(content, FImage)) {
         data = content.image();
      } else {
         throw new TError(o, 'Unknown content type');
      }
      // 绘制位图
      handle.drawImage(data, x, y, width, height);
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
      handle.beginPath();
      handle.strokeStyle = borderLine.color;
      handle.lineWidth = borderLine.width;
      handle.moveTo(x1 + 0.5, y1 + 0.5);
      handle.lineTo(x2 + 0.5, y2 + 0.5);
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
      if (RClass.isClass(content, FImage)) {
         data = content.image();
      } else {
         throw new TError(o, 'Unknown content type');
      }

      var ssize = content.size();

      var sx = new Array();
      sx[0] = 0;
      sx[1] = padding.left;
      sx[2] = ssize.width - padding.right;
      var sy = new Array();
      sy[0] = 0;
      sy[1] = padding.top;
      sy[2] = ssize.height - padding.bottom;
      var dx = new Array();
      dx[0] = x;
      dx[1] = x + padding.left;
      dx[2] = x + width - padding.right;
      var dy = new Array();
      dy[0] = y;
      dy[1] = y + padding.top;
      dy[2] = y + height - padding.bottom;
      var sw = new Array();
      sw[0] = padding.left;
      sw[1] = ssize.width - padding.left - padding.right;
      sw[2] = padding.right;
      var sh = new Array();
      sh[0] = padding.top;
      sh[1] = ssize.height - padding.top - padding.bottom;
      sh[2] = padding.bottom;
      var dw = new Array();
      dw[0] = padding.left;
      dw[1] = width - padding.left - padding.right;
      dw[2] = padding.right;
      var dh = new Array();
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
      handle.fillRect(x, y, width, height);
   }

   //==========================================================
   // <T>绘制三角形。</T>
   //
   // @method
   // @param rectangle:SRectangle 矩形
   // @param border:SBorder 边框
   //==========================================================
   MO.FG2dCanvasContext_drawTriangle = function FG2dCanvasContext_drawTriangle(x1, y1, x2, y2, x3, y3, lineWidth, strokeColor, fillColor) {
      var o = this;
      var handle = o._handle;
      handle.beginPath();
      handle.lineWidth = lineWidth;
      handle.strokeStyle = strokeColor;
      handle.fillStyle = fillColor;
      handle.moveTo(x1 + 0.5, y1 + 0.5);
      handle.lineTo(x2 + 0.5, y2 + 0.5);
      handle.lineTo(x3 + 0.5, y3 + 0.5);
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
}
