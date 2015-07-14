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
MO.FE3dRulerBox = function FE3dRulerBox(o){
   o = MO.Class.inherits(this, o, MO.FE3dSprite);
   //..........................................................
   // @attribute
   o._outline  = MO.Class.register(o, new MO.AGetter('_outline'));
   o._style    = MO.Class.register(o, new MO.AGetter('_style'));
   // @attribute
   o._rulerX   = null;
   o._rulerY   = null;
   o._rulerZ   = null;
   //..........................................................
   // @method
   o.construct = MO.FE3dRulerBox_construct;
   // @method
   o.setup     = MO.FE3dRulerBox_setup;
   o.upload    = MO.FE3dRulerBox_upload;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dRulerBox_construct = function FE3dRulerBox_construct(){
   var o = this;
   o.__base.FE3dSprite.construct.call(o);
   // 设置属性
   o._material = MO.Class.create(MO.FE3dMaterial);
   o._style = new SE3dRulerStyle();
   o._outline = new MO.SOutline3();
   // 设置属性
   var ruler = o._rulerX = MO.Class.create(MO.FE3dRuler);
   o.pushRenderable(ruler);
   var ruler = o._rulerY = MO.Class.create(MO.FE3dRuler);
   o.pushRenderable(ruler);
   var ruler = o._rulerZ = MO.Class.create(MO.FE3dRuler);
   o.pushRenderable(ruler);
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FE3dRulerBox_setup = function FE3dRulerBox_setup(){
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
MO.FE3dRulerBox_upload = function FE3dRulerBox_upload(){
   var o = this;
   o._rulerX.upload();
   o._rulerY.upload();
   o._rulerZ.upload();
}
