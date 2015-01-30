//==========================================================
// <T>按键按下事件信息类。</T>
//
// @struct
// @author maocy
// @version 150113
//==========================================================
function SKeyboardEvent(o){
   if(!o){o = this;}
   SEvent(o);
   //..........................................................
   // @attribute
   o.shiftKey    = false;
   o.ctrlKey     = false;
   o.keyCode     = 0;
   //..........................................................
   // @method
   o.attachEvent = SKeyboardEvent_attachEvent;
   return o;
}

//==========================================================
// <T>接收事件信息。</T>
//
// @method
// @param p:event:HtmlEvent 页面事件
//==========================================================
function SKeyboardEvent_attachEvent(p){
   var o = this;
   o.shiftKey = p.shiftKey;
   o.ctrlKey = p.ctrlKey;
   o.keyCode = p.keyCode;
}
