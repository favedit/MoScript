//==========================================================
// <T>模板画板。</T>
//
// @author maocy
// @history 150130
//==========================================================
MO.FDssCanvas = function FDssCanvas(o){
   o = MO.Class.inherits(this, o, MO.FE3dCanvas);
   //..........................................................
   //..........................................................
   // @attribute
   o._optionStageProcess = false;
   o._optionResize       = false;
   o._optionMouseCapture = false;
   o._optionAlpha        = true;
   o._optionAntialias    = false;
   o._capturePosition    = null;
   o._cameraPosition     = null;
   // @attribute
   o._scaleRate          = 1;
   // @attribute
   o._activeStage        = MO.Class.register(o, new MO.AGetter('_activeStage'));
   // @attribute
   o._capturePosition    = null;
   o._captureRotation    = null;
   //..........................................................
   // @method
   o.construct           = MO.FDssCanvas_construct;
   // @method
   o.setPanel            = MO.FDssCanvas_setPanel;
   o.resize              = MO.FDssCanvas_resize;
   o.selectStage         = MO.FDssCanvas_selectStage;
   // @method
   o.dispose             = MO.FDssCanvas_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FDssCanvas_construct = function FDssCanvas_construct(){
   var o = this;
   o.__base.FE3dCanvas.construct.call(o);
   // 设置属性
   o._rotation = new MO.SVector3();
   o._capturePosition = new MO.SPoint2();
   o._captureRotation = new MO.SVector3();
   o._logicSize = new MO.SSize2(1920, 1080);
   o._cameraPosition = new MO.SPoint3();
}

//==========================================================
// <T>设置面板处理。</T>
//
// @method
// @param hPanel:HtmlTag 页面元素
//==========================================================
MO.FDssCanvas_setPanel = function FDssCanvas_setPanel(hPanel){
   var o = this;
   o._hPanel = hPanel;
   hPanel.appendChild(o._hCanvas);
}

//==========================================================
// <T>加载模板处理。</T>
//
// @method
// @param width:Integer 宽度
// @param height:Integer 高度
//==========================================================
MO.FDssCanvas_resize = function FDssCanvas_resize(width, height){
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
MO.FDssCanvas_selectStage = function FDssCanvas_selectStage(stage){
   var o = this;
   if(stage){
      // 设置舞台
      stage.linkGraphicContext(o);
      stage.region().linkGraphicContext(o);
      stage.selectTechnique(o, MO.FE3dGeneralTechnique);
      // 设置相机
      var camera = stage.region().camera();
      var projection = camera.projection();
      projection.setAngle(80);
      projection.size().set(o._hCanvas.offsetWidth, o._hCanvas.offsetHeight);
      projection.update();
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
MO.FDssCanvas_dispose = function FDssCanvas_dispose(){
   var o = this;
   // 释放属性
   o._rotation = MO.Lang.Object.dispose(o._rotation);
   o._capturePosition = MO.Lang.Object.dispose(o._capturePosition);
   o._captureRotation = MO.Lang.Object.dispose(o._captureRotation);
   // 父处理
   o.__base.FE3dCanvas.dispose.call(o);
}
