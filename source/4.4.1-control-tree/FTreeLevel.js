/**************************************************************
 * 书目录节点层次,主要定义节点的颜色
 *
 * @control
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function FTreeLevel(o){
   o = RClass.inherits(this, o, FControl);
   // Property
   o.id           = RClass.register(o, new TPtyStr('id'));
   o.color        = RClass.register(o, new TPtyStr('color'));
   o.bgColor      = RClass.register(o, new TPtyStr('bgColor'));
   return o;
}