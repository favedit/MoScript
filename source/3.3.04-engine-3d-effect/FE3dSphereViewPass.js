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
   o._code         = 'view';
   // @attribute
   o._textureColor = MO.Class.register(o, new MO.AGetSet('_textureColor'));
   //..........................................................
   // @method
   o.drawRegion    = MO.FE3dSphereViewPass_drawRegion;
   return o;
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
   // 设置渲染目标
   context.setRenderTarget(null);
   var backgroundColor = region._backgroundColor;
   o._context.clear(backgroundColor.red, backgroundColor.green, backgroundColor.blue, backgroundColor.alpha, 1);
   // 绘制处理
   region._textureColor = o._textureColor;
   o.__base.FG3dTechniquePass.drawRegion.call(o, region)
}
