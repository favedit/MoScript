with(MO){
   //==========================================================
   // <T>焦点获得事件描述类。</T>
   //
   // @event
   // @param n:name:String 名称
   // @author maocy
   // @version 150119
   //==========================================================
   MO.AEventTouchMove = function AEventTouchMove(n){
      var o = this;
      AEvent.call(o, n, 'touchstart', 'ontouchstart');
      //..........................................................
      // @method
      o.attach = AEventTouchMove_attach;
      return o;
   }

   //==========================================================
   // <T>接收事件信息。</T>
   //
   // @method
   // @param e:event:Event 事件
   // @param h:htmlEvent:HtmlEvent 页面事件
   //==========================================================
   MO.AEventTouchMove_attach = function AEventTouchMove_attach(e, h){
   }
}
