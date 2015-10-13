MO.FG2dCanvasContext = function FG2dCanvasContext(o) {
   o = MO.Class.inherits(this, o, MO.FG2dContext);
   o._handle              = null;
   o._gridSourceX         = null;
   o._gridSourceY         = null;
   o._gridSourceWidth     = null;
   o._gridSourceHeight    = null;
   o._gridDrawX           = null;
   o._gridDrawY           = null;
   o._gridDrawWidth       = null;
   o._gridDrawHeight      = null;
   o.construct            = MO.FG2dCanvasContext_construct;
   o.linkCanvas           = MO.FG2dCanvasContext_linkCanvas;
   o.setGlobalScale       = MO.FG2dCanvasContext_setGlobalScale;
   o.setScale             = MO.FG2dCanvasContext_setScale;
   o.setAlpha             = MO.FG2dCanvasContext_setAlpha;
   o.setFont              = MO.FG2dCanvasContext_setFont;
   o.store                = MO.FG2dCanvasContext_store;
   o.restore              = MO.FG2dCanvasContext_restore;
   o.prepare              = MO.FG2dCanvasContext_prepare;
   o.clear                = MO.FG2dCanvasContext_clear;
   o.clearRectangle       = MO.FG2dCanvasContext_clearRectangle;
   o.clip                 = MO.FG2dCanvasContext_clip;
   o.textWidth            = MO.FG2dCanvasContext_textWidth;
   o.createLinearGradient = MO.FG2dCanvasContext_createLinearGradient;
   o.drawLine             = MO.FG2dCanvasContext_drawLine;
   o.drawRectangle        = MO.FG2dCanvasContext_drawRectangle;
   o.drawTriangle         = MO.FG2dCanvasContext_drawTriangle;
   o.drawCircle           = MO.FG2dCanvasContext_drawCircle;
   o.drawText             = MO.FG2dCanvasContext_drawText;
   o.drawTextVertical     = MO.FG2dCanvasContext_drawTextVertical;
   o.drawImage            = MO.FG2dCanvasContext_drawImage;
   o.drawGridImage        = MO.FG2dCanvasContext_drawGridImage;
   o.drawQuadrilateral    = MO.FG2dCanvasContext_drawQuadrilateral;
   o.drawBorderLine       = MO.FG2dCanvasContext_drawBorderLine;
   o.drawBorder           = MO.FG2dCanvasContext_drawBorder;
   o.fillRectangle        = MO.FG2dCanvasContext_fillRectangle;
   o.toBytes              = MO.FG2dCanvasContext_toBytes;
   o.saveFile             = MO.FG2dCanvasContext_saveFile;
   o.dispose              = MO.FG2dCanvasContext_dispose;
   return o;
}
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
MO.FG2dCanvasContext_linkCanvas = function FG2dCanvasContext_linkCanvas(hCanvas) {
   var o = this;
   o.__base.FG2dContext.linkCanvas.call(o, hCanvas);
   if (hCanvas.getContext) {
      var handle = hCanvas.getContext('2d');
      if (!handle) {
         throw new MO.TError(o, "Current browser can't support Context2D technique.");
      }
      o._handle = handle;
   }
   o._hCanvas = hCanvas;
}
MO.FG2dCanvasContext_setGlobalScale = function FG2dCanvasContext_setGlobalScale(width, height){
   this._globalScale.set(width, height);
}
MO.FG2dCanvasContext_setScale = function FG2dCanvasContext_setScale(width, height){
   var o = this;
   if(!o._scale.equalsData(width, height)){
      o._handle.scale(width, height);
      o._scale.set(width, height);
   }
}
MO.FG2dCanvasContext_setAlpha = function FG2dCanvasContext_setAlpha(alpha){
   var o = this;
   this._handle.globalAlpha = alpha;
}
MO.FG2dCanvasContext_setFont = function FG2dCanvasContext_setFont(font) {
   this._handle.font = font;
}
MO.FG2dCanvasContext_store = function FG2dCanvasContext_store(){
   this._handle.save();
}
MO.FG2dCanvasContext_restore = function FG2dCanvasContext_restore(){
   this._handle.restore();
}
MO.FG2dCanvasContext_prepare = function FG2dCanvasContext_prepare(clearFlag){
   var o = this;
   var handle = o._handle;
   var scale = o._globalScale;
   if(clearFlag){
      var size = o._size;
      handle.setTransform(1, 0, 0, 1, 0, 0);
      handle.clearRect(0, 0, size.width, size.height);
   }
   handle.setTransform(scale.width, 0, 0, scale.height, 0, 0);
}
MO.FG2dCanvasContext_clear = function FG2dCanvasContext_clear(){
   var o = this;
   var size = o._size;
   var handle = o._handle;
   var hCanvas = handle.canvas;
   handle.save();
   handle.setTransform(1, 0, 0, 1, 0, 0);
   o._handle.clearRect(0, 0, size.width, size.height);
   handle.restore();
}
MO.FG2dCanvasContext_clearRectangle = function FG2dCanvasContext_clearRectangle(rectangle){
   this._handle.clearRect(rectangle.left, rectangle.top, rectangle.width, rectangle.height);
}
MO.FG2dCanvasContext_clip = function FG2dCanvasContext_clip(left, top, width, height){
   var o = this;
   var handle = o._handle;
   handle.beginPath();
   handle.rect(left, top, width, height);
   handle.clip();
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
MO.FG2dCanvasContext_drawTextVertical = function FG2dCanvasContext_drawTextVertical(text, x, y, font) {
   var o = this;
   var handle = o._handle;
   handle.font = font.toString();
   handle.fillStyle = font.color;
   for (var i = 0; i < text.length; i++) {
      handle.fillText(text.charAt(i), x, y);
      y += font.size + parseInt(font.size / 5);
   }
}
MO.FG2dCanvasContext_drawImage = function FG2dCanvasContext_drawImage(content, x, y, width, height){
   var o = this;
   var handle = o._handle;
   var size = o._size;
   var data = null
   if(content.tagName == 'IMG'){
      data = content;
   }else if(MO.Class.isClass(content, MO.FImage)){
      if(!content.testReady()){
         return;
      }
      data = content.image();
      if(width == null){
         width = data.size().width;
      }
      if(height == null){
         height = data.size().height;
      }
   }else{
      throw new MO.TError(o, 'Unknown content type');
   }
   handle.drawImage(data, x, y, width, height);
}
MO.FG2dCanvasContext_drawGridImage = function FG2dCanvasContext_drawGridImage(content, x, y, width, height, padding) {
   var o = this;
   var handle = o._handle;
   var data = null
   if (MO.Class.isClass(content, MO.FImage)) {
      if(!content.testReady()){
         return;
      }
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
   if (fillColor || fillColor != '') {
      handle.fill();
   }
   if (strokeColor || strokeColor != '') {
      handle.stroke();
   }
}
MO.FG2dCanvasContext_toBytes = function FG2dCanvasContext_toBytes() {
   var o = this;
   var size = o._size;
   return o._handle.getImageData(0, 0, size.width, size.height);
}
MO.FG2dCanvasContext_saveFile = function FG2dCanvasContext_saveFile(fileName, extention){
   var o = this;
   var handle = context2d._handle;
   var hCanvas = handle.canvas;
   var imageUrl = hCanvas.toDataURL("image/" + extention);
   var link = document.createElement('A');
   var event = document.createEvent("MouseEvents");
   event.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
   link.download = fileName;
   link.href = imageUrl;
   link.dispatchEvent(event);
}
MO.FG2dCanvasContext_dispose = function FG2dCanvasContext_dispose() {
   var o = this;
   o._handle = null;
   o._gridSourceX = null;
   o._gridSourceY = null;
   o._gridSourceWidth = null;
   o._gridSourceHeight = null;
   o._gridDrawX = null;
   o._gridDrawY = null;
   o._gridDrawWidth = null;
   o._gridDrawHeight = null;
   o.__base.FG2dContext.dispose.call(o);
}
