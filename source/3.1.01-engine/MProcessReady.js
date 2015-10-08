//==========================================================
// <T>处理准备接口。</T>
//
// @class
// @author maocy
// @history 151008
//==========================================================
MO.MProcessReady = function MProcessReady(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @attribute
   o._readyLoader   = MO.Class.register(o, new MO.AGetter('_readyLoader'));
   //..........................................................
   // @event
   o.onProcessReady = MO.Method.empty;
   //..........................................................
   // @method
   o.construct      = MO.MFrameProcessor_construct;
   // @method
   o.dispose        = MO.MFrameProcessor_dispose;
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
}
