//==========================================================
// <T>焦点获得事件描述类。</T>
//
// @event
// @param n:name:String 名称
// @author maocy
// @version 150119
//==========================================================
MO.AEventTouchEnd = function AEventTouchEnd(n){
   var o = this;
   MO.AEvent.call(o, n, 'touchstart', 'ontouchstart');
   //..........................................................
   // @method
   o.attach = MO.AEventTouchEnd_attach;
   return o;
}

//==========================================================
// <T>接收事件信息。</T>
//
// @method
// @param e:event:Event 事件
// @param h:htmlEvent:HtmlEvent 页面事件
//==========================================================
MO.AEventTouchEnd_attach = function AEventTouchEnd_attach(e, h){
}
