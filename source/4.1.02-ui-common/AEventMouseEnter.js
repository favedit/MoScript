﻿//==========================================================
// <T>鼠标进入事件描述类。</T>
//
// @event
// @param n:name:String 名称
// @author maocy
// @version 150119
//==========================================================
MO.AEventMouseEnter = function AEventMouseEnter(n){
   var o = this;
   MO.AEvent.call(o, n, 'mouseenter', 'onmouseenter');
   //..........................................................
   // @attribute
   o._logger = false;
   //..........................................................
   // @method
   o.attach  = MO.AEventMouseEnter_attach;
   return o;
}

//==========================================================
// <T>接收事件信息。</T>
//
// @method
// @param e:event:Event 事件
// @param h:htmlEvent:HtmlEvent 页面事件
//==========================================================
MO.AEventMouseEnter_attach = function AEventMouseEnter_attach(e, h){
}
