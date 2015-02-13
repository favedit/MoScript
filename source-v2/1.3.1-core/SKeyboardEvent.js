//==========================================================
// <T>按键按下事件信息类。</T>
//
// @struct
// @author maocy
// @version 150113
//==========================================================
function SKeyboardEvent(){
   var o = this;
   SEvent.call(o);
   //..........................................................
   // @attribute
   o.altKey      = false;
   o.shiftKey    = false;
   o.ctrlKey     = false;
   o.keyCode     = 0;
   //..........................................................
   // @method
   o.attachEvent = SKeyboardEvent_attachEvent;
   o.cancel      = SKeyboardEvent_cancel;
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
   o.altKey = p.altKey;
   o.shiftKey = p.shiftKey;
   o.ctrlKey = p.ctrlKey;
   o.keyCode = p.keyCode;
}

//==========================================================
// <T>取消处理。</T>
//
// @method
//==========================================================
function SKeyboardEvent_cancel(){
   var o = this;
   o.hEvent.returnValue = false;
}
