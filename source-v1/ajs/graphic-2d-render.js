function FG2dContext(o){
   o = RClass.inherits(this, o, FGraphicContext);
   o._size      = null;
   o.construct  = FG2dContext_construct;
   o.linkCanvas = FG2dContext_linkCanvas;
   o.size       = FG2dContext_size;
   o.dispose    = FG2dContext_dispose;
   return o;
}
function FG2dContext_construct(){
   var o = this;
   o.__base.FGraphicContext.construct.call(o);
   o._size = new SSize2();
}
function FG2dContext_linkCanvas(h){
   var o = this;
   o._size.set(h.width, h.height);
}
function FG2dContext_size(){
   return this._size;
}
function FG2dContext_dispose(){
   var o = this;
   o._size = RObject.dispose(o._size);
   o.__base.FGraphicContext.dispose.call(o);
}
