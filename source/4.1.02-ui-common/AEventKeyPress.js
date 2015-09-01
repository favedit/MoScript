//==========================================================
// <T>键盘按键事件描述类。</T>
//
// @event
// @param n:name:String 名称
// @author maocy
// @version 150119
//==========================================================
MO.AEventKeyPress = function AEventKeyPress(n){
   var o = this;
   MO.AEvent.call(o, n, 'keypress', 'onkeypress');
   //..........................................................
   // @method
   o.create = MO.AEventKeyPress_create;
   o.attach = MO.AEventKeyPress_attach;
   return o;
}

//==========================================================
// <T>创建事件。</T>
//
// @method
// @return SEvent 事件对象
//==========================================================
MO.AEventKeyPress_create = function AEventKeyPress_create(){
   return new MO.SKeyboardEvent();
}

//==========================================================
// <T>接收事件信息。</T>
//
// @method
// @param e:event:Event 事件
// @param h:htmlEvent:HtmlEvent 页面事件
//==========================================================
MO.AEventKeyPress_attach = function AEventKeyPress_attach(e, h){
   e.hEvent = h;
   e.attachEvent(h);
}
