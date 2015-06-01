//==========================================================
// <T>模式定义。</T>
//
// @enum
// @history 091125 MAOCY 创建
//==========================================================
var EDateTimeMode = new function(){
   var o = this;
   // @member 显示
   o.Year = 'Y';
   // @member 搜索
   o.Month = 'M';
   // @member 设计
   o.Day = 'D';
   // @member 新建
   o.Hour  = 'H';
   // @member 修改
   o.Minute = 'T';
   // @member 删除
   o.Second = 'S';
   return o;
}
