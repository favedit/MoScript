with(MO){
   //==========================================================
   // <T>引擎形状数据。</T>
   //
   // @class
   // @author maocy
   // @history 150610
   //==========================================================
   MO.FE3dShapeData = function FE3dShapeData(o){
      o = RClass.inherits(this, o, FE3dFaceData);
      //..........................................................
      // @attribute
      o._graphic  = null;
      o._texture  = null;
      //..........................................................
      // @method
      o.construct = FE3dShapeData_construct;
      // @method
      o.beginDraw = FE3dShapeData_beginDraw;
      o.endDraw   = FE3dShapeData_endDraw;
      // @method
      o.dispose   = FE3dShapeData_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3dShapeData_construct = function FE3dShapeData_construct(){
      var o = this;
      o.__base.FE3dFaceData.construct.call(o);
   }

   //==========================================================
   // <T>加载处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3dShapeData_beginDraw = function FE3dShapeData_beginDraw(){
      var o = this;
      // 设置大小
      var size = o._size;
      var adjustWidth = MO.Lang.Integer.pow2(size.width);
      var adjustHeight = MO.Lang.Integer.pow2(size.height);
      o._adjustSize.set(adjustWidth, adjustHeight);
      // 绘制画板
      var canvasConsole = MO.Console.find(FE2dCanvasConsole);
      var canvas = o._canvas = canvasConsole.allocBySize(adjustWidth, adjustHeight);
      var graphic = o._graphic = canvas.context();
      return graphic;
   }

   //==========================================================
   // <T>加载处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3dShapeData_endDraw = function FE3dShapeData_endDraw(){
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
   MO.FE3dShapeData_dispose = function FE3dShapeData_dispose(){
      var o = this;
      // 父处理
      o.__base.FE3dFaceData.dispose.call(o);
   }
}
