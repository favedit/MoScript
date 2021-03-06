﻿//==========================================================
// <T>改变大小事件信息类。</T>
//
// @struct
// @author maocy
// @version 150213
//==========================================================
function SResizeEvent(){
   var o = this;
   SEvent.call(o);
   //..........................................................
   // @attribute
   o.width       = null;
   o.height      = null;
   //..........................................................
   // @method
   o.attachEvent = SResizeEvent_attachEvent;
   return o;
}

//==========================================================
// <T>接收事件信息。</T>
//
// @method
// @param p:event:HtmlEvent 页面事件
//==========================================================
function SResizeEvent_attachEvent(p){
   var o = this;
   var hs = o.hSource = RHtml.eventSource(p);
   if(hs){
      o.source = hs.__linker;
   }
}
