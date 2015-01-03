// ============================================================
// MDragable
// ============================================================
function MDragable(o, create){
   o = RClass.inherits(this, o);
   // Attribute
   o.isDraging = false;
   // Method
   o.startDrag = RMethod.virtual(o, 'startDrag');
   o.stopDrag  = RMethod.virtual(o, 'stopDrag');
   return o;
}
// ------------------------------------------------------------
