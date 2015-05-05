//==========================================================
// <T>控件渲染过程。</T>
//
// @author maocy
// @history 150211
//==========================================================
function FE3dControlPass(o){
   o = RClass.inherits(this, o, FG3dTechniquePass);
   //..........................................................
   // @attribute
   o._code = 'control';
   return o;
}
