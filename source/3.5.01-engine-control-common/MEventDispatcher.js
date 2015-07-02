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
   o.onOperationDown   = MO.MEventDispatcher_onOperationDown;
   o.onOperationMove   = MO.MEventDispatcher_onOperationMove;
   o.onOperationUp     = MO.MEventDispatcher_onOperationUp;
   o.onOperationResize = MO.MEventDispatcher_onOperationResize;
   //..........................................................
   // @method
   o.dispatcherEvent   = MO.MEventDispatcher_dispatcherEvent;
   return o;
}

//==========================================================
// <T>操作落下处理。</T>
//
// @method
//==========================================================
MO.MEventDispatcher_onOperationDown = function MEventDispatcher_onOperationDown(event){
   var o = this;
}

//==========================================================
// <T>操作移动处理。</T>
//
// @method
//==========================================================
MO.MEventDispatcher_onOperationMove = function MEventDispatcher_onOperationMove(event){
   var o = this;
}

//==========================================================
// <T>操作抬起处理。</T>
//
// @method
//==========================================================
MO.MEventDispatcher_onOperationUp = function MEventDispatcher_onOperationUp(event){
   var o = this;
}

//==========================================================
// <T>操作大小处理。</T>
//
// @method
//==========================================================
MO.MEventDispatcher_onOperationResize = function MEventDispatcher_onOperationResize(event){
   var o = this;
}

//==========================================================
// <T>事件处理。</T>
//
// @method
// @param event:SEvent 事件信息
// @param flag:Boolean 标志
//==========================================================
MO.MEventDispatcher_dispatcherEvent = function MEventDispatcher_dispatcherEvent(event){
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
      case MO.EEvent.Resize:
         o.onOperationResize(event);
         break;
      default:
         throw new MO.TError('Unknown event type.');
   }
}
