//==========================================================
// <T>操作数据集的管理类。</T>
//
// @tool
// @param o:object:Object 拥有者对象
// @history 091118 MAOCY 创建
//==========================================================
function MDataset(o){
   o = RClass.inherits(this, o, MEditable);
   //..........................................................
   // @property String 数据集的名称
   o.dsName               = RClass.register(o, new TPtyStr('dsName', null, 'dataset'));
   // @property String 数据集的服务地址
   o.dsService            = RClass.register(o, new TPtyStr('dsService', EService.WebDataset, 'service'));
   // @property Integer 数据集的分页大小
   o.dsPageSize           = RClass.register(o, new TPtyInt('dsPageSize', 20, 'page_size'));
   o.dispToolbar          = RClass.register(o, new TPtyBool('dispToolbar', false));
   // @property Boolean 是否允许搜索操作
   o.editFetch            = RClass.register(o, new TPtyBoolSet('editFetch', 'editConfig', EEditConfig.Fetch, false));
   // @property Boolean 是否允许搜索操作
   o.editSearch           = RClass.register(o, new TPtyBoolSet('editSearch', 'editConfig', EEditConfig.Search, false));
   // @property Boolean 是否允许复制操作
   o.editCopy             = RClass.register(o, new TPtyBoolSet('editCopy', 'editConfig', EEditConfig.Copy, false));
   // @property String 新建命令
   o.insertAction         = RClass.register(o, new TPtyStr('insertAction', 'insert'));
   // @property String 更新命令
   o.updateAction         = RClass.register(o, new TPtyStr('updateAction', 'update'));
   // @property String 删除命令
   o.deleteAction         = RClass.register(o, new TPtyStr('deleteAction', 'delete'));
   //..........................................................
   // @attribute Integer 当前页号
   o.dsPageIndex          = 0;
   // @attribute TDatasetViewer 数据察看器
   o.dsViewer             = null;
   // @attribute TAttributes 固定数据内容
   o.dsValues             = null;
   // @attribute TList<TSearchItem> 表单搜索信息用的列表
   o.dsGlobalSearchs      = null;
   o.dsSearchs            = null;
   // @attribute TList<TOrderItem> 表单排序信息用的列表
   o.dsGlobalOrders       = null;
   o.dsOrders             = null;
   //..........................................................
   o.__initializeEvent    = null;
   o.__showEvent          = null;
   o.__loadedEvent        = null;
   o.__progress           = false;
   o.__progressProcess    = null;
   o.__validProcess       = null;
   //..........................................................
   // @listener
   o.lsnsUpdateBegin      = null;
   o.lsnsUpdateEnd        = null;
   //..........................................................
   // @event
   o.onDsFetch           = MDataset_onDsFetch;
   o.onDsPrepareCheck    = RMethod.emptyTrue;
   o.onDsPrepare         = MDataset_onDsPrepare;
   o.onDsUpdateCheck     = RMethod.emptyTrue;
   o.onDsUpdate          = MDataset_onDsUpdate;
   o.onDsDeleteCheck     = RMethod.emptyTrue;
   o.onDsDelete          = MDataset_onDsDelete;
   o.onDsCopy            = MDataset_onDsCopy;
   o.onDsDoUpdate        = MDataset_onDsDoUpdate;
   o.onDsProcess         = MDataset_onDsProcess;
   o.onLoadDatasetBegin  = RMethod.empty;
   o.onLoadDataset       = RMethod.virtual(o, 'onLoadDataset');
   o.onLoadDatasetEnd    = RMethod.virtual(o, 'onLoadDatasetEnd');
   //..........................................................
   // @method
   o.getDataCodes        = RMethod.virtual(o, 'getDataCodes');
   o.getCurrentRow       = RMethod.virtual(o, 'getCurrentRow');
   o.getSelectedRows     = RMethod.virtual(o, 'getSelectedRows');
   o.getChangedRows      = RMethod.virtual(o, 'getChangedRows');
   o.getRows             = RMethod.virtual(o, 'getRows');
   o.toDeepAttributes    = MDataset_toDeepAttributes;
   //..........................................................
   // @method
   o.construct           = MDataset_construct;
   o.loadDataset         = MDataset_loadDataset;
   o.loadDatasets        = MDataset_loadDatasets;
   o.doPrepare           = RMethod.virtual(o, 'doPrepare');
   o.doDelete            = RMethod.virtual(o, 'doDelete');
   o.dsInitialize        = MDataset_dsInitialize;
   o.dsShow              = MDataset_dsShow;
   o.dsLoaded            = MDataset_dsLoaded;
   o.dsFetch             = MDataset_dsFetch;
   o.dsSearch            = MDataset_dsSearch;
   o.dsCopy              = MDataset_dsCopy;
   o.dsPrepare           = MDataset_dsPrepare;
   o.dsUpdate            = MDataset_dsUpdate;
   o.dsDelete            = MDataset_dsDelete;
   o.dsMode              = MDataset_dsMode;
   o.dsDoUpdate          = MDataset_dsDoUpdate;
   o.dsProcess           = MDataset_dsProcess;
   o.dsProcessCustom     = MDataset_dsProcessCustom;
   o.dsProcessChanged    = MDataset_dsProcessChanged;
   o.dsProcessSelected   = MDataset_dsProcessSelected;
   o.dsProcessAll        = MDataset_dsProcessAll;
   o.psProgress          = MDataset_psProgress;
   o.psValid             = MDataset_psValid;





   o.dsCurrent           = MDataset_dsCurrent;
   // Attribute
   o.dsStore             = null;
   o.dsSearchBox         = null;
   o.dsSearchWindow      = null;
   o.onStoreChanged      = RMethod.empty;
   o.onDsFetchBegin      = RMethod.empty;
   o.onDsFetchEnd        = RMethod.empty;
   o.onDsUpdateBegin     = RMethod.empty;
   o.onDsUpdateEnd       = RMethod.empty;
   // Method
   o.hasAction           = RMethod.virtual(o, 'hasAction');
   o.dsIsChanged         = MDataset_dsIsChanged;
   o.dsCount             = MDataset_dsCount;
   o.dsMove              = MDataset_dsMove;
   o.dsMovePage          = MDataset_dsMovePage;
   o.dsGet               = MDataset_dsGet;
   o.dsSet               = MDataset_dsSet;
   o.dsRefresh           = MDataset_dsRefresh;
   o.doSearch            = MDataset_doSearch;
   return o;
}

//==========================================================
// <T>响应数据读取后的操作。</T>
//
// @event
// @param g:arg:TDatasetFetchArg 结果参数对象
//==========================================================
function MDataset_onDsFetch(g){
   var o = this;
   // 加载数据集
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
function MDataset_onDsPrepare(g){
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
function MDataset_onDsUpdate(g){
   var o = this;
   // 加载数据集
   o.loadDatasets(g.resultDatasets);
   // 设置加载完成
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
function MDataset_onDsCopy(g){
   var o = this;
   o.loadDatasets(g.resultDatasets);
   // 设置加载完成
   o.onLoadDatasetEnd();
   // 设置焦点
   o.focus();
}

//==========================================================
// <T>响应删除操作中，数据读取完成后的操作。</T>
//
// @event
// @param g:arg:TDatasetFetchArg 结果参数对象
//==========================================================
function MDataset_onDsDelete(g){
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
function MDataset_onDsProcess(g){
   var o = this;
   var cb = g.resultCallback;
   if(cb){
      cb.invoke(o, g);
   }
}

//==========================================================
// <T>获得一个从指定位置向上所有数据集当前对象的数据内容的集合。</T>
//
// @method
// @param a:attributes:TAttributes 属性集合
// @param m:mode:EStore 存储模式
// @see FRow.isChanged
//==========================================================
function MDataset_toDeepAttributes(a, m){
   var o = this;
   if(!a){
      a = new TAttributes();
   }
   // 获得所有顶层的数据集对象
   var ts = new TList();
   var p = o;
   while(p){
      if(RClass.isClass(p, MDataset)){
         ts.push(p);
      }
      if(!p.parent){
         break;
      }
      p = p.topControl(MDataset);
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
// <T>响应数据更新后的操作。</T>
//
// @event
// @param g:argument:TDatasetUpdateArg 参数对象
//==========================================================
function MDataset_onDsDoUpdate(g){
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
// <T>构造函数。</T>
//
// @method
//==========================================================
function MDataset_construct(){
   var o = this;
   // 构造对象
   o.dsViewer = new TDatasetViewer();
   o.dsValues = new TAttributes();
   o.dsSearchs = new TSearchItems();
   o.dsGlobalSearchs = new TSearchItems();
   o.dsOrders = new TOrderItems();
   o.dsGlobalOrders = new TOrderItems();
   // 构造事件
   o.__initializeEvent = new TEvent();
   o.__showEvent = new TEvent();
   o.__loadedEvent = new TEvent();
   // 构造处理
   o.__progressProcess = new TEventProcess(o, 'oeProgress', MProgress);
   var vp = o.__validProcess = new TEventProcess(o, 'oeValid', MValidator);
   vp.controls = new TList();
   // 构造监听器
   o.lsnsUpdateBegin = new TListeners();
   o.lsnsUpdateEnd = new TListeners();
}

//==========================================================
// <T>加载单个数据集数据。</T>
//
// @method
// @param d:dataset:TDatset 数据集对象
//==========================================================
function MDataset_loadDataset(d){
   var o = this;
   o.dsStore = d;
   d.saveViewer(o.dsViewer);
   return o.onLoadDataset(d);
}

//==========================================================
// <T>加载多个数据集数据。</T>
//
// @method
// @param ds:datasets:TMap<String, TDataset> 数据集的集合
//==========================================================
function MDataset_loadDatasets(ds){
   var o = this;
   var c = ds.count;
   for(var n=0; n<c; n++){
      var d = ds.value(n);
      if(d){
         var dc = o.findByPath(d.name)
         if(!dc){
            dc = o.findByPath(d.name);
            return RMessage.fatal(o, null, 'Load dataset failed. (control={0})', d.name);
         }
         dc.loadDataset(d);
      }
   }
}

//==========================================================
function MDataset_dsInitialize(){
   this.callEvent('onFormInitialize', this, this.__initializeEvent);
}

//==========================================================
function MDataset_dsShow(){
   this.callEvent('onFormShow', this, this.__showEvent);
}

//==========================================================
function MDataset_dsLoaded(){
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
function MDataset_dsFetch(r, f){
   var o = this;
   // 设置加载中
   o.psProgress(true);
   // 异步获得数据
   var tc = o.topControl();
   var g = new TDatasetFetchArg(tc.name, tc.formId, o.dsPageSize, o.dsPageIndex);
   g.reset = r;
   g.force = f;
   g.mode = o._emode;
   g.searchs.append(o.dsGlobalSearchs);
   g.searchs.append(o.dsSearchs);
   g.orders.append(o.dsGlobalOrders);
   g.orders.append(o.dsOrders);
   o.toDeepAttributes(g.values);
   g.values.append(o.dsValues);
   g.callback = new TInvoke(o, o.onDsFetch);
   RConsole.find(FDatasetConsole).fetch(g);
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
function MDataset_dsSearch(s){
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
   g.searchs.append(o.dsGlobalSearchs);
   g.searchs.append(o.dsSearchs);
   g.orders.append(o.dsGlobalOrders);
   g.orders.append(o.dsOrders);
   o.toDeepAttributes(g.values);
   g.values.append(o.dsValues);
   g.callback = new TInvoke(o, o.onDsFetch);
   RConsole.find(FDatasetConsole).fetch(g);
}
//==========================================================
// <T>获得当前数据集新建一条记录的准备数据。</T>
//
// @method
//==========================================================
function MDataset_dsCopy(r){
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
   o.dsSearchs.clear();
   o.dsSearchs.push(new TSearchItem('OUID', r.get("OUID")));
   g.searchs = o.dsSearchs;
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
function MDataset_dsPrepare(cb){
   var o = this;
   // 设置加载中
   o.psProgress(true);
   // 设置工作模式为新建记录
   o.psMode(EMode.Insert);
   // 异步获得初始化数据
   var g = new TDatasetPrepareArg(o.name, o.formId);
   g.form = o;
   g.values.append(o.dsValues);
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
function MDataset_dsUpdate(u, v){
   var o = this;
   // 设置加载中
   o.psProgress(true);
   // 设置工作模式
   o.psMode(EMode.Update);
   // 获取初始化数据
   o.dsFetch(true);
}

//==========================================================
// <T>删除一条记录。</T>
//
// @method
// @param u:ouid:String 记录标识
// @param v:over:String 记录版本
//==========================================================
function MDataset_dsDelete(u, v){
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
   g.values = o.dsValues;
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
function MDataset_dsMode(m){
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
// <T>更新当前数据集内的所有变更过的数据。</T>
//
// @method
// @param cb 更新成功后的回调函数
//==========================================================
function MDataset_dsDoUpdate(cb, ck){
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
            return RMessage.warn(o, RContext.get('MDataset:nochange'));
         }
      }
   }
   // 设置加载中
   o.psProgress(true);
   // 更新数据
   RConsole.find(FDatasetConsole).update(g);
}

//==========================================================
// <T>处理当前获得焦点的记录，执行后台处理过程。</T>
// <P>无论数据是否修改过，都进行处理。如果没有任何数据，将产生警告信息，不进行任何数据处理。</P>
//
// @method
// @param da:dataAction:String 命令名称
// @param cb:callBack:TInvoke 回调处理
//==========================================================
function MDataset_dsProcess(da, cb){
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
function MDataset_dsProcessCustom(pm, da, cb, cc){
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
	      return RMessage.warn(o, RContext.get('MDataset:nodata'));
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
function MDataset_dsProcessSelected(da, cb){
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
		  //   return RMessage.warn(o, RContext.get('MDataset:nodata'));
		  //}
		  // 设置加载中
		  o.psProgress(true);
		  // 执行处理
		  g.callback = new TInvoke(o, o.onDsProcess);
		  RConsole.find(FFormConsole).process(g);
		  o.clearSelectRows();
	   }else{
	      return RMessage.warn(o, RContext.get('MDataset:norows'));
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
function MDataset_dsProcessChanged(da, cb){
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
      return RMessage.warn(o, RContext.get('MDataset:nochange'));
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
function MDataset_dsProcessAll(da, cb){
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
   //   return RMessage.warn(o, RContext.get('MDataset:nodata'));
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
function MDataset_psProgress(v){
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
function MDataset_psValid(){
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
// <T>获得操作的当前记录。</T>
//
// @tool
// @param o:object:Object 拥有者对象
// @author maocy
// @version 1.0.1
//==========================================================
function MDataset_dsCurrent(){
   var o = this;
   var ds = o.dsStore;
}
// ------------------------------------------------------------
function MDataset_dsIsChanged(){
   var ds = this.dsStore;
   return ds ? ds.isChanged() : false;
}

// ------------------------------------------------------------
function MDataset_dsCount(){
   return this.dsStore ? this.dsStore.count : 0;
}
// ------------------------------------------------------------
// position, force
function MDataset_dsMove(p){
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
function MDataset_dsMovePage(p){
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
      var t = o.topControl(MDataset);
      var g = new TDatasetFetchArg(t.name, t.formId, o.dsPageSize, p, true);
      g.path =  o.fullPath();
      g.mode = t._emode;
      g.searchs.append(o.dsGlobalSearchs);
      g.searchs.append(o.dsSearchs);
      g.orders.append(o.dsGlobalOrders);
      g.orders.append(o.dsOrders);
      g.values = o.toDeepAttributes();
      g.values.append(o.dsValues);
      g.callback = new TInvoke(o, o.onDsFetch);
      RConsole.find(FDatasetConsole).fetch(g);
   }
}
// ------------------------------------------------------------
function MDataset_dsGet(n){
   return this.dsStore ? this.dsStore.get(n) : '';
}
// ------------------------------------------------------------
function MDataset_dsSet(n, v){
   if(this.dsStore){
      this.dsStore.set(n, v);
   }
}

// ------------------------------------------------------------
function MDataset_dsRefresh(){
   if(this.dsService){
      this.dsMove(this.dsPage, true);
   }
}
// ------------------------------------------------------------
function MDataset_doSearch(){
   var o = this;
   var sw = o.dsSearchWindow;
   if(!sw){
      sw = o.dsSearchWindow = top.RControl.create(top.FSearchWindow);
      sw.linkDsControl(o);
   }
   sw.show();
}

