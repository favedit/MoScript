with(MO){
   //==========================================================
   // <T>尺寸改变事件描述类。</T>
   //
   // @event
   // @param n:name:String 名称
   // @author maocy
   // @version 150119
   //==========================================================
   MO.AEventResize = function AEventResize(n){
      var o = this;
      AEvent.call(o, n, 'resize', 'onresize');
      //..........................................................
      // @method
      o.attach = AEventResize_attach;
      return o;
   }

   //==========================================================
   // <T>接收事件信息。</T>
   //
   // @method
   // @param e:event:Event 事件
   // @param h:htmlEvent:HtmlEvent 页面事件
   //==========================================================
   MO.AEventResize_attach = function AEventResize_attach(e, h){
      e.x = h.x;
      e.y = h.y;
   }
}
