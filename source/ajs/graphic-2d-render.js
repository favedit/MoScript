MO.FG2dContext = function FG2dContext(o){
   o = MO.Class.inherits(this, o, MO.FGraphicContext);
   o._globalScale = MO.Class.register(o, new MO.AGetter('_globalScale'));
   o._scale       = MO.Class.register(o, new MO.AGetter('_scale'));
   o.construct    = MO.FG2dContext_construct;
   o.linkCanvas   = MO.FG2dContext_linkCanvas;
   o.dispose      = MO.FG2dContext_dispose;
   return o;
}
MO.FG2dContext_construct = function FG2dContext_construct(){
   var o = this;
   o.__base.FGraphicContext.construct.call(o);
   o._globalScale = new MO.SSize2(1, 1);
   o._scale = new MO.SSize2(1, 1);
}
MO.FG2dContext_linkCanvas = function FG2dContext_linkCanvas(hCanvas){
   var o = this;
   o._size.set(hCanvas.width, hCanvas.height);
}
MO.FG2dContext_dispose = function FG2dContext_dispose(){
   var o = this;
   o._globalScale = MO.Lang.Object.dispose(o._globalScale);
   o._scale = MO.Lang.Object.dispose(o._scale);
   o.__base.FGraphicContext.dispose.call(o);
}
