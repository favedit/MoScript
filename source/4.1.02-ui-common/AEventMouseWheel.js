//==========================================================
// <T>鼠标卷动事件描述类。</T>
//
// @event
// @param n:name:String 名称
// @author maocy
// @version 150119
//==========================================================
MO.AEventMouseWheel = function AEventMouseWheel(n){
   var o = this;
   MO.AEvent.call(o, n, 'mousewheel', 'onmousewheel');
   //..........................................................
   // @method
   o.attach = MO.AEventMouseWheel_attach;
   return o;
}

//==========================================================
// <T>接收事件信息。</T>
//
// @method
// @param e:event:Event 事件
// @param h:htmlEvent:HtmlEvent 页面事件
//==========================================================
MO.AEventMouseWheel_attach = function AEventMouseWheel_attach(e, h){
   e.altKey = h.altKey;
   e.ctrlKey = h.ctrlKey;
   e.delta = h.wheelDelta;
   if(MO.Window.Browser.isBrowser(MO.EBrowser.FireFox)){
      e.x = h.pageX;
      e.y = h.pageY;
   }else{
      e.x = h.x;
      e.y = h.y;
   }
}
