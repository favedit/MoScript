MO.AConstructor = function AConstructor(name, dataCd, dataClass){
   var o = this;
   MO.AAnnotation.call(o, name);
   o._annotationCd = MO.EAnnotation.Constructor;
   o._inherit      = true;
   o._ordered      = true;
   o._dataCd       = dataCd;
   o._dataClass    = dataClass;
   o.dataCd        = MO.AConstructor_dataCd;
   o.dataClass     = MO.AConstructor_dataClass;
   return o;
}
MO.AConstructor_dataCd = function AConstructor_dataCd(){
   return this._dataCd;
}
MO.AConstructor_dataClass = function AConstructor_dataClass(){
   return this._dataClass;
}
MO.ADispose = function ADispose(name, disposeCd){
   var o = this;
   MO.AAnnotation.call(o, name);
   o._annotationCd = MO.EAnnotation.Dispose;
   o._inherit      = true;
   o._ordered      = true;
   o._disposeCd    = disposeCd;
   o.disposeCd     = MO.ADispose_disposeCd;
   return o;
}
MO.ADispose_disposeCd = function ADispose_disposeCd(){
   return this._disposeCd;
}
MO.AEnum = function AEnum(name, linker){
   var o = this;
   o.inherit    = true;
   o.annotation = MO.EAnnotation.Enum;
   o.name       = name;
   o.linker     = linker;
   return o;
}
MO.AGetterSource = function AGetterSource(name, linker){
   var o = this;
   MO.ASource.call(o, name, MO.ESource.Get, linker);
   o._linker = linker;
   o.build   = MO.AGetterSource_build;
   return o;
}
MO.AGetterSource_build = function AGetterSource_build(clazz, instance){
   var o = this;
   var getName = o._linker ? o._linker : o._code;
   instance[getName] = MO.Method.makePropertyGetSource(o._name, getName);
}
MO.ALinker = function ALinker(name, linker){
   var o = this;
   o.inherit    = true;
   o.annotation = MO.EAnnotation.Linker;
   o.name       = name;
   o.linker     = linker;
   return o;
}
MO.AProperty = function AProperty(name, linker){
   var o = this;
   MO.AAnnotation.call(o, name);
   o._inherit      = true;
   o._annotationCd = MO.EAnnotation.Property;
   o._linker       = null;
   o._force        = false;
   o.code          = MO.AProperty_code;
   o.build         = MO.AProperty_build;
   o.load          = MO.AProperty_load;
   o.save          = MO.AProperty_save;
   o.toString      = MO.AProperty_toString;
   var code = null;
   if(linker == null){
      if(MO.Lang.String.startsWith(name, '_')){
         code = name.substring(1);
      }else{
         code = name;
      }
      code = MO.Lang.String.toUnderline(code);
   }else{
      code = linker;
   }
   o._linker = code;
   return o;
}
MO.AProperty_code = function AProperty_code(){
   return this._linker;
}
MO.AProperty_build = function AProperty_build(){
}
MO.AProperty_load = function AProperty_load(v, x){
   v[this._name] = x.get(this._linker);
}
MO.AProperty_save = function AProperty_save(v, x){
   x.set(this._linker, v[this._name]);
}
MO.AProperty_toString = function AProperty_toString(){
   return '<' + this._annotationCd + ',linker=' + this._linker + '>';
}
MO.EBoolean = new function EBoolean(){
   var o = this;
   o.True   = 'Y';
   o.False  = 'N';
   return o;
}
MO.ECharCase = new function ECharCase(){
   var o = this;
   o.Upper = 'U';
   o.Lower = 'L';
   o.Word  = 'W';
   return o;
}
MO.EDispose = new function EDispose(){
   var o = this;
   o.Null    = 0;
   o.Dispose = 1;
   o.Release = 2;
   return o;
}
MO.ENodeType = new function ENodeType(){
   var o = this;
   o.Node = 1;
   o.Text = 3;
   o.Data = 4;
   return o;
}
MO.ENumber = new function ENumber(){
   var o = this;
   o.Integer         = 'I';
   o.PositiveInteger = 'PI';
   o.NegativeInteger = 'NI';
   o.Float           = 'F';
   o.PositiveFloat   = 'PF';
   o.NegativeFloat   = 'NF';
   return o;
}
MO.ERegExp = new function ERegExp(){
   var o = this;
   o.I  = /^-?[1-9]\d*|0$/;
   o.PI = /^[1-9]\d*$/;
   o.NI = /^-[1-9]\d*$/;
   o.F  = /^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$/;
   o.PF = /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/;
   o.NF = /^-([1-9]\d*\.\d*|0\.\d*[1-9]\d*)$/;
   o.U  = /[1-9]{1}[0-9]/;
   o.E  = /^\w{1,}[@]{1}[a-zA-Z]{1,}[.]{1}[a-zA-Z]{1,}$/;
   return o;
}
MO.EResult = new function EResult(){
   var o = this;
   o.Success  = 0;
   o.Continue = 1;
   o.Skip     = 2;
   o.Finish   = 3;
   o.Failure  = -1;
   o.Cancel   = -2;
   return o;
}
MO.MInstance = function MInstance(o){
   o = MO.Class.inherits(this, o);
   o.__free          = false;
   o.instanceCreate  = MO.Method.empty;
   o.instanceAlloc   = MO.Method.empty;
   o.instanceFree    = MO.Method.empty;
   o.instanceRelease = MO.Method.empty;
   return o;
}
MO.MInvoke = function MInvoke(o){
   o = MO.Class.inherits(this, o);
   o.invoke = MO.Method.virtual(o, 'invoke');
   return o;
}
MO.MPoolAble = function MPoolAble(o){
   o = MO.Class.inherits(this, o);
   o._poolCode = MO.Class.register(o, new MO.AGetSet('_poolCode'));
   return o;
}
MO.SArguments = function SArguments(){
   var o = this;
   o.owner = null;
   return o;
}
MO.SEnumItem = function SEnumItem(){
   var o = this;
   o.name  = null;
   o.value = 0;
   return o;
}
MO.TContext = function TContext(n, c, t){
   var o = this;
   o.name = n;
   o.code = c;
   o.text = t;
   return o;
}
MO.TDataset = function TDataset(){
   var o = this;
   o._code      = null;
   o._pageSize  = 20;
   o._pageIndex = 0;
   o._pageCount = 0;
   o._total     = 0;
   o._rows      = new MO.TObjects();
   o.isEmpty    = MO.TDataset_isEmpty;
   o.createRow  = MO.TDataset_createRow;
   o.count      = MO.TDataset_count;
   o.row        = MO.TDataset_row;
   o.rows       = MO.TDataset_rows;
   o.find       = MO.TDataset_find;
   o.push       = MO.TDataset_push;
   o.loadConfig = MO.TDataset_loadConfig;
   o.clear      = MO.TDataset_clear;
   return o;
}
MO.TDataset_isEmpty = function TDataset_isEmpty(){
   var o = this;
   return o._rows.isEmpty();
}
MO.TDataset_createRow = function TDataset_createRow(){
   var o = this;
   var r = new MO.TRow();
   r._dataset = o;
   o._rows.push(r);
   return r;
}
MO.TDataset_count = function TDataset_count(){
   return this._rows.count();
}
MO.TDataset_row = function TDataset_row(p){
   return this._rows.get(p);
}
MO.TDataset_rows = function TDataset_rows(){
   return this._rows;
}
MO.TDataset_find = function TDataset_find(p){
   var o = this;
   var a = arguments;
   var l = a.length;
   if((l % 2) != 0){
      throw new MO.TError(o, 'Parameters must is pairs (length={1})', l);
   }
   var rs = o._rows;
   var c = rs.count();
   for(var n = 0; n < c; n++){
      var r = rs.get(n);
      var f = true;
      for(var i = 0; i < l; i += 2){
         if(r.get(a[n]) != a[n + 1]){
            f = false;
            break;
         }
      }
      if(f){
         return r;
      }
   }
   return null;
}
MO.TDataset_push = function TDataset_push(r){
   this._rows.push(r);
}
MO.TDataset_loadConfig = function TDataset_loadConfig(x){
   var o = this;
   o._code = x.get('name');
   o._pageSize = MO.Lang.Integer.parse(x.get('page_size', 1000));
   o._pageIndex = MO.Lang.Integer.parse(x.get('page', 0));
   o._pageCount = MO.Lang.Integer.parse(x.get('page_count', 1));
   o._total = MO.Lang.Integer.parse(x.get('total'));
   var xns = x.nodes();
   if(xns){
      var rs = o._rows;
      var xnc = xns.count();
      for(var i = 0; i < xnc; i++){
         var xn = xns.get(i);
         if(xn.isName('Row')){
            var r = o.createRow();
            r.loadConfig(xn);
         }
      }
   }
}
MO.TDataset_clear = function TDataset_clear(){
   var o = this;
   o._pageSize = 20;
   o._pageIndex = 0;
   o._pageCount = 0;
   o._total = 0;
   o._rows.clear();
}
MO.TDataset_findIndex = function TDataset_findIndex(p){
   var o = this;
   var rs = o._rows;
   var c = rs.count();
   for(var n = 0; n < c; n++){
      var r = rs.get(n);
      if(r._index = p){
         return r;
      }
   }
   return null;
}
MO.TDataset_remove = function TDataset_remove(i){
   return this._rows.remove(i);
}
MO.TDataset_removeRow = function TDataset_removeRow(r){
   var o = this;
   var i = o.indexOf(r);
   if(-1 != i){
      o._rows.remove(i);
   }
}
MO.TDataset_saveViewer = function TDataset_saveViewer(v){
   var o = this;
   v.datasetName = o._code;
   v.datasetId = o.id;
   v.position = 0;
   v.start = 0;
   v._count = o._rows._count;
   v._rows = o._rows;
   v.dataset = o;
}
MO.TDataset_pack = function TDataset_pack(){
   var o = this;
   var rs = o._rows;
   var ss = new MO.TStrings();
   for(var n = 0; n < rs._count; n++){
      ss.push(rs.get(n).pack());
   }
   return ss.pack();
}
MO.TDataset_dump = function TDataset_dump(){
   var o = this;
   var r = new MO.TString();
   r.append(MO.Class._code(o));
   r.append(' count=', o._count);
   r.append(' fields=', o.fieldCount);
   r.appendLine();
   if(o._rows){
      var c = o._count;
      for(var n = 0; n < c; n++){
         r.append('- ');
         o._rows.get(n).dump(s);
         if(n != o._count-1){
            r.appendLine();
         }
      }
   }
   return r.toString();
}
MO.TDatasetViewer = function TDatasetViewer(){
   var o = this;
   o._datasetId = null;
   o._position  = 0;
   o._start     = 0;
   o._count     = 0;
   e._values   = null;
   o._rows      = null;
   o._ouids     = null;
   o.isEmpty   = MO.TDatasetViewer_isEmpty;
   o.count     = MO.TDatasetViewer_count;
   o.current   = MO.TDatasetViewer_current;
   o.reset     = MO.TDatasetViewer_reset;
   o.move      = MO.TDatasetViewer_move;
   o.moveToRow = MO.TDatasetViewer_moveToRow;
   o.first     = MO.TDatasetViewer_first;
   o.prior     = MO.TDatasetViewer_prior;
   o.next      = MO.TDatasetViewer_next;
   o.last      = MO.TDatasetViewer_last;
   return o;
}
MO.TDatasetViewer_isEmpty = function TDatasetViewer_isEmpty(){
   return (this._count == null);
}
MO.TDatasetViewer_count = function TDatasetViewer_count(){
   return this._count;
}
MO.TDatasetViewer_current = function TDatasetViewer_current(){
   var o = this;
   var s = o._rows;
   return s ? s.get(o._position - o._start) : null;
}
MO.TDatasetViewer_reset = function TDatasetViewer_reset(){
   this._position = -1;
}
MO.TDatasetViewer_move = function TDatasetViewer_move(p){
   this._position = p;
}
MO.TDatasetViewer_moveToRow = function TDatasetViewer_moveToRow(r){
   var o = this;
   var p = o._rows.indexOf(r);
   if(p != -1){
      o._position = p - o._start;
   }
}
MO.TDatasetViewer_first = function TDatasetViewer_first(r){
   this._position = r ? -1 : 0;
}
MO.TDatasetViewer_prior = function TDatasetViewer_prior(){
   var o = this;
   if(o._position > 0){
      o._position--;
      return true;
   }
   return false;
}
MO.TDatasetViewer_next = function TDatasetViewer_next(){
   var o = this;
   if(o._position < o._count-1){
      o._position++;
      return true;
   }
   return false;
}
MO.TDatasetViewer_last = function TDatasetViewer_last(){
   this._position = this._count-1;
}
MO.TFatalError = function TFatalError(po, pe, pm, pp){
   var o = this;
   var r = new MO.TString();
   var f = TFatalError.caller;
   var s = new MO.TString();
   var t = new Array();
   while(f){
      if(MO.Lang.Array.contains(t, f)){
         break;
      }
      t.push(f);
      f = f.caller;
   }
   var c = t.length;
   for(var n = 0; n < c; n++){
      f = t[n];
      if(n > 0){
         s.appendLine();
      }
      s.append('   ' + (c - n) + ': ' + MO.Method.name(f));
   }
   var a = arguments;
   var c = a.length;
   for(var n = 2; n < c; n++){
      var v = a[n];
      var vs = null;
      if(typeof(v) == 'function'){
         vs = MO.Method.name(v);
      }else{
         vs = v;
      }
      pm = pm.replace('{' + (n - 1) + '}', vs);
   }
   r.appendLine(pm);
   r.appendLine('------------------------------------------------------------');
   r.append(s);
   throw new Error(r);
}
MO.TInstancePool = function TInstancePool(){
   var o = this;
   MO.TObjects.call(o);
   o._instance = null;
   o.instance  = MO.TInstancePool_instance;
   o.alloc     = MO.TInstancePool_alloc;
   o.free      = MO.TInstancePool_free;
   return o;
}
MO.TInstancePool_instance = function TInstancePool_instance(p){
   var o = this;
   var r = o._instance;
   if(r == null){
      r = o._instance = MO.Class.create(p);
      r.instanceCreate();
   }
   r.instanceAlloc();
   return r;
}
MO.TInstancePool_alloc = function TInstancePool_alloc(p){
   var o = this;
   var r = null;
   if(o._count == 0){
      r = MO.Class.create(p);
      r.instanceCreate();
   }else{
      r = o.pop();
   }
   r.instanceAlloc();
   return r;
}
MO.TInstancePool_free = function TInstancePool_free(p){
   p.instanceFree();
   return this.push(p);
}
MO.TInvoke = function TInvoke(){
   var o = this;
   o.owner    = null;
   o.callback = null;
   o.invoke   = MO.TInvoke_invoke;
   return o;
}
MO.TInvoke_invoke = function TInvoke_invoke(p1, p2, p3, p4, p5, p6){
   var o = this;
   if(o.callback){
      var c = o.owner ? o.owner : o;
      try{
         o.callback.call(c, p1, p2, p3, p4, p5, p6);
      }catch(e){
         MO.Logger.fatal(o, e, 'Call method failure. (owner={1}, callback={2})', c, o.callback);
      }
   }
}
MO.TLoaderListener = function TLoaderListener(){
   var o = this;
   o.invoke = null;
   o.ids    = new MO.TArray();
   o.check  = MO.TLoaderListener_check;
   return o;
}
MO.TLoaderListener_check = function TLoaderListener_check(l){
   var s = this.ids;
   if(!s.isEmpty()){
      var c = s.length;
      for(var n = 0; n < c; n++){
         if(!l.contains(s.get(n))){
            return false;
         }
      }
   }
   return true;
}
MO.TLocker = function TLocker(){
   var o = this;
   o._lock = false;
   o.enter = MO.TLocker_enter;
   o.leave = MO.TLocker_leave;
   return o;
}
MO.TLocker_enter = function TLocker_enter(){
   this._lock = true;
}
MO.TLocker_leave = function TLocker_leave(){
   this._lock = false;
}
MO.TMessage = function TMessage(){
   var o = this;
   o.typeCd      = MO.EMessage.None;
   o.attrType    = null;
   o.message     = null;
   o.description = null;
   o.redirect    = null;
   o.loadConfig = MO.TMessage_loadConfig;
   o.saveConfig = MO.TMessage_saveConfig;
   o.icon       = MO.TMessage_icon;
   return o;
}
MO.TMessage_loadConfig = function TMessage_loadConfig(config){
   var o = this;
   o.typeCd      = RString.toLower(config.name);
   o.message     = config.nvl('message');
   o.attrType    = config.nvl('type');
   o.redirect    = config.nvl('redirect');
   var desc = config.nvl('description');
   o.description = desc.replace(/\\n/g, '\n');
}
MO.TMessage_saveConfig = function TMessage_saveConfig(config){
   var o = this;
   config.name = o.typeCd;
   config.set('message', o.message);
   config.set('description', o.description);
}
MO.TMessage_icon = function TMessage_icon(){
   return 'sys.msg.' + this.typeCd;
}
MO.TMessages = function TMessages(){
   var o = this;
   o._items     = new MO.TObjects();
   o.hasMessage = MO.TMessages_hasMessage;
   o.message    = MO.TMessages_message;
   o.messages   = MO.TMessages_messages;
   o.type       = MO.TMessages_type;
   o.push       = MO.TMessages_push;
   return o;
}
MO.TMessages_hasMessage = function TMessages_hasMessage(type){
   for(var n=0; n<this._items.count; n++){
      var m = this._items.get(n);
      if(m && m.type == type){
         return true;
      }
   }
   return false;
}
MO.TMessages_message = function TMessages_message(type){
   for(var n=0; n<this._items.count; n++){
      var m = this._items.get(n);
      if(m && m.type == type){
         return m;
      }
   }
   return null;
}
MO.TMessages_messages = function TMessages_messages(type){
   var rs = null;
   for(var n=0; n<this._items.count; n++){
      var msg = this._items.get(n);
      if(msg && msg.type == type){
         if(!rs){
            rs = new TList();
         }
         rs.push(msg);
      }
   }
   return rs;
}
MO.TMessages_type = function TMessages_type(){
   if(this.hasMessage(EMessage.Fatal)){
      return EMessage.Fatal;
   }
   if(this.hasMessage(EMessage.Error)){
      return EMessage.Error;
   }
   if(this.hasMessage(EMessage.Warn)){
      return EMessage.Warn;
   }
   if(this.hasMessage(EMessage.Valid)){
      return EMessage.Valid;
   }
   if(this.hasMessage(EMessage.Info)){
      return EMessage.Info;
   }
   return EMessage.None;
}
MO.TMessages_push = function TMessages_push(msg){
   if(msg){
      this._items.push(msg);
   }
}
MO.TNode = function TNode(name){
   var o = this;
   o._name        = MO.Lang.String.nvl(name, 'Node');
   o._value       = null;
   o._attributes  = null;
   o._nodes       = null;
   o.isName       = MO.TNode_isName;
   o.name         = MO.TNode_name;
   o.setName      = MO.TNode_setName;
   o.value        = MO.TNode_value;
   o.setValue     = MO.TNode_setValue;
   o.contains     = MO.TNode_contains;
   o.hasAttribute = MO.TNode_hasAttribute;
   o.attributes   = MO.TNode_attributes;
   o.hasNode      = MO.TNode_hasNode;
   o.nodeCount    = MO.TNode_nodeCount;
   o.node         = MO.TNode_node;
   o.nodes        = MO.TNode_nodes;
   o.get          = MO.TNode_get;
   o.getInteger   = MO.TNode_getInteger;
   o.set          = MO.TNode_set;
   o.setNvl       = MO.TNode_setNvl;
   o.setBoolean   = MO.TNode_setBoolean;
   o.setFloat     = MO.TNode_setFloat;
   o.find         = MO.TNode_find;
   o.findNode     = MO.TNode_findNode;
   o.searchNode   = MO.TNode_searchNode;
   o.push         = MO.TNode_push;
   o.toString     = MO.TNode_toString;
   o.innerDump    = MO.TNode_innerDump;
   o.dump         = MO.TNode_dump;
   return o;
}
MO.TNode_isName = function TNode_isName(n){
   return MO.Lang.String.equals(this._name, n);
}
MO.TNode_name = function TNode_name(){
   return this._name;
}
MO.TNode_setName = function TNode_setName(p){
   this._name = p;
}
MO.TNode_value = function TNode_value(){
   return this._value;
}
MO.TNode_setValue = function TNode_setValue(p){
   this._value = p;
}
MO.TNode_contains = function TNode_contains(n){
   var r = this._attributes;
   return r ? r.contains(n) : false;
}
MO.TNode_hasAttribute = function TNode_hasAttribute(){
   var s = this._attributes;
   return s ? !s.isEmpty() : false;
}
MO.TNode_attributes = function TNode_attributes(){
   var o = this;
   var r = o._attributes;
   if(!r){
      r = o._attributes = new MO.TAttributes();
   }
   return r;
}
MO.TNode_hasNode = function TNode_hasNode(){
   var s = this._nodes;
   return s ? !s.isEmpty() : false;
}
MO.TNode_nodeCount = function TNode_nodeCount(){
   var nodes = this._nodes;
   return nodes ? nodes.count() : 0;
}
MO.TNode_node = function TNode_node(index){
   var nodes = this._nodes;
   return nodes ? nodes.at(index) : null;
}
MO.TNode_nodes = function TNode_nodes(){
   var o = this;
   var nodes = o._nodes;
   if(!nodes){
      nodes = o._nodes = new MO.TObjects();
   }
   return nodes;
}
MO.TNode_get = function TNode_get(n, v){
   return this._attributes ? this._attributes.get(n, v) : null;
}
MO.TNode_getInteger = function TNode_getInteger(n, v){
   return MO.Lang.Integer.parse(this.get(n, v));
}
MO.TNode_set = function TNode_set(n, v){
   if(v != null){
      this.attributes().set(n, v);
   }
}
MO.TNode_setNvl = function TNode_setNvl(name, value){
   if(!MO.Lang.String.isEmpty(value)){
      this.attributes().set(name, value);
   }
}
MO.TNode_setBoolean = function TNode_setBoolean(n, v){
   if(v != null){
      this.attributes().set(n, MO.Lang.Boolean.format(v));
   }
}
MO.TNode_setFloat = function TNode_setFloat(n, v){
   if(v != null){
      this.attributes().set(n, MO.Lang.Float.format(v));
   }
}
MO.TNode_find = function TNode_find(p){
   var o = this;
   if(o.hasNode()){
      var ns = o._nodes;
      var c = ns.count();
      for(var i = 0; i < c; i++){
         var n = ns.get(i);
         if(n.isName(p)){
            return n;
         }
      }
   }
   return null;
}
MO.TNode_findNode = function TNode_findNode(pn, pv){
   var o = this;
   if(o.hasNode()){
      var ns = o._nodes;
      var nc = ns.count();
      var as = arguments;
      var ac = as.length;
      if((ac - 1) % 2){
         throw new MO.TError('Attributes is not pair. (length={1})', ac);
      }
      for(var ni = 0; ni < nc; ni++){
         var n = ns.get(ni);
         if(pn != null){
            if(!n.isName(pn)){
               continue;
            }
         }
         var f = true;
         for(var ai = 1; ai < ac; ai += 2){
            if(n.get(as[ai]) != as[ai + 1]){
               f = false;
               break;
            }
         }
         if(f){
            return n;
         }
      }
   }
   return null;
}
MO.TNode_searchNode = function TNode_searchNode(pn, pv){
   var o = this;
   if(o.hasAttribute()){
      if(o._attributes.get(pn) == pv){
         return o;
      }
   }
   if(o.hasNode()){
      var ns = o._nodes;
      var c = ns.count();
      for(var i = 0; i < c; ni++){
         var n = ns.get(n).searchNode(pn, pv);
         if(n != null){
            return n;
         }
      }
   }
   return null;
}
MO.TNode_push = function TNode_push(p){
   var o = this;
   o.nodes().push(p);
}
MO.TNode_toString = function TNode_toString(){
   return this.dump();
}
MO.TNode_innerDump = function TNode_innerDump(dump, node, space){
   if(space == null){
      space = '';
   }
   dump.append(space, node._name, '(', RClass.name(node), ')');
   var attributes = node._attributes;
   if(attributes){
      var count = attributes.count();
      dump.append(' [', count, ':');
      for(var n = 0; n < count; n++){
         if(n > 0){
            dump.append(' ');
         }
         dump.append(attributes.name(n), '=', attributes.value(n));
         if(n < count - 1){
            dump.append(',');
         }
      }
      dump.append(']');
   }
   if(node._value){
      var value = node._value.toString();
      if(!MO.Lang.String.isEmpty(value)){
         dump.append(' {', value.length, ':', value, '}');
      }
   }
   var nodes = node._nodes;
   if(nodes){
      var count = nodes.count();
      dump.append('\n');
      for(var n = 0; n < count; n++){
         nodes.get(n).dump(dump, space + '   ');
         if(n < count - 1){
            dump.append('\n');
         }
      }
   }
   return dump;
}
MO.TNode_dump = function TNode_dump(d, space){
   return this.innerDump(MO.Lang.String.nvlString(d), this, space);
}
MO.TRow = function TRow(){
   var o = this;
   MO.TAttributes.call(o);
   o._dataset   = null;
   o._index     = null;
   o._uniqueId  = null;
   o._statusCd  = null;
   o.loadConfig = MO.TRow_loadConfig;
   o.saveConfig = MO.TRow_saveConfig;
   return o;
}
MO.TRow_loadConfig = function TRow_loadConfig(x){
   var o = this;
   o._index = x.get('_id');
   o._statusCd = x.get('_status');
   o._uniqueId = x.get('ouid');
   if(x.hasAttribute()){
      o.append(x.attributes());
   }
}
MO.TRow_saveConfig = function TRow_saveConfig(x){
   var o = this;
   x.set('_id', o._index);
   x.set('_status', o._statusCd);
   var c = o.count();
   for(var i = 0; i < c; i++){
      x.set(o._names[i], o._values[i]);
   }
}
MO.TRow_copy = function TRow_copy(){
   var o = this;
   var r = new TRow();
   r._dataset = o._dataset;
   r._index = o._index;
   r._statusCd = o._statusCd;
   r._uniqueId = o._uniqueId;
   var c = o.count;
   for(var n = 0; n < c; n++){
      r.set(o.names[n], o.values[n]);
   }
   return r;
}
MO.TRow_toAttributes = function TRow_toAttributes(a){
   var o = this;
   if(!a){
      a = new MO.TAttributes();
   }
   a.set(RDataset.ROW_STATUS, o._statusCd);
   a.append(o);
   return a;
}
MO.TRow_dump = function TRow_dump(s){
   var o = this;
   var c = o.count;
   s = MO.Lang.String.nvlStr(s);
   s.append(MO.Class.name(o), ' [', o._statusCd, ': ');
   for(var n=0; n<c; n++){
      if(n > 0){
         s.append(',');
      }
      s.append(o.names[n], '=', o.values[n]);
   }
   s.append(']');
   return s;
}
MO.TSpeed = function TSpeed(){
   var o = this;
   o.arguments  = arguments;
   o._start     = 0;
   o._end       = 0;
   o._span      = 0;
   o._spanMin   = Number.MAX_VALUE;
   o._spanMax   = 0;
   o.start      = new Date().getTime();
   o.callerName = MO.Method.name(MO.TSpeed.caller);
   o.reset      = MO.TSpeed_reset;
   o.begin      = MO.TSpeed_begin;
   o.end        = MO.TSpeed_end;
   o.record     = MO.TSpeed_record;
   o.toString   = MO.TSpeed_toString;
   return o;
}
MO.TSpeed_reset = function TSpeed_reset(){
   var o = this;
   o._start = 0;
   o._end = 0;
   o._span = 0;
}
MO.TSpeed_begin = function TSpeed_begin(){
   var o = this;
   o._start = new Date().getTime();
}
MO.TSpeed_end = function TSpeed_end(){
   var o = this;
   o._end = new Date().getTime();
   o._span += o._end - o._start;
   if(o._span < o._spanMin){
      o._spanMin = o._span;
   }
   if(o._span > o._spanMax){
      o._spanMax = o._span;
   }
}
MO.TSpeed_record = function TSpeed_record(){
   var o = this;
   var sp = new Date().getTime() - o.start;
   MO.Logger.debug(o, 'Speed test. (caller={1}, speed={2}, arguments={3})', o.callerName, sp, o.arguments);
   o.arguments = null;
   o.start = null;
   o.callerName = null;
   o.record = null;
}
MO.TSpeed_toString = function TSpeed_toString(){
   var o = this;
   return o._span + ' (' + o._spanMin + ' - ' + o._spanMax + ')';
}
MO.TTicker = function TTicker(interval){
   var o = this;
   o.interval = interval;
   o.lastTick = 0;
   o.process  = MO.TTicker_process;
}
MO.TTicker_process = function TTicker_process(){
   var o = this;
   var tick = MO.Timer.current();
   var span = tick - o.lastTick;
   if(span > o.interval){
      o.lastTick = tick;
      return true;
   }
   return false;
}
MO.TUnsupportError = function TUnsupportError(po, pp){
   var o = this;
   var pm = 'Unsupport method. (name={1})'
   var r = new MO.TString();
   var f = TUnsupportError.caller;
   var s = new MO.TString();
   var t = new Array();
   while(f){
      if(MO.Lang.Array.contains(t, f)){
         break;
      }
      t.push(f);
      f = f.caller;
   }
   var c = t.length;
   for(var n = 0; n < c; n++){
      f = t[n];
      if(n > 0){
         s.appendLine();
      }
      s.append('   ' + (c - n) + ': ' + MO.Method.name(f));
   }
   var a = arguments;
   var c = a.length;
   for(var n = 1; n < c; n++){
      var v = a[n];
      var vs = null;
      if(typeof(v) == 'function'){
         vs = MO.Method.name(v);
      }else{
         vs = v;
      }
      pm = pm.replace('{' + (n - 1) + '}', vs);
   }
   r.appendLine(pm);
   r.appendLine('------------------------------------------------------------');
   r.append(s);
   throw new Error(r);
}
MO.FConsole = function FConsole(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._scopeCd     = MO.Class.register(o, new MO.AGetter('_scopeCd'), MO.EScope.Global);
   o._statusSetup = false;
   o.onSetup      = MO.Method.empty;
   o.setup        = MO.FConsole_setup;
   return o;
}
MO.FConsole_setup = function FConsole_setup(){
   var o = this;
   if(!o._statusSetup){
      o.onSetup();
      o._statusSetup = true;
   }
}
MO.FObjectPool = function FObjectPool(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._items      = MO.Class.register(o, new MO.AGetter('_items'));
   o._frees      = MO.Class.register(o, new MO.AGetter('_frees'));
   o._allocCount = 0;
   o._freeCount  = 0;
   o.construct   = MO.FObjectPool_construct;
   o.hasFree     = MO.FObjectPool_hasFree;
   o.alloc       = MO.FObjectPool_alloc;
   o.free        = MO.FObjectPool_free;
   o.push        = MO.FObjectPool_push;
   o.dispose     = MO.FObjectPool_dispose;
   o.innerDump   = MO.FObjectPool_innerDump;
   return o;
}
MO.FObjectPool_construct = function FObjectPool_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._items = new MO.TObjects();
   o._frees = new MO.TObjects();
}
MO.FObjectPool_hasFree = function FObjectPool_hasFree(){
   return !this._frees.isEmpty();
}
MO.FObjectPool_alloc = function FObjectPool_alloc(){
   var o = this;
   var item = null;
   if(!o._frees.isEmpty()){
      item = o._frees.pop();
   }
   o._allocCount++;
   return item;
}
MO.FObjectPool_free = function FObjectPool_free(item){
   var o = this;
   o._frees.push(item);
   o._freeCount++;
}
MO.FObjectPool_push = function FObjectPool_push(p){
   var o = this;
   o._items.push(p);
   o._frees.push(p);
}
MO.FObjectPool_dispose = function FObjectPool_dispose(){
   var o = this;
   o._items = MO.RObject.dispose(o._items);
   o._frees = MO.RObject.dispose(o._frees);
   o.__base.FObject.dispose.call(o);
}
MO.FObjectPool_innerDump = function FObjectPool_innerDump(result, level){
   var o = this;
   result.append('Pool:');
   result.append('total=', o._items.count());
   result.append(', free=', o._frees.count());
   result.append(', alloc_count=', o._allocCount);
   result.append(', free_count=', o._freeCount);
}
MO.FObjectPools = function FObjectPools(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._pools    = null;
   o.construct = MO.FObjectPools_construct;
   o.pool      = MO.FObjectPools_pool;
   o.alloc     = MO.FObjectPools_alloc;
   o.free      = MO.FObjectPools_free;
   o.dispose   = MO.FObjectPools_dispose;
   return o;
}
MO.FObjectPools_construct = function FObjectPools_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._pools = new MO.TDictionary();
}
MO.FObjectPools_pool = function FObjectPools_pool(code){
   var o = this;
   var pool = o._pools.get(code);
   if(!pool){
      pool = MO.Class.create(MO.FObjectPool);
      o._pools.set(code, pool);
   }
   return pool;
}
MO.FObjectPools_alloc = function FObjectPools_alloc(code){
   var o = this;
   var pool = o.pool(code);
   return pool.alloc();
}
MO.FObjectPools_free = function FObjectPools_free(code, instance){
   var o = this;
   var pool = o.pool(code);
   return pool.free(instance);
}
MO.FObjectPools_push = function FObjectPools_push(code, instance){
   var o = this;
   var pool = o.pool(code);
   return pool.push(instance);
}
MO.FObjectPools_dispose = function FObjectPools_dispose(){
   var o = this;
   var pools = o._pools;
   var count = pools.count();
   for(var i = 0; i < count; i++){
      var pool = pools.at(i);
      pool.dispose();
   }
   pools.dispose();
   o.__base.FObject.dispose.call(o);
}
MO.FTimer = function FTimer(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._count      = 0;
   o._startTime  = 0;
   o._beginTime  = 0;
   o._endTime    = 0;
   o._stopTime   = 0;
   o._span       = MO.Class.register(o, new MO.AGetter('_span'), 0);
   o._spanSecond = MO.Class.register(o, new MO.AGetter('_spanSecond'), 0);
   o.setup       = MO.FTimer_setup;
   o.current     = MO.FTimer_current;
   o.rate        = MO.FTimer_rate;
   o.update      = MO.FTimer_update;
   return o;
}
MO.FTimer_setup = function FTimer_setup(){
   var o = this;
   var n = new Date().getTime();
   o._startTime = n;
   o._beginTime = n;
   o._endTime = n;
}
MO.FTimer_current = function FTimer_current(){
   return this._lastTime;
}
MO.FTimer_rate = function FTimer_rate(){
   var o = this;
   if(o._count == 0){
      return 0;
   }
   var t = o._lastTime - o._startTime;
   var c = o._count * 1000 / t;
   return parseInt(c);
}
MO.FTimer_update = function FTimer_update(){
   var o = this;
   o._count++;
   var b = o._beginTime = o._endTime;
   var e = o._endTime = new Date().getTime();
   var s = o._span = e - b;
   o._spanSecond = s / 1000;
}
MO.RArray = function RArray(){
   var o = this;
   o.array1           = new Array(1);
   o.array2           = new Array(2);
   o.array3           = new Array(3);
   o.array4           = new Array(4);
   o.array9           = new Array(9);
   o.array12          = new Array(12);
   o.array16          = new Array(16);
   o.sortComparerAsc  = MO.Runtime.sortComparerAsc;
   o.sortComparerDesc = MO.Runtime.sortComparerDesc;
   o.pairSortMid      = MO.Runtime.pairSortMid;
   o.pairSortSub      = MO.Runtime.pairSortSub;
   o.pairSort         = MO.Runtime.pairSort;
   return o;
}
MO.RArray.prototype.equals = function RArray_equals(s, t){
   if(s && t){
      if(s.length == t.length){
         var c = s.length;
         for(var n = 0; n < c; n++){
            if(s[n] != t[n]){
               return false;
            }
         }
         return true;
      }
   }
   return false;
}
MO.RArray.prototype.count = function RArray_count(value){
   var count = 0;
   for(var name in value){
      count++;
   }
   return count;
}
MO.RArray.prototype.contains = function RArray_contains(array, v){
   var c = array.length;
   for(var n = 0; n < c; n++){
      if(array[n] == v){
         return true;
      }
   }
   return false;
}
MO.RArray.prototype.find = function RArray_find(a, v){
   var c = a.length;
   for(var n = 0; n < c; n++){
      if(a[n] == v){
         return n;
      }
   }
   return -1;
}
MO.RArray.prototype.search = function RArray_search(a, v){
   for(var n in a){
      if(a[n] == v){
         return n;
      }
   }
   return null;
}
MO.RArray.prototype.reverse = function RArray_reverse(a, s, e){
   var c = (e + 1 - s) >> 1;
   for(var n = 0; n < c; n++){
      var t = a[s + n];
      a[s + n] = a[e - n];
      a[e - n] = t;
   }
}
MO.RArray.prototype.copy = function RArray_copy(source, sourceOffset, sourceCount, target, targetOffset){
   MO.Assert.debugNotNull(source);
   MO.Assert.debugTrue((sourceOffset >= 0) && (sourceOffset + sourceCount <= source.length));
   MO.Assert.debugTrue(sourceCount <= source.length);
   MO.Assert.debugNotNull(target);
   MO.Assert.debugTrue((targetOffset >= 0) && (targetOffset + sourceCount <= target.length));
   for(var i = 0; i < sourceCount; i++){
      target[i + targetOffset] = source[i + sourceOffset];
   }
   return target;
}
MO.RArray.prototype.move = function RArray_move(array, offset, count, target){
   if(offset > target){
      for(var n = 0; n < count; n++){
         array[target - n] = array[offset + n];
      }
   }else if(offset < target){
      for(var n = 0; n < count; n++){
         array[target + count - n - 1] = array[offset + count - n - 1];
      }
   }
}
MO.RArray.prototype.remove = function RArray_remove(a, n){
   return a.slice(0, n).concat(a.slice(n + 1));
}
MO.RArray.prototype.sortPartition = function RArray_sortPartition(a, l, r){
   var s = l;
   var e = r + 1;
   var t = a[s];
   while(true){
      while(a[++s] < t){
      }
      while(a[--e] > t){
      }
      if(s > e){
         break;
      }
      var v = a[s];
      a[s] = a[e];
      a[e] = v;
   }
   a[l] = a[e];
   a[e] = t;
   return e;
}
MO.RArray.prototype.sortArray = function RArray_sortArray(a, s, e){
   if(s < e){
      var o = this;
      var p = o.sortPartition(a, s, e);
      o.sortArray(a, s, p - 1);
      o.sortArray(a, p + 1, e);
   }
}
MO.RArray.prototype.sort = function RArray_sort(a, t){
   var o = this;
   var c = a.length - 1;
   o.sortArray(a, 0, c);
   if(t){
      o.reverse(a, 0, c);
   }
   return a;
}
MO.RArray.prototype.nameMaxLength = function RArray_nameMaxLength(a){
   var r = 0;
   for(var n in a){
      var l = n.length;
      if(l > n){
         n = l;
      }
   }
   return r;
}
MO.RArray.prototype.quickSort = function RArray_quickSort(items, offset, count, comparer, parameters){
   this.pairSort(items, null, offset, count, comparer, parameters);
}
MO.RArray = new MO.RArray();
MO.Lang.Array = MO.RArray;
MO.RBlob = function RBlob(){
   return this;
}
MO.RBlob.prototype.fromText = function RBlob_fromText(value){
   var length = value.length;
   var data = new Uint8Array(length);
   for (var i = 0; i < length; i++) {
      data[i] = value.charCodeAt(i);
   }
   var blob = new Blob([data]);
   return blob;
}
MO.Lang.Blob = new MO.RBlob();
MO.RBoolean = function RBoolean(){
   return this;
}
MO.RBoolean.prototype.format = function RBoolean_format(value){
   return value ? MO.EBoolean.True : MO.EBoolean.False;
}
MO.RBoolean.prototype.parse = function RBoolean_parse(value){
   if(value != null){
      if(value.constructor == Boolean){
         return value;
      }else if(value.constructor == String){
         return (value == MO.EBoolean.True);
      }else if(value.constructor == Number){
         return value > 0;
      }else{
         throw new MO.TError(this, 'Unknown type.');
      }
   }
   return false;
}
MO.RBoolean.prototype.toString = function RBoolean_toString(value, valueTrue, valueFalse){
   if(valueTrue == null){
      valueTrue = MO.EBoolean.True;
   }
   if(valueFalse == null){
      valueFalse = MO.EBoolean.False;
   }
   return value ? valueTrue : valueFalse;
}
MO.RBoolean = new MO.RBoolean();
MO.Lang.Boolean = MO.RBoolean;
MO.RByte = function RByte(){
   return this;
}
MO.RByte.prototype.copy = function RByte_copy(po, poi, pi, pii, pc){
   for(var i = 0; i < pc; i++){
      po[poi++] = pi[pii++];
   }
}
MO.RByte.prototype.encodeBytes = function RByte_encodeBytes(data, offset, length, key){
   var o = this;
   var sign = new Uint8Array(8);
   sign[0] = (key >> 16) & 0xFF;
   sign[1] = (key >>  8) & 0xFF;
   sign[2] = (key      ) & 0xFF;
   sign[3] = (key >> 24) & 0xFF;
   sign[4] = (key      ) & 0xFF;
   sign[5] = (key >> 24) & 0xFF;
   sign[6] = (key >> 16) & 0xFF;
   sign[7] = (key >>  8) & 0xFF;
   for(var i = 0; i < length; i++){
      data[offset + i] ^= sign[i % 8];
   }
}
MO.RByte = new MO.RByte();
MO.Lang.Byte = MO.RByte;
MO.RChar = function RChar(){
   return this;
}
MO.RChar.prototype.parse = function RChar_parse(n){
   return String.fromCharCode(n);
}
MO.RChar.prototype.toString = function RChar_toString(value){
   return value;
}
MO.RChar = new MO.RChar();
MO.Lang.Char = MO.RChar;
MO.RConsole = function RConsole(){
   var o = this;
   o.ConsolePreFix = 'console:';
   o._registers     = new MO.TObjects();
   o._consoles      = new MO.TDictionary();
   o._localConsoles = new MO.TDictionary();
   return o;
}
MO.RConsole.prototype.initialize = function RConsole_initialize(){
   var o = this;
   var registers = o._registers;
   var count = registers.count();
   for(var n = 0; n < count; n++){
      var register = registers.get(n);
      if(register.force){
         o.find(register.clazz);
      }
   }
}
MO.RConsole.prototype.register = function RConsole_register(p){
   this._registers.push(p);
}
MO.RConsole.prototype.create = function RConsole_create(n){
   var r = null;
   if(n){
      r = MO.Class.create(n);
      var o = this;
      for(var rn in r){
         if(MO.Lang.String.startsWith(rn, 'lnk')){
            var v = r[rn];
            if('string' == typeof(v) && MO.Lang.String.startsWith(v, '&')){
               var c = o.find(v.substr(1));
               if(!c){
                  return MO.RMessage.fatal(o, null, "Can't link console. (name={0}, property={1}:{2})", n, rn, v);
               }
               r[rn] = c;
            }
         }
      }
   }
   return r;
}
MO.RConsole.prototype.createByName = function RConsole_createByName(n){
   var r = null;
   if(n){
      r = MO.Class.createByName(n);
      var o = this;
      for(var rn in r){
         if(MO.Lang.String.startsWith(rn, 'lnk')){
            var v = r[rn];
            if('string' == typeof(v) && MO.Lang.String.startsWith(v, '&')){
               var c = o.find(v.substr(1));
               if(!c){
                  return MO.Message.fatal(o, null, "Can't link console. (name={0}, property={1}:{2})", n, rn, v);
               }
               r[rn] = c;
            }
         }
      }
   }
   return r;
}
MO.RConsole.prototype.get = function RConsole_get(v){
   var o = this;
   var n = MO.Class.name(v);
   var r = o._consoles.get(n);
   return r;
}
MO.RConsole.prototype.find = function RConsole_find(value){
   var o = this;
   MO.Assert.debugNotNull(value);
   var name = null;
   if(value.constructor == String){
      name = value;
   }else if(value.constructor == Function){
      name = MO.Class.name(value);
   }else{
      return MO.Logger.fatal(o, null, 'Parameter type is invalid. (console={1})', value);
   }
   var console = MO.Global.get(o.ConsolePreFix + name);
   if(console){
      return console;
   }
   console = o._consoles.get(name);
   if(console){
      return console;
   }
   var template = MO.Class.forName(name);
   var scopeCd = template.instance.scopeCd();
   switch(scopeCd){
      case MO.EScope.Global:
         console = top.MO.Console.createByName(name);
         MO.Global.set(o.ConsolePreFix + name, console);
         o._consoles.set(name, console);
         break;
      case MO.EScope.Local:
         console = o.createByName(name);
         o._localConsoles.set(name, console);
         o._consoles.set(name, console);
         break;
      default:
         return MO.Logger.fatal(o, 'Unknown scope code. (name={1})', name);
   }
   MO.Logger.debug(o, 'Create console. (name={1}, scope={2})', name, MO.EScope.toDisplay(scopeCd));
   return console;
}
MO.RConsole.prototype.release = function RConsole_release(){
   var o = this;
   if(o._registers){
      o._registers.dispose();
      o._registers = null;
   }
   var cs = o._localConsoles;
   if(cs){
      var c = cs.count();
      for(var n = 0; n < c; n++){
         cs.value(n).dispose();
      }
      cs.dispose();
   }
   o._localConsoles = null;
   if(o._consoles){
      o._consoles.dispose();
   }
   o._consoles = null;
}
MO.RConsole = new MO.RConsole();
MO.Console = MO.RConsole;
MO.RConst = function RConst(){
   var o = this;
   o.PI_2         = Math.PI / 2;
   o.PI           = Math.PI;
   o.PI2          = Math.PI * 2;
   o.RADIAN_RATE  = 180 / Math.PI;
   o.DEGREE_RATE  = Math.PI / 180;
   o.PERCENT_10   = 1 / 10;
   o.PERCENT_100  = 1 / 100;
   o.PERCENT_1000 = 1 / 1000;
   o.identity3x3  = [1, 0, 0, 0, 1, 0, 0, 0, 1];
   o.identity4x4  = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
   return o;
}
MO.RConst = new MO.RConst();
MO.Const = MO.RConst;
MO.Lang.Const = MO.RConst;
MO.REnum = function REnum(){
   return this;
}
MO.REnum.prototype.contains = function REnum_contains(){
}
MO.REnum.prototype.tryEncode = function REnum_tryEncode(instance, value, defaultValue){
   if(instance){
      for(var name in instance){
         if(name.toLowerCase() == value.toLowerCase()){
            return instance[name];
         }
      }
   }
   return defaultValue;
}
MO.REnum.prototype.encode = function REnum_encode(instance, value){
   var o = this;
   var result = o.tryEncode(instance, value);
   if(result == null){
      throw new MO.TError(o, 'Invalid value (enum={1}, value={2})', RClass.dump(instance), value);
   }
   return result;
}
MO.REnum.prototype.tryDecode = function REnum_tryDecode(instance, value, defaultValue){
   if(instance){
      for(var name in instance){
         if(instance[name] == value){
            return name;
         }
      }
   }
   return defaultValue;
}
MO.REnum.prototype.decode = function REnum_decode(instance, value){
   var o = this;
   var result = o.tryDecode(instance, value);
   if(result == null){
      throw new MO.TError(o, 'Invalid value (enum={1}, value={2})', MO.Class.dump(instance), value);
   }
   return result;
}
MO.REnum.prototype.parse = MO.REnum.prototype.encode;
MO.REnum = new MO.REnum();
MO.Lang.Enum = MO.REnum;
MO.RFile = function RFile(){
   var o = this;
   o.pictures = ['jpg', 'png', 'gif', 'bmp'];
   o.knowns   = ['jpg', 'png', 'gif', 'bmp', 'doc', 'docx', 'vsd', 'xls', 'xlsx'];
   return o;
}
MO.RFile.prototype.inPicture = function RFile_inPicture(v){
   var o = this;
   if(v){
      v = v.toLowerCase();
      for(var n in o.pictures){
         if(o.pictures[n] == v){
            return true;
         }
      }
   }
}
MO.RFile.prototype.isPicture = function RFile_isPicture(v){
   return this.inPicture(this.extension(v));
}
MO.RFile.prototype.isKnown = function RFile_isKnown(v){
   var o = this;
   v = o.extension(v).toLowerCase();
   for(var n in o.knowns){
      if(o.knowns[n] == v){
         return true;
      }
   }
   return false;
}
MO.RFile.prototype.name = function RFile_name(value){
   if(value){
      value = value.replace(/\\/g, '/');
      var p1 = value.lastIndexOf('/');
      if(p1 != -1){
         value = value.substring(p1 + 1);
      }
      var p2 = value.lastIndexOf('.');
      if(p2 != -1){
         return value.substring(0, p2);
      }
      return value;
   }
   return '';
}
MO.RFile.prototype.extension = function RFile_extension(v){
   if(v){
      v = v.replace(/\\/g, '/');
      var p1 = v.lastIndexOf('/');
      if(-1 != p1){
         v = v.substring(p1 + 1);
      }
      var p2 = v.lastIndexOf('.');
      if(-1 != p2){
         return v.substring(p2 + 1);
      }
      return v;
   }
   return '';
}
MO.RFile = new MO.RFile();
MO.Stream.File = MO.File;
MO.RFloat = function RFloat(){
   var o = this;
   o.Chars    = '0123456789-.%';
   o.NUMBER   = '0123456789-.%';
   o.PAD_CHAR = '0';
   return o;
}
MO.RFloat.prototype.isFloat = function RFloat_isFloat(p){
   return MO.Lang.String.isPattern(p, 'n');
}
MO.RFloat.prototype.parse = function RFloat_parse(source){
   if(source == null){
      return 0;
   }
   if(source == ''){
      return 0;
   }
   var value = MO.Lang.String.trim(source.toString());
   if(value == null){
      return 0;
   }
   while(true){
      if(value.charAt(0) != "0"){
         break;
      }
      value = value.substr(1);
   }
   var result = (value.length > 0) ? parseFloat(value) : 0;
   if(MO.Lang.String.findChars(result, '%') != -1){
      result = result / 100;
   }
   return isNaN(result) ? 0 : result;
}
MO.RFloat.prototype.format = function RFloat_format(value, leftLength, leftPad, rightLength, rightPad){
   var o = this;
   if(value == null){
      return '';
   }
   if(leftLength == null){
      leftLength = 0;
   }
   if(leftPad == null){
      leftPad = o.PAD_CHAR;
   }
   if(rightLength == null){
      rightLength = 6;
   }
   if(rightPad == null){
      rightPad = o.PAD_CHAR;
   }
   var leftSource = null;
   var rightSource = null;
   var text = value.toString();
   var index = text.indexOf('.');
   if(index == -1){
      leftSource = text;
      rightSource = '';
   }else{
      leftSource = text.substring(0, index);
      rightSource = text.substring(index + 1, index + rightLength + 1);
   }
   var left = MO.Lang.String.lpad(leftSource, leftLength, leftPad);
   var right = MO.Lang.String.rpad(rightSource, rightLength, rightPad);
   return left + '.' + right;
}
MO.RFloat.prototype.formatParttern = function RFloat_formatParttern(value, parttern){
   var floatVal = parseFloat(value);
   if (!isNaN(floatVal) && isFinite(value)) {
      var partternStr = parttern.toString();
      var partternLe = partternStr.length;
      var indexOf = partternStr.indexOf(".");
      var after = partternLe - indexOf - 1;
      var str = '';
      var string = null;
      var round = Math.round(floatVal * Math.pow(10, after)) / Math.pow(10, after);
      var roundStr = round.toString();
      var roundLe = roundStr.length;
      var roundIndex = roundStr.indexOf(".");
      var roundAfter = roundLe - roundIndex - 1;
      var poor = after - roundAfter;
      if(indexOf != -1){
         if(roundIndex == -1){
            for(var i = 0; i < after; i++){
               str += '0';
            }
            string = round + '.' + str;
         }else{
            if(after == roundAfter){
               string = round;
            }else{
               for(var i = 0; i < poor; i++){
                  str += '0';
               }
               string = round + str;
            }
         }
      }else{
         string = Math.round(round);
      }
      return string;
   }
}
MO.RFloat.prototype.unitFormat = function RFloat_unitFormat(v, l, lp, r, rp, divide, unit) {
   var o = this;
   if (l == null) {
      l = 0;
   }
   if (lp == null) {
      lp = o.PAD_CHAR;
   }
   if (r == null) {
      r = 6;
   }
   if (rp == null) {
      rp = o.PAD_CHAR;
   }
   if (divide == null || unit == null) {
      divide = 1;
      unit = '';
   }
   v /= divide;
   var s = v.toString();
   var f = s.indexOf('.');
   if (f == -1) {
      var sl = s;
      var sr = '';
   } else {
      var sl = s.substring(0, f);
      var sr = s.substring(f + 1, f + r + 1);
   }
   var fl = MO.Lang.String.lpad(sl, l, lp);
   var flc = new MO.TString();
   for (var i = 1; i - 1 < fl.length; i++) {
      flc.append(fl.substring(i - 1, i));
      if (fl.length - i > 0 && (fl.length - i) % 3 == 0) {
         flc.append(',');
      }
   }
   var fr = MO.Lang.String.rpad(sr, r, rp);
   return flc + '.' + fr + unit;
}
MO.RFloat.prototype.nvl = function RFloat_nvl(v, d){
   return v ? v : (d ? d : 0);
}
MO.RFloat.prototype.toRange = function RFloat_toRange(v, i, a){
   if(v == null){
      v = 0;
   }
   return Math.min(Math.max(v, i), a);
}
MO.RFloat.prototype.sum = function RFloat_sum(){
   var a = arguments;
   var r = 0;
   for(var i = a.length -1 ; i >= 0; i--){
      var v = a[n];
      if(v != null){
         r += parseFloat(v);
      }
   }
   return r;
}
MO.RFloat.prototype.calculate = function RFloat_calculate(f,a,b){
  var a = RFloat.nvl(a);
  var b = RFloat.nvl(b);
  a = parseFloat(a);
  b = parseFloat(b);
  if(f){
     return (a + b).toString();
  }else{
     return (a - b).toString();
  }
}
MO.RFloat.prototype.attach = function RFloat_attach(t, s, c){
   var r = false;
   for(var i = 0; i < c; i++){
      if(t[i] != s[i]){
         t[i] = s[i];
         r = true;
      }
   }
   return r;
}
MO.RFloat.prototype.fill = function RFloat_fill(d, i, c, v){
   for(var n = 0; n < c; n++){
      d[i++] = v;
   }
}
MO.RFloat.prototype.copy = function RFloat_copy(po, poi, pi, pii, pc){
   for(var i = 0; i < pc; i++){
      po[poi++] = pi[pii++];
   }
}
MO.RFloat = new MO.RFloat();
MO.Lang.Float = MO.RFloat;
MO.RHex = function RHex(){
   var o = this;
   o.NUMBER = '0x123456789ABCDEF';
   o.PAD    = '0';
   return o;
}
MO.RHex.prototype.isValid = function RHex_isValid(value){
   return MO.String.isPattern(value, this.NUMBER);
}
MO.RHex.prototype.parse = function RHex_parse(value){
   return value ? parseInt('0x' + value) : 0;
}
MO.RHex.prototype.format = function RHex_format(value, length){
   var result = null;
   if(value){
      result = value.toString(16);
   }else{
      result = '0';
   }
   return length ? MO.String.lpad(result, length, this.PAD) : result;
}
MO.RHex = new MO.RHex();
MO.Lang.Hex = MO.RHex;
MO.RInstance = function RInstance(){
   var o = this;
   o._pools = new MO.TDictionary();
   return o;
}
MO.RInstance.prototype.pool = function RInstance_pool(p){
   var o = this;
   var n = MO.Class.name(p);
   var v = o._pools.get(n);
   if(v == null){
      v = new MO.TInstancePool();
      o._pools.set(n, v);
   }
   return v;
}
MO.RInstance.prototype.get = function RInstance_get(p){
   return this.pool(p).instance(p);
}
MO.RInstance.prototype.alloc = function RInstance_alloc(n){
   return this.pool(p).alloc(p);
}
MO.RInstance.prototype.free = function RInstance_free(n){
   this.pool(p).free(p);
}
MO.RInstance = new MO.RInstance();
MO.Instance = MO.RInstance;
MO.RJson = function RJson(){
   return this;
}
MO.RJson.prototype.parse = function RJson_parse(value, clazz){
   var result = null;
   try{
      result = JSON.parse(value)
   }catch(e){
      if(clazz){
         result = new clazz();
      }
   }
   return result;
}
MO.RJson.prototype.toString = function RJson_toString(value){
   return JSON.stringify(value);
}
MO.Json = new MO.RJson();
MO.RRect = function RRect(){
   return this;
}
MO.RRect.prototype.nvl = function RRect_nvl(rect){
   return rect ? rect : new TRect();
}
MO.RRect.prototype.pack = function RRect_pack(rect){
   var pack = null;
   if(rect){
      pack = rect.left + ',' + rect.top + ',' + rect.right + ',' + rect.bottom;
   }
   return pack;
}
MO.RRect.prototype.unpack = function RRect_unpack(pack, rect){
   rect = this.nvl(rect);
   if(pack){
      var items = pack.split(',');
      if(items.length == 4){
         rect.left = RInt.parse(items[0]);
         rect.top = RInt.parse(items[1]);
         rect.right = RInt.parse(items[2])
         rect.bottom = RInt.parse(items[3]);
      }
   }
   return rect;
}
MO.RRect = new MO.RRect();
MO.RRegExp = function RRegExp(){
   return this;
}
MO.RRegExp.prototype.test = function RRegExp_test(r,s){
   if(r && s != null){
      return r.test(s);
   }
   return false;
}
MO.RRegExp.prototype.testRgexp = function RRegExp_testRgexp(eps,s){
   if(eps && s){
      var r = new R
      return eps.test(s);
   }
   return false;
}
MO.RRegExp = new MO.RRegExp();
MO.RSet = function RSet(){
   return this;
}
MO.RSet.prototype.contains = function RSet_contains(v, d){
   return (v & d) == d;
}
MO.RSet.prototype.containsString = function RSet_containsString(v, d){
   if((v != null) && (s != null)){
      return v.indexOf(s) != -1;
   }
   return false;
}
MO.RSet = new MO.RSet();
MO.Lang.Set = MO.RSet;
MO.RTimer = function RTimer(){
   var o = this;
   o._startTime = 0;
   o._lastTime  = 0;
   o._count     = 0;
   return o;
}
MO.RTimer.prototype.setup = function RTimer_setup(){
   var o = this;
   var tick = new Date().getTime();
   o._startTime = tick;
   o._lastTime = tick;
}
MO.RTimer.prototype.now = function RTimer_now(){
   return new Date().getTime();
}
MO.RTimer.prototype.current = function RTimer_current(){
   return this._lastTime;
}
MO.RTimer.prototype.rate = function RTimer_rate(){
   var o = this;
   if(o._count == 0){
      return 0;
   }
   var t = o._lastTime - o._startTime;
   var c = o._count * 1000 / t;
   return parseInt(c);
}
MO.RTimer.prototype.update = function RTimer_update(){
   var o = this;
   o._count++;
   o._lastTime = new Date().getTime();
}
MO.RTimer = new MO.RTimer();
MO.Timer = MO.RTimer;
