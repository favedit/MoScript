with(MO){
   //==========================================================
   // <T>数据内容的接口。</T>
   //
   // @face
   // @author maocy
   // @version 150124
   //==========================================================
   MO.MUiDataContainer = function MUiDataContainer(o){
      o = RClass.inherits(this, o, MDuiContainer);
      //..........................................................
      // @method
      o.dsDataLoad = MUiDataContainer_dsDataLoad;
      o.dsDataSave = MUiDataContainer_dsDataSave;
      //..........................................................
      // @method
      o.dsLoadValue = MUiDataContainer_dsLoadValue;
      o.dsSaveValue = MUiDataContainer_dsSaveValue;
      return o;
   }

   //==========================================================
   // <T>数据源从加载数据。</T>
   //
   // @method
   // @param p:dataSource:FDataSource 数据源
   //==========================================================
   MO.MUiDataContainer_dsDataLoad = function MUiDataContainer_dsDataLoad(p){
      var o = this;
      var e = new TEventProcess(null, o, 'oeDataLoad', MDataValue);
      e.source = p;
      o.process(e);
      e.dispose();
   }

   //==========================================================
   // <T>存储数据到数据源。</T>
   //
   // @method
   // @param p:dataSource:FDataSource 数据源
   //==========================================================
   MO.MUiDataContainer_dsDataSave = function MUiDataContainer_dsDataSave(p){
      var o = this;
      var e = new TEventProcess(null, o, 'oeDataSave', MDataValue);
      e.source = p;
      o.process(e);
      e.dispose();
   }

   //==========================================================
   // <T>加载数据对象到到画面各个控件中。</T>
   //
   // @event
   // @param r:row:TRow 行对象
   // @param m:mode:EStore 存储模式
   //==========================================================
   MO.MUiDataContainer_dsLoadValue = function MUiDataContainer_dsLoadValue(r, m){
      var o = this;
      // 纷发处理
      var e = new TEventProcess(o, 'oeDataLoadValue', MUiDataValue);
      e.viewer = o._dataViewer;
      e.store = m;
      e.values = r;
      o.process(e);
   }

   //==========================================================
   // <T>从画面各个控件存储数据到存储数据中。</T>
   //
   // @event
   // @param r:row:TRow 行对象
   // @param m:storeCd:EUiDataStore 存储模式
   //==========================================================
   MO.MUiDataContainer_dsSaveValue = function MUiDataContainer_dsSaveValue(r, m){
      var o = this;
      if(!r){
         r = new TRow();
      }
      // 存储数据内容
      var e = new TEventProcess(o, 'oeDataSaveValue', MUiDataValue);
      e.viewer = o._dataViewer;
      e.store = m;
      e.values = r;
      o.process(e);
      // 设置数据状态
      r.set('_status', o._dataStatusCd);
      return r;
   }
}
