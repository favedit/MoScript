function HMouseWheel(n){
   var o = this;
   o.annotation = EAnnotation.Event;
   o.type       = 'mousewheel';
   o.handle     = 'onmousewheel';
   // Attribute
   o.name       = n;
   o.source     = null;
   o.hSource    = null;
   // Attribute
   o.keyAlt     = null;
   o.keyAlt     = null;
   o.x          = null;
   o.y          = null;
   ///@attribute 用来保存上下键值
   o.wheelDelta = null;
   // Method
   o.attach     = HMouseWheel_attach;
   return o;
}
// ------------------------------------------------------------
function HMouseWheel_attach(e){
   var o = this;
   o.keyAlt = e.altKey;
   o.keyCtrl = e.ctrlKey;
   o.wheelDelta = e.wheelDelta;
   o.x = e.x;
   o.y = e.y;
}
// ------------------------------------------------------------
