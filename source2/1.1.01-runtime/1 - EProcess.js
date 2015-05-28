//==========================================================
// <T>工作模式枚举。</T>
//
// @enum
// @author maocy
// @version 141226
//==========================================================
MO.EProcess = new function EProcess(){
   var o = this;
   // @member 优化模式
   o.Release = 0;
   // @member 运行模式
   o.Process = 1;
   // @member 调试模式
   o.Debug   = 2;
   return o;
}
