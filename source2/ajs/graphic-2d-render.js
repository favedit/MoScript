with(MO){
   MO.FG2dContext = function FG2dContext(o){
      o = RClass.inherits(this, o, FGraphicContext);
      o._size      = null;
      o.construct  = FG2dContext_construct;
      o.linkCanvas = FG2dContext_linkCanvas;
      o.size       = FG2dContext_size;
      o.dispose    = FG2dContext_dispose;
      return o;
   }
   MO.FG2dContext_construct = function FG2dContext_construct(){
      var o = this;
      o.__base.FGraphicContext.construct.call(o);
      o._size = new SSize2();
   }
   MO.FG2dContext_linkCanvas = function FG2dContext_linkCanvas(h){
      var o = this;
      o._size.set(h.width, h.height);
   }
   MO.FG2dContext_size = function FG2dContext_size(){
      return this._size;
   }
   MO.FG2dContext_dispose = function FG2dContext_dispose(){
      var o = this;
      o._size = RObject.dispose(o._size);
      o.__base.FGraphicContext.dispose.call(o);
   }
}
