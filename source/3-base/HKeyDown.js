function HKeyDown(n){
   var o = this;
   o.annotation = EAnnotation.Event;
   o.type       = 'keydown';
   o.handle     = 'onkeydown';
   // Attribute
   o.name       = n;
   o.source     = null;
   o.hSource    = null;
   // Attribute
   o.ctrlKey    = false;
   o.keyCode    = null;
   // Method
   o.attach     = HKeyDown_attach;
   return o;
}
// ------------------------------------------------------------
function HKeyDown_attach(e){
   var o = this;
   o.shiftKey = e.shiftKey;
   o.ctrlKey = e.ctrlKey;
   o.keyCode = e.keyCode;
}
// ------------------------------------------------------------
