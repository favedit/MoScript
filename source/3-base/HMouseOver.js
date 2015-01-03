function HMouseOver(n){
   var o = this;
   o.annotation = EAnnotation.Event;
   o.type       = 'mouseover';
   o.handle     = 'onmouseover';
   // Attribute
   o.name       = n;
   o.source     = null;
   o.hSource    = null;
   // Attribute
   o.keyAlt     = null;
   o.keyAlt     = null;
   o.x          = null;
   o.y          = null;
   o.srcElement = null;
   // Method
   o.attach     = HMouseOver_attach;
   return o;
}
// ------------------------------------------------------------
function HMouseOver_attach(e){
   var o = this;
   o.keyAlt = e.altKey;
   o.keyCtrl = e.ctrlKey;
   o.x = e.x;
   o.y = e.y;
   o.srcElement = e.srcElement;
}
// ------------------------------------------------------------
