//==========================================================
// <T>渲染技术模式。</T>
//
// @author maocy
// @history 150226
//==========================================================
MO.FG3dTechniqueMode = function FG3dTechniqueMode(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._code = MO.Class.register(o, new MO.AGetSet('_code'));
   return o;
}
