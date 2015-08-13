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
   // @attribute
   o._dataModeCd = MO.Class.register(o, new MO.AGetSet('_dataModeCd'), MO.EUiDataMode.View);
   //..........................................................
   // @method
   o.loadUnit    = MO.MUiDataContainer_loadUnit;
   o.saveUnit    = MO.MUiDataContainer_saveUnit;
   // @method
   o.dataView    = MO.MUiDataContainer_dataView;
   o.dataPrepare = MO.MUiDataContainer_dataPrepare;
   o.dataEdit    = MO.MUiDataContainer_dataEdit;
   o.dataDelete  = MO.MUiDataContainer_dataDelete;
   o.dataSave    = MO.MUiDataContainer_dataSave;
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
// <T>数据准备处理。</T>
//
// @method
//==========================================================
MO.MUiDataContainer_dataView = function MUiDataContainer_dataView(){
   var o = this;
   // 设置模式
   o._dataModeCd = MO.EUiDataMode.View;
   // 数据处理
   var event = new MO.SUiDispatchEvent(o, 'oeDataView', MO.MUiDataField);
   o.process(event);
   event.dispose();
}

//==========================================================
// <T>数据准备处理。</T>
//
// @method
//==========================================================
MO.MUiDataContainer_dataPrepare = function MUiDataContainer_dataPrepare(){
   var o = this;
   // 设置模式
   o._dataModeCd = MO.EUiDataMode.Insert;
   // 数据处理
   var event = new MO.SUiDispatchEvent(o, 'oeDataPrepare', MO.MUiDataField);
   o.process(event);
   event.dispose();
}

//==========================================================
// <T>数据删除处理。</T>
//
// @method
//==========================================================
MO.MUiDataContainer_dataEdit = function MUiDataContainer_dataEdit(){
   var o = this;
   // 设置模式
   o._dataModeCd = MO.EUiDataMode.Delete;
   // 数据处理
   var event = new MO.SUiDispatchEvent(o, 'oeDataEdit', MO.MUiDataField);
   o.process(event);
   event.dispose();
}

//==========================================================
// <T>数据删除处理。</T>
//
// @method
//==========================================================
MO.MUiDataContainer_dataDelete = function MUiDataContainer_dataDelete(){
   var o = this;
   // 设置模式
   o._dataModeCd = MO.EUiDataMode.Delete;
   // 数据处理
   var event = new MO.SUiDispatchEvent(o, 'oeDataDelete', MO.MUiDataField);
   o.process(event);
   event.dispose();
}

//==========================================================
// <T>数据更新处理。</T>
//
// @method
//==========================================================
MO.MUiDataContainer_dataSave = function MUiDataContainer_dataSave(){
   var o = this;
   // 设置模式
   o._dataModeCd = MO.EUiDataMode.View;
   // 数据处理
   var event = new MO.SUiDispatchEvent(o, 'oeDataSave', MO.MUiDataField);
   o.process(event);
   event.dispose();
}
