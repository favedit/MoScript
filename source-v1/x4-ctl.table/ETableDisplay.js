/**************************************************************
 * 控件工具条的显示状态
 *
 * @enum
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function ETableDisplayFace(){
   var o = this;
   // Attribute
   o.Title     = 'T';
   o.Head      = 'H';
   o.Search    = 'S';
   o.Total     = 'A';
   o.Navigator = 'N';
   return o;
}
var ETableDisplay = new ETableDisplayFace();
