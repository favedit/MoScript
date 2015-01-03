//===========================================================
// <T>节点状态枚举。</T>
//
// @enum
// @author maocy
// @version 141230
// 该类是一个定义xml连接状态的枚举类
//===========================================================
var EXmlStatus = new function EXmlStatus(){
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
