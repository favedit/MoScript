//==========================================================
// <T>事件处理器。</T>
//
// @class
// @author maocy
// @history 150701
//==========================================================
MO.MGuiDispatcher = function MGuiDispatcher(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @event
   o.onOperationDown   = MO.MGuiDispatcher_onOperationDown;
   o.onOperationMove   = MO.MGuiDispatcher_onOperationMove;
   o.onOperationUp     = MO.MGuiDispatcher_onOperationUp;
   o.onOperationResize = MO.MGuiDispatcher_onOperationResize;
   //..........................................................
   // @method
   o.dispatcherEvent   = MO.MGuiDispatcher_dispatcherEvent;
   return o;
}

//==========================================================
// <T>操作落下处理。</T>
//
// @method
//==========================================================
MO.MGuiDispatcher_onOperationDown = function MGuiDispatcher_onOperationDown(event){
   var o = this;
}

//==========================================================
// <T>操作移动处理。</T>
//
// @method
//==========================================================
MO.MGuiDispatcher_onOperationMove = function MGuiDispatcher_onOperationMove(event){
   var o = this;
}

//==========================================================
// <T>操作抬起处理。</T>
//
// @method
//==========================================================
MO.MGuiDispatcher_onOperationUp = function MGuiDispatcher_onOperationUp(event){
   var o = this;
}

//==========================================================
// <T>操作大小处理。</T>
//
// @method
//==========================================================
MO.MGuiDispatcher_onOperationResize = function MGuiDispatcher_onOperationResize(event){
   var o = this;
}

//==========================================================
// <T>事件处理。</T>
//
// @method
// @param event:SEvent 事件信息
// @param flag:Boolean 标志
//==========================================================
MO.MGuiDispatcher_dispatcherEvent = function MGuiDispatcher_dispatcherEvent(event){
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
