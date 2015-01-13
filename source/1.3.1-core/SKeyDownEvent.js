//==========================================================
// <T>按键按下事件信息类。</T>
//
// @struct
// @author maocy
// @version 150113
//==========================================================
function SKeyDownEvent(o){
   if(!o){o = this;}
   SEvent(o);
   //..........................................................
   // @attribute
   o.shiftKey = false;
   o.ctrlKey  = false;
   o.keyCode  = 0;
   //..........................................................
   // @method
   o.attach  = SKeyDownEvent_attach;
   return o;
}

//==========================================================
// <T>接收事件信息。</T>
//
// @method
// @param e:event:Object 事件对象
//==========================================================
function SKeyDownEvent_attach(e){
   var o = this;
   o.shiftKey = e.shiftKey;
   o.ctrlKey = e.ctrlKey;
   o.keyCode = e.keyCode;
}
