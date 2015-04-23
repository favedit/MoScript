//==========================================================
// <T>通用渲染技术。</T>
//
// @author maocy
// @history 150119
//==========================================================
function FE3dGeneralTechnique(o){
   o = RClass.inherits(this, o, FE3dTechnique);
   //..........................................................
   // @attribute
   o._code      = 'general';
   // @attribute
   o._passColor = null;
   //..........................................................
   // @method
   o.setup      = FE3dGeneralTechnique_setup;
   o.passColor  = FE3dGeneralTechnique_passColor;
   return o;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
function FE3dGeneralTechnique_setup(){
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
   // 创建颜色处理过程
   var p = o._passColor = RClass.create(FE3dGeneralColorPass);
   p.linkGraphicContext(o);
   p.setup();
   o._passes.push(p);
}

//==========================================================
// <T>获得颜色渲染过程。</T>
//
// @method
// @return FG3dGeneralColorPass 颜色渲染过程
//==========================================================
function FE3dGeneralTechnique_passColor(){
   return this._passColor;
}
