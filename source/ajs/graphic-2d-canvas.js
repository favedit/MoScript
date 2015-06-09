with(MO){
   MO.FG2dCanvasContext = function FG2dCanvasContext(o){
      o = RClass.inherits(this, o, FG2dContext);
      o._handle       = null;
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
   MO.FG2dCanvasContext_construct = function FG2dCanvasContext_construct(){
      var o = this;
      o.__base.FG2dContext.construct.call(o);
   }
   MO.FG2dCanvasContext_linkCanvas = function FG2dCanvasContext_linkCanvas(hCanvas){
      var o = this;
      o.__base.FG2dContext.linkCanvas.call(o, hCanvas);
      if(hCanvas.getContext){
         var handle = hCanvas.getContext('2d');
         if(!handle){
            throw new TError(o, "Current browser can't support Context2D technique.");
         }
         o._handle = handle;
      }
      o._hCanvas = hCanvas;
   }
   MO.FG2dCanvasContext_clear = function FG2dCanvasContext_clear(r, g, b, a, d){
      var o = this;
      var handle = o._handle;
      var size = o._size;
      handle.clearRect(0, 0, size.width, size.height);
   }
   MO.FG2dCanvasContext_drawLine = function FG2dCanvasContext_drawLine(x1, y1, x2, y2, color, lineWidth){
      var o = this;
      var handle = o._handle;
      handle.strokeStyle = color;
      handle.lineWidth = lineWidth;
      handle.moveTo(x1, y1);
      handle.lineTo(x2, y2);
      handle.stroke();
   }
   MO.FG2dCanvasContext_drawRectangle = function FG2dCanvasContext_drawRectangle(x, y, width, height, color, lineWidth){
      var o = this;
      var handle = o._handle;
      handle.strokeStyle = color;
      handle.lineWidth = lineWidth;
      handle.strokeRect(x, y, width, height);
   }
   MO.FG2dCanvasContext_drawText = function FG2dCanvasContext_drawText(text, x, y, color){
      var o = this;
      var handle = o._handle;
      handle.fillStyle = color;
      handle.fillText(text, x, y);
   }
   MO.FG2dCanvasContext_drawImage = function FG2dCanvasContext_drawImage(content, x, y){
      var o = this;
      var handle = o._handle;
      var size = o._size;
      var data = null
      if(content.tagName == 'IMG'){
         data = content;
      }else if(RClass.isClass(content, FImage)){
         data = content.image();
      }else{
         throw new TError(o, 'Unknown content type');
      }
      handle.drawImage(data, x, y, size.width, size.height);
   }
   MO.FG2dCanvasContext_fillRectangle = function FG2dCanvasContext_fillRectangle(x, y, width, height, color){
      var o = this;
      var handle = o._handle;
      handle.fillStyle = color;
      handle.fillRect(x, y, width, height);
   }
   MO.FG2dCanvasContext_toBytes = function FG2dCanvasContext_toBytes(){
      var o = this;
      var size = o._size;
      return o._handle.getImageData(0, 0, size.width, size.height);
   }
}
