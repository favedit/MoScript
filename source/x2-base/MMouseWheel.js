/**************************************************************
 * 鼠标滑动控制接口
 *
 * @manger
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function MMouseWheel(o){
   o = RClass.inherits(this, o);
   // Attribute
   o.onMouseWheel = RClass.register(o, new HMouseWheel('onMouseWheel'), RMethod.empty);
   return o;
}
// ------------------------------------------------------------