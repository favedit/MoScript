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
   o._orientationCd         = null;
   o._visible               = MO.Class.register(o, new MO.AGetter('_visible'), true);
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
   o.show                   = MO.FEaiChartDesktop_show;
   o.hide                   = MO.FEaiChartDesktop_hide;
   o.setVisible             = MO.FEaiChartDesktop_setVisible;
   o.selectStage            = MO.FEaiChartDesktop_selectStage;
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
   var canvas3d = o._canvas3d = MO.Class.create(MO.FEaiChartCanvas);
   canvas3d.setDesktop(o);
   canvas3d.build(hPanel);
   canvas3d.setPanel(hPanel);
   o.canvasRegister(canvas3d);
   // 创建2D画板
   var canvas2d = o._canvas2d = MO.Class.create(MO.FGuiCanvas);
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
   var browser = MO.Window.Browser;
   // 检查大小和方向
   var sourceWidth = (targetWidth != null) ? targetWidth : window.innerWidth;
   var sourceHeight = (targetHeight != null) ? targetHeight : window.innerHeight;
   var orientationCd = browser.orientationCd();
   if(o._screenSize.equalsData(sourceWidth, sourceHeight) && (o._orientationCd == orientationCd)){
      return;
   }
   o._screenSize.set(sourceWidth, sourceHeight);
   o._orientationCd = orientationCd;
   //..........................................................
   // 计算比率
   var pixelRatio = browser.capability().pixelRatio;
   var width = parseInt(sourceWidth * pixelRatio);
   var height = parseInt(sourceHeight * pixelRatio);
   o._size.set(width, height);
   // 计算比率
   var widthRate = 1;
   var heightRate = 1;
   var logicSize = o._logicSize;
   var isVertical = browser.isOrientationVertical()
   if(isVertical){
      widthRate = width / logicSize.height;
      heightRate = height / logicSize.width;
      o._calculateSize.set(logicSize.height, logicSize.width);
   }else{
      widthRate = width / logicSize.width;
      heightRate = height / logicSize.height;
      o._calculateSize.set(logicSize.width, logicSize.height);
   }
   var sizeRate = o._sizeRate = Math.min(widthRate, heightRate);
   o._logicRate.set(widthRate, heightRate);
   var calculateRate = o._calculateRate;
   if(widthRate > heightRate){
      calculateRate.set(widthRate / sizeRate, 1);
   }else if(widthRate < heightRate){
      calculateRate.set(1, heightRate / sizeRate);
   }else{
      calculateRate.set(1, 1);
   }
   MO.Logger.debug(o, 'Change screen size. (orientation={1}, ratio={2}, screen_size={3}, size={4}, rate={5}, calculate_rate={6})', browser.orientationCd(), pixelRatio, o._screenSize.toDisplay(), o._size.toDisplay(), sizeRate, o._calculateRate.toDisplay());
   //..........................................................
   // 设置3D画板
   var canvas3d = o._canvas3d;
   if(browser.capability().canvasScale){
      canvas3d.resize(width, height);
   }else{
      canvas3d.resize(sourceWidth, sourceHeight);
   }
   var context3d = canvas3d.graphicContext();
   context3d.setViewport(0, 0, width, height)
   o._virtualSize.set(logicSize.width * calculateRate.width, logicSize.height * calculateRate.height);
   // 设置2D画板
   var canvas2d = o._canvas2d;
   canvas2d.resize(width, height);
   canvas2d.graphicContext().setGlobalScale(sizeRate, sizeRate);
   //..........................................................
   // 计算舞台
   var stage = o._canvas3d.activeStage();
   o.selectStage(stage);
}

//==========================================================
// <T>可见处理。</T>
//
// @method
//==========================================================
MO.FEaiChartDesktop_show = function FEaiChartDesktop_show(){
   this.setVisible(true);
}

//==========================================================
// <T>隐藏处理。</T>
//
// @method
//==========================================================
MO.FEaiChartDesktop_hide = function FEaiChartDesktop_hide(){
   this.setVisible(false);
}

//==========================================================
// <T>设置可见处理。</T>
//
// @method
// @param visible:Boolean 可见性
//==========================================================
MO.FEaiChartDesktop_setVisible = function FEaiChartDesktop_setVisible(visible){
   var o = this;
   o._visible = visible;
   o._canvas2d.setVisible(visible);
   o._canvas3d.setVisible(visible);
}

//==========================================================
// <T>选择舞台。</T>
//
// @method
// @param code:String 代码
// @return FStage 舞台
//==========================================================
MO.FEaiChartDesktop_selectStage = function FEaiChartDesktop_selectStage(stage){
   var o = this;
   // 设置舞台
   o._canvas3d.selectStage(stage);
   // 设置参数
   if(stage){
      // 设置投影
      var camera = stage.region().camera();
      var projection = camera.projection();
      projection.setAngle(80);
      projection.size().assign(o._size);
      projection.update();
      // 设置相机
      camera.position().set(0, 0, -10);
      camera.lookAt(0, 0, 0);
      camera.update();
   }
   o._activeStage = stage;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiChartDesktop_dispose = function FEaiChartDesktop_dispose(){
   var o = this;
   o._canvas3d = MO.Lang.Object.dispose(o._canvas3d);
   o._canvas2d = MO.Lang.Object.dispose(o._canvas2d);
   // 父处理
   o.__base.FEaiDesktop.dispose.call(o);
}
