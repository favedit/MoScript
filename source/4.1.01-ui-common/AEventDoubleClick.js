﻿//==========================================================
// <T>鼠标双击事件描述类。</T>
//
// @event
// @param n:name:String 名称
// @author maocy
// @version 150119
//==========================================================
MO.AEventDoubleClick = function AEventDoubleClick(n){
   var o = this;
   MO.AEvent.call(o, n, 'dblclick', 'ondblclick');
   //..........................................................
   // @method
   o.attach = MO.AEventDoubleClick_attach;
   return o;
}

//==========================================================
// <T>接收事件信息。</T>
//
// @method
// @param e:event:Event 事件
// @param h:htmlEvent:HtmlEvent 页面事件
//==========================================================
MO.AEventDoubleClick_attach = function AEventDoubleClick_attach(e, h){
   e.altKey = h.altKey;
   e.ctrlKey = h.ctrlKey;
   e.shiftKey = h.shiftKey;
}
