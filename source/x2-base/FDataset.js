// ============================================================
// FDataset
// ============================================================
function FDataset(o){
   o = RClass.inherits(this, o, FComponent);
   // Attribute
   o.service    = null;
   o.position   = 0;
   o.page       = 0;
   o.pageSize   = 20;
   o.pageCount  = 1;
   o.total      = null;
   o.dataset    = new TDataset();
   // Method
   o.create     = FDataset_create;
   o.count      = FDataset_count;
   o.row        = FDataset_row;
   o.current    = FDataset_current;
   o.isChanged  = FDataset_isChanged;
   o.get        = FDataset_get;
   o.set        = FDataset_set;
   o.move       = FDataset_move;
   o.moveToRow  = FDataset_moveToRow;
   o.find       = FDataset_find;
   o.loadNode   = FDataset_loadNode;
   o.dump       = FDataset_dump;
   return o;
}
// ------------------------------------------------------------
// config
function FDataset_create(c){
   return this.dataset.create(c);
}
// ------------------------------------------------------------
function FDataset_count(){
   return this.dataset.count;
}
// ------------------------------------------------------------
function FDataset_row(n){
   return this.dataset.get(n);
}
// ------------------------------------------------------------
function FDataset_current(){
   return this.row(this.position);
}
// ------------------------------------------------------------
function FDataset_isChanged(){
   var o = this;
   var d = o.dataset;
   for(var n=0; n<d.count; n++){
      var r = d.get(n);
      if(r && r.isSave()){
         return true;
      }
   }
   return false;
}
// ------------------------------------------------------------
function FDataset_get(n){
   var r = this.current();
   return r ? r.get(n) : '';
}
// ------------------------------------------------------------
// name, value
function FDataset_set(n, v){
   var r = this.current();
   if(r){
      r.set(n, v);
   }
}
// ------------------------------------------------------------
// position
function FDataset_move(p){
   this.position = p;
}
// ------------------------------------------------------------
function FDataset_moveToRow(row){
   var p = this.dataset.indexOf(row);
   if(-1 != p){
      this.position = p;
   }
}
// ------------------------------------------------------------
// arguments
function FDataset_find(){
   return this.dataset.findByArgs(arguments);
}
// ------------------------------------------------------------
function FDataset_loadNode(config){
   if(config && config.nodes){
      var nodes = config.nodes;
      for(var n=0; n<nodes.count; n++){
         var node = nodes.get(n);
         if(node && node.isName('Row')){
            var row = this.dataset.create();
            row.loadNode(node);
            row.store();
         }
      }
   }
}
// ------------------------------------------------------------
function FDataset_dump(s){
   var o = this;
   s = RString.nvlStr(s);
   s.appendLine(RClass.dump(o));
   o.dataset.dump(s);
   return s;
}
// ------------------------------------------------------------
