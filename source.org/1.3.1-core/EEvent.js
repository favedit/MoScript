//==========================================================
// <T>事件枚举。</T>
//
// @enum(Integer)
// @author maocy
// @version 150130
//==========================================================
var EEvent = new function EEvent(){
   var o = this;
   // @attribute 未知
   o.Unknown     = 0;
   // @attribute 加载
   o.Load        = 1;
   // @attribute 获得热点
   o.Enter       = 2;
   // @attribute 失去热点
   o.Leave       = 3;
   // @attribute 获得焦点
   o.Focus       = 4;
   // @attribute 失去焦点
   o.Blur        = 5;
   // @attribute 点击
   o.Click       = 6;
   // @attribute 双击
   o.DoubleClick = 7;
   // @attribute 项目点击
   o.ItemClick   = 8;
   // @attribute 选择
   o.Selected    = 9;
   // @attribute 数据改变
   o.DataChanged = 10;
   return o;
}
