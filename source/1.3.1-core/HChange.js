function HChange(n){
   var o = this;
   o.annotation = EAnnotation.Event;
   o.type       = 'change';
   o.handle     = 'onchange';
   // Attribute
   o.name       = n;
   o.source     = null;
   o.hSource    = null;
   // Attribute
   // Method
   o.attach     = HChange_attach;
   return o;
}
// ------------------------------------------------------------
function HChange_attach(e){
   var o = this;
}
// ------------------------------------------------------------
