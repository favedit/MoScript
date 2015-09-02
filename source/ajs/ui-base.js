MO.EDataStatus = new function EDataStatus(){
   var o = this;
   o.Unknown = '';
   o.Insert = 'I';
   o.Update = 'U';
   o.Delete = 'D';
   return o;
}
MO.FDataRow = function FDataRow(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._dataset    = MO.Class.register(o, new MO.AGetSet('_dataset'));
   o._index      = MO.Class.register(o, new MO.AGetSet('_index'), 0);
   o._statusCd   = MO.Class.register(o, new MO.AGetSet('_statusCd'), MO.EDataStatus.Unknown);
   o._dataValues = null;
   o.construct   = MO.FDataRow_construct;
   o.isEmpty     = MO.FDataRow_isEmpty;
   o.count       = MO.FDataRow_count;
   o.get         = MO.FDataRow_get;
   o.set         = MO.FDataRow_set;
   o.clear       = MO.FDataRow_clear;
   o.loadConfig  = MO.FDataRow_loadConfig;
   o.saveConfig  = MO.FDataRow_saveConfig;
   o.dispose     = MO.FDataRow_dispose;
   return o;
}
MO.FDataRow_construct = function FDataRow_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._dataValues = new MO.TDictionary();
}
MO.FDataRow_isEmpty = function FDataRow_isEmpty(){
   return this._dataValues.isEmpty();
}
MO.FDataRow_count = function FDataRow_count(){
   return this._dataValues.count();
}
MO.FDataRow_get = function FDataRow_get(name, defaultValue){
   var o = this;
   var dataValue = o._dataValues.get(name);
   if(dataValue){
      return dataValue.get();
   }
   return defaultValue;
}
MO.FDataRow_set = function FDataRow_set(name, value, typeCd){
   var o = this;
   var dataValues = o._dataValues;
   var dataValue = dataValues.get(name);
   if(!dataValue){
      dataValue = MO.Class.create(MO.FDataValue);
      dataValues.set(name, dataValue);
   }
   dataValue.set(value, typeCd);
}
MO.FDataRow_clear = function FDataRow_clear(){
   var o = this;
   var dataValues = o._dataValues;
   var count = dataValues.count();
   for(var i = 0; i < count; i++){
      var dataValue = dataValues.at(i);
      dataValue.clear();
   }
}
MO.FDataRow_loadConfig = function FDataRow_loadConfig(xconfig){
   var o = this;
   o._statusCd = MO.EDataStatus.View;
   var attributes = xconfig.attributes();
   if(attributes){
      var count = attributes.count();
      for(var i = 0; i < count; i++){
         var name = attributes.name(i);
         var value = attributes.value(i);
         o.set(name, value);
      }
   }
}
MO.FDataRow_saveConfig = function FDataRow_saveConfig(xconfig){
   var o = this;
   xconfig.set('_status_cd', o._statusCd);
   var dataValues = o._dataValues;
   var count = dataValues.count();
   for(var i = 0; i < count; i++){
      var name = dataValues.name(i);
      var dataValue = dataValues.value(i);
      var value = dataValue.get();
      xconfig.set(name, value);
   }
}
MO.FDataRow_dispose = function FDataRow_dispose(){
   var o = this;
   o._dataValues = MO.Lang.Object.dispose(o._dataValues);
   o.__base.FObject.dispose.call(o);
}
MO.FDataset = function FDataset(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._name        = MO.Class.register(o, new MO.AGetSet('_name'));
   o._pageSize    = MO.Class.register(o, new MO.AGetSet('_pageSize'), 20);
   o._pageIndex   = MO.Class.register(o, new MO.AGetter('_pageIndex'));
   o._pageCount   = MO.Class.register(o, new MO.AGetter('_pageCount'));
   o._total       = MO.Class.register(o, new MO.AGetter('_total'));
   o._rows        = MO.Class.register(o, new MO.AGetter('_rows'));
   o._viewers     = MO.Class.register(o, new MO.AGetter('_viewers'));
   o.construct    = MO.FDataset_construct;
   o.isEmpty      = MO.FDataset_isEmpty;
   o.count        = MO.FDataset_count;
   o.createRow    = MO.FDataset_createRow;
   o.row          = MO.FDataset_row;
   o.rows         = MO.FDataset_rows;
   o.find         = MO.FDataset_find;
   o.findIndex    = MO.FDataset_findIndex;
   o.push         = MO.FDataset_push;
   o.erase        = MO.FDataset_erase;
   o.remove       = MO.FDataset_remove;
   o.createViewer = MO.FDataset_createViewer;
   o.loadConfig   = MO.FDataset_loadConfig;
   o.saveConfig   = MO.FDataset_saveConfig;
   o.clear        = MO.FDataset_clear;
   o.dispose      = MO.FDataset_dispose;
   return o;
}
MO.FDataset_construct = function FDataset_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._rows = new MO.TObjects();
   o._viewers = new MO.TObjects();
}
MO.FDataset_isEmpty = function FDataset_isEmpty(){
   return this._rows.isEmpty();
}
MO.FDataset_count = function FDataset_count(){
   return this._rows.count();
}
MO.FDataset_createRow = function FDataset_createRow(){
   var o = this;
   var row = MO.Class.create(MO.FDataRow);
   row.setDataset(o);
   o._rows.push(row);
   return row;
}
MO.FDataset_row = function FDataset_row(index){
   return this._rows.get(index);
}
MO.FDataset_rows = function FDataset_rows(){
   return this._rows;
}
MO.FDataset_find = function FDataset_find(){
   var o = this;
   var length = arguments.length;
   if((length % 2) != 0){
      throw new MO.TError(o, 'Parameters must is pairs (length={1})', length);
   }
   var rows = o._rows;
   var count = rows.count();
   for(var n = 0; n < count; n++){
      var row = rows.at(n);
      var find = true;
      for(var i = 0; i < length; i += 2){
         var parameterName = arguments[n];
         var parameterValue = arguments[n + 1];
         var findValue = row.get(parameterName)
         if(findValue != parameterValue){
            find = false;
            break;
         }
      }
      if(find){
         return row;
      }
   }
   return null;
}
MO.FDataset_findIndex = function FDataset_findIndex(index){
   var o = this;
   var rows = o._rows;
   var count = rows.count();
   for(var n = 0; n < count; n++){
      var row = rows.at(n);
      var rowIndex = row.index();
      if(rowIndex = index){
         return row;
      }
   }
   return null;
}
MO.FDataset_push = function FDataset_push(row){
   this._rows.push(row);
}
MO.FDataset_erase = function FDataset_erase(index){
   return this._rows.remove(index);
}
MO.FDataset_remove = function FDataset_remove(row){
   this._rows.remove(row);
}
MO.FDataset_createViewer = function FDataset_createViewer(offset, count){
   var o = this;
   var viewer = MO.Class.create(MO.FDatasetViewer);
   viewer.setDataset(o);
   viewer.setOffset(MO.Runtime.nvl(offset, 0));
   viewer.setCount(MO.Runtime.nvl(count, o._rows.count()));
   o._viewers.push(viewer);
   return row;
}
MO.FDataset_loadConfig = function FDataset_loadConfig(xconfig){
   var o = this;
   o._code = xconfig.get('name');
   o._pageSize = MO.Lang.Integer.parse(xconfig.get('page_size', 1000));
   o._pageIndex = MO.Lang.Integer.parse(xconfig.get('page', 0));
   o._pageCount = MO.Lang.Integer.parse(xconfig.get('page_count', 1));
   o._total = MO.Lang.Integer.parse(xconfig.get('total'));
   var xnodes = xconfig.nodes();
   if(xnodes){
      var count = xnodes.count();
      for(var i = 0; i < count; i++){
         var xnode = xnodes.at(i);
         if(xnode.isName('Row')){
            var row = o.createRow();
            row.loadConfig(xnode);
         }
      }
   }
}
MO.FDataset_saveConfig = function FDataset_saveConfig(xconfig){
   var o = this;
   xconfig.set('name', o._name);
   var rows = o._rows;
   var count = rows.count();
   for(var i = 0; i < count; i++){
      var row = rows.at(i);
      row.saveConfig(xconfig.create('Row'));
   }
}
MO.FDataset_clear = function FDataset_clear(){
   var o = this;
   o._pageSize = 20;
   o._pageIndex = 0;
   o._pageCount = 0;
   o._total = 0;
   o._rows.clear();
}
MO.FDataset_dispose = function FDataset_dispose(){
   var o = this;
   o._values = MO.Lang.Object.dispose(o._values);
   o.__base.FObject.dispose.call(o);
}
MO.FDatasetViewer = function FDatasetViewer(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._dataset  = MO.Class.register(o, new MO.AGetSet('_dataset'));
   o._position = MO.Class.register(o, new MO.AGetter('_position'), 0);
   o._offset   = MO.Class.register(o, new MO.AGetSet('_offset'), 0);
   o._count    = MO.Class.register(o, new MO.AGetSet('_count'), 0);
   o.construct = MO.FDatasetViewer_construct;
   o.isEmpty   = MO.FDatasetViewer_isEmpty;
   o.current   = MO.FDatasetViewer_current;
   o.first     = MO.FDatasetViewer_first;
   o.prior     = MO.FDatasetViewer_prior;
   o.next      = MO.FDatasetViewer_next;
   o.last      = MO.FDatasetViewer_last;
   o.move      = MO.FDatasetViewer_move;
   o.moveToRow = MO.FDatasetViewer_moveToRow;
   o.reset     = MO.FDatasetViewer_reset;
   o.dispose   = MO.FDatasetViewer_dispose;
   return o;
}
MO.FDatasetViewer_construct = function FDatasetViewer_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
MO.FDatasetViewer_isEmpty = function FDatasetViewer_isEmpty(){
   return (this._count == 0);
}
MO.FDatasetViewer_current = function FDatasetViewer_current(){
   var o = this;
   var position = o._position;
   if(position != -1){
      var index = position + o._offset;
      var rows = o._dataset.rows();
      var row = rows.get(index);
      return row;
   }
   return null;
}
MO.FDatasetViewer_move = function FDatasetViewer_move(position){
   var o = this;
   var count = o._count;
   if(count > 0){
      if((position >= 0) && (position < count)){
         o._position = position;
         return true;
      }
   }
   return false;
}
MO.FDatasetViewer_moveToRow = function FDatasetViewer_moveToRow(row){
   var o = this;
   var index = o._rows.indexOf(row);
   if(index != -1){
      o._position = index - o._offset;
   }
}
MO.FDatasetViewer_first = function FDatasetViewer_first(){
   var o = this;
   var count = o._count;
   if(count > 0){
      o._position = 0;
      return true;
   }else{
      o._position = -1;
      return false;
   }
}
MO.FDatasetViewer_prior = function FDatasetViewer_prior(){
   var o = this;
   if(o._position > 0){
      o._position--;
      return true;
   }
   return false;
}
MO.FDatasetViewer_next = function FDatasetViewer_next(){
   var o = this;
   if(o._position < o._count - 1){
      o._position++;
      return true;
   }
   return false;
}
MO.FDatasetViewer_last = function FDatasetViewer_last(){
   var o = this;
   var count = o._count;
   if(count > 0){
      o._position = count - 1;
      return true;
   }else{
      o._position = -1;
      return false;
   }
}
MO.FDatasetViewer_reset = function FDatasetViewer_reset(){
   this._position = -1;
}
MO.FDatasetViewer_dispose = function FDatasetViewer_dispose(){
   var o = this;
   o._dataset = null;
   o.__base.FObject.dispose.call(o);
}
MO.FDataSource = function FDataSource(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._currentRow     = MO.Class.register(o, new MO.AGetter('_currentRow'));
   o._currentDataset = MO.Class.register(o, new MO.AGetter('_currentDataset'));
   o._datasets       = null;
   o.construct       = MO.FDataSource_construct;
   o.selectDataset   = MO.FDataSource_selectDataset;
   o.selectRow       = MO.FDataSource_selectRow;
   o.loadConfig      = MO.FDataSource_loadConfig;
   o.saveConfig      = MO.FDataSource_saveConfig;
   o.dispose         = MO.FDataSource_dispose;
   return o;
}
MO.FDataSource_construct = function FDataSource_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._datasets = new MO.TDictionary();
}
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
MO.FDataSource_selectRow = function FDataSource_selectRow(row){
   var o = this;
   if(row){
      o._currentRow = row;
      return;
   }
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
MO.FDataSource_loadConfig = function FDataSource_loadConfig(xconfig){
   var o = this;
   var xnodes = xconfig.nodes();
   if(xnodes){
      var datasets = o._datasets;
      var count = xnodes.count();
      for(var i = 0; i < count; i++){
         var xnode = xnodes.at(i);
         if(xnode.isName('Dataset')){
            var datasetName = xnode.get('name');
            MO.Assert.debugNotEmpty(datasetName);
            var dataset = o.selectDataset(datasetName);
            dataset.loadConfig(xnode);
         }
      }
   }
}
MO.FDataSource_saveConfig = function FDataSource_saveConfig(xconfig){
   var o = this;
   var datasets = o._datasets;
   var count = datasets.count();
   for(var i = 0; i < count; i++){
      var dataset = datasets.at(i);
      dataset.saveConfig(xconfig.create('Dataset'));
   }
}
MO.FDataSource_dispose = function FDataSource_dispose(){
   var o = this;
   o._datasets = MO.Lang.Object.dispose(o._datasets);
   o.__base.FObject.dispose.call(o);
}
MO.FDataSource_create = function FDataSource_create(c){
   return this.dataset.create(c);
}
MO.FDataSource_count = function FDataSource_count(){
   return this.dataset.count;
}
MO.FDataSource_row = function FDataSource_row(n){
   return this.dataset.get(n);
}
MO.FDataSource_current = function FDataSource_current(){
   return this.row(this._position);
}
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
MO.FDataSource_get = function FDataSource_get(n){
   var r = this.current();
   return r ? r.get(n) : '';
}
MO.FDataSource_set = function FDataSource_set(n, v){
   var r = this.current();
   if(r){
      r.set(n, v);
   }
}
MO.FDataSource_move = function FDataSource_move(p){
   this._position = p;
}
MO.FDataSource_moveToRow = function FDataSource_moveToRow(row){
   var p = this.dataset.indexOf(row);
   if(-1 != p){
      this._position = p;
   }
}
MO.FDataSource_find = function FDataSource_find(){
   return this.dataset.findByArgs(arguments);
}
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
MO.FDataSource_dump = function FDataSource_dump(s){
   var o = this;
   s = RString.nvlStr(s);
   s.appendLine(RClass.dump(o));
   o.dataset.dump(s);
   return s;
}
MO.FDataValue = function FDataValue(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._typeCd           = MO.Class.register(o, new MO.AGetter('_typeCd'), MO.EDataType.Unknown);
   o._origin           = MO.Class.register(o, new MO.AGetSet('_origin'));
   o._value            = MO.Class.register(o, new MO.AGetSet('_value'));
   o._listenersChanged = null;
   o.isSet             = MO.FDataValue_isSet;
   o.listenersChanged  = MO.FDataValue_listenersChanged;
   o.get               = MO.FDataValue_get;
   o.set               = MO.FDataValue_set;
   o.clear             = MO.FDataValue_clear;
   o.dispose           = MO.FDataValue_dispose;
   return o;
}
MO.FDataValue_isSet = function FDataValue_isSet(){
   return this._typeCd != MO.EDataType.Unknown;
}
MO.FDataValue_listenersChanged = function FDataValue_listenersChanged(){
   var o = this;
   var listeners = o._listenersChanged;
   if(!listeners){
      listeners = o._listenersChanged = new MO.TListeners();
   }
   return listeners;
}
MO.FDataValue_get = function FDataValue_get(){
   var o = this;
   if(o._typeCd != MO.EDataType.Unknown){
      return o._value;
   }
   return null;
}
MO.FDataValue_set = function FDataValue_set(value, typeCd){
   var o = this;
   o._typeCd = MO.Runtime.nvl(typeCd, MO.EDataType.String);
   o._origin = value;
   o._value = value;
}
MO.FDataValue_clear = function FDataValue_clear(){
   var o = this;
   o._typeCd = MO.EDataType.Unknown;
   o._origin = null;
   o._value = null;
}
MO.FDataValue_dispose = function FDataValue_dispose(){
   var o = this;
   o.clear();
   o._listenersChanged = MO.Lang.Object.dispose(o._listenersChanged);
   o.__base.FObject.dispose.call(o);
}
