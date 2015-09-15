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
   o.drawRegion    = MO.FE3dSphereColorPass_drawRegion;
   return o;
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
   // 创建平面
   var texture = o._textureColor = context.createFlatTexture();
   texture.setFilter(EG3dSamplerFilter.Linear, EG3dSamplerFilter.Linear);
   texture.setWrap(EG3dSamplerFilter.ClampToEdge, EG3dSamplerFilter.ClampToEdge);
   // 创建渲染目标
   var target = o._renderTarget = context.createRenderTarget();
   target.size().set(2048, 1024);
   target.textures().push(texture);
   target.build();
}

//==========================================================
// <T>绘制区域处理。</T>
//
// @method
// @param region:FG3dRetion 区域
//==========================================================
MO.FE3dSphereColorPass_drawRegion = function FE3dSphereColorPass_drawRegion(region){
   var o = this;
   var context = o._graphicContext;
   // 设置渲染目标
   var backgroundColor = p._backgroundColor;
   context.setRenderTarget(o._renderTarget);
   context.clear(backgroundColor.red, backgroundColor.green, backgroundColor.blue, backgroundColor.alpha, 1);
   // 绘制处理
   o.__base.FG3dTechniquePass.drawRegion.call(o, region)
}
