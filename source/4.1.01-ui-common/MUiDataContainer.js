//==========================================================
// <T>数据内容的接口。</T>
//
// @face
// @author maocy
// @version 150124
//==========================================================
MO.MUiDataContainer = function MUiDataContainer(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @method
   o.loadUnit    = MO.MUiDataContainer_loadUnit;
   o.saveUnit    = MO.MUiDataContainer_saveUnit;
   // @method
   //o.loadDataset = MO.MUiDataContainer_loadDataset;
   //o.saveDataset = MO.MUiDataContainer_saveDataset;
   //..........................................................
   // @method
   //o.dsLoadValue = MUiDataContainer_dsLoadValue;
   //o.dsSaveValue = MUiDataContainer_dsSaveValue;
   return o;
}

//==========================================================
// <T>加载数据单元。</T>
//
// @method
// @param unit:TRow 数据单元
//==========================================================
MO.MUiDataContainer_loadUnit = function MUiDataContainer_loadUnit(unit){
   var o = this;
   var event = new MO.SUiDispatchEvent(o, 'oeLoadUnit', MO.MUiDataField);
   event.unit = unit;
   o.process(event);
   event.dispose();
}

//==========================================================
// <T>存储数据单元。</T>
//
// @method
// @param unit:TRow 数据单元
//==========================================================
MO.MUiDataContainer_saveUnit = function MUiDataContainer_saveUnit(unit){
   var o = this;
   var event = new MO.SUiDispatchEvent(o, 'oeSaveUnit', MO.MUiDataField);
   event.unit = unit;
   o.process(event);
   event.dispose();
}






//==========================================================
// <T>加载数据集合。</T>
//
// @method
// @param dataset:TDataset 数据集合
//==========================================================
//MO.MUiDataContainer_loadDataset = function MUiDataContainer_loadDataset(dataset){
//   var o = this;
//   var event = new MO.SUiDispatchEvent(o, 'oeLoadDataset', MO.MUiDataContainer);
//   event.dataset = dataset;
//   o.process(event);
//   event.dispose();
//}

//==========================================================
// <T>存储数据集合。</T>
//
// @method
// @param dataset:TDataset 数据集合
//==========================================================
//MO.MUiDataContainer_saveDataset = function MUiDataContainer_saveDataset(dataset){
//   var o = this;
//   var event = new MO.SUiDispatchEvent(o, 'oeSaveDataset', MO.MUiDataContainer);
//   event.dataset = dataset;
//   o.process(event);
//   event.dispose();
//}

//==========================================================
// <T>加载数据对象到到画面各个控件中。</T>
//
// @event
// @param r:row:TRow 行对象
// @param m:mode:EStore 存储模式
//==========================================================
//MO.MUiDataContainer_dsLoadValue = function MUiDataContainer_dsLoadValue(r, m){
//   var o = this;
//   // 纷发处理
//   var e = new MO.TEventProcess(o, 'oeDataLoadValue', MUiDataValue);
//   e.viewer = o._dataViewer;
//   e.store = m;
//   e.values = r;
//   o.process(e);
//}

//==========================================================
// <T>从画面各个控件存储数据到存储数据中。</T>
//
// @event
// @param r:row:TRow 行对象
// @param m:storeCd:EUiDataStore 存储模式
//==========================================================
//MO.MUiDataContainer_dsSaveValue = function MUiDataContainer_dsSaveValue(r, m){
//   var o = this;
//   if(!r){
//      r = new MO.TRow();
//   }
//   // 存储数据内容
//   var e = new MO.TEventProcess(o, 'oeDataSaveValue', MUiDataValue);
//   e.viewer = o._dataViewer;
//   e.store = m;
//   e.values = r;
//   o.process(e);
//   // 设置数据状态
//   r.set('_status', o._dataStatusCd);
//   return r;
//}
