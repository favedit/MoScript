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
   o.create = AEventKeyPress_create;
   o.attach = AEventKeyPress_attach;
   return o;

   //==========================================================
   // <T>创建事件。</T>
   //
   // @method
   // @return SEvent 事件对象
   //==========================================================
   function AEventKeyPress_create(){
      return new SKeyboardEvent();
   }

   //==========================================================
   // <T>接收事件信息。</T>
   //
   // @method
   // @param e:event:Event 事件
   // @param h:htmlEvent:HtmlEvent 页面事件
   //==========================================================
   function AEventKeyPress_attach(e, h){
      e.hEvent = h;
      e.attachEvent(h);
   }
}
