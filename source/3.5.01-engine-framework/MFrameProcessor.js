//==========================================================
// <T>舞台对象。</T>
//
// @class
// @author maocy
// @history 150106
//==========================================================
MO.MFrameProcessor = function MFrameProcessor(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @attribute
   o._readyLoader         = MO.Class.register(o, new MO.AGetter('_readyLoader'));
   // @attribute
   o._eventEnterFrame     = null;
   o._enterFrameListeners = MO.Class.register(o, new MO.AListener('_enterFrameListeners', MO.EEvent.EnterFrame));
   o._eventLeaveFrame     = null;
   o._leaveFrameListeners = MO.Class.register(o, new MO.AListener('_leaveFrameListeners', MO.EEvent.LeaveFrame));
   //..........................................................
   // @event
   o.onProcessReady       = MO.Method.empty;
   //..........................................................
   // @method
   o.construct            = MO.MFrameProcessor_construct;
   // @method
   o.dispose              = MO.MFrameProcessor_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.MFrameProcessor_construct = function MFrameProcessor_construct(){
   var o = this;
   // 设置变量
   var loader = o._readyLoader = MO.Class.create(MO.FReadyLoader);
   loader.addChangeListener(o, o.onProcessReady);
   // 设置变量
   o._eventEnterFrame = new MO.SEvent();
   o._eventLeaveFrame = new MO.SEvent();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.MFrameProcessor_dispose = function MFrameProcessor_dispose(){
   var o = this;
   // 释放变量
   o._readyLoader = MO.Lang.Object.dispose(o._readyLoader);
   // 释放变量
   o._eventEnterFrame = MO.Lang.Object.dispose(o._eventEnterFrame);
   o._eventLeaveFrame = MO.Lang.Object.dispose(o._eventLeaveFrame);
}
