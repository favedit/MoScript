//==========================================================
// <T>改变大小事件信息类。</T>
//
// @struct
// @author maocy
// @version 150213
//==========================================================
MO.SResizeEvent = function SResizeEvent(){
   var o = this;
   MO.SEvent.call(o);
   //..........................................................
   // @attribute
   o.width       = null;
   o.height      = null;
   //..........................................................
   // @method
   o.attachEvent = MO.SResizeEvent_attachEvent;
   return o;
}

//==========================================================
// <T>接收事件信息。</T>
//
// @method
// @param p:event:HtmlEvent 页面事件
//==========================================================
MO.SResizeEvent_attachEvent = function SResizeEvent_attachEvent(p){
   var o = this;
   var hs = o.hSource = MO.RHtml.eventSource(p);
   if(hs){
      o.source = hs.__linker;
   }
}
