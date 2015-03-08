//==========================================================
// <T>模板画板。</T>
//
// @author maocy
// @history 150130
//==========================================================
function FE3dCanvas(o){
   o = RClass.inherits(this, o, FObject, MListenerLoad, MMouseCapture);
   //..........................................................
   // @attribute
   o._optionAlpha     = true;
   o._optionAntialias = false;
   // @attribute
   o._context         = null;
   o._scaleRate       = 1;
   o._interval        = 1000 / 60;
   //..........................................................
   // @html
   o._hPanel          = null;
   o._hCanvas         = null;
   //..........................................................
   // @event
   o.ohTouchStart     = FE3dCanvas_ohTouchStart;
   o.ohTouchMove      = FE3dCanvas_ohTouchMove;
   o.ohTouchStop      = FE3dCanvas_ohTouchStop;
   // @event
   o.onTouchStart     = RMethod.empty;
   o.onTouchMove      = RMethod.empty;
   o.onTouchStop      = RMethod.empty;
   // @event
   o.onResize         = FE3dCanvas_onResize;
   //..........................................................
   // @method
   o.construct        = FE3dCanvas_construct;
   // @method
   o.build            = FE3dCanvas_build;
   o.setPanel         = FE3dCanvas_setPanel;
   // @method
   o.dispose          = FE3dCanvas_dispose;
   return o;
}

//==========================================================
// <T>触摸事件开始处理。</T>
//
// @method
// @param p:event:TouchEvent 触摸事件
//==========================================================
function FE3dCanvas_ohTouchStart(p){
   this.__linker.onTouchStart(p);
}

//==========================================================
// <T>触摸事件移动处理。</T>
//
// @method
// @param p:event:TouchEvent 触摸事件
//==========================================================
function FE3dCanvas_ohTouchMove(p){
   this.__linker.onTouchMove(p);
}

//==========================================================
// <T>触摸事件结束处理。</T>
//
// @method
// @param p:event:TouchEvent 触摸事件
//==========================================================
function FE3dCanvas_ohTouchStop(p){
   this.__linker.onTouchStop(p);
}

//==========================================================
// <T>改变大小事件处理。</T>
//
// @method
// @param p:event:SEvent 事件信息
//==========================================================
function FE3dCanvas_onResize(p){
   var o = this;
   // 获得大小
   var hp = o._hPanel;
   var w = hp.offsetWidth * o._scaleRate;
   var h = hp.offsetHeight * o._scaleRate;
   // 设置大小
   var hc = o._hCanvas;
   hc.width = w;
   hc.height = h;
   // 设置范围
   var c = o._context;
   c.setViewport(0, 0, w, h);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3dCanvas_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}

//==========================================================
// <T>构建处理。</T>
//
// @method
// @param p:document:HtmlTag 页面元素
//==========================================================
function FE3dCanvas_build(p){
   var o = this;
   // 创建画板
   var h = o._hCanvas = RBuilder.create(p, 'CANVAS');
   h.__linker = o;
   h.style.width = '100%';
   h.style.height = '100%';
   h.style.display = 'block';
   if(!RMethod.isEmpty(o.onTouchStart)){
      h.addEventListener('touchstart', o.ohTouchStart, false);
   }
   if(!RMethod.isEmpty(o.onTouchMove)){
      h.addEventListener('touchmove', o.ohTouchMove, false);
   }
   if(!RMethod.isEmpty(o.onTouchStop)){
      h.addEventListener('touchend', o.ohTouchStop, false);
   }
   // 创建渲染环境
   var a = new Object();
   a.alpha = o._optionAlpha;
   a.antialias = o._optionAntialias;
   var c = o._context = REngine3d.createContext(FWglContext, h, a);
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
// <T>设置面板处理。</T>
//
// @method
//==========================================================
function FE3dCanvas_setPanel(p){
   var o = this;
   var c = o._context;
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
function FE3dCanvas_dispose(){
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
   o._context = RObject.dispose(o._context);
   o._hPanel = RHtml.free(o._hPanel);
   o._hCanvas = RHtml.free(o._hCanvas);
   // 父处理
   o.__base.FObject.dispose.call(o);
}
