// ============================================================
// FColumnTree
// ============================================================
function FColumnBar(o){
   o = RClass.inherits(this, o, FColumn);
   // Attribute
   o.__cellClass = FCellBar;
   o.icon        = RClass.register(o, new TPtyStr('icon'));
   return o;
}