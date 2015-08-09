//==========================================================
// <T>范围枚举。</T>
//
// @enum
// @author maocy
// @version 141230
//==========================================================
MO.EScope = new function EScope(){
   var o = this;
   MO.TEnum.call(o);
   // @member 未知
   o.Unknown = 0;
   // @member 本地范围
   o.Local   = 1;
   // @member 会话范围
   o.Session = 2;
   // @member 全局范围
   o.Global  = 3;
   return o;
}
