//==========================================================
// <T>滚动事件描述类。</T>
//
// @event
// @param n:name:String 名称
// @author maocy
// @version 150119
//==========================================================
function AEventScroll(n){
   var o = this;
   AEvent(o, n, 'scroll', 'onscroll');
   //..........................................................
   // @html
   o._hSource = null;
   //..........................................................
   // @method
   o.attach   = AEventScroll_attach;
   return o;
}

//==========================================================
// <T>接收事件信息。</T>
//
// @method
// @param p:event:Event 事件
//==========================================================
function AEventScroll_attach(p){
   var o = this;
   o._hSource = p.srcElement;
}
