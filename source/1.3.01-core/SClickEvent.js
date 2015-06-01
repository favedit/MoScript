with(MO){
   //==========================================================
   // <T>单击事件类。</T>
   //
   // @struct
   // @author maocy
   // @version 150327
   //==========================================================
   MO.SClickEvent = function SClickEvent(sender){
      var o = this;
      SEvent.call(o, sender);
      return o;
   }
}
