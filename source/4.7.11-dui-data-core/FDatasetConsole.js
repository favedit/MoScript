with(MO){
   //==========================================================
   // <T>用来存储页面数据内容的线程类。</T>
   //
   // @console
   // @author MAOCY
   // @version 1.0.1
   //==========================================================
   MO.FDatasetConsole = function FDatasetConsole(o){
      o = MO.Class.inherits(this, o, FConsole);
      //..........................................................
      // @attribute EScope 对象范围
      o._scopeCd = EScope.Local;
      o._service = 'cloud.data.frame';
      o._datasets        = null;
      //..........................................................
      // @event
      o.onFetch  = FDatasetConsole_onFetch;
      //..........................................................
      // @method
      o.construct        = FDatasetConsole_construct;
      // @method
      o.loadDataset      = FDatasetConsole_loadDataset;
      o.loadDatasets     = FDatasetConsole_loadDatasets;
      // @method
      o.fetch    = FDatasetConsole_fetch;








      // @listener
      //o.lsnsLoaded       = null;
      //o.lsnsUpdateBegin  = null;
      //o.lsnsUpdateEnd    = null;
      //----------------------------------------------------------
      // @event
      //o.onFetchLoaded    = FDatasetConsole_onFetchLoaded;
      //o.onScalarLoaded   = FDatasetConsole_onScalarLoaded;
      //o.onCompleteLoaded = FDatasetConsole_onCompleteLoaded;
      //o.onLovLoaded      = FDatasetConsole_onLovLoadeded;
      //o.onPrepareLoaded  = FDatasetConsole_onPrepareLoaded;
      //o.onUpdateLoaded   = FDatasetConsole_onUpdateLoaded;
      //o.onTreeLoaded     = FDatasetConsole_onTreeLoaded;
      //o.onLoaded         = FDatasetConsole_onLoaded;
      //----------------------------------------------------------
      // @method
      //o.get              = FDatasetConsole_get;
      //o.getById          = FDatasetConsole_getById;
      //o.getByPath        = FDatasetConsole_getByPath;
      //o.scalar           = FDatasetConsole_scalar;
      //o.complete         = FDatasetConsole_complete;
      //o.lov              = FDatasetConsole_lov;
      //o.prepare          = FDatasetConsole_prepare;
      //o.update           = FDatasetConsole_update;
      //o.onColumnFetch    = FDatasetConsole_onColumnFetch;
      //o.columnNodeFetch  = FDatasetConsole_columnNodeFetch;
      //o.treeUpdate       = FDatasetConsole_treeUpdate;
      return o;
   }

   //==========================================================
   // <T>获取数据加载完成处理。</T>
   //
   // @method
   // @param p:event:SXmlEvent 配置事件
   //==========================================================
   MO.FDatasetConsole_onFetch = function FDatasetConsole_onFetch(p){
      var o = this;
      var g = p.parameter;
      var x = p.outputNode;
      if(x.hasNode()){
         // 加载数据集合
         o.loadDatasets(x);
         // 关联数据节点
         var dss = g.datasets;
         var xns = x.nodes();
         var xnc = xns.count();
         // 遍历所有的表单节点
         for(var i = 0; i < xnc; i++){
            var xn = xns.get(i);
            var n = xn.get('name');
            var d = o._datasets.get(n);
            dss.set(n, d);
         }
      }
      // 设置默认名称
      //if(!rds.isEmpty()){
      //   var c = rds.count;
      //   for(var n=0; n<c; n++){
      //      var rd = rds.value(n);
      //      if('/' == rd.name){
      //         g.resultDataset = rd;
      //         g.resultRow = rd.row(0);
      //         break;
      //      }
      //   }
      //}
      // 回调参数
      g.process();
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDatasetConsole_construct = function FDatasetConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      // 创建属性
      o._datasets = new TDictionary();
      //o.lsnsLoaded      = new TListeners();
      //o.lsnsUpdateBegin = new TListeners();
      //o.lsnsUpdateEnd   = new TListeners();
   }

   //==========================================================
   // <T>加载一个数据集合。</T>
   //
   // @method
   // @param p:config:TXmlNode 配置节点
   //==========================================================
   MO.FDatasetConsole_loadDataset = function FDatasetConsole_loadDataset(x){
      var o = this;
      // 获得数据集名称
      var n = x.get('name');
      if(RString.isEmpty(n)){
         throw new TError('Unknown dataset name.');
      }
      // 获得数据集合
      var d = o._datasets.get(n);
      if(!d){
         d = new TDataset();
         d.name = n;
         o._datasets.set(n, d);
      }
      // 加载数据
      d.clear();
      d.loadConfig(x);
      return d;
   }

   //==========================================================
   // <T>加载多个数据集合。</T>
   //
   // @method
   // @param p:config:TXmlNode 配置节点
   //==========================================================
   MO.FDatasetConsole_loadDatasets = function FDatasetConsole_loadDatasets(p){
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

   //==========================================================
   // <T>根据xml节点向服务器发送数据请求。</T>
   //
   // @method
   // @param dsArg:dsArg:TDatasetFetchArg 取数据时的参数类
   // @return TMap 数据集集合对象
   //==========================================================
   MO.FDatasetConsole_fetch = function FDatasetConsole_fetch(p){
      var o = this;
      // 获取数据
      var xd = new TXmlDocument();
      var xr = xd.root();
      xr.set('action', 'fetch');
      p.saveConfig(xr.create('Frame'));
      // 创建事件
      var e = new SXmlEvent();
      e.owner = o;
      e.url = RService.url(o._service);
      e.action = EDataAction.Fetch;
      e.parameter = p;
      e.inputDocument = xd;
      e.callback = o.onFetch;
      // 处理事件
      RConsole.find(FXmlConsole).process(e);
   }













   //==========================================================
   // <T>响应加载标量信息。</T>
   //
   // @method
   // @param g:arguments:TDatasetScalarArg 更新参数类
   //==========================================================
   MO.FDatasetConsole_onScalarLoaded = function FDatasetConsole_onScalarLoaded(g, r){
      var o = this;
      if(r.hasNode()){
         var rc = g.resultConfig = r.find('Control');
         if(rc){
            g.result = rc.get('result');
         }
      }
      g.invoke();
   }

   //==========================================================
   // <T>获取标量信息。</T>
   //
   // @method
   // @param g:arguments:TDatasetScalarArg 更新参数类
   //==========================================================
   MO.FDatasetConsole_scalar = function FDatasetConsole_scalar(g){
      var o = this;
      // 构建XML结构对象
      var doc = new TXmlDocument();
      var r = doc.root();
      r.set('action', EDataAction.Scalar);
      r.push(g.toNode());
      // 获取返回节点
      var e = new TEvent(o, EXmlEvent.Send, o.onLoaded);
      e.url = RService.url('logic.webform.dataset');
      e.action = EDataAction.Scalar;
      e.argument = g;
      e.document = doc;
      RConsole.find(FXmlConsole).process(e);
   }








   //==========================================================
   // <T>选取数据后加载XML。</T>
   //
   // @method
   // @param root:root:TNode 返回数据的根节点
   //==========================================================
   MO.FDatasetConsole_onCompleteLoaded = function FDatasetConsole_onCompleteLoaded(g, root){
      var o = this;
      if(root.hasNode()){
         var nc = root.find('Control');
         if(nc){
            g.resultConfig = nc;
         }
      }
   //      if(nc && nc.hasNode()){
   //         var its = nc.nodes;
   //         var len = its.count;
   //         for(var n = 0; n < len; n++){
   //            it = its.get(n);
   //            g.items.push(it);
   //         }
   //      }
   //   }
      g.invoke();
   }

   //==========================================================
   // <T>选取数据后加载XML。</T>
   //
   // @method
   // @param root:root:TNode 返回数据的根节点
   //==========================================================
   MO.FDatasetConsole_onLovLoadeded = function FDatasetConsole_onLovLoadeded(arg, root){
      var o = this;
      arg.lovNode = root;
      arg.invoke();
   }

   //==========================================================
   // <T>选取数据后加载XML。</T>
   //
   // @method
   // @param root:root:TNode 返回数据的根节点
   //==========================================================
   MO.FDatasetConsole_onPrepareLoaded = function FDatasetConsole_onPrepareLoaded(g, x){
      var o = this;
      var rds = g.resultDatasets;
      if(x.hasNode()){
         var xfs = x.nodes;
         var xfc = xfs.count;
         // 遍历所有的表单节点
         for(var n = 0; n < xfc; n ++){
            var xf = xfs.get(n);
            var fd = xf.get('id');
            if(!RString.isEmpty(fd)){
               o.loadDatasets(rds, fd, xf);
            }
         }
      }
      // 设置默认名称
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
      // 回调参数
      g.invoke();
   }
   ////********************************************************
   // <T>更新数据后加载XML。</T>
   //
   // @method
   // @param g:argument:TNode 返回数据的根节点
   // @param x:root:TNode 返回数据的根节点
   ////********************************************************
   MO.FDatasetConsole_onUpdateLoaded = function FDatasetConsole_onUpdateLoaded(g, x){
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

   ////********************************************************
   // <T>服务器服务异步执行的回调函数。</T>
   //
   // @method
   // @param e:event:TEvent 事件对象
   ////********************************************************
   MO.FDatasetConsole_onLoaded = function FDatasetConsole_onLoaded(e){
      var o = this;
      var r = e.document.root();
      var g = e.argument;
      // 只有在未检查过消息时才调用检查消息
      if(!e.messageChecked){
         // 检查数据结果
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
      // 相应后续代码操作
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
      // 发布数据响应后操做
      RConsole.find(FListenerConsole).process(MDataset, EAction.Changed, e, e)
   }





   //==========================================================
   // <T>数据选取函数。</T>
   //
   // @method
   // @param arg:dsUpdateArg:TDatasetUpdateArg 更新参数类
   //==========================================================
   MO.FDatasetConsole_complete = function FDatasetConsole_complete(g){
      var o = this;
      // 构建XML结构对象
      var doc = new TXmlDocument();
      var root = doc.root();
      root.set('action', 'complete');
      root.push(g.toNode());
      // 获取返回节点
      var e = new TEvent(o, EXmlEvent.Send, o.onLoaded);
      e.url = RService.url('logic.webform.dataset');
      e.action = EDataAction.Complete;
      e.argument = g;
      e.document = doc;
      RConsole.find(FXmlConsole).process(e);
   }

   //==========================================================
   // <T>数据选取函数。</T>
   //
   // @method
   // @param arg:dsUpdateArg:TDatasetUpdateArg 更新参数类
   //==========================================================
   MO.FDatasetConsole_lov = function FDatasetConsole_lov(g){
      var o = this;
      // 构建XML结构对象
      var doc = new TXmlDocument();
      var root = doc.root();
      root.set('action', 'lov');
      root.push(g.toNode());
      // 获取返回节点
      var e = new TEvent(o, EXmlEvent.Send, o.onLoaded);
      e.url = RService.url('logic.webform.dataset');
      e.action = EDataAction.Lov;
      e.argument = g;
      e.document = doc;
      RConsole.find(FXmlConsole).process(e);
   }

   //==========================================================
   // <T> 新建一条数据记录时，获取必填默认数据。</T>
   //
   // @method
   // @param root:root:TNode 返回数据的根节点
   //==========================================================
   MO.FDatasetConsole_prepare = function FDatasetConsole_prepare(g){
      var o = this;
      // 构建XML结构对象
      var doc = new TXmlDocument();
      var root = doc.root();
      root.set('action', 'prepare');
      root.push(g.toNode());
      // 获取返回节点
      var e = new TEvent(o, EXmlEvent.Send, o.onLoaded);
      e.url = RService.url('logic.webform.dataset');
      e.action = EDataAction.Prepare;
      e.argument = g;
      e.document = doc;
      RConsole.find(FXmlConsole).process(e);
   }

   //==========================================================
   // <T>更新指定的数据集合。</T>
   //
   // @method
   // @param g:argument:TDatasetUpdateArg 更新参数类
   //==========================================================
   MO.FDatasetConsole_update = function FDatasetConsole_update(g){
      var o = this;
      // 构建XML结构对象
      var doc = new TXmlDocument();
      var root = doc.root();
      root.set('action', 'update');
      if(g.checked){
         root.set('checked', g.checked);
      }
      root.push(g.toNode());
      // 获取返回节点
      var e = new TEvent(o, EXmlEvent.Send, o.onLoaded);
      e.url = RService.url('logic.webform.dataset');
      e.action = EDataAction.Update;
      e.argument = g;
      e.document = doc;
      RConsole.find(FXmlConsole).process(e);
   }

   //==========================================================
   // <T>向服务器发送数据请求，获得数据后保存数据内容。</T>
   //
   // @method
   // @param id:id:String 表单唯一标志
   // @return TMap TDatasets获取的数据集Map对象
   //==========================================================
   MO.FDatasetConsole_get = function FDatasetConsole_get(id){
      var o = this;
      var ds = o.forms.get(id);
      return ds;
   }

   //==========================================================
   // <T>获取指定数据id名称的数据集。</T>
   //
   // @method
   // @param id:Id:String 数据集唯一标志
   // @return TDataset 数据集
   //==========================================================
   MO.FDatasetConsole_getById = function FDatasetConsole_getById(id){
      var o = this;
      var d = o._datasets.get(id);
      return d;
   }

   //==========================================================
   // <T>获取指定表单id和数据集路径名称的数据集对象。</T>
   //
   // @method
   // @param formid:FormId:String 表单唯一标志
   // @param path:path:String 数据集在表单内的路径名称
   // @return TDataset 数据集
   //==========================================================
   MO.FDatasetConsole_getByPath = function FDatasetConsole_getByPath(formId, path){
      var o = this;
      var ds = o.get(formId);
      return ds ? ds.get(path) : null;
   }

   //==========================================================
   // <T>向表格数据树获取内容。</T>
   //
   // @method
   //==========================================================
   MO.FDatasetConsole_onTreeLoaded = function FDatasetConsole_onTreeLoaded(g){
      var o = this;
      alert(1);
   }

   //==========================================================
   // <T>向表格数据树获取内容。</T>
   //
   // @method
   //==========================================================
   MO.FDatasetConsole_onColumnFetch = function FDatasetConsole_onColumnFetch(e){
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

   //==========================================================
   // <T>向表格数据树获取内容。</T>
   //
   // @method
   //==========================================================
   MO.FDatasetConsole_columnNodeFetch = function FDatasetConsole_columnNodeFetch(g){
      var o = this;
      var doc = new TXmlDocument();
      var root = doc.root();
      root.set('action', g.action);
      var nd = g.toNode();
      root.push(nd);
      // 获取返回节点
      var url = RService.url(g.service);
      var e = new TEvent(o, EXmlEvent.Send, o.onColumnFetch);
      e.url = url;
      e.document = doc;
      e.arg = g;
      e.action = EDataAction.Fetch;
      RConsole.find(FXmlConsole).process(e);
   }

   //==========================================================
   // <T>向表格数据树获取内容。</T>
   //
   // @method
   //==========================================================
   MO.FDatasetConsole_treeUpdate = function FDatasetConsole_treeUpdate(g){
      var o = this;
      var doc = new TXmlDocument();
      var root = doc.root();
      root.set('action', g.action);
      var nd = g.toNode();
      root.push(nd);
      // 获取返回节点
      var url = RService.url(g.service);
      var e = new TEvent(o, EXmlEvent.Send, o.onTreeLoaded);
      e.url = url;
      e.document = doc;
      e.arg = g;
      e.action = EDataAction.TreeUpdate;
      RConsole.find(FXmlConsole).process(e);
   }
}
