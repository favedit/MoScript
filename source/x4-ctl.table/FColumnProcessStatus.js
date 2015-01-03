// ============================================================
// FColumnProcessStatus
// ============================================================
function FColumnProcessStatus(o){
   o = RClass.inherits(this, o, FColumnEditControl, MDescProcessStatus);
   // Attribute
   o.__cellClass = FCellProcessStatus;
   return o;
}
// ------------------------------------------------------------
