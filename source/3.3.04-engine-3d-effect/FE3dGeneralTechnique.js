//==========================================================
// <T>通用渲染技术。</T>
//
// @author maocy
// @history 150119
//==========================================================
MO.FE3dGeneralTechnique = function FE3dGeneralTechnique(o){
   o = MO.Class.inherits(this, o, MO.FE3dTechnique);
   //..........................................................
   // @attribute
   o._code      = 'general';
   // @attribute
   o._passColor = MO.Class.register(o, new MO.AGetter('_passColor'));
   //..........................................................
   // @method
   o.setup      = MO.FE3dGeneralTechnique_setup;
   return o;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FE3dGeneralTechnique_setup = function FE3dGeneralTechnique_setup(){
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
   // 创建颜色处理过程
   var pass = o._passColor = MO.Class.create(MO.FE3dGeneralColorPass);
   pass.linkGraphicContext(o);
   pass.setup();
   o.pushPass(pass);
}
