//==========================================================
// <T>鼠标捕捉接口。</T>
//
// @face
// @author maocy
// @version 150203
//==========================================================
MO.MMouseCapture = function MMouseCapture(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @event
   o.onMouseCaptureStart = MO.Method.virtual(o, 'onMouseCaptureStart');
   o.onMouseCapture      = MO.Method.virtual(o, 'onMouseCapture');
   o.onMouseCaptureStop  = MO.Method.virtual(o, 'onMouseCaptureStop');
   //..........................................................
   // @method
   o.testMouseCapture    = MO.Method.emptyTrue;
   return o;
}
