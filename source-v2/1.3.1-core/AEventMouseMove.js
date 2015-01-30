//==========================================================
// <T>鼠标移动事件描述类。</T>
//
// @event
// @param n:name:String 名称
// @author maocy
// @version 150119
//==========================================================
function AEventMouseMove(n){
   var o = this;
   AEventMouse(o, n, 'mousemove', 'onmousemove');
   //..........................................................
   // @attribute
   o._logger = false;
   return o;
}
