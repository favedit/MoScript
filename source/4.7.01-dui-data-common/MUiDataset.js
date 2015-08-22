with(MO){
   //==========================================================
   // <T>操作数据集的管理类。</T>
   //
   // @tool
   // @param o:object:Object 拥有者对象
   // @history 091118 MAOCY 创建
   //==========================================================
   MO.MUiDataset = function MUiDataset(o){
      o = MO.Class.inherits(this, o);
      //..........................................................
      // @property String 数据集的名称
      o._dsDataset         = MO.Class.register(o, new MO.APtyString('_dsDataset', 'dataset'));
      // @property Integer 数据集的分页大小
      o._dsPageSize        = MO.Class.register(o, new MO.APtyInteger('_dsPageSize', 'page_size'), 20);
      // @attribute Integer 当前页号
      o._dsPageIndex       = 0;
      // @property String 新建命令
      o._dsInsertAction    = MO.Class.register(o, new MO.APtyString('_dsInsertAction', 'insert_action'));
      // @property String 更新命令
      o._dsUpdateAction    = MO.Class.register(o, new MO.APtyString('_dsUpdateAction', 'update_action'));
      // @property String 删除命令
      o._dsDeleteAction    = MO.Class.register(o, new MO.APtyString('_dsDeleteAction', 'delete_action'));
      // @property String 数据集的服务地址
      //o._dsService         = MO.Class.register(o, new MO.APtyString('dsService', EService.WebDataset, 'service'));
      //o._displayToolbar    = MO.Class.register(o, new MO.APtyBoolean('dispToolbar'), false);
      // @property Boolean 是否允许搜索操作
      //o._editFetch         = MO.Class.register(o, new MO.APtySet('_editFetch', 'edit_config'), EEditConfig.Fetch);
      // @property Boolean 是否允许搜索操作
      //o._editSearch        = MO.Class.register(o, new MO.APtySet('_editSearch', 'edit_config'), EEditConfig.Search);
      // @property Boolean 是否允许复制操作
      //o._editCopy          = MO.Class.register(o, new MO.APtySet('_editCopy', 'edit_config'), EEditConfig.Copy);
      //..........................................................
      // @attribute
      o._dataSource        = null;
      // @attribute TDatasetViewer 数据察看器
      o._dataViewer        = null;
      // @attribute TAttributes 固定数据内容
      o._dataValues        = null;
      // @attribute TObjects<TSearchItem> 表单搜索信息用的列表
      o._dataGlobalSearchs = null;
      o._dataSearchs       = null;
      // @attribute TObjects<TOrderItem> 表单排序信息用的列表
      o._dataGlobalOrders  = null;
      o._dataOrders        = null;
      // @attribute
      o.__progress           = false;
      //..........................................................
      // @listener
      o.lsnsUpdateBegin    = null;
      o.lsnsUpdateEnd      = null;
      //..........................................................
      // @event
      o.onDatasetLoadBegin = RMethod.empty;
      o.onDatasetLoad      = RMethod.empty;
      o.onDatasetLoadEnd   = RMethod.empty;
      // @event
      o.onStoreChanged     = RMethod.empty;
      o.onDsFetchBegin     = RMethod.empty;
      o.onDsFetchEnd       = RMethod.empty;
      o.onDsUpdateBegin    = RMethod.empty;
      o.onDsUpdateEnd      = RMethod.empty;
      // @event
      o.onDsFetch          = MUiDataset_onDsFetch;
      o.onDsPrepareCheck   = RMethod.emptyTrue;
      o.onDsCopy           = MUiDataset_onDsCopy;
      o.onDsPrepare        = MUiDataset_onDsPrepare;
      o.onDsUpdateCheck    = RMethod.emptyTrue;
      o.onDsUpdate         = MUiDataset_onDsUpdate;
      o.onDsDoUpdate       = MUiDataset_onDsDoUpdate;
      o.onDsDeleteCheck    = RMethod.emptyTrue;
      o.onDsDelete         = MUiDataset_onDsDelete;
      o.onDsProcess        = MUiDataset_onDsProcess;
      //..........................................................
      // @process
      o.oeDataLoad         = MUiDataset_oeDataLoad;
      o.oeDataSave         = MUiDataset_oeDataSave;
      o.oeDatasetLoad      = MUiDataset_oeDatasetLoad;
      //..........................................................
      // @method
      o.construct          = MUiDataset_construct;
      // @method
      o.loadDataset        = MUiDataset_loadDataset;
      o.loadDatasets       = MUiDataset_loadDatasets;
      // Attribute
      //o.dsStore             = null;
      //o.dsSearchBox         = null;
      //o.dsSearchWindow      = null;
      //..........................................................
      // @method
      //o.getDataCodes        = RMethod.virtual(o, 'getDataCodes');
      //o.getCurrentRow       = RMethod.virtual(o, 'getCurrentRow');
      //o.getSelectedRows     = RMethod.virtual(o, 'getSelectedRows');
      //o.getChangedRows      = RMethod.virtual(o, 'getChangedRows');
      //o.getRows             = RMethod.virtual(o, 'getRows');
      o.toDeepAttributes   = MUiDataset_toDeepAttributes;
      // @method
      o.dsDatasetLoad      = MUiDataset_dsDatasetLoad;
      o.dsFetch            = MUiDataset_dsFetch;
      // @method
      //o.doPrepare           = RMethod.virtual(o, 'doPrepare');
      //o.doDelete            = RMethod.virtual(o, 'doDelete');
      o.dsInitialize        = MUiDataset_dsInitialize;
      o.dsShow              = MUiDataset_dsShow;
      o.dsLoaded            = MUiDataset_dsLoaded;
      o.dsSearch            = MUiDataset_dsSearch;
      o.dsCopy              = MUiDataset_dsCopy;
      o.dsPrepare           = MUiDataset_dsPrepare;
      o.dsUpdate            = MUiDataset_dsUpdate;
      o.dsDelete            = MUiDataset_dsDelete;
      o.dsMode              = MUiDataset_dsMode;
      o.dsDoUpdate          = MUiDataset_dsDoUpdate;
      o.dsProcess           = MUiDataset_dsProcess;
      o.dsProcessCustom     = MUiDataset_dsProcessCustom;
      o.dsProcessChanged    = MUiDataset_dsProcessChanged;
      o.dsProcessSelected   = MUiDataset_dsProcessSelected;
      o.dsProcessAll        = MUiDataset_dsProcessAll;
      o.psProgress          = MUiDataset_psProgress;
      o.psValid             = MUiDataset_psValid;
      // @method
      //o.hasAction           = RMethod.virtual(o, 'hasAction');
      o.dsIsChanged         = MUiDataset_dsIsChanged;
      o.dsCount             = MUiDataset_dsCount;
      o.dsCurrent           = MUiDataset_dsCurrent;
      o.dsMove              = MUiDataset_dsMove;
      o.dsMovePage          = MUiDataset_dsMovePage;
      o.dsGet               = MUiDataset_dsGet;
      o.dsSet               = MUiDataset_dsSet;
      o.dsRefresh           = MUiDataset_dsRefresh;
      o.doSearch            = MUiDataset_doSearch;
      return o;
   }

   //==========================================================
   // <T>响应数据读取后的操作。</T>
   //
   // @event
   // @param g:arg:TDatasetFetchArg 结果参数对象
   //==========================================================
   MO.MUiDataset_onDsFetch = function MUiDataset_onDsFetch(g){
      var o = this;
      // 加载数据集
      var ds = g.datasets;
      o.dsDatasetLoad(ds);
      // 设置加载完成
      //o.onLoadDatasetEnd();
      // 设置焦点
      //o.focus();
   }

   //==========================================================
   // <T>响应更新操作中，数据读取完成后的操作。</T>
   //
   // @event
   // @param g:arg:TDatasetFetchArg 结果参数对象
   //==========================================================
   MO.MUiDataset_onDsCopy = function MUiDataset_onDsCopy(g){
      var o = this;
      o.loadDatasets(g.resultDatasets);
      // 设置加载完成
      o.onLoadDatasetEnd();
      // 设置焦点
      o.focus();
   }

   //==========================================================
   // <T>响应新建操作中，数据读取完成后的操作。</T>
   //
   // @event
   // @param g:arg:TDatasetPrepareArg 结果参数对象
   //==========================================================
   MO.MUiDataset_onDsPrepare = function MUiDataset_onDsPrepare(g){
      var o = this;
      // 加载数据集
      g.resultDatasets.set('/', null);
      o.loadDatasets(g.resultDatasets);
      // 加载主数据
      o.doPrepare(g.resultRow);
      // 设置加载完成
      if(g.invokeSuccess()){
   	   return;
      }
      o.onLoadDatasetEnd();
      // 设置焦点
      o.focus();
   }

   //==========================================================
   // <T>响应更新操作中，数据读取完成后的操作。</T>
   //
   // @event
   // @param g:arg:TDatasetFetchArg 结果参数对象
   //==========================================================
   MO.MUiDataset_onDsUpdate = function MUiDataset_onDsUpdate(g){
      var o = this;
      // 加载数据集
      o.loadDatasets(g.resultDatasets);
      // 设置加载完成
      o.onLoadDatasetEnd();
      // 设置焦点
      o.focus();
   }

   //==========================================================
   // <T>响应数据更新后的操作。</T>
   //
   // @event
   // @param g:argument:TDatasetUpdateArg 参数对象
   //==========================================================
   MO.MUiDataset_onDsDoUpdate = function MUiDataset_onDsDoUpdate(g){
      var o = this;
      if(!g.invokeSuccess()){
         o.psRefresh();
      }
      // 获得处理完成标志
      if(!g.processFinish){
         // 重获焦点
         o.focus();
         // 处理公共事件
         o.lsnsUpdateEnd.process(g);
      }
      // 设置加载完成
      o.onLoadDatasetEnd();
      //o.psProgress(false);
   }

   //==========================================================
   // <T>响应删除操作中，数据读取完成后的操作。</T>
   //
   // @event
   // @param g:arg:TDatasetFetchArg 结果参数对象
   //==========================================================
   MO.MUiDataset_onDsDelete = function MUiDataset_onDsDelete(g){
      var o = this;
      // 加载数据集
      o.loadDatasets(g.resultDatasets);
      // 删除主数据
      o.doDelete(g.resultRow);
      // 设置加载完成
      o.onLoadDatasetEnd();
      // 设置焦点
      o.focus();
   }

   //==========================================================
   // <T>响应数据更新后的操作。</T>
   //
   // @event
   // @param g:arg:TDatasetUpdateArg 结果参数对象
   //==========================================================
   MO.MUiDataset_onDsProcess = function MUiDataset_onDsProcess(g){
      var o = this;
      var cb = g.resultCallback;
      if(cb){
         cb.invoke(o, g);
      }
   }

   //==========================================================
   // <T>数据源从加载数据处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 处理事件
   //==========================================================
   MO.MUiDataset_oeDataLoad = function MUiDataset_oeDataLoad(p){
      var o = this;
      if(p.isBefore()){
         var ds = p.source;
         ds.selectDataset();
         ds.selectRow();
      }
      return EEventStatus.Contine;
   }

   //==========================================================
   // <T>存储数据到数据源处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 处理事件
   //==========================================================
   MO.MUiDataset_oeDataSave = function MUiDataset_oeDataSave(p){
      var o = this;
      if(p.isBefore()){
         var ds = p.source;
         ds.selectDataset();
         ds.selectRow();
      }
      return EEventStatus.Contine;
   }

   //==========================================================
   // <T>加载数据集合。</T>
   //
   // @method
   // @param p:event:TEventProcess 处理事件
   //==========================================================
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

   //==========================================================
   // <T>构造函数。</T>
   //
   // @method
   //==========================================================
   MO.MUiDataset_construct = function MUiDataset_construct(){
      var o = this;
      // 构造对象
      o._dataViewer = new TDatasetViewer();
      //o._dataValues = new TAttributes();
      //o._dataSearchs = new TSearchItems();
      //o._dataGlobalSearchs = new TSearchItems();
      //o._dataOrders = new TOrderItems();
      //o._dataGlobalOrders = new TOrderItems();
      // 构造事件
      //o.__initializeEvent = new TEvent();
      //o.__showEvent = new TEvent();
      //o.__loadedEvent = new TEvent();
      // 构造处理
      //o.__progressProcess = new TEventProcess(o, 'oeProgress', MProgress);
      //var vp = o.__validProcess = new TEventProcess(o, 'oeValid', MValidator);
      //vp.controls = new TList();
      // 构造监听器
      //o.lsnsUpdateBegin = new TListeners();
   //   o.lsnsUpdateEnd = new TListeners();
   }

   //==========================================================
   // <T>加载单个数据集数据。</T>
   //
   // @method
   // @param d:dataset:TDatset 数据集对象
   //==========================================================
   MO.MUiDataset_loadDataset = function MUiDataset_loadDataset(d){
      var o = this;
      o.dsStore = d;
      d.saveViewer(o._dataViewer);
      o.onLoadDataset(d);
   }

   //==========================================================
   // <T>加载多个数据集数据。</T>
   //
   // @method
   // @param p:datasets:TDictionary<TDataset> 数据集字典
   //==========================================================
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

   //==========================================================
   // <T>加载数据源。</T>
   //
   // @method
   // @param p:dataSource:FDataSource 数据源
   //==========================================================
   MO.MUiDataset_dsDatasetLoad = function MUiDataset_dsDatasetLoad(p){
      var o = this;
      var e = new TEventProcess(null, o, 'oeDatasetLoad', MUiDataset);
      e.datasets = p;
      o.process(e);
      e.dispose();
   }

   //==========================================================
   // <T>获得一个从指定位置向上所有数据集当前对象的数据内容的集合。</T>
   //
   // @method
   // @param a:attributes:TAttributes 属性集合
   // @param m:mode:EStore 存储模式
   // @see FRow.isChanged
   //==========================================================
   MO.MUiDataset_toDeepAttributes = function MUiDataset_toDeepAttributes(a, m){
      var o = this;
      if(!a){
         a = new TAttributes();
      }
      // 获得所有顶层的数据集对象
      var ts = new TList();
      var p = o;
      while(p){
         if(RClass.isClass(p, MUiDataset)){
            ts.push(p);
         }
         if(!p.parent){
            break;
         }
         p = p.topControl(MUiDataset);
      }
      // 内层的数据覆盖外层数据集的数据
      for(var n=ts.count; n>=0; n--){
         var p = ts.get(n);
         if(RClass.isClass(p, FForm)){
            p.toAttributes(a, m);
         }else if(RClass.isClass(m, FTable)){
            var r = p.getCurrentRow();
            if(r){
               r.toAttributes(a, m);
            }
         }
      }
      return a;
   }

   //==========================================================
   // <T>查询结果集。</T>
   //
   // @method
   // @param r:reset:Boolean
   //    <L value='true'>重置数据集</L>
   //    <L value='false'>不重置数据集</L>
   // @param f:force:Boolean
   //    <L value='true'>强制获取</L>
   //    <L value='false'>不强制</L>
   //==========================================================
   MO.MUiDataset_dsFetch = function MUiDataset_dsFetch(){
      var o = this;
      // 设置加载中
      //o.psProgress(true);
      // 异步获得数据
      //var tc = o.topControl();
      //var g = new TDatasetFetchArg(tc.name, tc.formId, o.dsPageSize, o._dsPageIndex);
      var g = new TDatasetFetchArg();
      g.owner = o;
      g.name = o._name;
      g.callback = o.onDsFetch;
      //g.reset = r;
      //g.force = f;
      //g.mode = o._emode;
      //g.searchs.append(o._dataGlobalSearchs);
      //g.searchs.append(o._dataSearchs);
      //g.orders.append(o._dataGlobalOrders);
      //g.orders.append(o._dataOrders);
      //o.toDeepAttributes(g.values);
      //g.values.append(o._dataValues);
      //RConsole.find(FDatasetConsole).fetch(g);
      RConsole.find(FDatasetConsole).fetch(g);
   }

   //==========================================================
   // <T>数据初始化。</T>
   //
   // @method
   //==========================================================
   MO.MUiDataset_dsInitialize = function MUiDataset_dsInitialize(){
      this.callEvent('onFormInitialize', this, this.__initializeEvent);
   }

   //==========================================================
   // <T>数据显示。</T>
   //
   // @method
   //==========================================================
   MO.MUiDataset_dsShow = function MUiDataset_dsShow(){
      this.callEvent('onFormShow', this, this.__showEvent);
   }

   //==========================================================
   // <T>数据加载完成。</T>
   //
   // @method
   //==========================================================
   MO.MUiDataset_dsLoaded = function MUiDataset_dsLoaded(){
      this.callEvent('onDatasetLoaded', this, this.__loadedEvent);
   }

   //==========================================================
   // <T>根据参数信息远程链接，查询数据内容获得结果集。</T>
   //
   // @method
   // @param r:reset:Boolean
   //    <L value='true'>重置数据集</L>
   //    <L value='false'>不重置数据集</L>
   // @param f:force:Boolean
   //    <L value='true'>强制获取</L>
   //    <L value='false'>不强制</L>
   //==========================================================
   MO.MUiDataset_dsSearch = function MUiDataset_dsSearch(s){
      var o = this;
      // 设置加载中
      o.psProgress(true);
      // 异步获得数据
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

   //==========================================================
   // <T>获得当前数据集新建一条记录的准备数据。</T>
   //
   // @method
   //==========================================================
   MO.MUiDataset_dsCopy = function MUiDataset_dsCopy(r){
      var o = this;
      // 设置加载中
      o.psProgress(true);
      // 设置工作模式为新建记录
      o.psMode(EMode.Insert);
      // 异步获得初始化数据
      var g = new TDatasetFetchArg(o.name, o.formId, o.dsPageSize, 0, true);
      g.form = o;
      g.mode = EMode.Insert;
      //g.reset = true;
      o._dataSearchs.clear();
      o._dataSearchs.push(new TSearchItem('OUID', r.get("OUID")));
      g.searchs = o._dataSearchs;
      g.callback = new TInvoke(o, o.onDsCopy);
      // 更新处理
      if(o.onDsUpdateCheck(g)){
         RConsole.find(FDatasetConsole).fetch(g);
      }
      return;
   }

   //==========================================================
   // <T>获得当前数据集新建一条记录的准备数据。</T>
   //
   // @method
   //==========================================================
   MO.MUiDataset_dsPrepare = function MUiDataset_dsPrepare(cb){
      var o = this;
      // 设置加载中
      o.psProgress(true);
      // 设置工作模式为新建记录
      o.psMode(EMode.Insert);
      // 异步获得初始化数据
      var g = new TDatasetPrepareArg(o.name, o.formId);
      g.form = o;
      g.values.append(o._dataValues);
      g.callbackSuccess = cb;
      if(o.onDsPrepareCheck(g)){
         g.callback = new TInvoke(o, o.onDsPrepare);
         RConsole.find(FDatasetConsole).prepare(g);
      }
   }

   //==========================================================
   // <T>更新一条记录。</T>
   //
   // @method
   // @param u:ouid:String 唯一标识
   // @param v:over:String 行记录的版本
   //==========================================================
   MO.MUiDataset_dsUpdate = function MUiDataset_dsUpdate(u, v){
      var o = this;
      // 设置加载中
      o.psProgress(true);
      // 设置工作模式
      o.psMode(EMode.Update);
      // 获取初始化数据
      o.dsFetch(true);
   }

   //==========================================================
   // <T>更新当前数据集内的所有变更过的数据。</T>
   //
   // @method
   // @param cb 更新成功后的回调函数
   //==========================================================
   MO.MUiDataset_dsDoUpdate = function MUiDataset_dsDoUpdate(cb, ck){
      var o = this;
      // 有效性检查
      if(!o.psValid()){
         return;
      }
      // 获得顶层控件
      var t = o.topControl();
      // 异步获得初始化数据
      var g = new TDatasetUpdateArg(t.name, o.formId, o.dsName);
      g.form = o;
      g.path = o.fullPath();
      g.mode = o._emode;
      g.codes = o.getDataCodes();
      g.callback = new TInvoke(o, o.onDsDoUpdate);
      g.callbackSuccess = cb;
      // 检查是否有提交数据
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
      // 设置加载中
      o.psProgress(true);
      // 更新数据
      RConsole.find(FDatasetConsole).update(g);
   }

   //==========================================================
   // <T>删除一条记录。</T>
   //
   // @method
   // @param u:ouid:String 记录标识
   // @param v:over:String 记录版本
   //==========================================================
   MO.MUiDataset_dsDelete = function MUiDataset_dsDelete(u, v){
      var o = this;
      // 设置加载中
      o.psProgress(true);
      // 设置工作模式为新建记录
      o.psMode(EMode.Delete);
      // 异步获得初始化数据
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

   //==========================================================
   // <T>根据模式设置操作。</T>
   //
   // @method
   // @param m:mode:EMode 模式
   //==========================================================
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

   //==========================================================
   // <T>处理当前获得焦点的记录，执行后台处理过程。</T>
   // <P>无论数据是否修改过，都进行处理。如果没有任何数据，将产生警告信息，不进行任何数据处理。</P>
   //
   // @method
   // @param da:dataAction:String 命令名称
   // @param cb:callBack:TInvoke 回调处理
   //==========================================================
   MO.MUiDataset_dsProcess = function MUiDataset_dsProcess(da, cb){
      var o = this;
      // 有效性检查
      if(!o.psValid()){
         return;
      }
      // 构建处理事件对象
      var g = new TDatasetServiceArg(o.topControl().name, da);
      g.form = o;
      g.controlName = o.name;
      o.toDeepAttributes(g.attributes);
      g.codes = o.getDataCodes();
      g.push(o.getCurrentRow());
      g.resultCallback = cb;
      // 设置加载中
      o.psProgress(true);
      // 执行处理
      g.callback = new TInvoke(o, o.onDsProcess);
      RConsole.find(FFormConsole).process(g);
   }

   //==========================================================
   //<T>处理当前获得焦点的记录，执行后台处理过程。</T>
   //<P>无论数据是否修改过，都进行处理。如果没有任何数据，将产生警告信息，不进行任何数据处理。</P>
   //
   //@method
   //@param da:dataAction:String 命令名称
   //@param cb:callBack:TInvoke 回调处理
   //==========================================================
   MO.MUiDataset_dsProcessCustom = function MUiDataset_dsProcessCustom(pm, da, cb, cc){
   	var o = this;
   	// 有效性检查
   	if(!cc){
   	if(!o.psValid()){
   	   return;
   	}
   	}
   	// 构建处理事件对象
   	var g = new TDatasetServiceArg(o.topControl().name, da);
   	g.form = o;
   	g.controlName = o.name;
   	g.attributes = pm;
   	g.codes = o.getDataCodes();
   	g.push(o.getCurrentRow());
   	g.resultCallback = cb;
   	// 检查是否有提交数据
   	if(!cc){
   	   if(!g.hasData()){
   	      return RMessage.warn(o, RContext.get('MUiDataset:nodata'));
   	   }
   	}
   	// 设置加载中
   	o.psProgress(true);
   	// 执行处理
   	g.callback = new TInvoke(o, o.onDsProcess);
   	RConsole.find(FFormConsole).process(g);
   }

   //==========================================================
   //<T>处理当前获得焦点的记录，执行后台处理过程。</T>
   //<P>无论数据是否修改过，都进行处理。如果没有任何数据，将产生警告信息，不进行任何数据处理。</P>
   //
   //@method
   //@param da:dataAction:String 命令名称
   //@param cb:callBack:TInvoke 回调处理
   //==========================================================
   MO.MUiDataset_dsProcessSelected = function MUiDataset_dsProcessSelected(da, cb){
   	var o = this;
   	// 有效性检查
   	if(!o.psValid()){
   	   return;
   	}
   	   // 构建处理事件对象
   	   var g = new TDatasetServiceArg(o.topControl().name, da);
   	   g.form = o;
   	   g.controlName = o.name;
   	   o.toDeepAttributes(g.attributes);
   	   g.codes = o.getDataCodes();
   	   g.rows = o.getSelectedRows();
   	   if(g.rows.count > 0){
   		  g.resultCallback = cb;
   		  // 检查是否有提交数据
   		  //if(!g.hasData()){
   		  //   return RMessage.warn(o, RContext.get('MUiDataset:nodata'));
   		  //}
   		  // 设置加载中
   		  o.psProgress(true);
   		  // 执行处理
   		  g.callback = new TInvoke(o, o.onDsProcess);
   		  RConsole.find(FFormConsole).process(g);
   		  o.clearSelectRows();
   	   }else{
   	      return RMessage.warn(o, RContext.get('MUiDataset:norows'));
   	   }
   }

   //==========================================================
   // <T>处理所有修改过的记录，执行后台处理过程。</T>
   // <P>只有数据修改过，才进行处理。如果没有修改过的数据，将产生警告信息，不进行任何数据处理。</P>
   //
   // @method
   // @param da:dataAction:String 命令名称
   // @param cb:callBack:TInvoke 回调处理
   //==========================================================
   MO.MUiDataset_dsProcessChanged = function MUiDataset_dsProcessChanged(da, cb){
      var o = this;
      // 有效性检查
      if(!o.psValid()){
         return;
      }
      // 构建处理事件对象
      var g = new TDatasetServiceArg(o.topControl().name, da);
      g.form = o;
      g.controlName = o.name;
      o.toDeepAttributes(g.attributes);
      g.codes = o.getDataCodes();
      g.rows = o.getChangedRows();
      g.resultCallback = cb;
      // 检查是否有提交数据
      if(!g.hasData()){
         return RMessage.warn(o, RContext.get('MUiDataset:nochange'));
      }
      // 设置加载中
      o.psProgress(true);
      // 执行处理
      g.callback = new TInvoke(o, o.onDsProcess);
      RConsole.find(FFormConsole).process(g);
   }

   //==========================================================
   // <T>处理所有记录，执行后台处理过程。</T>
   // <P>无论数据是否修改过，都进行处理。如果没有任何数据，将产生警告信息，不进行任何数据处理。</P>
   //
   // @method
   // @param da:dataAction:String 命令名称
   // @param cb:callBack:TInvoke 回调处理
   //==========================================================
   MO.MUiDataset_dsProcessAll = function MUiDataset_dsProcessAll(da, cb){
      var o = this;
      // 有效性检查
      if(!o.psValid()){
         return;
      }
      // 构建处理事件对象
      var g = new TDatasetServiceArg(o.topControl().name, da);
      g.form = o;
      g.controlName = o.name;
      o.toDeepAttributes(g.attributes);
      g.codes = o.getDataCodes();
      g.rows = o.getRows();
      g.resultCallback = cb;
      // 检查是否有提交数据
      //if(!g.hasData()){
      //   return RMessage.warn(o, RContext.get('MUiDataset:nodata'));
      //}
      // 设置加载中
      o.psProgress(true);
      // 执行处理
      g.callback = new TInvoke(o, o.onDsProcess);
      RConsole.find(FFormConsole).process(g);
   }

   //==========================================================
   // <T>显示是否正在处理进度。</T>
   //
   // @method
   // @param v:visible 可见性
   //==========================================================
   MO.MUiDataset_psProgress = function MUiDataset_psProgress(v){
      var o = this;
      // 检查状态变更
      if(o.__progress == v){
         return;
      }
      o.__progress = v;
      // 纷发事件
      var e = o.__progressProcess;
      e.enable = v;
      o.process(e);
   }

   //==========================================================
   // <T>校验所有项目数据。</T>
   //
   // @method
   //==========================================================
   MO.MUiDataset_psValid = function MUiDataset_psValid(){
      var o = this;
      // 校验数据
      var e = o.__validProcess;
      var cs = e.controls;
      cs.clear();
      o.process(e);
      // 校验结果
      if(!cs.isEmpty()){
         var cw = RConsole.find(FCheckWindowConsole).find();
         cw.set(cs);
         cw.show();
         return false;
      }
      return true;
   }

   //==========================================================
   // <T>判断数据是否被修改。</T>
   //
   // @tool
   // @param o:object:Object 拥有者对象
   // @author maocy
   // @version 1.0.1
   //==========================================================
   MO.MUiDataset_dsIsChanged = function MUiDataset_dsIsChanged(){
      var ds = this.dsStore;
      return ds ? ds.isChanged() : false;
   }

   //==========================================================
   // <T>获得数据总数。</T>
   //
   // @method
   // @return 数据总数
   //==========================================================
   MO.MUiDataset_dsCount = function MUiDataset_dsCount(){
      return this.dsStore ? this.dsStore.count : 0;
   }

   //==========================================================
   // <T>获得操作的当前记录。</T>
   //
   // @tool
   // @param o:object:Object 拥有者对象
   // @author maocy
   // @version 1.0.1
   //==========================================================
   MO.MUiDataset_dsCurrent = function MUiDataset_dsCurrent(){
      var o = this;
      var ds = o.dsStore;
   }

   //==========================================================
   // <T>移动数据位置。</T>
   //
   // @method
   // @pram p:index:Integer 数据位置
   //==========================================================
   MO.MUiDataset_dsMove = function MUiDataset_dsMove(p){
      var o = this;
      var ds = o.dsStore;
      // Check
      if(null == p && !ds){
         return;
      }
      // Calculate
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
      if(RClass.isClass(o, MValue)){
         o.loadValue(ds.current());
      }
   }
   // ------------------------------------------------------------
   // page, force
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
         // 设置加载中
         o.psProgress(true);
         // 异步获得数据
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
   // ------------------------------------------------------------
   MO.MUiDataset_dsGet = function MUiDataset_dsGet(n){
      return this.dsStore ? this.dsStore.get(n) : '';
   }
   // ------------------------------------------------------------
   MO.MUiDataset_dsSet = function MUiDataset_dsSet(n, v){
      if(this.dsStore){
         this.dsStore.set(n, v);
      }
   }

   // ------------------------------------------------------------
   MO.MUiDataset_dsRefresh = function MUiDataset_dsRefresh(){
      if(this._dsService){
         this.dsMove(this.dsPage, true);
      }
   }
   // ------------------------------------------------------------
   MO.MUiDataset_doSearch = function MUiDataset_doSearch(){
      var o = this;
      var sw = o.dsSearchWindow;
      if(!sw){
         sw = o.dsSearchWindow = top.RControl.create(top.FSearchWindow);
         sw.linkDsControl(o);
      }
      sw.show();
   }
}
