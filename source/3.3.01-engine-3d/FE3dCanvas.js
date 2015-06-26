with(MO){
   //==========================================================
   // <T>模板画板。</T>
   //
   // @author maocy
   // @history 150130
   //==========================================================
   MO.FE3dCanvas = function FE3dCanvas(o){
      o = RClass.inherits(this, o, FObject, MGraphicObject, MListenerLoad, MMouseCapture);
      //..........................................................
      // @attribute
      o._optionAlpha        = true;
      o._optionAntialias    = false;
      // @attribute
      o._scaleRate          = 1;
      o._logicSize          = RClass.register(o, new AGetter('_logicSize'));
      o._screenSize         = RClass.register(o, new AGetter('_screenSize'));
      o._interval           = 1000 / 60;
      //..........................................................
      // @html
      o._hPanel             = null;
      o._hCanvas            = null;
      //..........................................................
      // @event
      o.onEnterFrame        = RMethod.empty;
      // @event
      o.ohTouchStart        = FE3dCanvas_ohTouchStart;
      o.ohTouchMove         = FE3dCanvas_ohTouchMove;
      o.ohTouchStop         = FE3dCanvas_ohTouchStop;
      // @event
      // @event
      o.onMouseCaptureStart = RMethod.empty;
      o.onMouseCapture      = RMethod.empty;
      o.onMouseCaptureStop  = RMethod.empty;
      o.onTouchStart        = RMethod.empty;
      o.onTouchMove         = RMethod.empty;
      o.onTouchStop         = RMethod.empty;
      // @event
      o.onResize            = FE3dCanvas_onResize;
      //..........................................................
      // @method
      o.construct           = FE3dCanvas_construct;
      // @method
      o.build               = FE3dCanvas_build;
      o.resize              = FE3dCanvas_resize;
      o.setPanel            = FE3dCanvas_setPanel;
      // @method
      o.dispose             = FE3dCanvas_dispose;
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
      var o = this;
      // 获得大小
      var hPanel = o._hPanel;
      var width = hPanel.offsetWidth;
      var height = hPanel.offsetHeight;
      if(o._screenSize.equalsData(width, height)){
         return;
      }
      o._screenSize.set(width, height);
      // 设置画板
      var hCanvas = o._hCanvas;
      var scaleWidth = hCanvas.width = width * o._scaleRate;
      var scaleHeight = hCanvas.height = height * o._scaleRate;
      // 设置范围
      o._graphicContext.setViewport(0, 0, scaleWidth, scaleHeight);
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3dCanvas_construct = function FE3dCanvas_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      // 设置变量
      o._logicSize = new SSize2(1280, 720);
      o._screenSize = new SSize2(1280, 720);
   }

   //==========================================================
   // <T>构建处理。</T>
   //
   // @method
   // @param p:document:HtmlTag 页面元素
   //==========================================================
   MO.FE3dCanvas_build = function FE3dCanvas_build(p){
      var o = this;
      // 创建画板
      var hCanvas = o._hCanvas = RBuilder.create(p, 'CANVAS');
      hCanvas.__linker = o;
      hCanvas.style.width = '100%';
      hCanvas.style.height = '100%';
      if(!RMethod.isEmpty(o.onTouchStart)){
         hCanvas.addEventListener('touchstart', o.ohTouchStart, false);
      }
      if(!RMethod.isEmpty(o.onTouchMove)){
         hCanvas.addEventListener('touchmove', o.ohTouchMove, false);
      }
      if(!RMethod.isEmpty(o.onTouchStop)){
         hCanvas.addEventListener('touchend', o.ohTouchStop, false);
      }
      // 创建渲染环境
      var parameters = new Object();
      parameters.alpha = o._optionAlpha;
      parameters.antialias = o._optionAntialias;
      o._graphicContext = REngine3d.createContext(FWglContext, hCanvas, parameters);
      // 启动处理
      RStage.lsnsEnterFrame.register(o, o.onEnterFrame);
      RStage.start(o._interval);
      // 监听大小改变
      RWindow.lsnsResize.register(o, o.onResize);
      RWindow.lsnsOrientation.register(o, o.onResize);
      // 注册鼠标捕捉监听
      RConsole.find(FMouseConsole).register(o);
   }

   //==========================================================
   // <T>改变大小处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3dCanvas_resize = function FE3dCanvas_resize(){
      this.onResize();
   }

   //==========================================================
   // <T>设置面板处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3dCanvas_setPanel = function FE3dCanvas_setPanel(p){
      var o = this;
      var hc = o._hCanvas;
      // 放入父容器
      o._hPanel = p;
      p.appendChild(o._hCanvas);
      // 改变大小
      o.onResize();
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
      o._graphicContext = RObject.dispose(o._graphicContext);
      o._screenSize = RObject.dispose(o._screenSize);
      o._logicSize = RObject.dispose(o._logicSize);
      o._hPanel = RHtml.free(o._hPanel);
      o._hCanvas = RHtml.free(o._hCanvas);
      // 父处理
      o.__base.FObject.dispose.call(o);
   }
}
