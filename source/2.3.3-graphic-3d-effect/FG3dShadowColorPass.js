//==========================================================
// <T>阴影颜色渲染器。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FG3dShadowColorPass(o){
   o = RClass.inherits(this, o, FG3dTechniquePass);
   //..........................................................
   // @attribute
   o._name         = 'color';
   o._textureDepth = null;
   // @attribute
   //..........................................................
   // @method
   o.drawRegion    = FG3dShadowColorPass_drawRegion;
   return o;
}

//==========================================================
// <T>绘制区域处理。</T>
//
// @method
// @param p:region:FG3dRetion 区域
//==========================================================
function FG3dShadowColorPass_drawRegion(p){
   var o = this;
   var c = o._context;
   // 设置渲染目标
   c.setRenderTarget(null);
   c.clear(0.0, 0.0, 0.0, 1.0, 1.0, 1.0);
   // 绘制处理
   o.__base.FG3dTechniquePass.drawRegion.call(o, p)
}
