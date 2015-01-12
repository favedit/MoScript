function HMouseDown(n){
   var o = this;
   o.annotation = EAnnotation.Event;
   o.type       = 'mousedown';
   o.handle     = 'onmousedown';
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
   o.attach     = HMouseDown_attach;
   return o;
}
// ------------------------------------------------------------
function HMouseDown_attach(e){
   var o = this;
   o.keyAlt = e.altKey;
   o.keyCtrl = e.ctrlKey;
   if(window.event){
      o.x = e.x;
      o.y = e.y;
      o.offsetX = e.offsetX;
      o.offsetY = e.offsetY;
   }else{
      o.x = e.pageX;
      o.y = e.pageY;
      o.offsetX = e.layerX;
      o.offsetY = e.layerY;
   }
   o.clientX = e.clientX;
   o.clientY = e.clientY;
   o.srcElement = e.srcElement;
}
// ------------------------------------------------------------
