/**************************************************************
 * 可移动控件接口
 *
 * @manger
 * @face MListener
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function MMoveable(o){
   o = RClass.inherits(this, o);
   // Attribute
   o.canMove   = true;
   o.inMoving  = false;
   o.zIndex    = ELayer.Move;
   // Method
   o.startDrag = RMethod.virtual(o, 'startDrag');
   o.stopDrag  = RMethod.virtual(o, 'stopDrag');
   return o;
}
// ------------------------------------------------------------
