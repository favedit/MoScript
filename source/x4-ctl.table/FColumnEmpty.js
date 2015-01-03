// ============================================================
// FColumnEmpty
// ============================================================
function FColumnEmpty(o){
   o = RClass.inherits(this, o, FColumn);
   // @attribute
   o.dispList          = true;
   // @event
   o.onBuildSearchForm = RMethod.empty;
   return o;
}
// ------------------------------------------------------------
