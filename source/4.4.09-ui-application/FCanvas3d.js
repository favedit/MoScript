//==========================================================
// <T>画板3D。</T>
//
// @author maocy
// @history 150930
//==========================================================
MO.FCanvas3d = function FCanvas3d(o){
   o = MO.Class.inherits(this, o, MO.FE3dCanvas);
   //..........................................................
   // @attribute
   o._scaleRate          = 1;
   o._optionStageProcess = false;
   o._optionResize       = false;
   o._optionMouseCapture = false;
   o._optionAlpha        = false;
   o._optionAntialias    = false;
   // @attribute
   o._activeStage        = MO.Class.register(o, new MO.AGetter('_activeStage'));
   // @attribute
   o._capturePosition    = null;
   o._captureRotation    = null;
   o._cameraPosition     = null;
   //..........................................................
   // @method
   o.construct           = MO.FCanvas3d_construct;
   // @method
   o.resize              = MO.FCanvas3d_resize;
   o.selectStage         = MO.FCanvas3d_selectStage;
   // @method
   o.setPanel            = MO.FCanvas3d_setPanel;
   // @method
   o.dispose             = MO.FCanvas3d_dispose;
   return o;
}
//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FCanvas3d_construct = function FCanvas3d_construct(){
   var o = this;
   o.__base.FE3dCanvas.construct.call(o);
   // 设置属性
   o._rotation = new MO.SVector3();
   o._capturePosition = new MO.SPoint2();
   o._captureRotation = new MO.SVector3();
   o._logicSize.set(1920, 1080);
   o._cameraPosition = new MO.SPoint3();
}

//==========================================================
// <T>加载模板处理。</T>
//
// @method
// @param width:Integer 宽度
// @param height:Integer 高度
//==========================================================
MO.FCanvas3d_resize = function FCanvas3d_resize(width, height){
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
MO.FCanvas3d_selectStage = function FCanvas3d_selectStage(stage){
   var o = this;
   if(stage){
      // 设置舞台
      stage.linkGraphicContext(o);
      stage.region().linkGraphicContext(o);
      if(!stage.technique()){
         stage.selectTechnique(o, MO.FE3dGeneralTechnique);
      }
   }
   o._activeStage = stage;
}

//==========================================================
// <T>设置面板处理。</T>
//
// @method
// @param hPanel:HtmlTag 页面元素
//==========================================================
MO.FCanvas3d_setPanel = function FCanvas3d_setPanel(hPanel){
   var o = this;
   hPanel.appendChild(o._hCanvas);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FCanvas3d_dispose = function FCanvas3d_dispose(){
   var o = this;
   // 释放属性
   o._rotation = MO.Lang.Object.dispose(o._rotation);
   o._capturePosition = MO.Lang.Object.dispose(o._capturePosition);
   o._captureRotation = MO.Lang.Object.dispose(o._captureRotation);
   o._cameraPosition = MO.Lang.Object.dispose(o._cameraPosition);
   // 父处理
   o.__base.FE3dCanvas.dispose.call(o);
}
