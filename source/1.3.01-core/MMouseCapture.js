with(MO){
   //==========================================================
   // <T>鼠标捕捉接口。</T>
   //
   // @face
   // @author maocy
   // @version 150203
   //==========================================================
   MO.MMouseCapture = function MMouseCapture(o){
      o = RClass.inherits(this, o);
      //..........................................................
      // @event
      o.onMouseCaptureStart = RMethod.virtual(o, 'onMouseCaptureStart');
      o.onMouseCapture      = RMethod.virtual(o, 'onMouseCapture');
      o.onMouseCaptureStop  = RMethod.virtual(o, 'onMouseCaptureStop');
      //..........................................................
      // @method
      o.testMouseCapture    = RMethod.emptyTrue;
      return o;
   }
}
