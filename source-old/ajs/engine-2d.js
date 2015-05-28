function FE2dCanvas(o){
   o = RClass.inherits(this, o, FObject, MCanvasObject);
   o._size      = null;
   o._context   = null;
   o._hCanvas   = null;
   o.onResize   = FE2dCanvas_onResize;
   o.construct  = FE2dCanvas_construct;
   o.htmlCanvas = FE2dCanvas_htmlCanvas;
   o.size       = FE2dCanvas_size;
   o.context    = FE2dCanvas_context;
   o.build      = FE2dCanvas_build;
   o.setPanel   = FE2dCanvas_setPanel;
   o.dispose    = FE2dCanvas_dispose;
   return o;
}
function FE2dCanvas_onResize(p){
   var o = this;
}
function FE2dCanvas_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._size = new SSize2();
}
function FE2dCanvas_htmlCanvas(){
   return this._hCanvas;
}
function FE2dCanvas_size(){
   return this._size;
}
function FE2dCanvas_context(){
   return this._context;
}
function FE2dCanvas_build(hDocument){
   var o = this;
   var size = o._size;
   var width = size.width;
   var height = size.height;
   var hCanvas = o._hCanvas = RBuilder.create(hDocument, 'CANVAS');
   hCanvas.__linker = o;
   hCanvas.width = width;
   hCanvas.height = height;
   var style = hCanvas.style;
   style.width = width + 'px';
   style.height = height + 'px';
   var context = o._context = RClass.create(FG2dCanvasContext);
   context.linkCanvas(hCanvas);
}
function FE2dCanvas_setPanel(p){
   var o = this;
   var c = o._context;
   var hc = o._hCanvas;
   o._hPanel = p;
   p.appendChild(o._hCanvas);
   o.onResize();
}
function FE2dCanvas_dispose(){
   var o = this;
   o._context = RObject.dispose(o._context);
   o._hPanel = RHtml.free(o._hPanel);
   o._hCanvas = RHtml.free(o._hCanvas);
   o.__base.FObject.dispose.call(o);
}
function FE2dCanvasConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd    = EScope.Local;
   o._pools      = null;
   o.construct   = FE2dCanvasConsole_construct;
   o.allocBySize = FE2dCanvasConsole_allocBySize;
   o.free        = FE2dCanvasConsole_free;
   return o;
}
function FE2dCanvasConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._pools = RClass.create(FObjectPools);
}
function FE2dCanvasConsole_allocBySize(width, height){
   var o = this;
   var pools = o._pools;
   var code = width + 'x' + height;
   var canvas = pools.alloc(code);
   if(canvas){
      return canvas;
   }
   canvas = RClass.create(FE2dCanvas);
   canvas.size().set(width, height);
   canvas.build(RWindow._hDocument);
   return canvas;
}
function FE2dCanvasConsole_free(canvas){
   var o = this;
   var pools = o._pools;
   var size = canvas.size();
   var code = size.width + 'x' + size.height;
   pools.free(code, canvas);
}
function FE2dDrawable(o){
   o = RClass.inherits(this, o, FDrawable);
   return o;
}
