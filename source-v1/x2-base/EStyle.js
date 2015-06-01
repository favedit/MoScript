/**************************************************************
 * 控件的状态类型枚举???
 *
 * @enum
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function EStyleFace(){
   var o = this;
   // Member
   o.Normal         = 0;
   o.Readonly       = 1;
   o.Edit           = 2;
   o.Hover          = 3;
   o.Select         = 4;
   o.ReadonlySelect = 5;
   o.Delete         = 6;
   o.Invalid        = 7;
   return o;
}
var EStyle = new EStyleFace();
