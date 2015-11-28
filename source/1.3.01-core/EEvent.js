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
   o.Unknown          = 'Unknown';
   // @attribute 加载
   o.Load             = 'Load';
   // @attribute 加载完成
   o.Loaded           = 'Loaded';
   // @attribute 处理
   o.Process          = 'Process';
   // @attribute 完成
   o.Complete         = 'Complete';
   // @attribute 改变
   o.Change           = 'Change';
   // @attribute 进入帧
   o.EnterFrame       = 'EnterFrame';
   // @attribute 离开帧
   o.LeaveFrame       = 'LeaveFrame';
   // @attribute 获得热点
   o.Enter            = 'Enter';
   // @attribute 失去热点
   o.Leave            = 'Leave';
   // @attribute 改变大小
   o.Resize           = 'Reisze';
   // @attribute 获得焦点
   o.Focus            = 'Focus';
   // @attribute 失去焦点
   o.Blur             = 'Blur';
   // @attribute 鼠标落下
   o.MouseDown        = 'MouseDown';
   // @attribute 鼠标移动
   o.MouseMove        = 'MouseMove';
   // @attribute 鼠标抬起
   o.MouseUp          = 'MouseUp';
   // @attribute 鼠标卷动
   o.MouseWheel       = 'MouseWheel';
   // @attribute 按键落下
   o.KeyDown          = 'KeyDown';
   // @attribute 按键点击
   o.KeyPress         = 'KeyPress';
   // @attribute 按键落下
   o.KeyUp            = 'KeyUp';
   // @attribute 点击
   o.Click            = 'Click';
   // @attribute 双击
   o.DoubleClick      = 'DoubleClick';
   // @attribute 节点点击
   o.NodeClick        = 'NodeClick';
   // @attribute 项目点击
   o.ItemClick        = 'ItemClick';
   // @attribute 选择
   o.Selected         = 'Selected';
   // @attribute 数据改变
   o.DataChanged      = 'DataChanged';
   // @attribute 结果确认
   o.Result           = 'Result';
   // @attribute 触摸缩放
   o.TouchZoom        = 'TouchZoom';
   // @attribute 可见性
   o.Visibility       = 'Visibility';
   // @attribute 屏幕缩放
   o.Orientation      = 'Orientation';
   // @attribute 操作落下
   o.OperationDown    = 'OperationDown';
   // @attribute 操作移动
   o.OperationMove    = 'OperationMove';
   // @attribute 操作抬起
   o.OperationUp      = 'OperationUp';
   // @attribute 动画开始
   o.ActionStart      = 'ActionStart';
   // @attribute 动画停止
   o.ActionStop       = 'ActionStop';
   // @attribute 动画停止
   o.SectionStop      = 'SectionStop';
   return o;
}
