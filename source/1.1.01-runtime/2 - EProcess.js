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
   // @member 优化模式
   o.Release = 1;
   // @member 运行模式
   o.Process = 2;
   // @member 调试模式
   o.Debug   = 3;
   return o;
}
