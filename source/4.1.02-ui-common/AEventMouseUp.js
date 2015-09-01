//==========================================================
// <T>鼠标抬起事件描述类。</T>
//
// @event
// @param n:name:String 名称
// @author maocy
// @version 150119
//==========================================================
MO.AEventMouseUp = function AEventMouseUp(n){
   var o = this;
   MO.AEventMouse.call(o, n, 'mouseup', 'onmouseup');
   return o;
}
