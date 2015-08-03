//==========================================================
// <T>工作模式枚举。</T>
//
// @enum
// @author maocy
// @version 141226
//==========================================================
MO.EProcess = new function EProcess(){
   var o = this;
   MO.TEnum.call(o);
   // @member 未知
   o.Unknown = 0;
   // @member 调试模式
   o.Debug   = 1;
   // @member 运行模式
   o.Release = 2;
   return o;
}
