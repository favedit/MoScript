﻿//==========================================================
// <T>滚动事件描述类。</T>
//
// @event
// @param n:name:String 名称
// @author maocy
// @version 150119
//==========================================================
function AEventScroll(n){
   var o = this;
   AEvent.call(o, n, 'scroll', 'onscroll');
   //..........................................................
   // @method
   o.attach = AEventScroll_attach;
   return o;
}

//==========================================================
// <T>接收事件信息。</T>
//
// @method
// @param e:event:Event 事件
// @param h:htmlEvent:HtmlEvent 页面事件
//==========================================================
function AEventScroll_attach(e, h){
}
