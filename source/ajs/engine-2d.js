function FE2dCanvas(o){
   o = RClass.inherits(this, o, FObject);
   o._size     = null;
   o._context  = null;
   o.onResize  = FE2dCanvas_onResize;
   o.construct = FE2dCanvas_construct;
   o.size      = FE2dCanvas_size;
   o.context   = FE2dCanvas_context;
   o.build     = FE2dCanvas_build;
   o.setPanel  = FE2dCanvas_setPanel;
   o.dispose   = FE2dCanvas_dispose;
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
function FE2dCanvas_size(){
   return this._size;
}
function FE2dCanvas_context(){
   return this._context;
}
function FE2dCanvas_build(p){
   var o = this;
   var s = o._size;
   var h = o._hCanvas = RBuilder.create(p, 'CANVAS');
   h.__linker = o;
   h.width = s.width;
   h.height = s.height;
   var c = o._context = RClass.create(FG2dCanvasContext);
   c.linkCanvas(h);
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
function FE2dDrawable(o){
   o = RClass.inherits(this, o, FDrawable);
   return o;
}
