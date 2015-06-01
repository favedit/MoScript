//===========================================================
// <T>请求状态枚举。</T>
//
// @enum
// @author maocy
// @version 141230
//===========================================================
MO.EHttpStatus = new function EHttpStatus(){
   var o = this;
   // @attribute Integer 未初始化
   o.Uninitialized = 0;
   // @attribute Integer 打开
   o.Open          = 1;
   // @attribute Integer 发送
   o.Send          = 2;
   // @attribute Integer 接收中
   o.Receiving     = 3;
   // @attribute Integer 加载
   o.Loaded        = 4;
   return o;
}
