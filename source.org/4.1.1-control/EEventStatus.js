//==========================================================
// <T>事件状态枚举。</T>
//
// @enum(Integer)
// @author maocy
// @version 141231
//==========================================================
var EEventStatus = new function EEventStatus(){
   var o = this;
   // @attribute 未知
   o.Unknown  = 0;
   // @attribute 继续
   o.Continue = 1;
   // @attribute 停止
   o.Stop     = 2;
   // @attribute 取消
   o.Cancel   = 3;
   // @attribute 失败
   o.Failure  = 4;
   return o;
}
