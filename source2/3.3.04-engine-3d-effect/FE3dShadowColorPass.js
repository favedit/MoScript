with(MO){
   //==========================================================
   // <T>阴影颜色渲染过程。</T>
   //
   // @author maocy
   // @history 141230
   //==========================================================
   MO.FE3dShadowColorPass = function FE3dShadowColorPass(o){
      o = RClass.inherits(this, o, FG3dTechniquePass);
      //..........................................................
      // @attribute
      o._code           = 'color';
      o._textureDepth   = null;
      // @attribute
      //..........................................................
      // @method
      o.textureDepth    = FE3dShadowColorPass_textureDepth;
      o.setTextureDepth = FE3dShadowColorPass_setTextureDepth;
      // @method
      o.drawRegion      = FE3dShadowColorPass_drawRegion;
      return o;
   }

   //==========================================================
   // <T>获得深度纹理。</T>
   //
   // @method
   // @return 深度纹理
   //==========================================================
   MO.FE3dShadowColorPass_textureDepth = function FE3dShadowColorPass_textureDepth(){
      return this._textureDepth;
   }

   //==========================================================
   // <T>设置深度纹理。</T>
   //
   // @method
   // @param p:texture:FG3dTexture 深度纹理
   //==========================================================
   MO.FE3dShadowColorPass_setTextureDepth = function FE3dShadowColorPass_setTextureDepth(p){
      this._textureDepth = p;
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
}
