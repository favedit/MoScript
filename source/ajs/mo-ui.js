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
   o._total       = MO.Class.register(o, new MO.AGetter('_total'));
   o._pageSize    = MO.Class.register(o, new MO.AGetSet('_pageSize'), 20);
   o._pageCount   = MO.Class.register(o, new MO.AGetter('_pageCount'));
   o._page        = MO.Class.register(o, new MO.AGetSet('_page'));
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
   o._total = MO.Lang.Integer.parse(xconfig.get('total'));
   o._pageSize = MO.Lang.Integer.parse(xconfig.get('page_size', 100));
   o._pageCount = MO.Lang.Integer.parse(xconfig.get('page_count', 1));
   o._page = MO.Lang.Integer.parse(xconfig.get('page', 0));
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
   o._page = 0;
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
MO.AEvent = function AEvent(n, l, h){
   var o = this;
   MO.AAnnotation.call(o, n);
   o._annotationCd = MO.EAnnotation.Event;
   o._inherit      = true;
   o._logger       = true;
   o._linker       = l;
   o._handle       = h;
   o._process      = null;
   o.linker        = MO.AEvent_linker;
   o.handle        = MO.AEvent_handle;
   o.value         = MO.AEvent_value;
   o.create        = MO.AEvent_create;
   o.attach        = MO.Method.empty;
   o.bind          = MO.AEvent_bind;
   o.toString      = MO.AEvent_toString;
   return o;
}
MO.AEvent_linker = function AEvent_linker(){
   return this._linker;
}
MO.AEvent_handle = function AEvent_handle(){
   return this._handle;
}
MO.AEvent_value = function AEvent_value(){
   return this._process;
}
MO.AEvent_create = function AEvent_create(){
   return new MO.SEvent();
}
MO.AEvent_bind = function AEvent_bind(hTag, capture){
   var o = this;
   if(capture){
      hTag.addEventListener(o._linker, MO.Dui.Event.ohEvent, true);
   }else{
      hTag[o._handle] = MO.Dui.Event.ohEvent;
   }
}
MO.AEvent_toString = function AEvent_toString(){
   var o = this;
   return 'linker=' + o._linker + ',handle=' + o._handle;
}
MO.AEventBlur = function AEventBlur(n, m){
   var o = this;
   MO.AEvent.call(o, n, 'blur', 'onblur');
   o.attach = MO.AEventBlur_attach;
   return o;
}
MO.AEventBlur_attach = function AEventBlur_attach(e, h){
}
MO.AEventChange = function AEventChange(n){
   var o = this;
   MO.AEvent.call(o, n, 'change', 'onchange');
   o.attach = MO.AEventChange_attach;
   return o;
}
MO.AEventChange_attach = function AEventChange_attach(e, h){
}
MO.AEventClick = function AEventClick(n){
   var o = this;
   MO.AEvent.call(o, n, 'click', 'onclick');
   o.attach = MO.AEventClick_attach;
   return o;
}
MO.AEventClick_attach = function AEventClick_attach(e, h){
   e.altKey = h.altKey;
   e.ctrlKey = h.ctrlKey;
   e.shiftKey = h.shiftKey;
}
MO.AEventDoubleClick = function AEventDoubleClick(n){
   var o = this;
   MO.AEvent.call(o, n, 'dblclick', 'ondblclick');
   o.attach = MO.AEventDoubleClick_attach;
   return o;
}
MO.AEventDoubleClick_attach = function AEventDoubleClick_attach(e, h){
   e.altKey = h.altKey;
   e.ctrlKey = h.ctrlKey;
   e.shiftKey = h.shiftKey;
}
MO.AEventFocus = function AEventFocus(n){
   var o = this;
   MO.AEvent.call(o, n, 'focus', 'onfocus');
   o.attach = MO.AEventFocus_attach;
   return o;
}
MO.AEventFocus_attach = function AEventFocus_attach(e, h){
}
MO.AEventInputChanged = function AEventInputChanged(n){
   var o = this;
   MO.AEvent.call(o, n, 'input', 'oninput');
   o.attach = MO.AEventInputChanged_attach;
   o.bind   = MO.AEventInputChanged_bind;
   return o;
}
MO.AEventInputChanged_attach = function AEventInputChanged_attach(e, h){
}
MO.AEventInputChanged_bind = function AEventInputChanged_bind(h, u){
   var o = this;
   if(MO.Window.Browser.isBrowser(MO.EBrowser.Explorer)){
      h.onpropertychange = MO.Dui.Event.ohEvent;
   }else{
      h.addEventListener('input', MO.Dui.Event.ohEvent);
   }
}
MO.AEventKeyDown = function AEventKeyDown(n){
   var o = this;
   MO.AEvent.call(o, n, 'keydown', 'onkeydown');
   o.attach = MO.AEventKeyDown_attach;
   return o;
}
MO.AEventKeyDown_attach = function AEventKeyDown_attach(e, h){
   e.altKey = h.altKey;
   e.shiftKey = h.shiftKey;
   e.ctrlKey = h.ctrlKey;
   e.keyCode = h.keyCode;
}
MO.AEventKeyPress = function AEventKeyPress(n){
   var o = this;
   MO.AEvent.call(o, n, 'keypress', 'onkeypress');
   o.create = MO.AEventKeyPress_create;
   o.attach = MO.AEventKeyPress_attach;
   return o;
}
MO.AEventKeyPress_create = function AEventKeyPress_create(){
   return new MO.SKeyboardEvent();
}
MO.AEventKeyPress_attach = function AEventKeyPress_attach(e, h){
   e.hEvent = h;
   e.attachEvent(h);
}
MO.AEventKeyUp = function AEventKeyUp(n){
   var o = this;
   MO.AEvent.call(o, n, 'keyup', 'onkeyup');
   o.attach = MO.AEventKeyUp_attach;
   return o;
}
MO.AEventKeyUp_attach = function AEventKeyUp_attach(e, h){
   e.altKey = h.altKey;
   e.shiftKey = h.shiftKey;
   e.ctrlKey = h.ctrlKey;
   e.keyCode = h.keyCode;
}
MO.AEventLoad = function AEventLoad(n){
   var o = this;
   MO.AEvent.call(o, n, 'load', 'onload');
   o.attach = MO.AEventLoad_attach;
   return o;
}
MO.AEventLoad_attach = function AEventLoad_attach(e, h){
}
MO.AEventMouse = function AEventMouse(n, l, h){
   var o = this;
   MO.AEvent.call(o, n, l, h);
   o.attach = MO.AEventMouse_attach;
   return o;
}
MO.AEventMouse_attach = function AEventMouse_attach(e, h){
   e.button = h.button;
   e.mouseLeft = (h.button == MO.EMouseButton.Left);
   e.mouseMiddle = (h.button == MO.EMouseButton.Middle);
   e.mouseRight = (h.button == MO.EMouseButton.Right);
   e.altKey = h.altKey;
   e.ctrlKey = h.ctrlKey;
   if(MO.Window.Browser.isBrowser(MO.EBrowser.FireFox)){
      e.x = h.pageX;
      e.y = h.pageY;
      e.offsetX = h.layerX;
      e.offsetY = h.layerY;
   }else{
      e.x = h.x;
      e.y = h.y;
      e.offsetX = h.offsetX;
      e.offsetY = h.offsetY;
   }
   e.clientX = h.clientX;
   e.clientY = h.clientY;
}
MO.AEventMouseDown = function AEventMouseDown(n){
   var o = this;
   MO.AEventMouse.call(o, n, 'mousedown', 'onmousedown');
   return o;
}
MO.AEventMouseEnter = function AEventMouseEnter(n){
   var o = this;
   MO.AEvent.call(o, n, 'mouseenter', 'onmouseenter');
   o._logger = false;
   o.attach  = MO.AEventMouseEnter_attach;
   return o;
}
MO.AEventMouseEnter_attach = function AEventMouseEnter_attach(e, h){
}
MO.AEventMouseLeave = function AEventMouseLeave(n){
   var o = this;
   MO.AEvent.call(o, n, 'mouseleave', 'onmouseleave');
   o._logger = false;
   o.attach  = MO.AEventMouseLeave_attach;
   return o;
}
MO.AEventMouseLeave_attach = function AEventMouseLeave_attach(e, h){
}
MO.AEventMouseMove = function AEventMouseMove(n){
   var o = this;
   MO.AEventMouse.call(o, n, 'mousemove', 'onmousemove');
   o._logger = false;
   return o;
}
MO.AEventMouseOut = function AEventMouseOut(n){
   var o = this;
   MO.AEvent.call(o, n, 'mouseout', 'onmouseout');
   o._hSource = null;
   o._altKey  = null;
   o._ctrlKey = null;
   o._x       = null;
   o._y       = null;
   o.attach   = MO.AEventMouseOut_attach;
   return o;
}
MO.AEventMouseOut_attach = function AEventMouseOut_attach(p){
   var o = this;
   o._hSource = p.srcElement;
   o._altKey = p.altKey;
   o._ctrlKey = p.ctrlKey;
   if(MO.Window.Browser.isBrowser(MO.EBrowser.FireFox)){
      o._x = p.pageX;
      o._y = p.pageY;
   }else{
      o._x = p.x;
      o._y = p.y;
   }
}
MO.AEventMouseOver = function AEventMouseOver(n){
   var o = this;
   MO.AEvent.call(o, n, 'mouseover', 'onmouseover');
   o._hSource = null;
   o._altKey  = null;
   o._ctrlKey = null;
   o._x       = null;
   o._y       = null;
   o.attach   = MO.AEventMouseOver_attach;
   return o;
}
MO.AEventMouseOver_attach = function AEventMouseOver_attach(p){
   var o = this;
   o._hSource = p.srcElement;
   o._altKey = p.altKey;
   o._ctrlKey = p.ctrlKey;
   if(MO.Window.Browser.isBrowser(MO.EBrowser.FireFox)){
      o._x = p.pageX;
      o._y = p.pageY;
   }else{
      o._x = p.x;
      o._y = p.y;
   }
}
MO.AEventMouseUp = function AEventMouseUp(n){
   var o = this;
   MO.AEventMouse.call(o, n, 'mouseup', 'onmouseup');
   return o;
}
MO.AEventMouseWheel = function AEventMouseWheel(n){
   var o = this;
   MO.AEvent.call(o, n, 'mousewheel', 'onmousewheel');
   o.attach = MO.AEventMouseWheel_attach;
   return o;
}
MO.AEventMouseWheel_attach = function AEventMouseWheel_attach(e, h){
   e.altKey = h.altKey;
   e.ctrlKey = h.ctrlKey;
   e.delta = h.wheelDelta;
   if(MO.Window.Browser.isBrowser(MO.EBrowser.FireFox)){
      e.x = h.pageX;
      e.y = h.pageY;
   }else{
      e.x = h.x;
      e.y = h.y;
   }
}
MO.AEventReadyStateChange = function AEventReadyStateChange(n){
   var o = this;
   MO.AEvent.call(o, n, 'readystatechange', 'onreadystatechange');
   o.attach = MO.AEventReadyStateChange_attach;
   return o;
}
MO.AEventReadyStateChange_attach = function AEventReadyStateChange_attach(e, h){
}
MO.AEventResize = function AEventResize(n){
   var o = this;
   MO.AEvent.call(o, n, 'resize', 'onresize');
   o.attach = MO.AEventResize_attach;
   return o;
}
MO.AEventResize_attach = function AEventResize_attach(e, h){
   e.x = h.x;
   e.y = h.y;
}
MO.AEventScroll = function AEventScroll(n){
   var o = this;
   MO.AEvent.call(o, n, 'scroll', 'onscroll');
   o.attach = MO.AEventScroll_attach;
   return o;
}
MO.AEventScroll_attach = function AEventScroll_attach(e, h){
}
MO.AEventTouchEnd = function AEventTouchEnd(n){
   var o = this;
   MO.AEvent.call(o, n, 'touchstart', 'ontouchstart');
   o.attach = MO.AEventTouchEnd_attach;
   return o;
}
MO.AEventTouchEnd_attach = function AEventTouchEnd_attach(e, h){
}
MO.AEventTouchMove = function AEventTouchMove(n){
   var o = this;
   MO.AEvent.call(o, n, 'touchstart', 'ontouchstart');
   o.attach = MO.AEventTouchMove_attach;
   return o;
}
MO.AEventTouchMove_attach = function AEventTouchMove_attach(e, h){
}
MO.AEventTouchStart = function AEventTouchStart(n){
   var o = this;
   MO.AEvent.call(o, n, 'touchstart', 'ontouchstart');
   o.attach = MO.AEventTouchStart_attach;
   return o;
}
MO.AEventTouchStart_attach = function AEventTouchStart_attach(e, h){
}
MO.APtyAttributes = function APtyAttributes(name, linker, splitName, splitValue){
   var o = this;
   MO.AProperty.call(o, name, linker);
   o._splitName  = MO.Lang.String.nvl(splitName, '=');
   o._splitValue = MO.Lang.String.nvl(splitValue, '\n');
   o.load        = MO.APtyAttributes_load;
   o.save        = MO.APtyAttributes_save;
   o.toString    = MO.APtyAttributes_toString;
   return o;
}
MO.APtyAttributes_load = function APtyAttributes_load(instance, xconfig){
   var o = this;
   var name = o._name;
   var attributes = instance[name];
   if(!attributes){
      attributes = instance[name] = new MO.TAttributes();
   }
   var value = xconfig.get(o._linker);
   attributes.split(value, o._splitName, o._splitValue);
}
MO.APtyAttributes_save = function APtyAttributes_save(instance, xconfig){
   var o = this;
   var attributes = instance[o._name];
   if(attributes){
      xconfig.set(o._linker, attributes.join(o._splitName, o._splitValue));
   }
}
MO.APtyAttributes_toString = function APtyAttributes_toString(){
   var o = this;
   return 'linker=' + o._linker + ',split_name=' + o._splitName + ',split_value' + o._splitValue;
}
MO.APtyBoolean = function APtyBoolean(name, linker, value){
   var o = this;
   MO.AProperty.call(o, name, linker);
   o._value    = value ? value : false;
   o.build    = MO.APtyBoolean_build;
   o.load     = MO.APtyBoolean_load;
   o.save     = MO.APtyBoolean_save;
   o.toString = MO.APtyBoolean_toString;
   return o;
}
MO.APtyBoolean_build = function APtyBoolean_build(instance){
   var o = this;
   if(instance[o._name] == null){
      instance[o._name] = o._value;
   }
}
MO.APtyBoolean_load = function APtyBoolean_load(instance, xconfig){
   var o = this;
   var value = xconfig.get(o._linker);
   instance[o._name] = MO.Lang.Boolean.parse(value);
}
MO.APtyBoolean_save = function APtyBoolean_save(instance, xconfig){
   var o = this;
   var value = instance[o._name];
   if(value){
      xconfig.set(o._linker, MO.Lang.Boolean.toString(value));
   }
}
MO.APtyBoolean_toString = function APtyBoolean_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._value;
}
MO.APtyBorder = function APtyBorder(name, linker){
   var o = this;
   MO.AProperty.call(o, name, linker);
   o.load     = MO.APtyBorder_load;
   o.save     = MO.APtyBorder_save;
   o.toString = MO.APtyBorder_toString;
   return o;
}
MO.APtyBorder_load = function APtyBorder_load(instance, xconfig){
   var o = this;
   var value = xconfig.get(o._linker);
   instance[o._name].parse(value);
}
MO.APtyBorder_save = function APtyBorder_save(instance, xconfig){
   var o = this;
   var value = instance[o._name];
}
MO.APtyBorder_toString = function APtyBorder_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._x + ',' + o._y;
}
MO.APtyConfig = function APtyConfig(n, l){
   var o = this;
   MO.AProperty.call(o, n, l);
   o.force = true;
   o.load  = MO.APtyConfig_load;
   o.save  = MO.Method.empty;
   return o;
}
MO.APtyConfig_load = function APtyConfig_load(v, x){
   v[this.name] = x;
}
MO.APtyEnum = function APtyEnum(n, l, e, d){
   var o = this;
   MO.AProperty.call(o, n, l);
   o._enum    = e;
   o._default = d;
   o.build    = MO.APtyEnum_build;
   o.load     = MO.APtyEnum_load;
   o.save     = MO.APtyEnum_save;
   o.toString = MO.APtyEnum_toString;
   return o;
}
MO.APtyEnum_build = function APtyEnum_build(v){
   var o = this;
   if(v[o._name] == null){
      v[o._name] = o._default;
   }
}
MO.APtyEnum_load = function APtyEnum_load(v, x){
   var o = this;
   v[o._name] = x.get(o._linker);
}
MO.APtyEnum_save = function APtyEnum_save(v, x){
   var o = this;
   x.set(o._linker, v[o._name]);
}
MO.APtyEnum_toString = function APtyEnum_toString(){
   var o = this;
   return 'linker=' + o._linker + ',enum=' + o._enum + ',default=' + o._default;
}
MO.APtyFont = function APtyFont(name, linker, font, size, bold, color) {
   var o = this;
   MO.AProperty.call(o, name, linker);
   o._font  = MO.Lang.Integer.nvl(font);
   o._size  = MO.Lang.Integer.nvl(size);
   o._bold  = MO.Lang.Integer.nvl(bold);
   o._color = MO.Lang.Integer.nvl(color);
   o.load = MO.APtyFont_load;
   o.save = MO.APtyFont_save;
   o.toString = MO.APtyFont_toString;
   return o;
}
MO.APtyFont_load = function APtyFont_load(instance, xconfig) {
   var o = this;
   var value = xconfig.get(o._linker);
   instance[o._name].parse(value);
}
MO.APtyFont_save = function APtyFont_save(instance, xconfig) {
   var o = this;
   var value = instance[o._name];
   if (!value.isEmpty()) {
      xconfig.set(o._linker, value.toString());
   }
}
MO.APtyFont_toString = function APtyFont_toString() {
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._font + ',' + o._size + o._bold + ',' + o._color;
}
MO.APtyInteger = function APtyInteger(name, linker, value){
   var o = this;
   MO.AProperty.call(o, name, linker);
   o._value   = MO.Lang.Integer.nvl(value);
   o.build    = MO.APtyInteger_build;
   o.load     = MO.APtyInteger_load;
   o.save     = MO.APtyInteger_save;
   o.toString = MO.APtyInteger_toString;
   return o;
}
MO.APtyInteger_build = function APtyInteger_build(instance){
   var o = this;
   var name = o._name;
   if(instance[name] == null){
      instance[name] = o._value;
   }
}
MO.APtyInteger_load = function APtyInteger_load(instance, xconfig){
   var o = this;
   var value = xconfig.get(o._linker);
   instance[o._name] = MO.Lang.Integer.parse(value);
}
MO.APtyInteger_save = function APtyInteger_save(instance, xconfig){
   var o = this;
   var value = instance[o._name];
   xconfig.set(o._linker, MO.Lang.Integer.toString(value));
}
MO.APtyInteger_toString = function APtyInteger_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._value;
}
MO.APtyNumber = function APtyNumber(n, l, v){
   var o = this;
   MO.AProperty.call(o, n, l);
   o._value   = MO.Lang.Integer.nvl(v);
   o.build    = MO.APtyNumber_build;
   o.toString = MO.APtyNumber_toString;
   return o;
}
MO.APtyNumber_build = function APtyNumber_build(v){
   var o = this;
   if(v[o._name] == null){
      v[o._name] = o._value;
   }
}
MO.APtyNumber_toString = function APtyNumber_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._value;
}
MO.APtyPadding = function APtyPadding(name, linker, left, top, right, bottom){
   var o = this;
   MO.AProperty.call(o, name, linker);
   o._left    = MO.Lang.Integer.nvl(left);
   o._top     = MO.Lang.Integer.nvl(top);
   o._right   = MO.Lang.Integer.nvl(right);
   o._bottom  = MO.Lang.Integer.nvl(bottom);
   o.load     = MO.APtyPadding_load;
   o.save     = MO.APtyPadding_save;
   o.toString = MO.APtyPadding_toString;
   return o;
}
MO.APtyPadding_load = function APtyPadding_load(instance, xconfig){
   var o = this;
   var name = o._name;
   var value = xconfig.get(o._linker);
   var padding = instance[name];
   if(!padding){
      padding = instance[name] = new MO.SPadding();
   }
   padding.parse(value);
}
MO.APtyPadding_save = function APtyPadding_save(instance, xconfig){
   var o = this;
   var name = o._name;
   var padding = instance[name];
   if(padding){
      var value = padding.toString()
      xconfig.set(o._linker, value);
   }
}
MO.APtyPadding_toString = function APtyPadding_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._left + ',' + o._top + ',' + o._right + ',' + o._bottom;
}
MO.APtyPoint2 = function APtyPoint2(name, linker, x, y){
   var o = this;
   MO.AProperty.call(o, name, linker);
   o._x       = MO.Lang.Integer.nvl(x);
   o._y       = MO.Lang.Integer.nvl(y);
   o.load     = MO.APtyPoint2_load;
   o.save     = MO.APtyPoint2_save;
   o.toString = MO.APtyPoint2_toString;
   return o;
}
MO.APtyPoint2_load = function APtyPoint2_load(instance, xconfig){
   var o = this;
   var value = xconfig.get(o._linker);
   instance[o._name].parse(value);
}
MO.APtyPoint2_save = function APtyPoint2_save(instance, xconfig){
   var o = this;
   var value = instance[o._name];
   if(!value.isEmpty()){
      xconfig.set(o._linker, value.toString());
   }
}
MO.APtyPoint2_toString = function APtyPoint2_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._x + ',' + o._y;
}
MO.APtySet = function APtySet(name, linker, search, value){
   var o = this;
   MO.AProperty.call(o, name, linker);
   var code = null;
   if(MO.Lang.String.startsWith(name, '_')){
      code = name.substring(1);
   }else{
      code = name;
   }
   o._code   = MO.Lang.String.toUnderline(code);
   o._search = search;
   o._value  = value;
   o.code     = MO.APtySet_code;
   o.build    = MO.APtySet_build;
   o.load     = MO.APtySet_load;
   o.save     = MO.APtySet_save;
   o.toString = MO.APtySet_toString;
   return o;
}
MO.APtySet_code = function APtySet_code(){
   return this._code;
}
MO.APtySet_build = function APtySet_build(instance){
   var o = this;
   var name = o._name;
   if(instance[name] == null){
      instance[name] = o._value;
   }
}
MO.APtySet_load = function APtySet_load(instance, xconfig){
   var o = this;
   var value = xconfig.get(o._linker)
   instance[o._name] = MO.Lang.Set.containsString(value, o._search);
}
MO.APtySet_save = function APtySet_save(instance, xconfig){
   var o = this;
   var name = o._name;
   var search = o._search;
   var value = instance[name];
   var values = xconfig.get(o._linker);
   var exists = MO.Lang.Set.containsString(xs, search);
   if(value && !exists){
      xconfig.set(name, values + search);
   }else if(!value && exists){
      xconfig.set(name, MO.Lang.String.remove(values, search));
   }
}
MO.APtySet_toString = function APtySet_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._value + ',search=' + o._search;
}
MO.APtySize2 = function APtySize2(name, linker, width, height){
   var o = this;
   MO.AProperty.call(o, name, linker);
   o._width   = MO.Lang.Integer.nvl(width);
   o._height  = MO.Lang.Integer.nvl(height);
   o.load     = MO.APtySize2_load;
   o.save     = MO.APtySize2_save;
   o.toString = MO.APtySize2_toString;
   return o;
}
MO.APtySize2_load = function APtySize2_load(instance, xconfig){
   var o = this;
   var name = o._name;
   var value = xconfig.get(o._linker);
   var size = instance[name];
   if(!size){
      size = instance[name] = new MO.SSize2();
   }
   size.parse(value);
}
MO.APtySize2_save = function APtySize2_save(instance, xconfig){
   var o = this;
   var name = o._name;
   var size = instance[name];
   if(size){
      var value = size.toString()
      xconfig.set(o._linker, value);
   }
}
MO.APtySize2_toString = function APtySize2_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._width + ',' + o._height;
}
MO.APtyString = function APtyString(n, l, v){
   var o = this;
   MO.AProperty.call(o, n, l);
   o._value    = v ? v : null;
   o.build    = MO.APtyString_build;
   o.toString = MO.APtyString_toString;
   return o;
}
MO.APtyString_build = function APtyString_build(v){
   var o = this;
   if(v[o._name] == null){
      v[o._name] = o._value;
   }
}
MO.APtyString_toString = function APtyString_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._value;
}
MO.EUiAlign = new function EUiAlign(){
   var o = this;
   o.Left        = 'left';
   o.Center      = 'center';
   o.Right       = 'right';
   o.Top         = 'up';
   o.Middle      = 'middle';
   o.Bottom      = 'down';
   o.BottomLeft  = 'bl';
   o.BottomRight = 'br';
   return o;
}
MO.EUiAnchor = new function EUiAnchor(){
   var o = this;
   o.None   = 0;
   o.Left   = 1;
   o.Top    = 2;
   o.Right  = 4;
   o.Bottom = 8;
   o.Width  = 5;
   o.Height = 10;
   o.All    = 15;
   return o;
}
MO.EUiBorder = new function EUiBorder(){
   var o = this;
   o.None          = 0;
   o.Square        = 1;
   o.Round         = 2;
   o.RoundIcon     = 3;
   o.RoundDrop     = 4;
   o.RoundTitle    = 5;
   o.RoundIconDrop = 6;
   return o;
}
MO.EUiBorderStyle = new function EUiBorderStyle(){
   var o = this;
   o.Readonly = 1;
   o.Edit     = 2;
   o.Hover    = 3;
   return o;
}
MO.EUiColor = new function EUiColor(){
   var o = this;
   o.Text         = '#0099FF';
   o.TextHover    = '#000000';
   o.TextReadonly = '#000000';
   o.Edit         = '#EBFFFF';
   o.EditHover    = '#EBFFFF';
   o.EditReadonly = '#FEFECB';
   return o;
}
MO.EUiCursor = new function EUiCursor(){
   var o = this;
   o.Default   = 'default';
   o.Auto      = 'auto';
   o.NorthWest = 'NW';
   o.SouthWest = 'SW';
   o.SouthEast = 'SE';
   o.NorthEast = 'NE';
   o.West      = 'W';
   o.South     = 'S';
   o.East      = 'E';
   o.North     = 'N';
   o.Pointer   = 'pointer';
   o.Cross     = 'crosshair';
   o.Move      = 'move';
   return o;
}
MO.EUiDataAction = new function EUiDataAction(){
   var o = this;
   MO.TEnum.call(o);
   o.First     = 'first';
   o.Prior     = 'prior';
   o.Next      = 'next';
   o.Last      = 'last';
   o.Prepare   = 'prepare';
   o.Insert    = 'insert';
   o.Update    = 'update';
   o.Delete    = 'delete';
   return o;
}
MO.EUiDialog = new function EUiDialog(){
   var o = this;
   o.Confirm = 1;
   o.Info    = 2
   o.Warn    = 3;
   o.Error   = 4;
   return o;
}
MO.EUiDirection = new function EUiDirection(){
   var o = this;
   o.Horizontal = 'H';
   o.Vertical   = 'V';
   return o;
}
MO.EUiDock = new function EUiDock(){
   var o = this;
   o.None        = 'None';
   o.LeftTop     = 'LeftTop';
   o.Left        = 'Left';
   o.LeftBottom  = 'LeftBottom';
   o.Top         = 'Top';
   o.RightTop    = 'RightTop';
   o.Right       = 'Right';
   o.RightBottom = 'RightBottom';
   o.Bottom      = 'Bottom';
   o.Center      = 'Center';
   o.Fill        = 'Fill';
   return o;
}
MO.EUiLabelMode = new function EUiLabelMode(){
   var o = this;
   o.All    = 'A';
   o.Label  = 'L';
   o.Hidden = 'H';
   return o;
}
MO.EUiLabelPosition = new function EUiLabelPosition(){
   var o = this;
   o.Left   = 'left';
   o.Right  = 'right';
   o.Top    = 'top';
   o.Bottom = 'bottom';
   return o;
}
MO.EUiLayer = new function EUiLayer(){
   var o = this;
   o.Default = 20000;
   o.Shadow  =  6000;
   o.Disable =  5000;
   o.Drap    = 10000;
   o.Window  = 20000;
   o.Drop    = 40000;
   o.Editor  = 10000;
   o.Border  = 20000;
   o.Move    = 25000;
   o.Search  = 45000;
   o.Message = 45000;
   return o;
}
MO.EUiLayout = new function EUiLayout(){
   var o = this;
   o.Display = 'P';
   o.Search  = 'S';
   o.Design  = 'G';
   o.Insert  = 'I';
   o.Update  = 'U';
   o.Delete  = 'D';
   o.Zoom    = 'Z';
   return o;
}
MO.EUiMerge = new function EUiMerge(){
   var o = this;
   o.Append   = 'append';
   o.Override = 'override';
   o.Disable  = 'disable';
   return o;
}
MO.EUiMode = new function EUiMode(){
   var o = this;
   MO.TEnum.call(o);
   o.View   = 'V';
   o.Insert = 'I';
   o.Update = 'U';
   o.Delete = 'D';
   o.Search = 'S';
   o.Picker = 'P';
   o.Zoom   = 'Z';
   o.Design = 'G';
   o.Print  = 'R';
   return o;
}
MO.EPanel = new function EPanel(){
   var o = this;
   o.Container = 0;
   o.Parent    = 1;
   o.Size      = 8;
   o.Border    = 2;
   o.Edit      = 3;
   o.Focus     = 4;
   o.Design    = 5;
   o.Scroll    = 6;
   o.Shadow    = 7;
   o.Move      = 9;
   o.Disable   = 10;
   o.Drop      = 11;
   return o;
}
MO.EUiPosition = new function EUiPosition(){
   var o = this;
   o.Left   = 'left';
   o.Right  = 'right';
   o.Top    = 'top';
   o.Bottom = 'bottom';
   o.Center = 'center';
   o.Before     = 1;
   o.After      = 2;
   o.LineBefore = 3;
   o.LineAfter  = 4;
   return o;
}
MO.EUiScroll = new function EUiScroll(){
   var o = this;
   o.None           = 'N';
   o.Horizontal     = 'H';
   o.HorizontalAuto = 'HA';
   o.Vertical       = 'V';
   o.VerticalAuto   = 'VA';
   o.Both           = 'B';
   o.BothAuto       = 'BA';
   return o;
}
MO.EUiSize = new function EUiSize(){
   var o = this;
   o.Normal     = 0
   o.Horizontal = 1
   o.Vertical   = 2
   o.Fill       = 3;
   o.Both       = 4;
   return o;
}
MO.EUiTimeUnit = new function EUiTimeUnit() {
   var o = this;
   o.Second = 'second';
   o.Minute = 'minute';
   o.Hour   = 'hour';
   o.Day    = 'day';
   o.Week   = 'week';
   o.Month  = 'month';
   o.Year   = 'year';
   return o;
}
MO.EUiWrap = new function EUiWrap(){
   var o = this;
   o.NextLine = 0;
   o.SameLine = 1;
   return o;
}
MO.MUiBorder = function MUiBorder(o){
   o = MO.Class.inherits(this, o);
   o._borderInner = MO.Class.register(o, [new MO.APtyBorder('_borderInner'), new MO.AGetter('_borderInner')]);
   o._borderOuter = MO.Class.register(o, [new MO.APtyBorder('_borderOuter'), new MO.AGetter('_borderOuter')]);
   o.construct    = MO.MUiBorder_construct;
   o.dispose      = MO.MUiBorder_dispose;
   return o;
}
MO.MUiBorder_construct = function MUiBorder_construct(){
   var o = this;
   o._borderInner = new MO.SBorder();
   o._borderOuter = new MO.SBorder();
}
MO.MUiBorder_dispose = function MUiBorder_dispose(){
   var o = this;
   o._borderInner = MO.Lang.Object.dispose(o._borderInner);
   o._borderOuter = MO.Lang.Object.dispose(o._borderOuter);
}
MO.MUiComponent = function MUiComponent(o){
   o = MO.Class.inherits(this, o);
   o._valid           = MO.Class.register(o, [new MO.APtyBoolean('_valid'), new MO.AGetSet('_valid')]);
   o._guid            = MO.Class.register(o, [new MO.APtyString('_guid'), new MO.AGetSet('_guid')]);
   o._code            = MO.Class.register(o, [new MO.APtyString('_code'), new MO.AGetSet('_code')]);
   o._name            = MO.Class.register(o, [new MO.APtyString('_name'), new MO.AGetSet('_name')]);
   o._label           = MO.Class.register(o, [new MO.APtyString('_label'), new MO.AGetSet('_label')]);
   o._attributes      = MO.Class.register(o, [new MO.APtyAttributes('_attributes'), new MO.AGetter('_attributes')]);
   o._components      = null;
   o._tag             = MO.Class.register(o, new MO.AGetSet('_tag'));
   o.oeInitialize     = MO.MUiComponent_oeInitialize;
   o.oeRelease        = MO.MUiComponent_oeRelease;
   o.attributeGet     = MO.MUiComponent_attributeGet;
   o.attributeSet     = MO.MUiComponent_attributeSet;
   o.topComponent     = MO.MUiComponent_topComponent;
   o.hasComponent     = MO.MUiComponent_hasComponent;
   o.findComponent    = MO.MUiComponent_findComponent;
   o.searchComponent  = MO.MUiComponent_searchComponent;
   o.searchComponents = MO.MUiComponent_searchComponents;
   o.components       = MO.MUiComponent_components;
   o.push             = MO.MUiComponent_push;
   o.remove           = MO.MUiComponent_remove;
   o.clear            = MO.MUiComponent_clear;
   o.process          = MO.MUiComponent_process;
   o.psInitialize     = MO.MUiComponent_psInitialize;
   o.psRelease        = MO.MUiComponent_psRelease;
   o.toString         = MO.MUiComponent_toString;
   o.dispose          = MO.MUiComponent_dispose;
   o.innerDumpInfo    = MO.MUiComponent_innerDumpInfo;
   o.innerDump        = MO.MUiComponent_innerDump;
   return o;
}
MO.MUiComponent_oeInitialize = function MUiComponent_oeInitialize(e){
   return MO.EEventStatus.Continue;
}
MO.MUiComponent_oeRelease = function MUiComponent_oeRelease(e){
   return MO.EEventStatus.Continue;
}
MO.MUiComponent_attributeGet = function MUiComponent_attributeGet(name){
   var value = null;
   var attributes = this._attributes;
   if(attributes){
      value = attributes.get(name);
   }
   return value;
}
MO.MUiComponent_attributeSet = function MUiComponent_attributeSet(name, value){
   var o = this;
   var attributes = o._attributes;
   if(!attributes){
      attributes = o._attributes = new MO.TAttributes();
   }
   attributes.set(name, value);
}
MO.MUiComponent_topComponent = function MUiComponent_topComponent(clazz){
   var component = this;
   if(clazz){
      while(MO.Class.isClass(component._parent, clazz)){
         component = component._parent;
      }
   }else{
      while(component._parent){
         component = component._parent;
      }
   }
   return component;
}
MO.MUiComponent_hasComponent = function MUiComponent_hasComponent(){
   var components = this._components;
   return components ? !components.isEmpty() : false;
}
MO.MUiComponent_findComponent = function MUiComponent_findComponent(name){
   var components = this._components;
   return components ? components.get(name) : null;
}
MO.MUiComponent_searchComponent = function MUiComponent_searchComponent(name){
   var findComponent = null;
   var components = this._components;
   if(components){
      findComponent = components.get(name);
   }
   if(!findComponent){
      var count = components.count();
      for(var i = 0; i < count; i++){
         var component = components.at(i);
         findComponent = component.findComponent(name);
         if(findComponent){
            return findComponent;
         }
      }
   }
   return findComponent;
}
MO.MUiComponent_searchComponents = function MUiComponent_searchComponents(findComponents, clazz){
   var o = this;
   var components = o._components;
   if(components){
      var count = components.count();
      for(var i = 0; i < count; i++){
         var component = components.at(i);
         if(MO.Class.isClass(component, clazz)){
            findComponents.pushUnique(component);
         }
         component.searchComponents(findComponents, clazz);
      }
   }
}
MO.MUiComponent_components = function MUiComponent_components(){
   var o = this;
   var components = o._components;
   if(components == null){
      components = new MO.TDictionary();
      o._components = components;
   }
   return components;
}
MO.MUiComponent_push = function MUiComponent_push(component){
   var o = this;
   if(MO.Class.isClass(component, MO.MUiComponent)){
      var components = o.components();
      var name = component.name();
      component.setParent(o);
      if(name == null){
         name = components.count();
         component.setName(name);
      }
      components.set(name, component);
   }
}
MO.MUiComponent_remove = function MUiComponent_remove(component){
   var o = this;
   if(!MO.Class.isClass(component, MO.MUiComponent)){
      throw new MO.TError(o, 'Parameter is not componet. (component={1})', component);
   }
   var components = o._components;
   if(!components.contains(component.name())){
      throw new MO.TError(o, 'Parameter component is not in this component. (name={1})', component.name());
   }
   components.removeValue(component);
}
MO.MUiComponent_clear = function MUiComponent_clear(){
   var o = this;
   var components = o._components;
   if(components){
      components.clear();
   }
}
MO.MUiComponent_process = function MUiComponent_process(event){
   var o = this;
   var valid = o.__base[event.clazz];
   if(valid){
      event.invokeCd = MO.EEventInvoke.Before;
      var callback = o[event.invoke];
      if(callback){
         var result = callback.call(o, event);
         if((result == MO.EEventStatus.Stop) || (result == MO.EEventStatus.Cancel)){
            return result;
         }
      }
   }
   var components = o._components;
   if(components){
      var count = components.count();
      if(count){
         for(var i = 0; i < count; i++){
            var component = components.at(i);
            var result = component.process(event);
            if(result == MO.EEventStatus.Cancel){
               return result;
            }
         }
      }
   }
   if(valid){
      event.invokeCd = MO.EEventInvoke.After;
      var callback = o[event.invoke];
      if(callback){
         var result = callback.call(o, event);
         if((result == MO.EEventStatus.Stop) || (result == MO.EEventStatus.Cancel)){
            return result;
         }
      }
   }
   return MO.EEventStatus.Continue;
}
MO.MUiComponent_psInitialize = function MUiComponent_psInitialize(){
   var o = this;
   var event = new MO.SUiDispatchEvent(o, 'oeInitialize', MO.MUiComponent);
   o.process(event);
   event.dispose();
}
MO.MUiComponent_psRelease = function MUiComponent_psRelease(){
   var o = this;
   var event = new MO.SUiDispatchEvent(o, 'oeRelease', MO.MUiComponent);
   o.process(event);
   event.dispose();
}
MO.MUiComponent_toString = function MUiComponent_toString(){
   var o = this;
   return MO.Class.dump(o) + ':label=' + o._label;
}
MO.MUiComponent_dispose = function MUiComponent_dispose(){
   var o = this;
   o._attributes = MO.Lang.Object.dispose(o._attributes);
   o._components = MO.Lang.Object.dispose(o._components, true);
   o._tag = null;
}
MO.MUiComponent_innerDumpInfo = function MUiComponent_innerDumpInfo(info){
   var o = this;
   info.append(MO.Class.dump(o));
   info.append(',name=', o._name);
   info.append(',label=', o._label);
}
MO.MUiComponent_innerDump = function MUiComponent_innerDump(info, level){
   var o = this;
   o.innerdumpInfo(info);
   var components = o.components;
   if(components){
      info.appendLine();
      var count = components.count();
      for(var n = 0; n < count; n++){
         var component = components.at(n);
         if(component){
            component.innerDump(info, level + 1);
         }
      }
   }
   return info;
}
MO.MUiContainer = function MUiContainer(o){
   o = MO.Class.inherits(this, o);
   o._scrollCd   = MO.Class.register(o, new MO.APtyEnum('_scrollCd', null, MO.EUiScroll, MO.EUiScroll.None));
   o.createChild = MO.Method.empty;
   o.appendChild = MO.Method.empty;
   o.removeChild = MO.Method.empty;
   return o;
}
MO.MUiControl = function MUiControl(o){
   o = MO.Class.inherits(this, o);
   o._visible       = MO.Class.register(o, [new MO.APtyString('_visible'), new MO.AGetter('_visible')], true);
   o._disable       = MO.Class.register(o, [new MO.APtyString('_disable'), new MO.AGetter('_disable')], false);
   o._dockCd        = MO.Class.register(o, [new MO.APtyString('_dockCd'), new MO.AGetSet('_dockCd')], MO.EUiDock.LeftTop);
   o._anchorCd      = MO.Class.register(o, [new MO.APtyString('_anchorCd'), new MO.AGetSet('_anchorCd')], MO.EUiAnchor.None);
   o._hint          = MO.Class.register(o, [new MO.APtyString('_hint'), new MO.AGetSet('_hint')]);
   o._eventEnable   = null;
   o._eventVisible  = null;
   o._eventResize   = null;
   o._eventRefresh  = null;
   o._eventFrame    = null;
   o.oeEnable       = MO.MUiControl_oeEnable;
   o.oeVisible      = MO.MUiControl_oeVisible;
   o.oeResize       = MO.MUiControl_oeResize;
   o.oeRefresh      = MO.MUiControl_oeRefresh;
   o.oeFrame        = MO.MUiControl_oeFrame;
   o.psEnable       = MO.MUiControl_psEnable;
   o.psVisible      = MO.MUiControl_psVisible;
   o.psResize       = MO.MUiControl_psResize;
   o.psRefresh      = MO.MUiControl_psRefresh;
   o.psFrame        = MO.MUiControl_psFrame;
   o.dispose        = MO.MUiControl_dispose;
   return o;
}
MO.MUiControl_oeEnable = function MUiControl_oeEnable(event){
   var o = this;
   if(event.isBefore()){
      o.setEnable(event.enable);
   }
   return MO.EEventStatus.Continue;
}
MO.MUiControl_oeVisible = function MUiControl_oeVisible(event){
   var o = this;
   if(event.isBefore()){
      o.setVisible(event.visible);
   }
   return MO.EEventStatus.Continue;
}
MO.MUiControl_oeResize = function MUiControl_oeResize(event){
   return MO.EEventStatus.Continue;
}
MO.MUiControl_oeRefresh = function MUiControl_oeRefresh(event){
   return MO.EEventStatus.Continue;
}
MO.MUiControl_oeFrame = function MUiControl_oeFrame(event){
   return MO.EEventStatus.Continue;
}
MO.MUiControl_psEnable = function MUiControl_psEnable(enable){
   var o = this;
   var event = o._eventEnable;
   if(!event){
      event = o._eventEnable = new MO.SUiDispatchEvent(o, 'oeEnable', MO.MUiControl);
   }
   event.enable = enable;
   o.process(event);
}
MO.MUiControl_psVisible = function MUiControl_psVisible(visible){
   var o = this;
   var event = o._eventVisible;
   if(!event){
      event = o._eventVisible = new MO.SUiDispatchEvent(o, 'oeVisible', MO.MUiControl);
   }
   event.visible = visible;
   o.process(event);
}
MO.MUiControl_psResize = function MUiControl_psResize(){
   var o = this;
   var event = o._eventResize;
   if(!event){
      event = o._eventResize = new MO.SUiDispatchEvent(o, 'oeResize', MO.MUiControl);
   }
   o.process(event);
}
MO.MUiControl_psRefresh = function MUiControl_psRefresh(){
   var o = this;
   var event = o._eventRefresh;
   if(!event){
      event = o._eventRefresh = new MO.SUiDispatchEvent(o, 'oeRefresh', MO.MUiControl);
   }
   o.process(event);
}
MO.MUiControl_psFrame = function MUiControl_psFrame(){
   var o = this;
   var event = o._eventFrame;
   if(!event){
      event = o._eventFrame = new MO.SUiDispatchEvent(o, 'oeFrame', MO.MUiControl);
   }
   o.process(event);
}
MO.MUiControl_dispose = function MUiControl_dispose(){
   var o = this;
   o._eventEnable = MO.Lang.Object.dispose(o._eventEnable);
   o._eventVisible = MO.Lang.Object.dispose(o._eventVisible);
   o._eventResize = MO.Lang.Object.dispose(o._eventResize);
   o._eventRefresh = MO.Lang.Object.dispose(o._eventRefresh);
   o._eventFrame = MO.Lang.Object.dispose(o._eventFrame);
}
MO.MUiDataContainer = function MUiDataContainer(o){
   o = MO.Class.inherits(this, o);
   o._dataActionCd = MO.Class.register(o, new MO.AGetter('_dataActionCd'));
   o.loadUnit      = MO.MUiDataContainer_loadUnit;
   o.saveUnit      = MO.MUiDataContainer_saveUnit;
   o.dataView      = MO.MUiDataContainer_dataView;
   o.dataPrepare   = MO.MUiDataContainer_dataPrepare;
   o.dataModify    = MO.MUiDataContainer_dataModify;
   o.dataErase     = MO.MUiDataContainer_dataErase;
   o.dataSave      = MO.MUiDataContainer_dataSave;
   return o;
}
MO.MUiDataContainer_loadUnit = function MUiDataContainer_loadUnit(unit){
   var o = this;
   var event = new MO.SUiDispatchEvent(o, 'oeLoadUnit', MO.MUiDataField);
   event.unit = unit;
   o.process(event);
   event.dispose();
}
MO.MUiDataContainer_saveUnit = function MUiDataContainer_saveUnit(unit){
   var o = this;
   var event = new MO.SUiDispatchEvent(o, 'oeSaveUnit', MO.MUiDataField);
   event.unit = unit;
   o.process(event);
   event.dispose();
}
MO.MUiDataContainer_dataView = function MUiDataContainer_dataView(){
   var o = this;
   var event = new MO.SUiDispatchEvent(o, 'oeDataView', MO.MUiDataField);
   o.process(event);
   event.dispose();
}
MO.MUiDataContainer_dataPrepare = function MUiDataContainer_dataPrepare(){
   var o = this;
   o._dataActionCd = MO.EUiDataAction.Insert;
   var event = new MO.SUiDispatchEvent(o, 'oeDataPrepare', MO.MUiDataField);
   o.process(event);
   event.dispose();
}
MO.MUiDataContainer_dataModify = function MUiDataContainer_dataModify(){
   var o = this;
   o._dataActionCd = MO.EUiDataAction.Update;
   var event = new MO.SUiDispatchEvent(o, 'oeDataEdit', MO.MUiDataField);
   o.process(event);
   event.dispose();
}
MO.MUiDataContainer_dataErase = function MUiDataContainer_dataErase(){
   var o = this;
   o._dataActionCd = MO.EUiDataAction.Delete;
   var event = new MO.SUiDispatchEvent(o, 'oeDataDelete', MO.MUiDataField);
   o.process(event);
   event.dispose();
}
MO.MUiDataContainer_dataSave = function MUiDataContainer_dataSave(){
   var o = this;
   var event = new MO.SUiDispatchEvent(o, 'oeDataSave', MO.MUiDataField);
   o.process(event);
   event.dispose();
}
MO.MUiDataField = function MUiDataField(o){
   o = MO.Class.inherits(this, o);
   o._dataName     = MO.Class.register(o, [new MO.APtyString('_dataName'), new MO.AGetSet('_dataName')]);
   o._dataTypeCd   = MO.Class.register(o, [new MO.APtyString('_dataTypeCd'), new MO.AGetSet('_dataTypeCd')], MO.EDataType.String);
   o._dataRequire  = MO.Class.register(o, [new MO.APtyBoolean('_dataRequire'), new MO.AGetSet('_dataRequire')]);
   o._dataDefault  = MO.Class.register(o, [new MO.APtyString('_dataDefault'), new MO.AGetSet('_dataDefault')]);
   o.oeDataPrepare = MO.MUiDataField_oeDataPrepare;
   return o;
}
MO.MUiDataField_oeDataPrepare = function MUiDataField_oeDataPrepare(event){
   var o = this;
   if(event.isAfter()){
      o.set(o._dataDefault);
   }
   return MO.EEventStatus.Continue;
}
MO.MUiDataProperties = function MUiDataProperties(o){
   o = MO.Class.inherits(this, o);
   o._dataProperties = null;
   o.dataProperties  = MO.MUiDataProperties_dataProperties;
   o.dataPropertyGet = MO.MUiDataProperties_dataPropertyGet;
   o.dataPropertySet = MO.MUiDataProperties_dataPropertySet;
   return o;
}
MO.MUiDataProperties_dataProperties = function MUiDataProperties_dataProperties(n, c){
   var o = this;
   var properties = o._dataProperties;
   if(properties == null){
      properties = o._dataProperties = new MO.TDictionary();
   }
   return properties;
}
MO.MUiDataProperties_dataPropertyGet = function MUiDataProperties_dataPropertyGet(name){
   var o = this;
   var properties = o._dataProperties;
   return properties ? properties.get(n) : null;
}
MO.MUiDataProperties_dataPropertySet = function MUiDataProperties_dataPropertySet(name, value){
   this.dataProperties().set(name, value);
}
MO.MUiDataset = function MUiDataset(o){
   o = MO.Class.inherits(this, o);
   o._dsService       = MO.Class.register(o, [new MO.APtyString('_dsService', 'dataset_service'), new MO.AGetSet('_dsService')]);
   o._dsName          = MO.Class.register(o, [new MO.APtyString('_dsName', 'dataset_name'), new MO.AGetSet('_dsName')]);
   o._dsPageSize      = MO.Class.register(o, [new MO.APtyInteger('_dsPageSize', 'page_size'), new MO.AGetSet('_dsPageSize')], 20);
   o._dsPage          = 0;
   o._dsInsertAction  = MO.Class.register(o, [new MO.APtyString('_dsInsertAction', 'insert_action'), new MO.AGetSet('_dsInsertAction')]);
   o._dsUpdateAction  = MO.Class.register(o, [new MO.APtyString('_dsUpdateAction', 'update_action'), new MO.AGetSet('_dsUpdateAction')]);
   o._dsDeleteAction  = MO.Class.register(o, [new MO.APtyString('_dsDeleteAction', 'delete_action'), new MO.AGetSet('_dsDeleteAction')]);
   o._activeDataset   = null;
   o.oeLoadDataSource = MO.MUiDataContainer_oeLoadDataSource;
   o.oeSaveDataSource = MO.MUiDataContainer_oeSaveDataSource;
   o.dsLoadSource     = MO.MUiDataContainer_dsLoadSource;
   o.dsSaveSource     = MO.MUiDataContainer_dsSaveSource;
   return o;
}
MO.MUiDataContainer_oeLoadDataSource = function MUiDataContainer_oeLoadDataSource(event){
   var o = this;
   if(event.isBefore()){
      var source = event.source;
      o._activeDataset = source.selectDataset(o._dsName);
      var row = source.selectRow();
      o.loadUnit(row);
   }
   return MO.EEventStatus.Contine;
}
MO.MUiDataContainer_oeSaveDataSource = function MUiDataContainer_oeSaveDataSource(event){
   var o = this;
   if(event.isBefore()){
      var source = event.source;
      o._activeDataset = source.selectDataset(o._dsName);
      var row = source.selectRow();
      switch(o._dataActionCd){
         case MO.EUiDataAction.Insert:
            row._statusCd = MO.EDataStatus.Insert;
            break;
         case MO.EUiDataAction.Update:
            row._statusCd = MO.EDataStatus.Update;
            break;
         case MO.EUiDataAction.Delete:
            row._statusCd = MO.EDataStatus.Delete;
            break;
         default:
            throw new TError(o, 'Invalid data action.');
      }
      o.saveUnit(row);
   }
   return MO.EEventStatus.Contine;
}
MO.MUiDataContainer_dsLoadSource = function MUiDataContainer_dsLoadSource(source){
   var o = this;
   var event = new MO.SUiDispatchEvent(o, 'oeLoadDataSource', MO.MUiDataset);
   event.source = source;
   o.process(event);
   event.dispose();
}
MO.MUiDataContainer_dsSaveSource = function MUiDataContainer_dsSaveSource(source){
   var o = this;
   var event = new MO.SUiDispatchEvent(o, 'oeSaveDataSource', MO.MUiDataset);
   event.source = source;
   o.process(event);
   event.dispose();
}
MO.MUiDataset_onDsFetch = function MUiDataset_onDsFetch(g){
   var o = this;
   var ds = g.datasets;
   o.dsDatasetLoad(ds);
}
MO.MUiDataset_onDsCopy = function MUiDataset_onDsCopy(g){
   var o = this;
   o.loadDatasets(g.resultDatasets);
   o.onLoadDatasetEnd();
   o.focus();
}
MO.MUiDataset_onDsPrepare = function MUiDataset_onDsPrepare(g){
   var o = this;
   g.resultDatasets.set('/', null);
   o.loadDatasets(g.resultDatasets);
   o.doPrepare(g.resultRow);
   if(g.invokeSuccess()){
	   return;
   }
   o.onLoadDatasetEnd();
   o.focus();
}
MO.MUiDataset_onDsUpdate = function MUiDataset_onDsUpdate(g){
   var o = this;
   o.loadDatasets(g.resultDatasets);
   o.onLoadDatasetEnd();
   o.focus();
}
MO.MUiDataset_onDsDoUpdate = function MUiDataset_onDsDoUpdate(g){
   var o = this;
   if(!g.invokeSuccess()){
      o.psRefresh();
   }
   if(!g.processFinish){
      o.focus();
      o.lsnsUpdateEnd.process(g);
   }
   o.onLoadDatasetEnd();
}
MO.MUiDataset_onDsDelete = function MUiDataset_onDsDelete(g){
   var o = this;
   o.loadDatasets(g.resultDatasets);
   o.doDelete(g.resultRow);
   o.onLoadDatasetEnd();
   o.focus();
}
MO.MUiDataset_onDsProcess = function MUiDataset_onDsProcess(g){
   var o = this;
   var cb = g.resultCallback;
   if(cb){
      cb.invoke(o, g);
   }
}
MO.MUiDataset_oeDataLoad = function MUiDataset_oeDataLoad(p){
   var o = this;
   if(p.isBefore()){
      var ds = p.source;
      ds.selectDataset();
      ds.selectRow();
   }
   return EEventStatus.Contine;
}
MO.MUiDataset_oeDataSave = function MUiDataset_oeDataSave(p){
   var o = this;
   if(p.isBefore()){
      var ds = p.source;
      ds.selectDataset();
      ds.selectRow();
   }
   return EEventStatus.Contine;
}
MO.MUiDataset_oeDatasetLoad = function MUiDataset_oeDatasetLoad(p){
   var o = this;
   if(p.isBefore()){
      var ds = p.datasets;
      var d = ds.get(o._name);
      o._dataset = d;
      o.onDatasetLoad(d);
   }
   return EEventStatus.Contine;
}
MO.MUiDataset_construct = function MUiDataset_construct(){
   var o = this;
   o._dataViewer = new TDatasetViewer();
}
MO.MUiDataset_loadDataset = function MUiDataset_loadDataset(d){
   var o = this;
   o.dsStore = d;
   d.saveViewer(o._dataViewer);
   o.onLoadDataset(d);
}
MO.MUiDataset_loadDatasets = function MUiDataset_loadDatasets(p){
   var o = this;
   var c = p.count();
   for(var i = 0; i < c; i++){
      var d = p.value(n);
      var dc = o.findByPath(d.name)
      if(!dc){
         return RMessage.fatal(o, null, 'Load dataset failed. (dataset={1}', d.name);
      }
      dc.loadDataset(d);
   }
}
MO.MUiDataset_dsDatasetLoad = function MUiDataset_dsDatasetLoad(p){
   var o = this;
   var e = new TEventProcess(null, o, 'oeDatasetLoad', MUiDataset);
   e.datasets = p;
   o.process(e);
   e.dispose();
}
MO.MUiDataset_toDeepAttributes = function MUiDataset_toDeepAttributes(a, m){
   var o = this;
   if(!a){
      a = new TAttributes();
   }
   var ts = new TList();
   var p = o;
   while(p){
      if(MO.Class.isClass(p, MUiDataset)){
         ts.push(p);
      }
      if(!p.parent){
         break;
      }
      p = p.topControl(MUiDataset);
   }
   for(var n=ts.count; n>=0; n--){
      var p = ts.get(n);
      if(MO.Class.isClass(p, FForm)){
         p.toAttributes(a, m);
      }else if(MO.Class.isClass(m, FTable)){
         var r = p.getCurrentRow();
         if(r){
            r.toAttributes(a, m);
         }
      }
   }
   return a;
}
MO.MUiDataset_dsFetch = function MUiDataset_dsFetch(){
   var o = this;
   var g = new TDatasetFetchArg();
   g.owner = o;
   g.name = o._name;
   g.callback = o.onDsFetch;
   RConsole.find(FDatasetConsole).fetch(g);
}
MO.MUiDataset_dsInitialize = function MUiDataset_dsInitialize(){
   this.callEvent('onFormInitialize', this, this.__initializeEvent);
}
MO.MUiDataset_dsShow = function MUiDataset_dsShow(){
   this.callEvent('onFormShow', this, this.__showEvent);
}
MO.MUiDataset_dsLoaded = function MUiDataset_dsLoaded(){
   this.callEvent('onDatasetLoaded', this, this.__loadedEvent);
}
MO.MUiDataset_dsSearch = function MUiDataset_dsSearch(s){
   var o = this;
   o.psProgress(true);
   var tc = o.topControl();
   var pth = o.fullPath();
   if(s){
      pth = s.fullPath();
   }
   var g = new TDatasetFetchArg(tc.name, tc.formId, o.dsPageSize, 0, true, false, pth);
   g.mode = tc._emode;
   g.searchs.append(o._dataGlobalSearchs);
   g.searchs.append(o._dataSearchs);
   g.orders.append(o._dataGlobalOrders);
   g.orders.append(o._dataOrders);
   o.toDeepAttributes(g.values);
   g.values.append(o._dataValues);
   g.callback = new TInvoke(o, o.onDsFetch);
   RConsole.find(FDatasetConsole).fetch(g);
}
MO.MUiDataset_dsCopy = function MUiDataset_dsCopy(r){
   var o = this;
   o.psProgress(true);
   o.psMode(EMode.Insert);
   var g = new TDatasetFetchArg(o.name, o.formId, o.dsPageSize, 0, true);
   g.form = o;
   g.mode = EMode.Insert;
   o._dataSearchs.clear();
   o._dataSearchs.push(new TSearchItem('OUID', r.get("OUID")));
   g.searchs = o._dataSearchs;
   g.callback = new TInvoke(o, o.onDsCopy);
   if(o.onDsUpdateCheck(g)){
      RConsole.find(FDatasetConsole).fetch(g);
   }
   return;
}
MO.MUiDataset_dsPrepare = function MUiDataset_dsPrepare(cb){
   var o = this;
   o.psProgress(true);
   o.psMode(EMode.Insert);
   var g = new TDatasetPrepareArg(o.name, o.formId);
   g.form = o;
   g.values.append(o._dataValues);
   g.callbackSuccess = cb;
   if(o.onDsPrepareCheck(g)){
      g.callback = new TInvoke(o, o.onDsPrepare);
      RConsole.find(FDatasetConsole).prepare(g);
   }
}
MO.MUiDataset_dsUpdate = function MUiDataset_dsUpdate(u, v){
   var o = this;
   o.psProgress(true);
   o.psMode(EMode.Update);
   o.dsFetch(true);
}
MO.MUiDataset_dsDoUpdate = function MUiDataset_dsDoUpdate(cb, ck){
   var o = this;
   if(!o.psValid()){
      return;
   }
   var t = o.topControl();
   var g = new TDatasetUpdateArg(t.name, o.formId, o.dsName);
   g.form = o;
   g.path = o.fullPath();
   g.mode = o._emode;
   g.codes = o.getDataCodes();
   g.callback = new TInvoke(o, o.onDsDoUpdate);
   g.callbackSuccess = cb;
   if(EMode.Insert == o._emode || EMode.Delete == o._emode){
      g.dataset.rows.append(o.getCurrentRows());
   }else{
      g.dataset.rows.append(o.getChangedRows());
      if(!ck){
         if(!g.hasData()){
            return RMessage.warn(o, RContext.get('MUiDataset:nochange'));
         }
      }
   }
   o.psProgress(true);
   RConsole.find(FDatasetConsole).update(g);
}
MO.MUiDataset_dsDelete = function MUiDataset_dsDelete(u, v){
   var o = this;
   o.psProgress(true);
   o.psMode(EMode.Delete);
   var g = new TDatasetFetchArg(o.name, o.formId, o.dsPageSize, 0, true);
   g.callback = new TInvoke(o, o.onDsDelete);
   g.form = o;
   g.mode = EMode.Delete;
   if(u){
      g.searchs.push(new TSearchItem('OUID', u));
   }
   if(v){
       g.searchs.push(new TSearchItem('OVER', v));
   }
   g.values = o._dataValues;
   if(o.onDsDeleteCheck(g)){
      RConsole.find(FDatasetConsole).fetch(g);
   }
   return;
}
MO.MUiDataset_dsMode = function MUiDataset_dsMode(m){
   var o = this;
   switch(m){
      case EMode.Insert:
         o.dsPrepare();
         break;
      case EMode.Update:
         o.dsUpdate();
         break;
      case EMode.Delete:
         o.dsDelete();
         break;
   }
}
MO.MUiDataset_dsProcess = function MUiDataset_dsProcess(da, cb){
   var o = this;
   if(!o.psValid()){
      return;
   }
   var g = new TDatasetServiceArg(o.topControl().name, da);
   g.form = o;
   g.controlName = o.name;
   o.toDeepAttributes(g.attributes);
   g.codes = o.getDataCodes();
   g.push(o.getCurrentRow());
   g.resultCallback = cb;
   o.psProgress(true);
   g.callback = new TInvoke(o, o.onDsProcess);
   RConsole.find(FFormConsole).process(g);
}
MO.MUiDataset_dsProcessCustom = function MUiDataset_dsProcessCustom(pm, da, cb, cc){
	var o = this;
	if(!cc){
	if(!o.psValid()){
	   return;
	}
	}
	var g = new TDatasetServiceArg(o.topControl().name, da);
	g.form = o;
	g.controlName = o.name;
	g.attributes = pm;
	g.codes = o.getDataCodes();
	g.push(o.getCurrentRow());
	g.resultCallback = cb;
	if(!cc){
	   if(!g.hasData()){
	      return RMessage.warn(o, RContext.get('MUiDataset:nodata'));
	   }
	}
	o.psProgress(true);
	g.callback = new TInvoke(o, o.onDsProcess);
	RConsole.find(FFormConsole).process(g);
}
MO.MUiDataset_dsProcessSelected = function MUiDataset_dsProcessSelected(da, cb){
	var o = this;
	if(!o.psValid()){
	   return;
	}
	   var g = new TDatasetServiceArg(o.topControl().name, da);
	   g.form = o;
	   g.controlName = o.name;
	   o.toDeepAttributes(g.attributes);
	   g.codes = o.getDataCodes();
	   g.rows = o.getSelectedRows();
	   if(g.rows.count > 0){
		  g.resultCallback = cb;
		  o.psProgress(true);
		  g.callback = new TInvoke(o, o.onDsProcess);
		  RConsole.find(FFormConsole).process(g);
		  o.clearSelectRows();
	   }else{
	      return RMessage.warn(o, RContext.get('MUiDataset:norows'));
	   }
}
MO.MUiDataset_dsProcessChanged = function MUiDataset_dsProcessChanged(da, cb){
   var o = this;
   if(!o.psValid()){
      return;
   }
   var g = new TDatasetServiceArg(o.topControl().name, da);
   g.form = o;
   g.controlName = o.name;
   o.toDeepAttributes(g.attributes);
   g.codes = o.getDataCodes();
   g.rows = o.getChangedRows();
   g.resultCallback = cb;
   if(!g.hasData()){
      return RMessage.warn(o, RContext.get('MUiDataset:nochange'));
   }
   o.psProgress(true);
   g.callback = new TInvoke(o, o.onDsProcess);
   RConsole.find(FFormConsole).process(g);
}
MO.MUiDataset_dsProcessAll = function MUiDataset_dsProcessAll(da, cb){
   var o = this;
   if(!o.psValid()){
      return;
   }
   var g = new TDatasetServiceArg(o.topControl().name, da);
   g.form = o;
   g.controlName = o.name;
   o.toDeepAttributes(g.attributes);
   g.codes = o.getDataCodes();
   g.rows = o.getRows();
   g.resultCallback = cb;
   o.psProgress(true);
   g.callback = new TInvoke(o, o.onDsProcess);
   RConsole.find(FFormConsole).process(g);
}
MO.MUiDataset_psProgress = function MUiDataset_psProgress(v){
   var o = this;
   if(o.__progress == v){
      return;
   }
   o.__progress = v;
   var e = o.__progressProcess;
   e.enable = v;
   o.process(e);
}
MO.MUiDataset_psValid = function MUiDataset_psValid(){
   var o = this;
   var e = o.__validProcess;
   var cs = e.controls;
   cs.clear();
   o.process(e);
   if(!cs.isEmpty()){
      var cw = RConsole.find(FCheckWindowConsole).find();
      cw.set(cs);
      cw.show();
      return false;
   }
   return true;
}
MO.MUiDataset_dsIsChanged = function MUiDataset_dsIsChanged(){
   var ds = this.dsStore;
   return ds ? ds.isChanged() : false;
}
MO.MUiDataset_dsCount = function MUiDataset_dsCount(){
   return this.dsStore ? this.dsStore.count : 0;
}
MO.MUiDataset_dsCurrent = function MUiDataset_dsCurrent(){
   var o = this;
   var ds = o.dsStore;
}
MO.MUiDataset_dsMove = function MUiDataset_dsMove(p){
   var o = this;
   var ds = o.dsStore;
   if(null == p && !ds){
      return;
   }
   if(!RInt.isInt(p)){
      if(EDataAction.First == p){
         ds.moveFirst();
      }else if(EDataAction.Prior == p){
         ds.movePrior();
      }else if(EDataAction.Next == p){
         ds.moveNext();
      }else if(EDataAction.Last == p){
         ds.moveLast();
      }else{
         RMessage.fatal(o, null, 'Unknown position (postion={0})', p);
      }
   }else{
      ds.move(p);
   }
   if(MO.Class.isClass(o, MValue)){
      o.loadValue(ds.current());
   }
}
MO.MUiDataset_dsMovePage = function MUiDataset_dsMovePage(p){
   var o = this;
   var ds = o.dsStore;
   if(!RInt.isInt(p)){
      if(EDataAction.First == p){
         p = 0;
      }else if(EDataAction.Prior == p){
         p = ds.pageIndex;
         if(p > 0){
            p--;
         }
      }else if(EDataAction.Next == p){
         p = ds.pageIndex;
         if(p < ds.pageCount - 1){
            p++;
         }
      }else if(EDataAction.Last == p){
         p = ds.pageCount - 1;
      }else{
         RMessage.fatal(o, null, 'Unknown page (page={0})', p);
      }
   }
   if(p != ds.pageIndex){
      o.psProgress(true);
      var t = o.topControl(MUiDataset);
      var g = new TDatasetFetchArg(t.name, t.formId, o.dsPageSize, p, true);
      g.path =  o.fullPath();
      g.mode = t._emode;
      g.searchs.append(o._dataGlobalSearchs);
      g.searchs.append(o._dataSearchs);
      g.orders.append(o._dataGlobalOrders);
      g.orders.append(o._dataOrders);
      g.values = o.toDeepAttributes();
      g.values.append(o._dataValues);
      g.callback = new TInvoke(o, o.onDsFetch);
      RConsole.find(FDatasetConsole).fetch(g);
   }
}
MO.MUiDataset_dsGet = function MUiDataset_dsGet(n){
   return this.dsStore ? this.dsStore.get(n) : '';
}
MO.MUiDataset_dsSet = function MUiDataset_dsSet(n, v){
   if(this.dsStore){
      this.dsStore.set(n, v);
   }
}
MO.MUiDataset_dsRefresh = function MUiDataset_dsRefresh(){
   if(this._dsService){
      this.dsMove(this.dsPage, true);
   }
}
MO.MUiDataset_doSearch = function MUiDataset_doSearch(){
   var o = this;
   var sw = o.dsSearchWindow;
   if(!sw){
      sw = o.dsSearchWindow = top.RControl.create(top.FSearchWindow);
      sw.linkDsControl(o);
   }
   sw.show();
}
MO.MUiDataValue = function MUiDataValue(o){
   o = MO.Class.inherits(this, o, MO.MUiValue);
   o._dataValue = MO.Class.register(o, [new MO.APtyString('_dataValue'), new MO.AGetSet('_dataValue')]);
   o.oeLoadDataRow = MO.Method.empty;
   o.oeSaveDataRow = MO.Method.empty;
   return o;
}
MO.MUiDescriptorPicker = function MUiDescriptorPicker(o){
   o = MO.Class.inherits(this, o);
   o._pickerService = MO.Class.register(o, new MO.APtyString('_pickerService'));
   o._pickerFrame   = MO.Class.register(o, new MO.APtyString('_pickerFrame'));
   o._pickerFields  = MO.Class.register(o, new MO.APtyAttributes('_pickerFields', null, '=', ';'));
   o._pickerWhere   = MO.Class.register(o, new MO.APtyString('_pickerWhere'));
   o._pickerOrder   = MO.Class.register(o, new MO.APtyString('_pickerOrder'));
   o._picker        = null;
   o.onPickerClick  = MO.MUiDescriptorPicker_onPickerClick;
   o.onPickerSelect = MO.MUiDescriptorPicker_onPickerSelect;
   o.testPicker     = MO.MUiDescriptorPicker_testPicker;
   o.doPicker       = MO.Method.empty;
   return o;
}
MO.MUiDescriptorPicker_onPickerClick = function MUiDescriptorPicker_onPickerClick(event){
   var o = this;
   if(o.testPicker()){
      o.doPicker();
   }
}
MO.MUiDescriptorPicker_onPickerSelect = function MUiDescriptorPicker_onPickerSelect(event){
   var o = this;
   var row = event.row;
   var fields = o._pickerFields;
   var dataset = o.findParent(MO.MUiDataset);
   var count = fields.count();
   for(var i = 0; i < count; i++){
      var fieldName = fields.name(i);
      var fieldValue = fields.value(i);
      var dataField = dataset.searchComponent(fieldName);
      var dataValue = row.get(fieldValue);
      dataField.set(dataValue);
   }
}
MO.MUiDescriptorPicker_testPicker = function MUiDescriptorPicker_testPicker(){
   var o = this;
   if(!o._statusEditable){
      return false;
   }
   return !MO.Lang.String.isEmpty(o._pickerFrame);
}
MO.MUiDescriptorZoom = function MUiDescriptorZoom(o){
   o = MO.Class.inherits(this, o);
   o._zoomFrame = MO.Class.register(o, new MO.APtyString('_zoomFrame'));
   o._zoomField = MO.Class.register(o, new MO.APtyString('_zoomField'));
   o.testZoom   = MO.MUiDescriptorZoom_testZoom;
   o.doZoom     = MO.MUiDescriptorZoom_doZoom;
   return o;
}
MO.MUiDescriptorZoom_testZoom = function MUiDescriptorZoom_testZoom(){
   return !MO.Lang.String.isEmpty(this._zoomFrame);
}
MO.MUiDescriptorZoom_doZoom = function MUiDescriptorZoom_doZoom(p){
   MO.RFormSpace.doZoom(this, p);
}
MO.MUiDisplay = function MUiDisplay(o){
   o = MO.Class.inherits(this, o);
   o._displayView   = MO.Class.register(o, new MO.APtySet('_displayView', 'display_mode', MO.EUiMode.View, true));
   o._displayInsert = MO.Class.register(o, new MO.APtySet('_displayInsert', 'display_mode', MO.EUiMode.Insert, false));
   o._displayUpdate = MO.Class.register(o, new MO.APtySet('_displayUpdate', 'display_mode', MO.EUiMode.Update, true));
   o._displayDelete = MO.Class.register(o, new MO.APtySet('_displayDelete', 'display_mode', MO.EUiMode.Delete, false));
   o._displaySearch = MO.Class.register(o, new MO.APtySet('_displaySearch', 'display_mode', MO.EUiMode.Search, false));
   o._displayPicker = MO.Class.register(o, new MO.APtySet('_displayPicker', 'display_mode', MO.EUiMode.Picker, false));
   o._displayZoom   = MO.Class.register(o, new MO.APtySet('_displayZoom', 'display_mode', MO.EUiMode.Zoom, false));
   o._statusDisplay = MO.Class.register(o, new MO.AGetter('_statusDisplay', 'isDisplay'), true);
   o.oeMode         = MO.MUiDisplay_oeMode;
   o.testVisible    = MO.MUiDisplay_testVisible;
   o.setVisible     = MO.Method.empty;
   return o;
}
MO.MUiDisplay_oeMode = function MUiDisplay_oeMode(event){
   var o = this;
   if(event.isBefore()){
      var modeCd = event.modeCd;
      var visible = o._statusDisplay = o.testVisible(modeCd);
      o.setVisible(visible);
   }
}
MO.MUiDisplay_testVisible = function MUiDisplay_testVisible(modeCd){
   var o = this;
   switch(modeCd){
      case MO.EUiMode.View:
         return o._displayView;
      case MO.EUiMode.Search:
         return o._displaySearch;
      case MO.EUiMode.Insert:
         return o._displayInsert;
      case MO.EUiMode.Update:
         return o._displayUpdate;
      case MO.EUiMode.Delete:
         return o._displayDelete;
      case MO.EUiMode.Zoom:
         return o._displayZoom;
   }
   return false;
}
MO.MUiDisplayContrainer = function MUiDisplayContrainer(o){
   o = MO.Class.inherits(this, o);
   o._modeCd    = MO.Class.register(o, new MO.AGetter('_modeCd'), MO.EUiMode.View);
   o._eventMode = null;
   o.construct  = MO.MUiDisplayContrainer_construct;
   o.psMode     = MO.MUiDisplayContrainer_psMode;
   o.psDesign   = MO.MUiDisplayContrainer_psDesign;
   o.dispose    = MO.MUiDisplayContrainer_dispose;
   return o;
}
MO.MUiDisplayContrainer_construct = function MUiDisplayContrainer_construct(){
   var o = this;
   o._eventMode = new MO.SUiDispatchEvent(o, 'oeMode', MO.MUiDisplay);
}
MO.MUiDisplayContrainer_psMode = function MUiDisplayContrainer_psMode(modeCd){
   var o = this;
   o._modeCd = modeCd;
   var event = o._eventMode;
   event.modeCd = modeCd;
   o.process(event);
}
MO.MUiDisplayContrainer_psDesign = function MUiDisplayContrainer_psDesign(m, f){
   var o = this;
   MO.Console.find(FDesignConsole).setFlag(m, f, o);
   var event = new MO.SUiDispatchEvent(o, 'oeDesign', MO.MUiDesign)
   event.mode = m;
   event.flag = f;
   o.process(event);
   event.dispose();
}
MO.MUiDisplayContrainer_dispose = function MUiDisplayContrainer_dispose(){
   var o = this;
   o._eventMode = MO.Lang.Object.Dispose(o._eventMode);
}
MO.MUiDragable = function MUiDragable(o){
   o = MO.Class.inherits(this, o);
   o.onDragStart = MO.Method.virtual(o, 'onDragStart');
   o.onDragMove  = MO.Method.virtual(o, 'onDragMove');
   o.onDragStop  = MO.Method.virtual(o, 'onDragStop');
   return o;
}
MO.MUiEditable = function MUiEditable(o){
   o = MO.Class.inherits(this, o);
   o._editView       = MO.Class.register(o, new MO.APtySet('_editView', 'edit_mode', MO.EUiMode.View, false));
   o._editInsert     = MO.Class.register(o, new MO.APtySet('_editInsert', 'edit_mode', MO.EUiMode.Insert, false));
   o._editUpdate     = MO.Class.register(o, new MO.APtySet('_editUpdate', 'edit_mode', MO.EUiMode.Update, false));
   o._editDelete     = MO.Class.register(o, new MO.APtySet('_editDelete', 'edit_mode', MO.EUiMode.Delete, false));
   o._statusEditable = MO.Class.register(o, new MO.AGetter('_statusEditable', 'isEditable'), true);
   o.oeMode          = MO.MUiEditable_oeMode;
   o.testEditable    = MO.MUiEditable_testEditable;
   o.setEditable     = MO.Class.register(o, new MO.AVirtual('setEditable'));
   return o;
}
MO.MUiEditable_oeMode = function MUiEditable_oeMode(event){
   var o = this;
   if(event.isBefore()){
      var modeCd = event.modeCd;
      var editable = o._statusEditable = o.testEditable(modeCd);
      o.setEditable(editable);
   }
}
MO.MUiEditable_testEditable = function MUiEditable_testEditable(modeCd){
   var o = this;
   switch(modeCd){
      case MO.EUiMode.View:
         return o._editView;
      case MO.EUiMode.Insert:
         return o._editInsert;
      case MO.EUiMode.Update:
         return o._editUpdate;
      case MO.EUiMode.Delete:
         return o._editDelete;
   }
   return false;
}
MO.MUiEditValue = function MUiEditValue(o){
   o = MO.Class.inherits(this, o, MO.MUiTextFormator);
   o._statusEditable = true;
   o._statusEditing  = false;
   o._statusInvalid  = true;
   o._recordText     = null;
   o._recordValue    = null;
   o._currentValue   = null;
   o.isTextChanged   = MO.MUiEditValue_isTextChanged;
   o.isValueChanged  = MO.MUiEditValue_isValueChanged;
   o.formator        = MO.MUiEditValue_formator;
   o.get             = MO.MUiEditValue_get;
   o.set             = MO.MUiEditValue_set;
   o.text            = MO.MUiEditValue_text;
   o.clearValue      = MO.MUiEditValue_clearValue;
   o.resetValue      = MO.MUiEditValue_resetValue;
   o.loadValue       = MO.MUiEditValue_loadValue;
   o.saveValue       = MO.MUiEditValue_saveValue;
   o.recordValue     = MO.MUiEditValue_recordValue;
   o.validValue      = MO.Method.empty;
   o.setEditAble     = MO.MUiEditValue_setEditAble;
   o.doFocus         = MO.MUiEditValue_doFocus;
   o.doBlur          = MO.MUiEditValue_doBlur;
   return o;
}
MO.MUiEditValue_isTextChanged = function MUiEditValue_isTextChanged(){
   var o = this;
   var text = o.text();
   return MO.Lang.String.equals(o._recordText, text);
}
MO.MUiEditValue_isValueChanged = function MUiEditValue_isValueChanged(){
   var o = this;
   var value = o.get();
   return MO.Lang.String.equals(o._recordValue, value);
}
MO.MUiEditValue_formator = function MUiEditValue_formator(){
   return this;
}
MO.MUiEditValue_get = function MUiEditValue_get(){
   throw new MO.TError('Unsupport method.');
}
MO.MUiEditValue_set = function MUiEditValue_set(value){
   throw new MO.TError('Unsupport method.');
}
MO.MUiEditValue_text = function MUiEditValue_text(){
   return this.get();
}
MO.MUiEditValue_clearValue = function MUiEditValue_clearValue(){
   var o = this;
   o._dataValue = MO.Lang.String.EMPTY;
   o.set(MO.Lang.String.EMPTY);
}
MO.MUiEditValue_resetValue = function MUiEditValue_resetValue(){
   var o = this;
   o._dataValue = value;
   o.set(value);
}
MO.MUiEditValue_loadValue = function MUiEditValue_loadValue(c, t){
   var o = this;
}
MO.MUiEditValue_saveValue = function MUiEditValue_saveValue(c, t){
   var o = this;
}
MO.MUiEditValue_recordValue = function MUiEditValue_recordValue(){
   var o = this;
   o._recordText = o.text();
   o._recordValue = o.get();
}
MO.MUiEditValue_setEditAble = function MUiEditValue_setEditAble(flag){
   var o = this;
   o._statusEditable = flag;
}
MO.MUiEditValue_doFocus = function MUiEditValue_doFocus(){
   var o = this;
   if(o._statusEditable){
      o._statusEditing = true;
   }
}
MO.MUiEditValue_doBlur = function MUiEditValue_doBlur(){
   var o = this;
   if(o._statusEditable && o._statusEditing){
      o._statusEditing = false;
   }
}
MO.MUiEditValue_oeClearValue = function MUiEditValue_oeClearValue(e){
   var o = this;
   var d = o.descriptor();
   if(!MO.Lang.String.isEmpty(d.dataName)){
      o.clearValue();
      o.dataValue = o.reget();
   }
   return EEventStatus.Stop;
}
MO.MUiEditValue_oeResetValue = function MUiEditValue_oeResetValue(e){
   var o = this;
   var d = o.descriptor();
   if(!MO.Lang.String.isEmpty(d.dataName)){
      o.resetValue();
      o.dataValue = o.reget();
   }
   return EEventStatus.Stop;
}
MO.MUiEditValue_oeLoadValue = function MUiEditValue_oeLoadValue(e){
   var o = this;
   var d = o.descriptor();
   var vs = e.values;
   var dn = d.dataName;
   if(!MO.Lang.String.isEmpty(dn)){
      if(vs.contains(dn)){
         var v = vs.nvl(dn);
         if(RControl.isInfo(v)){
            o.setInfoPack(v);
         }else{
        	 if(RControl.isGroup(v)){
        		 o.setGroupPack(v);
        	 }else{
                 o.loadValue(vs);
        	 }
         }
         o.recordValue();
         o.dataValue = o.reget();
      }
   }
   return EEventStatus.Stop;
}
MO.MUiEditValue_oeSaveValue = function MUiEditValue_oeSaveValue(e){
   var o = this;
   var d = o.descriptor();
   if(!MO.Lang.String.isEmpty(d.dataName)){
      o.saveValue(e.values);
   }
   return EEventStatus.Stop;
}
MO.MUiEditValue_oeRecordValue = function MUiEditValue_oeRecordValue(){
   var o = this;
   var d = o.descriptor();
   if(!MO.Lang.String.isEmpty(d.dataName)){
      o.recordValue();
   }
   return EEventStatus.Stop;
}
MO.MUiEditValue_commitValue = function MUiEditValue_commitValue(){
   this.__commitValue = MO.Lang.String.nvl(this.reget());
}
MO.MUiEditValue_reget = function MUiEditValue_reget(){
   return this.descriptor().formatValue(this.text());
}
MO.MUiEditValue_setInfoPack = function MUiEditValue_setInfoPack(v){
   var o = this;
   var f = o._info;
   if(!f){
      f = o._info = new MO.TControlInfo();
   }
   f.unpack(v);
   var d = o.descriptor();
   d.setInfo(f);
   if(d != o){
      o.setInfo(f);
   }
}
MO.MUiEditValue_setInfo = function MUiEditValue_setInfo(f){
   this.set(f.value);
}
MO.MUiMargin = function MUiMargin(o){
   o = MO.RClass.inherits(this, o);
   o._margin   = MO.RClass.register(o, [new MO.APtyPadding('_margin'), new MO.AGetter('_margin')]);
   o.construct = MO.MUiMargin_construct;
   o.setMargin = MO.MUiMargin_setMargin;
   o.dispose   = MO.MUiMargin_dispose;
   return o;
}
MO.MUiMargin_construct = function MUiMargin_construct(){
   var o = this;
   o._margin = new MO.SPadding();
}
MO.MUiMargin_setMargin = function MUiMargin_setMargin(left, top, right, bottom){
   this._margin.set(left, top, right, bottom);
}
MO.MUiMargin_dispose = function MUiMargin_dispose(){
   var o = this;
   o._margin = MO.Lang.Object.dispose(o._margin);
}
MO.MUiPadding = function MUiPadding(o){
   o = MO.RClass.inherits(this, o);
   o._padding   = MO.RClass.register(o, [new MO.APtyPadding('_padding'), new MO.AGetter('_padding')]);
   o.construct  = MO.MUiPadding_construct;
   o.setPadding = MO.MUiPadding_setPadding;
   o.dispose    = MO.MUiPadding_dispose;
   return o;
}
MO.MUiPadding_construct = function MUiPadding_construct(){
   var o = this;
   o._padding = new MO.SPadding();
}
MO.MUiPadding_setPadding = function MUiPadding_setPadding(left, top, right, bottom){
   this._padding.set(left, top, right, bottom);
}
MO.MUiPadding_dispose = function MUiPadding_dispose(){
   var o = this;
   o._padding = MO.Lang.Object.dispose(o._padding);
}
MO.MUiProgress = function MUiProgress(o){
   o = MO.Class.inherits(this, o);
   o.oeProgress = MO.Method.virtual(o, 'oeProgress');
   return o;
}
MO.MUiPropertyCheck = function MUiPropertyCheck(o){
   o = MO.Class.inherits(this, o);
   o._valueTrue  = MO.Class.register(o, new MO.APtyString('_valueTrue'), MO.EBoolean.True);
   o._valueFalse = MO.Class.register(o, new MO.APtyString('_valueFalse'), MO.EBoolean.False);
   return o;
}
MO.MUiPropertyEdit = function MUiPropertyEdit(o){
   o = MO.Class.inherits(this, o);
   o._editCaseCd     = MO.Class.register(o, new MO.APtyString('_editCaseCd'));
   o._editPattern    = MO.Class.register(o, new MO.APtyString('_editPattern'));
   o._editLength     = MO.Class.register(o, new MO.APtyInteger('_editLength'));
   o._editComplete   = MO.Class.register(o, new MO.APtyBoolean('_editComplete'));
   o._validLengthMin = MO.Class.register(o, new MO.APtyInteger('_validLengthMin'));
   o._validLengthMax = MO.Class.register(o, new MO.APtyInteger('_validLengthMax'));
   o.oeValid         = MO.MUiPropertyEdit_oeValid;
   return o;
}
MO.MUiPropertyEdit_oeValid = function MUiPropertyEdit_oeValid(e){
   var o = this;
   var r = MO.EEventStatus.Stop;
   if(o._visible && o._validable){
      var t = o.text();
      if(o.validRequire && !MO.RValidator.validRequire(o, t)){
         e.controls.push(o);
         return r;
      }
      if(o.editLength && !MO.RValidator.validTextLength(o, t, o.editLength)){
         e.controls.push(o);
         return r;
      }
   }
   return r;
}
MO.MUiPropertyNumber = function MUiPropertyNumber(o){
   o = MO.Class.inherits(this, o);
   o._valueMin       = MO.Class.register(o, new MO.APtyNumber('_valueMin'));
   o._valueMax       = MO.Class.register(o, new MO.APtyNumber('_valueMax'));
   o._valuePrecision = MO.Class.register(o, new MO.APtyInteger('_valuePrecision'), 3);
   return o;
}
MO.MUiPropertySelect = function MUiPropertySelect(o){
   o = MO.Class.inherits(this, o);
   o._editCaseCd     = MO.Class.register(o, new MO.APtyString('_editCaseCd'));
   o._editPattern    = MO.Class.register(o, new MO.APtyString('_editPattern'));
   o._editLength     = MO.Class.register(o, new MO.APtyInteger('_editLength'));
   o._editComplete   = MO.Class.register(o, new MO.APtyBoolean('_editComplete'));
   o._validLengthMin = MO.Class.register(o, new MO.APtyInteger('_validLengthMin'));
   o._validLengthMax = MO.Class.register(o, new MO.APtyInteger('_validLengthMax'));
   o.oeValid         = MO.MUiPropertySelect_oeValid;
   return o;
}
MO.MUiPropertySelect_oeValid = function MUiPropertySelect_oeValid(e){
   var o = this;
   var r = MO.EEventStatus.Stop;
   if(o._visible && o._validable){
      var t = o.text();
      if(o.validRequire && !MO.RValidator.validRequire(o, t)){
         e.controls.push(o);
         return r;
      }
      if(o.editLength && !MO.RValidator.validTextLength(o, t, o.editLength)){
         e.controls.push(o);
         return r;
      }
   }
   return r;
}
MO.MUiStorage = function MUiStorage(o){
   o = MO.Class.inherits(this, o);
   o._storageCode      = null;
   o._storageObject    = null;
   o.storageGet        = MO.MUiStorage_storageGet;
   o.storageGetBoolean = MO.MUiStorage_storageGetBoolean;
   o.storageSet        = MO.MUiStorage_storageSet;
   o.storageUpdate     = MO.MUiStorage_storageUpdate;
   o.dispose           = MO.MUiStorage_dispose;
   return o;
}
MO.MUiStorage_storageGet = function MUiStorage_storageGet(name, defaultValue){
   var o = this;
   if(name == null){
      throw new MO.TError(o, 'Name is empty.');
   }
   var object = o._storageObject;
   if(!object){
      var storge = MO.Window.storage(MO.EScope.Local);
      var value = storge.get(o._storageCode);
      object = o._storageObject = MO.Json.parse(value, Object);
   }
   if(object){
      var value = object[name];
      if(value != null){
         return value;
      }
   }
   return defaultValue;
}
MO.MUiStorage_storageGetBoolean = function MUiStorage_storageGetBoolean(name, defaultValue){
   var o = this;
   var value = o.storageGet(name, defaultValue);
   return MO.Lang.Boolean.parse(value);
}
MO.MUiStorage_storageSet = function MUiStorage_storageSet(name, value){
   var o = this;
   if(name == null){
      throw new TError(o, 'Name is empty.');
   }
   var object = o._storageObject;
   if(!object){
      object = o._storageObject = new Object();
   }
   object[name] = value;
}
MO.MUiStorage_storageUpdate = function MUiStorage_storageUpdate(){
   var o = this;
   var object = o._storageObject;
   if(object){
      var storge = MO.Window.storage(MO.EScope.Local);
      var value = MO.Json.toString(object);
      storge.set(o._storageCode, value);
   }
}
MO.MUiStorage_dispose = function MUiStorage_dispose(){
   var o = this;
   o._storageCode = null;
   o._storageObject = null;
}
MO.MUiTextFormator = function MUiTextFormator(o){
   o = MO.Class.inherits(this, o);
   o.formatText  = MO.MUiTextFormator_formatText;
   o.formatValue = MO.MUiTextFormator_formatValue;
   return o;
}
MO.MUiTextFormator_formatText = function MUiTextFormator_formatText(value){
   return value;
}
MO.MUiTextFormator_formatValue = function MUiTextFormator_formatValue(text){
   return text;
}
MO.MUiValue = function MUiValue(o){
   o = MO.Class.inherits(this, o);
   o.get = MO.Method.empty;
   o.set = MO.Method.empty;
   return o;
}
MO.Ui = new function MoUiSpace(){return this;}
MO.Gui = new function MoGuiSpace(){return this;}
MO.Dui = new function MoDuiSpace(){return this;}
MO.SUiDispatchEvent = function SUiDispatchEvent(owner, invokeName, clazz){
   var o = this;
   MO.SEvent.call(o);
   o.owner    = owner;
   o.invoke   = invokeName;
   o.clazz    = MO.Class.name(clazz);
   o.invokeCd = MO.EEventInvoke.Unknown;
   o.isBefore = MO.SUiDispatchEvent_isBefore;
   o.isAfter  = MO.SUiDispatchEvent_isAfter;
   o.dispose  = MO.SUiDispatchEvent_dispose;
   o.dump     = MO.SUiDispatchEvent_dump;
   return o;
}
MO.SUiDispatchEvent_isBefore = function SUiDispatchEvent_isBefore(){
   return this.invokeCd == MO.EEventInvoke.Before;
}
MO.SUiDispatchEvent_isAfter = function SUiDispatchEvent_isAfter(){
   return this.invokeCd == MO.EEventInvoke.After;
}
MO.SUiDispatchEvent_dispose = function SUiDispatchEvent_dispose(){
   var o = this;
   o.owner = null;
   o.invoke = null;
   o.clazz = null;
   o.invokeCd = null;
}
MO.SUiDispatchEvent_dump = function SUiDispatchEvent_dump(){
   var o = this;
   return MO.Class.dump(o) + ':owner=' + o.owner + ',type=' + o.type + '.invoke=' + MO.Method.name(o.invoke);
}
MO.SUiFont = function SUiFont(){
   var o = this;
   o.font     = 'Microsoft YaHei';
   o.size     = 16;
   o.bold     = false;
   o.color    = '#FFFFFF';
   o.assign   = MO.SUiFont_assign;
   o.parse    = MO.SUiFont_parse;
   o.toString = MO.SUiFont_toString;
   o.dispose  = MO.SUiFont_dispose;
   return o;
}
MO.SUiFont_assign = function SUiFont_assign(value){
   var o = this;
   o.font = value.font;
   o.size = value.size;
   o.bold = value.bold;
   o.color = value.color;
}
MO.SUiFont_parse = function SUiFont_parse(source){
   var o = this;
   var boldIndex = source.toLowerCase().indexOf('bold');
   if (boldIndex != -1) {
      o.bold = true;
      source = source.replace(source.substring(boldIndex, boldIndex + 4), '');
   }
   var sharpIndex = source.indexOf('#');
   if (sharpIndex != -1) {
      o.color = source.substring(sharpIndex, sharpIndex + 7);
      source = source.replace(o.color, '');
   }
   var sizeIndex = source.toLowerCase().indexOf('px');
   if (sizeIndex != -1) {
      var sizeString = source.substring(sizeIndex - 2, sizeIndex + 2);
      o.size = parseInt(sizeString);
      source = source.replace(sizeString, '');
   }
   o.font = MO.RString.trim(source);
}
MO.SUiFont_toString = function SUiFont_toString(){
   var o = this;
   var result = '';
   if(o.bold){
      result += 'bold';
   }
   if(o.size){
      if(result != ''){
         result += ' ';
      }
      result += o.size + 'px';
   }
   if(o.font){
      if(result != ''){
         result += ' ';
      }
      result += o.font;
   }
   return result;
}
MO.SUiFont_dispose = function SUiFont_dispose(){
   var o = this;
   o.font = null;
   o.size = null;
   o.bold = null;
}
MO.FUiFrameDefineConsole = function FUiFrameDefineConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd       = MO.EScope.Global;
   o._service       = 'content.define.frame';
   o._defines       = null;
   o.lsnsLoaded     = null;
   o.construct      = MO.FUiFrameDefineConsole_construct;
   o.load           = MO.FUiFrameDefineConsole_load;
   return o;
}
MO.FUiFrameDefineConsole_construct = function FUiFrameDefineConsole_construct(){
   var o = this;
   o._defines = new MO.TDictionary();
   o.lsnsLoaded = new MO.TListeners();
}
MO.FUiFrameDefineConsole_load = function FUiFrameDefineConsole_load(name){
   var o = this;
   var defines = o._defines;
   var xconfig = defines.get(name);
   if(xconfig){
      return xconfig;
   }
   var xdocument = new MO.TXmlDocument();
   var xroot = xdocument.root();
   xroot.set('action', 'query');
   var xframe = xroot.create('Frame');
   xframe.set('name', name);
   var url = MO.RDuiService.url(o._service);
   var xresult = MO.Console.find(MO.FXmlConsole).sendSync(url, xdocument);
   var xframes = xresult.nodes();
   var count = xframes.count();
   for(var i = 0; i < count; i++){
      var xframe = xframes.at(i);
      var frameName = xframe.get('name');
      defines.set(frameName, xframe);
   }
   var xframe = defines.get(name);
   if(!xframe){
      throw new MO.TError(o, 'Unknown frame. (name={1])', name);
   }
   return xframe;
}
MO.MUiMenuButton = function MUiMenuButton(o){
   o = MO.Class.inherits(this, o);
   return o;
}
MO.MUiToolButton = function MUiToolButton(o){
   o = MO.Class.inherits(this, o);
   return o;
}
MO.MUiGridCell = function MUiGridCell(o){
   o = MO.Class.inherits(this, o);
   o._grid          = MO.Class.register(o, new MO.AGetSet('_grid'));
   o._column        = MO.Class.register(o, new MO.AGetSet('_column'));
   o._row           = MO.Class.register(o, new MO.AGetSet('_row'));
   o._alignCd       = MO.Class.register(o, new MO.AGetSet('_alignCd'), MO.EUiAlign.Left);
   o._font          = MO.Class.register(o, new MO.AGetSet('_font'));
   o._value         = MO.Class.register(o, new MO.AGetSet('_value'));
   o.construct      = MO.Method.empty;
   o.calculateStyle = MO.MUiGridCell_calculateStyle;
   o.text           = MO.MUiGridCell_text;
   o.setText        = MO.MUiGridCell_setText;
   o.dispose        = MO.MUiGridCell_dispose;
   return o;
}
MO.MUiGridCell_calculateStyle = function MUiGridCell_calculateStyle(style){
   var o = this;
   var row = o._row;
   var column = o._column;
   var grid = o._grid;
   var font = o._font;
   if(font){
      font = row.font();
   }
   if(!font){
      font = column.font();
   }
   if(!font){
      font = grid.rowFont();
   }
   style.font = font;
   var alignCd = o._alignCd;
   if(!alignCd){
      alignCd = column.alignCd();
   }
   style.alignCd = alignCd;
}
MO.MUiGridCell_text = function MUiGridCell_text(){
   var o = this;
   var text = o._column.formatText(o._value);
   return text;
}
MO.MUiGridCell_setText = function MUiGridCell_setText(text){
   var o = this;
   var value = o._column.formatValue(text);
   o.setValue(value);
}
MO.MUiGridCell_dispose = function MUiGridCell_dispose(){
   var o = this;
   o._grid = null;
   o._column = null;
   o._row = null;
   o.__base.FObject.dispose.call(o);
}
MO.MUiGridCellCurrency = function MUiGridCellCurrency(o){
   o = MO.Class.inherits(this, o);
   o.construct = MO.MUiGridCellCurrency_construct;
   o.dispose   = MO.MUiGridCellCurrency_dispose;
   return o;
}
MO.MUiGridCellCurrency_construct = function MUiGridCellCurrency_construct(){
   var o = this;
}
MO.MUiGridCellCurrency_dispose = function MUiGridCellCurrency_dispose(){
   var o = this;
}
MO.MUiGridCellDate = function MUiGridCellDate(o){
   o = MO.Class.inherits(this, o);
   o.construct = MO.MUiGridCellDate_construct;
   o.dispose   = MO.MUiGridCellDate_dispose;
   return o;
}
MO.MUiGridCellDate_construct = function MUiGridCellDate_construct(){
   var o = this;
}
MO.MUiGridCellDate_dispose = function MUiGridCellDate_dispose(){
   var o = this;
}
MO.MUiGridCellPicture = function MUiGridCellPicture(o){
   o = MO.Class.inherits(this, o);
   o.construct = MO.MUiGridCellPicture_construct;
   o.dispose   = MO.MUiGridCellPicture_dispose;
   return o;
}
MO.MUiGridCellPicture_construct = function MUiGridCellPicture_construct(){
   var o = this;
}
MO.MUiGridCellPicture_dispose = function MUiGridCellPicture_dispose(){
   var o = this;
}
MO.MUiGridCellText = function MUiGridCellText(o){
   o = MO.Class.inherits(this, o);
   o.construct = MO.MUiGridCellText_construct;
   o.dispose   = MO.MUiGridCellText_dispose;
   return o;
}
MO.MUiGridCellText_construct = function MUiGridCellText_construct(){
   var o = this;
}
MO.MUiGridCellText_dispose = function MUiGridCellText_dispose(){
   var o = this;
}
MO.MUiGridColumn = function MUiGridColumn(o){
   o = MO.Class.inherits(this, o, MO.MUiPadding, MO.MUiMargin, MO.MUiTextFormator);
   o._grid        = MO.Class.register(o, new MO.AGetSet('_grid'));
   o._index       = MO.Class.register(o, new MO.AGetSet('_index'), -1);
   o._name        = MO.Class.register(o, new MO.AGetSet('_name'));
   o._label       = MO.Class.register(o, new MO.AGetSet('_label'));
   o._dataName    = MO.Class.register(o, new MO.AGetSet('_dataName'));
   o._backColor   = MO.Class.register(o, new MO.AGetSet('_backColor'));
   o._font        = MO.Class.register(o, new MO.AGetter('_font'));
   o._width       = MO.Class.register(o, new MO.AGetSet('_width'), 100);
   o._realWidth   = MO.Class.register(o, new MO.AGetSet('_realWidth'), 100);
   o._alignCd     = MO.Class.register(o, new MO.AGetSet('_alignCd'), MO.EUiAlign.Left);
   o._cellPadding = MO.Class.register(o, new MO.AGetter('_cellPadding'));
   o._cellClass   = null;
   o.construct    = MO.MUiGridColumn_construct;
   o.createCell   = MO.MUiGridColumn_createCell;
   o.findFont     = MO.MUiGridColumn_findFont;
   o.dispose      = MO.MUiGridColumn_dispose;
   return o;
}
MO.MUiGridColumn_construct = function MUiGridColumn_construct(){
   var o = this;
   o.__base.MUiPadding.construct.call(o);
   o.__base.MUiMargin.construct.call(o);
   o._cellPadding = new MO.SPadding();
}
MO.MUiGridColumn_createCell = function MUiGridColumn_createCell(clazz){
   var o = this;
   var cell = MO.Class.create(MO.Runtime.nvl(clazz, o._cellClass));
   cell.setGrid(o._grid);
   cell.setColumn(o);
   return cell;
}
MO.MUiGridColumn_findFont = function MUiGridColumn_findFont(){
   var o = this;
   var font = o._font;
   if(!font){
      font = o._grid.headFont();
   }
   return font;
}
MO.MUiGridColumn_dispose = function MUiGridColumn_dispose(){
   var o = this;
   o._grid = null;
   o._cellPadding = MO.Lang.Object.dispose(o._cellPadding);
   o.__base.MUiMargin.dispose.call(o);
   o.__base.MUiPadding.dispose.call(o);
}
MO.MUiGridColumnCurrency = function MUiGridColumnCurrency(o){
   o = MO.Class.inherits(this, o);
   o._currencyPercent = MO.Class.register(o, new MO.AGetSet('_currencyPercent'), 2);
   o._normalColor     = MO.Class.register(o, new MO.AGetSet('_normalColor'), '#000000');
   o._lowerestColor   = MO.Class.register(o, new MO.AGetSet('_lowerestColor'), '#000000');
   o._lowerColor      = MO.Class.register(o, new MO.AGetSet('_lowerColor'), '#000000');
   o._highColor       = MO.Class.register(o, new MO.AGetSet('_highColor'), '#000000');
   o._highestColor    = MO.Class.register(o, new MO.AGetSet('_highestColor'), '#000000');
   o._negativeColor   = MO.Class.register(o, new MO.AGetSet('_negativeColor'), '#000000');
   o.construct        = MO.MUiGridColumnCurrency_construct;
   o.formatText       = MO.MUiGridColumnCurrency_formatText;
   o.dispose          = MO.MUiGridColumnCurrency_dispose;
   return o;
}
MO.MUiGridColumnCurrency_construct = function MUiGridColumnCurrency_construct(){
   var o = this;
}
MO.MUiGridColumnCurrency_formatText = function MUiGridColumnCurrency_formatText(value){
   var o = this;
   var text = MO.Lang.Float.format(MO.Runtime.nvl(value, 0), null, null, o._currencyPercent, '0');
   return text;
}
MO.MUiGridColumnCurrency_dispose = function MUiGridColumnCurrency_dispose(){
   var o = this;
}
MO.MUiGridColumnDate = function MUiGridColumnDate(o){
   o = MO.Class.inherits(this, o);
   o._dateFormat = MO.Class.register(o, new MO.AGetSet('_dateFormat'), 'YYYY/MM/DD HH24:MI:SS');
   o._dateValue  = null;
   o.construct   = MO.MUiGridColumnDate_construct;
   o.formatText  = MO.MUiGridColumnDate_formatText;
   o.dispose     = MO.MUiGridColumnDate_dispose;
   return o;
}
MO.MUiGridColumnDate_construct = function MUiGridColumnDate_construct(){
   var o = this;
   o._dateValue = new MO.TDate();
}
MO.MUiGridColumnDate_formatText = function MUiGridColumnDate_formatText(value){
   var o = this;
   var date = o._dateValue;
   date.parse(value);
   return date.format(o._dateFormat);
}
MO.MUiGridColumnDate_dispose = function MUiGridColumnDate_dispose(){
   var o = this;
   o._dateValue = MO.Lang.Object.dispose(o._dateValue);
}
MO.MUiGridColumnText = function MUiGridColumnText(o){
   o = MO.Class.inherits(this, o);
   o._textAlign = MO.Class.register(o, new MO.AGetSet('_textAlign'), MO.EUiAlign.Center);
   o.construct = MO.MUiGridColumnText_construct;
   o.dispose   = MO.MUiGridColumnText_dispose;
   return o;
}
MO.MUiGridColumnText_construct = function MUiGridColumnText_construct(){
   var o = this;
}
MO.MUiGridColumnText_dispose = function MUiGridColumnText_dispose(){
   var o = this;
}
MO.MUiGridControl = function MUiGridControl(o){
   o = MO.Class.inherits(this, o);
   o._displayHead   = MO.Class.register(o, new MO.AGetSet('_displayHead'), true);
   o._displayFooter = MO.Class.register(o, new MO.AGetSet('_displayFooter'), true);
   o._displayCount  = MO.Class.register(o, new MO.AGetSet('_displayCount'), 20);
   o._columns       = MO.Class.register(o, new MO.AGetter('_columns'));
   o._headFont      = MO.Class.register(o, new MO.AGetter('_headFont'));
   o._headBackColor = MO.Class.register(o, new MO.AGetSet('_headBackColor'), '#000000');
   o._headHeight    = MO.Class.register(o, new MO.AGetSet('_headHeight'), 32);
   o._rowClass      = MO.FUiGridRow;
   o._rowFont       = MO.Class.register(o, new MO.AGetter('_rowFont'));
   o._rowHeight     = MO.Class.register(o, new MO.AGetSet('_rowHeight'), 28);
   o._rowLimitCount = MO.Class.register(o, new MO.AGetter('_rowLimitCount'), 0);
   o._rows          = MO.Class.register(o, new MO.AGetter('_rows'));
   o._rowPool       = null;
   o._focusRow      = null;
   o._focusCell     = null;
   o.construct      = MO.MUiGridControl_construct;
   o.createRow      = MO.MUiGridControl_createRow;
   o.allocRow       = MO.MUiGridControl_allocRow;
   o.freeRow        = MO.MUiGridControl_freeRow;
   o.pushColumn     = MO.MUiGridControl_pushColumn;
   o.pushRow        = MO.MUiGridControl_pushRow;
   o.clearRows      = MO.MUiGridControl_clearRows;
   o.dispose        = MO.MUiGridControl_dispose;
   return o;
}
MO.MUiGridControl_construct = function MUiGridControl_construct(){
   var o = this;
   o._columns = new MO.TDictionary();
   o._headFont = new MO.SUiFont();
   o._rows = new MO.TObjects();
   o._rowFont = new MO.SUiFont();
   o._rowPool = MO.Class.create(MO.FObjectPool);
}
MO.MUiGridControl_createRow = function MUiGridControl_createRow(clazz){
   var o = this;
   var row = MO.Class.create(MO.Runtime.nvl(clazz, o._rowClass));
   row.setGrid(o);
   var columns = o._columns;
   var count = columns.count();
   for(var i = 0; i < count; i++){
      var column = columns.at(i);
      var cell = column.createCell();
      row.pushCell(cell);
   }
   return row;
}
MO.MUiGridControl_allocRow = function MUiGridControl_allocRow(clazz){
   var o = this;
   var row = null;
   var pool = o._rowPool;
   if(pool.hasFree()){
      row = pool.alloc();
   }else{
      row = o.createRow(clazz);
   }
   return row;
}
MO.MUiGridControl_freeRow = function MUiGridControl_freeRow(row){
   this._rowPool.free(row);
}
MO.MUiGridControl_pushColumn = function MUiGridControl_pushColumn(column){
   var o = this;
   var columns = o._columns;
   var name = column.name();
   column.setGrid(o);
   column.setIndex(columns.count());
   columns.set(name, column);
}
MO.MUiGridControl_pushRow = function MUiGridControl_pushRow(row){
   var o = this;
   row.setGrid(o);
   o._rows.push(row);
}
MO.MUiGridControl_clearRows = function MUiGridControl_clearRows(){
   var o = this;
   var rows = o._rows;
   var count = rows.count();
   for(var i = 0; i < count; i++){
      var row = rows.at(i);
      o.freeRow(row);
   }
   rows.clear();
}
MO.MUiGridControl_dispose = function MUiGridControl_dispose(){
   var o = this;
   o._columns = MO.Lang.Object.dispose(o._columns);
   o._rowClass = null;
   o._rowPool = MO.Lang.Object.dispose(o._rowPool);
   o._rows = MO.Lang.Object.dispose(o._rows);
   o._focusRow = null;
   o._focusCell = null;
   o._rowFont = null;
}
MO.MUiGridRow = function MUiGridRow(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._grid     = MO.Class.register(o, new MO.AGetSet('_grid'));
   o._cells    = MO.Class.register(o, new MO.AGetter('_cells'));
   o._font     = MO.Class.register(o, new MO.AGetSet('_font'));
   o._height   = MO.Class.register(o, new MO.AGetSet('_height'), 28);
   o.construct = MO.MUiGridRow_construct;
   o.findCell  = MO.MUiGridRow_findCell;
   o.pushCell  = MO.MUiGridRow_pushCell;
   o.get       = MO.MUiGridRow_get;
   o.set       = MO.MUiGridRow_set;
   o.dispose   = MO.MUiGridRow_dispose;
}
MO.MUiGridRow_construct = function MUiGridRow_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._cells = new MO.TDictionary();
}
MO.MUiGridRow_findCell = function MUiGridRow_findCell(name){
   var o = this;
   var cell = o._cells.get(name);
   return cell;
}
MO.MUiGridRow_pushCell = function MUiGridRow_pushCell(cell){
   var o = this;
   cell.setRow(o)
   var column = cell.column();
   var dataName = column.dataName();
   o._cells.set(dataName, cell);
}
MO.MUiGridRow_get = function MUiGridRow_get(name, value){
   var o = this;
   var cell = o._cells.get(name);
   return cell.value(value);
}
MO.MUiGridRow_set = function MUiGridRow_set(name, value){
   var o = this;
   var cell = o._cells.get(name);
   return cell.setValue(value);
}
MO.MUiGridRow_dispose = function MUiGridRow_dispose(){
   var o = this;
   o._grid = null;
   o._cells = MO.Lang.Object.dispose(o._cells);
   o.__base.FObject.dispose.call(o);
}
MO.SUiGridCellStyle = function SUiGridCellStyle(){
   var o = this;
   o.alignCd = null;
   o.font    = null;
   o.dispose = MO.SUiGridCellStyle_dispose;
   return o;
}
MO.SUiGridCellStyle_dispose = function SUiGridCellStyle_dispose(){
   var o = this;
   o.alignCd = null;
   o.font = null;
}
MO.EApplicationConstant = new function EApplicationConstant(){
   var o = this;
   o.SessionCode = "mo-session-id";
   o.Resource    = "resource";
   return o;
}
MO.ECanvasChapter = new function ECanvasChapter(){
   var o = this;
   o.Simple = 'simple';
   return o;
}
MO.ECanvasScene = new function ECanvasScene(){
   var o = this;
   o.Simple = 'simple';
   return o;
}
MO.FCanvas3d = function FCanvas3d(o){
   o = MO.Class.inherits(this, o, MO.FE3dCanvas);
   o._scaleRate          = 1;
   o._optionStageProcess = false;
   o._optionResize       = false;
   o._optionMouseCapture = false;
   o._optionAlpha        = false;
   o._optionAntialias    = false;
   o._activeStage        = MO.Class.register(o, new MO.AGetter('_activeStage'));
   o._capturePosition    = null;
   o._captureRotation    = null;
   o._cameraPosition     = null;
   o.construct           = MO.FCanvas3d_construct;
   o.resize              = MO.FCanvas3d_resize;
   o.selectStage         = MO.FCanvas3d_selectStage;
   o.setPanel            = MO.FCanvas3d_setPanel;
   o.dispose             = MO.FCanvas3d_dispose;
   return o;
}
MO.FCanvas3d_construct = function FCanvas3d_construct(){
   var o = this;
   o.__base.FE3dCanvas.construct.call(o);
   o._rotation = new MO.SVector3();
   o._capturePosition = new MO.SPoint2();
   o._captureRotation = new MO.SVector3();
   o._logicSize.set(1920, 1080);
   o._cameraPosition = new MO.SPoint3();
}
MO.FCanvas3d_resize = function FCanvas3d_resize(width, height){
   var o = this;
   o.__base.FE3dCanvas.resize.call(o, width, height);
   var context = o._graphicContext;
   var size = context.size();
   var stage = o._activeStage;
   if(stage){
      var projection = stage.camera().projection();
      projection.size().set(size.width, size.height);
      projection.update();
   }
}
MO.FCanvas3d_selectStage = function FCanvas3d_selectStage(stage){
   var o = this;
   if(stage){
      stage.linkGraphicContext(o);
      stage.region().linkGraphicContext(o);
      if(!stage.technique()){
         stage.selectTechnique(o, MO.FE3dGeneralTechnique);
      }
   }
   o._activeStage = stage;
}
MO.FCanvas3d_setPanel = function FCanvas3d_setPanel(hPanel){
   var o = this;
   hPanel.appendChild(o._hCanvas);
}
MO.FCanvas3d_dispose = function FCanvas3d_dispose(){
   var o = this;
   o._rotation = MO.Lang.Object.dispose(o._rotation);
   o._capturePosition = MO.Lang.Object.dispose(o._capturePosition);
   o._captureRotation = MO.Lang.Object.dispose(o._captureRotation);
   o._cameraPosition = MO.Lang.Object.dispose(o._cameraPosition);
   o.__base.FE3dCanvas.dispose.call(o);
}
MO.FCanvasApplication = function FCanvasApplication(o){
   o = MO.Class.inherits(this, o, MO.FApplication);
   o._desktop      = MO.Class.register(o, new MO.AGetter('_desktop'));
   o._dynamicInfo  = MO.Class.register(o, new MO.AGetter('_dynamicInfo'));
   o.construct     = MO.FCanvasApplication_construct;
   o.createChapter = MO.FCanvasApplication_createChapter;
   o.setup         = MO.FCanvasApplication_setup;
   o.processResize = MO.FCanvasApplication_processResize;
   o.processEvent  = MO.FCanvasApplication_processEvent;
   o.process       = MO.FCanvasApplication_process;
   o.dispose       = MO.FCanvasApplication_dispose;
   return o;
}
MO.FCanvasApplication_construct = function FCanvasApplication_construct(){
   var o = this;
   o.__base.FApplication.construct.call(o);
}
MO.FCanvasApplication_createChapter = function FCanvasApplication_createChapter(code){
   var o = this;
   var chapter = null;
   switch(code){
      case MO.ECanvasChapter.Simple:
         chapter = MO.Class.create(MO.FCanvasSimpleChapter);
         break;
   }
   chapter.linkGraphicContext(o);
   return chapter;
}
MO.FCanvasApplication_setup = function FCanvasApplication_setup(hPanel){
   var o = this;
   var result = o.__base.FApplication.setup.call(o, hPanel);
   if(!result){
      return result;
   }
   o._hPanel = hPanel;
   var desktop = o._desktop = MO.Class.create(MO.FCanvasDesktop);
   desktop.build(hPanel);
   var canvas = desktop.canvas3d();
   var context = canvas.graphicContext();
   if(!context.isValid()){
      return;
   }
   o.linkGraphicContext(canvas);
   var control = o._dynamicInfo = MO.Class.create(MO.FCanvasDynamicInfo);
   control.linkGraphicContext(canvas);
   control.setContext(canvas.graphicContext());
   control.location().set(10, 300);
   control.build();
   return true;
}
MO.FCanvasApplication_processResize = function FCanvasApplication_processResize(event){
   var o = this;
   o.__base.FApplication.processResize.call(o, event);
   var desktop = o._desktop;
   if(desktop){
      desktop.resize();
   }
}
MO.FCanvasApplication_processEvent = function FCanvasApplication_processEvent(event){
   var o = this;
   o.__base.FApplication.processEvent.call(o, event);
   var desktop = o._desktop;
   if(desktop){
      desktop.processEvent(event);
   }
}
MO.FCanvasApplication_process = function FCanvasApplication_process(){
   var o = this;
   o.__base.FApplication.process.call(o);
   o._desktop.process();
}
MO.FCanvasApplication_dispose = function FCanvasApplication_dispose(){
   var o = this;
   o.__base.FApplication.dispose.call(o);
}
MO.FCanvasDesktop = function FCanvasDesktop(o){
   o = MO.Class.inherits(this, o, MO.FDesktop);
   o._orientationCd         = null;
   o._visible               = MO.Class.register(o, new MO.AGetter('_visible'), true);
   o._canvas2d              = MO.Class.register(o, new MO.AGetter('_canvas2d'));
   o._canvas3d              = MO.Class.register(o, new MO.AGetter('_canvas3d'));
   o.onOperationResize      = MO.FCanvasDesktop_onOperationResize;
   o.onOperationOrientation = MO.FCanvasDesktop_onOperationOrientation;
   o.construct              = MO.FCanvasDesktop_construct;
   o.build                  = MO.FCanvasDesktop_build;
   o.resize                 = MO.FCanvasDesktop_resize;
   o.setVisible             = MO.FCanvasDesktop_setVisible;
   o.show                   = MO.FCanvasDesktop_show;
   o.hide                   = MO.FCanvasDesktop_hide;
   o.selectStage            = MO.FCanvasDesktop_selectStage;
   o.dispose                = MO.FCanvasDesktop_dispose;
   return o;
}
MO.FCanvasDesktop_onOperationResize = function FCanvasDesktop_onOperationResize(event){
   var o = this;
   o.__base.FDesktop.onOperationResize.call(o, event);
   o.resize();
}
MO.FCanvasDesktop_onOperationOrientation = function FCanvasDesktop_onOperationOrientation(){
   var o = this;
   o.__base.FDesktop.onOperationOrientation.call(o, event);
   o.resize();
}
MO.FCanvasDesktop_construct = function FCanvasDesktop_construct(){
   var o = this;
   o.__base.FDesktop.construct.call(o);
   o._size.set(1920, 1080);
   o._logicSize.set(1920, 1080);
}
MO.FCanvasDesktop_build = function FCanvasDesktop_build(hPanel){
   var o = this;
   o.__base.FDesktop.build.call(o, hPanel);
   var canvas3d = o._canvas3d = MO.Class.create(MO.FCanvas3d);
   canvas3d.setDesktop(o);
   canvas3d.build(hPanel);
   canvas3d.setPanel(hPanel);
   o.canvasRegister(canvas3d);
   var canvas2d = o._canvas2d = MO.Class.create(MO.FGuiCanvas);
   canvas2d.setDesktop(o);
   canvas2d.build(hPanel);
   canvas2d.setPanel(hPanel);
   canvas2d._hCanvas.style.position = 'absolute';
   o.canvasRegister(canvas2d);
   MO.RE3dEngine.setup();
}
MO.FCanvasDesktop_resize = function FCanvasDesktop_resize(targetWidth, targetHeight){
   var o = this;
   var browser = MO.Window.Browser;
   var sourceWidth = (targetWidth != null) ? targetWidth : window.innerWidth;
   var sourceHeight = (targetHeight != null) ? targetHeight : window.innerHeight;
   var orientationCd = browser.orientationCd();
   if(o._screenSize.equalsData(sourceWidth, sourceHeight) && (o._orientationCd == orientationCd)){
      return;
   }
   o._screenSize.set(sourceWidth, sourceHeight);
   o._orientationCd = orientationCd;
   var pixelRatio = browser.capability().pixelRatio;
   var width = parseInt(sourceWidth * pixelRatio);
   var height = parseInt(sourceHeight * pixelRatio);
   o._size.set(width, height);
   var widthRate = 1;
   var heightRate = 1;
   var logicSize = o._logicSize;
   var isVertical = browser.isOrientationVertical()
   if(isVertical){
      widthRate = width / logicSize.height;
      heightRate = height / logicSize.width;
      o._calculateSize.set(logicSize.height, logicSize.width);
   }else{
      widthRate = width / logicSize.width;
      heightRate = height / logicSize.height;
      o._calculateSize.set(logicSize.width, logicSize.height);
   }
   var sizeRate = o._sizeRate = Math.min(widthRate, heightRate);
   o._logicRate.set(widthRate, heightRate);
   var calculateRate = o._calculateRate;
   if(widthRate > heightRate){
      calculateRate.set(widthRate / sizeRate, 1);
   }else if(widthRate < heightRate){
      calculateRate.set(1, heightRate / sizeRate);
   }else{
      calculateRate.set(1, 1);
   }
   var canvas3d = o._canvas3d;
   var context3d = canvas3d.graphicContext();
   context3d.size().set(width, height);
   if(browser.capability().canvasScale){
      canvas3d.resize(width, height);
   }else{
      canvas3d.resize(sourceWidth, sourceHeight);
   }
   context3d.setViewport(0, 0, width, height)
   if(isVertical){
      o._virtualSize.set(logicSize.height * calculateRate.width, logicSize.width * calculateRate.height);
   }else{
      o._virtualSize.set(logicSize.width * calculateRate.width, logicSize.height * calculateRate.height);
   }
   var canvas2d = o._canvas2d;
   canvas2d.resize(width, height);
   canvas2d.graphicContext().setGlobalScale(sizeRate, sizeRate);
   var stage = o._canvas3d.activeStage();
   o.selectStage(stage);
}
MO.FCanvasDesktop_setVisible = function FCanvasDesktop_setVisible(visible){
   var o = this;
   o._visible = visible;
   o._canvas2d.setVisible(visible);
   o._canvas3d.setVisible(visible);
}
MO.FCanvasDesktop_show = function FCanvasDesktop_show(){
   this.setVisible(true);
}
MO.FCanvasDesktop_hide = function FCanvasDesktop_hide(){
   this.setVisible(false);
}
MO.FCanvasDesktop_selectStage = function FCanvasDesktop_selectStage(stage){
   var o = this;
   o._canvas3d.selectStage(stage);
   if(stage){
      var camera = stage.camera();
      var projection = camera.projection();
      projection.size().assign(o._size);
      projection.update();
   }
   o._activeStage = stage;
}
MO.FCanvasDesktop_dispose = function FCanvasDesktop_dispose(){
   var o = this;
   o._canvas2d = MO.Lang.Object.dispose(o._canvas2d);
   o._canvas3d = MO.Lang.Object.dispose(o._canvas3d);
   o.__base.FDesktop.dispose.call(o);
}
MO.FCanvasDynamicInfo = function FCanvasDynamicInfo(o){
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   o._lastTick    = 0;
   o._name        = 'EngineInfo';
   o._stage       = MO.Class.register(o, new MO.AGetSet('_stage'));
   o._guiManager  = MO.Class.register(o, new MO.AGetSet('_guiManager'));
   o._context     = MO.Class.register(o, new MO.AGetSet('_context'));
   o._ticker      = null;
   o.onPaintBegin = MO.FCanvasDynamicInfo_onPaintBegin;
   o.oeUpdate     = MO.FCanvasDynamicInfo_oeUpdate;
   o.construct    = MO.FCanvasDynamicInfo_construct;
   return o;
}
MO.FCanvasDynamicInfo_onPaintBegin = function FCanvasDynamicInfo_onPaintBegin(event){
   var o = this;
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   if(o._stage == null){
      return;
   }
   if(o._context == null){
      return;
   }
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var timer = o._stage.timer();
   var stageStatistics = o._stage.statistics();
   var statistics = o._context.statistics();
   var line = 20;
   var locationX = 10;
   var locationY = rectangle.top + line;
   graphic.setFont('16px sans-serif');
   var browser = MO.Window.Browser;
   var browserCapability = browser.capability();
   graphic.drawText(MO.Lang.String.format('Agent         : {1}', browser.code), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText(MO.Lang.String.format(' - Browser    : type={1}, orientation={2}, canvas_scale={3}', browser.typeCd(), browser.orientationCd(), browserCapability.canvasScale), locationX, locationY, '#FFFFFF');
   locationY += line;
   var desktop = o._guiManager.desktop();
   var canvas2d = desktop.canvas2d();
   var canvas3d = desktop.canvas3d();
   var pixelRatio = MO.Window.Browser.capability().pixelRatio;
   graphic.drawText(MO.Lang.String.format('Screen        : ratio={1}, screen_size={2}, size={3}', pixelRatio, desktop.screenSize().toDisplay(), desktop.size().toDisplay()), locationX, locationY, '#FFFFFF');
   locationY += line;
   var hCanvas2d = canvas2d._hCanvas;
   graphic.drawText(MO.Lang.String.format(' - Canvas2d   : size={1}x{2}, inner_size={3}x{4}', hCanvas2d.offsetWidth, hCanvas2d.offsetHeight, hCanvas2d.width, hCanvas2d.height), locationX, locationY, '#FFFFFF');
   locationY += line;
   var hCanvas3d = canvas3d._hCanvas;
   graphic.drawText(MO.Lang.String.format(' - Canvas3d   : size={1}x{2}, inner_size={3}x{4}', hCanvas3d.offsetWidth, hCanvas3d.offsetHeight, hCanvas3d.width, hCanvas3d.height), locationX, locationY, '#FFFFFF');
   locationY += line;
   var context3d = canvas3d.graphicContext();
   graphic.drawText(MO.Lang.String.format('   - Context  : {1}', context3d.size().toDisplay()), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText(MO.Lang.String.format('   - Viewport : {1}', context3d.viewportRectangle()), locationX, locationY, '#FFFFFF');
   locationY += line;
   var camera = o._stage.camera();
   var projection = camera.projection();
   graphic.drawText(MO.Lang.String.format('Stage         :'), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText(MO.Lang.String.format(' - Camera     : position={1}', camera.position()), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText(MO.Lang.String.format(' - Projection : size={1}, znear={2}, zfar={3}', projection.size(), projection.znear(), projection.zfar()), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText(MO.Lang.String.format('Frame         : rate={1}, span=[{2}]', MO.Timer.rate(), stageStatistics._frame), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText(MO.Lang.String.format(' - Process    : {1}', stageStatistics._frameProcess), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText(MO.Lang.String.format(' - Draw       : draw={1}, sort={2}', stageStatistics._frameDraw, stageStatistics._frameDrawSort), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText(MO.Lang.String.format('Draw          : count={1}, triangle={2}', statistics.frameDrawCount(), statistics.frameTriangleCount()), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText(MO.Lang.String.format(' - Const      : count={1}, length={2}', statistics.frameConstCount(), statistics.frameConstLength()), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText(MO.Lang.String.format(' - Alloc      : buffer={1}, texture={2}', statistics.frameBufferCount(), statistics.frameTextureCount()), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText(MO.Lang.String.format(' - Total      : program={1}, layout={2}, vertex={3}, index={4}', statistics.programTotal(), statistics.layoutTotal(), statistics.vertexBufferTotal(), statistics.indexBufferTotal()), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText(MO.Lang.String.format('Investment    : entity={1}, table={2}, pool_item={3}, pool_free={4}', o._investmentEntityCount, o._investmentTableEntityCount, o._investmentPoolItemCount, o._investmentPoolFreeCount), locationX, locationY, '#FFFFFF');
   desktop.resize();
}
MO.FCanvasDynamicInfo_oeUpdate = function FCanvasDynamicInfo_oeUpdate(event){
   var o = this;
   if(o._ticker.process()){
      o.dirty();
   }
   return MO.EEventStatus.Stop;
}
MO.FCanvasDynamicInfo_construct = function FCanvasDynamicInfo_construct(){
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o._size.set(1024, 512);
   o._ticker = new MO.TTicker(1000);
}
MO.FCanvasScene = function FCanvasScene(o){
   o = MO.Class.inherits(this, o, MO.FScene);
   o._guiManager            = MO.Class.register(o, new MO.AGetter('_guiManager'));
   o.onOperationKeyDown     = MO.FCanvasScene_onOperationKeyDown;
   o.onOperationResize      = MO.FCanvasScene_onOperationResize;
   o.onOperationOrientation = MO.FCanvasScene_onOperationOrientation;
   o.onProcessAfter         = MO.FCanvasScene_onProcessAfter;
   o.construct              = MO.FCanvasScene_construct;
   o.setup                  = MO.FCanvasScene_setup;
   o.active                 = MO.FCanvasScene_active;
   o.deactive               = MO.FCanvasScene_deactive;
   o.processLoaded          = MO.FCanvasScene_processLoaded;
   o.processResize          = MO.FCanvasScene_processResize;
   o.processEvent           = MO.FCanvasScene_processEvent;
   o.dispose                = MO.FCanvasScene_dispose;
   return o;
}
MO.FCanvasScene_onOperationKeyDown = function FCanvasScene_onOperationKeyDown(event){
   var o = this;
   o.__base.FScene.onOperationKeyDown.call(o, event);
   if(event.altKey && (event.keyCode == MO.EKeyCode.P)){
      var control = o._application.dynamicInfo();
      control.setVisible(!control.visible());
   }
}
MO.FCanvasScene_onOperationResize = function FCanvasScene_onOperationResize(event){
   var o = this;
   o.__base.FScene.onOperationResize.call(o, event);
   o.processResize();
}
MO.FCanvasScene_onOperationOrientation = function FCanvasScene_onOperationOrientation(event){
   var o = this;
   o.__base.FScene.onOperationOrientation.call(o, event);
   o.processResize();
}
MO.FCanvasScene_onProcessAfter = function FCanvasScene_onProcessAfter(){
   var o = this;
   o.__base.FScene.onProcessAfter.call(o);
   o._guiManager.process();
}
MO.FCanvasScene_construct = function FCanvasScene_construct(){
   var o = this;
   o.__base.FScene.construct.call(o);
}
MO.FCanvasScene_setup = function FCanvasScene_setup(){
   var o = this;
   o.__base.FScene.setup.call(o);
   var desktop = o._application.desktop();
   var canvas2d = desktop.canvas2d();
   var guiManager = o._guiManager = MO.Class.create(MO.FGuiCanvasManager);
   guiManager.linkGraphicContext(o);
   guiManager.setDesktop(desktop);
   guiManager.setCanvas(canvas2d);
   guiManager.setup();
   var control = o._application.dynamicInfo();
   guiManager.register(control);
}
MO.FCanvasScene_active = function FCanvasScene_active(){
   var o = this;
   o.__base.FScene.active.call(o);
   var stage = o._activeStage;
   var control = o._application.dynamicInfo();
   control.setVisible(false);
   control.setDisplayOrder(10000);
   control.setStage(stage);
   control.setGuiManager(o._guiManager);
   var application = o._application;
   var desktop = application.desktop();
   desktop.selectStage(stage);
}
MO.FCanvasScene_deactive = function FCanvasScene_deactive(){
   var o = this;
   o.__base.FScene.deactive.call(o);
   var application = o._application;
   var desktop = application.desktop();
   desktop.selectStage(null);
}
MO.FCanvasScene_processLoaded = function FCanvasScene_processLoaded(){
   var o = this;
   var event = new MO.SEvent(o);
   MO.Window.lsnsLoaded.process(event);
   event.dispose();
   var desktop = o._application.desktop();
   desktop.show();
}
MO.FCanvasScene_processResize = function FCanvasScene_processResize(event){
   var o = this;
   o._guiManager.dirty();
}
MO.FCanvasScene_processEvent = function FCanvasScene_processEvent(event){
   var o = this;
   o.__base.FScene.processEvent.call(o, event);
   o._guiManager.processEvent(event);
}
MO.FCanvasScene_dispose = function FCanvasScene_dispose(){
   var o = this;
   o._guiManager = MO.Lang.Object.dispose(o._guiManager);
   o.__base.FScene.dispose.call(o);
}
MO.FCanvasSimpleChapter = function FCanvasSimpleChapter(o){
   o = MO.Class.inherits(this, o, MO.FChapter);
   o._code       = MO.ECanvasChapter.Simple;
   o.createScene = MO.FCanvasSimpleChapter_createScene;
   return o;
}
MO.FCanvasSimpleChapter_createScene = function FCanvasSimpleChapter_createScene(code){
   var o = this;
   var scene = null;
   switch(code){
      case MO.ECanvasScene.Simple:
         scene = o._sceneSimple = MO.Class.create(MO.FCanvasSimpleScene);
         break;
   }
   scene.linkGraphicContext(o);
   return scene;
}
MO.FCanvasSimpleScene = function FCanvasSimpleScene(o){
   o = MO.Class.inherits(this, o, MO.FCanvasScene);
   o._code = MO.ECanvasScene.Simple;
   o.setup = MO.FCanvasSimpleScene_setup;
   return o;
}
MO.FCanvasSimpleScene_setup = function FCanvasSimpleScene_setup(){
   var o = this;
   o.__base.FCanvasScene.setup.call(o);
   var stage = o._activeStage = MO.Class.create(MO.FE3dSimpleStage);
   stage.linkGraphicContext(o);
   stage.region().linkGraphicContext(o);
   stage.region().backgroundColor().set(0, 0, 0, 0);
}
MO.FGuiApplication = function FGuiApplication(o){
   o = MO.Class.inherits(this, o, MO.FApplication);
   o._canvas   = MO.Class.register(o, new MO.AGetter('_canvas'));
   o._manager  = MO.Class.register(o, new MO.AGetter('_manager'));
   o._desktop  = MO.Class.register(o, new MO.AGetter('_desktop'));
   o.construct = MO.FGuiApplication_construct;
   o.setup     = MO.FGuiApplication_setup;
   o.process   = MO.FGuiApplication_process;
   o.dispose   = MO.FGuiApplication_dispose;
   return o;
}
MO.FGuiApplication_construct = function FGuiApplication_construct(){
   var o = this;
   o.__base.FApplication.construct.call(o);
   o._chapters = new MO.TDictionary();
   o._eventEnterFrame = new MO.SEvent();
   o._eventLeaveFrame = new MO.SEvent();
}
MO.FGuiApplication_setup = function FGuiApplication_setup(hPanel){
   var o = this;
   var desktop = o._desktop = MO.Class.create(MO.FGuiDesktop);
   desktop.build(hPanel);
   var canvas = o._canvas = desktop.canvas();
   var manager = o._manager = MO.Class.create(MO.FGuiCanvasManager);
   manager.setDesktop(desktop);
   manager.setCanvas(canvas);
}
MO.FGuiApplication_process = function FGuiApplication_process(){
   var o = this;
   o.__base.FApplication.process.call(o);
   o._manager.process();
}
MO.FGuiApplication_dispose = function FGuiApplication_dispose(){
   var o = this;
   o.__base.FApplication.dispose.call(o);
}
MO.FGuiDesktop = function FGuiDesktop(o){
   o = MO.Class.inherits(this, o, MO.FDesktop);
   o._canvas                = MO.Class.register(o, new MO.AGetter('_canvas'));
   o.onOperationResize      = MO.FGuiDesktop_onOperationResize;
   o.onOperationOrientation = MO.FGuiDesktop_onOperationOrientation;
   o.construct              = MO.FGuiDesktop_construct;
   o.build                  = MO.FGuiDesktop_build;
   o.resize                 = MO.FGuiDesktop_resize;
   o.dispose                = MO.FGuiDesktop_dispose;
   return o;
}
MO.FGuiDesktop_onOperationResize = function FGuiDesktop_onOperationResize(event){
   var o = this;
   o.__base.FDesktop.onOperationResize.call(o, event);
   o.resize();
}
MO.FGuiDesktop_onOperationOrientation = function FGuiDesktop_onOperationOrientation(){
   var o = this;
   o.__base.FDesktop.onOperationOrientation.call(o, event);
   o.resize();
}
MO.FGuiDesktop_construct = function FGuiDesktop_construct(){
   var o = this;
   o.__base.FDesktop.construct.call(o);
   o._size.set(1920, 1080);
   o._logicSize.set(1920, 1080);
   o._screenSize.set(0, 0);
}
MO.FGuiDesktop_build = function FGuiDesktop_build(hPanel){
   var o = this;
   o.__base.FDesktop.build.call(o, hPanel);
   var canvas = o._canvas = MO.Class.create(MO.FE2dCanvas);
   canvas.setDesktop(o);
   canvas.build(hPanel);
   canvas.setPanel(hPanel);
   canvas._hCanvas.style.position = 'absolute';
   o.canvasRegister(canvas);
   MO.RE3dEngine.setup();
}
MO.FGuiDesktop_resize = function FGuiDesktop_resize(targetWidth, targetHeight){
   var o = this;
   var width = (targetWidth != null) ? targetWidth : window.innerWidth;
   var height = (targetHeight != null) ? targetHeight : window.innerHeight;
   if(o._screenSize.equalsData(width, height)){
      return;
   }
   o._screenSize.set(width, height);
   var pixelRatio = MO.Browser.capability().pixelRatio;
   MO.Logger.info(o, 'Change screen size. (size={1}x{2}, pixel_ratio={3})', width, height, pixelRatio);
   width *= pixelRatio;
   height *= pixelRatio;
   var widthRate = 1;
   var heightRate = 1;
   var logicSize = o._logicSize;
   if(MO.Browser.isOrientationHorizontal()){
      widthRate = width / logicSize.width;
      heightRate = height / logicSize.height;
      o._calculateSize.set(logicSize.width, logicSize.height);
   }else{
      widthRate = width / logicSize.height;
      heightRate = height / logicSize.width;
      o._calculateSize.set(logicSize.height, logicSize.width);
   }
   var sizeRate = o._sizeRate = Math.min(widthRate, heightRate);
   o._logicRate.set(widthRate, heightRate);
   if(widthRate > heightRate){
      o._calculateRate.set(widthRate / sizeRate, 1);
   }else if(widthRate < heightRate){
      o._calculateRate.set(1, heightRate / sizeRate);
   }else{
      o._calculateRate.set(1, 1);
   }
   o._canvas3d.resize(width, height);
   var canvas = o._canvas;
   canvas.resize(width, height);
   canvas.context().setGlobalScale(sizeRate, sizeRate);
}
MO.FGuiDesktop_dispose = function FGuiDesktop_dispose(){
   var o = this;
   o._canvas3d = MO.Lang.Object.dispose(o._canvas3d);
   o._canvas = MO.Lang.Object.dispose(o._canvas);
   o.__base.FDesktop.dispose.call(o);
}
MO.FTestApplication = function FTestApplication(o){
   o = MO.Class.inherits(this, o, MO.FApplication);
   o.setup = MO.FTestApplication_setup;
   return o;
}
MO.FTestApplication_setup = function FTestApplication_setup(hPanel){
   var o = this;
   var xroot = new MO.TXmlNode('Configuration');
   var identityCode = MO.Window.Browser.agent();
   var xbrowser = xroot.create('Browser')
   MO.Window.Browser.saveConfig(xbrowser);
   var xdesktop = xbrowser.create('Desktop')
   var xcontext2d = xdesktop.create('Context2d');
   var xcontext3d = xdesktop.create('Context3d');
   var hCanvas = MO.Window.Builder.create(hPanel, 'CANVAS');
   var context3d = MO.Graphic.Context3d.createContext(MO.FWglContext, hCanvas);
   if(context3d){
      var parameter = context3d.parameter('VERSION');
      if(parameter){
         identityCode += '|' + parameter;
      }
      var parameter = context3d.parameter('SHADING_LANGUAGE_VERSION');
      if(parameter){
         identityCode += '|' + parameter;
      }
      var parameter = context3d.parameter('UNMASKED_RENDERER_WEBGL');
      if(parameter){
         identityCode += '|' + parameter;
      }
      context3d.saveConfig(xcontext3d);
   }
   xroot.set('identity_code', identityCode);
   MO.Console.find(MO.FServiceConsole).send('cloud.info.device', 'access', xroot);
}
MO.RApplication = function RApplication(){
   var o = this;
   o._workspaces = new MO.TDictionary();
   return o;
}
MO.RApplication.prototype.initialize = function RApplication_initialize(){
   var o = this;
   MO.Window.Browser.construct();
   MO.Window.connect(window);
   MO.Window.Keyboard.construct();
}
MO.RApplication.prototype.findWorkspace = function RApplication_findWorkspace(clazz){
   var o = this;
   var name = MO.Class.name(clazz);
   var workspaces = o._workspaces;
   var workspace = workspaces.get(name);
   if(workspace == null){
      workspace = MO.Class.create(clazz);
      workspaces.set(name, workspace);
   }
   return workspace;
}
MO.RApplication.prototype.release = function RApplication_release(){
   try{
      CollectGarbage();
   }catch(e){
     MO.Logger.error(e);
   }
}
MO.RApplication = new MO.RApplication();
