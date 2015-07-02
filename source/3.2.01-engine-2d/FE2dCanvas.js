with(MO){
   //==========================================================
   // <T>模板画板。</T>
   //
   // @author maocy
   // @history 150130
   //==========================================================
   MO.FE2dCanvas = function FE2dCanvas(o){
      o = RClass.inherits(this, o, FCanvas, MCanvasObject);
      //..........................................................
      // @attribute
      o._size      = RClass.register(o, new AGetter('_size'));
      o._context   = RClass.register(o, new AGetter('_context'));
      //..........................................................
      // @html
      o._hCanvas   = null;
      //..........................................................
      // @event
      o.onResize   = FE2dCanvas_onResize;
      //..........................................................
      // @method
      o.construct  = FE2dCanvas_construct;
      // @method
      o.htmlCanvas = FE2dCanvas_htmlCanvas;
      o.build      = FE2dCanvas_build;
      o.setPanel   = FE2dCanvas_setPanel;
      o.resize     = FE2dCanvas_resize;
      o.reset      = FE2dCanvas_reset;
      // @method
      o.dispose    = FE2dCanvas_dispose;
      return o;
   }

   //==========================================================
   // <T>改变大小事件处理。</T>
   //
   // @method
   // @param p:event:SEvent 事件信息
   //==========================================================
   MO.FE2dCanvas_onResize = function FE2dCanvas_onResize(p){
      var o = this;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FE2dCanvas_construct = function FE2dCanvas_construct(){
      var o = this;
      o.__base.FCanvas.construct.call(o);
      o._size = new SSize2();
   }

   //==========================================================
   // <T>获得画板。</T>
   //
   // @method
   // @return HtmlCanvasTag 画板
   //==========================================================
   MO.FE2dCanvas_htmlCanvas = function FE2dCanvas_htmlCanvas(){
      return this._hCanvas;
   }

   //==========================================================
   // <T>构建处理。</T>
   //
   // @method
   // @param hDocument:HtmlTag 页面元素
   //==========================================================
   MO.FE2dCanvas_build = function FE2dCanvas_build(hDocument){
      var o = this;
      var size = o._size;
      var width = size.width;
      var height = size.height;
      // 创建画板
      var hCanvas = o._hCanvas = RBuilder.create(hDocument, 'CANVAS');
      hCanvas.__linker = o;
      hCanvas.width = width;
      hCanvas.height = height;
      var style = hCanvas.style;
      style.width = width + 'px';
      style.height = height + 'px';
      // 创建渲染环境
      var context = o._context = RClass.create(FG2dCanvasContext);
      context.linkCanvas(hCanvas);
   }

   //==========================================================
   // <T>设置面板处理。</T>
   //
   // @method
   // @param hPanel:HtmlTag 网页元素
   //==========================================================
   MO.FE2dCanvas_setPanel = function FE2dCanvas_setPanel(hPanel){
      var o = this;
      var context = o._context;
      var hCanvas = o._hCanvas;
      // 放入父容器
      o._hPanel = hPanel;
      hPanel.appendChild(hCanvas);
      // 改变大小
      o.onResize();
   }

   //==========================================================
   // <T>改变大小。</T>
   //
   // @method
   //==========================================================
   MO.FE2dCanvas_resize = function FE2dCanvas_resize(width, height){
      var o = this;
      o._size.set(width, height);
      o._hCanvas.width = width;
      o._hCanvas.height = height;
      o._hCanvas.style.width = width + 'px';
      o._hCanvas.style.height = height + 'px';
   }

   //==========================================================
   // <T>重置处理。</T>
   //
   // @method
   //==========================================================
   MO.FE2dCanvas_reset = function FE2dCanvas_reset(){
      var o = this;
      var context = o._context;
      context.clear();
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FE2dCanvas_dispose = function FE2dCanvas_dispose(){
      var o = this;
      // 释放属性
      o._context = RObject.dispose(o._context);
      o._hPanel = RHtml.free(o._hPanel);
      o._hCanvas = RHtml.free(o._hCanvas);
      // 父处理
      o.__base.FCanvas.dispose.call(o);
   }
}
