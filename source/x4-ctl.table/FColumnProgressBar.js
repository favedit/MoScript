// ============================================================
// FColumnProgressBar
// ============================================================
function FColumnProgressBar(o){
   o = RClass.inherits(this, o, FColumn);
   // Attribute
   o.dispStyle   = RClass.register(o, new TPtyStr('dispStyle'));
   o.__cellClass = FCellProgressBar;
   return o;
}
