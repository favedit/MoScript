//==========================================================
// <T>节点类型枚举。</T>
//
// @enum
// @author maocy
// @version 150104
//==========================================================
MO.ENodeType = new function ENodeType(){
   var o = this;
   // @attribute 节点
   o.Node = 1;
   // @attribute 文本
   o.Text = 3;
   // @attribute 数据
   o.Data = 4;
   return o;
}
