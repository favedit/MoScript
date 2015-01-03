// name, method
function HFocus(n, m){
   var o = this;
   o.annotation = EAnnotation.Event;
   o.type       = 'focus';
   o.handle     = 'onfocus';
   // Attribute
   o.name       = n;
   o.method     = m;
   o.source     = null;
   o.hSource    = null;
   // Attribute
   // Method
   o.attach     = HFocus_attach;
   return o;
}
// ------------------------------------------------------------
function HFocus_attach(e){
   var o = this;
}
// ------------------------------------------------------------
