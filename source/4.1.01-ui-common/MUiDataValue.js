//==========================================================
// <T>数据内容的接口。</T>
//
// @face
// @author maocy
// @version 150812
//==========================================================
MO.MUiDataValue = function MUiDataValue(o){
   o = MO.Class.inherits(this, o, MUiValue);
   //..........................................................
   // @property
   o._dataValue = MO.Class.register(o, [new MO.APtyString('_dataValue'), new MO.AGetSet('_dataValue')]);
   //..........................................................
   // @process
   o.oeLoadUnit = MO.Method.empty;
   o.oeSaveUnit = MO.Method.empty;
   return o;
}
