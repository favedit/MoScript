﻿//==========================================================
// <T>键盘抬起事件描述类。</T>
//
// @event
// @param n:name:String 名称
// @author maocy
// @version 150119
//==========================================================
MO.AEventKeyUp = function AEventKeyUp(n){
   var o = this;
   MO.AEvent.call(o, n, 'keyup', 'onkeyup');
   //..........................................................
   // @method
   o.attach = MO.AEventKeyUp_attach;
   return o;
}

//==========================================================
// <T>接收事件信息。</T>
//
// @method
// @param e:event:Event 事件
// @param h:htmlEvent:HtmlEvent 页面事件
//==========================================================
MO.AEventKeyUp_attach = function AEventKeyUp_attach(e, h){
   e.altKey = h.altKey;
   e.shiftKey = h.shiftKey;
   e.ctrlKey = h.ctrlKey;
   e.keyCode = h.keyCode;
}
