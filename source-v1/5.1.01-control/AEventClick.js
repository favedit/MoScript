﻿//==========================================================
// <T>点击事件描述类。</T>
//
// @event
// @param n:name:String 名称
// @author maocy
// @version 150119
//==========================================================
function AEventClick(n){
   var o = this;
   AEvent.call(o, n, 'click', 'onclick');
   //..........................................................
   // @method
   o.attach = AEventClick_attach;
   return o;
}

//==========================================================
// <T>接收事件信息。</T>
//
// @method
// @param e:event:Event 事件
// @param h:htmlEvent:HtmlEvent 页面事件
//==========================================================
function AEventClick_attach(e, h){
   e.altKey = h.altKey;
   e.ctrlKey = h.ctrlKey;
   e.shiftKey = h.shiftKey;
}
