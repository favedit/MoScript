//==========================================================
// <T>数据管理类。</T>
//
// @reference
// @author maocy
// @version 150208
//==========================================================
var RValue = new function RValue(){
   var o = this;
   //..........................................................
   // @method
   o.nvl = RValue_nvl;
   return o;
}

//==========================================================
// <T>获得非空数据。</T>
//
// @param v:value:Number 数据
// @param d:default:Number 默认数据
// @return Number 非空数据
//==========================================================
function RValue_nvl(v, d){
   return (v != null) ? v : d;
}
