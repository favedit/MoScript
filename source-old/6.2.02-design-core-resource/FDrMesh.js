//==========================================================
// <T>设计网格3D资源。</T>
//
// @class
// @author maocy
// @version 150331
//==========================================================
function FDrMesh(o){
   o = RClass.inherits(this, o, FDrResource);
   //..........................................................
   // @attribute
   o._classCode = 'Mesh';
   return o;
}
