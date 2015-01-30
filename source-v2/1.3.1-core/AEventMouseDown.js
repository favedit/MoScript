//==========================================================
// <T>鼠标落下事件描述类。</T>
//
// @event
// @param n:name:String 名称
// @author maocy
// @version 150119
//==========================================================
function AEventMouseDown(n){
   var o = this;
   AEventMouse(o, n, 'mousedown', 'onmousedown');
   return o;
}
