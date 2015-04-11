function FG2dCanvasContext(o){
   o = RClass.inherits(this, o, FG2dContext);
   o._native       = null;
   o.construct     = FG2dCanvasContext_construct;
   o.linkCanvas    = FG2dCanvasContext_linkCanvas;
   o.clear         = FG2dCanvasContext_clear;
   o.drawLine      = FG2dCanvasContext_drawLine;
   o.drawRectangle = FG2dCanvasContext_drawRectangle;
   o.drawText      = FG2dCanvasContext_drawText;
   o.drawImage     = FG2dCanvasContext_drawImage;
   o.fillRectangle = FG2dCanvasContext_fillRectangle;
   o.toBytes       = FG2dCanvasContext_toBytes;
   return o;
}
function FG2dCanvasContext_construct(){
   var o = this;
   o.__base.FG2dContext.construct.call(o);
}
function FG2dCanvasContext_linkCanvas(h){
   var o = this;
   o.__base.FG2dContext.linkCanvas.call(o, h)
   o._hCanvas = h;
   if(h.getContext){
      var n = h.getContext('2d');
      if(!n){
         throw new TError("Current browser can't support Context2D technique.");
      }
      o._native = n;
   }
}
function FG2dCanvasContext_clear(r, g, b, a, d){
   var o = this;
   var c = o._native;
}
function FG2dCanvasContext_drawLine(x1, y1, x2, y2, color, lineWidth){
   var o = this;
   var g = o._native;
   g.strokeStyle = color;
   g.lineWidth = lineWidth;
   g.moveTo(x1, y1);
   g.lineTo(x2, y2);
   g.stroke();
}
function FG2dCanvasContext_drawRectangle(x, y, width, height, color, lineWidth){
   var o = this;
   var g = o._native;
   g.strokeStyle = color;
   g.lineWidth = lineWidth;
   g.strokeRect(x, y, width, height);
}
function FG2dCanvasContext_drawText(text, x, y, color){
   var o = this;
   var g = o._native;
   g.fillStyle = color;
   g.fillText(text, x, y);
}
function FG2dCanvasContext_drawImage(data, x, y){
   var o = this;
   var g = o._native;
   var pixels = null
   if(data.tagName == 'IMG'){
      pixels = data;
   }else if(RClass.isClass(data, FImage)){
      pixels = data.image();
   }else{
      throw new TError(o, 'Unknown data type');
   }
   g.drawImage(pixels, x, y, o._size.width, o._size.height);
}
function FG2dCanvasContext_fillRectangle(x, y, width, height, color){
   var o = this;
   var g = o._native;
   g.fillStyle = color;
   g.fillRect(x, y, width, height);
}
function FG2dCanvasContext_toBytes(){
   var o = this;
   var s = o._size;
   return o._native.getImageData(0, 0, s.width, s.height);
}
