// ============================================================
// FColumnProgress
// ============================================================
function FColumnProgress(o){
   o = RClass.inherits(this, o, FColumnEditControl, MDescProgress);
   // Attribute
   o.cellClass = FCellProgress;
   return o;
}
// ------------------------------------------------------------
