with(MO){
   //==========================================================
   // <T>内容改变事件描述类。</T>
   //
   // @event
   // @param n:name:String 名称
   // @author maocy
   // @version 150119
   //==========================================================
   MO.AEventChange = function AEventChange(n){
      var o = this;
      AEvent.call(o, n, 'change', 'onchange');
      //..........................................................
      // @method
      o.attach = AEventChange_attach;
      return o;
   }

   //==========================================================
   // <T>接收事件信息。</T>
   //
   // @method
   // @param e:event:Event 事件
   // @param h:htmlEvent:HtmlEvent 页面事件
   //==========================================================
   MO.AEventChange_attach = function AEventChange_attach(e, h){
   }
}
