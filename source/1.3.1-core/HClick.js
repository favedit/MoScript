function HClick(n){
   var o = this;
   o.annotation = EAnnotation.Event;
   o.type       = 'click';
   o.handle     = 'onclick';
   // Attribute
   o.name       = n;
   o.source     = null;
   o.hSource    = null;
   // Attribute
   // Method
   o.attach     = HClick_attach;
   return o;
}
// ------------------------------------------------------------
function HClick_attach(e){
   var o = this;
   o.srcElement = e.srcElement;
}
// ------------------------------------------------------------
