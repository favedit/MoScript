//==========================================================
// <T>桌面对象。</T>
//
// @class
// @author maocy
// @history 150701
//==========================================================
MO.FDesktop = function FDesktop(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
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
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FDesktop_dispose = function FDesktop_dispose(){
   var o = this;
   // 释放属性
   o._canvases = RObject.dispose(o._canvases);
   // 父处理
   o.__base.FObject.dispose.call(o);
}
