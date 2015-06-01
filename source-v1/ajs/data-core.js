function FDatasetConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd = EScope.Local;
   o._service = 'cloud.data.frame';
   o._datasets        = null;
   o.onFetch  = FDatasetConsole_onFetch;
   o.construct        = FDatasetConsole_construct;
   o.loadDataset      = FDatasetConsole_loadDataset;
   o.loadDatasets     = FDatasetConsole_loadDatasets;
   o.fetch    = FDatasetConsole_fetch;
   return o;
}
function FDatasetConsole_onFetch(p){
   var o = this;
   var g = p.parameter;
   var x = p.outputNode;
   if(x.hasNode()){
      o.loadDatasets(x);
      var dss = g.datasets;
      var xns = x.nodes();
      var xnc = xns.count();
      for(var i = 0; i < xnc; i++){
         var xn = xns.get(i);
         var n = xn.get('name');
         var d = o._datasets.get(n);
         dss.set(n, d);
      }
   }
   g.process();
}
function FDatasetConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._datasets = new TDictionary();
}
function FDatasetConsole_loadDataset(x){
   var o = this;
   var n = x.get('name');
   if(RString.isEmpty(n)){
      throw new TError('Unknown dataset name.');
   }
   var d = o._datasets.get(n);
   if(!d){
      d = new TDataset();
      d.name = n;
      o._datasets.set(n, d);
   }
   d.clear();
   d.loadConfig(x);
   return d;
}
function FDatasetConsole_loadDatasets(p){
   var o = this;
   if(p.hasNode()){
      var xs = p.nodes();
      var c = xs.count();
      for(var i = 0; i < c; i++){
         var x = xs.get(i);
         if(x.isName('Dataset')){
            o.loadDataset(x);
         }
      }
   }
}
function FDatasetConsole_fetch(p){
   var o = this;
   var xd = new TXmlDocument();
   var xr = xd.root();
   xr.set('action', 'fetch');
   p.saveConfig(xr.create('Frame'));
   var e = new SXmlEvent();
   e.owner = o;
   e.url = RService.url(o._service);
   e.action = EDataAction.Fetch;
   e.parameter = p;
   e.inputDocument = xd;
   e.callback = o.onFetch;
   RConsole.find(FXmlConsole).process(e);
}
function FDatasetConsole_onScalarLoaded(g, r){
   var o = this;
   if(r.hasNode()){
      var rc = g.resultConfig = r.find('Control');
      if(rc){
         g.result = rc.get('result');
      }
   }
   g.invoke();
}
function FDatasetConsole_scalar(g){
   var o = this;
   var doc = new TXmlDocument();
   var r = doc.root();
   r.set('action', EDataAction.Scalar);
   r.push(g.toNode());
   var e = new TEvent(o, EXmlEvent.Send, o.onLoaded);
   e.url = RService.url('logic.webform.dataset');
   e.action = EDataAction.Scalar;
   e.argument = g;
   e.document = doc;
   RConsole.find(FXmlConsole).process(e);
}
function FDatasetConsole_onCompleteLoaded(g, root){
   var o = this;
   if(root.hasNode()){
      var nc = root.find('Control');
      if(nc){
         g.resultConfig = nc;
      }
   }
   g.invoke();
}
function FDatasetConsole_onLovLoadeded(arg, root){
   var o = this;
   arg.lovNode = root;
   arg.invoke();
}
function FDatasetConsole_onPrepareLoaded(g, x){
   var o = this;
   var rds = g.resultDatasets;
   if(x.hasNode()){
      var xfs = x.nodes;
      var xfc = xfs.count;
      for(var n = 0; n < xfc; n ++){
         var xf = xfs.get(n);
         var fd = xf.get('id');
         if(!RString.isEmpty(fd)){
            o.loadDatasets(rds, fd, xf);
         }
      }
   }
   if(!rds.isEmpty()){
      var c = rds.count;
      for(var n=0; n<c; n++){
         var rd = rds.value(n);
         if('/' == rd.name){
            g.resultRow = rd.row(0);
            break;
         }
      }
   }
   g.invoke();
}
function FDatasetConsole_onUpdateLoaded(g, x){
   var o = this;
   var xf = x.find('Form');
   if(!xf){
      return;
   }
   var fd = xf.get('id');
   var xd = xf.find('Dataset');
   if(!xd){
      return;
   }
   var ds = g.resultDataset = o.loadDataset(fd, xd);
   g.resultRow = ds.row(0);
   g.invoke();
   RWindow.setEnable(true);
}
function FDatasetConsole_onLoaded(e){
   var o = this;
   var r = e.document.root();
   var g = e.argument;
   if(!e.messageChecked){
      var m = new TMessageArg();
      m.argument = g;
      m.form = g.form;
      m.config = r;
      m.invokeCaller = new TInvoke(o, o.onLoaded);
      m.invokeParam = e;
      m.event = e;
      if(!RConsole.find(FMessageConsole).checkResult(m)){
         return;
      }
   }
   g.configResult = r;
   switch(e.action){
      case EDataAction.Fetch:
         o.onFetchLoaded(g, r);
         break;
      case EDataAction.Prepare:
         o.onPrepareLoaded(g, r);
         break;
      case EDataAction.Update:
         o.onUpdateLoaded(g, r);
         break;
      case EDataAction.Lov:
         o.onLovLoaded(g, r);
         break;
      case EDataAction.Scalar:
         o.onScalarLoaded(g, r);
         break;
      case EDataAction.Complete:
         o.onCompleteLoaded(g, r);
         break;
   }
   RConsole.find(FListenerConsole).process(MDataset, EAction.Changed, e, e)
}
function FDatasetConsole_complete(g){
   var o = this;
   var doc = new TXmlDocument();
   var root = doc.root();
   root.set('action', 'complete');
   root.push(g.toNode());
   var e = new TEvent(o, EXmlEvent.Send, o.onLoaded);
   e.url = RService.url('logic.webform.dataset');
   e.action = EDataAction.Complete;
   e.argument = g;
   e.document = doc;
   RConsole.find(FXmlConsole).process(e);
}
function FDatasetConsole_lov(g){
   var o = this;
   var doc = new TXmlDocument();
   var root = doc.root();
   root.set('action', 'lov');
   root.push(g.toNode());
   var e = new TEvent(o, EXmlEvent.Send, o.onLoaded);
   e.url = RService.url('logic.webform.dataset');
   e.action = EDataAction.Lov;
   e.argument = g;
   e.document = doc;
   RConsole.find(FXmlConsole).process(e);
}
function FDatasetConsole_prepare(g){
   var o = this;
   var doc = new TXmlDocument();
   var root = doc.root();
   root.set('action', 'prepare');
   root.push(g.toNode());
   var e = new TEvent(o, EXmlEvent.Send, o.onLoaded);
   e.url = RService.url('logic.webform.dataset');
   e.action = EDataAction.Prepare;
   e.argument = g;
   e.document = doc;
   RConsole.find(FXmlConsole).process(e);
}
function FDatasetConsole_update(g){
   var o = this;
   var doc = new TXmlDocument();
   var root = doc.root();
   root.set('action', 'update');
   if(g.checked){
      root.set('checked', g.checked);
   }
   root.push(g.toNode());
   var e = new TEvent(o, EXmlEvent.Send, o.onLoaded);
   e.url = RService.url('logic.webform.dataset');
   e.action = EDataAction.Update;
   e.argument = g;
   e.document = doc;
   RConsole.find(FXmlConsole).process(e);
}
function FDatasetConsole_get(id){
   var o = this;
   var ds = o.forms.get(id);
   return ds;
}
function FDatasetConsole_getById(id){
   var o = this;
   var d = o._datasets.get(id);
   return d;
}
function FDatasetConsole_getByPath(formId, path){
   var o = this;
   var ds = o.get(formId);
   return ds ? ds.get(path) : null;
}
function FDatasetConsole_onTreeLoaded(g){
   var o = this;
   alert(1);
}
function FDatasetConsole_onColumnFetch(e){
   var o = this;
   var root = e.document.root();
   var mc = RConsole.find(FMessageConsole);
   var r = mc.checkResult(root);
   if(r){
      var g = e.arg;
      if(root.hasNode()){
         var fs = root.nodes;
         var ct = fs.count;
         for(var k = 0; k < ct; k++){
            var f = fs.get(k);
            if(f.hasNode()){
               var ns = f.nodes;
               var nt = ns.count;
               for( n = 0; n < nt; n++){
                  var d = ns.get(n);
                  if(d.name == 'Data'){
                     g.resultConfig = d;
                     break;
                  }
               }
            }
         }
      }
      g.invoke();
   }
}
function FDatasetConsole_columnNodeFetch(g){
   var o = this;
   var doc = new TXmlDocument();
   var root = doc.root();
   root.set('action', g.action);
   var nd = g.toNode();
   root.push(nd);
   var url = RService.url(g.service);
   var e = new TEvent(o, EXmlEvent.Send, o.onColumnFetch);
   e.url = url;
   e.document = doc;
   e.arg = g;
   e.action = EDataAction.Fetch;
   RConsole.find(FXmlConsole).process(e);
}
function FDatasetConsole_treeUpdate(g){
   var o = this;
   var doc = new TXmlDocument();
   var root = doc.root();
   root.set('action', g.action);
   var nd = g.toNode();
   root.push(nd);
   var url = RService.url(g.service);
   var e = new TEvent(o, EXmlEvent.Send, o.onTreeLoaded);
   e.url = url;
   e.document = doc;
   e.arg = g;
   e.action = EDataAction.TreeUpdate;
   RConsole.find(FXmlConsole).process(e);
}
function FDataSource(o){
   o = RClass.inherits(this, o, FObject);
   o._currentRow     = null;
   o._currentDataset = null;
   o._datasets       = null;
   o.construct       = FDataSource_construct;
   o.selectDataset   = FDataSource_selectDataset;
   o.currentDataset  = FDataSource_currentDataset;
   o.selectRow       = FDataSource_selectRow;
   o.currentRow      = FDataSource_currentRow;
   return o;
}
function FDataSource_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._datasets = new TDictionary();
}
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
function FDataSource_currentDataset(){
   return this._currentDataset;
}
function FDataSource_selectRow(p){
   var o = this;
   if(p){
      o._currentRow = p;
      return;
   }
   var d = o._currentDataset;
   var r = d.rows().first();
   if(r == null){
      r = d.createRow();
   }
   o._currentRow = r;
   return r;
}
function FDataSource_currentRow(){
   return this._currentRow;
}
function FDataSource_create(c){
   return this.dataset.create(c);
}
function FDataSource_count(){
   return this.dataset.count;
}
function FDataSource_row(n){
   return this.dataset.get(n);
}
function FDataSource_current(){
   return this.row(this._position);
}
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
function FDataSource_get(n){
   var r = this.current();
   return r ? r.get(n) : '';
}
function FDataSource_set(n, v){
   var r = this.current();
   if(r){
      r.set(n, v);
   }
}
function FDataSource_move(p){
   this._position = p;
}
function FDataSource_moveToRow(row){
   var p = this.dataset.indexOf(row);
   if(-1 != p){
      this._position = p;
   }
}
function FDataSource_find(){
   return this.dataset.findByArgs(arguments);
}
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
function FDataSource_dump(s){
   var o = this;
   s = RString.nvlStr(s);
   s.appendLine(RClass.dump(o));
   o.dataset.dump(s);
   return s;
}
