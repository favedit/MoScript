//==========================================================
// <T>简单颜色渲染器。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FG3dSampleTechnique(o){
   o = RClass.inherits(this, o, FG3dTechnique);
   //..........................................................
   // @attribute
   o._pass = null;
   //..........................................................
   // @method
   o.setup = FG3dSampleTechnique_setup;
   return o;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
function FG3dSampleTechnique_setup(){
   var o = this;
   o.__base.FG3dTechnique.setup.call(o);
   o._pass = RClass.create(FG3dSampleTechniquePass);
   o._passes.push(o._pass);
}
