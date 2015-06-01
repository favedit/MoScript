// ============================================================
// TGroupItem
// ============================================================
function TGroupItem(){
   var o = this;
   // @attribute
   o.select           = null;
   o.label            = null;
   o.value            = null;
   // @method
   o.unpack           = TGroupItem_unpack;
   return o;
}
// ------------------------------------------------------------
function TGroupItem_unpack(v){
   var o = this;
   var as = new TAttributes();
   as.unpack(v);
   o.label = as.nvl('L');
   o.select = as.nvl('S');
   o.value = as.nvl('D');
}
