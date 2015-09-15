//==========================================================
// <T>阴影渲染技术。</T>
//
// @author maocy
// @history 150119
//==========================================================
MO.FE3dSphereTechnique = function FE3dSphereTechnique(o){
   o = MO.Class.inherits(this, o, MO.FE3dTechnique);
   //..........................................................
   // @attribute
   o._code        = 'sphere';
   // @attribute
   o._passColor   = MO.Class.register(o, new MO.AGetter('_passColor'));
   o._passView    = MO.Class.register(o, new MO.AGetter('_passView'));
   //..........................................................
   // @method
   o.setup        = MO.FE3dSphereTechnique_setup;
   o.updateRegion = MO.FE3dSphereTechnique_updateRegion;
   return o;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FE3dSphereTechnique_setup = function FE3dSphereTechnique_setup(){
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
   var passes = o._passes;
   // 创建光深处理过程
   var passColor = o._passColor = MO.Class.create(MO.FE3dSphereColorPass);
   passColor.linkGraphicContext(o);
   passColor.setup();
   passes.push(passColor);
   // 创建颜色处理过程
   var passView = o._passView = MO.Class.create(MO.FE3dSphereViewPass);
   passView.linkGraphicContext(o);
   passView.setup();
   //passes.push(passView);
   // 设置深度纹理
   passView.setTextureColor(passColor.textureColor());
}

//==========================================================
// <T>更新区域处理。</T>
//
// @method
// @param p:region:FG3dRetion 区域
//==========================================================
MO.FE3dSphereTechnique_updateRegion = function FE3dSphereTechnique_updateRegion(p){
   var o = this;
   o.__base.FE3dTechnique.updateRegion.call(o, p);
   //var context = o._graphicContext;
   //var gs = context.size();
   // 更新相机
   //var c = p.camera();
   //c.projection().size().assign(gs);
   // 更新光照
   //var l = p.directionalLight();
   //var lc = l.camera();
   //lc.projection().size().assign(gs);
   //lc.updateFlatCamera(c);
}
