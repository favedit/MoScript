// ============================================================
// FColumnColorPicker
// ============================================================
function FColumnColorPicker(o){
   o = RClass.inherits(this, o, FColumnEditControl, MDescColor);
   // Attribute
   o.__cellClass = FCellColorPicker;
   return o;
}
// ------------------------------------------------------------
