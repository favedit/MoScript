with(MO){
   //==========================================================
   // <T>鼠标落下事件描述类。</T>
   //
   // @event
   // @param n:name:String 名称
   // @author maocy
   // @version 150119
   //==========================================================
   MO.AEventMouseDown = function AEventMouseDown(n){
      var o = this;
      AEventMouse.call(o, n, 'mousedown', 'onmousedown');
      return o;
   }
}
