// ============================================================
// TItems
// ============================================================
function TItems(value, label){
   var o = this;
   // Attribute
   o.code       = RClass.dump(o);
   o.items      = new TMap();
   // Method
   o.loadConfig = TItems_loadConfig;
   o.create     = TItems_create;
   o.count      = TItems_count;
   o.indexOf    = TItems_indexOf;
   o.get        = TItems_get;
   o.find       = TItems_find;
   o.value      = TItems_value;
   o.label      = TItems_label;
   o.getLabel   = TItems_getLabel;
   return o;
}
// ------------------------------------------------------------
// config
function TItems_loadConfig(c){
   var o = this;
   // Load items
   if(c && c.nodes){
      var ns = c.nodes;
      for(var n=0; n<ns.count; n++){
         var nd = ns.get(n);
         if(nd && nd.isName('Item')){
            var item = new TItem();
            item.loadConfig(nd);
            o.items.set(item.value, item);
         }
      }
   }
}
// ------------------------------------------------------------
function TItems_create(value, label){
   var o = new TItem(value, label);
   this.items.set(o.value, o);
   return o;
}
// ------------------------------------------------------------
function TItems_count(){
   return this.items.count;
}
// ------------------------------------------------------------
function TItems_indexOf(value){
   return this.items.indexOf(value);
}
// ------------------------------------------------------------
function TItems_get(index){
   return this.items.value(index);
}
// ------------------------------------------------------------
function TItems_find(name){
   return this.items.get(name);
}
// ------------------------------------------------------------
// label
function TItems_value(s){
   if(!RString.isEmpty(s)){
      var o = this;
      var count = o.items.count;
      for(var n=0; n<count; n++){
         var t = o.items.value(n);
         if(t.label == s){
            return t.value;
         }
      }
   }
   return '';
}
// ------------------------------------------------------------
// value
function TItems_label(v){
   var o = this.items.get(v);
   return o ? o.label : RString.nvl(v);
}
// ------------------------------------------------------------
function TItems_getLabel(index){
   var o = this.items.value(index);
   return o ? o.label : '';
}
// ------------------------------------------------------------
