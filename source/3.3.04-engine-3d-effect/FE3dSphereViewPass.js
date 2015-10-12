//==========================================================
// <T>阴影深度渲染过程。</T>
//
// @author maocy
// @history 141230
//==========================================================
MO.FE3dSphereViewPass = function FE3dSphereViewPass(o){
   o = MO.Class.inherits(this, o, MO.FG3dTechniquePass);
   //..........................................................
   // @attribute
   o._code          = 'view';
   // @attribute
   o._sphere        = MO.Class.register(o, new MO.AGetter('_sphere'));
   o._rectangle     = null;
   // @attribute
   o._textureSize   = null;
   o._textureView   = MO.Class.register(o, new MO.AGetter('_textureViewr'));
   o._textureColor  = MO.Class.register(o, new MO.AGetSet('_textureColor'));
   o._effectView    = null;
   o._effectResult  = null;
   //..........................................................
   // @method
   o.construct      = MO.FE3dSphereViewPass_construct;
   o.setup          = MO.FE3dSphereViewPass_setup;
   o.setSphere      = MO.FE3dSphereViewPass_setSphere;
   // @method
   o.drawBegin      = MO.FE3dSphereViewPass_drawBegin
   o.drawRegion     = MO.FE3dSphereViewPass_drawRegion;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dSphereViewPass_construct = function FE3dSphereViewPass_construct(){
   var o = this;
   o.__base.FG3dTechniquePass.construct.call(o);
   //o._textureSize = new MO.SSize2(512, 512);
   //o._textureSize = new MO.SSize2(1024, 1024);
   //o._textureSize = new MO.SSize2(2048, 2048);
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FE3dSphereViewPass_setup = function FE3dSphereViewPass_setup(){
   var o = this;
   o.__base.FG3dTechniquePass.setup.call(o);
   var context = o._graphicContext;
   // 创建渲染纹理
   var textureColor = o._textureView = context.createFlatTexture();
   textureColor.setFilterCd(MO.EG3dSamplerFilter.Nearest, MO.EG3dSamplerFilter.Nearest);
   textureColor.setWrapCd(MO.EG3dSamplerFilter.ClampToBorder, MO.EG3dSamplerFilter.ClampToBorder);
   textureColor.update();
   // 创建渲染纹理
   //var texturePosition = o._texturePosition = context.createFlatTexture();
   //texturePosition.setFilterCd(MO.EG3dSamplerFilter.Nearest, MO.EG3dSamplerFilter.Nearest);
   //texturePosition.setWrapCd(MO.EG3dSamplerFilter.ClampToBorder, MO.EG3dSamplerFilter.ClampToBorder);
   //texturePosition.update();
   // 创建渲染目标
   var target = o._renderTarget = context.createRenderTarget();
   target.setQualityCd(MO.Desktop.qualityCd())
   target.textures().push(textureColor);
   //target.textures().push(texturePosition);
   target.build();
   // 创建渲渲染举行
   var rectangle = o._rectangle = MO.Class.create(MO.FE3dRectangleArea);
   rectangle.linkGraphicContext(o);
   rectangle.setup();
   rectangle.pushTexture(textureColor, 'diffuse');
}

//==========================================================
// <T>开始绘制处理。</T>
//
// @method
// @param region:FG3dRetion 区域
//==========================================================
MO.FE3dSphereViewPass_setSphere = function FE3dSphereViewPass_setSphere(sphere){
   var o = this;
   sphere.pushTexture(o._textureColor, 'diffuse');
   o._sphere = sphere;
}

//==========================================================
// <T>开始绘制处理。</T>
//
// @method
// @param region:FG3dRetion 区域
//==========================================================
MO.FE3dSphereViewPass_drawBegin = function FE3dSphereViewPass_drawBegin(region){
   var o = this;
   var context = o._graphicContext;
   var rectangle = o._rectangle;
   // 创建效果器
   var effectView = o._effectView;
   if(!effectView){
      region._spaceName = 'general.view'
      effectView = o._effectView = MO.Console.find(MO.FG3dEffectConsole).find(o, region, rectangle);
   }
   var effectResult = o._effectResult;
   if(!effectResult){
      region._spaceName = 'general.view.result'
      effectResult = o._effectResult = MO.Console.find(MO.FG3dEffectConsole).find(o, region, rectangle);
   }
}

//==========================================================
// <T>绘制区域处理。</T>
//
// @method
// @param region:FG3dRetion 区域
//==========================================================
MO.FE3dSphereViewPass_drawRegion = function FE3dSphereViewPass_drawRegion(region){
   var o = this;
   var context = o._graphicContext;
   var rectangle = o._rectangle;
   // 绘制视图处理
   var effectView = o._effectView;
   context.setRenderTarget(null);
   //context.setRenderTarget(o._renderTarget);
   context.setProgram(effectView.program());
   context.clear(0, 0, 0, 0, 1);
   effectView.drawRenderable(region, o._sphere);
   //return;
   // 绘制显示处理
   //var effectResult = o._effectResult;
   //context.setRenderTarget(null);
   //context.setProgram(effectResult.program());
   //context.clear(0, 0, 0, 0, 1);
   //effectResult.drawRenderable(region, o._rectangle);
}
