with (MO) {
   MO.FG2dCanvasContext = function FG2dCanvasContext(o) {
      o = RClass.inherits(this, o, FG2dContext);
      o._handle              = null;
      o.construct            = FG2dCanvasContext_construct;
      o.linkCanvas           = FG2dCanvasContext_linkCanvas;
      o.setScale             = FG2dCanvasContext_setScale;
      o.setFont              = FG2dCanvasContext_setFont;
      o.clear                = FG2dCanvasContext_clear;
      o.clearRectangle       = FG2dCanvasContext_clearRectangle;
      o.textWidth            = FG2dCanvasContext_textWidth;
      o.createLinearGradient = FG2dCanvasContext_createLinearGradient;
      o.drawLine             = FG2dCanvasContext_drawLine;
      o.drawRectangle        = FG2dCanvasContext_drawRectangle;
      o.drawTriangle         = FG2dCanvasContext_drawTriangle;
      o.drawCircle           = FG2dCanvasContext_drawCircle;
      o.drawText             = FG2dCanvasContext_drawText;
      o.drawImage            = FG2dCanvasContext_drawImage;
      o.drawGridImage        = FG2dCanvasContext_drawGridImage;
      o.drawQuadrilateral    = FG2dCanvasContext_drawQuadrilateral;
      o.drawBorderLine       = FG2dCanvasContext_drawBorderLine;
      o.drawBorder           = FG2dCanvasContext_drawBorder;
      o.fillRectangle        = FG2dCanvasContext_fillRectangle;
      o.toBytes              = FG2dCanvasContext_toBytes;
      return o;
   }
   MO.FG2dCanvasContext_construct = function FG2dCanvasContext_construct() {
      var o = this;
      o.__base.FG2dContext.construct.call(o);
   }
   MO.FG2dCanvasContext_linkCanvas = function FG2dCanvasContext_linkCanvas(hCanvas) {
      var o = this;
      o.__base.FG2dContext.linkCanvas.call(o, hCanvas);
      if (hCanvas.getContext) {
         var handle = hCanvas.getContext('2d');
         if (!handle) {
            throw new TError(o, "Current browser can't support Context2D technique.");
         }
         o._handle = handle;
      }
      o._hCanvas = hCanvas;
   }
   MO.FG2dCanvasContext_setScale = function FG2dCanvasContext_setScale(width, height){
      var o = this;
      o._scale.set(width, height);
      o._handle.scale(width, height);
   }
   MO.FG2dCanvasContext_setFont = function FG2dCanvasContext_setFont(font) {
      this._handle.font = font;
   }
   MO.FG2dCanvasContext_clear = function FG2dCanvasContext_clear(){
      var o = this;
      var hCanvas = o._handle.canvas;
      var offsetWidth = hCanvas.offsetWidth;
      var offsetHeight = hCanvas.offsetHeight;
      o._size.set(offsetWidth, offsetHeight);
      var width = offsetWidth / o._scale.width;
      var height = offsetHeight / o._scale.height;
      o._handle.clearRect(0, 0, width, height);
   }
   MO.FG2dCanvasContext_clearRectangle = function FG2dCanvasContext_clearRectangle(rectangle){
      this._handle.clearRect(rectangle.left, rectangle.top, rectangle.width, rectangle.height);
   }
   MO.FG2dCanvasContext_textWidth = function FG2dCanvasContext_textWidth(text){
      var info = this._handle.measureText(text);
      return info.width;
   }
   MO.FG2dCanvasContext_createLinearGradient = function FG2dCanvasContext_createLinearGradient(x1, y1, x2, y2) {
      var o = this;
      var handle = o._handle;
      return handle.createLinearGradient(x1, y1, x2, y2);
   }
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
   MO.FG2dCanvasContext_drawRectangle = function FG2dCanvasContext_drawRectangle(x, y, width, height, color, lineWidth) {
      var o = this;
      var handle = o._handle;
      handle.strokeStyle = color;
      handle.lineWidth = lineWidth;
      handle.strokeRect(x, y, width, height);
   }
   MO.FG2dCanvasContext_drawText = function FG2dCanvasContext_drawText(text, x, y, color) {
      var o = this;
      var handle = o._handle;
      handle.fillStyle = color;
      handle.fillText(text, x, y);
   }
   MO.FG2dCanvasContext_drawImage = function FG2dCanvasContext_drawImage(content, x, y, width, height){
      var o = this;
      var handle = o._handle;
      var size = o._size;
      var data = null
      if (content.tagName == 'IMG') {
         data = content;
      } else if (RClass.isClass(content, FImage)) {
         data = content.image();
      } else {
         throw new TError(o, 'Unknown content type');
      }
      handle.drawImage(data, x, y, width, height);
   }
   MO.FG2dCanvasContext_drawGridImage = function FG2dCanvasContext_drawGridImage(content, x, y, width, height, padding) {
      var o = this;
      var handle = o._handle;
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
      for (var i = 0; i < 9; i++) {
         var row = parseInt(i / 3);
         var column = i % 3;
         if (dh[row] > 0 && dw[column] > 0) {
            handle.drawImage(data, sx[column], sy[row], sw[column], sh[row], dx[column], dy[row], dw[column], dh[row]);
         }
      }
   }
   MO.FG2dCanvasContext_drawImageRectangle = function FG2dCanvasContext_drawImageRectangle(content, rectangle){
      return this.drawImage(content, rectangle.left, rectangle.top, rectangle.width, rectangle.height);
   }
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
   MO.FG2dCanvasContext_drawBorder = function FG2dCanvasContext_drawBorder(rectangle, border) {
      var o = this;
      var left = rectangle.left;
      var top = rectangle.top;
      var right = rectangle.left + rectangle.width - 1;
      var bottom = rectangle.top + rectangle.height - 1;
      o.drawBorderLine(left, bottom, left, top, border.left);
      o.drawBorderLine(left - 0.5, top, right + 0.5, top, border.top);
      o.drawBorderLine(right, top, right, bottom, border.right);
      o.drawBorderLine(left - 0.5, bottom, right + 0.5, bottom, border.bottom);
   }
   MO.FG2dCanvasContext_fillRectangle = function FG2dCanvasContext_fillRectangle(x, y, width, height, color) {
      var o = this;
      var handle = o._handle;
      handle.fillStyle = color;
      handle.beginPath();
      handle.fillRect(x, y, width, height);
      handle.closePath();
   }
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
   MO.FG2dCanvasContext_toBytes = function FG2dCanvasContext_toBytes() {
      var o = this;
      var size = o._size;
      return o._handle.getImageData(0, 0, size.width, size.height);
   }
}
