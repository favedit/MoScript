function HKeyUp(n){
   var o = this;
   o.annotation = EAnnotation.Event;
   o.type       = 'keyup';
   o.handle     = 'onkeyup';
   // Attribute
   o.name       = n;
   o.source     = null;
   o.hSource    = null;
   // Attribute
   o.keyCode    = null;
   o.srcElement = null;
   // Method
   o.attach     = HKeyUp_attach;
   return o;
}
// ------------------------------------------------------------
function HKeyUp_attach(e){
   var o = this;
   o.keyCode = e.keyCode;
   o.srcElement = e.srcElement;
}
// ------------------------------------------------------------
