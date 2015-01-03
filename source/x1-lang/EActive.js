//============================================================
// 线程的状态
//
// @enum
// @author maochunyang
// @version 1.0.1
//============================================================
function EActiveFace(){
   var o = this;
   // Attribute
   o.Sleep  = 0;
   o.Active = 1;
   o.Cancel = 2;
   o.Finish = 3;
   return o;
}
var EActive = new EActiveFace();
