//===========================================================
// 该类是定义了节点类型的枚举类
//
// @enum
// @author maochunyang
// @version 1.0.1
//===========================================================
function ENodeTypeFace(){
   var o=this;
   ///@attribute Integer 内容可为一个结构
   o.Node = 1;
   ///@attribute Integer 内容为文本
   o.Text = 3;
   return o;
}
var ENodeType = new ENodeTypeFace();

