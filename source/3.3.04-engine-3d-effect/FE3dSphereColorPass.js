//==========================================================
// <T>阴影颜色渲染过程。</T>
//
// @author maocy
// @history 141230
//==========================================================
MO.FE3dSphereColorPass = function FE3dSphereColorPass(o){
   o = MO.Class.inherits(this, o, MO.FG3dTechniquePass);
   //..........................................................
   // @attribute
   o._code         = 'color';
   o._textureColor = MO.Class.register(o, new MO.AGetter('_textureColor'));
   // @attribute
   //..........................................................
   // @method
   o.setup         = MO.FE3dSphereColorPass_setup;
   o.drawBegin     = MO.FE3dSphereColorPass_drawBegin;
   return o;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FE3dSphereColorPass_setup = function FE3dSphereColorPass_setup(){
   var o = this;
   o.__base.FG3dTechniquePass.setup.call(o);
   var context = o._graphicContext;
   // 创建平面
   var texture = o._textureColor = context.createFlatTexture();
   texture.setFilterCd(MO.EG3dSamplerFilter.Nearest, MO.EG3dSamplerFilter.Nearest);
   texture.setWrapCd(MO.EG3dSamplerFilter.ClampToBorder, MO.EG3dSamplerFilter.ClampToBorder);
   texture.update();
   // 创建渲染目标
   var target = o._renderTarget = context.createRenderTarget();
   target.setQualityCd(MO.Desktop.qualityCd())
   target.textures().push(texture);
   target.build();
}

//==========================================================
// <T>开始绘制处理。</T>
//
// @method
// @param region:FG3dRetion 区域
//==========================================================
MO.FE3dSphereColorPass_drawBegin = function FE3dSphereColorPass_drawBegin(region){
   var o = this;
   var context = o._graphicContext;
   var backgroundColor = region.backgroundColor();
   context.setRenderTarget(o._renderTarget);
   context.clear(backgroundColor.red, backgroundColor.green, backgroundColor.blue, backgroundColor.alpha, 1);
}
