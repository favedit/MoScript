// ============================================================
// TControlInfo
// ============================================================
function TGroupControl(){
   var o = this;
   // @attribute
   o.items           = new TList();
   // @method
   o.unpack          = TGroupControl_unpack;
   return o;
}
// ------------------------------------------------------------
function TGroupControl_unpack(v){
   var o = this;
   var ss = new TStrings();
   ss.unpack(v.substring(2));
   for(n = 0; n<ss.count; n++){
      var it = new TGroupItem();
      it.unpack(ss.get(n));
      o.items.push(it);
   }
}
