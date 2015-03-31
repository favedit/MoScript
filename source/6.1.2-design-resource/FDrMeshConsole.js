//==========================================================
// <T>设计网格3D资源控制台。</T>
//
// @class
// @author maocy
// @version 150331
//==========================================================
function FDrMeshConsole(o){
   o = RClass.inherits(this, o, FDrAbsResourceConsole);
   // @attribute
   o._serviceCode = 'cloud.content3d.mesh';
   return o;
}
