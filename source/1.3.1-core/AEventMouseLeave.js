//==========================================================
// <T>鼠标离开事件描述类。</T>
//
// @event
// @param n:name:String 名称
// @author maocy
// @version 150119
//==========================================================
MO.AEventMouseLeave = function AEventMouseLeave(n){
   var o = this;
   MO.AEvent.call(o, n, 'mouseleave', 'onmouseleave');
   //..........................................................
   // @attribute
   o._logger = false;
   //..........................................................
   // @method
   o.attach  = AEventMouseLeave_attach;
   return o;

   //==========================================================
   // <T>接收事件信息。</T>
   //
   // @method
   // @param e:event:Event 事件
   // @param h:htmlEvent:HtmlEvent 页面事件
   //==========================================================
   function AEventMouseLeave_attach(e, h){
   }
}
