//==========================================================
// <T>触摸跟踪器。</T>
//
// @class
// @author maocy
// @history 150508
//==========================================================
MO.FTouchTracker = function FTouchTracker(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListenerTouchZoom);
   //..........................................................
   // @attributes
   o._touchsLength   = null;
   o._touchs         = null;
   o._touchPool      = null;
   // @attributes
   o._touchZoomEvent = null;
   //..........................................................
   // @method
   o.construct       = MO.FTouchTracker_construct;
   // @method
   o.calculateLength = MO.FTouchTracker_calculateLength;
   // @method
   o.eventStart      = MO.FTouchTracker_eventStart;
   o.eventMove       = MO.FTouchTracker_eventMove;
   o.eventStop       = MO.FTouchTracker_eventStop;
   // @method
   o.dispose         = MO.FTouchTracker_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FTouchTracker_construct = function FTouchTracker_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   // 设置属性
   o._touchs = new MO.TObjects();
   o._touchPool = MO.Class.create(MO.FObjectPool);
   o._touchZoomEvent = new MO.SEvent(o);
}

//==========================================================
// <T>事件开始处理。</T>
//
// @method
// @param hEvent:HtmlEvent 事件信息
//==========================================================
MO.FTouchTracker_calculateLength = function FTouchTracker_calculateLength(hEvent){
   var o = this;
   var total = 0;
   // 计算所有点的累积长度（最后一个点和第一个点计算长度）
   var hTouches = hEvent.touches;
   var count = hTouches.length;
   if(count > 0){
      for(var i = 0; i < count; i++){
         var hTouche1 = hTouches[i];
         var hTouche2 = (i == count - 1) ? hTouches[0] : hTouches[i + 1];
         var cx = hTouche1.clientX - hTouche2.clientX;
         var cy = hTouche1.clientY - hTouche2.clientY;
         var length = Math.sqrt(cx * cx + cy * cy);
         total += length;
      }
   }
   return total;
}

//==========================================================
// <T>事件开始处理。</T>
//
// @method
// @param hEvent:HtmlEvent 事件信息
//==========================================================
MO.FTouchTracker_eventStart = function FTouchTracker_eventStart(hEvent){
   var o = this;
   var touchs = o._touchs;
   touchs.clear();
   // 获得事件信息
   var hTouches = hEvent.touches;
   var count = hTouches.length;
   for(var i = 0; i < count; i++){
      var hTouche = hTouches[i];
      var touch = new STouchEvent();
      touch.clientX = hTouche.clientX;
      touch.clientY = hTouche.clientY;
      touchs.push(touch);
   }
   // 计算长度
   o._touchsLength = o.calculateLength(hEvent);
}

//==========================================================
// <T>事件移动处理。</T>
//
// @method
// @param event:HtmlEvent 事件信息
//==========================================================
MO.FTouchTracker_eventMove = function FTouchTracker_eventMove(hEvent){
   var o = this;
   // 获得事件信息
   var touchs = o._touchs;
   var hTouches = hEvent.touches;
   var count = hTouches.length;
   for(var i = 0; i < count; i++){
      var hTouche = hTouches[i];
      var touch = touchs.at(i);
      touch.clientX = hTouche.clientX;
      touch.clientY = hTouche.clientY;
   }
   // 计算长度
   var touchsLength = o.calculateLength(hEvent);
   if(o._touchsLength != touchsLength){
      // 发送时间
      var event = o._touchZoomEvent;
      event.touchsLength = touchsLength;
      event.delta = touchsLength - o._touchsLength;
      o.processTouchZoomListener(event);
      // 记录长度
      o._touchsLength = touchsLength;
   }
}

//==========================================================
// <T>事件结束处理。</T>
//
// @method
// @param event:HtmlEvent 事件信息
//==========================================================
MO.FTouchTracker_eventStop = function FTouchTracker_eventStop(hEvent){
   var o = this;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FTouchTracker_dispose = function FTouchTracker_dispose(){
   var o = this;
   // 释放属性
   o._touchs = MO.Lang.Object.dispose(o._touchs);
   o._touchZoomEvent = MO.Lang.Object.dispose(o._touchZoomEvent);
   // 父处理
   o.__base.MListenerTouchZoom.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
