with(MO){
   //==========================================================
   // <T>焦点获得事件描述类。</T>
   //
   // @event
   // @param n:name:String 名称
   // @author maocy
   // @version 150119
   //==========================================================
   MO.AEventFocus = function AEventFocus(n){
      var o = this;
      AEvent.call(o, n, 'focus', 'onfocus');
      //..........................................................
      // @method
      o.attach = AEventFocus_attach;
      return o;
   }

   //==========================================================
   // <T>接收事件信息。</T>
   //
   // @method
   // @param e:event:Event 事件
   // @param h:htmlEvent:HtmlEvent 页面事件
   //==========================================================
   MO.AEventFocus_attach = function AEventFocus_attach(e, h){
   }
}
