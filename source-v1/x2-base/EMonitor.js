/**************************************************************
 * ???
 *
 * @enum
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function EMonitorFace(){
   var o=this;
   // Attribute
   o.Active = 1;
   o.Sleep  = 2;
   o.Stop   = 3;
   o.Cancel = 4;
   return o;
}
var EMonitor = new EMonitorFace();
