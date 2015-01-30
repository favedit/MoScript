//==========================================================
// <T>数据字段的接口。</T>
//
// @face
// @author maocy
// @version 150124
//==========================================================
function MDataField(o){
   o = RClass.inherits(this, o, MDataValue);
   //..........................................................
   // @property
   o._dataName = RClass.register(o, new APtyString('_dataName'));
   return o;
}
