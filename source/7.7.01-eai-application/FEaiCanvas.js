//==========================================================
// <T>模板画板。</T>
//
// @author maocy
// @history 150130
//==========================================================
MO.FEaiCanvas = function FEaiCanvas(o){
   o = MO.Class.inherits(this, o, MO.FE3dCanvas);
   //..........................................................
   // @attribute
   o._scaleRate       = 1;
   o._optionAlpha     = false;
   o._optionAntialias = false;
   // @attribute
   o._activeStage     = MO.Class.register(o, new MO.AGetter('_activeStage'));
   // @attribute
   o._capturePosition = null;
   o._captureRotation = null;
   //..........................................................
   // @method
   o.construct        = MO.FEaiCanvas_construct;
   // @method
   o.resize           = MO.FEaiCanvas_resize;
   o.selectStage      = MO.FEaiCanvas_selectStage;
   // @method
   o.dispose          = MO.FEaiCanvas_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCanvas_construct = function FEaiCanvas_construct(){
   var o = this;
   o.__base.FE3dCanvas.construct.call(o);
   // 设置属性
   o._rotation = new MO.SVector3();
   o._capturePosition = new MO.SPoint2();
   o._captureRotation = new MO.SVector3();
}

//==========================================================
// <T>加载模板处理。</T>
//
// @method
// @param width:Integer 宽度
// @param height:Integer 高度
//==========================================================
MO.FEaiCanvas_resize = function FEaiCanvas_resize(width, height){
   var o = this;
   o.__base.FE3dCanvas.resize.call(o, width, height);
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
// <T>选择舞台。</T>
//
// @method
// @param code:String 代码
// @return FStage 舞台
//==========================================================
MO.FEaiCanvas_selectStage = function FEaiCanvas_selectStage(stage){
   var o = this;
   if(stage){
      // 设置舞台
      stage.linkGraphicContext(o);
      stage.region().linkGraphicContext(o);
      if(!stage.technique()){
         stage.selectTechnique(o, MO.FE3dGeneralTechnique);
      }
      // 设置相机
      //var camera = stage.region().camera();
      //var projection = camera.projection();
      //projection.setAngle(80);
      //projection.size().set(o._hCanvas.offsetWidth, o._hCanvas.offsetHeight);
      //projection.update();
      //camera.position().set(0, 0, -10);
      //camera.lookAt(0, 0, 0);
      //camera.update();
   }
   o._activeStage = stage;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCanvas_dispose = function FEaiCanvas_dispose(){
   var o = this;
   // 释放属性
   o._rotation = MO.Lang.Object.dispose(o._rotation);
   o._capturePosition = MO.Lang.Object.dispose(o._capturePosition);
   o._captureRotation = MO.Lang.Object.dispose(o._captureRotation);
   // 父处理
   o.__base.FE3dCanvas.dispose.call(o);
}
