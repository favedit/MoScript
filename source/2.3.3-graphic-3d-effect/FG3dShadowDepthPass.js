//==========================================================
// <T>阴影深度渲染器。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FG3dShadowDepthPass(o){
   o = RClass.inherits(this, o, FG3dTechniquePass);
   //..........................................................
   // @attribute
   o._name         = 'depth';
   o._renderTarget = null;
   o._textureDepth = null;
   o._renderTarget = null;
   //..........................................................
   // @method
   o.setup         = FG3dShadowDepthPass_setup;
   o.drawRegion    = FG3dShadowDepthPass_drawRegion;
   return o;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
function FG3dShadowDepthPass_setup(){
   var o = this;
   o.__base.FG3dTechniquePass.setup.call(o);
   var c = o._context;
   // 创建平面
   var d = o._textureDepth = c.createFlatTexture();
   d.setFilter(EG3dSamplerFilter.Linear, EG3dSamplerFilter.Linear);
   d.setWrap(EG3dSamplerFilter.ClampToEdge, EG3dSamplerFilter.ClampToEdge);
   // 创建渲染目标
   var t = o._renderTarget = c.createRenderTarget();
   t.size().set(1024, 1024);
   t.textures().push(d);
   t.build();
}

//==========================================================
// <T>绘制区域处理。</T>
//
// @method
// @param p:region:FG3dRetion 区域
//==========================================================
function FG3dShadowDepthPass_drawRegion(p){
   var o = this;
   var c = o._context;
   // 设置渲染目标
   if(o._finish){
      c.setRenderTarget(null);
      var bc = p._backgroundColor;
      o._context.clear(bc.red, bc.green, bc.blue, bc.alpha, 1);
   }else{
      c.setRenderTarget(o._renderTarget);
      c.clear(0.0, 0.0, 0.0, 1.0, 1.0, 1.0);
   }
   // 绘制处理
   p._textureDepth = o._textureDepth;
   o.__base.FG3dTechniquePass.drawRegion.call(o, p)
}
