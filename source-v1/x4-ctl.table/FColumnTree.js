// ============================================================
// FColumnTree
// ============================================================
function FColumnTree(o){
   o = RClass.inherits(this, o, FColumn);
   // Attribute
   o.cellClass = FCellTree;
   return o;
}
// ------------------------------------------------------------
