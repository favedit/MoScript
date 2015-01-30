// ============================================================
// FDataSource
// ============================================================
function FDataSource(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._currentRow     = null;
   o._currentDataset = null;
   o._datasets       = null;
   //..........................................................
   // @method
   o.construct       = FDataSource_construct;
   // @method
   o.selectDataset   = FDataSource_selectDataset;
   o.currentDataset  = FDataSource_currentDataset;
   o.selectRow       = FDataSource_selectRow;
   o.currentRow      = FDataSource_currentRow;


   //..........................................................
   // @attribute
   //o._service    = null;
   //o._position   = 0;
   //o._page       = 0;
   //o._pageSize   = 20;
   //o._pageCount  = 1;
   //o._total      = null;
   //o.dataset    = new TDataset();
   // Method
   //o.create     = FDataSource_create;
   //o.count      = FDataSource_count;
   //o.row        = FDataSource_row;
   //o.current    = FDataSource_current;
   //o.isChanged  = FDataSource_isChanged;
   //o.get        = FDataSource_get;
   //o.set        = FDataSource_set;
   //o.move       = FDataSource_move;
   //o.moveToRow  = FDataSource_moveToRow;
   //o.find       = FDataSource_find;
   //o.loadNode   = FDataSource_loadNode;
   //o.dump       = FDataSource_dump;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDataSource_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._datasets = new TDictionary();
}

//==========================================================
// <T>选择数据集。</T>
//
// @method
// @param p:name:String 名称
// @return TDataset 数据集
//==========================================================
function FDataSource_selectDataset(p){
   var o = this;
   var dn = RString.nvl(p, 'default');
   var d = o._datasets.get(dn);
   if(d == null){
      d = new TDataset();
      d._name = dn;
      o._datasets.set(dn, d);
   }
   o._currentDataset = d;
}

//==========================================================
// <T>获得当前数据集。</T>
//
// @method
// @return TDataset 数据集
//==========================================================
function FDataSource_currentDataset(){
   return this._currentDataset;
}

//==========================================================
// <T>选择数据集。</T>
//
// @method
// @param p:name:String 名称
// @return TDataset 数据集
//==========================================================
function FDataSource_selectRow(p){
   var o = this;
   // 设置指定数据行
   if(p){
      o._currentRow = p;
      return;
   }
   // 自动选择数据行
   var d = o._currentDataset;
   var r = d.rows().first();
   if(r == null){
      r = d.createRow();
   }
   o._currentRow = r;
   return r;
}

//==========================================================
// <T>获得当前数据行。</T>
//
// @method
// @return TRow 数据行
//==========================================================
function FDataSource_currentRow(){
   return this._currentRow;
}






// ------------------------------------------------------------
// config
function FDataSource_create(c){
   return this.dataset.create(c);
}
// ------------------------------------------------------------
function FDataSource_count(){
   return this.dataset.count;
}
// ------------------------------------------------------------
function FDataSource_row(n){
   return this.dataset.get(n);
}
// ------------------------------------------------------------
function FDataSource_current(){
   return this.row(this._position);
}
// ------------------------------------------------------------
function FDataSource_isChanged(){
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
function FDataSource_get(n){
   var r = this.current();
   return r ? r.get(n) : '';
}
// ------------------------------------------------------------
// name, value
function FDataSource_set(n, v){
   var r = this.current();
   if(r){
      r.set(n, v);
   }
}
// ------------------------------------------------------------
// position
function FDataSource_move(p){
   this._position = p;
}
// ------------------------------------------------------------
function FDataSource_moveToRow(row){
   var p = this.dataset.indexOf(row);
   if(-1 != p){
      this._position = p;
   }
}
// ------------------------------------------------------------
// arguments
function FDataSource_find(){
   return this.dataset.findByArgs(arguments);
}
// ------------------------------------------------------------
function FDataSource_loadNode(config){
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
function FDataSource_dump(s){
   var o = this;
   s = RString.nvlStr(s);
   s.appendLine(RClass.dump(o));
   o.dataset.dump(s);
   return s;
}
// ------------------------------------------------------------
