//==========================================================
// <T>通用渲染技术。</T>
//
// @author maocy
// @history 150119
//==========================================================
function FG3dGeneralTechnique(o){
   o = RClass.inherits(this, o, FG3dTechnique);
   //..........................................................
   // @attribute
   o._name      = 'general';
   // @attribute
   o._passColor = null;
   //..........................................................
   // @method
   o.setup      = FG3dGeneralTechnique_setup;
   o.passColor  = FG3dGeneralTechnique_passColor;
   return o;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
function FG3dGeneralTechnique_setup(){
   var o = this;
   o.__base.FG3dTechnique.setup.call(o);
   // 创建颜色处理过程
   var p = o._passColor = RClass.create(FG3dGeneralColorPass);
   p.linkContext(o._context);
   p.setup();
   o._passes.push(p);
}

//==========================================================
// <T>获得颜色渲染过程。</T>
//
// @method
// @return FG3dGeneralColorPass 颜色渲染过程
//==========================================================
function FG3dGeneralTechnique_passColor(){
   return this._passColor;
}
