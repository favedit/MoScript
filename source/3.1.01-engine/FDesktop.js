//==========================================================
// <T>桌面对象。</T>
//
// @class
// @author maocy
// @history 150701
//==========================================================
MO.FDesktop = function FDesktop(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MEventDispatcher);
   //..........................................................
   // @attribute
   o._size            = MO.Class.register(o, new MO.AGetter('_size'));
   o._sizeRate        = MO.Class.register(o, new MO.AGetter('_sizeRate'), 1);
   o._sizeScale       = MO.Class.register(o, new MO.AGetter('_sizeScale'), 1);
   o._calculateSize   = MO.Class.register(o, new MO.AGetter('_calculateSize'));
   o._calculateRate   = MO.Class.register(o, new MO.AGetter('_calculateRate'));
   o._logicSize       = MO.Class.register(o, new MO.AGetter('_logicSize'));
   o._logicRate       = MO.Class.register(o, new MO.AGetter('_logicRate'));
   o._screenSize      = MO.Class.register(o, new MO.AGetter('_screenSize'));
   o._virtualSize     = MO.Class.register(o, new MO.AGetter('_virtualSize'));
   o._guiBufferScale  = MO.Class.register(o, new MO.AGetSet('_guiBufferScale'), 1);
   // @attribute
   o._canvases        = MO.Class.register(o, new MO.AGetter('_canvases'));
   //..........................................................
   // @method
   o.construct        = MO.FDesktop_construct;
   // @method
   o.canvasRegister   = MO.FDesktop_canvasRegister;
   o.canvasUnregister = MO.FDesktop_canvasUnregister;
   o.setup            = MO.Method.empty;
   o.build            = MO.Method.empty;
   o.resize           = MO.Method.empty;
   o.processEvent     = MO.FDesktop_processEvent;
   o.process          = MO.Method.empty;
   // @method
   o.dispose          = MO.FDesktop_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FDesktop_construct = function FDesktop_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   // 设置属性
   o._size = new MO.SSize2(1280, 720);
   o._calculateSize = new MO.SSize2(1280, 720);
   o._calculateRate = new MO.SSize2(1, 1);
   o._logicSize = new MO.SSize2(1280, 720);
   o._logicRate = new MO.SSize2(1, 1);
   o._screenSize = new MO.SSize2(1280, 720);
   o._virtualSize = new MO.SSize2(1280, 720);
   o._canvases = new MO.TObjects();
}

//==========================================================
// <T>注册画板。</T>
//
// @method
// @param canvas:FCanvas 画布
//==========================================================
MO.FDesktop_canvasRegister = function FDesktop_canvasRegister(canvas){
   var canvases = this._canvases;
   MO.Assert.debugFalse(canvases.contains(canvas));
   canvases.push(canvas);
}

//==========================================================
// <T>注销画板。</T>
//
// @method
// @param canvas:FCanvas 画布
//==========================================================
MO.FDesktop_canvasUnregister = function FDesktop_canvasUnregister(canvas){
   var canvases = this._canvases;
   MO.Assert.debugTrue(canvases.contains(canvas));
   canvases.remove(canvas);
}

//==========================================================
// <T>事件处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FDesktop_processEvent = function FDesktop_processEvent(event){
   var o = this;
   // 处理事件
   o.dispatcherEvent(event);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FDesktop_dispose = function FDesktop_dispose(){
   var o = this;
   // 释放属性
   o._size = MO.Lang.Object.dispose(o._size);
   o._calculateSize = MO.Lang.Object.dispose(o._calculateSize);
   o._logicSize = MO.Lang.Object.dispose(o._logicSize);
   o._logicRate = MO.Lang.Object.dispose(o._logicRate);
   o._screenSize = MO.Lang.Object.dispose(o._screenSize);
   o._virtualSize = MO.Lang.Object.dispose(o._virtualSize);
   o._canvases = MO.Lang.Object.dispose(o._canvases);
   // 父处理
   o.__base.FObject.dispose.call(o);
}
