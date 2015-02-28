//==========================================================
// <T>通用颜色渲染过程。</T>
//
// @author maocy
// @history 150119
//==========================================================
MO.Graphic3d.FG3dGeneralColorPass = function FG3dGeneralColorPass(o){
   o = RClass.inherits(this, o, MO.Graphic3d.FG3dTechniquePass);
   //..........................................................
   // @attribute
   o._code = 'color';
   return o;
}
