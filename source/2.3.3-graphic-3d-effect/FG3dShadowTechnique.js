//==========================================================
// <T>阴影渲染技术。</T>
//
// @author maocy
// @history 150119
//==========================================================
function FG3dShadowTechnique(o){
   o = RClass.inherits(this, o, FG3dTechnique);
   //..........................................................
   // @attribute
   o._code        = 'shadow';
   // @attribute
   o._passDepth   = null;
   o._passColor   = null;
   //..........................................................
   // @method
   o.setup        = FG3dShadowTechnique_setup;
   o.passDepth    = FG3dShadowTechnique_passDepth;
   o.passColor    = FG3dShadowTechnique_passColor;
   o.updateRegion = FG3dShadowTechnique_updateRegion;
   return o;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
function FG3dShadowTechnique_setup(){
   var o = this;
   o.__base.FG3dTechnique.setup.call(o);
   var ps = o._passes;
   // 创建光深处理过程
   var pd = o._passDepth = RClass.create(FG3dShadowDepthPass);
   pd.linkGraphicContext(o);
   pd.setup();
   ps.push(pd);
   // 创建颜色处理过程
   var pc = o._passColor = RClass.create(FG3dShadowColorPass);
   pc.linkGraphicContext(o);
   pc.setup();
   ps.push(pc);
   // 设置深度纹理
   pc.setTextureDepth(pd.textureDepth());
}

//==========================================================
// <T>获得深度渲染过程。</T>
//
// @method
// @return FG3dShadowDepthPass 深度渲染过程
//==========================================================
function FG3dShadowTechnique_passDepth(){
   return this._passDepth;
}

//==========================================================
// <T>获得颜色渲染过程。</T>
//
// @method
// @return FG3dShadowColorPass 颜色渲染过程
//==========================================================
function FG3dShadowTechnique_passColor(){
   return this._passColor;
}

//==========================================================
// <T>更新区域处理。</T>
//
// @method
// @param p:region:FG3dRetion 区域
//==========================================================
function FG3dShadowTechnique_updateRegion(p){
   var o = this;
   o.__base.FG3dTechnique.updateRegion.call(o, p);
   // 计算光照相机
   var c = p.camera();
   var l = p.directionalLight();
   l.camera().updateFlatCamera(c);
}
