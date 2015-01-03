// ============================================================
// RLayer
// ============================================================
var RLayer = new function(o){
   if(!o){o=this;}
   // Attribute
   o.layers = new Array();
   // Member
   o.next   = RLayer_next;
   o.free   = RLayer_free;
   // Construct
   RMemory.register('RLayer', o);
   return o;
}
// ------------------------------------------------------------
function RLayer_next(type){
   var o = this;
   var n = RInt.nvl(type, ELayer.Default);
   var c = RInt.nvl(o.layers[n], n);
   o.layers[n] = ++c;
   return c;
}
// ------------------------------------------------------------
// type, layer
function RLayer_free(type, layer){
   var o = this;
   var n = RInt.nvl(type, ELayer.Default);
   var c = RInt.nvl(o.layers[n], n);
   --c;
   if(c > n){
      o.layers[n] = c;
   }
   return c;
}
// ------------------------------------------------------------
