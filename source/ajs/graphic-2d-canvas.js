function FG2dCanvasContext(o){
   o = RClass.inherits(this, o, FG2dContext);
   o._native    = null;
   o.construct  = FG2dCanvasContext_construct;
   o.linkCanvas = FG2dCanvasContext_linkCanvas;
   o.clear      = FG2dCanvasContext_clear;
   o.drawImage  = FG2dCanvasContext_drawImage;
   o.toBytes    = FG2dCanvasContext_toBytes;
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
function FG2dCanvasContext_drawImage(m){
   var o = this;
   var g = o._native;
   if(RClass.isClass(m, FImage)){
      g.drawImage(m.image(), 0, 0, o._size.width, o._size.height);
   }else{
      throw new TError(o, 'Unknown data type');
   }
}
function FG2dCanvasContext_toBytes(){
   var o = this;
   var s = o._size;
   return o._native.getImageData(0, 0, s.width, s.height);
}
