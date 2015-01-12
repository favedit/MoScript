function HKeyPress(n){
   var o = this;
   o.annotation = EAnnotation.Event;
   o.type       = 'keypress';
   o.handle     = 'onkeypress';
   // Attribute
   o.name       = n;
   o.source     = null;
   o.hSource    = null;
   // Attribute
   o.keyCode    = null;
   o.srcElement = null;
   // Method
   o.attach     = HKeyPress_attach;
   return o;
}
// ------------------------------------------------------------
function HKeyPress_attach(e){
   var o = this;
   o.keyCode = e.keyCode;
   o.srcElement = e.srcElement;
}
// ------------------------------------------------------------
