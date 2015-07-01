//==========================================================
// <T>简单桌面。</T>
//
// @class
// @author maocy
// @history 150701
//==========================================================
MO.FEaiDesktop = function FEaiDesktop(o){
   o = MO.Class.inherits(this, o, MO.FDesktop);
   //..........................................................
   // @attribute
   o._canvas3d = MO.Class.register(o, new MO.AGetter('_canvas3d'));
   o._canvas2d = MO.Class.register(o, new MO.AGetter('_canvas2d'));
   //..........................................................
   // @event
   o.onResize  = MO.FEaiDesktop_onResize;
   //..........................................................
   // @method
   o.construct = MO.FEaiDesktop_construct;
   // @method
   o.build     = MO.FEaiDesktop_build;
   // @method
   o.dispose   = MO.FEaiDesktop_dispose;
   return o;
}

//==========================================================
// <T>改变大小事件处理。</T>
//
// @method
// @param p:event:SEvent 事件信息
//==========================================================
MO.FEaiDesktop_onResize = function FEaiDesktop_onResize(p){
   var o = this;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiDesktop_construct = function FEaiDesktop_construct(){
   var o = this;
   o.__base.FDesktop.construct.call(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
// @param hPanel:HtmlTag 页面元素
//==========================================================
MO.FEaiDesktop_build = function FEaiDesktop_build(hPanel){
   var o = this;
   o.__base.FDesktop.build.call(o, hPanel);
   // 增加监听
   MO.RWindow.lsnsResize.register(o, o.onResize);
   // 创建3D画板
   var canvas3d = o._canvas3d = MO.RClass.create(MO.FE3dSimpleCanvas);
   canvas3d.build(hPanel);
   canvas3d.setPanel(hPanel);
   var size = canvas3d.size();
   var hCanvas3d = canvas3d._hCanvas;
   o.canvasRegister(canvas3d);
   // 创建2D画板
   var canvas2d = o._canvas2d = MO.RClass.create(MO.FE2dCanvas);
   canvas2d.size().assign(size);
   canvas2d.build(hPanel);
   canvas2d.setPanel(hPanel);
   var hCanvas2d = canvas2d._hCanvas;
   hCanvas2d.style.position = 'absolute';
   hCanvas2d.style.left = hCanvas3d.offsetLeft + 'px';
   hCanvas2d.style.top = hCanvas3d.offsetTop + 'px';
   o.canvasRegister(canvas2d);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiDesktop_dispose = function FEaiDesktop_dispose(){
   var o = this;
   // 父处理
   o.__base.FDesktop.dispose.call(o);
}
