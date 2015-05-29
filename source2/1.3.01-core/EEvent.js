//==========================================================
// <T>事件枚举。</T>
//
// @enum(Integer)
// @author maocy
// @version 150130
//==========================================================
MO.EEvent = new function EEvent(){
   var o = this;
   // @attribute 未知
   o.Unknown     = 0;
   // @attribute 加载
   o.Load        = 1;
   // @attribute 处理
   o.Process     = 2;
   // @attribute 进入帧
   o.EnterFrame  = 3;
   // @attribute 离开帧
   o.LeaveFrame  = 4;
   // @attribute 获得热点
   o.Enter       = 5;
   // @attribute 失去热点
   o.Leave       = 6;
   // @attribute 获得焦点
   o.Focus       = 7;
   // @attribute 失去焦点
   o.Blur        = 8;
   // @attribute 点击
   o.Click       = 9;
   // @attribute 双击
   o.DoubleClick = 10;
   // @attribute 项目点击
   o.ItemClick   = 11;
   // @attribute 选择
   o.Selected    = 12;
   // @attribute 数据改变
   o.DataChanged = 13;
   // @attribute 结果确认
   o.Result      = 14;
   // @attribute 触摸缩放
   o.TouchZoom   = 'touch.zoom';
   return o;
}
