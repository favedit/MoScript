function HMouseUp(n){
   var o = this;
   o.annotation = EAnnotation.Event;
   o.type       = 'mouseup';
   o.handle     = 'onmouseup';
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
   o.attach     = HMouseUp_attach;
   return o;
}
// ------------------------------------------------------------
function HMouseUp_attach(e){
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
