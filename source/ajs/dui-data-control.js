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
      o = RClass.inherits(this, o, MDuiContainer);
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
