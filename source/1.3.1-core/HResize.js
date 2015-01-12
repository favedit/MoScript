function HResize(n){
   var o = this;
   o.annotation = EAnnotation.Event;
   o.type       = 'resize';
   o.handle     = 'onresize';
   // Attribute
   o.name       = n;
   o.source     = null;
   o.hSource    = null;
   // Attribute
   o.x          = null;
   o.y          = null;
   // Method
   o.attach     = HResize_attach;
   return o;
}
// ------------------------------------------------------------
function HResize_attach(e){
   var o = this;
   o.x = e.x;
   o.y = e.y;
}
// ------------------------------------------------------------
