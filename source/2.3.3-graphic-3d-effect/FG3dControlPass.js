//==========================================================
// <T>控件渲染过程。</T>
//
// @author maocy
// @history 150211
//==========================================================
MO.Graphic3d.FG3dControlPass = function FG3dControlPass(o){
   o = RClass.inherits(this, o, MO.Graphic3d.FG3dTechniquePass);
   //..........................................................
   // @attribute
   o._code = 'control';
   return o;
}
