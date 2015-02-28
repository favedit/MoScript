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
   o.onMouseCaptureStart = MO.RMethod.virtual(o, 'onMouseCaptureStart');
   o.onMouseCapture      = MO.RMethod.virtual(o, 'onMouseCapture');
   o.onMouseCaptureStop  = MO.RMethod.virtual(o, 'onMouseCaptureStop');
   //..........................................................
   // @method
   o.testMouseCapture    = MO.RMethod.emptyTrue;
   return o;
}
