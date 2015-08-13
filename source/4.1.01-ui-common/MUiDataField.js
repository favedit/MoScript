//==========================================================
// <T>数据字段的接口。</T>
//
// @face
// @author maocy
// @version 150812
//==========================================================
MO.MUiDataField = function MUiDataField(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @property
   o._dataName     = MO.Class.register(o, [new MO.APtyString('_dataName'), new MO.AGetSet('_dataName')]);
   o._dataTypeCd   = MO.Class.register(o, [new MO.APtyString('_dataTypeCd'), new MO.AGetSet('_dataTypeCd')], MO.EDataType.String);
   o._dataRequire  = MO.Class.register(o, [new MO.APtyBoolean('_dataRequire'), new MO.AGetSet('_dataRequire')]);
   o._dataDefault  = MO.Class.register(o, [new MO.APtyString('_dataDefault'), new MO.AGetSet('_dataDefault')]);
   //..........................................................
   // @process
   o.oeDataPrepare = MO.MUiDataField_oeDataPrepare;
   return o;
}

//==========================================================
// <T>数据准备处理响应。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.MUiDataField_oeDataPrepare = function MUiDataField_oeDataPrepare(event){
   var o = this;
   if(event.isAfter()){
      o.set(o._dataDefault);
   }
   return MO.EEventStatus.Continue;
}
