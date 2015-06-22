with(MO){
   //==========================================================
   // <T>控件渲染数据。</T>
   //
   // @class
   // @author maocy
   // @history 150610
   //==========================================================
   MO.FGuiControlData = function FGuiControlData(o){
      o = RClass.inherits(this, o, FE3dFaceData);
      //..........................................................
      // @attribute
      o._graphic    = null;
      //..........................................................
      // @method
      o.construct   = FGuiControlData_construct;
      // @method
      o.setup       = FGuiControlData_setup;
      o.setLocation = FGuiControlData_setLocation;
      o.setSize     = FGuiControlData_setSize;
      // @method
      o.beginDraw   = FGuiControlData_beginDraw;
      o.endDraw     = FGuiControlData_endDraw;
      // @method
      o.dispose     = FGuiControlData_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiControlData_construct = function FGuiControlData_construct(){
      var o = this;
      o.__base.FE3dFaceData.construct.call(o);
   }

   //==========================================================
   // <T>加载处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiControlData_setup = function FGuiControlData_setup(){
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
   MO.FGuiControlData_setLocation = function FGuiControlData_setLocation(x, y){
      var o = this;
      o._matrix.setTranslate(x, y, 0);
   }

   //==========================================================
   // <T>设置大小。</T>
   //
   // @method
   //==========================================================
   MO.FGuiControlData_setSize = function FGuiControlData_setSize(width, height){
      var o = this;
      o._size.set(width, height);
   }

   //==========================================================
   // <T>加载处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiControlData_beginDraw = function FGuiControlData_beginDraw(){
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
   MO.FGuiControlData_endDraw = function FGuiControlData_endDraw(){
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
   MO.FGuiControlData_dispose = function FGuiControlData_dispose(){
      var o = this;
      // 父处理
      o.__base.FE3dFaceData.dispose.call(o);
   }
}
