//==========================================================
// <T>日志类型枚举。</T>
//
// @enum
// @author maocy
// @version 141226
//==========================================================
MO.ELogger = new function ELogger(){
   var o = this;
   MO.TEnum.call(o);
   // @member 未知
   o.Unknown = 0;
   // @member 调试模式
   o.Debug   = 1;
   // @member 调试模式
   o.Info    = 2;
   // @member 调试模式
   o.Warn    = 3;
   // @member 调试模式
   o.Error   = 4;
   // @member 调试模式
   o.Fatal   = 5;
   return o;
}
