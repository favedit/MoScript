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
   o.Unknown       = 'Unknown';
   // @attribute 加载
   o.Load          = 'Load';
   // @attribute 处理
   o.Process       = 'Process';
   // @attribute 进入帧
   o.EnterFrame    = 'EnterFrame';
   // @attribute 离开帧
   o.LeaveFrame    = 'LeaveFrame';
   // @attribute 获得热点
   o.Enter         = 'Enter';
   // @attribute 失去热点
   o.Leave         = 'Leave';
   // @attribute 改变大小
   o.Resize        = 'Reisze';
   // @attribute 获得焦点
   o.Focus         = 'Focus';
   // @attribute 失去焦点
   o.Blur          = 'Blur';
   // @attribute 操作落下
   o.OperationDown = 'OperationDown';
   // @attribute 操作移动
   o.OperationMove = 'OperationMove';
   // @attribute 操作抬起
   o.OperationUp   = 'OperationUp';
   // @attribute 操作大小
   o.OperationResize = 'OperationResize';
   // @attribute 鼠标落下
   o.MouseDown     = 'MouseDown';
   // @attribute 鼠标移动
   o.MouseMove     = 'MouseMove';
   // @attribute 鼠标抬起
   o.MouseUp       = 'MouseUp';
   // @attribute 鼠标卷动
   o.MouseWheel    = 'MouseWheel';
   // @attribute 点击
   o.Click         = 'Click';
   // @attribute 双击
   o.DoubleClick   = 'DoubleClick';
   // @attribute 节点点击
   o.NodeClick     = 'NodeClick';
   // @attribute 项目点击
   o.ItemClick     = 'ItemClick';
   // @attribute 选择
   o.Selected      = 'Selected';
   // @attribute 数据改变
   o.DataChanged   = 'DataChanged';
   // @attribute 结果确认
   o.Result        = 'Result';
   // @attribute 触摸缩放
   o.TouchZoom     = 'TouchZoom';
   return o;
}
