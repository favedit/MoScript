function MGraphicObject(o){
   o = RClass.inherits(this, o);
   o._graphicContext    = null;
   o.graphicContext     = MGraphicObject_graphicContext;
   o.linkGraphicContext = MGraphicObject_linkGraphicContext;
   return o;
}
function MGraphicObject_graphicContext(){
   return this._graphicContext;
}
function MGraphicObject_linkGraphicContext(p){
   var o = this;
   if(RClass.isClass(p, FGraphicContext)){
      o._graphicContext = p;
   }else if(RClass.isClass(p, MGraphicObject)){
      o._graphicContext = p._graphicContext;
   }else{
      throw new TError(o, 'Link graphic context failure. (context={1})', p);
   }
}
function MGraphicRenderable(o){
   o = RClass.inherits(this, o, FObject);
   o.process = MGraphicRenderable_process;
   return o;
}
function MGraphicRenderable_process(){
}
function FGraphicContext(o){
   o = RClass.inherits(this, o, FObject);
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
