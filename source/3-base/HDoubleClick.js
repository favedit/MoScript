function HDoubleClick(n){
   var o = this;
   o.annotation = EAnnotation.Event;
   o.type       = 'dblclick';
   o.handle     = 'ondblclick';
   // Attribute
   o.name       = n;
   o.source     = null;
   o.hSource    = null;
   // Attribute
   // Method
   o.attach     = HDoubleClick_attach;
   return o;
}
// ------------------------------------------------------------
function HDoubleClick_attach(e){
   var o = this;
}
// ------------------------------------------------------------
