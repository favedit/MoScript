MO.MCanvasObject = function MCanvasObject(o){
   o = MO.Class.inherits(this, o);
   o.htmlCanvas = MO.Method.virtual(o, 'htmlCanvas');
   return o;
}
MO.MGraphicObject = function MGraphicObject(o){
   o = MO.Class.inherits(this, o);
   o._graphicContext    = MO.Class.register(o, new MO.AGetter('_graphicContext'));
   o.linkGraphicContext = MO.MGraphicObject_linkGraphicContext;
   o.dispose            = MO.MGraphicObject_dispose;
   return o;
}
MO.MGraphicObject_linkGraphicContext = function MGraphicObject_linkGraphicContext(context){
   var o = this;
   if(MO.Class.isClass(context, MO.FGraphicContext)){
      o._graphicContext = context;
   }else if(MO.Class.isClass(context, MO.MGraphicObject)){
      o._graphicContext = context._graphicContext;
   }else{
      throw new TError(o, 'Link graphic context failure. (context={1})', context);
   }
   MO.Assert.debugNotNull(o._graphicContext);
}
MO.MGraphicObject_dispose = function MGraphicObject_dispose(){
   var o = this;
   o._graphicContext = null;
}
MO.MGraphicRenderable = function MGraphicRenderable(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o.process = MO.Method.empty;
   return o;
}
MO.FFloatStream = function FFloatStream(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._length     = MO.Class.register(o, new MO.AGetter('_length'), 0);
   o._memory     = MO.Class.register(o, new MO.AGetter('_memory'), null);
   o._position   = 0;
   o.construct   = MO.FFloatStream_construct;
   o.setLength   = MO.FFloatStream_setLength;
   o.writeFloat4 = MO.FFloatStream_writeFloat4;
   o.writeColor4 = MO.FFloatStream_writeColor4;
   o.reset       = MO.FFloatStream_reset;
   o.clear       = MO.FFloatStream_clear;
   o.dispose     = MO.FFloatStream_dispose;
   return o;
}
MO.FFloatStream_construct = function FFloatStream_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
MO.FFloatStream_setLength = function FFloatStream_setLength(length){
   var o = this;
   o._length = length;
   o._memory = new Float32Array(length);
}
MO.FFloatStream_writeFloat4 = function FFloatStream_writeFloat4(value1, value2, value3, value4){
   var o = this;
   o._memory[o._position++] = value1;
   o._memory[o._position++] = value2;
   o._memory[o._position++] = value3;
   o._memory[o._position++] = value4;
}
MO.FFloatStream_writeColor4 = function FFloatStream_writeColor4(value){
   this.writeFloat4(value.red, value.green, value.blue, value.alpha);
}
MO.FFloatStream_reset = function FFloatStream_reset(){
   this._position = 0;
}
MO.FFloatStream_clear = function FFloatStream_clear(){
   this._position = 0;
}
MO.FFloatStream_dispose = function FFloatStream_dispose(){
   var o = this;
   o._memory = null;
   o.__base.FObject.dispose.call(o);
}
MO.FGraphicContext = function FGraphicContext(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject);
   o._hCanvas   = null;
   o.linkCanvas = MO.RMethod.virtual(o, 'linkCanvas');
   o.dispose    = MO.FGraphicContext_dispose;
   return o;
}
MO.FGraphicContext_dispose = function FGraphicContext_dispose(){
   var o = this;
   o._hCanvas = null;
   o.__base.FObject.dispose.call(o);
}
