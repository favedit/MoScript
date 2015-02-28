//===========================================================
// <T>请求状态枚举。</T>
//
// @enum
// @author maocy
// @version 141230
//===========================================================
MO.EHttpStatus = new function EHttpStatus(){
   var o = this;
   // @attribute Integer 准备连接
   o.Begin   = 0;
   // @attribute Integer 初始化连接
   o.Build   = 1;
   // @attribute Integer 发送连接
   o.Send    = 2;
   // @attribute Integer 接收回馈消息
   o.Receive = 3;
   // @attribute Integer 完成连接
   o.Finish  = 4;
   return o;
}
