//==========================================================
// <T>阴影颜色渲染过程。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FG3dShadowColorPass(o){
   o = RClass.inherits(this, o, FG3dTechniquePass);
   //..........................................................
   // @attribute
   o._name           = 'color';
   o._textureDepth   = null;
   // @attribute
   //..........................................................
   // @method
   o.textureDepth    = FG3dShadowColorPass_textureDepth;
   o.setTextureDepth = FG3dShadowColorPass_setTextureDepth;
   // @method
   o.drawRegion      = FG3dShadowColorPass_drawRegion;
   return o;
}

//==========================================================
// <T>获得深度纹理。</T>
//
// @method
// @return 深度纹理
//==========================================================
function FG3dShadowColorPass_textureDepth(){
   return this._textureDepth;
}

//==========================================================
// <T>设置深度纹理。</T>
//
// @method
// @param p:texture:FG3dTexture 深度纹理
//==========================================================
function FG3dShadowColorPass_setTextureDepth(p){
   this._textureDepth = p;
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
   var bc = p._backgroundColor;
   o._context.clear(bc.red, bc.green, bc.blue, bc.alpha, 1);
   // 绘制处理
   o.__base.FG3dTechniquePass.drawRegion.call(o, p)
}
