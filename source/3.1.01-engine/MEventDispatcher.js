//==========================================================
// <T>事件处理器。</T>
//
// @class
// @author maocy
// @history 150701
//==========================================================
MO.MEventDispatcher = function MEventDispatcher(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @event
   o.onOperationDown        = MO.Method.empty;
   o.onOperationMove        = MO.Method.empty;
   o.onOperationUp          = MO.Method.empty;
   o.onOperationWheel       = MO.Method.empty;
   o.onOperationKeyDown     = MO.Method.empty;
   o.onOperationKeyPress    = MO.Method.empty;
   o.onOperationKeyUp       = MO.Method.empty;
   o.onOperationResize      = MO.Method.empty;
   o.onOperationOrientation = MO.Method.empty;
   //..........................................................
   // @method
   o.dispatcherEvent        = MO.MEventDispatcher_dispatcherEvent;
   return o;
}

//==========================================================
// <T>事件处理。</T>
//
// @method
// @param event:SEvent 事件信息
// @param flag:Boolean 标志
//==========================================================
MO.MEventDispatcher_dispatcherEvent = function MEventDispatcher_dispatcherEvent(event, flag){
   var o = this;
   switch(event.code){
      case MO.EEvent.MouseDown:
         o.onOperationDown(event);
         break;
      case MO.EEvent.MouseMove:
         o.onOperationMove(event);
         break;
      case MO.EEvent.MouseUp:
         o.onOperationUp(event);
         break;
      case MO.EEvent.MouseWheel:
         o.onOperationWheel(event);
         break;
      case MO.EEvent.KeyDown:
         o.onOperationKeyDown(event);
         break;
      case MO.EEvent.KeyPress:
         o.onOperationKeyPress(event);
         break;
      case MO.EEvent.KeyUp:
         o.onOperationKeyUp(event);
         break;
      case MO.EEvent.Resize:
         o.onOperationResize(event);
         break;
      case MO.EEvent.Orientation:
         o.onOperationOrientation(event);
         break;
      default:
         throw new MO.TError('Unknown event type.');
   }
}
