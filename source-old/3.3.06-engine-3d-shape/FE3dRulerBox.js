//==========================================================
// <T>渲染立方体。</T>
//
//       Y轴       
//       │        
//        O─ X轴  
//     ╱          
//   Z轴           
//
// @class
// @author maocy
// @history 150509
//==========================================================
function FE3dRulerBox(o){
   o = RClass.inherits(this, o, FE3dSprite);
   //..........................................................
   // @attribute
   o._outline  = null;
   o._style    = null;
   // @attribute
   o._rulerX   = null;
   o._rulerY   = null;
   o._rulerZ   = null;
   //..........................................................
   // @method
   o.construct = FE3dRulerBox_construct;
   // @method
   o.style     = FE3dRulerBox_style;
   o.outline   = FE3dRulerBox_outline;
   // @method
   o.setup     = FE3dRulerBox_setup;
   o.upload    = FE3dRulerBox_upload;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3dRulerBox_construct(){
   var o = this;
   o.__base.FE3dSprite.construct.call(o);
   // 设置属性
   o._material = RClass.create(FE3dMaterial);
   o._style = new SE3dRulerStyle();
   o._outline = new SOutline3();
   // 设置属性
   var ruler = o._rulerX = RClass.create(FE3dRuler);
   o.pushRenderable(ruler);
   var ruler = o._rulerY = RClass.create(FE3dRuler);
   o.pushRenderable(ruler);
   var ruler = o._rulerZ = RClass.create(FE3dRuler);
   o.pushRenderable(ruler);
}

//==========================================================
// <T>获得样式。</T>
//
// @method
// @return SE3dRulerStyle 样式
//==========================================================
function FE3dRulerBox_style(){
   return this._style;
}

//==========================================================
// <T>获得轮廓。</T>
//
// @method
// @return SOutline 轮廓
//==========================================================
function FE3dRulerBox_outline(){
   return this._outline;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
function FE3dRulerBox_setup(){
   var o = this;
   var context = o._graphicContext;
   var style = o._style;
   o.matrix().setScaleAll(0.1);
   o.matrix().update();
   // 获得数据
   var outline = o._outline;
   var min = outline.min;
   var max = outline.max;
   // 设置X坐标标尺
   var ruler = o._rulerX;
   ruler.linkGraphicContext(context);
   ruler.style().assign(style);
   ruler.beginPoint().assign(min);
   ruler.endPoint().set(max.x, min.y, min.z);
   ruler.direction().set(0, 0, -1);
   ruler.setup();
   // 设置Y坐标标尺
   var ruler = o._rulerY;
   ruler.linkGraphicContext(context);
   ruler.style().assign(style);
   ruler.beginPoint().assign(min);
   ruler.endPoint().set(min.x, max.y, min.z);
   ruler.direction().set(-1, 0, 0);
   ruler.setup();
   // 设置Z坐标标尺
   var ruler = o._rulerZ;
   ruler.linkGraphicContext(context);
   ruler.style().assign(style);
   ruler.beginPoint().assign(min);
   ruler.endPoint().set(min.x, min.y, max.z);
   ruler.direction().set(-1, 0, 0);
   ruler.setup();
}

//==========================================================
// <T>上传处理。</T>
//
// @method
//==========================================================
function FE3dRulerBox_upload(){
   var o = this;
   o._rulerX.upload();
   o._rulerY.upload();
   o._rulerZ.upload();
}
