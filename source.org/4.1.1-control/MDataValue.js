//==========================================================
// <T>数据内容的接口。</T>
//
// @face
// @author maocy
// @version 150124
//==========================================================
function MDataValue(o){
   o = RClass.inherits(this, o);
   //..........................................................
   // @process
   o.oeDataLoad = RMethod.empty;
   o.oeDataSave = RMethod.empty;
   return o;
}
