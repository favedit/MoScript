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
   // @method
   o.construct = MO.FEaiChartDesktop_construct;
   // @method
   o.build     = MO.FEaiChartDesktop_build;
   o.resize    = MO.FEaiChartDesktop_resize;
   // @method
   o.dispose   = MO.FEaiChartDesktop_dispose;
   return o;
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
   // 创建3D画板
   var canvas3d = o._canvas3d = MO.RClass.create(MO.FEaiChartCanvas);
   canvas3d.setDesktop(o);
   canvas3d.build(hPanel);
   canvas3d.setPanel(hPanel);
   var size = canvas3d.size();
   var hCanvas3d = canvas3d._hCanvas;
   o.canvasRegister(canvas3d);
   // 创建2D画板
   var canvas2d = o._canvas2d = MO.RClass.create(MO.FE2dCanvas);
   canvas2d.setDesktop(o);
   canvas2d.size().assign(size);
   canvas2d.build(hPanel);
   canvas2d.setPanel(hPanel);
   var hCanvas2d = canvas2d._hCanvas;
   hCanvas2d.style.position = 'absolute';
   hCanvas2d.style.left = '0px';
   hCanvas2d.style.top = '0px';
   hCanvas2d.style.width = '100%';
   hCanvas2d.style.height = '100%';
   o.canvasRegister(canvas2d);
}

//==========================================================
// <T>改变大小处理。</T>
//
// @method
// @param width:Integer 宽度
// @param height:Integer 高度
//==========================================================
MO.FEaiChartDesktop_resize = function FEaiChartDesktop_resize(width, height){
   var o = this;
   var logicSize = o._logicSize;
   var canvas2d = o._canvas2d;
   // 设置大小
   o._screenSize.set(width, height);
   o._canvas3d.resize(width, height);
   canvas2d.resize(width, height);
   // 计算比率
   var widthRate = width / logicSize.width;
   var heightRate = height / logicSize.height;
   var sizeRate = o._sizeRate = Math.min(widthRate, heightRate);
   o._logicRate.set(widthRate, heightRate);
   if(widthRate > heightRate){
      o._calculateRate.set(widthRate / sizeRate, 1);
   }else if(widthRate < heightRate){
      o._calculateRate.set(1, heightRate / sizeRate);
   }else{
      o._calculateRate.set(1, 1);
   }
   // 设置缩放
   canvas2d.context().setScale(sizeRate, sizeRate);
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
