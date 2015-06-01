// ============================================================
// FColumnReference
// ============================================================
function FColumnReference(o){
   o = RClass.inherits(this, o, FColumn);
   // Attribute
   o.cellClass = FCellReference;
   return o;
}
// ------------------------------------------------------------
