MO.FE2dCanvas = function FE2dCanvas(o){
   o = MO.Class.inherits(this, o, MO.FCanvas, MO.MCanvasObject, MO.MGraphicObject);
   o._size         = MO.Class.register(o, new MO.AGetter('_size'));
   o._hCanvas      = null;
   o.onResize      = MO.FE2dCanvas_onResize;
   o.construct     = MO.FE2dCanvas_construct;
   o.createContext = MO.FE2dCanvas_createContext;
   o.htmlCanvas    = MO.FE2dCanvas_htmlCanvas;
   o.build         = MO.FE2dCanvas_build;
   o.setPanel      = MO.FE2dCanvas_setPanel;
   o.resize        = MO.FE2dCanvas_resize;
   o.show          = MO.FE2dCanvas_show;
   o.hide          = MO.FE2dCanvas_hide;
   o.setVisible    = MO.FE2dCanvas_setVisible;
   o.reset         = MO.FE2dCanvas_reset;
   o.dispose       = MO.FE2dCanvas_dispose;
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
MO.FE2dCanvas_createContext = function FE2dCanvas_createContext(){
   return MO.Class.create(MO.FG2dCanvasContext);
}
MO.FE2dCanvas_htmlCanvas = function FE2dCanvas_htmlCanvas(){
   return this._hCanvas;
}
MO.FE2dCanvas_build = function FE2dCanvas_build(hDocument){
   var o = this;
   var size = o._size;
   var width = size.width;
   var height = size.height;
   var hCanvas = o._hCanvas = MO.Window.Builder.create(hDocument, 'CANVAS');
   hCanvas.__linker = o;
   var hStyle = hCanvas.style;
   hStyle.left = '0px';
   hStyle.top = '0px';
   hStyle.width = '100%';
   hStyle.height = '100%';
   var context = o._graphicContext = o.createContext();
   context.linkCanvas(hCanvas);
   o.resize(width, height);
}
MO.FE2dCanvas_setPanel = function FE2dCanvas_setPanel(hPanel){
   var o = this;
   o._hPanel = hPanel;
   hPanel.appendChild(o._hCanvas);
   o.onResize();
}
MO.FE2dCanvas_resize = function FE2dCanvas_resize(width, height){
   var o = this;
   var hCanvas = o._hCanvas;
   hCanvas.width = width;
   hCanvas.height = height;
   o._size.set(width, height);
   o._graphicContext.size().set(width, height);
}
MO.FE2dCanvas_show = function FE2dCanvas_show(){
   this.setVisible(true);
}
MO.FE2dCanvas_hide = function FE2dCanvas_hide(){
   this.setVisible(false);
}
MO.FE2dCanvas_setVisible = function FE2dCanvas_setVisible(visible){
   MO.Window.Html.visibleSet(this._hCanvas, visible);
}
MO.FE2dCanvas_reset = function FE2dCanvas_reset(){
   this._graphicContext.clear();
}
MO.FE2dCanvas_dispose = function FE2dCanvas_dispose(){
   var o = this;
   o._size = MO.Lang.Object.dispose(o._size);
   o._graphicContext = MO.Lang.Object.dispose(o._graphicContext);
   o._hPanel = MO.Window.Html.free(o._hPanel);
   o._hCanvas = MO.Window.Html.free(o._hCanvas);
   o.__base.FCanvas.dispose.call(o);
}
MO.FE2dCanvasConsole = function FE2dCanvasConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd    = MO.EScope.Local;
   o._pools      = null;
   o.construct   = MO.FE2dCanvasConsole_construct;
   o.allocBySize = MO.FE2dCanvasConsole_allocBySize;
   o.free        = MO.FE2dCanvasConsole_free;
   return o;
}
MO.FE2dCanvasConsole_construct = function FE2dCanvasConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._pools = MO.Class.create(MO.FObjectPools);
}
MO.FE2dCanvasConsole_allocBySize = function FE2dCanvasConsole_allocBySize(width, height){
   var o = this;
   var pools = o._pools;
   var code = width + 'x' + height;
   var canvas = pools.alloc(code);
   if(!canvas){
      canvas = MO.Class.create(FE2dCanvas);
      canvas.size().set(width, height);
      canvas.build(MO.RWindow._hDocument);
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
MO.FE2dDrawable = function FE2dDrawable(o){
   o = MO.Class.inherits(this, o, MO.FDrawable);
   return o;
}
