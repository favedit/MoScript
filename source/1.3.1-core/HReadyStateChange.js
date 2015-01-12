function HReadyStateChange(n, m){
   var o = this;
   o.annotation = EAnnotation.Event;
   o.type       = 'readystatechange';
   o.handle     = 'onreadystatechange';
   // Attribute
   o.name       = n;
   o.method     = m;
   o.source     = null;
   o.hSource    = null;
   // Attribute
   // Method
   o.attach     = HReadyStateChange_attach;
   return o;
}
// ------------------------------------------------------------
function HReadyStateChange_attach(e){
   var o = this;
}
// ------------------------------------------------------------
