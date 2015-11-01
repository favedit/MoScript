//==========================================================
// <T>简单桌面。</T>
//
// @class
// @author maocy
// @history 150701
//==========================================================
MO.FE3dSimpleDesktop = function FE3dSimpleDesktop(o){
   o = MO.Class.inherits(this, o, MO.FDesktop);
   //..........................................................
   // @attribute
   o._canvas3d = MO.Class.register(o, new MO.AGetter('_canvas3d'));
   o._canvas2d = MO.Class.register(o, new MO.AGetter('_canvas2d'));
   //..........................................................
   // @event
   o.onResize  = MO.FE3dSimpleDesktop_onResize;
   //..........................................................
   // @method
   o.construct = MO.FE3dSimpleDesktop_construct;
   // @method
   o.build     = MO.FE3dSimpleDesktop_build;
   // @method
   o.dispose   = MO.FE3dSimpleDesktop_dispose;
   return o;
}

//==========================================================
// <T>改变大小事件处理。</T>
//
// @method
// @param p:event:SEvent 事件信息
//==========================================================
MO.FE3dSimpleDesktop_onResize = function FE3dSimpleDesktop_onResize(p){
   var o = this;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dSimpleDesktop_construct = function FE3dSimpleDesktop_construct(){
   var o = this;
   o.__base.FDesktop.construct.call(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
// @param hPanel:HtmlTag 页面元素
//==========================================================
MO.FE3dSimpleDesktop_build = function FE3dSimpleDesktop_build(hPanel){
   var o = this;
   o.__base.FDesktop.build.call(o, hPanel);
   // 增加监听
   MO.RWindow.lsnsResize.register(o, o.onResize);
   // 创建3D画板
   var canvas = o._canvas3d = MO.Class.create(MO.FE3dSimpleCanvas);
   canvas.build(hPanel);
   canvas.setPanel(hPanel);
   var size = canvas.size();
   var hCanvas3d = canvas._hCanvas;
   // 创建2D画板
   var canvas = o._canvas2d = MO.Class.create(MO.FE2dCanvas);
   canvas.size().assign(size);
   canvas.build(hPanel);
   canvas.setPanel(hPanel);
   var hCanvas2d = canvas._hCanvas;
   hCanvas2d.style.position = 'absolute';
   hCanvas2d.style.left = hCanvas3d.offsetLeft + 'px';
   hCanvas2d.style.top = hCanvas3d.offsetTop + 'px';
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3dSimpleDesktop_dispose = function FE3dSimpleDesktop_dispose(){
   var o = this;
   // 父处理
   o.__base.FDesktop.dispose.call(o);
}
