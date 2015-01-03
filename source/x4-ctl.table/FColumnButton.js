// =========================================================
// FColumnButton
// =========================================================
function FColumnButton(o){
   o = RClass.inherits(this, o, FColumn);
   // @attribute
   o.__cellClass = FCellButton;
   return o;
}
// ---------------------------------------------------------
