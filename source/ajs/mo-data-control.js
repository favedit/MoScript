MO.EUiDataAction = new function EUiDataAction(){
   var o = this;
   o.Fetch     = 'fetch';
   o.Search    = 'search';
   o.Lov       = 'lov';
   o.Zoom      = 'zoom';
   o.Prepare   = 'prepare';
   o.Insert    = 'insert';
   o.Update    = 'update';
   o.Delete    = 'delete';
   o.First     = 'first';
   o.Prior     = 'prior';
   o.Next      = 'next';
   o.Last      = 'last';
   o.Action    = 'action';
   o.FetchLov  = 'fetchLov';
   o.EndFetch  = 'endfetch';
   o.EndUpdate = 'endupdate';
   o.DsChanged = 'dschanged';
   o.Scalar    = 'scalar';
   o.Complete  = 'complete';
   o.Process   = 'process';
   return o;
}
MO.EUiDataMode = new function EUiDataMode(){
   var o = this;
   o.Insert = 'insert';
   o.Update = 'update';
   o.Delete = 'delete';
   return o;
}
MO.EUiDataService = new function EUiDataService(){
   var o = this;
   o.Dataset    = 'database.dataset';
   o.List       = 'design.list';
   o.WebForm    = 'design.webform';
   o.Translate  = 'design.translate';
   o.WebDataset = 'logic.dataset';
   return o;
}
MO.EUiDataStore = new function EUiDataStore(){
   var o = this;
   o.Full     = 0;
   o.Sort     = 1;
   o.Config   = 2;
   o.Value    = 3;
   o.Name     = 4;
   o.DataName = 5;
   o.DataNvl  = 6;
   o.Reset    = 7;
   o.Prepare  = 8;
   return o;
}
with(MO){
   MO.MUiDataAction = function MUiDataAction(o){
      o = RClass.inherits(this, o);
      o.doAction = MUiDataAction_doAction
      return o;
   }
   MO.MUiDataAction_doAction = function MUiDataAction_doAction(n){
      var o = this;
      var c = o.findComponent(n);
      if(RClass.isClass(c, MInvoke)){
         c.invoke(this);
      }else{
         throw new TError(o, 'Component is invalid.');
      }
   }
}
with(MO){
   MO.MUiDataContainer = function MUiDataContainer(o){
      o = RClass.inherits(this, o, MUiContainer);
      o.dsDataLoad = MUiDataContainer_dsDataLoad;
      o.dsDataSave = MUiDataContainer_dsDataSave;
      o.dsLoadValue = MUiDataContainer_dsLoadValue;
      o.dsSaveValue = MUiDataContainer_dsSaveValue;
      return o;
   }
   MO.MUiDataContainer_dsDataLoad = function MUiDataContainer_dsDataLoad(p){
      var o = this;
      var e = new TEventProcess(null, o, 'oeDataLoad', MDataValue);
      e.source = p;
      o.process(e);
      e.dispose();
   }
   MO.MUiDataContainer_dsDataSave = function MUiDataContainer_dsDataSave(p){
      var o = this;
      var e = new TEventProcess(null, o, 'oeDataSave', MDataValue);
      e.source = p;
      o.process(e);
      e.dispose();
   }
   MO.MUiDataContainer_dsLoadValue = function MUiDataContainer_dsLoadValue(r, m){
      var o = this;
      var e = new TEventProcess(o, 'oeDataLoadValue', MUiDataValue);
      e.viewer = o._dataViewer;
      e.store = m;
      e.values = r;
      o.process(e);
   }
   MO.MUiDataContainer_dsSaveValue = function MUiDataContainer_dsSaveValue(r, m){
      var o = this;
      if(!r){
         r = new TRow();
      }
      var e = new TEventProcess(o, 'oeDataSaveValue', MUiDataValue);
      e.viewer = o._dataViewer;
      e.store = m;
      e.values = r;
      o.process(e);
      r.set('_status', o._dataStatusCd);
      return r;
   }
}
with(MO){
   MO.MUiDataField = function MUiDataField(o){
      o = RClass.inherits(this, o, MUiValue, MUiDataValue);
      o._dataTypeCd     = RClass.register(o, new APtyString('_dataTypeCd'));
      o._dataRequire    = RClass.register(o, new APtyBoolean('_dataRequire'));
      o._dataName       = RClass.register(o, new APtyString('_dataName'));
      o.oeDataLoadValue = MUiDataField_oeDataLoadValue;
      o.oeDataSaveValue = MUiDataField_oeDataSaveValue;
      o.formatLoad      = MUiDataField_formatLoad;
      o.formatSave      = MUiDataField_formatSave;
      return o;
   }
   MO.MUiDataField_oeDataLoadValue = function MUiDataField_oeDataLoadValue(dataSource){
      var o = this;
      var values = dataSource.values;
      var value = values.get(o._dataName);
      o.set(o.formatLoad(value));
      return EEventStatus.Stop;
   }
   MO.MUiDataField_oeDataSaveValue = function MUiDataField_oeDataSaveValue(p){
      var o = this;
      var value = o.get();
      var values = dataSource.values;
      values.set(o._dataName, o.formatSave(value));
      return EEventStatus.Stop;
   }
   MO.MUiDataField_formatLoad = function MUiDataField_formatLoad(value){
      return value;
   }
   MO.MUiDataField_formatSave = function MUiDataField_formatSave(value){
      return value;
   }
}
with(MO){
   MO.MUiDataset = function MUiDataset(o){
      o = RClass.inherits(this, o);
      o._dsDataset         = RClass.register(o, new APtyString('_dsDataset', 'dataset'));
      o._dsPageSize        = RClass.register(o, new APtyInteger('_dsPageSize', 'page_size'), 20);
      o._dsPageIndex       = 0;
      o._dsInsertAction    = RClass.register(o, new APtyString('_dsInsertAction', 'insert_action'));
      o._dsUpdateAction    = RClass.register(o, new APtyString('_dsUpdateAction', 'update_action'));
      o._dsDeleteAction    = RClass.register(o, new APtyString('_dsDeleteAction', 'delete_action'));
      o._dataSource        = null;
      o._dataViewer        = null;
      o._dataValues        = null;
      o._dataGlobalSearchs = null;
      o._dataSearchs       = null;
      o._dataGlobalOrders  = null;
      o._dataOrders        = null;
      o.__progress           = false;
      o.lsnsUpdateBegin    = null;
      o.lsnsUpdateEnd      = null;
      o.onDatasetLoadBegin = RMethod.empty;
      o.onDatasetLoad      = RMethod.empty;
      o.onDatasetLoadEnd   = RMethod.empty;
      o.onStoreChanged     = RMethod.empty;
      o.onDsFetchBegin     = RMethod.empty;
      o.onDsFetchEnd       = RMethod.empty;
      o.onDsUpdateBegin    = RMethod.empty;
      o.onDsUpdateEnd      = RMethod.empty;
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
      o.oeDataLoad         = MUiDataset_oeDataLoad;
      o.oeDataSave         = MUiDataset_oeDataSave;
      o.oeDatasetLoad      = MUiDataset_oeDatasetLoad;
      o.construct          = MUiDataset_construct;
      o.loadDataset        = MUiDataset_loadDataset;
      o.loadDatasets       = MUiDataset_loadDatasets;
      o.toDeepAttributes   = MUiDataset_toDeepAttributes;
      o.dsDatasetLoad      = MUiDataset_dsDatasetLoad;
      o.dsFetch            = MUiDataset_dsFetch;
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
         if(RClass.isClass(p, MUiDataset)){
            ts.push(p);
         }
         if(!p.parent){
            break;
         }
         p = p.topControl(MUiDataset);
      }
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
      if(RClass.isClass(o, MValue)){
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
}
with(MO){
   MO.MUiDataValue = function MUiDataValue(o){
      o = RClass.inherits(this, o);
      o.oeDataLoadValue = RMethod.empty;
      o.oeDataSaveValue = RMethod.empty;
      return o;
   }
}
with(MO){
   MO.RUiDataEvent = function RUiDataEvent(){
      var o = this;
      o.clearEvent  = null;
      o.resetEvent  = null;
      o.loadEvent   = null;
      o.saveEvent   = null;
      o.recordEvent = null;
      o.codeEvent   = null;
      o.construct   = RUiDataEvent_construct;
      o.construct();
      return o;
   }
   MO.RUiDataEvent_construct = function RUiDataEvent_construct(p){
      var o = this;
      o.clearEvent = new TEventProcess(o, 'oeClearValue', MUiDataValue);
      o.resetEvent = new TEventProcess(o, 'oeResetValue', MUiDataValue);
      o.loadEvent = new TEventProcess(o, 'oeLoadValue', MUiDataValue);
      o.saveEvent = new TEventProcess(o, 'oeSaveValue', MUiDataValue);
      o.recordEvent = new TEventProcess(o, 'oeRecordValue', MUiDataValue);
      o.codeEvent = new TEventProcess(o, 'oeSaveCode', MUiDataValue);
   }
   MO.RUiDataEvent = new RUiDataEvent();
}
with(MO){
   MO.FDatasetConsole = function FDatasetConsole(o){
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
   MO.FDatasetConsole_onFetch = function FDatasetConsole_onFetch(p){
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
   MO.FDatasetConsole_construct = function FDatasetConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._datasets = new TDictionary();
   }
   MO.FDatasetConsole_loadDataset = function FDatasetConsole_loadDataset(x){
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
   MO.FDatasetConsole_fetch = function FDatasetConsole_fetch(p){
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
   MO.FDatasetConsole_scalar = function FDatasetConsole_scalar(g){
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
   MO.FDatasetConsole_onCompleteLoaded = function FDatasetConsole_onCompleteLoaded(g, root){
      var o = this;
      if(root.hasNode()){
         var nc = root.find('Control');
         if(nc){
            g.resultConfig = nc;
         }
      }
      g.invoke();
   }
   MO.FDatasetConsole_onLovLoadeded = function FDatasetConsole_onLovLoadeded(arg, root){
      var o = this;
      arg.lovNode = root;
      arg.invoke();
   }
   MO.FDatasetConsole_onPrepareLoaded = function FDatasetConsole_onPrepareLoaded(g, x){
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
   MO.FDatasetConsole_onLoaded = function FDatasetConsole_onLoaded(e){
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
   MO.FDatasetConsole_complete = function FDatasetConsole_complete(g){
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
   MO.FDatasetConsole_lov = function FDatasetConsole_lov(g){
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
   MO.FDatasetConsole_prepare = function FDatasetConsole_prepare(g){
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
   MO.FDatasetConsole_update = function FDatasetConsole_update(g){
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
   MO.FDatasetConsole_get = function FDatasetConsole_get(id){
      var o = this;
      var ds = o.forms.get(id);
      return ds;
   }
   MO.FDatasetConsole_getById = function FDatasetConsole_getById(id){
      var o = this;
      var d = o._datasets.get(id);
      return d;
   }
   MO.FDatasetConsole_getByPath = function FDatasetConsole_getByPath(formId, path){
      var o = this;
      var ds = o.get(formId);
      return ds ? ds.get(path) : null;
   }
   MO.FDatasetConsole_onTreeLoaded = function FDatasetConsole_onTreeLoaded(g){
      var o = this;
      alert(1);
   }
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
   MO.FDatasetConsole_columnNodeFetch = function FDatasetConsole_columnNodeFetch(g){
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
   MO.FDatasetConsole_treeUpdate = function FDatasetConsole_treeUpdate(g){
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
}
with(MO){
   MO.FDataSource = function FDataSource(o){
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
   MO.FDataSource_construct = function FDataSource_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._datasets = new TDictionary();
   }
   MO.FDataSource_selectDataset = function FDataSource_selectDataset(p){
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
   MO.FDataSource_currentDataset = function FDataSource_currentDataset(){
      return this._currentDataset;
   }
   MO.FDataSource_selectRow = function FDataSource_selectRow(p){
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
   MO.FDataSource_currentRow = function FDataSource_currentRow(){
      return this._currentRow;
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
}
with(MO){
   MO.FUiDataAction = function FUiDataAction(o){
      o = RClass.inherits(this, o, FUiComponent, MInvoke);
      o._action        = RClass.register(o, new APtyString('_action'));
      o._service       = RClass.register(o, new APtyString('_service'));
      o._execute       = RClass.register(o, new APtyString('_execute'));
      o._loading       = false;
      o._dataContainer = null;
      o.onLoaded       = FUiDataAction_onLoaded;
      o.invoke         = FUiDataAction_invoke;
      return o;
   }
   MO.FUiDataAction_onLoaded = function FUiDataAction_onLoaded(p){
      var o = this;
      RWindow.setEnable(true);
      o._loading = false;
   }
   MO.FUiDataAction_invoke = function FUiDataAction_invoke(p){
      var o = this;
      MO.Assert.debugTrue(RClass.isClass(p, MUiDataContainer));
      var svc = RService.parse(o._service);
      if(!svc){
         throw new TError(o, 'Unknown service.');
      }
      RWindow.setEnable(false);
      var xdocument = new TXmlDocument();
      var root = xdocument.root();
      root.set('action', svc.action);
      RConsole.find(FEnvironmentConsole).build(root);
      p.dsSaveValue(root.create('Data'));
      MO.Logger.debug(this, xdocument.dump());
      o._loading = true;
      o._dataContainer = p;
      var connection = RConsole.find(FXmlConsole).sendAsync(svc.url, xdocument);
      connection.addLoadListener(o, o.onLoaded);
   }
}
with(MO){
   MO.FUiDataCheck = function FUiDataCheck(o){
      o = RClass.inherits(this, o, FUiCheck, MUiDataField);
      return o;
   }
}
with(MO){
   MO.FUiDataColorPicker = function FUiDataColorPicker(o){
      o = RClass.inherits(this, o, FUiEdit, MUiDataField);
      return o;
   }
   MO.FUiDataColorPicker_onDataKeyDown = function FUiDataColorPicker_onDataKeyDown(s, e){
      var o = this;
      o.__base.FUiEdit.onDataKeyDown.call(o, s, e);
      if(o.editCase){
         RKey.fixCase(e, o.editCase);
      }
      if(o._editable){
         if(o.editComplete){
            if( 16 != e.keyCode && 17 != e.keyCode && 18 != e.keyCode && 20 != e.keyCode ){
               var ed = o.findEditor();
               if(ed){
                  ed.onEditKeyDown(s, e);
               }
            }
         }
      }
   }
   MO.FUiDataColorPicker_formatValue = function FUiDataColorPicker_formatValue(v){
      var o = this;
      var r = RString.nvl(v);
      if(ECase.Upper == o.editCase){
         r = RString.toUpper(r);
      }else if(ECase.Lower == o.editCase){
         r = RString.toLower(r);
      }
      return r;
   }
   MO.FUiDataColorPicker_setText = function FUiDataColorPicker_setText(t){
      var o = this;
      if(!o.hEdit){
         return;
      }
      if('U'== o.editCase){
         o.hEdit.value = RString.toUpper(t);
      }else if('L'== o.editCase){
            o.hEdit.value = RString.toLower(t);
      }else{
         o.hEdit.value = t;
      }
      if('right' == o.editAlign){
         o.hEdit.style.textAlign = 'right';
      }else if('left' == o.editAlign ){
         o.hEdit.style.textAlign = 'left';
      }else{
         o.hEdit.style.textAlign = 'center';
      }
   }
   MO.FUiDataColorPicker_validText = function FUiDataColorPicker_validText(t){
      var o = this;
      var r = o.__base.FUiEdit.validText.call(o, t);
      if(!r){
         if(o.validLenmin){
            if(o.validLenmin > t.length){
               return RContext.get('MDescEdit:ValidMinLength', o.validLenmin);
            }
         }
         if(o.validLenmax){
            if(o.validLenmax < t.length){
               return RContext.get('MDescEdit:ValidMaxLength', o.validLenmax);
            }
         }
      }
      return r;
   }
   MO.FUiDataColorPicker_findEditor = function FUiDataColorPicker_findEditor(){
      var o = this;
      if(o.editComplete){
         var de = o.editor;
         if(!de){
            o.dsControl = o.topControl(MDataset);
            if(o.dsControl){
               de = o.editor = RConsole.find(FUiDataColorPickerConsole).focus(o, FUiDataColorPickerEditor);
            }
         }
         if(de){
            de.linkControl(o);
         }
         return o.editor;
      }
   }
   MO.FUiDataColorPicker_drop = function FUiDataColorPicker_drop(){
      var o = this;
      var de = o.findEditor();
      if(de){
         var t = o.reget();
         if(t.length > 0){
            if(o.finded != t){
               if(de.source != o){
                  de.linkControl(o);
               }
               de.search(t);
            }
            o.finded = t;
         }
      }
   }
}
with(MO){
   MO.FUiDataEdit = function FUiDataEdit(o){
      o = RClass.inherits(this, o, FUiEdit, MUiDataField);
      return o;
   }
   MO.FUiDataEdit_onDataKeyDown = function FUiDataEdit_onDataKeyDown(s, e){
      var o = this;
      o.__base.FUiEdit.onDataKeyDown.call(o, s, e);
      if(o.editCase){
         RKey.fixCase(e, o.editCase);
      }
   }
   MO.FUiDataEdit_formatValue = function FUiDataEdit_formatValue(v){
      var o = this;
      var r = RString.nvl(v);
      if(ECase.Upper == o.editCase){
         r = RString.toUpper(r);
      }else if(ECase.Lower == o.editCase){
         r = RString.toLower(r);
      }
      return r;
   }
   MO.FUiDataEdit_setText = function FUiDataEdit_setText(t){
      var o = this;
      if(!o.hEdit){
         return;
      }
      if('U'== o.editCase){
         o.hEdit.value = RString.toUpper(t);
      }else if('L'== o.editCase){
            o.hEdit.value = RString.toLower(t);
      }else{
         o.hEdit.value = t;
      }
      if('right' == o.editAlign){
         o.hEdit.style.textAlign = 'right';
      }else if('left' == o.editAlign ){
         o.hEdit.style.textAlign = 'left';
      }else{
         o.hEdit.style.textAlign = 'center';
      }
   }
   MO.FUiDataEdit_validText = function FUiDataEdit_validText(t){
      var o = this;
      var r = o.__base.FUiEdit.validText.call(o, t);
      if(!r){
         if(o.validLenmin){
            if(o.validLenmin > t.length){
               return RContext.get('MDescEdit:ValidMinLength', o.validLenmin);
            }
         }
         if(o.validLenmax){
            if(o.validLenmax < t.length){
               return RContext.get('MDescEdit:ValidMaxLength', o.validLenmax);
            }
         }
      }
      return r;
   }
   MO.FUiDataEdit_findEditor = function FUiDataEdit_findEditor(){
      var o = this;
      if(o.editComplete){
         var de = o.editor;
         if(!de){
            o.dsControl = o.topControl(MDataset);
            if(o.dsControl){
               de = o.editor = RConsole.find(FUiDataEditConsole).focus(o, FUiDataEditEditor);
            }
         }
         if(de){
            de.linkControl(o);
         }
         return o.editor;
      }
   }
   MO.FUiDataEdit_drop = function FUiDataEdit_drop(){
      var o = this;
      var de = o.findEditor();
      if(de){
         var t = o.reget();
         if(t.length > 0){
            if(o.finded != t){
               if(de.source != o){
                  de.linkControl(o);
               }
               de.search(t);
            }
            o.finded = t;
         }
      }
   }
}
with(MO){
   MO.FUiDataEditControl = function FUiDataEditControl(o){
      o = RClass.inherits(this, o, FUiEditControl, MUiEditValue, MUiEditChange, MUiEditDrop);
      o._labelModeCd      = RClass.register(o, new APtyString('_labelModeCd'), EUiLabelMode.All);
      o._labelPositionCd  = RClass.register(o, new APtyString('_labelPositionCd'), EUiLabelPosition.Left);
      o._labelSize        = RClass.register(o, new APtySize2('_labelSize'));
      o._labelAlignCd     = RClass.register(o, new APtyString('_labelAlignCd'), EUiAlign.Left);
      o._labelColor       = RClass.register(o, new APtyString('_labelColor'));
      o._editSize         = RClass.register(o, new APtySize2('_editSize'));
      o._editColor        = RClass.register(o, new APtyString('_editColor'));
      o._styleLabelPanel  = RClass.register(o, new AStyle('_styleLabelPanel'));
      o._styleEditPanel   = RClass.register(o, new AStyle('_styleEditPanel'));
      o._progressing      = false;
      o._hLabelPanel      = null;
      o._hLabelForm       = null;
      o._hIconPanel       = null;
      o._hIcon            = null;
      o._hTextPanel       = null;
      o._hText            = null;
      o._hEditPanel       = null;
      o._hEditForm        = null;
      o._hValuePanel      = null;
      o.onBuildLabelIcon  = FUiDataEditControl_onBuildLabelIcon;
      o.onBuildLabelText  = FUiDataEditControl_onBuildLabelText;
      o.onBuildLabel      = FUiDataEditControl_onBuildLabel;
      o.onBuildEditValue  = RMethod.virtual(o, 'onBuildEditValue');
      o.onBuildEdit       = FUiDataEditControl_onBuildEdit;
      o.onBuildPanel      = FUiDataEditControl_onBuildPanel;
      o.onBuild           = FUiDataEditControl_onBuild;
      o.oeMode            = FUiDataEditControl_oeMode;
      o.oeProgress        = FUiDataEditControl_oeProgress;
      o.construct         = FUiDataEditControl_construct;
      o.panel             = FUiDataEditControl_panel;
      o.label             = FUiDataEditControl_label;
      o.setLabel          = FUiDataEditControl_setLabel;
      o.text              = FUiDataEditControl_text;
      o.setText           = FUiDataEditControl_setText;
      o.getValueRectangle = FUiDataEditControl_getValueRectangle;
      o.dispose           = FUiDataEditControl_dispose;
      return o;
   }
   MO.FUiDataEditControl_onBuildLabelIcon = function FUiDataEditControl_onBuildLabelIcon(p){
      var o = this;
      if(o._labelIcon){
         o._hIcon = RBuilder.appendIcon(o._hIconPanel, null, o._labelIcon);
      }else{
         o._hIcon = RBuilder.appendIcon(o._hIconPanel, null, 'n', 16, 16);
      }
   }
   MO.FUiDataEditControl_onBuildLabelText = function FUiDataEditControl_onBuildLabelText(p){
      var o = this;
      o._hText = RBuilder.appendSpan(o._hTextPanel, null, o._label);
   }
   MO.FUiDataEditControl_onBuildLabel = function FUiDataEditControl_onBuildLabel(p){
      var o = this;
      var h = o._hLabelForm = RBuilder.appendTable(o._hLabelPanel, o.styleName('LabelPanel'));
      var hr = RBuilder.appendTableRow(h);
      var hip = o._hIconPanel = RBuilder.appendTableCell(hr);
      hip.width = '20px';
      o.onBuildLabelIcon(p);
      var htp = o._hTextPanel = RBuilder.appendTableCell(hr);
      htp.noWrap = true;
      o.onBuildLabelText(p);
      RHtml.setSize(h, o._labelSize);
      if(o._labelAlignCd){
         htp.align = o._labelAlignCd;
         htp.style.paddingRight = 4;
      }
      if(o._labelColor){
         o._hLabel.style.color = o._labelColor;
      }
   }
   MO.FUiDataEditControl_onBuildEdit = function FUiDataEditControl_onBuildEdit(p){
      var o = this;
      var h = o._hEditForm = RBuilder.appendTable(o._hEditPanel, o.styleName('EditPanel'));
      var hr = o._hEditLine = RBuilder.appendTableRow(h);
      o._hValuePanel = RBuilder.appendTableCell(hr);
      o.onBuildEditValue(p);
      RHtml.setSize(h, o._editSize);
   }
   MO.FUiDataEditControl_onBuildPanel = function FUiDataEditControl_onBuildPanel(p){
      var o = this;
      o._hPanel = RBuilder.createTable(p, o.styleName('Panel'));
   }
   MO.FUiDataEditControl_onBuild = function FUiDataEditControl_onBuild(p){
      var o = this;
      o.__base.FUiEditControl.onBuild.call(o, p);
      var hc = o._hPanel;
      var hlp = null;
      var hep = null;
      var lmc = o._labelModeCd;
      if(lmc == EUiLabelMode.Label){
         hlp = RBuilder.appendTableCell(RBuilder.appendTableRow(hc));
      }else if(lmc == EUiLabelMode.Hidden){
         hep = RBuilder.appendTableCell(RBuilder.appendTableRow(hc));
      }else{
         var lpc = o._labelPositionCd;
         if(lpc == EUiLabelPosition.Top){
            hlp = RBuilder.appendTableRowCell(hc);
            hep = RBuilder.appendTableRowCell(hc);
         }else if(lpc == EUiLabelPosition.Right){
            var hr = RBuilder.appendTableRow(hc);
            hep = RBuilder.appendTableCell(hr);
            hlp = RBuilder.appendTableCell(hr);
         }else if(lpc == EUiLabelPosition.Bottom){
            hep = RBuilder.appendTableRowCell(hc);
            hlp = RBuilder.appendTableRowCell(hc);
         }else{
            var hr = RBuilder.appendTableRow(hc);
            hlp = RBuilder.appendTableCell(hr);
            hep = RBuilder.appendTableCell(hr);
         }
      }
      o._hLabelPanel = hlp;
      o._hEditPanel = hep;
      if(hlp){
         o.onBuildLabel(p);
         hlp.appendChild(o._hLabelForm);
         o.setLabel(o._label);
      }
      if(hep){
         o.onBuildEdit(p);
      }
   }
   MO.FUiDataEditControl_oeMode = function FUiDataEditControl_oeMode(e){
      var o = this;
      o.__base.FUiEditControl.oeMode.call(o, e);
      o.__base.MDisplay.oeMode.call(o, e);
      o._editable = o.canEdit(e.mode);
      o._validable = o.canValid(e.mode);
      if(!o._progressing){
         o.setEditable(o._editable);
      }
      return EEventStatus.Stop;
   }
   MO.FUiDataEditControl_oeProgress = function FUiDataEditControl_oeProgress(e){
      var o = this;
      if(o._progressing && e.enable){
         return EEventStatus.Stop;
      }
      o._progressing = e.enable;
      if(e.enable){
         var ea = o._editable;
         o.setEditable(false);
         o._editable = ea;
      }else{
         o.setEditable(o._editable);
      }
      return EEventStatus.Stop;
   }
   MO.FUiDataEditControl_construct = function FUiDataEditControl_construct(){
      var o = this;
      o.__base.FUiEditControl.construct.call(o);
      o.__base.MUiEditChange.construct.call(o);
      o.__base.MUiEditDrop.construct.call(o);
      o._labelSize = new SSize2(100, 20);
      o._editSize = new SSize2(200, 20);
   }
   MO.FUiDataEditControl_panel = function FUiDataEditControl_panel(t){
      var o = this;
      if(EPanel.Edit == t){
         return o.hEdit;
      }else if(EPanel.Focus == t){
         return o.hEdit;
      }
      return o.__base.FUiEditControl.panel.call(o, t);
   }
   MO.FUiDataEditControl_label = function FUiDataEditControl_label(p){
      return this._label;
   }
   MO.FUiDataEditControl_setLabel = function FUiDataEditControl_setLabel(p){
      var o = this;
      o._label = p;
      if(o._hText){
         o._hText.innerHTML = RString.nvl(p);
      }
   }
   MO.FUiDataEditControl_text = function FUiDataEditControl_text(){
      throw new TUnsupportError(o, 'text');
   }
   MO.FUiDataEditControl_setText = function FUiDataEditControl_setText(value){
      throw new TUnsupportError(o, 'setText');
   }
   MO.FUiDataEditControl_getValueRectangle = function FUiDataEditControl_getValueRectangle(r){
      var o = this;
      if(!r){
         r = new SRectangle();
      }
      var h = o._hValuePanel;
      var p = RHtml.clientPosition(h);
      r.position.assign(p);
      r.setSize(h.offsetWidth, h.offsetHeight);
      return r;
   }
   MO.FUiDataEditControl_dispose = function FUiDataEditControl_dispose(){
      var o = this;
      o._labelModeCd = null;
      o._labelPositionCd = null;
      o._labelAlignCd = null;
      o._dataTypeCd = null;
      o._labelSize = RObject.dispose(o._labelSize);
      o._editSize = RObject.dispose(o._editSize);
      o._hLabelPanel = RHtml.free(o._hLabelPanel);
      o._hLabelForm = RHtml.free(o._hLabelForm);
      o._hIconPanel = RHtml.free(o._hIconPanel);
      o._hIcon = RHtml.free(o._hIcon);
      o._hTextPanel = RHtml.free(o._hTextPanel);
      o._hText = RHtml.free(o._hText);
      o._hEditPanel = RHtml.free(o._hEditPanel);
      o._hEditForm = RHtml.free(o._hEditForm);
      o._hValuePanel = RHtml.free(o._hValuePanel);
      o._hDropPanel = RHtml.free(o._hDropPanel);
      o.__base.MUiEditDrop.dispose.call(o);
      o.__base.MUiEditChange.dispose.call(o);
      o.__base.FUiEditControl.dispose.call(o);
   }
   MO.FUiDataEditControl_onScalar = function FUiDataEditControl_onScalar(g){
      var o = this;
      o.set(g.result);
   }
   MO.FUiDataEditControl_scalar = function FUiDataEditControl_scalar(a){
      var o = this;
      var g = new TDatasetScalarArg(o, null, a);
      g.callback = new TInvoke(o, o.onScalar);
      RConsole.find(FDatasetConsole).scalar(g);
   }
   MO.FUiDataEditControl_onDataDoubleClick = function FUiDataEditControl_onDataDoubleClick(){
      var o = this;
      if(RClass.isClass(o, MDropable)){
         o.onDropDoubleClick();
      }
      if(RClass.isClass(o, MListView)){
         o.onListClick();
      }
   }
   MO.FUiDataEditControl_onDataKeyDown = function FUiDataEditControl_onDataKeyDown(s, e){
      var o = this;
      o.__base.MEditDescriptor.onDataKeyDown.call(o, s, e);
      var hci = o.hChangeIcon;
      if(hci){
         hci.style.display = o.isDataChanged() ? 'block' : 'none';
      }
      if(RClass.isClass(o, MDropable) && EKey.Down==e.keyCode){
         o.drop();
      }else if(e.ctrlKey && (EKey.Enter==e.keyCode) && o.editSearch){
         var dc = o.dsControl;
         if(dc){
            if(!o.isValid){
               var sn = new TNode('Search');
               var n = sn.create('Item');
               n.set('name', o.name);
               n.set('data_name', o.dataName);
               n.set('data_value', o.dataValue);
               n.set('search_type', ESearch.Equals);
               n.set('search_order', EOrder.None);
               RConsole.find(FDatasetConsole).fetch(dc, sn);
            }
         }
      }
   }
   MO.FUiDataEditControl_onDesignBegin = function FUiDataEditControl_onDesignBegin(){
      var o = this;
      o.__base.MDesign.onDesignBegin.call(o);
      o._disbaled = true;
      o.hEdit.disbaled = true;
   }
   MO.FUiDataEditControl_onDesignEnd = function FUiDataEditControl_onDesignEnd(){
      var o = this;
      o.__base.MDesign.onDesignEnd.call(o);
      o._disbaled = false;
      o.hEdit.disbaled = false;
   }
   MO.FUiDataEditControl_oeDataLoad = function FUiDataEditControl_oeDataLoad(p){
      var o = this;
      var ds = p.source;
      var r = ds.currentRow();
      var v = r.get(o._dataName);
      o.set(v);
      return EEventStatus.Stop;
   }
   MO.FUiDataEditControl_oeDataSave = function FUiDataEditControl_oeDataSave(p){
      var o = this;
      var ds = p.source;
      var r = ds.currentRow();
      var v = o.get();
      r.set(o._dataName, v);
      return EEventStatus.Stop;
   }
   MO.FUiDataEditControl_oeDesign = function FUiDataEditControl_oeDesign(p){
      var o = this;
      o.__base.MDesign.oeDesign.call(o, e);
      var hlf = o.hLabelForm;
      var hef = o.hEditForm;
      switch(e.mode){
         case EDesign.Move:
            if(e.flag){
               o.hForm.border = 1;
               if(hlf){
                  hlf.cellPadding = 1;
               }
               if(o.hEdit){
                  o.hEdit.disabled = true;
               }
            }else{
               o.hForm.border = 0;
               if(hlf){
                  hlf.border = 0;
                  hlf.cellPadding = 0;
               }
               if(o.hEdit){
                  o.hEdit.disabled = false;
               }
            }
            break;
         case EDesign.Border:
            if(e.flag){
               o.hForm.border = 1;
               if(hef){
                  hef.border = 1;
               }
            }else{
               o.hForm.border = 0;
               if(hef){
                  hef.border = 0;
               }
            }
            break;
      }
      return EEventStatus.Stop;
   }
   MO.FUiDataEditControl_oeLoadValue = function FUiDataEditControl_oeLoadValue(e){
      var o = this;
      var r = o.__base.MUiEditValue.oeLoadValue.call(o, e);
      var hci = o.hChangeIcon;
      if(hci){
         hci.style.display = 'none';
      }
      return r;
   }
   MO.FUiDataEditControl_doFocus = function FUiDataEditControl_doFocus(e){
      var o = this;
      o.__base.MUiFocus.doFocus.call(o, e);
      o.__base.MUiEditValue.doFocus.call(o, e);
   }
   MO.FUiDataEditControl_doBlur = function FUiDataEditControl_doBlur(e){
      var o = this;
      o.__base.MUiFocus.doBlur.call(o, e);
      o.__base.MUiEditValue.doBlur.call(o, e);
   }
   MO.FUiDataEditControl_testFocus = function FUiDataEditControl_testFocus(){
      return this._visible && this._editable && !this._disbaled;
   }
   MO.FUiDataEditControl_setEditable = function FUiDataEditControl_setEditable(v){
      var o = this;
      o.__base.MUiEditValue.setEditable.call(o, v);
      if(o.hEdit){
         o.hEdit.readOnly = !v;
      }
      var hl = o.hLabel;
      if(hl){
         if(o.validRequire){
            o.hLabel.style.color = v ? EUiColor.Require : EUiColor.Text;
         }
         if(RClass.isClass(o, MListView) && o.canListView()){
            hl.style.cursor = v ? 'hand' : 'normal';
            hl.className = v ? 'RLine_Underline' : '';
         }
      }
   }
   MO.FUiDataEditControl_setVisible = function FUiDataEditControl_setVisible(v){
      var o = this;
      o.__base.FUiEditControl.setVisible.call(o, v);
      o.refreshStyle();
   }
   MO.FUiDataEditControl_focus = function FUiDataEditControl_focus(){
      var o = this;
      o.__base.MUiFocus.focus.call(o);
      if(o.hEdit){
         try{
            o.hEdit.focus();
         }catch(e){
         }
      }
   }
   MO.FUiDataEditControl_refreshStyle = function FUiDataEditControl_refreshStyle(){
      var o = this;
      if(!o._visible){
         return;
      }
      var tc = EUiColor.TextReadonly;
      var bc = EUiColor.Readonly;
      var cr = 'normal';
      if(o._editable){
         tc = EUiColor.TextEdit;
         bc = EUiColor.Edit;
         cr = 'hand';
         if(!RString.isEmpty(o.editTip) && o.hEdit.innerText == o.editTip){
            tc = '#CCCCCC';
         }
      }
      if(o._invalidText){
         if(!RString.isEmpty(o.text())){
            tc = EUiColor.TextInvalid;
            bc = EUiColor.Invalid;
         }
      }
      o._textColor = tc;
      o._backColor = bc;
      var he = o.hEdit;
      var hd = o.hDrop;
      if(he){
         he.style.color = tc;
         he.style.backgroundColor = bc;
      }
      if(hd){
         if(he){
            he.style.cursor = cr;
         }
         hd.style.cursor = cr;
      }
      if(o.editBorder){
         var bs = EUiBorderStyle.Readonly;
         if(o._editable){
            bs = EUiBorderStyle.Edit;
         }
         if(o._hover){
            bs = EUiBorderStyle.Hover;
         }
         o.setEditBorderStyle(bs, bc);
      }
   }
}
with(MO){
   MO.FUiDataFrame = function FUiDataFrame(o){
      o = RClass.inherits(this, o, FUiFrame, MUiDataset, MUiDataContainer, MUiDataAction);
      return o;
   }
}
with(MO){
   MO.FUiDataIconPicker = function FUiDataIconPicker(o){
      o = RClass.inherits(this, o, FUiEdit, MUiDataField);
      return o;
   }
   MO.FUiDataIconPicker_onDataKeyDown = function FUiDataIconPicker_onDataKeyDown(s, e){
      var o = this;
      o.__base.FUiEdit.onDataKeyDown.call(o, s, e);
      if(o.editCase){
         RKey.fixCase(e, o.editCase);
      }
   }
   MO.FUiDataIconPicker_formatValue = function FUiDataIconPicker_formatValue(v){
      var o = this;
      var r = RString.nvl(v);
      if(ECase.Upper == o.editCase){
         r = RString.toUpper(r);
      }else if(ECase.Lower == o.editCase){
         r = RString.toLower(r);
      }
      return r;
   }
   MO.FUiDataIconPicker_setText = function FUiDataIconPicker_setText(t){
      var o = this;
      if(!o.hEdit){
         return;
      }
      if('U'== o.editCase){
         o.hEdit.value = RString.toUpper(t);
      }else if('L'== o.editCase){
            o.hEdit.value = RString.toLower(t);
      }else{
         o.hEdit.value = t;
      }
      if('right' == o.editAlign){
         o.hEdit.style.textAlign = 'right';
      }else if('left' == o.editAlign ){
         o.hEdit.style.textAlign = 'left';
      }else{
         o.hEdit.style.textAlign = 'center';
      }
   }
   MO.FUiDataIconPicker_validText = function FUiDataIconPicker_validText(t){
      var o = this;
      var r = o.__base.FUiEdit.validText.call(o, t);
      if(!r){
         if(o.validLenmin){
            if(o.validLenmin > t.length){
               return RContext.get('MDescEdit:ValidMinLength', o.validLenmin);
            }
         }
         if(o.validLenmax){
            if(o.validLenmax < t.length){
               return RContext.get('MDescEdit:ValidMaxLength', o.validLenmax);
            }
         }
      }
      return r;
   }
   MO.FUiDataIconPicker_findEditor = function FUiDataIconPicker_findEditor(){
      var o = this;
      if(o.editComplete){
         var de = o.editor;
         if(!de){
            o.dsControl = o.topControl(MDataset);
            if(o.dsControl){
               de = o.editor = RConsole.find(FUiDataIconPickerConsole).focus(o, FUiDataIconPickerEditor);
            }
         }
         if(de){
            de.linkControl(o);
         }
         return o.editor;
      }
   }
   MO.FUiDataIconPicker_drop = function FUiDataIconPicker_drop(){
      var o = this;
      var de = o.findEditor();
      if(de){
         var t = o.reget();
         if(t.length > 0){
            if(o.finded != t){
               if(de.source != o){
                  de.linkControl(o);
               }
               de.search(t);
            }
            o.finded = t;
         }
      }
   }
}
with(MO){
   MO.FUiDataMemo = function FUiDataMemo(o){
      o = RClass.inherits(this, o, FUiMemo, MUiDataField);
      return o;
   }
}
with(MO){
   MO.FUiDataNumber = function FUiDataNumber(o){
      o = RClass.inherits(this, o, FUiNumber);
      return o;
   }
   MO.FUiDataNumber_onEditFocus = function FUiDataNumber_onEditFocus(e){
      var o = this;
      o.setText(o.formatValue(o.text()));
   }
   MO.FUiDataNumber_onEditBlur = function FUiDataNumber_onEditBlur(e){
      var o = this;
      o.setText(o.formatText(o.text()));
   }
   MO.FUiDataNumber_onBuildEdit = function FUiDataNumber_onBuildEdit(b){
      var o = this;
      var htb = RBuilder.appendTable(b.hPanel);
      htb.style.tableLayout = 'fixed';
      var hr = o.hEdit = htb.insertRow();
      o.onBuildChange(hr.insertCell());
      if(o.canZoom()){
         var hc = hr.insertCell();
         o.hZoom = RBuilder.appendIcon(hc, 'ctl.zooms');
         hc.width = 16;
      }
      var hc = hr.insertCell();
      hc.style.width = '100%';
      var he = o.hEdit = RBuilder.appendEdit(hc, o.style('Edit'));
      o.attachEvent('onEditFocus', he, o.onEditFocus);
      o.attachEvent('onEditKeyPress', he, o.onEditKeyPress);
      o.attachEvent('onEditBlur', he, o.onEditBlur);
      o.attachEvent('onDataKeyUp', he, o.ohEditKeyUp);
      if(o.editLength){
         he.maxLength = o.editLength;
      }
      o.buildAdjustForm(b.hDrop);
   }
   MO.FUiDataNumber_setUnitIcon = function FUiDataNumber_setUnitIcon(i){
      var o = this;
      var hui = o.hUnit;
      hui.innerHTML = '<IMG src='+i+'>';
   }
   MO.FUiDataNumber_onDataKeyDown = function FUiDataNumber_onDataKeyDown(s, e){
      var o = this;
      if(o.canEdit){
         if(EKey.Up == e.keyCode){
            o.adjustValue(true);
         }else if(EKey.Down == e.keyCode){
            o.adjustValue(false);
         }
      }
      o.base.FUiNumber.onDataKeyDown.call(o, s, e);
   }
   MO.FUiDataNumber_ohEditKeyUp = function FUiDataNumber_ohEditKeyUp(s, e){
      var o = this;
      if(EKey.Up == e.keyCode && o.canEdit){
         o.hUpIcon.src = o.styleIconPath('UpSelect');
      }else if(EKey.Down == e.keyCode && o.canEdit){
         o.hDownIcon.src = o.styleIconPath('DownSelect');
      }
   }
   MO.FUiDataNumber_onEditKeyDown = function FUiDataNumber_onEditKeyDown(e) {
      var o = this;
      if(o.canEdit){
         if (EKey.Up == e.keyCode) {
            e.source.hUpIcon.src = o.styleIconPath('up');
            o.changeValue(e, 'Y');
         }else if (EKey.Down == e.keyCode){
            e.source.hDownIcon.src = o.styleIconPath('down');
            o.changeValue(e, 'N');
         }
      }
   }
   MO.FUiDataNumber_onEditKeyUp = function FUiDataNumber_onEditKeyUp(e) {
      var o = this;
      if(o.canEdit){
         if (EKey.Up == e.keyCode){
            e.source.hUpIcon.src = o.styleIconPath('upSelect');
         }else if (EKey.Down == e.keyCode){
            e.source.hDownIcon.src = o.styleIconPath('downSelect');
         }
      }
   }
   MO.FUiDataNumber_onEditDoubleClick = function FUiDataNumber_onEditDoubleClick(){
      var o = this;
      this.onListClick();
   }
   MO.FUiDataNumber_validPattern = function FUiDataNumber_validPattern(s) {
      var o = this;
      var flag = true;
      var s = RString.nvl(s);
      if(!RRegExp.test(ERegExp.NUMBER,s)){
         return false;
      }
      var r = null;
      if (o.dataType) {
         for (n in ERegExp) {
            if (RString.equals(n, o.dataType)) {
               r = ERegExp[n];
               break;
            }
         }
         if (RString.equals(RClass.name(r), "RegExp")) {
            flag = RRegExp.test(r, s) ? flag & true : flag & false;
         }
      }
      if (o.editMaxvalue) {
         flag = parseFloat(s) <= parseFloat(o.editMaxvalue) ? flag & true : flag & false;
      }
      if (o.editMinvalue) {
         flag = parseFloat(s) >= parseFloat(o.editMinvalue) ? flag & true : flag & false;
      }
      return flag;
   }
   MO.FUiDataNumber_refreshStyle = function FUiDataNumber_refreshStyle(){
      var o = this;
      o.base.FUiNumber.refreshStyle.call(o);
      o.hUpIcon.src = o.styleIconPath(o._hover ? 'UpSelect' : 'Up');
      o.hDownIcon.src = o.styleIconPath(o._hover ? 'DownSelect' : 'Down');
   }
   MO.FUiDataNumber_splitValue = function FUiDataNumber_splitValue(v){
      var o = this;
      var s = RString.nvl(v.toString());
      var j = RString.findChars(s,"-");
      var b = RString.findChars(s,"%");
      s = RString.removeChars(s, "'");
      s = RString.removeChars(s, " ");
      s = RString.removeChars(s, "%");
      s = RString.removeChars(s, "-");
      if (!RString.isEmpty(s)) {
         var sc = '';
         var c = '';
         var n = 0;
         for(var i = s.length; i > -1; i--){
            if(i != 0 && n != 0 && n % 3 == 0){
               sc = "'" + s.charAt(i) + sc;
            }else{
               sc = s.charAt(i) + sc;
            }
            n++;
         }
         if(-1 != j){
             sc = "-" + sc ;
          }
         if(-1 != b){
            sc = sc +"%";
         }
         return sc;
      }
      return s;
   }
   MO.FUiDataNumber_removeSplit = function FUiDataNumber_removeSplit(s){
      var o = this;
      var s = RString.nvl(s);
      s = RString.removeChars(s,"'");
      s = RString.removeChars(s,"%");
      return s;
   }
   MO.FUiDataNumber_precisionValue = function FUiDataNumber_precisionValue(v){
      var o = this;
      if(RString.isEmpty(v)){
         return v;
      }
      var l1,l2;
      var p = RString.nvl(o.editPrecision);
      v = RString.nvl(v);
      if(RString.contains(p,'.')){
         var sp = p.split('.')
         l2 = sp[1].length;
      }else{
        l1 = p.length;
      }
      if(RString.contains(v, '.')){
         var vs = v.split('.');
         if(l2){
            if(l2 > vs[1].length){
               vs[1] = RString.rpad(vs[1],l2 - vs[1].length,'0');
            }else if(l2 <= vs[1].length){
               vs[1] = vs[1].substring(0, l2);
            }
         }
         if(l1){
            if(l1 > vs[0].length){
               alert(l1);
            }else if(l1 < vs[0].length){
               vs[0] = vs[0].substring(0, vs[0].length - l1);
               vs[0] = RString.rpad(vs[0],l1,'0');
            }
            vs[1] = null;
         }
         if(vs[1]){
            v = vs[0] + '.' + RString.nvl(vs[1]);
         }else{
            v = vs[0];
         }
      }else{
         if(l1){
            if(l1 <= v.length){
               v = v.substring(0, v.length - l1 + 1);
               for(var n = 0; n < l1 - 1;n++){
                  v = v.concat('0');
               }
            }
            else if(l1 > v.length){
               v = 0;
            }
         }
         if(l2){
            v = v + '.';
            for(var n = 0; n < l2;n++){
               v = v.concat('0');
            }
         }
      }
      return v;
   }
   MO.FUiDataNumber_dispose = function FUiDataNumber_dispose(){
      var o = this;
      o.base.FUiNumber.dispose.call(o);
      o.hLabel = null;
      o.hUpIcon = null;
      o.hDownIcon = null;
      o.hChgIic = null;
   }
}
with(MO){
   MO.FUiDataNumber2 = function FUiDataNumber2(o){
      o = RClass.inherits(this, o, FUiNumber2);
      return o;
   }
   MO.FUiDataNumber2_onEditFocus = function FUiDataNumber2_onEditFocus(e){
      var o = this;
      o.setText(o.formatValue(o.text()));
   }
   MO.FUiDataNumber2_onEditBlur = function FUiDataNumber2_onEditBlur(e){
      var o = this;
      o.setText(o.formatText(o.text()));
   }
   MO.FUiDataNumber2_onBuildEdit = function FUiDataNumber2_onBuildEdit(b){
      var o = this;
      var htb = RBuilder.appendTable(b.hPanel);
      htb.style.tableLayout = 'fixed';
      var hr = o.hEdit = htb.insertRow();
      o.onBuildChange(hr.insertCell());
      if(o.canZoom()){
         var hc = hr.insertCell();
         o.hZoom = RBuilder.appendIcon(hc, 'ctl.zooms');
         hc.width = 16;
      }
      var hc = hr.insertCell();
      hc.style.width = '100%';
      var he = o.hEdit = RBuilder.appendEdit(hc, o.style('Edit'));
      o.attachEvent('onEditFocus', he, o.onEditFocus);
      o.attachEvent('onEditKeyPress', he, o.onEditKeyPress);
      o.attachEvent('onEditBlur', he, o.onEditBlur);
      o.attachEvent('onDataKeyUp', he, o.ohEditKeyUp);
      if(o.editLength){
         he.maxLength = o.editLength;
      }
      o.buildAdjustForm(b.hDrop);
   }
   MO.FUiDataNumber2_setUnitIcon = function FUiDataNumber2_setUnitIcon(i){
      var o = this;
      var hui = o.hUnit;
      hui.innerHTML = '<IMG src='+i+'>';
   }
   MO.FUiDataNumber2_onDataKeyDown = function FUiDataNumber2_onDataKeyDown(s, e){
      var o = this;
      if(o.canEdit){
         if(EKey.Up == e.keyCode){
            o.adjustValue(true);
         }else if(EKey.Down == e.keyCode){
            o.adjustValue(false);
         }
      }
      o.base.FUiNumber2.onDataKeyDown.call(o, s, e);
   }
   MO.FUiDataNumber2_ohEditKeyUp = function FUiDataNumber2_ohEditKeyUp(s, e){
      var o = this;
      if(EKey.Up == e.keyCode && o.canEdit){
         o.hUpIcon.src = o.styleIconPath('UpSelect');
      }else if(EKey.Down == e.keyCode && o.canEdit){
         o.hDownIcon.src = o.styleIconPath('DownSelect');
      }
   }
   MO.FUiDataNumber2_onEditKeyDown = function FUiDataNumber2_onEditKeyDown(e) {
      var o = this;
      if(o.canEdit){
         if (EKey.Up == e.keyCode) {
            e.source.hUpIcon.src = o.styleIconPath('up');
            o.changeValue(e, 'Y');
         }else if (EKey.Down == e.keyCode){
            e.source.hDownIcon.src = o.styleIconPath('down');
            o.changeValue(e, 'N');
         }
      }
   }
   MO.FUiDataNumber2_onEditKeyUp = function FUiDataNumber2_onEditKeyUp(e) {
      var o = this;
      if(o.canEdit){
         if (EKey.Up == e.keyCode){
            e.source.hUpIcon.src = o.styleIconPath('upSelect');
         }else if (EKey.Down == e.keyCode){
            e.source.hDownIcon.src = o.styleIconPath('downSelect');
         }
      }
   }
   MO.FUiDataNumber2_onEditDoubleClick = function FUiDataNumber2_onEditDoubleClick(){
      var o = this;
      this.onListClick();
   }
   MO.FUiDataNumber2_validPattern = function FUiDataNumber2_validPattern(s) {
      var o = this;
      var flag = true;
      var s = RString.nvl(s);
      if(!RRegExp.test(ERegExp.NUMBER,s)){
         return false;
      }
      var r = null;
      if (o.dataType) {
         for (n in ERegExp) {
            if (RString.equals(n, o.dataType)) {
               r = ERegExp[n];
               break;
            }
         }
         if (RString.equals(RClass.name(r), "RegExp")) {
            flag = RRegExp.test(r, s) ? flag & true : flag & false;
         }
      }
      if (o.editMaxvalue) {
         flag = parseFloat(s) <= parseFloat(o.editMaxvalue) ? flag & true : flag & false;
      }
      if (o.editMinvalue) {
         flag = parseFloat(s) >= parseFloat(o.editMinvalue) ? flag & true : flag & false;
      }
      return flag;
   }
   MO.FUiDataNumber2_refreshStyle = function FUiDataNumber2_refreshStyle(){
      var o = this;
      o.base.FUiNumber2.refreshStyle.call(o);
      o.hUpIcon.src = o.styleIconPath(o._hover ? 'UpSelect' : 'Up');
      o.hDownIcon.src = o.styleIconPath(o._hover ? 'DownSelect' : 'Down');
   }
   MO.FUiDataNumber2_splitValue = function FUiDataNumber2_splitValue(v){
      var o = this;
      var s = RString.nvl(v.toString());
      var j = RString.findChars(s,"-");
      var b = RString.findChars(s,"%");
      s = RString.removeChars(s, "'");
      s = RString.removeChars(s, " ");
      s = RString.removeChars(s, "%");
      s = RString.removeChars(s, "-");
      if (!RString.isEmpty(s)) {
         var sc = '';
         var c = '';
         var n = 0;
         for(var i = s.length; i > -1; i--){
            if(i != 0 && n != 0 && n % 3 == 0){
               sc = "'" + s.charAt(i) + sc;
            }else{
               sc = s.charAt(i) + sc;
            }
            n++;
         }
         if(-1 != j){
             sc = "-" + sc ;
          }
         if(-1 != b){
            sc = sc +"%";
         }
         return sc;
      }
      return s;
   }
   MO.FUiDataNumber2_removeSplit = function FUiDataNumber2_removeSplit(s){
      var o = this;
      var s = RString.nvl(s);
      s = RString.removeChars(s,"'");
      s = RString.removeChars(s,"%");
      return s;
   }
   MO.FUiDataNumber2_precisionValue = function FUiDataNumber2_precisionValue(v){
      var o = this;
      if(RString.isEmpty(v)){
         return v;
      }
      var l1,l2;
      var p = RString.nvl(o.editPrecision);
      v = RString.nvl(v);
      if(RString.contains(p,'.')){
         var sp = p.split('.')
         l2 = sp[1].length;
      }else{
        l1 = p.length;
      }
      if(RString.contains(v, '.')){
         var vs = v.split('.');
         if(l2){
            if(l2 > vs[1].length){
               vs[1] = RString.rpad(vs[1],l2 - vs[1].length,'0');
            }else if(l2 <= vs[1].length){
               vs[1] = vs[1].substring(0, l2);
            }
         }
         if(l1){
            if(l1 > vs[0].length){
               alert(l1);
            }else if(l1 < vs[0].length){
               vs[0] = vs[0].substring(0, vs[0].length - l1);
               vs[0] = RString.rpad(vs[0],l1,'0');
            }
            vs[1] = null;
         }
         if(vs[1]){
            v = vs[0] + '.' + RString.nvl(vs[1]);
         }else{
            v = vs[0];
         }
      }else{
         if(l1){
            if(l1 <= v.length){
               v = v.substring(0, v.length - l1 + 1);
               for(var n = 0; n < l1 - 1;n++){
                  v = v.concat('0');
               }
            }
            else if(l1 > v.length){
               v = 0;
            }
         }
         if(l2){
            v = v + '.';
            for(var n = 0; n < l2;n++){
               v = v.concat('0');
            }
         }
      }
      return v;
   }
   MO.FUiDataNumber2_dispose = function FUiDataNumber2_dispose(){
      var o = this;
      o.base.FUiNumber2.dispose.call(o);
      o.hLabel = null;
      o.hUpIcon = null;
      o.hDownIcon = null;
      o.hChgIic = null;
   }
}
with(MO){
   MO.FUiDataNumber3 = function FUiDataNumber3(o){
      o = RClass.inherits(this, o, FUiNumber3);
      return o;
   }
   MO.FUiDataNumber3_onEditFocus = function FUiDataNumber3_onEditFocus(e){
      var o = this;
      o.setText(o.formatValue(o.text()));
   }
   MO.FUiDataNumber3_onEditBlur = function FUiDataNumber3_onEditBlur(e){
      var o = this;
      o.setText(o.formatText(o.text()));
   }
   MO.FUiDataNumber3_onBuildEdit = function FUiDataNumber3_onBuildEdit(b){
      var o = this;
      var htb = RBuilder.appendTable(b.hPanel);
      htb.style.tableLayout = 'fixed';
      var hr = o.hEdit = htb.insertRow();
      o.onBuildChange(hr.insertCell());
      if(o.canZoom()){
         var hc = hr.insertCell();
         o.hZoom = RBuilder.appendIcon(hc, 'ctl.zooms');
         hc.width = 16;
      }
      var hc = hr.insertCell();
      hc.style.width = '100%';
      var he = o.hEdit = RBuilder.appendEdit(hc, o.style('Edit'));
      o.attachEvent('onEditFocus', he, o.onEditFocus);
      o.attachEvent('onEditKeyPress', he, o.onEditKeyPress);
      o.attachEvent('onEditBlur', he, o.onEditBlur);
      o.attachEvent('onDataKeyUp', he, o.ohEditKeyUp);
      if(o.editLength){
         he.maxLength = o.editLength;
      }
      o.buildAdjustForm(b.hDrop);
   }
   MO.FUiDataNumber3_setUnitIcon = function FUiDataNumber3_setUnitIcon(i){
      var o = this;
      var hui = o.hUnit;
      hui.innerHTML = '<IMG src='+i+'>';
   }
   MO.FUiDataNumber3_onDataKeyDown = function FUiDataNumber3_onDataKeyDown(s, e){
      var o = this;
      if(o.canEdit){
         if(EKey.Up == e.keyCode){
            o.adjustValue(true);
         }else if(EKey.Down == e.keyCode){
            o.adjustValue(false);
         }
      }
      o.base.FUiNumber3.onDataKeyDown.call(o, s, e);
   }
   MO.FUiDataNumber3_ohEditKeyUp = function FUiDataNumber3_ohEditKeyUp(s, e){
      var o = this;
      if(EKey.Up == e.keyCode && o.canEdit){
         o.hUpIcon.src = o.styleIconPath('UpSelect');
      }else if(EKey.Down == e.keyCode && o.canEdit){
         o.hDownIcon.src = o.styleIconPath('DownSelect');
      }
   }
   MO.FUiDataNumber3_onEditKeyDown = function FUiDataNumber3_onEditKeyDown(e) {
      var o = this;
      if(o.canEdit){
         if (EKey.Up == e.keyCode) {
            e.source.hUpIcon.src = o.styleIconPath('up');
            o.changeValue(e, 'Y');
         }else if (EKey.Down == e.keyCode){
            e.source.hDownIcon.src = o.styleIconPath('down');
            o.changeValue(e, 'N');
         }
      }
   }
   MO.FUiDataNumber3_onEditKeyUp = function FUiDataNumber3_onEditKeyUp(e) {
      var o = this;
      if(o.canEdit){
         if (EKey.Up == e.keyCode){
            e.source.hUpIcon.src = o.styleIconPath('upSelect');
         }else if (EKey.Down == e.keyCode){
            e.source.hDownIcon.src = o.styleIconPath('downSelect');
         }
      }
   }
   MO.FUiDataNumber3_onEditDoubleClick = function FUiDataNumber3_onEditDoubleClick(){
      var o = this;
      this.onListClick();
   }
   MO.FUiDataNumber3_validPattern = function FUiDataNumber3_validPattern(s) {
      var o = this;
      var flag = true;
      var s = RString.nvl(s);
      if(!RRegExp.test(ERegExp.NUMBER,s)){
         return false;
      }
      var r = null;
      if (o.dataType) {
         for (n in ERegExp) {
            if (RString.equals(n, o.dataType)) {
               r = ERegExp[n];
               break;
            }
         }
         if (RString.equals(RClass.name(r), "RegExp")) {
            flag = RRegExp.test(r, s) ? flag & true : flag & false;
         }
      }
      if (o.editMaxvalue) {
         flag = parseFloat(s) <= parseFloat(o.editMaxvalue) ? flag & true : flag & false;
      }
      if (o.editMinvalue) {
         flag = parseFloat(s) >= parseFloat(o.editMinvalue) ? flag & true : flag & false;
      }
      return flag;
   }
   MO.FUiDataNumber3_refreshStyle = function FUiDataNumber3_refreshStyle(){
      var o = this;
      o.base.FUiNumber3.refreshStyle.call(o);
      o.hUpIcon.src = o.styleIconPath(o._hover ? 'UpSelect' : 'Up');
      o.hDownIcon.src = o.styleIconPath(o._hover ? 'DownSelect' : 'Down');
   }
   MO.FUiDataNumber3_splitValue = function FUiDataNumber3_splitValue(v){
      var o = this;
      var s = RString.nvl(v.toString());
      var j = RString.findChars(s,"-");
      var b = RString.findChars(s,"%");
      s = RString.removeChars(s, "'");
      s = RString.removeChars(s, " ");
      s = RString.removeChars(s, "%");
      s = RString.removeChars(s, "-");
      if (!RString.isEmpty(s)) {
         var sc = '';
         var c = '';
         var n = 0;
         for(var i = s.length; i > -1; i--){
            if(i != 0 && n != 0 && n % 3 == 0){
               sc = "'" + s.charAt(i) + sc;
            }else{
               sc = s.charAt(i) + sc;
            }
            n++;
         }
         if(-1 != j){
             sc = "-" + sc ;
          }
         if(-1 != b){
            sc = sc +"%";
         }
         return sc;
      }
      return s;
   }
   MO.FUiDataNumber3_removeSplit = function FUiDataNumber3_removeSplit(s){
      var o = this;
      var s = RString.nvl(s);
      s = RString.removeChars(s,"'");
      s = RString.removeChars(s,"%");
      return s;
   }
   MO.FUiDataNumber3_precisionValue = function FUiDataNumber3_precisionValue(v){
      var o = this;
      if(RString.isEmpty(v)){
         return v;
      }
      var l1,l2;
      var p = RString.nvl(o.editPrecision);
      v = RString.nvl(v);
      if(RString.contains(p,'.')){
         var sp = p.split('.')
         l2 = sp[1].length;
      }else{
        l1 = p.length;
      }
      if(RString.contains(v, '.')){
         var vs = v.split('.');
         if(l2){
            if(l2 > vs[1].length){
               vs[1] = RString.rpad(vs[1],l2 - vs[1].length,'0');
            }else if(l2 <= vs[1].length){
               vs[1] = vs[1].substring(0, l2);
            }
         }
         if(l1){
            if(l1 > vs[0].length){
               alert(l1);
            }else if(l1 < vs[0].length){
               vs[0] = vs[0].substring(0, vs[0].length - l1);
               vs[0] = RString.rpad(vs[0],l1,'0');
            }
            vs[1] = null;
         }
         if(vs[1]){
            v = vs[0] + '.' + RString.nvl(vs[1]);
         }else{
            v = vs[0];
         }
      }else{
         if(l1){
            if(l1 <= v.length){
               v = v.substring(0, v.length - l1 + 1);
               for(var n = 0; n < l1 - 1;n++){
                  v = v.concat('0');
               }
            }
            else if(l1 > v.length){
               v = 0;
            }
         }
         if(l2){
            v = v + '.';
            for(var n = 0; n < l2;n++){
               v = v.concat('0');
            }
         }
      }
      return v;
   }
   MO.FUiDataNumber3_dispose = function FUiDataNumber3_dispose(){
      var o = this;
      o.base.FUiNumber3.dispose.call(o);
      o.hLabel = null;
      o.hUpIcon = null;
      o.hDownIcon = null;
      o.hChgIic = null;
   }
}
with(MO){
   MO.FUiDataNumber4 = function FUiDataNumber4(o){
      o = RClass.inherits(this, o, FUiNumber4);
      return o;
   }
   MO.FUiDataNumber4_onEditFocus = function FUiDataNumber4_onEditFocus(e){
      var o = this;
      o.setText(o.formatValue(o.text()));
   }
   MO.FUiDataNumber4_onEditBlur = function FUiDataNumber4_onEditBlur(e){
      var o = this;
      o.setText(o.formatText(o.text()));
   }
   MO.FUiDataNumber4_onBuildEdit = function FUiDataNumber4_onBuildEdit(b){
      var o = this;
      var htb = RBuilder.appendTable(b.hPanel);
      htb.style.tableLayout = 'fixed';
      var hr = o.hEdit = htb.insertRow();
      o.onBuildChange(hr.insertCell());
      if(o.canZoom()){
         var hc = hr.insertCell();
         o.hZoom = RBuilder.appendIcon(hc, 'ctl.zooms');
         hc.width = 16;
      }
      var hc = hr.insertCell();
      hc.style.width = '100%';
      var he = o.hEdit = RBuilder.appendEdit(hc, o.style('Edit'));
      o.attachEvent('onEditFocus', he, o.onEditFocus);
      o.attachEvent('onEditKeyPress', he, o.onEditKeyPress);
      o.attachEvent('onEditBlur', he, o.onEditBlur);
      o.attachEvent('onDataKeyUp', he, o.ohEditKeyUp);
      if(o.editLength){
         he.maxLength = o.editLength;
      }
      o.buildAdjustForm(b.hDrop);
   }
   MO.FUiDataNumber4_setUnitIcon = function FUiDataNumber4_setUnitIcon(i){
      var o = this;
      var hui = o.hUnit;
      hui.innerHTML = '<IMG src='+i+'>';
   }
   MO.FUiDataNumber4_onDataKeyDown = function FUiDataNumber4_onDataKeyDown(s, e){
      var o = this;
      if(o.canEdit){
         if(EKey.Up == e.keyCode){
            o.adjustValue(true);
         }else if(EKey.Down == e.keyCode){
            o.adjustValue(false);
         }
      }
      o.base.FUiNumber4.onDataKeyDown.call(o, s, e);
   }
   MO.FUiDataNumber4_ohEditKeyUp = function FUiDataNumber4_ohEditKeyUp(s, e){
      var o = this;
      if(EKey.Up == e.keyCode && o.canEdit){
         o.hUpIcon.src = o.styleIconPath('UpSelect');
      }else if(EKey.Down == e.keyCode && o.canEdit){
         o.hDownIcon.src = o.styleIconPath('DownSelect');
      }
   }
   MO.FUiDataNumber4_onEditKeyDown = function FUiDataNumber4_onEditKeyDown(e) {
      var o = this;
      if(o.canEdit){
         if (EKey.Up == e.keyCode) {
            e.source.hUpIcon.src = o.styleIconPath('up');
            o.changeValue(e, 'Y');
         }else if (EKey.Down == e.keyCode){
            e.source.hDownIcon.src = o.styleIconPath('down');
            o.changeValue(e, 'N');
         }
      }
   }
   MO.FUiDataNumber4_onEditKeyUp = function FUiDataNumber4_onEditKeyUp(e) {
      var o = this;
      if(o.canEdit){
         if (EKey.Up == e.keyCode){
            e.source.hUpIcon.src = o.styleIconPath('upSelect');
         }else if (EKey.Down == e.keyCode){
            e.source.hDownIcon.src = o.styleIconPath('downSelect');
         }
      }
   }
   MO.FUiDataNumber4_onEditDoubleClick = function FUiDataNumber4_onEditDoubleClick(){
      var o = this;
      this.onListClick();
   }
   MO.FUiDataNumber4_validPattern = function FUiDataNumber4_validPattern(s) {
      var o = this;
      var flag = true;
      var s = RString.nvl(s);
      if(!RRegExp.test(ERegExp.NUMBER,s)){
         return false;
      }
      var r = null;
      if (o.dataType) {
         for (n in ERegExp) {
            if (RString.equals(n, o.dataType)) {
               r = ERegExp[n];
               break;
            }
         }
         if (RString.equals(RClass.name(r), "RegExp")) {
            flag = RRegExp.test(r, s) ? flag & true : flag & false;
         }
      }
      if (o.editMaxvalue) {
         flag = parseFloat(s) <= parseFloat(o.editMaxvalue) ? flag & true : flag & false;
      }
      if (o.editMinvalue) {
         flag = parseFloat(s) >= parseFloat(o.editMinvalue) ? flag & true : flag & false;
      }
      return flag;
   }
   MO.FUiDataNumber4_refreshStyle = function FUiDataNumber4_refreshStyle(){
      var o = this;
      o.base.FUiNumber4.refreshStyle.call(o);
      o.hUpIcon.src = o.styleIconPath(o._hover ? 'UpSelect' : 'Up');
      o.hDownIcon.src = o.styleIconPath(o._hover ? 'DownSelect' : 'Down');
   }
   MO.FUiDataNumber4_splitValue = function FUiDataNumber4_splitValue(v){
      var o = this;
      var s = RString.nvl(v.toString());
      var j = RString.findChars(s,"-");
      var b = RString.findChars(s,"%");
      s = RString.removeChars(s, "'");
      s = RString.removeChars(s, " ");
      s = RString.removeChars(s, "%");
      s = RString.removeChars(s, "-");
      if (!RString.isEmpty(s)) {
         var sc = '';
         var c = '';
         var n = 0;
         for(var i = s.length; i > -1; i--){
            if(i != 0 && n != 0 && n % 3 == 0){
               sc = "'" + s.charAt(i) + sc;
            }else{
               sc = s.charAt(i) + sc;
            }
            n++;
         }
         if(-1 != j){
             sc = "-" + sc ;
          }
         if(-1 != b){
            sc = sc +"%";
         }
         return sc;
      }
      return s;
   }
   MO.FUiDataNumber4_removeSplit = function FUiDataNumber4_removeSplit(s){
      var o = this;
      var s = RString.nvl(s);
      s = RString.removeChars(s,"'");
      s = RString.removeChars(s,"%");
      return s;
   }
   MO.FUiDataNumber4_precisionValue = function FUiDataNumber4_precisionValue(v){
      var o = this;
      if(RString.isEmpty(v)){
         return v;
      }
      var l1,l2;
      var p = RString.nvl(o.editPrecision);
      v = RString.nvl(v);
      if(RString.contains(p,'.')){
         var sp = p.split('.')
         l2 = sp[1].length;
      }else{
        l1 = p.length;
      }
      if(RString.contains(v, '.')){
         var vs = v.split('.');
         if(l2){
            if(l2 > vs[1].length){
               vs[1] = RString.rpad(vs[1],l2 - vs[1].length,'0');
            }else if(l2 <= vs[1].length){
               vs[1] = vs[1].substring(0, l2);
            }
         }
         if(l1){
            if(l1 > vs[0].length){
               alert(l1);
            }else if(l1 < vs[0].length){
               vs[0] = vs[0].substring(0, vs[0].length - l1);
               vs[0] = RString.rpad(vs[0],l1,'0');
            }
            vs[1] = null;
         }
         if(vs[1]){
            v = vs[0] + '.' + RString.nvl(vs[1]);
         }else{
            v = vs[0];
         }
      }else{
         if(l1){
            if(l1 <= v.length){
               v = v.substring(0, v.length - l1 + 1);
               for(var n = 0; n < l1 - 1;n++){
                  v = v.concat('0');
               }
            }
            else if(l1 > v.length){
               v = 0;
            }
         }
         if(l2){
            v = v + '.';
            for(var n = 0; n < l2;n++){
               v = v.concat('0');
            }
         }
      }
      return v;
   }
   MO.FUiDataNumber4_dispose = function FUiDataNumber4_dispose(){
      var o = this;
      o.base.FUiNumber4.dispose.call(o);
      o.hLabel = null;
      o.hUpIcon = null;
      o.hDownIcon = null;
      o.hChgIic = null;
   }
}
with(MO){
   MO.FUiDataSelect = function FUiDataSelect(o){
      o = RClass.inherits(this, o, FUiSelect, MUiDataField);
      return o;
   }
}
with(MO){
   MO.FUiDataColumn = function FUiDataColumn(o){
      o = RClass.inherits(this, o, FControl, MDataField);
      o._displayList       = true;
      o._styleLabel        = RClass.register(o, new AStyle('_styleLabel'));
      o._styleSearchPanel  = RClass.register(o, new AStyle('_styleSearchPanel'));
      o._styleSearchEdit   = RClass.register(o, new AStyle('_styleSearchEdit'));
      o._styleIconSortUp   = RClass.register(o, new AStyleIcon('_styleIconSortUp'));
      o._styleIconSortDown = RClass.register(o, new AStyleIcon('_styleIconSortDown'));
      o._cellClass         = FCell;
      o._hForm             = null;
      o._hFormLine         = null;
      o._hIconPanel        = null;
      o._hIcon             = null;
      o._hLabel            = null;
      o._hSortPanel        = null;
      o._hSortUp           = null;
      o._hSortDown         = null;
      o._hSearchEditPanel  = null;
      o._hSearchEdit       = null;
      o.onBuildLabel       = FUiDataColumn_onBuildLabel;
      o.onBuildSearchIcon  = RMethod.empty;
      o.onBuildSearchEdit  = FUiDataColumn_onBuildSearchEdit;
      o.onBuildSearchDrop  = RMethod.empty;
      o.onBuildSearchForm  = FUiDataColumn_onBuildSearchForm;
      o.onBuildSearch      = FUiDataColumn_onBuildSearch;
      o.onBuildTotal       = FUiDataColumn_onBuildTotal;
      o.onBuildPanel       = FUiDataColumn_onBuildPanel;
      o.onBuild            = FUiDataColumn_onBuild;
      o.onSearchEnter      = RClass.register(o, new AEventMouseEnter('onSearchEnter'));
      o.onSearchClick      = RClass.register(o, new AEventClick('onSearchClick'));
      o.onSearchLeave      = RClass.register(o, new AEventMouseLeave('onSearchLeave'));
      o.onSearchKeyDown    = RClass.register(o, new AEventKeyDown('onSearchKeyDown'));
      o.createCell         = FUiDataColumn_createCell;
      return o;
   }
   MO.FUiDataColumn_onBuildLabel = function FUiDataColumn_onBuildLabel(p){
      var o = this;
      var hr = o._hFormLine;
      if (o._icon) {
         var hip = o._hIconPanel = RBuilder.appendTableCell(hr);
         o._hIcon = RBuilder.appendIcon(hip, o.icon);
      }
      var hl = o._hLabel = RBuilder.appendTableCell(hr);
      hl.innerHTML = RString.nvl(o.label());
      var hsp = o._hSortPanel = RBuilder.appendTableCell(hr);
      var hsu = o._hSortUp = RBuilder.appendIcon(hsp, o.styleIcon('SortUp', FUiDataColumn));
      hsu.style.display = 'none';
      var hsu = o._hSortDown = RBuilder.appendIcon(hsp, o.styleIcon('SortDown', FUiDataColumn));
      hsu.style.display = 'none';
   }
   MO.FUiDataColumn_onBuildSearchEdit = function FUiDataColumn_onBuildSearchEdit(p){
      var o = this;
      var hc = o._hSearchEditPanel = RBuilder.appendTableCell(o._hSearchFormLine, o.styleName('SearchPanel'));
      var he = o._hSearchEdit = RBuilder.appendEdit(hc, o.styleName('SearchEdit'));
   }
   MO.FUiDataColumn_onBuildSearchForm = function FUiDataColumn_onBuildSearchForm(p){
      var o = this;
      var hf = o._hSearchForm = RBuilder.appendTable(o._hSearchPanel);
      hf.width = '100%';
      hf.style.backgroundColor = '#FFFFFF';
      var hfl = o._hSearchFormLine = hf.insertRow();
      if(RClass.isClass(o, FUiDataColumnButton)){
         o._hSearchPanel.style.backgroundColor = '#EEEFF1';
         o._hSearchPanel.style.borderLeft='1 solid #808080';
         o._hSearchPanel.style.borderTop='1 solid #808080';
         o._hSearchPanel.style.borderBottom = '1 solid #9EC4EB';
         return;
      }
      o.onBuildSearchIcon();
      o.onBuildSearchEdit();
      o.onBuildSearchDrop();
   }
   MO.FUiDataColumn_onBuildSearch = function FUiDataColumn_onBuildSearch(p){
      var o = this;
      var h = o._hSearchPanel = RBuilder.create(p, 'TD', o.styleName('SearchPanel'));
      h.style.backgroundColor = "#FFFFFF";
      h.style.borderBottom = '1 solid #9EC4EB';
      RHtml.linkSet(h, 'control', o);
     o.attachEvent('onSearchEnter', h);
     o.attachEvent('onSearchLeave', h);
     o.onBuildSearchForm(p);
   }
   MO.FUiDataColumn_onBuildTotal = function FUiDataColumn_onBuildTotal(p){
      var o = this;
      var h = o._hTotalPanel = RBuilder.create(p, 'TD');
      RHtml.linkSet(h, 'control', o);
      h.align = 'right';
      h.style.color = '#686860';
      h.style.backgroundColor = '#F8F8F0';
      h.style.borderBottom = '1 solid #B8B8B0';
      h.innerText = ' ';
   }
   MO.FUiDataColumn_onBuildPanel = function FUiDataColumn_onBuildPanel(p) {
      var o = this;
      o._hPanel = RBuilder.create(p, 'TD', o.styleName('Label'));
   }
   MO.FUiDataColumn_onBuild = function FUiDataColumn_onBuild(p) {
      var o = this;
      var t = o.table;
      o._absEdit = o._editInsert || o._editUpdate || o._editDelete;
      if(!o._absEdit){
         if(!RString.isEmpty(o._lovReference)){
            o._hasDropArea = true;
         }else{
            o._hasDropArea = false;
         }
      }
      if (!RString.isEmpty(o._viewIcons)) {
         var im = o.iconMap = new TAttributes();
         im.split(o._viewIcons.replace(/\n/g, ';'), '=', ';');
         o.hasIconArea = im.count > 0;
      }
      o.__base.FControl.onBuild.call(o, p);
      var hp = o._hPanel;
      hp.style.padding = 4;
      var hf = o._hForm = RBuilder.appendTable(hp);
      if (!o._orderAble) {
        hf.style.cursor = 'hand';
      }
      var hr = o._hFormLine = RBuilder.appendTableRow(o._hForm);
      o.onBuildLabel(p);
      o.onBuildSearch(p);
      o.onBuildTotal(p);
      var h = o._hFixPanel = RBuilder.create(p, 'TD');
      h.height = 1;
      h.bgColor = '#FFFFFF'
      if(o._size.width < 40){
         o._size.width = 40;
      }
      RHtml.setSize(h, o._size);
      o._hPanel.style.pixelWidth = o.width;
      o._hFixPanel.style.pixelWidth = o.width;
   }
   MO.FUiDataColumn_createCell = function FUiDataColumn_createCell(p) {
      var o = this;
      var c = RClass.create(o._cellClass);
      var t = c._table = o._table;
      c._name = o._name;
      c._column = o;
      c.build(t._hPanel);
      c.setVisible(o._displayList);
      return c;
   }
   MO.FUiDataColumn_onCellMouseEnter = function FUiDataColumn_onCellMouseEnter(s, e){
      this.table.hoverRow(s.row, true);
   }
   MO.FUiDataColumn_onCellMouseLeave = function FUiDataColumn_onCellMouseLeave(s, e){
      this.table.hoverRow(s.row, false);
   }
   MO.FUiDataColumn_onCellMouseDown = function FUiDataColumn_onCellMouseDown(s, e){
      var o = this;
      var t = s.table;
      var r = s.row;
      t.__focusCell = s;
      t.selectRow(r, !e.ctrlKey, true);
      var fc = RConsole.find(FFocusConsole);
      var c = fc.focusControl;
      if(RClass.isClass(c, FDropEditor)){
         if(c.source == s){
            return;
         }
      }
      RConsole.find(FFocusConsole).focus(s);
   }
   MO.FUiDataColumn_onCellClick = function FUiDataColumn_onCellClick(s, e){
      this.table.clickRow(s.row);
   }
   MO.FUiDataColumn_onCellDoubleClick = function FUiDataColumn_onCellDoubleClick(s, e){
      var o = this;
      var r = s.row;
      if(!o.isEditAble(r)){
         o.table.doubleClickRow(r);
      }
   }
   MO.FUiDataColumn_onCellKeyDown = function FUiDataColumn_onCellKeyDown(s, e, he){
      var o = this;
      if(he){
         o.table.onCellKeyDown(s, e, he);
      }
   }
   MO.FUiDataColumn_oeMode = function FUiDataColumn_oeMode(e){
      var o = this;
      if(e.isAfter()){
         var d = false;
         if(EAction.Design == e.mode){
            d = o.dispDesign;
         }else{
            d = o._displayList;
         }
         o.inModeDisplay = d;
         o.setVisible(d);
      }
      return EEventStatus.Continue;
   }
   MO.FUiDataColumn_oeRefresh = function FUiDataColumn_oeRefresh(e) {
      var o = this;
      if(e.isBefore()){
         o.setVisible(o._displayList);
      }
   }
   MO.FUiDataColumn_onDataKeyDown = function FUiDataColumn_onDataKeyDown(s, e) {
      var o = this;
      o.__base.MEditDescriptor.onDataKeyDown.call(o, s, e);
   }
   MO.FUiDataColumn_onDataChanged = function FUiDataColumn_onDataChanged(s, e) {
      var o = this;
      o.table.setDataStatus(s.row, EDataStatus.Update);
   }
   MO.FUiDataColumn_onEditBegin = function FUiDataColumn_onEditBegin(editor) {
      var o = this;
      var row = editor.row;
      o.editor = editor;
      o.table.editRow = row;
      o.table.editColumn = o;
      o.table.select(row, true);
      MO.Logger.debug(o, 'Edit begin (column={1} row={2} editor={3})', o.name, RClass.dump(row), RClass.dump(editor));
   }
   MO.FUiDataColumn_onEditEnd = function FUiDataColumn_onEditEnd(e) {
      var o = this;
      var row = editor.row;
      var text = editor.text();
      o.setValue(row, o.formatValue(text));
      o.setText(row, text);
      o.table.setDataStatus(row, row.isChanged() ? EDataStatus.Update : EDataStatus.Unknown)
      o.editor = null;
      MO.Logger.debug(o, '{1}={2}\n{3}\n{4}', RClass.dump(editor), o.formatValue(text), o.dump(), row.dump());
   }
   MO.FUiDataColumn_onEditChanged = function FUiDataColumn_onEditChanged(cell) {
      cell.row.refresh();
   }
   MO.FUiDataColumn_onHeadMouseDown = function FUiDataColumn_onHeadMouseDown(e) {
      var o = this;
      var tbl = o.table;
      var ct = tbl.dsViewer.count;
      var x = e.x;
      if(!RClass.isClass(o, FUiDataColumnButton)){
   	   var l = o._hPanel.offsetWidth;
   	   var r = l - 6;
   	   if (x > 0 && x < r) {
   	      if (ct > 0 && !RClass.isClass(e.source, FUiDataColumnStatus)) {
   	         var cs = tbl.columns;
   	         var len = cs.count;
   	         for ( var n = 0; n < len; n++) {
   	            var c = cs.value(n);
   	            c._hSortUp.style.display = 'none';
   	            c._hSortDown.style.display = 'none';
   	         }
   	         tbl.dsOrders.clear();
   	         var oi = new TOrderItem();
   	         var n = o.dataName;
   	         if (o.sortType) {
   	            oi.set(n, EOrder.Desc);
   	            o._hSortUp.style.display = 'none';
   	            o._hSortDown.style.display = 'block';
   	         } else {
   	            o._hSortUp.style.display = 'block';
   	            o._hSortDown.style.display = 'none';
   	            oi.set(n, EOrder.Asc);
   	         }
   	         o.sortType = !o.sortType;
   	         tbl.dsOrders.push(oi);
   	         tbl.dsSearch();
   	      }
      }
      }
   }
   MO.FUiDataColumn_onRowClick = function FUiDataColumn_onRowClick(s, e){
      RConsole.find(FListenerConsole).process(FGridControl, EGridAction.RowClick, s.row, s.row);
   }
   MO.FUiDataColumn_createMoveable = function FUiDataColumn_createMoveable(p) {
      var o = this;
      var r = o.cloneMove;
      if (!r) {
         r = RClass.create(o.constructor);
         r.buildMode = EColumnMode.Drag;
         r.assign(o, EAssign.Property);
         r.build();
         o.cloneMove = r;
      }
      var hc = o.panel(EPanel.Move);
      var hr = r.panel(EPanel.Move);
      RHtml.setPixelRect(hr, RHtml.rect(hc));
      hr.className = r.styleName('DesignMove');
      hr.style.pixelLeft = hc.offsetLeft;
      r.show();
      return r;
   }
   MO.FUiDataColumn_searchValue = function FUiDataColumn_searchValue() {
      var o = this;
      if(o._hSearchEdit){
         return o._hSearchEdit.value;
      }
   }
   MO.FUiDataColumn_setStyleStatus = function FUiDataColumn_setStyleStatus(row, status) {
      var o = this;
      var h = o.cell(row);
      if (h) {
         var s = h.style;
         switch (status) {
         case EStyle.Normal:
            if (row.isDelete()) {
               s.backgroundColor = EColor.Delete;
            } else {
               if (o.isEditAble(row)) {
                  s.backgroundColor = EColor.Edit;
               } else {
                  s.backgroundColor = EColor.Readonly;
               }
            }
            break;
         case EStyle.Select:
            if (row.isDelete()) {
               s.backgroundColor = EColor.Select;
            } else {
               s.textDecoration = 'none';
               if (o.isEditAble(row)) {
                  s.backgroundColor = EColor.RowEditSelect;
               } else {
                  s.backgroundColor = EColor.Select;
               }
            }
            break;
         case EStyle.Delete:
            s.textDecoration = 'line-through';
            s.backgroundColor = EColor.Select;
            break;
         }
      }
   }
   MO.FUiDataColumn_cell = function FUiDataColumn_cell(r){
      return r.cell(this.index);
   }
   MO.FUiDataColumn_equalsValue = function FUiDataColumn_equalsValue(s, t) {
      return RString.nvl(s).replace(/\n/g, '\\n').replace(/\r/g, '\\r') == RString.nvl(t).replace(/\n/g, '\\n').replace(/\r/g, '\\r');
   }
   MO.FUiDataColumn_setWidth = function FUiDataColumn_setWidth(w){
      var o = this;
      o._hPanel.style.pixelWidth = w;
      o._hFixPanel.style.pixelWidth = w;
   }
   MO.FUiDataColumn_setVisible = function FUiDataColumn_setVisible(v){
      var o = this;
      o.isDisplay = v;
      var s = v ? 'block' : 'none';
      o._hPanel.style.display = s;
      o._hSearchPanel.style.display = s;
      o._hTotalPanel.style.display = s;
      o._hFixPanel.style.display = s;
   }
   MO.FUiDataColumn_moveCellFocus = function FUiDataColumn_moveCellFocus(row, p) {
      var o = this;
      var t = o.table;
      var mt = null;
      var mr = null;
      var mc = null;
      if(EPosition.Top == p){
         mt = o;
         mr = t.rows.get(t.rows.indexOf(row) - 1);
         if(mr){
            mc = mr.cell(mt.index);
         }
      }else if(EPosition.Bottom == p){
         mt = o;
         mr = t.rows.get(t.rows.indexOf(row) + 1);
         if(mr){
            mc = mr.cell(mt.index);
         }
      }else if (EPosition.Before == p){
         var fi = o.index - 1;
         var ri = t.rows.indexOf(row);
         for(var n = ri; n >= 0; n--){
            var fr = t.rows.get(n);
            for( var i = fi; i >= 0; i--){
               var ft = t.columns.value(i);
               if(RClass.isClass(ft, FUiDataColumn) && ft._displayList){
                  mt = ft;
                  mr = fr;
                  mc = mr.cell(mt.index);
                  break;
               }
            }
            if(mt){
               break;
            }
            fi = t.columns.count - 1;
         }
      }else if(EPosition.After == p){
         var fi = o.index + 1;
         var ri = t.rows.indexOf(row);
         var cc = t.columns.count;
         var rc = t.rows.count;
         for(var n = ri; n < rc; n++){
            var fr = t.rows.get(n);
            for(var i = fi; i < cc; i++){
               var ft = t.columns.value(i);
               if(RClass.isClass(ft, FUiDataColumn) && ft._displayList){
                  mt = ft;
                  mr = fr;
                  mc = mr.cell(mt.index);
                  break;
               }
            }
            if(mt){
               break;
            }
            fi = 0;
         }
      }
      if(mt && mr && mc){
         mc.focus(true);
         RConsole.find(FFocusConsole).focus(mc);
      }
   }
   MO.FUiDataColumn_getEditRange = function FUiDataColumn_getEditRange(){
      var o = this;
      var hc = o._hSearchPanel;
      var p = RHtml.offsetPosition(hc);
      var w = hc.offsetWidth;
      var h = hc.offsetHeight;
      return new TRange(p.x, p.y, w, h);
   }
   MO.FUiDataColumn_dispose = function FUiDataColumn_dispose(){
      var o = this;
      o.__base.FControl.dispose.call(o);
      RMemory.freeHtml(o._hSearchPanel);
      RMemory.freeHtml(o._hFixPanel);
      o._hForm = null;
      o._hFormLine = null;
      o._hIconPanel = null;
      o._hIcon = null;
      o._hHeadPanel = null;
      o._hLabel = null;
      o._hSortPanel = null;
      o._hSortUp = null;
      o._hSortDown = null;
      o._hSearchPanel = null;
      o._hSearchForm = null;
      o._hSearchFormLine = null;
      o._hSearchIconPanel = null;
      o._hSearchIcon = null;
      o._hSearchEditPanel = null;
      o._hSearchEdit = null;
      o._hSearchDropPanel = null;
      o._hSearchDrop = null;
      o._hFixPanel = null;
   }
   MO.FUiDataColumn_dump = function FUiDataColumn_dump(s) {
      var o = this;
      s = RString.nvlStr(s);
      s.append(RClass.dump(o), '[');
      s.append('name=', o.name);
      s.appendIf(o.icon, ',icon=', o.icon);
      s.appendIf(o.label, ',label=', o.label);
      s.appendIf(o.align, ',align=', o.align);
      s.appendIf(o.valign, ',valign=', o.valign);
      s.appendIf(o.dataName, ',dataName=', o.dataName);
      s.appendIf(o.dataDefault, ',dataDefault=', o.dataDefault);
      s.appendIf(o.index, ',index=', o.index);
      s.append(']');
      s.append(' [editAccess=');
      s.append(o.editInsert ? 'I' : '_');
      s.append(o.editUpdate ? 'U' : '_');
      s.append(']');
      return s;
   }
}
with(MO){
   MO.FUiDataToolBar = function FUiDataToolBar(o){
      o = RClass.inherits(this, o, FUiToolBar);
      return o;
   }
}
with(MO){
   MO.FUiDataToolButton = function FUiDataToolButton(o){
      o = RClass.inherits(this, o, FUiToolButton);
      o._serviceName     = RClass.register(o, new APtyString('_serviceName'));
      return o;
   }
   MO.FUiDataToolButton_click = function FUiDataToolButton_click(){
      var o = this;
      MO.Logger.debug(o, 'Mouse button click. (label={1})' + o._label);
         o.processClickListener(o);
   }
   MO.FUiDataToolButton_onShowHint = function FUiDataToolButton_onShowHint(a){
      var o = this;
      a.status = EActive.Finish;
      if(o.hintBox){
         o.hintBox.show();
      }
   }
}
with(MO){
   MO.FUiDataTreeView = function FUiDataTreeView(o){
      o = RClass.inherits(this, o, FUiTreeView);
      o._serviceCode     = RClass.register(o, new APtyString('_serviceCode', 'service'));
      o._statusLoading   = false;
      o.lsnsLoaded       = new TListeners();
      o.lsnsNodeLoad     = new TListeners();
      o.lsnsNodeLoaded   = new TListeners();
      o.onLoaded         = FUiDataTreeView_onLoaded;
      o.onNodeLoaded     = FUiDataTreeView_onNodeLoaded;
      o.construct        = FUiDataTreeView_construct;
      o.innerBuildNode   = FUiDataTreeView_innerBuildNode;
      o.loadNode         = FUiDataTreeView_loadNode;
      o.loadUrl          = FUiDataTreeView_loadUrl;
      o.loadService      = FUiDataTreeView_loadService;
      o.dispose          = FUiDataTreeView_dispose;
      return o;
   }
   MO.FUiDataTreeView_onLoaded = function FUiDataTreeView_onLoaded(p){
      var o = this;
      var x = p.root;
      if(x == null){
         throw new TError(o, 'Load tree data failure.');
      }
      var xt = x.find('TreeView');
      RUiControl.build(o, xt, null, o._hPanel);
      o.lsnsLoaded.process(p);
      var serviceCode = xt.get('service');
      if(serviceCode){
         o.loadService(serviceCode);
      }
   }
   MO.FUiDataTreeView_onNodeLoaded = function FUiDataTreeView_onNodeLoaded(event){
      var o = this;
      var xroot = event.root;
      if(!xroot){
         throw new TError(o, 'Load tree data failure.');
      }
      var parentNode = event.connection.parentNode;
      var ln = o._loadingNode;
      if(ln._hPanel.parentElement){
         o._hNodeRows.removeChild(ln._hPanel);
      }
      o._statusLoading = false;
      o.innerBuildNode(parentNode, xroot);
      o.lsnsNodeLoaded.process(event);
   }
   MO.FUiDataTreeView_construct = function FUiDataTreeView_construct(){
      var o = this;
      o.__base.FUiTreeView.construct.call(o);
   }
   MO.FUiDataTreeView_innerBuildNode = function FUiDataTreeView_innerBuildNode(parent, xconfig){
      var o = this;
      var xnodes = xconfig._nodes;
      if(xnodes){
         var count = xnodes.count();
         for(var i = 0; i < count; i++){
            var xnode = xnodes.get(i);
            if(xnode.isName('TreeNode')){
               var node = o.createNode();
               node.loadConfig(xnode);
               if(parent){
                  parent.push(node);
               }else{
                  o.push(node);
               }
               o.appendNode(node, parent);
               if(xnode.hasNode()){
                  o.innerBuildNode(node, xnode);
                  node.extend(false);
               }
            }
         }
      }
      if(parent){
         parent.calculateImage();
      }
   }
   MO.FUiDataTreeView_loadNode = function FUiDataTreeView_loadNode(node, refresh){
      var o = this;
      o._statusLoading = true;
      node.removeChildren();
      var type = null;
      var findNode = node;
      var serviceCode = o._serviceCode;
      while(RClass.isClass(findNode, FUiTreeNode)){
         type = findNode.type();
         if(type && type._service){
            serviceCode = type._service;
            break;
         }
         findNode = findNode._parent;
      }
      if(!serviceCode){
         throw new TError(o, 'Unknown service code.');
      }
      var service = RUiService.parse(serviceCode);
      if(!service){
         throw new TError(o, 'Unknown service.');
      }
      var findNode = node;
      while(RClass.isClass(fn, FUiTreeNode)){
         type = findNode.type();
         if(type && type._action){
            break;
         }
         findNode = findNode._parent;
      }
      var action = RString.nvl(type._action, service.action);
      if(!action){
         throw new TError(o, 'Unknown service action.');
      }
      o.lsnsNodeLoad.process(o, node);
      var xd = new TXmlDocument();
      var x = xd.root();
      x.set('action', action);
      x.set('type', type._linker);
      x.create('Attributes', o._attributes);
      var fn = node;
      while(RClass.isClass(fn, FUiTreeNode)){
         x = x.create('TreeNode');
         fn.propertySave(x);
         fn = fn._parent;
      }
      node._extended = true;
      if(node._child && node._hImage){
         node._hImage.src = RResource.iconPath(o._iconMinus);
      }
      var ln = o._loadingNode;
      var lastNode = node.searchLast();
      var nr = lastNode._hPanel.rowIndex;
      o._hNodeRows.appendChild(ln._hPanel);
      RHtml.tableMoveRow(o._hNodeForm, ln._hPanel.rowIndex, nr + 1);
      ln.setLevel(node.level() + 1);
      var url = RUiService.makeUrl(service.service, action);
      var connection = RConsole.find(FXmlConsole).sendAsync(url, xd);
      connection.parentNode = node;
      connection.addLoadListener(o, o.onNodeLoaded);
   }
   MO.FUiDataTreeView_loadUrl = function FUiDataTreeView_loadUrl(url, node){
      var o = this;
      var connection = RConsole.find(FXmlConsole).sendAsync(url);
      connection.addLoadListener(o, o.onLoaded);
   }
   MO.FUiDataTreeView_loadService = function FUiDataTreeView_loadService(serviceCode, attributes){
      var o = this;
      o.clear();
      if(!serviceCode){
         serviceCode = o._serviceCode;
      }
      var service = RUiService.parse(serviceCode);
      if(!service){
         return alert('Unknown service');
      }
      attributes = RObject.nvl(attributes, o._attributes);
      var xdocument = new TXmlDocument();
      var xroot = xdocument.root();
      xroot.set('action', service.action);
      RConsole.find(FUiEnvironmentConsole).build(xroot);
      if(!attributes.isEmpty()){
         if(RClass.isClass(attributes, TNode)){
            xr.push(attributes);
         }if(RClass.isClass(attributes, TAttributes)){
            xr.create('Tree').attributes = attributes;
            xr.create('Attributes').attributes = attributes;
         }else{
            xr.create('Tree').value = attributes;
            xr.create('Attributes').value = attributes;
         }
      }
      o._focusNode = null;
      var connection = RConsole.find(FXmlConsole).sendAsync(service.url, xdocument);
      connection.addLoadListener(o, o.onNodeLoaded);
   }
   MO.FUiDataTreeView_dispose = function FUiDataTreeView_dispose(){
      var o = this;
      o.__base.FUiTreeView.dispose.call(o);
   }
   MO.FUiDataTreeView_load = function FUiDataTreeView_load(p){
      var o = this;
      o.loadService(o._serviceCode);
   }
   MO.FUiDataTreeView_reload = function FUiDataTreeView_reload(){
      var o = this;
      o.clear();
      o.loadUrl();
   }
   MO.FUiDataTreeView_loadNodeUrl = function FUiDataTreeView_loadNodeUrl(p, n){
      var o = this;
      var xc = RConsole.find(FXmlConsole);
      var c = xc.sendAsync(p);
      c.parentNode = RObject.nvl(n, o._focusNode);
      c.addLoadListener(o, o.onNodeLoaded);
   }
   MO.FUiDataTreeView_reloadService = function FUiDataTreeView_reloadService(serviceCode, attributes){
      var o = this;
      o.clear();
      return o.loadService(serviceCode, attributes)
   }
   MO.FUiDataTreeView_loadNodeService = function FUiDataTreeView_loadNodeService(ps, pa){
      var o = this;
      var svc = RUiService.parse(RString.nvl(ps, o._service));
      if(!svc){
         throw new TError(o, 'Unknown service.');
      }
      var as = RObject.nvl(pa, o._attributes);
      var xd = new TXmlDocument();
      var xr = xd.root();
      xr.set('action', svc.action);
      if(!as.isEmpty()){
         if(RClass.isClass(as, TNode)){
            xr.push(attrs);
         }if(RClass.isClass(as, TAttributes)){
         }else{
         }
      }
      var ln = o._loadingNode;
      var xc = RConsole.find(FXmlConsole);
      var c = xc.sendAsync(svc.url, xr);
      c.parentNode = o._focusNode;
      c.addLoadListener(o, o.onNodeLoaded);
   }
   MO.FUiDataTreeView_reloadNode = function FUiDataTreeView_reloadNode(n){
      var o = this;
      n = RObject.nvl(n, o._focusNode);
      if(!n){
         return o.reload();
      }
      n.removeChildren();
      o.loadNode(n);
   }
   MO.FUiDataTreeView_onQueryLoaded = function FUiDataTreeView_onQueryLoaded(e){
      var o = this;
      var doc = e.document;
      if(doc){
         var tvn = doc.root().find('TreeView');
         if(tvn && tvn._nodes){
            var nc = tvn._nodes.count;
            for(var n=0; n<nc; n++){
               var nd = tvn._nodes.get(n);
               if(nd.isName('TreeNode')){
                  var nm = nd.get('name');
                  var fd = o.findByName(nm);
                  if(fd){
                     fd.loadQuery(nd);
                  }
               }
            }
         }
      }
   }
   MO.FUiDataTreeView_doQuery = function FUiDataTreeView_doQuery(){
      var o = this;
      var svc = RUiService.parse(o._queryService);
      if(!svc){
         return alert('Unknown query service');
      }
      var doc = new TXmlDocument();
      var root = doc.root();
      root.set('action', svc.action);
      root.create('Attributes').attrs = o._attributes;
      var e = new TEvent(o, EXmlEvent.Send, o.onQueryLoaded);
      e.url = svc.url;
      e.document = doc;
      RConsole.find(FXmlConsole).process(e);
   }
   MO.FUiDataTreeView_fetchExtendsAll = function FUiDataTreeView_fetchExtendsAll(s){
      var o = this;
      if(s && RClass.isClass(s, FUiTreeNode)){
         fmMain.target = 'frmMain';
         fmMain.form_search.value = '';
         fmMain.form_order.value = '';
         fmMain.form_values.value = '';
         var type = node.type.typeName;
         if('table' == type || 'form' == type){
            fmMain.form_name.value = node.get('form');
            fmMain.action = top.RContext.context('/ent/apl/logic/form/InnerForm.wa?do=update');
            fmMain.submit();
         }else if('frameTree' == type){
            fmMain.action = top.RContext.context(node.get('redirect'));
            fmMain.submit();
         }
      }else{
      }
   }
}
