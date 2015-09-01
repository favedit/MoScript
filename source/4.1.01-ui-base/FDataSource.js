//==========================================================
// <T>数据源。</T>
//
// @tool
// @author maocy
// @version 150901
//==========================================================
MO.FDataSource = function FDataSource(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._currentRow     = MO.Class.register(o, new MO.AGetter('_currentRow'));
   o._currentDataset = MO.Class.register(o, new MO.AGetter('_currentDataset'));
   // @attribute
   o._datasets       = null;
   //..........................................................
   // @method
   o.construct       = MO.FDataSource_construct;
   // @method
   o.selectDataset   = MO.FDataSource_selectDataset;
   o.selectRow       = MO.FDataSource_selectRow;
   // @method
   o.loadConfig      = MO.FDataSource_loadConfig;
   o.saveConfig      = MO.FDataSource_saveConfig;
   // @method
   o.dispose         = MO.FDataSource_dispose;

   //..........................................................
   // @attribute
   //o._service    = null;
   //o._position   = 0;
   //o._page       = 0;
   //o._pageSize   = 20;
   //o._pageCount  = 1;
   //o._total      = null;
   //o.dataset    = new TDataset();
   // @attribute
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
MO.FDataSource_construct = function FDataSource_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   // 设置属性
   o._datasets = new MO.TDictionary();
}

//==========================================================
// <T>选择数据集。</T>
//
// @method
// @param name:String 名称
// @return FDataset 数据集
//==========================================================
MO.FDataSource_selectDataset = function FDataSource_selectDataset(name){
   var o = this;
   var datasets = o._datasets;
   var name = MO.Lang.String.nvl(name, 'default');
   var dataset = datasets.get(name);
   if(!dataset){
      dataset = MO.Class.create(MO.FDataset);
      dataset.setName(name);
      datasets.set(name, dataset);
   }
   o._currentDataset = dataset;
   return dataset;
}

//==========================================================
// <T>选择数据集。</T>
//
// @method
// @param row:FDataRow 数据行
// @return FDataRow 数据行
//==========================================================
MO.FDataSource_selectRow = function FDataSource_selectRow(row){
   var o = this;
   // 设置指定数据行
   if(row){
      o._currentRow = row;
      return;
   }
   // 自动选择数据行
   var row = null;
   var dataset = o._currentDataset;
   if(dataset.isEmpty()){
      row = dataset.createRow();
   }else{
      row = dataset.rows.first();
   }
   o._currentRow = row;
   return row;
}

//==========================================================
// <T>加载配置信息到数据源中。</T>
//
// @method
// @param xconfig:TXmlNode 配置节点
//==========================================================
MO.FDataSource_loadConfig = function FDataSource_loadConfig(xconfig){
   var o = this;
   debugger
   // 获得数据集信息
   o._code = x.get('name');
   o._pageSize = MO.Lang.Integer.parse(x.get('page_size', 1000));
   o._pageIndex = MO.Lang.Integer.parse(x.get('page', 0));
   o._pageCount = MO.Lang.Integer.parse(x.get('page_count', 1));
   o._total = MO.Lang.Integer.parse(x.get('total'));
   // 加载数据行记录
   var xns = x.nodes();
   if(xns){
      var rs = o._rows;
      var xnc = xns.count();
      for(var i = 0; i < xnc; i++){
         var xn = xns.get(i);
         if(xn.isName('Row')){
            var r = o.createRow();
            r.loadConfig(xn);
            // 察看原来的缓冲中是否有数据行，有则使用旧对象
            //var r = rs.memory[n];
            //if(!r){
            //   var r = new FDataRow();
            //   r.dataset = o;
            //   rs._count = n;
            //   rs.push(r);
            //}else{
            //   r.release();
            //}
            // 加载行对象的数据
            //r.loadNode(xr);
         }
      }
      //rs._count = xrc;
   }
}

//==========================================================
// <T>保存配置信息到数据源中。</T>
//
// @method
// @param xconfig:TXmlNode 配置节点
//==========================================================
MO.FDataSource_saveConfig = function FDataSource_saveConfig(xconfig){
   var o = this;
   // 存储数据集合
   var datasets = o._datasets;
   var count = datasets.count();
   for(var i = 0; i < count; i++){
      var dataset = datasets.at(i);
      dataset.saveConfig(xconfig.create('Dataset'));
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FDataSource_dispose = function FDataSource_dispose(){
   var o = this;
   o._datasets = MO.Lang.Object.dispose(o._datasets);
   // 父处理
   o.__base.FObject.dispose.call(o);
}












// ------------------------------------------------------------
// config
MO.FDataSource_create = function FDataSource_create(c){
   return this.dataset.create(c);
}
// ------------------------------------------------------------
MO.FDataSource_count = function FDataSource_count(){
   return this.dataset.count;
}
// ------------------------------------------------------------
MO.FDataSource_row = function FDataSource_row(n){
   return this.dataset.get(n);
}
// ------------------------------------------------------------
MO.FDataSource_current = function FDataSource_current(){
   return this.row(this._position);
}
// ------------------------------------------------------------
MO.FDataSource_isChanged = function FDataSource_isChanged(){
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
MO.FDataSource_get = function FDataSource_get(n){
   var r = this.current();
   return r ? r.get(n) : '';
}
// ------------------------------------------------------------
// name, value
MO.FDataSource_set = function FDataSource_set(n, v){
   var r = this.current();
   if(r){
      r.set(n, v);
   }
}
// ------------------------------------------------------------
// position
MO.FDataSource_move = function FDataSource_move(p){
   this._position = p;
}
// ------------------------------------------------------------
MO.FDataSource_moveToRow = function FDataSource_moveToRow(row){
   var p = this.dataset.indexOf(row);
   if(-1 != p){
      this._position = p;
   }
}
// ------------------------------------------------------------
// arguments
MO.FDataSource_find = function FDataSource_find(){
   return this.dataset.findByArgs(arguments);
}
// ------------------------------------------------------------
MO.FDataSource_loadNode = function FDataSource_loadNode(config){
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
MO.FDataSource_dump = function FDataSource_dump(s){
   var o = this;
   s = RString.nvlStr(s);
   s.appendLine(RClass.dump(o));
   o.dataset.dump(s);
   return s;
}
