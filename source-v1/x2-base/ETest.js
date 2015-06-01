/**************************************************************
 * <T>测试</T>
 *
 * @enum
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function ETestFace(o){
   if(!o){o=this;}
   // Attribute
   o.None    = 0;
   o.Display = 1;
   o.Enable  = 2;
   return o;
}
var ETest = new ETestFace();
