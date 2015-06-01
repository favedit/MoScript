//==========================================================
// <T>事件调用枚举。</T>
//
// @enum(Integer)
// @author maocy
// @version 141231
//==========================================================
MO.EEventInvoke = new function EEventInvoke(){
   var o = this;
   // @attribute 未知
   o.Unknown = 0;
   // @attribute 调用前
   o.Before  = 1;
   // @attribute 调用后
   o.After   = 2;
   return o;
}
