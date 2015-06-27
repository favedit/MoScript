with(MO){
   //==========================================================
   // <T>模板画板。</T>
   //
   // @author maocy
   // @history 150130
   //==========================================================
   MO.FEaiCanvas = function FEaiCanvas(o){
      o = RClass.inherits(this, o, FE3dCanvas);
      //..........................................................
      // @attribute
      o._scaleRate       = 1;
      o._optionAlpha     = false;
      o._optionAntialias = false;
      // @attribute
      o._activeStage     = RClass.register(o, new AGetter('_activeStage'));
      // @attribute
      o._capturePosition = null;
      o._captureRotation = null;
      //..........................................................
      // @event
      o.onResize         = FEaiCanvas_onResize;
      //..........................................................
      // @method
      o.construct        = FEaiCanvas_construct;
      // @method
      o.selectStage      = FEaiCanvas_selectStage;
      // @method
      o.dispose          = FEaiCanvas_dispose;
      return o;
   }

   //==========================================================
   // <T>加载模板处理。</T>
   //
   // @method
   // @param p:template:FTemplate3d 模板
   //==========================================================
   MO.FEaiCanvas_onResize = function FEaiCanvas_onResize(event){
      var o = this;
      o.__base.FE3dCanvas.onResize.call(o, event);
      // 获得相机信息
      var context = o._graphicContext;
      var size = context.size();
      var stage = o._activeStage;
      if(stage){
         var projection = stage.camera().projection();
         projection.size().set(size.width, size.height);
         projection.update();
      }
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiCanvas_construct = function FEaiCanvas_construct(){
      var o = this;
      o.__base.FE3dCanvas.construct.call(o);
      o._rotation = new SVector3();
      o._capturePosition = new SPoint2();
      o._captureRotation = new SVector3();
   }

   //==========================================================
   // <T>选择舞台。</T>
   //
   // @method
   // @param code:String 代码
   // @return FStage 舞台
   //==========================================================
   MO.FEaiCanvas_selectStage = function FEaiCanvas_selectStage(stage){
      var o = this;
      stage.linkGraphicContext(o);
      stage.region().linkGraphicContext(o);
      stage.selectTechnique(o, FE3dGeneralTechnique);
      var camera = stage.region().camera();
      var projection = camera.projection();
      projection.setAngle(80);
      projection.size().set(o._hCanvas.offsetWidth, o._hCanvas.offsetHeight);
      projection.update();
      camera.position().set(0, 0, -10);
      camera.lookAt(0, 0, 0);
      camera.update();
      o._activeStage = stage;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiCanvas_dispose = function FEaiCanvas_dispose(){
      var o = this;
      // 释放旋转
      o._rotation = RObject.dispose(o._rotation);
      // 父处理
      o.__base.FE3dCanvas.dispose.call(o);
   }
}
