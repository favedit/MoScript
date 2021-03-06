function MCanvasObject(o){
   o = RClass.inherits(this, o);
   o.htmlCanvas = RMethod.virtual(o, 'htmlCanvas');
   return o;
}
function MGraphicObject(o){
   o = RClass.inherits(this, o);
   o._graphicContext    = null;
   o.graphicContext     = MGraphicObject_graphicContext;
   o.linkGraphicContext = MGraphicObject_linkGraphicContext;
   o.dispose            = MGraphicObject_dispose;
   return o;
}
function MGraphicObject_graphicContext(){
   return this._graphicContext;
}
function MGraphicObject_linkGraphicContext(context){
   var o = this;
   if(RClass.isClass(context, FGraphicContext)){
      o._graphicContext = context;
   }else if(RClass.isClass(context, MGraphicObject)){
      o._graphicContext = context._graphicContext;
   }else{
      throw new TError(o, 'Link graphic context failure. (context={1})', context);
   }
}
function MGraphicObject_dispose(){
   var o = this;
   o._graphicContext = null;
}
function MGraphicRenderable(o){
   o = RClass.inherits(this, o, FObject);
   o.process = RMethod.empty;
   return o;
}
function FFloatStream(o){
   o = RClass.inherits(this, o, FObject);
   o._length     = 0;
   o._memory     = null;
   o._position   = 0;
   o.construct   = FFloatStream_construct;
   o.length      = FFloatStream_length;
   o.setLength   = FFloatStream_setLength;
   o.memory      = FFloatStream_memory;
   o.writeFloat4 = FFloatStream_writeFloat4;
   o.writeColor4 = FFloatStream_writeColor4;
   o.reset       = FFloatStream_reset;
   o.clear       = FFloatStream_clear;
   o.dispose     = FFloatStream_dispose;
   return o;
}
function FFloatStream_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
function FFloatStream_length(){
   return this._length;
}
function FFloatStream_setLength(p){
   var o = this;
   o._length = p;
   o._memory = new Float32Array(p);
}
function FFloatStream_memory(){
   return this._memory;
}
function FFloatStream_writeFloat4(a, b, c, d){
   var o = this;
   o._memory[o._position++] = a;
   o._memory[o._position++] = b;
   o._memory[o._position++] = c;
   o._memory[o._position++] = d;
}
function FFloatStream_writeColor4(p){
   this.writeFloat4(p.red, p.green, p.blue, p.alpha);
}
function FFloatStream_reset(){
   this._position = 0;
}
function FFloatStream_clear(){
   this._position = 0;
}
function FFloatStream_dispose(){
   var o = this;
   o._memory = null;
   o.__base.FObject.dispose.call(o);
}
function FGraphicContext(o){
   o = RClass.inherits(this, o, FObject, MGraphicObject);
   o._hCanvas   = null;
   o.construct  = FGraphicContext_construct;
   o.linkCanvas = RMethod.virtual(o, 'linkCanvas');
   o.dispose    = FGraphicContext_dispose;
   return o;
}
function FGraphicContext_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
function FGraphicContext_dispose(){
   var o = this;
   o._hCanvas = null;
   o.__base.FObject.dispose.call(o);
}
