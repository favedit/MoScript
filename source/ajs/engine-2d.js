MO.FE2dCanvas = function FE2dCanvas(o){
   o = MO.Class.inherits(this, o, MO.FCanvas, MO.MCanvasObject);
   o._size      = MO.Class.register(o, new MO.AGetter('_size'));
   o._context   = MO.Class.register(o, new MO.AGetter('_context'));
   o._hCanvas   = null;
   o.onResize   = MO.FE2dCanvas_onResize;
   o.construct  = MO.FE2dCanvas_construct;
   o.htmlCanvas = MO.FE2dCanvas_htmlCanvas;
   o.build      = MO.FE2dCanvas_build;
   o.setPanel   = MO.FE2dCanvas_setPanel;
   o.resize     = MO.FE2dCanvas_resize;
   o.reset      = MO.FE2dCanvas_reset;
   o.dispose    = MO.FE2dCanvas_dispose;
   return o;
}
MO.FE2dCanvas_onResize = function FE2dCanvas_onResize(p){
   var o = this;
}
MO.FE2dCanvas_construct = function FE2dCanvas_construct(){
   var o = this;
   o.__base.FCanvas.construct.call(o);
   o._size = new MO.SSize2(1280, 720);
}
MO.FE2dCanvas_htmlCanvas = function FE2dCanvas_htmlCanvas(){
   return this._hCanvas;
}
MO.FE2dCanvas_build = function FE2dCanvas_build(hDocument){
   var o = this;
   var size = o._size;
   var width = size.width;
   var height = size.height;
   var hCanvas = o._hCanvas = MO.RBuilder.create(hDocument, 'CANVAS');
   hCanvas.__linker = o;
   hCanvas.width = width;
   hCanvas.height = height;
   var hStyle = hCanvas.style;
   hStyle.left = '0px';
   hStyle.top = '0px';
   hStyle.width = '100%';
   hStyle.height = '100%';
   var context = o._context = MO.Class.create(MO.FG2dCanvasContext);
   context.linkCanvas(hCanvas);
}
MO.FE2dCanvas_setPanel = function FE2dCanvas_setPanel(hPanel){
   var o = this;
   var context = o._context;
   var hCanvas = o._hCanvas;
   o._hPanel = hPanel;
   hPanel.appendChild(hCanvas);
   o.onResize();
}
MO.FE2dCanvas_resize = function FE2dCanvas_resize(width, height){
   var o = this;
   o._size.set(width, height);
   var hCanvas = o._hCanvas;
   hCanvas.width = width;
   hCanvas.height = height;
}
MO.FE2dCanvas_reset = function FE2dCanvas_reset(){
   this._context.clear();
}
MO.FE2dCanvas_dispose = function FE2dCanvas_dispose(){
   var o = this;
   o._size = MO.RObject.dispose(o._size);
   o._context = MO.RObject.dispose(o._context);
   o._hPanel = MO.RHtml.free(o._hPanel);
   o._hCanvas = MO.RHtml.free(o._hCanvas);
   o.__base.FCanvas.dispose.call(o);
}
with(MO){
   MO.FE2dCanvasConsole = function FE2dCanvasConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd    = EScope.Local;
      o._pools      = null;
      o.construct   = FE2dCanvasConsole_construct;
      o.allocBySize = FE2dCanvasConsole_allocBySize;
      o.free        = FE2dCanvasConsole_free;
      return o;
   }
   MO.FE2dCanvasConsole_construct = function FE2dCanvasConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._pools = RClass.create(FObjectPools);
   }
   MO.FE2dCanvasConsole_allocBySize = function FE2dCanvasConsole_allocBySize(width, height){
      var o = this;
      var pools = o._pools;
      var code = width + 'x' + height;
      var canvas = pools.alloc(code);
      if(!canvas){
         canvas = RClass.create(FE2dCanvas);
         canvas.size().set(width, height);
         canvas.build(RWindow._hDocument);
      }
      canvas.reset();
      return canvas;
   }
   MO.FE2dCanvasConsole_free = function FE2dCanvasConsole_free(canvas){
      var o = this;
      var pools = o._pools;
      var size = canvas.size();
      var code = size.width + 'x' + size.height;
      pools.free(code, canvas);
   }
}
with(MO){
   MO.FE2dDrawable = function FE2dDrawable(o){
      o = RClass.inherits(this, o, FDrawable);
      return o;
   }
}
