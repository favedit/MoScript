with(MO){
   //==========================================================
   // <T>加载事件描述类。</T>
   //
   // @event
   // @param n:name:String 名称
   // @author maocy
   // @version 150119
   //==========================================================
   MO.AEventLoad = function AEventLoad(n){
      var o = this;
      AEvent.call(o, n, 'load', 'onload');
      //..........................................................
      // @method
      o.attach = AEventLoad_attach;
      return o;
   }

   //==========================================================
   // <T>接收事件信息。</T>
   //
   // @method
   // @param e:event:Event 事件
   // @param h:htmlEvent:HtmlEvent 页面事件
   //==========================================================
   MO.AEventLoad_attach = function AEventLoad_attach(e, h){
   }
}
