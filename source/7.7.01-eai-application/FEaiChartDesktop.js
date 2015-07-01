//==========================================================
// <T>表格桌面。</T>
//
// @class
// @author maocy
// @history 150701
//==========================================================
MO.FEaiChartDesktop = function FEaiChartDesktop(o){
   o = MO.Class.inherits(this, o, MO.FEaiDesktop);
   //..........................................................
   // @attribute
   o._canvas3d = MO.Class.register(o, new MO.AGetter('_canvas3d'));
   o._canvas2d = MO.Class.register(o, new MO.AGetter('_canvas2d'));
   //..........................................................
   // @event
   o.onResize  = MO.FEaiChartDesktop_onResize;
   //..........................................................
   // @method
   o.construct = MO.FEaiChartDesktop_construct;
   // @method
   o.build     = MO.FEaiChartDesktop_build;
   // @method
   o.dispose   = MO.FEaiChartDesktop_dispose;
   return o;
}

//==========================================================
// <T>改变大小事件处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartDesktop_onResize = function FEaiChartDesktop_onResize(event){
   var o = this;
   // 创建3D画板
   var canvas3d = o._canvas3d;
   var hCanvas3d = canvas3d._hCanvas;
   var size = canvas3d.size();
   // 创建2D画板
   var canvas2d = o._canvas2d;
   canvas2d.size().assign(size);
   canvas2d.context().size().assign(size);
   var hCanvas2d = canvas2d._hCanvas;
   hCanvas2d.width = hCanvas3d.offsetWidth;
   hCanvas2d.height = hCanvas3d.offsetHeight;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiChartDesktop_construct = function FEaiChartDesktop_construct(){
   var o = this;
   o.__base.FEaiDesktop.construct.call(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
// @param hPanel:HtmlTag 页面元素
//==========================================================
MO.FEaiChartDesktop_build = function FEaiChartDesktop_build(hPanel){
   var o = this;
   o.__base.FEaiDesktop.build.call(o, hPanel);
   // 增加监听
   MO.RWindow.lsnsResize.register(o, o.onResize);
   // 创建3D画板
   var canvas3d = o._canvas3d = MO.RClass.create(MO.FEaiChartCanvas);
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
   //hCanvas2d.style.left = hCanvas3d.offsetLeft + 'px';
   //hCanvas2d.style.top = hCanvas3d.offsetTop + 'px';
   hCanvas2d.style.left = '0px';
   hCanvas2d.style.top = '0px';
   hCanvas2d.style.width = '100%';
   hCanvas2d.style.height = '100%';
   o.canvasRegister(canvas2d);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiChartDesktop_dispose = function FEaiChartDesktop_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiDesktop.dispose.call(o);
}
