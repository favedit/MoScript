//==========================================================
// <T>平台模式枚举。</T>
//
// @enum
// @author maocy
// @version 150701
//==========================================================
MO.EPlatform = new function EPlatform(){
   var o = this;
   MO.TEnum.call(o);
   // @member 未知
   o.Unknown = 0;
   // @member PC平台
   o.Pc      = 1;
   // @member 移动平台
   o.Mobile  = 2;
   return o;
}
