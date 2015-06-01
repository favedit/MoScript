//==========================================================
// <T>通用颜色渲染过程。</T>
//
// @author maocy
// @history 150119
//==========================================================
function FE3dGeneralColorPass(o){
   o = RClass.inherits(this, o, FG3dTechniquePass);
   //..........................................................
   // @attribute
   o._code = 'color';
   return o;
}
