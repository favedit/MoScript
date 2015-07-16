//==========================================================
// <T>浏览器类型枚举。</T>
//
// @enum
// @author maocy
// @version 141229
//==========================================================
MO.EBrowser = new function EBrowser(){
   var o = this;
   // @member
   o.Unknown = 'unknown';
   // @member Microsoft InternetExploer
   o.Explorer = 'explorer';
   // @member FireFox
   o.FireFox = 'firefox';
   // @member Google Chrome
   o.Chrome = 'chrome';
   // @member Apple Safari
   o.Safari = 'safari';
   return o;
}
