//==========================================================
// <T>阴影渲染技术。</T>
//
// @author maocy
// @history 150119
//==========================================================
function FE3dShadowTechnique(o){
   o = RClass.inherits(this, o, FE3dTechnique);
   //..........................................................
   // @attribute
   o._code        = 'shadow';
   // @attribute
   o._passDepth   = null;
   o._passColor   = null;
   //..........................................................
   // @method
   o.setup        = FE3dShadowTechnique_setup;
   o.passDepth    = FE3dShadowTechnique_passDepth;
   o.passColor    = FE3dShadowTechnique_passColor;
   o.updateRegion = FE3dShadowTechnique_updateRegion;
   return o;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
function FE3dShadowTechnique_setup(){
   var o = this;
   o.__base.FE3dTechnique.setup.call(o);
   //..........................................................
   // 创建支持模式
   o.registerMode(EG3dTechniqueMode.Ambient);
   o.registerMode(EG3dTechniqueMode.DiffuseLevel);
   o.registerMode(EG3dTechniqueMode.DiffuseColor);
   o.registerMode(EG3dTechniqueMode.SpecularLevel);
   o.registerMode(EG3dTechniqueMode.SpecularColor);
   o.registerMode(EG3dTechniqueMode.Result);
   //..........................................................
   var ps = o._passes;
   // 创建光深处理过程
   var pd = o._passDepth = RClass.create(FE3dShadowDepthPass);
   pd.linkGraphicContext(o);
   pd.setup();
   //ps.push(pd);
   // 创建颜色处理过程
   var pc = o._passColor = RClass.create(FE3dShadowColorPass);
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
// @return FE3dShadowDepthPass 深度渲染过程
//==========================================================
function FE3dShadowTechnique_passDepth(){
   return this._passDepth;
}

//==========================================================
// <T>获得颜色渲染过程。</T>
//
// @method
// @return FE3dShadowColorPass 颜色渲染过程
//==========================================================
function FE3dShadowTechnique_passColor(){
   return this._passColor;
}

//==========================================================
// <T>更新区域处理。</T>
//
// @method
// @param p:region:FG3dRetion 区域
//==========================================================
function FE3dShadowTechnique_updateRegion(p){
   var o = this;
   o.__base.FE3dTechnique.updateRegion.call(o, p);
   var g = o._graphicContext;
   var gs = g.size();
   // 更新相机
   var c = p.camera();
   //c.projection().size().assign(gs);
   // 更新光照
   var l = p.directionalLight();
   var lc = l.camera();
   //lc.projection().size().assign(gs);
   //lc.updateFlatCamera(c);
}
