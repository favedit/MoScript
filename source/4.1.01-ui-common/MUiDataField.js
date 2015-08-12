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
   o._dataName    = MO.Class.register(o, [new MO.APtyString('_dataName'), new MO.AGetSet('_dataName')]);
   o._dataTypeCd  = MO.Class.register(o, [new MO.APtyString('_dataTypeCd'), new MO.AGetSet('_dataTypeCd')], MO.EDataType.String);
   o._dataRequire = MO.Class.register(o, [new MO.APtyBoolean('_dataRequire'), new MO.AGetSet('_dataRequire')]);
   o._dataDefault = MO.Class.register(o, [new MO.APtyBoolean('_dataDefault'), new MO.AGetSet('_dataDefault')]);
   return o;
}
