//==========================================================
// <T>浏览器类型枚举。</T>
//
// @enum
// @author maocy
// @version 141229
//==========================================================
var EBrowser = new function EBrowser(){
   var o = this;
   // @member
   o.Unknown = 0;
   // @member Microsoft InternetExploer
   o.Explorer = 1;
   // @member FireFox
   o.FireFox = 2;
   // @member Google Chrome
   o.Chrome = 3;
   // @member Apple Safari
   o.Safari = 4;
   return o;
}
