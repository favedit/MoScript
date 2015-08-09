//==========================================================
// <T>单击事件类。</T>
//
// @struct
// @author maocy
// @version 150327
//==========================================================
MO.SClickEvent = function SClickEvent(sender){
   var o = this;
   MO.SEvent.call(o, sender);
   return o;
}
