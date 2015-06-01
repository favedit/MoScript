with(MO){
   MO.MCanvasObject = function MCanvasObject(o){
      o = RClass.inherits(this, o);
      o.htmlCanvas = RMethod.virtual(o, 'htmlCanvas');
      return o;
   }
}
with(MO){
   MO.MGraphicObject = function MGraphicObject(o){
      o = RClass.inherits(this, o);
      o._graphicContext    = null;
      o.graphicContext     = MGraphicObject_graphicContext;
      o.linkGraphicContext = MGraphicObject_linkGraphicContext;
      o.dispose            = MGraphicObject_dispose;
      return o;
   }
   MO.MGraphicObject_graphicContext = function MGraphicObject_graphicContext(){
      return this._graphicContext;
   }
   MO.MGraphicObject_linkGraphicContext = function MGraphicObject_linkGraphicContext(context){
      var o = this;
      if(RClass.isClass(context, FGraphicContext)){
         o._graphicContext = context;
      }else if(RClass.isClass(context, MGraphicObject)){
         o._graphicContext = context._graphicContext;
      }else{
         throw new TError(o, 'Link graphic context failure. (context={1})', context);
      }
   }
   MO.MGraphicObject_dispose = function MGraphicObject_dispose(){
      var o = this;
      o._graphicContext = null;
   }
}
with(MO){
   MO.MGraphicRenderable = function MGraphicRenderable(o){
      o = RClass.inherits(this, o, FObject);
      o.process = RMethod.empty;
      return o;
   }
}
with(MO){
   MO.FFloatStream = function FFloatStream(o){
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
   MO.FFloatStream_construct = function FFloatStream_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
   }
   MO.FFloatStream_length = function FFloatStream_length(){
      return this._length;
   }
   MO.FFloatStream_setLength = function FFloatStream_setLength(p){
      var o = this;
      o._length = p;
      o._memory = new Float32Array(p);
   }
   MO.FFloatStream_memory = function FFloatStream_memory(){
      return this._memory;
   }
   MO.FFloatStream_writeFloat4 = function FFloatStream_writeFloat4(a, b, c, d){
      var o = this;
      o._memory[o._position++] = a;
      o._memory[o._position++] = b;
      o._memory[o._position++] = c;
      o._memory[o._position++] = d;
   }
   MO.FFloatStream_writeColor4 = function FFloatStream_writeColor4(p){
      this.writeFloat4(p.red, p.green, p.blue, p.alpha);
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
}
with(MO){
   MO.FGraphicContext = function FGraphicContext(o){
      o = RClass.inherits(this, o, FObject, MGraphicObject);
      o._hCanvas   = null;
      o.construct  = FGraphicContext_construct;
      o.linkCanvas = RMethod.virtual(o, 'linkCanvas');
      o.dispose    = FGraphicContext_dispose;
      return o;
   }
   MO.FGraphicContext_construct = function FGraphicContext_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
   }
   MO.FGraphicContext_dispose = function FGraphicContext_dispose(){
      var o = this;
      o._hCanvas = null;
      o.__base.FObject.dispose.call(o);
   }
}
