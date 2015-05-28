// ============================================================
// FColumnNumber
// ============================================================
function FColumnPicture(o){
   o = RClass.inherits(this, o, FColumnEditControl, MDescPicture);
   // Attribute
   o.__cellClass = FCellPicture;
   return o;
}
// ------------------------------------------------------------
