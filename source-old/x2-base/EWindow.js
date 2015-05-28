//==========================================================
// <T>窗口类型</T>
//
// @enum
// @history 091106 MAOCY 创建
//==========================================================
function EWindowFace(){
   var o = this;
   // member
   o.Form     = 'F';
   o.Dialog   = 'D';
   o.Batch    = 'A';
   o.ListView = 'L';
   o.Browser  = 'B';
   return o;
}
var EWindow = new EWindowFace();
