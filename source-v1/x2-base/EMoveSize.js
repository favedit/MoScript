/**************************************************************
 * 拖动控件时的常量值枚举
 *
 * @enum
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function EMoveSizeFace(){
   var o = this;
   // Constant
   o.Range       = 6;
   o.Border      = 5;
   o.InnerBorder = 3;
   o.MinWidth    = 200;
   o.MinHeight   = 100;
   o.Layer       = 10000;
   o.MaxLayer    = 20000;
   o.EditLayer   = 30000;
   return o;
}
var EMoveSize = new EMoveSizeFace();
