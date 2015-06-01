// ============================================================
// FColumnIcon
// ============================================================
function FColumnIcon(o){
   o = RClass.inherits(this, o, FColumn);
   // Attribute
   o.__cellClass = FCellIcon;
   return o;
}
// ------------------------------------------------------------
