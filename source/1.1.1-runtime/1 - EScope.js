//==========================================================
// <T>范围枚举。</T>
//
// @enum
// @author maocy
// @version 141230
//==========================================================
var EScope = new function EScope(){
   var o = this;
   // @member 本地空间
   o.Local = 1;
   // @member 页面内共享空间
   o.Session = 2;
   // @member 全局空间
   o.Global = 4;
   return o;
}
