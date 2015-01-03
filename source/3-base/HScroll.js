function HScroll(n, m){
   var o = this;
   o.annotation = EAnnotation.Event;
   o.type       = 'scroll';
   o.handle     = 'onscroll';
   // Attribute
   o.name       = n;
   o.method     = m;
   o.source     = null;
   o.hSource    = null;
   // Attribute
   // Method
   o.attach     = HScroll_attach;
   return o;
}
// ------------------------------------------------------------
function HScroll_attach(e){
   var o = this;
}
// ------------------------------------------------------------
