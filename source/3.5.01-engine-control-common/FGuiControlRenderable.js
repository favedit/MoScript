with(MO){
   //==========================================================
   // <T>控件渲染数据。</T>
   //
   // @class
   // @author maocy
   // @history 150610
   //==========================================================
   MO.FGuiControlRenderable = function FGuiControlRenderable(o){
      o = RClass.inherits(this, o, FE3dFaceData);
      //..........................................................
      // @attribute
      o._control    = RClass.register(o, new AGetSet('_control'));
      o._graphic    = null;
      //..........................................................
      // @method
      o.construct   = FGuiControlRenderable_construct;
      // @method
      o.setup       = FGuiControlRenderable_setup;
      o.setLocation = FGuiControlRenderable_setLocation;
      o.setSize     = FGuiControlRenderable_setSize;
      // @method
      o.beginDraw   = FGuiControlRenderable_beginDraw;
      o.endDraw     = FGuiControlRenderable_endDraw;
      // @method
      o.dispose     = FGuiControlRenderable_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiControlRenderable_construct = function FGuiControlRenderable_construct(){
      var o = this;
      o.__base.FE3dFaceData.construct.call(o);
   }

   //==========================================================
   // <T>加载处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiControlRenderable_setup = function FGuiControlRenderable_setup(){
      var o = this;
      o.__base.FE3dFaceData.setup.call(o);
      // 设置材质
      var materialInfo = o._material.info();
      materialInfo.effectCode = 'flat';
      materialInfo.optionAlpha = true;
   }

   //==========================================================
   // <T>设置大小。</T>
   //
   // @method
   //==========================================================
   MO.FGuiControlRenderable_setLocation = function FGuiControlRenderable_setLocation(x, y){
      var o = this;
      o._matrix.setTranslate(x, y, 0);
   }

   //==========================================================
   // <T>设置大小。</T>
   //
   // @method
   //==========================================================
   MO.FGuiControlRenderable_setSize = function FGuiControlRenderable_setSize(width, height){
      var o = this;
      o._size.set(width, height);
   }

   //==========================================================
   // <T>加载处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiControlRenderable_beginDraw = function FGuiControlRenderable_beginDraw(){
      var o = this;
      // 设置大小
      var size = o._size;
      var adjustWidth = RInteger.pow2(size.width);
      var adjustHeight = RInteger.pow2(size.height);
      o._adjustSize.set(adjustWidth, adjustHeight);
      o._matrix.setScale(adjustWidth, adjustHeight, 1);
      // 绘制画板
      var canvasConsole = RConsole.find(FE2dCanvasConsole);
      var canvas = o._canvas = canvasConsole.allocBySize(adjustWidth, adjustHeight);
      var graphic = o._graphic = canvas.context();
      return graphic;
   }

   //==========================================================
   // <T>加载处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiControlRenderable_endDraw = function FGuiControlRenderable_endDraw(){
      var o = this;
      // 检查环境
      var graphic = o._graphic;
      MO.Assert.debugNotNull(graphic);
      // 上传数据
      o._texture.upload(o._canvas);
      // 释放画板
      var canvasConsole = RConsole.find(FE2dCanvasConsole);
      canvasConsole.free(o._canvas);
      o._canvas = null;
      o._graphic = null;
      o._ready = true;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiControlRenderable_dispose = function FGuiControlRenderable_dispose(){
      var o = this;
      // 父处理
      o.__base.FE3dFaceData.dispose.call(o);
   }
}
