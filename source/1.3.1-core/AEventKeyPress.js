//==========================================================
// <T>键盘按键事件描述类。</T>
//
// @event
// @param n:name:String 名称
// @author maocy
// @version 150119
//==========================================================
function AEventKeyPress(n){
   var o = this;
   AEvent(o, n, 'keypress', 'onkeypress');
   //..........................................................
   // @html
   o._hSource  = null;
   //..........................................................
   // @atribute
   o._altKey   = false;
   o._shiftKey = false;
   o._ctrlKey  = false;
   o._keyCode  = null;
   //..........................................................
   // @method
   o.attach    = AEventKeyPress_attach;
   return o;
}

//==========================================================
// <T>接收事件信息。</T>
//
// @method
// @param p:event:Event 事件
//==========================================================
function AEventKeyPress_attach(p){
   var o = this;
   o._hSource = p.srcElement;
   o._altKey = p.altKey;
   o._shiftKey = p.shiftKey;
   o._ctrlKey = p.ctrlKey;
   o._keyCode = p.keyCode;
}
