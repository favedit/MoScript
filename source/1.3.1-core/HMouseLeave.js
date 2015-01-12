function HMouseLeave(n){
   var o = this;
   o.annotation = EAnnotation.Event;
   o.type       = 'mouseleave';
   o.handle     = 'onmouseleave';
   // Attribute
   o.name       = n;
   o.source     = null;
   o.hSource    = null;
   // Attribute
   // Method
   o.attach     = HMouseLeave_attach;
   return o;
}
// ------------------------------------------------------------
function HMouseLeave_attach(e){
   var o = this;
}
// ------------------------------------------------------------
