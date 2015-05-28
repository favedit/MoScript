//==========================================================
// <T>日志类型枚举。</T>
//
// @enum
// @author maocy
// @version 141226
//==========================================================
MO.ELogger = new function ELogger(){
   var o = this;
   // @member 调试模式
   o.Debug = 0;
   // @member 调试模式
   o.Info  = 1;
   // @member 调试模式
   o.Warn  = 2;
   // @member 调试模式
   o.Error = 3;
   // @member 调试模式
   o.Fatal = 4;
   return o;
}
