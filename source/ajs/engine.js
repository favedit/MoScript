function FDisplay(o){
   o = RClass.inherits(this, o, FObject);
   o._matrix   = null;
   o.position  = null;
   o.direction = null;
   o.scale     = null;
   o.construct = FDisplay_construct;
   return o;
}
function FDisplay_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SMatrix3d();
   o.position = new SPoint3();
   o.direction = new SVector3();
   o.scale = new SVector3();
}
function FDisplayContainer(o){
   o = RClass.inherits(this, o, FDisplay);
   o._children = null;
   o.construct = FDisplayContainer_construct;
   o.hasChild  = FDisplayContainer_hasChild;
   return o;
}
function FDisplayContainer_construct(){
   var o = this;
   o.__base.FDisplay.construct.call(o);
   o._children = new TObjects();
}
function FDisplayContainer_hasChild(){
   return this._children ? this._children.isEmpty() : false;
}
function FDisplayLayer(o){
   o = RClass.inherits(this, o, FDisplayContainer);
   o.construct = FDisplayLayer_construct;
   return o;
}
function FDisplayLayer_construct(){
   var o = this;
   o.__base.FDisplayContainer.construct.call(o);
}
function FDrawable(o){
   o = RClass.inherits(this, o, FObject);
   o.left   = 0;
   o.top    = 0;
   o.set    = FDrawable_set;
   return o;
}
function FDrawable_set(l, t, w, h){
   var o = this;
   o.left = l;
   o.top = t;
}
function FRenderable(o){
   o = RClass.inherits(this, o, FObject);
   o.left   = 0;
   o.top    = 0;
   o.set    = FRenderable_set;
   return o;
}
function FRenderable_set(l, t, w, h){
   var o = this;
   o.left = l;
   o.top = t;
}
