//==========================================================
// <T>数据字段的接口。</T>
//
// @face
// @author maocy
// @version 150124
//==========================================================
function MUiDataField(o){
   o = RClass.inherits(this, o, MUiValue, MUiDataValue);
   //..........................................................
   // @property
   o._dataTypeCd     = RClass.register(o, new APtyString('_dataTypeCd'));
   o._dataRequire    = RClass.register(o, new APtyBoolean('_dataRequire'));
   o._dataName       = RClass.register(o, new APtyString('_dataName'));
   //..........................................................
   // @process
   o.oeDataLoadValue = MUiDataField_oeDataLoadValue;
   o.oeDataSaveValue = MUiDataField_oeDataSaveValue;
   //..........................................................
   // @method
   o.formatLoad      = MUiDataField_formatLoad;
   o.formatSave      = MUiDataField_formatSave;
   return o;
}

//==========================================================
// <T>数据源从加载数据处理。</T>
//
// @method
// @param dataSource:FDataSource 数据源
//==========================================================
function MUiDataField_oeDataLoadValue(dataSource){
   var o = this;
   var values = dataSource.values;
   var value = values.get(o._dataName);
   o.set(o.formatLoad(value));
   return EEventStatus.Stop;
}

//==========================================================
// <T>存储数据到数据源处理。</T>
//
// @method
// @param dataSource:FDataSource 数据源
//==========================================================
function MUiDataField_oeDataSaveValue(p){
   var o = this;
   var value = o.get();
   var values = dataSource.values;
   values.set(o._dataName, o.formatSave(value));
   return EEventStatus.Stop;
}

//==========================================================
// <T>格式化控件数据到存储内容。</T>
//
// @method
// @param value:String 控件数据
// @return Object 存储内容
//==========================================================
function MUiDataField_formatLoad(value){
   return value;
}

//==========================================================
// <T>格式化存储内容到控件数据。</T>
//
// @method
// @param value:Object 控件数据
// @return String 存储内容
//==========================================================
function MUiDataField_formatSave(value){
   return value;
}
