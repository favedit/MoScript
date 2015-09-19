//==========================================================
// <T>阴影渲染技术。</T>
//
// @author maocy
// @history 150119
//==========================================================
MO.FE3dShadowTechnique = function FE3dShadowTechnique(o){
   o = MO.Class.inherits(this, o, MO.FE3dTechnique);
   //..........................................................
   // @attribute
   o._code        = 'shadow';
   // @attribute
   o._passDepth   = MO.Class.register(o, new MO.AGetter('_passDepth'));
   o._passColor   = MO.Class.register(o, new MO.AGetter('_passColor'));
   //..........................................................
   // @method
   o.setup        = MO.FE3dShadowTechnique_setup;
   o.updateRegion = MO.FE3dShadowTechnique_updateRegion;
   return o;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FE3dShadowTechnique_setup = function FE3dShadowTechnique_setup(){
   var o = this;
   o.__base.FE3dTechnique.setup.call(o);
   //..........................................................
   // 创建支持模式
   o.registerMode(MO.EG3dTechniqueMode.Ambient);
   o.registerMode(MO.EG3dTechniqueMode.DiffuseLevel);
   o.registerMode(MO.EG3dTechniqueMode.DiffuseColor);
   o.registerMode(MO.EG3dTechniqueMode.SpecularLevel);
   o.registerMode(MO.EG3dTechniqueMode.SpecularColor);
   o.registerMode(MO.EG3dTechniqueMode.Result);
   //..........................................................
   var ps = o._passes;
   // 创建光深处理过程
   var passDepth = o._passDepth = MO.Class.create(MO.FE3dShadowDepthPass);
   passDepth.linkGraphicContext(o);
   passDepth.setup();
   o.pushPass(passDepth);
   // 创建颜色处理过程
   var passColor = o._passColor = MO.Class.create(MO.FE3dShadowColorPass);
   passColor.linkGraphicContext(o);
   passColor.setup();
   o.pushPass(passColor);
   // 设置深度纹理
   passColor.setTextureDepth(passDepth.textureDepth());
}

//==========================================================
// <T>更新区域处理。</T>
//
// @method
// @param p:region:FG3dRetion 区域
//==========================================================
MO.FE3dShadowTechnique_updateRegion = function FE3dShadowTechnique_updateRegion(p){
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
