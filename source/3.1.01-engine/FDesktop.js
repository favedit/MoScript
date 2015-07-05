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
   o._calculateSize   = MO.Class.register(o, new MO.AGetter('_calculateSize'));
   o._calculateRate   = MO.Class.register(o, new MO.AGetter('_calculateRate'));
   o._logicSize       = MO.Class.register(o, new MO.AGetter('_logicSize'));
   o._logicRate       = MO.Class.register(o, new MO.AGetter('_logicRate'));
   o._screenSize      = MO.Class.register(o, new MO.AGetter('_screenSize'));
   // @attribute
   o._canvases        = MO.Class.register(o, new MO.AGetter('_canvases'));
   //..........................................................
   // @method
   o.construct        = MO.FDesktop_construct;
   // @method
   o.canvasRegister   = MO.FDesktop_canvasRegister;
   o.canvasUnregister = MO.FDesktop_canvasUnregister;
   o.setup            = MO.FDesktop_setup;
   o.build            = MO.FDesktop_build;
   o.resize           = MO.FDesktop_resize;
   o.processEvent     = MO.FDesktop_processEvent;
   o.process          = MO.FDesktop_process;
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
// <T>配置处理。</T>
//
// @method
// @param hPanel:HtmlTag 页面元素
//==========================================================
MO.FDesktop_setup = function FDesktop_setup(hPanel){
   var o = this;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
// @param hPanel:HtmlTag 页面元素
//==========================================================
MO.FDesktop_build = function FDesktop_build(hPanel){
   var o = this;
}

//==========================================================
// <T>改变大小处理。</T>
//
// @method
//==========================================================
MO.FDesktop_resize = function FDesktop_resize(){
   var o = this;
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
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FDesktop_process = function FDesktop_process(){
   var o = this;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FDesktop_dispose = function FDesktop_dispose(){
   var o = this;
   // 释放属性
   o._size = RObject.dispose(o._size);
   o._calculateSize = RObject.dispose(o._calculateSize);
   o._logicSize = RObject.dispose(o._logicSize);
   o._logicRate = RObject.dispose(o._logicRate);
   o._screenSize = RObject.dispose(o._screenSize);
   o._canvases = RObject.dispose(o._canvases);
   // 父处理
   o.__base.FObject.dispose.call(o);
}
