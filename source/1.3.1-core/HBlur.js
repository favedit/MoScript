function HBlur(n, m){
   var o = this;
   o.annotation = EAnnotation.Event;
   o.type       = 'blur';
   o.handle     = 'onblur';
   // Attribute
   o.name       = n;
   o.method     = m;
   o.source     = null;
   o.hSource    = null;
   // Attribute
   // Method
   o.attach     = HBlur_attach;
   return o;
}
// ------------------------------------------------------------
function HBlur_attach(e){
   var o = this;
}
// ------------------------------------------------------------
