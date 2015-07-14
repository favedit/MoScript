//==========================================================
// <T>阴影颜色渲染过程。</T>
//
// @author maocy
// @history 141230
//==========================================================
MO.FE3dShadowColorPass = function FE3dShadowColorPass(o){
   o = MO.Class.inherits(this, o, MO.FG3dTechniquePass);
   //..........................................................
   // @attribute
   o._code           = 'color';
   o._textureDepth   = MO.Class.register(o, new MO.AGetSet('_textureDepth'));
   // @attribute
   //..........................................................
   // @method
   o.drawRegion      = MO.FE3dShadowColorPass_drawRegion;
   return o;
}

//==========================================================
// <T>绘制区域处理。</T>
//
// @method
// @param p:region:FG3dRetion 区域
//==========================================================
MO.FE3dShadowColorPass_drawRegion = function FE3dShadowColorPass_drawRegion(p){
   var o = this;
   var c = o._graphicContext;
   // 设置渲染目标
   c.setRenderTarget(null);
   var bc = p._backgroundColor;
   c.clear(bc.red, bc.green, bc.blue, bc.alpha, 1);
   // 绘制处理
   o.__base.FG3dTechniquePass.drawRegion.call(o, p)
}
