//==========================================================
// <T>设计项目资源。</T>
//
// @class
// @author maocy
// @version 150331
//==========================================================
function FDrProject(o){
   o = RClass.inherits(this, o, FDrResource);
   //..........................................................
   // @attribute
   o._classCode = 'Project';
   return o;
}
