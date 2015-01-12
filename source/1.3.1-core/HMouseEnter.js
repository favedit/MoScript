function HMouseEnter(n){
   var o = this;
   o.annotation = EAnnotation.Event;
   o.type       = 'mouseenter';
   o.handle     = 'onmouseenter';
   // Attribute
   o.name       = n;
   o.source     = null;
   o.hSource    = null;
   // Attribute
   o.srcElement = null;
   // Method
   o.attach     = HMouseEnter_attach;
   return o;
}
// ------------------------------------------------------------
function HMouseEnter_attach(e){
   var o = this;
   o.srcElement = e.srcElement;
}
// ------------------------------------------------------------
