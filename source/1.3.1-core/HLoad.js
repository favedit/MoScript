function HLoad(n, m){
   var o = this;
   o.annotation = EAnnotation.Event;
   o.type       = 'load';
   o.handle     = 'onload';
   // Attribute
   o.name       = n;
   o.method     = m;
   o.source     = null;
   o.hSource    = null;
   // Attribute
   // Method
   o.attach     = HLoad_attach;
   return o;
}
// ------------------------------------------------------------
function HLoad_attach(e){
   var o = this;
}
// ------------------------------------------------------------
