// ============================================================
// FDiscussion
// ============================================================
function FDiscussion(o){
   o = RClass.inherits(this, o, FTable, MTop);
   // Attribute
   o.style = FDiscussion_style;
   return o;
}
// ------------------------------------------------------------
function FDiscussion_style(n){
   return RClass.name(FTable) + '_' + n;
}
// ------------------------------------------------------------
