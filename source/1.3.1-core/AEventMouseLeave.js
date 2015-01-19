//==========================================================
// <T>鼠标离开事件描述类。</T>
//
// @event
// @param n:name:String 名称
// @author maocy
// @version 150119
//==========================================================
function AEventMouseLeave(n){
   var o = this;
   AEvent(o, n, 'mouseleave', 'onmouseleave');
   //..........................................................
   // @html
   o._hSource = null;
   //..........................................................
   // @method
   o.attach   = AEventMouseLeave_attach;
   return o;
}

//==========================================================
// <T>接收事件信息。</T>
//
// @method
// @param p:event:Event 事件
//==========================================================
function AEventMouseLeave_attach(p){
   var o = this;
   o._hSource = p.srcElement;
}
