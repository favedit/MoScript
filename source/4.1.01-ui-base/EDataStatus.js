//==========================================================
// <T>数据状态。</T>
//
// @reference
// @author maocy
// @version 150901
//==========================================================
MO.EDataStatus = new function EDataStatus(){
   var o = this;
   //..........................................................
   // @member 未知
   o.Unknown = '';
   // @member 新建
   o.Insert = 'I';
   // @member 更新
   o.Update = 'U';
   // @member 删除
   o.Delete = 'D';
   return o;
}
