﻿//==========================================================
// <T>键盘落下事件描述类。</T>
//
// @event
// @param n:name:String 名称
// @author maocy
// @version 150119
//==========================================================
MO.AEventKeyDown = function AEventKeyDown(n){
   var o = this;
   MO.AEvent.call(o, n, 'keydown', 'onkeydown');
   //..........................................................
   // @method
   o.attach = MO.AEventKeyDown_attach;
   return o;
}

//==========================================================
// <T>接收事件信息。</T>
//
// @method
// @param e:event:Event 事件
// @param h:htmlEvent:HtmlEvent 页面事件
//==========================================================
MO.AEventKeyDown_attach = function AEventKeyDown_attach(e, h){
   e.altKey = h.altKey;
   e.shiftKey = h.shiftKey;
   e.ctrlKey = h.ctrlKey;
   e.keyCode = h.keyCode;
}
