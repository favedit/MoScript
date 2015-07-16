//==========================================================
// <T>模板画板。</T>
//
// @author maocy
// @history 150130
//==========================================================
MO.FE3dCanvas = function FE3dCanvas(o){
   o = MO.Class.inherits(this, o, MO.FCanvas, MO.MGraphicObject, MO.MMouseCapture);
   //..........................................................
   // @attribute
   o._optionAlpha        = true;
   o._optionAntialias    = true;
   o._optionStageProcess = true;
   o._optionResize       = true;
   o._optionMouseCapture = true;
   // @attribute
   o._listenerLoad       = MO.Class.register(o, new MO.AListener('_listenerLoad', MO.EEvent.Load));
   o._scaleRate          = 1;
   o._size               = MO.Class.register(o, new MO.AGetter('_size'));
   o._logicSize          = MO.Class.register(o, new MO.AGetter('_logicSize'));
   o._screenSize         = MO.Class.register(o, new MO.AGetter('_screenSize'));
   o._interval           = 10;
   //..........................................................
   // @html
   o._hPanel             = null;
   o._hCanvas            = null;
   //..........................................................
   // @event
   o.onEnterFrame        = MO.Method.empty;
   // @event
   o.ohTouchStart        = MO.FE3dCanvas_ohTouchStart;
   o.ohTouchMove         = MO.FE3dCanvas_ohTouchMove;
   o.ohTouchStop         = MO.FE3dCanvas_ohTouchStop;
   // @event
   // @event
   o.onMouseCaptureStart = MO.Method.empty;
   o.onMouseCapture      = MO.Method.empty;
   o.onMouseCaptureStop  = MO.Method.empty;
   o.onTouchStart        = MO.Method.empty;
   o.onTouchMove         = MO.Method.empty;
   o.onTouchStop         = MO.Method.empty;
   // @event
   o.onResize            = MO.FE3dCanvas_onResize;
   //..........................................................
   // @method
   o.construct           = MO.FE3dCanvas_construct;
   // @method
   o.build               = MO.FE3dCanvas_build;
   o.resize              = MO.FE3dCanvas_resize;
   o.setPanel            = MO.FE3dCanvas_setPanel;
   // @method
   o.dispose             = MO.FE3dCanvas_dispose;
   return o;
}

//==========================================================
// <T>触摸事件开始处理。</T>
//
// @method
// @param event:TouchEvent 触摸事件
//==========================================================
MO.FE3dCanvas_ohTouchStart = function FE3dCanvas_ohTouchStart(event){
   this.__linker.onTouchStart(event);
}

//==========================================================
// <T>触摸事件移动处理。</T>
//
// @method
// @param event:TouchEvent 触摸事件
//==========================================================
MO.FE3dCanvas_ohTouchMove = function FE3dCanvas_ohTouchMove(event){
   this.__linker.onTouchMove(event);
}

//==========================================================
// <T>触摸事件结束处理。</T>
//
// @method
// @param event:TouchEvent 触摸事件
//==========================================================
MO.FE3dCanvas_ohTouchStop = function FE3dCanvas_ohTouchStop(event){
   this.__linker.onTouchStop(event);
}

//==========================================================
// <T>改变大小事件处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FE3dCanvas_onResize = function FE3dCanvas_onResize(event){
   this.resize();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dCanvas_construct = function FE3dCanvas_construct(){
   var o = this;
   o.__base.FCanvas.construct.call(o);
   // 设置变量
   o._size = new MO.SSize2(1280, 720);
   o._logicSize = new MO.SSize2(1280, 720);
   o._screenSize = new MO.SSize2(1280, 720);
}

//==========================================================
// <T>构建处理。</T>
//
// @method
// @param hPanel:HtmlTag 页面元素
//==========================================================
MO.FE3dCanvas_build = function FE3dCanvas_build(hPanel){
   var o = this;
   // 获得大小
   var size = o._size;
   var width = size.width;
   var height = size.height;
   // 创建画板
   var hCanvas = o._hCanvas = MO.RBuilder.create(hPanel, 'CANVAS');
   hCanvas.__linker = o;
   hCanvas.width = width;
   hCanvas.height = height;
   var hStyle = hCanvas.style;
   hStyle.left = '0px';
   hStyle.top = '0px';
   hStyle.width = '100%';
   hStyle.height = '100%';
   // 设置事件
   if(!MO.Method.isEmpty(o.onTouchStart)){
      hCanvas.addEventListener('touchstart', o.ohTouchStart, false);
   }
   if(!MO.Method.isEmpty(o.onTouchMove)){
      hCanvas.addEventListener('touchmove', o.ohTouchMove, false);
   }
   if(!MO.Method.isEmpty(o.onTouchStop)){
      hCanvas.addEventListener('touchend', o.ohTouchStop, false);
   }
   // 创建渲染环境
   var parameters = new Object();
   parameters.alpha = o._optionAlpha;
   parameters.antialias = o._optionAntialias;
   o._graphicContext = MO.REngine3d.createContext(MO.FWglContext, hCanvas, parameters);
   // 启动处理
   if(o._optionStageProcess){
      RStage.lsnsEnterFrame.register(o, o.onEnterFrame);
      RStage.start(o._interval);
   }
   // 监听大小改变
   if(o._optionResize){
      MO.RWindow.lsnsResize.register(o, o.onResize);
      MO.RWindow.lsnsOrientation.register(o, o.onResize);
   }
   // 注册鼠标捕捉监听
   if(o._optionMouseCapture){
      MO.Console.find(MO.FMouseConsole).register(o);
   }
}

//==========================================================
// <T>改变大小处理。</T>
//
// @method
//==========================================================
MO.FE3dCanvas_resize = function FE3dCanvas_resize(sourceWidth, sourceHeight){
   var o = this;
   // 检查参数
   if(!sourceWidth || !sourceHeight){
      throw new MO.TError(o, 'Invalid canvas size.');
   }
   //if(o._screenSize.equalsData(sourceWidth, sourceHeight)){
      //return;
   //}
   o._screenSize.set(sourceWidth, sourceHeight);
   // 设置尺寸
   var width = parseInt(sourceWidth * o._scaleRate);
   var height = parseInt(sourceHeight * o._scaleRate);
   // 设置画板
   var hCanvas = o._hCanvas;
   hCanvas.width = width;
   hCanvas.height = height;
   o._size.set(width, height);
   // 设置范围
   var context = o._graphicContext;
   context.setViewport(0, 0, width, height);
}

//==========================================================
// <T>设置面板处理。</T>
//
// @method
// @param hPanel:HtmlTag 页面元素
//==========================================================
MO.FE3dCanvas_setPanel = function FE3dCanvas_setPanel(hPanel){
   var o = this;
   // 放入父容器
   hPanel.appendChild(o._hCanvas);
   o._hPanel = hPanel;
   // 改变大小
   o.resize();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3dCanvas_dispose = function FE3dCanvas_dispose(){
   var o = this;
   // 移除事件
   var h = o._hCanvas;
   if(h){
      h.__linker = null;
      h.removeEventListener('touchstart', o.ohTouchStart);
      h.removeEventListener('touchmove', o.ohTouchMove);
      h.removeEventListener('touchend', o.ohTouchStop);
   }
   // 释放属性
   o._graphicContext = MO.Lang.Object.dispose(o._graphicContext);
   o._size = MO.Lang.Object.dispose(o._size);
   o._screenSize = MO.Lang.Object.dispose(o._screenSize);
   o._logicSize = MO.Lang.Object.dispose(o._logicSize);
   o._hPanel = MO.RHtml.free(o._hPanel);
   o._hCanvas = MO.RHtml.free(o._hCanvas);
   // 父处理
   o.__base.FCanvas.dispose.call(o);
}
