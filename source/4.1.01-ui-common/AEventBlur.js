﻿//==========================================================
// <T>焦点失去事件描述类。</T>
//
// @event
// @param n:name:String 名称
// @author maocy
// @version 150119
//==========================================================
MO.AEventBlur = function AEventBlur(n, m){
   var o = this;
   MO.AEvent.call(o, n, 'blur', 'onblur');
   //..........................................................
   // @method
   o.attach = MO.AEventBlur_attach;
   return o;
}

//==========================================================
// <T>接收事件信息。</T>
//
// @method
// @param e:event:Event 事件
// @param h:htmlEvent:HtmlEvent 页面事件
//==========================================================
MO.AEventBlur_attach = function AEventBlur_attach(e, h){
}
