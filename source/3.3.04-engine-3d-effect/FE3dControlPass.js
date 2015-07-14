//==========================================================
// <T>控件渲染过程。</T>
//
// @author maocy
// @history 150211
//==========================================================
MO.FE3dControlPass = function FE3dControlPass(o){
   o = MO.Class.inherits(this, o, MO.FG3dTechniquePass);
   //..........................................................
   // @attribute
   o._code = 'control';
   return o;
}
