//==========================================================
// <T>点击事件描述类。</T>
//
// @event
// @param n:name:String 名称
// @author maocy
// @version 150119
//==========================================================
function AEventClick(n){
   var o = this;
   AEvent(o, n, 'click', 'onclick');
   //..........................................................
   // @html
   o._hSource = null;
   //..........................................................
   // @method
   o.attach   = AEventClick_attach;
   return o;
}

//==========================================================
// <T>接收事件信息。</T>
//
// @method
// @param p:event:Event 事件
//==========================================================
function AEventClick_attach(p){
   var o = this;
   o._hSource = p.srcElement;
}
