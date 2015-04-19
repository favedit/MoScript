//==========================================================
// <T>数据内容的接口。</T>
//
// @face
// @author maocy
// @version 150124
//==========================================================
function MUiDataValue(o){
   o = RClass.inherits(this, o);
   //..........................................................
   // @process
   o.oeDataLoadValue = RMethod.empty;
   o.oeDataSaveValue = RMethod.empty;
   return o;
}
