// ============================================================
// RNaming
// ============================================================
var RNaming = new function(){
   var o = this;
   // Attribute
   o.pool = new Array();
   // Method
   o.get  = RNaming_get;
   o.set  = RNaming_set;
   // Construct
   RMemory.register('RNaming', o);
   return o;
}
// ------------------------------------------------------------
// class, name
function RNaming_get(c, n){
   if(c){
      n = RString.nvl(n) + '@' + RClass.name(c);
      return this.pool[n.toLowerCase()];
   }
   return null;
}
// ------------------------------------------------------------
// instance, name
function RNaming_set(o, n){
   if(o){
      n = RString.nvl(n) + '@' + RClass.name(o);
      this.pool[n.toLowerCase()] = o;
   }
}
// ------------------------------------------------------------
