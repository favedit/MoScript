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
   o._code      = 'general';
   // @attribute
   o._passColor = MO.Class.register(o, new MO.AGetter('_passColor'));
   o._passView  = MO.Class.register(o, new MO.AGetter('_passView'));
   //..........................................................
   // @method
   o.setup      = MO.FE3dSphereTechnique_setup;
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
   o.pushPass(passColor);
   // 创建颜色处理过程
   var passView = o._passView = MO.Class.create(MO.FE3dSphereViewPass);
   passView.linkGraphicContext(o);
   passView.setup();
   o.pushPass(passView);
   // 设置深度纹理
   passView.setTextureColor(passColor.textureColor());
}
