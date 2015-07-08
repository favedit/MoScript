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
   o._canvas3d              = MO.Class.register(o, new MO.AGetter('_canvas3d'));
   o._canvas2d              = MO.Class.register(o, new MO.AGetter('_canvas2d'));
   //..........................................................
   // @event
   o.onOperationResize      = MO.FEaiChartDesktop_onOperationResize;
   o.onOperationOrientation = MO.FEaiChartDesktop_onOperationOrientation;
   //..........................................................
   // @method
   o.construct              = MO.FEaiChartDesktop_construct;
   // @method
   o.build                  = MO.FEaiChartDesktop_build;
   o.resize                 = MO.FEaiChartDesktop_resize;
   // @method
   o.dispose                = MO.FEaiChartDesktop_dispose;
   return o;
}

//==========================================================
// <T>操作大小处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartDesktop_onOperationResize = function FEaiChartDesktop_onOperationResize(event){
   var o = this;
   o.__base.FEaiDesktop.onOperationResize.call(o, event);
   // 改变大小
   o.resize();
}

//==========================================================
// <T>操作方向处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartDesktop_onOperationOrientation = function FEaiChartDesktop_onOperationOrientation(){
   var o = this;
   o.__base.FEaiDesktop.onOperationOrientation.call(o, event);
   // 改变大小
   o.resize();
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
   o.canvasRegister(canvas3d);
   // 创建2D画板
   var canvas2d = o._canvas2d = MO.RClass.create(MO.FE2dCanvas);
   canvas2d.setDesktop(o);
   canvas2d.build(hPanel);
   canvas2d.setPanel(hPanel);
   canvas2d._hCanvas.style.position = 'absolute';
   o.canvasRegister(canvas2d);
   // 引擎配置
   MO.RE3dEngine.setup();
}

//==========================================================
// <T>改变大小处理。</T>
//
// @method
// @param targetWidth:Integer 宽度
// @param targetHeight:Integer 高度
//==========================================================
MO.FEaiChartDesktop_resize = function FEaiChartDesktop_resize(targetWidth, targetHeight){
   var o = this;
   // 检查大小
   var width = (targetWidth != null) ? targetWidth : window.innerWidth;
   var height = (targetHeight != null) ? targetHeight : window.innerHeight;
   if(o._screenSize.equalsData(width, height)){
      return;
   }
   o._screenSize.set(width, height);
   //..........................................................
   // 计算比率
   var pixelRatio = MO.Browser.capability().pixelRatio;
   MO.Logger.info(o, 'Change screen size. (size={1}x{2}, pixel_ratio={3})', width, height, pixelRatio);
   //alert('Change screen size. (size=' + width + 'x' + height + ', pixel_ratio=' + pixelRatio + ')');
   width *= pixelRatio;
   height *= pixelRatio;
   // 计算比率
   var widthRate = 1;
   var heightRate = 1;
   var logicSize = o._logicSize;
   if(MO.Browser.isOrientationHorizontal()){
      widthRate = width / logicSize.width;
      heightRate = height / logicSize.height;
      o._calculateSize.set(logicSize.width, logicSize.height);
   }else{
      widthRate = width / logicSize.height;
      heightRate = height / logicSize.width;
      o._calculateSize.set(logicSize.height, logicSize.width);
   }
   var sizeRate = o._sizeRate = Math.min(widthRate, heightRate);
   o._logicRate.set(widthRate, heightRate);
   if(widthRate > heightRate){
      o._calculateRate.set(widthRate / sizeRate, 1);
   }else if(widthRate < heightRate){
      o._calculateRate.set(1, heightRate / sizeRate);
   }else{
      o._calculateRate.set(1, 1);
   }
   //..........................................................
   // 设置3D画板
   o._canvas3d.resize(width, height);
   // 设置2D画板
   var canvas2d = o._canvas2d;
   canvas2d.resize(width, height);
   canvas2d.context().setScale(sizeRate, sizeRate);
   //..........................................................
   // PC方式总是设置样式
   if(MO.Runtime.isPlatformPc()){
      // 设置3D画板大小
      var hCanvas3d = o._canvas3d._hCanvas;
      hCanvas3d.width = width;
      hCanvas3d.height = height;
      hCanvas3d.style.width = width + 'px';
      hCanvas3d.style.height = height + 'px';
      // 设置2D画板大小
      var hCanvas2d = o._canvas2d._hCanvas;
      hCanvas2d.width = width;
      hCanvas2d.height = height;
      hCanvas2d.style.width = width + 'px';
      hCanvas2d.style.height = height + 'px';
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiChartDesktop_dispose = function FEaiChartDesktop_dispose(){
   var o = this;
   o._canvas3d = MO.RObject.dispose(o._canvas3d);
   o._canvas2d = MO.RObject.dispose(o._canvas2d);
   // 父处理
   o.__base.FEaiDesktop.dispose.call(o);
}
