/**************************************************************
 * 可编辑框的状态枚举
 *
 * @enum
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function EEditStatusFace(o){
   if(!o){o=this;}
   // Attribute
   o.Blur   = 0;
   o.Cancel = 1;
   o.Ok     = 2;
   return o;
}
var EEditStatus = new EEditStatusFace();
