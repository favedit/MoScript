//==========================================================
// <T>事件类型枚举。</T>
//
// @enum(Integer)
// @author maocy
// @version 141231
//==========================================================
MO.EEventType = new function EEventType(){
   var o = this;
   // @attribute 未知
   o.Unknown    = 0;
   // @attribute 构造
   o.Construct  = 1;
   // @attribute 初始化
   o.Initialize = 2;
   // @attribute 可视化框架
   o.Build      = 3;
   // @attribute 刷新
   o.Refresh    = 4;
   // @attribute 改变大小
   o.Resize     = 5;
   // @attribute 更改可视化
   o.Visible    = 6;
   // @attribute 显示
   o.Show       = 7;
   // @attribute 隐藏
   o.Hidden     = 8;
   // @attribute 允许
   o.Enable     = 9;
   // @attribute 禁止
   o.Disable    = 10;
   // @attribute 释放
   o.Release    = 11;
   // @attribute 设计
   o.Design     = 12;
   // @attribute 命令
   o.Action     = 13;
   // @attribute 校验
   o.Valid      = 14;
   // @attribute 模式
   o.Mode       = 15;
   return o;
}
