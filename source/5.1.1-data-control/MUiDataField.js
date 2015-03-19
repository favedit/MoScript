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
   o._dataName       = RClass.register(o, new APtyString('_dataName'));
   //..........................................................
   // @process
   o.oeDataLoadValue = MUiDataField_oeDataLoadValue;
   o.oeDataSaveValue = MUiDataField_oeDataSaveValue;
   return o;
}

//==========================================================
// <T>数据源从加载数据处理。</T>
//
// @method
// @param p:dataSource:FDataSource 数据源
//==========================================================
function MUiDataField_oeDataLoadValue(p){
   var o = this;
   var r = p.values;
   var v = r.get(o._dataName);
   o.set(v);
   return EEventStatus.Stop;
}

//==========================================================
// <T>存储数据到数据源处理。</T>
//
// @method
// @param p:dataSource:FDataSource 数据源
//==========================================================
function MUiDataField_oeDataSaveValue(p){
   var o = this;
   var v = o.get();
   var r = p.values;
   r.set(o._dataName, v);
   return EEventStatus.Stop;
}
